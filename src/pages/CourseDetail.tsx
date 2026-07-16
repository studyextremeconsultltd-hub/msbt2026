import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseSidebar from "@/components/CourseSidebar";
import CourseDetailTabs from "@/components/CourseDetailTabs";
import { getCourse } from "@/data/msbt";

export default function CourseDetail() {
  const { slug = "" } = useParams();
  const course = getCourse(slug);

  useEffect(() => {
    if (course) {
      document.title = `${course.title} | MSBT`;
    } else {
      document.title = "Course not found | MSBT";
    }
    return () => {
      document.title = "MSBT | Manchester School of Business and Technology";
    };
  }, [course]);

  if (!course) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <section className="mx-auto max-w-7xl px-4 py-24 text-center lg:px-8">
          <h1 className="font-display text-3xl font-bold text-ink">Course not found</h1>
          <p className="mt-3 text-muted">That programme does not exist or the link is outdated.</p>
          <Link
            to="/courses"
            className="mt-8 inline-flex rounded-full bg-navy px-6 py-3 text-sm font-bold text-white"
          >
            Browse all courses
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="relative overflow-hidden bg-peach/30 py-10">
        <div className="absolute inset-0">
          <img
            src={course.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/95 to-cream/80" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_280px]">
            <div>
              <p className="text-sm font-medium text-navy">{course.level}</p>
              <h1 className="mt-2 font-display text-3xl font-bold text-ink md:text-4xl">
                {course.title}
              </h1>
              <div className="mt-4 flex flex-wrap gap-2">
                {course.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative hidden h-44 overflow-hidden rounded-2xl border border-line shadow-lg lg:block">
              <img
                src={course.image}
                alt={course.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="min-w-0 rounded-3xl border border-line bg-white p-6 md:p-8 card-shadow">
            <CourseDetailTabs course={course} />
          </div>
          <CourseSidebar course={course} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
