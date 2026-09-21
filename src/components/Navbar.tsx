import { Link } from "react-router-dom";
import { useState } from "react";
import { MessageCircle, Menu, Sparkles, X } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { PaymentBrandRow } from "@/components/PaymentBrands";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/contact", label: "Contact Us" },
];

const navLinkClass = (overlay: boolean) =>
  `text-lg font-bold tracking-wide transition lg:text-xl ${
    overlay ? "text-navy hover:text-accent-blue-deep" : "text-ink hover:text-accent-blue-deep"
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
          ? "absolute inset-x-0 top-0 border-b border-line/80 bg-white/90 backdrop-blur-md"
          : "sticky top-0 border-b border-line bg-white/95 backdrop-blur-md"
      } z-50 ${className}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 lg:gap-4 lg:px-8 lg:py-3">
        <BrandLogo size="lg" />

        <nav className="hidden items-center gap-5 md:flex lg:gap-7">
          {links.map((l) => (
            <Link key={l.label} to={l.href} className={navLinkClass(overlay)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Enquire Now */}
          <Link
            to="/contact"
            className="cta-enquire group relative hidden overflow-hidden rounded-full sm:inline-flex"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#5ec2ff] via-[#3ba8ef] to-[#2b8fd8]" />
            <span className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-gradient-to-r from-[#2b8fd8] via-[#3ba8ef] to-[#5ec2ff]" />
            <span className="cta-shine" aria-hidden />
            <span className="relative flex items-center gap-2 px-4 py-2.5 text-sm font-extrabold tracking-wide text-white lg:px-5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/40 backdrop-blur-sm">
                <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
              </span>
              Enquire Now
              <Sparkles className="hidden h-3.5 w-3.5 animate-pulse lg:block" aria-hidden />
            </span>
          </Link>

          {/* Pay Now — PayPal + Stripe */}
          <Link
            to="/pay"
            className="cta-pay group relative hidden overflow-hidden rounded-2xl sm:inline-flex"
            aria-label="Pay now with PayPal or Stripe"
          >
            <span className="absolute inset-0 bg-gradient-to-br from-[#1e6bb8] via-[#2f8fd4] to-[#56b7f5]" />
            <span className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/15 blur-xl transition group-hover:bg-white/25" aria-hidden />
            <span className="cta-shine" aria-hidden />
            <span className="relative flex items-center gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2">
              <span className="flex flex-col leading-tight">
                <span className="text-[11px] font-black uppercase tracking-[0.14em] text-white">
                  Pay Now
                </span>
                <span className="text-[9px] font-semibold text-white/85">
                  Secure checkout
                </span>
              </span>
              <span className="h-8 w-px bg-white/25" aria-hidden />
              <PaymentBrandRow compact />
            </span>
          </Link>

          <button
            type="button"
            className="rounded-lg p-2 text-navy md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-white px-4 py-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.href}
              className="block py-2.5 text-base font-bold text-ink"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/pay"
            className="cta-pay group relative mt-3 flex w-full overflow-hidden rounded-2xl"
            onClick={() => setOpen(false)}
          >
            <span className="absolute inset-0 bg-gradient-to-br from-[#1e6bb8] via-[#2f8fd4] to-[#56b7f5]" />
            <span className="relative flex w-full items-center justify-between gap-3 px-4 py-3.5">
              <span className="text-left">
                <span className="block text-sm font-extrabold uppercase tracking-wide text-white">
                  Pay Now
                </span>
                <span className="block text-xs font-medium text-white/85">
                  PayPal &amp; Stripe accepted
                </span>
              </span>
              <PaymentBrandRow />
            </span>
          </Link>
          <Link
            to="/contact"
            className="cta-enquire group relative mt-2.5 flex w-full overflow-hidden rounded-full"
            onClick={() => setOpen(false)}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#5ec2ff] via-[#3ba8ef] to-[#2b8fd8]" />
            <span className="relative flex w-full items-center justify-center gap-2 px-5 py-3.5 text-sm font-extrabold text-white">
              <MessageCircle className="h-4 w-4" strokeWidth={2.5} aria-hidden />
              Enquire Now
            </span>
          </Link>
        </div>
      )}
    </header>
  );
}
