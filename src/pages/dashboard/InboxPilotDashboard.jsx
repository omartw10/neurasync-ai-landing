import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchClientEmails, fetchClientMetrics } from '../../services/api';
import { StatCard, Card, CardHeader, CardTitle, CardContent, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Badge } from '../../components/dashboard/Widgets';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const CHART_DATA = [
  { name: 'Mon', emails: 120 },
  { name: 'Tue', emails: 140 },
  { name: 'Wed', emails: 130 },
  { name: 'Thu', emails: 160 },
  { name: 'Fri', emails: 155 },
  { name: 'Sat', emails: 90 },
  { name: 'Sun', emails: 105 },
];

const CATEGORY_DATA = [
  { name: 'Sales', value: 400, color: '#00C2D1' },
  { name: 'Support', value: 300, color: '#7C3AED' },
  { name: 'Partner', value: 150, color: '#F59E0B' },
  { name: 'Client', value: 250, color: '#10B981' },
];

const PRIORITY_DATA = [
  { name: 'High', value: 250, color: '#EF4444' },
  { name: 'Medium', value: 450, color: '#F59E0B' },
  { name: 'Low', value: 200, color: '#10B981' },
];

// MOCK_ACTIVITY Remains unchanged (represents non-table timeline data)
const MOCK_ACTIVITY = [
  { id: 1, time: '10:42 AM', action: 'Support ticket routed to Jane', type: 'routing', color: 'bg-blue-500' },
  { id: 2, time: '10:25 AM', action: 'High priority lead detected! Notified sales channel.', type: 'priority', color: 'bg-rose-500' },
  { id: 3, time: '09:15 AM', action: 'Client request automatically forwarded to Client Operations.', type: 'routing', color: 'bg-emerald-500' },
  { id: 4, time: 'YESTERDAY', action: 'Summarized 4 long thread emails for executive review.', type: 'summary', color: 'bg-[#00C2D1]' },
];

const MOCK_EMAILS = [
  {
    id: '9842',
    created_at: '2026-03-09 10:40 AM',
    sender: 'alex.chen@techcorp.com',
    subject: 'Urgent: API Integration Failing in Production',
    source: 'Email',
    category: 'Support',
    priority: 'Critical',
    leadScore: 92,
    confidence: 99,
    summary: 'Client reporting complete failure of API endpoints after recent update. Immediate technical intervention required to prevent SLA breach.',
    preview: 'Hi team, our production systems have been completely blocked for the last hour. The /webhook endpoint is returning 500 errors...',
    sla: 1,
    routed: 'Engineering L3'
  },
  {
    id: '9841',
    created_at: '2026-03-09 10:15 AM',
    sender: 'sarah.miller@enterprise.net',
    subject: 'Enterprise License Upgrade - 500 Seats',
    source: 'Website Form',
    category: 'Sales',
    priority: 'High',
    leadScore: 98,
    confidence: 96,
    summary: 'High-value account requesting expansion quote for 500 additional operational seats. High probability of close.',
    preview: 'We are looking to expand our current deployment across the entire European division. Can you provide pricing for an additional 500 seats by EOD?',
    sla: 4,
    routed: 'Sales Dept'
  },
  {
    id: '9840',
    created_at: '2026-03-09 09:30 AM',
    sender: 'partner.program@aws.amazon.com',
    subject: 'Q3 Co-marketing Opportunities',
    source: 'Email',
    category: 'Partner',
    priority: 'Medium',
    leadScore: null,
    confidence: 88,
    summary: 'AWS partner network inviting us to participate in upcoming Q3 joint webinar series.',
    preview: 'We have selected NeuraSync AI for our upcoming intelligent automation webinar. Please sign the attached MOU...',
    sla: 24,
    routed: 'Marketing Team'
  },
  {
    id: '9839',
    created_at: '2026-03-09 08:45 AM',
    sender: 'billing@cloudprovider.com',
    subject: 'Invoice #INV-2026-03 for Server Usage',
    source: 'Automated',
    category: 'Client',
    priority: 'Low',
    leadScore: null,
    confidence: 100,
    summary: 'Standard monthly infrastructure invoice. No anomalies detected.',
    preview: 'Your latest invoice is ready. Total amount due: $4,240.20. Auto-payment scheduled for...',
    sla: 72,
    routed: 'Finance'
  }
];

const MOCK_METRICS = {
  emailsProcessed: "24,892",
  hoursSaved: "1,240",
  priorityLeads: "482",
  spamBlocked: "18k",
  kpiTrends: {
    processed: "up",
    hours: "up",
    leads: "up",
    spam: "down"
  }
};

export const InboxPilotDashboard = () => {
  const { user } = useAuth();
  const [emails, setEmails] = useState(MOCK_EMAILS);
  const [metrics, setMetrics] = useState(MOCK_METRICS);
  const [isLoading, setIsLoading] = useState(false);
  
  // Modal State
  const [selectedEmail, setSelectedEmail] = useState(null);

  useEffect(() => {
    // Instantly show mock data for the dashboard reconstruction
    setEmails(MOCK_EMAILS);
    setMetrics(MOCK_METRICS);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-gray-200 dark:border-gray-800 border-t-[#00C2D1] rounded-full animate-spin" />
          <p className="text-gray-500 font-medium animate-pulse">Loading {user?.company_name}'s workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">InboxPilot AI</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Intelligent Email Classification & Routing
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-white dark:bg-[#0B1120] border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-2 text-sm font-medium">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Month</option>
          </select>
          <button className="bg-[#00C2D1] text-[#0B1F3B] hover:bg-[#00A8B5] transition-colors font-semibold px-4 py-2 rounded-lg text-sm shadow-lg shadow-[#00C2D1]/20">
            Force Sync
          </button>
        </div>
      </div>

      {/* Hero Metrics Row */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Emails Processed" 
          value={metrics?.emailsProcessed || "0"} 
          trend={metrics?.kpiTrends?.processed || "up"} 
          trendLabel="12%" 
        />
        <StatCard 
          title="Hours Saved" 
          value={metrics?.hoursSaved || "0h"} 
          trend={metrics?.kpiTrends?.hours || "up"} 
          trendLabel="8%" 
        />
        <StatCard 
          title="Priority Leads" 
          value={metrics?.priorityLeads || "0"} 
          trend={metrics?.kpiTrends?.leads || "up"} 
          trendLabel="24%" 
        />
        <StatCard 
          title="Spam / Noise Blocked" 
          value={metrics?.spamBlocked || "0"} 
          trend={metrics?.kpiTrends?.spam || "down"} 
          trendLabel="4%" 
        />
      </div>

      <div className="grid gap-6 grid-cols-1 xl:grid-cols-3">
        {/* Main Chart Area */}
        <Card className="col-span-1 xl:col-span-2 flex flex-col">
          <CardHeader>
            <CardTitle>Email Classification Volume</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] w-full pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEmails" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C2D1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00C2D1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" className="dark:stroke-gray-800" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0B1120', border: '1px solid #1F2937', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#E5E7EB' }}
                />
                <Area type="monotone" dataKey="emails" stroke="#00C2D1" strokeWidth={3} fillOpacity={1} fill="url(#colorEmails)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card className="col-span-1 border-gray-200/60 dark:border-gray-800/60 bg-gray-50/50 dark:bg-[#0B1120]/50">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gray-200 before:via-gray-200 dark:before:from-gray-800 dark:before:via-gray-800 before:to-transparent">
              {MOCK_ACTIVITY.map((activity) => (
                 <div key={activity.id} className="relative flex items-start group">
                     <div className="flex items-center justify-center w-[22px] h-[22px] rounded-full border-[3px] border-white dark:border-[#0B1120] bg-white dark:bg-[#0B1120] shrink-0 shadow-sm z-10 transition-transform group-hover:scale-110">
                        <div className={`w-2.5 h-2.5 rounded-full ${activity.color}`}></div>
                     </div>
                     <div className="ml-4 pb-1 pt-0.5">
                       <span className="block text-xs font-semibold text-gray-500 tracking-wide mb-1 transition-colors group-hover:text-gray-900 dark:group-hover:text-white uppercase">{activity.time}</span>
                       <span className="block text-[13px] font-medium text-gray-800 dark:text-gray-300 leading-snug">{activity.action}</span>
                     </div>
                 </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Confidence & Priority Distribution (Looker Extraction) */}
        <Card className="col-span-1 xl:col-span-2">
          <CardHeader className="pb-0">
            <CardTitle>AI Intelligence Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-8 items-center justify-center min-h-[250px] p-6">
            <div className="flex-1 flex flex-col items-center">
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Category Routing</h4>
              <div className="w-full h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={CATEGORY_DATA} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                      {CATEGORY_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0B1120', border: 'none', borderRadius: '8px', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Priority Levels</h4>
              <div className="w-full h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={PRIORITY_DATA} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                      {PRIORITY_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0B1120', border: 'none', borderRadius: '8px', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="flex-1 text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800">
               <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mb-4 shrink-0 shadow-inner">
                 <span className="text-xl font-bold">98%</span>
               </div>
               <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Avg AI Confidence</h4>
               <p className="text-xs text-gray-500 dark:text-gray-400">Classifications made without human intervention.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtered Emails Table */}
      <Card className="mt-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Processed Emails</CardTitle>
          <div className="flex gap-2">
            <button className="text-sm px-3 py-1.5 border border-gray-200 dark:border-gray-800 rounded-md bg-white dark:bg-[#0B1120] font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition">Filter</button>
            <button className="text-sm px-3 py-1.5 border border-gray-200 dark:border-gray-800 rounded-md bg-white dark:bg-[#0B1120] font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition">Export CSV</button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 dark:bg-[#0B1120]/50 hover:bg-transparent whitespace-nowrap">
                <TableHead>ID</TableHead>
                <TableHead>Date (created_at)</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Lead Score</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Summary</TableHead>
                <TableHead>Preview</TableHead>
                <TableHead>SLA (Hrs)</TableHead>
                <TableHead>Route To</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emails.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={13} className="h-24 text-center text-gray-500 font-medium">
                    No emails processed for this workspace yet.
                  </TableCell>
                </TableRow>
              ) : (
                emails.map((email) => (
                  <TableRow 
                    key={email.id} 
                    className="whitespace-nowrap group relative cursor-pointer hover:bg-white/5"
                    onClick={() => setSelectedEmail(email)}
                  >
                    <TableCell className="font-mono text-xs text-gray-500 dark:text-gray-400">
                      #{email.id}
                    </TableCell>
                    <TableCell className="font-medium text-xs text-gray-500 dark:text-gray-400">
                      {email.created_at}
                    </TableCell>
                    <TableCell className="font-medium text-gray-900 dark:text-white">
                      {email.sender}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[150px] truncate" title={email.subject}>
                        {email.subject}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {email.source}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        email.category === 'Sales' ? 'primary' : 
                        email.category === 'Support' ? 'purple' : 
                        email.category === 'Client' ? 'success' : 'warning'
                      }>
                        {email.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        email.priority === 'Critical' ? 'danger' :
                        email.priority === 'High' ? 'danger' : 
                        email.priority === 'Medium' ? 'warning' : 'success'
                      }>
                        {email.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {email.leadScore ? (
                         <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full border text-xs font-bold
                            ${email.leadScore >= 80 ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400' : 
                            email.leadScore >= 40 ? 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400' : 
                            'border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-400'}`}>
                           {email.leadScore}
                         </span>
                      ) : <span className="text-gray-300 dark:text-gray-600">-</span>}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2" title={`${email.confidence}%`}>
                        <div className="h-1.5 w-12 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 dark:bg-emerald-400" style={{ width: `${email.confidence}%` }} />
                        </div>
                        <span className="text-xs font-medium text-gray-500">{email.confidence}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate text-xs text-gray-500 dark:text-gray-400" title={email.summary}>
                        {email.summary}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[150px] truncate text-xs text-gray-400 dark:text-gray-500 italic" title={email.preview}>
                        "{email.preview}"
                      </div>
                    </TableCell>
                    <TableCell>
                      {email.sla ? (
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                          {email.sla}h
                        </span>
                      ) : <span className="text-gray-300 dark:text-gray-600">-</span>}
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-md">
                        {email.routed}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-3xl bg-[#030816]/70 transition-all duration-300">
           {/* Interactive Animated Gradient Glow */}
           <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(0,194,209,0.15)_100%)] pointer-events-none mix-blend-screen" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-cyan-400/10 blur-[150px] rounded-full pointer-events-none" />
           
           {/* The Glass Code Card */}
           <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-[1px] bg-gradient-to-br from-[#00C2D1]/60 via-[#0B1F3B] to-blue-600/60 shadow-[0_0_80px_rgba(0,194,209,0.3)] transform-gpu">
             <div className="bg-white dark:bg-[#060D18]/95 backdrop-blur-xl rounded-[30px] p-8 min-h-[500px] flex flex-col relative border-t border-white/20 dark:border-white/5">
                
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedEmail(null)}
                  className="absolute top-6 right-6 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00C2D1]/50 border border-gray-200 dark:border-white/10 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white bg-gray-50/50 dark:bg-gray-800/30 transition-all"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>

                {/* Header Container */}
                <div className="flex justify-between items-start mb-8 pr-12">
                   <div>
                     <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-2 leading-tight">
                       {selectedEmail.subject}
                     </h2>
                     <div className="flex gap-4 items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                       <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"/> From: {selectedEmail.sender}</span>
                       <span className="text-gray-300 dark:text-gray-700">|</span>
                       <span>Date: {selectedEmail.created_at}</span>
                     </div>
                   </div>
                   
                   {/* Urgent glowing badge replicated from design */}
                   {selectedEmail.priority === 'Critical' || selectedEmail.priority === 'High' ? (
                     <div className="px-5 py-2.5 rounded-full bg-orange-500/10 border border-orange-500/60 text-orange-600 dark:text-orange-400 text-sm font-black uppercase tracking-widest shadow-[0_0_20px_rgba(249,115,22,0.6)] ring-1 ring-orange-500/40 transform-gpu animate-bounce">
                       High Urgency
                     </div>
                   ) : (
                     <div className="px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/60 text-emerald-600 dark:text-emerald-400 text-sm font-black uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.3)] ring-1 ring-emerald-500/40 transform-gpu">
                       Normal Priority
                     </div>
                   )}
                </div>

                {/* Inner Grid Metrics View */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                   <div className="p-4 rounded-2xl bg-gray-50/80 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex flex-col items-center justify-center text-center">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-[#00C2D1] mb-2">Category Routing</span>
                     <span className="text-xl font-bold text-gray-800 dark:text-gray-100">{selectedEmail.category} Dept</span>
                   </div>
                   <div className="p-4 rounded-2xl bg-gray-50/80 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex flex-col items-center justify-center text-center">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-2">SLA Commitment</span>
                     <span className="text-xl font-bold text-gray-800 dark:text-gray-100">{selectedEmail.sla} Hours</span>
                   </div>
                   <div className="p-4 rounded-2xl bg-gray-50/80 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex flex-col items-center justify-center text-center">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-purple-500 mb-2">Lead Score</span>
                     <span className="text-xl font-bold text-gray-800 dark:text-gray-100">{selectedEmail.leadScore || '-'} / 100</span>
                   </div>
                   <div className="relative overflow-hidden p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-500/30 flex flex-col items-center justify-center text-center shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2 z-10">AI Confidence</span>
                     <span className="text-2xl font-black text-blue-700 dark:text-blue-300 drop-shadow-md z-10">{selectedEmail.confidence}%</span>
                   </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 flex-1">
                   {/* Left Col: Summary and raw text */}
                   <div className="flex-1 flex flex-col gap-6">
                      <div className="space-y-3">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/30 flex items-center justify-center">
                             <span className="font-mono text-indigo-600 dark:text-indigo-400 text-lg">✦</span>
                           </div>
                           <h4 className="font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider text-sm">Actionable Summary</h4>
                         </div>
                         <div className="p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#0B1120]/80 border border-gray-200 dark:border-[#1E293B] shadow-inner font-medium text-gray-800 dark:text-gray-200 leading-relaxed text-[15px]">
                            {selectedEmail.summary}
                         </div>
                      </div>

                      <div className="flex-1 flex flex-col space-y-3">
                         <h4 className="font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider text-xs ml-1 flex items-center gap-2">
                           Raw Transmission <span className="h-px bg-gray-200 dark:bg-gray-800 flex-1 ml-2"></span>
                         </h4>
                         <div className="flex-1 p-5 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 focus-within:border-[#00C2D1] bg-white dark:bg-transparent font-mono text-sm leading-relaxed text-gray-600 dark:text-gray-500 overflow-y-auto max-h-[150px] shadow-sm selection:bg-[#00C2D1] selection:text-white">
                            {selectedEmail.preview} ... (End of snippet).
                         </div>
                      </div>
                   </div>

                   {/* Right Col: Actions & Recommendations */}
                   <div className="w-full md:w-64 flex flex-col gap-4">
                      <div className="p-5 rounded-2xl bg-gray-50 dark:bg-[#0B1120]/60 border border-gray-200 dark:border-gray-800 space-y-4">
                         <h4 className="text-xs font-bold text-gray-500 tracking-wider uppercase">Auto Recommendations</h4>
                         <button className="w-full py-3 px-4 rounded-xl text-sm font-semibold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-[#00C2D1] transition shadow-sm hover:shadow-[#00C2D1]/20">
                           Forward to {selectedEmail.category} Head
                         </button>
                         <button className="w-full py-3 px-4 rounded-xl text-sm font-semibold border border-[#00C2D1]/50 text-[#00C2D1] hover:bg-[#00C2D1]/10 transition shadow-[0_0_15px_rgba(0,194,209,0.15)] flex justify-center items-center gap-2">
                           <span className="font-bold">✨</span> Generate Reply
                         </button>
                      </div>

                      {/* Giant Neon Bloom Action Button */}
                      <button className="mt-auto w-full group relative py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all overflow-hidden flex items-center justify-center drop-shadow-[0_15px_25px_rgba(37,99,235,0.4)]">
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent group-hover:translate-x-full duration-700 z-0 transition-transform"/>
                        <span className="relative z-10 text-white font-bold text-lg tracking-wide flex items-center gap-2">
                          Execute Routing
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                        </span>
                      </button>
                   </div>
                </div>

             </div>
           </div>
        </div>
      )}


    </div>
  );
};
