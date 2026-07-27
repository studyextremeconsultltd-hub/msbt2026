import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  LoaderCircle,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { courses, formatGBP } from "@/data/msbt";
import {
  startStripeCheckout,
  type CheckoutPaymentOption,
} from "@/lib/checkout";

export default function Pay() {
  const [courseSlug, setCourseSlug] = useState(courses[0]?.slug ?? "");
  const [paymentOption, setPaymentOption] =
    useState<CheckoutPaymentOption>("full");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const course = useMemo(
    () => courses.find((item) => item.slug === courseSlug) ?? courses[0],
    [courseSlug],
  );

  if (!course) return null;

  const amount =
    paymentOption === "deposit"
      ? course.pricing.deposit
      : course.pricing.discounted;

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
      setError("Please confirm the selected course and payment amount.");
      return;
    }

    setLoading(true);
    try {
      const checkoutUrl = await startStripeCheckout({
        courseSlug: course.slug,
        paymentOption,
        customerEmail: email.trim(),
        customerName: name.trim(),
        customerPhone: phone.trim(),
      });
      window.location.assign(checkoutUrl);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Secure checkout is unavailable right now.",
      );
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      <section className="relative overflow-hidden bg-navy py-12 text-white">
        <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-orange/30 blur-3xl" />
        <div className="absolute -bottom-36 left-1/4 h-72 w-72 rounded-full bg-teal/40 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 text-center lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-gold-light backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Secure course payment
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            Pay your MSBT course fee
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/80 md:text-base">
            Enter your details, confirm your programme and continue to Stripe’s
            secure card-payment page.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_360px] lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-line bg-white p-6 shadow-[0_18px_55px_rgba(15,31,61,0.1)] md:p-8"
        >
          <div className="flex items-center gap-3 border-b border-line pb-5">
            <span className="rounded-2xl bg-orange/10 p-3 text-orange">
              <CreditCard className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-ink">Payment details</h2>
              <p className="text-sm text-muted">Fields marked * are required.</p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="pay-course" className="text-sm font-bold text-ink">
                Select course *
              </label>
              <select
                id="pay-course"
                required
                value={courseSlug}
                onChange={(event) => {
                  setCourseSlug(event.target.value);
                  setError("");
                }}
                className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-orange focus:ring-4 focus:ring-orange/10"
              >
                {courses.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            <fieldset>
              <legend className="text-sm font-bold text-ink">Payment option *</legend>
              <div className="mt-2 grid gap-3 sm:grid-cols-2">
                {(
                  [
                    [
                      "full",
                      "Full payment",
                      course.pricing.discounted,
                      "Discounted course fee",
                    ],
                    [
                      "deposit",
                      "Initial deposit",
                      course.pricing.deposit,
                      "Remaining instalments arranged by Admissions",
                    ],
                  ] as const
                ).map(([value, label, price, description]) => (
                  <label
                    key={value}
                    className={`cursor-pointer rounded-2xl border p-4 transition ${
                      paymentOption === value
                        ? "border-orange bg-orange/5 ring-2 ring-orange/15"
                        : "border-line hover:border-gold"
                    }`}
                  >
                    <span className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="payment-option"
                        value={value}
                        checked={paymentOption === value}
                        onChange={() => {
                          setPaymentOption(value);
                          setError("");
                        }}
                        className="mt-1 accent-orange"
                      />
                      <span>
                        <span className="block text-sm font-bold text-ink">{label}</span>
                        <span className="block text-lg font-extrabold text-orange">
                          {formatGBP(price)}
                        </span>
                        <span className="block text-xs text-muted">{description}</span>
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="pay-name" className="text-sm font-bold text-ink">
                  Full name *
                </label>
                <input
                  id="pay-name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  placeholder="Your full name"
                  className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none transition focus:border-orange focus:ring-4 focus:ring-orange/10"
                />
              </div>
              <div>
                <label htmlFor="pay-email" className="text-sm font-bold text-ink">
                  Email address *
                </label>
                <input
                  id="pay-email"
                  required
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none transition focus:border-orange focus:ring-4 focus:ring-orange/10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="pay-phone" className="text-sm font-bold text-ink">
                Phone number *
              </label>
              <input
                id="pay-phone"
                required
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                autoComplete="tel"
                placeholder="+44 ..."
                className="mt-2 w-full rounded-xl border border-line px-4 py-3 text-sm outline-none transition focus:border-orange focus:ring-4 focus:ring-orange/10"
              />
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-cream p-4 text-sm text-ink">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(event) => setConfirmed(event.target.checked)}
                className="mt-0.5 accent-orange"
              />
              <span>
                I confirm that I selected the correct course and understand the
                payment amount shown in the order summary.
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
              className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-orange via-[#ff7a18] to-teal px-5 py-4 text-white shadow-[0_14px_34px_rgba(232,108,42,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(26,107,107,0.36)] focus:outline-none focus-visible:ring-4 focus-visible:ring-orange/25 disabled:cursor-wait disabled:opacity-70"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative flex items-center justify-center gap-3">
                {loading ? (
                  <LoaderCircle className="h-6 w-6 animate-spin" />
                ) : (
                  <LockKeyhole className="h-6 w-6" />
                )}
                <span className="font-extrabold">
                  {loading ? "Preparing Stripe Checkout…" : `Continue to pay ${formatGBP(amount)}`}
                </span>
                {!loading && <ArrowRight className="h-5 w-5" />}
              </span>
            </button>
          </div>
        </form>

        <aside className="h-fit rounded-3xl border border-line bg-white p-6 shadow-[0_18px_55px_rgba(15,31,61,0.1)] lg:sticky lg:top-24">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange">
            Order summary
          </p>
          <h2 className="mt-3 text-lg font-extrabold text-ink">{course.title}</h2>
          <p className="mt-1 text-sm text-muted">{course.level}</p>

          <div className="my-5 border-y border-line py-5">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted">
                {paymentOption === "deposit" ? "Initial deposit" : "Full course fee"}
              </span>
              <span className="text-2xl font-extrabold text-orange">
                {formatGBP(amount)}
              </span>
            </div>
          </div>

          <div className="space-y-3 text-sm text-muted">
            <p className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
              Card details are entered securely on Stripe, not stored by MSBT.
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
              The checkout amount is validated securely by the MSBT payment server.
            </p>
            <p className="flex items-start gap-2">
              <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
              Payment is processed in GBP through an encrypted connection.
            </p>
          </div>
        </aside>
      </section>

      <Footer />
    </main>
  );
}
