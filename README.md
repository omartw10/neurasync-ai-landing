<p align="center">
  <img src="public/banner.png" alt="NeuraSync AI Banner" width="100%" />
</p>

<h1 align="center">⚡ NeuraSync AI</h1>

<p align="center">
  <strong>Intelligent Automation Studio</strong><br/>
  Building AI systems that eliminate manual work and unlock scalable growth.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/n8n-Automation-EA4B71?style=for-the-badge&logo=n8n&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Security-RLS%20Enabled-10B981?style=flat-square" />
  <img src="https://img.shields.io/badge/Multi--Tenant-Isolated-7C3AED?style=flat-square" />
  <img src="https://img.shields.io/badge/License-Proprietary-EF4444?style=flat-square" />
</p>

---

## 🧠 What is NeuraSync AI?

NeuraSync AI is a **production-grade AI automation platform** that processes, classifies, and routes business communications using intelligent agents. Our flagship product, **InboxPilot AI**, transforms raw email streams into actionable intelligence.

<table>
  <tr>
    <td width="50%">
      <h3>🎯 InboxPilot AI Agent</h3>
      <p>AI-powered email classification with lead scoring, priority detection, and intelligent routing — all fully automated.</p>
    </td>
    <td width="50%">
      <h3>📊 Analytics Dashboard</h3>
      <p>Real-time KPIs, category breakdowns, lead pipeline visualization, and confidence scoring in a premium dark-mode interface.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🔒 Multi-Tenant Security</h3>
      <p>Row-Level Security (RLS), access-code authentication, and anonymous session management for strict data isolation.</p>
    </td>
    <td width="50%">
      <h3>⚡ Workflow Orchestration</h3>
      <p>n8n-powered automation pipelines with webhook proxy protection and input sanitization.</p>
    </td>
  </tr>
</table>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Vite + React)               │
│  Landing Page  ·  CodeGate Login  ·  InboxPilot Dashboard│
└──────────────────────┬──────────────────────────────────┘
                       │ Supabase RPC (authenticated)
┌──────────────────────▼──────────────────────────────────┐
│                   SUPABASE (PostgreSQL)                   │
│  RLS Policies  ·  RPC Functions  ·  Anonymous Auth       │
└──────────────────────┬──────────────────────────────────┘
                       │ Webhook (secret-validated)
┌──────────────────────▼──────────────────────────────────┐
│                     n8n AUTOMATION                        │
│  Email Ingestion  ·  AI Classification  ·  DB Write      │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 6, Tailwind CSS, Framer Motion |
| **Charts** | Recharts (Area, Pie, Bar) |
| **Icons** | Lucide React |
| **Backend** | Supabase (PostgreSQL, RLS, Auth) |
| **Automation** | n8n (AI Agent + Supabase nodes) |
| **Serverless** | Vercel Edge Functions |
| **Security** | Cloudflare Turnstile, Webhook Proxy |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18+ (LTS recommended)
- **Supabase** project ([supabase.com](https://supabase.com))

### Installation

```bash
# Clone the repository
git clone https://github.com/omartw10/neurasync-ai-landing.git
cd neurasync-ai-landing

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev
```

### Database Setup

Execute the SQL files in `backend/sql/` in order:

```
01-schema.sql    →  Tables & types
02-policies.sql  →  Row-Level Security
03-triggers.sql  →  Auto-creation triggers
04-rpc.sql       →  Dashboard RPC functions
```

> See [`backend/README.md`](./backend/README.md) for detailed setup instructions.

---

## 🔐 Security Model

<table>
  <tr>
    <td align="center">🛡️</td>
    <td><strong>Row-Level Security</strong> — Every table enforces tenant isolation via <code>organization_id</code></td>
  </tr>
  <tr>
    <td align="center">🔑</td>
    <td><strong>Access Code Auth</strong> — Dashboard entry requires a validated, organization-scoped access code</td>
  </tr>
  <tr>
    <td align="center">🕵️</td>
    <td><strong>Anonymous Sessions</strong> — Post-validation sessions use Supabase anonymous auth, never raw keys</td>
  </tr>
  <tr>
    <td align="center">🌐</td>
    <td><strong>Webhook Proxy</strong> — n8n endpoints are never exposed; all traffic flows through a rate-limited Vercel proxy</td>
  </tr>
  <tr>
    <td align="center">🤖</td>
    <td><strong>Prompt Injection Defense</strong> — AI agent prompts sanitize email content with explicit boundary markers</td>
  </tr>
</table>

> For vulnerability reporting, see [`SECURITY.md`](./SECURITY.md).

---

## 📁 Project Structure

```
neurasync-ai-landing/
├── api/                    # Vercel serverless functions
│   └── contact.js          # Webhook proxy with rate limiting
├── backend/
│   ├── sql/                # Supabase schema & policies
│   └── workflows/          # n8n workflow exports
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   └── dashboard/      # Dashboard-specific widgets
│   ├── context/            # AuthContext (session management)
│   ├── layouts/            # Dashboard layout + sidebar
│   ├── lib/                # Supabase client
│   ├── pages/              # Route pages
│   │   └── dashboard/      # CodeGate, Overview, InboxPilot
│   └── services/           # API layer + metrics engine
├── .env.example            # Required environment variables
├── ARCHITECTURE.md         # Technical deep-dive
├── SECURITY.md             # Security policy
└── vercel.json             # Headers & deployment config
```

---

## 👨‍💻 Founder

<table>
  <tr>
    <td width="100">
      <img src="src/assets/omar_photo.jpg" width="80" style="border-radius: 50%" />
    </td>
    <td>
      <strong>Omar Abutwairat</strong><br/>
      AI Automation Architect<br/>
      <em>n8n · AI Systems · Web Infrastructure · Intelligent Ops</em><br/><br/>
      <a href="https://www.linkedin.com/in/omar-twerat-59788935b/">
        <img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin" />
      </a>
      <a href="mailto:neurasyncagency@gmail.com">
        <img src="https://img.shields.io/badge/Email-Contact-EA4335?style=flat-square&logo=gmail&logoColor=white" />
      </a>
      <a href="https://wa.me/218926467332">
        <img src="https://img.shields.io/badge/WhatsApp-Chat-25D366?style=flat-square&logo=whatsapp&logoColor=white" />
      </a>
    </td>
  </tr>
</table>

---

<p align="center">
  <strong>📄 License</strong><br/>
  This project is proprietary and owned by <strong>NeuraSync AI</strong>. All rights reserved.<br/><br/>
  <img src="https://img.shields.io/badge/Built%20with-❤️%20%26%20AI-00C2D1?style=for-the-badge" />
</p>
