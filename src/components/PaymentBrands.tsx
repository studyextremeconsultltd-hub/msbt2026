/** Compact PayPal wordmark for CTAs */
export function PayPalMark({ className = "h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 16" className={className} aria-hidden>
      <text
        x="0"
        y="12.5"
        fill="#003087"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="12"
      >
        Pay
      </text>
      <text
        x="24"
        y="12.5"
        fill="#009cde"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="12"
      >
        Pal
      </text>
    </svg>
  );
}

/** Compact Stripe wordmark for CTAs */
export function StripeMark({ className = "h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 42 16" className={className} aria-hidden>
      <text
        x="0"
        y="12.5"
        fill="#635bff"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="800"
        fontSize="12"
        letterSpacing="-0.3"
      >
        stripe
      </text>
    </svg>
  );
}

export function PaymentBrandRow({
  tone = "light",
}: {
  tone?: "light" | "onBlue";
}) {
  const chip =
    tone === "onBlue"
      ? "bg-white/95 text-ink"
      : "bg-white border border-line text-ink";

  return (
    <span className="mt-1 flex items-center gap-1.5">
      <span className={`inline-flex items-center rounded px-1.5 py-0.5 ${chip}`}>
        <PayPalMark />
      </span>
      <span className={`inline-flex items-center rounded px-1.5 py-0.5 ${chip}`}>
        <StripeMark />
      </span>
    </span>
  );
}
