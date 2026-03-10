/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import CTA from "../components/CTA";
import { motion } from "framer-motion";
import ContactUs from "../components/ContactUs";
import { Toaster } from "react-hot-toast";


const InboxPilot = () => {
  return (
    <div className="min-h-screen bg-[#F4F8FB] dark:bg-[#060D18] text-gray-800 dark:text-white transition-colors">
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
      <section className="px-6 sm:px-12 lg:px-24 xl:px-40 pt-10 pb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold"
        >
          InboxPilot AI
        </motion.h1>

        <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
          Intelligent Email Classification & Routing powered by AI and n8n
          automation.
        </p>

        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <a
            href="https://wa.me/218926467332"
            target="_blank"
            rel="noopener noreferrer"
            className="
              bg-[#00C2D1]
              text-[#0B1F3B]
              px-8 py-3
              rounded-lg
              font-semibold
              hover:bg-[#00A8B5]
              transition-all
              duration-300
              shadow-lg
              shadow-[#00C2D1]/30
            "
          >
            Contact via WhatsApp
          </a>

          <button
            onClick={() =>
              document
                .getElementById("contact-inboxpilot")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="
    border border-[#00C2D1]
    text-[#00C2D1]
    px-8 py-3
    rounded-lg
    font-semibold
    hover:bg-[#00C2D1]
    hover:text-[#0B1F3B]
    transition-all
    duration-300
  "
          >
            Email
          </button>
        </div>
      </section>

      {/* ===== DEMO VIDEO ===== */}
      <section className="px-6 sm:px-12 lg:px-24 xl:px-40 py-24 text-center">
        <h2 className="text-3xl font-semibold">Watch InboxPilot in Action</h2>

        <p className="mt-4 text-gray-600 dark:text-gray-300">
          See how AI classifies, routes, and automates your inbox in real time.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative group max-w-6xl mx-auto mt-16"
        >
          {/* Glow */}
          <div className="absolute -inset-2 rounded-[32px] bg-gradient-to-r from-[#00C2D1]/40 via-transparent to-[#00C2D1]/40 blur-3xl opacity-50 group-hover:opacity-80 transition duration-500" />

          {/* Gradient Border */}
          <div className="relative rounded-[32px] p-[2px] bg-gradient-to-r from-[#00C2D1] via-[#0B1F3B] to-[#00C2D1]">
            {/* Inner Frame */}
            <div className="rounded-[30px] overflow-hidden bg-black shadow-2xl transform transition duration-500 group-hover:scale-[1.015]">
              <iframe
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                className="w-full aspect-video md:h-[520px]"
                allowFullScreen
                title="InboxPilot Demo"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== SYSTEM PREVIEW ===== */}
      <section className="px-6 sm:px-12 lg:px-24 xl:px-40 py-24 bg-[#060D18] text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">Inside InboxPilot</h2>

          <p className="mt-6 text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A real-time AI routing engine designed to classify, prioritize, and
            structure every incoming inquiry with precision.
          </p>

          <div className="mt-20 grid md:grid-cols-2 gap-16 items-center">
            {/* LIST VIEW */}
            <div className="flex justify-center">
              <div className="group perspective relative w-[480px] max-w-full">
                <div className="absolute -inset-4 bg-cyan-400/10 blur-2xl rounded-3xl opacity-30 group-hover:opacity-50 transition duration-500" />

                <img
                  src="/src/assets/list_view.png"
                  alt="InboxPilot List View"
                  className="
              relative
              rounded-2xl
              border border-white/10
              shadow-xl
              transition-all
              duration-500
              transform-gpu
              group-hover:-translate-y-3
              group-hover:rotate-1
              group-hover:scale-[1.03]
            "
                />
              </div>
            </div>

            {/* EMAIL VIEW */}
            <div className="flex justify-center">
              <div className="group perspective relative w-[480px] max-w-full">
                <div className="absolute -inset-4 bg-cyan-400/10 blur-2xl rounded-3xl opacity-30 group-hover:opacity-50 transition duration-500" />

                <img
                  src="/src/assets/email_view.png"
                  alt="InboxPilot Email View"
                  className="
              relative
              rounded-2xl
              border border-white/10
              shadow-xl
              transition-all
              duration-500
              transform-gpu
              group-hover:-translate-y-4
              group-hover:-rotate-1
              group-hover:scale-[1.04]
            "
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROBLEM SECTION ===== */}
      <section className="px-6 sm:px-12 lg:px-24 xl:px-40 py-24 bg-white dark:bg-[#0E1624]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-center">The Problem</h2>

          <p className="mt-6 text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Growing businesses receive dozens or hundreds of emails daily.
            Important conversations get buried under operational noise.
          </p>

          <div className="mt-14 grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="font-semibold text-lg mb-2">Missed Leads</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Sales inquiries get delayed or lost among support and internal
                emails.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                Slow Response Times
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Manual sorting increases response time and hurts conversion
                rates.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Operational Noise</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Teams waste hours filtering spam, invoices and repetitive
                requests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOLUTION SECTION ===== */}
      <section className="px-6 sm:px-12 lg:px-24 xl:px-40 py-24 bg-[#F4F8FB] dark:bg-[#060D18]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold">The Solution</h2>

          <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            InboxPilot AI automatically analyzes and routes every incoming email
            using intelligent AI classification and n8n automation workflows.
          </p>

          <div className="mt-14 grid md:grid-cols-3 gap-10 text-left">
            <div className="p-6 rounded-xl bg-white dark:bg-[#101C2E] shadow-sm">
              <h3 className="font-semibold mb-2">AI Classification</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Detects intent, urgency and category instantly.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-[#101C2E] shadow-sm">
              <h3 className="font-semibold mb-2">Smart Routing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Routes emails to the correct department automatically.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-[#101C2E] shadow-sm">
              <h3 className="font-semibold mb-2">Workflow Automation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Triggers CRM updates, support tickets and follow-ups.
              </p>
            </div>
          </div>

          <p className="mt-12 font-semibold text-gray-800 dark:text-white">
            Your team focuses only on what truly matters.
          </p>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section className="px-6 sm:px-12 lg:px-24 xl:px-40 py-20 text-center">
        <h2 className="text-3xl font-semibold">Pricing</h2>

        <div className="mt-12 flex flex-col md:flex-row justify-center gap-8">
          <div className="p-8 rounded-xl bg-white dark:bg-[#0E1624] shadow-lg w-80">
            <h3 className="text-lg font-semibold">Setup</h3>
            <p className="text-4xl mt-4 font-bold">$499</p>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm">
              Full system setup, AI tuning, workflow integration and deployment.
            </p>
          </div>

          <div className="p-8 rounded-xl bg-[#00C2D1] text-[#0B1F3B] shadow-xl w-80">
            <h3 className="text-lg font-semibold">Monthly</h3>
            <p className="text-4xl mt-4 font-bold">$79</p>
            <p className="mt-4 text-sm">
              Ongoing monitoring, optimization and support.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CONTACT FORM ===== */}
      <section
        id="contact-inboxpilot"
        className="px-6 sm:px-12 lg:px-24 xl:px-40 py-20"
      >
        <ContactUs
          subject="InboxPilot AI Booking Request"
          defaultMessage={`Hello NeuraSync AI Team,

I would like to schedule a setup for InboxPilot AI.

Company Name:
Estimated Monthly Email Volume:
Current Email Provider:
CRM (if any):

Looking forward to your response.

Best regards,`}
        />
      </section>

      {/* ===== CTA ===== */}
      <section className="px-6 sm:px-12 lg:px-24 xl:px-40 pb-20">
        <CTA />
      </section>
    </div>
  );
};

export default InboxPilot;
