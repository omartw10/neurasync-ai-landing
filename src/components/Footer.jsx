/* eslint-disable no-unused-vars */
import React from "react";
import assets from "../assets/assets";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = ({ theme }) => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="
        mt-32
        bg-white/5 dark:bg-[#0E1624]/20 
        backdrop-blur-xl
        border-t border-gray-200 dark:border-gray-800/50
      "
    >
      <div className="px-6 sm:px-12 lg:px-24 xl:px-40 py-16">
        {/* ===== TOP SECTION ===== */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* ===== Brand Column ===== */}
          <div>
            <img
              src={theme === "dark" ? assets.logo_dark : assets.logo}
              alt="NeuraSync AI"
              className="w-36 mb-6"
            />

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
              AI automation studio building intelligent systems that remove
              manual work and unlock scalable growth.
            </p>

            <div className="mt-6 space-y-4 text-sm">
              {/* Email */}
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=neurasyncagency@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-[#00C2D1] transition-all duration-300"
              >
                <img
                  src={assets.email_icon}
                  alt="Email"
                  className="w-4 h-4 opacity-80"
                />
                neurasyncagency@gmail.com
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/218926467332"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-[#00C2D1] transition-all duration-300"
              >
                <img
                  src={theme === "dark" ? assets.whatsapp_icon_dark : assets.whatsapp_icon}
                  alt="WhatsApp"
                  className="w-4 h-4 opacity-80"
                />
                +218926467332
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/omar-twerat-59788935b/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-[#00C2D1] transition-all duration-300"
              >
                <img
                  src={assets.linkedin_icon}
                  alt="LinkedIn"
                  className="w-4 h-4 opacity-80"
                />
                Connect on LinkedIn
              </a>
            </div>
          </div>

          {/* ===== Navigation ===== */}
          <div>
            <h3 className="font-semibold mb-6 text-gray-900 dark:text-white">
              Navigation
            </h3>

            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>
                <Link to="/" className="hover:text-[#00C2D1] transition">
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#solutions"
                  className="hover:text-[#00C2D1] transition"
                >
                  Solutions
                </a>
              </li>
              <li>
                <Link
                  to="/inboxpilot"
                  className="hover:text-[#00C2D1] transition"
                >
                  InboxPilot
                </Link>
              </li>
              <li>
                <a
                  href="#contact-us"
                  className="hover:text-[#00C2D1] transition"
                >
                  Contact
                </a>
                <div className="mt-4 text-sm">
                  <a
                    href="https://www.linkedin.com/in/omar-twerat-59788935b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00C2D1] hover:underline transition"
                  >
                    Connect with me on LinkedIn →
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* ===== Call To Action ===== */}
          <div>
            <h3 className="font-semibold mb-6 text-gray-900 dark:text-white">
              Let’s Build Something Smart
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Ready to automate your workflows and scale faster?
            </p>

            <a
              href="#contact-us"
              className="
                inline-block
                bg-[#00C2D1]
                text-[#0B1F3B]
                px-6 py-3
                rounded-xl
                font-semibold
                hover:bg-[#00A8B5]
                transition
                shadow-lg
                shadow-[#00C2D1]/30
              "
            >
              Start a Conversation
            </a>
          </div>
        </div>

        {/* ===== Divider ===== */}
        <div className="border-t border-gray-200 dark:border-gray-800 my-10" />

        {/* ===== Bottom ===== */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <p>© 2026 NeuraSync AI. All rights reserved.</p>

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
