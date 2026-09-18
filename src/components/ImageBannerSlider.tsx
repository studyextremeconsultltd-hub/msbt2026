import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export type SlideItem = {
  src: string;
  /** Optional smaller image for mobile (srcset) */
  srcSm?: string;
  alt: string;
  caption: string;
};

type ImageBannerSliderProps = {
  slides: readonly SlideItem[];
  variant?: "hero" | "showcase";
  className?: string;
};

const INTERVAL_MS = 7000;

const variantStyles = {
  hero: {
    wrapper: "max-w-7xl",
    aspect: "aspect-[16/9] max-h-[220px] sm:aspect-[16/7] sm:max-h-[340px] md:max-h-[400px] lg:max-h-[440px]",
    caption: "text-sm font-bold sm:text-base md:text-lg",
    arrow: "h-10 w-10 sm:h-11 sm:w-11",
    arrowIcon: 22,
    dot: "h-2",
    dotActive: "w-8",
    dotInactive: "w-2",
  },
  showcase: {
    wrapper: "max-w-7xl",
    aspect: "aspect-[16/9] h-[220px] sm:h-[360px] md:h-[420px]",
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
  const slide = slides[index];
  const nextIndex = (index + 1) % slides.length;

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

  // Warm the next slide without keeping every image in the DOM.
  useEffect(() => {
    if (slides.length < 2) return;
    const upcoming = slides[nextIndex];
    const href = upcoming.srcSm || upcoming.src;
    const img = new Image();
    img.decoding = "async";
    img.src = href;
  }, [nextIndex, slides]);

  return (
    <div
      className={`relative mx-auto ${styles.wrapper} overflow-hidden rounded-3xl border border-line bg-white shadow-[0_16px_40px_rgba(26,35,46,0.08)] ring-1 ring-gold/15 ${className}`}
    >
      <div className={`relative w-full ${styles.aspect}`}>
        <picture>
          {slide.srcSm ? (
            <source media="(max-width: 767px)" srcSet={slide.srcSm} type="image/webp" />
          ) : null}
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            width={1600}
            height={700}
            decoding="async"
            fetchPriority={variant === "hero" && index === 0 ? "high" : "low"}
            loading={variant === "hero" && index === 0 ? "eager" : "lazy"}
            sizes="(max-width: 768px) 100vw, 1200px"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </picture>

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
    srcSm: "/manchester/manchester-spinningfields-sm.webp",
    alt: "Manchester Spinningfields business district skyline",
    caption: "Manchester — a global hub for business & innovation",
  },
  {
    src: "/manchester/manchester-waterfront.webp",
    srcSm: "/manchester/manchester-waterfront-sm.webp",
    alt: "Manchester waterfront and MediaCityUK",
    caption: "Study from anywhere — rooted in a world-class city",
  },
  {
    src: "/manchester/manchester-hero.webp",
    srcSm: "/manchester/manchester-hero-sm.webp",
    alt: "Manchester city skyline at golden hour",
    caption: "Flexible online learning with professional accreditation",
  },
] as const;

export const campusSlides = [
  {
    src: "/manchester/campus-01.webp",
    srcSm: "/manchester/campus-01-sm.webp",
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
