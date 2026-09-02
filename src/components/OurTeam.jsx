import { motion } from "motion/react";
import { teamData } from "../assets/assets";
import Title from "./Title";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";
import ScrollArrows from "./ScrollArrows";

const TeamCard = ({ member, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
    viewport={{ once: true }}
    className="flex flex-col items-center rounded-3xl border border-gray-200 bg-white/90 p-6 text-center shadow-[0_18px_40px_-24px_rgba(30,64,175,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 dark:border-gray-700 dark:bg-gray-900/90"
  >
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-400/15 text-2xl font-semibold text-blue-700 dark:from-blue-500/25 dark:to-cyan-400/25 dark:text-blue-100">
      {member.name.charAt(0)}
    </div>
    <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-white">{member.name}</h3>
    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
  </motion.article>
);

const OurTeam = () => {
  const { ref, canScrollLeft, canScrollRight, scrollByStep } = useHorizontalScroll();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      id="team"
      className="flex flex-col items-center gap-7 px-4 pt-20 sm:px-12 lg:px-24 xl:px-40 text-gray-800 dark:text-white"
    >
      <Title
        title="Our Team"
        desc="The people behind Faalak's AI voice agents and automation — building, deploying, and supporting your systems end to end."
      />

      <div className="relative w-full max-w-5xl">
        <div
          ref={ref}
          className="no-scrollbar -mx-4 flex w-full snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:snap-none sm:overflow-visible sm:px-0 sm:pb-0 sm:grid-cols-2 xl:grid-cols-4"
        >
          {teamData.map((member, index) => (
            <div key={member.name} className="w-[45%] shrink-0 snap-center sm:w-auto sm:shrink">
              <TeamCard member={member} index={index} />
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

export default OurTeam;
