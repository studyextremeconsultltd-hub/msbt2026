import { Link } from "react-router-dom";
import { useState } from "react";
import { MessageCircle, Menu, Sparkles, X } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

type NavLink = {
  href: string;
  label: string;
  external?: boolean;
};

const links: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  {
    href: "https://learn.msbt.co.uk/?msg=not-logged-in",
    label: "Student Portal",
    external: true,
  },
  { href: "/contact", label: "Contact Us" },
];

const navLinkClass = (overlay: boolean) =>
  `text-lg font-bold tracking-wide transition lg:text-xl ${
    overlay ? "text-navy hover:text-accent-blue-deep" : "text-ink hover:text-accent-blue-deep"
  }`;

const portalLinkClass =
  "inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-navy px-3 py-1.5 text-sm font-bold tracking-wide text-white transition hover:bg-accent-blue-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue-deep";

const portalMobileClass =
  "my-1 inline-flex items-center rounded-full bg-navy px-4 py-2.5 text-base font-bold tracking-wide text-white transition hover:bg-accent-blue-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue-deep";

function NavEntry({
  item,
  className,
  onClick,
}: {
  item: NavLink;
  className: string;
  onClick?: () => void;
}) {
  if (item.external) {
    return (
      <a href={item.href} className={className} aria-label={item.label} onClick={onClick}>
        {item.label}
      </a>
    );
  }

  return (
    <Link to={item.href} className={className} onClick={onClick}>
      {item.label}
    </Link>
  );
}

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
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 lg:gap-4 lg:px-8 lg:py-3 xl:flex-nowrap">
        <BrandLogo size="lg" />

        <nav
          className="order-3 hidden w-full items-center gap-5 md:flex lg:gap-7 xl:order-2 xl:w-auto"
          aria-label="Main"
        >
          {links.map((l) => (
            <NavEntry
              key={l.label}
              item={l}
              className={l.external ? portalLinkClass : navLinkClass(overlay)}
            />
          ))}
        </nav>

        <div className="order-2 flex shrink-0 items-center gap-2 sm:gap-2.5 xl:order-3">
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

          {/* Register interest */}
          <Link
            to="/pay"
            className="cta-pay group relative hidden overflow-hidden rounded-2xl sm:inline-flex"
            aria-label="Register your interest"
          >
            <span className="absolute inset-0 bg-gradient-to-br from-[#1e6bb8] via-[#2f8fd4] to-[#56b7f5]" />
            <span className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/15 blur-xl transition group-hover:bg-white/25" aria-hidden />
            <span className="cta-shine" aria-hidden />
            <span className="relative flex items-center gap-2 px-3.5 py-2 sm:px-4">
              <span className="text-[11px] font-black uppercase tracking-[0.12em] text-white sm:text-xs">
                Register your interest
              </span>
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
          <nav aria-label="Mobile">
            {links.map((l) => (
              <NavEntry
                key={l.label}
                item={l}
                className={
                  l.external ? portalMobileClass : "block py-2.5 text-base font-bold text-ink"
                }
                onClick={() => setOpen(false)}
              />
            ))}
          </nav>
          <Link
            to="/pay"
            className="cta-pay group relative mt-3 flex w-full overflow-hidden rounded-2xl"
            onClick={() => setOpen(false)}
            aria-label="Register your interest"
          >
            <span className="absolute inset-0 bg-gradient-to-br from-[#1e6bb8] via-[#2f8fd4] to-[#56b7f5]" />
            <span className="relative flex w-full items-center justify-center px-4 py-3.5">
              <span className="text-sm font-extrabold uppercase tracking-wide text-white">
                Register your interest
              </span>
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
