# Phase: GitHub and Git Sync

These tasks keep GitHub compatibility first while preserving GitYard's future source-of-truth path. GitHub is an integration, not a permanent architecture lock-in.

## Shared Rules

- Must read for every task: `AGENTS.md`, `README.md`, `docs/GITYARD_SPEC.md`, `docs/GITYARD_STACK.md`, `.plans/INDEX.md`, `.plans/DEPENDENCIES.md`.
- Must not change for every task: `apps/web` UI except generated contracts, docs outside `.plans/`, unrelated AI/provider code.
- Completion report format: Use the standard completion report from `.plans/TEMPLATE.md`.

## G001: Define GitHub Integration Modes Contract

- Status: planned
- Owner: `GPT-5.5`
- Area: `github`
- Goal: Define public read-only, PAT, GitHub App, review mode, workflow mode, permissions, and writeback boundaries.
- Background: The spec describes stages and modes; implementation must not collapse all modes into one.
- Must change: `packages/github/`, `packages/protocol/`, `packages/auth/`.
- Requirements:
  - [ ] Public read-only mode works without write access.
  - [ ] PAT and GitHub App modes have least-privilege permission expectations.
  - [ ] Writeback is mode-gated.
- Acceptance criteria:
  - [ ] UI and backend tasks can distinguish read-only, review, and workflow capabilities.
  - [ ] No mode requires paid AI or cloud services.
- Verification:
  - Command: `pnpm check`
  - Manual: compare modes against spec.
- Dependencies:
  - Blocked by: `C004`, `H003`
  - Blocks: `G002-G008`, `U007`
  - Can run in parallel with: `G009-G011`
- Parallelization notes: Contract only; no GitHub API calls yet.

## G002: Implement GitHub Public Read-Only Mode

- Status: planned
- Owner: `GPT-5.5`
- Area: `github`
- Goal: Fetch public repository metadata without write access or user token requirements where GitHub API limits allow.
- Background: Public read-only mode is required for demos, trust building, and open-source browsing.
- Must change: `packages/github/`, `services/api/`, `services/worker/`.
- Requirements:
  - [ ] Support public repo lookup by owner/name.
  - [ ] Do not require GitHub write permissions.
  - [ ] Surface rate-limit errors clearly.
- Acceptance criteria:
  - [ ] A public repo can be connected in read-only mode.
  - [ ] Attempts to write comments/reviews are rejected with capability errors.
- Verification:
  - Command: `pnpm check`
  - Manual: connect a public repository without PAT/App credentials.
- Dependencies:
  - Blocked by: `G001`
  - Blocks: `G012`, `V001`
  - Can run in parallel with: `G003-G011`
- Parallelization notes: Own public GitHub client paths.

## G003: Implement GitHub PAT Mode

- Status: planned
- Owner: `GPT-5.5`
- Area: `github`
- Goal: Add personal access token configuration, encrypted storage, scoped API client creation, and capability reporting.
- Background: Self-hosted users need GitHub PAT mode without GitHub App setup.
- Must change: `packages/github/`, `packages/auth/`, `services/api/`, `packages/db/`.
- Requirements:
  - [ ] Store tokens encrypted at rest.
  - [ ] Never log token values.
  - [ ] Document required least-privilege scopes in code/config comments.
- Acceptance criteria:
  - [ ] PAT mode can list accessible repos.
  - [ ] Logs and audit records redact token material.
- Verification:
  - Command: `pnpm check`
  - Manual: inspect token persistence and logs.
- Dependencies:
  - Blocked by: `G001`, `I010`
  - Blocks: `G008`, `G012`
  - Can run in parallel with: `G002`, `G004-G011`
- Parallelization notes: Own PAT client and storage paths.

## G004: Implement GitHub App Mode

- Status: planned
- Owner: `GPT-5.5`
- Area: `github`
- Goal: Add GitHub App configuration, private key handling, installation token generation, and capability reporting.
- Background: GitHub App mode is the preferred team/org integration path.
- Must change: `packages/github/`, `services/api/`, `packages/auth/`, `packages/db/`.
- Requirements:
  - [ ] Store app private key material securely.
  - [ ] Generate installation tokens without logging secrets.
  - [ ] Track installations and account mappings.
- Acceptance criteria:
  - [ ] An installation can be registered and used to fetch repositories.
  - [ ] Missing or invalid app config returns clear setup errors.
- Verification:
  - Command: `pnpm check`
  - Manual: run a local GitHub App setup check with test credentials when available.
- Dependencies:
  - Blocked by: `G001`, `I010`
  - Blocks: `G007`, `G008`, `G012`
  - Can run in parallel with: `G002`, `G003`, `G005-G011`
- Parallelization notes: Own GitHub App helpers and installation tables.

## G005: Implement Webhook Endpoint and Signature Verification

- Status: planned
- Owner: `GPT-5.5`
- Area: `github`
- Goal: Add webhook ingestion endpoint with signature verification, idempotency, event normalization, and audit logging.
- Background: Webhook security is required early and every webhook must be verified.
- Must change: `services/api/`, `packages/github/`, `packages/events/`, `packages/db/`.
- Requirements:
  - [ ] Reject invalid signatures.
  - [ ] Store metadata for accepted and rejected webhook attempts.
  - [ ] Publish normalized events after validation.
- Acceptance criteria:
  - [ ] Invalid signature request returns a non-success status and does not publish events.
  - [ ] Valid request creates a webhook record and emits `github.webhook.received`.
- Verification:
  - Command: `pnpm check`
  - Manual: send signed and unsigned local webhook requests.
- Dependencies:
  - Blocked by: `G001`, `C013`
  - Blocks: `G006`, `G012`, `V006`
  - Can run in parallel with: `G002-G004`, `G007-G011`
- Parallelization notes: API endpoint only; raw payload storage is separate.

## G006: Store Raw Webhook Payloads in Object Storage

- Status: planned
- Owner: `GPT-5.5`
- Area: `github`
- Goal: Store raw webhook payload bodies in S3-compatible storage with DB references.
- Background: The stack requires raw webhook payload storage while avoiding large blobs in Postgres.
- Must change: `services/api/`, `packages/github/`, `packages/db/`, storage helper package.
- Requirements:
  - [ ] Store accepted payloads with deterministic object keys.
  - [ ] Store only object references in Postgres.
  - [ ] Redact secrets from logs.
- Acceptance criteria:
  - [ ] A webhook record points to a retrievable object-store payload.
  - [ ] Invalid signatures are not processed as trusted events.
- Verification:
  - Command: `pnpm check`
  - Manual: inspect MinIO object after local webhook.
- Dependencies:
  - Blocked by: `G005`, `I007`
  - Blocks: `V006`
  - Can run in parallel with: `G007-G011`
- Parallelization notes: Extends webhook endpoint; coordinate with G005 completion.

## G007: Implement Installation Handling and Repo Selection

- Status: planned
- Owner: `GPT-5.5`
- Area: `github`
- Goal: Add GitHub installation records, repository selection state, sync eligibility, and capability reporting.
- Background: Users must select repositories and GitYard must track installation access.
- Must change: `packages/github/`, `services/api/`, `packages/db/`, `packages/protocol/`.
- Requirements:
  - [ ] Track installation account, selected repositories, and permissions.
  - [ ] Support repository add/remove updates from webhooks.
  - [ ] Expose repo selection API for UI.
- Acceptance criteria:
  - [ ] Repo selection changes are persisted and auditable.
  - [ ] Removed repo access prevents future sync jobs.
- Verification:
  - Command: `pnpm check`
  - Manual: simulate install/repo selection payloads.
- Dependencies:
  - Blocked by: `G004`, `C005`
  - Blocks: `G012`, `U007`, `V001`
  - Can run in parallel with: `G002-G006`, `G008-G011`
- Parallelization notes: Owns installation and selection models.

## G008: Implement Rate Limits and Sync Checkpoints

- Status: planned
- Owner: `GPT-5.5`
- Area: `github`
- Goal: Add GitHub API rate limit handling, backoff, resumable checkpoints, and sync event recording.
- Background: Sync jobs must be durable, resumable, observable, and respectful of provider limits.
- Must change: `packages/github/`, `services/worker/`, `packages/db/`, `packages/events/`.
- Requirements:
  - [ ] Track per-repo and per-provider sync checkpoints.
  - [ ] Respect GitHub rate-limit headers.
  - [ ] Emit sync started/completed/failed events.
- Acceptance criteria:
  - [ ] Interrupted sync resumes from the last checkpoint where possible.
  - [ ] Rate-limit state is visible to API/UI.
- Verification:
  - Command: `pnpm check`
  - Manual: simulate rate-limit responses in tests or mocks.
- Dependencies:
  - Blocked by: `C005`, `G001`
  - Blocks: `G012`, `V001`
  - Can run in parallel with: `G002-G007`, `G009-G011`
- Parallelization notes: Worker/client code only.

## G009: Implement Go Mirror Clone and Fetch Support

- Status: planned
- Owner: `GPT-5.5`
- Area: `git`
- Goal: Implement bare mirror layout, clone, fetch, and mirror metadata operations in the Go git-worker.
- Background: GitYard needs local repository mirrors for commits, trees, file extraction, diffs, and future native hosting.
- Must change: `services/git-worker/`, `packages/git/` contract bindings if needed.
- Requirements:
  - [ ] Use a bare mirror layout under a configurable root.
  - [ ] Support clone and fetch jobs idempotently.
  - [ ] Do not hardcode GitHub-only URLs.
- Acceptance criteria:
  - [ ] A public Git repository can be cloned and fetched locally.
  - [ ] Mirror paths are deterministic and do not escape the configured root.
- Verification:
  - Command: `go test ./...`
  - Manual: run a local clone/fetch smoke test.
- Dependencies:
  - Blocked by: `F007`, `C005`
  - Blocks: `G010`, `G011`, `G012`
  - Can run in parallel with: `G001-G008`
- Parallelization notes: Owns `services/git-worker`.

## G010: Implement Commit, Tree, and File Extraction

- Status: planned
- Owner: `GPT-5.5`
- Area: `git`
- Goal: Read commits, trees, file metadata, and selected file contents from mirrored repositories.
- Background: PR analysis, code search, project memory, and issue context need reliable Git reads.
- Must change: `services/git-worker/`, `packages/git/`.
- Requirements:
  - [ ] Read commits by SHA and branch refs.
  - [ ] Traverse trees safely.
  - [ ] Extract text files with size limits.
- Acceptance criteria:
  - [ ] Tests cover commit lookup, tree listing, and file extraction.
  - [ ] Binary and oversized files return clear skipped states.
- Verification:
  - Command: `go test ./...`
  - Manual: extract a README from a local mirror.
- Dependencies:
  - Blocked by: `G009`
  - Blocks: `G011`, `A010`, `S004`
  - Can run in parallel with: GitHub API tasks
- Parallelization notes: Owns git-worker read operations.

## G011: Implement Diff Computation Service

- Status: planned
- Owner: `GPT-5.5`
- Area: `git`
- Goal: Compute diffs and changed file metadata for PRs and review workflows.
- Background: PR pages require changed files, file grouping, risk analysis, and diff display.
- Must change: `services/git-worker/`, `packages/git/`, `packages/protocol/` only if contract extension is needed.
- Requirements:
  - [ ] Compute base/head diffs.
  - [ ] Return changed file status, additions, deletions, and patch metadata.
  - [ ] Avoid storing large diffs in Postgres.
- Acceptance criteria:
  - [ ] Tests cover added, modified, deleted, and renamed files.
  - [ ] Large diff output is stored/referenced according to object storage rules.
- Verification:
  - Command: `go test ./...`
  - Manual: compare diff output against `git diff --stat`.
- Dependencies:
  - Blocked by: `G010`, `C006`
  - Blocks: `G012`, `P001`, `P004`
  - Can run in parallel with: `G002-G008`
- Parallelization notes: Owns git-worker diff code.

## G012: Implement PR, Issue, Check, and Release Sync Jobs

- Status: planned
- Owner: `GPT-5.5`
- Area: `github`
- Goal: Implement durable sync jobs for repository metadata, PRs, issues, comments, reviews, check runs, releases, commits, and mirror triggers.
- Background: GitHub remains the initial source of truth, but GitYard stores mirrored product state.
- Must change: `services/worker/`, `packages/github/`, `packages/db/`, `packages/events/`, `packages/git/`.
- Requirements:
  - [ ] Sync PRs, issues, comments, reviews, check runs, releases, and repo metadata.
  - [ ] Trigger git clone/fetch and indexing events.
  - [ ] Update sync checkpoints and emit sync events.
- Acceptance criteria:
  - [ ] A selected repo produces stored PR, issue, check, and release records.
  - [ ] Sync failures are visible and retryable.
- Verification:
  - Command: `pnpm check`
  - Manual: sync a public test repo in read-only mode.
- Dependencies:
  - Blocked by: `G008`, `G011`, `C006`, `C007`, `C009`, `I005`, `I006`
  - Blocks: `P001`, `P008`, `S006`, `S008`, `V001`
  - Can run in parallel with: UI tasks using mocks
- Parallelization notes: Integration-heavy; start only after GitHub and git-worker contracts are stable.
