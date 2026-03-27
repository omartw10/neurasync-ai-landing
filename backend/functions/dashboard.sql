-- ==========================================
-- NEURASYNC AI — Dashboard RPC Functions
-- Run after: 03-triggers.sql
-- ==========================================

-- ==========================================
-- Access Code Validation
-- ==========================================

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

-- ==========================================
-- Email Data Access
-- ==========================================

CREATE OR REPLACE FUNCTION public.get_emails_by_org(org_id uuid, input_code TEXT)
RETURNS SETOF public.emails_processed
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
BEGIN
  -- Verify the access code is valid AND belongs to this specific organization
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

-- ==========================================
-- Organization Info
-- ==========================================

CREATE OR REPLACE FUNCTION public.get_org_by_id(org_id uuid, input_code TEXT)
RETURNS SETOF public.organizations
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
BEGIN
  -- Verify the access code is valid AND belongs to this specific organization
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

-- ==========================================
-- Permissions
-- ==========================================

-- Grant anon access for public dashboard operations
GRANT EXECUTE ON FUNCTION public.validate_access_code(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.get_emails_by_org(UUID, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.get_org_by_id(UUID, TEXT) TO anon;

-- Grant authenticated access for logged-in users
GRANT EXECUTE ON FUNCTION public.validate_access_code(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_emails_by_org(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_org_by_id(UUID, TEXT) TO authenticated;