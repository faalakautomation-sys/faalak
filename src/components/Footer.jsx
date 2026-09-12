import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { FiArrowRight } from "react-icons/fi";
import assets from "../assets/assets";
import { subscribeToNewsletter } from "../api/client";
import { servicesMenu, industriesMenu } from "../data/menuData";

// Permanently dark, like the FAQ section - a deliberate visual anchor at the
// bottom of an otherwise light page. The CTA banner inside it stays light
// (white/blue-shaded, matching the rest of the site) so it reads as a card
// sitting on top of the dark footer rather than blending into it.
const Footer = () => {
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

  const handleBookDemo = () => {
    const message = encodeURIComponent(
      "Hi, I'd like to book a demo with Faalak AI Automation."
    );
    window.open(`https://wa.me/14169104547?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-primary-deep px-4 pt-10 text-white sm:px-10 sm:pt-14 lg:px-24 xl:px-40">
      {/* CTA banner */}
      <motion.div
        id="contact-us"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-gray-200 bg-white/90 px-6 py-8 shadow-[0_18px_40px_-20px_rgba(30,64,175,0.18)] sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-10"
      >
        <div className="pointer-events-none absolute -left-10 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-10 h-56 w-56 rounded-full bg-orange-400/10 blur-3xl" />
        <div className="relative">
          <h2 className="font-elite text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
            Ready to automate your <span className="text-primary">calls</span>?
          </h2>
          <p className="relative mt-2 max-w-md text-sm text-gray-500">
            See Faalak AI Automation in action, book a 15 minute demo with our team.
          </p>
        </div>
        <button
          type="button"
          onClick={handleBookDemo}
          className="group relative inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition hover:scale-105"
        >
          Book Your Demo
          <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </motion.div>

      {/* Link columns */}
      <div className="mt-12 grid grid-cols-1 gap-10 border-t border-white/10 pt-12 text-sm text-white/60 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={assets.logo_dark} alt="Faalak" className="h-9 w-auto object-contain" />
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/60">
            The voice that never tires. AI-powered voice agents and automation for inbound &amp; outbound calls.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="mt-5 flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="Enter your email"
              aria-label="Email address for updates"
              disabled={isSubmitting}
              className="w-full min-w-0 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-primary"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:scale-105 disabled:cursor-wait disabled:opacity-70"
            >
              {isSubmitting ? "..." : "Subscribe"}
            </button>
          </form>

          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/faalak-ai-automation/"
              target="_blank"
              rel="noreferrer"
              aria-label="Faalak AI Automation LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <img src={assets.linkedin_icon} alt="" className="h-4 w-4 invert" />
            </a>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
              <img src={assets.twitter_icon} alt="Twitter" className="h-4 w-4 invert" />
            </span>
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/40">Company</p>
          <ul className="space-y-2.5">
            <li>
              <Link className="hover:text-primary" to="/#hero">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" to="/#about">
                About Us
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" to="/work">
                Case Studies
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" to="/#faq">
                FAQ
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" to="/data-security">
                Data Privacy &amp; Security
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" to="/#contact-us">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/40">Industries</p>
          {/* Two 7-item columns side by side, matching the reference layout. */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            <ul className="space-y-2.5">
              {industriesMenu.slice(0, 7).map((item) => (
                <li key={item.slug}>
                  <Link className="hover:text-primary" to={`/industries/${item.slug}`}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2.5">
              {industriesMenu.slice(7).map((item) => (
                <li key={item.slug}>
                  <Link className="hover:text-primary" to={`/industries/${item.slug}`}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/40">Services</p>
          <ul className="space-y-2.5">
            {servicesMenu.map((item) => (
              <li key={item.slug}>
                <Link className="hover:text-primary" to={`/services/${item.slug}`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* id read by RetellVoiceWidget.jsx to dock the "Talk to Maya" bubble
          above this row once it scrolls into view, instead of floating over it. */}
      <div
        id="footer-bottom-row"
        className="mt-10 flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>&copy; 2026 Faalak AI Automation &mdash; All Rights Reserved.</p>
        <div className="flex flex-wrap items-center gap-4">
          <span>Toronto, Canada</span>
          <a href="mailto:info@faalak.com" className="hover:text-primary">
            info@faalak.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
