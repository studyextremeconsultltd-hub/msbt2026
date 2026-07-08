import { NextResponse } from "next/server";
import { site } from "@/data/msbt";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

function validatePayload(body: ContactPayload) {
  const errors: Record<string, string> = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[+]?[\d\s().-]{7,20}$/;

  if (!body.name?.trim() || body.name.trim().length < 2) {
    errors.name = "Invalid name";
  }
  if (!body.email?.trim() || !emailPattern.test(body.email.trim())) {
    errors.email = "Invalid email";
  }
  if (!body.phone?.trim() || !phonePattern.test(body.phone.trim())) {
    errors.phone = "Invalid phone";
  }
  if (!body.subject?.trim() || body.subject.trim().length < 3) {
    errors.subject = "Invalid subject";
  }
  if (!body.message?.trim() || body.message.trim().length < 10) {
    errors.message = "Invalid message";
  }

  return errors;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const errors = validatePayload(body);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, message: "Validation failed.", errors },
        { status: 400 },
      );
    }

    const enquiry = {
      name: body.name!.trim(),
      email: body.email!.trim(),
      phone: body.phone!.trim(),
      subject: body.subject!.trim(),
      message: body.message!.trim(),
      receivedAt: new Date().toISOString(),
      to: site.email,
    };

    // Log for server-side capture; connect email provider via CONTACT_WEBHOOK_URL when ready.
    console.info("[contact]", enquiry);

    const webhook = process.env.CONTACT_WEBHOOK_URL;
    if (webhook) {
      const hookRes = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiry),
      });
      if (!hookRes.ok) {
        return NextResponse.json(
          { success: false, message: "Unable to deliver your message right now. Please try again later." },
          { status: 502 },
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been sent. Our team will respond within 1–2 business days.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
