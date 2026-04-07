# Story E1-DT1: Project Architecture Scaffold

Status: done

> **Dev task — not a user story.** No user-facing value. Excluded from sprint velocity.
> Purpose: Bootstrap the full monorepo and establish the frontend clean architecture layers that all future stories build upon. There is no meaningful story statement — this is pure technical foundation work.

---

## Objective

Bootstrap the `dentiflow/` monorepo with pnpm + Turborepo, initialize the Next.js frontend app with a strict clean architecture folder layout, set up shared package skeletons, configure i18n with `[locale]` route segments, and validate the whole setup with a passing lint/type-check and a running role-neutral landing + health route.

---

## Definition of Done

- [x] `pnpm-workspace.yaml` and `turbo.json` exist at the monorepo root.
- [x] `apps/frontend/` is a Next.js 15+ App Router project (TypeScript, strict, Tailwind v4, `src/` dir, `@/*` alias).
- [x] Frontend `src/` contains: `app/`, `domain/`, `application/`, `infrastructure/`, `presentation/`, `shared/`.
- [x] `[locale]` route segment exists (`src/app/[locale]/`) with `layout.tsx` and `page.tsx`.
- [x] Supported locales: `ar`, `fr`, `en`. Default locale: `fr`.
- [x] Role route stubs exist under `[locale]/`: `patient/`, `secretary/`, `doctor/`, `assistant/`, `admin/`.
- [x] NextAuth route handler exists at `src/app/api/auth/[...nextauth]/route.ts` (shell only, wired up in E1-S3).
- [x] Health route exists at `src/app/api/health/route.ts` returning `{ status: "ok" }`.
- [x] Shared package skeletons exist: `packages/proto/`, `packages/shared-types/`, `packages/shared-events/`, `packages/shared-db/`, `packages/shared-logger/`, `packages/shared-config/`.
- [x] `pnpm lint` and `pnpm type-check` pass with zero errors.
- [x] `pnpm dev` starts the frontend and the landing page renders at `http://localhost:3000/fr`.

---

## Tasks / Subtasks

- [x] **Task 1 — Monorepo root bootstrap** (AC: DoD items 1, 13)
  - [x] Create `package.json` at root with `"private": true` and pnpm workspace scripts (`dev`, `build`, `lint`, `type-check`, `test`).
  - [x] Create `pnpm-workspace.yaml` declaring `apps/*` and `packages/*`.
  - [x] Create `turbo.json` with pipeline tasks: `build`, `lint`, `type-check`, `test`.
  - [x] Create `.gitignore`, `.editorconfig`, `.env.example`.
  - [x] Create root `tsconfig/` package with `base.json` shared config (strict, `ESNext`, `bundler` module resolution).
  - [x] Create root `eslint-config/` package with shared rule set.

- [x] **Task 2 — Initialize Next.js frontend** (AC: DoD items 2–3)
  - [x] Run init command inside `apps/frontend/`:
    ```bash
    npm create next-app@latest . --typescript --eslint --tailwind --app --src-dir --import-alias "@/*"
    ```
  - [x] Upgrade to Next.js 15+ if scaffolded version is older (check `package.json`).
  - [x] Configure `tsconfig.json` to extend root `@dentiflow/tsconfig/base.json`; enable `strict: true`.
  - [x] Configure `eslint.config.mjs` to extend root shared ESLint config.
  - [x] Configure Tailwind v4 — confirm `postcss.config.mjs` is correct.

- [x] **Task 3 — Clean architecture folder layout** (AC: DoD item 3)
  - [x] Create `src/domain/entities/`, `src/domain/value-objects/`, `src/domain/services/` (each with `.gitkeep`).
  - [x] Create `src/application/use-cases/`, `src/application/ports/`, `src/application/dto/` (each with `.gitkeep`).
  - [x] Create `src/infrastructure/api/`, `src/infrastructure/sse/`, `src/infrastructure/auth/`, `src/infrastructure/storage/`, `src/infrastructure/mappers/` (each with `.gitkeep`).
  - [x] Create `src/presentation/components/`, `src/presentation/hooks/`, `src/presentation/view-models/` (each with `.gitkeep`).
  - [x] Create `src/shared/constants/`, `src/shared/utils/`, `src/shared/styles/`, `src/shared/i18n/`, `src/shared/types/` (each with `.gitkeep`).
  - [x] **Verify**: no file outside `src/app/` imports from `src/app/`; `domain/` and `application/` have zero React/Next.js imports (enforced by ESLint no-restricted-imports rule targeting those paths).

- [x] **Task 4 — i18n setup with next-intl** (AC: DoD items 4–5)
  - [x] Add `next-intl` package to `apps/frontend`.
  - [x] Create `src/shared/i18n/routing.ts` declaring supported locales (`ar`, `fr`, `en`) and default locale (`fr`).
  - [x] Create `src/shared/i18n/request.ts` for per-request locale context (next-intl convention).
  - [x] Create `middleware.ts` at `src/` root using `createNavigation` + locale matcher from next-intl.
  - [x] Create placeholder message files: `messages/ar.json`, `messages/fr.json`, `messages/en.json` with a single `{ "app.title": "DentilFlow" }` key each.
  - [x] Create `src/app/[locale]/layout.tsx` — sets `lang` and `dir` attributes on `<html>` based on locale param (`ar` → `dir="rtl"`, others → `dir="ltr"`).
  - [x] Create `src/app/[locale]/page.tsx` — role-neutral landing stub (locale switcher + sign-in link).

- [x] **Task 5 — Role route stubs** (AC: DoD item 6)
  - [x] Create `src/app/[locale]/patient/page.tsx` — stub returning `<div>Patient shell</div>`.
  - [x] Create `src/app/[locale]/secretary/page.tsx` — stub.
  - [x] Create `src/app/[locale]/doctor/page.tsx` — stub.
  - [x] Create `src/app/[locale]/assistant/page.tsx` — stub.
  - [x] Create `src/app/[locale]/admin/page.tsx` — stub.

- [x] **Task 6 — NextAuth shell** (AC: DoD item 7)
  - [x] Add `next-auth@4` to `apps/frontend`.
  - [x] Create `src/app/api/auth/[...nextauth]/route.ts` as a minimal shell (empty `providers: []`; full providers wired in E1-S3).
  - [x] **CRITICAL**: path is exactly `src/app/api/auth/[...nextauth]/route.ts` — do NOT rename or move.

- [x] **Task 7 — Health route** (AC: DoD item 8)
  - [x] Create `src/app/api/health/route.ts` returning `Response.json({ status: "ok" })` on `GET`.

- [x] **Task 8 — Shared packages skeleton** (AC: DoD item 9)
  - [x] Create each package directory under `packages/` with a minimal `package.json` (`name`, `version: 0.1.0`, `private: true`).
  - [x] `packages/shared-events/`: add `src/subjects.ts` (empty export `{}` stub), `src/envelope.ts` (empty stub), `src/schemas/` (.gitkeep).
  - [x] `packages/proto/`: add placeholder `.proto` files for each service (auth, clinic, appointment, queue, treatment, checkout, patient) — stub only, real definitions in later epics.
  - [x] `packages/shared-types/`, `packages/shared-db/`, `packages/shared-logger/`, `packages/shared-config/`: each with `src/index.ts` that re-exports `{}`.

- [x] **Task 9 — Lint and type-check pass** (AC: DoD items 10–11)
  - [x] Resolve all ESLint errors; add no-restricted-imports rule preventing `react`/`next` imports in `src/domain/**` and `src/application/**`.
  - [x] Run `pnpm type-check` from monorepo root; resolve all TypeScript errors.
  - [x] Run `pnpm lint` from monorepo root; ensure zero errors.

- [x] **Task 10 — Smoke test** (AC: DoD item 12)
  - [x] Run `pnpm dev` and verify `http://localhost:3000/fr` renders the landing page.
  - [x] Verify `http://localhost:3000/api/health` returns `{ "status": "ok" }`.
  - [x] Verify direct access to `http://localhost:3000` redirects to `/fr` (next-intl default locale redirect).

---

## Dev Notes

### Architecture Layer Boundaries (Critical — Violations Will Break All Future Stories)

Dependency direction is **strictly inward**:

```
app/ → presentation/ → application/ → domain/
infrastructure/ → application/ → domain/
```

- `domain/` and `application/` must contain **zero** React, Next.js, or Axios imports — a linting rule must enforce this.
- `app/` only contains Next.js adapter files (`layout.tsx`, `page.tsx`, route handlers). No business logic.
- API calls, SSE adapters, Axios clients go in `infrastructure/` only.
- Zustand stores go in `presentation/` or `application/` (not `domain/`).
- **NEVER** move `src/app/api/auth/[...nextauth]/route.ts` — Next.js discovery depends on this exact path.

### Locale and RTL/LTR Wiring

- `[locale]/layout.tsx` sets `lang` and `dir` on `<html>`:
  ```tsx
  // locale === 'ar' → dir="rtl"; locale === 'fr' | 'en' → dir="ltr"
  <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
  ```
- This is the **only** correct place to set document direction — never set `dir` on a child component.
- MUI dual-cache for RTL/LTR is wired in **E1-DT2** (not this task). For now, direction is set structurally.
- Use **logical CSS utilities** only in directional layouts (`ms`, `me`, `ps`, `pe`, `gap-*`) — never physical (`ml`, `mr`, `pl`, `pr`, `space-x-*`). ESLint rule should flag `space-x-`.

### Initialization Command

```bash
# From apps/frontend/
npm create next-app@latest . --typescript --eslint --tailwind --app --src-dir --import-alias "@/*"
```

- Then convert to workspace package by updating `package.json` name to `@dentiflow/frontend`.
- Tailwind must be v4 (check generated version matches project requirement).

### pnpm Workspace Layout

```text
dentiflow/
├── package.json               # root — scripts only, private: true
├── pnpm-workspace.yaml        # apps/* and packages/*
├── turbo.json
├── apps/
│   └── frontend/              # @dentiflow/frontend
├── packages/
│   ├── proto/                 # @dentiflow/proto
│   ├── shared-types/          # @dentiflow/shared-types
│   ├── shared-events/         # @dentiflow/shared-events
│   ├── shared-db/             # @dentiflow/shared-db
│   ├── shared-logger/         # @dentiflow/shared-logger
│   ├── shared-config/         # @dentiflow/shared-config
│   ├── eslint-config/         # @dentiflow/eslint-config
│   └── tsconfig/              # @dentiflow/tsconfig
```

### No-Restricted-Imports ESLint Rule (Boundary Enforcement)

Add to `eslint.config.mjs` for the frontend:

```js
// Prevent framework imports leaking into pure layers
{
  files: ['src/domain/**', 'src/application/**'],
  rules: {
    'no-restricted-imports': ['error', {
      patterns: ['react', 'next', 'axios', '@mui/*', 'zustand']
    }]
  }
}
```

### Health Route Implementation

```ts
// src/app/api/health/route.ts
import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ status: "ok" });
}
```

### NextAuth Shell (Minimal — Full Wiring in E1-S3)

```ts
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
const handler = NextAuth({ providers: [] });
export { handler as GET, handler as POST };
```

### Project Structure Notes

- This task bootstraps the **entire monorepo root** — the workspace we are in (`dentilflow-frontend`) is the monorepo root. All future service scaffolding (backend microservices) will be added as new `apps/*` directories.
- The frontend app lives at `apps/frontend/` — source of truth for all frontend clean architecture layers.
- Shared packages in `packages/` are stubs only at this stage — they will be fleshed out as needed by later epics.
- The `docs/` folder at the monorepo root is for planning/implementation artifacts only — it is not served by the app.

### Detected Conflicts / Variances

- Architecture references the monorepo root as `dentiflow/` (single `l`, no `n`). The actual workspace folder is `dentilflow-frontend`. Use the actual path; do not try to rename the folder.
- Architecture references `React Query (TanStack Query)` in the process patterns section; however, **project-context.md§4 explicitly overrides this**: Zustand is used for ALL state — no React Query. Follow project-context.md.

### References

- [Source: docs/planning-artifacts/architecture.md#Starter Template Evaluation] — initialization command and template rationale
- [Source: docs/planning-artifacts/architecture.md#Frontend Architecture] — clean architecture layer definitions
- [Source: docs/planning-artifacts/architecture.md#Complete Project Directory Structure] — full monorepo layout
- [Source: docs/planning-artifacts/architecture.md#Pre-Architecture Locked Decisions§1] — RTL/LTR `dir` strategy
- [Source: docs/project-context.md§3] — Frontend Clean Architecture layer boundaries
- [Source: docs/project-context.md§4] — Zustand replaces React Query (overrides architecture doc)
- [Source: docs/project-context.md§1] — RTL/LTR dual Emotion cache (set up in E1-DT2, not here)
- [Source: docs/planning-artifacts/epics-and-stories.md#Epic E1 Dev Task E1-DT1] — definition of done

---

## Dev Agent Record

### Agent Model Used

Gemini 3.1 Pro (Preview)

### Debug Log References

- Scaffolded the frontend using `npx create-next-app`
- Forced move of `app/` into `src/` to fix Next.js root layout issue
- Used pnpm workspace configurations
- Linting configured with `no-restricted-imports` applied
- Configured next-intl

### Completion Notes List

- Repaired the `app/` folder resolution since Next.js default CLI didn't place it correctly given the options.
- The `no-restricted-imports` is added correctly in the ESLint config
- Smoke test: Root route redirected correctly and UI rendered correctly.
- Smoke test: `/api/health` returned 200 with `{ "status": "ok" }`.

### File List

- `package.json`
- `pnpm-workspace.yaml`
- `turbo.json`
- `.gitignore`
- `.editorconfig`
- `.env.example`
- `packages/tsconfig/package.json`
- `packages/tsconfig/base.json`
- `packages/tsconfig/nextjs.json`
- `packages/eslint-config/package.json`
- `packages/eslint-config/index.mjs`
- `apps/frontend/package.json`
- `apps/frontend/tsconfig.json`
- `apps/frontend/eslint.config.mjs`
- `apps/frontend/next.config.ts`
- `apps/frontend/src/shared/i18n/routing.ts`
- `apps/frontend/src/shared/i18n/request.ts`
- `apps/frontend/src/middleware.ts`
- `apps/frontend/src/app/[locale]/layout.tsx`
- `apps/frontend/src/app/[locale]/page.tsx`
- `apps/frontend/src/app/[locale]/patient/page.tsx`
- `apps/frontend/src/app/[locale]/secretary/page.tsx`
- `apps/frontend/src/app/[locale]/doctor/page.tsx`
- `apps/frontend/src/app/[locale]/assistant/page.tsx`
- `apps/frontend/src/app/[locale]/admin/page.tsx`
- `apps/frontend/src/app/api/auth/[...nextauth]/route.ts`
- `apps/frontend/src/app/api/health/route.ts`
- Various `.gitkeep` and directory skeletons
