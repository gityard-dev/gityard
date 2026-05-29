# Phase: Contracts, Data, and Events

Contract tasks must complete before parallel implementation. They define stable shapes for APIs, database tables, events, mocked frontend data, permissions, and error handling.

## Shared Contract Task Rules

Unless a task says otherwise:

- Must read: `AGENTS.md`, `README.md`, `docs/GITYARD_SPEC.md`, `docs/GITYARD_STACK.md`, `.plans/INDEX.md`, `.plans/DEPENDENCIES.md`.
- Must not change: `apps/web` feature UI, deployable service behavior, infra files.
- Verification: run `pnpm check` and manually compare the contract to the canonical docs.
- Completion report format: Use the standard completion report from `.plans/TEMPLATE.md`.

## C001: Define External REST/OpenAPI Contract Baseline

- Status: planned
- Owner: `GPT-5.5`
- Area: `api`
- Goal: Define REST/OpenAPI conventions, route naming, validation style, pagination, auth envelope, and response envelope.
- Background: The stack requires REST/OpenAPI externally and typed contracts before implementation.
- Must change: `packages/protocol/`, `services/api/` contract-only files.
- Requirements:
  - [ ] Include health, repo, PR, issue, agent, search, check, release, and settings route families.
  - [ ] Use request validation and typed response schemas.
  - [ ] Do not define GraphQL as the initial API.
- Acceptance criteria:
  - [ ] Frontend tasks can build typed mocked data from the contract.
  - [ ] API service tasks can validate requests from schemas.
- Dependencies:
  - Blocked by: `H001`, `F006`
  - Blocks: `C002`, `U002`, most API implementation tasks
  - Can run in parallel with: `C003-C014` after shared package scaffold
- Parallelization notes: Owns `packages/protocol` baseline only.

## C002: Define Frontend API Client Contract

- Status: planned
- Owner: `GPT-5.5`
- Area: `api`
- Goal: Define how `apps/web` consumes typed API contracts and mocked data.
- Background: Claude UI tasks need stable contracts without waiting for backend implementation.
- Must change: `packages/protocol/`, optional generated-client placeholder path.
- Requirements:
  - [ ] Define typed client entrypoints.
  - [ ] Define mock fixture shape for repos, PRs, issues, reviews, checks, releases, notifications, AI settings.
  - [ ] Keep generation optional until implementation chooses tooling.
- Acceptance criteria:
  - [ ] UI tasks can import or copy fixtures without touching backend services.
  - [ ] No live backend is required for initial UI states.
- Dependencies:
  - Blocked by: `C001`
  - Blocks: `U002-U010`, `P002-P005`, `P009`, `P012`, `S003`, `S005`, `S007`
  - Can run in parallel with: backend contracts after `C001`
- Parallelization notes: Contract package only; avoid `apps/web` edits.

## C003: Define Core Database Schema Contract

- Status: planned
- Owner: `GPT-5.5`
- Area: `db`
- Goal: Define logical schemas, migration layout, IDs, timestamps, provider mapping, and soft-delete/archive rules.
- Background: Postgres is the product source of truth and must cover full platform entities.
- Must change: `packages/db/` contract/schema files.
- Requirements:
  - [ ] Include users, organizations, memberships, repositories, repository mirrors, sync events, webhooks, PRs, issues, comments, reviews, check runs, releases, agents, agent runs, AI generations, project memory, decision records, permissions, audit logs.
  - [ ] Include migration naming and rollback policy from selected tool.
  - [ ] Keep large blobs out of Postgres.
- Acceptance criteria:
  - [ ] Every required entity from the spec has a table or explicit future placeholder.
  - [ ] Object storage references are used for raw payloads, large diffs, logs, and artifacts.
- Dependencies:
  - Blocked by: `H002`, `F006`
  - Blocks: `C004-C014`, `I004`
  - Can run in parallel with: `C001`
- Parallelization notes: Owns DB contracts only.

## C004: Define Identity and Permissions Contract

- Status: planned
- Owner: `GPT-5.5`
- Area: `backend`
- Goal: Define users, organizations, memberships, roles, user permissions, agent permissions, and audit actors.
- Background: Permissions protect repos, tokens, writeback, and agent actions.
- Must change: `packages/auth/`, `packages/protocol/`, `packages/db/` auth schema contract.
- Requirements:
  - [ ] Include user permissions listed in the spec.
  - [ ] Include conservative default agent permissions.
  - [ ] Include public read-only behavior from `H003`.
- Acceptance criteria:
  - [ ] Backend tasks can check repo, PR, issue, review, agent, and settings permissions.
  - [ ] Agent permissions default to no secrets, no protected branch writes, and no merge.
- Dependencies:
  - Blocked by: `H003`, `C003`
  - Blocks: `C010`, `C014`, `G001`, `A007`, `P011`
  - Can run in parallel with: `C005-C009`, `C011-C013`
- Parallelization notes: Coordinate with auth and audit contracts.

## C005: Define Repository and Mirror Contract

- Status: planned
- Owner: `GPT-5.5`
- Area: `backend`
- Goal: Define repository, mirror, branch, commit reference, sync state, source provider, canonical provider, and mirror layout contracts.
- Background: GitYard must begin with GitHub compatibility while preserving future GitYard source-of-truth mode.
- Must change: `packages/protocol/`, `packages/db/`, `packages/git/`.
- Requirements:
  - [ ] Include `canonical_provider`, provider IDs, owner/name/full_name, default branch, visibility, source URL.
  - [ ] Include repository mirror state and sync checkpoints.
  - [ ] Do not make GitHub the permanent source of truth.
- Acceptance criteria:
  - [ ] GitHub and git-worker tasks can sync and mirror repos using this contract.
  - [ ] Future native hosting has a non-GitHub canonical-provider path.
- Dependencies:
  - Blocked by: `C003`, `H005`
  - Blocks: `G007-G012`, `U006`, `V001`
  - Can run in parallel with: `C004`, `C006-C014`
- Parallelization notes: Owns repo contracts; no implementation.

## C006: Define PR, File Change, and Analysis Contract

- Status: planned
- Owner: `GPT-5.5`
- Area: `api`
- Goal: Define PR metadata, changed files, comments, reviews, checks linkage, risk, summary, file groups, reviewer checklist, and agent involvement.
- Background: PR pages are review decision surfaces in the spec.
- Must change: `packages/protocol/`, `packages/db/`, `packages/ai/` schema contracts.
- Requirements:
  - [ ] Include PR list and detail response shapes.
  - [ ] Include risk levels, risk reasons, file groups, changed files, summary, checklist, unresolved questions, merge readiness.
  - [ ] Include last analyzed commit SHA and stale analysis state.
- Acceptance criteria:
  - [ ] UI can build PR list/detail/diff/checklist screens from mocked data.
  - [ ] Backend can store and serve AI/non-AI analysis outputs.
- Dependencies:
  - Blocked by: `C003`
  - Blocks: `P001-P007`, `G011`, `G012`
  - Can run in parallel with: `C004-C005`, `C007-C014`
- Parallelization notes: Contract-only; keep PR UI separate.

## C007: Define Issue and Triage Contract

- Status: planned
- Owner: `GPT-5.5`
- Area: `api`
- Goal: Define issue list/detail, labels, triage state, reproduction steps, current state, linked PRs, duplicate candidates, open questions, and next actions.
- Background: Issues are structured project memory, not only comment threads.
- Must change: `packages/protocol/`, `packages/db/`, `packages/ai/` schema contracts.
- Requirements:
  - [ ] Include all issue states from the spec.
  - [ ] Include agent attempts and maintainer decisions.
  - [ ] Include duplicate candidate confidence and evidence fields.
- Acceptance criteria:
  - [ ] UI can show issue list and detail with current understanding.
  - [ ] AI and no-AI modes can represent unavailable generated summaries without crashes.
- Dependencies:
  - Blocked by: `C003`
  - Blocks: `P008-P010`, `V003`
  - Can run in parallel with: `C004-C006`, `C008-C014`
- Parallelization notes: Contract-only; no issue service implementation.

## C008: Define Review and Approval Contract

- Status: planned
- Owner: `GPT-5.5`
- Area: `api`
- Goal: Define reviews, comments, approval state, requested changes, reviewer queues, code owner awareness, and since-last-viewed state.
- Background: Review is a decision surface and must track approval state correctly.
- Must change: `packages/protocol/`, `packages/db/`.
- Requirements:
  - [ ] Include review submission, dismissal, requested changes, unresolved threads, stale approval after new commits.
  - [ ] Include reviewer queue filters and code owner mapping placeholders.
  - [ ] Include GitHub writeback capability as a mode, not a requirement for read-only mode.
- Acceptance criteria:
  - [ ] UI can render review queues and since-last-viewed state.
  - [ ] Backend can model requested changes and approvals without losing GitHub compatibility.
- Dependencies:
  - Blocked by: `C003`
  - Blocks: `P005`, `P011`, `P012`
  - Can run in parallel with: other domain contracts
- Parallelization notes: Contract-only.

## C009: Define Check Run and Release Contract

- Status: planned
- Owner: `GPT-5.5`
- Area: `api`
- Goal: Define check runs, workflow runs, failed check summaries, release records, release artifacts, changelog, and release readiness.
- Background: GitYard must ingest CI/checks and releases and explain their relevance.
- Must change: `packages/protocol/`, `packages/db/`.
- Requirements:
  - [ ] Include check name, status, conclusion, timestamps, logs URL/object reference, failure summary, related files, flakiness signal.
  - [ ] Include release tag, status, included PRs/issues/commits, artifacts, rollback notes.
  - [ ] Keep large logs/artifacts in object storage.
- Acceptance criteria:
  - [ ] Check status UI and release page can be built from the contract.
  - [ ] Failed-check summary service has a stable output schema.
- Dependencies:
  - Blocked by: `C003`
  - Blocks: `S006-S008`, `G012`, `P005`
  - Can run in parallel with: other domain contracts
- Parallelization notes: Contract-only.

## C010: Define Agent and Agent Run Contract

- Status: planned
- Owner: `GPT-5.5`
- Area: `agents`
- Goal: Define agent identity, permissions, task types, lifecycle, tools, outputs, approval gates, and trace storage.
- Background: Agents are actors with identities, permissions, logs, and reviewable output.
- Must change: `packages/agents/`, `packages/protocol/`, `packages/db/`.
- Requirements:
  - [ ] Include task types and lifecycle states from the spec.
  - [ ] Include output types: summary, plan, comment, review, patch, pull_request, test_result, decision_suggestion.
  - [ ] Include approval gates for risky actions.
- Acceptance criteria:
  - [ ] Agent backend can enforce least privilege.
  - [ ] UI can show agent involvement on PRs and issues.
- Dependencies:
  - Blocked by: `C004`
  - Blocks: `A007`, `A008`, `P006`, `P010`
  - Can run in parallel with: `C011-C014`
- Parallelization notes: Contract-only.

## C011: Define AI Generation and Provider Contract

- Status: planned
- Owner: `GPT-5.5`
- Area: `ai`
- Goal: Define pluggable AI providers, disabled provider behavior, Ollama, OpenAI-compatible endpoints, BYO keys, prompt versions, structured outputs, and cache keys.
- Background: GitYard must support local AI, no-AI mode, and no required paid provider.
- Must change: `packages/ai/`, `packages/protocol/`, `packages/config/`.
- Requirements:
  - [ ] Include `disabled`, `ollama`, and OpenAI-compatible providers.
  - [ ] Include provider settings without hardcoding OpenAI or Anthropic as required.
  - [ ] Include input hash caching and prompt versioning fields.
- Acceptance criteria:
  - [ ] `GITYARD_AI_PROVIDER=disabled` is a valid configured state.
  - [ ] PR/issue analysis contracts can return disabled-state responses.
- Dependencies:
  - Blocked by: `F008`
  - Blocks: `A001-A006`, `P006`, `P010`, `U008`, `V004`
  - Can run in parallel with: `C003-C010`, `C012-C014`
- Parallelization notes: AI contract only; no provider implementation.

## C012: Define Project Memory and Decision Records Contract

- Status: planned
- Owner: `GPT-5.5`
- Area: `backend`
- Goal: Define project memory, decision records, architecture notes, coding conventions, known risks, failed attempts, release context, and maintainer notes.
- Background: GitYard should understand project context and preserve decisions.
- Must change: `packages/protocol/`, `packages/db/`.
- Requirements:
  - [ ] Include memory types from the stack.
  - [ ] Include confidence, source, provenance, and review state.
  - [ ] Include links to issues, PRs, commits, releases, and agent runs.
- Acceptance criteria:
  - [ ] Context extraction tasks have stable storage targets.
  - [ ] UI can distinguish generated memory from human-approved records.
- Dependencies:
  - Blocked by: `C003`
  - Blocks: `A009`, `A010`
  - Can run in parallel with: other contracts
- Parallelization notes: Contract-only.

## C013: Define Event Schema Package Contract

- Status: planned
- Owner: `GPT-5.5`
- Area: `backend`
- Goal: Define event envelope, versioning, subjects, payload validation, idempotency keys, and replay expectations.
- Background: The stack requires NATS JetStream and typed, versioned, immutable events.
- Must change: `packages/events/`.
- Requirements:
  - [ ] Include subjects listed in the stack for GitHub, repo sync, git, PR, issue, review, agent, check, release, search, notifications.
  - [ ] Include event envelope fields: id, type, version, timestamp, actor, repository, data.
  - [ ] Include validation and serialization rules.
- Acceptance criteria:
  - [ ] NATS integration can publish/consume typed events.
  - [ ] Worker tasks can retry idempotently using event IDs.
- Dependencies:
  - Blocked by: `C003`
  - Blocks: `I005`, `G005`, `G012`, worker tasks
  - Can run in parallel with: other contracts
- Parallelization notes: Owns events package only.

## C014: Define Error Model, Audit Model, and Logging Contract

- Status: planned
- Owner: `GPT-5.5`
- Area: `backend`
- Goal: Define error codes, user-visible disabled states, audit events, structured log fields, secret redaction, and token logging prohibitions.
- Background: Security, no-AI behavior, webhooks, agents, and integrations need consistent observability and audit trails.
- Must change: `packages/protocol/`, `packages/shared/`, `packages/observability/`, `packages/db/`.
- Requirements:
  - [ ] Include no token logging and redaction requirements.
  - [ ] Include audit records for auth, GitHub sync, webhook processing, agent actions, permission changes, AI generations.
  - [ ] Include user-safe error messages for no-AI mode and provider failures.
- Acceptance criteria:
  - [ ] Security verification can check logs for redaction.
  - [ ] API responses expose stable machine-readable error codes.
- Dependencies:
  - Blocked by: `C004`, `H006`
  - Blocks: `I009`, `I010`, `A008`, `V006`
  - Can run in parallel with: other contracts after `C004`
- Parallelization notes: Coordinate with observability and security implementation.
