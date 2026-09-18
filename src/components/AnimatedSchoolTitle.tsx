import { useEffect, useState } from "react";

export default function AnimatedSchoolTitle({ text }: { text: string }) {
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCharIndex(text.length);
      return;
    }
    // Defer typing until after first paint / idle to protect LCP & TBT
    const start = window.setTimeout(() => setAnimate(true), 1200);
    return () => window.clearTimeout(start);
  }, [text.length]);

  useEffect(() => {
    if (!animate) return;
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < text.length) {
      timer = setTimeout(() => setCharIndex((i) => i + 1), 48);
    } else if (!deleting && charIndex === text.length) {
      timer = setTimeout(() => setDeleting(true), 2800);
    } else if (deleting && charIndex > 0) {
      timer = setTimeout(() => setCharIndex((i) => i - 1), 22);
    } else if (deleting && charIndex === 0) {
      timer = setTimeout(() => setDeleting(false), 600);
    }

    return () => clearTimeout(timer);
  }, [animate, charIndex, deleting, text]);

  const displayed = animate ? text.slice(0, charIndex) : text;

  return (
    <div className="relative w-full">
      <h1
        className="pointer-events-none text-center font-display text-2xl font-bold leading-snug text-transparent sm:text-3xl md:text-4xl"
        aria-hidden
      >
        {text}
      </h1>
      <h1 className="absolute inset-x-0 top-0 text-center font-display text-2xl font-bold leading-snug text-ink sm:text-3xl md:text-4xl">
        <span className="sr-only">{text}</span>
        <span aria-hidden>
          {displayed}
          <span
            className="ml-0.5 inline-block w-[3px] animate-pulse bg-orange align-middle"
            style={{ height: "0.85em" }}
          />
        </span>
      </h1>
    </div>
  );
}
