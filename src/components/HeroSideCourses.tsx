import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { courses } from "@/data/msbt";

const COLUMN_CONFIG = {
  left: { offsets: [0, 2, 4], label: "Business", rotateMs: 4000 },
  right: { offsets: [1, 3, 5], label: "Programmes", rotateMs: 4200 },
} as const;

function CoursePill({ courseIndex }: { courseIndex: number }) {
  const course = courses[courseIndex % courses.length];

  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group block rounded-2xl border-2 border-gold/40 bg-gradient-to-br from-white via-cream to-peach px-4 py-4 shadow-md ring-1 ring-gold/20 transition hover:scale-[1.02] hover:border-gold/60 hover:shadow-lg"
    >
      <p className="line-clamp-3 text-sm font-bold leading-snug text-navy sm:text-base">
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setTick((t) => t + 1), config.rotateMs);
    return () => clearInterval(id);
  }, [config.rotateMs]);

  return (
    <aside className="hidden shrink-0 self-stretch lg:block lg:w-[220px] xl:w-[250px]">
      <div className="mb-3 rounded-xl border border-gold/40 bg-white px-3 py-2 text-center shadow-sm ring-1 ring-gold/20">
        <p className="text-sm font-bold uppercase tracking-widest text-navy xl:text-base">
          {config.label}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {config.offsets.map((offset, row) => {
          const courseIndex = (tick + offset) % courses.length;
          return <CoursePill key={`${row}-${courseIndex}`} courseIndex={courseIndex} />;
        })}
      </div>
    </aside>
  );
}
