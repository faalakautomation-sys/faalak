import { motion } from "motion/react";
import { FiStar } from "react-icons/fi";
import { testimonialsData } from "../assets/assets";
import Title from "./Title";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";
import ScrollArrows from "./ScrollArrows";

const TestimonialCard = ({ item, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    viewport={{ once: true }}
    tabIndex={0}
    className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white/90 p-6 shadow-[0_18px_40px_-24px_rgba(30,64,175,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_50px_-18px_rgba(37,99,235,0.28)] focus-visible:-translate-y-1 focus-visible:border-blue-200 focus-visible:outline-none dark:border-gray-700 dark:bg-gray-900/90"
  >
    <div className="mb-3 flex items-center gap-1 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar key={i} className={`h-4 w-4 ${i < item.rating ? "fill-current" : "text-gray-300 dark:text-gray-600"}`} />
      ))}
    </div>
    <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">&ldquo;{item.quote}&rdquo;</p>

    {item.detail && (
      <div className="mt-3 grid grid-rows-[0fr] opacity-0 transition-all duration-300 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-visible:grid-rows-[1fr] group-focus-visible:opacity-100">
        <div className="overflow-hidden">
          <p className="border-t border-blue-100 pt-3 text-xs leading-5 text-gray-500 dark:border-blue-500/20 dark:text-gray-400">
            {item.detail}
          </p>
        </div>
      </div>
    )}

    <div className="mt-auto flex items-center gap-3 pt-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-400/15 text-sm font-semibold text-blue-700 dark:from-blue-500/25 dark:to-cyan-400/25 dark:text-blue-100">
        {item.name.charAt(0)}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{item.role}</p>
      </div>
    </div>
  </motion.article>
);

const Testimonials = () => {
  const { ref, canScrollLeft, canScrollRight, scrollByStep } = useHorizontalScroll();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      id="testimonials"
      className="flex flex-col items-center gap-7 px-4 pt-20 sm:px-12 lg:px-24 xl:px-40 text-gray-800 dark:text-white"
    >
      <Title
        title="What Our Clients Say"
        desc="Real businesses using Faalak AI voice agents and automation to stop losing leads."
      />

      <div className="relative w-full max-w-6xl">
        <div
          ref={ref}
          className="no-scrollbar -mx-4 flex w-full snap-x snap-mandatory items-stretch gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:snap-none sm:overflow-visible sm:px-0 sm:pb-0 sm:grid-cols-2 xl:grid-cols-4"
        >
          {testimonialsData.map((item, index) => (
            <div key={item.name} className="h-full w-[80%] shrink-0 snap-center sm:w-auto sm:shrink">
              <TestimonialCard item={item} index={index} />
            </div>
          ))}
        </div>
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

export default Testimonials;
