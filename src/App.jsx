import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileCallPopup from "./components/MobileCallPopup";
import ScrollToHash from "./components/ScrollToHash";
import Home from "./pages/Home";
import CategoryDetail from "./pages/CategoryDetail";
import WorkIndex from "./pages/WorkIndex";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import DataSecurity from "./pages/DataSecurity";
import SuperintelligenceArticle from "./pages/SuperintelligenceArticle";
import NotFound from "./pages/NotFound";
import RetellVoiceWidget from "./components/RetellVoiceWidget";
import LoadingScreen from "./components/LoadingScreen";
import { Toaster } from "react-hot-toast";

const App = () => {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.style.colorScheme = "light";
  }, []);

  return (
    <div className="faalak-theme relative min-h-screen overflow-hidden bg-[#f5f3ef] text-[#24211e]">
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
        <Route path="/blog/superintelligence" element={<SuperintelligenceArticle />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <RetellVoiceWidget />
      <MobileCallPopup />

      <a
        href="https://wa.me/14169104547?text=Hi%2C%20I%20would%20like%20to%20book%20a%20consultation%20with%20Faalak%20AI%20Automation."
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Faalak on WhatsApp"
        className="fixed bottom-6 left-6 z-9997 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_35px_rgba(37,211,102,0.35)] ring-4 ring-white/70 transition hover:scale-105 hover:bg-[#20bd5a]"
      >
        <FaWhatsapp className="h-7 w-7" />
      </a>
    </div>
  );
};

export default App;