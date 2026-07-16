import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories, courses, formatGBP } from "@/data/msbt";

export default function Courses() {
  const [searchParams] = useSearchParams();
  const cat = searchParams.get("category") ?? undefined;
  const q = searchParams.get("q")?.toLowerCase();

  let list = courses;
  if (cat) list = list.filter((c) => c.category === cat);
  if (q) list = list.filter((c) => c.title.toLowerCase().includes(q));

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="bg-peach/40 py-14">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-ink">All Courses</h1>
          <p className="mt-3 text-muted">
            Business & Management · Health & Social Care · Psychology
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              to="/courses"
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                !cat ? "bg-navy text-white" : "bg-white text-ink"
              }`}
            >
              All
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                to={`/courses?category=${c.id}`}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  cat === c.id ? "bg-navy text-white" : "bg-white text-ink"
                }`}
              >
                {c.title.split(" ")[0]}…
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        {list.length === 0 ? (
          <p className="text-muted">No courses match your search.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((c) => (
              <Link
                key={c.slug}
                to={`/courses/${c.slug}`}
                className="group overflow-hidden rounded-2xl border border-line bg-white card-shadow transition hover:-translate-y-0.5"
              >
                <div className="relative h-40">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-navy/25" />
                  <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-navy">
                    {c.level}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-cream px-2.5 py-0.5 text-xs font-medium text-navy"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-3 font-semibold text-ink group-hover:text-navy">{c.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm text-muted">{c.overview}</p>
                  <p className="mt-4 text-sm text-muted">{c.duration}</p>
                  <p className="mt-2 font-bold text-orange">
                    {formatGBP(c.pricing.discounted)}{" "}
                    <span className="font-normal text-muted line-through">
                      {formatGBP(c.pricing.regular)}
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
