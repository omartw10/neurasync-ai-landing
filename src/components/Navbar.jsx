/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import assets from "../assets/assets";
import ThemeToggleBtn from "./ThemeToggleBtn";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ theme, setTheme }) => {
  const [contactOpen, setContactOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleEmailClick = () => {
    setContactOpen(false);
    scrollToSection(null, "contact-us");
  };

  const scrollToSection = (e, id) => {
    if (e) e.preventDefault();
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
    } else {
      const section = document.getElementById(id);
      section?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl flex justify-between items-center px-4 sm:px-5 py-3 rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-[#0A101C]/80 border border-gray-200/50 dark:border-white/10 shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
      >
        {/* Logo */}
        <button onClick={(e) => scrollToSection(e, "hero")} className="shrink-0 group flex items-center cursor-pointer">
          <img
            src={theme === "dark" ? assets.logo_dark : assets.logo}
            alt="NeuraSync"
            className="h-8 sm:h-9 object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </button>

        {/* Floating Links Pill */}
        <div className="hidden lg:flex items-center gap-1 p-1 bg-gray-100/60 dark:bg-white/5 rounded-xl border border-gray-200/50 dark:border-white/5 shadow-inner dark:shadow-none">
          {[
            { id: "hero", label: "Home" },
            { id: "inboxpilot", label: "InboxPilot" },
            { id: "solutions", label: "Services" },
            { id: "our-work", label: "Our Work" },
            { id: "founder", label: "Founder" }
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={(e) => scrollToSection(e, item.id)} 
              className="px-4 py-1.5 rounded-lg text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 hover:shadow-sm dark:hover:shadow-none transition-all duration-300 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1 sm:gap-3">
          <ThemeToggleBtn theme={theme} setTheme={setTheme} />

          <button
            onClick={() => setContactOpen(true)}
            className="hidden xl:block px-3 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            Contact Sales
          </button>

          <Link
            to="/dashboard"
            className="hidden md:flex px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-[#00C2D1] inline-flex items-center gap-1 group transition-colors"
          >
            Log in
            <span className="text-gray-400 group-hover:text-[#00C2D1] transition-colors">&rarr;</span>
          </Link>

          <Link
            to="/dashboard"
            className="bg-gradient-to-r from-[#00C2D1] to-[#00A8B5] text-[#0B1F3B] px-5 py-2.5 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(0,194,209,0.4)] transition-all duration-300 active:scale-95 text-[13px] hidden sm:block"
          >
            Go to Dashboard
          </Link>
        </div>
      </motion.div>

      {/* ===== CONTACT MODAL ===== */}
      {contactOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0E1624] rounded-xl p-8 w-80 text-center shadow-2xl">

            <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
              Contact NeuraSync AI
            </h3>

            <div className="flex flex-col gap-4">

              <a
                href="https://wa.me/218926467332"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#00C2D1] text-[#0B1F3B] py-2.5 rounded-lg font-semibold hover:bg-[#00A8B5] transition"
              >
                WhatsApp
              </a>

              <button
                onClick={handleEmailClick}
                className="border border-[#00C2D1] text-[#00C2D1] py-2.5 rounded-lg font-semibold hover:bg-[#00C2D1] hover:text-[#0B1F3B] transition"
              >
                Email
              </button>

            </div>

            <button
              onClick={() => setContactOpen(false)}
              className="mt-6 text-sm text-gray-500 hover:text-[#00C2D1]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;