"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedSchoolTitle({ text }: { text: string }) {
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
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
  }, [charIndex, deleting, text]);

  const displayed = text.slice(0, charIndex);

  return (
    <div className="relative w-full">
      {/* Invisible full title reserves height so the enquiry form stays static */}
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
          <motion.span
            className="ml-0.5 inline-block w-[3px] bg-orange align-middle"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            style={{ height: "0.85em" }}
          />
        </span>
      </h1>
    </div>
  );
}
