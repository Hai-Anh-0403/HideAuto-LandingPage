
## Mandatory Agent Skills Workflow

Before starting any task, every agent must:

1. Read `agent-skills/README.md` to understand the available skill workflows and their selection criteria.
2. Identify the skill or skills applicable to the task.
3. Read and follow the relevant `agent-skills/skills/<skill-name>/SKILL.md` instructions before taking task actions.
4. Apply each selected skill's required process, verification gates, and exit criteria. Do not skip a relevant skill because the task appears small or routine.

- Start with `agent-skills/skills/using-agent-skills/SKILL.md` when unsure which workflow applies.
- Use the smallest set of relevant skills; do not load unrelated skills.
- For a task spanning multiple phases, apply the appropriate skills for each phase (for example: planning, implementation, testing, review, and shipping).

## Overview
The official landing page for HideAuto, a local-first browser automation platform. The website presents product features, pricing, FAQs, beta downloads, registrations, and contact flows; it does not implement the desktop automation engine.

## Tech Stack
- Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS
- Backend: NestJS, TypeScript, Mongoose
- Database: MongoDB

## Structure
```
├── frontend/    → @frontend/AGENT.md
├── backend/     → @backend/AGENT.md
└── share/       → Shared documentation (API_SPEC.md, DATABASE.md, DESIGN.md)
```

## Shared Docs
- @share/API_SPEC.md — API specifications and contract
- @share/DATABASE.md — MongoDB schema and entities
- @share/DESIGN.md — Dark-only design specifications and visual tokens
