import { lazy, Suspense, useState } from "react";
import { site } from "@/data/msbt";
import BrandSlogan from "@/components/BrandSlogan";
import HeroImageSlider from "@/components/HeroImageSlider";
import { HeroSideCourseColumn } from "@/components/HeroSideCourses";

const HeroEnquiryForm = lazy(() => import("@/components/HeroEnquiryForm"));

export default function Hero() {
  const [showEnquiry, setShowEnquiry] = useState(false);

  return (
    <section className="overflow-hidden">
      <HeroImageSlider />

      <div className="relative bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto flex max-w-[90rem] items-start justify-center gap-4 lg:gap-6 xl:gap-8">
          <HeroSideCourseColumn side="left" />

          <div className="w-full min-w-0 max-w-3xl flex-1">
            <p className="text-center font-display text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="bg-gradient-to-r from-navy via-[#2a3544] to-gold bg-clip-text text-transparent">
                Welcome to {site.shortName}
              </span>
            </p>

            <BrandSlogan variant="hero" />

            <div className="mx-auto mt-5 max-w-2xl text-center sm:mt-6">
              <p className="font-display text-xl font-bold leading-snug text-ink sm:text-3xl md:text-4xl">
                Your career, your pace, your future.
              </p>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-muted sm:mt-4 sm:text-lg md:text-xl">
                Study Business &amp; Management and Health &amp; Social Care online, on your schedule,
                without putting your life on hold.
              </p>
              <h1 className="mt-5 font-display text-lg font-bold leading-snug text-navy sm:mt-6 sm:text-2xl md:text-3xl">
                {site.name}
              </h1>
            </div>

            <div className="relative z-10 mt-7 sm:mt-8">
              {showEnquiry ? (
                <Suspense
                  fallback={
                    <div className="rounded-3xl border border-line bg-white p-8 text-center text-sm font-semibold text-muted card-shadow">
                      Loading enquiry form…
                    </div>
                  }
                >
                  <HeroEnquiryForm />
                </Suspense>
              ) : (
                <div className="mx-auto flex max-w-xl flex-col items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowEnquiry(true)}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-orange to-peach-deep px-6 py-4 text-lg font-bold text-white shadow-lg shadow-orange/25 transition hover:brightness-105 sm:w-auto sm:min-w-[280px] sm:text-xl"
                  >
                    Start your enquiry
                  </button>
                  <p className="text-center text-sm font-medium text-muted">
                    Admissions responds within 24 hours · {site.email}
                  </p>
                </div>
              )}
            </div>
          </div>

          <HeroSideCourseColumn side="right" />
        </div>
      </div>
    </section>
  );
}
