-- ==========================================
-- NEURASYNC AI — Dashboard RPC Functions
-- Run this in Supabase SQL Editor
-- ==========================================

-- 1. Get emails by organization_id
CREATE OR REPLACE FUNCTION public.get_emails_by_org(org_id UUID)
RETURNS SETOF public.emails_processed
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM organizations WHERE id = org_id)
  THEN RAISE EXCEPTION 'Not authorized'; END IF;

  RETURN QUERY
  SELECT * FROM emails_processed
  WHERE organization_id = org_id
  ORDER BY created_at DESC;
END;
$$;

-- 2. Get organization info
CREATE OR REPLACE FUNCTION public.get_org_by_id(org_id UUID)
RETURNS TABLE(id UUID, name TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM organizations WHERE id = org_id)
  THEN RAISE EXCEPTION 'Not authorized'; END IF;

  RETURN QUERY
  SELECT organizations.id, organizations.name
  FROM organizations
  WHERE organizations.id = org_id
  LIMIT 1;
END;
$$;

-- 3. Grant anon execute permission
GRANT EXECUTE ON FUNCTION public.get_emails_by_org(UUID) TO anon;
GRANT EXECUTE ON FUNCTION public.get_org_by_id(UUID) TO anon;
GRANT EXECUTE ON FUNCTION public.validate_access_code(TEXT) TO anon;
