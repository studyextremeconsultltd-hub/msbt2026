const contactApiUrl = (
  import.meta.env.VITE_CONTACT_API_URL ||
  "https://msbt-contact.engr-noumanfaiz.workers.dev"
).replace(/\/$/, "");

export type EnquiryType = "contact" | "hero" | "course";

export type EnquiryPayload = {
  type: EnquiryType;
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message?: string;
  query?: string;
  programme?: string;
  course?: string;
  heardFrom?: string;
  /** Honeypot — leave empty. */
  company?: string;
};

type EnquiryResponse = {
  status?: string;
  message?: string;
  fields?: string[];
};

export async function submitEnquiry(payload: EnquiryPayload): Promise<string> {
  const response = await fetch(`${contactApiUrl}/api/enquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      company: "",
    }),
  });

  const data = (await response.json().catch(() => ({}))) as EnquiryResponse;
  if (!response.ok || data.status !== "success") {
    throw new Error(
      data.message || "Unable to send your enquiry right now. Please try again shortly.",
    );
  }

  return data.message || "Thank you — your enquiry has been sent to our admissions team.";
}
