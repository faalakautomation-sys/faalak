import { servicesData } from "../assets/assets";
import ServiceCard from "./ServiceCard";
import Title from "./Title";
import { motion } from "motion/react";

const Services = () => {

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

      <div className="grid w-full max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-3">
        {servicesData.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default Services;