import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ExploreMSBT from "@/components/ExploreMSBT";
import { CourseGrid, LightStudentScene } from "@/components/CourseSections";
import CitySkylineBanner from "@/components/CitySkylineBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="relative">
        <Hero />
        <Navbar overlay />
      </div>
      <CourseGrid limit={6} />
      <LightStudentScene />
      <ExploreMSBT />
      <CitySkylineBanner />
      <Footer />
    </main>
  );
}
