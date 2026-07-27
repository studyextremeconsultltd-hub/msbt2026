import { Link } from "react-router-dom";
import { site } from "@/data/msbt";

type BrandLogoProps = {
  overlay?: boolean;
  inverted?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
};

/** Balanced header mark — readable, not oversized (~2.4:1 wordmark) */
const sizes = {
  sm: { h: 48, w: 132 },
  md: { h: 56, w: 154 },
  lg: { h: 64, w: 176 },
  xl: { h: 72, w: 200 },
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
      className="group flex items-center gap-2.5 transition hover:opacity-95"
      aria-label={`${site.name} — Home`}
    >
      <div
        className="relative shrink-0 overflow-hidden rounded-xl bg-[#f7f5f0] shadow-[0_6px_20px_rgba(26,35,46,0.14)] ring-2 ring-gold/45 transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_28px_rgba(197,160,89,0.28)] group-hover:ring-gold"
        style={{ width: s.w, height: s.h, maxWidth: "46vw" }}
      >
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
        <p className={`hidden font-display text-sm font-bold tracking-tight sm:block ${textClass}`}>
          {site.shortName}
        </p>
      )}
    </Link>
  );
}
