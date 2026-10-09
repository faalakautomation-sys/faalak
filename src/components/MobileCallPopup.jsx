import { useEffect, useRef, useState } from "react";
import { FiPhone, FiX } from "react-icons/fi";

const DISMISSED_KEY = "faalak-mobile-call-popup-seen";
const CALL_NUMBER = "+12896709108";

const MobileCallPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (window.sessionStorage.getItem(DISMISSED_KEY)) return undefined;

    const timer = window.setTimeout(() => {
      if (window.matchMedia("(max-width: 767px)").matches) {
        window.sessionStorage.setItem(DISMISSED_KEY, "true");
        setIsOpen(true);
      }
    }, 3000);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-9998 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm md:hidden"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setIsOpen(false);
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-call-popup-title"
        aria-describedby="mobile-call-popup-description"
        className="relative w-full max-w-md rounded-[2rem] bg-white px-6 pb-8 pt-16 text-center shadow-2xl sm:px-10 sm:pb-10 sm:pt-16"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close call popup"
          className="absolute right-5 top-5 flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border-2 border-primary text-slate-500 transition hover:bg-blue-50 hover:text-primary"
        >
          <FiX className="h-6 w-6" />
        </button>

        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[2rem] bg-blue-100 text-primary">
          <FiPhone className="h-14 w-14" aria-hidden="true" />
        </div>

        <h2
          id="mobile-call-popup-title"
          className="mt-8 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl"
        >
          Hear Faalak in action
        </h2>
        <p
          id="mobile-call-popup-description"
          className="mt-4 text-lg leading-8 text-slate-600 sm:text-xl"
        >
          Call our AI/SI phone answering service right now — experience the voice your callers will hear.
        </p>

        <a
          href={`tel:${CALL_NUMBER}`}
          className="mt-8 flex min-h-24 cursor-pointer items-center justify-center gap-4 rounded-2xl bg-primary px-5 py-5 text-2xl font-bold leading-tight text-white shadow-[0_16px_30px_-12px_rgba(29,78,216,0.5)] transition hover:bg-blue-700 active:scale-[0.98] sm:text-3xl"
        >
          <FiPhone className="h-7 w-7 shrink-0" aria-hidden="true" />
          <span>Call (289) 670-9108</span>
        </a>

        <p className="mt-6 text-base leading-7 text-slate-500 sm:text-lg">
          Available 24/7. No signup required.
        </p>
      </section>
    </div>
  );
};

export default MobileCallPopup;
