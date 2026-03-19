import React from 'react';
import { useLocation } from 'react-router-dom';
import ThemeToggleBtn from '../ThemeToggleBtn';
import { Menu } from 'lucide-react';

export const Topbar = ({ theme, setTheme, onMenuToggle }) => {
  const location = useLocation();
  
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
    <header className="h-16 bg-white dark:bg-[#060D18] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-10 w-full">
      <div className="flex items-center gap-3">
        {/* Hamburger - mobile only */}
        <button onClick={onMenuToggle} className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center text-sm">
          {breadcrumb}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Pulse Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">System Active</span>
        </div>

        <ThemeToggleBtn theme={theme} setTheme={setTheme} />
      </div>
    </header>
  );
};
