import { Link } from "react-router-dom";
import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import BackToTop from "@/components/BackToTop";
import BrandLogo from "@/components/BrandLogo";
import { site } from "@/data/msbt";

const exploreLinks = [
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/university-progressions", label: "University Progressions" },
  { href: "/contact", label: "Contact Us" },
];

const legalLinks = [
  { href: "/about#governance", label: "Terms & Conditions" },
  { href: "/courses", label: "Apply" },
  { href: "/pay", label: "Pay online" },
];

const socialLinks = [
  {
    href: "https://facebook.com",
    label: "Facebook",
    bg: "bg-[#1877F2]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden>
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.253h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    bg: "bg-[#0A66C2]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`,
    label: "WhatsApp",
    bg: "bg-[#25D366]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-r from-navy via-[#2a3544] to-gold py-5 shadow-[0_-8px_40px_rgba(26,35,46,0.28)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(197,160,89,0.35),transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-lg font-bold uppercase tracking-wide text-white drop-shadow-md transition hover:scale-[1.02] hover:text-gold-light sm:text-xl"
          >
            Our Popular Online Courses
            <ChevronDown className="h-6 w-6 animate-bounce" strokeWidth={3} />
          </Link>
        </div>
      </div>

      <footer className="relative overflow-hidden bg-navy-deep text-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        <div className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-orange/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-10 h-56 w-56 rounded-full bg-sky/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-16">
          <div className="lg:col-span-4">
            <BrandLogo inverted size="sm" />
            <p className="mt-5 max-w-sm text-base font-medium leading-relaxed text-white/75">
              Professional online education rooted in Manchester — flexible pathways
              from Level 3 to Level 7.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${social.bg} shadow-lg ring-2 ring-white/10 transition hover:scale-110 hover:brightness-110`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <nav className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-gold">
              Explore
            </h3>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-base font-semibold text-white/90 transition hover:text-sky"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-gold">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-base font-semibold text-white/90 transition hover:text-sky"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sm:col-span-2 lg:col-span-4">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-gold">
              Registered Office
            </h3>
            <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-white/10 to-white/[0.03] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.25)] ring-1 ring-white/10 backdrop-blur-sm">
              <p className="font-display text-lg font-bold text-white">{site.name}</p>
              <p className="mt-1 text-sm font-medium text-gold-light">
                Company registered in the United Kingdom
              </p>
              <div className="mt-4 flex gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange/90 text-white shadow-md">
                  <MapPin size={18} aria-hidden />
                </span>
                <p className="text-base font-semibold leading-relaxed text-white/95">
                  {site.address}
                </p>
              </div>
              <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2 text-sm font-semibold text-white/85 transition hover:text-sky"
                >
                  <Mail size={16} className="text-sky" aria-hidden />
                  {site.email}
                </a>
                <a
                  href={`tel:${site.phone}`}
                  className="flex items-center gap-2 text-sm font-semibold text-white/85 transition hover:text-sky"
                >
                  <Phone size={16} className="text-sky" aria-hidden />
                  {site.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-black/20">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row lg:px-8">
            <p className="text-center text-sm font-semibold text-white/70 sm:text-left sm:text-base">
              © {new Date().getFullYear()} {site.shortName}. All rights reserved.
            </p>
            <BackToTop />
          </div>
        </div>
      </footer>
    </>
  );
}
