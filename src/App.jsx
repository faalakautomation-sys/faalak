import { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToHash from "./components/ScrollToHash";
import Home from "./pages/Home";
import CategoryDetail from "./pages/CategoryDetail";
import WorkIndex from "./pages/WorkIndex";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import DataSecurity from "./pages/DataSecurity";
import NotFound from "./pages/NotFound";
import RetellVoiceWidget from "./components/RetellVoiceWidget";
import LoadingScreen from "./components/LoadingScreen";
import { Toaster } from "react-hot-toast";

const App = () => {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  // Refs for custom cursor Position tracking
  const mouse = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });

  // Light theme only - no toggle, no system-preference detection, no stored
  // preference. Runs once on mount instead of per-render since it never
  // changes. The FAQ section stays on its own permanently-dark styling
  // regardless of this (it never uses `dark:` classes), so it is unaffected
  // either way.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.style.colorScheme = "light";
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("theme");
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      position.current.x += (mouse.current.x - position.current.x) * 0.1;
      position.current.y += (mouse.current.y - position.current.y) * 0.1;

      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.transform = `translate3d(${
          mouse.current.x - 6
        }px, ${mouse.current.y - 6}px, 0)`;
        outlineRef.current.style.transform = `translate3d(${
          position.current.x - 20
        }px, ${position.current.y - 20}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative bg-transparent text-gray-900">
      <LoadingScreen />
      <Toaster />
      <ScrollToHash />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:slug" element={<CategoryDetail kind="service" />} />
        <Route path="/industries/:slug" element={<CategoryDetail kind="industry" />} />
        <Route path="/work" element={<WorkIndex />} />
        <Route path="/work/:slug" element={<CaseStudyDetail />} />
        <Route path="/data-security" element={<DataSecurity />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <RetellVoiceWidget />

      <a
        href="https://wa.me/14169104547?text=Hi%2C%20I%20would%20like%20to%20book%20a%20consultation%20with%20Faalak%20AI%20Automation."
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Faalak on WhatsApp"
        className="fixed bottom-6 left-6 z-9997 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_35px_rgba(37,211,102,0.35)] ring-4 ring-white/70 transition hover:scale-105 hover:bg-[#20bd5a]"
      >
        <FaWhatsapp className="h-7 w-7" />
      </a>

      {/* Custom Cursor Ring */}
      <div
        ref={outlineRef}
        className="fixed top-0 left-0 h-10 w-10 rounded-full border border-primary pointer-events-none z-9999"
        style={{ transition: "transform 0.1s ease-out" }}
      ></div>

      {/* Custom Cursor Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-3 w-3 rounded-full bg-primary pointer-events-none z-9999"
      ></div>
    </div>
  );
};

export default App;
