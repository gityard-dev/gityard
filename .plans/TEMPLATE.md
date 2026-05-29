# Task: <task title>

## Status

planned

Allowed values: `planned`, `ready`, `blocked`, `in-progress`, `needs-review`, `done`.

## Owner

Choose one:

- `GPT-5.5`
- `Claude`
- `Either`
- `Human`

## Area

Choose one primary area:

- `frontend`
- `backend`
- `worker`
- `infra`
- `docs`
- `design`
- `integration`
- `testing`
- `ai`
- `agents`
- `github`
- `git`
- `db`
- `api`

## Goal

Describe the exact outcome of this task.

## Background

Explain why this task exists and how it fits into GitYard. Link to canonical docs instead of copying them.

## Must read

- `AGENTS.md`
- `README.md`
- `docs/GITYARD_SPEC.md`
- `docs/GITYARD_STACK.md`
- task-specific files or contracts

## Must change

- files or folders this task is allowed to change

## Must not change

- files or folders this task must not touch

## Requirements

- [ ] Requirement 1
- [ ] Requirement 2
- [ ] Requirement 3

## Acceptance criteria

Use observable checks.

- [ ] Acceptance criterion 1
- [ ] Acceptance criterion 2
- [ ] Acceptance criterion 3

## Verification

Commands:

```bash
pnpm check
```

Manual checks:

- [ ] Manual check 1
- [ ] Manual check 2

## Dependencies

Blocked by:

- None

Blocks:

- None

Can run in parallel with:

- task IDs or groups

## Parallelization notes

State whether this task can run concurrently and which file boundaries prevent overlap.

## Completion report format

When done, respond with:

```md
## Summary

<what changed>

## Files changed

- `path`

## Verification run

- `<command>` - passed/failed/not run

## Acceptance criteria

- [x] ...
- [ ] ...

## Known gaps

- None
```

## Compact Task Record

Plan files may use this compact format when they contain many tasks. Every compact task must still include all required fields:

```md
## GY-000: Task title

- Status: planned
- Owner: `Either`
- Area: `docs`
- Goal: Exact outcome.
- Background: Why this exists and which source documents define it.
- Must read: `AGENTS.md`, `README.md`, `docs/GITYARD_SPEC.md`, `docs/GITYARD_STACK.md`, task-specific files.
- Must change: `allowed/path`
- Must not change: unrelated paths.
- Requirements:
  - [ ] Requirement 1.
- Acceptance criteria:
  - [ ] Observable result 1.
- Verification:
  - Command: `pnpm check`
  - Manual: check something concrete.
- Dependencies:
  - Blocked by: None
  - Blocks: `GY-001`
  - Can run in parallel with: `GY-010`
- Parallelization notes: File boundaries and sequencing notes.
- Completion report format: Use the standard completion report from `.plans/TEMPLATE.md`.
```
