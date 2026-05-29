# Phase: Integration, Verification, and Future Docs Tasks

These tasks verify complete flows and create future documentation tasks only when implementation reveals docs that need to exist. They must not create docs outside `.plans/` during this planning task.

## Shared Rules

- Must read for every task: `AGENTS.md`, `README.md`, `docs/GITYARD_SPEC.md`, `docs/GITYARD_STACK.md`, `.plans/INDEX.md`, `.plans/DEPENDENCIES.md`.
- Completion report format: Use the standard completion report from `.plans/TEMPLATE.md`.

## V001: Verify Repository Connection and Sync Flow

- Status: planned
- Owner: `Either`
- Area: `testing`
- Goal: Verify a repository can be connected, selected, synced, mirrored, indexed enough for dashboard display, and shown in the repo overview.
- Background: Repo connection is the first end-to-end value path.
- Must change: tests, fixtures, small integration fixes in `services/*`, `packages/*`, or `apps/web` only as needed.
- Must not change: canonical docs, unrelated feature implementations.
- Requirements:
  - [ ] Test public read-only repo path.
  - [ ] Test PAT or App path when credentials are available.
  - [ ] Verify sync status, failures, and checkpoints.
- Acceptance criteria:
  - [ ] A repo dashboard shows synced metadata, PR/issue counts, checks/releases where available, and sync status.
  - [ ] Sync failure is visible and retryable.
- Verification:
  - Command: `pnpm check`
  - Command: `docker compose up`
  - Manual: connect and sync a public test repo.
- Dependencies:
  - Blocked by: `G012`, `U006`, `U007`
  - Blocks: readiness sign-off
  - Can run in parallel with: `V003-V007` when their dependencies are complete
- Parallelization notes: Integration verification may touch multiple areas; run after feature files are stable.

## V002: Verify PR Review Decision Flow

- Status: planned
- Owner: `Either`
- Area: `testing`
- Goal: Verify PR list, PR detail, changed files, comments, reviews, checks, summary, risk, file grouping, checklist, review queues, and since-last-viewed flow.
- Background: The PR page is GitYard's primary decision surface.
- Must change: tests, fixtures, small integration fixes only.
- Must not change: unrelated issue, agent, infra, or docs files.
- Requirements:
  - [ ] Verify synced PR data renders.
  - [ ] Verify no-AI mode renders disabled analysis state.
  - [ ] Verify local/mocked AI analysis stores and displays summary/risk/checklist.
- Acceptance criteria:
  - [ ] A user can open a PR and understand changed files, risk, checks, reviews, agent involvement, and readiness.
  - [ ] Failed checks and requested changes are visible.
- Verification:
  - Command: `pnpm check`
  - Manual: open a synced PR with checks/reviews/comments.
- Dependencies:
  - Blocked by: `P007`, `P011`, `P012`
  - Blocks: readiness sign-off
  - Can run in parallel with: `V001`, `V003-V007`
- Parallelization notes: Run alone for PR/review integration files.

## V003: Verify Issue Triage Flow

- Status: planned
- Owner: `Either`
- Area: `testing`
- Goal: Verify issue sync, issue list/detail, current summary, reproduction steps, current state, duplicate candidates, linked PRs, decisions, and next actions.
- Background: Issues should behave as structured project memory.
- Must change: tests, fixtures, small issue integration fixes only.
- Must not change: PR/review implementation except linked PR display fixes.
- Requirements:
  - [ ] Verify no-AI issue detail behavior.
  - [ ] Verify local/mocked AI issue analysis behavior.
  - [ ] Verify duplicate candidates and reproduction fields.
- Acceptance criteria:
  - [ ] A maintainer can triage an issue without reading every raw comment.
  - [ ] Issue page remains useful when AI is disabled.
- Verification:
  - Command: `pnpm check`
  - Manual: open synced/seeded issue detail.
- Dependencies:
  - Blocked by: `P008`, `P009`, `P010`
  - Blocks: readiness sign-off
  - Can run in parallel with: `V001`, `V002`, `V004-V007`
- Parallelization notes: Issue integration only.

## V004: Verify No-AI and Local-AI Behavior

- Status: planned
- Owner: `Either`
- Area: `testing`
- Goal: Verify disabled AI, Ollama provider, OpenAI-compatible BYO key configuration, provider settings UI, and analysis disabled states.
- Background: GitYard must not require paid AI and must support local AI and no-AI mode.
- Must change: tests, fixtures, small config/provider/settings integration fixes only.
- Must not change: unrelated product flows.
- Requirements:
  - [ ] Start with `GITYARD_AI_PROVIDER=disabled`.
  - [ ] Start with Ollama configured when available.
  - [ ] Verify provider settings can save disabled mode without an API key.
- Acceptance criteria:
  - [ ] App starts without AI provider errors in disabled mode.
  - [ ] PR/issue analysis requests return clear disabled-state responses.
  - [ ] UI shows AI disabled instead of crashing.
- Verification:
  - Command: `pnpm check`
  - Manual: run disabled mode and optional local Ollama smoke test.
- Dependencies:
  - Blocked by: `A002`, `A003`, `U008`
  - Blocks: readiness sign-off
  - Can run in parallel with: other verification tasks after dependencies.
- Parallelization notes: AI/config/settings integration only.

## V005: Verify Self-Hosted Docker Compose Bootstrap

- Status: planned
- Owner: `Either`
- Area: `testing`
- Goal: Verify a fresh checkout can use `.env.example` and Docker Compose to start local GitYard dependencies and services.
- Background: Self-hosting and local development are non-negotiable.
- Must change: tests, scripts, compose/config fixes only.
- Must not change: feature code unless needed for health/readiness failures.
- Requirements:
  - [ ] Use `cp .env.example .env`.
  - [ ] Run Docker Compose with no paid services.
  - [ ] Verify health/readiness endpoints.
- Acceptance criteria:
  - [ ] `docker compose up` starts required services.
  - [ ] Web and API are reachable locally.
  - [ ] Optional Ollama does not block default startup.
- Verification:
  - Command: `docker compose config`
  - Command: `docker compose up`
  - Manual: open `http://localhost:3000` and API health endpoint.
- Dependencies:
  - Blocked by: `I001-I010`
  - Blocks: self-hosting readiness
  - Can run in parallel with: feature verification tasks after infra is stable.
- Parallelization notes: Infra verification only.

## V006: Verify Security and Audit Requirements

- Status: planned
- Owner: `Either`
- Area: `testing`
- Goal: Verify webhook signatures, encrypted tokens, no token logging, least privilege, secret redaction, protected branch awareness, agent permission gates, and audit logs.
- Background: Security is required because GitYard touches source code, tokens, webhooks, and agent actions.
- Must change: tests, fixtures, small security/audit fixes only.
- Must not change: product scope or permission model without Human decision.
- Requirements:
  - [ ] Test invalid/valid webhook signatures.
  - [ ] Test token redaction in logs.
  - [ ] Test agent cannot perform risky actions without approval.
- Acceptance criteria:
  - [ ] Invalid webhooks are rejected and not processed.
  - [ ] Token-like values do not appear in logs.
  - [ ] Agent approval gates produce audit records.
- Verification:
  - Command: `pnpm check`
  - Manual: inspect logs and audit records for test actions.
- Dependencies:
  - Blocked by: `I010`, `C014`, `A008`, `G005`
  - Blocks: security readiness
  - Can run in parallel with: `V001-V005`, `V007`
- Parallelization notes: Security verification may touch multiple backend packages; run when security files are stable.

## V007: Create Future Docs Implementation Tasks

- Status: planned
- Owner: `Either`
- Area: `docs`
- Goal: Create future task records for setup docs, self-hosting docs, GitHub App docs, AI provider docs, agent docs, events docs, architecture docs, and contributor docs after implementation exists.
- Background: The current request forbids creating docs outside `.plans/`, but future docs will be needed.
- Must change: `.plans/` only for this planning task; future docs tasks may allow `docs/` and `README.md`.
- Must not change: docs outside `.plans/` in this task.
- Requirements:
  - [ ] List future docs tasks with allowed files.
  - [ ] Tie each future docs task to implemented behavior.
  - [ ] Avoid inventing docs not supported by implementation.
- Acceptance criteria:
  - [ ] Maintainers can assign docs tasks after corresponding features land.
  - [ ] No docs outside `.plans/` are created by this task.
- Verification:
  - Command: `git diff -- .plans`
  - Manual: confirm all docs work is represented as tasks only.
- Dependencies:
  - Blocked by: `F010`
  - Blocks: docs readiness
  - Can run in parallel with: verification tasks
- Parallelization notes: Plans-only task.

## V008: Verify Complete Plan Coverage and Update Gaps

- Status: planned
- Owner: `Either`
- Area: `testing`
- Goal: Re-check the implementation plan against `docs/GITYARD_SPEC.md`, `docs/GITYARD_STACK.md`, required coverage, and completed work; add follow-up tasks inside `.plans/` for gaps.
- Background: Anti-drift requires future tasks to stay anchored to canonical docs.
- Must change: `.plans/` only, unless future implementation task explicitly allows product files.
- Must not change: product code or docs outside `.plans/`.
- Requirements:
  - [ ] Reconcile task registry and dependency map.
  - [ ] Confirm no versioned release plan exists.
  - [ ] Confirm no required area is unplanned.
- Acceptance criteria:
  - [ ] Coverage checklist remains accurate.
  - [ ] Any intentional deferrals have an explanation and a task.
  - [ ] All task IDs in dependency lists exist.
- Verification:
  - Command: `rg "MVP|beta|launch|v0\\.1|v1" .plans`
  - Command: `rg "GITYARD_" .plans`
  - Manual: compare `.plans/INDEX.md` coverage checklist to canonical docs.
- Dependencies:
  - Blocked by: all contract tasks
  - Blocks: plan readiness sign-off
  - Can run in parallel with: none when updating the index
- Parallelization notes: Run after plan changes; owns plan consistency.
