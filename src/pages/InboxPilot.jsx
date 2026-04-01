import React from "react";
import { Link } from "react-router-dom";
import CTA from "../components/CTA";
import { motion } from "framer-motion";
import ContactUs from "../components/ContactUs";
import { Toaster } from "react-hot-toast";
import PoweredByInboxPilot from "../components/PoweredByInboxPilot";
import Navbar from "../components/Navbar";
import { Check, Mail, Zap, Shield, FileText, BarChart3, Settings, GitMerge } from "lucide-react";

const InboxPilot = ({ theme, setTheme }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] text-gray-800 dark:text-white transition-colors">
      <Navbar theme={theme} setTheme={setTheme} />
      <Toaster position="top-center" />
      {/* ===== BACK TO HOME ===== */}
      <div className="px-6 sm:px-12 lg:px-24 xl:px-40 pt-8">
        <Link
          to="/"
          className="inline-block text-sm font-medium text-[#00C2D1] hover:underline"
        >
          ← Back to Home
        </Link>
      </div>

      {/* ===== HERO ===== */}
      <section id="inboxpilot-hero" className="px-6 sm:px-12 lg:px-24 xl:px-40 pt-32 pb-16 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-[#00C2D1]/10 border border-blue-200 dark:border-[#00C2D1]/30 text-blue-600 dark:text-[#00C2D1] text-[11px] font-bold tracking-[0.15em] uppercase mb-8 shadow-sm"
          >
            Product Overview
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight"
          >
            InboxPilot <span className="text-[#00C2D1]">AI</span>
          </motion.h1>

          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="text-xl sm:text-2xl font-semibold mt-4 text-gray-800 dark:text-gray-200"
          >
            Intelligent Email Classification & Routing Engine
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium"
          >
            InboxPilot is an AI-powered email intelligence engine that automatically reads, classifies, scores, and routes incoming messages across your organization. It eliminates manual inbox management and ensures every message reaches the right team instantly.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => document.getElementById("contact-inboxpilot")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-gradient-to-r from-[#00C2D1] to-[#00A8B5] text-[#0B1F3B] px-8 py-3.5 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(0,194,209,0.4)] transition-all duration-300 active:scale-95 w-full sm:w-auto"
            >
              Request Your InboxPilot Setup
            </button>
            <a
              href="https://wa.me/218926467332"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl font-bold bg-white dark:bg-[#0E1624] border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-full sm:w-auto"
            >
              Contact Sales
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== HOW IT WORKS (Re-using Animation Component) ===== */}
      <PoweredByInboxPilot />

      {/* ===== VIDEO DEMONSTRATION ===== */}
      <section id="inboxpilot-video" className="scroll-mt-24 md:scroll-mt-32 px-6 sm:px-12 lg:px-24 xl:px-40 py-[80px] md:py-[100px] lg:py-[120px] relative">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 text-gray-900 dark:text-white">
            Watch InboxPilot in Action
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mb-16 font-medium">
            This walkthrough demonstrates how InboxPilot reads incoming emails, classifies them using AI, and routes them to the correct team automatically. See how businesses eliminate inbox chaos and accelerate response times using intelligent automation.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
            className="relative group w-full"
          >
            <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-[#00C2D1]/40 via-blue-500/40 to-[#00C2D1]/40 blur-2xl opacity-50 transition duration-500 group-hover:opacity-80" />
            <div className="relative rounded-[32px] p-[2px] bg-gradient-to-br from-[#00C2D1] via-[#0B1F3B] to-blue-500">
              <div className="rounded-[30px] overflow-hidden bg-[#030712] aspect-video w-full flex items-center justify-center relative shadow-2xl">
                {/* Fallback Play Button visually if iframe is empty/placeholder */}
                <div className="absolute z-10 flex flex-col items-center gap-4 text-gray-500 pointer-events-none">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <svg className="w-8 h-8 text-white ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </div>
                  <span className="font-semibold tracking-widest text-sm uppercase">Video Demonstration</span>
                </div>
                {/* Real Iframe */}
                <iframe
                  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                  className="w-full h-full relative z-20 opacity-0" // Opacity 0 just so the play button placeholder shows for now
                  allowFullScreen
                  title="InboxPilot Demo"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURE BREAKDOWN ===== */}
      <section id="inboxpilot-features" className="scroll-mt-24 md:scroll-mt-32 px-6 sm:px-12 lg:px-24 xl:px-40 py-[80px] md:py-[100px] lg:py-[120px] relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
              Powerful <span className="text-[#00C2D1]">Features</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto font-medium">
              Everything you need to automate your communications and transform unstructured inbox data into actionable business intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Mail, title: "AI Email Classification", desc: "Instantly categorize every message based on intent, sentiment, and context—not just keywords." },
              { icon: Zap, title: "Lead Scoring & Priority", desc: "Automatically assign scores to incoming inquiries and flag high-priority leads for immediate action." },
              { icon: GitMerge, title: "Smart Department Routing", desc: "Forward structured data natively directly to the right department's Slack channel or CRM pipeline." },
              { icon: Shield, title: "Spam & Noise Filtering", desc: "Intelligently isolate unwanted solicitations, automated replies, and junk before it clutters your workspace." },
              { icon: FileText, title: "AI Generated Summaries", desc: "Turn long, complex email threads into concise bullet-point summaries outlining exactly what action is required." },
              { icon: BarChart3, title: "Dashboard Monitoring", desc: "Track classification accuracy, volume trends, and response SLAs inside an intuitive macro analytics portal." }
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 dark:bg-[#0E1624] p-8 rounded-3xl border border-gray-100 dark:border-gray-800 hover:border-[#00C2D1]/50 dark:hover:border-[#00C2D1]/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#060D18] border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-6 shadow-sm group-hover:shadow-[0_0_20px_rgba(0,194,209,0.2)] transition-shadow">
                    <Icon className="w-6 h-6 text-[#00C2D1]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feat.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{feat.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== DASHBOARD PREVIEW ===== */}
      <section id="inboxpilot-dashboard" className="scroll-mt-24 md:scroll-mt-32 px-6 sm:px-12 lg:px-24 xl:px-40 py-[80px] md:py-[100px] lg:py-[120px] relative">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
              Total Visibility.<br/>
              <span className="text-[#00C2D1]">Zero Blind Spots.</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-8 font-medium">
              Every client gets access to a dedicated monitoring dashboard. Watch your email intelligence perform in real-time. Review KPI metrics, evaluate classification confidence scores, and analyze volume trends.
            </p>
            <ul className="space-y-4">
              {['Live processed email table preview', 'Department routing analytics', 'SLA and lead volume tracking'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300 font-medium">
                  <Check className="w-5 h-5 text-[#00C2D1]" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:w-1/2 w-full perspective-1000">
             <motion.div 
               whileHover={{ scale: 1.02, rotateY: -5, rotateX: 2 }}
               className="relative rounded-[24px] p-2 bg-gradient-to-tr from-gray-800 to-gray-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-style-3d cursor-pointer"
             >
                <img src="/src/assets/email_view.png" alt="Dashboard Preview" className="rounded-[20px] border border-white/10 w-full" />
             </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CUSTOMIZATION OPTIONS ===== */}
      <section className="px-6 sm:px-12 lg:px-24 xl:px-40 py-24 relative">
        <div className="max-w-4xl mx-auto text-center">
          <Settings className="w-12 h-12 text-[#00C2D1] mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-6">
            Fully Customizable Automation
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-12">
            Every business has unique internal processes. InboxPilot is not a rigid SaaS product—it operates as a highly flexible intelligence layer. You can request tailored capabilities completely customized completely around your needs.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 text-left">
             {[
               "Native CRM Integrations (HubSpot, Salesforce)",
               "Custom Logic & Conditional Routing",
               "Advanced AI Filtering Rules",
               "Department-Specific Workflows & Alerts",
               "Custom Reporting & Analytics Panels"
             ].map((cap, i) => (
               <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-[#0E1624] border border-gray-100 dark:border-gray-800">
                  <div className="w-2 h-2 rounded-full bg-[#00C2D1] shrink-0" />
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{cap}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ===== FLEXIBLE PRICING ===== */}
      <section id="inboxpilot-pricing" className="scroll-mt-24 md:scroll-mt-32 px-6 sm:px-12 lg:px-24 xl:px-40 py-24 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
             <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-6">
               Custom <span className="text-[#00C2D1]">Pricing</span>
             </h2>
             <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mx-auto max-w-2xl">
               InboxPilot deployments are specifically tailored to your organization depending on email volume, automation complexity, required integrations, and workflow logic.
             </p>
          </div>

          <div className="bg-white dark:bg-[#0E1624] rounded-3xl p-8 sm:p-12 border border-gray-200 dark:border-gray-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C2D1]/10 blur-[80px] rounded-full pointer-events-none" />
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 relative z-10">Pricing factors include:</h3>
            
            <ul className="space-y-4 relative z-10 mb-10">
              {['Monthly email and data volume', 'Number of distinct automated workflows', 'AI processing depth and complexity', 'Destination systems (CRM, ERP, Slack)', 'Custom routing algorithm requirements'].map((factor, idx) => (
                 <li key={idx} className="flex items-center gap-4">
                   <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-[#00C2D1]/10 flex items-center justify-center shrink-0 text-[#00C2D1]">
                     <Check className="w-3.5 h-3.5" strokeWidth={3} />
                   </div>
                   <span className="text-gray-700 dark:text-gray-300 font-medium text-lg">{factor}</span>
                 </li>
              ))}
            </ul>

            <div className="relative z-10 text-center sm:text-left">
              <button 
                onClick={() => document.getElementById("contact-inboxpilot")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-gradient-to-r from-[#00A8B5] to-[#00C2D1] text-[#0B1F3B] px-8 py-4 rounded-xl font-bold hover:shadow-[0_8px_30px_rgba(0,194,209,0.3)] transition-all duration-300 active:scale-95 inline-flex items-center gap-2"
              >
                Request Custom Quote <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT FORM ===== */}
      <section
        id="contact-inboxpilot"
        className="scroll-mt-24 md:scroll-mt-32 px-6 sm:px-12 lg:px-24 xl:px-40 py-20"
      >
        <ContactUs
          subject="InboxPilot AI Booking Request"
          defaultMessage={`Hello NeuraSyncAI Team,

I would like to schedule a setup for InboxPilot AI.

Company Name:
Estimated Monthly Email Volume:
Current Email Provider:
CRM (if any):

Looking forward to your response.

Best regards,`}
        />
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="px-6 sm:px-12 lg:px-24 xl:px-40 pb-24 pt-10 text-center relative z-10">
        <div className="max-w-4xl mx-auto rounded-[2rem] bg-gradient-to-r from-gray-900 to-[#0B1F3B] dark:from-[#060D18] dark:to-[#0A1628] p-12 lg:p-16 border border-gray-700/50 dark:border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 relative z-10">
            Start Your <span className="text-[#00C2D1]">Inbox Automation</span>
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto relative z-10">
             Stop hunting through operational noise. Ensure every message reaches the right team at the exact right moment.
          </p>
          
          <button
            onClick={() => document.getElementById("contact-inboxpilot")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative inline-flex items-center justify-center bg-[#00C2D1] text-[#0B1F3B] px-8 py-4 rounded-xl font-bold shadow-[0_0_20px_rgba(0,194,209,0.3)] hover:shadow-[0_0_30px_rgba(0,194,209,0.5)] transition-all duration-300 active:scale-95 z-10"
          >
            Request Your InboxPilot Setup
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default InboxPilot;
