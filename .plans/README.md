# Plans

This folder contains implementation plans for GitYard.

Plans are for agent-driven development. They break large phases into scoped, verifiable tasks that can be assigned to different agents without overlap.

## Purpose

Use `.plans/` to define:

- implementation phases
- task breakdowns
- dependencies
- ownership
- acceptance criteria
- verification steps

This folder is not product documentation. Product documentation belongs in `docs/`.

## Key Project Documents

Agents should use these canonical documents:

- `README.md` - project overview
- `docs/GITYARD_SPEC.md` - product direction
- `docs/GITYARD_STACK.md` - technical architecture
- `AGENTS.md` - global agent rules

Do not assume `docs/SPEC.md`, `docs/STACK.md`, `ROADMAP.md`, or other docs exist.

## Planning Rules

- Keep tasks small and reviewable.
- Do not combine unrelated areas in one task.
- Split backend and frontend work unless the task is explicitly an integration task.
- Every major feature should have a contract before parallel implementation work.
- Every task must include acceptance criteria.
- Every task must include verification steps.
- Every phase should end with integration or verification tasks.
- Do not create tasks that require multiple agents to edit the same files at the same time.
- Do not introduce paid AI as a requirement.
- Preserve self-hosting and local development.
- Preserve no-AI mode and local AI support.
- Keep GitHub as an initial integration, not the permanent source of truth.
- Keep the project version at `0.0.1` until the maintainer decides it is stable.

## Recommended Task Flow

For larger features, split work like this:

1. **Contract** - define data shape, API contract, events, expected behavior, mocked frontend data, permissions, error model, or configuration shape.
2. **Backend** - implement services, workers, database, API, integrations, or infrastructure.
3. **Frontend** - implement UI using the contract or mocked data.
4. **Integration** - connect frontend, backend, workers, and state.
5. **Verification** - test the complete flow and document gaps.

## Agent Ownership

Use these owner labels:

- `GPT-5.5` - scaffolding, backend, services, APIs, database, workers, GitHub integration, Git integration, AI providers, agents, infra, contracts, and architecture.
- `Claude` - frontend, UI, layout, interaction design, React components, loading states, empty states, responsive behavior, and visual polish.
- `Either` - docs, integration, verification, cleanup, simple tests, and small cross-cutting work.
- `Human` - product decisions, scope decisions, naming, security judgment, and final approval.

The task itself is the source of truth.

## Area Labels

Use one primary area per task:

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

## Task Files

Task files should use `.plans/TEMPLATE.md`. Each task must be independently executable and verifiable.

The active plan structure is listed in `.plans/INDEX.md`.

## Task Status

Use these statuses:

- `planned`
- `ready`
- `blocked`
- `in-progress`
- `needs-review`
- `done`

## Completion Rules

A task is not done unless:

- the implementation matches the task;
- acceptance criteria are checked;
- verification steps were run;
- unrelated files were not changed;
- known gaps are documented;
- follow-up tasks are created when needed.

## When To Stop

Stop and ask for clarification if:

- the task conflicts with `docs/GITYARD_SPEC.md`;
- the task conflicts with `docs/GITYARD_STACK.md`;
- required files or contracts are missing;
- implementation would require changing unrelated areas;
- a new dependency seems necessary but was not requested;
- the task is too broad to complete safely.
