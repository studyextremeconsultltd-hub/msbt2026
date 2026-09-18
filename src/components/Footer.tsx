import { Link } from "react-router-dom";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import BackToTop from "@/components/BackToTop";
import { categories, courses, site } from "@/data/msbt";

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact Us" },
  { href: "/courses", label: "Courses" },
  { href: "/university-progressions", label: "University Progressions" },
  { href: "/pay", label: "How to Pay" },
  { href: "/contact", label: "Request Info" },
  { href: "/courses", label: "Fee & Pricing" },
];

const quickLinks = [
  { href: "/courses", label: "Apply Now" },
  { href: "/pay", label: "Pay Online" },
  { href: "/about#governance", label: "Terms & Conditions" },
  { href: "/contact", label: "Student Support" },
];

const socialLinks = [
  {
    href: "https://facebook.com",
    label: "Facebook",
    path: "M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.253h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z",
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    href: `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`,
    label: "WhatsApp",
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
  },
];

function FooterHeading({ children }: { children: string }) {
  return (
    <h3 className="mb-4 text-base font-bold text-white">
      {children}
      <span className="mt-2 block h-px w-10 bg-white/70" aria-hidden />
    </h3>
  );
}

export default function Footer() {
  const popularCourses = courses.slice(0, 8);
  const wa = site.whatsapp.replace(/\D/g, "");

  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8 lg:px-8 lg:py-16">
        {/* Contact */}
        <div>
          <FooterHeading>Contact</FooterHeading>
          <p className="text-sm leading-relaxed text-white/85">{site.address}</p>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 underline-offset-2 hover:underline"
          >
            <MapPin size={14} aria-hidden />
            Open in Google Maps
          </a>

          <p className="mt-5 text-sm font-bold text-white">Admissions line</p>
          <ul className="mt-2 space-y-2 text-sm text-white/85">
            <li className="flex items-start gap-2">
              <Phone size={15} className="mt-0.5 shrink-0 text-white" aria-hidden />
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:underline">
                {site.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={15} className="mt-0.5 shrink-0 text-white" aria-hidden />
              <a href={`mailto:${site.email}`} className="break-all hover:underline">
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MessageCircle size={15} className="mt-0.5 shrink-0 text-[#25D366]" aria-hidden />
              <a
                href={`https://wa.me/${wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                WhatsApp {site.whatsapp}
              </a>
            </li>
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-sm bg-white/10 transition hover:bg-white/20"
                aria-label={s.label}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" aria-hidden>
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <FooterHeading>Company</FooterHeading>
          <ul className="space-y-2.5 text-sm text-white/85">
            {companyLinks.map((link) => (
              <li key={`${link.href}-${link.label}`}>
                <Link to={link.href} className="transition hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Categories */}
        <div>
          <FooterHeading>Popular Categories</FooterHeading>
          <ul className="space-y-2.5 text-sm text-white/85">
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  to={`/courses?category=${c.id}`}
                  className="transition hover:text-white hover:underline"
                >
                  {c.title}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/university-progressions" className="transition hover:text-white hover:underline">
                University Progressions
              </Link>
            </li>
            <li>
              <Link to="/pay" className="transition hover:text-white hover:underline">
                Online Payment
              </Link>
            </li>
          </ul>
        </div>

        {/* Popular Courses */}
        <div>
          <FooterHeading>Popular Courses</FooterHeading>
          <ul className="space-y-2.5 text-sm text-white/85">
            {popularCourses.map((c) => (
              <li key={c.slug}>
                <Link
                  to={`/courses/${c.slug}`}
                  className="line-clamp-2 transition hover:text-white hover:underline"
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <FooterHeading>Quick Links</FooterHeading>
          <ul className="space-y-2.5 text-sm text-white/85">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.href} className="transition hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <FooterHeading>Support</FooterHeading>
            <ul className="space-y-2.5 text-sm text-white/85">
              <li>
                <Link to="/contact" className="transition hover:text-white hover:underline">
                  Send a message
                </Link>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="transition hover:text-white hover:underline">
                  Email admissions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-bold text-white">Give us Reviews</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <a
                href="https://www.trustpilot.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-sm border border-white/40 bg-white px-3 py-1.5 text-xs font-bold text-[#1a1a1a] transition hover:bg-white/90"
              >
                Review us on Trustpilot
              </a>
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-sm border border-white/40 bg-white px-3 py-1.5 text-xs font-bold text-[#1a1a1a] transition hover:bg-white/90"
              >
                Review us on Google
              </a>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-white/70 sm:text-sm">
            <Link to="/about#governance" className="hover:text-white hover:underline">
              Privacy Policy
            </Link>
            <span aria-hidden>|</span>
            <Link to="/about#governance" className="hover:text-white hover:underline">
              Terms &amp; Conditions
            </Link>
            <span aria-hidden>|</span>
            <Link to="/about#governance" className="hover:text-white hover:underline">
              Cookie Policy
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs text-white/60 sm:text-sm">
              © {new Date().getFullYear()} {site.shortName}. All rights reserved.
            </p>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
