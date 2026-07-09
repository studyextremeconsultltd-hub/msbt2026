import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/msbt";

type BrandLogoProps = {
  overlay?: boolean;
  inverted?: boolean;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
};

const sizes = {
  sm: { img: 52, text: "text-[10px] leading-tight sm:text-[11px]", width: "max-w-[9.5rem] sm:max-w-[10.5rem]" },
  md: { img: 68, text: "text-[11px] leading-tight sm:text-xs", width: "max-w-[10.5rem] sm:max-w-[11.5rem]" },
  lg: { img: 84, text: "text-xs leading-tight sm:text-sm", width: "max-w-[11rem] sm:max-w-[12.5rem]" },
};

export default function BrandLogo({
  overlay = false,
  inverted = false,
  size = "md",
  showText = true,
}: BrandLogoProps) {
  const s = sizes[size];
  const textClass = inverted || overlay ? "text-white" : "text-navy";

  return (
    <Link href="/" className="flex items-center gap-2.5 sm:gap-3">
      <div
        className="relative shrink-0 overflow-hidden rounded-xl bg-white shadow-md ring-2 ring-gold/40"
        style={{ width: s.img, height: s.img }}
      >
        <Image
          src="/brand/msbt-logo.png"
          alt={`${site.name} logo`}
          fill
          className="object-contain p-1"
          sizes={`${s.img}px`}
          priority
        />
      </div>
      {showText && (
        <div className={`${s.width} min-w-0`}>
          <p className={`font-bold tracking-tight ${s.text} ${textClass}`}>
            Manchester School of Business and Technology
          </p>
        </div>
      )}
    </Link>
  );
}
