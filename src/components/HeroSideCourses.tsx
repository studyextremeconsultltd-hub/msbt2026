"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { courses } from "@/data/msbt";

const COLUMN_CONFIG = {
  left: { offsets: [0, 2, 4], label: "Business", rotateMs: 3400 },
  right: { offsets: [1, 3, 5], label: "Programmes", rotateMs: 3600 },
} as const;

function CoursePill({ courseIndex }: { courseIndex: number }) {
  const course = courses[courseIndex % courses.length];

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group block rounded-2xl border-2 border-gold/40 bg-gradient-to-br from-[#0f1f3d] via-navy to-[#0a1628] px-4 py-4 shadow-lg shadow-navy/30 ring-1 ring-gold/20 transition hover:scale-[1.02] hover:border-gold/60 hover:shadow-xl"
    >
      <p className="line-clamp-3 text-sm font-bold leading-snug text-white sm:text-base">
        {course.title}
      </p>
      <p className="mt-2.5 flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-orange sm:text-sm">
        View programme
        <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
      </p>
    </Link>
  );
}

export function HeroSideCourseColumn({ side }: { side: "left" | "right" }) {
  const config = COLUMN_CONFIG[side];
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), config.rotateMs);
    return () => clearInterval(id);
  }, [config.rotateMs]);

  return (
    <aside className="hidden shrink-0 self-stretch lg:block lg:w-[220px] xl:w-[250px]">
      <div className="mb-3 rounded-xl border border-gold/30 bg-navy px-3 py-2 text-center ring-1 ring-gold/20">
        <p className="text-sm font-bold uppercase tracking-widest text-white xl:text-base">
          {config.label}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {config.offsets.map((offset, row) => {
          const courseIndex = (tick + offset) % courses.length;
          return (
            <AnimatePresence mode="wait" key={row}>
              <motion.div
                key={`${row}-${courseIndex}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <CoursePill courseIndex={courseIndex} />
              </motion.div>
            </AnimatePresence>
          );
        })}
      </div>
    </aside>
  );
}
