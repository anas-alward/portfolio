# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **dev**: `bun run dev` - Start Vite development server
- **build**: `bun run build` - Build for production (Vite + TypeScript type checking)
- **lint**: `bun run lint` - Run ESLint
- **preview**: `bun run preview` - Preview production build locally
- **deploy**: `bun run deploy` - Build and deploy to Cloudflare Workers via Wrangler
- **cf-typegen**: `bun run cf-typegen` - Generate TypeScript types for Cloudflare Workers bindings
- **db:new / db:push / db:pull / db:list / db:reset** - Supabase schema migration commands (see "Supabase Integration")

## Project Structure

```
src/
├── components/         # Reusable UI components (e.g., buttons, cards, modals)
├── features/           # Feature modules (home, projects, work, education, etc.)
│   ├── home/           # Landing page, metadata, SEO
│   ├── projects/       # Projects section (Supabase-driven)
│   ├── work/           # Work experience section
│   ├── education/      # Education section
│   ├── skills/         # Skills section
│   ├── testimonial/    # Testimonials section
│   ├── certificates/   # Certificates section
│   └── achievements/   # Achievements section
├── hooks/              # Custom React hooks (e.g., useSupabaseQuery)
├── context/            # React providers (PreloaderContext)
├── lib/                # Utilities (storage helpers for Supabase URLs)
├── routes/             # TanStack Router configuration
│   ├── __root.tsx      # Root route with layout, metadata, providers
│   ├── index.tsx       # Home page route
│   └── [feature]/      # Feature-specific routes (projects, work, etc.)
├── supabase/           # Supabase CLI project (schema-as-code)
│   ├── config.toml     # Local development configuration
│   └── migrations/     # Versioned SQL migrations - source of truth for the DB schema
├── types/              # TypeScript interfaces for Supabase data
├── router.tsx          # Router entry point (if used)
├── vite-env.d.ts       # Vite TypeScript declarations
└── index.css           # Tailwind CSS base styles
```

## Key Technologies

- **React 19** with **React Router** via TanStack Router
- **Vite** as build tool
- **Tailwind CSS 4** for styling
- **Framer Motion** for animations
- **Supabase** as backend (PostgreSQL + Storage)
- **TanStack Query v5** for data fetching and caching
- **Lucide React** for icons
- **TypeScript** for type safety

## Supabase Integration

Environment variables (in `.env`):
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anon key
- `VITE_SUPABASE_USER_ID`: UUID of the profile row in Supabase (used to fetch user-specific data)
- `VITE_SUPABASE_STORAGE_BUCKET`: Public storage bucket name used to build image URLs

Data fetching patterns:
- API functions live in `src/features/[feature]/api.ts` (e.g., `fetchProjects`, `fetchWorkExperience`)
- Use `useQuery` from TanStack Query with stable keys
- Storage URLs are built via `getStorageUrl` from `src/lib/storage.ts`

### Database schema (migrations)

Schema changes are version-controlled in `supabase/migrations/` (standard Supabase CLI workflow). **Do not change the schema only via the Dashboard** — always create a migration file so the change is tracked.

- `supabase/migrations/20261027152028_remote_schema.sql` is the baseline capturing the full pre-existing schema (originally built in the Dashboard). It is already recorded as applied in `supabase_migrations.schema_migrations`, so it will not be re-applied.

**Option A — Supabase CLI (standard):** one-time setup: `bunx supabase login` and `bunx supabase link --project-ref wiztpuhcysldvryjndaz` (needs your database password). Then:

1. `bun run db:new <name>` → creates `supabase/migrations/<timestamp>_<name>.sql`
2. Write the DDL in that file
3. `bun run db:push` → applies it to the remote project
4. `bun run db:list` → verifies local files match the remote migration history

**Option B — Supabase MCP (no login needed):** apply the SQL with `apply_migration`, then save the same SQL to `supabase/migrations/<version>_<name>.sql`, where `<version>` is the timestamp reported by `list_migrations` immediately after applying. The file timestamp and the history version must match — otherwise a later `db push` will try to re-apply the migration.

Local development: `supabase start` + `bun run db:reset` rebuilds a local database from `supabase/migrations/`.

## Development Notes

- The root route (`src/routes/__root.tsx`) provides:
  - PreloaderProvider (loading state for assets)
  - QueryClient (Tanstack Query)
  - Dynamic metadata and OpenGraph tags from Supabase
- Components are organized by feature; shared components live in `src/components/`
- No test framework is configured; testing is manual via browser
- Linting uses ESLint with React Hooks and Refresh plugins
- TypeScript is set to `~5.9.3` with `typescript-eslint`

## Common Tasks

- **Adding a new feature**: 
  1. Create a folder under `src/features/[name]`
  2. Add API functions in `api.ts` to fetch from Supabase
  3. Create route under `src/routes/[name]/` (or add to existing route tree)
  4. Build UI components in `src/features/[name]/components/` or reuse from `src/components/`
  5. Update types in `src/types/[name].ts` if needed

- **Modifying Supabase schema**: 
  1. Create a migration file: `bun run db:new <name>` (or add a `<timestamp>_<name>.sql` under `supabase/migrations/`)
  2. Write the DDL in the migration file
  3. Apply it: `bun run db:push` (CLI) or `apply_migration` via the Supabase MCP — see "Database schema (migrations)" above
  4. Update corresponding TypeScript interfaces in `src/types/`
  5. Adjust API functions to match new fields
  6. Ensure environment variables are set for any new secrets

- **Styling**: 
  - Use Tailwind utility classes directly
  - For custom CSS, edit `src/index.css` or use `@layer` directives
