import { useRef, useState } from "react";
import { motion } from "motion/react";

const ServiceCard = ({ service, index }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    const bounds = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white/90 shadow-[0_18px_40px_-20px_rgba(30,41,59,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 dark:border-gray-700 dark:bg-gray-900/90 dark:shadow-[0_18px_40px_-18px_rgba(56,189,248,0.14)]"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      ref={divRef}
      onMouseMove={handleMouseMove}
    >
      <div
        className={`pointer-events-none blur-2xl rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400 w-[300px] h-[300px] absolute z-0 transition-opacity duration-500 mix-blend-lighten ${
          visible ? "opacity-70" : "opacity-0"
        }`}
        style={{ top: position.y - 150, left: position.x - 150 }}
      />

      <div className="relative z-10 flex h-full flex-col gap-5 p-6 md:p-7">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-400/10 p-3 text-blue-600 dark:from-blue-500/20 dark:to-cyan-400/20 dark:text-cyan-300">
            <service.icon aria-label={`${service.title} icon`} className="h-12 w-12 rounded-xl bg-white/90 p-2 dark:bg-gray-800/90" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{service.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">Premium AI automation</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300">{service.description}</p>

        <div className="flex flex-wrap gap-2">
          {service.benefits.map((benefit) => (
            <span
              key={benefit}
              className="rounded-full border border-blue-100 bg-blue-50/80 px-3 py-1 text-xs font-semibold text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-100"
            >
              {benefit}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;