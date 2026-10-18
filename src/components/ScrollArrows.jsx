import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Left/right nudge buttons for a horizontally-scrollable row - only rendered
// (via canScrollLeft/canScrollRight from useHorizontalScroll) when there's
// actually more content in that direction, and hidden entirely at `sm:` and
// up where these rows switch to a normal wrapped/grid layout and stop
// scrolling horizontally.
const ScrollArrows = ({ canScrollLeft, canScrollRight, onLeft, onRight }) => {
  if (!canScrollLeft && !canScrollRight) return null;

  const baseClass =
    "absolute top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/95 text-gray-700 shadow-md transition active:scale-90 sm:hidden dark:border-gray-700 dark:bg-gray-900/95 dark:text-gray-100";

  return (
    <>
      {canScrollLeft && (
        <button
          type="button"
          onClick={onLeft}
          aria-label="Scroll left"
          className={`${baseClass} left-0`}
        >
          <FiChevronLeft className="h-4 w-4" />
        </button>
      )}
      {canScrollRight && (
        <button
          type="button"
          onClick={onRight}
          aria-label="Scroll right"
          className={`${baseClass} right-0`}
        >
          <FiChevronRight className="h-4 w-4" />
        </button>
      )}
    </>
  );
};

export default ScrollArrows;
