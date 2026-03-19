import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/dashboard/Sidebar';
import { Topbar } from '../components/dashboard/Topbar';
import { cn } from '../components/dashboard/Widgets';

export const DashboardLayout = ({ theme, setTheme }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex w-full min-h-screen bg-[#f9fafb] dark:bg-[#060D18] font-sans text-gray-900 dark:text-gray-100 transition-colors">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col relative min-h-screen transition-all duration-300 overflow-x-hidden",
        isCollapsed ? "lg:ml-20" : "lg:ml-64"
      )}>
        <Topbar 
          theme={theme} 
          setTheme={setTheme} 
          onMenuToggle={() => setSidebarOpen(true)} 
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-[1600px] w-full mx-auto overflow-hidden">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
