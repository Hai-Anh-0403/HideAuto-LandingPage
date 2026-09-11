# Frontend Project Rules — HideAuto Landing Page

## 1. Scope and Stack

- **Framework:** Next.js App Router with React and TypeScript (`strict: true`).
- **Styling:** Tailwind CSS plus design tokens defined in `app/globals.css`.
- **State:** React local state first; Context only for locale/theme shared across the page.
- **HTTP client:** A typed wrapper around native `fetch`.
- **Forms:** React Hook Form with Zod validation.
- **Rendering:** Server Components by default; Client Components only for interaction.
- **Source of truth:** Follow `DESIGN.md` for visual tokens, content hierarchy, responsive behavior, motion, and accessibility.
- **Scope:** Landing page only; do not implement the HideAuto desktop automation engine.

## 2. Source Structure

```text
src/
├── app/
│   ├── [locale]/page.tsx              # Composes feature sections
│   ├── layout.tsx                     # Fonts, metadata, providers
│   ├── globals.css                    # Tokens, base styles, grid utility
│   └── error.tsx                      # Route-level error boundary
├── features/
│   ├── navigation/
│   ├── hero/
│   ├── product-preview/
│   ├── features-overview/
│   ├── critic/
│   ├── comparison/
│   ├── pricing/
│   ├── faq/
│   ├── downloads/
│   └── contact/
├── shared/
│   ├── components/                    # Button, Container, SectionHeading
│   ├── hooks/                         # Generic browser/UI hooks
│   ├── services/                      # Base API client
│   ├── types/                         # Cross-feature types
│   └── utils/                         # Pure utilities
├── content/                           # Typed VI/EN marketing copy
└── assets/                            # Local SVG and product images
```

```text
features/<feature>/
├── components/                        # Feature-owned UI
├── hooks/                             # Feature interaction/data hooks
├── services/                          # Feature API functions
├── types/                             # Props, API and domain types
├── utils/                             # Pure feature helpers, when needed
├── tests/                             # Unit and interaction tests
├── index.ts                           # Public exports only
└── context.md                         # Purpose, ownership, public contract
```

- Add `state/` only when the feature has state too complex for one component/hook.
- Do not create empty folders or generic files such as `helpers.ts`.

## 3. Naming Conventions

| Item | Convention | Example |
| --- | --- | --- |
| Feature folders | `kebab-case` | `product-preview` |
| Components | `PascalCase.tsx` | `HeroSection.tsx` |
| Hooks | `useCamelCase.ts` | `useActiveSection.ts` |
| Services | `<feature>.service.ts` | `downloads.service.ts` |
| Types | `<feature>.types.ts` | `release.types.ts` |
| Tests | `<name>.test.tsx` | `FaqAccordion.test.tsx` |
| Constants | `UPPER_SNAKE_CASE` | `NAV_ITEMS` |
| CSS variables | `--kebab-case` | `--color-accent` |

## 4. Feature Boundaries

- Each feature owns its components, behavior, API calls, types, tests, and content mapping.
- Import another feature only from its public `index.ts`; never use internal paths.
- Prefer page composition over feature-to-feature imports.
- Cross-feature state is limited to locale, theme, and active navigation state.
- Communicate through props, URL/hash state, or narrowly scoped Context.
- Shared components live in `src/shared/components`; move a component there only after two real features need it.

| DO | DON'T |
| --- | --- |
| `import { FaqSection } from '@/features/faq'` | `import FaqItem from '@/features/faq/components/FaqItem'` |
| Pass release data from the page to `DownloadButton`. | Fetch the same release separately in multiple buttons. |
| Keep score-card rules inside `critic`. | Put Critic rules in `shared/utils`. |

## 5. Component Rules

- One exported React component per file; small private render helpers may remain local.
- Type every prop explicitly; use `unknown` plus narrowing instead of `any`.
- Keep components below 150 lines; extract data, behavior, or repeated markup when exceeded.
- Keep Server Components free of browser APIs and event handlers.
- Add `'use client'` only at the lowest interactive boundary.
- Use semantic elements: `header`, `nav`, `main`, `section`, `table`, `button`, and `footer`.
- Use `next/image`, `next/font`, and `next/link` where appropriate.
- Load Barlow and Barlow Condensed through `next/font`; do not request fonts from client-side JavaScript.

## 6. Design Implementation Rules

- Map the exact colors, radii, shadows, and spacing in `DESIGN.md` to CSS variables and Tailwind theme tokens.
- Preserve the technical cockpit style: cool-gray background, fine grid, 1px borders, compact labels, and restrained blue accents.
- Do not replace the design with gradients, glassmorphism, pill-heavy UI, or oversized rounded cards.
- Build sections in this order: header, hero, cockpit, operating loop, nodes, Critic, comparison, pricing, FAQ, closing CTA, footer.
- Use stable IDs: `top`, `features`, `critic`, `compare`, `pricing`, `faq`, and `download`.
- Desktop starts at `1024px`, tablet at `768px`, and mobile below `768px`.
- Maintain 44×44px touch targets and visible `focus-visible` styles.
- Respect `prefers-reduced-motion`; decorative motion must stop or simplify.
- Product metrics marked unverified in `DESIGN.md` must remain placeholders until approved.

## 7. Data and State Patterns

- Fetch the latest release on the server through `features/downloads/services/downloads.service.ts`.
- The service must call the typed base client in `shared/services/api-client.ts`.
- Never call `fetch` directly inside presentational components.
- Use local state for tabs, mobile navigation, and FAQ expansion.
- Use URL hash for section navigation; do not create a global store for scrolling.
- Persist theme/locale only after client hydration and provide a stable server default.
- Avoid duplicate server requests; pass fetched data downward as typed props.

```ts
export async function getLatestRelease(
  query: LatestReleaseQuery,
): Promise<ApiResponse<Release>> {
  return apiClient.get('/releases/latest', { query });
}
```

## 8. Forms, Errors, and Loading

- Use React Hook Form with a feature-owned Zod schema for signup and contact forms.
- Match client validation to `API_SPEC.md`; the backend remains authoritative.
- Disable submit while pending and prevent duplicate submissions.
- Show field errors next to inputs and announce submission status through `aria-live`.
- Use a compact skeleton only when release data affects layout; otherwise render stable fallback copy.
- Handle expected API errors inside the feature; use `app/error.tsx` for unexpected route failures.
- Notifications must be concise and must not expose raw backend messages.

## 9. Interaction and Accessibility

- Implement hero/feature switches using WAI-ARIA tabs with keyboard arrow navigation.
- FAQ triggers use native buttons with `aria-expanded` and `aria-controls`.
- Only one FAQ item is open by default; opening behavior must work without hover.
- Language and theme toggles update the complete site state, labels, and document attributes.
- Comparison tables require headers and a keyboard-accessible horizontal scroll container on small screens.
- Cockpit previews need meaningful alternative text describing workflow, status, and Critic score.

## 10. Anti-Patterns

- No imports from another feature's internal folders.
- No API calls, business rules, or large data transformations in JSX components.
- No global store for component-local UI state.
- No `any`, `@ts-ignore`, unexplained type assertions, or unchecked API responses.
- No inline styles except values that are genuinely runtime-calculated.
- No hardcoded duplicate marketing copy across components; use typed locale content.
- No browser-only API during server rendering.
- No invented download URL, product metric, testimonial, or compatibility claim.

## 11. Git Workflow

- Branch: `<type>/<short-kebab-description>`, for example `feat/hero-section`.
- Commit: Conventional Commits, for example `feat(faq): add accessible accordion`.
- Keep each PR focused on one feature or one shared design-system change.
- PRs include screenshots at desktop/mobile sizes, test evidence, accessibility notes, and API impact.
- Do not merge with failing lint, type-check, unit tests, or production build.

## 12. Testing

- Co-locate tests in `features/<feature>/tests/`.
- Use Vitest and React Testing Library for components/hooks; use Playwright for critical journeys.
- Test visible behavior and accessibility roles rather than implementation details.
- Cover navigation anchors, tabs, FAQ keyboard behavior, theme/locale switches, beta signup, contact submission, and download flow.
- Mock the API at the network boundary; do not mock internal hooks to make component tests pass.
- Prioritize complete coverage of interactive features; target at least 80% for feature hooks, services, and utilities.
- Run `lint`, `typecheck`, `test`, and `build` before merge.
