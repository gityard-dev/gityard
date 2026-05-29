# Phase: Infrastructure, Security, and Observability

These tasks establish local self-hosting, service readiness, security defaults, and observability. All app-specific env vars must use the `GITYARD_` prefix.

## Shared Rules

- Must read for every task: `AGENTS.md`, `README.md`, `docs/GITYARD_SPEC.md`, `docs/GITYARD_STACK.md`, `.plans/INDEX.md`, `.plans/DEPENDENCIES.md`.
- Must not change for every task: `apps/web` feature UI, product feature logic unrelated to infrastructure, docs outside `.plans/` unless a future implementation task explicitly allows it.
- Completion report format: Use the standard completion report from `.plans/TEMPLATE.md`.

## I001: Compose Core Self-Hosting Services

- Status: done
- Owner: `GPT-5.5`
- Area: `infra`
- Goal: Add Docker Compose services for web, api, worker, git-worker, ai-worker, Postgres, Redis, NATS, Temporal, Meilisearch, MinIO, and optional Ollama.
- Background: Self-hosting is first-class and must require no paid cloud services.
- Must change: `docker-compose.yml`, optional `docker-compose.ollama.yml`, `infra/compose/`.
- Requirements:
  - [x] Include local service ports and persistent volumes.
  - [x] Make Ollama optional.
  - [x] Do not require managed cloud infrastructure.
- Acceptance criteria:
  - [x] `docker compose config` succeeds.
  - [x] Compose includes all required local dependencies from the stack.
- Verification:
  - Command: `docker compose config`
  - Manual: inspect dependency list.
- Dependencies:
  - Blocked by: `F005`
  - Blocks: `I002-I010`, `V005`
  - Can run in parallel with: contract tasks that do not edit compose files
- Parallelization notes: Owns compose files and infra compose folder.

## I002: Create `.env.example` With `GITYARD_` Prefixes

- Status: done
- Owner: `GPT-5.5`
- Area: `infra`
- Goal: Add local development `.env.example` covering app URLs, Postgres, Redis, NATS, Temporal, Meilisearch, S3/MinIO, GitHub, AI, and feature flags.
- Background: The stack has example variables, but task instructions require `GITYARD_` for app-specific variables.
- Must change: `.env.example`, `packages/config/`.
- Requirements:
  - [x] Use `GITYARD_` for GitYard-specific variables.
  - [x] Allow `GITYARD_AI_PROVIDER=disabled`.
  - [x] Leave secrets blank or local-only placeholders.
- Acceptance criteria:
  - [x] `.env.example` contains no required paid AI key.
  - [x] Old mixed `GitYard_` prefixes are not introduced.
- Verification:
  - Command: `rg "GitYard_" .env.example packages/config`
  - Command: `rg "GITYARD_AI_PROVIDER=disabled|GITYARD_AI_PROVIDER" .env.example`
- Dependencies:
  - Blocked by: `F008`, `H004`, `I001`
  - Blocks: `V004`, `V005`
  - Can run in parallel with: `I003-I010` after coordination on config.
- Parallelization notes: Coordinate with config package edits.

## I003: Wire Service Health and Readiness Checks

- Status: done
- Owner: `GPT-5.5`
- Area: `infra`
- Goal: Add health and readiness endpoints/checks for API, worker, git-worker, ai-worker, and core dependencies.
- Background: Service readiness is required for local development and self-hosting.
- Must change: `services/api/`, `services/worker/`, `services/git-worker/`, `services/ai-worker/`, `docker-compose.yml`.
- Requirements:
  - [x] API exposes health/readiness endpoints.
  - [x] Workers expose process readiness or health command.
  - [x] Compose healthchecks reflect service dependencies.
- Acceptance criteria:
  - [x] Health endpoints return clear status without requiring GitHub or AI credentials.
  - [x] Disabled AI mode is reported as healthy when configured.
- Verification:
  - Command: `docker compose up`
  - Manual: call API health/readiness endpoints.
- Dependencies:
  - Blocked by: `F005`, `I001`
  - Blocks: `V005`
  - Can run in parallel with: `I004-I010`
- Parallelization notes: Touch only health/readiness code paths.

## I004: Add Postgres and Migration Wiring

- Status: done
- Owner: `GPT-5.5`
- Area: `db`
- Goal: Implement initial migration tooling and database connection wiring from `C003`.
- Background: Postgres stores product state; migrations must be repeatable.
- Must change: `packages/db/`, migration folders, root/package scripts, `docker-compose.yml`.
- Requirements:
  - [x] Use the migration tool selected in `H002`.
  - [x] Include migration commands.
  - [x] Do not store large blobs in Postgres.
- Acceptance criteria:
  - [x] A clean local Postgres can run migrations.
  - [x] Core schemas/tables from `C003` are created or staged as explicit migrations.
- Verification:
  - Command: `pnpm db:migrate`
  - Command: `pnpm check`
- Dependencies:
  - Blocked by: `C003`, `I001`
  - Blocks: most backend feature tasks, `V005`
  - Can run in parallel with: `I005-I010`
- Parallelization notes: Owns `packages/db` and migrations.

## I005: Add NATS JetStream Integration Foundation

- Status: done
- Owner: `GPT-5.5`
- Area: `backend`
- Goal: Add event publisher/subscriber foundations using `packages/events` and NATS JetStream.
- Background: GitYard is event-driven and workers communicate through durable events.
- Must change: `packages/events/`, `services/worker/`, `services/api/`, `docker-compose.yml`.
- Requirements:
  - [x] Publish typed events from `C013`.
  - [x] Subscribe idempotently.
  - [x] Support local NATS from Compose.
- Acceptance criteria:
  - [x] A smoke test can publish and consume a sample event.
  - [x] Event envelope validation rejects invalid event versions.
- Verification:
  - Command: `pnpm check`
  - Manual: run local event smoke test.
- Dependencies:
  - Blocked by: `C013`, `I001`
  - Blocks: `G012`, worker orchestration
  - Can run in parallel with: `I004`, `I006-I010`
- Parallelization notes: Owns events runtime wiring.

## I006: Add Temporal Integration Foundation

- Status: done
- Owner: `GPT-5.5`
- Area: `worker`
- Goal: Add Temporal client and worker scaffolding for long-running workflows.
- Background: The stack requires Temporal for repo sync, PR analysis, issue analysis, indexing, agent runs, and migrations.
- Must change: `services/worker/`, `services/ai-worker/`, `packages/shared/`, `docker-compose.yml`.
- Requirements:
  - [x] Define workflow registration layout.
  - [x] Add placeholder workflows named in the stack.
  - [x] Do not execute heavy work in HTTP requests.
- Acceptance criteria:
  - [x] Worker starts against local Temporal.
  - [x] Placeholder workflow can be registered or unit tested.
- Verification:
  - Command: `pnpm check`
  - Manual: inspect worker startup logs locally.
- Dependencies:
  - Blocked by: `I001`
  - Blocks: sync, analysis, agent, and indexing workflows
  - Can run in parallel with: `I004`, `I005`, `I007-I010`
- Parallelization notes: Owns worker workflow scaffolding.

## I007: Add MinIO Object Storage Foundation

- Status: done
- Owner: `GPT-5.5`
- Area: `infra`
- Goal: Add S3-compatible object storage client wiring for raw webhooks, diffs, logs, artifacts, and large generated outputs.
- Background: The stack says large blobs must not be stored in Postgres.
- Must change: `packages/shared/` or storage package, `services/worker/`, `docker-compose.yml`, `.env.example`.
- Requirements:
  - [x] Support local MinIO with path-style access.
  - [x] Define object key conventions.
  - [x] Do not log secret access keys.
- Acceptance criteria:
  - [x] Local storage smoke test can put/get a small object.
  - [x] Raw payload storage tasks have stable object references.
- Verification:
  - Command: `pnpm check`
  - Manual: verify MinIO console and bucket naming.
- Dependencies:
  - Blocked by: `I001`
  - Blocks: `G006`, check logs, release artifacts
  - Can run in parallel with: `I004-I006`, `I008-I010`
- Parallelization notes: Own storage helper paths only.

## I008: Add Meilisearch Service Foundation

- Status: done
- Owner: `GPT-5.5`
- Area: `infra`
- Goal: Add Meilisearch configuration and client wiring for product search and code search foundation.
- Background: Meilisearch is the first search engine for repos, PRs, issues, comments, users, orgs, releases, and basic code search.
- Must change: `packages/shared/` or search package, `services/worker/`, `docker-compose.yml`, `.env.example`.
- Requirements:
  - [x] Support local Meilisearch.
  - [x] Define index naming conventions.
  - [x] Keep code search foundation basic.
- Acceptance criteria:
  - [x] Search client can connect locally.
  - [x] Search tasks can create indexes without hardcoded cloud services.
- Verification:
  - Command: `pnpm check`
  - Manual: inspect Meilisearch local endpoint.
- Dependencies:
  - Blocked by: `I001`
  - Blocks: `S002`, `S004`
  - Can run in parallel with: `I004-I007`, `I009-I010`
- Parallelization notes: Owns search wiring only.

## I009: Add Observability Baseline

- Status: done
- Owner: `GPT-5.5`
- Area: `infra`
- Goal: Add structured logging, OpenTelemetry placeholders, Prometheus/Grafana compose support, and basic metrics conventions.
- Background: The stack requires structured logs, basic metrics, and service readiness.
- Must change: `packages/observability/`, `services/*`, `infra/`, `docker-compose.yml`.
- Requirements:
  - [x] Use structured logs with trace/request IDs.
  - [x] Redact secrets per `C014`.
  - [x] Add basic service metrics.
- Acceptance criteria:
  - [x] Logs include service name and no raw tokens.
  - [x] Metrics endpoint or exporter path is documented in code/config.
- Verification:
  - Command: `pnpm check`
  - Manual: inspect sample logs and metrics endpoint.
- Dependencies:
  - Blocked by: `C014`, `I001`
  - Blocks: `V006`
  - Can run in parallel with: `I004-I008`, `I010`
- Parallelization notes: Coordinate with security redaction.

## I010: Add Security Baseline for Secrets and Redaction

- Status: done
- Owner: `GPT-5.5`
- Area: `backend`
- Goal: Implement baseline secret handling, token encryption hooks, no-token-logging checks, least privilege helpers, protected branch awareness hooks, and redaction utilities.
- Background: GitYard handles code and tokens; security is required early.
- Must change: `packages/auth/`, `packages/shared/`, `packages/observability/`, `packages/config/`, `services/api/`.
- Requirements:
  - [x] Implement token encryption interface from `H006`.
  - [x] Add redaction utilities and tests.
  - [x] Add protected branch awareness placeholders.
- Acceptance criteria:
  - [x] Tests prove token-like strings are redacted from logs.
  - [x] GitHub token persistence never stores plaintext by design.
- Verification:
  - Command: `pnpm check`
  - Manual: inspect token storage and logging code paths.
- Dependencies:
  - Blocked by: `C014`, `H006`, `I001`
  - Blocks: `G003`, `G004`, `V006`
  - Can run in parallel with: `I004-I009`
- Parallelization notes: Security helpers only; integration tasks consume them later.
