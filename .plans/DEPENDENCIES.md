# Dependency Overview

Status: planned

This file summarizes sequencing so agents can pick the next task without drifting from `docs/GITYARD_SPEC.md` and `docs/GITYARD_STACK.md`.

## Critical Path

1. Human decisions: `H001-H006`.
2. Workspace foundation: `F001`, then `F002-F010`.
3. Contracts: `C001-C014`.
4. Infrastructure and security: `I001-I010`.
5. GitHub and Git sync: `G001-G012`.
6. Web foundation: `U001-U010`.
7. Product flows: `P001-P012`, `A001-A010`, `S001-S008`.
8. Verification and docs task creation: `V001-V008`.

## Contract Gates

- API and frontend work must wait for `C001` and `C002`.
- Database work must wait for `C003`.
- Auth, permissions, and agent permissions must wait for `C004`.
- Repository, mirror, and sync work must wait for `C005`.
- Pull request work must wait for `C006`.
- Issue work must wait for `C007`.
- Review work must wait for `C008`.
- Checks and releases must wait for `C009`.
- Agent work must wait for `C010`.
- AI provider, AI generation, and no-AI behavior must wait for `C011`.
- Project memory and decision records must wait for `C012`.
- Events and NATS publishing must wait for `C013`.
- Audit, errors, logging, redaction, and security verification must wait for `C014`.

## Parallel Work Lanes

### Lane A: Foundation and Infra

- Start: `F001`.
- Parallel after `F001`: `F003`, `F004`, `F005`, `F006`, `F007`, `F009`.
- Then: `F008`, `I001`, `I002`.
- Then: `I003-I010`.
- File boundary: root config, `infra/`, `services/*`, `packages/config`, `.env.example`, `docker-compose.yml`.

### Lane B: Contracts

- Start after human choices and package skeleton: `C001-C014`.
- Parallelizable: `C005-C012` after `C003`, as long as each owns a separate schema/contract module.
- File boundary: `packages/protocol`, `packages/db`, `packages/events`, `packages/agents`, `packages/ai`, `packages/shared`.

### Lane C: GitHub and Git

- GitHub API lane: `G001-G008`.
- Git worker lane: `G009-G011`.
- Sync integration: `G012` waits for both lanes.
- File boundary: `packages/github`, `services/api`, `services/worker`, `services/git-worker`, `packages/git`.

### Lane D: Frontend

- Start after `U001`, `C001`, and relevant feature contracts.
- Parallelizable: `U003`, `U004`, `U005`, `U006`, `U007`, `U008`, `U009`.
- Product UI can use mocked data from contracts until integration tasks.
- File boundary: `apps/web`, `packages/ui`; Claude tasks must not edit backend services or DB packages.

### Lane E: Product Services

- PR: `P001`, `P006`, then `P007`.
- Issues: `P008`, `P010`, then `V003`.
- Reviews: `P011`, `P012`, then `V002`.
- AI/agents/context: `A001-A010`.
- Search/checks/releases/notifications: `S001-S010`.

### Lane F: Verification

- `V001`: after GitHub sync and repo dashboard UI.
- `V002`: after PR and review flows.
- `V003`: after issue flows.
- `V004`: after disabled and Ollama AI providers plus settings UI.
- `V005`: after self-hosting and readiness tasks.
- `V006`: after security, audit, webhook, and agent approval tasks.
- `V007`: after foundation; creates future docs tasks only.
- `V008`: after contract tasks and whenever coverage changes.

## File Conflict Rules

- `GPT-5.5` backend tasks must not edit `apps/web` except for generated client outputs explicitly owned by a contract task.
- `Claude` frontend tasks must not edit `services/*`, `packages/db`, `packages/events`, `packages/github`, or `packages/ai`.
- Integration tasks owned by `Either` may touch both sides only when the dependent backend and frontend tasks are complete.
- Human tasks are decision records only; they do not implement code.

## Blocker Handling

If an implementation task needs an architecture decision not covered by canonical docs or an existing contract, create or update a Human decision task or a GPT-5.5 contract task inside `.plans/` before implementation. Do not silently decide major architecture.
