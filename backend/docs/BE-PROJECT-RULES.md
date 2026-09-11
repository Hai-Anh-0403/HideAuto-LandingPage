# Backend Project Rules — HideAuto Landing Page

## 1. Scope and Stack

- **Scope:** APIs for releases/downloads, beta signups, contact submissions, and health checks.
- **Language:** TypeScript with `strict: true`.
- **Framework:** NestJS.
- **Database access:** Mongoose with MongoDB.
- **Architecture:** Feature-based monolith.
- **Out of scope:** The HideAuto desktop automation engine, workflows, browser profiles, cookies, credentials, execution logs, and Critic data.

## 2. Feature Structure

```text
src/
├── config/                         # Environment configuration and validation
├── core/
│   ├── database/                    # MongoDB connection and migrations
│   ├── http/                        # Global filters, interceptors, response types
│   └── logger/                      # Application logger setup
├── shared/
│   ├── constants/                   # Cross-feature constants only
│   ├── decorators/                  # Reusable NestJS decorators
│   ├── guards/                      # Reusable guards
│   ├── types/                       # Shared TypeScript types
│   └── utils/                       # Pure reusable utilities
├── features/
│   ├── releases/
│   ├── downloads/
│   ├── beta-signups/
│   └── contact-submissions/
└── main.ts

features/<feature>/
├── dto/                             # Request and response DTOs
├── schemas/                         # Mongoose schemas
├── repositories/                    # MongoDB access only
├── services/                        # Feature business logic
├── controllers/                     # HTTP routing only
├── types/                           # Feature-private types and enums
├── tests/                           # Feature tests
├── <feature>.module.ts
└── context.md                       # Feature purpose and public contract
```

- Optional folders (`utils`, `mappers`) are added only when they have at least two focused files.
- Export a feature's public service/types from its root `index.ts` only when another feature needs them.

## 3. Naming Conventions

| Item | Convention | Example |
| --- | --- | --- |
| Feature folder | `kebab-case` | `beta-signups` |
| File | `kebab-case.role.ts` | `create-beta-signup.dto.ts` |
| Nest class | `PascalCase` + role suffix | `BetaSignupsService` |
| Interface/type | `PascalCase` | `CreateBetaSignupInput` |
| Enum | `PascalCase` | `ReleaseChannel` |
| Variable/function | `camelCase` | `findLatestRelease` |
| Constant | `UPPER_SNAKE_CASE` | `MAX_PAGE_SIZE` |
| Mongo collection | plural `snake_case` | `contact_submissions` |

## 4. Feature Boundaries

- A feature owns its controller, DTOs, schemas, repository, service, tests, and `context.md`.
- Do not import another feature's internal files, schemas, repositories, or DTOs.
- Cross-feature communication uses one of these methods:

  - A public service exported by the owning feature module.
  - A typed domain event for asynchronous side effects.
  - A shared utility only when it has no feature-specific business logic.

- Shared code belongs in `src/shared/`; infrastructure belongs in `src/core/`.
- `releases` owns release availability. `downloads` may ask the public `ReleasesService` to validate a release before recording an event.
- Keep landing-page APIs small. Do not create modules for desktop-app functionality in this repository.

### DO / DON'T

| DO | DON'T |
| --- | --- |
| Inject `ReleasesService` into `DownloadsService`. | Import `releases/repositories/app-release.repository.ts` from downloads. |
| Put shared input sanitization in `shared/utils/`. | Put landing-page business rules in `shared/`. |
| Keep `beta-signups` responsible for consent state. | Update signup documents directly from a controller. |

## 5. Required Code Patterns

### Controllers

- Controllers handle route decorators, request DTOs, HTTP status codes, and response DTOs only.
- Use versioned routes: `/api/v1/releases`, `/api/v1/beta-signups`, `/api/v1/contact-submissions`.
- Use `@Body()`, `@Param()`, and `@Query()` DTOs; never accept `any`.
- Public mutations must have rate limiting and bot protection before deployment.

```ts
@Post()
@HttpCode(HttpStatus.CREATED)
create(@Body() dto: CreateBetaSignupDto): Promise<BetaSignupResponseDto> {
  return this.betaSignupsService.create(dto);
}
```

### Services

- Services contain feature business rules, orchestration, and ownership checks.
- Return typed domain values or response DTOs; never return raw Mongoose documents.
- Use transactions only when one operation must update multiple collections atomically.
- Preserve idempotency for public submissions where possible, for example repeated signup requests with the same email.

### Repositories

- Repositories are the only layer allowed to query Mongoose models.
- Use `.lean()` for read-only queries and explicit projections for public responses.
- Apply the default soft-delete filter in repository methods for applicable collections.
- Keep query-specific index requirements documented beside the query.

### Validation and Error Handling

- Enable a global `ValidationPipe` with `transform`, `whitelist`, and `forbidNonWhitelisted`.
- Validate DTOs with `class-validator`; use custom validators for semantic version, consent, and sanitized URLs.
- Throw NestJS HTTP exceptions or feature-specific errors mapped by one global exception filter.
- Do not expose MongoDB, stack trace, or internal validation details to public clients.

```ts
throw new ConflictException({
  code: 'BETA_SIGNUP_ALREADY_EXISTS',
  message: 'This email is already registered for the beta.',
});
```

### Logging and Responses

- Use NestJS `Logger` or the configured structured logger; include `requestId`, feature, event, and safe identifiers.
- Never log email addresses, request bodies, tokens, hashes, or product-local data.
- Successful responses use `{ success: true, data, meta? }`.
- Error responses use `{ success: false, error: { code, message, details? } }`.

## 6. NestJS Rules

- Register each feature in a dedicated `<feature>.module.ts`.
- Register Mongoose schemas through `MongooseModule.forFeature()` inside the owning feature module.
- Use dependency injection; do not instantiate services or repositories with `new`.
- Keep global concerns in `main.ts` or `core/http`, including CORS, validation, filters, interceptors, and rate limiting.
- Read configuration through `ConfigService`; validate all environment variables at startup.
- Use guards for admin-only release management, never conditional role checks scattered across services.
- Use interceptors for request IDs and response envelopes, not business logic.

## 7. Anti-Patterns

- No business logic, database calls, or response shaping beyond DTO conversion in controllers.
- No direct imports from another feature's `schemas/`, `repositories/`, `dto/`, or `services/` directories.
- No circular NestJS module dependencies; redesign the boundary instead of adding `forwardRef()` by default.
- No untyped `any`, unsafe type assertions, or `@ts-ignore`.
- No hardcoded URLs, secrets, retention periods, or rate limits.
- No raw user HTML/Markdown rendered without sanitization.
- No telemetry endpoint that accepts workflow, browser profile, cookie, screenshot, or automation-log data.

## 8. Git Workflow

- Branch format: `<type>/<short-kebab-description>`, for example `feat/beta-signup-api`.
- Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`.
- Commit format: Conventional Commits, for example `feat(releases): expose latest beta download`.
- Keep each pull request focused on one feature or one cross-cutting concern.
- PR description includes purpose, API changes, test evidence, database migration/index impact, and privacy impact.
- Do not merge with failing lint, type-check, unit, or integration tests.

## 9. Testing

- Keep tests in `features/<feature>/tests/`.
- Unit test names: `*.service.spec.ts` and `*.repository.spec.ts`.
- HTTP integration test names: `*.controller.e2e-spec.ts`.
- Unit tests cover validation, idempotency, business rules, and error mapping.
- Integration tests cover validation pipe, response envelope, HTTP status, rate limiting, and MongoDB indexes/queries where relevant.
- Mock external services; use a disposable MongoDB instance for repository and end-to-end tests.
- Target 80% coverage for services and repositories. Prioritize public mutation paths over generated boilerplate.
