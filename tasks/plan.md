# Frontend Implementation Plan: HideAuto Landing Page

## Overview

Build the public HideAuto landing page as a localized Next.js App Router application. Vietnamese (`/vi`) is the default and English (`/en`) is a complete locale variant. The page is composed from feature-owned sections, uses server rendering by default, and integrates only the documented public release, download-event, beta-signup, and contact APIs.

## Scope and Assumptions

- This plan treats `frontend/AGENT.md`, `frontend/docs/*`, `share/DESIGN.md`, and `share/API_SPEC.md` as authoritative for frontend work.
- `AGENT.md` at the repository root currently calls this an e-commerce platform; that conflicts with the frontend documents and must be corrected or explicitly superseded before implementation.
- There is currently no frontend application source or `frontend/package.json`; Task 1 establishes the project baseline.
- Final logo, cockpit screenshots, GitHub URL, beta download availability, approved metrics/compatibility claims, and English marketing copy are not supplied. Until supplied, use only clearly marked safe placeholders; do not invent public claims or URLs.
- The frontend is a public landing page only. Desktop automation, authentication, protected routes, and admin UI are out of scope.

## Architecture Decisions

- Use Next.js App Router with `src/app/[locale]`; redirect `/` to `/vi`.
- Keep each landing section inside `src/features/<feature>` with an `index.ts` public entry point. Compose them only in `app/[locale]/page.tsx`.
- Use Server Components by default. Restrict client components to the mobile menu, theme/locale controls, tabs, accordion, and form/download mutations.
- Keep VI/EN content in typed `src/content` modules. Mark unapproved claims as placeholders and centralize them so no copy is duplicated in components.
- Fetch the latest release once on the server through `features/downloads` and pass it as typed props to download CTAs. Components do not call `fetch`.
- Use local state for section interaction; use narrow context only for hydrated theme and locale preferences.

## Dependency Graph

```text
Project/tooling + design tokens
  -> locale routing + typed content + shared primitives
    -> static feature sections
      -> interactive navigation/tabs/FAQ
        -> typed API client + release query
          -> download, beta-signup, and contact flows
            -> metadata, accessibility, responsive and E2E verification
```

## Task List

### Phase 1: Foundation

#### Task 1: Bootstrap the frontend application

**Description:** Create the strict TypeScript Next.js App Router project, Tailwind setup, aliases, and standard lint/type/test/build scripts.

**Acceptance criteria:**
- [x] `frontend` runs a minimal Next.js page with TypeScript strict mode.
- [x] Tailwind resolves project source files and the `@/*` alias resolves from `src`.
- [x] Lint, type-check, unit-test, and production-build scripts are defined.

**Verification:**
- [x] `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` succeed from `frontend`.
- [x] Runtime check: `GET /` returns 200 with the expected page marker; no server-console errors were emitted. (No interactive browser was available.)

**Dependencies:** None  
**Estimated scope:** M

#### Task 2: Add global shell, tokens, and shared primitives

**Description:** Implement root layout, Barlow fonts, global CSS design tokens/grid/focus styles, `Container`, `Button`, and `SectionHeading`.

**Acceptance criteria:**
- [x] All colors, radii, shadows, and baseline styles map to `DESIGN.md` tokens.
- [x] Shared components are generic, typed, semantic, and reusable by at least two sections.
- [x] Keyboard focus and reduced-motion base styles are visible and functional.

**Verification:**
- [x] Component tests cover button link/button behavior and focus-visible styles where testable.
- [x] Runtime check: the server-rendered shell responds successfully; responsive rules are mobile-first. Interactive browser visual tooling was unavailable in this session.

**Dependencies:** Task 1  
**Estimated scope:** M

#### Task 3: Establish locale routing and typed content contract

**Description:** Add `/vi` and `/en` routing, default locale redirect, locale validation, typed content shape, and temporary content only where the final approved copy is missing.

**Acceptance criteria:**
- [x] `/` redirects to `/vi`; unsupported locale segments are rejected.
- [x] Every rendered string comes from the selected typed locale content module.
- [x] No unapproved metrics, URLs, testimonials, or compatibility claims are presented as facts.

**Verification:**
- [x] Unit tests cover locale parsing and content-shape completeness.
- [x] Runtime check: `/vi` and `/en` return 200 with matching `html[lang]`; `/fr` returns 404.

**Dependencies:** Tasks 1-2  
**Estimated scope:** M

### Checkpoint: Foundation

- [x] Lint, type-check, test, and production build pass.
- [x] `/`, `/vi`, and `/en` have a stable server-rendered shell.
- [x] Review visual tokens and placeholder policy before feature work.

### Phase 2: Core Product Narrative

#### Task 4: Build navigation, header, and footer

**Description:** Implement the sticky desktop header, accessible mobile navigation, anchor links, language/theme controls, shared final CTA, and footer.

**Acceptance criteria:**
- [ ] Stable section IDs exist: `top`, `features`, `critic`, `compare`, `pricing`, `faq`, and `download`.
- [ ] Mobile menu and controls have 44px targets, keyboard access, and no hydration mismatch.
- [ ] Language/theme controls update the full site state after hydration.

**Verification:**
- [ ] RTL tests cover menu open/close, anchor links, and accessible control labels.
- [ ] Browser check: header works at mobile, tablet, and desktop widths.

**Dependencies:** Tasks 2-3  
**Estimated scope:** M

#### Task 5: Build the hero and cockpit preview

**Description:** Create the hero message, CTA cluster, mode switch, and static/product-preview tabs with meaningful text alternatives.

**Acceptance criteria:**
- [ ] Above-the-fold hero is server-rendered and is not lazy-loaded.
- [ ] Preview tabs follow WAI-ARIA tab keyboard behavior.
- [ ] Cockpit imagery uses approved assets or descriptive placeholders, never fabricated product screenshots.

**Verification:**
- [ ] RTL tests cover tab selection and arrow-key navigation.
- [ ] Browser check: hero/cockpit remains usable at 375px and 1440px.

**Dependencies:** Tasks 2-4  
**Estimated scope:** M

#### Task 6: Build operating-loop and node-canvas sections

**Description:** Implement feature tabs, selected content panels, and the node-group technical reference with responsive table/list behavior.

**Acceptance criteria:**
- [ ] Operating-loop tabs are accessible by keyboard and convey selected state visually.
- [ ] Node content preserves approved technical terms and shows success/error branching.
- [ ] The section is single-column on mobile and two-column at desktop.

**Verification:**
- [ ] RTL tests cover selected panel behavior and roles.
- [ ] Browser check: no clipped critical content at all three breakpoints.

**Dependencies:** Tasks 2-3  
**Estimated scope:** M

#### Task 7: Build Critic and comparison sections

**Description:** Implement Critic issue-family cards, score model, explicitly qualified product-stat placeholders, and a semantic comparison matrix.

**Acceptance criteria:**
- [ ] The gate explanation correctly says it is based on error findings, not score alone.
- [ ] Unconfirmed statistics remain visibly pending approval.
- [ ] Comparison uses table headers and keyboard-accessible horizontal scrolling on small screens.

**Verification:**
- [ ] Component tests assert table headers and accessible scroll-region label.
- [ ] Browser check: comparison remains readable at 375px.

**Dependencies:** Tasks 2-3  
**Estimated scope:** M

### Checkpoint: Narrative Sections

- [ ] All static sections render in both locales without duplicate literal copy.
- [ ] Navigation and tab interactions pass keyboard checks.
- [ ] Desktop and mobile screenshots are reviewed against `DESIGN.md`.

### Phase 3: Conversion and Public API Flows

#### Task 8: Implement typed API boundary and release lookup

**Description:** Add the shared API client, response/error types, release types, and server-side latest-release service.

**Acceptance criteria:**
- [ ] The API client normalizes documented success/error envelopes, timeouts, and safe errors.
- [ ] `getLatestRelease` requests only documented channel/platform/architecture values.
- [ ] Release data is fetched once and passed downward; a failure produces a safe disabled/fallback CTA.

**Verification:**
- [ ] Service tests cover success, invalid response, and `RELEASE_NOT_FOUND` behavior at the network boundary.
- [ ] Browser check: unavailable release never exposes an invented URL.

**Dependencies:** Tasks 1-3  
**Estimated scope:** M

#### Task 9: Implement download actions and pricing section

**Description:** Create beta pricing and reusable feature-owned download CTA behavior, including non-blocking download-intent event recording.

**Acceptance criteria:**
- [ ] Download actions use server-provided release data and record only the documented event fields.
- [ ] Analytics failure does not block a valid download.
- [ ] CTA is disabled with clear safe feedback when no public release is available.

**Verification:**
- [ ] Tests cover available, unavailable, and analytics-failure states.
- [ ] Browser check: hero, pricing, and footer CTA behavior is consistent.

**Dependencies:** Tasks 4, 8  
**Estimated scope:** M

#### Task 10: Implement beta signup and contact flows

**Description:** Add feature-owned React Hook Form + Zod schemas, API services, mutation hooks, inline errors, and concise live-region status feedback.

**Acceptance criteria:**
- [ ] Forms validate documented request fields and prevent duplicate submissions.
- [ ] API errors map to safe field/form feedback without raw backend details.
- [ ] Consent is mandatory for contact and beta signup uses the required consent version.

**Verification:**
- [ ] RTL/service tests cover valid submission, validation errors, conflict/rate-limit errors, and pending state.
- [ ] Browser check: each form can be completed solely with keyboard.

**Dependencies:** Tasks 3, 8  
**Estimated scope:** M

#### Task 11: Build FAQ and closing conversion section

**Description:** Add the accessible FAQ accordion, closing CTA, and connect approved conversion flows.

**Acceptance criteria:**
- [ ] Exactly one FAQ item is expanded by default; controls expose `aria-expanded` and `aria-controls`.
- [ ] FAQ works without hover and respects reduced motion.
- [ ] Final CTA follows the same release availability behavior as other download entry points.

**Verification:**
- [ ] RTL tests cover default/open/close and keyboard behavior.
- [ ] Browser check: final CTA and FAQ work at 375px and 1440px.

**Dependencies:** Tasks 4, 9-10  
**Estimated scope:** M

### Phase 4: SEO, Quality, and Release Readiness

#### Task 12: Add metadata, robots, sitemap, loading/error resilience

**Description:** Provide localized metadata/canonicals/Open Graph/structured data, public crawler files, and route loading/error behavior.

**Acceptance criteria:**
- [ ] Metadata, canonical URLs, and sitemap contain only valid localized public routes.
- [ ] Error state hides internal error details.
- [ ] Release-dependent loading uses a compact layout-stable fallback only when needed.

**Verification:**
- [ ] Automated route metadata tests pass.
- [ ] Browser check: simulated API failure produces a safe, understandable state.

**Dependencies:** Tasks 3, 8-11  
**Estimated scope:** M

#### Task 13: Complete accessibility, responsive, performance, and E2E quality gates

**Description:** Add critical Playwright journeys and complete final visual, accessibility, and production-build verification.

**Acceptance criteria:**
- [ ] Critical journeys cover locale switch, navigation, tabs, FAQ, release-unavailable download, signup, and contact submission.
- [ ] No critical keyboard, landmark, focus, mobile overflow, or reduced-motion regression remains.
- [ ] Heavy cockpit code is dynamically loaded only if bundle measurement shows a material benefit.

**Verification:**
- [ ] Lint, type-check, unit tests, E2E tests, and production build pass.
- [ ] Manual desktop/mobile visual review and browser-console/network check are recorded.

**Dependencies:** Tasks 1-12  
**Estimated scope:** M

### Checkpoint: Ready for Review

- [ ] All acceptance criteria and quality gates pass.
- [ ] Only approved product claims/assets/URLs are public.
- [ ] Screenshots, accessibility notes, API impact, and outstanding product approvals accompany review.

## Risks and Mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Root documentation conflicts with frontend scope | High | Confirm/correct source of truth before Task 1. |
| Product facts and assets are missing | High | Render clearly qualified placeholders; block public-release claims until approved. |
| API/backend unavailable during frontend work | Medium | Mock at the network boundary; retain service-contract tests and safe UI fallbacks. |
| Complex cockpit makes initial bundle heavy | Medium | Keep it static/server-friendly first; measure before dynamic loading. |
| Locale/theme hydration mismatch | Medium | Use deterministic server defaults and persist only after hydration. |

## Open Questions Requiring Product Input

1. Should the root `AGENT.md` be corrected from e-commerce to HideAuto, or should another document supersede it?
2. What are the approved logo/app icon, GitHub URL, public Windows-beta release policy, and cockpit assets?
3. What is the approved English copy for all Vietnamese content?
4. Which metrics, browser compatibility statements, and Critic FAQ answers are approved for public use?
5. Is the contact form required on this single landing page, and where should its entry point be placed in the design?
