-- ==========================================
-- NEURASYNC AI — Database Schema (Current Working Version)
-- ==========================================

-- 1. تفعيل الإضافات الضرورية (Extensions)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Types (Required for the schema below)
DO $$ BEGIN
    CREATE TYPE role_type AS ENUM ('owner', 'admin', 'member');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE service_status AS ENUM ('active', 'inactive', 'suspended');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. الجداول الأساسية (التي لا تعتمد على غيرها)
CREATE TABLE public.organizations (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT organizations_pkey PRIMARY KEY (id)
);

CREATE TABLE public.services (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT services_pkey PRIMARY KEY (id)
);

CREATE TABLE public.users (
  id uuid NOT NULL,
  email text NOT NULL UNIQUE,
  full_name text,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);

-- 3. الجداول التي تعتمد على الجداول أعلاه (Foreign Keys)
CREATE TABLE public.access_codes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  organization_id uuid NOT NULL,
  is_active boolean NOT NULL DEFAULT true,
  expires_at timestamp with time zone NOT NULL,
  label text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT access_codes_pkey PRIMARY KEY (id),
  CONSTRAINT access_codes_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)
);

CREATE TABLE public.api_keys (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  organization_id uuid,
  name text NOT NULL,
  key_hash text NOT NULL,
  last_used_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT api_keys_pkey PRIMARY KEY (id),
  CONSTRAINT api_keys_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)
);

CREATE TABLE public.audit_logs (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  organization_id uuid,
  user_id uuid,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  details jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT audit_logs_pkey PRIMARY KEY (id),
  CONSTRAINT audit_logs_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),
  CONSTRAINT audit_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

CREATE TABLE public.automation_events (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  organization_id uuid,
  service_id uuid,
  event_type text NOT NULL,
  payload jsonb DEFAULT '{}'::jsonb,
  status text DEFAULT 'success'::text,
  executed_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT automation_events_pkey PRIMARY KEY (id),
  CONSTRAINT automation_events_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),
  CONSTRAINT automation_events_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id)
);

CREATE TABLE public.emails_processed (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  organization_id uuid,
  sender text,
  subject text,
  category text,
  priority text,
  lead_score integer,
  confidence integer,
  route_to text,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  source text,
  summary text,
  preview text,
  sla_hours integer CHECK (sla_hours IS NULL OR sla_hours >= 0),
  CONSTRAINT emails_processed_pkey PRIMARY KEY (id),
  CONSTRAINT emails_processed_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)
);

CREATE TABLE public.integrations (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  organization_id uuid,
  provider text NOT NULL,
  credentials jsonb NOT NULL,
  status service_status NOT NULL DEFAULT 'active'::service_status,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  service_id uuid,
  external_identifier text,
  name text,
  CONSTRAINT integrations_pkey PRIMARY KEY (id),
  CONSTRAINT integrations_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),
  CONSTRAINT integrations_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id)
);

CREATE TABLE public.memberships (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid,
  organization_id uuid,
  role role_type NOT NULL DEFAULT 'owner'::role_type,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT memberships_pkey PRIMARY KEY (id),
  CONSTRAINT memberships_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT memberships_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)
);

CREATE TABLE public.organization_services (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  organization_id uuid,
  service_id uuid,
  status service_status NOT NULL DEFAULT 'active'::service_status,
  activated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT organization_services_pkey PRIMARY KEY (id),
  CONSTRAINT organization_services_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id),
  CONSTRAINT organization_services_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id)
);

CREATE TABLE public.subscriptions (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  organization_id uuid UNIQUE,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan_tier text NOT NULL DEFAULT 'free'::text,
  status text NOT NULL DEFAULT 'active'::text,
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT subscriptions_pkey PRIMARY KEY (id),
  CONSTRAINT subscriptions_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)
);

CREATE TABLE public.usage_metrics (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  organization_id uuid,
  metric_name text NOT NULL,
  value integer NOT NULL DEFAULT 0,
  recorded_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT usage_metrics_pkey PRIMARY KEY (id),
  CONSTRAINT usage_metrics_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)
);

CREATE TABLE public.webhooks (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  organization_id uuid,
  name text,
  event_types text[] NOT NULL,
  endpoint_url text NOT NULL,
  secret text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT webhooks_pkey PRIMARY KEY (id),
  CONSTRAINT webhooks_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)
);

CREATE TABLE public.workflows (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  organization_id uuid,
  name text NOT NULL,
  n8n_workflow_id text,
  status service_status NOT NULL DEFAULT 'active'::service_status,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT workflows_pkey PRIMARY KEY (id),
  CONSTRAINT workflows_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id)
);