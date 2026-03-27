-- 1. Secure Functions (MUST BE SECURITY DEFINER)

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

-- 2. Required Grants
GRANT EXECUTE ON FUNCTION public.validate_access_code(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.validate_access_code(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_org_by_id(UUID, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.get_org_by_id(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_emails_by_org(UUID, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.get_emails_by_org(UUID, TEXT) TO authenticated;

-- 3. RLS Policies Strict Rule
-- There must be NO SELECT policy for `access_codes` available to `anon` or `public`.
-- Any policy like: CREATE POLICY "Anyone can validate access codes" ON public.access_codes FOR SELECT TO anon USING (true); MUST BE DELETED.