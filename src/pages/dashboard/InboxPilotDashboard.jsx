import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchClientEmails, computeMetrics } from '../../services/api';
import { Card, CardHeader, CardTitle, CardContent, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Badge, cn } from '../../components/dashboard/Widgets';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { Mail, Clock, ShieldCheck, Zap, TrendingUp, Users, Target, Filter, RefreshCw, ArrowRight, Flame, Thermometer, Snowflake, BarChart3 } from 'lucide-react';

/* ───────────────────────────────────────────── */
/*  CUSTOM TOOLTIP                               */
/* ───────────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0B1120] border border-gray-700/60 rounded-lg px-4 py-3 shadow-xl">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-bold text-white">
          {p.name}: <span style={{ color: p.color || '#00C2D1' }}>{p.value}</span>
        </p>
      ))}
    </div>
  );
};

/* ───────────────────────────────────────────── */
/*  MINI KPI CARD                                */
/* ───────────────────────────────────────────── */
const KpiCard = ({ icon: Icon, label, value, sub, color = '#00C2D1', glow }) => (
  <div className="relative group p-5 rounded-2xl border border-gray-200/50 dark:border-gray-800/60 bg-white/60 dark:bg-[#0B1120]/60 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:shadow-lg">
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
         style={{ background: `radial-gradient(circle at 30% 30%, ${color}08, transparent 70%)` }} />
    <div className="flex items-start justify-between relative z-10">
      <div>
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{label}</p>
        <p className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white leading-none">{value}</p>
        {sub && <p className="mt-2 text-xs font-medium text-gray-500 dark:text-gray-400">{sub}</p>}
      </div>
      <div className="p-2.5 rounded-xl" style={{ backgroundColor: `${color}15` }}>
        <Icon className="w-5 h-5" style={{ color }} strokeWidth={2.5} />
      </div>
    </div>
    {glow && <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: `${color}15` }} />}
  </div>
);

/* ───────────────────────────────────────────── */
/*  LEAD PIPELINE MINI CARD                      */
/* ───────────────────────────────────────────── */
const LeadChip = ({ icon: Icon, label, count, color, total }) => {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800">
      <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}15` }}>
        <Icon className="w-4 h-4" style={{ color }} strokeWidth={2.5} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{count}</span>
          <span className="text-xs font-bold" style={{ color }}>{pct}%</span>
        </div>
        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-0.5">{label}</p>
        <div className="mt-1.5 h-1 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: color }} />
        </div>
      </div>
    </div>
  );
};

/* ───────────────────────────────────────────── */
/*  HORIZONTAL BAR                               */
/* ───────────────────────────────────────────── */
const HBar = ({ label, value, max, color, percentage }) => (
  <div className="group">
    <div className="flex items-center justify-between text-sm mb-1.5">
      <span className="font-medium text-gray-700 dark:text-gray-300 truncate">{label}</span>
      <span className="ml-2 text-xs font-bold tabular-nums" style={{ color }}>{value} <span className="text-gray-400 font-normal">({percentage}%)</span></span>
    </div>
    <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${Math.max((value / Math.max(max, 1)) * 100, 4)}%`, backgroundColor: color }} />
    </div>
  </div>
);

/* ═══════════════════════════════════════════════ */
/*  MAIN DASHBOARD COMPONENT                      */
/* ═══════════════════════════════════════════════ */
export const InboxPilotDashboard = () => {
  const { organizationId } = useAuth();
  const [emails, setEmails] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [tableFilter, setTableFilter] = useState('all');
  const scrollContainerRef = React.useRef(null);

  // Lock horizontal scroll on mouse wheel
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        // If the user tries to scroll horizontally with trackpad/tilt wheel
        // We can block it or ignore it to keep vertical focus
      }
      // Standard wheel should only affect scrollTop
      el.scrollTop += e.deltaY;
      if (e.deltaY !== 0) e.preventDefault();
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  const loadData = useCallback(async () => {
    if (!organizationId) return;
    setIsLoading(true);
    const result = await fetchClientEmails(organizationId);
    if (result.data) {
      setEmails(result.data);
      setMetrics(computeMetrics(result.data));
    }
    setIsLoading(false);
  }, [organizationId]);

  useEffect(() => { loadData(); }, [loadData]);

  const filteredEmails = useMemo(() => {
    if (tableFilter === 'all') return emails;
    return emails.filter(e => e.category === tableFilter);
  }, [emails, tableFilter]);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-gray-800 rounded-full" />
            <div className="absolute inset-0 border-4 border-transparent border-t-[#00C2D1] rounded-full animate-spin" />
            <Mail className="absolute inset-0 m-auto w-6 h-6 text-[#00C2D1] animate-pulse" />
          </div>
          <p className="text-gray-500 font-semibold animate-pulse">Loading InboxPilot analytics...</p>
        </div>
      </div>
    );
  }

  const maxRoute = Math.max(...(metrics?.routingBreakdown?.map(r => r.value) || [1]));
  const ROUTE_COLORS = ['#00C2D1', '#7C3AED', '#F59E0B', '#10B981', '#EF4444', '#3B82F6'];

  return (
    <div className="space-y-8 fade-in pb-8 min-w-0 w-full overflow-hidden">
      {/* ═══════ HEADER ═══════ */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#00C2D1]/20 to-[#7C3AED]/20 border border-[#00C2D1]/30">
              <Mail className="w-6 h-6 text-[#00C2D1]" />
            </div>
            <h1 className="text-3xl font-black tracking-tight">InboxPilot AI</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-lg">
            AI-powered email classification, priority scoring, lead detection, and intelligent routing — all automated.
          </p>
        </div>
        <button
          onClick={loadData}
          className="flex items-center gap-2 bg-[#00C2D1] text-[#0B1F3B] hover:bg-[#00D4E3] transition-all font-semibold px-5 py-2.5 rounded-xl text-sm shadow-lg shadow-[#00C2D1]/25 hover:shadow-[#00C2D1]/40 self-start md:self-auto"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* ═══════ HERO KPI GRID ═══════ */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard icon={Mail} label="Emails Processed" value={metrics?.emailsProcessed?.toLocaleString() || '0'} sub="Total emails analyzed by AI" color="#00C2D1" glow />
        <KpiCard icon={ShieldCheck} label="AI Confidence" value={`${metrics?.avgConfidence || 0}%`} sub="Average classification accuracy" color="#10B981" glow />
        <KpiCard icon={Target} label="Leads Detected" value={metrics?.priorityLeads || '0'} sub={`${metrics?.hotLeads || 0} hot · ${metrics?.warmLeads || 0} warm`} color="#F59E0B" glow />
        <KpiCard icon={Clock} label="Hours Saved" value={metrics?.estimatedHoursSaved || '0'} sub="Estimated automation time saved" color="#7C3AED" glow />
      </div>

      {/* ═══════ ROW 2: VOLUME CHART + LEAD PIPELINE ═══════ */}
      <div className="grid gap-6 grid-cols-1 xl:grid-cols-3">
        {/* Volume Chart */}
        <Card className="col-span-1 xl:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#00C2D1]" /> Email Volume (Last 7 Days)
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="h-[300px] pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics?.weeklyVolume || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEmails" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00C2D1" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#00C2D1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1F2937" opacity={0.4} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7280' }} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="emails" name="Emails" stroke="#00C2D1" strokeWidth={2.5} fill="url(#colorEmails)" dot={{ fill: '#00C2D1', r: 4, strokeWidth: 2, stroke: '#0B1120' }} activeDot={{ r: 6, stroke: '#00C2D1', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Lead Pipeline */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#F59E0B]" /> Lead Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <LeadChip icon={Flame} label="Hot Leads (score ≥ 75)" count={metrics?.hotLeads || 0} color="#EF4444" total={metrics?.emailsProcessed || 1} />
            <LeadChip icon={Thermometer} label="Warm Leads (40-74)" count={metrics?.warmLeads || 0} color="#F59E0B" total={metrics?.emailsProcessed || 1} />
            <LeadChip icon={Snowflake} label="Cold / Informational (<40)" count={metrics?.coldLeads || 0} color="#3B82F6" total={metrics?.emailsProcessed || 1} />
            <div className="mt-4 p-3 rounded-xl bg-[#F59E0B]/5 border border-[#F59E0B]/20 text-center">
              <span className="text-2xl font-black text-[#F59E0B]">{metrics?.priorityLeads || 0}</span>
              <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 mt-1">Total Actionable Leads</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ═══════ ROW 3: CATEGORIES + ROUTING + SLA ═══════ */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#7C3AED]" /> Category Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="w-[140px] h-[140px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={metrics?.categoriesBreakdown || []} innerRadius={42} outerRadius={65} paddingAngle={3} dataKey="value" strokeWidth={0}>
                      {(metrics?.categoriesBreakdown || []).map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2.5">
                {(metrics?.categoriesBreakdown || []).map(cat => (
                  <div key={cat.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{cat.value}</span>
                      <span className="text-[10px] font-semibold text-gray-400">{cat.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Routing Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#10B981]" /> Routing Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(metrics?.routingBreakdown || []).map((route, i) => (
              <HBar key={route.name} label={route.name} value={route.value} max={maxRoute} color={ROUTE_COLORS[i % ROUTE_COLORS.length]} percentage={route.percentage} />
            ))}
            {(!metrics?.routingBreakdown || metrics.routingBreakdown.length === 0) && (
              <p className="text-sm text-gray-500 text-center py-4">No routing data yet</p>
            )}
          </CardContent>
        </Card>

        {/* AI Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#00C2D1]" /> AI Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Confidence Gauge */}
            <div className="text-center mb-5">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-gray-100 dark:border-gray-800 relative">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="36" fill="none" stroke="#1F2937" strokeWidth="4" opacity="0.3" />
                  <circle cx="40" cy="40" r="36" fill="none" stroke="#10B981" strokeWidth="4"
                    strokeDasharray={`${(metrics?.avgConfidence || 0) * 2.26} 226`}
                    strokeLinecap="round" />
                </svg>
                <span className="text-lg font-black text-gray-900 dark:text-white">{metrics?.avgConfidence || 0}%</span>
              </div>
              <p className="text-xs font-semibold text-gray-500 mt-2">Average AI Confidence</p>
            </div>

            {/* Confidence Bands */}
            <div className="space-y-2">
              {(metrics?.confidenceDistribution || []).map(band => (
                <div key={band.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: band.color }} />
                    <span className="text-gray-600 dark:text-gray-400 font-medium">{band.name}</span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">{band.value}</span>
                </div>
              ))}
            </div>

            {/* Spam Shield */}
            <div className="mt-5 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Spam Blocked</p>
                <p className="text-lg font-black text-gray-900 dark:text-white">{metrics?.spamBlocked || 0}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Spam Rate</p>
                <p className="text-lg font-black text-rose-500">{metrics?.spamRate || '0'}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ═══════ ROW 4: PRIORITY + SLA + TOP SENDERS ═══════ */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {/* Priority Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Priority Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics?.priorityBreakdown || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1F2937" opacity={0.3} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7280' }} allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Emails" radius={[6, 6, 0, 0]} barSize={36}>
                  {(metrics?.priorityBreakdown || []).map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* SLA Response Time */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#00C2D1]" /> SLA Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <span className="text-4xl font-black text-gray-900 dark:text-white">{metrics?.avgSLA || 0}</span>
              <span className="text-lg font-semibold text-gray-500 ml-1">hrs</span>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">Average Assigned SLA</p>
            </div>
            <div className="space-y-2.5">
              {(metrics?.slaDistribution || []).map(sla => (
                <div key={sla.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sla.color }} />
                    <span className="font-medium text-gray-600 dark:text-gray-300">{sla.name}</span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">{sla.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Senders */}
        <Card>
          <CardHeader>
            <CardTitle>Top Senders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(metrics?.topSenders || []).map((s, i) => (
                <div key={s.sender} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00C2D1] to-[#7C3AED] flex items-center justify-center text-white font-bold text-[11px] shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{s.sender}</p>
                    <p className="text-[11px] text-gray-500">{s.count} email{s.count > 1 ? 's' : ''} · {s.lastCategory}</p>
                  </div>
                  <Badge variant={s.lastPriority === 'Critical' || s.lastPriority === 'High' ? 'danger' : s.lastPriority === 'Medium' ? 'warning' : 'success'}>
                    {s.lastPriority}
                  </Badge>
                </div>
              ))}
              {(!metrics?.topSenders || metrics.topSenders.length === 0) && (
                <p className="text-sm text-gray-500 text-center py-4">No senders data yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ═══════ ROW 5: RECENT ACTIVITY ═══════ */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#F59E0B]" /> Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(metrics?.recentEmails || []).map(email => (
              <div key={email.id} onClick={() => setSelectedEmail(email)} className="flex items-center gap-4 p-3 rounded-xl bg-white/50 dark:bg-gray-800/20 border border-gray-100 dark:border-gray-800 cursor-pointer hover:border-[#00C2D1]/40 hover:shadow-md transition-all group">
                <div className={cn("w-2 h-2 rounded-full shrink-0", email.priority === 'Critical' || email.priority === 'High' ? 'bg-rose-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : email.priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500')} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{email.subject}</p>
                    <Badge variant={email.category === 'Sales' ? 'primary' : email.category === 'Support' ? 'purple' : email.category === 'Spam' ? 'default' : 'success'}>
                      {email.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">from {email.sender} · {email.created_at ? new Date(email.created_at).toLocaleString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {email.lead_score >= 65 && (
                    <span className="text-xs font-bold text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-1 rounded-md">Lead {email.lead_score}</span>
                  )}
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#00C2D1] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ═══════ ROW 6: FULL EMAIL TABLE ═══════ */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-3">
          <CardTitle>All Processed Emails ({filteredEmails.length})</CardTitle>
          <div className="flex items-center gap-2 flex-wrap">
            {['all', ...(metrics?.categoriesBreakdown?.map(c => c.name) || [])].map(cat => (
              <button
                key={cat}
                onClick={() => setTableFilter(cat)}
                className={cn(
                  "text-xs font-semibold px-3 py-1.5 rounded-lg transition-all border",
                  tableFilter === cat
                    ? "bg-[#00C2D1] text-[#0B1F3B] border-[#00C2D1] shadow-md shadow-[#00C2D1]/20"
                    : "bg-transparent text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div 
            ref={scrollContainerRef}
            className="max-h-[600px] overflow-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800"
          >
          <Table unwrapped className="text-left w-full min-w-[1200px]">
            <TableHeader>
              <TableRow className="bg-gray-50/50 dark:bg-[#0B1120]/50 hover:bg-transparent whitespace-nowrap">
                <TableHead className="w-[120px]">Date</TableHead>
                <TableHead className="min-w-[150px]">Sender</TableHead>
                <TableHead className="min-w-[180px]">Subject</TableHead>
                <TableHead className="min-w-[200px]">AI Summary</TableHead>
                <TableHead className="min-w-[200px]">Preview</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="w-[60px]">Lead</TableHead>
                <TableHead className="w-[120px]">Confidence</TableHead>
                <TableHead className="w-[70px]">SLA</TableHead>
                <TableHead>Route → </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmails.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={11} className="h-24 text-center text-gray-500 font-medium">
                    No emails found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredEmails.map(email => (
                  <TableRow 
                    key={email.id} 
                    className="group cursor-pointer hover:bg-[#00C2D1]/[0.05] border-b border-gray-100 dark:border-gray-800/50 transition-colors" 
                    onClick={() => setSelectedEmail(email)}
                  >
                    <TableCell className="text-[11px] text-gray-500 py-3">{email.created_at ? new Date(email.created_at).toLocaleString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'}</TableCell>
                    <TableCell className="font-semibold text-gray-900 dark:text-white text-xs max-w-[140px] truncate">{email.sender}</TableCell>
                    <TableCell><div className="max-w-[160px] truncate text-xs font-medium" title={email.subject}>{email.subject}</div></TableCell>
                    <TableCell><div className="max-w-[200px] truncate text-[11px] text-gray-500 italic" title={email.summary}>{email.summary || '—'}</div></TableCell>
                    <TableCell><div className="max-w-[220px] truncate text-[11px] text-gray-400" title={email.preview}>{email.preview || '—'}</div></TableCell>
                    <TableCell><Badge variant={email.category === 'Sales' ? 'primary' : email.category === 'Support' ? 'purple' : email.category === 'Client' ? 'success' : email.category === 'Spam' ? 'default' : 'warning'}>{email.category}</Badge></TableCell>
                    <TableCell><Badge variant={email.priority === 'Critical' || email.priority === 'High' ? 'danger' : email.priority === 'Medium' ? 'warning' : 'success'}>{email.priority}</Badge></TableCell>
                    <TableCell>
                      {email.lead_score != null ? (
                        <div className={cn("inline-flex items-center justify-center w-7 h-7 rounded-lg border text-[10px] font-bold",
                          email.lead_score >= 75 ? 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-400' :
                          email.lead_score >= 40 ? 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-400' :
                          'border-gray-200 bg-gray-50 text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400')}>
                          {email.lead_score}
                        </div>
                      ) : <span className="text-gray-300 dark:text-gray-700 text-xs">—</span>}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-12 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full", email.confidence >= 80 ? 'bg-emerald-500' : email.confidence >= 60 ? 'bg-amber-500' : 'bg-rose-500')} style={{ width: `${email.confidence}%` }} />
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 tabular-nums">{email.confidence}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs font-semibold text-gray-600 dark:text-gray-300">{email.sla_hours ? `${email.sla_hours}h` : '—'}</TableCell>
                    <TableCell><span className="text-xs font-bold text-[#00C2D1] bg-[#00C2D1]/10 px-2 py-1 rounded-md">{email.route_to}</span></TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          </div>
        </CardContent>
      </Card>

      {/* ═══════ EMAIL DETAIL MODAL ═══════ */}
      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-3xl bg-[#030816]/70" onClick={() => setSelectedEmail(null)}>
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(0,194,209,0.12)_100%)] pointer-events-none" />
           <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-[1px] bg-gradient-to-br from-[#00C2D1]/50 via-[#0B1F3B] to-[#7C3AED]/30 shadow-[0_0_80px_rgba(0,194,209,0.25)]" onClick={e => e.stopPropagation()}>
             <div className="bg-[#060D18]/95 backdrop-blur-xl rounded-[23px] p-4 sm:p-6 lg:p-8 min-h-[350px] sm:min-h-[450px] flex flex-col relative">
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#00C2D1]/60 to-transparent" />

                <button onClick={() => setSelectedEmail(null)} className="absolute top-5 right-5 p-2 rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>

                {/* Header */}
                <div className="pr-12 mb-6">
                  <h2 className="text-lg sm:text-2xl font-bold text-white leading-tight mb-2">{selectedEmail.subject}</h2>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                    <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />From: <span className="text-gray-300 font-medium">{selectedEmail.sender}</span></span>
                    <span>·</span>
                    <span>{selectedEmail.created_at ? new Date(selectedEmail.created_at).toLocaleString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}</span>
                    <span>·</span>
                    <span className="capitalize">{selectedEmail.source}</span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3 mb-6">
                  {[
                    { label: 'Category', value: selectedEmail.category, color: '#7C3AED' },
                    { label: 'Priority', value: selectedEmail.priority, color: selectedEmail.priority === 'Critical' || selectedEmail.priority === 'High' ? '#EF4444' : '#F59E0B' },
                    { label: 'Lead Score', value: selectedEmail.lead_score != null ? `${selectedEmail.lead_score}/100` : '—', color: '#F59E0B' },
                    { label: 'SLA', value: selectedEmail.sla_hours ? `${selectedEmail.sla_hours} hrs` : '—', color: '#00C2D1' },
                    { label: 'Confidence', value: `${selectedEmail.confidence}%`, color: '#10B981' },
                  ].map(m => (
                    <div key={m.label} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: m.color }}>{m.label}</p>
                      <p className="text-lg font-bold text-white">{m.value}</p>
                    </div>
                  ))}
                </div>

                {/* Routed To */}
                <div className="mb-6 p-3 rounded-xl bg-[#00C2D1]/5 border border-[#00C2D1]/20 flex items-center justify-between">
                  <span className="text-sm text-gray-400">Routed To</span>
                  <span className="text-sm font-bold text-[#00C2D1]">{selectedEmail.route_to} →</span>
                </div>

                {/* AI Summary */}
                {selectedEmail.summary && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-[#7C3AED]" />
                      <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider">AI Summary</h4>
                    </div>
                    <div className="p-4 rounded-xl bg-[#0F172A] border border-gray-800 text-gray-200 leading-relaxed text-sm">
                      {selectedEmail.summary}
                    </div>
                  </div>
                )}

                {/* Email Preview */}
                {selectedEmail.preview && (
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Preview</h4>
                    <div className="p-4 rounded-xl border border-dashed border-gray-700 bg-transparent text-gray-500 text-sm leading-relaxed font-mono max-h-[120px] overflow-y-auto">
                      {selectedEmail.preview}
                    </div>
                  </div>
                )}
             </div>
           </div>
        </div>
      )}
    </div>
  );
};
