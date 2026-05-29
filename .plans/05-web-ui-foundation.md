# Phase: Web UI Foundation

Claude-owned frontend tasks must use contracts and mocked data until integration tasks connect live APIs. They must not edit backend services, database packages, GitHub packages, or AI provider implementations.

Frontend stack decision: GitYard uses a Vite-based React app with TanStack Router and TanStack Query. Do not use Next.js for the main app. Do not use TanStack Start unless a future Human decision explicitly changes the app/runtime boundary, because the canonical stack keeps the HTTP API in `services/api`.

## Shared Rules

- Must read for every task: `AGENTS.md`, `README.md`, `docs/GITYARD_SPEC.md`, `docs/GITYARD_STACK.md`, `.plans/INDEX.md`, `.plans/DEPENDENCIES.md`, relevant contracts.
- Must not change for every task: `services/*`, `packages/db`, `packages/github`, `packages/events`, `packages/ai` except generated type imports if already exposed.
- Verification for every task: `pnpm check`, `pnpm lint`, and a manual responsive check.
- Completion report format: Use the standard completion report from `.plans/TEMPLATE.md`.

## U001: Build Web App Shell

- Status: planned
- Owner: `Claude`
- Area: `frontend`
- Goal: Create the React/Vite app shell with persistent layout, app navigation, command palette placeholder, and data provider setup.
- Background: GitYard should feel like a developer-native app, not a landing page.
- Must change: `apps/web/`, `packages/ui/`.
- Requirements:
  - [ ] Use React, Vite, TanStack Router, TanStack Query, Tailwind, shadcn/ui-compatible primitives.
  - [ ] Do not introduce Next.js.
  - [ ] Do not introduce TanStack Start without a separate Human decision.
  - [ ] Include persistent shell for repo, PR, issue, review, agent, search, settings areas.
  - [ ] Avoid marketing landing-page structure.
- Acceptance criteria:
  - [ ] `apps/web` starts locally and renders the app shell.
  - [ ] `apps/web/package.json` uses Vite, React, TanStack Router, and TanStack Query rather than Next.js.
  - [ ] Navigation areas exist without requiring live backend data.
- Dependencies:
  - Blocked by: `F001`
  - Blocks: `U002-U010`
  - Can run in parallel with: backend contracts after folder setup
- Parallelization notes: Owns `apps/web` shell and UI primitives only.

## U002: Build Route Structure and URL Mapping

- Status: planned
- Owner: `Claude`
- Area: `frontend`
- Goal: Add route structure for org/repo dashboard, PR list/detail, issue list/detail, reviews, agents, search, releases, and settings.
- Background: The spec calls for GitHub-compatible URL mapping where possible.
- Must change: `apps/web/src/routes/`, `apps/web/src/lib/`.
- Requirements:
  - [ ] Map repo URLs with owner/name.
  - [ ] Add PR and issue routes using familiar vocabulary.
  - [ ] Include not-found and unauthorized states.
- Acceptance criteria:
  - [ ] Direct navigation to PR and issue routes renders stable placeholder pages.
  - [ ] Route params can represent GitHub-style owner/repo/pull-number and issue-number paths.
- Dependencies:
  - Blocked by: `U001`, `C001`
  - Blocks: feature UI tasks
  - Can run in parallel with: `U003-U005`
- Parallelization notes: Owns router files only.

## U003: Build GitYard Branding Foundation

- Status: planned
- Owner: `Claude`
- Area: `design`
- Goal: Define brand presentation, typography scale, color tokens, dark mode baseline, and product language in the app shell.
- Background: The spec says GitYard should feel serious, technical, fast, open, and developer-native.
- Must change: `apps/web/src/styles/`, `packages/ui/`, app shell branding files.
- Requirements:
  - [ ] Use `GitYard` naming consistently.
  - [ ] Avoid AI-hype language and GitHub-killer framing.
  - [ ] Include dark mode foundations.
- Acceptance criteria:
  - [ ] First viewport clearly signals GitYard as the product.
  - [ ] Branding does not describe GitYard as only a GitHub wrapper.
- Dependencies:
  - Blocked by: `U001`
  - Blocks: `U004`, polish tasks
  - Can run in parallel with: `U002`, `U005`
- Parallelization notes: UI styling only.

## U004: Build Design System Primitives

- Status: planned
- Owner: `Claude`
- Area: `design`
- Goal: Build reusable primitives for buttons, inputs, tabs, menus, dialogs, badges, tables, lists, tooltips, empty states, alerts, and status chips.
- Background: GitYard needs dense, efficient, predictable developer workflows.
- Must change: `packages/ui/`, `apps/web/src/components/`.
- Requirements:
  - [ ] Use icons for icon-suitable controls.
  - [ ] Keep cards restrained and avoid nested cards.
  - [ ] Support loading, disabled, error, and empty states.
- Acceptance criteria:
  - [ ] Feature pages can compose UI without inventing local control styles.
  - [ ] Components are responsive and text does not overflow buttons/cards.
- Dependencies:
  - Blocked by: `U001`, `U003`
  - Blocks: most UI feature tasks
  - Can run in parallel with: route and mock data setup
- Parallelization notes: Owns UI package and shared components.

## U005: Build Loading, Empty, and Error States

- Status: planned
- Owner: `Claude`
- Area: `frontend`
- Goal: Create consistent states for loading data, empty repositories, sync pending, AI disabled, permission denied, API errors, and no results.
- Background: The required coverage explicitly includes loading, empty, and error states.
- Must change: `apps/web/src/components/states/`, `packages/ui/`.
- Requirements:
  - [ ] Include sync-pending and no-AI states.
  - [ ] Include retry affordances where appropriate.
  - [ ] Keep states concise and product-native.
- Acceptance criteria:
  - [ ] Repo, PR, issue, search, settings, and notification pages can reuse these states.
  - [ ] Disabled AI state does not look like an application failure.
- Dependencies:
  - Blocked by: `U004`
  - Blocks: feature UI tasks
  - Can run in parallel with: backend tasks
- Parallelization notes: Shared frontend states only.

## U006: Build Repository Dashboard UI

- Status: planned
- Owner: `Claude`
- Area: `frontend`
- Goal: Build repo overview showing recent PRs, issues, checks, releases, sync status, risk, agents, and project context summary from mocked contract data.
- Background: The first usable GitYard surface is repository understanding.
- Must change: `apps/web/src/features/repos/`, route files.
- Requirements:
  - [ ] Show sync status clearly.
  - [ ] Show PR/issue/check/release summaries without live backend dependency.
  - [ ] Include empty repo and sync-failed states.
- Acceptance criteria:
  - [ ] Dashboard renders from contract fixtures.
  - [ ] It does not require write access or AI to render.
- Dependencies:
  - Blocked by: `U002`, `U004`, `U005`, `C005`
  - Blocks: `V001`
  - Can run in parallel with: backend repo sync work
- Parallelization notes: Owns repo feature UI only.

## U007: Build GitHub Connection UI

- Status: planned
- Owner: `Claude`
- Area: `frontend`
- Goal: Build UI for public read-only, PAT, and GitHub App connection flows plus repo selection.
- Background: GitYard must support multiple GitHub integration modes.
- Must change: `apps/web/src/features/github/`, settings routes.
- Requirements:
  - [ ] Show capabilities and limitations per mode.
  - [ ] Do not ask for write permissions in read-only mode.
  - [ ] Include repo selection and sync status states.
- Acceptance criteria:
  - [ ] Users can distinguish public read-only, PAT, and App setup.
  - [ ] UI never implies GitHub is the only future provider.
- Dependencies:
  - Blocked by: `U002`, `G001`
  - Blocks: `V001`
  - Can run in parallel with: GitHub backend implementation
- Parallelization notes: Use mocked mode/capability data until integration.

## U008: Build Provider and No-AI Settings UI

- Status: planned
- Owner: `Claude`
- Area: `frontend`
- Goal: Build settings UI for disabled AI, Ollama, OpenAI-compatible provider, BYO key, model settings, and provider health.
- Background: Local AI and no-AI mode are core requirements; paid AI must not be required.
- Must change: `apps/web/src/features/settings/`, provider settings routes.
- Requirements:
  - [ ] Include `disabled` provider state.
  - [ ] Include Ollama local endpoint settings.
  - [ ] Include OpenAI-compatible base URL without hardcoding one paid provider.
- Acceptance criteria:
  - [ ] Disabled provider clearly explains which AI features are unavailable.
  - [ ] No API key is required to save disabled mode.
- Dependencies:
  - Blocked by: `U002`, `C011`
  - Blocks: `V004`
  - Can run in parallel with: `A001-A006`
- Parallelization notes: UI only; use contract mocks.

## U009: Build In-App Notification Shell

- Status: planned
- Owner: `Claude`
- Area: `frontend`
- Goal: Build notification center UI for review requested, PR analysis completed, issue summary updated, agent run completed, CI failed, sync failed, mention, and release published.
- Background: Notifications start in-app before email/Slack/Discord.
- Must change: `apps/web/src/features/notifications/`, app shell.
- Requirements:
  - [ ] Include unread/read state.
  - [ ] Include notification type icons/status.
  - [ ] Include empty and error states.
- Acceptance criteria:
  - [ ] Notification shell can render mocked notifications.
  - [ ] UI does not require external delivery channels.
- Dependencies:
  - Blocked by: `U002`, `U004`, `U005`
  - Blocks: notification integration work
  - Can run in parallel with: backend notification contracts
- Parallelization notes: UI shell only.

## U010: Verify Responsive and Keyboard-First UI Behavior

- Status: planned
- Owner: `Claude`
- Area: `testing`
- Goal: Verify core UI pages are responsive, keyboard navigable, and free from text overflow/overlap.
- Background: The stack calls for fast navigation, keyboard-first behavior, and good mobile read-only experience.
- Must change: `apps/web` tests or UI fixes only.
- Requirements:
  - [ ] Check desktop and mobile widths.
  - [ ] Check keyboard navigation through shell, tabs, menus, routes, and command palette placeholder.
  - [ ] Check no visible text overlap.
- Acceptance criteria:
  - [ ] Screenshots or manual notes cover repo dashboard, settings, PR placeholder, issue placeholder.
  - [ ] No horizontal overflow appears at supported mobile width.
- Dependencies:
  - Blocked by: `U001-U009`
  - Blocks: frontend readiness verification
  - Can run in parallel with: backend tasks after UI pages exist
- Parallelization notes: UI verification/fixes only.
