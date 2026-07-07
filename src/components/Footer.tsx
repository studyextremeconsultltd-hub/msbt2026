import Link from "next/link";
import { ChevronDown } from "lucide-react";
import BackToTop from "@/components/BackToTop";
import BrandLogo from "@/components/BrandLogo";
import { site } from "@/data/msbt";

const exploreLinks = [
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/university-progressions", label: "University Progressions" },
  { href: "/about#vision-mission", label: "News" },
  { href: "/about#who-we-are", label: "Contact Us" },
];

const legalLinks = [
  { href: "/about#governance", label: "Terms & Conditions" },
  { href: "/courses", label: "Apply" },
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
    href: "https://wa.me/",
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
      <div className="bg-[#0066cc] py-5 ring-1 ring-gold/20">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-lg font-bold uppercase tracking-wide text-white transition hover:text-white/90 sm:text-xl"
          >
            Our Popular Online Courses
            <ChevronDown className="h-6 w-6" strokeWidth={3} />
          </Link>
        </div>
      </div>

      <footer className="bg-navy-deep text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:px-8 lg:py-14">
          <div className="sm:col-span-2 lg:col-span-1">
            <BrandLogo inverted size="sm" />
            <p className="mt-4 text-sm font-medium text-white/70">
              Professional online education rooted in Manchester.
            </p>
          </div>
          <nav>
            <h3 className="mb-4 text-base font-bold uppercase tracking-wider text-sky sm:text-lg">
              Explore
            </h3>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base font-bold text-white/90 transition hover:text-sky sm:text-lg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-4 text-base font-bold uppercase tracking-wider text-sky sm:text-lg">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base font-bold text-white/90 transition hover:text-sky sm:text-lg"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-11 w-11 items-center justify-center rounded-full ${social.bg} shadow-lg transition hover:scale-110 hover:brightness-110`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-start">
            <h3 className="mb-4 text-base font-bold uppercase tracking-wider text-sky sm:text-lg">
              Security
            </h3>
            <div className="rounded-xl border border-white/20 bg-white/5 px-5 py-4 text-sm font-bold leading-relaxed text-white/90 sm:text-base">
              This site is protected by Trustwave&apos;s Trusted Commerce program
            </div>
          </div>

          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="text-base font-bold uppercase tracking-wider text-sky sm:text-lg">
              Registered Office
            </h3>
            <p className="text-base font-bold leading-relaxed text-white/90 sm:text-lg">
              Company Registered in the United Kingdom.
              <br />
              No: to be provided · VAT No: to be provided
            </p>
            <p className="text-base font-bold leading-relaxed text-white/90 sm:text-lg">
              {site.name}
              <br />
              {site.address}
            </p>
          </div>
        </div>

        <div className="border-t border-white/15">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row lg:px-8">
            <p className="text-center text-base font-bold text-white/80 sm:text-left sm:text-lg">
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <BackToTop />
          </div>
        </div>
      </footer>
    </>
  );
}
