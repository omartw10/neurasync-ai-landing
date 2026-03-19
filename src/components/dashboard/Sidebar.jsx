import React from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from './Widgets';
import assets from '../../assets/assets';
import { useAuth } from '../../context/AuthContext';
import { LayoutGrid, Mail, LogOut, X, ChevronLeft, ChevronRight } from 'lucide-react';

const NAVIGATION = [
  { id: 'overview', label: 'Overview', path: '/dashboard', icon: LayoutGrid },
  { id: 'inboxpilot', label: 'InboxPilot AI', path: '/dashboard/inboxpilot', icon: Mail },
];

export const Sidebar = ({ isOpen, onClose, isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { organizationName, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/dashboard/login', { replace: true });
  };

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside className={cn(
      "h-screen border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#060D18] flex flex-col fixed left-0 top-0 z-40 transition-all duration-300",
      isCollapsed ? "w-20" : "w-64",
      "lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      {/* Collapse Toggle Button (Desktop Only) */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B1120] items-center justify-center text-gray-400 hover:text-[#00C2D1] transition-colors z-50 shadow-sm"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Brand */}
      <div className={cn(
        "h-16 flex items-center border-b border-gray-200 dark:border-gray-800 shrink-0 transition-all duration-300",
        isCollapsed ? "justify-center px-0" : "justify-between px-6"
      )}>
        <Link to="/" className="flex items-center">
          {isCollapsed ? (
             <>
               <img src="/logo_icon.png" alt="NeuraSyncAI" className="h-8 w-auto object-contain dark:hidden" />
               <img src="/logo_icon_dark.png" alt="NeuraSyncAI" className="h-8 w-auto object-contain hidden dark:block" />
             </>
          ) : (
            <>
              <img src={assets.logo} alt="NeuraSyncAI" className="h-8 w-auto object-contain dark:hidden" />
              <img src={assets.logo_dark} alt="NeuraSyncAI" className="h-8 w-auto object-contain hidden dark:block" />
            </>
          )}
        </Link>
        {/* Close button - mobile only */}
        {!isCollapsed && (
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav Links */}
      <nav className={cn(
        "flex-1 overflow-y-auto py-6 space-y-1 transition-all duration-300",
        isCollapsed ? "px-2" : "px-4"
      )}>
        {!isCollapsed && (
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
            Your Platform
          </div>
        )}
        
        {NAVIGATION.map((item) => {
          const isActive = item.path === '/dashboard' 
            ? location.pathname === '/dashboard' 
            : location.pathname.startsWith(item.path);

          const IconComponent = item.icon;

          return (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={handleNavClick}
              title={isCollapsed ? item.label : ""}
              className={cn(
                "flex items-center rounded-lg text-sm font-medium transition-all duration-200",
                isCollapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5",
                isActive 
                  ? "bg-[#00C2D1]/10 text-[#00C2D1] dark:bg-[#00C2D1]/15 shadow-sm shadow-[#00C2D1]/10" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100"
              )}
            >
              <IconComponent className={cn("w-5 h-5 shrink-0", isActive ? "text-[#00C2D1]" : "text-gray-500 dark:text-gray-400")} strokeWidth={isActive ? 2.5 : 2} />
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* User Profile Footer */}
      <div className={cn(
        "border-t border-gray-200 dark:border-gray-800 space-y-2 transition-all duration-300",
        isCollapsed ? "p-2" : "p-4"
      )}>
        <div className={cn(
          "flex items-center rounded-lg bg-gray-50 dark:bg-gray-800/30 transition-all",
          isCollapsed ? "justify-center p-2" : "gap-3 px-3 py-2"
        )}>
          <div className="w-8 h-8 rounded-full bg-white dark:bg-[#0B1120] flex items-center justify-center shrink-0 shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800">
            <img src="/logo_icon.png" alt="Profile" className="w-5 h-5 object-contain dark:hidden" />
            <img src="/logo_icon_dark.png" alt="Profile" className="w-5 h-5 object-contain hidden dark:block" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-tight truncate">{organizationName || 'Client'}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate">Dashboard Access</span>
            </div>
          )}
        </div>
        
        <button
          onClick={handleLogout}
          title={isCollapsed ? "Logout" : ""}
          className={cn(
            "w-full flex items-center rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 transition-all",
            isCollapsed ? "justify-center p-2.5" : "gap-2 px-3 py-2"
          )}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};
