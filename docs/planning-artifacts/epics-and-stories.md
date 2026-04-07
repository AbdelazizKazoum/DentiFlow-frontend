---
workflowType: "epics-and-stories"
status: "revised"
revisedAt: "2026-04-07"
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

### Dev Task E1-DT1: Project architecture scaffold

> **Dev task — not a user story.** No user-facing value. Excluded from sprint velocity.

- Set up the frontend folder/layer structure aligned with clean architecture.
- Definition of done:
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

### Dev Task E1-DT2: Shared design system primitives

> **Dev task — not a user story.** Infrastructure work. Excluded from sprint velocity.

- Build reusable UI primitives and design tokens for consistency.
- Definition of done:
  - Theme tokens for color/type/spacing are implemented.
  - Status chip component supports queue semantic states.
  - Core form components support validation and RTL/LTR parity.
  - `ThemeModeToggle` supports light/dark switching; selected theme persists to localStorage and is applied consistently across all role surfaces (FR42).

### Story E1-S5: Patient registration and consent

- As a new patient, I can register with email/password or Google OAuth and complete data consent before booking.
- Acceptance criteria:
  - Registration form accepts name, phone number, email, and password (FR1).
  - Google OAuth is available as an alternative registration path (FR1).
  - After account creation, `PatientConsentScreen` is displayed in the active locale before returning to the booking flow (FR38).
  - Consent text renders in Arabic, French, or English matching the user's selected locale.
  - Explicit accept action is required — no pre-ticked checkboxes; no skip option.
  - Consent acceptance is recorded server-side with timestamp and locale.
  - Already-consented returning patients do not see the consent screen again.

---

## Epic E2 — Appointment Intake and Scheduling

### Goal

Enable online, walk-in, and phone appointment creation with conflict-safe scheduling and clear confirmations.

### Story E2-S1: Patient mobile booking flow

- As a patient, I can self-book an available slot from mobile.
- Acceptance criteria:
  - Slot discovery by clinic and date works.
  - Booking submit shows `BookingConfirmationNotice` with notification channel and booking reference on success.
  - If a selected slot is taken on submit, an inline conflict error is shown with suggested alternative slots.
  - If the user is unauthenticated, they are redirected to sign-in with the booking flow preserved and resumed on return.
  - If the API returns an error, a recoverable error state is shown with a retry action — no silent failure.

### Story E2-S2: Secretariat intake, scheduling, and appointment management

- As a secretary, I can create appointments rapidly for walk-in and phone channels and manage the full appointment lifecycle.
- Acceptance criteria:
  - Intake form supports minimal fast fields for walk-in and phone channels.
  - Channel metadata is captured (`online|walk-in|phone`).
  - Walk-in appointment created via WalkInQuickIntake appears in today's queue immediately with status Arrived.
  - Secretary can view all appointments in a list/schedule view.
  - Secretary can confirm a pending online appointment (FR11).
  - Secretary can reschedule an appointment to an available slot — conflict validation applies (FR11).
  - Secretary can cancel an appointment with an explicit confirmation prompt (FR11).

### Story E2-S3: Conflict handling UX

- As a scheduler, I see clear conflict errors and suggested alternatives.
- Acceptance criteria:
  - Collision responses are displayed inline.
  - Suggested nearest available slots are presented.
  - No duplicate booking submission on retry.

### Story E2-S4: Booking notifications (confirmation + reminder)

- As a patient, I receive a WhatsApp confirmation when I book and a reminder before my appointment.
- Acceptance criteria:
  - On booking success, a WhatsApp notification is dispatched as the primary channel (FR13).
  - If WhatsApp delivery fails, email fallback is triggered automatically (FR13, NFR15).
  - `BookingConfirmationNotice` on the success screen shows which channel was used and the booking reference.
  - If both channels fail, the booking reference is displayed prominently with a copy action (graceful degradation).
  - A reminder notification is sent to the patient before their scheduled appointment (FR14).
  - Notification dispatch failure does not block or roll back appointment creation (NFR15).
  - All notification content is delivered in the patient's active locale (FR36).

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
  - Queue state changes received via SSE are reflected in the UI within 3 seconds without a page reload (NFR2).
  - Assistant view is read-only — queue state transition controls are not rendered for the dental assistant role.
  - Doctor can transition a patient to In Chair and to Done from their queue view.
  - If the SSE connection is lost, a delayed-sync indicator is visible until reconnect and resync (see E3-S3).

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

- As a secretary, I can close a visit with full or partial payment and the residual balance carries forward.
- Acceptance criteria:
  - Visit total is calculated from confirmed acts (FR24).
  - Full payment clears the session balance; patient account shows zero outstanding (FR31).
  - Partial payment computes remaining balance correctly; outstanding balance is displayed explicitly (FR32).
  - After checkout, the patient's running account balance is updated and visible on the patient record immediately (FR33).
  - On the next visit, secretary and doctor see the outstanding balance on the patient profile before the session begins (FR34).
  - `CheckoutBalanceSummary` shows explicit paid/partial/outstanding states per UX spec.
  - Follow-up appointment shortcut is available from the checkout screen (FR35).

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

- As a doctor or secretary, I can view a patient's full profile with demographics, history, and balance.
- Acceptance criteria:
  - Unified patient profile page exists with sections: demographics, appointment history, treatment history, account balance.
  - Timeline sections are filterable by date range and record type (appointment / treatment / payment).
  - Role safety enforced: dental assistant cannot access the payment/balance section; patient role cannot access this view at all.
  - Outstanding balance is persistently visible in the profile header — not buried in a tab.
  - Secretary can update patient demographics from within the profile page (FR28).

### Story E5-S4: Clinic configuration and admin dashboard

- As an admin, I can configure clinic details, working hours, doctor schedules, and view a clinic activity summary.
- Acceptance criteria:
  - Admin can configure clinic name, address, and contact information (FR39).
  - Admin can set clinic working hours (open/close times per day of week) (FR15).
  - Admin can assign working schedules per doctor (working days and hours) — separate from role assignment (FR41).
  - Configured working hours drive available slot generation in the patient booking flow (FR15; dependency for E2-S1).
  - Admin dashboard shows summary metrics: total appointments, completed visits, and payment totals for a selectable date range (FR40).
  - Changes to clinic details and working hours take effect immediately on save.

### Story E5-S5: Patient self-service portal

- As a patient, I can view and manage my own profile and review my appointment history.
- Acceptance criteria:
  - Patient can view their own profile: name, phone, email (FR6).
  - Patient can update their name, phone number, and email (FR6).
  - Patient can view upcoming appointments (FR29).
  - Patient can view past appointment history (FR29).
  - Patient cannot access other patients' records — role guard enforced at API layer (NFR8).
  - All views render correctly in Arabic RTL, French, and English (FR36).

---

## Cross-epic non-functional stories

### Story NFR-S1: Accessibility baseline

- As a user with assistive technology, I can complete core flows using keyboard navigation and a screen reader.
- Acceptance criteria:
  - Automated WCAG 2.1 AA checks (axe or Lighthouse) pass on: patient booking flow, secretary queue board, treatment act entry, and checkout flow.
  - All interactive elements (buttons, inputs, status chips, queue transitions) are keyboard-operable with visible focus indicators in all themes.
  - Screen reader announces queue state changes, form errors, and booking confirmation outcomes.
  - No information is conveyed by colour alone — all statuses use text + icon + colour redundancy.
  - Manual keyboard-only walkthrough completed on the four core flows listed above.

### Story NFR-S2: Localization quality gate

- As a user in any supported locale, every critical screen renders correctly in Arabic RTL and French/English LTR with accurate directionality and formatting.
- Acceptance criteria:
  - Visual regression snapshots exist for Arabic RTL and French/English LTR on: booking flow, queue board, treatment editor, and checkout screen.
  - Snapshot comparisons run in CI on every PR and block merge on layout regressions (tool: Playwright + Percy or Chromatic).
  - No component renders in LTR when Arabic locale is active (NFR17).
  - Locale switching completes with no full page reload (NFR18).
  - Date, time, and number values render in locale-appropriate format on all critical screens (NFR19).

### Story NFR-S3: Error and latency feedback

- As a user on any role surface, I see clear feedback during loading, on errors, and when data is empty — with a path to recover.
- Acceptance criteria:
  - Skeleton loaders are shown for all list and table views (queue board, appointment list, patient profile history).
  - Inline spinners are used for short point actions (submit, save, state transition).
  - All API error responses surface a user-facing message with a specific cause and a retry or recovery action — no silent failures.
  - Empty states on all role-critical screens explain why no data is shown and offer one recommended next action.
  - Booking flow, queue transitions, and checkout complete within latency budgets: ≤3s booking (NFR1), ≤3s queue (NFR2), ≤2s dashboards (NFR3) — verified in CI with performance budget checks.

---

## Dependency order

1. E1 (DT1, DT2, S2, S3, S5) — E1-S5 (registration) unblocks all patient flows
2. E5-S4 — clinic config and working hours must exist before E2-S1 slot discovery works
3. E2-S1/S2/S3/S4
4. E3-S1/S2/S3
5. E4-S1/S2/S3
6. E5-S1/S2/S3/S5
7. NFR-S1/S2/S3 run progressively from E1 onward

## Suggested first sprint cut

- E1-DT1, E1-DT2, E1-S2, E1-S3, E1-S5
- E5-S4 (clinic config — unblocks patient slot availability in booking)
- E2-S2
- E3-S1 (with mocked SSE first, real SSE in next sprint)

## Story readiness checklist (for `CS:validate`)

Each story should include before dev:

- API contract references (request/response/error)
- UI states (loading/success/error/empty)
- Role permissions matrix
- i18n keys and locale copy placeholders
- Test cases (unit + integration + E2E outline)
