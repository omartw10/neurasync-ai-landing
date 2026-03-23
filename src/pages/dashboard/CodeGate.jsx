import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import assets from '../../assets/assets';
import {
  ShieldCheck,
  Loader2,
  AlertCircle,
  ArrowRight,
  MessageCircle,
  ArrowLeft,
  BarChart3,
  Mail,
  Zap,
  Lock,
} from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    desc: 'Monitor your automation performance with live dashboards and insights.',
  },
  {
    icon: Mail,
    title: 'Email Management',
    desc: 'Track processed emails, classifications, and response metrics.',
  },
  {
    icon: Zap,
    title: 'Workflow Tracking',
    desc: 'See every automated action and workflow execution in real-time.',
  },
  {
    icon: Lock,
    title: 'Secure Access',
    desc: 'Your data is protected with enterprise-grade security protocols.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};


export const CodeGate = () => {
  const [code, setCode] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { login, error, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;

    const success = await login(code);
    if (success) {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#060D18] flex relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ===== LEFT PANEL — Info & Branding ===== */}
      <div className="hidden lg:flex lg:w-[48%] xl:w-[45%] flex-col justify-between p-10 xl:p-14 relative z-10">
        {/* Top — Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="inline-flex items-center gap-2 group">
            <img
              src={assets.logo_dark}
              alt="NeuraSyncAI"
              className="h-9 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </motion.div>

        {/* Center — Headline & Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight tracking-tight">
              Welcome to your
              <br />
              <span className="text-[#00C2D1]">Client Dashboard</span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed max-w-md">
              Access your personalized workspace to monitor automation
              performance, track processed communications, and view detailed
              analytics — all in one place.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.1] transition-colors duration-300"
              >
                <div className="shrink-0 w-9 h-9 rounded-lg bg-[#00C2D1]/10 flex items-center justify-center mt-0.5">
                  <f.icon className="w-[18px] h-[18px] text-[#00C2D1]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-0.5">{f.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom — Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-[11px] text-gray-600 uppercase tracking-widest font-semibold"
        >
          © 2026 NeuraSyncAI · All rights reserved
        </motion.div>
      </div>

      {/* ===== RIGHT PANEL — Login Form ===== */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative z-10">
        {/* Thin vertical accent line (desktop) */}
        <div className="hidden lg:block absolute left-0 top-[10%] bottom-[10%] w-px bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[420px]"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/">
              <img
                src={assets.logo_dark}
                alt="NeuraSyncAI"
                className="h-9 mx-auto object-contain"
              />
            </Link>
          </div>

          {/* Card */}
          <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-[#00C2D1]/25 via-white/[0.08] to-white/[0.04]">
          <div className="rounded-[15px] bg-gradient-to-b from-[#0E1A2E] to-[#0B1120] backdrop-blur-sm p-7 sm:p-9">
            {/* Header */}
            <div className="text-center mb-7">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 180, damping: 14 }}
                className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#00C2D1]/15 to-[#00C2D1]/5 border border-[#00C2D1]/25 mb-5"
              >
                <ShieldCheck className="w-7 h-7 text-[#00C2D1]" />
              </motion.div>

              <h1 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
                Client Dashboard
              </h1>
              <p className="text-gray-400 text-sm leading-relaxed">
                Enter the access code provided by NeuraSyncAI
                <br className="hidden sm:block" />
                to open your workspace.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Label */}
              <label
                htmlFor="access-code-input"
                className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1"
              >
                Access Code
              </label>

              <div className="relative">
                <input
                  id="access-code-input"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="e.g. abc123xyz"
                  disabled={isLoading}
                  autoComplete="off"
                  spellCheck="false"
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.06] border border-white/[0.12] text-white text-center text-base font-mono tracking-[0.12em] placeholder:text-gray-500 placeholder:font-sans placeholder:tracking-normal placeholder:text-sm focus:outline-none focus:border-[#00C2D1]/50 focus:bg-white/[0.08] transition-all duration-300 disabled:opacity-50"
                />
                {/* Focus indicator bar */}
                <div
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#00C2D1] rounded-full transition-all duration-300 ${
                    isFocused ? 'w-1/2 opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-500/8 border border-rose-500/15 text-rose-400"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <p className="text-sm leading-relaxed">{error}</p>
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                id="access-dashboard-btn"
                type="submit"
                disabled={isLoading || !code.trim()}
                className="group w-full relative py-3.5 px-6 rounded-xl font-bold text-[#0B1F3B] bg-gradient-to-r from-[#00C2D1] to-[#00E0D0] hover:from-[#00D4E3] hover:to-[#00F0E0] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_4px_20px_rgba(0,194,209,0.25)] hover:shadow-[0_6px_28px_rgba(0,194,209,0.35)] flex items-center justify-center gap-2 overflow-hidden text-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full duration-700 transition-transform" />
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="relative z-10">Validating...</span>
                  </>
                ) : (
                  <>
                    <span className="relative z-10">Access Dashboard</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-[10px] text-gray-600 font-semibold uppercase tracking-widest">
                or
              </span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            {/* No Code CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center space-y-3"
            >
              <p className="text-gray-400 text-sm">
                Don't have an access code yet?
              </p>
              <Link
                to="/#contact-us"
                className="group w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-semibold text-sm text-[#00C2D1] border border-[#00C2D1]/20 bg-[#00C2D1]/[0.06] hover:bg-[#00C2D1]/[0.12] hover:border-[#00C2D1]/35 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Contact Us to Get Started</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
          </div>

          {/* Below Card */}
          <div className="mt-6 flex items-center justify-between px-1">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Home
            </Link>
            <p className="text-[10px] text-gray-700 uppercase tracking-widest font-semibold">
              Powered by <span className="text-gray-500">NeuraSyncAI</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
