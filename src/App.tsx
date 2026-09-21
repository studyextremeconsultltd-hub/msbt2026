import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import CookieConsent from "@/components/CookieConsent";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Courses = lazy(() => import("@/pages/Courses"));
const CourseDetail = lazy(() => import("@/pages/CourseDetail"));
const Contact = lazy(() => import("@/pages/Contact"));
const UniversityProgressions = lazy(() => import("@/pages/UniversityProgressions"));
const Pay = lazy(() => import("@/pages/Pay"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center bg-white px-4" role="status">
      <p className="text-base font-bold text-navy">Loading MSBT…</p>
    </div>
  );
}

function AppShell() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/university-progressions" element={<UniversityProgressions />} />
        </Routes>
      </Suspense>
      <CookieConsent />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
