import { useState } from "react";
import { Link } from "react-router-dom";
import type { Course } from "@/data/msbt";
import { courseListForEnquiry, site } from "@/data/msbt";
import { submitEnquiry } from "@/lib/enquiry";

export default function CourseSidebar({ course }: { course: Course }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(course.slug);
  const [company, setCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [enquiryLoading, setEnquiryLoading] = useState(false);
  const [enquiryError, setEnquiryError] = useState("");

  const allCourses = courseListForEnquiry();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) return;

    const programmeTitle =
      allCourses.find((item) => item.slug === selectedCourse)?.title || course.title;

    setEnquiryLoading(true);
    setEnquiryError("");
    try {
      await submitEnquiry({
        type: "course",
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        programme: programmeTitle,
        message: `Register interest for ${programmeTitle}.`,
        company,
      });
      setSubmitted(true);
      setCompany("");
    } catch (error) {
      setEnquiryError(
        error instanceof Error
          ? error.message
          : "Unable to send your enquiry right now. Please try again shortly.",
      );
    } finally {
      setEnquiryLoading(false);
    }
  }

  return (
    <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-2xl border border-line bg-white p-5 card-shadow">
        <h3 className="font-semibold text-ink">Register your interest</h3>
        <p className="mt-1 text-xs text-muted">
          All fields marked <span className="text-red-500">*</span> must be completed.
        </p>
        {submitted ? (
          <p className="mt-4 rounded-xl bg-teal/10 p-4 text-sm text-teal">
            Thank you — our admissions team will be in touch shortly.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div className="hidden" aria-hidden="true">
              <label htmlFor="course-company">Company</label>
              <input
                id="course-company"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First Name"
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-accent-blue"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-accent-blue"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="course-enquiry-email"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-accent-blue"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink">Programme</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-accent-blue"
              >
                {allCourses.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
            {enquiryError && (
              <p
                className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700"
                role="alert"
              >
                {enquiryError}
              </p>
            )}
            <button
              type="submit"
              disabled={enquiryLoading}
              className="w-full rounded-xl bg-accent-blue py-2.5 text-sm font-extrabold text-white shadow-md shadow-accent-blue/30 hover:bg-accent-blue-deep disabled:cursor-not-allowed disabled:opacity-70"
            >
              {enquiryLoading ? "Sending…" : "Register your interest"}
            </button>
          </form>
        )}
      </div>

      <div className="rounded-2xl border border-accent-blue/25 bg-[#f0f8fd] p-5 card-shadow">
        <h3 className="font-semibold text-accent-blue-deep">Next steps</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink">
          Register your interest and our admissions team will share programme details,
          entry guidance, and fee options with you directly.
        </p>
        <Link
          to="/contact"
          className="mt-4 inline-flex rounded-full bg-accent-blue px-5 py-2.5 text-sm font-extrabold text-white hover:bg-accent-blue-deep"
        >
          Register your interest
        </Link>
      </div>

      <div className="rounded-2xl border border-line bg-white p-5 card-shadow">
        <h3 className="font-semibold text-ink">Need More Information?</h3>
        <p className="mt-2 text-sm text-muted">
          Our friendly admissions advisors are here to help with guidance tailored to
          your goals.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-ink">
          <li>Email: {site.email}</li>
          <li>Call us: {site.phone}</li>
        </ul>
      </div>
    </aside>
  );
}
