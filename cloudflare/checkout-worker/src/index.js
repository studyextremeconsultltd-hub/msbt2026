/**
 * MSBT Checkout Worker — Stripe + PayPal
 *
 * Secrets (never commit):
 *   npx wrangler secret put STRIPE_SECRET_KEY
 *   npx wrangler secret put PAYPAL_CLIENT_ID
 *   npx wrangler secret put PAYPAL_CLIENT_SECRET
 *
 * Optional var:
 *   PAYPAL_MODE = "live" | "sandbox"  (default live)
 */

const COURSES = {
  "level-4-diploma-business-management": {
    title: "Level 4 Diploma in Business Management",
    full: 895,
    deposit: 150,
  },
  "level-5-diploma-business-management": {
    title: "Level 5 Diploma in Business Management",
    full: 995,
    deposit: 150,
  },
  "level-5-extended-diploma-business-management": {
    title: "Level 5 Extended Diploma in Business Management",
    full: 1595,
    deposit: 195,
  },
  "level-6-diploma-business-management": {
    title: "Level 6 Diploma in Business Management",
    full: 1095,
    deposit: 150,
  },
  "level-7-certificate-research-methods": {
    title: "Level 7 Certificate in Research Methods",
    full: 395,
    deposit: 95,
  },
  "level-4-health-social-care-management": {
    title: "Level 4 Diploma in Health and Social Care Management",
    full: 895,
    deposit: 150,
  },
  "level-5-extended-health-social-care-management": {
    title: "Level 5 Extended Diploma in Health and Social Care Management",
    full: 1595,
    deposit: 195,
  },
};

const STATIC_ALLOWED_ORIGINS = new Set([
  "https://www.msbt.co.uk",
  "https://msbt.co.uk",
  "https://studyextremeconsultltd-hub.github.io",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

function allowedOrigin(request, env) {
  const origin = request.headers.get("Origin") || "";
  if (STATIC_ALLOWED_ORIGINS.has(origin)) return origin;

  try {
    if (origin && origin === new URL(env.SITE_URL).origin) return origin;
  } catch {
    // ignore
  }
  return "";
}

function corsHeaders(origin) {
  return {
    ...(origin
      ? {
          "Access-Control-Allow-Origin": origin,
          Vary: "Origin",
        }
      : {}),
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };
}

function json(data, status, origin = "") {
  return Response.json(data, {
    status,
    headers: corsHeaders(origin),
  });
}

function stripeConfigured(secret) {
  return /^sk_(live|test)_/.test((secret || "").trim());
}

function paypalConfigured(env) {
  return Boolean((env.PAYPAL_CLIENT_ID || "").trim() && (env.PAYPAL_CLIENT_SECRET || "").trim());
}

function paypalApiBase(env) {
  const mode = String(env.PAYPAL_MODE || "live").toLowerCase();
  return mode === "sandbox" ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com";
}

function cleanText(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function returnSiteUrl(origin, env) {
  if (origin === "http://localhost:3000" || origin === "http://127.0.0.1:3000") {
    return origin;
  }

  try {
    return new URL(env.SITE_URL).origin;
  } catch {
    return "https://www.msbt.co.uk";
  }
}

function parseCheckoutBody(body) {
  const courseSlug = cleanText(body.courseSlug, 100);
  const course = COURSES[courseSlug];
  const customerEmail = cleanText(body.customerEmail, 254).toLowerCase();
  const paymentOption = body.paymentOption === "deposit" ? "deposit" : "full";
  const provider = body.provider === "paypal" ? "paypal" : "stripe";
  const customerName = cleanText(body.customerName, 120);
  const customerPhone = cleanText(body.customerPhone, 40);

  return {
    courseSlug,
    course,
    customerEmail,
    paymentOption,
    provider,
    customerName,
    customerPhone,
    amount: course ? course[paymentOption] : 0,
  };
}

async function getPayPalAccessToken(env) {
  const auth = btoa(`${env.PAYPAL_CLIENT_ID.trim()}:${env.PAYPAL_CLIENT_SECRET.trim()}`);
  const response = await fetch(`${paypalApiBase(env)}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  if (!response.ok || !data.access_token) {
    throw new Error(data?.error_description || "PayPal auth failed");
  }
  return data.access_token;
}

async function createStripeCheckout(parsed, env, origin, requestId) {
  const secret = (env.STRIPE_SECRET_KEY || "").trim();
  if (!stripeConfigured(secret)) {
    return json(
      {
        status: "error",
        message: "Stripe checkout is being configured. Please contact admissions.",
      },
      503,
      origin,
    );
  }

  const { course, courseSlug, paymentOption, customerEmail, customerName, customerPhone, amount } =
    parsed;
  const amountPence = Math.round(amount * 100);
  const siteUrl = returnSiteUrl(origin, env);
  const params = new URLSearchParams();
  const label = paymentOption === "deposit" ? "Initial deposit" : "Full course payment";

  params.set("mode", "payment");
  params.set("success_url", `${siteUrl}/courses/${courseSlug}?checkout=success`);
  params.set("cancel_url", `${siteUrl}/courses/${courseSlug}?checkout=cancel`);
  params.set("customer_email", customerEmail);
  params.set("billing_address_collection", "required");
  params.set("phone_number_collection[enabled]", "true");
  params.set("submit_type", "pay");
  params.set("locale", "auto");
  params.set("metadata[source]", "msbt-website");
  params.set("metadata[course_slug]", courseSlug);
  params.set("metadata[payment_option]", paymentOption);
  if (customerName) params.set("metadata[customer_name]", customerName);
  if (customerPhone) params.set("metadata[customer_phone]", customerPhone);
  params.set("payment_intent_data[metadata][source]", "msbt-website");
  params.set("payment_intent_data[metadata][course_slug]", courseSlug);
  params.set("payment_intent_data[metadata][payment_option]", paymentOption);
  if (customerPhone) {
    params.set("payment_intent_data[metadata][customer_phone]", customerPhone);
  }
  params.set("line_items[0][price_data][currency]", "gbp");
  params.set("line_items[0][price_data][unit_amount]", String(amountPence));
  params.set("line_items[0][price_data][product_data][name]", `${course.title} — ${label}`);
  params.set(
    "line_items[0][price_data][product_data][description]",
    paymentOption === "deposit"
      ? "Initial course deposit. Remaining instalments are arranged with MSBT Admissions."
      : "Discounted MSBT course tuition fee.",
  );
  params.set("line_items[0][quantity]", "1");

  let stripeResponse;
  try {
    stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "Idempotency-Key": requestId,
      },
      body: params.toString(),
    });
  } catch (error) {
    console.error(JSON.stringify({ event: "stripe_fetch_failed", requestId, error: String(error) }));
    return json({ status: "error", message: "Stripe checkout is temporarily unavailable." }, 502, origin);
  }

  const stripeData = await stripeResponse.json();
  if (!stripeResponse.ok || !stripeData.url) {
    console.error(
      JSON.stringify({
        event: "stripe_session_failed",
        requestId,
        status: stripeResponse.status,
        code: stripeData?.error?.code,
      }),
    );
    return json({ status: "error", message: "Stripe checkout could not be started." }, 502, origin);
  }

  console.log(
    JSON.stringify({
      event: "stripe_session_created",
      requestId,
      courseSlug,
      paymentOption,
      amountPence,
    }),
  );

  return json({ status: "success", provider: "stripe", url: stripeData.url }, 200, origin);
}

async function createPayPalCheckout(parsed, env, origin, requestId, workerOrigin) {
  if (!paypalConfigured(env)) {
    return json(
      {
        status: "error",
        message: "PayPal checkout is being configured. Please contact admissions or pay with Stripe.",
      },
      503,
      origin,
    );
  }

  const { course, courseSlug, paymentOption, customerEmail, customerName, customerPhone, amount } =
    parsed;
  const siteUrl = returnSiteUrl(origin, env);
  const label = paymentOption === "deposit" ? "Initial deposit" : "Full course payment";
  const value = amount.toFixed(2);

  let accessToken;
  try {
    accessToken = await getPayPalAccessToken(env);
  } catch (error) {
    console.error(JSON.stringify({ event: "paypal_auth_failed", requestId, error: String(error) }));
    return json({ status: "error", message: "PayPal authentication failed." }, 502, origin);
  }

  const orderPayload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        reference_id: courseSlug.slice(0, 64),
        description: `${course.title} — ${label}`.slice(0, 127),
        custom_id: `${paymentOption}:${requestId}`.slice(0, 127),
        amount: {
          currency_code: "GBP",
          value,
        },
        // Soft descriptor helps the payer see MSBT on their PayPal activity
        soft_descriptor: "MSBT FEES",
      },
    ],
    payer: {
      email_address: customerEmail,
      ...(customerName
        ? {
            name: {
              given_name: customerName.split(/\s+/)[0]?.slice(0, 140) || "Student",
              surname: customerName.split(/\s+/).slice(1).join(" ").slice(0, 140) || "MSBT",
            },
          }
        : {}),
    },
    application_context: {
      brand_name: "Manchester School of Business and Technology",
      landing_page: "LOGIN",
      user_action: "PAY_NOW",
      shipping_preference: "NO_SHIPPING",
      return_url: `${workerOrigin}/api/checkout/paypal/return?course=${encodeURIComponent(courseSlug)}`,
      cancel_url: `${siteUrl}/courses/${courseSlug}?checkout=cancel`,
    },
  };

  // Optional: force settlement into a specific MSBT PayPal business email
  const merchantEmail = cleanText(env.PAYPAL_MERCHANT_EMAIL, 254).toLowerCase();
  if (merchantEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(merchantEmail)) {
    orderPayload.purchase_units[0].payee = { email_address: merchantEmail };
  }

  if (customerPhone) {
    orderPayload.purchase_units[0].custom_id = `${paymentOption}:${customerPhone}:${requestId}`.slice(
      0,
      127,
    );
  }

  let orderResponse;
  try {
    orderResponse = await fetch(`${paypalApiBase(env)}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "PayPal-Request-Id": requestId,
      },
      body: JSON.stringify(orderPayload),
    });
  } catch (error) {
    console.error(JSON.stringify({ event: "paypal_order_fetch_failed", requestId, error: String(error) }));
    return json({ status: "error", message: "PayPal checkout is temporarily unavailable." }, 502, origin);
  }

  const orderData = await orderResponse.json();
  const approve = Array.isArray(orderData.links)
    ? orderData.links.find((link) => link.rel === "approve")
    : null;

  if (!orderResponse.ok || !approve?.href) {
    console.error(
      JSON.stringify({
        event: "paypal_order_failed",
        requestId,
        status: orderResponse.status,
        name: orderData?.name,
      }),
    );
    return json({ status: "error", message: "PayPal checkout could not be started." }, 502, origin);
  }

  console.log(
    JSON.stringify({
      event: "paypal_order_created",
      requestId,
      courseSlug,
      paymentOption,
      amount: value,
      orderId: orderData.id,
    }),
  );

  return json({ status: "success", provider: "paypal", url: approve.href }, 200, origin);
}

async function createCheckout(request, env, origin) {
  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > 16_384) {
    return json({ status: "error", message: "Request is too large." }, 413, origin);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ status: "error", message: "Invalid request." }, 400, origin);
  }

  const parsed = parseCheckoutBody(body);
  if (!parsed.course) {
    return json({ status: "error", message: "This course is not available for checkout." }, 400, origin);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parsed.customerEmail)) {
    return json({ status: "error", message: "Enter a valid email address before paying." }, 400, origin);
  }

  const requestId = crypto.randomUUID();
  const workerOrigin = new URL(request.url).origin;

  if (parsed.provider === "paypal") {
    return createPayPalCheckout(parsed, env, origin, requestId, workerOrigin);
  }
  return createStripeCheckout(parsed, env, origin, requestId);
}

async function capturePayPalReturn(request, env) {
  const url = new URL(request.url);
  const token = cleanText(url.searchParams.get("token"), 64);
  const courseSlug = cleanText(url.searchParams.get("course"), 100);
  const siteUrl = returnSiteUrl("", env);
  const successPath = courseSlug
    ? `${siteUrl}/courses/${courseSlug}?checkout=success`
    : `${siteUrl}/pay?checkout=success`;
  const cancelPath = courseSlug
    ? `${siteUrl}/courses/${courseSlug}?checkout=cancel`
    : `${siteUrl}/pay?checkout=cancel`;

  if (!token || !paypalConfigured(env)) {
    return Response.redirect(cancelPath, 302);
  }

  try {
    const accessToken = await getPayPalAccessToken(env);
    const captureResponse = await fetch(
      `${paypalApiBase(env)}/v2/checkout/orders/${encodeURIComponent(token)}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );
    const captureData = await captureResponse.json();
    const status = captureData?.status;
    console.log(
      JSON.stringify({
        event: "paypal_capture",
        orderId: token,
        courseSlug,
        ok: captureResponse.ok,
        status,
      }),
    );

    if (captureResponse.ok && (status === "COMPLETED" || status === "APPROVED")) {
      return Response.redirect(successPath, 302);
    }
  } catch (error) {
    console.error(JSON.stringify({ event: "paypal_capture_failed", error: String(error) }));
  }

  return Response.redirect(cancelPath, 302);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = allowedOrigin(request, env);

    if (request.method === "OPTIONS") {
      if (!origin) return json({ status: "error", message: "Origin not allowed." }, 403);
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (url.pathname === "/api/checkout/paypal/return" && request.method === "GET") {
      return capturePayPalReturn(request, env);
    }

    if (url.pathname === "/health" && request.method === "GET") {
      return json(
        {
          status: "ok",
          stripe_configured: stripeConfigured(env.STRIPE_SECRET_KEY),
          paypal_configured: paypalConfigured(env),
        },
        200,
        origin,
      );
    }

    if (!origin) {
      return json({ status: "error", message: "Origin not allowed." }, 403);
    }

    if (url.pathname === "/api/checkout/create" && request.method === "POST") {
      return createCheckout(request, env, origin);
    }

    return json({ status: "error", message: "Not found." }, 404, origin);
  },
};
