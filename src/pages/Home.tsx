import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DeferredMount from "@/components/DeferredMount";

const CourseGrid = lazy(() =>
  import("@/components/CourseSections").then((m) => ({ default: m.CourseGrid })),
);
const LightStudentScene = lazy(() =>
  import("@/components/CourseSections").then((m) => ({ default: m.LightStudentScene })),
);
const ExploreMSBT = lazy(() => import("@/components/ExploreMSBT"));
const CitySkylineBanner = lazy(() => import("@/components/CitySkylineBanner"));
const Footer = lazy(() => import("@/components/Footer"));

function SectionFallback({ height }: { height: number }) {
  return (
    <div
      className="mx-auto flex max-w-7xl items-center justify-center bg-cream text-sm font-semibold text-muted"
      style={{ minHeight: height }}
      aria-hidden
    />
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="relative">
        <Hero />
        <Navbar overlay />
      </div>

      <DeferredMount minHeight={640} rootMargin="80px 0px">
        <Suspense fallback={<SectionFallback height={640} />}>
          <CourseGrid limit={3} />
        </Suspense>
      </DeferredMount>

      <DeferredMount minHeight={420} rootMargin="120px 0px">
        <Suspense fallback={<SectionFallback height={420} />}>
          <LightStudentScene />
        </Suspense>
      </DeferredMount>

      <DeferredMount minHeight={360} rootMargin="140px 0px">
        <Suspense fallback={<SectionFallback height={360} />}>
          <ExploreMSBT />
        </Suspense>
      </DeferredMount>

      <DeferredMount minHeight={360} rootMargin="140px 0px">
        <Suspense fallback={<SectionFallback height={360} />}>
          <CitySkylineBanner />
        </Suspense>
      </DeferredMount>

      <DeferredMount minHeight={320} rootMargin="100px 0px">
        <Suspense fallback={<SectionFallback height={320} />}>
          <Footer />
        </Suspense>
      </DeferredMount>
    </main>
  );
}
