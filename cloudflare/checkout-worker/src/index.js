/**
 * MSBT Stripe Checkout Worker
 *
 * Secret (set with Wrangler, never commit it):
 *   npx wrangler secret put STRIPE_SECRET_KEY
 */

const COURSES = {
  "level-3-diploma-business-management": {
    title: "Level 3 Diploma in Business Management",
    full: 795,
    deposit: 125,
  },
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
  "level-7-diploma-strategic-management-leadership": {
    title: "Level 7 Diploma in Strategic Management & Leadership",
    full: 1295,
    deposit: 195,
  },
  "level-7-certificate-research-methods": {
    title: "Level 7 Certificate in Research Methods",
    full: 395,
    deposit: 95,
  },
  "level-3-foundation-health-social-care": {
    title: "Level 3 Foundation Diploma in Health and Social Care",
    full: 595,
    deposit: 100,
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
  "level-7-health-social-care-management": {
    title: "Level 7 Diploma in Health and Social Care Management",
    full: 1295,
    deposit: 195,
  },
  "level-4-diploma-psychology": {
    title: "Level 4 Diploma in Psychology",
    full: 895,
    deposit: 150,
  },
  "level-5-diploma-psychology": {
    title: "Level 5 Diploma in Psychology",
    full: 995,
    deposit: 150,
  },
  "level-5-extended-diploma-psychology": {
    title: "Level 5 Extended Diploma in Psychology",
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
    // SITE_URL is validated again when return URLs are created.
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

  const courseSlug = cleanText(body.courseSlug, 100);
  const course = COURSES[courseSlug];
  if (!course) {
    return json({ status: "error", message: "This course is not available for checkout." }, 400, origin);
  }

  const customerEmail = cleanText(body.customerEmail, 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
    return json({ status: "error", message: "Enter a valid email address before paying." }, 400, origin);
  }

  const paymentOption = body.paymentOption === "deposit" ? "deposit" : "full";
  const amount = course[paymentOption];
  const amountPence = Math.round(amount * 100);
  const customerName = cleanText(body.customerName, 120);
  const customerPhone = cleanText(body.customerPhone, 40);
  const requestId = crypto.randomUUID();
  const siteUrl = returnSiteUrl(origin, env);
  const secret = (env.STRIPE_SECRET_KEY || "").trim();

  if (!stripeConfigured(secret)) {
    return json(
      {
        status: "error",
        message: "Secure checkout is being configured. Please contact admissions.",
      },
      503,
      origin,
    );
  }

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

  return json({ status: "success", url: stripeData.url }, 200, origin);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = allowedOrigin(request, env);

    if (request.method === "OPTIONS") {
      if (!origin) return json({ status: "error", message: "Origin not allowed." }, 403);
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (url.pathname === "/health" && request.method === "GET") {
      return json({
        status: "ok",
        stripe_configured: stripeConfigured(env.STRIPE_SECRET_KEY),
      }, 200, origin);
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
