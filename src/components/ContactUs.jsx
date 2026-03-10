/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const ContactUs = ({ 
  subject = "New Inquiry - NeuraSync AI",
  defaultMessage = ""
}) => {
  const [loading, setLoading] = useState(false);
  const [messageLength, setMessageLength] = useState(defaultMessage ? defaultMessage.length : 0);

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const name = formData.get("name")?.trim();
    const email = formData.get("email")?.trim();
    const message = formData.get("message")?.trim();
    const botcheck = formData.get("botcheck");

    // ===== Honeypot Anti-Spam =====
    if (botcheck) return;

    // ===== Validation =====
    if (!name || !email || !message) {
      toast.error("Please complete all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    formData.append("subject", subject);

    try {
      const response = await fetch("http://localhost:5678/webhook-test/neurasyncai", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Message sent successfully 🚀", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#0E1624",
            color: "#E6F7FA",
            border: "1px solid #00C2D1",
            padding: "14px 18px",
            borderRadius: "12px",
            boxShadow: "0 0 25px rgba(0,194,209,0.3)",
          },
          iconTheme: {
            primary: "#00C2D1",
            secondary: "#0E1624",
          },
        });

        form.reset();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact-us"
      className="relative w-full px-6 sm:px-12 lg:px-24 xl:px-40 py-[100px] md:py-[120px] lg:py-[160px] overflow-hidden transition-colors duration-500"
    >
      <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.9, y: 20 }}
           whileInView={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-5xl font-black text-gray-900 dark:text-white mb-5 tracking-tight">
            Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[#00C2D1] dark:from-[#00C2D1] dark:to-blue-500">Automation</span>
          </h2>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-xl mx-auto"
        >
          Tell us about the workflow you want to automate and our team will design the right AI system for you.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full max-w-3xl mx-auto relative z-10"
      >
        {/* Premium Form Container with Glow & Glassmorphism */}
        <div className="relative group/form">
          {/* Subtle gradient glow behind the card that activates on interaction */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00C2D1]/10 to-blue-500/10 dark:from-[#00C2D1]/30 dark:to-blue-600/30 rounded-[2rem] blur-xl opacity-0 group-hover/form:opacity-100 transition duration-700 pointer-events-none" />
          
          <div className="relative rounded-3xl p-8 sm:p-12 bg-white/70 dark:bg-[#0A101C]/80 backdrop-blur-2xl border border-gray-200/50 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300 group-hover/form:border-gray-300 dark:group-hover/form:border-white/20">
            <form onSubmit={onSubmit} className="relative grid sm:grid-cols-2 gap-x-6 gap-y-8">
              <input type="checkbox" name="botcheck" className="hidden" />

              {/* Name */}
              <div className="space-y-2.5">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="w-full rounded-xl px-5 py-3.5 outline-none transition-all duration-300 bg-white/50 dark:bg-[#060D18]/80 text-gray-900 dark:text-white placeholder-gray-400 border border-gray-200 dark:border-white/10 focus:-translate-y-0.5 focus:border-[#00C2D1] focus:ring-4 focus:ring-[#00C2D1]/10 focus:shadow-[0_8px_20px_rgba(0,194,209,0.1)] focus:bg-white dark:focus:bg-[#060D18]"
                />
              </div>

              {/* Email */}
              <div className="space-y-2.5">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@company.com"
                  className="w-full rounded-xl px-5 py-3.5 outline-none transition-all duration-300 bg-white/50 dark:bg-[#060D18]/80 text-gray-900 dark:text-white placeholder-gray-400 border border-gray-200 dark:border-white/10 focus:-translate-y-0.5 focus:border-[#00C2D1] focus:ring-4 focus:ring-[#00C2D1]/10 focus:shadow-[0_8px_20px_rgba(0,194,209,0.1)] focus:bg-white dark:focus:bg-[#060D18]"
                />
              </div>

              {/* Message */}
              <div className="sm:col-span-2 space-y-2.5">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Project Details</label>
                <div className="relative group/textarea">
                  {/* Writing Hint Overlay */}
                  <div className={`absolute inset-0 pointer-events-none pl-[22px] pt-[18px] text-gray-500/70 dark:text-gray-500/80 text-[15px] leading-relaxed select-none transition-opacity duration-300 z-10 ${messageLength > 0 ? 'opacity-0' : 'opacity-100'}`}>
                    Tell us what you want to automate...<br/><br/>
                    <span className="text-gray-400/80 dark:text-gray-600/90 text-sm block mt-1 leading-loose">
                      Examples:<br/>
                      • Email intent classification & routing<br/>
                      • Multi-channel outbound lead generation<br/>
                      • Automated invoice OCR data extraction
                    </span>
                  </div>
                  
                  <textarea
                    rows={7}
                    name="message"
                    defaultValue={defaultMessage}
                    onChange={(e) => setMessageLength(e.target.value.length)}
                    required
                    className="relative z-20 w-full rounded-xl px-5 py-4 outline-none transition-all duration-300 bg-transparent text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 resize-none focus:-translate-y-0.5 focus:border-[#00C2D1] focus:ring-4 focus:ring-[#00C2D1]/10 focus:shadow-[0_8px_20px_rgba(0,194,209,0.1)]"
                  />
                  <div className="absolute inset-0 bg-white/50 dark:bg-[#060D18]/80 rounded-xl z-0 pointer-events-none transition-colors duration-300 group-focus-within/textarea:bg-white dark:group-focus-within/textarea:bg-[#060D18]" />
                </div>
              </div>

              {/* Button */}
              <div className="sm:col-span-2 mt-4 relative">
                <motion.button 
                  whileHover={{ scale: 1.01 }} 
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="group relative w-full py-4 rounded-xl font-bold transition-all duration-300 disabled:opacity-60 overflow-hidden bg-gradient-to-r from-[#00A8B5] to-[#00C2D1] hover:from-[#00C2D1] hover:to-[#2EE2F0] text-[#0B1F3B] shadow-[0_4px_20px_rgba(0,194,209,0.25)] hover:shadow-[0_8px_30px_rgba(0,194,209,0.4)]"
                >
                  <span className="relative z-10 text-base">{loading ? "Sending..." : "Send Message"}</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactUs;
