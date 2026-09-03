import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiX } from "react-icons/fi";
import { teamData } from "../assets/assets";
import Title from "./Title";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";
import ScrollArrows from "./ScrollArrows";

// Every card is forced to the same footprint (h-full + line-clamp on the
// name/role) regardless of how long a given name or title is - e.g. "Barrister
// Bahadur Bukhari" vs "Madiha" - so the grid/scroll row never has mismatched
// card heights.
const TeamCard = ({ member, index, onOpen }) => (
  <motion.button
    type="button"
    onClick={() => onOpen(member)}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
    viewport={{ once: true }}
    className="flex h-full w-full flex-col items-center rounded-3xl border border-gray-200 bg-white/90 p-6 text-center shadow-[0_18px_40px_-24px_rgba(30,64,175,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-gray-700 dark:bg-gray-900/90"
  >
    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-400/15 text-blue-700 dark:from-blue-500/25 dark:to-cyan-400/25 dark:text-blue-100">
      <member.icon className="h-8 w-8" />
    </div>
    <h3 className="mt-4 line-clamp-2 min-h-11 text-base font-semibold text-gray-900 dark:text-white">
      {member.name}
    </h3>
    <p className="mt-1 line-clamp-2 min-h-10 text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
  </motion.button>
);

const TeamMemberModal = ({ member, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    className="fixed inset-0 z-9998 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
  >
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      transition={{ duration: 0.2 }}
      onClick={(event) => event.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-label={`${member.name} details`}
      className="relative w-full max-w-sm rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-2xl dark:border-gray-700 dark:bg-gray-900"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
      >
        <FiX className="h-4 w-4" />
      </button>

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-400/15 text-blue-700 dark:from-blue-500/25 dark:to-cyan-400/25 dark:text-blue-100">
        <member.icon className="h-8 w-8" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h3>
      <p className="mt-1 text-sm font-medium text-blue-700 dark:text-blue-300">{member.role}</p>
      <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">{member.bio}</p>
    </motion.div>
  </motion.div>
);

const OurTeam = () => {
  const { ref, canScrollLeft, canScrollRight, scrollByStep } = useHorizontalScroll();
  const [selectedMember, setSelectedMember] = useState(null);

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
          className="no-scrollbar -mx-4 flex w-full snap-x snap-mandatory items-stretch gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:snap-none sm:overflow-visible sm:px-0 sm:pb-0 sm:grid-cols-2 xl:grid-cols-5"
        >
          {teamData.map((member, index) => (
            <div key={member.name} className="w-[70%] shrink-0 snap-center sm:w-auto sm:shrink">
              <TeamCard member={member} index={index} onOpen={setSelectedMember} />
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

      <AnimatePresence>
        {selectedMember && (
          <TeamMemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OurTeam;
