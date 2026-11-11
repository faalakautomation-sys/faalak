import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  FiBookOpen,
  FiChevronDown,
  FiFileText,
  FiFolder,
  FiHelpCircle,
  FiLock,
  FiPhoneCall,
  FiPlayCircle,
  FiZap,
} from "react-icons/fi";

const CLOSE_DELAY = 180;

const resourceGroups = [
  {
    title: "EXPLORE FAALAK",
    items: [
      { label: "Case studies", description: "See how businesses use Faalak.", to: "/resources/case-studies", icon: FiFolder },
      { label: "How it works", description: "Follow a call through to WhatsApp.", to: "/resources/how-it-works", icon: FiZap },
      { label: "Security", description: "Learn how we protect your information.", to: "/resources/security", icon: FiLock },
    ],
  },
  {
    title: "LEARN",
    items: [
      { label: "Guides & insights", description: "Practical ideas for handling more calls.", to: "/resources/guides-insights", icon: FiBookOpen },
      { label: "Blog", description: "Updates and ideas from the Faalak team.", to: "/resources/blog", icon: FiFileText },
      { label: "Live demos", description: "Hear an example voice agent in action.", to: "/resources/live-demos", icon: FiPlayCircle },
      { label: "FAQs", description: "Answers to common questions.", to: "/resources/faqs", icon: FiHelpCircle },
    ],
  },
];

const ResourceLink = ({ item, onNavigate, drawerMode }) => {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      className={`group flex items-start gap-3 rounded-xl transition-colors ${
        drawerMode ? "px-3 py-3 hover:bg-white" : "px-2 py-3 hover:bg-slate-50"
      }`}
    >
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0054a8]">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span>
        <span className="block text-sm font-semibold text-slate-800 group-hover:text-[#0054a8]">
          {item.label}
        </span>
        <span className="mt-1 block text-xs leading-5 text-slate-500">{item.description}</span>
      </span>
    </Link>
  );
};

const ResourcesMenu = ({ navRef, onNavigate, light = false, drawerMode = false }) => {
  const [open, setOpen] = useState(false);
  const [panelTop, setPanelTop] = useState(0);
  const rootRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!open || drawerMode) return undefined;
    const updateTop = () => setPanelTop(navRef?.current?.getBoundingClientRect().bottom ?? 0);
    updateTop();
    window.addEventListener("resize", updateTop);
    return () => window.removeEventListener("resize", updateTop);
  }, [open, drawerMode, navRef]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const closeMenu = () => {
    clearTimeout(closeTimer.current);
    setOpen(false);
    onNavigate?.();
  };

  const closeSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  };

  return (
    <div
      ref={rootRef}
      className={drawerMode ? "w-full" : "w-full md:w-auto"}
      onMouseEnter={drawerMode ? undefined : () => {
        clearTimeout(closeTimer.current);
        setOpen(true);
      }}
      onMouseLeave={drawerMode ? undefined : closeSoon}
    >
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className={`group relative flex items-center gap-1 transition-colors duration-300 ${
          drawerMode
            ? "w-full justify-between rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-primary"
            : `w-full justify-between whitespace-nowrap py-1 md:w-auto md:justify-start md:text-[11px] lg:text-xs 2xl:text-sm ${light ? "text-white hover:text-white/80" : "hover:text-primary"}`
        }`}
      >
        Resources
        <FiChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        {!drawerMode && (
          <span
            className={`pointer-events-none absolute -bottom-0.5 left-0 hidden h-[1.5px] w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 md:block ${light ? "bg-white" : "bg-primary"}`}
          />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={drawerMode ? undefined : { top: panelTop }}
            className={
              drawerMode
                ? "relative mt-1 w-full overflow-hidden rounded-xl border border-slate-100 bg-slate-50"
                : "z-30 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-2xl md:fixed md:inset-x-0 md:mt-0"
            }
          >
            <div className={drawerMode ? "grid gap-3 p-3" : "mx-auto grid max-w-7xl gap-5 p-5 sm:p-7 md:grid-cols-[1fr_1fr_0.85fr] md:gap-7 lg:p-9"}>
              {resourceGroups.map((group) => (
                <section key={group.title} aria-label={group.title}>
                  <h2 className="px-2 text-xs font-bold tracking-[0.14em] text-slate-500">{group.title}</h2>
                  <div className="mt-2 grid gap-1">
                    {group.items.map((item) => (
                      <ResourceLink key={item.label} item={item} onNavigate={closeMenu} drawerMode={drawerMode} />
                    ))}
                  </div>
                </section>
              ))}

              <aside className={`rounded-2xl border border-slate-200 bg-slate-50 p-5 ${drawerMode ? "" : "md:p-6"}`}>
                <p className="text-xs font-bold tracking-[0.14em] text-slate-500">TAKE THE NEXT STEP</p>
                <h2 className="mt-3 text-xl font-semibold leading-tight tracking-tight text-slate-900">
                  See what Faalak can do for your business.
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Explore a live demo or talk with our team about your call workflow.
                </p>
                <div className="mt-5 grid gap-2">
                  <a
                    href="tel:+12896709108"
                    onClick={closeMenu}
                    className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:text-[#0054a8]"
                  >
                    <FiPhoneCall className="h-5 w-5 text-[#0054a8]" aria-hidden="true" />
                    Hear a demo · (289) 670-9108
                  </a>
                  <Link
                    to="/#contact-us"
                    onClick={closeMenu}
                    className="inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-200 hover:text-[#0054a8]"
                  >
                    <FiZap className="h-5 w-5 text-[#0054a8]" aria-hidden="true" />
                    Book a consultation
                  </Link>
                </div>
              </aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResourcesMenu;
