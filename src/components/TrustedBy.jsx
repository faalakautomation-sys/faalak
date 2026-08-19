import { trustedBrands } from "../assets/assets";
import { motion } from "motion/react";

const TrustedBy = () => {
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

      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.1 }}
        viewport={{ once: true }}
        className="flex items-center justify-center flex-wrap gap-10 m-4"
      >
        {trustedBrands.map((brand, index) => (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            key={brand}
            className="rounded-2xl border border-gray-200 bg-white/90 px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-900/90 dark:text-gray-100"
          >
            {brand}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TrustedBy;