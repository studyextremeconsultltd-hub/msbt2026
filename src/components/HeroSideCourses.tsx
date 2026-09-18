import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { courses } from "@/data/msbt";

const COLUMN_CONFIG = {
  left: {
    category: "business" as const,
    label: "Business & Management",
    rotateMs: 4000,
  },
  right: {
    category: "health" as const,
    label: "Health & Social Care",
    rotateMs: 4200,
  },
};

function CoursePill({ slug, title }: { slug: string; title: string }) {
  return (
    <Link
      to={`/courses/${slug}`}
      className="group block rounded-2xl border-2 border-gold/40 bg-white px-4 py-4 shadow-md ring-1 ring-gold/20 transition hover:scale-[1.02] hover:border-gold/60 hover:shadow-lg"
    >
      <p className="line-clamp-3 text-sm font-bold leading-snug text-navy sm:text-base">
        {title}
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
  const pool = useMemo(
    () => courses.filter((c) => c.category === config.category),
    [config.category],
  );
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setTick((t) => t + 1), config.rotateMs);
    return () => clearInterval(id);
  }, [config.rotateMs]);

  if (pool.length === 0) return null;

  const visible = [0, 1, 2].map((row) => pool[(tick + row) % pool.length]);

  return (
    <aside className="hidden shrink-0 self-stretch lg:block lg:w-[220px] xl:w-[250px]">
      <div className="mb-3 rounded-xl border border-gold/40 bg-white px-3 py-2 text-center shadow-sm ring-1 ring-gold/20">
        <p className="text-xs font-bold uppercase tracking-wide text-navy xl:text-sm">
          {config.label}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {visible.map((course, row) => (
          <CoursePill key={`${row}-${course.slug}`} slug={course.slug} title={course.title} />
        ))}
      </div>
    </aside>
  );
}
