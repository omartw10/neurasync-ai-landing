/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const ContactUs = ({ 
  subject = "New Inquiry - NeuraSync AI",
  defaultMessage = ""
}) => {
  const [loading, setLoading] = useState(false);

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
      className="px-6 sm:px-12 lg:px-24 xl:px-40 py-28"
    >
      {" "}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h2 className="text-4xl sm:text-5xl font-semibold text-white mb-4">
          Send Us a Message
        </h2>
        <p className="text-gray-400">Tell us about your automation needs.</p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full max-w-3xl mx-auto"
        whileHover={{ scale: 1.01 }}
      >
        <div
          className="
    relative rounded-3xl p-12
    bg-white/70 dark:bg-[#0E1624]/70
    backdrop-blur-xl
    border border-transparent
    shadow-[0_20px_60px_rgba(0,0,0,0.15)]
    dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]
  "
        >
          <form
            onSubmit={onSubmit}
            className="relative grid sm:grid-cols-2 gap-8"
          >
            <input type="checkbox" name="botcheck" className="hidden" />

            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="John Doe"
                className="
  w-full rounded-xl px-5 py-3 outline-none transition-all duration-300
  bg-white dark:bg-[#0F1B2D]
  text-gray-900 dark:text-white
  placeholder-gray-400
  border border-gray-300 dark:border-white/10
  focus:border-[#00C2D1]
  focus:ring-2 focus:ring-[#00C2D1]/40
"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@company.com"
                className="
  w-full rounded-xl px-5 py-3 outline-none transition-all duration-300
  bg-white dark:bg-[#0F1B2D]
  text-gray-900 dark:text-white
  placeholder-gray-400
  border border-gray-300 dark:border-white/10
  focus:border-[#00C2D1]
  focus:ring-2 focus:ring-[#00C2D1]/40
"
              />
            </div>

            {/* Message */}
            <div className="sm:col-span-2 space-y-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">
                Project Details
              </label>
              <textarea
  rows={6}
  name="message"
  defaultValue={defaultMessage}
  placeholder="Tell us what you want to automate..."
  required
  className="w-full bg-transparent border border-gray-300 dark:border-gray-600 
             focus:border-[#00C2D1] focus:ring-1 focus:ring-[#00C2D1] 
             transition-all rounded-lg px-4 py-3 outline-none resize-none
             text-gray-800 dark:text-white placeholder-gray-400"
/>
            </div>

            {/* Button */}
            <div className="sm:col-span-2 mt-6">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="
            w-full py-4 rounded-xl font-semibold transition-all duration-300
            bg-[#00C2D1] hover:bg-[#00AEBB]
            text-[#06121F]
            shadow-[0_0_30px_rgba(0,194,209,0.35)]
            disabled:opacity-60
          "
              >
                {loading ? "Sending..." : "Send Message"}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactUs;
