import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/dashboard/Sidebar';
import { Topbar } from '../components/dashboard/Topbar';

export const DashboardLayout = ({ theme, setTheme }) => {
  return (
    <div className="flex w-full min-h-screen bg-[#f9fafb] dark:bg-[#060D18] font-sans text-gray-900 dark:text-gray-100 transition-colors">
      {/* Sidebar - Fixed width 64 */}
      <Sidebar />

      {/* Main Content Area - Needs margin-left to offset the fixed sidebar */}
      <div className="flex-1 flex flex-col ml-64 relative min-h-screen">
        <Topbar theme={theme} setTheme={setTheme} />
        
        {/* Scrollable Page Content */}
        <main className="flex-1 p-8">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
