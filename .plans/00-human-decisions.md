# Phase: Human Decisions

These tasks capture product and architecture choices that the canonical docs leave open. They are decision tasks only and must not implement product code.

## H001: Choose API Framework

- Status: done
- Owner: `Human`
- Area: `backend`
- Goal: Choose `Hono` or `Fastify` as the initial TypeScript API framework.
- Background: `docs/GITYARD_STACK.md` allows Hono or Fastify. Implementation should not fork between both.
- Must read: `AGENTS.md`, `README.md`, `docs/GITYARD_SPEC.md`, `docs/GITYARD_STACK.md`, `.plans/INDEX.md`.
- Must change: `.plans/00-human-decisions.md` or a future decision record inside `.plans/`.
- Must not change: product code, root config, docs outside `.plans/`.
- Requirements:
  - [x] Record one selected framework.
  - [x] Explain the reason in one paragraph.
- Acceptance criteria:
  - [x] `C001` can define API contracts against one framework target.
  - [x] No task remains written as if both frameworks will be implemented.
- Verification:
  - Command: `git diff -- .plans`
  - Manual: confirm the decision names exactly one framework.
- Dependencies:
  - Blocked by: None
  - Blocks: `C001`, `F005`
  - Can run in parallel with: `H002-H006`
- Parallelization notes: Decision-only task; no implementation file overlap.
- Completion report format: Use the standard completion report from `.plans/TEMPLATE.md`.

Decision: Use `Hono` for the initial TypeScript API service. Hono is small, fast, and has good TypeScript ergonomics for a modular API service with validation and OpenAPI-oriented contracts.

## H002: Choose Database Migration Tool

- Status: done
- Owner: `Human`
- Area: `db`
- Goal: Choose Drizzle or Prisma for schema and migrations.
- Background: The stack recommends Drizzle but leaves Prisma as an option.
- Must read: `AGENTS.md`, `README.md`, `docs/GITYARD_STACK.md`, `.plans/INDEX.md`.
- Must change: `.plans/00-human-decisions.md` or a future decision record inside `.plans/`.
- Must not change: product code, database files outside `.plans/`.
- Requirements:
  - [x] Record the selected migration tool.
  - [x] Note whether generated clients are allowed.
- Acceptance criteria:
  - [x] `C003` and `I004` can name one migration workflow.
  - [x] No plan task asks agents to implement both tools.
- Verification:
  - Command: `git diff -- .plans`
  - Manual: confirm the decision resolves the Drizzle/Prisma ambiguity.
- Dependencies:
  - Blocked by: None
  - Blocks: `C003`, `I004`
  - Can run in parallel with: `H001`, `H003-H006`
- Parallelization notes: Decision-only task; no code overlap.
- Completion report format: Use the standard completion report from `.plans/TEMPLATE.md`.

Decision: Use `Drizzle` and Drizzle Kit for schema and migrations. Generated clients are not a primary dependency; typed schema and queries should live close to the TypeScript package boundary.

## H003: Choose Auth and Session Direction

- Status: done
- Owner: `Human`
- Area: `backend`
- Goal: Choose Auth.js or a custom GitHub OAuth/session model.
- Background: Auth/session strategy affects users, organizations, token storage, permissions, and GitHub installation mapping.
- Must read: `AGENTS.md`, `README.md`, `docs/GITYARD_SPEC.md`, `docs/GITYARD_STACK.md`.
- Must change: `.plans/00-human-decisions.md` or a future decision record inside `.plans/`.
- Must not change: product code, auth packages outside `.plans/`.
- Requirements:
  - [x] Record selected auth/session direction.
  - [x] State whether public read-only browsing requires a session.
- Acceptance criteria:
  - [x] `C004` can define user, org, membership, session, and permission contracts without ambiguity.
  - [x] GitHub PAT and App mode tasks have a stable identity model to target.
- Verification:
  - Command: `git diff -- .plans`
  - Manual: confirm session requirements for public read-only mode are explicit.
- Dependencies:
  - Blocked by: None
  - Blocks: `C004`, `G001`
  - Can run in parallel with: `H001-H002`, `H004-H006`
- Parallelization notes: Decision-only task; no implementation file overlap.
- Completion report format: Use the standard completion report from `.plans/TEMPLATE.md`.

Decision: Use custom GitHub OAuth/session handling. Public read-only browsing should not require a session where provider rate limits and repository visibility allow anonymous access.

## H004: Normalize Naming and Environment Variable Casing

- Status: done
- Owner: `Human`
- Area: `infra`
- Goal: Confirm canonical package naming and require `GITYARD_` for GitYard-specific environment variables.
- Background: The stack examples use mixed `GitYard_` and package names like `@GitYard/*`; this task resolves casing before scaffolding.
- Must read: `AGENTS.md`, `README.md`, `docs/GITYARD_STACK.md`, `.plans/INDEX.md`.
- Must change: `.plans/00-human-decisions.md` or a future decision record inside `.plans/`.
- Must not change: product code, `.env.example` outside this planning task.
- Requirements:
  - [x] Decide package scope casing.
  - [x] Confirm `GITYARD_` env prefix for app-specific variables.
  - [x] Identify old prefixes that future implementation must normalize.
- Acceptance criteria:
  - [x] `F001`, `F008`, and `I002` can use one naming convention.
  - [x] The plan contains no task that asks agents to preserve mixed env prefixes.
- Verification:
  - Command: `git diff -- .plans`
  - Manual: confirm the decision explicitly mentions `GITYARD_`.
- Dependencies:
  - Blocked by: None
  - Blocks: `F001`, `F008`, `I002`
  - Can run in parallel with: `H001-H003`, `H005-H006`
- Parallelization notes: Decision-only task; no code overlap.
- Completion report format: Use the standard completion report from `.plans/TEMPLATE.md`.

Decision: Use lowercase npm package scope `@gityard/*`. Use `GITYARD_` for all GitYard-specific environment variables. Future implementation must normalize any old `GitYard_` examples from canonical docs to `GITYARD_`.

## H005: Define Source-of-Truth Transition Boundaries

- Status: done
- Owner: `Human`
- Area: `backend`
- Goal: Define what implementation work is allowed now for future GitYard source-of-truth mode.
- Background: The spec requires a path from GitHub source-of-truth to GitYard source-of-truth, but early work must not overbuild native hosting.
- Must read: `AGENTS.md`, `README.md`, `docs/GITYARD_SPEC.md`, `docs/GITYARD_STACK.md`.
- Must change: `.plans/00-human-decisions.md` or a future decision record inside `.plans/`.
- Must not change: product code or docs outside `.plans/`.
- Requirements:
  - [x] State which native-hosting foundations are in scope.
  - [x] State which write-paths remain future work.
  - [x] Preserve Git compatibility and migration path goals.
- Acceptance criteria:
  - [x] Future contracts can model `canonical_provider` without making GitHub permanent.
  - [x] No task describes GitYard as only a GitHub layer.
- Verification:
  - Command: `git diff -- .plans`
  - Manual: confirm the decision keeps native GitYard hosting as a future platform path.
- Dependencies:
  - Blocked by: None
  - Blocks: `C005`, `V008`
  - Can run in parallel with: `H001-H004`, `H006`
- Parallelization notes: Decision-only task; no implementation file overlap.
- Completion report format: Use the standard completion report from `.plans/TEMPLATE.md`.

Decision: For now, native GitYard hosting is limited to data model/contracts, canonical-provider modeling, repository mirror foundations, and Git-compatible read foundations. Native write-path hosting, SSH/HTTP Git serving, native PR writes, and migration/export write flows are deferred until GitHub-as-source-of-truth flows are stable.

## H006: Approve Token Encryption Baseline

- Status: done
- Owner: `Human`
- Area: `backend`
- Goal: Approve the local development and hosted-mode baseline for encrypting tokens at rest.
- Background: The stack requires encrypted GitHub tokens, no token logging, least privilege, and secret redaction.
- Must read: `AGENTS.md`, `README.md`, `docs/GITYARD_STACK.md`.
- Must change: `.plans/00-human-decisions.md` or a future decision record inside `.plans/`.
- Must not change: product code, secrets, env files outside `.plans/`.
- Requirements:
  - [x] Define local development encryption key behavior.
  - [x] Define hosted/cloud key-management expectation at a high level.
  - [x] State no tokens may be logged.
- Acceptance criteria:
  - [x] `C014`, `I010`, `G003`, and `G004` can implement one token-storage policy.
  - [x] Verification tasks can test redaction and encrypted persistence.
- Verification:
  - Command: `git diff -- .plans`
  - Manual: confirm the decision covers local and hosted modes.
- Dependencies:
  - Blocked by: None
  - Blocks: `C014`, `I010`, `G003`, `G004`
  - Can run in parallel with: `H001-H005`
- Parallelization notes: Decision-only task; no code overlap.
- Completion report format: Use the standard completion report from `.plans/TEMPLATE.md`.

Decision: Local development uses a required `GITYARD_ENCRYPTION_KEY` for encrypting stored tokens. Hosted/cloud mode should use envelope encryption with a KMS-backed key. Tokens and token-like values must never be logged in any mode, and redaction tests are required.
