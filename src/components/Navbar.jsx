import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import assets from "../assets/assets";
import { motion } from "motion/react";
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

// How far you can scroll before the transparent-over-hero navbar switches to
// its solid form - small enough that it reacts almost immediately once you
// start scrolling, not a full section-height later.
const SCROLL_THRESHOLD = 40;

// Shared animated underline used on every plain nav link, so the hover
// treatment matches the MegaMenu triggers exactly instead of two different
// hover styles living side by side. `light` swaps it to white for when the
// navbar itself is transparent over the hero video.
const NavLink = ({ to, onClick, light, children }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`group relative py-1 transition-colors duration-300 ${
      light ? "text-white hover:text-white/80" : "hover:text-primary"
    }`}
  >
    {children}
    <span
      className={`pointer-events-none absolute -bottom-0.5 left-0 hidden h-[1.5px] w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 sm:block ${
        light ? "bg-white" : "bg-primary"
      }`}
    />
  </Link>
);

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeSidebar = () => setSidebarOpen(false);
  const navRef = useRef(null);
  const location = useLocation();

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

  return (
    <motion.div
      ref={navRef}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-4 fixed inset-x-0 top-0 z-40 border-b font-medium transition-colors duration-500 ${
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

      <div
        className={`${transparent ? "text-white" : "text-gray-700"} sm:text-sm ${
          !sidebarOpen
            ? "max-sm:w-0 overflow-hidden"
            : "max-sm:w-72 max-sm:pl-10 max-sm:pr-6"
        } max-sm:fixed top-0 bottom-0 right-0 max-sm:min-h-screen max-sm:h-full max-sm:flex-col max-sm:overflow-y-auto max-sm:bg-primary max-sm:text-white max-sm:pt-20 flex sm:items-center gap-5 transition-all`}
      >
        <img
          src={assets.close_icon}
          alt="close"
          className="w-5 absolute right-4 top-4 sm:hidden"
          onClick={closeSidebar}
        />

        <NavLink to="/" onClick={closeSidebar} light={transparent}>
          Home
        </NavLink>

        <MegaMenu
          label="Services"
          groups={resolvedServiceGroups}
          teaser={servicesTeaser}
          basePath="/services"
          navRef={navRef}
          onNavigate={closeSidebar}
          light={transparent}
        />

        <MegaMenu
          label="Industries"
          groups={resolvedIndustryGroups}
          teaser={industriesTeaser}
          basePath="/industries"
          navRef={navRef}
          onNavigate={closeSidebar}
          light={transparent}
        />

        <MegaMenu
          label="Our Projects"
          groups={resolvedWorkGroups}
          teaser={workTeaser}
          basePath="/work"
          navRef={navRef}
          onNavigate={closeSidebar}
          light={transparent}
        />

        <NavLink to="/data-security" onClick={closeSidebar} light={transparent}>
          Security
        </NavLink>
        <NavLink to="/#faq" onClick={closeSidebar} light={transparent}>
          FAQ
        </NavLink>
        <NavLink to="/#contact-us" onClick={closeSidebar} light={transparent}>
          Contact Us
        </NavLink>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <img
          src={transparent ? assets.menu_icon_dark : assets.menu_icon}
          alt="menu"
          onClick={() => setSidebarOpen(true)}
          className="w-8 sm:hidden"
        />

        <motion.button
          type="button"
          onClick={() => window.dispatchEvent(new Event("open-retell-widget"))}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.25 }}
          className={`group text-sm max-sm:hidden flex items-center gap-2 px-6 py-2 rounded-full cursor-pointer transition-colors duration-300 ${
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
      </div>
    </motion.div>
  );
};

export default Navbar;
