-- ==========================================
-- NEURASYNC AI SAAS BACKEND SCHEMA v2 (Production-Ready)
-- Open Supabase Dashboard -> SQL Editor -> Run this script
-- ==========================================

-- 1. Create ENUM Types
CREATE TYPE role_type AS ENUM ('owner', 'admin', 'member');
CREATE TYPE service_status AS ENUM ('active', 'inactive', 'suspended');

-- 2. Create Core Tables

-- Organizations (Tenants)
CREATE TABLE public.organizations (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Users (Extends built-in Supabase Auth)
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Memberships (Links Users to Organizations & assigns roles)
CREATE TABLE public.memberships (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    role role_type DEFAULT 'owner'::role_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, organization_id)
);

-- Services (Master list of NeuraSync products)
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL, -- e.g., 'inboxpilot', 'leadsync'
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Pre-populate default services
INSERT INTO public.services (slug, name, description) VALUES 
('inboxpilot', 'InboxPilot AI', 'Intelligent email classification and routing.'),
('leadsync', 'LeadSync AI', 'Automated outbound lead generation.'),
('docuextract', 'DocuExtract AI', 'OCR data extraction for invoices and documents.');

-- Organization Services (Which tenant has activated which service)
CREATE TABLE public.organization_services (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
    status service_status DEFAULT 'active'::service_status NOT NULL,
    activated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(organization_id, service_id)
);

-- Automation Events
CREATE TABLE public.automation_events (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    payload JSONB DEFAULT '{}'::jsonb,
    status TEXT DEFAULT 'success',
    executed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- 3. Production Readiness Tables
-- ==========================================

-- Audit Logs (Tracks user or system actions)
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL, -- the actor
    action TEXT NOT NULL, -- e.g. 'workflow.created', 'integration.connected'
    entity_type TEXT NOT NULL, -- e.g. 'workflow', 'integration'
    entity_id UUID,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Usage Metrics (For future usage-based billing)
CREATE TABLE public.usage_metrics (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    metric_name TEXT NOT NULL, -- e.g. 'emails_processed', 'ai_requests'
    value INTEGER DEFAULT 0 NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- API Keys (For secure integrations & programmatic access)
CREATE TABLE public.api_keys (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    key_hash TEXT NOT NULL, -- Hashed key value
    last_used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Integrations (Connected apps like Gmail, Slack, CRM)
-- Using pgsodium (Supabase vault) is recommended for production credentials, but we use a secure column for now.
CREATE TABLE public.integrations (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
    provider TEXT NOT NULL, -- e.g. 'gmail', 'slack'
    external_identifier TEXT, -- External system identifier
    name TEXT, -- Display name for this integration
    credentials JSONB NOT NULL, -- Encrypted credentials
    status service_status DEFAULT 'active'::service_status NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(organization_id, provider)
);

-- Webhooks (For sending data OUT to clients endpoints)
CREATE TABLE public.webhooks (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    name TEXT,
    event_types TEXT[] NOT NULL,
    endpoint_url TEXT NOT NULL,
    secret TEXT, -- Secret used to sign webhook payloads
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Workflows (Maps NeuraSync clients to specific n8n workflow instances)
CREATE TABLE public.workflows (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  n8n_workflow_id TEXT, -- The ID of the workflow in the n8n instance
  status service_status DEFAULT 'active'::service_status NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Emails Processed (Specific data for InboxPilot dashboard)
CREATE TABLE public.emails_processed (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  sender TEXT,
  subject TEXT,
  source TEXT, -- e.g. 'gmail', 'outlook'

  category TEXT, -- e.g. 'Lead', 'Support', 'Spam'
  priority TEXT, -- e.g. 'High', 'Medium', 'Low'
  lead_score INTEGER,
  confidence INTEGER, -- AI confidence score percentage
  sla_hours INTEGER, -- Expected SLA response time in hours

  summary TEXT, -- AI-generated summary of the email
  preview TEXT, -- Short preview text

  route_to TEXT, -- Which department/person it was routed to

  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Subscriptions (Future-proofing for Stripe/Billing integration)
CREATE TABLE public.subscriptions (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    plan_tier TEXT NOT NULL DEFAULT 'free', -- e.g. 'free', 'pro', 'enterprise'
    status TEXT NOT NULL DEFAULT 'active', -- e.g. 'active', 'past_due', 'canceled'
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(organization_id)
);


-- Access Codes (Simple code-based dashboard access for clients)
CREATE TABLE public.access_codes (
  id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  code TEXT UNIQUE NOT NULL,
  label TEXT, -- e.g. 'NeuraSyncAI March 2026'
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emails_processed ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_codes ENABLE ROW LEVEL SECURITY;

-- Security Helper Function: Prevents infinite recursion by fetching user's orgs safely
CREATE OR REPLACE FUNCTION get_user_orgs()
RETURNS SETOF UUID
LANGUAGE sql SECURITY DEFINER SET search_path = public
STABLE
AS $$
    SELECT organization_id FROM memberships WHERE user_id = auth.uid();
$$;

-- Users matching
CREATE POLICY "Users view own profile" ON public.users FOR SELECT USING (id = auth.uid());
CREATE POLICY "Users update own profile" ON public.users FOR UPDATE USING (id = auth.uid());

-- Organization Isolation
CREATE POLICY "Users view their own organizations" ON public.organizations FOR SELECT USING (id IN (SELECT get_user_orgs()));
CREATE POLICY "Users view memberships of their orgs" ON public.memberships FOR SELECT USING (organization_id IN (SELECT get_user_orgs()));
CREATE POLICY "Anyone authenticated can list services" ON public.services FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users view their org services" ON public.organization_services FOR SELECT USING (organization_id IN (SELECT get_user_orgs()));
CREATE POLICY "Users view their org automation events" ON public.automation_events FOR SELECT USING (organization_id IN (SELECT get_user_orgs()));

-- Production Tables RLS policies
CREATE POLICY "Users view their org audit logs" ON public.audit_logs FOR SELECT USING (organization_id IN (SELECT get_user_orgs()));
CREATE POLICY "Users view their org usage metrics" ON public.usage_metrics FOR SELECT USING (organization_id IN (SELECT get_user_orgs()));
CREATE POLICY "Users manage their org API keys" ON public.api_keys FOR ALL USING (organization_id IN (SELECT get_user_orgs()));
CREATE POLICY "Users manage their org integrations" ON public.integrations FOR ALL USING (organization_id IN (SELECT get_user_orgs()));
CREATE POLICY "Users manage their org webhooks" ON public.webhooks FOR ALL USING (organization_id IN (SELECT get_user_orgs()));
CREATE POLICY "Users manage their org workflows" ON public.workflows FOR ALL USING (organization_id IN (SELECT get_user_orgs()));
CREATE POLICY "Users view their org processed emails" ON public.emails_processed FOR SELECT USING (organization_id IN (SELECT get_user_orgs()));
CREATE POLICY "Users view their org subscriptions" ON public.subscriptions FOR SELECT USING (organization_id IN (SELECT get_user_orgs()));

-- Dashboard RPC execute permissions
REVOKE EXECUTE ON FUNCTION public.get_emails_by_org(UUID) FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_org_by_id(UUID) FROM anon;
GRANT EXECUTE ON FUNCTION public.get_emails_by_org(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_org_by_id(UUID) TO authenticated;

-- ==========================================
-- 5. AUTOMATION TRANSACTIONS
-- ==========================================

-- Auto-create public.users record when a new account is registered in Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ==========================================
-- 6. AUTOMATIONS (Default Services)
-- ==========================================

CREATE OR REPLACE FUNCTION public.activate_default_service()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  inboxpilot_service_id UUID;
BEGIN
  SELECT id
  INTO inboxpilot_service_id
  FROM public.services
  WHERE slug = 'inboxpilot'
  LIMIT 1;

  IF inboxpilot_service_id IS NULL THEN
    RETURN NEW;
  END IF;

  INSERT INTO public.organization_services (organization_id, service_id, status)
  VALUES (NEW.id, inboxpilot_service_id, 'active')
  ON CONFLICT (organization_id, service_id)
  DO UPDATE SET
    status = 'active',
    activated_at = timezone('utc'::text, now());

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_organization_created_activate_default_service
  AFTER INSERT ON public.organizations
  FOR EACH ROW EXECUTE PROCEDURE public.activate_default_service();
