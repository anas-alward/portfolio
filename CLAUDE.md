# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **dev**: `bun run dev` - Start Vite development server
- **build**: `bun run build` - Build for production (Vite + TypeScript type checking)
- **lint**: `bun run lint` - Run ESLint
- **preview**: `bun run preview` - Preview production build locally
- **deploy**: `bun run deploy` - Build and deploy to Cloudflare Pages via Wrangler
- **cf-typegen**: `bun run cf-typegen` - Generate TypeScript types for Cloudflare Workers bindings

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
├── context/            # React providers (ThemeContext, PreloaderContext)
├── lib/                # Utilities (storage helpers for Supabase URLs)
├── routes/             # TanStack Router configuration
│   ├── __root.tsx      # Root route with layout, metadata, providers
│   ├── index.tsx       # Home page route
│   └── [feature]/      # Feature-specific routes (projects, work, etc.)
├── types/              # TypeScript interfaces for Supabase data
├── router.tsx          # Router entry point (if used)
├── vite-env.d.ts       # Vite TypeScript declarations
└── index.css           # Tailwind CSS base styles
```

## Key Technologies

- **React 19** with **React Router** via TanStack Router
- **Vite** as build tool
- **Tailwind CSS 4** for styling
- **Three.js** + `@react-three/fiber` for 3D hero section
- **Framer Motion** for animations
- **Supabase** as backend (PostgreSQL + Storage)
- **TanStack Query v5** for data fetching and caching
- **Lucide React** for icons
- **TypeScript** for type safety

## Supabase Integration

Environment variables (in `.env`):
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anon key
- `VITE_USER_ID`: UUID of the profile row in Supabase (used to fetch user-specific data)
- `VITE_BASE_URL`: Base URL for the site (used in metadata)

Data fetching patterns:
- API functions live in `src/features/[feature]/api.ts` (e.g., `fetchProjects`, `fetchWorkExperience`)
- Use `useQuery` from TanStack Query with stable keys
- Storage URLs are built via `getStorageUrl` from `src/lib/storage.ts`

## Development Notes

- The root route (`src/routes/__root.tsx`) provides:
  - ThemeProvider (light/dark mode)
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
  - Update corresponding TypeScript interfaces in `src/types/`
  - Adjust API functions to match new fields
  - Ensure environment variables are set for any new secrets

- **Styling**: 
  - Use Tailwind utility classes directly
  - For custom CSS, edit `src/index.css` or use `@layer` directives
  - Dark mode is handled via ThemeContext (toggle updates `class` on `<html>`)
