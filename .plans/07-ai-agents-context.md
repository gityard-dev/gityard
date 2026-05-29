# Phase: AI, Agents, and Project Context

GitYard must support local AI, no-AI mode, BYO keys, structured validation, transparent agent actions, approval gates, project memory, and decision records. No task may require paid AI.

## Shared Rules

- Must read for every task: `AGENTS.md`, `README.md`, `docs/GITYARD_SPEC.md`, `docs/GITYARD_STACK.md`, `.plans/INDEX.md`, `.plans/DEPENDENCIES.md`, `C010`, `C011`, `C012`, `C014`.
- Must not change for every task: `apps/web` except provider settings integration explicitly assigned elsewhere, GitHub sync internals unless listed.
- Verification for every task: `pnpm check` plus manual no-AI/local-AI check where relevant.
- Completion report format: Use the standard completion report from `.plans/TEMPLATE.md`.

## A001: Implement AI Provider Gateway

- Status: planned
- Owner: `GPT-5.5`
- Area: `ai`
- Goal: Implement pluggable AI provider interface, provider registry, request/response envelope, and provider health checks.
- Background: The stack requires an AI gateway with disabled, Ollama, OpenAI-compatible, Anthropic-compatible future path, BYO key, and no hardcoded paid provider.
- Must change: `packages/ai/`, `services/ai-worker/`, `packages/config/`.
- Requirements:
  - [ ] Provider interface supports chat and embedding capabilities where available.
  - [ ] Provider selection comes from config/settings.
  - [ ] Missing provider credentials return typed errors, not crashes.
- Acceptance criteria:
  - [ ] Gateway can register `disabled` provider before paid-compatible providers.
  - [ ] No OpenAI or Anthropic key is required for startup.
- Dependencies:
  - Blocked by: `C011`
  - Blocks: `A002-A006`, `P006`, `P010`
  - Can run in parallel with: `A007-A010` after contracts
- Parallelization notes: Owns provider gateway files.

## A002: Implement Disabled AI Provider

- Status: planned
- Owner: `GPT-5.5`
- Area: `ai`
- Goal: Implement no-AI behavior for analysis requests, summaries, risk explanations, and provider health.
- Background: No-AI mode is a first-class requirement.
- Must change: `packages/ai/`, `services/ai-worker/`.
- Requirements:
  - [ ] Return clear disabled-state responses.
  - [ ] Do not attempt network calls.
  - [ ] Preserve non-AI deterministic behaviors such as file grouping where possible.
- Acceptance criteria:
  - [ ] `GITYARD_AI_PROVIDER=disabled` starts without provider errors.
  - [ ] PR and issue analysis requests do not crash and return disabled state.
- Dependencies:
  - Blocked by: `A001`
  - Blocks: `V004`
  - Can run in parallel with: `A003-A006`
- Parallelization notes: Provider implementation only.

## A003: Implement Ollama Provider

- Status: planned
- Owner: `GPT-5.5`
- Area: `ai`
- Goal: Implement local Ollama provider support for chat and embeddings when configured.
- Background: Local AI is required for self-hosted GitYard.
- Must change: `packages/ai/`, `services/ai-worker/`, `packages/config/`.
- Requirements:
  - [ ] Use configurable Ollama base URL and model names.
  - [ ] Handle unavailable Ollama with clear health/error state.
  - [ ] Do not require Ollama unless selected.
- Acceptance criteria:
  - [ ] Provider health reports unavailable when Ollama is down.
  - [ ] Local configured Ollama can complete a simple structured request.
- Dependencies:
  - Blocked by: `A001`
  - Blocks: `V004`
  - Can run in parallel with: `A002`, `A004-A006`
- Parallelization notes: Provider implementation only.

## A004: Implement OpenAI-Compatible Provider and BYO Key Support

- Status: planned
- Owner: `GPT-5.5`
- Area: `ai`
- Goal: Implement provider support for configurable OpenAI-compatible base URLs and user/self-hosted BYO API keys.
- Background: The stack allows OpenAI-compatible APIs and BYO keys but no paid provider can be required or hardcoded.
- Must change: `packages/ai/`, `packages/config/`, `packages/auth/` for encrypted key storage hooks if needed.
- Requirements:
  - [ ] Base URL, model, and API key are configurable.
  - [ ] API keys are encrypted at rest and redacted in logs.
  - [ ] Provider is optional.
- Acceptance criteria:
  - [ ] A non-OpenAI compatible endpoint can be configured by URL.
  - [ ] Startup succeeds without any compatible provider key.
- Dependencies:
  - Blocked by: `A001`, `I010`
  - Blocks: provider settings integration
  - Can run in parallel with: `A002`, `A003`, `A005`, `A006`
- Parallelization notes: Provider implementation only; no UI.

## A005: Implement Prompt Versioning and Structured Output Validation

- Status: planned
- Owner: `GPT-5.5`
- Area: `ai`
- Goal: Add prompt registry, prompt version IDs, schema validation, and rejected-output handling.
- Background: AI outputs must be structured and reviewable, not raw unchecked text.
- Must change: `packages/ai/`, `services/ai-worker/`.
- Requirements:
  - [ ] Store prompt version with every generation.
  - [ ] Validate structured outputs before persistence.
  - [ ] Return validation errors as typed failures.
- Acceptance criteria:
  - [ ] Invalid provider output is not persisted as trusted analysis.
  - [ ] Stored AI generations include provider, model, prompt version, input hash, and validation status.
- Dependencies:
  - Blocked by: `C011`
  - Blocks: `P006`, `P010`, `A010`
  - Can run in parallel with: `A001-A004`, `A006`
- Parallelization notes: AI package and worker validation only.

## A006: Implement AI Caching by Input Hash

- Status: planned
- Owner: `GPT-5.5`
- Area: `ai`
- Goal: Cache AI generations by normalized input hash, prompt version, provider, model, and relevant config.
- Background: The stack requires caching by input hash for repeatability and cost/local compute control.
- Must change: `packages/ai/`, `packages/db/`, `services/ai-worker/`.
- Requirements:
  - [ ] Define deterministic cache key inputs.
  - [ ] Avoid reusing stale output after prompt/schema version changes.
  - [ ] Include disabled provider cache behavior where useful.
- Acceptance criteria:
  - [ ] Repeated identical analysis can reuse cached output.
  - [ ] Prompt version change creates a cache miss.
- Dependencies:
  - Blocked by: `C011`, `I004`
  - Blocks: `P006`, `P010`, `A010`
  - Can run in parallel with: `A001-A005`
- Parallelization notes: AI persistence only.

## A007: Implement Agent Identity, Permissions, and Lifecycle

- Status: planned
- Owner: `GPT-5.5`
- Area: `agents`
- Goal: Implement agent records, permissions, lifecycle states, run creation, status transitions, and actor attribution.
- Background: Agents are structured actors with identity, permissions, logs, and reviewable output.
- Must change: `packages/agents/`, `services/api/`, `services/worker/`, `packages/db/`.
- Requirements:
  - [ ] Enforce conservative default permissions.
  - [ ] Track lifecycle: created, queued, running, needs_approval, completed, failed, cancelled, superseded.
  - [ ] Attribute runs to user/system/agent actors.
- Acceptance criteria:
  - [ ] Agent run cannot access secrets or modify code by default.
  - [ ] Lifecycle transitions are auditable.
- Dependencies:
  - Blocked by: `C010`
  - Blocks: `A008`, agent UI/integration
  - Can run in parallel with: `A001-A006`, `A009`
- Parallelization notes: Agent backend only.

## A008: Implement Agent Tools, Approval Gates, and Audit Logging

- Status: planned
- Owner: `GPT-5.5`
- Area: `agents`
- Goal: Implement tool registry, permission checks, approval gates for risky actions, and audit records for agent actions.
- Background: Agents must not silently rewrite project state or modify protected branches without approval.
- Must change: `packages/agents/`, `services/worker/`, `services/api/`, `packages/db/`, `packages/observability/`.
- Requirements:
  - [ ] Tools declare required permissions.
  - [ ] Risky actions enter `needs_approval`.
  - [ ] Every tool call emits audit records.
- Acceptance criteria:
  - [ ] Agent cannot merge, access secrets, or modify sensitive files without explicit permission.
  - [ ] Approval/rejection is visible in audit logs.
- Dependencies:
  - Blocked by: `A007`, `C014`
  - Blocks: `V006`
  - Can run in parallel with: AI provider implementation after agent lifecycle exists.
- Parallelization notes: Agent runtime and audit only.

## A009: Implement Project Memory and Decision Records Backend

- Status: planned
- Owner: `GPT-5.5`
- Area: `backend`
- Goal: Implement project memory and decision record storage, review state, provenance, and links to PRs, issues, commits, releases, and agent runs.
- Background: Project memory is a long-term source of context and decisions.
- Must change: `packages/db/`, `services/api/`, `packages/protocol/`.
- Requirements:
  - [ ] Store memory types from `C012`.
  - [ ] Distinguish human-approved and generated context.
  - [ ] Support repository-scoped retrieval.
- Acceptance criteria:
  - [ ] API can create/list/update project memory and decision records.
  - [ ] Generated records are not treated as human-approved by default.
- Dependencies:
  - Blocked by: `C012`, `A001`
  - Blocks: `A010`
  - Can run in parallel with: `A002-A008`
- Parallelization notes: Backend context storage only.

## A010: Implement Context Extraction for Architecture, Conventions, Failed Attempts, and Release Context

- Status: planned
- Owner: `GPT-5.5`
- Area: `ai`
- Goal: Extract project memory from README/docs/code/issues/PRs/reviews/commits/releases/agent runs and store architecture notes, conventions, failed attempts, and release constraints.
- Background: GitYard must understand the project, not just individual PRs.
- Must change: `services/ai-worker/`, `services/worker/`, `packages/ai/`, `packages/db/`.
- Requirements:
  - [ ] Use git-worker file extraction and synced collaboration data.
  - [ ] Validate structured outputs.
  - [ ] Preserve source links and confidence.
- Acceptance criteria:
  - [ ] Extraction can create architecture notes and coding conventions from repo context.
  - [ ] Failed attempts and release context can be linked back to source artifacts.
- Dependencies:
  - Blocked by: `A009`, `A005`, `A006`, `G010`
  - Blocks: search/context verification
  - Can run in parallel with: frontend tasks after contracts.
- Parallelization notes: AI/context worker only.
