import { supabase } from '../lib/supabase';

// ==========================================
// ACCESS CODE VALIDATION
// ==========================================

export const validateAccessCode = async (code) => {
  const { data, error } = await supabase
    .rpc('validate_access_code', { input_code: code })
    .single();

  if (error || !data) return null;
  return data;
};

// ==========================================
// ORGANIZATION INFO
// ==========================================

export const fetchOrganization = async (orgId, accessCode) => {
  const { data, error } = await supabase
    .rpc('get_org_by_id', { org_id: orgId, input_code: accessCode })
    .single();

  if (error) return null;
  return data;
};

// ==========================================
// EMAILS (InboxPilot Data)
// ==========================================

export const fetchClientEmails = async (organizationId, accessCode) => {
  const { data, error } = await supabase
    .rpc('get_emails_by_org', { org_id: organizationId, input_code: accessCode });

  if (error) {
    if (import.meta.env.DEV) {
      console.error('Error fetching emails:', error);
    }
    return { data: [], error };
  }

  // Normalize category and priority casings to Title Case to fix duplication
  const normalizedData = (data || []).map(email => ({
    ...email,
    category: email.category ? email.category.charAt(0).toUpperCase() + email.category.slice(1).toLowerCase() : 'Other',
    priority: email.priority ? email.priority.charAt(0).toUpperCase() + email.priority.slice(1).toLowerCase() : 'Low'
  }));

  return { data: normalizedData, error: null };
};

// ==========================================
// COMPREHENSIVE METRICS ENGINE
// ==========================================

const CATEGORY_COLORS = {
  Sales: '#00C2D1',
  Support: '#7C3AED',
  Partnership: '#F59E0B',
  Client: '#10B981',
  Spam: '#6B7280',
  Other: '#9CA3AF',
};

const PRIORITY_COLORS = {
  Critical: '#DC2626',
  High: '#EF4444',
  Medium: '#F59E0B',
  Low: '#10B981',
};

export const computeMetrics = (emails) => {
  if (!emails || emails.length === 0) {
    return {
      emailsProcessed: 0,
      avgConfidence: 0,
      priorityLeads: 0,
      hotLeads: 0,
      warmLeads: 0,
      coldLeads: 0,
      estimatedHoursSaved: '0',
      avgSLA: 0,
      spamBlocked: 0,
      spamRate: '0',
      categoriesBreakdown: [],
      priorityBreakdown: [],
      weeklyVolume: [],
      routingBreakdown: [],
      sourceBreakdown: [],
      topSenders: [],
      recentEmails: [],
      slaDistribution: [],
      confidenceDistribution: [],
    };
  }

  const total = emails.length;

  // ── Core Stats ──
  const totalConfidence = emails.reduce((sum, e) => sum + (e.confidence ?? 0), 0);
  const avgConfidence = total > 0 ? Math.round(totalConfidence / total) : 0;

  // ── Lead Pipeline ──
  const hotLeads = emails.filter(e => e.lead_score != null && e.lead_score >= 75).length;
  const warmLeads = emails.filter(e => e.lead_score != null && e.lead_score >= 40 && e.lead_score < 75).length;
  const coldLeads = emails.filter(e => e.lead_score != null && e.lead_score < 40).length;
  const priorityLeads = hotLeads + warmLeads;

  // ── Estimated Time Saved (2min per email manual processing) ──
  const minutesSaved = total * 2;
  const hoursSaved = (minutesSaved / 60).toFixed(1);

  // ── Spam Blocked ──
  const spamBlocked = emails.filter(e => e.category === 'Spam').length;
  const spamRate = total > 0 ? ((spamBlocked / total) * 100).toFixed(1) : '0';

  // ── Average SLA ──  
  const emailsWithSLA = emails.filter(e => e.sla_hours != null);
  const avgSLA = emailsWithSLA.length > 0
    ? Math.round(emailsWithSLA.reduce((sum, e) => sum + (e.sla_hours ?? 0), 0) / emailsWithSLA.length)
    : 0;

  // ── Category Breakdown ──
  const categoryMap = {};
  emails.forEach(e => {
    const cat = e.category || 'Other';
    categoryMap[cat] = (categoryMap[cat] || 0) + 1;
  });
  const categoriesBreakdown = Object.entries(categoryMap)
    .map(([name, value]) => ({
      name,
      value,
      percentage: Math.round((value / total) * 100),
      color: CATEGORY_COLORS[name] || '#9CA3AF',
    }))
    .sort((a, b) => b.value - a.value);

  // ── Priority Breakdown ──
  const priorityMap = {};
  emails.forEach(e => {
    const pri = e.priority || 'Low';
    priorityMap[pri] = (priorityMap[pri] || 0) + 1;
  });
  const priorityBreakdown = Object.entries(priorityMap)
    .map(([name, value]) => ({
      name,
      value,
      percentage: Math.round((value / total) * 100),
      color: PRIORITY_COLORS[name] || '#9CA3AF',
    }))
    .sort((a, b) => {
      const order = { Critical: 0, High: 1, Medium: 2, Low: 3 };
      return (order[a.name] ?? 4) - (order[b.name] ?? 4);
    });

  // ── Routing Breakdown ──
  const routeMap = {};
  emails.forEach(e => {
    const route = e.route_to || 'Unassigned';
    routeMap[route] = (routeMap[route] || 0) + 1;
  });
  const routingBreakdown = Object.entries(routeMap)
    .map(([name, value]) => ({ name, value, percentage: Math.round((value / total) * 100) }))
    .sort((a, b) => b.value - a.value);

  // ── Source Breakdown ──
  const sourceMap = {};
  emails.forEach(e => {
    const src = e.source || 'unknown';
    sourceMap[src] = (sourceMap[src] || 0) + 1;
  });
  const sourceBreakdown = Object.entries(sourceMap)
    .map(([name, value]) => ({ name, value, percentage: Math.round((value / total) * 100) }));

  // ── Top Senders ──
  const senderMap = {};
  emails.forEach(e => {
    const sender = e.sender || 'Unknown';
    if (!senderMap[sender]) {
      senderMap[sender] = { count: 0, lastCategory: e.category, lastPriority: e.priority };
    }
    senderMap[sender].count++;
    senderMap[sender].lastCategory = e.category;
    senderMap[sender].lastPriority = e.priority;
  });
  const topSenders = Object.entries(senderMap)
    .map(([sender, info]) => ({ sender, ...info }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // ── Weekly Volume (last 7 days) ──
  const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const now = new Date();
  const weeklyMap = {};
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dayKey = `${d.getMonth() + 1}/${d.getDate()}`;
    weeklyMap[dayKey] = { name: `${DAY_NAMES[d.getDay()]} ${dayKey}`, emails: 0 };
  }
  emails.forEach(e => {
    const d = new Date(e.created_at);
    const dayKey = `${d.getMonth() + 1}/${d.getDate()}`;
    if (dayKey in weeklyMap) {
      weeklyMap[dayKey].emails++;
    }
  });
  const weeklyVolume = Object.values(weeklyMap);

  // ── SLA Distribution ──
  const slaRanges = { 'Urgent (≤2h)': 0, 'Fast (≤8h)': 0, 'Standard (≤24h)': 0, 'Extended (>24h)': 0 };
  emailsWithSLA.forEach(e => {
    if (e.sla_hours <= 2) slaRanges['Urgent (≤2h)']++;
    else if (e.sla_hours <= 8) slaRanges['Fast (≤8h)']++;
    else if (e.sla_hours <= 24) slaRanges['Standard (≤24h)']++;
    else slaRanges['Extended (>24h)']++;
  });
  const SLA_COLORS = ['#DC2626', '#F59E0B', '#00C2D1', '#10B981'];
  const slaDistribution = Object.entries(slaRanges)
    .map(([name, value], i) => ({ name, value, color: SLA_COLORS[i] }))
    .filter(x => x.value > 0);

  // ── Confidence Distribution ──
  const confRanges = { 'Very High (90-100%)': 0, 'High (70-89%)': 0, 'Medium (50-69%)': 0, 'Low (<50%)': 0 };
  emails.forEach(e => {
    const c = e.confidence || 0;
    if (c >= 90) confRanges['Very High (90-100%)']++;
    else if (c >= 70) confRanges['High (70-89%)']++;
    else if (c >= 50) confRanges['Medium (50-69%)']++;
    else confRanges['Low (<50%)']++;
  });
  const CONF_COLORS = ['#10B981', '#00C2D1', '#F59E0B', '#EF4444'];
  const confidenceDistribution = Object.entries(confRanges)
    .map(([name, value], i) => ({ name, value, color: CONF_COLORS[i] }))
    .filter(x => x.value > 0);

  // ── Recent 5 emails ──
  const recentEmails = emails.slice(0, 5);

  return {
    emailsProcessed: total,
    avgConfidence,
    priorityLeads,
    hotLeads,
    warmLeads,
    coldLeads,
    estimatedHoursSaved: hoursSaved,
    avgSLA,
    spamBlocked,
    spamRate,
    categoriesBreakdown,
    priorityBreakdown,
    weeklyVolume,
    routingBreakdown,
    sourceBreakdown,
    topSenders,
    recentEmails,
    slaDistribution,
    confidenceDistribution,
  };
};
