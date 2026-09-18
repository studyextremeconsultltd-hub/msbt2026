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

const INTERVAL_MS = 6500;

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
    aspect: "aspect-[16/9] h-[280px] sm:h-[360px] md:h-[440px] lg:h-[480px]",
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (slides.length < 2) return;
    const id = setInterval(next, INTERVAL_MS);
    return () => clearInterval(id);
  }, [next, slides.length]);

  const slide = slides[index];

  return (
    <div
      className={`relative mx-auto ${styles.wrapper} overflow-hidden rounded-3xl border border-line bg-white shadow-[0_16px_40px_rgba(26,35,46,0.08)] ring-1 ring-gold/15 ${className}`}
    >
      <div className={`relative w-full ${styles.aspect}`}>
        {slides.map((item, i) => (
          <img
            key={item.src}
            src={item.src}
            alt={item.alt}
            width={1600}
            height={700}
            decoding={i === 0 ? "sync" : "async"}
            fetchPriority={i === 0 && variant === "hero" ? "high" : "low"}
            loading={i === 0 && variant === "hero" ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          />
        ))}

        <div className="hero-mirror-overlay" />
        <div className="hero-mirror-shine" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-navy/10 to-transparent" />

        <p className={`absolute bottom-5 left-5 right-20 z-10 on-image-text ${styles.caption}`}>
          {slide.caption}
        </p>

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className={`absolute left-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/85 text-navy shadow-md backdrop-blur-md transition hover:bg-white sm:left-4 ${styles.arrow}`}
              aria-label="Previous slide"
            >
              <ChevronLeft size={styles.arrowIcon} />
            </button>
            <button
              type="button"
              onClick={next}
              className={`absolute right-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/85 text-navy shadow-md backdrop-blur-md transition hover:bg-white sm:right-4 ${styles.arrow}`}
              aria-label="Next slide"
            >
              <ChevronRight size={styles.arrowIcon} />
            </button>
          </>
        )}
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-5 right-5 z-10 flex gap-2 sm:right-6">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all ${styles.dot} ${
                i === index
                  ? `${styles.dotActive} bg-orange`
                  : `${styles.dotInactive} bg-white/50 hover:bg-white/90`
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export const manchesterSlides = [
  {
    src: "/manchester/manchester-spinningfields.webp",
    alt: "Manchester Spinningfields business district skyline",
    caption: "Manchester — a global hub for business & innovation",
  },
  {
    src: "/manchester/manchester-waterfront.webp",
    alt: "Manchester waterfront and MediaCityUK",
    caption: "Study from anywhere — rooted in a world-class city",
  },
  {
    src: "/manchester/manchester-hero.webp",
    alt: "Manchester city skyline at golden hour",
    caption: "Flexible online learning with professional accreditation",
  },
] as const;

export const campusSlides = [
  {
    src: "/manchester/campus-01.webp",
    alt: "Universal Square Manchester — landscaped courtyard and modern office buildings",
    caption: "Universal Square, Manchester — where ambition meets opportunity",
  },
  {
    src: "/manchester/campus-02.webp",
    alt: "Aerial view of Universal Square Manchester campus and city skyline",
    caption: "A modern campus in the heart of Manchester’s business district",
  },
  {
    src: "/manchester/campus-03.webp",
    alt: "Universal Square Manchester at golden hour with city skyline behind",
    caption: "Professional education rooted in a world-class city",
  },
] as const;
