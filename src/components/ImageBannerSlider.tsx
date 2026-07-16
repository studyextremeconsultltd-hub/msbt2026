import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export type SlideItem = {
  src: string;
  alt: string;
  caption: string;
};

type ImageBannerSliderProps = {
  slides: readonly SlideItem[];
  variant?: "hero" | "showcase";
  className?: string;
};

const INTERVAL_MS = 5500;

const variantStyles = {
  hero: {
    wrapper: "max-w-7xl",
    aspect: "aspect-[16/7] max-h-[280px] sm:max-h-[340px] md:max-h-[400px] lg:max-h-[440px]",
    caption: "text-sm font-bold sm:text-base md:text-lg",
    arrow: "h-10 w-10 sm:h-11 sm:w-11",
    arrowIcon: 22,
    dot: "h-2",
    dotActive: "w-8",
    dotInactive: "w-2",
  },
  showcase: {
    wrapper: "max-w-7xl",
    aspect: "aspect-[16/9] h-[320px] sm:h-[420px] md:h-[520px] lg:h-[560px]",
    caption: "text-base font-bold sm:text-lg md:text-xl",
    arrow: "h-11 w-11 sm:h-12 sm:w-12",
    arrowIcon: 24,
    dot: "h-2.5",
    dotActive: "w-10",
    dotInactive: "w-2.5",
  },
} as const;

export default function ImageBannerSlider({
  slides,
  variant = "hero",
  className = "",
}: ImageBannerSliderProps) {
  const [index, setIndex] = useState(0);
  const styles = variantStyles[variant];

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const id = setInterval(next, INTERVAL_MS);
    return () => clearInterval(id);
  }, [next]);

  const slide = slides[index];

  return (
    <div className={`relative mx-auto ${styles.wrapper} overflow-hidden rounded-3xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/5 ${className}`}>
      <div className={`relative w-full ${styles.aspect}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.src}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        <div className="hero-mirror-overlay" />
        <div className="hero-mirror-shine" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2838]/85 via-[#1a2838]/20 to-transparent" />

        <p className={`absolute bottom-5 left-5 right-20 z-10 on-image-text ${styles.caption}`}>
          {slide.caption}
        </p>

        <button
          type="button"
          onClick={prev}
          className={`absolute left-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/30 sm:left-4 ${styles.arrow}`}
          aria-label="Previous slide"
        >
          <ChevronLeft size={styles.arrowIcon} />
        </button>
        <button
          type="button"
          onClick={next}
          className={`absolute right-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/30 sm:right-4 ${styles.arrow}`}
          aria-label="Next slide"
        >
          <ChevronRight size={styles.arrowIcon} />
        </button>
      </div>

      <div className="absolute bottom-5 right-5 z-10 flex gap-2 sm:right-6">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all ${styles.dot} ${
              i === index ? `${styles.dotActive} bg-orange` : `${styles.dotInactive} bg-white/50 hover:bg-white/90`
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export const manchesterSlides = [
  {
    src: "/manchester/manchester-spinningfields.png",
    alt: "Manchester Spinningfields business district skyline",
    caption: "Manchester — a global hub for business & innovation",
  },
  {
    src: "/manchester/manchester-waterfront.png",
    alt: "Manchester waterfront and MediaCityUK",
    caption: "Study from anywhere — rooted in a world-class city",
  },
  {
    src: "/manchester/manchester-hero.png",
    alt: "Manchester city skyline at golden hour",
    caption: "Flexible online learning with professional accreditation",
  },
] as const;

/** Bottom showcase slider — Universal Square campus (from Pics/) */
export const campusSlides = [
  {
    src: "/manchester/campus-01.jpeg",
    alt: "Universal Square Manchester — landscaped courtyard and modern office buildings",
    caption: "Universal Square, Manchester — where ambition meets opportunity",
  },
  {
    src: "/manchester/campus-02.jpeg",
    alt: "Aerial view of Universal Square Manchester campus and city skyline",
    caption: "A modern campus in the heart of Manchester’s business district",
  },
  {
    src: "/manchester/campus-03.jpeg",
    alt: "Universal Square Manchester at golden hour with city skyline behind",
    caption: "Professional education rooted in a world-class city",
  },
] as const;
