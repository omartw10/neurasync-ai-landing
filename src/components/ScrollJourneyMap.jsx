import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "inboxpilot", label: "Powered by InboxPilot", internalScroll: true },
  { id: "solutions", label: "Services" },
  { id: "our-work", label: "Our Work" },
  { id: "founder", label: "Founder", internalScroll: true },
  { id: "contact-us", label: "Start Automation" }
];

const ScrollJourneyMap = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollingInternally, setScrollingInternally] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollTrigger = scrollY + viewportHeight / 3; // Trigger changes when a section hits top 33% of screen

      let currentActiveId = SECTIONS[0].id;
      let internalStates = {};

      SECTIONS.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elTop = rect.top + scrollY;

          // If the section's top has passed our trigger line, it's the active one
          if (elTop <= scrollTrigger + 50) {
            currentActiveId = sec.id;
          }

          // Determine internal scrolling for sticky or very long sections
          if (sec.internalScroll) {
            internalStates[sec.id] = rect.top < 0 && rect.bottom > viewportHeight;
          }
        }
      });

      setActiveSection(currentActiveId);
      setScrollingInternally(internalStates);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initially
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex fixed left-3 sm:left-4 lg:left-6 xl:left-8 top-1/2 -translate-y-1/2 z-[100] flex-col items-start w-10 sm:w-16 lg:w-48 group pointer-events-none scale-[0.65] sm:scale-80 lg:scale-90 xl:scale-95 origin-left">

      {/* Removed the distracting ambient hover background that was causing a blocky glow */}

      <div className="flex flex-col relative w-full py-4 px-2 pointer-events-auto">
        {SECTIONS.map((sec, i) => {
          const isActive = activeSection === sec.id;
          const isPast = SECTIONS.findIndex(s => s.id === activeSection) > i;
          // Is internal scrolling running on this active block?
          const isInternalAct = scrollingInternally[sec.id] && isActive;

          // Determine if the line descending from this node should be filled
          const lineIsFilled = isPast || isInternalAct;

          return (
            <div key={sec.id} className="relative flex items-center h-20 w-full group/node cursor-pointer" onClick={() => scrollToSection(sec.id)}>

              {/* Node Circle Wrapper */}
              <div className="relative flex items-center justify-center shrink-0 w-2.5 sm:w-3 h-2.5 sm:h-3 z-20">
                {/* Subtle Pulse behind active node */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#00C2D1]/30 blur-[2px]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                {/* The actual dot */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.5 : 1,
                    backgroundColor: isActive || isPast ? "#00C2D1" : "",
                    borderColor: isActive || isPast ? "#00C2D1" : ""
                  }}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border-[1.5px] border-gray-300 dark:border-gray-600 transition-colors duration-500 z-10 ${isActive || isPast ? 'bg-[#00C2D1] border-[#00C2D1]' : 'bg-white dark:bg-[#060D18]'}`}
                />

                {/* Hover ring interaction */}
                <div className="absolute inset-[-6px] rounded-full border border-gray-400 dark:border-gray-500 opacity-0 group-hover/node:opacity-100 scale-50 group-hover/node:scale-100 transition-all duration-300 pointer-events-none" />
              </div>

              {/* Line connecting to the next node */}
              {i < SECTIONS.length - 1 && (
                <div className="absolute left-[3.5px] sm:left-[5px] top-[50%] w-[2px] h-20 z-0 pointer-events-none">
                  {/* Dim base line */}
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800" />

                  {/* Active highlighted line overlay (with larger width for zig-zag animation) */}
                  <svg width="24" height="80" viewBox="0 0 24 80" className="absolute top-0 -left-[11px] text-[#00C2D1] dark:text-[#00C2D1]">
                    <motion.path
                      animate={{
                        pathLength: lineIsFilled ? 1 : 0,
                        opacity: lineIsFilled ? 1 : 0,
                        d: isInternalAct
                          ? ["M 12 0 L 18 13 L 6 26 L 18 39 L 6 52 L 18 65 L 12 80", "M 12 0 L 6 13 L 18 26 L 6 39 L 18 52 L 6 65 L 12 80"]
                          : "M 12 0 L 12 80"
                      }}
                      transition={{
                        d: isInternalAct ? { repeat: Infinity, duration: 0.8, repeatType: "mirror", ease: "linear" } : { duration: 0.4 },
                        pathLength: { duration: 0.5, ease: "easeOut" },
                        opacity: { duration: 0.3 }
                      }}
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}

              {/* Node Label Text */}
              <span
                className={`hidden sm:block ml-5 text-[11px] font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-500 ${isActive ? 'text-[#00C2D1] opacity-100 translate-x-2' : 'text-gray-400 dark:text-gray-500 opacity-40 group-hover:opacity-100 hover:text-gray-900 dark:hover:text-gray-200'} pointer-events-none group-hover/node:text-[#00C2D1] group-hover/node:translate-x-1`}
                style={{ transformOrigin: 'left center' }}
              >
                {sec.label}
              </span>

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ScrollJourneyMap; 
