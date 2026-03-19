-- ==========================================
-- NEURASYNC AI — Dashboard RPC Functions
-- Run this in Supabase SQL Editor
-- These functions bypass RLS using SECURITY DEFINER
-- so the dashboard can read data with the anon key
-- ==========================================

-- 1. Get emails by organization_id
CREATE OR REPLACE FUNCTION public.get_emails_by_org(org_id UUID)
RETURNS SETOF public.emails_processed
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT * FROM emails_processed
  WHERE organization_id = org_id
  ORDER BY created_at DESC;
$$;

-- 2. Get organization info
CREATE OR REPLACE FUNCTION public.get_org_by_id(org_id UUID)
RETURNS TABLE(id UUID, name TEXT)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT id, name FROM organizations WHERE id = org_id LIMIT 1;
$$;

-- 3. Grant anon execute permission
GRANT EXECUTE ON FUNCTION public.get_emails_by_org(UUID) TO anon;
GRANT EXECUTE ON FUNCTION public.get_org_by_id(UUID) TO anon;
