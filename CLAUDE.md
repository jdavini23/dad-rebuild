# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server (Vite)
npm run build      # production build → emits .vercel/output/ (Vercel preset)
npm run lint       # ESLint
npm run format     # Prettier
```

There are no tests in this project.

## Architecture

**Stack:** TanStack Start (SSR) + React 19 + Tailwind CSS v4 + shadcn/ui, deployed to Vercel via Nitro.

**Build pipeline:** `vite build` → Nitro with the Vercel preset → `.vercel/output/` (Build Output API v3). The config in `vite.config.ts` uses `@lovable.dev/vite-tanstack-config`, which bundles TanStack Start, Vite React, Tailwind, and Nitro — do not add those plugins manually or the build will break with duplicates.

**Routing:** File-based via TanStack Router. All routes live in `src/routes/`. `routeTree.gen.ts` is auto-generated — never edit it by hand. The root layout is `src/routes/__root.tsx`; it provides `QueryClientProvider` and the HTML shell. See `src/routes/README.md` for file-to-URL conventions.

**Path alias:** `@/` maps to `src/`.

**Server functions:** Use `createServerFn` from `@tanstack/react-start` (see `src/lib/api/example.functions.ts`). The handler body is server-only; module-level code still ships to the client. For truly server-only helpers, put them in a `.server.ts` file.

## Application

"The Depleted Dad Diagnostic" — a 12-question quiz that scores users into one of four depletion archetypes (ghost, engine, bouncer, sleeper) and emails them a 14-day rebuild protocol via ConvertKit.

**Key files:**
- `src/lib/quiz-data.ts` — all quiz questions, result copy, scoring logic (`computeScores`, `computeResult`), and the ConvertKit webhook URL (`CONVERTKIT_WEBHOOK_URL` — replace `REPLACE_ME` with the real form ID before going live).
- `src/routes/quiz.tsx` — full quiz flow: question screens → email capture → result screen. State machine driven by `step: number | "email" | "result"`.
- `src/routes/index.tsx` — landing page with CTA linking to `/quiz`.

**Design system:** Dark-only, no light mode. Font is Space Grotesk (Google Fonts). Accent color is an orange oklch value (`--accent`). Border-radius is minimal (0–4px). All tokens are defined as CSS custom properties in `src/styles.css`. The `.rise` / `.rise-N` CSS classes add staggered fade-in-up animations to page elements.
