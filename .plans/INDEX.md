# GitYard Implementation Plan Index

Status: planned

This folder is the execution plan for building GitYard according to `docs/GITYARD_SPEC.md` and `docs/GITYARD_STACK.md`. It is not a versioned release roadmap. GitYard stays at static version `0.0.1` until the maintainer decides it is stable.

## Structure

The plan uses phase and area files because GitYard is a platform with clear ownership boundaries. Contracts come before backend and frontend work, backend and frontend work are split, and verification tasks close complete flows.

- `.plans/INDEX.md` - this index, task registry, execution order, coverage checklist, and human decisions.
- `.plans/DEPENDENCIES.md` - dependency overview and parallelization map.
- `.plans/00-human-decisions.md` - maintainer decisions needed before ambiguous implementation.
- `.plans/01-foundation.md` - monorepo, workspaces, static version, tooling, package skeletons, local bootstrap.
- `.plans/02-contracts-data-events.md` - API, data, event, permission, error, and audit contracts.
- `.plans/03-infra-security-observability.md` - Docker Compose, `.env.example`, self-hosting services, readiness, secrets, logging, metrics.
- `.plans/04-github-git-sync.md` - GitHub modes, webhooks, repo selection, checkpoints, Go git-worker, PR/issue/check/release sync.
- `.plans/05-web-ui-foundation.md` - app shell, routing, branding, design system, states, repo dashboard, settings.
- `.plans/06-pr-issues-reviews.md` - pull request, issue, and review task flow.
- `.plans/07-ai-agents-context.md` - AI providers, no-AI mode, agents, project memory, decision records, context extraction.
- `.plans/08-search-checks-releases-notifications.md` - product/code search, checks, releases, notifications.
- `.plans/09-integration-verification-docs.md` - end-to-end verification, future docs tasks, CLI/browser-extension contracts, source-of-truth readiness.
- `.plans/TEMPLATE.md` - task format used by all plan files.

## Task Registry

| ID | Title | Owner | Area | Status | Blocked by |
| --- | --- | --- | --- | --- | --- |
| H001 | Choose API framework | Human | backend | done | None |
| H002 | Choose database migration tool | Human | db | done | None |
| H003 | Choose auth/session direction | Human | backend | done | None |
| H004 | Normalize naming and env casing | Human | infra | done | None |
| H005 | Define source-of-truth transition boundaries | Human | backend | done | None |
| H006 | Approve token encryption baseline | Human | backend | done | None |
| F001 | Create monorepo workspace foundation | GPT-5.5 | infra | done | H004 |
| F002 | Lock static version 0.0.1 across packages | GPT-5.5 | infra | done | F001 |
| F003 | Add shared TypeScript configuration | GPT-5.5 | backend | done | F001 |
| F004 | Add Turbo and Biome tasks | GPT-5.5 | infra | done | F001 |
| F005 | Scaffold deployable service directories | GPT-5.5 | backend | done | F001 |
| F006 | Scaffold shared package directories | GPT-5.5 | backend | done | F001 |
| F007 | Scaffold Go git-worker module | GPT-5.5 | git | done | F001 |
| F008 | Add configuration package skeleton | GPT-5.5 | infra | done | F001, H004 |
| F009 | Add local development bootstrap scripts | Either | infra | done | F001 |
| F010 | Add contributor workflow placeholders | Either | docs | done | F001 |
| C001 | Define external REST/OpenAPI contract baseline | GPT-5.5 | api | done | H001, F006 |
| C002 | Define frontend API client contract | GPT-5.5 | api | done | C001 |
| C003 | Define core database schema contract | GPT-5.5 | db | done | H002 |
| C004 | Define identity and permissions contract | GPT-5.5 | backend | done | H003, C003 |
| C005 | Define repository and mirror contract | GPT-5.5 | backend | done | C003 |
| C006 | Define PR, file change, and analysis contract | GPT-5.5 | api | done | C003 |
| C007 | Define issue and triage contract | GPT-5.5 | api | done | C003 |
| C008 | Define review and approval contract | GPT-5.5 | api | done | C003 |
| C009 | Define check run and release contract | GPT-5.5 | api | done | C003 |
| C010 | Define agent and agent run contract | GPT-5.5 | agents | done | C004 |
| C011 | Define AI generation and provider contract | GPT-5.5 | ai | done | F008 |
| C012 | Define project memory and decision records contract | GPT-5.5 | backend | done | C003 |
| C013 | Define event schema package contract | GPT-5.5 | backend | done | C003 |
| C014 | Define error model, audit model, and logging contract | GPT-5.5 | backend | done | C004, H006 |
| I001 | Compose core self-hosting services | GPT-5.5 | infra | planned | F005 |
| I002 | Create `.env.example` with `GITYARD_` prefixes | GPT-5.5 | infra | planned | F008, H004 |
| I003 | Wire service health and readiness checks | GPT-5.5 | infra | planned | F005, I001 |
| I004 | Add Postgres and migration wiring | GPT-5.5 | db | planned | C003, I001 |
| I005 | Add NATS JetStream integration foundation | GPT-5.5 | backend | planned | C013, I001 |
| I006 | Add Temporal integration foundation | GPT-5.5 | worker | planned | I001 |
| I007 | Add MinIO object storage foundation | GPT-5.5 | infra | planned | I001 |
| I008 | Add Meilisearch service foundation | GPT-5.5 | infra | planned | I001 |
| I009 | Add observability baseline | GPT-5.5 | infra | planned | C014, I001 |
| I010 | Add security baseline for secrets and redaction | GPT-5.5 | backend | planned | C014, H006 |
| G001 | Define GitHub integration modes contract | GPT-5.5 | github | planned | C004 |
| G002 | Implement GitHub public read-only mode | GPT-5.5 | github | planned | G001 |
| G003 | Implement GitHub PAT mode | GPT-5.5 | github | planned | G001, I010 |
| G004 | Implement GitHub App mode | GPT-5.5 | github | planned | G001, I010 |
| G005 | Implement webhook endpoint and signature verification | GPT-5.5 | github | planned | G001, C013 |
| G006 | Store raw webhook payloads in object storage | GPT-5.5 | github | planned | G005, I007 |
| G007 | Implement installation handling and repo selection | GPT-5.5 | github | planned | G004, C005 |
| G008 | Implement rate limits and sync checkpoints | GPT-5.5 | github | planned | C005, G001 |
| G009 | Implement Go mirror clone and fetch support | GPT-5.5 | git | planned | F007, C005 |
| G010 | Implement commit, tree, and file extraction | GPT-5.5 | git | planned | G009 |
| G011 | Implement diff computation service | GPT-5.5 | git | planned | G010, C006 |
| G012 | Implement PR, issue, check, and release sync jobs | GPT-5.5 | github | planned | G008, G011, C006, C007, C009 |
| U001 | Build web app shell | Claude | frontend | planned | F001 |
| U002 | Build route structure and URL mapping | Claude | frontend | planned | U001, C001 |
| U003 | Build GitYard branding foundation | Claude | design | planned | U001 |
| U004 | Build design system primitives | Claude | design | planned | U001 |
| U005 | Build loading, empty, and error states | Claude | frontend | planned | U004 |
| U006 | Build repository dashboard UI | Claude | frontend | planned | U002, C005 |
| U007 | Build GitHub connection UI | Claude | frontend | planned | U002, G001 |
| U008 | Build provider and no-AI settings UI | Claude | frontend | planned | U002, C011 |
| U009 | Build in-app notification shell | Claude | frontend | planned | U002 |
| U010 | Verify responsive and keyboard-first UI behavior | Claude | testing | planned | U001-U009 |
| P001 | Implement PR API and service logic | GPT-5.5 | api | planned | C006, G012 |
| P002 | Build PR list UI | Claude | frontend | planned | U006, C006 |
| P003 | Build PR detail page UI | Claude | frontend | planned | U002, C006 |
| P004 | Build PR changed files and diff UI | Claude | frontend | planned | P003, C006 |
| P005 | Build PR comments, reviews, and checks UI | Claude | frontend | planned | P003, C008, C009 |
| P006 | Implement PR summary, risk, grouping, and checklist service | GPT-5.5 | ai | planned | C006, C011 |
| P007 | Integrate PR page with live API | Either | integration | planned | P001-P006 |
| P008 | Implement issue API and service logic | GPT-5.5 | api | planned | C007, G012 |
| P009 | Build issue list and detail UI | Claude | frontend | planned | U006, C007 |
| P010 | Implement issue summary, reproduction, current state, duplicates | GPT-5.5 | ai | planned | C007, C011 |
| P011 | Implement review queues and approval state backend | GPT-5.5 | backend | planned | C008, C004 |
| P012 | Build review queues, since-last-viewed, and code owner UI | Claude | frontend | planned | P011, C008 |
| A001 | Implement AI provider gateway | GPT-5.5 | ai | planned | C011 |
| A002 | Implement disabled AI provider | GPT-5.5 | ai | planned | A001 |
| A003 | Implement Ollama provider | GPT-5.5 | ai | planned | A001 |
| A004 | Implement OpenAI-compatible provider and BYO key support | GPT-5.5 | ai | planned | A001, I010 |
| A005 | Implement prompt versioning and structured output validation | GPT-5.5 | ai | planned | C011 |
| A006 | Implement AI caching by input hash | GPT-5.5 | ai | planned | C011, I004 |
| A007 | Implement agent identity, permissions, and lifecycle | GPT-5.5 | agents | planned | C010 |
| A008 | Implement agent tools, approval gates, and audit logging | GPT-5.5 | agents | planned | A007, C014 |
| A009 | Implement project memory and decision records backend | GPT-5.5 | backend | planned | C012, A001 |
| A010 | Implement context extraction for architecture, conventions, failed attempts, release context | GPT-5.5 | ai | planned | A009, G010 |
| S001 | Define search contract | GPT-5.5 | api | planned | C001, C003 |
| S002 | Implement product search indexing and API | GPT-5.5 | backend | planned | S001, I008 |
| S003 | Build product search UI | Claude | frontend | planned | S001, U002 |
| S004 | Implement code search indexing worker foundation | GPT-5.5 | worker | planned | S001, G010, I008 |
| S005 | Build code search UI foundation | Claude | frontend | planned | S001, U002 |
| S006 | Implement checks ingestion and failed-check summary | GPT-5.5 | backend | planned | C009, G012, C011 |
| S007 | Build check status and failed-check UI | Claude | frontend | planned | S006, C009 |
| S008 | Implement release sync and release page | Either | integration | planned | C009, G012, U002 |
| S009 | Define notification contract and backend | GPT-5.5 | backend | planned | C013, C014, I005 |
| S010 | Integrate in-app notifications UI | Claude | frontend | planned | S009, U009 |
| V001 | Verify repository connection and sync flow | Either | testing | planned | G012, U006, U007 |
| V002 | Verify PR review decision flow | Either | testing | planned | P007, P011, P012 |
| V003 | Verify issue triage flow | Either | testing | planned | P008-P010 |
| V004 | Verify no-AI and local-AI behavior | Either | testing | planned | A002, A003, U008 |
| V005 | Verify self-hosted Docker Compose bootstrap | Either | testing | planned | I001-I010 |
| V006 | Verify security and audit requirements | Either | testing | planned | I010, C014, A008, G005 |
| V007 | Create future docs implementation tasks | Either | docs | planned | F010 |
| V008 | Verify complete plan coverage and update gaps | Either | testing | planned | all contract tasks |

## Suggested Execution Order

1. Build infra/security foundations `I001` through `I010`.
2. Build GitHub and Git sync `G001` through `G012`.
3. Build web foundation `U001` through `U010` in parallel with backend after contracts.
4. Build PR, issue, and review workflows `P001` through `P012`.
5. Build AI, agents, and context `A001` through `A010`.
6. Build search, checks, releases, and notifications `S001` through `S010`.
7. Run verification tasks `V001` through `V008`.

## Parallelizable Groups

- After `F001`: `F003`, `F004`, `F005`, `F006`, `F007`, and `F009`.
- After contracts: frontend tasks `U002-U009` can run against contracts and mocked data while backend tasks `I*`, `G*`, `P001`, `P006`, `P008`, `P010`, `P011`, `A*`, and `S*` proceed.
- `G009-G011` can run in `services/git-worker` while `G002-G008` run in TypeScript GitHub packages/services.
- `P002-P005`, `P009`, `P012`, `S003`, `S005`, `S007`, and `S010` are Claude-owned UI tasks and should not edit backend packages.
- Verification tasks should run after the flows they verify, but `V007` can run once the file structure exists.

## Coverage Checklist

- [x] Monorepo foundation, workspaces, static version `0.0.1`, TypeScript config, Go service structure, linting, formatting, build scripts.
- [x] Environment config, Docker Compose, local bootstrap, self-hosting services: Postgres, Redis, NATS, Temporal, Meilisearch, MinIO, optional Ollama.
- [x] Web app shell, routing, branding, design system, loading, empty, and error states.
- [x] API service, health endpoints, request validation, typed contracts, database schema, migrations.
- [x] Users, organizations, repositories, mirrors, sync events, PRs, issues, comments, reviews, checks, releases.
- [x] Agents, agent runs, AI generations, project memory, decision records, permissions, audit logs.
- [x] Event schema package, NATS integration, Temporal integration.
- [x] GitHub public read-only, PAT, GitHub App, webhook endpoint, signature verification, raw payload storage, installations, repo selection, rate limits, checkpoints.
- [x] Go git-worker clone/fetch, bare mirror layout, commit/tree/file extraction, diff computation.
- [x] PR sync, list, detail, changed files, comments, reviews, checks, summary, risk assessment, file grouping, reviewer checklist, agent involvement.
- [x] Issue sync, list, detail, summary, reproduction steps, current state, duplicate candidates.
- [x] Review model, approval state, requested changes, queues, since-last-viewed, code owner awareness.
- [x] AI provider abstraction, disabled provider, Ollama, OpenAI-compatible provider, BYO keys, provider settings, prompt versioning, structured output validation, cache by input hash.
- [x] No hardcoded paid provider and no-AI behavior.
- [x] Agent identity, permissions, lifecycle, tools, approval gates, audit logs.
- [x] Context extraction, architecture notes, coding conventions, failed attempts, release context.
- [x] Product search, code search foundation, indexing worker.
- [x] Check run model, GitHub checks ingestion, check status UI, failed check summary.
- [x] Release model, release sync, release page.
- [x] In-app notifications.
- [x] Token encryption, no token logging, least privilege, secret redaction, protected branch awareness.
- [x] Structured logging, basic metrics, service readiness.
- [x] Contributor docs and setup docs are planned as future docs tasks, not created in this task.

## Human Decisions Resolved

- `H001`: Use `Hono` for the API service.
- `H002`: Use `Drizzle` and Drizzle Kit for schema and migrations.
- `H003`: Use custom GitHub OAuth/session handling; public read-only browsing should not require a session where possible.
- `H004`: Use lowercase package scope `@gityard/*`; use `GITYARD_` for GitYard-specific environment variables.
- `H005`: Limit native GitYard hosting for now to contracts, canonical-provider modeling, mirror foundations, and Git-compatible read foundations; defer native write-path hosting.
- `H006`: Use `GITYARD_ENCRYPTION_KEY` locally, KMS-backed envelope encryption later, and no token logging in any mode.
- Frontend: Use Vite + React + TanStack Router + TanStack Query for the main app. Do not use Next.js. Do not use TanStack Start unless a future Human decision changes the app/runtime boundary.

## Intentionally Not Planned As Versioned Releases

No MVP, beta, v0.1, v1, launch, or release plan is created. The plan uses phase, area, readiness, and stability language only.
