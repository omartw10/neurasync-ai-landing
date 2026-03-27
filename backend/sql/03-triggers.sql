-- ==========================================
-- NEURASYNC AI — Database Triggers
-- Run after: 02-policies.sql
-- ==========================================

-- ==========================================
-- User Auto-Creation Trigger
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
-- Default Service Activation Trigger
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