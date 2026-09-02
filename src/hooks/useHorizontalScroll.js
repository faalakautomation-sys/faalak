import { useCallback, useEffect, useRef, useState } from "react";

// Powers every horizontally-scrollable row on the site (TrustedBy logos,
// Hero's button/badge rows, Services, OurWork, WhyChooseUs, Testimonials,
// OurTeam). Tracks whether there's more content to either side so the arrow
// buttons only show when they'd actually do something, and steps the scroll
// "little by little" (one card-width-ish increment) per click rather than
// jumping straight to the end.
export function useHorizontalScroll() {
  const ref = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    // Content can change size after mount (images loading, fonts swapping in)
    // without a scroll or resize event firing, so also watch the element itself.
    const observer = new ResizeObserver(update);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, [update]);

  const scrollByStep = useCallback((direction) => {
    const el = ref.current;
    if (!el) return;
    // Step by ~85% of the visible width - lands close to the next card
    // without jumping past several at once.
    el.scrollBy({ left: el.clientWidth * 0.85 * direction, behavior: "smooth" });
  }, []);

  return { ref, canScrollLeft, canScrollRight, scrollByStep };
}
