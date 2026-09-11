# HideAuto Landing Page API Specification

## 1. Overview

- **Base URL:** `https://api.hideauto.com/api/v1`
- **Local development:** `http://localhost:<PORT>/api/v1`
- **Style:** REST over HTTPS, JSON request/response bodies.
- **Content-Type:** `application/json; charset=utf-8`.
- **Versioning:** URI versioning. Breaking changes create `/api/v2`; additions remain in the current version.
- **Scope:** Public landing-page APIs only. They do not accept desktop workflow, profile, cookie, credential, or execution-log data.

## 2. Authentication and Abuse Protection

- Public endpoints in this document do **not** require authentication.
- Public mutation endpoints (`beta-signups`, `contact-submissions`, and `download-events`) require rate limiting and bot protection in production.
- Future admin APIs use short-lived JWT access tokens:

  ```http
  Authorization: Bearer <access-token>
  ```

- Do not expose refresh tokens to the landing page. Admin authentication is outside the public API scope.
- A missing/invalid admin token returns `401 UNAUTHORIZED`; insufficient role returns `403 FORBIDDEN`.

## 3. Request Conventions

- JSON fields use `camelCase`; enum values are lowercase strings.
- Send dates as ISO 8601 UTC strings, for example `2026-09-10T10:30:00.000Z`.
- Validate all inputs server-side; unknown fields are rejected.
- Pagination for future internal lists:

  | Parameter | Type | Rule |
  | --- | --- | --- |
  | `page` | integer | Default `1`, minimum `1` |
  | `limit` | integer | Default `20`, maximum `100` |
  | `sort` | string | Whitelisted field name only |
  | `order` | string | `asc` or `desc` |

- File upload is not supported by public landing-page endpoints.
- The API must not log full request bodies containing email or contact-message content.

## 4. Response Format

### Success

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

- Omit `meta` when it is not needed.

### Error

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "One or more fields are invalid.",
    "details": [
      { "field": "email", "message": "email must be an email" }
    ]
  }
}
```

- `details` is optional and contains safe, field-level validation information only.
- Never return stack traces, MongoDB messages, request IDs, secrets, or internal implementation details.

## 5. HTTP Status and Error Codes

| HTTP | Code | Meaning |
| --- | --- | --- |
| `400` | `VALIDATION_FAILED` | Request body or query is invalid. |
| `401` | `UNAUTHORIZED` | Missing or invalid token on a protected future endpoint. |
| `403` | `FORBIDDEN` | Authenticated caller lacks the required role. |
| `404` | `RELEASE_NOT_FOUND` | Requested release does not exist or is not public. |
| `409` | `BETA_SIGNUP_ALREADY_EXISTS` | Email is already registered. |
| `429` | `RATE_LIMITED` | Too many requests or bot-protection failure. |
| `500` | `INTERNAL_ERROR` | Unexpected server error. |
| `503` | `SERVICE_UNAVAILABLE` | Dependency or readiness check failed. |

Feature-specific codes use `FEATURE_ACTION_REASON`, for example `CONTACT_SUBMISSION_REJECTED`.

## 6. Endpoints by Feature

### Health

| Method | Path | Description | Auth |
| --- | --- | --- |
| `GET` | `/health` | Liveness and readiness status for deployment probes. | Public |

### Releases

| Method | Path | Description | Auth |
| --- | --- | --- |
| `GET` | `/releases/latest` | Latest published release for a platform/channel. | Public |
| `GET` | `/releases/:version` | Published release details for a version. | Public |

### Downloads

| Method | Path | Description | Auth |
| --- | --- | --- |
| `POST` | `/download-events` | Record minimal download-intent analytics. | Public + rate limit |

### Beta Signups

| Method | Path | Description | Auth |
| --- | --- | --- |
| `POST` | `/beta-signups` | Register an email for beta news/access. | Public + rate limit |
| `POST` | `/beta-signups/unsubscribe` | Mark a beta signup as unsubscribed. | Public + signed token |

### Contact Submissions

| Method | Path | Description | Auth |
| --- | --- | --- |
| `POST` | `/contact-submissions` | Submit a contact or feedback message. | Public + rate limit |

## 7. Endpoint Details

### `GET /releases/latest`

Query parameters:

| Name | Required | Values | Default |
| --- | --- | --- | --- |
| `channel` | No | `beta`, `stable` | `beta` |
| `platform` | No | `windows` | `windows` |
| `architecture` | No | `x64`, `arm64`, `universal` | `x64` |

Response `200`:

```json
{
  "success": true,
  "data": {
    "version": "0.1.0-beta.3",
    "channel": "beta",
    "platform": "windows",
    "architecture": "x64",
    "downloadUrl": "https://downloads.hideauto.com/HideAuto-0.1.0-beta.3-x64.exe",
    "sha256": "<64-character-sha256>",
    "fileSizeBytes": 84500000,
    "releaseNotes": "## Improvements\n- Updated the launcher.",
    "publishedAt": "2026-09-10T10:30:00.000Z"
  }
}
```

Errors: `400 VALIDATION_FAILED`, `404 RELEASE_NOT_FOUND`.

### `POST /download-events`

Request body:

```json
{
  "releaseVersion": "0.1.0-beta.3",
  "source": "hero",
  "locale": "vi",
  "referrerHost": "hideauto.com"
}
```

- `source`: `hero`, `pricing`, `footer`, `launcher`, or `direct`.
- `referrerHost` is optional and must be a hostname; URLs, paths, and query strings are rejected.
- The server resolves `releaseVersion` to a published release and sets `occurredAt` and retention internally.

Response `201`:

```json
{
  "success": true,
  "data": { "recorded": true }
}
```

Errors: `400 VALIDATION_FAILED`, `404 RELEASE_NOT_FOUND`, `429 RATE_LIMITED`.

### `POST /beta-signups`

Request body:

```json
{
  "email": "name@example.com",
  "locale": "vi",
  "source": "hero",
  "consentVersion": "2026-09-01"
}
```

- The backend lowercases and trims `email`.
- Duplicate active signups return `409`; do not reveal whether unrelated accounts exist.
- The backend stores consent version and creates a confirmation/unsubscribe token outside the public response.

Response `201`:

```json
{
  "success": true,
  "data": {
    "status": "pending",
    "message": "Check your email to confirm your beta registration."
  }
}
```

Errors: `400 VALIDATION_FAILED`, `409 BETA_SIGNUP_ALREADY_EXISTS`, `429 RATE_LIMITED`.

### `POST /beta-signups/unsubscribe`

Request body:

```json
{ "token": "signed-unsubscribe-token" }
```

- Use a short-lived, signed, single-purpose token issued by the backend; do not use raw database IDs.

Response `200`:

```json
{
  "success": true,
  "data": { "status": "unsubscribed" }
}
```

Errors: `400 VALIDATION_FAILED`, `401 UNAUTHORIZED`.

### `POST /contact-submissions`

Request body:

```json
{
  "name": "Nguyen An",
  "email": "an@example.com",
  "type": "question",
  "message": "When will the Windows beta be available?",
  "locale": "vi",
  "consentToContact": true
}
```

- `type`: `question`, `bug`, `partnership`, or `other`.
- `message` accepts plain text only; HTML is stripped/rejected.
- `consentToContact` must be `true` before persistence.

Response `201`:

```json
{
  "success": true,
  "data": {
    "id": "66df00d6b3dc95d85b1c6a42",
    "status": "new"
  }
}
```

Errors: `400 VALIDATION_FAILED`, `429 RATE_LIMITED`, `500 INTERNAL_ERROR`.

### `GET /health`

Response `200`:

```json
{
  "success": true,
  "data": { "status": "ok" }
}
```

- Return `503 SERVICE_UNAVAILABLE` when the application cannot reach MongoDB or is not ready to serve traffic.

## 8. Security Requirements

- Enforce HTTPS in production and configure CORS with an explicit Next.js origin allowlist.
- Limit request body size; contact messages have a maximum of 5,000 characters.
- Apply rate limiting per route and a bot-protection strategy before production launch.
- Do not allow public endpoints to return draft/archived releases or internal moderation fields.
- Sanitize all content displayed back to users and redact personal data from logs.
