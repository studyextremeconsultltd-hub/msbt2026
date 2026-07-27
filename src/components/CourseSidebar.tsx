import { useState } from "react";
import { CreditCard, LoaderCircle, LockKeyhole, Sparkles } from "lucide-react";
import type { Course } from "@/data/msbt";
import {
  courseListForEnquiry,
  formatGBP,
  saveAmount,
  site,
} from "@/data/msbt";
import { startStripeCheckout } from "@/lib/checkout";

type PaymentOption = "fast" | "full" | "instalment";

export default function CourseSidebar({ course }: { course: Course }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(course.slug);
  const [payment, setPayment] = useState<PaymentOption>("fast");
  const [submitted, setSubmitted] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const { pricing } = course;
  const save = saveAmount(pricing);
  const allCourses = courseListForEnquiry();
  const checkoutResult = new URLSearchParams(window.location.search).get("checkout");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) return;
    setSubmitted(true);
  }

  async function handleCheckout() {
    setCheckoutError("");
    if (!email.trim() || !email.includes("@")) {
      setCheckoutError("Enter your email address in the enquiry form before paying.");
      document.getElementById("course-enquiry-email")?.focus();
      return;
    }

    setCheckoutLoading(true);
    try {
      const checkoutUrl = await startStripeCheckout({
        courseSlug: course.slug,
        paymentOption: payment === "instalment" ? "deposit" : "full",
        customerEmail: email.trim(),
        customerName: name.trim(),
      });
      window.location.assign(checkoutUrl);
    } catch (error) {
      setCheckoutError(
        error instanceof Error
          ? error.message
          : "Secure checkout is unavailable right now.",
      );
      setCheckoutLoading(false);
    }
  }

  return (
    <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
      {/* Box 1 — Enquiry */}
      <div className="rounded-2xl border border-line bg-white p-5 card-shadow">
        <h3 className="font-semibold text-ink">Course Enquiry</h3>
        <p className="mt-1 text-xs text-muted">
          All fields marked <span className="text-red-500">*</span> must be completed.
        </p>
        {submitted ? (
          <p className="mt-4 rounded-xl bg-teal/10 p-4 text-sm text-teal">
            Thank you — our admissions team will be in touch shortly.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div>
              <label className="text-xs font-medium text-ink">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First Name"
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy"
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
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy"
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
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-ink">Course Enquiry</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy"
              >
                {allCourses.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-navy py-2.5 text-sm font-semibold text-white hover:bg-navy/90"
            >
              Submit Enquiry
            </button>
          </form>
        )}
      </div>

      {/* Box 2 — Payment Details */}
      <div className="rounded-2xl border border-line bg-white p-5 card-shadow">
        <h3 className="font-semibold text-ink">Course Payment Details</h3>
        <table className="mt-4 w-full text-sm">
          <tbody>
            <tr className="border-b border-line">
              <td className="py-2 text-muted">Regular fee</td>
              <td className="py-2 text-right line-through text-muted">
                {formatGBP(pricing.regular)}
              </td>
            </tr>
            <tr className="border-b border-line">
              <td className="py-2 font-medium text-ink">Discounted fee</td>
              <td className="py-2 text-right font-bold text-orange">
                {formatGBP(pricing.discounted)}
              </td>
            </tr>
            <tr>
              <td className="py-2 text-muted">Instalment Plan</td>
              <td className="py-2 text-right text-ink">
                Initial Deposit: {formatGBP(pricing.deposit)}
                <br />
                {pricing.instalments} Monthly Instalments of{" "}
                {formatGBP(pricing.instalmentAmount)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Box 3 — Enrol Now */}
      <div className="overflow-hidden rounded-2xl border border-line bg-white card-shadow">
        <div className="bg-navy px-5 py-3">
          <h3 className="font-semibold text-white">Enrol Now</h3>
        </div>
        <div className="space-y-4 p-5">
          {checkoutResult === "success" && (
            <p className="rounded-xl border border-teal/20 bg-teal/10 p-3 text-sm font-medium text-teal">
              Stripe checkout completed. MSBT Admissions will confirm your payment shortly.
            </p>
          )}
          {checkoutResult === "cancel" && (
            <p className="rounded-xl border border-orange/20 bg-orange/10 p-3 text-sm text-ink">
              Checkout was cancelled. No payment was taken—you can try again below.
            </p>
          )}
          <p className="text-sm font-medium text-ink">Course Options</p>
          {(
            [
              ["fast", "Full Payment (Fast Track)"],
              ["full", "Full Payment"],
              ["instalment", "Instalment Plan"],
            ] as const
          ).map(([val, label]) => (
            <label key={val} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                name="payment"
                checked={payment === val}
                onChange={() => setPayment(val)}
                className="accent-navy"
              />
              {label}
            </label>
          ))}
          <div className="rounded-xl bg-cream p-3">
            <span className="text-sm line-through text-muted">
              {formatGBP(pricing.regular)}
            </span>{" "}
            <span className="text-lg font-bold text-ink">
              {payment === "instalment"
                ? `${formatGBP(pricing.deposit)} + ${pricing.instalments}×${formatGBP(pricing.instalmentAmount)}`
                : formatGBP(pricing.discounted)}
            </span>
            {payment !== "instalment" && save > 0 && (
              <span className="ml-2 rounded-full bg-orange/15 px-2 py-0.5 text-xs font-semibold text-orange">
                Save {formatGBP(save)}
              </span>
            )}
          </div>
          {checkoutError && (
            <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
              {checkoutError}
            </p>
          )}
          <button
            type="button"
            onClick={handleCheckout}
            disabled={checkoutLoading}
            className="group relative isolate w-full overflow-hidden rounded-2xl bg-gradient-to-r from-orange via-[#ff7a18] to-teal px-5 py-4 text-white shadow-[0_12px_30px_rgba(239,108,0,0.32)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(0,122,120,0.35)] focus:outline-none focus-visible:ring-4 focus-visible:ring-orange/30 disabled:cursor-wait disabled:opacity-70"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative flex items-center justify-center gap-3">
              {checkoutLoading ? (
                <LoaderCircle className="h-6 w-6 animate-spin" aria-hidden="true" />
              ) : (
                <CreditCard className="h-6 w-6" aria-hidden="true" />
              )}
              <span className="text-left">
                <span className="flex items-center gap-1.5 text-base font-extrabold tracking-wide">
                  {checkoutLoading
                    ? "Preparing Checkout…"
                    : payment === "instalment"
                      ? `Pay ${formatGBP(pricing.deposit)} Deposit`
                      : `Pay Now — ${formatGBP(pricing.discounted)}`}
                  {!checkoutLoading && <Sparkles className="h-4 w-4" aria-hidden="true" />}
                </span>
                <span className="mt-0.5 flex items-center gap-1 text-xs font-medium text-white/90">
                  <LockKeyhole className="h-3 w-3" aria-hidden="true" />
                  Secure checkout powered by Stripe
                </span>
              </span>
            </span>
          </button>
          <p className="text-center text-xs text-muted">
            {payment === "instalment"
              ? "Pay the initial deposit securely. Admissions will arrange the remaining monthly instalments."
              : "You will be redirected to Stripe to complete your card payment."}
          </p>
        </div>
      </div>

      {/* Box 4 — Need More Info */}
      <div className="rounded-2xl border border-line bg-white p-5 card-shadow">
        <h3 className="font-semibold text-ink">Need More Information?</h3>
        <p className="mt-2 text-sm text-muted">
          Our friendly admissions advisors are here to help. They will provide expert
          guidance tailored to your individual needs and career goals.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-ink">
          <li>Email: {site.email}</li>
          <li>Call us: {site.phone}</li>
          <li>WhatsApp: {site.whatsapp}</li>
        </ul>
      </div>
    </aside>
  );
}
