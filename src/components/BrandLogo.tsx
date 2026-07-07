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
  sm: { img: 40, text: "text-sm" },
  md: { img: 52, text: "text-base" },
  lg: { img: 64, text: "text-lg" },
};

export default function BrandLogo({
  overlay = false,
  inverted = false,
  size = "md",
  showText = true,
}: BrandLogoProps) {
  const s = sizes[size];
  const textClass = inverted || overlay ? "text-white" : "text-navy";
  const subClass = inverted || overlay ? "text-gold-light" : "text-gold";

  return (
    <Link href="/" className="flex items-center gap-3">
      <div
        className="relative shrink-0 overflow-hidden rounded-xl bg-white shadow-md ring-2 ring-gold/40"
        style={{ width: s.img, height: s.img }}
      >
        <Image
          src="/brand/msbt-logo.png"
          alt={`${site.name} logo`}
          fill
          className="object-contain p-0.5"
          sizes={`${s.img}px`}
          priority
        />
      </div>
      {showText && (
        <div className="hidden sm:block">
          <p className={`font-extrabold ${s.text} ${textClass}`}>{site.shortName}</p>
          <p className={`text-xs font-semibold ${subClass}`}>Manchester</p>
        </div>
      )}
    </Link>
  );
}
