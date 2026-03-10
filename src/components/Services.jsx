/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    // Header Animation
    gsap.fromTo(
      ".services-header",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Cards Staggered Animation
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 80, scale: 0.8, rotationX: 15 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".services-glass-container",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }, { scope: sectionRef });

  const services = [
    {
      title: "InboxPilot AI",
      badge: "Available Now",
      desc: "An intelligent inbox engine that classifies, routes, and auto-responds to customer emails using agentic workflows.",
    },
    {
      title: "LeadSync AI",
      badge: "Beta",
      desc: "Universal sales lead capture. Aggregates multi-channel leads, scores intent, and fires fast WhatsApp/SMS follow-ups.",
    },
    {
      title: "DocuExtract AI",
      badge: "Coming Soon",
      desc: "Intelligent OCR. Upload invoices and contracts—the AI extracts line items and syncs straight to your ERP or Google Sheets.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="px-6 sm:px-12 lg:px-24 xl:px-40 py-[100px] md:py-[120px] lg:py-[140px] text-gray-900 dark:text-white perspective-1000"
    >
      {/* Header */}
      <div className="services-header text-center max-w-3xl mx-auto mb-20 opacity-0 transform-gpu">
        <h2 className="text-4xl sm:text-5xl font-semibold">
          The <span className="text-[#00C2D1]">Platform</span> Map
        </h2>
        <p className="mt-6 text-gray-600 dark:text-gray-300 text-lg">
          One central hub. Multiple high-impact AI modules ready to deploy into your business ecosystem instantly.
        </p>
      </div>

      {/* Cards */}
      <div className="services-glass-container relative max-w-6xl mx-auto">
        <div
          className="
    relative
    rounded-[36px]
    border border-[#00C2D1]/30
    bg-white/40 dark:bg-[#0E1624]/40
    backdrop-blur-2xl
    p-10
  "
        >
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.05, y: -8, duration: 0.3, ease: "power2.out" });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
                }}
                className="
            group
            p-8
            rounded-2xl
            border border-gray-200 dark:border-gray-700
            bg-white/70 dark:bg-[#0E1624]/70
            backdrop-blur-lg
            hover:border-[#00C2D1]
            transition-colors duration-300
            hover:shadow-xl
            hover:shadow-[#00C2D1]/20
            opacity-0
            transform-gpu
          "
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold group-hover:text-[#00C2D1] transition">
                    {service.title}
                  </h3>
                  {service.badge && (
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${service.badge === 'Available Now' ? 'bg-[#00C2D1]/20 text-[#00C2D1] border border-[#00C2D1]/30' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                      {service.badge}
                    </span>
                  )}
                </div>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed min-h-[80px]">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
