"use client";

import { motion } from "framer-motion";
import { site } from "@/data/msbt";
import AnimatedSchoolTitle from "@/components/AnimatedSchoolTitle";
import HeroEnquiryForm from "@/components/HeroEnquiryForm";
import HeroImageSlider from "@/components/HeroImageSlider";
import { HeroSideCourseColumn } from "@/components/HeroSideCourses";

export default function Hero() {
  return (
    <section className="overflow-hidden">
      <HeroImageSlider />

      <div className="relative bg-cream px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto flex max-w-[90rem] items-start justify-center gap-4 lg:gap-6 xl:gap-8">
          <HeroSideCourseColumn side="left" />

          <div className="w-full min-w-0 max-w-3xl flex-1">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            >
              <span className="bg-gradient-to-r from-navy via-[#2a3d7a] to-orange bg-clip-text text-transparent drop-shadow-sm">
                Welcome to {site.shortName}
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mx-auto mt-6 max-w-2xl text-center"
            >
              <p className="font-display text-2xl font-bold leading-snug text-ink sm:text-3xl md:text-4xl">
                Your career, your pace, your future.
              </p>
              <p className="mt-4 text-base font-semibold leading-relaxed text-muted sm:text-lg md:text-xl">
                Study business, health &amp; social care and psychology via online, on your
                schedule, without putting your life on hold.
              </p>
            </motion.div>

            <div className="mt-8">
              <AnimatedSchoolTitle text={site.name} />
            </div>

            <HeroEnquiryForm />
          </div>

          <HeroSideCourseColumn side="right" />
        </div>
      </div>
    </section>
  );
}
