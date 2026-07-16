import { Link } from "react-router-dom";
import ImageBannerSlider, { manchesterSlides } from "@/components/ImageBannerSlider";
import { categories, courses, formatGBP } from "@/data/msbt";

const bubbles = [
  "Flexible online study",
  "Expert tutor support",
  "Ofqual regulated",
  "No exams on care courses",
];

export function LightStudentScene() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-16">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
        <div>
          <p className="text-base font-bold uppercase tracking-widest text-orange sm:text-lg">
            Find your way
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold text-ink md:text-5xl">
            Join a global community of professionals
          </h2>
          <p className="mt-4 text-base font-medium leading-relaxed text-muted sm:text-lg md:text-xl">
            Study business, health & social care, or psychology — with animated
            cohort support, 24/7 portal access, and pathways from Level 3 to Level 7.
          </p>
          <div className="mt-6 flex -space-x-3">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-white ring-2 ring-peach sm:h-16 sm:w-16"
              >
                <img
                  src={`/students/student-${n}.png`}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            ))}
            <span className="flex items-center pl-6 text-base font-bold text-ink sm:text-lg">
              10K+ learners worldwide
            </span>
          </div>
        </div>

        <div className="relative w-full">
          <ImageBannerSlider slides={manchesterSlides} variant="showcase" />
          <div className="mt-4 grid grid-cols-2 gap-3">
            {bubbles.map((text) => (
              <div
                key={text}
                className="rounded-xl bg-navy px-4 py-3 text-center text-sm font-bold text-white sm:text-base"
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CourseGrid({ limit }: { limit?: number }) {
  const list = limit ? courses.slice(0, limit) : courses;

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-base font-bold uppercase tracking-widest text-teal sm:text-lg">
              Search for a course
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold text-ink md:text-5xl">
              Programmes at every level
            </h2>
          </div>
          <Link
            to="/courses"
            className="text-base font-bold text-navy hover:underline sm:text-lg"
          >
            View all courses →
          </Link>
        </div>

        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/courses?category=${cat.id}`}
              className="group overflow-hidden rounded-3xl border border-line bg-cream card-shadow transition hover:-translate-y-1"
            >
              <div className="relative h-52 sm:h-56">
                <img src={cat.image} alt={cat.title} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-navy/30" />
                <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-1.5 text-sm font-bold text-navy">
                  From {formatGBP(cat.from)}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-ink group-hover:text-navy sm:text-xl">
                  {cat.title}
                </h3>
                <p className="mt-2 text-base font-medium text-muted">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <Link
              key={c.slug}
              to={`/courses/${c.slug}`}
              className="group overflow-hidden rounded-2xl border border-line bg-cream transition hover:border-navy/30 hover:card-shadow"
            >
              <div className="relative h-44 sm:h-48">
                <img src={c.image} alt={c.title} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-navy/25" />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-sm font-bold text-navy">
                  {c.level}
                </span>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {c.tags.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white px-3 py-1 text-sm font-bold text-navy"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="mt-3 text-lg font-bold text-ink group-hover:text-navy sm:text-xl">
                  {c.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-base font-medium text-muted">{c.overview}</p>
                <p className="mt-4 text-lg font-bold text-orange">
                  From {formatGBP(c.pricing.discounted)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
