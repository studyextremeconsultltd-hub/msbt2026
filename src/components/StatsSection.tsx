import { Link } from "react-router-dom";
import { stats } from "@/data/msbt";

const tones: Record<string, string> = {
  orange: "bg-orange text-white",
  navy: "bg-navy text-white",
  sky: "bg-sky text-white",
  teal: "bg-teal text-white",
};

export default function StatsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`rounded-3xl p-6 card-shadow ${tones[s.tone]} ${s.cta ? "flex flex-col justify-between" : ""}`}
          >
            <p className="font-display text-3xl font-bold">{s.value}</p>
            <p className="mt-2 text-sm opacity-90">{s.label}</p>
            {s.cta && (
              <Link
                to="/courses"
                className="mt-6 inline-flex w-fit rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur hover:bg-white/30"
              >
                Browse courses →
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
