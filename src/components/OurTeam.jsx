import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiX } from "react-icons/fi";
import { teamData } from "../assets/assets";

const TeamMemberModal = ({ member, onClose }) => {
  const Icon = member.icon;

  return (
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
        className="relative w-full max-w-sm border border-[#ded8d0] bg-[#f5f3ef] p-7 text-center shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#68635d] transition hover:bg-white hover:text-[#201e1c]"
        >
          <FiX className="h-4 w-4" />
        </button>

        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#b9b4ae] bg-[#f8f7f4] text-[#24211e]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-lg font-semibold text-[#201e1c]">{member.name}</h3>
        <p className="mt-1 text-sm font-medium text-[#0054a8]">{member.role}</p>
        <p className="mt-4 text-sm leading-6 text-[#68635d]">{member.bio}</p>
      </motion.div>
    </motion.div>
  );
};

const OurTeam = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="px-4 py-10 sm:px-12 sm:py-12 lg:px-16 xl:px-24"
    >
      <div className="mx-auto max-w-7xl border-x border-t border-[#ded8d0] bg-[#f5f3ef] px-5 pb-0 pt-8 sm:px-10 sm:pt-10 lg:px-12">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#0054a8]" />
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0054a8]">
            The people behind Faalak
          </p>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          <h2
            id="team-title"
            className="font-display max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#171717] sm:text-4xl md:text-5xl"
          >
            Our Team
          </h2>
          <p className="max-w-xl pb-1 text-sm leading-6 text-[#68635d] sm:text-base lg:justify-self-end">
            Meet the people building, deploying, and supporting Faalak&apos;s AI/SI voice agents and automation.
          </p>
        </div>

        <div className="mt-7 grid border-l border-t border-[#e2ddd6] sm:grid-cols-2 lg:grid-cols-3">
          {teamData.map((member, index) => {
            const Icon = member.icon;
            return (
              <motion.button
                key={member.name}
                type="button"
                onClick={() => setSelectedMember(member)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                viewport={{ once: true }}
                aria-label={`View details for ${member.name}`}
                className="flex min-h-[180px] flex-col items-center border-b border-r border-[#e2ddd6] px-5 py-6 text-center transition-colors hover:bg-[#f8f7f4] focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#0054a8] sm:min-h-[190px] sm:px-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#b9b4ae] bg-[#f8f7f4] text-[#24211e]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-base font-semibold tracking-[-0.02em] text-[#201e1c]">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm leading-5 text-[#687184]">{member.role}</p>
                <span className="mt-2 text-xs font-medium text-[#0054a8]">View profile</span>
              </motion.button>
            );
          })}
        </div>
        <div className="border-b border-[#ded8d0]" />
      </div>

      <AnimatePresence>
        {selectedMember && (
          <TeamMemberModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default OurTeam;
