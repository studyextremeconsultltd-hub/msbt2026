/**
 * MSBT Contact / Enquiry Worker
 *
 * Sends website enquiries to the official admissions inbox via Resend.
 *
 * Secrets (never commit):
 *   npx wrangler secret put RESEND_API_KEY
 */

const STATIC_ALLOWED_ORIGINS = new Set([
  "https://www.msbt.co.uk",
  "https://msbt.co.uk",
  "https://studyextremeconsultltd-hub.github.io",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
]);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+]?[\d\s().-]{7,20}$/;

function allowedOrigin(request, env) {
  const origin = request.headers.get("Origin") || "";
  if (STATIC_ALLOWED_ORIGINS.has(origin)) return origin;

  try {
    if (origin && origin === new URL(env.SITE_URL).origin) return origin;
  } catch {
    // SITE_URL is validated again when composing messages.
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

function cleanText(value, maxLength) {
  return String(value || "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim()
    .slice(0, maxLength);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function resendConfigured(secret) {
  return /^re_[A-Za-z0-9_]+/.test((secret || "").trim());
}

function row(label, value) {
  if (!value) return "";
  return `<tr>
    <td style="padding:8px 12px;font-weight:600;color:#1a3060;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;color:#222;">${escapeHtml(value)}</td>
  </tr>`;
}

function buildEmail({ sourceLabel, subject, fields }) {
  const textLines = [
    `New MSBT website enquiry (${sourceLabel})`,
    "",
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone}`,
  ];

  if (fields.programme) textLines.push(`Programme: ${fields.programme}`);
  if (fields.heardFrom) textLines.push(`Heard from: ${fields.heardFrom}`);
  if (fields.subject) textLines.push(`Subject: ${fields.subject}`);
  textLines.push("", fields.message || "(No additional message)");

  const html = `<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;background:#f5f7fb;font-family:Segoe UI,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;">
    <tr>
      <td style="padding:20px 24px;background:#0b1f44;color:#ffffff;">
        <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.85;">MSBT Admissions</div>
        <div style="margin-top:6px;font-size:22px;font-weight:700;">New website enquiry</div>
        <div style="margin-top:6px;font-size:14px;opacity:0.9;">${escapeHtml(sourceLabel)}</div>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 12px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:14px;line-height:1.5;">
          ${row("Name", fields.name)}
          ${row("Email", fields.email)}
          ${row("Phone", fields.phone)}
          ${row("Programme", fields.programme)}
          ${row("Heard from", fields.heardFrom)}
          ${row("Subject", fields.subject)}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 24px 24px;">
        <div style="font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#6b7280;margin-bottom:8px;">Message</div>
        <div style="padding:16px;border-radius:12px;background:#f8fafc;border:1px solid #e5e7eb;white-space:pre-wrap;color:#111827;">${escapeHtml(fields.message || "(No additional message)")}</div>
        <p style="margin:16px 0 0;font-size:12px;color:#6b7280;">Reply to this email to respond directly to the enquirer.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return {
    subject: subject.slice(0, 180),
    text: textLines.join("\n"),
    html,
  };
}

function parseEnquiry(body) {
  const type = cleanText(body.type, 32) || "contact";
  const honeypot = cleanText(body.company || body.website || "", 120);

  const name = cleanText(body.name, 120);
  const email = cleanText(body.email, 254).toLowerCase();
  const phone = cleanText(body.phone, 40);
  const subject = cleanText(body.subject, 160);
  const message = cleanText(body.message || body.query, 4000);
  const programme = cleanText(body.programme || body.course || "", 200);
  const heardFrom = cleanText(body.heardFrom, 80);

  const errors = [];
  if (!name || name.length < 2) errors.push("name");
  if (!EMAIL_PATTERN.test(email)) errors.push("email");
  if (!PHONE_PATTERN.test(phone)) errors.push("phone");

  if (type === "contact") {
    if (!subject || subject.length < 3) errors.push("subject");
    if (!message || message.length < 10) errors.push("message");
  }

  return {
    type,
    honeypot,
    errors,
    fields: { name, email, phone, subject, message, programme, heardFrom },
  };
}

function sourceMeta(type, fields) {
  if (type === "hero") {
    const programme = fields.programme || "General enquiry";
    return {
      sourceLabel: "Homepage enquiry form",
      subject: `MSBT Enquiry — ${programme}`,
    };
  }

  if (type === "course") {
    const programme = fields.programme || "Course page enquiry";
    return {
      sourceLabel: "Course page enquiry form",
      subject: `MSBT Course Enquiry — ${programme}`,
    };
  }

  return {
    sourceLabel: "Contact page — Send a message",
    subject: fields.subject ? `MSBT Contact — ${fields.subject}` : "MSBT Contact enquiry",
  };
}

async function sendEnquiry(request, env, origin) {
  const contentLength = Number(request.headers.get("Content-Length") || 0);
  if (contentLength > 24_576) {
    return json({ status: "error", message: "Request is too large." }, 413, origin);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ status: "error", message: "Invalid request." }, 400, origin);
  }

  const parsed = parseEnquiry(body);
  const requestId = crypto.randomUUID();

  // Honeypot: pretend success so bots do not retry.
  if (parsed.honeypot) {
    console.log(JSON.stringify({ event: "enquiry_honeypot", requestId }));
    return json({ status: "success", message: "Enquiry received." }, 200, origin);
  }

  if (parsed.errors.length > 0) {
    return json(
      {
        status: "error",
        message: "Please check the highlighted fields and try again.",
        fields: parsed.errors,
      },
      400,
      origin,
    );
  }

  const secret = (env.RESEND_API_KEY || "").trim();
  if (!resendConfigured(secret)) {
    return json(
      {
        status: "error",
        message: "Enquiry delivery is being configured. Please email admissions directly.",
      },
      503,
      origin,
    );
  }

  const toEmail = cleanText(env.CONTACT_TO_EMAIL, 254) || "naveed.rehman@msbt.co.uk";
  const fromEmail =
    cleanText(env.CONTACT_FROM_EMAIL, 200) || "MSBT Admissions <admissions@msbt.co.uk>";
  const meta = sourceMeta(parsed.type, parsed.fields);
  const email = buildEmail({
    sourceLabel: meta.sourceLabel,
    subject: meta.subject,
    fields: parsed.fields,
  });

  let resendResponse;
  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: parsed.fields.email,
        subject: email.subject,
        text: email.text,
        html: email.html,
        tags: [
          { name: "source", value: parsed.type },
          { name: "site", value: "msbt" },
        ],
      }),
    });
  } catch (error) {
    console.error(JSON.stringify({ event: "resend_fetch_failed", requestId, error: String(error) }));
    return json(
      { status: "error", message: "Unable to send your enquiry right now. Please try again shortly." },
      502,
      origin,
    );
  }

  const resendData = await resendResponse.json().catch(() => ({}));
  if (!resendResponse.ok) {
    console.error(
      JSON.stringify({
        event: "resend_send_failed",
        requestId,
        status: resendResponse.status,
        name: resendData?.name,
        message: resendData?.message,
      }),
    );
    return json(
      { status: "error", message: "Unable to deliver your enquiry right now. Please try again shortly." },
      502,
      origin,
    );
  }

  console.log(
    JSON.stringify({
      event: "enquiry_sent",
      requestId,
      type: parsed.type,
      to: toEmail,
      resendId: resendData?.id,
    }),
  );

  return json(
    {
      status: "success",
      message: "Thank you — your enquiry has been sent to our admissions team.",
    },
    200,
    origin,
  );
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
      return json(
        {
          status: "ok",
          resend_configured: resendConfigured(env.RESEND_API_KEY),
          to: cleanText(env.CONTACT_TO_EMAIL, 254) || "naveed.rehman@msbt.co.uk",
        },
        200,
        origin,
      );
    }

    if (!origin) {
      return json({ status: "error", message: "Origin not allowed." }, 403);
    }

    if (url.pathname === "/api/enquiry" && request.method === "POST") {
      return sendEnquiry(request, env, origin);
    }

    return json({ status: "error", message: "Not found." }, 404, origin);
  },
};
