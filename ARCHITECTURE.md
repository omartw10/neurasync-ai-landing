# NeuraSync AI Architecture

This document captures how the NeuraSync AI landing site and dashboard are organized so future contributors can navigate, extend, and maintain the system with confidence.

## 1. Project Structure at a Glance

- `package.json` / `vite.config.js` drive a Vite-powered React (`react@19`) SPA compiled via modern ESM (`type": "module"`).
- `src/main.jsx` boots the app, applies `index.css`, and renders `<App />` inside `<React.StrictMode>`.
- `src/App.jsx` wires global providers, smooth scrolling, and React Router v6 routes.
- `src/components/*`, `src/pages/*`, and `src/layouts/*` hold the UI, with dashboard-specific widgets isolated under `src/components/dashboard/`.
- Backend artifacts live under `backend/` (Supabase SQL schema, functions, workflow metadata), while `src/services/api.js` and `src/lib/supabase.js` encapsulate remote calls.

## 2. Frontend Flow & Layout

1. **Landing experience** (`Home`, `InboxPilot`, `About` pages + `Navbar`, `Footer`, CTAs) share the same `SmoothScroll` wrapper for smooth wheel behavior.
2. **Dashboard entry** is gated by `<CodeGate />`, which captures an access code, calls `AuthContext.login`, and routes successful users into `/dashboard`.
3. **Protected routes**: `<App />` renders `<ProtectedRoute>` around `<DashboardLayout />`, ensuring `AuthContext` signals (loading, validity) control access to `/dashboard` and `/dashboard/inboxpilot`.
4. **Dashboard UI** uses a responsive layout (`Sidebar`, `Topbar`, fluid grid container) with collapsed state, mobile overlay, and animated breadcrumbs.
5. **Widgets**: reusable `Card`, `Table`, and `Badge` components live in `src/components/dashboard/Widgets.jsx`, simplifying consistent styling across the multi-section dashboard.

## 3. Authentication & Access Control

- `src/context/AuthContext.jsx` houses the session state, stored in `sessionStorage`, and exposes `login`, `logout`, `isAuthenticated`, and helper metadata (organization name/id) via context.
- Access codes are validated through `validateAccessCode` + `fetchOrganization` in `src/services/api.js`, and stored sessions are revalidated against Supabase on load.
- `ProtectedRoute` relies on `useAuth()` to block unauthenticated access, while the sidebar’s logout button clears the session and re-routes to `/dashboard/login`.
- The Supabase client is built in `src/lib/supabase.js`, sourcing `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from the environment.

## 4. InboxPilot Dashboard Data Flow

1. `InboxPilotDashboard` fetches emails for `organizationId` using `fetchClientEmails`, then derives KPIs through `computeMetrics` in `src/services/api.js`.
2. `computeMetrics` returns pre-aggregated slices (weekly volume, category breakdown, priority/SLA/confidence banding, lead counts, routing data, top senders, recent emails). This keeps chart logic declarative inside the dashboard component.
3. The dashboard renders six sections: hero KPIs, charts (area/lead pipeline/pie/bar), top senders, activity list, paginated table, and a details modal. Shared utilities (`LeadChip`, `CustomTooltip`, `HBar`) keep the markup expressive and consistent.
4. Table filtering is derived from `metrics.categoriesBreakdown` and memoized with `useMemo`. Scroll locking ensures a smooth experience when interacting within the `/dashboard` viewport.

## 5. Backend & Supabase Schema

- `backend/database_schema.sql` defines tenant-aware tables: `organizations`, `users`, `memberships`, `services`, `organization_services`, `automation_events`, `audit_logs`, `usage_metrics`, `api_keys`, `integrations`, `webhooks`, `workflows`, `emails_processed`, `subscriptions`, and `access_codes`.
- Row-Level Security is enabled for every table, with helper policies (`get_user_orgs`) ensuring tenants only see their own records, while `access_codes`, `emails_processed`, `organizations`, and `automation_events` expose light `anon` policies for code validation and dashboard-level read access.
- `backend/dashboard_functions.sql` registers RPC functions (`get_emails_by_org`, `get_org_by_id`) and grants `anon` execute permissions so the frontend (only with the anon key) can consume the dashboard data safely.
- Trigger-based automation keeps the schema resilient: `handle_new_user` keeps `public.users` aligned to Supabase auth users, and `activate_default_service` ensures new orgs immediately get the `InboxPilot` service.

## 6. Operational Notes

- Keep `.env.local`/environment secrets out of source control; only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are required for local development.
- `npm run lint` targets ESLint, but Tailwind/Tre bundler ensures styles stay inline without additional build steps.
- Deployment follows `npm run build` > Vite, so anything that depends on generated assets (e.g., `dist/index.html`) should be treated as ephemeral.
- When onboarding product teams, point them to `CodeGate`, `AuthContext`, and `backend/database_schema.sql` for understanding how access codes map to Supabase data.

## 7. Next Steps for Contributors

1. Keep adding new dashboard sections via `widgets` to reuse styles.
2. Extend `computeMetrics` when supporting new email metadata fields (e.g., `sentiment`, `customerTier`).
3. Keep Supabase RPCs concise; only expose read-only data needed for the dashboard to keep the anon key safe.
