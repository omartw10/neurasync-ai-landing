import React, { useState, useMemo } from "react";
import assets from "../assets/assets";
import ThemeToggleBtn from "./ThemeToggleBtn";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ theme, setTheme }) => {
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const isInboxPilotPage = location.pathname === "/inboxpilot";
  const isAboutPage = location.pathname === "/about";

  const handleEmailClick = () => {
    setContactOpen(false);
    scrollToSection(null, isInboxPilotPage ? "contact-inboxpilot" : "contact-us");
  };

  const scrollToSection = (e, id) => {
    if (e) e.preventDefault();

    const safeScroll = () => {
      const section = document.getElementById(id);
      if (!section) return false;
      const offset = 100;
      const y = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
      window.location.hash = `#${id}`;
      return true;
    };

    if (id === "about") {
      navigate("/about");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (safeScroll()) {
      return;
    }

    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      window.location.hash = `#${id}`;
    } else {
      window.location.hash = `#${id}`;
    }

    setTimeout(() => {
      safeScroll();
    }, 200);
  };

  const navLinks = useMemo(() => {
    if (isInboxPilotPage) {
      return [
        { id: "hero", label: "Home" },
        { id: "inboxpilot-hero", label: "Overview" },
        { id: "inboxpilot", label: "How It Works" },
        { id: "inboxpilot-video", label: "Demo" },
        { id: "inboxpilot-features", label: "Features" },
        { id: "inboxpilot-pricing", label: "Pricing" }
      ];
    }
    if (isAboutPage) {
      return [
        { id: "hero", label: "Home" },
        { id: "about-hero", label: "About" },
        { id: "about-why", label: "Why Us" },
        { id: "about-what", label: "Products" },
        { id: "about-approach", label: "Approach" },
        { id: "about-founder", label: "Founder" }
      ];
    }
    return [
      { id: "hero", label: "Home" },
      { id: "about", label: "About" },
      { id: "inboxpilot", label: "InboxPilot" },
      { id: "our-work", label: "Our Services" },
      { id: "founder", label: "Founder" }
    ];
  }, [isInboxPilotPage, isAboutPage]);

  // Active section tracker
  React.useEffect(() => {
    const handleScroll = () => {
      const trigger = window.innerHeight / 3;
      let current = "";

      // Reverse so we match the last/lowest section intersecting
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(navLinks[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the element is above our trigger line, it's the active one
          if (rect.top <= trigger) {
            current = navLinks[i].id;
            break;
          }
        }
      }

      if (!current && navLinks.length > 0) {
        current = navLinks[0].id;
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

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
            alt="NeuraSyncAI"
            className="h-8 sm:h-9 object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </button>

        {/* Floating Links Pill */}
        <div className="hidden lg:flex items-center gap-1 p-1 bg-gray-100/60 dark:bg-white/5 rounded-xl border border-gray-200/50 dark:border-white/5 shadow-inner dark:shadow-none relative">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button 
                key={item.id} 
                onClick={(e) => scrollToSection(e, item.id)} 
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer relative z-10 ${
                  isActive 
                    ? "text-gray-900 dark:text-white bg-white dark:bg-white/10 shadow-sm" 
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            );
          })}
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
            className="bg-gradient-to-r from-[#00C2D1] to-[#00A8B5] text-[#0B1F3B] px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(0,194,209,0.4)] transition-all duration-300 active:scale-95 text-[12px] sm:text-[13px] hidden sm:block"
          >
            Dashboard
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </motion.div>

      {/* ===== MOBILE DROPDOWN MENU ===== */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-[88px] left-4 right-4 z-40 bg-white/95 dark:bg-[#0A101C]/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-lg rounded-2xl p-4 lg:hidden flex flex-col gap-2"
        >
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  scrollToSection(e, item.id);
                }}
                className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-[#00C2D1] bg-[#00C2D1]/10"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="h-px bg-gray-200 dark:bg-white/10 my-1" />
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="text-center bg-gradient-to-r from-[#00C2D1] to-[#00A8B5] text-[#0B1F3B] px-5 py-3 rounded-xl font-bold mt-2"
          >
            Go to Dashboard
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setContactOpen(true);
            }}
            className="text-center border border-[#00C2D1] text-[#00C2D1] px-5 py-3 rounded-xl font-bold"
          >
            Contact Sales
          </button>
        </motion.div>
      )}

      {/* ===== CONTACT MODAL ===== */}
      {contactOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0E1624] rounded-xl p-8 w-80 text-center shadow-2xl">

            <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
              Contact NeuraSyncAI
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
