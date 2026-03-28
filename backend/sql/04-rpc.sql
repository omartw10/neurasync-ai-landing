-- ==========================================
-- NEURASYNC AI — RPC Functions (Dashboard)
-- Run after: 03-triggers.sql
-- ==========================================

-- 1. validate_access_code
-- Used by: /dashboard/login to verify the entry code
CREATE OR REPLACE FUNCTION public.validate_access_code(input_code TEXT)
RETURNS SETOF public.access_codes
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM public.access_codes
  WHERE code = input_code
  AND is_active = true
  AND expires_at > now();
END;
$$;

-- 2. get_emails_by_org
-- Used by: /dashboard/inboxpilot to fetch recent analytics
CREATE OR REPLACE FUNCTION public.get_emails_by_org(org_id uuid, input_code TEXT)
RETURNS SETOF public.emails_processed
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM access_codes
    WHERE code = input_code
    AND organization_id = org_id
    AND is_active = true
    AND expires_at > now()
  ) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  RETURN QUERY
  SELECT * FROM emails_processed
  WHERE organization_id = org_id
  ORDER BY created_at DESC
  LIMIT 500;
END;
$$;

-- 3. get_org_by_id
-- Used by: AuthContext to retrieve tenant metadata on restore
CREATE OR REPLACE FUNCTION public.get_org_by_id(org_id uuid, input_code TEXT)
RETURNS SETOF public.organizations
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM access_codes
    WHERE code = input_code
    AND organization_id = org_id
    AND is_active = true
    AND expires_at > now()
  ) THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;

  RETURN QUERY
  SELECT * FROM organizations WHERE id = org_id;
END;
$$;

-- 4. Permissions
GRANT EXECUTE ON FUNCTION public.validate_access_code(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_org_by_id(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_emails_by_org(UUID, TEXT) TO authenticated;

-- Optional: If using the old dashboard with direct anon access (NOT recommended for GitHub upload)
-- GRANT EXECUTE ON FUNCTION public.validate_access_code(TEXT) TO anon;
-- GRANT EXECUTE ON FUNCTION public.get_org_by_id(UUID, TEXT) TO anon;
-- GRANT EXECUTE ON FUNCTION public.get_emails_by_org(UUID, TEXT) TO anon;
