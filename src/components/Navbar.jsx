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
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center px-4 sm:px-12 lg:px-24 xl:px-40 py-4 sticky top-0 z-40 backdrop-blur-xl bg-white/60 dark:bg-[#060D18]/80"
      >
        {/* Logo */}
        <Link to="/">
          <img
            src={theme === "dark" ? assets.logo_dark : assets.logo}
            alt="logo"
            className="h-10 sm:h-12"
          />
        </Link>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-200">
          <button onClick={(e) => scrollToSection(e, "hero")} className="hover:text-[#00C2D1] transition">
            Home
          </button>

          <button onClick={(e) => scrollToSection(e, "inboxpilot")} className="hover:text-[#00C2D1] transition">
            InboxPilot
          </button>

          <button onClick={(e) => scrollToSection(e, "solutions")} className="hover:text-[#00C2D1] transition">
            Services
          </button>

          <button onClick={(e) => scrollToSection(e, "our-work")} className="hover:text-[#00C2D1] transition">
            Our Work
          </button>
          
          <button onClick={(e) => scrollToSection(e, "founder")} className="hover:text-[#00C2D1] transition">
            Founder
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          <ThemeToggleBtn theme={theme} setTheme={setTheme} />

          <button
            onClick={() => setContactOpen(true)}
            className="hidden lg:block text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-[#00C2D1] transition"
          >
            Contact Sales
          </button>

          <Link
            to="/dashboard"
            className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-[#00C2D1] transition"
          >
            Log in
          </Link>

          <Link
            to="/dashboard"
            className="bg-[#00C2D1] text-[#0B1F3B] px-5 py-2 rounded-lg font-semibold hover:bg-[#00A8B5] transition shadow-lg shadow-[#00C2D1]/30 text-sm hidden sm:block"
          >
            Go to Dashboard &rarr;
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