import React from 'react';
import { useLocation } from 'react-router-dom';
import ThemeToggleBtn from '../ThemeToggleBtn';

export const Topbar = ({ theme, setTheme }) => {
  const location = useLocation();
  
  // Format breadcrumb from path (e.g. /dashboard/inboxpilot -> Dashboard / Inboxpilot)
  const paths = location.pathname.split('/').filter(Boolean);
  const breadcrumb = paths.map((p, i) => (
    <span key={p} className="flex items-center">
      {i > 0 && <span className="mx-2 text-gray-400">/</span>}
      <span className={i === paths.length - 1 ? "text-gray-900 dark:text-gray-100 font-semibold" : "text-gray-500 capitalize"}>
        {p.replace('-', ' ')}
      </span>
    </span>
  ));

  return (
    <header className="h-16 bg-white dark:bg-[#060D18] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8 sticky top-0 z-10 w-full">
      <div className="flex items-center text-sm">
        {breadcrumb}
      </div>

      <div className="flex items-center gap-4">
        {/* Pulse Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">System Active</span>
        </div>

        <ThemeToggleBtn theme={theme} setTheme={setTheme} />

        {/* Notifications */}
        <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          🔔
        </button>
      </div>
    </header>
  );
};
