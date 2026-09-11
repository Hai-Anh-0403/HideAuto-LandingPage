# Frontend Agent Guide - HideAuto Landing Page

## Purpose

- Build the public, localized HideAuto landing page only.
- Do not implement the HideAuto desktop automation engine, authentication, or protected application routes.

## Stack and Rendering

- Next.js App Router, React, and TypeScript with `strict: true`.
- Tailwind CSS, with visual tokens defined in `src/app/globals.css`.
- Server Components by default; add `'use client'` only at the lowest interactive boundary.
- Use `next/font` for Barlow and Barlow Condensed, and `next/image` / `next/link` where appropriate.
- Prefer React local state. Narrow Context is reserved for locale and theme; do not add Redux, Zustand, or TanStack Query without a concrete new requirement.
- Use the typed native-`fetch` wrapper in `src/shared/services/api-client.ts`; components must never call `fetch` directly.
- Use React Hook Form and feature-owned Zod schemas for contact and signup forms.

## Required Reading

Read these before changing frontend code:

- `docs/FE-PROJECT-RULES.md` - mandatory conventions, accessibility, testing, and anti-patterns.
- `docs/FE-ARCHITECTURE.md` - feature boundaries, rendering, routing, and data flow.
- `DESIGN.md` - source of truth for visual tokens, content hierarchy, responsive behavior, motion, and approved product claims.
- `API_SPEC.md` - backend request/response contract for release, signup, and contact flows.

If `DESIGN.md` or `API_SPEC.md` is unavailable, do not invent its values, API shapes, download URLs, metrics, testimonials, or compatibility claims.

## Code Organization

```text
src/
|- app/                  # Routes, layouts, metadata, global styles, route errors
|- features/             # Self-contained landing-page sections and behavior
|- shared/               # Code genuinely used by at least two features
|- content/              # Typed Vietnamese and English marketing copy
`- assets/               # Local icons and optimized product images
```

- Compose sections in `src/app/[locale]/page.tsx`; keep detailed UI and behavior inside the owning feature.
- Feature folders use `kebab-case` and normally contain only needed `components/`, `hooks/`, `services/`, `types/`, `utils/`, `tests/`, `index.ts`, and `context.md`.
- Export a feature's intentional public API from `index.ts`.
- Import another feature only through `@/features/<feature>`; never import its internals.
- Add shared code only after two real features require the same behavior and visual contract. Do not create empty folders or generic catch-all files.

## Key Implementation Rules

- Keep props explicitly typed; use `unknown` plus narrowing instead of `any`.
- Keep components under 150 lines where practical; extract behavior, data, or repeated markup.
- Keep data fetching and business rules out of JSX. Feature services own endpoints; hooks own mutation state.
- Server-fetch release data once and pass typed data to relevant CTAs. Avoid duplicate requests and global state for local UI.
- Use typed locale content rather than duplicating copy. Use stable section IDs: `top`, `features`, `critic`, `compare`, `pricing`, `faq`, and `download`.
- Preserve the documented technical cockpit style; avoid unapproved gradients, glassmorphism, oversized rounded cards, and pill-heavy UI.
- Build mobile-first for `<768px`, `768-1023px`, and `>=1024px`.

## Accessibility and Resilience

- Use semantic landmarks and native controls. Maintain visible `focus-visible` styles and 44x44px touch targets.
- Implement tabs with WAI-ARIA keyboard navigation; FAQ controls need `aria-expanded` and `aria-controls`.
- Respect `prefers-reduced-motion`; make tables horizontally keyboard-scrollable on small screens.
- Forms show inline field errors, disable duplicate submits, and announce results with `aria-live`.
- Handle expected API errors in the owning feature; use the route error boundary for unexpected failures. Never expose raw backend errors.

## Before Handoff

- Co-locate tests in `features/<feature>/tests/` and test visible behavior and accessibility roles.
- Run the project lint, type-check, tests, and production build when the project tooling is present.
- For UI changes, verify desktop and mobile layouts and note any unavailable design/API source material.
