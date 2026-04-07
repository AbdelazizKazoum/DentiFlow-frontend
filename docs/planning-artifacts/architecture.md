---
stepsCompleted: [1, 2]
inputDocuments:
  - docs/planning-artifacts/product-brief-dentilflow-frontend.md
  - docs/planning-artifacts/prd.md
  - docs/planning-artifacts/ux-design-specification.md
workflowType: "architecture"
project_name: "dentilflow-frontend"
user_name: "Abdelaziz"
date: "2026-04-07"
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Pre-Architecture Locked Decisions

### 1) RTL/LTR Strategy (Next.js + Tailwind + MUI)

**Decision:** Use document-level direction with dual Emotion caches and locale-rooted layout.

- Next.js locale segment controls `lang` and `dir` on `<html>`.
- MUI uses conditional Emotion cache:
  - LTR cache for French/English
  - RTL cache with `stylis-plugin-rtl` for Arabic
- Tailwind uses RTL/LTR variants and logical utilities (`ms/me/ps/pe`) instead of physical direction utilities (`ml/mr/pl/pr`).
- Avoid `space-x-*` in directional layouts; prefer `gap-*`.
- Add RTL/LTR visual regression coverage for critical journeys.

**Rationale:** Prevents MUI/Tailwind direction conflicts and makes RTL a first-class architectural property rather than a late-stage patch.

### 2) Real-Time Waiting Room Strategy

**Decision:** Use **SSE + REST mutations + Redis pub/sub**.

- Server push channel: SSE (`text/event-stream`) for queue updates.
- Write operations: REST endpoints (e.g., status transition PATCH).
- Reconnect behavior: client auto-reconnect + explicit snapshot resync endpoint.
- Horizontal scale support: Redis pub/sub as the event backbone from day one.

**Rationale:** Meets sub-3-second propagation and reconnection requirements with lower operational complexity than WebSockets for the MVP queue workload.

### 3) `clinic_id` Scoping Strategy

**Decision:** Hybrid transport with **token-enforced authorization**.

- **JWT claim is source of truth** for effective clinic scope.
- Route clinic context (`/c/:clinicSlug`) is for UX/public discovery context.
- Header clinic hints are optional and never trusted from browser clients.
- API rejects route/header clinic mismatches against token scope.
- All DB reads/writes enforce `clinic_id` filtering.
- SSE subscriptions and audit logs are always clinic-scoped.

**Rationale:** Ensures cross-clinic access is architecturally impossible while keeping clean URL UX and future V2 multi-tenant extensibility.

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
The project defines 41 FRs spanning 8 architectural domains: authentication and role lifecycle, multi-channel appointment management, real-time waiting room operations, clinical treatment records with confirmation workflow, patient longitudinal records, checkout and balance carry-forward, trilingual localization, and admin configuration/oversight.
Architecturally, this implies a role-segmented application shell, strongly guarded API boundaries, event-driven queue updates, and a domain model that preserves visit-state integrity from intake through checkout.

**Non-Functional Requirements:**
The system is constrained by strict NFRs: queue/event propagation within 3 seconds, dashboard/booking responsiveness, encryption in transit and at rest, short-lived JWT with refresh rotation, immutable patient-record audit logs, and hard clinic data isolation.
Localization NFRs require pixel-accurate Arabic RTL behavior, instant language switching, and locale-specific formatting. Reliability NFRs require reconnect and state resync within 10 seconds after real-time link loss.

**Scale & Complexity:**
DentilFlow is a high-complexity, compliance-sensitive SaaS product with concurrent role workflows and real-time operational coupling.

- Primary domain: Full-stack web SaaS for dental clinic operations
- Complexity level: High
- Estimated architectural components: 14–18 core components/services (auth, RBAC guard, clinic scoping, appointment engine, queue real-time pipeline, treatment workflow, checkout/balance, patient record service, notification service, consent/audit subsystem, i18n/RTL infrastructure, admin config, observability, integration adapters)

### Technical Constraints & Dependencies

- Stack and platform constraints: MERN + Next.js SSR, responsive web first, role-specific UX shells.
- Security constraints: API-enforced RBAC, JWT expiry/rotation, TLS, AES-256 at rest, immutable audit logging.
- Compliance constraints: PDPC/CNDP/INPDP/GDPR-aligned handling, explicit consent text by locale.
- Real-time constraints: low-latency queue synchronization and reconnect/resync behavior.
- Integration dependencies: WhatsApp Business API (primary notifications), transactional email fallback.
- Product boundary constraints: no EMR/EHR and no payment gateway in MVP.
- Data model constraint: mandatory `clinic_id` scoping from day one to preserve V2 multi-tenant migration path.

### Cross-Cutting Concerns Identified

- Authorization and role-boundary enforcement across all endpoints.
- Tenant isolation and anti-leak guarantees (`clinic_id` everywhere).
- Real-time consistency and conflict-safe transitions across secretary/doctor/assistant views.
- Localization infrastructure (Arabic RTL + French/English LTR parity).
- Compliance, consent, and immutable auditability.
- Notification decoupling and delivery fallback behavior.
- Accessibility and responsive usability in high-frequency operational screens.
- Observability for latency, sync failures, and security-critical events.
