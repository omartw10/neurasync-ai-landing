import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Mail, Zap, FileText } from 'lucide-react';

const ALL_SYSTEMS = [
  { id: 'inboxpilot', name: 'InboxPilot AI', icon: Mail, link: '/dashboard/inboxpilot', desc: 'Email Classification & Routing' },
  { id: 'leadsync', name: 'LeadSync AI', icon: Zap, link: '/dashboard/leadsync', desc: 'Universal Lead Capture (Coming Soon)' },
  { id: 'docuextract', name: 'DocuExtract AI', icon: FileText, link: '/dashboard/docuextract', desc: 'Automated OCR & Extraction' },
];

export const DashboardOverview = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 fade-in">
      <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name.split(' ')[0]}</h1>
      <p className="text-gray-500 dark:text-gray-400">
        Here's what's happening in your NeuraSync AI workspace for <span className="font-semibold">{user?.company_name}</span>.
      </p>

      {/* Dashboard Renderer Block */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        
        {/* Licensed Systems Card */}
        <div className="p-6 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-xl">
          <h3 className="font-semibold text-lg mb-2">Installed Systems</h3>
          <ul className="space-y-4 mt-6">
            {ALL_SYSTEMS.map(sys => {
              const isLicensed = user?.licensed_products?.includes(sys.id);
              const IconComponent = sys.icon;
              return (
                <li key={sys.id} className={`flex items-center justify-between transition-all ${isLicensed ? 'opacity-100' : 'opacity-40 grayscale pointer-events-none'}`}>
                  <Link to={sys.link} className="flex flex-col gap-0.5 group">
                    <span className="flex items-center gap-2 font-medium group-hover:text-[#00C2D1] transition-colors">
                      <IconComponent className="w-[18px] h-[18px] text-gray-500 group-hover:text-[#00C2D1] transition-colors" /> {sys.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-6">{sys.desc}</span>
                  </Link>
                  {isLicensed ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded">Active</span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-1 rounded">Locked</span>
                  )}
                </li>
             );
            })}
          </ul>
        </div>

        <div className="col-span-1 md:col-span-2 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B1120] flex items-center justify-center min-h-[200px]">
          <div className="text-center text-gray-500">
            <p>Select a module from the sidebar to view detailed analytics.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
