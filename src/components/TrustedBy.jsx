import { trustedBrands } from "../assets/assets";
import { motion } from "motion/react";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";
import ScrollArrows from "./ScrollArrows";

const TrustedBy = () => {
  const { ref, canScrollLeft, canScrollRight, scrollByStep } = useHorizontalScroll();

  return (
    <motion.div
      id="industries"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex flex-col items-center px-4 sm:px-12 lg:px-24 xl:px-40 gap-10 text-gray-700 dark:text-white/80"
    >
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="font-semibold"
      >
        Trusted by ambitious teams building smarter customer journeys
      </motion.h3>

      <div className="relative w-full max-w-full">
        {/* Edge fades hint that the row scrolls, instead of hard-cutting logos */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent dark:from-gray-950 sm:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent dark:from-gray-950 sm:w-16" />

        <motion.div
          ref={ref}
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="no-scrollbar flex items-center gap-4 overflow-x-auto scroll-smooth px-6 py-2 sm:justify-center sm:gap-6"
        >
          {trustedBrands.map((brand, index) => (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              key={brand}
              className="shrink-0 whitespace-nowrap rounded-2xl border border-gray-200 bg-white/90 px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-900/90 dark:text-gray-100"
            >
              {brand}
            </motion.div>
          ))}
        </motion.div>

        <ScrollArrows
          canScrollLeft={canScrollLeft}
          canScrollRight={canScrollRight}
          onLeft={() => scrollByStep(-1)}
          onRight={() => scrollByStep(1)}
        />
      </div>
    </motion.div>
  );
};

export default TrustedBy;