import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ContactSidebar from "@/components/ContactSidebar";
import { site } from "@/data/msbt";

export const metadata: Metadata = {
  title: `Contact Us | ${site.shortName}`,
  description: `Get in touch with ${site.name}. Enquiries about admissions, courses, and student support.`,
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="brand-gradient py-14 text-white sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">Get in touch</p>
          <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">Contact Us</h1>
          <p className="mt-4 max-w-2xl text-lg font-medium leading-relaxed text-white/90">
            Have a question about admissions, programmes, or student support? Send us a message and
            our team will respond as soon as possible.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <div className="lg:col-span-2">
            <ContactSidebar />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
