import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const Pricing = () => {
  const tiers = [
    {
      name: "Starter",
      description: "Perfect for small teams automating manual tasks.",
      price: "$199",
      billing: "/month",
      features: [
        { name: "1 Core AI Module", included: true },
        { name: "Up to 5,000 Tasks/mo", included: true },
        { name: "Shared Automation Server", included: true },
        { name: "Email Support", included: true },
        { name: "Custom Webhooks", included: false },
        { name: "Dedicated Account Manager", included: false },
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Growth",
      description: "For agencies and businesses scaling with AI.",
      price: "$499",
      billing: "/month",
      features: [
        { name: "3 Core AI Modules", included: true },
        { name: "Up to 50,000 Tasks/mo", included: true },
        { name: "Dedicated n8n Instance", included: true },
        { name: "Priority Slack Support", included: true },
        { name: "Custom Webhooks & APIs", included: true },
        { name: "Dedicated Account Manager", included: false },
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "Custom built infrastructure for high volume.",
      price: "Custom",
      billing: "",
      features: [
        { name: "Unlimited AI Modules", included: true },
        { name: "Unlimited Tasks/mo", included: true },
        { name: "Self-Hosted or VPC Deploy", included: true },
        { name: "24/7 Phone Support", included: true },
        { name: "Custom Webhooks & APIs", included: true },
        { name: "Dedicated Account Manager", included: true },
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="relative min-h-[100svh] flex flex-col justify-center scroll-mt-24 md:scroll-mt-32 px-6 sm:px-12 lg:px-24 xl:px-40 pt-[120px] pb-16 text-gray-900 dark:text-white bg-gray-50/50 dark:bg-[#060D18]/50">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-20"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
          Transparent <span className="text-[#00C2D1]">Pricing</span>
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base font-medium">
          Simple, predictable pricing. No hidden fees. Start automating and scale as you grow.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
        {tiers.map((tier, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.03, y: -10, transition: { duration: 0.2 } }}
            transition={{ duration: 0.5, delay: index * 0.15, type: "spring", bounce: 0.4 }}
            viewport={{ once: true }}
            className={`
              relative p-6 rounded-3xl border
              ${tier.popular ? 'border-[#00C2D1] shadow-2xl shadow-[#00C2D1]/10 bg-white dark:bg-[#0B1120]' : 'border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-[#0E1624]/60'}
              backdrop-blur-xl flex flex-col
            `}
          >
            {tier.popular && (
              <div className="absolute -top-4 left-0 right-0 flex justify-center">
                <span className="bg-[#00C2D1] text-[#0B1F3B] text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-lg">
                  Most Popular
                </span>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 h-10">{tier.description}</p>
            </div>

            <div className="mb-6 flex items-baseline gap-1">
              <span className="text-4xl sm:text-5xl font-bold">{tier.price}</span>
              <span className="text-gray-500 dark:text-gray-400 font-medium">{tier.billing}</span>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {tier.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  {feature.included ? (
                    <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-5 h-5 text-gray-300 dark:text-gray-600 shrink-0 mt-0.5" />
                  )}
                  <span className={feature.included ? 'text-gray-700 dark:text-gray-300 font-medium' : 'text-gray-400 dark:text-gray-500'}>
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className={`
                w-full py-4 rounded-xl font-semibold transition-all duration-300
                ${tier.popular 
                  ? 'bg-[#00C2D1] text-[#0B1F3B] hover:bg-[#00A8B5] shadow-lg shadow-[#00C2D1]/30' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                }
              `}
            >
              {tier.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
