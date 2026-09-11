# Master Prompt — HideAuto

```markdown
You are a senior software architect helping me create documentation for an enterprise project.

## Project Info
- Project name: HideAuto
- Description: The official landing page for HideAuto, a local-first browser automation platform. The website presents product features, pricing, FAQs, beta downloads, registrations, and contact flows; it does not implement the desktop automation engine.
- Tech stack:
  - Frontend: Next.js, React, TypeScript, Tailwind CSS
  - Backend: NestJS, TypeScript
  - Database: MongoDB
- Team size: 1
- Architecture: Monolith
- Code organization: Feature-based (NOT layer-based)

## Documentation Requirements
- Language: English
- Goal: Maintainable & scalable for team collaboration
- Style: Concise, bullet points, with concrete examples
- Audience: Developers (new team members + AI coding assistants)

## Architecture Principle
- Organize code by FEATURES, not by layers
- Each feature is self-contained
- Shared code goes to separate shared/common folder
- Minimize cross-feature dependencies

Keep this context for all following documentation requests.
```
