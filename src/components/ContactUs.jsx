import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

// Webhook credentials safely moved to Vercel api endpoint

const ContactUs = ({ 
  subject = "New Inquiry - NeuraSyncAI",
  defaultMessage = ""
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [messageLength, setMessageLength] = useState(defaultMessage ? defaultMessage.length : 0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState("");
  
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  const inquiryOptions = [
    "Existing Service / Product",
    "Custom AI System Design",
    "General Inquiry",
    "Other"
  ];

  const productOptions = [
    { name: "InboxPilot AI", available: true },
    { name: "LeadSync AI", available: false, tag: "Closed Beta" },
    { name: "DocuExtract AI", available: false, tag: "Coming Soon" }
  ];

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const name = formData.get("name")?.trim();
    const email = formData.get("email")?.trim();
    const inquiryType = formData.get("inquiryType");
    const productName = formData.get("productName");
    const message = formData.get("message")?.trim();
    const botcheck = formData.get("botcheck");

    // ===== Honeypot Anti-Spam =====
    if (botcheck) return;

    // ===== Validation =====
    if (!name || !email || !inquiryType || !message) {
      setErrorMessage("Please complete all required fields before sending.");
      setTimeout(() => setErrorMessage(""), 6000);
      return;
    }

    if (inquiryType === "Existing Service / Product" && !productName) {
      setErrorMessage("Please select a service or product to continue.");
      setTimeout(() => setErrorMessage(""), 6000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("The email address you entered doesn't look right. Please check and try again.");
      setTimeout(() => setErrorMessage(""), 6000);
      return;
    }

    setLoading(true);
    formData.append("subject", subject);

    try {
      // Prepare the JSON payload from the extracted form data
      const payload = {
        name,
        email,
        inquiryType,
        productName,
        message,
        subject
      };

      // Send request to our secure Vercel Serverless Function
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        form.reset();
        setMessageLength(0);
        setSelectedInquiry("");
        setSelectedProduct("");
        setLoading(false);
        setSuccess(true);
        // Auto-dismiss success after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setLoading(false);
        setErrorMessage("Something went wrong on our end. Please try again in a moment.");
        setTimeout(() => setErrorMessage(""), 6000);
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Contact form submission failed", err);
      }
      setLoading(false);
      setErrorMessage("Unable to reach our servers. Please check your connection and try again.");
      setTimeout(() => setErrorMessage(""), 6000);
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

              {/* Inquiry Type Custom Select */}
              <div className="sm:col-span-2 space-y-2.5 relative z-50">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Reason for Contact</label>
                <input type="hidden" name="inquiryType" value={selectedInquiry} />
                
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(!isDropdownOpen);
                      setIsProductDropdownOpen(false); // Close the other
                    }}
                    className={`w-full flex items-center justify-between rounded-xl px-5 py-3.5 outline-none transition-all duration-300 border ${isDropdownOpen ? 'border-[#00C2D1] ring-4 ring-[#00C2D1]/10 shadow-[0_8px_20px_rgba(0,194,209,0.1)] bg-white dark:bg-[#060D18]' : 'bg-white/50 dark:bg-[#060D18]/80 border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'}`}
                  >
                    <span className={selectedInquiry ? "text-gray-900 dark:text-white font-medium" : "text-gray-400"}>
                      {selectedInquiry || "Select an option..."}
                    </span>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#00C2D1]' : 'text-gray-400'}`} />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                        
                        <motion.div
                          initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                          animate={{ opacity: 1, y: 0, scaleY: 1 }}
                          exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute z-50 top-full left-0 right-0 mt-2 p-2 rounded-xl bg-white dark:bg-[#060D18] border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden origin-top"
                        >
                          {inquiryOptions.map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => {
                                setSelectedInquiry(option);
                                setIsDropdownOpen(false);
                                // Reset product selection if changing main category
                                if(option !== "Existing Service / Product") {
                                  setSelectedProduct("");
                                }
                              }}
                              className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                selectedInquiry === option 
                                  ? "bg-[#00C2D1]/10 text-[#00C2D1]" 
                                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                              }`}
                            >
                              {option}
                              {selectedInquiry === option && <Check className="w-4 h-4 text-[#00C2D1]" strokeWidth={2.5} />}
                            </button>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Conditional Product Selection Dropdown */}
              <AnimatePresence>
                {selectedInquiry === "Existing Service / Product" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: "1rem" }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="sm:col-span-2 space-y-2.5 relative z-40 overflow-visible"
                    style={{ overflow: 'visible' }} // Important for the dropdown menu to escape
                  >
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Which Service?</label>
                    <input type="hidden" name="productName" value={selectedProduct} />
                    
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setIsProductDropdownOpen(!isProductDropdownOpen);
                          setIsDropdownOpen(false); // Close the other
                        }}
                        className={`w-full flex items-center justify-between rounded-xl px-5 py-3.5 outline-none transition-all duration-300 border ${isProductDropdownOpen ? 'border-blue-500 ring-4 ring-blue-500/10 shadow-[0_8px_20px_rgba(59,130,246,0.1)] bg-white dark:bg-[#060D18]' : 'bg-white/50 dark:bg-[#060D18]/80 border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'}`}
                      >
                        <span className={selectedProduct ? "text-gray-900 dark:text-white font-medium" : "text-gray-400"}>
                          {selectedProduct || "Select a service..."}
                        </span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isProductDropdownOpen ? 'rotate-180 text-blue-500' : 'text-gray-400'}`} />
                      </button>

                      <AnimatePresence>
                        {isProductDropdownOpen && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setIsProductDropdownOpen(false)} />
                            
                            <motion.div
                              initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                              animate={{ opacity: 1, y: 0, scaleY: 1 }}
                              exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="absolute z-50 top-full left-0 right-0 mt-2 p-2 rounded-xl bg-white dark:bg-[#060D18] border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden origin-top"
                            >
                              {productOptions.map((option) => (
                                <button
                                  key={option.name}
                                  type="button"
                                  disabled={!option.available}
                                  onClick={() => {
                                    if (option.available) {
                                      setSelectedProduct(option.name);
                                      setIsProductDropdownOpen(false);
                                    }
                                  }}
                                  className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                    !option.available
                                      ? "opacity-50 cursor-not-allowed text-gray-500 dark:text-gray-500"
                                      : selectedProduct === option.name 
                                        ? "bg-blue-500/10 text-blue-500" 
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                                  }`}
                                >
                                  <span className="flex items-center gap-2">
                                    {option.name}
                                    {!option.available && (
                                      <span className="text-[9px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                        {option.tag}
                                      </span>
                                    )}
                                  </span>
                                  {selectedProduct === option.name && <Check className="w-4 h-4 text-blue-500" strokeWidth={2.5} />}
                                </button>
                              ))}
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

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
                  whileHover={{ scale: loading ? 1 : 1.01 }} 
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  type="submit"
                  disabled={loading || success}
                  className="group relative w-full py-4 rounded-xl font-bold transition-all duration-300 disabled:opacity-80 overflow-hidden bg-gradient-to-r from-[#00A8B5] to-[#00C2D1] hover:from-[#00C2D1] hover:to-[#2EE2F0] text-[#0B1F3B] shadow-[0_4px_20px_rgba(0,194,209,0.25)] hover:shadow-[0_8px_30px_rgba(0,194,209,0.4)]"
                >
                  <span className="relative z-10 text-base flex items-center justify-center gap-3">
                    {loading ? (
                      <>
                        <img
                          src="/logo_icon.png"
                          alt=""
                          className="w-5 h-5 object-contain"
                          style={{ animation: "contactLogoSpin 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}
                        />
                        Sending...
                      </>
                    ) : "Send Message"}
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </motion.button>
              </div>
            </form>

            {/* ═══ SUCCESS OVERLAY ═══ */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 z-50 flex items-center justify-center rounded-3xl overflow-hidden"
                >
                  {/* Blurred backdrop */}
                  <div className="absolute inset-0 bg-white/80 dark:bg-[#060D18]/90 backdrop-blur-xl" />

                  {/* Animated particles */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full"
                        style={{
                          left: `${50 + (Math.cos(i * 30 * Math.PI / 180) * 30)}%`,
                          top: `${50 + (Math.sin(i * 30 * Math.PI / 180) * 30)}%`,
                          background: i % 3 === 0 ? '#00C2D1' : i % 3 === 1 ? '#7C3AED' : '#10B981',
                          animation: `particleBurst 1s ease-out ${i * 0.05}s forwards`,
                          opacity: 0,
                        }}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
                    className="relative flex flex-col items-center text-center px-8"
                  >
                    {/* Animated checkmark circle */}
                    <div className="relative w-20 h-20 mb-6">
                      {/* Glow ring */}
                      <div 
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: 'radial-gradient(circle, rgba(0,194,209,0.2) 0%, transparent 70%)',
                          animation: 'successGlow 2s ease-in-out infinite',
                          transform: 'scale(1.8)',
                        }}
                      />
                      {/* Circle + Checkmark SVG */}
                      <svg viewBox="0 0 80 80" className="w-full h-full" style={{ filter: 'drop-shadow(0 0 12px rgba(0,194,209,0.4))' }}>
                        {/* Background circle */}
                        <circle
                          cx="40" cy="40" r="36"
                          fill="none"
                          stroke="#00C2D1"
                          strokeWidth="3"
                          strokeLinecap="round"
                          opacity="0.15"
                        />
                        {/* Animated circle */}
                        <circle
                          cx="40" cy="40" r="36"
                          fill="none"
                          stroke="url(#successGrad)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray="226"
                          strokeDashoffset="226"
                          style={{ animation: 'circleDraw 0.6s ease-out 0.2s forwards' }}
                        />
                        {/* Checkmark */}
                        <path
                          d="M25 42 L35 52 L56 30"
                          fill="none"
                          stroke="#00C2D1"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeDasharray="50"
                          strokeDashoffset="50"
                          style={{ animation: 'checkDraw 0.4s ease-out 0.7s forwards' }}
                        />
                        <defs>
                          <linearGradient id="successGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00C2D1" />
                            <stop offset="100%" stopColor="#10B981" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    {/* Logo icon faded */}
                    <div className="mb-4">
                      <img
                        src="/logo_icon.png"
                        alt=""
                        className="w-6 h-6 object-contain opacity-40 dark:hidden"
                      />
                      <img
                        src="/logo_icon_dark.png"
                        alt=""
                        className="w-6 h-6 object-contain opacity-40 hidden dark:block"
                      />
                    </div>

                    <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium max-w-xs leading-relaxed mb-6">
                      Thank you for reaching out. Our team will review your inquiry and get back to you shortly.
                    </p>

                    <button
                      onClick={() => setSuccess(false)}
                      className="text-xs font-bold text-[#00C2D1] hover:text-[#00D4E3] transition-colors tracking-wide uppercase"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ═══ ERROR OVERLAY ═══ */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 z-50 flex items-center justify-center rounded-3xl overflow-hidden"
                >
                  {/* Blurred backdrop */}
                  <div className="absolute inset-0 bg-white/80 dark:bg-[#060D18]/90 backdrop-blur-xl" />

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.45, delay: 0.05, type: "spring", stiffness: 250, damping: 22 }}
                    className="relative flex flex-col items-center text-center px-8"
                  >
                    {/* Animated X circle */}
                    <div className="relative w-20 h-20 mb-6">
                      {/* Glow ring */}
                      <div 
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: 'radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%)',
                          animation: 'errorGlow 2s ease-in-out infinite',
                          transform: 'scale(1.8)',
                        }}
                      />
                      {/* Circle + X SVG */}
                      <svg viewBox="0 0 80 80" className="w-full h-full" style={{ filter: 'drop-shadow(0 0 12px rgba(239,68,68,0.35))' }}>
                        {/* Background circle */}
                        <circle
                          cx="40" cy="40" r="36"
                          fill="none"
                          stroke="#EF4444"
                          strokeWidth="3"
                          strokeLinecap="round"
                          opacity="0.12"
                        />
                        {/* Animated circle */}
                        <circle
                          cx="40" cy="40" r="36"
                          fill="none"
                          stroke="url(#errorGrad)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray="226"
                          strokeDashoffset="226"
                          style={{ animation: 'circleDraw 0.5s ease-out 0.15s forwards' }}
                        />
                        {/* X mark - line 1 */}
                        <path
                          d="M28 28 L52 52"
                          fill="none"
                          stroke="#EF4444"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeDasharray="34"
                          strokeDashoffset="34"
                          style={{ animation: 'checkDraw 0.3s ease-out 0.55s forwards' }}
                        />
                        {/* X mark - line 2 */}
                        <path
                          d="M52 28 L28 52"
                          fill="none"
                          stroke="#EF4444"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeDasharray="34"
                          strokeDashoffset="34"
                          style={{ animation: 'checkDraw 0.3s ease-out 0.7s forwards' }}
                        />
                        <defs>
                          <linearGradient id="errorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#EF4444" />
                            <stop offset="100%" stopColor="#F97316" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
                      Oops, Something Went Wrong
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium max-w-xs leading-relaxed mb-6">
                      {errorMessage}
                    </p>

                    <button
                      onClick={() => setErrorMessage("")}
                      className="text-xs font-bold text-rose-500 hover:text-rose-400 transition-colors tracking-wide uppercase"
                    >
                      Try Again
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Inline Keyframes */}
            <style>{`
              @keyframes contactLogoSpin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes circleDraw {
                to { stroke-dashoffset: 0; }
              }
              @keyframes checkDraw {
                to { stroke-dashoffset: 0; }
              }
              @keyframes successGlow {
                0%, 100% { opacity: 0.5; transform: scale(1.6); }
                50% { opacity: 1; transform: scale(2); }
              }
              @keyframes errorGlow {
                0%, 100% { opacity: 0.4; transform: scale(1.6); }
                50% { opacity: 0.8; transform: scale(2); }
              }
              @keyframes particleBurst {
                0% { transform: translate(0, 0) scale(0); opacity: 1; }
                50% { opacity: 1; }
                100% { transform: translate(var(--tx, 0), var(--ty, 0)) scale(1); opacity: 0; }
              }
            `}</style>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactUs;
