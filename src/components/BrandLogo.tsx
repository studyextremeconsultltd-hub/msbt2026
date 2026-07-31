import { Link } from "react-router-dom";
import { site } from "@/data/msbt";

type BrandLogoProps = {
  overlay?: boolean;
  inverted?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  showSlogan?: boolean;
};

const sizes = {
  sm: { h: 48, w: 160, slogan: "text-[0.55rem] tracking-[0.06em]" },
  md: { h: 56, w: 180, slogan: "text-[0.6rem] tracking-[0.07em]" },
  lg: { h: 64, w: 200, slogan: "text-[0.65rem] tracking-[0.08em] sm:text-[0.7rem]" },
  xl: { h: 72, w: 220, slogan: "text-[0.7rem] tracking-[0.08em] sm:text-[0.75rem]" },
};

export default function BrandLogo({
  overlay = false,
  inverted = false,
  size = "lg",
  showText = false,
  showSlogan = true,
}: BrandLogoProps) {
  const s = sizes[size];
  const onDark = inverted || overlay;
  const textClass = onDark ? "text-white" : "text-navy";

  return (
    <Link
      to="/"
      className="group inline-flex max-w-full flex-col items-center transition hover:opacity-95"
      aria-label={`${site.name} — EDUCATE - EMPOWER - EXCEL`}
      style={{ width: s.w, maxWidth: "min(100%, 52vw)" }}
    >
      <div className="flex w-full items-center justify-center gap-2">
        <div
          className="relative w-full overflow-hidden rounded-xl bg-[#f7f5f0] shadow-[0_6px_20px_rgba(26,35,46,0.14)] ring-2 ring-gold/45 transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_28px_rgba(197,160,89,0.28)] group-hover:ring-gold"
          style={{ height: s.h }}
        >
          <img
            src="/brand/msbt-logo.png"
            alt={`${site.name} logo`}
            width={s.w}
            height={s.h}
            className="h-full w-full object-contain object-center p-1"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        {showText && (
          <p className={`hidden shrink-0 font-display text-sm font-bold tracking-tight sm:block ${textClass}`}>
            {site.shortName}
          </p>
        )}
      </div>

      {showSlogan && (
        <div className="mt-1.5 flex w-full flex-col items-center gap-1 overflow-hidden">
          <span
            className="h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent"
            aria-hidden
          />
          {/* Single horizontal line — no wrap */}
          <p
            className={`w-full whitespace-nowrap text-center font-black uppercase leading-none ${s.slogan} ${
              onDark ? "text-gold-light" : "text-navy"
            }`}
          >
            EDUCATE<span className="mx-1 text-gold">-</span>EMPOWER
            <span className="mx-1 text-gold">-</span>EXCEL
          </p>
          <span
            className="h-px w-full bg-gradient-to-r from-transparent via-gold/80 to-transparent"
            aria-hidden
          />
        </div>
      )}
    </Link>
  );
}
