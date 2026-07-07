"use client";

import { useState } from "react";
import { GraduationCap, Mail, MessageSquare, Phone, Send, User } from "lucide-react";
import { courseListForEnquiry } from "@/data/msbt";

const contactMethods = ["Email", "Phone", "WhatsApp"] as const;
const hearAboutOptions = [
  "Google search",
  "Social media",
  "Friend or colleague",
  "Employer referral",
  "Other",
] as const;

const labelClass = "mb-2 flex items-center gap-2 text-sm font-bold text-ink sm:text-base";
const inputClass =
  "w-full rounded-xl border-2 border-line bg-cream/50 px-4 py-3.5 text-base font-medium text-ink outline-none transition placeholder:text-muted/70 focus:border-navy focus:bg-white focus:ring-2 focus:ring-navy/15";

export default function HeroEnquiryForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [query, setQuery] = useState("");
  const [contactMethod, setContactMethod] = useState<(typeof contactMethods)[number]>("Email");
  const [heardFrom, setHeardFrom] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const allCourses = courseListForEnquiry();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) return;
    setSubmitted(true);
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-2xl">
      <div className="overflow-hidden rounded-3xl border-2 border-navy/10 bg-white card-shadow ring-2 ring-navy/5">
        <div className="relative bg-gradient-to-r from-navy via-[#1a3060] to-navy px-6 py-6 sm:px-8 sm:py-7 ring-1 ring-gold/25">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(232,108,42,0.3),transparent_55%)]" />
          <div className="relative flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm ring-2 ring-white/20">
              <GraduationCap className="text-orange" size={28} />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Start Your Journey
              </h3>
              <p className="mt-2 text-base font-semibold text-white/90 sm:text-lg">
                Tell us about your goals — our admissions team will respond within 24 hours.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="rounded-2xl border-2 border-teal/30 bg-gradient-to-br from-teal/10 to-sky/10 p-8 text-center">
              <p className="text-xl font-bold text-teal sm:text-2xl">Thank you for your enquiry!</p>
              <p className="mt-3 text-base font-medium text-muted sm:text-lg">
                We&apos;ve received your details and will be in touch shortly to discuss your
                programme options.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="text-sm font-bold text-muted sm:text-base">
                Fields marked <span className="text-orange">*</span> are required.
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    <User size={18} className="text-navy" />
                    Full Name <span className="text-orange">*</span>
                  </label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Ahmed"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    <Phone size={18} className="text-navy" />
                    Phone Number <span className="text-orange">*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 7XXX XXXXXX"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    <Mail size={18} className="text-navy" />
                    Email Address <span className="text-orange">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  <GraduationCap size={18} className="text-navy" />
                  Programme of Interest
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select a course…</option>
                  {allCourses.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.title}
                    </option>
                  ))}
                  <option value="unsure">Not sure yet — advise me</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  <MessageSquare size={18} className="text-navy" />
                  Your Query or Questions
                </label>
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  rows={4}
                  placeholder="Tell us about your background, career goals, or any questions you have…"
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-ink sm:text-base">
                    Preferred Contact Method
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {contactMethods.map((method) => (
                      <label
                        key={method}
                        className={`cursor-pointer rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition sm:text-base ${
                          contactMethod === method
                            ? "border-navy bg-navy text-white"
                            : "border-line bg-cream/50 text-ink hover:border-navy/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="contactMethod"
                          value={method}
                          checked={contactMethod === method}
                          onChange={() => setContactMethod(method)}
                          className="sr-only"
                        />
                        {method}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-ink sm:text-base">
                    How did you hear about us?
                  </label>
                  <select
                    value={heardFrom}
                    onChange={(e) => setHeardFrom(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Optional</option>
                    {hearAboutOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange to-peach-deep py-4 text-lg font-bold text-white shadow-xl shadow-orange/30 transition hover:shadow-2xl hover:brightness-105 sm:text-xl"
              >
                <Send size={22} className="transition group-hover:translate-x-1" />
                Submit Enquiry
              </button>

              <p className="text-center text-sm font-medium leading-relaxed text-muted">
                By submitting, you agree to be contacted about MSBT programmes. Your data is
                handled securely and never shared with third parties.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
