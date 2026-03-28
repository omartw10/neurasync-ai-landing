# NeuraSync AI — Backend Setup

This directory contains the database schema, security policies, and n8n workflows for the NeuraSync AI platform.

## 🗄️ Database Setup (Supabase)

To prepare your Supabase project, execute the SQL files in the `backend/sql/` directory in the following order:

1.  **`01-schema.sql`**: Creates all necessary tables and standard types.
2.  **`02-policies.sql`**: Enables Row-Level Security (RLS) and defines multi-tenant isolation policies.
3.  **`03-triggers.sql`**: Sets up automation triggers for user record handling and default service activation.
4.  **`04-rpc.sql`**: Registers the RPC functions used by the dashboard for access code validation and data retrieval.

### Manual configuration in Supabase Auth

1.  **Anonymous Sign-In**: Ensure *Anonymous Sign-Ins* are enabled in your Supabase project settings.
2.  **Turnstile (Optional but Recommended)**: If using Cloudflare Turnstile, configure the site and secret keys in the Supabase Auth captcha settings.

---

## ⚙️ n8n Workflows

The `backend/workflows/` directory contains n8n workflow JSON exports.

- **`inboxpilot_workflow.json`**: The core AI-powered email processing pipeline.
  - **Prerequisites**: OpenAI n8n node, Supabase n8n node.
  - **Variables**: Make sure to set `WEBHOOK_SECRET` in your n8n environment to match your Vercel proxy configuration.

---

## 🔐 Security Standards

-   **Multi-tenancy**: All data is strictly isolated by `organization_id` through RLS.
-   **Dashboard Access**: Users log in via an `access_code`. Upon successful validation, the app creates an anonymous Supabase session to fetch data through specialized, secure RPCs.
-   **Webhook Protection**: The internal n8n webhook is exposed only through a Vercel serverless proxy with rate-limiting and secret validation.