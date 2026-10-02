import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";
import DataCenterVisual from "./DataCenterVisual";

// A wide "mega menu" panel: a teaser tile on the left, grouped/labeled
// columns of links (with arrow icons) on the right.
//
// Opens on hover (mouse enter anywhere in the trigger+panel area, with a
// short close delay so crossing the small gap between button and panel
// doesn't flicker it shut) AND on click, so it behaves the same on touch
// devices - which never fire hover - as it does with a mouse.
//
// The panel is `fixed` and positioned using the navbar's own measured
// height (via navRef) rather than being anchored to this trigger button, so
// it can span the full viewport width like the reference design instead of
// being squeezed under a single nav link. At `sm:` and below it drops back
// to a normal in-flow block (the inline `top` style becomes a no-op once
// position isn't fixed/absolute), so it just expands inline inside the
// mobile sidebar instead of trying to float a full-width panel there.
const CLOSE_DELAY = 180;

const MegaMenu = ({ label, groups, teaser, basePath, navRef, onNavigate, light = false, drawerMode = false }) => {
  const [open, setOpen] = useState(false);
  const [panelTop, setPanelTop] = useState(0);
  const rootRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!open) return;
    const updateTop = () => setPanelTop(navRef?.current?.getBoundingClientRect().bottom ?? 0);
    updateTop();
    window.addEventListener("resize", updateTop);
    return () => window.removeEventListener("resize", updateTop);
  }, [open, navRef]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const openNow = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const closeSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY);
  };

  const handleSelect = () => {
    clearTimeout(closeTimer.current);
    setOpen(false);
    onNavigate?.();
  };

  return (
    <div
      ref={rootRef}
      className={drawerMode ? "w-full" : "w-full md:w-auto"}
      onMouseEnter={drawerMode ? undefined : openNow}
      onMouseLeave={drawerMode ? undefined : closeSoon}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className={`group relative flex items-center gap-1 transition-colors duration-300 ${
          drawerMode
            ? "w-full justify-between rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-primary"
            : `w-full justify-between whitespace-nowrap py-1 md:w-auto md:justify-start md:text-[11px] lg:text-xs 2xl:text-sm ${light ? "text-white hover:text-white/80" : "hover:text-primary"}`
        }`}
      >
        {label}
        <FiChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
        <span
          className={`pointer-events-none absolute -bottom-0.5 left-0 hidden h-[1.5px] w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 md:block ${light ? "bg-white" : "bg-primary"}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={drawerMode ? undefined : { top: panelTop }}
            className={drawerMode
              ? "relative mt-1 w-full overflow-hidden rounded-xl border border-slate-100 bg-slate-50 text-slate-700"
              : "z-30 mt-2 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white text-gray-700 shadow-2xl md:fixed md:inset-x-0 md:mt-0 md:rounded-none md:border-x-0 md:border-b dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"}
          >
            <div className={drawerMode ? "grid gap-5 p-4" : "mx-auto grid max-w-6xl gap-8 p-6 md:grid-cols-[180px_1fr] md:gap-6 lg:grid-cols-[220px_1fr] lg:gap-10 lg:p-10"}>
              {/* Teaser column */}
              <div className={`${drawerMode ? "hidden" : "hidden border-gray-100 pr-2 md:block md:border-r dark:border-gray-800"}`}>
                <div className="h-36 w-full overflow-hidden rounded-2xl shadow-[0_14px_30px_-14px_rgba(0,0,0,0.4)]">
                  {teaser.image ? (
                    <img
                      src={teaser.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <DataCenterVisual accent={teaser.visual} />
                  )}
                </div>
                <p className="mt-4 text-sm font-semibold text-gray-900 dark:text-gray-100">{teaser.heading}</p>
                <p className="mt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">{teaser.blurb}</p>
                <Link
                  to={teaser.href}
                  onClick={handleSelect}
                  className="group/link mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  {teaser.linkLabel}{" "}
                  <FiArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>

              {/* Grouped link columns */}
              <div className={drawerMode ? "grid gap-5" : "grid gap-8 md:grid-cols-3"}>
                {groups.map((group) => (
                  <div key={group.title}>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">{group.title}</h3>
                    <ul className="mt-3 space-y-2.5">
                      {group.items.map((item) => (
                        <li key={item.slug}>
                          <Link
                            to={`${basePath}/${item.slug}`}
                            onClick={handleSelect}
                            className="group inline-flex items-center gap-1.5 text-sm text-gray-700 transition-colors duration-300 hover:text-primary dark:text-gray-300"
                          >
                            {item.name}
                            <FiArrowRight className="h-3.5 w-3.5 -translate-x-1 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MegaMenu;
