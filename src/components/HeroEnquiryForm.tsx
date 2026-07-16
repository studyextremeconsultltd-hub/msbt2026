import { useState } from "react";
import { AlertCircle, CheckCircle2, GraduationCap, Loader2, Mail, MessageSquare, Phone, Send, User } from "lucide-react";
import { courseListForEnquiry, site } from "@/data/msbt";

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

type SubmitState = "idle" | "submitting" | "success" | "error";

function buildMailto(name: string, email: string, phone: string, course: string, query: string, heardFrom: string) {
  const allCourses = courseListForEnquiry();
  const courseTitle =
    course === "unsure"
      ? "Not sure yet — advise me"
      : (allCourses.find((c) => c.slug === course)?.title ?? course) || "Not specified";

  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Programme: ${courseTitle}`,
    heardFrom ? `Heard from: ${heardFrom}` : "",
    "",
    query || "(No additional message)",
  ]
    .filter(Boolean)
    .join("\n");

  return `mailto:${site.email}?subject=${encodeURIComponent(`MSBT Enquiry — ${courseTitle}`)}&body=${encodeURIComponent(body)}`;
}

export default function HeroEnquiryForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [query, setQuery] = useState("");
  const [heardFrom, setHeardFrom] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const allCourses = courseListForEnquiry();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) return;

    setSubmitState("submitting");
    setStatusMessage("");

    window.location.href = buildMailto(name, email, phone, course, query, heardFrom);
    setSubmitState("success");
    setStatusMessage(
      `Your email app has been opened to send your enquiry to ${site.email}.`,
    );
  }

  return (
    <div className="relative mx-auto mt-8 w-full max-w-2xl">
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
                Submit your enquiry — our admissions team at{" "}
                <span className="text-gold">{site.email}</span> will respond within 24 hours.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {submitState === "success" ? (
            <div
              role="status"
              className="flex gap-3 rounded-2xl border-2 border-teal/30 bg-gradient-to-br from-teal/10 to-sky/10 p-8"
            >
              <CheckCircle2 className="mt-0.5 h-7 w-7 shrink-0 text-teal" aria-hidden />
              <div>
                <p className="text-xl font-bold text-teal sm:text-2xl">Thank you for your enquiry!</p>
                <p className="mt-3 text-base font-medium text-muted sm:text-lg">{statusMessage}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {submitState === "error" && statusMessage && (
                <div
                  role="alert"
                  className="flex gap-3 rounded-2xl border-2 border-red-300 bg-red-50 p-4"
                >
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-600" aria-hidden />
                  <p className="text-sm font-bold text-red-700">{statusMessage}</p>
                </div>
              )}

              <p className="text-sm font-bold text-muted sm:text-base">
                Fields marked <span className="text-orange">*</span> are required. Enquiries are sent to{" "}
                <a href={`mailto:${site.email}`} className="text-navy underline-offset-2 hover:underline">
                  {site.email}
                </a>
                .
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
                  className={`${inputClass} resize-y min-h-[120px]`}
                />
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

              <button
                type="submit"
                disabled={submitState === "submitting"}
                className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange to-peach-deep py-4 text-lg font-bold text-white shadow-xl shadow-orange/30 transition hover:shadow-2xl hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70 sm:text-xl"
              >
                {submitState === "submitting" ? (
                  <>
                    <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={22} className="transition group-hover:translate-x-1" />
                    Submit Enquiry
                  </>
                )}
              </button>

              <p className="text-center text-sm font-medium leading-relaxed text-muted">
                By submitting, you agree to be contacted about MSBT programmes. Your enquiry is delivered
                securely to our admissions team.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
