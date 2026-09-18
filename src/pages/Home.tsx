import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { CourseGrid, LightStudentScene } from "@/components/CourseSections";
import Footer from "@/components/Footer";
import DeferredMount from "@/components/DeferredMount";

const ExploreMSBT = lazy(() => import("@/components/ExploreMSBT"));
const CitySkylineBanner = lazy(() => import("@/components/CitySkylineBanner"));

function SectionFallback({ height }: { height: number }) {
  return (
    <div
      className="mx-auto flex max-w-7xl items-center justify-center bg-cream text-sm font-semibold text-muted"
      style={{ minHeight: height }}
      aria-hidden
    >
      Loading…
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="relative">
        <Hero />
        <Navbar overlay />
      </div>
      <CourseGrid limit={6} />

      <DeferredMount minHeight={480} rootMargin="120px 0px">
        <LightStudentScene />
      </DeferredMount>

      <DeferredMount minHeight={420} rootMargin="160px 0px">
        <Suspense fallback={<SectionFallback height={420} />}>
          <ExploreMSBT />
        </Suspense>
      </DeferredMount>

      <DeferredMount minHeight={420} rootMargin="160px 0px">
        <Suspense fallback={<SectionFallback height={420} />}>
          <CitySkylineBanner />
        </Suspense>
      </DeferredMount>

      <Footer />
    </main>
  );
}
