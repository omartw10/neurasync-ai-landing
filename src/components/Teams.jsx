import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Linkedin } from "lucide-react";
import assets from "../assets/assets";

export default function Founder() {
  const containerRef = useRef(null);

  // We make the container 200vh tall and sticky the content.
  // The scroll progress goes from 0 to 1 as the user scrolls through this extra 100vh.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"] 
  });

  // Smooth out the scroll value for high-end SaaS feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  // --- Scroll-Linked Transformations ---
  
  // Portrait subtle scaling as you scroll
  const portraitScale = useTransform(smoothProgress, [0, 1], [0.95, 1.02]);
  
  // Title & Label
  const labelOpacity = useTransform(smoothProgress, [0, 0.15], [0, 1]);
  const labelY = useTransform(smoothProgress, [0, 0.15], [20, 0]);
  const lineScale = useTransform(smoothProgress, [0.05, 0.2], [0, 1]);
  
  // Name
  const nameOpacity = useTransform(smoothProgress, [0.05, 0.25], [0, 1]);
  const nameY = useTransform(smoothProgress, [0.05, 0.25], [20, 0]);
  
  // Paragraphs
  const p1Opacity = useTransform(smoothProgress, [0.15, 0.35], [0, 1]);
  const p1Y = useTransform(smoothProgress, [0.15, 0.35], [20, 0]);

  const p2Opacity = useTransform(smoothProgress, [0.25, 0.45], [0, 1]);
  const p2Y = useTransform(smoothProgress, [0.25, 0.45], [20, 0]);

  const p3Opacity = useTransform(smoothProgress, [0.35, 0.55], [0, 1]);
  const p3Y = useTransform(smoothProgress, [0.35, 0.55], [20, 0]);

  const p4Opacity = useTransform(smoothProgress, [0.45, 0.65], [0, 1]);
  const p4Y = useTransform(smoothProgress, [0.45, 0.65], [20, 0]);

  // Focus & Stack Divider
  const botLineScale = useTransform(smoothProgress, [0.55, 0.75], [0, 1]);

  // Focus area
  const focusOpacity = useTransform(smoothProgress, [0.65, 0.85], [0, 1]);
  const focusY = useTransform(smoothProgress, [0.65, 0.85], [20, 0]);

  // Tech stack
  const stackOpacity = useTransform(smoothProgress, [0.75, 0.95], [0, 1]);
  const stackY = useTransform(smoothProgress, [0.75, 0.95], [20, 0]);

  // General wrapper opacity for fading in when reaching the section
  const sectionOpacity = useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0.6, 1, 1, 0.6]);

  return (
    <section 
      id="founder" 
      ref={containerRef}
      className="w-full relative z-10 transition-colors duration-500 bg-white dark:bg-[#030712] py-[100px] md:py-[120px] lg:py-[160px]"
    >
      <div className="relative h-[200vh]">
        {/* Sticky Viewport Container */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        


        <motion.div 
          style={{ opacity: sectionOpacity }}
          className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-8 sm:gap-12 md:gap-16 lg:gap-24 items-center relative z-20 w-full"
        >
          
          {/* Left Side: Portrait */}
          <div className="md:col-span-4 lg:col-span-5 flex justify-center md:justify-end perspective-1200">
            <motion.div 
              style={{ scale: portraitScale }}
              whileHover={{ scale: 1.05, rotateY: -5, rotateX: 5, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="relative group cursor-pointer transform-style-3d"
            >
              {/* Hover Glow Behind Image */}
              <div className="absolute -inset-4 rounded-[40px] bg-gradient-to-tr from-[#00C2D1]/30 to-blue-500/30 blur-2xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
              
              {/* Premium Portrait Frame */}
              <div className="relative rounded-[32px] p-[1.5px] bg-gradient-to-tr from-gray-200 dark:from-white/10 to-gray-50 dark:to-transparent shadow-xl dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] group-hover:shadow-[0_30px_60px_rgba(0,194,209,0.2)] dark:group-hover:shadow-[0_30px_60px_rgba(0,194,209,0.2)] transition-all duration-700 mx-auto md:mx-0">
                <div className="rounded-[30.5px] overflow-hidden bg-white dark:bg-[#0A101C] aspect-[4/5] w-[140px] sm:w-[180px] md:w-[280px] lg:w-[380px] relative">
                   <img
                     src={assets.omar_photo}
                     alt="Omar Abutwairat - Founder"
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                   />
                   {/* Internal soft overlay for premium feel */}
                   <div className="absolute inset-0 border border-black/5 dark:border-white/10 rounded-[30.5px] pointer-events-none z-10 mix-blend-overlay"></div>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-black/40 to-transparent pointer-events-none transition-opacity duration-700 group-hover:opacity-0" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Content scrolled progressively */}
          <div className="md:col-span-8 lg:col-span-7 flex flex-col items-start">
            
            {/* Label */}
            <motion.div 
              style={{ opacity: labelOpacity, y: labelY }}
              className="inline-flex items-center gap-4 mb-4 md:mb-6 relative"
            >
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#00C2D1] uppercase">Founder</span>
              <motion.div 
                style={{ scaleX: lineScale }}
                className="h-px w-16 bg-gradient-to-r from-[#00C2D1] to-transparent origin-left"
              ></motion.div>
            </motion.div>

            {/* Name & Socials */}
            <motion.div 
              style={{ opacity: nameOpacity, y: nameY }}
              className="relative group mb-6 md:mb-10 inline-flex flex-col items-start"
            >
              <div className="flex items-center gap-4 pb-2">
                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-none cursor-default">
                  Omar Abutwairat
                </h2>
                <a 
                  href="https://www.linkedin.com/in/omar-abutwairat-59788935b/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Omar's LinkedIn Profile"
                  className="p-2 rounded-xl bg-blue-500/10 text-blue-500 dark:bg-white/5 dark:text-gray-300 hover:bg-[#0077b5] hover:text-white dark:hover:bg-[#0077b5] dark:hover:text-white transition-all duration-300 shadow-sm"
                >
                  <Linkedin className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8" strokeWidth={1.5} />
                </a>
              </div>
              {/* Animated Underline */}
              <div className="absolute bottom-0 left-0 w-12 h-[3px] bg-[#00C2D1] rounded-full group-hover:w-[calc(100%-60px)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-80"></div>
            </motion.div>

            {/* Biography Paragraphs */}
            <div className="space-y-4 md:space-y-6 mb-6 md:mb-12 text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
               <motion.p style={{ opacity: p1Opacity, y: p1Y }}>
                 Omar Abutwairat is a software engineer specializing in AI-powered automation systems, workflow orchestration, and scalable digital infrastructure.
               </motion.p>
               <motion.p style={{ opacity: p2Opacity, y: p2Y }}>
                 He focuses on building intelligent systems that transform how companies handle operations, communication, and decision flows. His work centers around eliminating manual bottlenecks by designing automation pipelines that operate reliably at scale.
               </motion.p>
               <motion.p style={{ opacity: p3Opacity, y: p3Y }}>
                 Through the combination of AI classification models, workflow automation frameworks, and modern web architecture, Omar builds production-grade systems that allow businesses to process information faster, route opportunities intelligently, and operate with significantly less operational overhead.
               </motion.p>
               <motion.p style={{ opacity: p4Opacity, y: p4Y }}>
                 His approach prioritizes clarity, efficiency, and long-term scalability — turning fragmented processes into cohesive automation ecosystems that support business growth.
               </motion.p>
            </div>

            {/* Focus & Stack */}
            <div className="grid sm:grid-cols-2 gap-6 md:gap-10 w-full pt-4 md:pt-6 relative">
              {/* Soft divider */}
              <motion.div 
                 style={{ scaleX: botLineScale }}
                 className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-gray-200 dark:from-white/10 to-transparent origin-left"
              ></motion.div>
              
              <motion.div 
                style={{ opacity: focusOpacity, y: focusY }}
                className="flex flex-col gap-4"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Focus Area</span>
                <div className="flex flex-wrap gap-2 md:gap-2.5">
                  {['Automation Architecture', 'AI Systems', 'Workflow Engineering'].map((item, i) => (
                    <span key={i} className="px-2.5 md:px-3.5 py-1 md:py-1.5 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-300 shadow-sm transition-all hover:bg-gray-50 hover:-translate-y-0.5 hover:border-[#00C2D1]/50 hover:text-[#00C2D1] dark:hover:text-[#00C2D1] duration-300">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                style={{ opacity: stackOpacity, y: stackY }}
                className="flex flex-col gap-2 md:gap-4 hidden sm:flex"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Tech Stack</span>
                <div className="flex flex-wrap gap-2 md:gap-2.5">
                  {['n8n', 'AI Infrastructure', 'Modern Web Systems'].map((item, i) => (
                    <span key={i} className="px-2.5 md:px-3.5 py-1 md:py-1.5 rounded-lg bg-blue-50/80 dark:bg-[#00C2D1]/10 border border-blue-100 dark:border-[#00C2D1]/20 text-xs md:text-sm font-semibold text-blue-700 dark:text-[#00C2D1] shadow-sm transition-all hover:bg-blue-100 hover:-translate-y-0.5 hover:dark:bg-[#00C2D1]/20 duration-300">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        </div>
      </div>
    </section>
  );
}
