import { NextResponse } from "next/server";
import { site } from "@/data/msbt";
import { courses } from "@/data/msbt";

type EnquiryPayload = {
  name?: string;
  email?: string;
  phone?: string;
  course?: string;
  query?: string;
  heardFrom?: string;
};

function validatePayload(body: EnquiryPayload) {
  const errors: Record<string, string> = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[+]?[\d\s().-]{7,20}$/;

  if (!body.name?.trim() || body.name.trim().length < 2) errors.name = "Invalid name";
  if (!body.email?.trim() || !emailPattern.test(body.email.trim())) errors.email = "Invalid email";
  if (!body.phone?.trim() || !phonePattern.test(body.phone.trim())) errors.phone = "Invalid phone";

  return errors;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as EnquiryPayload;
    const errors = validatePayload(body);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, message: "Please check your details and try again.", errors },
        { status: 400 },
      );
    }

    const courseTitle =
      body.course === "unsure"
        ? "Not sure yet — advise me"
        : courses.find((c) => c.slug === body.course)?.title ?? body.course ?? "Not specified";

    const enquiry = {
      name: body.name!.trim(),
      email: body.email!.trim(),
      phone: body.phone!.trim(),
      subject: `MSBT Enquiry — ${courseTitle}`,
      message: [
        `Programme of interest: ${courseTitle}`,
        body.heardFrom ? `How they heard about us: ${body.heardFrom}` : "",
        "",
        body.query?.trim() || "(No additional message provided)",
      ]
        .filter(Boolean)
        .join("\n"),
      receivedAt: new Date().toISOString(),
      to: site.email,
    };

    console.info("[enquiry]", enquiry);

    const webhook = process.env.CONTACT_WEBHOOK_URL;
    if (webhook) {
      const hookRes = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiry),
      });
      if (!hookRes.ok) {
        return NextResponse.json(
          { success: false, message: "Unable to send your enquiry right now. Please try again." },
          { status: 502 },
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: `Thank you! Your enquiry has been sent to ${site.email}. We will respond within 24 hours.`,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
