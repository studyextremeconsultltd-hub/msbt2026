import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import Contact from "@/pages/Contact";
import UniversityProgressions from "@/pages/UniversityProgressions";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppShell() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/university-progressions" element={<UniversityProgressions />} />
      </Routes>
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
