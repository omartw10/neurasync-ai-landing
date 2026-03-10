import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustedBy from "../components/TrustedBy";
import Services from "../components/Services";
import OurWork from "../components/OurWork";
import Teams from "../components/Teams";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import PoweredByInboxPilot from "../components/PoweredByInboxPilot";
import ScrollJourneyMap from "../components/ScrollJourneyMap";
const Home = ({ theme, setTheme }) => {
  const location = useLocation();

  // ===== Scroll to hash (for email button navigation) =====
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      el?.scrollIntoView({ behavior: "smooth" });
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
      <TrustedBy />
      <PoweredByInboxPilot /> 
      <Services />
      <OurWork />
      <Teams />
      <ContactUs />
      <Footer theme={theme} />

    </div>
  );
};

export default Home;
