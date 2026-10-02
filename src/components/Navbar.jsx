import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import assets from "../assets/assets";
import { motion } from "motion/react";
import { FiMenu, FiX } from "react-icons/fi";
import MegaMenu from "./MegaMenu";
import {
  servicesMenu,
  industriesMenu,
  workMenu,
  servicesGroups,
  industriesGroups,
  workGroups,
  servicesTeaser,
  industriesTeaser,
  workTeaser,
  resolveGroups,
} from "../data/menuData";

const resolvedServiceGroups = resolveGroups(servicesGroups, servicesMenu);
const resolvedIndustryGroups = resolveGroups(industriesGroups, industriesMenu);
const resolvedWorkGroups = resolveGroups(workGroups, workMenu);

const SCROLL_THRESHOLD = 40;

const NavLink = ({ to, onClick, light, drawer = false, children }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`group relative transition-colors duration-300 ${
      drawer
        ? "w-full rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-primary"
        : `py-1 ${light ? "text-white hover:text-white/80" : "hover:text-primary"}`
    }`}
  >
    {children}
    {!drawer && (
      <span
        className={`pointer-events-none absolute -bottom-0.5 left-0 hidden h-[1.5px] w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 2xl:block ${
          light ? "bg-white" : "bg-primary"
        }`}
      />
    )}
  </Link>
);

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [compactNav, setCompactNav] = useState(() => window.innerWidth < 1536);
  const [scrolled, setScrolled] = useState(false);
  const closeSidebar = () => setSidebarOpen(false);
  const navRef = useRef(null);
  const location = useLocation();
  const drawerOpen = sidebarOpen && compactNav;

  // Transparent-over-video only makes sense on the homepage, right where the
  // hero video is actually behind it - everywhere else (and once you've
  // scrolled past the hero) it needs its own solid backdrop to stay legible
  // against plain page content.
  const isHome = location.pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Publishes the navbar's real rendered height as a CSS variable, so every
  // page (Hero included) can pad itself with `calc(var(--navbar-h) + gap)`
  // instead of a guessed pixel value that silently drifts out of sync the
  // next time the navbar's own height changes (a breakpoint, a font swap, a
  // future edit to its own padding/logo size, etc.) - this is now the one
  // real source of truth for "how tall is the navbar right now."
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const setHeightVar = () => {
      document.documentElement.style.setProperty("--navbar-h", `${el.getBoundingClientRect().height}px`);
    };
    setHeightVar();
    const observer = new ResizeObserver(setHeightVar);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Re-check on route change - navigating away from "/" (or back to it)
  // while already scrolled shouldn't leave the navbar stuck transparent.
  useEffect(() => {
    setScrolled(window.scrollY > SCROLL_THRESHOLD);
  }, [location.pathname]);

  useEffect(() => {
    const updateNavLayout = () => {
      const isCompact = window.innerWidth < 1536;
      setCompactNav(isCompact);
      if (!isCompact) closeSidebar();
    };
    window.addEventListener("resize", updateNavLayout);
    return () => window.removeEventListener("resize", updateNavLayout);
  }, []);

  useEffect(() => {
    if (!sidebarOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") closeSidebar();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [sidebarOpen]);

  return (
    <motion.div
      ref={navRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex justify-between items-center px-4 sm:px-8 xl:px-10 2xl:px-24 py-4 fixed inset-x-0 top-0 z-40 border-b font-medium transition-colors duration-500 ${
        transparent ? "border-white/15 bg-transparent" : "border-gray-200/70 backdrop-blur-xl bg-white/50"
      }`}
    >
      <Link to="/" onClick={closeSidebar}>
        <motion.img
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.25 }}
          src={transparent ? assets.logo_dark : assets.logo}
          alt="logo"
          className="w-32 sm:w-40 object-contain"
        />
      </Link>

      {drawerOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-[2px] 2xl:hidden"
        />
      )}

      <div
        className={`flex items-center gap-4 2xl:text-sm max-2xl:fixed max-2xl:inset-y-0 max-2xl:right-0 max-2xl:z-50 max-2xl:flex max-2xl:flex-col max-2xl:items-stretch max-2xl:gap-1 max-2xl:w-[min(24rem,88vw)] max-2xl:overflow-y-auto max-2xl:border-l max-2xl:border-slate-200 max-2xl:bg-white max-2xl:px-5 max-2xl:pb-7 max-2xl:pt-6 max-2xl:text-slate-800 max-2xl:shadow-2xl max-2xl:transition-transform max-2xl:duration-300 2xl:static 2xl:flex-row 2xl:items-center 2xl:gap-4 ${
          drawerOpen ? "max-2xl:translate-x-0" : "max-2xl:translate-x-full max-2xl:pointer-events-none"
        }`}
      >
        <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-5 2xl:hidden">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Faalak AI</p>
            <p className="mt-1 text-xs text-slate-500">Explore the site</p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-50 py-1.5 pl-2 pr-3 ring-1 ring-slate-200/80">
              <img src={assets.flag} alt="Canada flag" className="h-5 w-auto object-contain" />
              <span className="text-xs font-semibold text-slate-700">Toronto, Canada</span>
            </div>
          </div>
          <button type="button" onClick={closeSidebar} className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900" aria-label="Close navigation">
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <NavLink to="/" onClick={closeSidebar} drawer={compactNav} light={transparent}>
          Home
        </NavLink>

        <MegaMenu
          label="Services"
          groups={resolvedServiceGroups}
          teaser={servicesTeaser}
          basePath="/services"
          navRef={navRef}
          onNavigate={closeSidebar}
          light={transparent && !drawerOpen}
          drawerMode={compactNav}
        />

        <MegaMenu
          label="Industries"
          groups={resolvedIndustryGroups}
          teaser={industriesTeaser}
          basePath="/industries"
          navRef={navRef}
          onNavigate={closeSidebar}
          light={transparent && !drawerOpen}
          drawerMode={compactNav}
        />

        <MegaMenu
          label="Our Projects"
          groups={resolvedWorkGroups}
          teaser={workTeaser}
          basePath="/work"
          navRef={navRef}
          onNavigate={closeSidebar}
          light={transparent && !drawerOpen}
          drawerMode={compactNav}
        />

        <NavLink to="/#gallery" onClick={closeSidebar} drawer={compactNav} light={transparent}>
          Gallery
        </NavLink>

        <NavLink to="/data-security" onClick={closeSidebar} drawer={compactNav} light={transparent}>
          Security
        </NavLink>
        <NavLink to="/#faq" onClick={closeSidebar} drawer={compactNav} light={transparent}>
          FAQ
        </NavLink>
        <NavLink to="/#contact-us" onClick={closeSidebar} drawer={compactNav} light={transparent}>
          Contact Us
        </NavLink>

        <button
          type="button"
          onClick={() => {
            closeSidebar();
            window.dispatchEvent(new Event("open-retell-widget"));
          }}
          className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition hover:bg-blue-700 2xl:hidden"
        >
          Book Consultation
        </button>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={() => setSidebarOpen((open) => !open)}
          aria-label={sidebarOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={sidebarOpen}
          className={`rounded-full p-2 transition-colors 2xl:hidden ${transparent ? "text-white hover:bg-white/10" : "text-gray-800 hover:bg-gray-100"}`}
        >
          {sidebarOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
        </button>

        <motion.button
          type="button"
          onClick={() => window.dispatchEvent(new Event("open-retell-widget"))}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.25 }}
          className={`group hidden 2xl:flex items-center gap-2 rounded-full px-5 py-2 text-sm cursor-pointer transition-colors duration-300 ${
            transparent
              ? "border border-white/60 text-white hover:bg-white/10"
              : "bg-primary text-white"
          }`}
        >
          Book Consultation
          <img
            src={assets.arrow_icon}
            width={14}
            alt="arrow"
            className={`transition-transform duration-300 group-hover:translate-x-1 ${transparent ? "invert" : ""}`}
          />
        </motion.button>

        {/* Canada flag badge - hover reveals a "where we're based" tooltip. */}
        <div className="group relative hidden 2xl:block">
          <img
            src={assets.flag}
            alt="Canada"
            className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
          />
          <div className="pointer-events-none absolute right-0 top-full z-50 mt-2 w-max origin-top-right scale-95 rounded-xl border border-gray-100 bg-white px-4 py-2.5 text-right opacity-0 shadow-xl shadow-blue-900/10 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 dark:border-white/10 dark:bg-primary-deep dark:shadow-black/40">
            <p className="text-sm font-bold text-gray-900 dark:text-white">Toronto based</p>
            <p className="text-xs text-gray-500 dark:text-white/60">Proudly serving Toronto businesses</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
