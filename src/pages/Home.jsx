import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

import OurWork from "../components/OurWork";
import Teams from "../components/Teams";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import PoweredByInboxPilot from "../components/PoweredByInboxPilot";
import ScrollJourneyMap from "../components/ScrollJourneyMap";
const Home = ({ theme, setTheme }) => {
  const location = useLocation();

  // ===== Scroll to hash (for cross-page navigation) =====
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    } else if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="relative text-gray-900 dark:text-white transition-colors duration-300 min-h-screen">
      {/* Base background */}
      <div className="fixed inset-0 bg-white dark:bg-[#030712] transition-colors duration-300 -z-10" />
      <Toaster position="top-center" />

      <Navbar theme={theme} setTheme={setTheme} />
      <ScrollJourneyMap />

      <Hero />
      <PoweredByInboxPilot /> 

      <OurWork />
      <Teams />
      <ContactUs />
      <Footer theme={theme} />

    </div>
  );
};

export default Home;
