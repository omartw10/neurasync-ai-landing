import React from "react";

/**
 * LogoSpinner — A premium branded loading spinner
 * The NeuraSync logo itself spins like a fan with a glowing effect.
 * Automatically switches between light/dark logo based on theme.
 *
 * @param {string} text - Optional loading text to display
 * @param {string} size - "sm" | "md" | "lg" (default: "md")
 * @param {boolean} fullScreen - Whether to center in full viewport (default: true)
 */
const LogoSpinner = ({ text, size = "md", fullScreen = true }) => {
  const sizes = {
    sm: { logo: "w-12 h-12", text: "text-xs" },
    md: { logo: "w-16 h-16", text: "text-sm" },
    lg: { logo: "w-20 h-20", text: "text-base" },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "h-screen" : "h-[60vh]"
      } bg-transparent`}
    >
      <div className="flex flex-col items-center gap-5">
        {/* Spinning Logo */}
        <div className="relative flex items-center justify-center">
          {/* Ambient glow behind logo */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "120%",
              height: "120%",
              background:
                "radial-gradient(circle, rgba(0,194,209,0.2) 0%, rgba(124,58,237,0.08) 50%, transparent 70%)",
              animation: "logoGlow 2.4s ease-in-out infinite",
            }}
          />

          {/* The logo itself — spins like a fan */}
          <div
            className={`relative ${s.logo} flex items-center justify-center`}
            style={{
              animation: "logoFanSpin 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite",
            }}
          >
            {/* Light mode logo */}
            <img
              src="/logo_icon.png"
              alt="Loading"
              className="w-full h-full object-contain dark:hidden"
              style={{
                filter: "drop-shadow(0 0 14px rgba(0, 194, 209, 0.4))",
              }}
            />
            {/* Dark mode logo */}
            <img
              src="/logo_icon_dark.png"
              alt="Loading"
              className="w-full h-full object-contain hidden dark:block"
              style={{
                filter: "drop-shadow(0 0 18px rgba(0, 194, 209, 0.5))",
              }}
            />
          </div>
        </div>

        {/* Loading text */}
        {text && (
          <p
            className={`${s.text} font-semibold text-gray-400 dark:text-gray-500 tracking-wide`}
            style={{
              animation: "logoTextFade 2s ease-in-out infinite",
            }}
          >
            {text}
          </p>
        )}
      </div>

      {/* Inline keyframe styles */}
      <style>{`
        @keyframes logoFanSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes logoGlow {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.6; 
          }
          50% { 
            transform: scale(1.15); 
            opacity: 1; 
          }
        }

        @keyframes logoTextFade {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LogoSpinner;
