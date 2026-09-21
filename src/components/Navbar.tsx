import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
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

const enquireBtn =
  "inline-flex items-center justify-center rounded-full bg-accent-blue px-5 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-accent-blue/35 ring-2 ring-accent-blue/25 transition hover:-translate-y-0.5 hover:bg-accent-blue-deep hover:shadow-xl hover:shadow-accent-blue/40";

const payBtn =
  "group relative inline-flex flex-col items-start justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-accent-blue to-accent-blue-deep px-3.5 py-1.5 text-white shadow-lg shadow-accent-blue/40 ring-2 ring-white/40 transition hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-xl";

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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 lg:px-8 lg:py-3">
        <BrandLogo size="lg" />

        <nav className="hidden items-center gap-5 md:flex lg:gap-8">
          {links.map((l) => (
            <Link key={l.label} to={l.href} className={navLinkClass(overlay)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link to="/contact" className={`hidden lg:inline-flex ${enquireBtn}`}>
            Enquire Now
          </Link>
          <Link to="/pay" className={`hidden sm:inline-flex ${payBtn}`} aria-label="Pay now with PayPal or Stripe">
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative text-[11px] font-black uppercase tracking-wide">Pay Now</span>
            <PaymentBrandRow tone="onBlue" />
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
            className="mt-3 flex w-full flex-col items-center rounded-2xl bg-gradient-to-br from-accent-blue to-accent-blue-deep px-5 py-3 text-center text-white shadow-lg"
            onClick={() => setOpen(false)}
          >
            <span className="text-sm font-extrabold uppercase tracking-wide">Pay Now</span>
            <PaymentBrandRow tone="onBlue" />
          </Link>
          <Link
            to="/contact"
            className={`mt-3 w-full ${enquireBtn}`}
            onClick={() => setOpen(false)}
          >
            Enquire Now
          </Link>
        </div>
      )}
    </header>
  );
}
