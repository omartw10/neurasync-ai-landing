import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight, Play, Mail, MessageSquare, FormInput, FileText, BrainCircuit, Target, HeadphonesIcon, GitMerge, BellRing, ChevronRight, TrendingUp, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    // 1. Premium Entrance Animation
    tl.fromTo(
      ".hero-entrance",
      { opacity: 0, y: 40, rotateX: -10, scale: 0.95, transformPerspective: 1000 },
      { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.5, stagger: 0.1 }
    );

    // 2. Smooth Scroll Exit Animation (Scale down + Blur fade)
    gsap.to(".hero-parallax", {
      y: -150,
      scale: 0.9,
      opacity: -0.2, // Go completely invisible
      filter: "blur(8px)",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2, // Small delay for smoothness
      }
    });
  }, { scope: container });

  const inputCards = [
    { icon: Mail, label: "Emails", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { icon: FormInput, label: "Forms", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { icon: MessageSquare, label: "Customer Inquiries", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
    { icon: FileText, label: "Messages", color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-500/10" },
  ];

  const outputCards = [
    { icon: Target, label: "Sales Leads", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { icon: HeadphonesIcon, label: "Support Tickets", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { icon: GitMerge, label: "CRM Routing", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
    { icon: BellRing, label: "Team Notifications", color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-500/10" },
  ];

  return (
    <section
      ref={container}
      id="hero"
      className="relative flex flex-col justify-center min-h-screen px-6 sm:px-12 lg:px-24 xl:px-40 pt-32 pb-20 text-gray-900 dark:text-white z-10 overflow-hidden"
    >

      <div className="hero-parallax w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
        
        {/* ===== Left Side: Copy & CTA ===== */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left lg:pr-8">
          
          <div className="hero-entrance inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00C2D1]/10 border border-[#00C2D1]/30 text-[#00C2D1] text-xs font-bold tracking-[0.15em] uppercase mb-6 shadow-sm">
            <BrainCircuit className="w-3.5 h-3.5" /> AI Automation Platform
          </div>

          <h1 className="hero-entrance text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-tight mb-6 text-gray-900 dark:text-white">
            Automate Operations.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#00C2D1] dark:from-[#00C2D1] dark:to-blue-400">Scale Revenue.</span>
          </h1>

          <p className="hero-entrance text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-medium leading-relaxed mb-8 max-w-2xl">
            NeuraSyncAI builds AI-powered automation systems that transform manual workflows into intelligent operations.
            <br className="hidden sm:block" /><br className="hidden sm:block" />
            Our platform reads incoming communication, classifies requests, and routes them automatically so businesses can operate faster and smarter.
          </p>

          {/* Value Indicators */}
          <div className="hero-entrance grid sm:grid-cols-2 gap-y-3 gap-x-6 mb-10">
            {[
              "Faster response to customer inquiries",
              "Automated lead qualification",
              "Reduced manual workload",
              "Intelligent workflow routing"
            ].map((value, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="mt-1 w-4 h-4 rounded-full bg-[#00C2D1]/20 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-[#00C2D1]" strokeWidth={3} />
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 leading-snug">{value}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="hero-entrance flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              to="/#contact-us"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-gray-900 to-[#0B1F3B] dark:from-[#00C2D1] dark:to-[#008A96] text-white font-bold text-sm shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,194,209,0.2)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_15px_40px_rgba(0,194,209,0.4)] transition-all duration-300 hover:-translate-y-1 active:scale-95"
            >
              Start Your Automation
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button
              onClick={() => {
                const el = document.getElementById("inboxpilot");
                if(el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 100;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white dark:bg-[#0E1624] border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-white font-bold text-sm hover:bg-gray-50 dark:hover:bg-[#131E30] transition-all duration-300 hover:-translate-y-1 active:scale-95 shadow-sm"
            >
              <Play className="w-4 h-4 text-[#00C2D1]" fill="currentColor" /> See How It Works
            </button>
          </div>
        </div>

        {/* ===== Right Side: Flow Visualization ===== */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end hero-entrance perspective-1000 mt-12 lg:mt-0">
          
          <div className="relative w-full max-w-[550px] lg:max-w-[600px] h-[550px] lg:h-[600px] flex items-center justify-between p-4 sm:p-8 transform-style-3d">
            
            {/* Seamless Faded Glass Background */}
            <div 
              className="absolute inset-0 bg-white/60 dark:bg-[#0A101C]/60 backdrop-blur-2xl z-0 pointer-events-none"
              style={{
                WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 75%)',
                maskImage: 'radial-gradient(circle at center, black 30%, transparent 75%)'
              }}
            />

            {/* Inner background noise */}
            <div 
               className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0"
               style={{
                WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 75%)',
                maskImage: 'radial-gradient(circle at center, black 30%, transparent 75%)'
              }}
            />

            {/* Small Floating Value Tags */}
            <motion.div
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0, y: [-4, 4, -4] }}
               transition={{ 
                 opacity: { duration: 1, delay: 1 },
                 y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
               }}
               className="absolute top-8 left-8 z-20 flex flex-col gap-2 pointer-events-none"
            >
               <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 text-blue-700 dark:text-blue-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
                 <Zap className="w-3 h-3 shrink-0" />
                 Productivity +300%
               </div>
               <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm lg:ml-4">
                 <TrendingUp className="w-3 h-3 shrink-0" />
                 Revenue +42%
               </div>
            </motion.div>

            {/* Animated Background Line Chart (Stock/Revenue style) */}
            <div 
               className="absolute inset-x-0 bottom-0 h-[170px] pointer-events-none z-0 px-8 pb-8"
               style={{
                 WebkitMaskImage: 'linear-gradient(to right, transparent, black 25%, black 75%, transparent)',
                 maskImage: 'linear-gradient(to right, transparent, black 25%, black 75%, transparent)'
               }}
            >
               <svg 
                 viewBox="0 0 600 170" 
                 preserveAspectRatio="none" 
                 className="absolute bottom-6 left-8 w-[calc(100%-4rem)] h-[calc(100%-2.5rem)] opacity-80 dark:opacity-60"
                 style={{ overflow: 'visible' }}
               >
                 <defs>
                   <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
                     <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                   </linearGradient>
                   <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                     <path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981" />
                   </marker>
                 </defs>
                 
                 {/* Subtle X & Y Axes */}
                 <line x1="0" y1="0" x2="0" y2="150" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-gray-300 dark:text-gray-700 opacity-50" />
                 <line x1="0" y1="150" x2="600" y2="150" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-gray-300 dark:text-gray-700 opacity-50" />
                 
                 {/* Area Fill */}
                 <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0, 0] }}
                    transition={{ duration: 6, repeat: Infinity, times: [0, 0.15, 0.85, 0.95, 1], ease: "linear" }}
                    d="M 0 150 C 150 150, 250 110, 350 80 C 450 50, 520 50, 600 10 L 600 150 Z"
                    fill="url(#revenueGradient)"
                 />
                 
                 {/* Animated Line (Loops) */}
                 <motion.path
                   initial={{ pathLength: 0, opacity: 0 }}
                   animate={{ 
                     pathLength: [0, 1, 1, 1, 0], 
                     opacity: [0, 1, 1, 0, 0] 
                   }}
                   transition={{ 
                     duration: 6, 
                     repeat: Infinity, 
                     times: [0, 0.25, 0.85, 0.95, 1], 
                     ease: "easeInOut" 
                   }}
                   d="M 0 150 C 150 150, 250 110, 350 80 C 450 50, 520 50, 600 10"
                   fill="none"
                   stroke="#10B981"
                   strokeWidth="3.5"
                   strokeLinecap="round"
                   markerEnd="url(#arrow)"
                   className="drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                 />

                 {/* Start Dot */}
                 <motion.circle 
                   initial={{ opacity: 0, scale: 0 }}
                   animate={{ opacity: [0, 1, 1, 0, 0], scale: [0, 1, 1, 0.5, 0] }}
                   transition={{ duration: 6, repeat: Infinity, times: [0, 0.1, 0.85, 0.95, 1], ease: "linear" }}
                   cx="0" cy="150" r="4.5" fill="#10B981" 
                 />
               </svg>
               
               {/* Floating +$ Particles */}
               {[
                 { left: "30%", top: "70%", delay: 0.5 },
                 { left: "60%", top: "50%", delay: 1.5 },
                 { left: "85%", top: "25%", delay: 2.5 },
               ].map((pos, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, y: 10, scale: 0.5 }}
                   animate={{ opacity: [0, 1, 0], y: -30, scale: [0.5, 1, 0.8] }}
                   transition={{ duration: 3, repeat: Infinity, delay: pos.delay, ease: "easeOut" }}
                   className="absolute font-black text-[#10B981] text-[10px] sm:text-xs drop-shadow-md z-10"
                   style={{ left: pos.left, top: pos.top }}
                 >
                   +$
                 </motion.div>
               ))}
            </div>
            
            {/* Input Column */}
            <div className="flex flex-col gap-4 relative z-10 w-1/3">
              {inputCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={idx}
                    animate={{ x: [0, 15, 0], opacity: [0.8, 1, 0.8] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.4,
                    }}
                    className={`flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-white/5 bg-white dark:bg-[#0D1524] shadow-sm relative`}
                  >
                    <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-4 h-4 ${card.color}`} />
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-gray-700 dark:text-gray-300 hidden sm:block truncate">
                      {card.label}
                    </span>
                    {/* Flowline leaving input */}
                    <div className="absolute right-0 top-1/2 w-8 sm:w-12 h-px bg-gradient-to-r from-gray-200 dark:from-gray-700 to-transparent translate-x-full" />
                  </motion.div>
                );
              })}
            </div>

            {/* AI Center Node */}
            <div className="relative z-20 flex flex-col items-center">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(0,194,209,0.3)",
                    "0 0 60px rgba(0,194,209,0.6)",
                    "0 0 20px rgba(0,194,209,0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-gray-900 via-[#0B1F3B] to-[#00C2D1] flex flex-col items-center justify-center relative shrink-0 shadow-2xl border border-white/20"
              >
                <div className="relative z-10 flex flex-col items-center mt-1">
                  <BrainCircuit className="w-8 h-8 sm:w-10 sm:h-10 text-white mb-1 drop-shadow-lg" />
                  <span className="text-[8px] sm:text-[10px] font-black text-white/90 uppercase tracking-widest text-center">
                    NeuraSync AI<br className="sm:hidden"/> Engine
                  </span>
                </div>
                
                {/* Orbiting ring */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-3 rounded-full border border-dashed border-[#00C2D1]/40 pointer-events-none"
                />
              </motion.div>
            </div>

            {/* Output Column */}
            <div className="flex flex-col gap-4 relative z-10 w-1/3">
              {outputCards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={idx}
                    animate={{ x: [0, -15, 0], opacity: [0.8, 1, 0.8] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.4 + 2, // offset delay for rhythm
                    }}
                    className={`flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-white/5 bg-white dark:bg-[#0D1524] shadow-sm relative`}
                  >
                    {/* Flowline entering output */}
                    <div className="absolute left-0 top-1/2 w-8 sm:w-12 h-px bg-gradient-to-l from-gray-200 dark:from-gray-700 to-transparent -translate-x-full" />
                    
                    <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-4 h-4 ${card.color}`} />
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-gray-700 dark:text-gray-300 hidden sm:block truncate">
                      {card.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Particle flow animations inside container */}
            <Particles />

          </div>
        </div>
      </div>
    </section>
  );
};

// Helper component for floating particles from left to right
const Particles = () => {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: 50, y: 100 + i * 40, opacity: 0, scale: 0 }}
          animate={{
            x: [50, 250, 450],
            y: [100 + i * 40, 250, 100 + (5-i)*40],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
          className="absolute left-0 top-0 w-2 h-2 rounded-full bg-[#00C2D1] shadow-[0_0_10px_#00C2D1] z-15"
          style={{ zIndex: 15 }}
        />
      ))}
    </>
  );
};

export default Hero;
