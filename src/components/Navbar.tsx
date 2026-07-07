"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "IQAC" },
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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8 lg:py-3.5">
        <BrandLogo overlay={overlay} size="md" />

        <nav className="hidden items-center gap-6 md:flex lg:gap-10">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className={navLinkClass(overlay)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/courses"
            className="hidden rounded-full bg-orange px-5 py-2.5 text-sm font-bold text-white shadow-md ring-2 ring-gold/30 transition hover:bg-orange/90 sm:inline-flex"
          >
            Enquire Now
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
              href={l.href}
              className={`block py-2.5 text-base font-bold ${
                overlay ? "text-white" : "text-ink"
              }`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/courses"
            className="mt-3 block rounded-full bg-orange px-5 py-3 text-center text-sm font-bold text-white"
            onClick={() => setOpen(false)}
          >
            Enquire Now
          </Link>
        </div>
      )}
    </header>
  );
}
