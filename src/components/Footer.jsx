import assets from "../assets/assets";
import { motion } from "motion/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { subscribeToNewsletter } from "../api/client";

const Footer = ({ theme }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await subscribeToNewsletter(email);
      setEmail("");
      toast.success("You are subscribed to Faalak updates.");
    } catch (error) {
      toast.error(error.message || "Unable to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-slate-50 dark:bg-gray-900 pt-10 sm:pt-10 mt-20 sm:mt-40 px-4 sm:px-10 lg:px-24 xl:px-40"
    >
      {/* footer top */}
      <div className="flex justify-between lg:items-center max-lg:flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-5 text-sm text-gray-700 dark:text-gray-400"
        >
          <img
            src={theme === "dark" ? assets.logo_dark : assets.logo}
            alt="logo"
            className="h-10 w-auto object-contain sm:h-12"
          />
          <p className="max-w-md">
            Faalak AI Automation helps ambitious businesses automate conversations, capture more leads, and turn every inquiry into a booked call.
          </p>

          <ul className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
            <li>AI Voice Agents</li>
            <li>WhatsApp Automation</li>
            <li>Website Chatbots</li>
          </ul>
          <ul className="flex flex-wrap gap-8">
            <li>
              <a className="hover:text-primary" href="#hero">
                Home
              </a>
            </li>
            <li>
              <a className="hover:text-primary" href="#services">
                Services
              </a>
            </li>
            <li>
              <a className="hover:text-primary" href="#our-work">
                Case Studies
              </a>
            </li>
            <li>
              <a className="hover:text-primary" href="#about">
                About
              </a>
            </li>
            <li>
              <a className="hover:text-primary" href="#contact-us">
                Contact Us
              </a>
            </li>
          </ul>
        </motion.div>

        <motion.div
          id="contact-us"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-gray-600 dark:text-gray-400"
        >
          <p className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">Contact Information</p>
          <p className="text-sm">WhatsApp: +1 (416) 910-4547</p>
          <p className="text-sm">Email: info@faalak.com</p>
          <a
            href="https://www.linkedin.com/company/faalak/"
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block text-sm text-primary hover:underline"
          >
            LinkedIn: https://www.linkedin.com/company/faalak/
          </a>
          <h3 className="font-semibold">Explore AI automation</h3>
          <p className="text-sm mt-2 mb-6">
            Get practical ideas for AI voice agents, WhatsApp automation, and conversion-focused workflows.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="flex gap-2 text-sm">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="Enter your email"
              aria-label="Email address for updates"
              disabled={isSubmitting}
              className="w-full p-3 text-sm outline-none rounded dark:text-gray-200 bg-transparent border border-gray-300 dark:border-gray-500"
            />
            <button type="submit" disabled={isSubmitting} className="bg-primary text-white rounded px-6 disabled:cursor-wait disabled:opacity-70">
              {isSubmitting ? "Saving..." : "Get Updates"}
            </button>
          </form>
        </motion.div>
      </div>
      <hr className="border-gray-300 dark:border-gray-600 my-6" />

      {/* footer bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="pb-6 text-sm text-gray-500 flex justify-center sm:justify-between gap-4 flex-wrap"
      >
        <p>Copyright 2026 © Faalak AI Automation - All Rights Reserved.</p>
        <div className="flex items-center justify-between gap-4">
          <img src={assets.twitter_icon} alt="twitter" />
          <a
            href="https://www.linkedin.com/company/faalak-ai-automation/"
            target="_blank"
            rel="noreferrer"
            aria-label="Faalak AI Automation LinkedIn"
          >
            <img src={assets.linkedin_icon} alt="linkedin" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Footer;