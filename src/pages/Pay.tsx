import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { enrollableCourses } from "@/data/msbt";
import { submitEnquiry } from "@/lib/enquiry";

export default function Pay() {
  const programmes = useMemo(() => enrollableCourses(), []);
  const [courseSlug, setCourseSlug] = useState(programmes[0]?.slug ?? "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const course = useMemo(
    () => programmes.find((item) => item.slug === courseSlug) ?? programmes[0],
    [courseSlug, programmes],
  );

  if (!course) return null;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Enter your full name to continue.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Enter a valid email address to continue.");
      return;
    }
    if (!phone.trim()) {
      setError("Enter your phone number to continue.");
      return;
    }
    if (!confirmed) {
      setError("Please confirm you would like admissions to contact you.");
      return;
    }

    setLoading(true);
    try {
      await submitEnquiry({
        type: "contact",
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject: "Register your interest — fees & enrolment",
        programme: course.title,
        message: `Register interest for ${course.title}. Please share programme and fee guidance.`,
      });
      setDone(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to send your interest right now.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="relative overflow-hidden border-b border-line bg-white py-12 text-ink">
        <div className="relative mx-auto max-w-6xl px-4 text-center lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-blue/40 bg-accent-blue/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-accent-blue-deep shadow-sm">
            <Sparkles className="h-4 w-4" />
            Admissions
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold text-navy md:text-5xl">
            Register your interest
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted md:text-base">
            Tell us which programme you are considering. Our admissions team will contact
            you with guidance, entry information, and next steps.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_360px] lg:px-8">
        {done ? (
          <div className="rounded-3xl border border-line bg-white p-8 text-center shadow-[0_18px_55px_rgba(15,31,61,0.1)]">
            <CheckCircle2 className="mx-auto h-12 w-12 text-teal" />
            <h2 className="mt-4 text-2xl font-extrabold text-ink">Interest registered</h2>
            <p className="mt-2 text-muted">
              Thank you — admissions will be in touch shortly about {course.title}.
            </p>
            <Link
              to="/courses"
              className="mt-6 inline-flex rounded-full bg-accent-blue px-6 py-3 text-sm font-extrabold text-white hover:bg-accent-blue-deep"
            >
              Browse programmes
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-line bg-white p-6 shadow-[0_18px_55px_rgba(15,31,61,0.1)] md:p-8"
          >
            <h2 className="text-xl font-extrabold text-ink">Your details</h2>
            <p className="text-sm text-muted">Fields marked * are required.</p>

            <div className="mt-6 space-y-5">
              <div>
                <label htmlFor="interest-course" className="text-sm font-bold text-ink">
                  Select programme *
                </label>
                <select
                  id="interest-course"
                  required
                  value={courseSlug}
                  onChange={(event) => {
                    setCourseSlug(event.target.value);
                    setError("");
                  }}
                  className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-accent-blue focus:ring-4 focus:ring-accent-blue/10"
                >
                  {programmes.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="interest-name" className="text-sm font-bold text-ink">
                    Full name *
                  </label>
                  <input
                    id="interest-name"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none transition focus:border-accent-blue focus:ring-4 focus:ring-accent-blue/10"
                  />
                </div>
                <div>
                  <label htmlFor="interest-email" className="text-sm font-bold text-ink">
                    Email address *
                  </label>
                  <input
                    id="interest-email"
                    required
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none transition focus:border-accent-blue focus:ring-4 focus:ring-accent-blue/10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="interest-phone" className="text-sm font-bold text-ink">
                  Phone number *
                </label>
                <input
                  id="interest-phone"
                  required
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  autoComplete="tel"
                  className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none transition focus:border-accent-blue focus:ring-4 focus:ring-accent-blue/10"
                />
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-[#f5f5f5] p-4 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(event) => setConfirmed(event.target.checked)}
                  className="mt-0.5 accent-accent-blue"
                />
                <span>
                  I would like MSBT Admissions to contact me about this programme.
                </span>
              </label>

              {error && (
                <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-accent-blue to-accent-blue-deep px-5 py-4 text-white shadow-[0_14px_34px_rgba(75,168,232,0.35)] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent-blue/25 disabled:cursor-wait disabled:opacity-70"
              >
                <span className="relative flex items-center justify-center gap-3 font-extrabold">
                  {loading ? (
                    <LoaderCircle className="h-6 w-6 animate-spin" />
                  ) : (
                    <>
                      Register your interest
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        )}

        <aside className="h-fit rounded-3xl border border-line bg-white p-6 shadow-[0_18px_55px_rgba(15,31,61,0.1)] lg:sticky lg:top-24">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-accent-blue-deep">
            Selected programme
          </p>
          <h2 className="mt-3 text-lg font-extrabold text-ink">{course.title}</h2>
          <p className="mt-1 text-sm text-muted">{course.level}</p>
          <p className="mt-5 text-base font-extrabold text-accent-blue-deep">
            Register your interest
          </p>
          <p className="mt-2 text-sm text-muted">
            Fee details are shared personally by Admissions after you register your
            interest.
          </p>
        </aside>
      </section>

      <Footer />
    </main>
  );
}
