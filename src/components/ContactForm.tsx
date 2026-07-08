"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Mail, MessageSquare, Phone, Send, User } from "lucide-react";
import { site } from "@/data/msbt";

type FormFields = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormFields, string>>;

type SubmitState = "idle" | "submitting" | "success" | "error";

const labelClass = "mb-2 flex items-center gap-2 text-sm font-bold text-ink sm:text-base";
const inputBase =
  "w-full rounded-xl border-2 bg-cream/50 px-4 py-3.5 text-base font-medium text-ink outline-none transition placeholder:text-muted/70 focus:bg-white focus:ring-2";

function inputClass(hasError: boolean) {
  return `${inputBase} ${
    hasError
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/15"
      : "border-line focus:border-navy focus:ring-navy/15"
  }`;
}

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[+]?[\d\s().-]{7,20}$/;

  if (!fields.name.trim()) {
    errors.name = "Please enter your full name.";
  } else if (fields.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!fields.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!emailPattern.test(fields.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!fields.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (!phonePattern.test(fields.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!fields.subject.trim()) {
    errors.subject = "Please enter a subject.";
  } else if (fields.subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters.";
  }

  if (!fields.message.trim()) {
    errors.message = "Please enter your message.";
  } else if (fields.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

function mailtoFallback(fields: FormFields) {
  const body = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone}`,
    "",
    fields.message,
  ].join("\n");

  const mailto = `mailto:${encodeURIComponent(site.email)}?subject=${encodeURIComponent(fields.subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
}

export default function ContactForm() {
  const [fields, setFields] = useState<FormFields>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  function updateField<K extends keyof FormFields>(key: K, value: FormFields[K]) {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
    if (submitState === "error") {
      setSubmitState("idle");
      setStatusMessage("");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitState("error");
      setStatusMessage("Please correct the highlighted fields and try again.");
      return;
    }

    setSubmitState("submitting");
    setStatusMessage("");
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      const data = (await res.json()) as { success?: boolean; message?: string };

      if (res.ok && data.success) {
        setSubmitState("success");
        setStatusMessage(data.message ?? "Thank you! Your message has been sent successfully.");
        setFields({ name: "", email: "", phone: "", subject: "", message: "" });
        return;
      }

      throw new Error(data.message ?? "Submission failed");
    } catch {
      try {
        mailtoFallback(fields);
        setSubmitState("success");
        setStatusMessage(
          "We opened your email app as a fallback. Please send the message to complete your enquiry.",
        );
      } catch {
        setSubmitState("error");
        setStatusMessage(
          "Something went wrong. Please try again or email us directly using the contact details on this page.",
        );
      }
    }
  }

  const fieldIds = {
    name: "contact-name",
    email: "contact-email",
    phone: "contact-phone",
    subject: "contact-subject",
    message: "contact-message",
  };

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-navy/10 bg-white card-shadow ring-2 ring-navy/5">
      <div className="relative bg-gradient-to-r from-navy via-[#1a3060] to-navy px-6 py-6 sm:px-8 sm:py-7 ring-1 ring-gold/25">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(232,108,42,0.3),transparent_55%)]" />
        <div className="relative">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Send a message</h2>
          <p className="mt-2 text-base font-semibold text-white/90">
            Fields marked <span className="text-gold">*</span> are required.
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {submitState === "success" && (
          <div
            role="status"
            aria-live="polite"
            className="mb-6 flex gap-3 rounded-2xl border-2 border-teal/30 bg-gradient-to-br from-teal/10 to-sky/10 p-5"
          >
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-teal" aria-hidden />
            <p className="text-base font-bold text-teal sm:text-lg">{statusMessage}</p>
          </div>
        )}

        {submitState === "error" && statusMessage && (
          <div
            role="alert"
            aria-live="assertive"
            className="mb-6 flex gap-3 rounded-2xl border-2 border-red-300 bg-red-50 p-5"
          >
            <AlertCircle className="mt-0.5 h-6 w-6 shrink-0 text-red-600" aria-hidden />
            <p className="text-base font-bold text-red-700">{statusMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label="Contact form">
          <div>
            <label htmlFor={fieldIds.name} className={labelClass}>
              <User size={18} className="text-navy" aria-hidden />
              Full Name <span className="text-orange">*</span>
            </label>
            <input
              id={fieldIds.name}
              name="name"
              type="text"
              autoComplete="name"
              value={fields.name}
              onChange={(e) => updateField("name", e.target.value)}
              className={inputClass(!!errors.name)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? `${fieldIds.name}-error` : undefined}
            />
            {errors.name && (
              <p id={`${fieldIds.name}-error`} className="mt-1.5 text-sm font-semibold text-red-600" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={fieldIds.email} className={labelClass}>
                <Mail size={18} className="text-navy" aria-hidden />
                Email <span className="text-orange">*</span>
              </label>
              <input
                id={fieldIds.email}
                name="email"
                type="email"
                autoComplete="email"
                value={fields.email}
                onChange={(e) => updateField("email", e.target.value)}
                className={inputClass(!!errors.email)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? `${fieldIds.email}-error` : undefined}
              />
              {errors.email && (
                <p id={`${fieldIds.email}-error`} className="mt-1.5 text-sm font-semibold text-red-600" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor={fieldIds.phone} className={labelClass}>
                <Phone size={18} className="text-navy" aria-hidden />
                Phone <span className="text-orange">*</span>
              </label>
              <input
                id={fieldIds.phone}
                name="phone"
                type="tel"
                autoComplete="tel"
                value={fields.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className={inputClass(!!errors.phone)}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? `${fieldIds.phone}-error` : undefined}
              />
              {errors.phone && (
                <p id={`${fieldIds.phone}-error`} className="mt-1.5 text-sm font-semibold text-red-600" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor={fieldIds.subject} className={labelClass}>
              <MessageSquare size={18} className="text-navy" aria-hidden />
              Subject <span className="text-orange">*</span>
            </label>
            <input
              id={fieldIds.subject}
              name="subject"
              type="text"
              value={fields.subject}
              onChange={(e) => updateField("subject", e.target.value)}
              className={inputClass(!!errors.subject)}
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? `${fieldIds.subject}-error` : undefined}
            />
            {errors.subject && (
              <p id={`${fieldIds.subject}-error`} className="mt-1.5 text-sm font-semibold text-red-600" role="alert">
                {errors.subject}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={fieldIds.message} className={labelClass}>
              <MessageSquare size={18} className="text-navy" aria-hidden />
              Message <span className="text-orange">*</span>
            </label>
            <textarea
              id={fieldIds.message}
              name="message"
              rows={5}
              value={fields.message}
              onChange={(e) => updateField("message", e.target.value)}
              className={`${inputClass(!!errors.message)} resize-y min-h-[140px]`}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? `${fieldIds.message}-error` : undefined}
            />
            {errors.message && (
              <p id={`${fieldIds.message}-error`} className="mt-1.5 text-sm font-semibold text-red-600" role="alert">
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitState === "submitting"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange px-8 py-4 text-base font-bold text-white shadow-md ring-2 ring-gold/30 transition hover:bg-orange/90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {submitState === "submitting" ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                Sending…
              </>
            ) : (
              <>
                <Send className="h-5 w-5" aria-hidden />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
