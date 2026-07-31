import { motion } from "framer-motion";
import { site } from "@/data/msbt";

type BrandSloganProps = {
  variant?: "hero" | "compact";
  className?: string;
};

export default function BrandSlogan({
  variant = "hero",
  className = "",
}: BrandSloganProps) {
  const isHero = variant === "hero";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.08 }}
      className={`flex flex-col items-center ${className}`}
      role="doc-subtitle"
      aria-label="EDUCATE - EMPOWER - EXCEL"
    >
      <div
        className={`flex items-center justify-center gap-3 sm:gap-4 ${
          isHero ? "mt-4 sm:mt-5" : ""
        }`}
      >
        <span
          className={`hidden h-px shrink-0 bg-gradient-to-r from-transparent via-gold to-gold/80 sm:block ${
            isHero ? "w-10 md:w-16" : "w-6"
          }`}
          aria-hidden
        />
        <p
          className={`whitespace-nowrap text-center font-black uppercase text-navy ${
            isHero
              ? "text-xs tracking-[0.14em] sm:text-base sm:tracking-[0.2em] md:text-lg md:tracking-[0.22em]"
              : "text-[0.7rem] tracking-[0.12em] sm:text-sm sm:tracking-[0.16em]"
          }`}
        >
          EDUCATE
          <span className="mx-1.5 text-gold sm:mx-2.5" aria-hidden>
            -
          </span>
          EMPOWER
          <span className="mx-1.5 text-gold sm:mx-2.5" aria-hidden>
            -
          </span>
          EXCEL
        </p>
        <span
          className={`hidden h-px shrink-0 bg-gradient-to-l from-transparent via-gold to-gold/80 sm:block ${
            isHero ? "w-10 md:w-16" : "w-6"
          }`}
          aria-hidden
        />
      </div>
      {isHero && (
        <span
          className="mt-3 h-0.5 w-20 rounded-full bg-gradient-to-r from-transparent via-gold to-transparent sm:w-28"
          aria-hidden
        />
      )}
    </motion.div>
  );
}
