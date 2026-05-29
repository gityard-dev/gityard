# Phase: Foundation

Foundation tasks create the repository structure required by `docs/GITYARD_STACK.md`. They must keep the project at static version `0.0.1`.

## F001: Create Monorepo Workspace Foundation

- Status: planned
- Owner: `GPT-5.5`
- Area: `infra`
- Goal: Add the pnpm/Turbo monorepo root and workspace folders without product behavior.
- Background: The stack requires one monorepo with `apps`, `services`, `packages`, `infra`, `examples`, and scripts.
- Must read: `AGENTS.md`, `README.md`, `docs/GITYARD_SPEC.md`, `docs/GITYARD_STACK.md`, `.plans/INDEX.md`, `.plans/DEPENDENCIES.md`.
- Must change: `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `apps/`, `services/`, `packages/`, `infra/`, `examples/`, `scripts/`.
- Must not change: `docs/`, `.plans/`, `LICENSE`, product implementation beyond empty scaffolds.
- Requirements:
  - [ ] Use one monorepo, not separate repos.
  - [ ] Include app, service, package, infra, examples, and scripts directories.
  - [ ] Preserve static version `0.0.1`.
- Acceptance criteria:
  - [ ] `pnpm-workspace.yaml` includes `apps/*`, `services/*`, and `packages/*`.
  - [ ] Root `package.json` is private and versioned `0.0.1`.
  - [ ] No release, beta, MVP, v0.1, or v1 scripts are created.
- Verification:
  - Command: `pnpm install`
  - Command: `pnpm --version`
  - Manual: inspect root files for static `0.0.1`.
- Dependencies:
  - Blocked by: `H004`
  - Blocks: `F002-F010`, `C001-C014`, `I001`
  - Can run in parallel with: none
- Parallelization notes: Run first; it creates shared directories other tasks need.
- Completion report format: Use the standard completion report from `.plans/TEMPLATE.md`.

## F002: Lock Static Version 0.0.1 Across Packages

- Status: planned
- Owner: `GPT-5.5`
- Area: `infra`
- Goal: Ensure every package scaffold uses version `0.0.1` and no versioned release plan exists.
- Background: The maintainer explicitly requires static `0.0.1` until stability is decided.
- Must read: `AGENTS.md`, `README.md`, `docs/GITYARD_STACK.md`, `.plans/INDEX.md`.
- Must change: `package.json`, `apps/*/package.json`, `services/*/package.json`, `packages/*/package.json`.
- Must not change: source code behavior, docs outside package metadata.
- Requirements:
  - [ ] Set all package versions to `0.0.1`.
  - [ ] Add no release scripts or release planning language.
- Acceptance criteria:
  - [ ] A repository search finds package versions only at `0.0.1`.
  - [ ] There are no `v0.1`, `v1`, `beta`, `launch`, or `MVP` package scripts.
- Verification:
  - Command: `rg '"version": "0.0.1"' package.json apps services packages`
  - Command: `rg -i "mvp|beta|launch|v0\\.1|v1" package.json apps services packages`
  - Manual: confirm any matches are not version plans.
- Dependencies:
  - Blocked by: `F001`
  - Blocks: none
  - Can run in parallel with: `F003-F010`
- Parallelization notes: Only edit package metadata; avoid source files.
- Completion report format: Use the standard completion report from `.plans/TEMPLATE.md`.

## F003: Add Shared TypeScript Configuration

- Status: planned
- Owner: `GPT-5.5`
- Area: `backend`
- Goal: Add root and package TypeScript configs for TypeScript apps, services, and packages.
- Background: The stack requires TypeScript for the web app, API, product services, shared contracts, AI, agents, and packages.
- Must read: `AGENTS.md`, `docs/GITYARD_STACK.md`, `.plans/INDEX.md`.
- Must change: `tsconfig.json`, `packages/config/`, package-level `tsconfig.json` files.
- Must not change: frontend components, API behavior, database schema.
- Requirements:
  - [ ] Add strict TypeScript defaults.
  - [ ] Support workspace package imports.
  - [ ] Keep generated outputs out of source directories.
- Acceptance criteria:
  - [ ] `pnpm check` can typecheck scaffold packages once scripts exist.
  - [ ] TypeScript config does not assume Next.js.
- Verification:
  - Command: `pnpm check`
  - Manual: inspect config for React/Vite compatibility and service compatibility.
- Dependencies:
  - Blocked by: `F001`
  - Blocks: `C001`, `C002`, `C011`
  - Can run in parallel with: `F002`, `F004-F010`
- Parallelization notes: Owns TypeScript config only.
- Completion report format: Use the standard completion report from `.plans/TEMPLATE.md`.

## F004: Add Turbo and Biome Tasks

- Status: planned
- Owner: `GPT-5.5`
- Area: `infra`
- Goal: Add build, check, lint, and format scripts using Turbo and Biome.
- Background: The stack requires pnpm, Turbo, Biome, TypeScript, and repeatable checks.
- Must read: `AGENTS.md`, `docs/GITYARD_STACK.md`.
- Must change: `package.json`, `turbo.json`, `biome.json`, package scripts.
- Must not change: product behavior, docs outside `.plans/`.
- Requirements:
  - [ ] Root scripts include `dev`, `build`, `check`, `lint`, `format`.
  - [ ] Biome handles formatting and linting.
  - [ ] Turbo pipelines are scoped and cacheable.
- Acceptance criteria:
  - [ ] `pnpm lint` runs Biome.
  - [ ] `pnpm build` and `pnpm check` route through Turbo.
- Verification:
  - Command: `pnpm lint`
  - Command: `pnpm check`
  - Command: `pnpm build`
- Dependencies:
  - Blocked by: `F001`
  - Blocks: all verification tasks
  - Can run in parallel with: `F002`, `F003`, `F005-F010`
- Parallelization notes: Root tooling only; coordinate if another task edits root scripts.
- Completion report format: Use the standard completion report from `.plans/TEMPLATE.md`.

## F005: Scaffold Deployable Service Directories

- Status: planned
- Owner: `GPT-5.5`
- Area: `backend`
- Goal: Create service scaffolds for `api`, `worker`, `git-worker`, and `ai-worker`.
- Background: The stack defines initial deployable services: web, api, worker, git-worker, ai-worker.
- Must read: `AGENTS.md`, `docs/GITYARD_STACK.md`, `H001`.
- Must change: `services/api/`, `services/worker/`, `services/git-worker/`, `services/ai-worker/`.
- Must not change: `apps/web/`, feature packages except import placeholders.
- Requirements:
  - [ ] API service scaffold targets the framework selected in `H001`.
  - [ ] Worker and AI worker have minimal entrypoints.
  - [ ] Go git-worker remains Go-owned.
- Acceptance criteria:
  - [ ] Each service has package/module metadata and a health-friendly entrypoint placeholder.
  - [ ] No heavy work is implemented in API request handlers.
- Verification:
  - Command: `pnpm check`
  - Command: `go test ./...` from `services/git-worker` after `F007`
  - Manual: inspect service boundaries.
- Dependencies:
  - Blocked by: `F001`, `H001`
  - Blocks: `I001`, `I003`, `G005`, `A001`
  - Can run in parallel with: `F003`, `F004`, `F006`, `F007`
- Parallelization notes: Own service scaffolds; do not edit shared packages except required references.
- Completion report format: Use the standard completion report from `.plans/TEMPLATE.md`.

## F006: Scaffold Shared Package Directories

- Status: planned
- Owner: `GPT-5.5`
- Area: `backend`
- Goal: Create shared package scaffolds for config, db, events, github, git, ai, agents, protocol, auth, shared, observability, and ui.
- Background: The stack requires modular packages and stable boundaries before feature work.
- Must read: `AGENTS.md`, `docs/GITYARD_STACK.md`, `.plans/DEPENDENCIES.md`.
- Must change: `packages/*/package.json`, `packages/*/src/`, `packages/ui/`.
- Must not change: deployable service implementation, `apps/web` feature UI.
- Requirements:
  - [ ] Use scoped package names from `H004`.
  - [ ] Keep package exports minimal.
  - [ ] Include no hardcoded AI provider.
- Acceptance criteria:
  - [ ] All required package directories exist.
  - [ ] Workspace can resolve package imports.
- Verification:
  - Command: `pnpm check`
  - Manual: inspect package list against stack document.
- Dependencies:
  - Blocked by: `F001`, `H004`
  - Blocks: `C001-C014`, `A001`, `G001`
  - Can run in parallel with: `F003-F005`, `F007`
- Parallelization notes: Creates package shells only; feature tasks fill them later.
- Completion report format: Use the standard completion report from `.plans/TEMPLATE.md`.

## F007: Scaffold Go Git-Worker Module

- Status: planned
- Owner: `GPT-5.5`
- Area: `git`
- Goal: Add the Go module and directory structure for `services/git-worker`.
- Background: The stack assigns clone, fetch, diff, file extraction, and future native Git hosting foundations to Go.
- Must read: `AGENTS.md`, `docs/GITYARD_STACK.md`.
- Must change: `services/git-worker/go.mod`, `services/git-worker/cmd/`, `services/git-worker/internal/`.
- Must not change: TypeScript services, frontend, database migrations.
- Requirements:
  - [ ] Create `cmd/gityard-git-worker/main.go`.
  - [ ] Create internal packages for git, mirror, diff, and events.
  - [ ] Use no paid services.
- Acceptance criteria:
  - [ ] `go test ./...` passes in `services/git-worker`.
  - [ ] The service does not assume GitHub as the only future provider.
- Verification:
  - Command: `go test ./...`
  - Manual: inspect package names and import paths.
- Dependencies:
  - Blocked by: `F001`
  - Blocks: `G009-G011`
  - Can run in parallel with: `F003-F006`
- Parallelization notes: Owns only `services/git-worker`.
- Completion report format: Use the standard completion report from `.plans/TEMPLATE.md`.

## F008: Add Configuration Package Skeleton

- Status: planned
- Owner: `GPT-5.5`
- Area: `infra`
- Goal: Add typed configuration loading and validation skeleton using `GITYARD_` prefixes for app-specific env vars.
- Background: The stack requires `packages/config` to prevent missing config errors and preserve self-hosting.
- Must read: `AGENTS.md`, `docs/GITYARD_STACK.md`, `H004`.
- Must change: `packages/config/`, service imports where needed.
- Must not change: `.env.example` except if paired with `I002`, product feature behavior.
- Requirements:
  - [ ] Validate required local-service URLs.
  - [ ] Support AI provider `disabled`, `ollama`, and OpenAI-compatible configuration names.
  - [ ] Do not require paid AI keys.
- Acceptance criteria:
  - [ ] `GITYARD_AI_PROVIDER=disabled` validates without API keys.
  - [ ] Config package rejects unknown required production-critical settings with clear messages.
- Verification:
  - Command: `pnpm --filter <config-package> check`
  - Manual: inspect env names for `GITYARD_` prefix.
- Dependencies:
  - Blocked by: `F001`, `H004`
  - Blocks: `I002`, `C011`, `A001`
  - Can run in parallel with: `F002-F007`, `F009`
- Parallelization notes: Owns `packages/config`; coordinate with `.env.example` task.
- Completion report format: Use the standard completion report from `.plans/TEMPLATE.md`.

## F009: Add Local Development Bootstrap Scripts

- Status: planned
- Owner: `Either`
- Area: `infra`
- Goal: Add scripts that prepare local development without requiring cloud services.
- Background: The project must be self-hostable and runnable locally.
- Must read: `AGENTS.md`, `README.md`, `docs/GITYARD_STACK.md`.
- Must change: `scripts/`, root `package.json`.
- Must not change: feature implementation, docs outside `.plans/`.
- Requirements:
  - [ ] Add setup/check-env/dev script placeholders.
  - [ ] Use local Docker Compose dependencies.
  - [ ] Do not require paid AI or cloud credentials.
- Acceptance criteria:
  - [ ] A fresh checkout has discoverable local setup commands.
  - [ ] Scripts fail clearly when Docker or required env values are missing.
- Verification:
  - Command: `pnpm check`
  - Command: `pnpm docker:up`
  - Manual: confirm no paid-service requirement appears.
- Dependencies:
  - Blocked by: `F001`
  - Blocks: `V005`, `V007`
  - Can run in parallel with: `F002-F008`
- Parallelization notes: Owns `scripts/` and root script entries.
- Completion report format: Use the standard completion report from `.plans/TEMPLATE.md`.

## F010: Add Contributor Workflow Placeholders

- Status: planned
- Owner: `Either`
- Area: `docs`
- Goal: Add placeholders or tasks for contributor workflow docs without creating docs outside `.plans/` in this planning task.
- Background: The required reading says future docs should be tasks if needed, not created now.
- Must read: `AGENTS.md`, `README.md`, `.plans/README.md`, `docs/GITYARD_SPEC.md`, `docs/GITYARD_STACK.md`.
- Must change: future implementation may change `docs/` and `README.md`; this planning task only records allowed future areas.
- Must not change: product code during docs-only work.
- Requirements:
  - [ ] Plan future setup, contributing, self-hosting, GitHub App, AI provider, agent, and events docs.
  - [ ] Keep docs aligned with canonical docs.
- Acceptance criteria:
  - [ ] `V007` has a concrete list of future docs tasks to create when implementation exists.
  - [ ] No docs outside `.plans/` are created by this planning run.
- Verification:
  - Command: `git diff -- .plans`
  - Manual: confirm future docs are tasks, not new docs files.
- Dependencies:
  - Blocked by: `F001`
  - Blocks: `V007`
  - Can run in parallel with: `F002-F009`
- Parallelization notes: Docs planning only; does not conflict with implementation.
- Completion report format: Use the standard completion report from `.plans/TEMPLATE.md`.
