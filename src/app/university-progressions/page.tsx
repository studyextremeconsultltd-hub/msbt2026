import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { universityProgressionsContent } from "@/data/content";
import { site } from "@/data/msbt";

export default function UniversityProgressionsPage() {
  const { title, intro, sections, cta } = universityProgressionsContent;

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="brand-gradient py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">Pathways</p>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-white/90">
            {intro}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {sections.map((s) => (
            <div
              key={s.heading}
              className="rounded-2xl border-2 border-gold/25 bg-white p-8 card-shadow"
            >
              <h2 className="font-display text-2xl font-bold text-navy">{s.heading}</h2>
              <p className="mt-4 text-base font-medium leading-relaxed text-muted md:text-lg">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border-2 border-orange/30 bg-gradient-to-r from-orange/10 to-gold/10 p-8 text-center">
          <p className="text-lg font-bold text-navy md:text-xl">{cta}</p>
          <Link
            href="/courses"
            className="mt-6 inline-flex rounded-full bg-orange px-8 py-3.5 text-base font-bold text-white shadow-lg ring-2 ring-gold/30 transition hover:bg-orange/90"
          >
            Explore Programmes
          </Link>
        </div>

        <p className="mt-8 text-center text-sm font-medium text-muted">
          {site.name} · Ofqual-regulated qualifications with recognised progression routes
        </p>
      </section>
      <Footer />
    </main>
  );
}
