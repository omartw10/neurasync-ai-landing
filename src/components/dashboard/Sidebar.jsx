import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { cn } from './Widgets';
import assets from '../../assets/assets';
import { useAuth } from '../../context/AuthContext';
import { LayoutGrid, Mail, Zap, FileText, Settings } from 'lucide-react';

const NAVIGATION = [
  { id: 'overview', label: 'Overview', path: '/dashboard', icon: LayoutGrid },
  { id: 'inboxpilot', label: 'InboxPilot AI', path: '/dashboard/inboxpilot', icon: Mail },
  { id: 'leadsync', label: 'LeadSync AI', path: '/dashboard/leadsync', icon: Zap },
  { id: 'docuextract', label: 'DocuExtract AI', path: '/dashboard/docuextract', icon: FileText },
  { id: 'settings', label: 'Settings', path: '/dashboard/settings', icon: Settings },
];

export const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth(); // Consume our SaaS simulated context

  // Filter navigation based on licensed products dynamically
  const accessibleNav = NAVIGATION.filter(
    (item) => 
      item.id === 'overview' || 
      item.id === 'settings' || 
      user?.licensed_products?.includes(item.id)
  );

  return (
    <aside className="w-64 h-screen border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#060D18] flex flex-col fixed left-0 top-0">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800 shrink-0">
        <Link to="/" className="flex items-center">
          <img src={assets.logo} alt="NeuraSync AI" className="h-8 w-auto object-contain dark:hidden" />
          <img src={assets.logo_dark} alt="NeuraSync AI" className="h-8 w-auto object-contain hidden dark:block" />
        </Link>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
          Your Platform
        </div>
        {accessibleNav.map((item) => {
          // Exact match for overview, otherwise startsWith
          const isActive = item.path === '/dashboard' 
            ? location.pathname === '/dashboard' 
            : location.pathname.startsWith(item.path);

          const IconComponent = item.icon;

          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-[#00C2D1]/10 text-[#00C2D1] dark:bg-[#00C2D1]/15" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100"
              )}
            >
              <IconComponent className={cn("w-5 h-5", isActive ? "text-[#00C2D1]" : "text-gray-500 dark:text-gray-400")} strokeWidth={isActive ? 2.5 : 2} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/30 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00C2D1] to-[#7C3AED] flex items-center justify-center text-white font-bold text-sm">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-tight truncate max-w-[120px]">{user?.name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">{user?.company_name}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
