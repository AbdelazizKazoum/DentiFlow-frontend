---
workflowType: "epics-and-stories"
status: "draft-complete"
createdAt: "2026-04-07"
project: "dentilflow-frontend"
inputDocuments:
  - docs/planning-artifacts/prd.md
  - docs/planning-artifacts/ux-design-specification.md
  - docs/planning-artifacts/architecture.md
---

# Epics and Stories — DentilFlow Frontend

## Planning assumptions

- Scope: MVP only (single clinic deployment with `clinic_id` enforced from day one).
- UX priority: Secretary operational cockpit first, patient mobile booking second.
- Technical baseline: Next.js App Router + TypeScript + MUI + Tailwind + i18n (Arabic RTL, French, English).
- Integration surface: API Gateway REST + SSE for queue updates.

## Epic E1 — Foundation, Auth, and App Shell

### Goal

Establish a secure, role-aware, trilingual frontend foundation with RTL/LTR correctness and guarded navigation.

### Story E1-S1: Project architecture scaffold

- As a developer, I need the frontend folder/layer structure aligned with clean architecture so features are consistent.
- Acceptance criteria:
  - `src/domain`, `src/application`, `src/infrastructure`, `src/presentation`, `src/app`, `src/shared` are present.
  - Lint/type-check pass.
  - App starts with role-neutral landing and health route.

### Story E1-S2: Locale + RTL/LTR runtime

- As a user, I can switch Arabic/French/English and get correct direction and formatting.
- Acceptance criteria:
  - Locale routes exist (`/[locale]/*`).
  - Arabic sets document `dir=rtl`; French/English set `dir=ltr`.
  - Logical spacing utilities are used in directional layouts.
  - Date/time and number formatting are locale-aware.

### Story E1-S3: Auth session + role guards

- As a clinic user, I can sign in and only access allowed role routes.
- Acceptance criteria:
  - Session contains `user_id`, `role`, `clinic_id`.
  - Route guards block unauthorized role pages.
  - Expired sessions redirect to sign-in with preserved return path.

### Story E1-S4: Shared design system primitives

- As a team, we need reusable UI primitives for consistency and speed.
- Acceptance criteria:
  - Theme tokens for color/type/spacing are implemented.
  - Status chip component supports queue semantic states.
  - Core form components support validation and RTL/LTR parity.

---

## Epic E2 — Appointment Intake and Scheduling

### Goal

Enable online, walk-in, and phone appointment creation with conflict-safe scheduling and clear confirmations.

### Story E2-S1: Patient mobile booking flow

- As a patient, I can self-book an available slot from mobile.
- Acceptance criteria:
  - Slot discovery by clinic and date works.
  - Booking submit shows success/failure feedback.
  - Confirmation screen includes next-step message and reminder expectation.

### Story E2-S2: Secretariat intake (walk-in + phone)

- As a secretary, I can create appointments rapidly for walk-in and phone channels.
- Acceptance criteria:
  - Intake form supports minimal fast fields.
  - Channel metadata is captured (`online|walk-in|phone`).
  - Completion returns to today queue with new appointment visible.

### Story E2-S3: Conflict handling UX

- As a scheduler, I see clear conflict errors and suggested alternatives.
- Acceptance criteria:
  - Collision responses are displayed inline.
  - Suggested nearest available slots are presented.
  - No duplicate booking submission on retry.

---

## Epic E3 — Real-Time Waiting Room and Role Handoffs

### Goal

Provide reliable, low-latency queue state visibility and transitions across secretary/doctor/assistant roles.

### Story E3-S1: Queue board (secretary view)

- As a secretary, I can manage queue states: Arrived → Waiting → In Chair → Done.
- Acceptance criteria:
  - Queue list sorted for operational clarity.
  - One-tap state actions with guardrails.
  - Visual confirmation after each transition.

### Story E3-S2: Doctor and assistant synchronized views

- As a doctor/assistant, I can see my relevant queue updates in near real-time.
- Acceptance criteria:
  - SSE stream updates list without full reload.
  - Assistant view is read-only for queue state transitions.
  - Doctor can transition controlled states per policy.

### Story E3-S3: Reconnect and snapshot resync

- As a user on unstable network, I can recover queue truth quickly.
- Acceptance criteria:
  - SSE reconnect backoff is implemented.
  - On reconnect, snapshot fetch reconciles drift.
  - Recovery state is visibly communicated to user.

---

## Epic E4 — Clinical Treatment, Checkout, and Balance

### Goal

Digitize chair-side treatment recording and checkout closure including partial payments and carry-forward balances.

### Story E4-S1: Treatment act entry workflow

- As an assistant/doctor, I can record treatment acts with tooth number, procedure, and price.
- Acceptance criteria:
  - Act rows support add/edit/remove in current visit.
  - FDI tooth number and procedure validations exist.
  - Price prefill from act catalog is shown and editable per policy.

### Story E4-S2: Doctor confirmation gate

- As a doctor, I can confirm assistant-entered acts before visit closure.
- Acceptance criteria:
  - Unconfirmed acts cannot be closed.
  - Confirmation action records actor and timestamp.
  - Post-confirm edit policy is enforced visibly.

### Story E4-S3: Checkout and partial payment

- As a secretary, I can close visit with full/partial payment and residual balance.
- Acceptance criteria:
  - Visit total is calculated from confirmed acts.
  - Partial payment computes remaining balance correctly.
  - Follow-up appointment shortcut is available after checkout.

---

## Epic E5 — Admin Configuration and Patient Record Views

### Goal

Allow clinic admin setup and provide staff with accurate patient longitudinal context.

### Story E5-S1: Staff and role management UI

- As an admin, I can create and manage users with proper roles.
- Acceptance criteria:
  - User list with role filters exists.
  - Create/edit/deactivate user flows are available.
  - Role assignment rules are enforced client-side and server-side feedback is surfaced.

### Story E5-S2: Act catalog management

- As an admin, I can maintain procedure catalog and defaults.
- Acceptance criteria:
  - CRUD for procedures and default prices.
  - Validation for duplicate procedure identifiers.
  - Changes reflected in treatment act forms.

### Story E5-S3: Patient profile and history timeline

- As doctor/secretary, I can view patient demographics, appointments, treatments, and balance.
- Acceptance criteria:
  - Unified patient profile page exists.
  - Timeline sections are filterable and role-safe.
  - Outstanding balance is visibly persistent.

---

## Cross-epic non-functional stories

### Story NFR-S1: Accessibility baseline

- WCAG 2.1 AA checks on core flows (booking, queue, checkout).

### Story NFR-S2: Localization quality gate

- Arabic RTL and French/English LTR visual regression coverage for critical screens.

### Story NFR-S3: Error and latency feedback

- Standardized loading/error/empty/retry states for all role-critical screens.

---

## Dependency order

1. E1 (all stories)
2. E2-S1/S2/S3
3. E3-S1/S2/S3
4. E4-S1/S2/S3
5. E5-S1/S2/S3
6. NFR-S1/S2/S3 run progressively from E1 onward

## Suggested first sprint cut

- E1-S1, E1-S2, E1-S3
- E2-S2
- E3-S1 (with mocked SSE first, real SSE in next sprint)

## Story readiness checklist (for `CS:validate`)

Each story should include before dev:

- API contract references (request/response/error)
- UI states (loading/success/error/empty)
- Role permissions matrix
- i18n keys and locale copy placeholders
- Test cases (unit + integration + E2E outline)
