/* eslint-disable no-unused-vars */
// Simulated API service mimicking the Vercel Edge Function hitting Google Sheets

// Google Sheets typically comes back as a flat array of objects
const MOCK_GOOGLE_SHEETS_DB = [
  // client_789 (Acme Corp) data
  { client_id: 'client_789', id: 1042, sender: 'john@acmecorp.com', subject: 'Inquiry about Enterprise plan pricing', source: 'gmail', category: 'Sales', priority: 'High', leadScore: 92, confidence: 98, summary: 'Client requesting info on Enterprise SLA and pricing.', preview: 'Hi team, checking if you offer custom packages...', sla: 2, routed: 'Sales', created_at: 'Oct 24, 10:42 AM' },
  { client_id: 'client_789', id: 1043, sender: 'support@billing.com', subject: 'Invoice #4920 payment failed', source: 'other integrations', category: 'Support', priority: 'Critical', leadScore: null, confidence: 95, summary: 'Notification of failed automatic card payment.', preview: 'We attempted to charge your card ending in 4242...', sla: 1, routed: 'Technical_Escalation', created_at: 'Oct 24, 09:15 AM' },
  { client_id: 'client_789', id: 1044, sender: 'jane@marketing.io', subject: 'Partnership opportunity - Q4', source: 'contact form', category: 'Partnership', priority: 'Medium', leadScore: 65, confidence: 88, summary: 'Marketing agency looking to explore cross-promotion.', preview: 'Hey there, I love what NeuraSyncAI is building...', sla: 48, routed: 'Business_Development', created_at: 'Oct 24, 08:30 AM' },
  { client_id: 'client_789', id: 1046, sender: 'contact@localclinic.com', subject: 'We need help with our automation', source: 'website', category: 'Client', priority: 'High', leadScore: 85, confidence: 94, summary: 'Local clinic wants to automate patient routing.', preview: 'Hello, our clinic is currently overwhelmed with...', sla: 2, routed: 'Client_Operations', created_at: 'Oct 23, 02:10 PM' },
  
  // client_abc (Another Company) data - shouldn't appear for client_789
  { client_id: 'client_abc', id: 2001, sender: 'competitor@stealing.com', subject: 'Give us your pricing', source: 'gmail', category: 'Spam', priority: 'Low', leadScore: 5, confidence: 99, summary: 'Competitor intel.', preview: 'Can I get a copy of your...', sla: null, routed: 'Manual_Review', created_at: 'Oct 22, 10:10 AM' }
];

export const fetchClientEmails = async (clientId) => {
  // Simulate network delay to mimic a real Google Sheets fetch or Edge Function
  return new Promise((resolve) => {
    setTimeout(() => {
      // Filter the global sheet only by rows matching the client's specific ID
      const filteredData = MOCK_GOOGLE_SHEETS_DB.filter(row => row.client_id === clientId);
      
      resolve({
        data: filteredData,
        status: 200,
        metadata: {
          totalRows: filteredData.length,
          lastSynced: new Date().toISOString()
        }
      });
    }, 800);
  });
};

// Simulate fetching high-level dashboard metrics (e.g. from an aggregate sheet)
export const fetchClientMetrics = async (_clientId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        emailsProcessed: '1,248',
        hoursSaved: '42h 15m',
        priorityLeads: '84',
        spamBlocked: '643', // Returned as metric even though it's removed from tables
        kpiTrends: { processed: 'up', hours: 'up', leads: 'up', spam: 'down' }
      });
    }, 800);
  });
};
