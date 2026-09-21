/** Official-style PayPal glyph */
export function PayPalIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#003087"
        d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.79A.77.77 0 0 1 5.704 2.1h6.426c2.163 0 3.73.54 4.543 1.566.74.933.85 2.16.33 3.68l-.03.09v.3c.55 0 1.05.03 1.5.12 1.55.3 2.52 1.14 2.76 2.58.15.9.03 1.95-.36 3.03-.45 1.26-1.17 2.31-2.1 3.03-.87.66-1.95 1.05-3.21 1.14-.66.06-1.32.06-2.04.06H11.1a.9.9 0 0 0-.9.75l-.6 3.81-.03.15a.48.48 0 0 1-.48.42H7.076z"
      />
      <path
        fill="#009cde"
        d="M18.54 7.8c-.03.15-.06.3-.12.48-.75 3.84-3.3 5.16-6.54 5.16H9.96a.9.9 0 0 0-.9.75l-.96 6.09-.24 1.53a.42.42 0 0 0 .42.48h2.94c.36 0 .66-.27.72-.63l.03-.15.57-3.63.03-.21a.72.72 0 0 1 .72-.63h.45c2.94 0 5.25-1.2 5.91-4.65.3-1.44.15-2.64-.63-3.48-.21-.24-.48-.42-.78-.54z"
      />
    </svg>
  );
}

/** Stripe mark */
export function StripeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect width="24" height="24" rx="5" fill="#635bff" />
      <path
        fill="#fff"
        d="M11.3 9.45c0-.72.6-1.02 1.56-1.02 1.4 0 3.18.42 4.56 1.2V6.3A11.4 11.4 0 0 0 12.8 5.1c-3.42 0-5.7 1.8-5.7 4.8 0 4.68 6.42 3.96 6.42 6 0 .84-.72 1.14-1.74 1.14-1.5 0-3.42-.63-4.92-1.5v3.42c1.62.7 3.24 1.02 4.92 1.02 3.54 0 5.94-1.74 5.94-4.8-.06-5.04-6.42-4.14-6.42-5.73z"
      />
    </svg>
  );
}

export function PaymentBrandRow({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center ${compact ? "gap-1" : "gap-1.5"}`}
      aria-label="PayPal and Stripe accepted"
    >
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-black/5 transition group-hover:scale-105">
        <PayPalIcon className="h-[15px] w-[15px]" />
      </span>
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-black/5 transition group-hover:scale-105">
        <StripeIcon className="h-[15px] w-[15px]" />
      </span>
    </span>
  );
}
