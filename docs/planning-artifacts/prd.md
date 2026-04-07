---
stepsCompleted:
  [
    step-01-init,
    step-02-discovery,
    step-02b-vision,
    step-02c-executive-summary,
    step-03-success,
    step-04-journeys,
    step-05-domain,
    step-06-innovation,
    step-07-project-type,
    step-08-scoping,
    step-09-functional,
    step-10-nonfunctional,
    step-11-polish,
    step-12-complete,
  ]
workflowStatus: complete
completedAt: "2026-04-07"
outputFile: docs/planning-artifacts/prd.md
inputDocuments: [docs/planning-artifacts/product-brief-dentilflow-frontend.md]
workflowType: "prd"
briefCount: 1
researchCount: 0
brainstormingCount: 0
projectDocsCount: 0
classification:
  projectType: saas_b2b
  domain: healthcare
  complexity: high
  projectContext: greenfield
---

# Product Requirements Document - dentilflow-frontend

**Author:** Abdelaziz
**Date:** 2026-04-07

## Executive Summary

DentilFlow is a cloud-based dental clinic management SaaS purpose-built for the Maghreb and MENA region. It addresses a complete market gap: every incumbent dental SaaS solution (Dentrix, Curve Dental, CareStack, Eaglesoft) serves the US/Canadian market in English only — the Arabic and French-speaking North African market is entirely unserved.

The platform connects five user roles through a unified, real-time workflow: patients book appointments online in Arabic, French, or English; secretariat staff manage the full appointment lifecycle and waiting room from a clean operational dashboard; dental assistants record chair-side treatment acts; doctors access their schedule, patient context, and confirm treatments in real time; and clinic admins configure the system and oversee operations.

**Target users:** Dental clinics in Algeria, Morocco, and Tunisia — with the secretariat as the primary daily operator, doctors as real-time consumers, and patients as the self-service activation channel. Secondary: broader MENA and Francophone Africa.

**Business model:** Monthly SaaS subscription per clinic. Single pricing tier at MVP; multi-tier and multi-tenant architecture planned for V2.

### What Makes This Special

DentilFlow's moat is **localization as infrastructure, not translation as afterthought.** Arabic RTL, French, and English are first-class citizens in the UI architecture — not bolt-ons. No existing dental SaaS player offers this; building it correctly creates a multi-year lead that a US-market competitor cannot close cheaply.

The second edge is **workflow fit for the Maghrebi secretariat.** US dental SaaS is designed for US practice managers. DentilFlow's UX is designed around the actual orchestration pattern of a North African clinic front office — different handoff points, different communication channels (WhatsApp over email), different scheduling norms.

Core insight: the barrier to adoption in this market is not price or awareness — it is the total absence of a product that works in the languages and workflows of the market.

### Project Classification

| Attribute       | Value                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------- |
| Project Type    | SaaS B2B (B2B2C)                                                                                    |
| Domain          | Healthcare — Dental Clinic Management                                                               |
| Complexity      | High — regulated patient data, cross-national compliance (PDPC/CNDP/INPDP/GDPR), trilingual RTL+LTR |
| Project Context | Greenfield                                                                                          |

## Success Criteria

### User Success

- **Patient activation:** Patient completes first self-booking without staff assistance — the "midnight booking" moment realized.
- **Secretariat adoption:** Secretary manages ≥80% of daily appointment intake (walk-in, phone, online) and waiting room queue through the platform within 30 days of onboarding.
- **Doctor workflow:** Doctor records treatment acts for ≥90% of completed visits within the platform — zero paper fallback.
- **Waiting room clarity:** Doctor and secretary see real-time patient queue status (Arrived → Waiting → In Chair → Done) without verbal check-ins.
- **Checkout completion:** Each visit closes with a documented act summary, payment status, and optional next appointment — no open-ended visits.
- **Notification delivery:** Appointment confirmation and reminder delivered via WhatsApp and/or email within 2 minutes of booking confirmation.
- **Multilingual usability:** Users complete all core workflows entirely in their preferred language (Arabic RTL, French, or English) without language fallback.

### Business Success

- **Month 3:** 5 paying clinics onboarded in Algeria and/or Morocco.
- **Month 6:** 15 paying clinics; ≥40% of appointment intake via platform channels; ≥70% of visits with treatment records documented in-platform.
- **Month 12:** 40+ paying clinics; monthly churn ≤5%; secretariat DAU ≥70% of active clinic accounts.
- **Unit economics:** Customer acquisition cost recoverable within 3 months of subscription start.

### Technical Success

- **Uptime:** ≥99.5% availability during clinic business hours.
- **Real-time performance:** All waiting room queue updates reflect within 3 seconds across secretary and doctor screens.
- **Data compliance:** Patient data stored and processed in compliance with Algeria PDPC, Morocco Law 09-08 / CNDP, Tunisia INPDP, and GDPR — prior to commercial launch.
- **Role-based access:** Zero unauthorized cross-role data access incidents — enforced at API layer.

### Measurable Outcomes

| Outcome                                            | Signal                       | Target                       |
| -------------------------------------------------- | ---------------------------- | ---------------------------- |
| Platform replaces phone as primary booking channel | % appointments booked online | ≥40% by month 6              |
| Treatment documentation adoption                   | % visits with recorded acts  | ≥90% by month 6              |
| Secretariat workflow adoption                      | DAU / active clinic accounts | ≥70% by month 12             |
| Clinic retention                                   | Monthly churn rate           | ≤5%                          |
| Early traction                                     | Paid clinics                 | 5 by month 3, 40 by month 12 |

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Full-platform launch — all core clinical workflows shipped together. The treatment record and checkout are the core differentiator; shipping appointment booking without them would not demonstrate the product's value to clinic owners.
**Resource Requirements:** Full-stack MERN team; Next.js frontend with i18n/RTL capability; real-time backend (WebSocket/SSE); WhatsApp Business API integration.

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:** All six journeys (Yasmine online booking, Fatima daily workflow, Dr. Benali clinical workflow, Nour dental assistant, Karim admin setup, Yasmine partial payment edge case).

**Must-Have Capabilities:**

- JWT authentication — 5 roles: Patient, Secretariat, Dental Assistant, Doctor, Admin
- Appointment management — 3 intake channels (online, walk-in, phone) + confirmation/reminder notifications (WhatsApp + email)
- Real-time waiting room queue: Arrived → Waiting → In Chair → Done (secretary full, doctor own queue, dental assistant read-only)
- Real-time slot conflict prevention for concurrent bookings
- Clinical treatment records — act entry (FDI tooth number + procedure + price), dental assistant entry with doctor confirmation, visit total calculation
- Act catalog — Admin-managed list of procedures with default prices
- Checkout — visit summary, full/partial payment, balance carry-forward, next appointment scheduling
- Patient records — demographics, appointment history, treatment history, account balance
- Admin panel — staff management, clinic configuration, working hours
- Trilingual UI — Arabic (RTL), French, English — mobile-responsive web

### Post-MVP Features

**Phase 2 — Growth:**

- Multi-clinic / multi-tenant architecture (V2 priority)
- Advanced analytics: utilization, no-show rates, revenue by doctor/procedure
- Online payment processing (deposit or full payment at booking)
- Patient self-service: rescheduling, cancellation, balance/history view
- Dental charting visualization (tooth map UI)
- Waitlist management
- Multi-tiered subscription pricing

**Phase 3 — Expansion:**

- Adjacent medical specialties (ophthalmology, general practice)
- Native mobile apps (iOS and Android)
- Dental supply chain / inventory management
- Inter-clinic referral network
- Regional dental association distribution partnerships

### Risk Mitigation Strategy

**Technical Risks:** Real-time waiting room sync (WebSocket/SSE) and Arabic RTL layout correctness are the highest-risk implementation areas. Mitigated by: early prototype of real-time queue in sprint 1; RTL automated visual regression tests from day one.
**Market Risks:** Clinic adoption speed in a market with no prior SaaS habit. Mitigated by: secretary-first onboarding (lowest friction role); Arabic + French onboarding flow; hands-on support for first 5 clinics.
**Resource Risks:** WhatsApp Business API approval timeline is external and unpredictable. Mitigated by: email as full-featured fallback; approval process started at build kickoff, not pre-launch.

## User Journeys

### Journey 1: Yasmine — The Patient (Online Self-Booking, Success Path)

Yasmine is a 28-year-old teacher in Algiers. She's had a toothache for three days but hasn't called the clinic because she doesn't have time during her school day and forgets by evening. On Tuesday at 11pm, she remembers. She opens her phone, finds DentilFlow, switches the interface to Arabic, and searches for her dentist — Dr. Benali's clinic. She sees available slots for Thursday morning. She books the 9am slot in under two minutes. No call. No waiting.

Thursday morning her WhatsApp buzzes: a reminder in Arabic. She arrives at the clinic, tells the secretary her name. The secretary sees her on the waiting room screen — status flips to "Arrived." Yasmine waits. When the doctor is ready, her status moves to "In Chair." After treatment, she goes to checkout, the secretary shows her the total for the procedure performed, she pays in full, and the receipt shows zero balance. On her way out she books a follow-up three weeks later — from the checkout screen, in 30 seconds.

**Capabilities revealed:** Patient registration, online booking flow, WhatsApp notifications, waiting room status display (patient arrival), checkout with payment, next appointment scheduling from checkout.

---

### Journey 2: Fatima — The Secretary (Full Daily Workflow, Walk-in + Phone + Online)

Fatima runs the front desk at a mid-sized dental clinic in Casablanca. Her Tuesday starts with three walk-ins before 9am. She opens DentilFlow, creates appointments on the spot for each — name, phone, reason. They appear instantly in the waiting room queue as "Arrived." At 9:15, the phone rings: a patient wants an appointment for next Monday. She books it in 40 seconds. At 10am, she checks the online bookings that came in overnight — two new patients booked themselves. She confirms both. By midday, the queue has moved through six patients. She's never once picked up a paper form.

When Dr. Benali finishes with a patient, he clicks "Done" on his dashboard — the patient's status updates for Fatima automatically. She calls the next patient from the queue. At end of day, she reviews the appointment list for tomorrow — the platform displays it automatically in the schedule view.

**Capabilities revealed:** Walk-in appointment creation, phone booking creation, online booking review and confirmation, waiting room queue management (all three intake channels), real-time status sync between secretary and doctor views.

---

### Journey 3: Dr. Benali — The Dentist (Clinical Workflow, Treatment Recording)

Dr. Benali arrives at 8:45am. He opens his dashboard and sees his queue for the day: seven patients, three with treatment history already in the system from prior visits. He taps the first patient — Yasmine — and sees her record: last visit was a cleaning 8 months ago, no outstanding balance.

He calls her in (one click — her status moves to "In Chair" for Fatima to see). After examination, his dental assistant Nour records the acts: tooth 36, composite filling — price auto-populates from the clinic's act list. Dr. Benali reviews and confirms before closing the session. He clicks Done. Yasmine moves to the checkout queue. Dr. Benali never touches paper, never loses a treatment record.

**Capabilities revealed:** Doctor daily schedule view, patient treatment history access, act recording (tooth number + procedure + price), act catalog, doctor confirmation of assistant-entered acts, doctor-initiated status transitions, seamless handoff to checkout.

---

### Journey 4: Nour — The Dental Assistant (Chair-side Clinical Support)

Nour assists Dr. Benali during procedures. When a patient moves to "In Chair," Nour sees it on her screen and prepares the treatment room. During the procedure, Dr. Benali calls out the acts performed — Nour records them directly in the platform: tooth 46, extraction, price auto-filled. Dr. Benali reviews and confirms before closing the session. This keeps the doctor focused on the patient while the record is built in real time.

**Capabilities revealed:** Dental assistant role with access to treatment act entry during active sessions, queue visibility (read-only), doctor review and confirmation before session close.

---

### Journey 5: Karim — The Clinic Admin (Setup, Role Management, Oversight)

Karim is the clinic owner. Before going live, he logs in as Admin and spends 30 minutes setting up: adds Dr. Benali, Fatima, and Nour as users with their respective roles, configures the clinic's act catalog (procedures + prices), and sets working hours. He also adds a second doctor who joins part-time on Thursdays.

Two months later, Karim reviews platform activity: appointments, treatment records, and payment summaries. He notices one doctor has low treatment record completion — a conversation to have. No separate spreadsheet needed.

**Capabilities revealed:** Staff user creation and role assignment (all five roles), act catalog configuration, clinic working hours setup, multi-doctor support, administrative overview of clinic activity.

---

### Journey 6: Yasmine — Edge Case (Partial Payment + Balance Carry-forward)

Yasmine comes in for a root canal — an expensive multi-session procedure. At checkout, the total is 15,000 DZD. She only has 8,000 DZD today. The secretary records a partial payment of 8,000 DZD — the platform shows an outstanding balance of 7,000 DZD. Yasmine books her next session. At that next visit, the secretary and doctor both see the outstanding balance on her record before the session begins. After the second session, Yasmine pays the remaining 7,000 DZD plus the new session's acts. Balance returns to zero.

**Capabilities revealed:** Partial payment recording, running balance carry-forward across visits, balance visibility on patient record (secretary + doctor views), multi-session treatment continuity.

---

### Journey Requirements Summary

| Capability Area                                  | Driven By                                   |
| ------------------------------------------------ | ------------------------------------------- |
| Patient registration + online booking            | Journey 1 — Yasmine                         |
| WhatsApp/email notifications                     | Journey 1 — Yasmine                         |
| Walk-in, phone, and online appointment intake    | Journey 2 — Fatima                          |
| Real-time waiting room queue (multi-role)        | Journey 2 — Fatima + Journey 3 — Dr. Benali |
| Patient treatment history and clinical records   | Journey 3 — Dr. Benali                      |
| Act catalog (procedure + tooth number + price)   | Journey 3 — Dr. Benali                      |
| Dental assistant act entry + doctor confirmation | Journey 4 — Nour                            |
| Doctor-to-secretary status handoff               | Journey 3 — Dr. Benali                      |
| Checkout: acts summary + payment recording       | Journey 1 — Yasmine + Journey 6 — Edge Case |
| Partial payment + running patient balance        | Journey 6 — Edge Case                       |
| Admin: staff setup, act catalog, clinic config   | Journey 5 — Karim                           |
| Next appointment from checkout                   | Journey 1 — Yasmine                         |
| Real-time slot conflict prevention               | Journey 2 — Fatima (concurrent booking)     |

## Domain-Specific Requirements

### Compliance & Regulatory

- **Algeria PDPC** — Personal data protection law applies to patient records. Data must be collected with consent, stored securely, and subject to patient access/deletion rights.
- **Morocco Law 09-08 / CNDP** — Equivalent data protection obligations. Any clinic data for Moroccan patients must comply.
- **Tunisia INPDP** — Same framework. Patient data sovereignty requirements per country.
- **EU GDPR** — Applies to diaspora patients (Maghrebi residents of France, Belgium, etc.) accessing the platform. Cross-border data transfer rules apply.
- **No HIPAA** — US regulation does not apply. However, equivalent-standard security practices should be adopted as baseline.
- **Pre-commercial compliance gate:** All data hosting, processing agreements, and consent flows must be audited and confirmed compliant before commercial launch.

### Technical Constraints

- **Data encryption:** Patient records encrypted at rest and in transit (TLS 1.2+ minimum, AES-256 at rest).
- **Audit logging:** All access to patient records (view, create, edit, delete) must be logged with user identity, timestamp, and action — required for regulatory accountability.
- **Consent management:** Patient registration must include explicit consent for data collection and processing, with language-appropriate consent text (Arabic, French, English).
- **Data residency:** Hosting region must be contractually defined — EU-hosted or regionally-hosted depending on per-country compliance review.
- **Session security:** JWT tokens must be short-lived; refresh token rotation enforced; no persistent sessions on shared clinic devices.
- **Role-based data isolation:** Patient clinical and payment data must be accessible only to authorized roles — enforced at API layer, not just UI.

### Integration Requirements

- **WhatsApp Business API** — Primary notification channel. Must integrate with a compliant regional provider (e.g., Twilio, 360dialog, or local MENA partner). Requires WhatsApp Business Account approval.
- **Email (SMTP/transactional)** — Secondary notification channel. Standard transactional email provider (SendGrid, Mailgun, or equivalent).
- **No EMR/EHR integrations at MVP** — DentilFlow is the system of record for dental acts. No external clinical system integration required for MVP.
- **No payment gateway at MVP** — Payment recording is administrative only; no third-party payment processor integration until post-MVP.

### Risk Mitigations

| Risk                                | Mitigation                                                                                      |
| ----------------------------------- | ----------------------------------------------------------------------------------------------- |
| Patient data breach                 | Encryption at rest + in transit, audit logs, role-based access enforcement at API               |
| Regulatory non-compliance at launch | Legal review of PDPC/CNDP/INPDP requirements completed before commercial onboarding             |
| WhatsApp API rejection or delays    | Email as fallback notification channel; WhatsApp Business approval pursued early in build cycle |
| Data residency violation            | Hosting region confirmed and documented in data processing agreements per country               |
| Multi-role data leakage             | API-layer role enforcement tested as part of security acceptance criteria; no UI-only guards    |

## Innovation & Novel Patterns

### Detected Innovation Areas

**1. Trilingual-native RTL/LTR SaaS architecture**
Arabic RTL is a first-class citizen in the UI architecture — not a bolt-on translation layer. Building a SaaS product where the layout engine, component library, and data direction work bidirectionally (Arabic RTL ↔ French/English LTR) requires deliberate architectural decisions from day one. Most SaaS frameworks and component libraries assume LTR. DentilFlow's localization is infrastructure-level, not theme-level.

**2. WhatsApp-first clinical notifications**
Every US and EU dental SaaS uses email as the primary patient communication channel. DentilFlow inverts this: WhatsApp is the primary channel, email is the fallback. This reflects how MENA patients actually communicate and is a workflow pattern shift — not just a channel swap. It requires WhatsApp Business API integration and changes how confirmation and reminder flows are designed.

**3. Market and category creation innovation**
No dental clinic management SaaS exists for the Arabic-speaking, French-speaking Maghreb market. DentilFlow is not competing for market share — it is creating the category. The innovation is the act of building a professional-grade clinical operations platform for a market that has never had one, in the languages that market actually uses.

### Market Context & Competitive Landscape

- **Incumbents** (Dentrix, Curve Dental, CareStack, Eaglesoft): US/Canada market only, English only, USD pricing inaccessible to North African SMBs.
- **Regional gap**: No competitor offers dental SaaS in Arabic + French for the Maghreb market.
- **Localization moat**: Multi-year lead — a US competitor replicating Arabic RTL + regional workflow fit is a 2–3 year engineering and product investment minimum.
- **WhatsApp penetration**: WhatsApp is the dominant messaging platform across Algeria, Morocco, and Tunisia. Clinic-to-patient communication already happens there informally; DentilFlow formalizes it.

### Validation Approach

- **Localization validation**: Early clinic onboarding cohort includes Arabic-primary, French-primary, and bilingual staff — all three language paths tested under real daily usage.
- **WhatsApp notification validation**: Confirmation and reminder open/response rates tracked against email baseline from day one.
- **Market fit validation**: 5 paying clinics by month 3 is the go/no-go signal for the core value proposition.
- **Treatment record adoption**: ≥90% of visits with recorded acts by month 6 validates that platform replaces paper — the core stickiness driver.

### Risk Mitigation

| Innovation Risk                                | Mitigation                                                                                    |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------- |
| WhatsApp Business API approval delays          | Begin approval process during build phase; email as full-featured fallback                    |
| Arabic RTL layout regressions                  | RTL/LTR automated visual regression tests in CI pipeline                                      |
| Regional clinic resistance to digital adoption | Onboarding support in Arabic and French; secretary-first training flow (lowest friction role) |
| Trilingual content management complexity       | Translation keys managed centrally; document_output_language config enforces consistency      |

## SaaS B2B Specific Requirements

### Project-Type Overview

DentilFlow is a single-tenant SaaS B2B platform at MVP — one clinic instance per deployment. The data model is designed with `clinic_id` scoping from day one to enable multi-tenant architecture in V2 without a structural rewrite. The primary B2B customer is the clinic (sold to the owner/admin); the end users are clinic staff (secretariat, doctors, dental assistants) and patients.

### Tenant Model

- **MVP:** Single-tenant — one clinic per deployment, isolated data.
- **Data scoping:** All entities (patients, appointments, treatment records, staff) scoped under `clinic_id` from initial schema design.
- **V2 migration path:** Multi-tenant routing layer added in V2; data model requires no migration if `clinic_id` is enforced at MVP.

### RBAC Matrix

| Capability                         | Patient | Dental Assistant     | Secretariat | Doctor | Admin |
| ---------------------------------- | ------- | -------------------- | ----------- | ------ | ----- |
| Book own appointment (online)      | ✅      | ❌                   | ❌          | ❌     | ❌    |
| Create appointment (walk-in/phone) | ❌      | ❌                   | ✅          | ❌     | ✅    |
| Manage waiting room queue          | ❌      | Read                 | ✅          | Read   | ✅    |
| View own patient record            | ✅      | ❌                   | ❌          | ❌     | ❌    |
| View any patient record            | ❌      | ❌                   | ✅          | ✅     | ✅    |
| Enter treatment acts               | ❌      | ✅ (pending confirm) | ❌          | ✅     | ❌    |
| Confirm/close treatment session    | ❌      | ❌                   | ❌          | ✅     | ❌    |
| Checkout / record payment          | ❌      | ❌                   | ✅          | ❌     | ✅    |
| View patient balance               | ❌      | ❌                   | ✅          | ✅     | ✅    |
| Manage staff roles                 | ❌      | ❌                   | ❌          | ❌     | ✅    |
| Configure act catalog              | ❌      | ❌                   | ❌          | ❌     | ✅    |
| Configure clinic settings          | ❌      | ❌                   | ❌          | ❌     | ✅    |

All role permissions enforced at API layer. UI hides unauthorized actions but API independently validates every request.

### Subscription Tiers

- **MVP:** Single flat tier — full platform access per clinic. No feature gating, no seat limits, no usage caps at MVP.
- **Pricing model:** Monthly per-clinic subscription. Pricing amount defined by go-to-market strategy (out of scope for PRD).
- **V2:** Multi-tier pricing introduced alongside multi-tenancy (by seat count, feature tier, or clinic size).

### Integration List

| Integration                | Purpose                          | MVP | Notes                                         |
| -------------------------- | -------------------------------- | --- | --------------------------------------------- |
| WhatsApp Business API      | Patient notifications (primary)  | ✅  | Regional provider required (Twilio/360dialog) |
| Email (SMTP/transactional) | Patient notifications (fallback) | ✅  | SendGrid/Mailgun or equivalent                |
| EMR/EHR systems            | Clinical data exchange           | ❌  | Post-MVP                                      |
| Payment gateway            | Online payment processing        | ❌  | Post-MVP                                      |

### Technical Architecture Considerations

- **Auth:** JWT with refresh token rotation; short-lived access tokens; role claims encoded in token payload.
- **Real-time:** Waiting room queue updates require WebSocket or Server-Sent Events (SSE) for sub-3-second cross-client sync.
- **API design:** RESTful API; all endpoints role-scoped; no data leakage across role boundaries.
- **Frontend:** Next.js SSR with i18n routing for trilingual support; `dir="rtl"` applied at document root for Arabic locale.
- **Stack:** MERN (MongoDB, Express, React/Next.js, Node.js); Docker for containerization; Kubernetes for production orchestration.

### Implementation Considerations

- Build `clinic_id` into every data model from day one — non-negotiable for V2 multi-tenancy migration path.
- Arabic RTL must be validated in integration tests, not just manual review — layout regressions are hard to catch otherwise.
- WhatsApp Business Account approval should be initiated during the build phase, not after — approval timelines are unpredictable.
- Dental assistant act entry must be clearly marked "pending doctor confirmation" in the UI to prevent premature billing.

## Functional Requirements

### Authentication & User Management

- **FR1:** A visitor can register as a patient with name, phone number, email, and password.
- **FR2:** A registered user can log in with email and password and receive a JWT access token.
- **FR3:** The system enforces role-based access control — Patient, Secretariat, Dental Assistant, Doctor, Admin — at the API layer for every request.
- **FR4:** An Admin can create staff accounts and assign roles (Secretariat, Dental Assistant, Doctor).
- **FR5:** An Admin can deactivate or modify staff accounts.
- **FR6:** A patient can view and update their own profile (name, phone, email).
- **FR7:** Authenticated sessions expire and refresh tokens are rotated on reuse.

### Appointment Management

- **FR8:** A patient can view available appointment slots for a clinic and book an appointment online.
- **FR9:** A secretary can create a walk-in appointment for a patient who arrives at the clinic.
- **FR10:** A secretary can create a phone appointment on behalf of a patient who calls.
- **FR11:** A secretary can view, confirm, reschedule, and cancel any appointment.
- **FR12:** The system prevents double-booking of a doctor's slot in real time, including concurrent secretary bookings.
- **FR13:** A patient receives a booking confirmation notification (WhatsApp primary, email fallback) upon appointment creation.
- **FR14:** A patient receives an appointment reminder notification before their scheduled appointment.
- **FR15:** An Admin can configure the clinic's working hours and doctor availability schedules.

### Waiting Room Management

- **FR16:** The system maintains a real-time patient queue per clinic session with statuses: Arrived, Waiting, In Chair, Done.
- **FR17:** A secretary can update a patient's waiting room status (mark as Arrived, move to next status).
- **FR18:** A doctor can view their own patient queue in real time and transition a patient to In Chair.
- **FR19:** A dental assistant can view the active patient queue (read-only).
- **FR20:** All waiting room status changes propagate to all authorized role views within 3 seconds.

### Clinical Treatment Records

- **FR21:** A doctor can record treatment acts performed during a visit, specifying tooth number (FDI notation), procedure name, and price per act.
- **FR22:** A dental assistant can enter treatment acts during an active session, marked as pending doctor confirmation.
- **FR23:** A doctor can review, edit, and confirm acts entered by a dental assistant before closing a session.
- **FR24:** The system calculates the total cost of a visit automatically from recorded acts.
- **FR25:** A doctor and secretary can view the full treatment history of any patient across all visits.
- **FR26:** An Admin can manage the clinic's act catalog — add, edit, and deactivate procedures with default prices.

### Patient Records

- **FR27:** A secretary and doctor can view a patient's full profile: demographics, contact info, appointment history, treatment history, and account balance.
- **FR28:** A secretary can create and update patient demographic information.
- **FR29:** A patient can view their own appointment history and upcoming appointments.

### Checkout & Payment

- **FR30:** At visit close, a secretary can review the visit summary (acts performed + total cost) and record payment.
- **FR31:** A secretary can record a full payment, clearing the patient's session balance.
- **FR32:** A secretary can record a partial payment, with the outstanding balance carried forward to the patient's account.
- **FR33:** The system maintains a running account balance per patient, updated after each checkout.
- **FR34:** A secretary and doctor can view a patient's current account balance at any point.
- **FR35:** A secretary can schedule the patient's next appointment from the checkout flow.

### Localization & Accessibility

- **FR36:** All user-facing flows are available in Arabic (RTL layout), French, and English.
- **FR37:** A user can select their preferred language; the UI re-renders with correct directionality (RTL for Arabic, LTR for French/English).
- **FR38:** Patient registration and consent flows display language-appropriate consent text.

### Admin & Clinic Configuration

- **FR39:** An Admin can configure clinic details (name, address, contact information).
- **FR40:** An Admin can view a summary of clinic activity: appointments, recorded visits, and payment totals.
- **FR41:** An Admin can manage multiple doctors and assign working schedules per doctor.

## Non-Functional Requirements

### Performance

- **NFR1:** Patient-facing booking flow (search → select → confirm) completes end-to-end in ≤3 seconds on a 4G mobile connection.
- **NFR2:** Waiting room queue status updates propagate to all connected clients within ≤3 seconds.
- **NFR3:** All secretary and doctor dashboard views (appointments, patient records) load within ≤2 seconds under normal load.
- **NFR4:** The system supports at least 50 concurrent authenticated users per clinic instance without performance degradation.

### Security

- **NFR5:** All data in transit is encrypted using TLS 1.2 or higher.
- **NFR6:** All patient data at rest is encrypted using AES-256.
- **NFR7:** JWT access tokens expire within 15 minutes; refresh tokens are rotated on every use and invalidated on logout.
- **NFR8:** Every API endpoint independently validates role authorization; no endpoint relies solely on UI-level access control.
- **NFR9:** All access to patient records (view, create, update, delete) is logged with user ID, role, timestamp, and action type — audit log is immutable.
- **NFR10:** Patient data is isolated per clinic — cross-clinic data access is architecturally impossible at MVP.

### Scalability

- **NFR11:** The system architecture supports horizontal scaling to accommodate clinic growth without architectural changes.
- **NFR12:** The data model includes `clinic_id` scoping on all entities from day one, enabling multi-tenant architecture in V2 without data migration.
- **NFR13:** The system handles up to 200 appointments per clinic per day without degradation.

### Reliability

- **NFR14:** System availability is ≥99.5% during clinic business hours (8am–8pm local time).
- **NFR15:** Notification delivery failures (WhatsApp or email) do not cause appointment booking to fail — notifications are decoupled from the core booking flow.
- **NFR16:** In the event of a real-time connection loss, waiting room clients automatically reconnect and resync queue state within 10 seconds.

### Localization

- **NFR17:** Arabic RTL layout is pixel-accurate — no component renders in LTR when Arabic locale is active.
- **NFR18:** Language switching is instantaneous (client-side) with no full-page reload required.
- **NFR19:** All date, time, and number formats adapt to the active locale (e.g., Hijri calendar option for Arabic, 24h vs 12h time display).
