# AI-Powered Multi-Tenant Static Website Builder

## Monorepo Structure
- `apps/dashboard`: Next.js 16 dashboard, editor, and API routes.
- `apps/api`: Node.js TypeScript service layer for domain, AI and build orchestration.
- `apps/workers`: Cloudflare Workers for lead capture and domain verification cron tasks.
- `packages/schema`: Shared website schema + Zod validation + AI prompt guardrails.
- `packages/build-engine`: Static site generator from validated schema.
- `packages/utils`: Shared security, encryption, sanitization, and upload utilities.
- `prisma`: Prisma schema + RLS SQL policies.

## Required Environment Variables
```bash
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_SERVICE_ROLE_KEY=...
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-4.1
CLOUDFLARE_API_TOKEN=...
CLOUDFLARE_ACCOUNT_ID=...
CLOUDFLARE_PAGES_PROJECT=...
R2_BUCKET=...
LEAD_ENCRYPTION_KEY=<64 hex chars>
IP_HASH_SALT=<random salt>
JWT_SECRET=...
```

## Security Notes
- RLS policies require setting `app.current_tenant_id` per request/transaction.
- AI output is schema-only and validated with Zod before save/build.
- Static preview uses sandboxed iframe + CSP + blocked scripts.
- Leads store encrypted personal fields and hashed IP.

## Missing-but-generated components
This scaffold includes generated placeholders for:
- Cloudflare Pages deployment triggers.
- Supabase DB inserts from Worker/API.
- Domain status revalidation cron hook (`wrangler.toml` cron).

Replace TODO placeholders with provider SDK calls in production.
