-- ==========================================
-- NEURASYNC AI — Safe Migration Script
-- Run this in Supabase SQL Editor to sync your database
-- ==========================================
-- This script is safe to run multiple times
-- It uses IF NOT EXISTS patterns
-- ==========================================

BEGIN;

-- ==========================================
-- 1. Create ENUM Types
-- ==========================================
DO $$
BEGIN
    CREATE TYPE role_type AS ENUM ('owner', 'admin', 'member');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$
BEGIN
    CREATE TYPE service_status AS ENUM ('active', 'inactive', 'suspended');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- ==========================================
-- 2. Tables
-- ==========================================
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.users (
    id UUID NOT NULL,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);

CREATE TABLE IF NOT EXISTS public.memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    organization_id UUID,
    role role_type NOT NULL DEFAULT 'owner',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT memberships_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
    CONSTRAINT memberships_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)
);

CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.organization_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID,
    service_id UUID,
    status service_status NOT NULL DEFAULT 'active',
    activated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT organization_services_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),
    CONSTRAINT organization_services_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id)
);

CREATE TABLE IF NOT EXISTS public.emails_processed (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID,
    sender TEXT,
    subject TEXT,
    category TEXT,
    priority TEXT,
    lead_score INTEGER,
    confidence INTEGER,
    route_to TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    source TEXT,
    summary TEXT,
    preview TEXT,
    sla_hours INTEGER CHECK (sla_hours IS NULL OR sla_hours >= 0),
    CONSTRAINT emails_processed_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)
);

-- Ensure all new columns exist in case the table was created before they were added
DO $$
BEGIN
    ALTER TABLE public.emails_processed ADD COLUMN IF NOT EXISTS source TEXT;
    ALTER TABLE public.emails_processed ADD COLUMN IF NOT EXISTS summary TEXT;
    ALTER TABLE public.emails_processed ADD COLUMN IF NOT EXISTS preview TEXT;
    ALTER TABLE public.emails_processed ADD COLUMN IF NOT EXISTS route_to TEXT;
    ALTER TABLE public.emails_processed ADD COLUMN IF NOT EXISTS sla_hours INTEGER CHECK (sla_hours IS NULL OR sla_hours >= 0);
EXCEPTION
    WHEN duplicate_column THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.access_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    organization_id UUID NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    expires_at TIMESTAMPTZ NOT NULL,
    label TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT access_codes_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)
);

-- ==========================================
-- 3. RLS
-- ==========================================
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emails_processed ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.access_codes ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 4. Helper
-- ==========================================
CREATE OR REPLACE FUNCTION get_user_orgs()
RETURNS SETOF UUID
LANGUAGE sql SECURITY DEFINER SET search_path = public
AS $$
    -- Explicitly bypass RLS internally for this function by not relying on the calling user's context inside the query
    -- This relies on SECURITY DEFINER acting as the function owner.
    SELECT organization_id FROM memberships WHERE user_id = auth.uid();
$$;

-- ==========================================
-- 5. Policies
-- ==========================================
CREATE POLICY IF NOT EXISTS "Users view own profile"
ON public.users FOR SELECT USING (id = auth.uid());

CREATE POLICY IF NOT EXISTS "Users view orgs"
ON public.organizations FOR SELECT USING (id IN (SELECT get_user_orgs()));

CREATE POLICY IF NOT EXISTS "Users view emails"
ON public.emails_processed FOR SELECT USING (organization_id IN (SELECT get_user_orgs()));

-- SECURITY: No anon SELECT policy on access_codes.
-- All access code validation MUST go through the validate_access_code RPC.

-- ==========================================
-- 6. RPC
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

-- ==========================================
-- 7. Permissions
-- ==========================================
GRANT EXECUTE ON FUNCTION public.validate_access_code(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.validate_access_code(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_org_by_id(UUID, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.get_org_by_id(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_emails_by_org(UUID, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.get_emails_by_org(UUID, TEXT) TO authenticated;

COMMIT;