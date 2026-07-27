import { Link } from "react-router-dom";
import { site } from "@/data/msbt";

type BrandLogoProps = {
  overlay?: boolean;
  inverted?: boolean;
  size?: "sm" | "md" | "lg";
  /** Extra wordmark next to the mark — usually off because the file already includes the name */
  showText?: boolean;
};

/** Horizontal wordmark (emblem + school name). Aspect ~1.5:1 */
const sizes = {
  sm: { h: 44, w: 120, text: "text-[10px] leading-tight sm:text-[11px]", label: "max-w-[7.5rem]" },
  md: { h: 56, w: 152, text: "text-[11px] leading-tight sm:text-xs", label: "max-w-[9rem]" },
  lg: { h: 68, w: 188, text: "text-xs leading-tight sm:text-sm", label: "max-w-[10rem]" },
};

export default function BrandLogo({
  overlay = false,
  inverted = false,
  size = "md",
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
        className="relative shrink-0 overflow-hidden rounded-2xl bg-white shadow-[0_8px_28px_rgba(15,31,61,0.18)] ring-2 ring-gold/50 transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_36px_rgba(201,162,39,0.35)] group-hover:ring-gold"
        style={{ width: s.w, height: s.h }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/15 via-transparent to-navy/5" />
        <img
          src="/brand/msbt-logo.png"
          alt={`${site.name} logo`}
          width={s.w}
          height={s.h}
          className="relative h-full w-full object-contain object-center p-1.5 sm:p-2"
          decoding="async"
        />
      </div>
      {showText && (
        <div className={`${s.label} min-w-0`}>
          <p className={`font-display font-bold tracking-tight ${s.text} ${textClass}`}>
            {site.shortName}
          </p>
          <p className={`mt-0.5 font-semibold leading-snug text-[10px] ${textClass} opacity-80 sm:text-[11px]`}>
            Manchester School of Business and Technology
          </p>
        </div>
      )}
    </Link>
  );
}
