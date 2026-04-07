---
stepsCompleted:
  - step-01-document-discovery
  - step-02-prd-analysis
  - step-03-epic-coverage-validation
  - step-04-ux-alignment
  - step-05-epic-quality-review
  - step-06-final-assessment
workflowStatus: complete
assessedAt: "2026-04-07"
assessmentRun: 2
priorRunVerdict: "NOT READY"
currentRunVerdict: "NEEDS WORK"
documents:
  prd: docs/planning-artifacts/prd.md
  architecture: docs/planning-artifacts/architecture.md
  epics: docs/planning-artifacts/epics-and-stories.md
  ux: docs/planning-artifacts/ux-design-specification.md
---

# Implementation Readiness Assessment Report — Run 2

**Date:** 2026-04-07
**Project:** dentilflow-frontend
**Prior Run Verdict:** 🔴 NOT READY (23 issues)
**This Run Verdict:** 🟡 NEEDS WORK (5 issues)

---

## Step 1 — Document Discovery

All planning artifacts present. No duplicates. No sharded folders. Deleted 1 abandoned 2 KB IR stub (`implementation-readiness-report.md`).

| Document        | File                         | Size    | Modified         |
| --------------- | ---------------------------- | ------- | ---------------- |
| PRD             | `prd.md`                     | 36 KB   | 2026-04-07 21:48 |
| Architecture    | `architecture.md`            | 59.3 KB | 2026-04-07 20:57 |
| Epics & Stories | `epics-and-stories.md`       | 15 KB   | 2026-04-07 22:03 |
| UX Design       | `ux-design-specification.md` | 29.4 KB | 2026-04-07 21:49 |

---

## Step 2 — PRD Analysis

### Functional Requirements (42 total)

| #    | Requirement                                                                                                              |
| ---- | ------------------------------------------------------------------------------------------------------------------------ |
| FR1  | A visitor can register as a patient with name, phone number, email, and password — or via Google OAuth.                  |
| FR2  | A registered user can log in with email and password, or via Google OAuth, and receive a JWT access token.               |
| FR3  | The system enforces RBAC — Patient, Secretariat, Dental Assistant, Doctor, Admin — at the API layer for every request.   |
| FR4  | An Admin can create staff accounts and assign roles.                                                                     |
| FR5  | An Admin can deactivate or modify staff accounts.                                                                        |
| FR6  | A patient can view and update their own profile (name, phone, email).                                                    |
| FR7  | Authenticated sessions expire and refresh tokens are rotated on reuse.                                                   |
| FR8  | A patient can view available appointment slots and book online.                                                          |
| FR9  | A secretary can create a walk-in appointment.                                                                            |
| FR10 | A secretary can create a phone appointment on behalf of a patient.                                                       |
| FR11 | A secretary can view, confirm, reschedule, and cancel any appointment.                                                   |
| FR12 | The system prevents double-booking of a doctor's slot in real time.                                                      |
| FR13 | A patient receives a booking confirmation notification (WhatsApp primary, email fallback).                               |
| FR14 | A patient receives an appointment reminder notification before their appointment.                                        |
| FR15 | An Admin can configure clinic working hours and doctor availability schedules.                                           |
| FR16 | The system maintains a real-time patient queue with statuses: Arrived, Waiting, In Chair, Done.                          |
| FR17 | A secretary can update a patient's waiting room status.                                                                  |
| FR18 | A doctor can view their own patient queue in real time and transition a patient to In Chair.                             |
| FR19 | A dental assistant can view the active patient queue (read-only).                                                        |
| FR20 | All waiting room status changes propagate to all authorized role views within 3 seconds.                                 |
| FR21 | A doctor can record treatment acts (tooth number FDI, procedure, price per act).                                         |
| FR22 | A dental assistant can enter treatment acts during an active session, marked as pending confirmation.                    |
| FR23 | A doctor can review, edit, and confirm acts entered by a dental assistant before closing a session.                      |
| FR24 | The system calculates the total cost of a visit automatically from recorded acts.                                        |
| FR25 | A doctor and secretary can view the full treatment history of any patient.                                               |
| FR26 | An Admin can manage the clinic's act catalog — add, edit, deactivate procedures with default prices.                     |
| FR27 | A secretary and doctor can view a patient's full profile: demographics, appointments, treatment history, balance.        |
| FR28 | A secretary can create and update patient demographic information.                                                       |
| FR29 | A patient can view their own appointment history and upcoming appointments.                                              |
| FR30 | At visit close, a secretary can review the visit summary and record payment.                                             |
| FR31 | A secretary can record a full payment, clearing the session balance.                                                     |
| FR32 | A secretary can record a partial payment, outstanding balance carried forward.                                           |
| FR33 | The system maintains a running account balance per patient, updated after each checkout.                                 |
| FR34 | A secretary and doctor can view a patient's current account balance at any point.                                        |
| FR35 | A secretary can schedule the patient's next appointment from the checkout flow.                                          |
| FR36 | All user-facing flows are available in Arabic (RTL), French, and English.                                                |
| FR37 | A user can select their preferred language; the UI re-renders with correct directionality.                               |
| FR38 | Patient registration and consent flows display language-appropriate consent text.                                        |
| FR39 | An Admin can configure clinic details (name, address, contact information).                                              |
| FR40 | An Admin can view a summary of clinic activity: appointments, visits, and payment totals.                                |
| FR41 | An Admin can manage multiple doctors and assign working schedules per doctor.                                            |
| FR42 | The UI supports a light/dark theme toggle; selected theme persists across sessions and applies across all role surfaces. |

### Non-Functional Requirements (19 total)

| #     | Requirement                                                                                     |
| ----- | ----------------------------------------------------------------------------------------------- |
| NFR1  | Booking flow completes end-to-end in ≤3 seconds on 4G mobile.                                   |
| NFR2  | Queue status updates propagate to all connected clients within ≤3 seconds.                      |
| NFR3  | Secretary/doctor dashboard views load within ≤2 seconds under normal load.                      |
| NFR4  | System supports ≥50 concurrent authenticated users per clinic without degradation.              |
| NFR5  | All data in transit encrypted using TLS 1.2 or higher.                                          |
| NFR6  | All patient data at rest encrypted using AES-256.                                               |
| NFR7  | JWT access tokens expire within 15 minutes; refresh tokens rotated on every use.                |
| NFR8  | Every API endpoint independently validates role authorization.                                  |
| NFR9  | All patient record access logged with user ID, role, timestamp, action — immutable audit log.   |
| NFR10 | Patient data isolated per clinic — cross-clinic access architecturally impossible at MVP.       |
| NFR11 | Architecture supports horizontal scaling without architectural changes.                         |
| NFR12 | Data model includes `clinic_id` scoping on all entities from day one.                           |
| NFR13 | System handles up to 200 appointments per clinic per day without degradation.                   |
| NFR14 | System availability ≥99.5% during clinic business hours.                                        |
| NFR15 | Notification delivery failures do not cause appointment booking to fail.                        |
| NFR16 | On real-time connection loss, clients reconnect and resync queue state within 10 seconds.       |
| NFR17 | Arabic RTL layout is pixel-accurate — no component renders in LTR when Arabic locale is active. |
| NFR18 | Language switching is instantaneous (client-side) with no full-page reload.                     |
| NFR19 | All date, time, and number formats adapt to the active locale.                                  |

### PRD Completeness Assessment

**PASS.** PRD is thorough and well-structured. All 42 FRs and 19 NFRs are clearly numbered and grouped. User journeys (6), RBAC matrix, compliance notes, integration table, and FR42 (dark mode) are all present. No PRD gaps.

---

## Step 3 — Epic Coverage Validation

### Coverage Matrix

| FR   | Requirement Summary                            | Story             | Status     |
| ---- | ---------------------------------------------- | ----------------- | ---------- |
| FR1  | Patient registration (email/password or OAuth) | E1-S5             | ✅ Covered |
| FR2  | Login + JWT                                    | E1-S3             | ✅ Covered |
| FR3  | RBAC at API layer                              | E1-S3             | ✅ Covered |
| FR4  | Admin creates staff                            | E5-S1             | ✅ Covered |
| FR5  | Admin deactivates/modifies staff               | E5-S1             | ✅ Covered |
| FR6  | Patient views/updates own profile              | E5-S5             | ✅ Covered |
| FR7  | Session expiry + refresh rotation              | E1-S3             | ✅ Covered |
| FR8  | Patient views slots + books online             | E2-S1             | ✅ Covered |
| FR9  | Secretary walk-in appointment                  | E2-S2             | ✅ Covered |
| FR10 | Secretary phone appointment                    | E2-S2             | ✅ Covered |
| FR11 | Secretary confirm/reschedule/cancel            | E2-S2             | ✅ Covered |
| FR12 | Real-time double-booking prevention            | E2-S1, E2-S3      | ✅ Covered |
| FR13 | Booking confirmation notification              | E2-S4             | ✅ Covered |
| FR14 | Appointment reminder notification              | E2-S4             | ✅ Covered |
| FR15 | Admin configures working hours + schedules     | E5-S4             | ✅ Covered |
| FR16 | Real-time queue with 4 statuses                | E3-S1             | ✅ Covered |
| FR17 | Secretary updates queue status                 | E3-S1             | ✅ Covered |
| FR18 | Doctor views queue + In Chair transition       | E3-S2             | ✅ Covered |
| FR19 | Dental assistant read-only queue               | E3-S2             | ✅ Covered |
| FR20 | Status changes propagate within 3 seconds      | E3-S2, E3-S3      | ✅ Covered |
| FR21 | Doctor records treatment acts                  | E4-S1             | ✅ Covered |
| FR22 | Assistant enters acts (pending confirm)        | E4-S1             | ✅ Covered |
| FR23 | Doctor confirms assistant acts                 | E4-S2             | ✅ Covered |
| FR24 | Auto-calculate visit total                     | E4-S2, E4-S3      | ✅ Covered |
| FR25 | Full treatment history view                    | E5-S3             | ✅ Covered |
| FR26 | Admin manages act catalog                      | E5-S2             | ✅ Covered |
| FR27 | Full patient profile view                      | E5-S3             | ✅ Covered |
| FR28 | Secretary updates patient demographics         | E5-S3             | ✅ Covered |
| FR29 | Patient views own appointment history          | E5-S5             | ✅ Covered |
| FR30 | Visit summary + payment recording              | E4-S3             | ✅ Covered |
| FR31 | Full payment                                   | E4-S3             | ✅ Covered |
| FR32 | Partial payment + balance carry-forward        | E4-S3             | ✅ Covered |
| FR33 | Running account balance                        | E4-S3             | ✅ Covered |
| FR34 | View patient balance                           | E4-S3             | ✅ Covered |
| FR35 | Next appointment from checkout                 | E4-S3             | ✅ Covered |
| FR36 | Arabic/French/English flows                    | E1-S2, E5-S5      | ✅ Covered |
| FR37 | Language select + directionality               | E1-S2             | ✅ Covered |
| FR38 | Consent with locale-appropriate text           | E1-S5             | ✅ Covered |
| FR39 | Admin configures clinic details                | E5-S4             | ✅ Covered |
| FR40 | Admin views clinic activity summary            | E5-S4             | ✅ Covered |
| FR41 | Admin manages doctor schedules                 | E5-S4             | ✅ Covered |
| FR42 | Light/dark theme toggle + persistence          | E1-S5 (mistagged) | ⚠️ PARTIAL |

### Coverage Statistics

- Total PRD FRs: **42**
- Fully covered: **41**
- Partially covered: **1** (FR42)
- Missing: **0**
- **Coverage: 97.6%**

### FR42 Coverage Gap Detail

In E1-S5, the text `(FR1, FR42)` appears in the Google OAuth AC: "Google OAuth is available as an alternative registration path (FR1, FR42)." This is a tagging error. FR42 is the dark mode theme toggle — it has nothing to do with OAuth registration. No story contains ACs for: theme toggle UI, theme persistence across sessions, or cross-role surface consistency. The `ThemeModeToggle` component is defined in the UX spec but not tested by any story.

**Recommendation:** Add an AC to E1-DT2 (design system primitives): _"ThemeModeToggle supports light/dark switching; selected theme persists to localStorage and is applied consistently across all role surfaces."_ Remove the `FR42` tag from the E1-S5 OAuth AC.

---

## Step 4 — UX Alignment Assessment

### UX Document Status

Found and complete: `docs/planning-artifacts/ux-design-specification.md` — all 14 workflow steps completed, `workflowStatus: complete`.

### UX ↔ PRD Alignment

| UX Feature                                        | PRD Mapping                     | Status                                          |
| ------------------------------------------------- | ------------------------------- | ----------------------------------------------- |
| Mobile-first patient booking with language switch | FR8, FR36, FR37                 | ✅ Aligned                                      |
| Google OAuth path (Journey 1)                     | FR1, FR2                        | ✅ Aligned — FR1/FR2 updated to include OAuth   |
| PatientConsentScreen (Journey 1)                  | FR38                            | ✅ Aligned — added in prior remediation session |
| BookingConfirmationNotice (4 states)              | FR13, NFR15                     | ✅ Aligned                                      |
| Appointment reminder                              | FR14                            | ✅ Referenced in E2-S4                          |
| ClinicQueueBoard with delayed-sync + retry        | FR16–FR20, NFR16                | ✅ Aligned                                      |
| WalkInQuickIntake                                 | FR9                             | ✅ Aligned                                      |
| TreatmentActsEditor (draft/pending/confirmed)     | FR21–FR23                       | ✅ Aligned                                      |
| CheckoutBalanceSummary (paid/partial/outstanding) | FR30–FR35                       | ✅ Aligned                                      |
| ThemeModeToggle + dual-theme                      | FR42                            | ✅ Aligned — FR42 added to PRD                  |
| RTL/LTR parity strategy                           | FR36, FR37, NFR17–19            | ✅ Aligned                                      |
| WCAG 2.1 AA + visual regression CI                | NFR-S1, NFR-S2                  | ✅ Aligned                                      |
| Admin UX journey flow                             | FR39–FR41, FR4, FR5, FR15, FR26 | ⚠️ Warning — no admin mermaid flow              |
| Patient self-service UX journey                   | FR6, FR29                       | ⚠️ Warning — no patient portal journey flow     |
| ThemeModeToggle in implementation roadmap         | FR42 (MVP)                      | ⚠️ Warning — placed in Phase 3, not Phase 1     |

### UX ↔ Architecture Alignment

| Requirement                                          | Architecture Support       | Status         |
| ---------------------------------------------------- | -------------------------- | -------------- |
| SSE real-time queue with reconnect + snapshot resync | E3-S3, architecture doc    | ✅ Confirmed   |
| Next.js App Router + i18n locale routing             | Frontend stack             | ✅ Aligned     |
| MUI + Tailwind + design tokens                       | Frontend stack             | ✅ Aligned     |
| Google OAuth via NextAuth v4                         | Integration table, FR1/FR2 | ✅ Aligned     |
| Dark mode token-based theming                        | No architectural conflict  | ✅ No conflict |
| WCAG 2.1 AA + CI visual regression                   | NFR-S1, NFR-S2             | ✅ Aligned     |

### UX Alignment Warnings (3)

| Severity   | Issue                                                                                                                                                                                                                                                                             |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⚠️ Warning | `ThemeModeToggle` placed in Phase 3 of UX implementation roadmap — FR42 is an MVP requirement. Should be moved to Phase 1 or Phase 2 to avoid deferral confusion during sprint planning.                                                                                          |
| ⚠️ Warning | No admin UX journey flow defined (Karim journey). Admin screens (clinic config, staff management, act catalog, dashboard) have component definitions but no mermaid flowchart. Low risk — surfaces are straightforward CRUD — but a journey confirms the expected admin sequence. |
| ⚠️ Warning | No patient self-service portal UX journey defined. FR6 (profile edit) and FR29 (appointment history) covered in E5-S5 story but no mermaid flow in UX spec. Same low-risk caveat as admin.                                                                                        |

None of these warnings are blockers. The consent flow, OAuth flow, and notification confirmation component are all correctly specified following prior remediation.

---

## Step 5 — Epic Quality Review

### Epic E1 — Foundation, Auth, and App Shell

| Story  | User Value                           | ACs Quality                                  | Verdict                      |
| ------ | ------------------------------------ | -------------------------------------------- | ---------------------------- |
| E1-DT1 | ✅ Correctly dev task                | Definition of done ✅                        | Pass                         |
| E1-S2  | ✅ Locale/RTL user value             | locale routes, dir=rtl, date formatting ✅   | Pass                         |
| E1-S3  | ✅ Auth + guards user value          | session contents, route guards, redirect ✅  | Pass                         |
| E1-DT2 | ✅ Correctly dev task                | Definition of done ✅                        | Pass                         |
| E1-S5  | ✅ Registration + consent user value | OAuth, consent, locale, returning patient ✅ | Pass — FR42 mistagging minor |

### Epic E2 — Appointment Intake and Scheduling

E2-S1 depends on E5-S4 (working hours for slot generation) — cross-epic numbered out of order. **Correctly documented in dependency order section and sprint cut. Not a defect.**

| Story | User Value | ACs Quality                                                              | Verdict |
| ----- | ---------- | ------------------------------------------------------------------------ | ------- |
| E2-S1 | ✅         | Slot discovery, conflict, auth redirect, API error ✅                    | Pass    |
| E2-S2 | ✅         | Full lifecycle: create/confirm/reschedule/cancel, walk-in queue entry ✅ | Pass    |
| E2-S3 | ✅         | Conflict error + alternatives + no-duplicate ✅                          | Pass    |
| E2-S4 | ✅         | WhatsApp, email fallback, graceful degradation, non-blocking ✅          | Pass    |

### Epic E3 — Real-Time Waiting Room

| Story | User Value | ACs Quality                                                                                                                          | Verdict       |
| ----- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| E3-S1 | ✅         | ⚠️ **Minor** — "sorted for operational clarity" does not specify sort key (arrival time? status priority?); "guardrails" not defined | Minor concern |
| E3-S2 | ✅         | NFR2 measurability, role safety, delayed-sync indicator ✅                                                                           | Pass          |
| E3-S3 | ✅         | Reconnect backoff, snapshot resync, visible recovery ✅                                                                              | Pass          |

### Epic E4 — Clinical Treatment, Checkout, and Balance

| Story | User Value | ACs Quality                                                                                                                                                                                              | Verdict       |
| ----- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| E4-S1 | ✅         | Add/edit/remove rows, FDI validation, catalog prefill ✅                                                                                                                                                 | Pass          |
| E4-S2 | ✅         | ⚠️ **Minor** — "Post-confirm edit policy is enforced visibly" — the policy itself is not stated. Can the doctor edit after confirm? Can the assistant? A dev agent will need to infer from architecture. | Minor concern |
| E4-S3 | ✅         | Very strong — FR31/32/33/34 all explicit, balance states, component reference ✅                                                                                                                         | Pass          |

### Epic E5 — Admin Configuration and Patient Record Views

| Story | User Value | ACs Quality                                            | Verdict |
| ----- | ---------- | ------------------------------------------------------ | ------- |
| E5-S1 | ✅         | CRUD flows + role assignment + server-side feedback ✅ | Pass    |
| E5-S2 | ✅         | CRUD + duplicate validation + downstream reflection ✅ | Pass    |
| E5-S3 | ✅         | Enumerated sections, role safety explicit, FR28 ✅     | Pass    |
| E5-S4 | ✅         | Working hours → slot dependency documented, FR refs ✅ | Pass    |
| E5-S5 | ✅         | Role guard at API layer, trilingual parity ✅          | Pass    |

### NFR Stories

| Story  | ACs Quality                                                                | Verdict |
| ------ | -------------------------------------------------------------------------- | ------- |
| NFR-S1 | axe/Lighthouse, keyboard, screen reader, no-color-only, manual test ✅     | Pass    |
| NFR-S2 | CI gate, Playwright + Percy/Chromatic, NFR17/18/19 explicitly verified ✅  | Pass    |
| NFR-S3 | Skeleton/spinner/empty states, latency budget CI verification, NFR1/2/3 ✅ | Pass    |

### Epic Quality Summary

| Severity    | Count | Detail                                                                      |
| ----------- | ----- | --------------------------------------------------------------------------- |
| 🔴 Critical | 0     | —                                                                           |
| 🟠 Major    | 0     | —                                                                           |
| 🟡 Minor    | 2     | E3-S1 sort key/guardrail vagueness; E4-S2 post-confirm edit policy unstated |

---

## Step 6 — Final Assessment

### Overall Readiness Status

# 🟡 NEEDS WORK — Small gaps remain; implementation can begin on E1 foundation stories

---

### Issues Summary

| #   | Severity | Category     | Issue                                                                    | Recommended Fix                                                                               |
| --- | -------- | ------------ | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| 1   | 🟠       | FR Coverage  | FR42 has no dark-mode ACs — only a mistagged reference in E1-S5          | Add dark-mode theme AC to E1-DT2 definition of done; remove `FR42` from E1-S5 OAuth AC        |
| 2   | 🟡       | UX Alignment | `ThemeModeToggle` placed in Phase 3 of UX roadmap — FR42 is MVP scope    | Move ThemeModeToggle to Phase 1 or Phase 2 in UX implementation roadmap                       |
| 3   | 🟡       | UX Alignment | No admin UX journey flow (FR39–FR41, FR4, FR5, FR15, FR26)               | Add admin configuration mermaid flow to UX spec (low risk — CRUD surface)                     |
| 4   | 🟡       | UX Alignment | No patient self-service portal UX journey (FR6, FR29)                    | Add patient portal journey to UX spec (low risk)                                              |
| 5   | 🟡       | Epic Quality | E3-S1 sort key/guardrails vague; E4-S2 post-confirm edit policy unstated | Add sort-by-arrival AC to E3-S1; state edit policy (doctor-only edits after confirm) in E4-S2 |

**Total issues: 5** — down from **23** in Run 1.

### What Has Been Remediated (vs. Run 1)

| Run 1 Issue                                                  | Status                                        |
| ------------------------------------------------------------ | --------------------------------------------- |
| 8 missing FRs (FR1, FR6, FR13, FR14, FR15, FR29, FR38, FR39) | ✅ All 8 now covered                          |
| 2 partial FRs (FR40, FR41)                                   | ✅ Both fully covered in E5-S4                |
| 2 dev tasks masquerading as user stories (E1-S1, E1-S4)      | ✅ Reframed as E1-DT1, E1-DT2                 |
| 3 NFR stories with no ACs (NFR-S1/S2/S3)                     | ✅ All rewritten with full testable ACs       |
| 5 thin AC issues (E2-S1, E2-S2, E3-S2, E4-S3, E5-S3)         | ✅ All strengthened                           |
| UX consent step missing from Journey 1                       | ✅ PatientConsentScreen added                 |
| UX notification UX absent (FR13)                             | ✅ BookingConfirmationNotice added            |
| Google OAuth not in PRD                                      | ✅ FR1/FR2 updated, integration table updated |
| Dark mode not in PRD                                         | ✅ FR42 added                                 |

### Recommended Next Steps

1. **(5 min)** Fix FR42 tagging: add dark-mode AC to E1-DT2 definition of done; remove `(FR1, FR42)` from E1-S5 OAuth AC, change to `(FR1)`.
2. **(10 min)** Move `ThemeModeToggle` from Phase 3 to Phase 1 in `ux-design-specification.md` Implementation Roadmap.
3. **(Optional, lower priority)** Add admin configuration mermaid journey and patient self-service journey to UX spec for completeness.
4. **(Optional, lower priority)** Add sort-by-arrival AC to E3-S1; state post-confirm edit policy in E4-S2.
5. **Proceed with sprint planning** — E1 foundation stories (DT1, DT2, S2, S3, S5) and E5-S4 (clinic config) are fully ready. Implementation can begin while items 1–2 are patched.

### Final Note

Run 2 assessed **42 FRs** across **5 epics + 3 NFR stories**. Coverage improved from 70.7% (Run 1) to 97.6% (Run 2). Issue count reduced from 23 to 5, with zero critical or blocking issues remaining. The two highest-priority fixes (FR42 tagging, ThemeModeToggle roadmap phase) are each under 5 minutes. The foundation is solid — this project is close to fully implementation-ready.

**Assessor:** Winston (System Architect, BMad)
**Assessment Date:** 2026-04-07
**Report File:** `docs/planning-artifacts/implementation-readiness-report-2026-04-07.md`

| #    | Requirement                                                                                                            |
| ---- | ---------------------------------------------------------------------------------------------------------------------- |
| FR1  | A visitor can register as a patient with name, phone number, email, and password.                                      |
| FR2  | A registered user can log in with email and password and receive a JWT access token.                                   |
| FR3  | The system enforces RBAC — Patient, Secretariat, Dental Assistant, Doctor, Admin — at the API layer for every request. |
| FR4  | An Admin can create staff accounts and assign roles.                                                                   |
| FR5  | An Admin can deactivate or modify staff accounts.                                                                      |
| FR6  | A patient can view and update their own profile (name, phone, email).                                                  |
| FR7  | Authenticated sessions expire and refresh tokens are rotated on reuse.                                                 |
| FR8  | A patient can view available appointment slots and book online.                                                        |
| FR9  | A secretary can create a walk-in appointment.                                                                          |
| FR10 | A secretary can create a phone appointment on behalf of a patient.                                                     |
| FR11 | A secretary can view, confirm, reschedule, and cancel any appointment.                                                 |
| FR12 | The system prevents double-booking of a doctor's slot in real time.                                                    |
| FR13 | A patient receives a booking confirmation notification (WhatsApp primary, email fallback).                             |
| FR14 | A patient receives an appointment reminder notification before their appointment.                                      |
| FR15 | An Admin can configure clinic working hours and doctor availability schedules.                                         |
| FR16 | The system maintains a real-time patient queue with statuses: Arrived, Waiting, In Chair, Done.                        |
| FR17 | A secretary can update a patient's waiting room status.                                                                |
| FR18 | A doctor can view their own patient queue in real time and transition a patient to In Chair.                           |
| FR19 | A dental assistant can view the active patient queue (read-only).                                                      |
| FR20 | All waiting room status changes propagate to all authorized role views within 3 seconds.                               |
| FR21 | A doctor can record treatment acts (tooth number FDI, procedure, price per act).                                       |
| FR22 | A dental assistant can enter treatment acts during an active session, marked as pending confirmation.                  |
| FR23 | A doctor can review, edit, and confirm acts entered by a dental assistant before closing a session.                    |
| FR24 | The system calculates the total cost of a visit automatically from recorded acts.                                      |
| FR25 | A doctor and secretary can view the full treatment history of any patient.                                             |
| FR26 | An Admin can manage the clinic's act catalog — add, edit, deactivate procedures with default prices.                   |
| FR27 | A secretary and doctor can view a patient's full profile: demographics, appointments, treatment history, balance.      |
| FR28 | A secretary can create and update patient demographic information.                                                     |
| FR29 | A patient can view their own appointment history and upcoming appointments.                                            |
| FR30 | At visit close, a secretary can review the visit summary and record payment.                                           |
| FR31 | A secretary can record a full payment, clearing the session balance.                                                   |
| FR32 | A secretary can record a partial payment, outstanding balance carried forward.                                         |
| FR33 | The system maintains a running account balance per patient, updated after each checkout.                               |
| FR34 | A secretary and doctor can view a patient's current account balance at any point.                                      |
| FR35 | A secretary can schedule the patient's next appointment from the checkout flow.                                        |
| FR36 | All user-facing flows are available in Arabic (RTL), French, and English.                                              |
| FR37 | A user can select their preferred language; the UI re-renders with correct directionality.                             |
| FR38 | Patient registration and consent flows display language-appropriate consent text.                                      |
| FR39 | An Admin can configure clinic details (name, address, contact information).                                            |
| FR40 | An Admin can view a summary of clinic activity: appointments, visits, and payment totals.                              |
| FR41 | An Admin can manage multiple doctors and assign working schedules per doctor.                                          |

### Non-Functional Requirements (19 total)

| #     | Requirement                                                                                     |
| ----- | ----------------------------------------------------------------------------------------------- |
| NFR1  | Booking flow completes end-to-end in ≤3 seconds on 4G mobile.                                   |
| NFR2  | Queue status updates propagate to all connected clients within ≤3 seconds.                      |
| NFR3  | Secretary/doctor dashboard views load within ≤2 seconds under normal load.                      |
| NFR4  | System supports ≥50 concurrent authenticated users per clinic without degradation.              |
| NFR5  | All data in transit encrypted using TLS 1.2 or higher.                                          |
| NFR6  | All patient data at rest encrypted using AES-256.                                               |
| NFR7  | JWT access tokens expire within 15 minutes; refresh tokens rotated on every use.                |
| NFR8  | Every API endpoint independently validates role authorization.                                  |
| NFR9  | All patient record access logged with user ID, role, timestamp, action — immutable audit log.   |
| NFR10 | Patient data isolated per clinic — cross-clinic access architecturally impossible at MVP.       |
| NFR11 | Architecture supports horizontal scaling without architectural changes.                         |
| NFR12 | Data model includes `clinic_id` scoping on all entities from day one.                           |
| NFR13 | System handles up to 200 appointments per clinic per day without degradation.                   |
| NFR14 | System availability ≥99.5% during clinic business hours.                                        |
| NFR15 | Notification delivery failures do not cause appointment booking to fail.                        |
| NFR16 | On real-time connection loss, clients reconnect and resync queue state within 10 seconds.       |
| NFR17 | Arabic RTL layout is pixel-accurate — no component renders in LTR when Arabic locale is active. |
| NFR18 | Language switching is instantaneous (client-side) with no full-page reload.                     |
| NFR19 | All date, time, and number formats adapt to the active locale.                                  |

### PRD Completeness Assessment

PRD is thorough and well-structured. All 41 FRs and 19 NFRs are clearly numbered and grouped. User journeys, RBAC matrix, domain compliance, and integration requirements are all documented. No gaps found in the PRD itself.

---

## Epic Coverage Validation

### Coverage Matrix

| FR   | PRD Requirement Summary                                   | Epic / Story                                                       | Status     |
| ---- | --------------------------------------------------------- | ------------------------------------------------------------------ | ---------- |
| FR1  | Patient registration                                      | **NOT FOUND**                                                      | ❌ MISSING |
| FR2  | Login + JWT token                                         | E1-S3                                                              | ✓ Covered  |
| FR3  | RBAC at API layer                                         | E1-S3                                                              | ✓ Covered  |
| FR4  | Admin creates staff accounts                              | E5-S1                                                              | ✓ Covered  |
| FR5  | Admin deactivates/modifies staff                          | E5-S1                                                              | ✓ Covered  |
| FR6  | Patient views/updates own profile                         | **NOT FOUND**                                                      | ❌ MISSING |
| FR7  | Session expiry + refresh token rotation                   | E1-S3                                                              | ✓ Covered  |
| FR8  | Patient views slots + books online                        | E2-S1                                                              | ✓ Covered  |
| FR9  | Secretary creates walk-in appointment                     | E2-S2                                                              | ✓ Covered  |
| FR10 | Secretary creates phone appointment                       | E2-S2                                                              | ✓ Covered  |
| FR11 | Secretary views/confirms/reschedules/cancels              | E2-S2                                                              | ✓ Covered  |
| FR12 | Real-time double-booking prevention                       | E2-S3                                                              | ✓ Covered  |
| FR13 | Booking confirmation notification (WhatsApp/email)        | **NOT FOUND**                                                      | ❌ MISSING |
| FR14 | Appointment reminder notification                         | **NOT FOUND**                                                      | ❌ MISSING |
| FR15 | Admin configures working hours + doctor schedules         | **NOT FOUND**                                                      | ❌ MISSING |
| FR16 | Real-time patient queue with 4 statuses                   | E3-S1                                                              | ✓ Covered  |
| FR17 | Secretary updates waiting room status                     | E3-S1                                                              | ✓ Covered  |
| FR18 | Doctor views own queue + transitions to In Chair          | E3-S2                                                              | ✓ Covered  |
| FR19 | Dental assistant views queue (read-only)                  | E3-S2                                                              | ✓ Covered  |
| FR20 | Status changes propagate within 3 seconds                 | E3-S2                                                              | ✓ Covered  |
| FR21 | Doctor records treatment acts (FDI, procedure, price)     | E4-S1                                                              | ✓ Covered  |
| FR22 | Dental assistant enters acts (pending confirmation)       | E4-S1                                                              | ✓ Covered  |
| FR23 | Doctor reviews/confirms assistant acts                    | E4-S2                                                              | ✓ Covered  |
| FR24 | System auto-calculates visit total                        | E4-S3                                                              | ✓ Covered  |
| FR25 | Doctor/secretary view full treatment history              | E5-S3                                                              | ✓ Covered  |
| FR26 | Admin manages act catalog                                 | E5-S2                                                              | ✓ Covered  |
| FR27 | Secretary/doctor view full patient profile                | E5-S3                                                              | ✓ Covered  |
| FR28 | Secretary creates/updates patient demographics            | E5-S3                                                              | ✓ Covered  |
| FR29 | Patient views own appointment history                     | **NOT FOUND**                                                      | ❌ MISSING |
| FR30 | Secretary reviews visit summary + records payment         | E4-S3                                                              | ✓ Covered  |
| FR31 | Secretary records full payment                            | E4-S3                                                              | ✓ Covered  |
| FR32 | Secretary records partial payment + balance carry-forward | E4-S3                                                              | ✓ Covered  |
| FR33 | Running account balance maintained per patient            | E4-S3                                                              | ✓ Covered  |
| FR34 | Secretary/doctor view patient balance                     | E5-S3                                                              | ✓ Covered  |
| FR35 | Secretary schedules next appointment from checkout        | E4-S3                                                              | ✓ Covered  |
| FR36 | All flows available in Arabic RTL, French, English        | E1-S2, NFR-S2                                                      | ✓ Covered  |
| FR37 | Language selection + directionality switch                | E1-S2                                                              | ✓ Covered  |
| FR38 | Consent flows with language-appropriate text              | **NOT FOUND**                                                      | ❌ MISSING |
| FR39 | Admin configures clinic details                           | **NOT FOUND**                                                      | ❌ MISSING |
| FR40 | Admin views clinic activity summary                       | **NOT FOUND**                                                      | ❌ MISSING |
| FR41 | Admin manages doctor working schedules                    | **PARTIAL** (E5-S1 covers staff creation, not schedule assignment) | ⚠️ PARTIAL |

### Missing Requirements

#### ❌ Critical Missing FRs (8)

**FR1 — Patient Registration**

- Full requirement: Visitor registers as patient with name, phone, email, password.
- Impact: Without this, no patient can use the platform — it's the entry point for the patient journey.
- Recommendation: Add as E1-S5 or a new story in E2 (before E2-S1 booking flow).

**FR6 — Patient Profile Self-Service**

- Full requirement: Patient can view and update their own profile.
- Impact: Regulatory requirement (PDPC/CNDP/INPDP all require data subject access rights).
- Recommendation: Add story to E5 or E1.

**FR13 — Booking Confirmation Notification**

- Full requirement: Patient receives WhatsApp (primary) / email (fallback) confirmation upon appointment creation.
- Impact: Core product promise — this is what Journey 1 (Yasmine) depends on. The platform's WhatsApp-first differentiator is not tested.
- Recommendation: Add as a story in E2, linked to E2-S1 and E2-S2.

**FR14 — Appointment Reminder Notification**

- Full requirement: Patient receives reminder notification before scheduled appointment.
- Impact: Mapped directly to Journey 1. Incomplete without notification pipeline.
- Recommendation: Add story in E2 or a new "Notifications" epic.

**FR15 — Admin Configures Working Hours + Doctor Availability**

- Full requirement: Admin can configure clinic working hours and doctor availability schedules.
- Impact: Without this, the slot availability in patient booking (E2-S1) has no configured basis — broken dependency.
- Recommendation: Add story to E5 or alongside E5-S1.

**FR29 — Patient Views Own Appointment History**

- Full requirement: Patient views their own appointment history and upcoming appointments.
- Impact: Patient self-service is listed as core MVP. E5-S3 only covers staff views.
- Recommendation: Add patient-facing profile/history view story (can be part of E5 or E2).

**FR38 — Language-Appropriate Consent Text**

- Full requirement: Patient registration/consent flows display Arabic/French/English consent text.
- Impact: Legal/regulatory obligation for PDPC, CNDP, INPDP compliance. Cannot launch without it.
- Recommendation: Add as AC to FR1 registration story or as a dedicated story in E1.

**FR39 — Admin Configures Clinic Details**

- Full requirement: Admin can configure clinic name, address, contact information.
- Impact: Admin setup journey (Journey 5 — Karim) is incomplete without this.
- Recommendation: Add story to E5.

#### ⚠️ Partial Coverage (2)

**FR40 — Admin Views Clinic Activity Summary**

- Full requirement: Admin views summary of appointments, recorded visits, and payment totals.
- Impact: Journey 5 (Karim) explicitly references reviewing platform activity. No dashboard/reporting story exists.
- Recommendation: Add admin reporting/dashboard story to E5.

**FR41 — Admin Manages Doctor Working Schedules**

- Partial coverage: E5-S1 covers staff creation and role assignment, but the separate concern of assigning working schedules per doctor is not addressed.
- Recommendation: Expand E5-S1 AC or add E5-S4 for schedule configuration.

### NFR Coverage Assessment

| NFR                             | Status               | Notes                                                                                           |
| ------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------- |
| NFR1–NFR4 (Performance)         | ⚠️ No explicit story | NFR-S3 covers latency UX feedback but no performance acceptance criteria exist                  |
| NFR5–NFR6 (Encryption)          | ❌ No story          | Backend concern but frontend must handle TLS; no AC in any story                                |
| NFR7 (JWT expiry)               | ✓ E1-S3              | Session expiry handling in AC                                                                   |
| NFR8 (API role enforcement)     | ⚠️ Partial           | E1-S3 covers route guards; no story for validating API layer rejections                         |
| NFR9 (Audit logging)            | ❌ No story          | No frontend audit trail story; critical for regulatory compliance                               |
| NFR10 (Clinic data isolation)   | ❌ No story          | clinic_id scoping is mentioned in E1-S1 architecture scaffold but no dedicated validation story |
| NFR11–NFR14 (Scale/Reliability) | ❌ No story          | Infrastructure concerns but no stories                                                          |
| NFR15 (Notification decoupling) | ❌ No story          | Critical — notification failure must not block booking                                          |
| NFR16 (SSE reconnect/resync)    | ✓ E3-S3              | Explicitly covered                                                                              |
| NFR17–NFR19 (Localization)      | ✓ NFR-S2, E1-S2      | Well covered                                                                                    |

### Coverage Statistics

- Total PRD FRs: **41**
- FRs fully covered in epics: **29**
- FRs missing from epics: **8**
- FRs partially covered: **2** (FR40, FR41) — treated as gaps
- **Coverage: 70.7% (29/41)**

---

## UX Alignment Assessment

### UX Document Status

Found and complete: `docs/planning-artifacts/ux-design-specification.md` — all 14 workflow steps completed.

### UX ↔ PRD Alignment

| UX Requirement                                                 | PRD Mapping      | Status                                                                           |
| -------------------------------------------------------------- | ---------------- | -------------------------------------------------------------------------------- |
| Mobile-first patient booking with language switch (FR default) | FR8, FR36, FR37  | ✓ Aligned                                                                        |
| Google sign-in path for patient auth                           | FR1, FR2         | ⚠️ Gap — PRD specifies email/password only; UX adds Google OAuth                 |
| LanguageSwitcher with French default                           | FR36, FR37       | ✓ Aligned                                                                        |
| BookingModeSelector (specific dentist vs. fastest available)   | FR8              | ✓ Aligned — extends FR8                                                          |
| DentistAvailabilityPanel                                       | FR8, FR15        | ✓ Aligned                                                                        |
| ClinicQueueBoard with delayed-sync indicator + retry           | FR16–FR20, NFR16 | ✓ Aligned                                                                        |
| WalkInQuickIntake                                              | FR9              | ✓ Aligned                                                                        |
| TreatmentActsEditor (draft/pending/confirmed states)           | FR21–FR23        | ✓ Aligned                                                                        |
| CheckoutBalanceSummary (paid/partial/outstanding)              | FR30–FR35        | ✓ Aligned                                                                        |
| WhatsApp/email confirmation flow                               | FR13             | ✓ Referenced in Journey 1 — but no dedicated UX confirmation component specified |
| Dual-theme (light/dark mode)                                   | Not in PRD       | ⚠️ UX addition — ThemeModeToggle specified in UX but absent from PRD             |
| Consent text in registration                                   | FR38             | ❌ Not addressed in UX — Journey 1 flow skips consent step entirely              |

### UX ↔ Architecture Alignment

| UX Requirement                                               | Architecture Support Needed                         | Status                                                                           |
| ------------------------------------------------------------ | --------------------------------------------------- | -------------------------------------------------------------------------------- |
| SSE real-time queue updates with reconnect + snapshot resync | SSE channel, reconnect + snapshot resync            | ✓ Confirmed — E3-S3 and UX pattern aligned                                       |
| RTL/LTR locale routing (`/[locale]/*`)                       | Next.js App Router + i18n routing                   | ✓ Aligned                                                                        |
| MUI + Tailwind CSS + design tokens                           | Frontend stack decision                             | ✓ Aligned                                                                        |
| Google OAuth sign-in                                         | NextAuth v4 supports it; PRD does not mention OAuth | ⚠️ Needs PRD update — UX shows Google sign-in; PRD only specifies email/password |
| Dark mode token-based theming                                | Frontend concern — no architectural conflict        | ✓ No conflict                                                                    |
| WCAG 2.1 AA + visual regression in CI                        | Testing pipeline                                    | ✓ Referenced in NFR-S1/S2 stories                                                |

### Warnings

1. **⚠️ Google OAuth undocumented** — UX Journey 1 shows "Sign in with Google." PRD FR1/FR2 specify email/password only. NextAuth v4 supports OAuth, but this is an undeclared scope addition with no story covering Google OAuth login/registration.

2. **⚠️ Dark mode not in PRD** — ThemeModeToggle and dual-theme are fully specified in UX but absent from PRD. Ambiguity during implementation — needs formal inclusion in PRD (as FR42) or explicit deferral to post-MVP.

3. **❌ Consent step missing in UX Journey 1** — FR38 requires language-appropriate consent text in patient registration. UX Journey 1 moves from signup directly to booking with no consent step. Compliance risk for PDPC/CNDP/INPDP. UX flow must be updated.

4. **⚠️ Notification confirmation UX absent** — FR13 (booking confirmation via WhatsApp/email) is referenced in UX narrative but no component or UI state is defined (confirmation screen, "notification sent" indicator, fallback messaging). Will create implementation inconsistency.

---

## Epic Quality Review

### 🔴 Critical Violations

**E1-S1: Project architecture scaffold — not a user story**

- "As a developer, I need the folder/layer structure" — developer framing, zero user value.
- Acceptance criteria are purely technical checkboxes ("Lint/type-check pass", "src/ folders are present").
- Remediation: Reframe as a dev task/spike, not a story, or absorb into project setup documentation. It must not be counted toward sprint velocity as a user story.

**E1-S4: Shared design system primitives — not a user story**

- "As a team, we need reusable UI primitives" — team framing, no end-user value.
- Remediation: Convert to a dev-task entry or infrastructure item. Remove from the user story list.

**NFR-S1, NFR-S2, NFR-S3: No acceptance criteria**

- All three cross-epic stories are descriptions only — no Given/When/Then, no measurable outcomes, no definition of done.
- NFR-S1: "WCAG 2.1 AA checks on core flows" — what flows? what tool? what pass threshold?
- NFR-S2: "Arabic RTL and French/English LTR visual regression coverage" — no tool, no baseline, no scope defined.
- NFR-S3: "Standardised loading/error/empty/retry states" — no components listed, no completion criterion.
- Remediation: Rewrite all three with full AC before sprint assignment.

### 🟠 Major Issues

**E2-S1: Missing error-path acceptance criteria**

- No AC for: slot no longer available on submit, auth-required redirect, API error on booking submit.
- A story with only the happy path cannot be considered "done" — QA will have no acceptance basis for error states.
- Remediation: Add AC for unavailable-slot, auth-redirect, and API failure scenarios.

**E2-S2: FR11 reschedule/cancel not addressed**

- Story covers walk-in/phone creation only. FR11 (secretary views, confirms, reschedules, cancels appointments) has no AC.
- Remediation: Add reschedule and cancel ACs to E2-S2, or create E2-S4.

**E3-S2: Vague, untestable AC**

- "SSE stream updates list without full reload" — not testable as written. Under what latency? What is "without full reload" measurable as?
- Remediation: Rewrite as: "Queue state changes received via SSE are reflected in the UI within 3 seconds without a page reload (NFR2)."

**E4-S3: Missing balance carry-forward visibility**

- Checkout story does not include AC for: balance being visible on the patient record after checkout, or secretary/doctor seeing outstanding balance on next visit (FR33, FR34).
- Remediation: Add ACs covering post-checkout balance persistence and visibility.

**E5-S3: Vague acceptance criteria**

- "Timeline sections are filterable and role-safe" — what filters? what does role-safe mean in testable terms?
- Remediation: Specify filter options (by date, by type) and explicit role access rules (e.g., dental assistant cannot see payment section).

### 🟡 Minor Concerns

**E1 epic title/goal framing**

- "Foundation, Auth, and App Shell" reads as a technical milestone. Preferable framing: "Authenticated, localised app shell" or split into user-facing epics.
- Low priority — does not block implementation.

**E3-S1: Missing walk-in queue entry AC**

- Queue board story does not cover the moment a walk-in appointment (created in E2-S2) appears in the queue. Entry-point to the queue for secretary is undefined.
- Remediation: Add AC: "Walk-in appointment created via WalkInQuickIntake appears in today's queue immediately with status Arrived."

**Dependency order documented but not enforced in stories**

- The dependency order list at the bottom of epics-and-stories.md is correct, but individual stories do not reference their prerequisites. This is acceptable for now but should be addressed before sprint planning.

### Quality Compliance Summary

| Epic        | User Value        | Independent | AC Quality          | Forward Deps | Verdict            |
| ----------- | ----------------- | ----------- | ------------------- | ------------ | ------------------ |
| E1          | ⚠️ 2 tech stories | ✓           | ⚠️ Mixed            | ✓            | Needs fix          |
| E2          | ✓                 | ✓           | ⚠️ Thin error paths | ✓            | Needs AC additions |
| E3          | ✓                 | ✓           | ⚠️ 1 vague AC       | ✓            | Needs AC fix       |
| E4          | ✓                 | ✓           | ⚠️ Balance gap      | ✓            | Needs AC addition  |
| E5          | ✓                 | ✓           | ⚠️ 1 vague AC       | ✓            | Needs AC fix       |
| NFR stories | ❌ No ACs         | N/A         | ❌ None             | N/A          | Must rewrite       |

---

## Summary and Recommendations

### Overall Readiness Status

# 🔴 NOT READY — Implementation blocked by critical gaps

---

### Critical Issues Requiring Immediate Action

#### 1. Eight missing FR stories (epic coverage at 70.7%)

The following functional requirements from the PRD have no corresponding story in `epics-and-stories.md` and will simply not be built unless added:

| FR   | Description                                        | Risk                                         |
| ---- | -------------------------------------------------- | -------------------------------------------- |
| FR1  | Patient registration                               | Blocks entire patient journey                |
| FR6  | Patient profile self-service                       | Regulatory obligation                        |
| FR13 | Booking confirmation notification (WhatsApp/email) | Core product differentiator                  |
| FR14 | Appointment reminder notification                  | Core product differentiator                  |
| FR15 | Admin configures working hours + doctor schedules  | Booking flow has no data source without this |
| FR29 | Patient views own appointment history              | MVP patient self-service                     |
| FR38 | Language-appropriate consent text in registration  | Legal compliance gate (PDPC/CNDP/INPDP)      |
| FR39 | Admin configures clinic details                    | Admin setup journey incomplete               |

**And two partial gaps:** FR40 (admin dashboard), FR41 (doctor schedule assignment).

#### 2. UX consent step entirely absent (FR38 compliance)

The UX Journey 1 flow has no consent step. Patient registration cannot launch commercially without it under Algeria PDPC, Morocco Law 09-08, Tunisia INPDP, and GDPR. This must be added to the UX spec before epics can be updated.

#### 3. Three NFR stories have no acceptance criteria

NFR-S1 (accessibility), NFR-S2 (localisation regression), NFR-S3 (error/latency feedback) are currently just descriptions — no AC, no definition of done. They cannot be assigned to a sprint as-is.

#### 4. Two technical developer tasks masquerading as user stories

E1-S1 (project scaffold) and E1-S4 (design system primitives) are not user stories. They pollute sprint velocity tracking and have no testable user value. They must be reframed as dev tasks.

---

### Recommended Next Steps

**Priority 1 — Fix before any implementation begins**

1. **Update `epics-and-stories.md`** — Add missing stories for FR1, FR6, FR13, FR14, FR15, FR29, FR39. Expand E5-S1 or add E5-S4 for FR40/FR41.
2. **Update `ux-design-specification.md`** — Add consent step to Journey 1 registration flow; add notification confirmation UI states for FR13.
3. **Rewrite NFR-S1, NFR-S2, NFR-S3** — Add proper Given/When/Then ACs with measurable outcomes and tool/scope definitions.

**Priority 2 — Fix before sprint planning**

4. **Reframe E1-S1 and E1-S4** as dev tasks (not user stories). Remove from velocity tracking.
5. **Strengthen thin ACs** — Add error-path ACs to E2-S1; add reschedule/cancel ACs to E2-S2; rewrite vague AC in E3-S2; add balance carry-forward visibility to E4-S3; clarify role-safe filters in E5-S3.

**Priority 3 — Clarify before implementation**

6. **Resolve Google OAuth scope** — UX shows Google sign-in; PRD specifies email/password only. Decide and update one document to match.
7. **Resolve dark mode scope** — UX specifies ThemeModeToggle and dual-theme but PRD has no such requirement. Add as FR42 or defer to post-MVP explicitly.

---

### Final Note

This assessment identified **23 issues** across **4 categories** (FR coverage gaps, UX alignment issues, story quality violations, and NFR story incompleteness). The PRD and architecture documents are themselves high quality and complete. The gaps exist entirely in the epics/stories layer and UX-to-PRD consistency.

The blockers are fixable with a focused remediation session — the foundation is solid. Once the 8 missing FR stories are added and the 3 NFR stories have proper ACs, this project will be implementation-ready.

**Assessor:** Winston (System Architect, BMad)
**Assessment Date:** 2026-04-07
**Report File:** `docs/planning-artifacts/implementation-readiness-report-2026-04-07.md`
