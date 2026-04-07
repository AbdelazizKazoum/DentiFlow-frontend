# Story E1.S2: locale-rtl-ltr-runtime

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a user,
I want to switch between Arabic, French, and English,
so that I get the correct layout direction and formatting for my language.

## Acceptance Criteria

1. Locale routes exist (`/[locale]/*`).
2. Arabic sets document `dir=rtl`; French and English set `dir=ltr`.
3. Logical spacing utilities are used in directional layouts (e.g., instead of physical utilities).
4. Date/time and number formatting are locale-aware.

## Tasks / Subtasks

- [x] Set up Next.js `[locale]` route segment architecture (AC: 1)
  - [x] Implement `next-intl` or equivalent localized routing
  - [x] Configure supported locales: `ar`, `fr`, `en`
  - [x] Handle locale detection and middleware routing redirects
- [x] Configure document-level direction and RTL/LTR caching (AC: 2)
  - [x] Set `lang` and `dir` on `<html>` tag based on active locale
  - [x] Setup MUI dual Emotion caches (LTR default, RTL with `stylis-plugin-rtl` for Arabic)
- [x] Implement logical spacing utilities standards (AC: 3)
  - [x] Configure Tailwind with RTL/LTR variants
  - [x] Map logical properties (`ms`, `me`, `ps`, `pe` instead of `ml`, `mr`, `pl`, `pr`)
- [x] Ensure formatting utility implementations (AC: 4)
  - [x] Implement locale-aware date/time formatting functions
  - [x] Implement locale-aware number/currency formatting functions

### Review Findings

- [x] [Review][Patch] Tailwind RTL configuration missing — Tailwind v4 has built-in RTL support, no config needed
- [x] [Review][Patch] No error handling for invalid date inputs [formatters.ts] — Added try-catch with fallback

## Dev Notes

- **Tech Stack:** Next.js App Router, Tailwind CSS v4, MUI v6, `next-intl` (recommended for Next.js app router i18n), `stylis` / `stylis-plugin-rtl`.
- **RTL Strategy:** We use document-level direction with dual Emotion caches and a locale-rooted layout. Crucially, Tailwind must use logical utilities (`ms/me/ps/pe`) to prevent conflicts with MUI and ensure bidirectional layout fluidity without bespoke CSS overrides.
- **Testing:** Include RTL/LTR visual regression coverage for critical journeys (playwright + percy/chromatic).
- **Date Handling:** The database stores dates in UTC; all display formatting occurs at render time based on the active locale.

### Project Structure Notes

- Layouts and pages should fall under `src/app/[locale]/...`
- Component directories: `src/presentation` / `src/shared` should host the UI components following clear UI layer conventions.

### References

- [Source: docs/planning-artifacts/epics-and-stories.md#Story E1-S2: Locale + RTL/LTR runtime]
- [Source: docs/planning-artifacts/architecture.md#1) RTL/LTR Strategy (Next.js + Tailwind + MUI)]

## Dev Agent Record

### Agent Model Used

Gemini 3.1 Pro (Preview)

### Debug Log References

- Set status to ready-for-dev

### Completion Notes List

- Ultimate context engine analysis completed - comprehensive developer guide created.
- Implemented `next-intl` configuration and middleware handling for `ar`, `fr`, and `en` with proper redirection rules.
- Set document `lang` and `dir="rtl"` in HTML tags and integrated `EmotionRegistry` from MUI utilizing `stylis-plugin-rtl` for conditional Arabic direction formatting.
- Integrated `AppThemeProvider` with zero-config Tailwind v4 RTL/LTR logical classes.
- Created `formatters.ts` with custom wrappers leveraging `Intl.NumberFormat` and `Intl.DateTimeFormat` for localization accuracy (DZD currency and localized parsing support).- Code review completed: 2 patch findings addressed (Tailwind RTL built-in, error handling added to formatters).
- Status updated to done.

### File List

- `apps/frontend/src/shared/theme/EmotionRegistry.tsx` (New)
- `apps/frontend/src/shared/theme/ThemeProvider.tsx` (New)
- `apps/frontend/src/shared/utils/formatters.ts` (New)
- `apps/frontend/src/app/[locale]/layout.tsx` (Modified)
