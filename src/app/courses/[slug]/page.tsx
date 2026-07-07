import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseSidebar from "@/components/CourseSidebar";
import CourseDetailTabs from "@/components/CourseDetailTabs";
import { courses, getCourse } from "@/data/msbt";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return { title: "Course not found" };
  return {
    title: `${course.title} | MSBT`,
    description: course.overview,
  };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="relative overflow-hidden bg-peach/30 py-10">
        <div className="absolute inset-0">
          <Image src={course.image} alt="" fill className="object-cover opacity-20" />
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
              <Image src={course.image} alt={course.title} fill className="object-cover" />
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
