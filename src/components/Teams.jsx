import Title from "./Title";
import { whyChooseUsData } from "../assets/assets";
import { motion } from "motion/react";

const Teams = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      id="about"
      className="flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-800 dark:text-white"
    >
      <Title
        title="Why Choose Us"
        desc="We combine human-like conversations, fast deployment, and CRM-ready automation to help your business convert more leads with less manual effort."
      />

      <div className="grid w-full max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-3">
        {whyChooseUsData.map((item, index) => (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            viewport={{ once: true }}
            key={item.title}
            className="rounded-3xl border border-gray-200 bg-white/90 p-6 shadow-[0_18px_40px_-20px_rgba(30,64,175,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 dark:border-gray-700 dark:bg-gray-900/90"
          >
            <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-400/10 p-3 text-2xl dark:from-blue-500/20 dark:to-cyan-400/20">
              <item.icon className="h-6 w-6 text-blue-700 dark:text-blue-100" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
};

export default Teams;