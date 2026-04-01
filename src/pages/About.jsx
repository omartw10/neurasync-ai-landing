import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import assets from "../assets/assets";
import { Sparkles, BrainCircuit, Activity, Layers, ArrowRight, Zap, Target, Globe } from "lucide-react";

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionTitle = ({ children, badge, badgeIcon: BadgeIcon }) => (
  <div className="flex flex-col items-center md:items-start mb-12">
    {badge && (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-[#00C2D1]/10 border border-blue-200 dark:border-[#00C2D1]/30 text-blue-600 dark:text-[#00C2D1] text-[11px] font-bold tracking-[0.15em] uppercase mb-6 shadow-sm"
      >
        {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5" />} {badge}
      </motion.div>
    )}
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight md:text-left text-center">
      {children}
    </h2>
  </div>
);

const About = ({ theme, setTheme }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] text-gray-900 dark:text-white transition-colors duration-500 font-sans selection:bg-[#00C2D1]/30 overflow-hidden">
      <Navbar theme={theme} setTheme={setTheme} />

      <main className="pt-32 pb-16">
        
        {/* ===== HERO ===== */}
        <section id="about-hero" className="px-6 sm:px-12 lg:px-24 xl:px-40 py-16 md:py-24 relative">
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter mb-4"
            >
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#00C2D1] dark:from-[#00C2D1] dark:to-blue-500">NeuraSyncAI</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg text-gray-600 dark:text-gray-300 font-medium leading-relaxed mb-6 max-w-2xl mx-auto"
            >
              NeuraSyncAI was created from curiosity, passion, and a deep belief that businesses should not be slowed down by manual operations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto space-y-3"
            >
              <p>
                Our mission is simple: to build intelligent systems that help companies operate faster, smarter, and with fewer limitations.
              </p>
              <p>
                We design AI-driven automation systems that transform complex workflows into streamlined digital processes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ===== WHY NeuraSyncAI EXISTS ===== */}
        <section id="about-why" className="px-6 sm:px-12 lg:px-24 xl:px-40 py-16 md:py-20 relative">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <FadeIn>
              <SectionTitle badge="The Problem" badgeIcon={Target}>
                Why We Built NeuraSyncAI
              </SectionTitle>
              <div className="space-y-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                <p>Modern companies lose countless hours managing repetitive tasks.</p>
                <div className="pl-6 border-l-2 border-[#00C2D1] py-2 space-y-1.5 text-gray-800 dark:text-gray-200 font-bold">
                  <p>Emails pile up.</p>
                  <p>Leads go unanswered.</p>
                  <p>Opportunities slip through the cracks.</p>
                </div>
                <p>Behind the scenes, teams spend valuable time doing work that intelligent systems should handle automatically. NeuraSyncAI was created to solve that problem.</p>
                <p>Instead of forcing teams to adapt to rigid software, we build intelligent automation systems that adapt to how businesses actually operate.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="relative aspect-square md:aspect-auto md:h-[400px] w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white dark:from-[#0D1524] dark:to-[#0A101C] rounded-3xl border border-gray-200 dark:border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
                <div className="absolute w-[200%] h-[200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.05]" />
                
                {/* Left Side: Chaos (Floating messy elements) */}
                <div className="absolute left-0 top-0 bottom-0 w-[45%] overflow-hidden">
                   {[
                     { delay: 0, r: -20, y: -80 },
                     { delay: 0.8, r: 15, y: 30 },
                     { delay: 1.6, r: -10, y: -20 },
                     { delay: 2.4, r: 25, y: 90 },
                     { delay: 3.2, r: -30, y: -110 },
                   ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -60, y: item.y, rotate: item.r }}
                        animate={{ 
                           opacity: [0, 1, 1, 0, 0],
                           x: [-60, 20, 80, 140, 140],
                           y: [item.y, item.y * 0.5, 0, 0, 0],
                           rotate: [item.r, item.r * 0.5, 0, 0, 0],
                           scale: [0.8, 1, 0.6, 0, 0]
                        }}
                        transition={{ 
                           duration: 4, 
                           repeat: Infinity, 
                           delay: item.delay,
                           ease: "easeInOut"
                        }}
                        className="absolute left-[10%] top-1/2 w-28 h-10 bg-white dark:bg-[#1E293B] shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg flex items-center px-3 gap-2"
                      >
                         <div className="w-4 h-4 rounded bg-gray-200 dark:bg-gray-600" />
                         <div className="h-2 w-12 bg-gray-100 dark:bg-gray-700 rounded" />
                      </motion.div>
                   ))}
                </div>

                {/* Center: The AI Engine */}
                <div className="relative z-10">
                   <motion.div 
                     animate={{ 
                       boxShadow: ["0 0 20px rgba(0,194,209,0.2)", "0 0 60px rgba(0,194,209,0.6)", "0 0 20px rgba(0,194,209,0.2)"],
                       scale: [1, 1.05, 1] 
                     }}
                     transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                     className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-gray-900 via-blue-900 to-[#00C2D1] dark:from-[#00C2D1] dark:to-blue-700 flex items-center justify-center relative shadow-2xl border border-white/20"
                   >
                     <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-1.5 rounded-2xl border-2 border-dashed border-[#00C2D1]/40 dark:border-white/30" 
                     />
                     <BrainCircuit className="w-8 h-8 text-white" />
                   </motion.div>
                </div>

                {/* Right Side: Order (Neat stacking) */}
                <div className="absolute right-[5%] sm:right-[10%] top-1/2 -translate-y-1/2 flex flex-col gap-3">
                   {[
                     { delay: 0.5, color: "bg-emerald-500", w: "w-20" },
                     { delay: 1.5, color: "bg-blue-500", w: "w-24" },
                     { delay: 2.5, color: "bg-orange-500", w: "w-16" },
                     { delay: 3.5, color: "bg-purple-500", w: "w-28" }
                   ].map((item, i) => (
                     <motion.div
                       key={i}
                       initial={{ opacity: 0, x: -30 }}
                       animate={{ opacity: [0, 1, 1, 0, 0], x: [-30, 0, 0, 20, 20] }}
                       transition={{ 
                         duration: 4, 
                         repeat: Infinity, 
                         delay: item.delay,
                         times: [0, 0.15, 0.7, 0.85, 1],
                         ease: "easeOut"
                       }}
                       className="w-32 sm:w-40 h-10 bg-white dark:bg-[#0A1628] border border-blue-100 dark:border-[#00C2D1]/20 rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.05)] flex items-center px-3"
                     >
                        <div className="flex items-center gap-2">
                           <div className={`w-2 h-2 rounded-full ${item.color} shadow-[0_0_8px_currentColor]`} />
                           <div className={`h-1.5 ${item.w} bg-gray-100 dark:bg-gray-800 rounded`} />
                        </div>
                     </motion.div>
                   ))}
                </div>

              </div>
            </FadeIn>
          </div>
        </section>

        {/* ===== WHAT WE BUILD ===== */}
        <section id="about-what" className="px-6 sm:px-12 lg:px-24 xl:px-40 py-16 md:py-20 relative">
          <div className="max-w-3xl mx-auto text-center mb-16">
             <FadeIn>
               <SectionTitle badge="Our Products" badgeIcon={Layers}>
                 <span className="w-full text-center block">What We Build</span>
               </SectionTitle>
               <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
                 NeuraSyncAI develops AI-powered systems that automate the operational backbone of modern businesses. Our platform focuses on transforming everyday workflows into intelligent processes that run continuously in the background.
               </p>
             </FadeIn>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
            {[
              "analyze incoming communication",
              "classify and prioritize requests",
              "route information to the correct teams",
              "automate repetitive operational tasks"
            ].map((feature, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flex items-center gap-4 p-5 bg-white dark:bg-[#0A101C] rounded-2xl border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-[#00C2D1]/10 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-blue-600 dark:text-[#00C2D1]" />
                  </div>
                  <span className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-200">{feature}</span>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4} className="max-w-3xl mx-auto text-center bg-gray-900 dark:bg-white/5 p-8 sm:p-12 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-[#00C2D1]/20 blur-3xl opacity-30" />
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 relative z-10">The Result is Simple:</h3>
            <p className="text-lg text-gray-300 relative z-10 font-medium">
               Companies can process information faster, respond to opportunities sooner, and dramatically increase productivity.
            </p>
          </FadeIn>
        </section>

        {/* ===== OUR APPROACH ===== */}
        <section id="about-approach" className="px-6 sm:px-12 lg:px-24 xl:px-40 py-16 md:py-20 relative">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <FadeIn>
                <SectionTitle badge="Philosophy" badgeIcon={BrainCircuit}>
                  Our Approach
                </SectionTitle>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Our philosophy is based on three core principles.</p>
              </FadeIn>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
               {[
                 {
                   title: "Automation First",
                   desc: "If a process can be automated, it should be automated. Manual workflows slow companies down and create unnecessary operational friction.",
                   icon: Zap
                 },
                 {
                   title: "AI-Assisted Decisions",
                   desc: "Automation becomes powerful when combined with intelligent decision layers. By integrating AI models into workflows, systems can understand context, detect intent, and make smarter routing decisions.",
                   icon: BrainCircuit
                 },
                 {
                   title: "Scalable Infrastructure",
                   desc: "The systems we build are designed to grow with the companies using them. From small teams to large organizations, the goal is always the same: create reliable systems that operate consistently at scale.",
                   icon: Globe
                 }
               ].map((principle, i) => {
                 const Icon = principle.icon;
                 return (
                   <FadeIn key={i} delay={i * 0.1} className="relative group">
                     <div className="h-full p-8 bg-gray-50 dark:bg-[#0D1524] rounded-3xl border border-gray-200/50 dark:border-white/5 transition-all duration-300 hover:border-[#00C2D1]/50 hover:shadow-[0_10px_30px_rgba(0,194,209,0.1)]">
                       <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#070D18] flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#00C2D1]/10 transition-colors">
                         <Icon className="w-7 h-7 text-blue-600 dark:text-[#00C2D1]" />
                       </div>
                       <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">{principle.title}</h3>
                       <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">{principle.desc}</p>
                     </div>
                   </FadeIn>
                 )
               })}
             </div>
          </div>
        </section>

        {/* ===== FOUNDER ===== */}
        <section id="about-founder" className="px-6 sm:px-12 lg:px-24 xl:px-40 py-16 md:py-24 relative">
          <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            <div className="md:col-span-5 flex justify-center perspective-1200">
              <FadeIn className="relative group transform-style-3d">
                <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-[#00C2D1]/30 to-blue-500/30 blur-2xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
                <div className="relative rounded-[32px] p-[1.5px] bg-gradient-to-tr from-gray-200 dark:from-white/10 to-gray-50 dark:to-transparent shadow-xl dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-700">
                  <div className="rounded-[30.5px] overflow-hidden bg-white dark:bg-[#0A101C] aspect-[4/5] w-[260px] md:w-[full] lg:w-[380px] relative">
                     <img
                       src={assets.omar_photo}
                       alt="Omar Abutwairat"
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                     />
                     <div className="absolute inset-0 border border-black/5 dark:border-white/10 rounded-[30.5px] pointer-events-none z-10 mix-blend-overlay"></div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="md:col-span-7 flex flex-col items-start px-2">
              <FadeIn>
                <SectionTitle badge="Founder">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black">Omar Abutwairat</span>
                </SectionTitle>
                <div className="space-y-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                  <p>
                    NeuraSyncAI was founded by Omar Abutwairat, a software engineer with a deep passion for automation and artificial intelligence.
                  </p>
                  <p>
                    Driven by curiosity and a fascination with intelligent systems, he began building automation frameworks designed to simplify complex business operations.
                  </p>
                  <p>
                    His work focuses on transforming scattered workflows into cohesive automation architectures that allow companies to operate with greater speed, clarity, and efficiency.
                  </p>
                  <div className="pt-4 mt-6 border-t border-gray-200 dark:border-white/10">
                    <p className="text-xl font-bold text-gray-900 dark:text-white leading-relaxed">
                      Today, NeuraSyncAI continues to evolve with one central idea: <br/>
                      <span className="text-[#00C2D1]">software should not just assist work — it should actively run it.</span>
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
            
          </div>
        </section>

        {/* ===== VISION ===== */}
        <section id="about-vision" className="px-6 sm:px-12 lg:px-24 xl:px-40 py-16 md:py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-overlay" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <FadeIn>
              <Sparkles className="w-10 h-10 text-[#00C2D1] mx-auto mb-6" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-none mb-4">
                The Future We're Building
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-10 max-w-xl mx-auto">
                Our vision is to create a platform where businesses of any size can operate with the same technological advantage as the world's largest companies.
              </p>
              
              <div className="inline-block text-left bg-white dark:bg-[#0A101C] p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-white/5 shadow-xl">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-widest text-xs">A future where:</h4>
                <ul className="space-y-3">
                  {[
                    "Operational workflows run autonomously",
                    "Communication is intelligently organized",
                    "Opportunities are never missed",
                    "Productivity scales naturally"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-lg font-bold text-gray-700 dark:text-gray-300">
                      <div className="w-2 h-2 rounded-full bg-[#00C2D1]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <p className="text-2xl font-black text-gray-900 dark:text-white mt-12 bg-clip-text">
                NeuraSyncAI exists to build that future.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section id="about-cta" className="px-6 sm:px-12 lg:px-24 xl:px-40 pb-16 pt-8 text-center">
          <FadeIn className="max-w-3xl mx-auto rounded-[2.5rem] bg-gray-900 dark:bg-[#070D18] p-10 lg:p-14 border border-gray-800 dark:border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-[#00C2D1]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 relative z-10 tracking-tight">
              Start Building Your <br className="hidden sm:block" />
              <span className="text-[#00C2D1]">Automation System</span>
            </h2>
            
            <p className="text-sm sm:text-base text-gray-300 mb-8 max-w-lg mx-auto relative z-10 font-medium leading-relaxed">
              Tell us what process you want to automate. We'll help design the intelligent system that runs it.
            </p>
            
            <Link
              to="/#contact-us"
              className="inline-flex items-center justify-center bg-[#00C2D1] text-[#0B1F3B] px-8 py-4 rounded-xl font-bold shadow-[0_0_20px_rgba(0,194,209,0.3)] hover:shadow-[0_0_30px_rgba(0,194,209,0.5)] transition-all duration-300 hover:-translate-y-1 active:scale-95 z-10 relative group-hover:px-10"
            >
              Start Your Automation
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </section>

      </main>

      <Footer theme={theme} />
    </div>
  );
};

export default About;
