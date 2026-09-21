import { useState } from "react";
import { CreditCard, LoaderCircle, LockKeyhole, Sparkles } from "lucide-react";
import type { Course } from "@/data/msbt";
import {
  courseListForEnquiry,
  formatGBP,
  saveAmount,
  site,
} from "@/data/msbt";
import { startCheckout, type CheckoutProvider } from "@/lib/checkout";
import { submitEnquiry } from "@/lib/enquiry";
import { PayPalIcon, StripeIcon } from "@/components/PaymentBrands";

type PaymentOption = "fast" | "full" | "instalment";

export default function CourseSidebar({ course }: { course: Course }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(course.slug);
  const [company, setCompany] = useState("");
  const [payment, setPayment] = useState<PaymentOption>("fast");
  const [provider, setProvider] = useState<CheckoutProvider>("paypal");
  const [submitted, setSubmitted] = useState(false);
  const [enquiryLoading, setEnquiryLoading] = useState(false);
  const [enquiryError, setEnquiryError] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const { pricing } = course;
  const save = saveAmount(pricing);
  const allCourses = courseListForEnquiry();
  const checkoutResult = new URLSearchParams(window.location.search).get("checkout");

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
        message: course.proposed
          ? `Register interest (proposed OTHM) for ${programmeTitle}.`
          : `Course page enquiry for ${programmeTitle}.`,
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

  async function handleCheckout() {
    setCheckoutError("");
    if (!email.trim() || !email.includes("@")) {
      setCheckoutError("Enter your email address in the enquiry form before paying.");
      document.getElementById("course-enquiry-email")?.focus();
      return;
    }

    setCheckoutLoading(true);
    try {
      const checkoutUrl = await startCheckout({
        courseSlug: course.slug,
        paymentOption: payment === "instalment" ? "deposit" : "full",
        provider,
        customerEmail: email.trim(),
        customerName: name.trim(),
        customerPhone: phone.trim(),
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
        <h3 className="font-semibold text-ink">
          {course.proposed ? "Register Your Interest" : "Course Enquiry"}
        </h3>
        <p className="mt-1 text-xs text-muted">
          {course.proposed
            ? "Express interest only — this programme is not open for enrolment yet."
            : (
              <>
                All fields marked <span className="text-red-500">*</span> must be completed.
              </>
            )}
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
              <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700" role="alert">
                {enquiryError}
              </p>
            )}
            <button
              type="submit"
              disabled={enquiryLoading}
              className="w-full rounded-xl bg-accent-blue py-2.5 text-sm font-extrabold text-white shadow-md shadow-accent-blue/30 hover:bg-accent-blue-deep disabled:cursor-not-allowed disabled:opacity-70"
            >
              {enquiryLoading
                ? "Sending…"
                : course.proposed
                  ? "Register Your Interest"
                  : "Submit Enquiry"}
            </button>
          </form>
        )}
      </div>

      {!course.proposed && (
      <>
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
        <div className="border-b border-line bg-[#f5f5f5] px-5 py-3">
          <h3 className="font-semibold text-navy">Pay course fee</h3>
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
                className="accent-accent-blue"
              />
              {label}
            </label>
          ))}
          <p className="pt-2 text-sm font-medium text-ink">Pay with</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setProvider("paypal")}
              className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-bold transition ${
                provider === "paypal"
                  ? "border-accent-blue bg-accent-blue/10 text-accent-blue-deep ring-2 ring-accent-blue/20"
                  : "border-line text-ink hover:border-accent-blue/40"
              }`}
            >
              <PayPalIcon className="h-4 w-4" />
              PayPal
            </button>
            <button
              type="button"
              disabled
              title="Stripe will be enabled once the MSBT Stripe account is connected"
              className="flex cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-line bg-[#f7f7f7] px-3 py-2.5 text-sm font-bold text-muted opacity-70"
            >
              <StripeIcon className="h-4 w-4" />
              Stripe soon
            </button>
          </div>
          <p className="text-xs font-medium text-muted">
            PayPal deposits fees directly into the official MSBT merchant account.
          </p>
          <div className="rounded-xl bg-[#f5f5f5] p-3">
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
            className="group relative isolate w-full overflow-hidden rounded-2xl bg-gradient-to-br from-accent-blue to-accent-blue-deep px-5 py-4 text-white shadow-[0_12px_30px_rgba(75,168,232,0.4)] transition duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent-blue/30 disabled:cursor-wait disabled:opacity-70"
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
                <span className="mt-0.5 flex items-center gap-1 text-xs font-medium text-white/95">
                  <LockKeyhole className="h-3 w-3" aria-hidden="true" />
                  Opens official {provider === "paypal" ? "PayPal" : "Stripe"} checkout
                </span>
              </span>
            </span>
          </button>
          <p className="text-center text-xs text-muted">
            {payment === "instalment"
              ? "Pay the initial deposit on Stripe or PayPal. Admissions will arrange remaining instalments."
              : `You will be redirected to the official ${provider === "paypal" ? "PayPal" : "Stripe"} website to complete payment.`}
          </p>
        </div>
      </div>
      </>
      )}

      {course.proposed && (
        <div className="rounded-2xl border border-accent-blue/25 bg-[#f0f8fd] p-5 card-shadow">
          <h3 className="font-semibold text-accent-blue-deep">Enrolment not open</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink">
            This is a proposed OTHM programme. Fees cannot be paid and learners cannot be
            enrolled until MSBT receives written OTHM centre and qualification approval.
          </p>
        </div>
      )}

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
