# Phase: Search, Checks, Releases, and Notifications

These tasks build supporting product systems after core contracts and sync foundations. Search and notifications are app-wide; checks and releases attach to repositories and pull requests.

## Shared Rules

- Must read for every task: `AGENTS.md`, `README.md`, `docs/GITYARD_SPEC.md`, `docs/GITYARD_STACK.md`, `.plans/INDEX.md`, `.plans/DEPENDENCIES.md`.
- Completion report format: Use the standard completion report from `.plans/TEMPLATE.md`.

## S001: Define Search Contract

- Status: planned
- Owner: `GPT-5.5`
- Area: `api`
- Goal: Define product search and code search request/response contracts, index names, filters, highlighting, permissions, and no-results states.
- Background: The stack requires Meilisearch first and custom code search later.
- Must change: `packages/protocol/`, `packages/db/`, search package if present.
- Must not change: UI or search implementation.
- Requirements:
  - [ ] Include repos, PRs, issues, comments, users, orgs, releases, and files.
  - [ ] Define basic code search separately from product search.
  - [ ] Include permission filtering expectations.
- Acceptance criteria:
  - [ ] Backend and UI tasks can implement search without changing the contract.
  - [ ] Code search is explicitly foundational, not a full symbol engine.
- Verification:
  - Command: `pnpm check`
  - Manual: compare contract to stack search section.
- Dependencies:
  - Blocked by: `C001`, `C003`
  - Blocks: `S002-S005`
  - Can run in parallel with: other non-search tasks
- Parallelization notes: Contract-only.

## S002: Implement Product Search Indexing and API

- Status: planned
- Owner: `GPT-5.5`
- Area: `backend`
- Goal: Index repos, PRs, issues, comments, users, orgs, and releases into Meilisearch and expose product search API.
- Background: Maintainers need fast search across project collaboration data.
- Must change: `services/worker/`, `services/api/`, search package, `packages/db/`.
- Must not change: frontend UI.
- Requirements:
  - [ ] Index on sync events.
  - [ ] Enforce permission filtering.
  - [ ] Support reindex requests.
- Acceptance criteria:
  - [ ] Search API returns repos/PRs/issues/comments/releases from local Meilisearch.
  - [ ] Deleted or inaccessible records do not appear.
- Verification:
  - Command: `pnpm check`
  - Manual: run a local search against seeded/synced data.
- Dependencies:
  - Blocked by: `S001`, `I008`
  - Blocks: `S003`
  - Can run in parallel with: `S004-S008`
- Parallelization notes: Backend search only.

## S003: Build Product Search UI

- Status: planned
- Owner: `Claude`
- Area: `frontend`
- Goal: Build product search UI with command/search entry, result groups, filters, highlights, loading, empty, and error states.
- Background: Search should span issues, PRs, commits/docs later, releases, and comments.
- Must change: `apps/web/src/features/search/`, app shell.
- Must not change: backend services or search indexer.
- Requirements:
  - [ ] Use `S001` fixtures.
  - [ ] Include grouped result types.
  - [ ] Include keyboard navigation.
- Acceptance criteria:
  - [ ] Search UI renders mocked grouped results and no-results state.
  - [ ] It works without AI provider configuration.
- Verification:
  - Command: `pnpm check`
  - Manual: keyboard and responsive check.
- Dependencies:
  - Blocked by: `S001`, `U002`
  - Blocks: search integration verification
  - Can run in parallel with: `S002`
- Parallelization notes: Frontend search only.

## S004: Implement Code Search Indexing Worker Foundation

- Status: planned
- Owner: `GPT-5.5`
- Area: `worker`
- Goal: Extract searchable file text from git mirrors and index basic file path/content records.
- Background: Code search foundation should start simple and not overbuild custom symbol search.
- Must change: `services/worker/`, `services/git-worker/` integration bindings, search package.
- Must not change: frontend UI.
- Requirements:
  - [ ] Use git-worker commit/tree/file extraction.
  - [ ] Skip binary/oversized files.
  - [ ] Index repository ID, commit SHA, path, language guess, and content excerpt.
- Acceptance criteria:
  - [ ] A repository can be indexed for basic path/content search.
  - [ ] Indexing emits started/completed/failed events.
- Verification:
  - Command: `pnpm check`
  - Command: `go test ./...`
  - Manual: search for a known file path after indexing.
- Dependencies:
  - Blocked by: `S001`, `G010`, `I008`
  - Blocks: `S005`
  - Can run in parallel with: `S002`, `S003`, `S006-S008`
- Parallelization notes: Worker/indexer only.

## S005: Build Code Search UI Foundation

- Status: planned
- Owner: `Claude`
- Area: `frontend`
- Goal: Build code search results UI for file paths, excerpts, repository scope, branch/commit context, skipped-file states, and open-in-repo links.
- Background: Code search is foundational and should be useful before full semantic/symbol search.
- Must change: `apps/web/src/features/search/`, route files.
- Must not change: code indexer or backend.
- Requirements:
  - [ ] Use `S001` fixtures.
  - [ ] Show file path, excerpt, repo, and commit/ref context.
  - [ ] Include empty and indexing-pending states.
- Acceptance criteria:
  - [ ] Code search UI renders basic file results from fixtures.
  - [ ] Oversized/skipped file states are represented.
- Verification:
  - Command: `pnpm check`
  - Manual: responsive check for long file paths.
- Dependencies:
  - Blocked by: `S001`, `U002`
  - Blocks: code search integration
  - Can run in parallel with: `S004`
- Parallelization notes: Frontend code search only.

## S006: Implement Checks Ingestion and Failed-Check Summary

- Status: planned
- Owner: `GPT-5.5`
- Area: `backend`
- Goal: Ingest GitHub checks/workflow runs, store check status, fetch/store large logs in object storage, and generate failed-check summaries.
- Background: GitYard must explain CI/check failures and relate them to PRs.
- Must change: `packages/github/`, `services/worker/`, `services/ai-worker/`, `packages/db/`.
- Must not change: frontend UI.
- Requirements:
  - [ ] Store check runs and workflow run metadata.
  - [ ] Store large logs in object storage.
  - [ ] Summarize failed checks with disabled-AI fallback.
- Acceptance criteria:
  - [ ] Failed check state appears on PR API data.
  - [ ] Disabled AI produces a clear unavailable summary state.
- Verification:
  - Command: `pnpm check`
  - Manual: sync a repo/PR with checks or use fixtures.
- Dependencies:
  - Blocked by: `C009`, `G012`, `C011`
  - Blocks: `S007`, `P005`
  - Can run in parallel with: search/release tasks
- Parallelization notes: Backend/checks only.

## S007: Build Check Status and Failed-Check UI

- Status: planned
- Owner: `Claude`
- Area: `frontend`
- Goal: Build check status UI for PRs and repo dashboard, including failed-check summary, related files, log link, flaky signal, and loading/error states.
- Background: Green/red check status alone is not enough; GitYard should explain what matters.
- Must change: `apps/web/src/features/checks/`, PR and repo dashboard UI.
- Must not change: checks backend.
- Requirements:
  - [ ] Use `C009` and `S006` fixtures.
  - [ ] Show failed, pending, skipped, successful, and unknown states.
  - [ ] Include no-AI summary unavailable state.
- Acceptance criteria:
  - [ ] Check UI makes failed checks prominent on PR decision surface.
  - [ ] UI renders without log access when logs are unavailable.
- Verification:
  - Command: `pnpm check`
  - Manual: visual check of all check states.
- Dependencies:
  - Blocked by: `S006`, `C009`
  - Blocks: PR/check verification
  - Can run in parallel with: non-check backend work
- Parallelization notes: Frontend checks only.

## S008: Implement Release Sync and Release Page

- Status: planned
- Owner: `Either`
- Area: `integration`
- Goal: Implement release sync backend/API and a basic release page showing tag, status, included PRs/issues/commits, artifacts, changelog, rollback notes, and readiness summary.
- Background: Releases are part of the full source-of-truth platform direction.
- Must change: `packages/github/`, `services/worker/`, `services/api/`, `apps/web/src/features/releases/`.
- Must not change: unrelated PR/issue/review UI.
- Requirements:
  - [ ] Store release records from GitHub sync.
  - [ ] Keep artifacts in object storage where large.
  - [ ] Render release list/detail UI from live API or fixtures.
- Acceptance criteria:
  - [ ] A synced release appears on the repository release page.
  - [ ] Empty release state is clear for repos with no releases.
- Verification:
  - Command: `pnpm check`
  - Manual: sync or seed a release and view it in UI.
- Dependencies:
  - Blocked by: `C009`, `G012`, `U002`
  - Blocks: release verification
  - Can run in parallel with: search and notification tasks after route files are coordinated.
- Parallelization notes: Integration task spans backend and frontend; run alone for release files.

## S009: Define Notification Contract and Backend

- Status: planned
- Owner: `GPT-5.5`
- Area: `backend`
- Goal: Define and implement in-app notification records, creation events, list/read APIs, and notification preferences foundation.
- Background: Notifications start in-app and later may add email, Slack, Discord, or webhooks.
- Must change: `packages/protocol/`, `packages/db/`, `packages/events/`, `services/api/`, `services/worker/`.
- Must not change: notification UI except generated types.
- Requirements:
  - [ ] Include review requested, PR analysis completed, issue summary updated, agent run completed, CI failed, sync failed, mention, and release published.
  - [ ] Track read/unread state.
  - [ ] Keep external delivery channels out of scope for this task.
- Acceptance criteria:
  - [ ] API can list notifications and mark them read.
  - [ ] Worker can create notifications from typed events.
- Verification:
  - Command: `pnpm check`
  - Manual: create a notification from a local event or seed and read it through the API.
- Dependencies:
  - Blocked by: `C013`, `C014`, `I005`
  - Blocks: `S010`
  - Can run in parallel with: search/check/release work after event contracts.
- Parallelization notes: Backend notification files only.

## S010: Integrate In-App Notifications UI

- Status: planned
- Owner: `Claude`
- Area: `frontend`
- Goal: Connect notification shell to notification contract/API while preserving mocked states.
- Background: The app shell should surface relevant collaboration events without external notification services.
- Must change: `apps/web/src/features/notifications/`, app shell notification entrypoints.
- Must not change: backend notification implementation.
- Requirements:
  - [ ] Render read/unread notifications from API or fixtures.
  - [ ] Support mark-as-read interactions.
  - [ ] Include empty, loading, and error states.
- Acceptance criteria:
  - [ ] Seeded notifications appear in the app shell.
  - [ ] Mark-as-read updates the visible unread count.
- Verification:
  - Command: `pnpm check`
  - Manual: use the notification center with seeded/mock data.
- Dependencies:
  - Blocked by: `S009`, `U009`
  - Blocks: notification verification
  - Can run in parallel with: backend tasks outside notification files.
- Parallelization notes: Frontend notification files only.
