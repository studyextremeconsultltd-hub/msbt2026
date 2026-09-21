import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "msbt-cookie-consent";

type Consent = "accepted" | "essential";

function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === "accepted" || value === "essential") return value;
  } catch {
    /* ignore */
  }
  return null;
}

function writeConsent(value: Consent) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* ignore */
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!readConsent()) setVisible(true);
  }, []);

  function choose(value: Consent) {
    writeConsent(value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-line bg-white p-5 shadow-[0_20px_60px_rgba(15,31,61,0.18)] sm:flex-row sm:items-center sm:p-6">
        <div className="flex min-w-0 flex-1 gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-blue/15 text-accent-blue-deep">
            <Cookie className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-base font-bold text-ink">We use cookies</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              MSBT uses essential cookies to run the site and optional cookies to
              understand performance. See our{" "}
              <Link to="/about#governance" className="font-semibold text-accent-blue-deep underline-offset-2 hover:underline">
                Cookie Policy
              </Link>{" "}
              for details.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
          <button
            type="button"
            onClick={() => choose("essential")}
            className="rounded-full border border-line bg-white px-4 py-2.5 text-sm font-bold text-ink transition hover:border-navy/30"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-full bg-accent-blue px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-accent-blue/30 transition hover:bg-accent-blue-deep"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={() => choose("essential")}
            className="rounded-lg p-2 text-muted hover:text-ink sm:hidden"
            aria-label="Dismiss cookie notice"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
