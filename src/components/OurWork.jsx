/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const OurWork = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Header Animation
    gsap.fromTo(
      ".our-work-header",
      { opacity: 0, scale: 0.9, y: 40 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".our-work-header",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Cards Animation with 3D Flip
    gsap.fromTo(
      ".our-work-card",
      { opacity: 0, rotationY: -15, z: -100, y: 60, scale: 0.9 },
      {
        opacity: 1,
        rotationY: 0,
        z: 0,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".our-work-cards-wrapper",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      id="our-work"
      ref={containerRef}
      className="px-6 sm:px-12 lg:px-24 xl:px-40 py-28 text-gray-900 dark:text-white"
    >
      {/* ===== Section Header ===== */}
      <div 
        className="our-work-header text-center max-w-3xl mx-auto mb-16 opacity-0 transform-gpu"
      >
        <h2 className="text-4xl sm:text-5xl font-semibold">
          Product <span className="text-[#00C2D1]">&</span> Studio
        </h2>
        <p className="mt-6 text-gray-600 dark:text-gray-300 text-lg">
          Ready automation solutions and fully custom AI systems — built to scale.
        </p>
      </div>

      {/* ===== Cards ===== */}
      <div className="our-work-cards-wrapper grid md:grid-cols-2 gap-10 max-w-6xl mx-auto perspective-1000">

        {/* ===== PRODUCT CARD ===== */}
        <div
          onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -10, scale: 1.02, duration: 0.3 })}
          onMouseLeave={(e) => gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.3 })}
          className="our-work-card group relative p-10 rounded-3xl bg-white dark:bg-[#0E1624] border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-[#00C2D1]/20 transition-colors duration-300 transform-style-3d opacity-0"
        >
          <div className="mb-6 text-sm font-medium text-[#00C2D1] uppercase tracking-wide">
            Product
          </div>

          <h3 className="text-2xl font-semibold mb-4">
            InboxPilot AI
          </h3>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            A production-ready intelligent inbox automation system that classifies,
            routes and prioritizes emails using AI and n8n workflows.
          </p>

          <Link
            to="/inboxpilot"
            className="inline-flex items-center text-[#00C2D1] font-medium group-hover:translate-x-1 transition"
          >
            Explore Product →
          </Link>
        </div>

        {/* ===== STUDIO CARD ===== */}
        <div
          onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -10, scale: 1.02, duration: 0.3 })}
          onMouseLeave={(e) => gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.3 })}
          className="our-work-card group relative p-10 rounded-3xl bg-white dark:bg-[#0E1624] border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-[#00C2D1]/20 transition-colors duration-300 transform-style-3d opacity-0"
        >
          <div className="mb-6 text-sm font-medium text-[#00C2D1] uppercase tracking-wide">
            Studio
          </div>

          <h3 className="text-2xl font-semibold mb-4">
            Custom AI Automation
          </h3>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            Have a workflow in mind? We design and build tailored AI-powered
            automation systems around your exact business needs — from lead routing
            to internal operations and beyond.
          </p>

          <a
            href="#contact-us"
            className="inline-flex items-center text-[#00C2D1] font-medium group-hover:translate-x-1 transition"
          >
            Build With Us →
          </a>
        </div>

      </div>
    </section>
  );
};

export default OurWork;