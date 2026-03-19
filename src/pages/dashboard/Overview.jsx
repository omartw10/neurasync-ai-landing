import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Mail, Zap } from 'lucide-react';

const ALL_SYSTEMS = [
  { id: 'inboxpilot', name: 'InboxPilot AI', icon: Mail, link: '/dashboard/inboxpilot', desc: 'Email Classification & Routing', available: true },
];

export const DashboardOverview = () => {
  const { organizationName, session } = useAuth();

  return (
    <div className="space-y-6 fade-in">
      <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
      <p className="text-gray-500 dark:text-gray-400">
        Here's what's happening in your NeuraSyncAI workspace for <span className="font-semibold">{organizationName}</span>.
      </p>

      {/* Session Info */}
      {session?.expiresAt && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00C2D1]/10 border border-[#00C2D1]/20 text-xs font-medium text-[#00C2D1]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00C2D1] animate-pulse" />
          Access valid until {new Date(session.expiresAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      )}

      {/* Dashboard Renderer Block */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        
        {/* Systems Card */}
        <div className="p-6 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-xl">
          <h3 className="font-semibold text-lg mb-2">Available Systems</h3>
          <ul className="space-y-4 mt-6">
            {ALL_SYSTEMS.map(sys => {
              const IconComponent = sys.icon;
              return (
                <li key={sys.id} className={`flex items-center justify-between transition-all ${sys.available ? 'opacity-100' : 'opacity-40 grayscale pointer-events-none'}`}>
                  <Link to={sys.link} className="flex flex-col gap-0.5 group">
                    <span className="flex items-center gap-2 font-medium group-hover:text-[#00C2D1] transition-colors">
                      <IconComponent className="w-[18px] h-[18px] text-gray-500 group-hover:text-[#00C2D1] transition-colors" /> {sys.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-6">{sys.desc}</span>
                  </Link>
                  {sys.available ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded">Active</span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-1 rounded">Coming Soon</span>
                  )}
                </li>
             );
            })}
          </ul>
        </div>

        <div className="md:col-span-2 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B1120] flex items-center justify-center min-h-[200px]">
          <div className="text-center text-gray-500">
            <p>Select <strong>InboxPilot AI</strong> from the sidebar to view your email analytics dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
