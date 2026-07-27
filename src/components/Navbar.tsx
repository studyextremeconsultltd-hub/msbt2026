import { Link } from "react-router-dom";
import { useState } from "react";
import { CreditCard, Menu, Sparkles, X } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/contact", label: "Contact Us" },
];

const navLinkClass = (overlay: boolean) =>
  `text-lg font-bold tracking-wide transition lg:text-xl ${
    overlay ? "on-image-text hover:text-gold" : "text-ink hover:text-navy"
  }`;

export default function Navbar({
  overlay = false,
  className = "",
}: {
  overlay?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`${
        overlay
          ? "absolute inset-x-0 top-0 border-b border-gold/25 bg-navy/55 backdrop-blur-md"
          : "sticky top-0 border-b border-gold/20 bg-white/95 backdrop-blur-md"
      } z-50 ${className}`}
    >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8 lg:py-3.5">
          <BrandLogo overlay={overlay} size="lg" />

          <nav className="hidden items-center gap-5 md:flex lg:gap-8">
            {links.map((l) => (
              <Link key={l.label} to={l.href} className={navLinkClass(overlay)}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              to="/courses"
              className="hidden rounded-full bg-orange px-4 py-2.5 text-sm font-bold text-white shadow-md ring-2 ring-gold/30 transition hover:bg-orange/90 lg:inline-flex"
            >
              Enquire Now
            </Link>
            <Link
              to="/pay"
              className="group relative hidden overflow-hidden rounded-full bg-gradient-to-r from-navy via-[#2a3544] to-gold px-3 py-1.5 text-white shadow-[0_7px_22px_rgba(26,35,46,0.4)] ring-2 ring-gold/40 transition hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_10px_28px_rgba(197,160,89,0.45)] sm:inline-flex"
              aria-label="Pay course fees securely with Stripe"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative flex items-center gap-2">
                <span className="relative rounded-full bg-white/20 p-1">
                  <span className="absolute -right-0.5 -top-0.5 h-2 w-2 animate-pulse rounded-full bg-white ring-2 ring-orange" />
                  <CreditCard className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-left leading-tight">
                  <span className="flex items-center gap-1 text-xs font-black uppercase tracking-wide">
                    Pay Now <Sparkles className="h-3 w-3 animate-pulse" aria-hidden="true" />
                  </span>
                  <span className="text-[9px] font-semibold text-white/90">
                    Secure checkout
                  </span>
                </span>
              </span>
            </Link>
            <button
              type="button"
              className={`rounded-lg p-2 md:hidden ${overlay ? "on-image-text" : "text-ink"}`}
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {open && (
          <div
            className={`border-t px-4 py-4 md:hidden ${
              overlay ? "border-gold/20 bg-navy/95 backdrop-blur-sm" : "border-line bg-white"
            }`}
          >
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.href}
                className={`block py-2.5 text-base font-bold ${
                  overlay ? "text-white" : "text-ink"
                }`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/pay"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-navy via-[#2a3544] to-gold px-5 py-3 text-center text-sm font-extrabold text-white shadow-lg"
              onClick={() => setOpen(false)}
            >
              <CreditCard className="h-5 w-5" />
              Pay Now — Secure Stripe Checkout
            </Link>
            <Link
              to="/courses"
              className="mt-3 block rounded-full border border-orange bg-white px-5 py-3 text-center text-sm font-bold text-orange"
              onClick={() => setOpen(false)}
            >
              Enquire Now
            </Link>
          </div>
        )}
    </header>
  );
}
