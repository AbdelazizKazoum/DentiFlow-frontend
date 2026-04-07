---
stepsCompleted: [step-01-validate-prerequisites]
inputDocuments:
  - docs/planning-artifacts/prd.md
  - docs/planning-artifacts/ux-design-specification.md
  - docs/planning-artifacts/architecture.md
---

# dentilflow-frontend - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for dentilflow-frontend, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: A visitor can register as a patient with name, phone number, email, and password.
FR2: A registered user can log in with email and password and receive a JWT access token.
FR3: The system enforces role-based access control — Patient, Secretariat, Dental Assistant, Doctor, Admin — at the API layer for every request.
FR4: An Admin can create staff accounts and assign roles (Secretariat, Dental Assistant, Doctor).
FR5: An Admin can deactivate or modify staff accounts.
FR6: A patient can view and update their own profile (name, phone, email).
FR7: Authenticated sessions expire and refresh tokens are rotated on reuse.
FR8: A patient can view available appointment slots for a clinic and book an appointment online.
FR9: A secretary can create a walk-in appointment for a patient who arrives at the clinic.
FR10: A secretary can create a phone appointment on behalf of a patient who calls.
FR11: A secretary can view, confirm, reschedule, and cancel any appointment.
FR12: The system prevents double-booking of a doctor's slot in real time, including concurrent secretary bookings.
FR13: A patient receives a booking confirmation notification (WhatsApp primary, email fallback) upon appointment creation.
FR14: A patient receives an appointment reminder notification before their scheduled appointment.
FR15: An Admin can configure the clinic's working hours and doctor availability schedules.
FR16: The system maintains a real-time patient queue per clinic session with statuses: Arrived, Waiting, In Chair, Done.
FR17: A secretary can update a patient's waiting room status (mark as Arrived, move to next status).
FR18: A doctor can view their own patient queue in real time and transition a patient to In Chair.
FR19: A dental assistant can view the active patient queue (read-only).
FR20: All waiting room status changes propagate to all authorized role views within 3 seconds.
FR21: A doctor can record treatment acts performed during a visit, specifying tooth number (FDI notation), procedure name, and price per act.
FR22: A dental assistant can enter treatment acts during an active session, marked as pending doctor confirmation.
FR23: A doctor can review, edit, and confirm acts entered by a dental assistant before closing a session.
FR24: The system calculates the total cost of a visit automatically from recorded acts.
FR25: A doctor and secretary can view the full treatment history of any patient across all visits.
FR26: An Admin can manage the clinic's act catalog — add, edit, and deactivate procedures with default prices.
FR27: A secretary and doctor can view a patient's full profile: demographics, contact info, appointment history, treatment history, and account balance.
FR28: A secretary can create and update patient demographic information.
FR29: A patient can view their own appointment history and upcoming appointments.
FR30: At visit close, a secretary can review the visit summary (acts performed + total cost) and record payment.
FR31: A secretary can record a full payment, clearing the patient's session balance.
FR32: A secretary can record a partial payment, with the outstanding balance carried forward to the patient's account.
FR33: The system maintains a running account balance per patient, updated after each checkout.
FR34: A secretary and doctor can view a patient's current account balance at any point.
FR35: A secretary can schedule the patient's next appointment from the checkout flow.
FR36: All user-facing flows are available in Arabic (RTL layout), French, and English.
FR37: A user can select their preferred language; the UI re-renders with correct directionality (RTL for Arabic, LTR for French/English).
FR38: Patient registration and consent flows display language-appropriate consent text.
FR39: An Admin can configure clinic details (name, address, contact information).
FR40: An Admin can view a summary of clinic activity: appointments, recorded visits, and payment totals.
FR41: An Admin can manage multiple doctors and assign working schedules per doctor.

### NonFunctional Requirements

NFR1: Patient-facing booking flow (search → select → confirm) completes end-to-end in ≤3 seconds on a 4G mobile connection.
NFR2: Waiting room queue status updates propagate to all connected clients within ≤3 seconds.
NFR3: All secretary and doctor dashboard views (appointments, patient records) load within ≤2 seconds under normal load.
NFR4: The system supports at least 50 concurrent authenticated users per clinic instance without performance degradation.
NFR5: All data in transit is encrypted using TLS 1.2 or higher.
NFR6: All patient data at rest is encrypted using AES-256.
NFR7: JWT access tokens expire within 15 minutes; refresh tokens are rotated on every use and invalidated on logout.
NFR8: Every API endpoint independently validates role authorization; no endpoint relies solely on UI-level access control.
NFR9: All access to patient records (view, create, update, delete) is logged with user ID, role, timestamp, and action type — audit log is immutable.
NFR10: Patient data is isolated per clinic — cross-clinic data access is architecturally impossible at MVP.
NFR11: The system architecture supports horizontal scaling to accommodate clinic growth without architectural changes.
NFR12: The data model includes `clinic_id` scoping on all entities from day one, enabling multi-tenant architecture in V2 without data migration.
NFR13: The system handles up to 200 appointments per clinic per day without degradation.
NFR14: System availability is ≥99.5% during clinic business hours (8am–8pm local time).
NFR15: Notification delivery failures (WhatsApp or email) do not cause appointment booking to fail — notifications are decoupled from the core booking flow.
NFR16: In the event of a real-time connection loss, waiting room clients automatically reconnect and resync queue state within 10 seconds.
NFR17: Arabic RTL layout is pixel-accurate — no component renders in LTR when Arabic locale is active.
NFR18: Language switching is instantaneous (client-side) with no full-page reload required.
NFR19: All date, time, and number formats adapt to the active locale.

### Additional Requirements

- Starter template baseline is `create-next-app` with TypeScript, ESLint, Tailwind, App Router, `src/` directory, and alias `@/*`.
- Frontend architecture must follow clean layering: `domain`, `application`, `infrastructure`, `presentation`, `app`, `shared` with inward dependency direction.
- NextAuth v4 is the frontend auth boundary; session claims must include backend-required claims (`user_id`, `role`, `clinic_id`).
- API ingress is REST at gateway; frontend real-time channel is SSE with reconnect + snapshot resync behavior.
- Internal platform architecture depends on NATS async events + gRPC sync contracts; API contracts and subject naming must be centrally governed.
- Data model mandates strict `clinic_id` scoping on all domain tables and no cross-service DB joins.
- Outbox pattern is required in write services for reliable event publication, with idempotent consumers and dead-letter handling.
- Security implementation requires JWT verification at gateway, defense-in-depth role checks, TLS everywhere, AES-256 at rest, and immutable audit events.
- Infrastructure baseline for MVP is Docker Compose with service-level containers, NATS, MySQL, and optional Redis only for specific non-real-time needs.
- Observability baseline requires structured logs including `clinic_id`, `user_id`, `trace_id`, with OpenTelemetry instrumentation.
- Naming and consistency rules (DB/API/event/TypeScript) are mandatory to avoid cross-agent implementation drift.
- Database design must preserve conceptual flow from patient → appointment → queue → visit/treatment → checkout/payment → balance with service-owned schemas.

### UX Design Requirements

UX-DR1: Implement locale-rooted routing and runtime direction switching with Arabic RTL and French/English LTR parity across all critical journeys.
UX-DR2: Build a tokenized design foundation (color, typography, spacing, radius, elevation, motion) shared across MUI and Tailwind.
UX-DR3: Implement dual-theme support (light/dark) with semantic consistency and WCAG 2.1 AA contrast in both themes.
UX-DR4: Implement `LanguageSwitcher` with French default and persistent locale state across patient booking flow.
UX-DR5: Implement `BookingModeSelector` to support “specific dentist” and “fastest available” booking modes.
UX-DR6: Implement `DentistAvailabilityPanel` with clear slot states, empty states, and accessible slot metadata.
UX-DR7: Implement `ClinicQueueBoard` with real-time synchronized status display, delayed-sync indicators, and retry/recovery states.
UX-DR8: Implement `WalkInQuickIntake` for rapid secretary intake with validation summaries and minimal field friction.
UX-DR9: Implement `TreatmentActsEditor` with draft/pending/confirmed states and inline correction flow before doctor confirmation.
UX-DR10: Implement `CheckoutBalanceSummary` with explicit paid/partial/outstanding states and balance carry-forward clarity.
UX-DR11: Implement consistent feedback patterns (success/error/warning/info), loading/empty states, and explicit confirmation messages on critical actions.
UX-DR12: Ensure accessibility: keyboard navigation, visible focus, ARIA semantics, non-color-only status signals, and screen-reader support for queue and form errors.
UX-DR13: Enforce responsive behavior by breakpoint (mobile 320–767, tablet 768–1023, desktop 1024+) with patient mobile-first and staff desktop-first adaptations.
UX-DR14: Validate cross-browser and assistive tech compatibility (Chrome/Safari/Firefox/Edge, VoiceOver/NVDA spot checks).
UX-DR15: Add RTL/LTR and light/dark visual regression coverage for booking, queue, treatment, and checkout journeys.

### FR Coverage Map

{{requirements_coverage_map}}

## Epic List

{{epics_list}}

<!-- Repeat for each epic in epics_list (N = 1, 2, 3...) -->

## Epic {{N}}: {{epic_title_N}}

{{epic_goal_N}}

<!-- Repeat for each story (M = 1, 2, 3...) within epic N -->

### Story {{N}}.{{M}}: {{story_title_N_M}}

As a {{user_type}},
I want {{capability}},
So that {{value_benefit}}.

**Acceptance Criteria:**

<!-- for each AC on this story -->

**Given** {{precondition}}
**When** {{action}}
**Then** {{expected_outcome}}
**And** {{additional_criteria}}

<!-- End story repeat -->
