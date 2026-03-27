# NeuraSync AI Backend

Supabase database schema and functions for the NeuraSync AI platform.

## Structure

```
backend/
├── sql/
│   ├── 01-schema.sql     # Tables, types, seed data
│   ├── 02-policies.sql   # Row-level security (RLS) policies
│   └── 03-triggers.sql   # Database triggers
├── functions/
│   └── dashboard.sql     # RPC functions for dashboard access
└── workflows/
    └── inboxpilot.json   # n8n workflow export
```

## Deployment

### Option 1: Supabase Dashboard (Recommended)
1. Open your Supabase project
2. Go to **SQL Editor**
3. Run the files in order:
   ```
   01-schema.sql
   02-policies.sql
   03-triggers.sql
   dashboard.sql (from functions/)
   ```

### Option 2: Supabase CLI
```bash
supabase db push
```

## Notes

- The schema uses **Row-Level Security (RLS)** for tenant isolation
- Access codes allow public dashboard access without user authentication
- The `get_user_orgs()` helper function prevents RLS policy recursion
- All timestamps use UTC timezone