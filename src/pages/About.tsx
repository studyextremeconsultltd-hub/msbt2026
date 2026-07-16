import Navbar from "@/components/Navbar";
import AboutTabs from "@/components/AboutTabs";
import Footer from "@/components/Footer";
import BrandLogo from "@/components/BrandLogo";
import { site } from "@/data/msbt";

export default function About() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="brand-gradient py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">
                About {site.shortName}
              </p>
              <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
                Who we are
              </h1>
              <p className="mt-4 max-w-2xl text-lg font-medium leading-relaxed text-white/90">
                Manchester School of Business and Technology — flexible, online,
                professionally accredited education for a global community of learners.
              </p>
            </div>
            <BrandLogo overlay size="lg" />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <AboutTabs />
      </section>
      <Footer />
    </main>
  );
}
