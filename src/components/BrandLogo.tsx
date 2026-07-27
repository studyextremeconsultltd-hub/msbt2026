import { Link } from "react-router-dom";
import { site } from "@/data/msbt";

type BrandLogoProps = {
  overlay?: boolean;
  inverted?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  /** Extra wordmark — off by default; file already includes the school name */
  showText?: boolean;
};

/**
 * Horizontal wordmark. Display sizes are intentionally large so the
 * crest + serif name stay readable in the nav and hero.
 */
const sizes = {
  sm: { h: 64, w: 176, text: "text-xs leading-tight", label: "max-w-[8rem]" },
  md: { h: 80, w: 220, text: "text-sm leading-tight", label: "max-w-[10rem]" },
  lg: { h: 96, w: 280, text: "text-sm leading-tight", label: "max-w-[11rem]" },
  xl: { h: 112, w: 320, text: "text-base leading-tight", label: "max-w-[12rem]" },
};

export default function BrandLogo({
  overlay = false,
  inverted = false,
  size = "lg",
  showText = false,
}: BrandLogoProps) {
  const s = sizes[size];
  const textClass = inverted || overlay ? "text-white" : "text-navy";

  return (
    <Link
      to="/"
      className="group flex items-center gap-3 transition hover:opacity-95"
      aria-label={`${site.name} — Home`}
    >
      <div
        className="relative shrink-0 overflow-hidden rounded-2xl bg-[#f7f7f7] shadow-[0_10px_32px_rgba(15,31,61,0.22)] ring-[3px] ring-gold/55 transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_16px_40px_rgba(201,162,39,0.4)] group-hover:ring-gold"
        style={{ width: s.w, height: s.h }}
      >
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-gold/20 via-transparent to-navy/5" />
        <img
          src="/brand/msbt-logo.png"
          alt={`${site.name} logo`}
          width={s.w}
          height={s.h}
          className="relative h-full w-full object-contain object-center p-1"
          decoding="async"
          fetchPriority="high"
        />
      </div>
      {showText && (
        <div className={`${s.label} min-w-0`}>
          <p className={`font-display font-bold tracking-tight ${s.text} ${textClass}`}>
            {site.shortName}
          </p>
          <p className={`mt-0.5 font-semibold leading-snug text-[11px] ${textClass} opacity-80 sm:text-xs`}>
            Manchester School of Business and Technology
          </p>
        </div>
      )}
    </Link>
  );
}
