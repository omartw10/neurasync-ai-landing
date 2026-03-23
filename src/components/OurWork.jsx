import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Bot, 
  ArrowUpRight, 
  Workflow, 
  FileSearch, 
  Target, 
  Mailbox,
  Cpu,
  Network,
  ScanText,

  ArrowRight,
  Sparkles
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Reusable Bento Card with Premium Mouse Glow Effect
const BentoCard = ({ children, className }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`bento-card opacity-0 transform-gpu relative overflow-hidden rounded-[24px] sm:rounded-[32px] border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-[#0A101C]/50 backdrop-blur-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-[#00C2D1]/10 ${className}`}
    >
      {/* Interactive Mouse Glow */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 194, 209, 0.08), transparent 40%)`,
        }}
      />
      {/* Content Container */}
      <div className="relative z-10 w-full h-full p-6 sm:p-8 md:p-10 flex flex-col">
        {children}
      </div>
    </div>
  );
};

const MergedPlatformStudio = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play reverse play reverse",
      }
    });

    // Header Animation
    tl.fromTo(
      ".merged-header",
      { opacity: 0, scale: 0.95, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "expo.out" }
    );

    // Bento Cards Animation Stagger
    tl.fromTo(
      ".bento-card",
      { opacity: 0, y: 50, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)" },
      "-=0.4"
    );
  }, { scope: containerRef });

  return (
    <section 
      id="our-work" // Retained ID for routing compatibility
      ref={containerRef}
      className="relative px-6 sm:px-12 lg:px-24 xl:px-40 py-24 md:py-32 lg:py-40 text-gray-900 dark:text-white overflow-hidden"
    >
      {/* ===== Section Header ===== */}
      <div className="merged-header text-center max-w-4xl mx-auto mb-16 sm:mb-24 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00C2D1]/10 border border-[#00C2D1]/20 text-[#00C2D1] text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5" /> Platform & Studio
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] mb-6">
          Ready-to-Deploy Modules. <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#00C2D1] dark:from-[#00C2D1] dark:to-blue-400">Custom Built Systems.</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Whether you need instant inbox automation or a tailored agentic workflow designed specifically for your operations, we have you covered.
        </p>
      </div>

      {/* ===== Bento Grid Layout ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1400px] mx-auto z-10 relative">

        {/* --- Card 1: InboxPilot (Flagship Product) --- */}
        <BentoCard className="lg:col-span-8 overflow-hidden group">
          <div className="flex flex-col lg:flex-row h-full gap-8">
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00C2D1] to-blue-600 flex items-center justify-center shadow-lg">
                    <Mailbox className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full bg-[#00C2D1]/10 text-[#00C2D1] border border-[#00C2D1]/20">
                    Flagship Product
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">InboxPilot AI</h3>
                <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed max-w-md">
                  A production-ready intelligent inbox engine. It classifies, prioritizes, and automatically routes or responds to incoming communications using agentic workflows.
                </p>
              </div>
              
              <div className="mt-8 lg:mt-0">
                <Link
                  to="/inboxpilot"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-sm transition-transform hover:-translate-y-1 active:scale-95 shadow-lg group-hover:shadow-xl"
                >
                  Explore Product <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Abstract UI Visual */}
            <div className="hidden lg:flex w-2/5 relative items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white dark:from-[#131C2D] dark:to-[#0A101C] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-inner overflow-hidden">
                  <div className="absolute top-0 right-0 w-full h-[150px] bg-[#00C2D1]/10 blur-[50px] pointer-events-none" />
                  <div className="p-6 flex flex-col gap-3 h-full justify-center">
                    <motion.div animate={{ x: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="w-[85%] h-12 bg-white dark:bg-[#1A2333] border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm flex items-center px-4 gap-3">
                       <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                       <div className="h-2 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
                    </motion.div>
                    <motion.div animate={{ x: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="w-[100%] h-12 bg-white dark:bg-[#1A2333] border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm flex items-center px-4 gap-3">
                       <div className="w-3 h-3 rounded-full bg-blue-500" />
                       <div className="h-2 w-32 bg-gray-200 dark:bg-gray-700 rounded-full" />
                    </motion.div>
                    <motion.div animate={{ x: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="w-[75%] h-12 bg-white dark:bg-[#1A2333] border border-gray-100 dark:border-gray-700 rounded-xl shadow-sm flex items-center px-4 gap-3">
                       <div className="w-3 h-3 rounded-full bg-orange-500" />
                       <div className="h-2 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
                    </motion.div>
                  </div>
               </div>
            </div>
          </div>
        </BentoCard>

        {/* --- Card 2: Custom Studio --- */}
        <BentoCard className="lg:col-span-4 group relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-[#0E1624] dark:to-[#060D18]">
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-[#1A2333] border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight">Custom AI Studio</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                Have a unique operational bottleneck? We design and assemble tailored AI systems perfectly mapped to your exact business rules and schemas.
              </p>
            </div>
            <a
              href="/#contact-us"
              className="inline-flex items-center gap-2 text-[#00C2D1] font-bold text-sm transition-colors hover:text-[#00A1AE] group-hover:gap-3"
            >
              Build With Us <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </BentoCard>

        {/* --- Card 3: LeadSync AI --- */}
        <BentoCard className="lg:col-span-6 group">
          <div className="flex flex-col sm:flex-row gap-6 h-full items-start sm:items-center justify-between">
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Network className="w-5 h-5 text-purple-500" strokeWidth={1.5} />
                </div>
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                  Closed Beta
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2">LeadSync AI</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Universal sales capture. Aggregates multi-channel leads, scores intent in real-time, and fires intelligent WhatsApp/SMS follow-ups instantly.
              </p>
            </div>
            <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
               <div className="w-full h-full rounded-full border-[6px] border-dashed border-purple-500/30 flex items-center justify-center relative animate-[spin_15s_linear_infinite]">
                  <div className="absolute inset-2 rounded-full border-4 border-purple-500/20 animate-[spin_10s_linear_infinite_reverse]" />
               </div>
            </div>
          </div>
        </BentoCard>

        {/* --- Card 4: DocuExtract AI --- */}
        <BentoCard className="lg:col-span-6 group">
          <div className="flex flex-col sm:flex-row gap-6 h-full items-start sm:items-center justify-between">
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <ScanText className="w-5 h-5 text-orange-500" strokeWidth={1.5} />
                </div>
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 border border-gray-200 dark:border-gray-700">
                  Coming Soon
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2">DocuExtract AI</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Intelligent ERP OCR. Upload chaotic invoices, receipts, and contracts—the AI extracts clean line items and syncs straight to your ledger.
              </p>
            </div>
            
            <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-gray-100 dark:bg-[#131C2D] rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col p-3 overflow-hidden relative group-hover:border-orange-500/30 transition-colors">
               <div className="absolute top-0 left-0 w-full h-[2px] bg-orange-500 shadow-[0_0_10px_orange] z-10 animate-[bounce_2.5s_infinite_linear]" />
               <div className="flex gap-2 mb-2">
                 <div className="w-1/2 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full" />
                 <div className="w-1/4 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full" />
               </div>
               <div className="w-full h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mb-2 opacity-50" />
               <div className="w-3/4 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mb-2 opacity-50" />
               <div className="flex gap-2 mt-auto">
                 <div className="w-1/3 h-8 bg-orange-500/20 rounded-md" />
                 <div className="w-1/3 h-8 bg-orange-500/20 rounded-md" />
               </div>
            </div>
          </div>
        </BentoCard>

      </div>
    </section>
  );
};

export default MergedPlatformStudio;
