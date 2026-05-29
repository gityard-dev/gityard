# Phase: Pull Requests, Issues, and Reviews

These tasks build GitYard's core collaboration surfaces. Backend, frontend, integration, and verification are split so agents do not edit the same files at the same time.

## Shared Rules

- Must read for every task: `AGENTS.md`, `README.md`, `docs/GITYARD_SPEC.md`, `docs/GITYARD_STACK.md`, `.plans/INDEX.md`, `.plans/DEPENDENCIES.md`, relevant contracts in `packages/protocol`.
- Completion report format: Use the standard completion report from `.plans/TEMPLATE.md`.

## P001: Implement PR API and Service Logic

- Status: planned
- Owner: `GPT-5.5`
- Area: `api`
- Goal: Implement PR list/detail API, changed file metadata API, comments/reviews/checks linkage, and stale analysis state.
- Background: PR pages must explain what changed, why, risk, review status, checks, and merge readiness.
- Must change: `services/api/`, `packages/db/`, `packages/protocol/`, `packages/shared/`.
- Must not change: `apps/web`, AI generation implementation except contract calls.
- Requirements:
  - [ ] Serve PR list and detail from synced state.
  - [ ] Include comments, reviews, checks, changed files, and linked issues where available.
  - [ ] Validate requests and permissions.
- Acceptance criteria:
  - [ ] API returns typed PR list/detail responses matching `C006`.
  - [ ] Missing PR returns a stable not-found error code.
- Verification:
  - Command: `pnpm check`
  - Manual: request PR list/detail against seeded or synced data.
- Dependencies:
  - Blocked by: `C006`, `G012`
  - Blocks: `P007`, `V002`
  - Can run in parallel with: `P002-P006`, `P008-P012`
- Parallelization notes: Backend/API files only.

## P002: Build PR List UI

- Status: planned
- Owner: `Claude`
- Area: `frontend`
- Goal: Build PR list with status, review state, risk, checks, author, updated time, and filters.
- Background: Maintainers need to scan and prioritize PRs quickly.
- Must change: `apps/web/src/features/pull-requests/`, route files.
- Must not change: backend services or DB packages.
- Requirements:
  - [ ] Use mocked data from `C006`.
  - [ ] Include empty, loading, sync pending, and error states.
  - [ ] Include risk/status visual treatment.
- Acceptance criteria:
  - [ ] PR list renders without live API.
  - [ ] Filter controls do not change layout dimensions unexpectedly.
- Verification:
  - Command: `pnpm check`
  - Manual: desktop/mobile visual check.
- Dependencies:
  - Blocked by: `U006`, `C006`
  - Blocks: `P007`
  - Can run in parallel with: `P001`, `P003-P006`
- Parallelization notes: Frontend PR list only.

## P003: Build PR Detail Page UI

- Status: planned
- Owner: `Claude`
- Area: `frontend`
- Goal: Build PR overview page showing title, author, branches, linked issues, status, review status, checks, summary, risk, file groups, agent involvement, timeline, unresolved questions, and merge readiness.
- Background: The PR page is a decision surface, not a raw diff dump.
- Must change: `apps/web/src/features/pull-requests/`.
- Must not change: backend or DB packages.
- Requirements:
  - [ ] Use contract fixtures.
  - [ ] Include disabled-AI and stale-analysis states.
  - [ ] Keep familiar pull request vocabulary.
- Acceptance criteria:
  - [ ] PR overview answers what changed, why, risk, tests, reviewers, agent involvement, and readiness.
  - [ ] Page renders from mocked data on desktop and mobile read-only widths.
- Verification:
  - Command: `pnpm check`
  - Manual: visual responsive check.
- Dependencies:
  - Blocked by: `U002`, `U004`, `U005`, `C006`
  - Blocks: `P004`, `P005`, `P007`
  - Can run in parallel with: `P001`, `P002`, `P006`
- Parallelization notes: Frontend PR detail only.

## P004: Build PR Changed Files and Diff UI

- Status: planned
- Owner: `Claude`
- Area: `frontend`
- Goal: Build changed files navigation, grouped file list, diff viewer foundation, and file extraction states.
- Background: PR review depends on understandable file changes and grouping by concern.
- Must change: `apps/web/src/features/pull-requests/`, `apps/web/src/components/diff/`.
- Must not change: git-worker, backend diff computation.
- Requirements:
  - [ ] Use file groups from `C006`.
  - [ ] Support generated, binary, oversized, renamed, added, deleted, and modified states.
  - [ ] Prepare for Monaco or diff viewer integration.
- Acceptance criteria:
  - [ ] UI shows grouped changed files and a selected diff from fixtures.
  - [ ] Oversized/binary file states are clear and non-crashing.
- Verification:
  - Command: `pnpm check`
  - Manual: inspect long paths and mobile behavior.
- Dependencies:
  - Blocked by: `P003`, `C006`
  - Blocks: `P007`
  - Can run in parallel with: `P001`, `P005`, `P006`
- Parallelization notes: Frontend diff UI only.

## P005: Build PR Comments, Reviews, and Checks UI

- Status: planned
- Owner: `Claude`
- Area: `frontend`
- Goal: Build PR timeline/comment/review/check panels with approval state, requested changes, unresolved threads, and check status.
- Background: Review status and CI/check state are central PR decision inputs.
- Must change: `apps/web/src/features/pull-requests/`, shared status components.
- Must not change: backend review/check models.
- Requirements:
  - [ ] Render comments, reviews, and check runs from contract fixtures.
  - [ ] Show requested changes and approvals distinctly.
  - [ ] Show failed-check summary placeholder.
- Acceptance criteria:
  - [ ] UI displays review and check status without needing writeback permissions.
  - [ ] Failed checks are visible in the PR decision surface.
- Verification:
  - Command: `pnpm check`
  - Manual: visual check for empty and failed check states.
- Dependencies:
  - Blocked by: `P003`, `C008`, `C009`
  - Blocks: `P007`
  - Can run in parallel with: `P001`, `P004`, `P006`
- Parallelization notes: Frontend panels only.

## P006: Implement PR Summary, Risk, Grouping, and Checklist Service

- Status: planned
- Owner: `GPT-5.5`
- Area: `ai`
- Goal: Implement service path for PR summary, risk assessment, file grouping, reviewer checklist, missing tests, linked issue context, and agent involvement summary.
- Background: The spec requires PR analysis while no-AI mode must degrade cleanly.
- Must change: `services/ai-worker/`, `packages/ai/`, `packages/db/`, `services/worker/`.
- Must not change: frontend UI.
- Requirements:
  - [ ] Use AI provider gateway and structured output validation.
  - [ ] Provide deterministic non-AI fallback states.
  - [ ] Cache analysis by input hash and prompt version.
- Acceptance criteria:
  - [ ] Disabled AI returns a clear disabled-state response.
  - [ ] Successful analysis stores summary, risk reasons, file groups, and checklist.
- Verification:
  - Command: `pnpm check`
  - Manual: run analysis with disabled provider and with local/mocked provider.
- Dependencies:
  - Blocked by: `C006`, `C011`, `A001`, `A005`, `A006`
  - Blocks: `P007`, `V002`
  - Can run in parallel with: UI PR tasks after contracts.
- Parallelization notes: AI/backend files only.

## P007: Integrate PR Page With Live API

- Status: planned
- Owner: `Either`
- Area: `integration`
- Goal: Connect PR list/detail UI to live API and keep mocked data available for dev/testing.
- Background: Integration should happen after contracts, backend API, and frontend UI are complete.
- Must change: `apps/web`, `packages/protocol`, small API client glue.
- Must not change: DB schemas, GitHub sync logic, AI provider internals.
- Requirements:
  - [ ] Wire TanStack Query to typed API client.
  - [ ] Preserve loading, empty, error, disabled-AI, and stale-analysis states.
  - [ ] Avoid backend/frontend file churn beyond integration glue.
- Acceptance criteria:
  - [ ] A synced PR can be opened in the UI.
  - [ ] API errors display stable UI error states.
- Verification:
  - Command: `pnpm check`
  - Manual: open a PR from local synced data.
- Dependencies:
  - Blocked by: `P001-P006`
  - Blocks: `V002`
  - Can run in parallel with: issue/review backend work only after PR UI files are free.
- Parallelization notes: Integration task may touch frontend and protocol glue; run alone for PR files.

## P008: Implement Issue API and Service Logic

- Status: planned
- Owner: `GPT-5.5`
- Area: `api`
- Goal: Implement issue list/detail API, comments, linked PRs, triage state, agent attempts, decisions, and current summary fields.
- Background: Issues are structured project memory and triage surfaces.
- Must change: `services/api/`, `packages/db/`, `packages/protocol/`.
- Must not change: frontend UI, AI summarization implementation.
- Requirements:
  - [ ] Serve issue list and detail from synced state.
  - [ ] Include reproduction/current-state fields even when empty.
  - [ ] Validate permissions and route params.
- Acceptance criteria:
  - [ ] API response matches `C007`.
  - [ ] Missing issue returns stable not-found error.
- Verification:
  - Command: `pnpm check`
  - Manual: request issue list/detail from seeded or synced data.
- Dependencies:
  - Blocked by: `C007`, `G012`
  - Blocks: `P009`, `P010`, `V003`
  - Can run in parallel with: PR and review tasks.
- Parallelization notes: Backend/API files only.

## P009: Build Issue List and Detail UI

- Status: planned
- Owner: `Claude`
- Area: `frontend`
- Goal: Build issue list and issue detail UI with title, author, labels, state, priority, affected area/versions, reproduction steps, linked PRs, related issues, agent attempts, decisions, open questions, and next actions.
- Background: Maintainers should triage issues faster than reading a long comment thread.
- Must change: `apps/web/src/features/issues/`, route files.
- Must not change: backend services or DB packages.
- Requirements:
  - [ ] Use `C007` fixtures.
  - [ ] Include empty, loading, no-AI, and error states.
  - [ ] Show duplicate candidates and current understanding.
- Acceptance criteria:
  - [ ] Issue detail renders current understanding, reproduction, and next actions.
  - [ ] UI handles issues without AI summaries.
- Verification:
  - Command: `pnpm check`
  - Manual: desktop/mobile visual check.
- Dependencies:
  - Blocked by: `U006`, `C007`
  - Blocks: `V003`
  - Can run in parallel with: `P008`, `P010`
- Parallelization notes: Frontend issue files only.

## P010: Implement Issue Summary, Reproduction, Current State, and Duplicates

- Status: planned
- Owner: `GPT-5.5`
- Area: `ai`
- Goal: Implement issue analysis for living summary, reproduction steps, current state, duplicate candidates, linked code areas, open questions, and next actions.
- Background: Issue analysis turns long threads into structured project memory.
- Must change: `services/ai-worker/`, `services/worker/`, `packages/ai/`, `packages/db/`.
- Must not change: frontend UI.
- Requirements:
  - [ ] Use structured output validation.
  - [ ] Preserve failed attempts and maintainer decisions.
  - [ ] Return no-AI disabled state when configured.
- Acceptance criteria:
  - [ ] Analysis stores summary, reproduction, current state, and duplicate candidates.
  - [ ] Disabled AI does not block issue detail rendering.
- Verification:
  - Command: `pnpm check`
  - Manual: run issue analysis with disabled and mocked/local provider.
- Dependencies:
  - Blocked by: `C007`, `C011`, `A001`, `A005`, `A006`
  - Blocks: `V003`
  - Can run in parallel with: issue UI.
- Parallelization notes: AI/backend files only.

## P011: Implement Review Queues and Approval State Backend

- Status: planned
- Owner: `GPT-5.5`
- Area: `backend`
- Goal: Implement reviewer queues, approval state, requested changes, stale approvals, code owner awareness, and since-last-viewed data.
- Background: GitYard should become a daily PR review interface.
- Must change: `services/api/`, `packages/db/`, `packages/protocol/`, `packages/auth/`.
- Must not change: frontend UI.
- Requirements:
  - [ ] Compute approval/requested-changes state from synced reviews.
  - [ ] Track review viewed state per user.
  - [ ] Include code owner awareness placeholders.
- Acceptance criteria:
  - [ ] API can return reviewer queue data.
  - [ ] New commits after approval can mark approval stale where contract requires it.
- Verification:
  - Command: `pnpm check`
  - Manual: inspect queue responses against seeded data.
- Dependencies:
  - Blocked by: `C008`, `C004`
  - Blocks: `P012`, `V002`
  - Can run in parallel with: PR UI and issue tasks.
- Parallelization notes: Backend review files only.

## P012: Build Review Queues, Since-Last-Viewed, and Code Owner UI

- Status: planned
- Owner: `Claude`
- Area: `frontend`
- Goal: Build review queue UI with filters, risk sorting, reviewer assignment display, code owner indicators, stale approvals, and since-last-viewed highlights.
- Background: Review workflows are a core daily interface feature.
- Must change: `apps/web/src/features/reviews/`, PR review components.
- Must not change: backend review implementation.
- Requirements:
  - [ ] Use `C008` fixtures.
  - [ ] Include loading/empty/error states.
  - [ ] Show code-owner awareness without requiring CODEOWNERS parser completion.
- Acceptance criteria:
  - [ ] Reviewer queue renders assigned, requested changes, approved, and stale states.
  - [ ] Since-last-viewed changes are visible on PR review UI.
- Verification:
  - Command: `pnpm check`
  - Manual: responsive and keyboard navigation check.
- Dependencies:
  - Blocked by: `P011`, `C008`
  - Blocks: `V002`
  - Can run in parallel with: non-review backend work.
- Parallelization notes: Frontend review files only.
