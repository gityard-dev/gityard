# Plans

This folder contains implementation plans for GitYard.

Plans are for agent-driven development. They break large milestones into scoped, verifiable tasks that can be assigned to different agents without overlap.

## Purpose

Use `.plans/` to define:

- milestones
- implementation phases
- task breakdowns
- dependencies
- ownership
- acceptance criteria
- verification steps

This folder is not product documentation. Product documentation belongs in `docs/`.

## Key project documents

Agents should use these documents as needed:

- `README.md` — project overview
- `docs/SPEC.md` — product direction
- `docs/STACK.md` — technical architecture
- `ROADMAP.md` — public roadmap
- `AGENTS.md` — global agent rules

## Planning rules

- Keep tasks small and reviewable.
- Do not combine unrelated areas in one task.
- Split backend and frontend work unless the task is explicitly an integration task.
- Every feature should have a contract before parallel implementation work.
- Every task must include acceptance criteria.
- Every task must include verification steps.
- Every milestone should end with an integration or verification task.
- Do not create tasks that require multiple agents to edit the same files at the same time.
- Do not introduce paid AI as a requirement.
- Preserve self-hosting and local development.

## Recommended task flow

For larger features, split work like this:

1. **Contract** — define data shape, API contract, events, or expected behavior.
2. **Backend** — implement services, workers, database, API, or integrations.
3. **Frontend** — implement UI using the contract or mocked data.
4. **Integration** — connect frontend, backend, workers, and state.
5. **Verification** — test the complete flow and document gaps.

Example:

```txt
[contract] Define pull request overview API
[backend] Implement pull request sync and API
[frontend] Build pull request overview page
[integration] Connect pull request page to live API
[verification] Verify pull request overview flow
````

## Agent ownership

Use these owner labels:

* `GPT-5.5` — backend, services, scaffolding, data models, workers, infra, contracts
* `Claude` — UI, layout, interaction design, components, frontend states
* `Either` — docs, integration, cleanup, simple tests
* `Human` — product decisions, naming, scope changes, final review

These are guidelines, not strict rules. The task itself is the source of truth.

## Area labels

Use one primary area per task:

* `frontend`
* `backend`
* `worker`
* `infra`
* `docs`
* `design`
* `integration`
* `testing`
* `ai`
* `agents`
* `github`
* `git`
* `db`
* `api`

## Task files

Task files should use `.plans/TEMPLATE.md`.

Recommended naming:

```txt
.plans/0001-foundation.md
.plans/0002-repository-sync.md
.plans/0003-pull-requests.md
.plans/0004-issues.md
.plans/0005-ai-providers.md
.plans/0006-agents.md
```

Each plan file can contain multiple tasks, but each task must be independently executable and verifiable.

## Task status

Use these statuses:

* `planned`
* `ready`
* `blocked`
* `in-progress`
* `needs-review`
* `done`

## Completion rules

A task is not done unless:

* the implementation matches the task;
* acceptance criteria are checked;
* verification steps were run;
* unrelated files were not changed;
* known gaps are documented;
* follow-up tasks are created when needed.

## When to stop

Stop and ask for clarification if:

* the task conflicts with `docs/SPEC.md`;
* the task conflicts with `docs/STACK.md`;
* required files or contracts are missing;
* implementation would require changing unrelated areas;
* a new dependency seems necessary but was not requested;
* the task is too broad to complete safely.
