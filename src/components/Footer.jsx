import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import { FiMail, FiMapPin, FiPhone, FiSend, FiUser } from "react-icons/fi";
import assets from "../assets/assets";
import { servicesMenu, industriesMenu } from "../data/menuData";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

// Permanently dark, like the FAQ section - a deliberate visual anchor at the
// bottom of an otherwise light page. The CTA banner inside it stays light
// (white/blue-shaded, matching the rest of the site) so it reads as a card
// sitting on top of the dark footer rather than blending into it.
const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    category: "",
    description: "",
  });
  const [formStatus, setFormStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name.trim() || !formData.phoneNumber.trim() || !formData.email.trim() || !formData.category) {
      toast.error("Please complete your name, phone, email, and business category.");
      return;
    }

    setFormStatus("loading");
    try {
      const response = await fetch(`${API_BASE_URL}/call-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          phoneNumber: formData.phoneNumber.trim(),
          email: formData.email.trim(),
          category: formData.category,
          description: formData.description.trim(),
          source: "contact_form",
        }),
      });
      const data = await response.json();
      if (!response.ok || data.success === false) throw new Error(data.error || "Unable to send your message");

      setFormStatus("success");
      setFormData({ name: "", phoneNumber: "", email: "", category: "", description: "" });
      toast.success("Thanks. Our team will be in touch shortly.");
    } catch (error) {
      setFormStatus("error");
      toast.error(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-primary-deep px-4 pt-10 text-white sm:px-10 sm:pt-14 lg:px-24 xl:px-40">
      {/* Contact form and business details */}
      <motion.div
        id="contact-us"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white/90 px-6 py-8 shadow-[0_18px_40px_-20px_rgba(30,64,175,0.18)] sm:px-10 sm:py-10"
      >
        <div className="pointer-events-none absolute -left-10 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-10 h-56 w-56 rounded-full bg-orange-400/10 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Contact Us</span>
            </div>
            <h2 className="font-elite mt-4 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
              Tell us what you want to <span className="text-primary">automate</span>.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
              Share a few details and our team will get back to you with the right next step.
            </p>

            <div className="mt-7 space-y-3 text-sm text-gray-600">
              <p className="flex items-center gap-3"><FiMapPin className="text-primary" /> Toronto, Canada</p>
              <p className="flex items-center gap-3"><FiUser className="text-primary" /> Faalak AI Automation</p>
              <a href="tel:+14169104547" className="flex items-center gap-3 hover:text-primary"><FiPhone className="text-primary" /> +1 416 910 4547</a>
              <a href="mailto:info@faalak.com" className="flex items-center gap-3 hover:text-primary"><FiMail className="text-primary" /> info@faalak.com</a>
              <a href="mailto:sales@faalak.com" className="flex items-center gap-3 hover:text-primary"><FiMail className="text-primary" /> sales@faalak.com</a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
            <input name="name" value={formData.name} onChange={handleChange} required placeholder="Name" autoComplete="name" className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary" />
            <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required type="tel" placeholder="Phone" autoComplete="tel" className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary" />
            <input name="email" value={formData.email} onChange={handleChange} required type="email" placeholder="Email" autoComplete="email" className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary" />
            <select name="category" value={formData.category} onChange={handleChange} required className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 outline-none focus:border-primary">
              <option value="">Business category</option>
              {industriesMenu.map((industry) => <option key={industry.slug} value={industry.name}>{industry.name}</option>)}
              <option value="Other">Other</option>
            </select>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Tell us about your business or what you need help with" className="sm:col-span-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary" />
            <button type="submit" disabled={formStatus === "loading"} className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition hover:scale-[1.02] disabled:cursor-wait disabled:opacity-70 sm:col-span-2">
              {formStatus === "loading" ? "Sending..." : "Send message"}
              {formStatus !== "loading" && <FiSend className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
            </button>
          </form>
        </div>
      </motion.div>

      {/* Link columns */}
      <div className="mt-12 grid grid-cols-1 gap-10 border-t border-white/10 pt-12 text-sm text-white/60 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={assets.logo_dark} alt="Faalak" className="h-9 w-auto object-contain" />
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/60">
            The voice that never tires. AI-powered voice agents and automation for inbound &amp; outbound calls.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://www.facebook.com/faalakai/"
              target="_blank"
              rel="noreferrer"
              aria-label="Faalak AI Automation Facebook"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <img src={assets.facebook_icon} alt="" className="h-4 w-4 brightness-0 invert" />
            </a>
            <a
              href="https://www.instagram.com/faalak.automation/"
              target="_blank"
              rel="noreferrer"
              aria-label="Faalak AI Automation Instagram"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <img src={assets.instagram_icon} alt="" className="h-4 w-4 brightness-0 invert" />
            </a>
            <a
              href="https://www.linkedin.com/company/faalak-ai-automation/"
              target="_blank"
              rel="noreferrer"
              aria-label="Faalak AI Automation LinkedIn"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
            >
              <img src={assets.linkedin_icon} alt="" className="h-4 w-4 brightness-0 invert" />
            </a>
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
