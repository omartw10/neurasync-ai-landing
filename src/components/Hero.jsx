/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Header elements entrance
    tl.fromTo(
      ".hero-title",
      { opacity: 0, y: 50, rotateX: -20 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.2 }
    )
    .fromTo(
      ".hero-subtext",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.6"
    )
    // Mockup Entry
    .fromTo(
      ".hero-mockup-wrapper",
      { opacity: 0, y: 150, scale: 0.9, rotateX: 15, transformPerspective: 1000 },
      { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1.2, ease: "expo.out" },
      "-=0.4"
    )
    // KPI Cards stagger
    .fromTo(
      ".kpi-card",
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.6"
    )
    // Notification popup
    .fromTo(
      ".hero-notification",
      { opacity: 0, x: 50, scale: 0.8 },
      { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" },
      "-=0.2"
    );

    // Removed orbs animation

    // Gentle levitation for the mockup
    gsap.to(".hero-mockup-inner", {
      y: -15,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    // ----- PARALLAX SCROLL TRIGGER -----
    gsap.to(".hero-text-parallax", {
      y: -250,
      opacity: -0.5,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });

    // Mockup parallax deep into next section
    gsap.to(".hero-mockup-parallax", {
      y: 200,
      scale: 0.9,
      opacity: 0.1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=1200", // Extends past the hero section
        scrub: 1,
      }
    });

    // Removed orbs drifting animation
  }, { scope: container });

  return (
    <section
      ref={container}
      id="hero"
      className="relative flex flex-col items-center text-center px-6 sm:px-12 lg:px-24 xl:px-40 pt-[160px] pb-[100px] lg:pt-[200px] lg:pb-[140px] text-gray-900 dark:text-white perspective-1000 z-10"
    >

      {/* ===== Heading ===== */}
      <div className="hero-text-parallax relative z-20 w-full flex flex-col items-center">
        <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.15] max-w-4xl opacity-0 transform-gpu">
          Automate Smarter.
          <br />
          <span className="text-[#00C2D1]">Scale Faster.</span>
        </h1>

        {/* ===== Subtext ===== */}
        <p className="hero-subtext mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl opacity-0 transform-gpu">
          We build <span className="text-[#00C2D1] font-medium">AI-powered</span>{" "}
          automation systems using n8n to eliminate manual work and unlock growth.
        </p>
      </div>

      {/* ===== Dashboard Mockup Section (Replaces Video) ===== */}
      <div className="hero-mockup-parallax relative z-10 w-full max-w-6xl mx-auto mt-24">
        <div className="hero-mockup-wrapper relative group w-full opacity-0 transform-gpu">

          {/* Floating Gradient Border */}
          <div 
          className="hero-mockup-inner relative rounded-[32px] p-[2px] bg-gradient-to-br from-[#00C2D1]/80 via-[#0B1F3B] to-[#7C3AED]/80 backdrop-blur-xl shadow-[0_0_80px_rgba(0,194,209,0.3)]"
        >
          {/* Inner Frame containing the Mockup */}
          <div className="rounded-[30px] overflow-hidden bg-white dark:bg-[#060D18] transform transition duration-500 group-hover:scale-[1.005] aspect-[16/10] md:aspect-[21/9] flex relative border border-gray-100 dark:border-gray-800">
            
            {/* Mockup Sidebar */}
            <div className="hidden md:flex flex-col w-48 lg:w-64 bg-gray-50 dark:bg-[#0B1120] border-r border-gray-100 dark:border-gray-800 p-4">
              <div className="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded mb-8 animate-pulse" />
              <div className="flex flex-col gap-3">
                <div className="h-8 w-full bg-[#00C2D1]/10 rounded flex items-center px-3">
                  <div className="w-4 h-4 rounded bg-[#00C2D1] mr-3" />
                  <div className="h-2 w-16 bg-[#00C2D1]/60 rounded" />
                </div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 w-full rounded flex items-center px-3 hover:bg-gray-200 dark:hover:bg-gray-800 transition">
                    <div className="w-4 h-4 rounded bg-gray-300 dark:bg-gray-700 mr-3" />
                    <div className="h-2 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Mockup Main Canvas */}
            <div className="flex-1 flex flex-col p-4 sm:p-6 pb-0 overflow-hidden relative">
              
              {/* Mockup Topbar */}
              <div className="flex justify-between w-full items-center mb-6">
                <div className="h-5 w-32 bg-gray-200 dark:bg-gray-800 rounded" />
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800" />
                </div>
              </div>

              {/* Mockup Kpi Cards with sequential layout animation */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { title: "Processed", val: "1.2M", color: "bg-[#00C2D1]" },
                  { title: "Revenue Saved", val: "$42k", color: "bg-emerald-500" },
                  { title: "Sales Leads", val: "840", color: "bg-purple-500" },
                  { title: "Spam Blocked", val: "24k", color: "bg-rose-500" },
                ].map((kpi, i) => (
                  <div 
                     key={i} 
                     className="kpi-card p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0E1624] shadow-sm flex flex-col gap-2 relative overflow-hidden group/kpi opacity-0 transform-gpu"
                  >
                     <div className="text-left text-[10px] md:text-xs text-gray-500 font-semibold uppercase tracking-wider">{kpi.title}</div>
                     <div className="text-left text-lg md:text-2xl font-bold dark:text-white">{kpi.val}</div>
                     <div className={`absolute top-0 left-0 w-1 h-full ${kpi.color} opacity-80`} />
                  </div>
                ))}
              </div>

              {/* Mockup Chart Area */}
              <div className="flex-1 rounded-t-xl border border-b-0 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#0B1120] p-4 flex flex-col relative overflow-hidden">
                <div className="h-4 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
                
                {/* Simulated area chart visually using CSS gradients */}
                <div className="flex-1 w-full bg-gradient-to-t from-[#00C2D1]/20 to-transparent flex items-end opacity-70">
                   <div className="w-full h-1/2 border-t-[3px] border-[#00C2D1] flex items-end justify-between px-10">
                      {/* Floating dots on lines */}
                      <div className="w-2 h-2 rounded-full bg-white border border-[#00C2D1] transform -translate-y-[20px]" />
                      <div className="w-2 h-2 rounded-full bg-white border border-[#00C2D1] transform translate-y-[-60px]" />
                      <div className="w-2 h-2 rounded-full bg-white border border-[#00C2D1] transform -translate-y-[40px]" />
                      <div className="w-2 h-2 rounded-full bg-white border border-[#00C2D1] transform -translate-y-[100px]" />
                      <div className="w-2 h-2 rounded-full bg-white border border-[#00C2D1] transform -translate-y-[90px]" />
                   </div>
                </div>

                {/* Floating Notification */}
                <div className="hero-notification absolute top-6 right-6 bg-white dark:bg-[#1E293B] shadow-2xl border border-gray-200 dark:border-gray-700 p-3 rounded-lg flex items-center gap-3 opacity-0 transform-gpu">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <div className="text-xs font-semibold text-gray-700 dark:text-gray-200">High Priority Lead Detected</div>
                </div>

              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
