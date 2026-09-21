import { Link } from "react-router-dom";
import { ArrowRight, BadgeInfo, BookOpen } from "lucide-react";
import {
  proposedOthmCourses,
  proposedOthmIntro,
  proposedOthmNotice,
} from "@/data/msbt";

export default function ProposedOthmSection() {
  const list = proposedOthmCourses();

  return (
    <section className="relative overflow-hidden border-y border-line bg-white py-16 lg:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 10% 20%, rgba(75,168,232,0.12), transparent), radial-gradient(ellipse 50% 40% at 90% 80%, rgba(197,160,89,0.1), transparent)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent-blue">
            Subject to Centre and Qualification Approval
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-4xl lg:text-5xl">
            Proposed OTHM Qualifications
          </h2>
          <p className="mt-4 text-base font-medium leading-relaxed text-muted md:text-lg">
            {proposedOthmIntro}
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {list.map((course) => (
            <Link
              key={course.slug}
              to={`/courses/${course.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-[0_10px_36px_rgba(15,31,61,0.06)] transition hover:-translate-y-1 hover:border-accent-blue/40 hover:shadow-[0_16px_44px_rgba(75,168,232,0.18)]"
            >
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent-blue/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-blue-deep">
                <BadgeInfo size={14} aria-hidden />
                Proposed Programme – Subject to OTHM Approval
              </span>
              <h3 className="mt-4 font-display text-xl font-bold leading-snug text-ink group-hover:text-navy md:text-2xl">
                {course.title}
              </h3>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="font-semibold text-muted">Level</dt>
                  <dd className="font-bold text-ink">{course.level}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-muted">Credits</dt>
                  <dd className="font-bold text-ink">{course.credits ?? "—"}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="font-semibold text-muted">Study mode</dt>
                  <dd className="font-bold text-ink">{course.studyMode}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="font-semibold text-muted">Awarding organisation</dt>
                  <dd className="font-bold text-ink">{course.awardingOrganisation}</dd>
                </div>
              </dl>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-accent-blue-deep">
                Register Your Interest
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex gap-3 rounded-2xl border border-accent-blue/25 bg-[#f0f8fd] p-5 md:p-6">
          <BookOpen className="mt-0.5 h-6 w-6 shrink-0 text-accent-blue-deep" aria-hidden />
          <p className="text-sm font-medium leading-relaxed text-ink md:text-base">
            {proposedOthmNotice}
          </p>
        </div>
      </div>
    </section>
  );
}
