"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedSchoolTitle({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (charIndex < text.length) {
      timer = setTimeout(() => {
        const next = charIndex + 1;
        setCharIndex(next);
        setDisplayed(text.slice(0, next));
      }, 54);
    } else {
      timer = setTimeout(() => {
        setCharIndex(0);
        setDisplayed("");
      }, 2800);
    }

    return () => clearTimeout(timer);
  }, [charIndex, text]);

  return (
    <div className="relative min-h-[3.4em] sm:min-h-[2.8em]">
      <h1 className="text-center font-display text-4xl font-bold leading-tight text-ink md:text-5xl lg:text-6xl">
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
