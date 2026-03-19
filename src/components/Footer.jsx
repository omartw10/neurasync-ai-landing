import React from "react";
import assets from "../assets/assets";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = ({ theme }) => {
  const scrollToContact = (event) => {
    event.preventDefault();
    if (typeof window === 'undefined') return;
    const target = document.getElementById('contact-us');
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      window.location.hash = 'contact-us';
    }
  };
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="
        mt-0 pt-16
        bg-white dark:bg-[#030712] relative z-10
      "
    >
      <div className="px-6 sm:px-12 lg:px-24 xl:px-40 py-16">
        {/* ===== MASSIVE CTA BANNER ===== */}
        <div className="relative w-full rounded-[2.5rem] bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-[#060D18] dark:to-[#0A1628] border border-blue-100 dark:border-[#00C2D1]/20 p-10 sm:p-16 lg:p-24 text-center mb-24 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.02)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
          {/* Background Glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00C2D1]/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
              Ready to automate your workflows <br className="hidden sm:block" /> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#00C2D1] dark:from-[#00C2D1] dark:to-blue-500">scale faster?</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto font-medium">
              Join forward-thinking companies saving thousands of hours every month using NeuraSyncAI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact-us"
                onClick={scrollToContact}
                className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#00C2D1] to-[#00A8B5] text-[#0B1F3B] rounded-xl font-bold text-[15px] sm:text-base hover:shadow-[0_0_30px_rgba(0,194,209,0.4)] transition-all duration-300 active:scale-95 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start your automation journey
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </a>
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-gray-700 dark:text-white bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 hover:dark:bg-white/10 transition-colors text-[15px] sm:text-base text-center"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* ===== BOTTOM SECTION ===== */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          {/* ===== Brand Column ===== */}
          <div>
            <img
              src={theme === "dark" ? assets.logo_dark : assets.logo}
              alt="NeuraSyncAI"
              className="w-36 mb-6"
            />

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
              AI automation studio building intelligent systems that remove
              manual work and unlock scalable growth.
            </p>

            <div className="mt-8 space-y-4 text-[15px] font-medium">
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=neurasyncagency@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-500 hover:text-[#00C2D1] transition-colors rounded-lg w-max">
                <img src={assets.email_icon} alt="Email" className="w-4 h-4 opacity-70" />
                neurasyncagency@gmail.com
              </a>

              <a href="https://wa.me/218926467332" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-500 hover:text-[#00C2D1] transition-colors rounded-lg w-max">
                <img src={theme === "dark" ? assets.whatsapp_icon_dark : assets.whatsapp_icon} alt="WhatsApp" className="w-4 h-4 opacity-70" />
                +218926467332
              </a>
            </div>
          </div>

          {/* ===== Navigation ===== */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold mb-6 text-gray-900 dark:text-white tracking-wide">Platform</h3>
              <ul className="space-y-4 text-gray-500 dark:text-gray-400 font-medium text-[15px]">
                <li><Link to="/" className="hover:text-[#00C2D1] transition-colors">Home</Link></li>
                <li><a href="#solutions" className="hover:text-[#00C2D1] transition-colors">Services</a></li>
                <li><Link to="/inboxpilot" className="hover:text-[#00C2D1] transition-colors">InboxPilot CRM</Link></li>
                <li><a href="#our-work" className="hover:text-[#00C2D1] transition-colors">Our Work</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-gray-900 dark:text-white tracking-wide">Company</h3>
              <ul className="space-y-4 text-gray-500 dark:text-gray-400 font-medium text-[15px]">
                <li><a href="#founder" className="hover:text-[#00C2D1] transition-colors">Founder</a></li>
                <li><a href="#contact-us" className="hover:text-[#00C2D1] transition-colors">Contact Us</a></li>
                <li>
                  <a href="https://www.linkedin.com/in/omar-abutwairat-59788935b/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00C2D1] transition-colors flex items-center gap-2">
                    LinkedIn ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ===== Divider ===== */}
        <div className="border-t border-gray-200 dark:border-gray-800 my-10" />

        {/* ===== Bottom ===== */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <p>© 2026 NeuraSyncAI. All rights reserved.</p>

          <p>
            Built by{" "}
            <span className="text-[#00C2D1] font-medium">Omar Abutwairat</span>
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
