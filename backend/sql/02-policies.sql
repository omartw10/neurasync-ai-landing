-- ==========================================
-- NEURASYNC AI — Row-Level Security Policies
-- Run after: 01-schema.sql
-- ==========================================

-- Enable RLS on all tables
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

-- Security Helper Function: Fetches user's organization IDs safely
CREATE OR REPLACE FUNCTION get_user_orgs()
RETURNS SETOF UUID
LANGUAGE sql SECURITY DEFINER SET search_path = public
STABLE
AS $$
    SELECT organization_id FROM memberships WHERE user_id = auth.uid();
$$;

-- Users policies
CREATE POLICY "Users view own profile" ON public.users FOR SELECT USING (id = auth.uid());
CREATE POLICY "Users update own profile" ON public.users FOR UPDATE USING (id = auth.uid());

-- Organization policies
CREATE POLICY "Users view their own organizations" ON public.organizations FOR SELECT USING (id IN (SELECT get_user_orgs()));
CREATE POLICY "Users view memberships of their orgs" ON public.memberships FOR SELECT USING (organization_id IN (SELECT get_user_orgs()));
CREATE POLICY "Anyone authenticated can list services" ON public.services FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users view their org services" ON public.organization_services FOR SELECT USING (organization_id IN (SELECT get_user_orgs()));
CREATE POLICY "Users view their org automation events" ON public.automation_events FOR SELECT USING (organization_id IN (SELECT get_user_orgs()));

-- Production tables RLS policies
CREATE POLICY "Users view their org audit logs" ON public.audit_logs FOR SELECT USING (organization_id IN (SELECT get_user_orgs()));
CREATE POLICY "Users view their org usage metrics" ON public.usage_metrics FOR SELECT USING (organization_id IN (SELECT get_user_orgs()));
CREATE POLICY "Users manage their org API keys" ON public.api_keys FOR ALL USING (organization_id IN (SELECT get_user_orgs()));
CREATE POLICY "Users manage their org integrations" ON public.integrations FOR ALL USING (organization_id IN (SELECT get_user_orgs()));
CREATE POLICY "Users manage their org webhooks" ON public.webhooks FOR ALL USING (organization_id IN (SELECT get_user_orgs()));
CREATE POLICY "Users manage their org workflows" ON public.workflows FOR ALL USING (organization_id IN (SELECT get_user_orgs()));
CREATE POLICY "Users view their org processed emails" ON public.emails_processed FOR SELECT USING (organization_id IN (SELECT get_user_orgs()));
CREATE POLICY "Users view their org subscriptions" ON public.subscriptions FOR SELECT USING (organization_id IN (SELECT get_user_orgs()));
