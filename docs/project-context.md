---
project_name: "dentilflow-frontend"
user_name: "Abdelaziz"
date: "2026-04-07"
sections_completed:
  - technology_stack
  - critical_implementation_rules
  - code_structure_patterns
  - anti_patterns
  - testing_rules
---

# Project Context for AI Agents

_Critical rules and patterns for the dentilflow-frontend monorepo. Focus on unobvious details agents would otherwise miss._

---

## Technology Stack & Versions

### Frontend (`apps/frontend`)

| Concern | Technology | Notes |
|---------|-----------|-------|
| Framework | Next.js 15+ App Router | `src/app/[locale]/` route segments |
| Language | TypeScript (strict) | No `any` without inline justification comment |
| Styling | MUI v6 + Tailwind CSS v4 | Hybrid — see rules below |
| Auth | NextAuth (Auth.js) v4 | JWT strategy + Google OAuth + Credentials |
| State | Zustand | All state — server data AND client UI state |
| HTTP client | Axios | Under `infrastructure/api/` only |
| Real-time | SSE (`EventSource`) | Queue sync via `useQueueSync` hook |
| i18n | next-intl | `[locale]` route segments; AR/FR/EN |

### Backend (`apps/*-service`)

| Concern | Technology | Notes |
|---------|-----------|-------|
| Framework | NestJS + Clean Architecture | Per-service layer structure |
| ORM | TypeORM Data Mapper mode | Repository + Mapper pattern — no Active Record |
| Database | MySQL 8.4 LTS | `mysql2` v3.20.0 |
| Sync comms | gRPC | `grpc-js` v1.14.3 |
| Async comms | NATS JetStream | `nats` v2.29.3 |
| Validation | class-validator + class-transformer | On all inbound DTOs |

### Monorepo

- **Package manager:** pnpm + Turborepo
- **Workspace:** `pnpm-workspace.yaml`; `apps/` for services and frontend; `packages/` for shared modules

---

## Critical Implementation Rules

### 1. RTL/LTR — Dual Emotion Cache (Frontend)

- Next.js `[locale]` segment sets `lang` and `dir` on `<html>`.
- MUI requires **two separate Emotion caches**: LTR cache (FR/EN) and RTL cache with `stylis-plugin-rtl` (AR).
- **NEVER** use Tailwind physical utilities (`ml`, `mr`, `pl`, `pr`) in directional layouts — use **logical utilities** (`ms`, `me`, `ps`, `pe`) and `gap-*`.
- **NEVER** use `space-x-*` in directional layouts.
- Arabic RTL must be pixel-accurate — no component renders in LTR when locale is `ar`.

### 2. `clinic_id` — Mandatory on Every DB Query

- **Every** DB read/write must include a `clinic_id` filter — no exceptions, ever.
- `clinic_id` comes from the verified JWT claim only — **never** from URL params, request headers, or the request body.
- Cross-clinic data access must be architecturally impossible, not just visually hidden.
- All DB schemas include `clinic_id CHAR(36)` on every domain table.

### 3. Frontend Clean Architecture — Layer Boundaries

```
app/          → Next.js adapter layer only (layout, page, route handlers)
presentation/ → React components, hooks, view-models
application/  → Use-cases, ports, DTOs (no React/Next.js imports)
infrastructure/ → Axios API clients, SSE adapters, storage, mappers
domain/       → Pure entities, value objects (zero framework imports)
shared/       → Cross-cutting constants, utils, types
```

**Dependency direction is strictly inward.** `app → presentation → application → domain`.

- UI components/pages call application use-cases — **never** Axios directly.
- Axios clients live exclusively under `infrastructure/api/`.
- `domain/` and `application/` must contain zero React, Next.js, or Axios imports.
- App Router files (`layout.tsx`, `page.tsx`) stay in `src/app/` — moving them breaks Next.js discovery.

### 4. Zustand — State Architecture

- Zustand manages **all** frontend state: server data, loading/error states, and client UI state.
- No TanStack Query / React Query — Zustand stores call Axios via application use-cases.
- Store structure: one store per domain slice (e.g., `useAppointmentStore`, `useQueueStore`, `useAuthStore`).
- Stores live under `presentation/` or `application/` layer (never `domain/`).
- Loading/error state shape per async action: `{ status: 'idle' | 'loading' | 'success' | 'error'; error?: string }`.
- **Never** manage server data in component-local `useState` — all async data goes through a Zustand store.

### 5. Axios — Infrastructure Layer Only

- Axios instances are created and exported from `infrastructure/api/`.
- One base Axios instance per API surface with base URL and default headers.
- JWT access token is injected via Axios request interceptor — never passed manually per-call.
- 401 responses trigger silent token refresh via response interceptor, then retry once.
- **Never** import Axios in `domain/`, `application/`, or React components — always call through a use-case or repository port.

### 6. NextAuth v4 — Session and Callback Rules

- Route handler path: `src/app/api/auth/[...nextauth]/route.ts` — never move or rename.
- Session strategy: JWT only (no database sessions).
- NextAuth callbacks must map backend identity claims to the session: `{ userId, role, clinicId, accessToken }`.
- The backend `auth-service` is the source of truth for account lifecycle — NextAuth is the frontend auth boundary.
- `clinic_id` in the session comes from the JWT returned by `auth-service` — never derived from URL.

### 7. API Response Envelope (REST)

All REST responses from the API Gateway follow this envelope — agents must never deviate:

**Success:**
```json
{ "success": true, "data": { ... } }
{ "success": true, "data": [...], "meta": { "page": 1, "limit": 20, "total": 42 } }
```

**Error:**
```json
{ "success": false, "error": { "code": "SCREAMING_SNAKE_CASE", "message": "Human-readable.", "details": [] } }
```

- `meta` omitted for non-paginated responses.
- `data` is always an object or array — never a bare primitive.
- HTTP `200` is **never** returned with an error body — use the correct HTTP status code.
- `details[]` contains field-level validation errors for `422` responses.

### 8. Date and Time — UTC Everywhere

- All API and NATS event date/time fields use **ISO 8601 UTC strings**: `"2026-04-07T09:30:00Z"`.
- No Unix timestamps in API responses or event payloads.
- DB stores UTC only — no timezone-aware columns.
- Timezone conversion and locale-specific formatting is a **frontend-only, render-time** responsibility.

### 9. NATS Events — Required Envelope

Every NATS event must include:

```json
{
  "eventId": "uuid-v4",
  "eventType": "service.entity.past-tense-verb",
  "clinicId": "uuid-v4",
  "occurredAt": "2026-04-07T09:30:00Z",
  "payload": { ... }
}
```

- `eventId` enables idempotency deduplication — consumers must record processed IDs.
- NATS subject naming: `{service}.{entity}.{past-tense-event}` — e.g., `appointment.booking.confirmed`, `queue.status.updated`.
- **Never invent new NATS subjects** without registering them in `packages/shared-events/subjects.ts`.

### 10. TypeORM — Data Mapper Pattern (Backend)

- Repository interfaces declared in `domain/` or `application/ports/`.
- TypeORM repository implementations in `infrastructure/persistence/repositories/`.
- Dedicated mappers: `{Domain}PersistenceMapper` (DB entity ↔ domain entity) and `{Domain}ResponseMapper` (domain entity ↔ DTO).
- **TypeORM entities must never leak into use-case or application layers.**
- Business use-cases depend only on repository interfaces — never on TypeORM `Repository<T>` directly.

### 11. Backend Clean Architecture — Per Service

```
src/
  application/    → use-cases, DTOs, repository interfaces, service interfaces
  domain/         → entities, value objects, domain services, domain exceptions
  infrastructure/ → TypeORM repositories, NATS emitters, gRPC adapters, external clients
  presentation/   → NestJS controllers, gRPC handlers, NATS consumers
  shared/         → guards, interceptors, exception filters
```

- Domain exceptions are thrown from use-cases only — never from controllers or infrastructure.
- `class-validator` + `class-transformer` validation runs at the NestJS controller boundary before the use-case is invoked.

### 12. Shared Packages — Reuse, Never Recreate

- `shared-db`, `shared-logger`, `shared-config` are shared packages — import them, never recreate per service.
- `shared-events/subjects.ts` is the single source of truth for all NATS subject strings.
- `packages/proto/` holds all `.proto` definitions — no per-service proto duplication.

---

## Code Structure Patterns

### Naming Conventions

| Artifact | Convention | Example |
|----------|-----------|---------|
| TypeScript files | `kebab-case.ts` | `appointment.service.ts` |
| Classes | `PascalCase` | `AppointmentService` |
| Functions/variables | `camelCase` | `getAppointmentById` |
| Constants | `UPPER_SNAKE_CASE` | `MAX_RETRY_COUNT` |
| Interfaces/types | No `I` prefix | `AppointmentRepository` |
| DB tables | `plural_snake_case` | `treatment_acts` |
| DB columns | `snake_case` | `clinic_id`, `created_at` |
| DB indexes | `idx_{table}_{cols}` | `idx_appointments_clinic_id` |
| REST routes | `plural-kebab-case` | `/treatment-acts`, `/waiting-room/queue` |
| REST query params | `camelCase` | `?clinicId=&page=&limit=` |
| REST versioning | `/api/v1/` prefix | `/api/v1/appointments` |
| NATS subjects | `service.entity.event` | `queue.status.updated` |
| gRPC methods | `PascalCase` verb-noun | `CreateAppointment`, `ConfirmTreatmentActs` |

### Frontend File Conventions

- Zustand store files: `use-{domain}.store.ts` under `presentation/` or `application/`.
- Axios client files: `{domain}.api-client.ts` under `infrastructure/api/`.
- Application use-case files: `{action}-{domain}.use-case.ts` under `application/use-cases/`.
- React hooks: `use-{description}.hook.ts` (or `use{Description}.ts`) under `presentation/hooks/`.
- Components: `PascalCase.tsx` under `presentation/components/`.

### SSE Queue Sync

- SSE connection to `/events/queue` is managed exclusively by `useQueueSync` hook.
- On `EventSource` error/close → auto-reconnect with backoff → fetch snapshot endpoint → reconcile Zustand queue store.
- `Last-Event-ID` header sent on reconnect for replay.
- Gateway emits a `snapshot` event on every new SSE connection containing the full current queue state.

### MUI + Tailwind Split

- **MUI** for: forms, inputs, dialogs, date/time pickers, data tables, validation-heavy flows.
- **Tailwind** for: page layout, spacing, responsive utilities, structural composition.
- Design tokens (color, typography, spacing, radius, elevation) consumed by both — no ad-hoc overrides.
- All custom components must support RTL/LTR and light/dark theming.

### Theme

- `ThemeModeToggle` switches light/dark mode; selected theme persisted to `localStorage`.
- Theme applied consistently across all role surfaces (patient, secretary, doctor, assistant, admin).

---

## Anti-Patterns — MUST NOT

**Data access:**
- Never query DB without `clinic_id` filter
- Never trust `clinic_id` from URL or request headers for authorization
- Never perform cross-service DB joins

**Frontend architecture:**
- Never call Axios from page/component directly — always through a use-case
- Never import React, Next.js, or Axios in `domain/` or `application/` layers
- Never move `src/app/api/auth/[...nextauth]/route.ts` — Next.js discovery breaks
- Never manage async server data in component-local `useState` — use Zustand store

**API conventions:**
- Never return HTTP `200` with an error body
- Never return a bare primitive as `data` — always object or array
- Never use Unix timestamps in API responses or event payloads
- Never expose gRPC or NATS to external clients

**Backend architecture:**
- Never let TypeORM entities leak outside the infrastructure layer
- Never throw domain exceptions from controllers or infrastructure
- Never duplicate `shared-db`, `shared-logger`, or `shared-config` inside a service
- Never invent new NATS subjects without registering in `packages/shared-events/subjects.ts`

**TypeScript:**
- Never use `any` without an explicit inline justification comment

**RTL/LTR:**
- Never use physical Tailwind utilities (`ml`, `mr`, `pl`, `pr`) in directional layouts
- Never use `space-x-*` in directional layouts

---

## Testing Rules

- Unit tests: `*.spec.ts` **co-located** with the source file in the same directory — no separate `__tests__/` folder.
- E2E tests: `/test/e2e/` at the root of each service.
- Frontend unit/integration tests: `apps/frontend/test/`.
- Mocks live alongside tests or in a `__mocks__/` sibling directory.
- All Zustand stores must have unit tests covering loading, success, and error state transitions.
- Axios clients tested with mocked adapters — no live HTTP calls in unit tests.
- RTL/LTR visual regression: Playwright + Percy or Chromatic; run in CI on every PR; blocks merge on layout regressions.
- Accessibility: automated axe/Lighthouse checks on booking flow, queue board, treatment act entry, and checkout flow.
- Latency budgets verified in CI: ≤3s booking (NFR1), ≤3s queue propagation (NFR2), ≤2s dashboards (NFR3).
