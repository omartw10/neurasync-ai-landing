# Security Policy

## Reporting a Vulnerability

Security is a top priority for NeuraSync AI. If you discover a security vulnerability within this project, please send an e-mail to [neurasyncagency@gmail.com](mailto:neurasyncagency@gmail.com).

Please include:
*   Description of the vulnerability.
*   Steps to reproduce it.
*   Potential impact.

We will acknowledge your report and work to resolve the issue promptly.

## Security Architecture

Our platform is designed with multi-level protection:

### 1. Data Isolation (RLS)
Every table in our PostgreSQL database has **Row Level Security** enabled. Data access is scoped to the `organization_id`, ensuring that one tenant can never see another tenant's data.

### 2. Multi-Tenant Authorization
We use specialized **RPC (Remote Procedure Call)** functions that require both a valid UUID and a matching `access_code` to retrieve data. Success in code validation triggers an **Anonymous Supabase Session**, which provides a cryptographic token for further data requests.

### 3. Serverless Proxy
To prevent public exposure of internal automation endpoints, we use a **Vercel Serverless Function** as a proxy for the contact form and other external hooks. This proxy implements:
- Rate limiting.
- Payload size validation.
- Secret-based headers to authenticate requests to n8n.

### 4. Input Sanitization
All incoming emails and form data are sanitized before being processed by AI nodes to minimize the risk of prompt injection or phishing.
