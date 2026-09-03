import { servicesData } from "../assets/assets";
import ServiceCard from "./ServiceCard";
import Title from "./Title";
import { motion } from "motion/react";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";
import ScrollArrows from "./ScrollArrows";

const Services = () => {
  const { ref, canScrollLeft, canScrollRight, scrollByStep } = useHorizontalScroll();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
      id="services"
      className="relative flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-64 rounded-full bg-gradient-to-r from-sky-500/10 via-blue-400/10 to-cyan-400/10 blur-3xl" />

      <Title
        title={"AI Automation Services Built to Convert"}
        desc={
          "Launch premium voice, chat, and workflow automations that capture leads, book appointments, and keep your pipeline moving 24/7."
        }
      />

      <div className="relative w-full max-w-6xl">
        <div
          ref={ref}
          className="no-scrollbar -mx-4 flex w-full snap-x snap-mandatory items-stretch gap-6 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:snap-none sm:overflow-visible sm:px-0 sm:pb-0 md:grid-cols-2 xl:grid-cols-3"
        >
          {servicesData.map((service, index) => (
            <div key={index} className="h-full w-[82%] shrink-0 snap-center sm:w-auto sm:shrink">
              <ServiceCard service={service} index={index} />
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

export default Services;