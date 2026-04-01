import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Send, BrainCircuit, Activity, Sparkles, GitMerge,
  Calendar, ChevronDown, Inbox
} from "lucide-react";

export default function PoweredByInboxPilot() {
  const containerRef = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Smooth scroll progress using spring for Vercel/Linear feel
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // --- Animation Timelines ---
  // Left side text staggering
  const text1Opacity = useTransform(smoothProgress, [0, 0.15, 0.22], [1, 1, 0]);
  const text1Y = useTransform(smoothProgress, [0, 0.15, 0.22], [0, 0, -40]);

  const text2Opacity = useTransform(smoothProgress, [0.18, 0.25, 0.38, 0.45], [0, 1, 1, 0]);
  const text2Y = useTransform(smoothProgress, [0.18, 0.25, 0.38, 0.45], [40, 0, 0, -40]);

  const text3Opacity = useTransform(smoothProgress, [0.4, 0.48, 0.6, 0.68], [0, 1, 1, 0]);
  const text3Y = useTransform(smoothProgress, [0.4, 0.48, 0.6, 0.68], [40, 0, 0, -40]);

  const text4Opacity = useTransform(smoothProgress, [0.62, 0.7, 0.82, 0.9], [0, 1, 1, 0]);
  const text4Y = useTransform(smoothProgress, [0.62, 0.7, 0.82, 0.9], [40, 0, 0, -40]);

  const text5Opacity = useTransform(smoothProgress, [0.85, 0.92, 1], [0, 1, 1]);
  const text5Y = useTransform(smoothProgress, [0.85, 0.92, 1], [40, 0, 0]);

  // Right side UI Panels Transitions
  // UI 1: Step 1 Inbox View
  const ui1Opacity = useTransform(smoothProgress, [0, 0.2, 0.25], [1, 1, 0]);
  const ui1Scale = useTransform(smoothProgress, [0, 0.2, 0.25], [1, 1, 0.95]);
  const ui1Y = useTransform(smoothProgress, [0, 0.2, 0.25], [0, 0, -20]);

  // UI 1 Micro-interactions
  const badgesOpacity = useTransform(smoothProgress, [0.03, 0.08], [0, 1]);
  const badgesY = useTransform(smoothProgress, [0.03, 0.08], [10, 0]);
  const highlightScale = useTransform(smoothProgress, [0.08, 0.15], [1, 1.03]);
  const highlightShadowOpacity = useTransform(smoothProgress, [0.08, 0.15], [0, 1]);

  // UI 2: Step 2 & 3 Email Analysis View
  const ui2Opacity = useTransform(smoothProgress, [0.2, 0.25, 0.65, 0.72], [0, 1, 1, 0]);
  const ui2Scale = useTransform(smoothProgress, [0.2, 0.25, 0.65, 0.72], [0.95, 1, 1, 0.95]);
  const ui2Y = useTransform(smoothProgress, [0.2, 0.25, 0.65, 0.72], [20, 0, 0, -20]);

  // UI 2 Micro-interactions
  const step2ElementsOpacity = useTransform(smoothProgress, [0.28, 0.35], [0, 1]);
  const step2ElementsY = useTransform(smoothProgress, [0.28, 0.35], [10, 0]);

  const step3ElementsOpacity = useTransform(smoothProgress, [0.48, 0.55], [0, 1]);
  const step3ElementsY = useTransform(smoothProgress, [0.48, 0.55], [10, 0]);

  const rawScore = useTransform(smoothProgress, [0.48, 0.58], [0, 75], { clamp: true });
  const displayScore = useTransform(rawScore, v => Math.round(v));

  // UI 3: Step 4 & 5 Analytics Dashboard
  const ui3Opacity = useTransform(smoothProgress, [0.68, 0.75, 1], [0, 1, 1]);
  const ui3Scale = useTransform(smoothProgress, [0.68, 0.75, 1], [0.95, 1, 1]);
  const ui3Y = useTransform(smoothProgress, [0.68, 0.75, 1], [20, 0, 0]);

  // UI 3 Micro-interactions
  const newActivityOpacity = useTransform(smoothProgress, [0.85, 0.9], [0, 1]);
  const newActivityX = useTransform(smoothProgress, [0.85, 0.9], [20, 0]);
  const processedCountRaw = useTransform(smoothProgress, [0.85, 0.9], [1247, 1248]);
  const processedCount = useTransform(processedCountRaw, v => Math.round(v).toLocaleString());
  const lineChartPathProgress = useTransform(smoothProgress, [0.85, 0.95], [0.8, 1]);

  return (
    <section id="inboxpilot" className="w-full relative z-10 transition-colors duration-700 bg-white dark:bg-[#030712]">

      {/* Animation Section */}
      <div ref={containerRef} className="relative h-[600vh]">

        {/* Sticky Viewport Container */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-24 lg:pt-32">

          {/* Premium Animated Intro Section - Now inside the sticky container */}
          <div className="w-full max-w-4xl mx-auto px-6 text-center relative z-20 shrink-0 mb-6 lg:mb-10 mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-[#00C2D1]/10 border border-blue-200 dark:border-[#00C2D1]/30 text-blue-600 dark:text-[#00C2D1] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 shadow-sm dark:shadow-[0_0_15px_rgba(0,194,209,0.2)]"
            >
              <Sparkles className="w-3.5 h-3.5" /> Powered by NeuraSyncAI
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 tracking-tight"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#00C2D1] dark:from-[#00C2D1] dark:to-blue-500">
                InboxPilot
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-medium max-w-xl mx-auto"
            >
              InboxPilot is the AI engine inside the NeuraSyncAI platform that reads, classifies, and routes emails automatically with human-level precision.
            </motion.p>

            {isHome && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="mt-6 flex justify-center"
              >
                <Link
                  to="/inboxpilot"
                  onClick={() => window.scrollTo(0, 0)}
                  className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-gray-900 to-[#0B1F3B] dark:from-[#00C2D1] dark:to-blue-600 text-white font-bold text-sm shadow-[0_10px_30px_rgba(0,194,209,0.2)] dark:shadow-[0_0_20px_rgba(0,194,209,0.3)] hover:shadow-[0_15px_40px_rgba(0,194,209,0.3)] dark:hover:shadow-[0_0_30px_rgba(0,194,209,0.5)] transition-all duration-300 hover:-translate-y-1 active:scale-95 border border-gray-700/50 dark:border-white/10"
                >
                  Discover InboxPilot AI deeper
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
              </motion.div>
            )}
          </div>

          <div className="max-w-[1200px] w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10 shrink-0">
            
            {/* LEFT COLUMN: The Story Text */}
            <div className="lg:col-span-4 relative h-[200px] sm:h-[220px] lg:h-[260px] flex items-start lg:items-center mt-2 border-b border-gray-100/10 lg:border-none pb-4 lg:pb-0">

              {/* Step 1 Text */}
              <motion.div style={{ opacity: text1Opacity, y: text1Y }} className="absolute inset-x-0 top-0 lg:top-auto">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-[10px] font-bold tracking-widest uppercase mb-3 lg:mb-4 shadow-sm">
                  <Send className="w-3 h-3 text-blue-500" /> Layer 1
                </div>
                <h3 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-3 tracking-tight leading-snug">
                  Email Ingestion
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                  InboxPilot seamlessly monitors your influx of messages from multiple sources like Gmail, Contact Forms, or integrations. The engine instantly detects and begins organizing new arrivals before anyone even opens them.
                </p>
              </motion.div>

              {/* Step 2 Text */}
              <motion.div style={{ opacity: text2Opacity, y: text2Y }} className="absolute inset-x-0 pointer-events-none top-0 lg:top-auto">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-[10px] font-bold tracking-widest uppercase mb-3 lg:mb-4 shadow-sm">
                  <BrainCircuit className="w-3 h-3 text-blue-500 dark:text-[#00C2D1]" /> Layer 2
                </div>
                <h3 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-3 tracking-tight leading-snug">
                  Smart Classification
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                  The instant an email is opened, the AI actively reads the content to determine intent. It automatically filters out spam and categorizes legitimate inquiries into specific business sectors like Sales.
                </p>
              </motion.div>

              {/* Step 3 Text */}
              <motion.div style={{ opacity: text3Opacity, y: text3Y }} className="absolute inset-x-0 pointer-events-none top-0 lg:top-auto">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-[10px] font-bold tracking-widest uppercase mb-3 lg:mb-4 shadow-sm">
                  <Activity className="w-3 h-3 text-orange-500" /> Layer 3
                </div>
                <h3 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-3 tracking-tight leading-snug">
                  Priority Detection
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                  Not all emails are equal. InboxPilot evaluates urgency, detects buying signals, and automatically calculates a dynamic Lead Score and SLA response time to focus your attention efficiently.
                </p>
              </motion.div>

              {/* Step 4 Text */}
              <motion.div style={{ opacity: text4Opacity, y: text4Y }} className="absolute inset-x-0 pointer-events-none top-0 lg:top-auto">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-[10px] font-bold tracking-widest uppercase mb-3 lg:mb-4 shadow-sm">
                  <Sparkles className="w-3 h-3 text-purple-500" /> Layer 4
                </div>
                <h3 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-3 tracking-tight leading-snug">
                  AI Summarization
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                  No more reading long threads. The system extracts the most critical insights, required actions, and data points, replacing paragraphs of text with a precise, actionable briefing.
                </p>
              </motion.div>

              {/* Step 5 Text */}
              <motion.div style={{ opacity: text5Opacity, y: text5Y }} className="absolute inset-x-0 pointer-events-none top-0 lg:top-auto">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-[10px] font-bold tracking-widest uppercase mb-3 lg:mb-4 shadow-sm">
                  <GitMerge className="w-3 h-3 text-emerald-500" /> Layer 5
                </div>
                <h3 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-3 tracking-tight leading-snug">
                  Routing & Analytics
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                  The fully processed data packet is instantly routed to the correct destination. Every decision and metric is tracked in real-time within your macro analytics dashboard.
                </p>
              </motion.div>

            </div>

            {/* RIGHT COLUMN: UI Simulations */}
            <div className="lg:col-span-8 relative h-[300px] sm:h-[350px] lg:h-[400px] perspective-1200 w-full flex items-start lg:items-center justify-center lg:justify-end mt-4 lg:mt-0">
              <div className="w-full h-full relative flex items-start lg:items-center justify-center origin-top lg:origin-center scale-[0.55] sm:scale-[0.7] lg:scale-[0.75] xl:scale-[0.8] 2xl:scale-[0.85]">
                {/* --- UI STEP 1: AI Organized Inbox View --- */}
                <motion.div
                  style={{ opacity: ui1Opacity, scale: ui1Scale, y: ui1Y, rotateX: 6, rotateY: -8 }}
                  className="absolute w-full max-w-2xl bg-white/80 dark:bg-[#070D18]/90 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_40px_60px_rgba(0,0,0,0.5)] p-4 flex flex-col pointer-events-none transform-style-3d transition-colors duration-500"
                >
                  <div className="flex flex-col gap-2">

                    {/* Highlighted Row */}
                    <motion.div
                      style={{
                        scale: highlightScale,
                        backgroundColor: useTransform(highlightShadowOpacity, [0, 1], ["rgba(255,255,255,0)", "rgba(0,194,209,0.05)"]),
                        borderColor: useTransform(highlightShadowOpacity, [0, 1], ["rgba(229,231,235,0.5)", "#00C2D1"]),
                        boxShadow: useTransform(highlightShadowOpacity, [0, 1], ["0px 0px 0px rgba(0,0,0,0)", "0px 10px 30px rgba(0, 194, 209, 0.15)"])
                      }}
                      className="bg-white dark:bg-[#0D1A2A] border border-gray-100 dark:border-[#1E293B] rounded-xl p-3 flex items-center justify-between text-gray-900 dark:text-white relative z-10 transition-colors"
                    >
                      <motion.div style={{ opacity: highlightShadowOpacity }} className="absolute -bottom-px inset-x-4 h-px bg-gradient-to-r from-transparent via-[#00C2D1] to-transparent shadow-[0_0_15px_#00C2D1] hidden dark:block" />

                      <div className="flex flex-col w-[30%] relative z-10">
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold mb-1">Urgency</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)] animate-pulse" />
                          <span className="font-bold text-sm truncate text-gray-900 dark:text-white">Qualified Lead</span>
                        </div>
                      </div>

                      <motion.div style={{ opacity: badgesOpacity, y: badgesY }} className="w-[15%] relative z-10">
                        <span className="px-2 py-0.5 rounded border border-orange-200 dark:border-orange-500/50 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] font-bold">Sales</span>
                      </motion.div>

                      <div className="flex flex-col w-[40%] px-2 relative z-10">
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold mb-1">Smart Routing</span>
                        <span className="text-xs font-medium truncate text-gray-800 dark:text-white">Lead Qualification: New Lead Match</span>
                      </div>

                      <div className="flex items-center justify-between w-[15%] relative z-10">
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-1.5 py-0.5 rounded">[Website]</span>
                        <div className="h-4 w-4 border-2 border-blue-500 dark:border-[#00C2D1] border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    </motion.div>

                    {/* Other simulated rows */}
                    {[
                      { title: "Client Update", color: "bg-red-500", badge: "Client", badgeColor: "text-red-600 dark:text-red-400", badgeBg: "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/50", time: "1:05 AM" },
                      { title: "Support Ticket", color: "bg-yellow-500", badge: "Support", badgeColor: "text-yellow-600 dark:text-yellow-400", badgeBg: "bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/50", time: "12:13 AM" },
                      { title: "Partnership", color: "bg-teal-500", badge: "Partnership", badgeColor: "text-teal-600 dark:text-teal-400", badgeBg: "bg-teal-50 dark:bg-teal-500/10 border-teal-200 dark:border-teal-500/50", time: "12:09 AM" },
                    ].map((row, i) => (
                      <div key={i} className="bg-gray-50/50 dark:bg-[#0D1524] border border-gray-100 dark:border-[#1E293B] rounded-xl p-3 flex items-center justify-between transition-colors">
                        <div className="flex flex-col w-[30%]">
                          <div className="flex items-center gap-2 mt-4">
                            <div className={`w-2.5 h-2.5 rounded-full ${row.color}`} />
                            <span className="font-semibold text-sm truncate text-gray-800 dark:text-white/90">{row.title}</span>
                          </div>
                        </div>
                        <div className="w-[15%] mt-4">
                          <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${row.badgeColor} ${row.badgeBg}`}>{row.badge}</span>
                        </div>
                        <div className="w-[40%] mt-4 px-2" />
                        <div className="w-[15%] mt-4 text-right">
                          <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono">{row.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* --- UI STEP 2 & 3: Opened Email with AI Analysis View --- */}
                <motion.div
                  style={{ opacity: ui2Opacity, scale: ui2Scale, y: ui2Y }}
                  className="absolute w-full max-w-2xl bg-white/95 dark:bg-[#080D17]/95 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_40px_60px_rgba(0,0,0,0.6)] p-0 flex flex-col pointer-events-none transform-style-3d overflow-hidden transition-colors duration-500"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between w-full p-6 pb-3 border-b border-gray-100 dark:border-white/5">
                    <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                      <div className="p-2 bg-blue-50 dark:bg-[#00C2D1]/10 rounded-lg hidden sm:block"><Calendar className="w-5 h-5 text-blue-600 dark:text-[#00C2D1]" /></div>
                      <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
                      <h2 className="text-xl font-black">Sales Update</h2>
                    </div>
                  </div>

                  {/* Sender Details */}
                  <div className="flex items-center gap-3 px-6 pt-4 pb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                      <img src="https://i.pravatar.cc/100?img=11" alt="avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">tweratomar@gmail.com</span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">to me <ChevronDown className="w-3 h-3" /></span>
                    </div>
                  </div>

                  {/* AI Panel */}
                  <div className="px-6 pb-6 pt-2">
                    <div className="w-full rounded-[20px] border border-blue-100 dark:border-[#00C2D1]/20 bg-gradient-to-br from-blue-50/50 to-white dark:from-[#0B1526]/80 dark:to-[#080D17]/80 p-6 flex flex-col gap-6 relative overflow-hidden transition-colors">

                      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 dark:via-[#00C2D1] to-transparent opacity-30 dark:opacity-70" />

                      <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                        <BrainCircuit className="w-5 h-5 text-blue-600 dark:text-[#00C2D1]" />
                        <h3 className="text-lg font-bold tracking-tight">AI Classification & Analysis</h3>
                      </div>

                      <div className="grid grid-cols-4 bg-white/50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 p-4 gap-4">

                        <motion.div style={{ opacity: step2ElementsOpacity, y: step2ElementsY }} className="flex flex-col gap-1.5">
                          <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Category</span>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">Sales</span>
                        </motion.div>

                        <motion.div style={{ opacity: step3ElementsOpacity, y: step3ElementsY }} className="flex flex-col gap-1.5 relative">
                          <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Urgency</span>
                          <div className="inline-flex w-max relative">
                            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30 bg-orange-50 dark:bg-orange-500/10 rounded-md px-2.5 py-0.5 relative z-10">High</span>
                          </div>
                        </motion.div>

                        <motion.div style={{ opacity: step3ElementsOpacity, y: step3ElementsY }} className="flex flex-col gap-1.5">
                          <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Score</span>
                          <span className="text-sm font-bold text-gray-900 dark:text-white"><motion.span>{displayScore}</motion.span><span className="text-gray-400 text-xs">/100</span></span>
                        </motion.div>

                        <motion.div style={{ opacity: step2ElementsOpacity, y: step2ElementsY }} className="flex flex-col gap-1.5">
                          <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Confidence</span>
                          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">85%</span>
                        </motion.div>
                      </div>

                      <motion.div style={{ opacity: step3ElementsOpacity, y: step3ElementsY }} className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">Summary</span>
                        <div className="bg-white/60 dark:bg-[#081F30]/50 border border-gray-100 dark:border-blue-500/20 text-gray-700 dark:text-blue-100 p-4 rounded-xl text-sm leading-relaxed">
                          Direct inquiry requesting to speak with the founder, indicating strong interest and potential high-value opportunity. Clear intent to engage at a strategic level.
                        </div>
                      </motion.div>

                      <div className="w-full mt-2">
                        <button className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white py-3 rounded-xl font-bold shadow-md transition-colors duration-300">
                          Reply to Lead
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* --- UI STEP 4 & 5: Analytics Dashboard --- */}
                <motion.div
                  style={{ opacity: ui3Opacity, scale: ui3Scale, y: ui3Y }}
                  className="absolute w-full max-w-[950px] aspect-[16/9] bg-white dark:bg-[#0A101C] border border-gray-200/50 dark:border-white/10 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.6)] flex overflow-hidden pointer-events-none font-sans transition-colors duration-500"
                >
                  {/* Fake Sidebar */}
                  <div className="w-48 bg-gray-50/80 dark:bg-[#060D18]/80 backdrop-blur-md border-r border-gray-200 dark:border-white/5 p-5 flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-gray-900 dark:text-white font-black mb-6">
                      <img src="/logo_icon.png" alt="NeuraSyncAI" className="w-6 h-6 object-contain dark:hidden" />
                      <img src="/logo_icon_dark.png" alt="NeuraSyncAI" className="w-6 h-6 object-contain hidden dark:block" />
                      NeuraSyncAI
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 tracking-wider mb-2">PLATFORM</div>
                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm py-2 px-2 rounded-lg"><Activity className="w-4 h-4" /> Overview</div>
                    <div className="flex items-center gap-3 text-blue-700 dark:text-white bg-blue-100/50 dark:bg-[#00C2D1]/10 text-sm py-2 px-2 border border-blue-200/50 dark:border-[#00C2D1]/20 rounded-lg font-medium"><Inbox className="w-4 h-4 text-blue-600 dark:text-[#00C2D1]" /> InboxPilot AI</div>
                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 text-sm py-2 px-2 rounded-lg"><GitMerge className="w-4 h-4" /> LeadSync AI</div>
                  </div>

                  {/* Main Dashboard Area */}
                  <div className="flex-1 p-6 flex flex-col gap-5 relative overflow-hidden bg-white/50 dark:bg-[#0A101C]/50 backdrop-blur-sm">

                    {/* Top Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">InboxPilot Insights</h2>
                        <p className="text-xs text-gray-500 mt-0.5">Automated Flow Analytics</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-gray-900 dark:bg-[#00C2D1] text-white dark:text-black font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm"><Sparkles className="w-3.5 h-3.5" /> Force Sync</div>
                      </div>
                    </div>

                    {/* KPI Row */}
                    <div className="grid grid-cols-4 gap-4">
                      <div className="bg-white dark:bg-[#0D1524] border border-gray-100 dark:border-white/5 rounded-xl p-4 flex flex-col gap-1.5 shadow-sm">
                        <span className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">Processed</span>
                        <motion.span className="text-2xl font-black text-gray-900 dark:text-white">{processedCount}</motion.span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">↑ 12% vs last month</span>
                      </div>
                      <div className="bg-white dark:bg-[#0D1524] border border-gray-100 dark:border-white/5 rounded-xl p-4 flex flex-col gap-1.5 shadow-sm">
                        <span className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">Hours Saved</span>
                        <span className="text-2xl font-black text-gray-900 dark:text-white">42h</span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">↑ 8% vs last month</span>
                      </div>
                      <div className="bg-white dark:bg-[#0D1524] border border-gray-100 dark:border-white/5 rounded-xl p-4 flex flex-col gap-1.5 shadow-sm">
                        <span className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">Priority Leads</span>
                        <span className="text-2xl font-black text-gray-900 dark:text-white">84</span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">↑ 14% vs last month</span>
                      </div>
                      <div className="bg-white dark:bg-[#0D1524] border border-gray-100 dark:border-white/5 rounded-xl p-4 flex flex-col gap-1.5 shadow-sm">
                        <span className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">Spam Blocked</span>
                        <span className="text-2xl font-black text-gray-900 dark:text-white">643</span>
                        <span className="text-[10px] text-gray-500 font-medium">Stable</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 flex-1">

                      {/* Main Chart Area */}
                      <div className="col-span-8 bg-white dark:bg-[#0D1524] border border-gray-100 dark:border-white/5 rounded-xl p-4 h-full relative shadow-sm overflow-hidden flex flex-col">
                        <span className="text-xs text-gray-900 dark:text-white font-bold mb-2">Volume Trend</span>
                        <div className="flex-1 w-full relative mt-2">
                          {/* Fake SVG Line Chart */}
                          <svg viewBox="0 0 100 40" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="gradientLine" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#00C2D1" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#00C2D1" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                            <motion.path
                              d="M 0 30 Q 15 20, 30 25 T 50 10 T 70 25 T 100 20 L 100 40 L 0 40 Z"
                              fill="url(#gradientLine)"
                            />
                            <motion.path
                              d="M 0 30 Q 15 20, 30 25 T 50 10 T 70 25 T 100 20"
                              fill="none"
                              stroke="currentColor"
                              className="text-blue-500 dark:text-[#00C2D1]"
                              strokeWidth="0.8"
                              pathLength={lineChartPathProgress}
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Recent Activity Feed */}
                      <div className="col-span-4 bg-white dark:bg-[#0D1524] border border-gray-100 dark:border-white/5 rounded-xl p-5 flex flex-col relative shadow-sm overflow-hidden">
                        <span className="text-xs text-gray-900 dark:text-white font-bold mb-5 block">Live Activity</span>
                        <div className="flex flex-col gap-5 relative flex-1">
                          <div className="absolute left-[5px] top-2 bottom-0 w-[1.5px] bg-gray-100 dark:bg-[#1E293B]"></div>

                          {/* Simulated New Event Injecting */}
                          <motion.div style={{ opacity: newActivityOpacity, x: newActivityX }} className="flex gap-3 relative z-10">
                            <div className="w-3 h-3 rounded-full bg-blue-500 dark:bg-[#00C2D1] mt-0.5 shrink-0 ring-4 ring-white dark:ring-[#0D1524] shadow-md" />
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] text-gray-400 font-bold uppercase">Just Now</span>
                              <span className="text-xs text-blue-700 dark:text-white font-medium bg-blue-50 dark:bg-[#00C2D1]/10 px-2 py-1 rounded inline-block w-max border border-blue-100 dark:border-[#00C2D1]/20">Routed High Priority Lead</span>
                            </div>
                          </motion.div>

                          <div className="flex gap-3 relative z-10">
                            <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 mt-0.5 shrink-0 ring-4 ring-white dark:ring-[#0D1524]" />
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] text-gray-400 font-bold uppercase">10:42 AM</span>
                              <span className="text-xs text-gray-600 dark:text-gray-300">Support Ticket Logged</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recent Emails Table */}
                    <div className="bg-white dark:bg-[#0D1524] border border-gray-100 dark:border-white/5 rounded-xl flex flex-col overflow-hidden shadow-sm">
                      <div className="grid grid-cols-4 bg-gray-50 dark:bg-[#09101C] p-2.5 px-5 border-b border-gray-100 dark:border-white/5 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                        <span className="col-span-1">Sender</span>
                        <span className="col-span-2">Subject</span>
                        <span className="col-span-1 text-right">Match</span>
                      </div>
                      <motion.div
                        style={{
                          backgroundColor: useTransform(newActivityOpacity, [0, 1], ["transparent", "rgba(59, 130, 246, 0.05)"])
                        }}
                        className="grid grid-cols-4 p-3 px-5 text-xs border-b border-gray-50 dark:border-white/5 items-center transition-colors"
                      >
                        <span className="col-span-1 font-bold text-gray-900 dark:text-white truncate pr-4">omar.twerat@gma...</span>
                        <span className="col-span-2 text-gray-600 dark:text-gray-300 truncate pr-4">New Inquiry - NeuraSyncAI</span>
                        <span className="col-span-1 text-right text-emerald-600 dark:text-emerald-400 font-bold">98% Match</span>
                      </motion.div>
                    </div>

                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
