# GitYard Stack

**Technical architecture, service layout, infrastructure, self-hosting model, AI provider strategy, and monorepo structure for GitYard.**

GitYard is an open-source, self-hostable, AI-native developer collaboration platform for GitHub repositories, pull requests, issues, agents, code review, and project context.

This document describes the full technical stack.

GitYard should not be built as a simple frontend, backend, and database.

GitYard should be built as a real platform:

- monorepo;
- multiple deployable services;
- event-driven architecture;
- durable workflows;
- GitHub sync;
- Git mirroring;
- local/self-hosted AI support;
- open-source-first design;
- paid/cloud features possible later inside the same repo;
- no hard dependency on paid AI providers;
- no hard dependency on paid cloud infrastructure;
- Docker Compose from day one;
- Kubernetes later if needed.

---

## Table of Contents

- [Core Architecture Principle](#core-architecture-principle)
- [Stack Summary](#stack-summary)
- [Monorepo Strategy](#monorepo-strategy)
- [Repository Structure](#repository-structure)
- [Languages](#languages)
- [Frontend Stack](#frontend-stack)
- [Backend/API Stack](#backendapi-stack)
- [Core Services](#core-services)
- [Workers](#workers)
- [Database](#database)
- [Event Bus](#event-bus)
- [Durable Workflows](#durable-workflows)
- [Cache and Coordination](#cache-and-coordination)
- [Search](#search)
- [Object Storage](#object-storage)
- [Analytics and Observability](#analytics-and-observability)
- [AI Architecture](#ai-architecture)
- [AI Providers](#ai-providers)
- [Local AI with Ollama](#local-ai-with-ollama)
- [No-AI Mode](#no-ai-mode)
- [Agent Runtime](#agent-runtime)
- [GitHub Integration](#github-integration)
- [Git Service](#git-service)
- [Pull Request System](#pull-request-system)
- [Issue System](#issue-system)
- [Review System](#review-system)
- [Context and Project Memory](#context-and-project-memory)
- [CI and Checks](#ci-and-checks)
- [Release System](#release-system)
- [Notifications](#notifications)
- [API Protocols](#api-protocols)
- [CLI](#cli)
- [Browser Extension](#browser-extension)
- [Self-Hosting](#self-hosting)
- [Docker Compose](#docker-compose)
- [Configuration](#configuration)
- [Deployment Path](#deployment-path)
- [Security](#security)
- [Permissions](#permissions)
- [Feature Flags and Paid Features](#feature-flags-and-paid-features)
- [Development Tooling](#development-tooling)
- [Package Naming](#package-naming)
- [Data Ownership Boundaries](#data-ownership-boundaries)
- [Event Model](#event-model)
- [Service-by-Service Breakdown](#service-by-service-breakdown)
- [Initial Build Order](#initial-build-order)
- [What Not To Use](#what-not-to-use)
- [Final Stack Decision](#final-stack-decision)

---

## Core Architecture Principle

GitYard should be built as:

```text
an open-source, self-hostable, event-driven developer platform
```

The platform should support:

```text
GitHub as source of truth first
↓
GitYard as daily interface
↓
GitYard as source of truth later
```

The architecture must support this transition.

That means GitYard needs:

- GitHub integration;
- repo mirroring;
- Git operations;
- pull request modeling;
- issue modeling;
- review workflows;
- AI analysis;
- agent workflows;
- project memory;
- search;
- durable background processing;
- self-hosting;
- local AI;
- event-driven services;
- future native Git hosting.

The stack must be serious enough to support the full platform vision, but not so over-engineered that nobody can run it locally.

The correct balance:

```text
one monorepo
multiple deployable services
modular packages
event-driven backend
self-hosted by default
cloud optional later
```

---

## Stack Summary

Recommended stack:

```text
Frontend:
  React
  Vite
  TanStack Router
  TanStack Query
  Tailwind CSS
  shadcn/ui
  Monaco Editor

Backend/API:
  TypeScript
  Hono or Fastify
  REST/OpenAPI externally
  gRPC or typed internal clients later

Core Services:
  Go for Git-heavy and sync-heavy services
  TypeScript for product/business services

Database:
  Postgres

Cache:
  Redis

Event Bus:
  NATS JetStream

Durable Workflows:
  Temporal

Search:
  Meilisearch first
  Custom code search later

Object Storage:
  S3-compatible storage
  MinIO locally
  Cloudflare R2 / S3 / Tigris later

AI:
  Pluggable AI gateway
  Ollama support
  OpenAI-compatible support
  Anthropic support
  BYO key support
  No-AI mode

Analytics:
  Postgres first
  ClickHouse later

Observability:
  OpenTelemetry
  Grafana
  Prometheus
  Loki or ClickHouse later
  Tempo later

Infra:
  Docker Compose first
  Kubernetes later

Package Manager:
  pnpm

Build System:
  Turbo

Formatting/Linting:
  Biome

DB Migrations:
  Drizzle Kit or Prisma Migrate
```

---

## Monorepo Strategy

GitYard should be one repository:

```text
github.com/GitYard-dev/GitYard
```

Do not create separate repos for:

- cloud;
- business;
- enterprise;
- paid features;
- hosted features;
- self-hosted features.

Paid/cloud features can exist in the same repository later.

The project should remain easy to understand and easy to contribute to.

The monorepo should contain:

- frontend apps;
- backend services;
- workers;
- shared packages;
- Go services;
- infrastructure;
- documentation;
- examples;
- local development setup;
- self-hosting setup.

The repo should not be organized around monetization.

It should be organized around technical domains.

Good domains:

```text
auth
github
git
repos
pull-requests
issues
reviews
agents
ai
context
search
events
db
ui
```

Bad domains:

```text
free
pro
business
enterprise
cloud
paid
```

---

## Repository Structure

Recommended structure:

```text
GitYard/
├── apps/
│   ├── web/
│   └── docs/
│
├── services/
│   ├── api/
│   ├── worker/
│   ├── git-worker/
│   └── ai-worker/
│
├── packages/
│   ├── ui/
│   ├── config/
│   ├── db/
│   ├── events/
│   ├── github/
│   ├── git/
│   ├── ai/
│   ├── agents/
│   ├── protocol/
│   ├── auth/
│   ├── shared/
│   └── observability/
│
├── infra/
│   ├── docker/
│   ├── compose/
│   ├── k8s/
│   └── terraform/
│
├── docs/
│   ├── architecture.md
│   ├── stack.md
│   ├── self-hosting.md
│   ├── github-app.md
│   ├── ai-providers.md
│   ├── agents.md
│   ├── events.md
│   └── contributing.md
│
├── examples/
│   ├── local-ollama/
│   ├── github-pat/
│   └── github-app/
│
├── scripts/
│   ├── setup.ts
│   ├── seed.ts
│   ├── dev.ts
│   └── check-env.ts
│
├── docker-compose.yml
├── docker-compose.ollama.yml
├── pnpm-workspace.yaml
├── turbo.json
├── package.json
├── biome.json
├── .env.example
├── README.md
└── LICENSE
```

### Minimal Initial Structure

Start with:

```text
GitYard/
├── apps/
│   └── web/
│
├── services/
│   ├── api/
│   ├── worker/
│   ├── git-worker/
│   └── ai-worker/
│
├── packages/
│   ├── ui/
│   ├── config/
│   ├── db/
│   ├── events/
│   ├── github/
│   ├── ai/
│   ├── agents/
│   ├── protocol/
│   └── shared/
│
├── docs/
├── infra/
├── examples/
├── docker-compose.yml
├── pnpm-workspace.yaml
├── turbo.json
├── package.json
├── .env.example
└── README.md
```

---

## Languages

GitYard can and should mix languages where useful.

### TypeScript

Use TypeScript for:

- web app;
- API gateway;
- product services;
- GitHub API integration helpers;
- AI provider abstraction;
- agent orchestration;
- SDK;
- CLI;
- shared types;
- frontend/backend contracts;
- prompt templates;
- business logic.

TypeScript is best for fast product iteration.

### Go

Use Go for:

- Git operations;
- repo mirroring;
- webhook processing;
- sync workers;
- indexing workers;
- long-running services;
- high-concurrency I/O tasks;
- future native Git hosting;
- SSH/HTTP Git services later.

Go is best for simple, reliable, concurrent backend services.

### Python

Use Python only where it earns its place:

- ML experiments;
- evaluation pipelines;
- embedding experiments;
- local model experiments;
- code intelligence experiments.

Python should not be required for the core product unless absolutely necessary.

### Rust

Optional later.

Use Rust for:

- custom diff engine;
- high-performance code search;
- parser/indexer work;
- sandboxed execution;
- native Git object storage;
- performance-critical subsystems.

Do not start with Rust unless there is a clear reason.

---

## Frontend Stack

Use:

```text
React
Vite
TanStack Router
TanStack Query
Tailwind CSS
shadcn/ui
Monaco Editor
cmdk
React Hook Form
Zod
```

### Why Not Next.js as the Main App?

GitYard is an application, not primarily a content website.

The main UI should feel like an app:

- fast navigation;
- persistent layout;
- command palette;
- keyboard shortcuts;
- dynamic data;
- PR review interface;
- issue triage interface;
- live sync state;
- realtime updates.

React + Vite + TanStack Router is a better fit for an app shell.

Next.js can still be used later for:

- marketing site;
- docs site;
- public landing pages;
- SEO-heavy pages.

### Main Web App

```text
apps/web/
├── src/
│   ├── routes/
│   ├── components/
│   ├── features/
│   ├── lib/
│   ├── hooks/
│   ├── stores/
│   └── main.tsx
├── package.json
└── vite.config.ts
```

### Frontend Product Areas

The app should include:

- repo dashboard;
- PR list;
- PR page;
- issue list;
- issue page;
- review interface;
- agent runs;
- project context;
- search;
- settings;
- GitHub connection flow;
- local AI provider setup;
- self-hosting admin panel;
- sync status panel.

---

## Backend/API Stack

Use:

```text
TypeScript
Hono or Fastify
Zod
OpenAPI
Postgres
Redis
NATS
Temporal client
```

### API Service Responsibilities

```text
services/api
```

Responsible for:

- public HTTP API;
- auth/session handling;
- GitHub OAuth callback;
- GitHub App callback;
- GitHub webhook ingestion endpoint;
- request validation;
- rate limiting;
- frontend backend-for-frontend;
- service orchestration;
- REST/OpenAPI generation;
- basic admin endpoints.

The API service should not perform heavy work directly.

It should:

- validate requests;
- read/write product state when appropriate;
- publish events;
- start workflows;
- return responses.

Heavy work belongs in workers.

---

## Core Services

Initial deployable services:

```text
web
api
worker
git-worker
ai-worker
```

These are enough at the start.

Do not deploy 15 services on day one.

Instead, keep internal code modular and split into separate processes later.

### `web`

Frontend application.

### `api`

HTTP API and app backend.

### `worker`

General background worker for:

- GitHub sync;
- PR analysis orchestration;
- issue analysis orchestration;
- search indexing;
- notification jobs;
- event processing.

### `git-worker`

Go service for:

- cloning repos;
- fetching updates;
- reading Git objects;
- computing diffs;
- extracting files;
- preparing future native Git hosting.

### `ai-worker`

AI job worker for:

- PR summaries;
- issue summaries;
- risk analysis;
- review checklists;
- project context extraction;
- agent planning;
- agent output validation.

---

## Workers

Workers should be explicit.

Recommended worker categories:

```text
github-sync-worker
git-mirror-worker
pr-analysis-worker
issue-analysis-worker
code-index-worker
ai-worker
agent-runner
ci-log-worker
release-worker
notification-worker
```

At first, these can run inside one or two deployable worker processes.

Later, split them if load requires it.

### Worker Principles

Workers should:

- be idempotent;
- support retries;
- emit events;
- update sync state;
- store raw payloads where useful;
- avoid silent failure;
- be observable;
- not block HTTP requests;
- use Temporal for long workflows.

---

## Database

Use Postgres.

Postgres is the source of truth for product state.

Use one physical database at first.

Use logical schemas:

```text
auth.*
github.*
repos.*
pull_requests.*
issues.*
reviews.*
agents.*
ai.*
context.*
search.*
billing.*
audit.*
```

### Extensions

Recommended Postgres extensions:

```text
pgvector
pg_trgm
citext
uuid-ossp or pgcrypto
```

### What Goes in Postgres

Store:

- users;
- organizations;
- GitHub installations;
- repositories;
- PRs;
- issues;
- comments;
- reviews;
- check runs;
- releases;
- agent runs;
- AI summaries;
- risk assessments;
- sync state;
- permissions;
- project memory;
- decision records;
- audit logs.

### What Does Not Go in Postgres

Do not store large blobs in Postgres.

Avoid storing:

- full CI logs;
- raw webhook payloads forever;
- large diffs;
- repo archives;
- generated artifacts;
- large embeddings outside proper vector storage;
- binary files.

Use object storage for blobs.

---

## Event Bus

Use NATS JetStream.

GitYard is event-driven.

Events are the nervous system of the platform.

### Why NATS JetStream?

Use it for:

- durable events;
- replayable event streams;
- async service communication;
- sync jobs;
- worker coordination;
- decoupled services;
- local self-hosting.

### Event Subjects

Use subject naming like:

```text
github.webhook.received
github.installation.created
github.installation.deleted

repo.sync.requested
repo.sync.started
repo.sync.completed
repo.sync.failed

git.clone.requested
git.clone.completed
git.fetch.completed
git.diff.completed

pull_request.created
pull_request.updated
pull_request.closed
pull_request.analysis.requested
pull_request.analysis.completed

issue.created
issue.updated
issue.closed
issue.analysis.requested
issue.analysis.completed

review.submitted
review.requested
review.dismissed

agent.run.requested
agent.run.started
agent.run.completed
agent.run.failed

check.created
check.updated
check.failed
check.completed

release.created
release.updated
release.published

search.index.requested
search.index.completed

notification.created
```

### Event Contract

Every event should include:

```json
{
  "id": "evt_...",
  "type": "pull_request.analysis.completed",
  "version": 1,
  "timestamp": "2026-05-28T12:00:00Z",
  "actor": {
    "type": "system",
    "id": "pr-analysis-worker"
  },
  "repository": {
    "id": "repo_..."
  },
  "data": {}
}
```

---

## Durable Workflows

Use Temporal.

Temporal should handle long-running workflows.

Use Temporal for workflows that involve:

- multiple steps;
- external APIs;
- retries;
- rate limits;
- partial failure;
- resumability;
- human approval gates;
- long agent runs.

### Workflows

Recommended workflows:

```text
ImportGitHubRepoWorkflow
SyncGitHubRepoWorkflow
AnalyzePullRequestWorkflow
AnalyzeIssueWorkflow
IndexRepositoryWorkflow
RunAgentWorkflow
FixCIFailureWorkflow
GenerateReleaseSummaryWorkflow
MigrateRepoWorkflow
```

### Example: Repo Sync Workflow

```text
SyncGitHubRepoWorkflow
├── validate GitHub installation
├── fetch repo metadata
├── fetch branches
├── fetch pull requests
├── fetch issues
├── fetch comments
├── fetch reviews
├── fetch check runs
├── trigger git fetch
├── trigger code indexing
├── trigger PR analysis where needed
├── update sync checkpoint
└── emit repo.sync.completed
```

### Example: PR Analysis Workflow

```text
AnalyzePullRequestWorkflow
├── load PR metadata
├── load diff
├── load linked issues
├── load checks
├── group changed files
├── summarize file changes
├── compute risk score
├── generate reviewer checklist
├── store AI outputs
├── emit pull_request.analysis.completed
└── notify subscribers
```

---

## Cache and Coordination

Use Redis.

Redis should be used for:

- cache;
- sessions if needed;
- rate limit counters;
- temporary locks;
- presence;
- ephemeral state;
- short-lived GitHub API responses.

Do not use Redis as the main durable queue if NATS and Temporal are already in the stack.

Redis is not the source of truth.

---

## Search

Use Meilisearch first.

Meilisearch should power:

- repo search;
- PR search;
- issue search;
- comment search;
- user search;
- organization search;
- release search;
- general product search.

### Code Search

Code search should be separate.

Initial code search:

```text
git-worker reads repo files
↓
code-index-worker extracts searchable text
↓
search-service indexes file paths and content
↓
basic search works
```

Later code search:

- symbol search;
- language-aware search;
- references;
- definitions;
- semantic code search;
- blame-aware search;
- cross-repo search.

Possible future tools:

- custom Go indexer;
- Zoekt-like search;
- Tree-sitter parsers;
- Tantivy/Rust-based index;
- Sourcegraph-like architecture.

Do not overbuild this on day one.

---

## Object Storage

Use S3-compatible storage.

Local:

```text
MinIO
```

Production options:

```text
Cloudflare R2
AWS S3
Tigris
Backblaze B2
MinIO self-hosted
```

### Store in Object Storage

- raw GitHub webhook payloads;
- PR diffs;
- CI logs;
- repo archives;
- generated artifacts;
- agent run traces;
- release artifacts;
- large cached model inputs/outputs;
- temporary import data.

Use object storage for anything large.

---

## Analytics and Observability

Start simple.

Use Postgres tables for early event/audit history.

Add ClickHouse later when volume justifies it.

### Early Observability

Use:

```text
OpenTelemetry
Prometheus
Grafana
structured logs
```

### Later Observability

Add:

```text
ClickHouse
Loki
Tempo
OTel Collector
```

### Track

Track:

- repo sync duration;
- GitHub API rate limit usage;
- webhook processing time;
- PR analysis time;
- AI generation time;
- local model latency;
- worker failures;
- agent run success rate;
- sync failures;
- indexing failures.

---

## AI Architecture

GitYard must not depend on paid AI.

AI must be pluggable.

The product should work in four modes:

```text
No AI
Local AI
Bring-your-own-key AI
Managed AI later
```

### AI Service

Create one internal AI abstraction:

```text
packages/ai
services/ai-worker
```

Responsibilities:

- provider configuration;
- prompt templates;
- structured output;
- retries;
- model routing;
- local model support;
- OpenAI-compatible support;
- Anthropic support;
- output caching;
- prompt versioning;
- token counting where possible;
- redaction;
- evaluation logs.

Services should not call OpenAI, Anthropic, or Ollama directly.

They should call GitYard’s AI layer.

### AI Provider Interface

Example TypeScript interface:

```ts
export interface AiProvider {
  generateText(input: GenerateTextInput): Promise<GenerateTextResult>;
  generateObject<T>(input: GenerateObjectInput<T>): Promise<T>;
  embed(input: EmbedInput): Promise<EmbedResult>;
}
```

### AI Output Caching

Cache AI outputs by content hash:

```text
hash = sha256(model + provider + prompt_version + input_hash + context_hash)
```

Store:

```text
ai_generations
- id
- provider
- model
- prompt_version
- input_hash
- output
- created_at
```

If the PR did not change, do not regenerate.

This saves time and money.

---

## AI Providers

Supported providers should include:

```text
Ollama
OpenAI-compatible API
Anthropic
OpenRouter
LM Studio
vLLM
Mistral
Groq
Together
Disabled/no-AI provider
```

### Provider Modes

```text
GitYard_AI_PROVIDER=disabled
GitYard_AI_PROVIDER=ollama
GitYard_AI_PROVIDER=openai-compatible
GitYard_AI_PROVIDER=anthropic
GitYard_AI_PROVIDER=openrouter
```

### OpenAI-Compatible Provider

Many local and hosted tools expose OpenAI-compatible APIs.

Support this early.

Config:

```env
GitYard_AI_PROVIDER=openai-compatible
GitYard_AI_BASE_URL=http://localhost:1234/v1
GitYard_AI_API_KEY=optional
GitYard_AI_CHAT_MODEL=qwen2.5-coder
GitYard_AI_EMBEDDING_MODEL=nomic-embed-text
```

This makes GitYard flexible.

---

## Local AI with Ollama

Ollama should be a first-class provider.

Default local setup:

```text
Provider: Ollama
Base URL: http://localhost:11434
Chat model: qwen2.5-coder:7b
Embedding model: nomic-embed-text
```

### Recommended Models

For code review and PR analysis:

```text
qwen2.5-coder:7b
qwen2.5-coder:14b
deepseek-coder-v2-lite
llama3.1:8b
codellama
```

For embeddings:

```text
nomic-embed-text
mxbai-embed-large
```

### Local Model Constraints

Local models may have:

- smaller context windows;
- weaker structured output;
- slower generation;
- worse reasoning;
- worse tool use.

Design around this.

Instead of asking local models to analyze a huge PR all at once:

```text
summarize each file diff
↓
summarize each file group
↓
produce final PR summary
```

This works better locally.

---

## No-AI Mode

GitYard must work without AI.

No-AI mode should still provide:

- GitHub repo connection;
- repo dashboard;
- PR list;
- PR page;
- issue list;
- issue page;
- comments;
- reviews;
- checks;
- releases;
- sync status;
- search;
- manual review workflow.

AI-generated features should be optional.

In no-AI mode:

```text
AI summaries: disabled
Risk explanation: disabled or rule-based only
Agent runs: disabled
Embeddings: disabled
Semantic search: disabled
```

The app should not break.

---

## Agent Runtime

Agents are first-class actors.

Agents should not be simple prompt calls.

### Agent Service Responsibilities

```text
agent identity
agent permissions
agent runs
task lifecycle
tool access
approval gates
audit logs
generated outputs
```

### Agent Task Types

```text
investigate_issue
summarize_issue
propose_plan
open_pr
review_pr
fix_ci
write_tests
update_docs
refactor
explain_code
triage_issue
find_duplicates
```

### Agent Tools

Agents should be able to use controlled tools:

```text
read_repo_file
search_code
read_pr_diff
read_issue
read_comments
run_tests
write_patch
open_draft_pr
post_comment
request_review
```

### Agent Permissions

Agents must have permissions:

```text
can_read_repo
can_open_pr
can_comment
can_run_tests
can_modify_docs
can_modify_code
can_modify_sensitive_files
can_access_secrets
can_merge
```

Defaults should be restrictive.

Agents should not be able to:

- access secrets by default;
- push to protected branches;
- merge PRs by default;
- modify sensitive files without approval;
- hide generated work.

---

## GitHub Integration

GitYard needs both GitHub OAuth and GitHub Apps.

### GitHub OAuth

Use for:

- user login;
- identity;
- user permissions;
- personal account access.

### GitHub App

Use for:

- org installation;
- repo selection;
- webhooks;
- repo permissions;
- PR access;
- issue access;
- check access;
- scalable integration.

### Personal Access Token Mode

Support PAT mode for local development.

This makes setup easier.

Modes:

```text
public-readonly
personal-access-token
github-app
```

### GitHub Webhook Flow

```text
GitHub
↓
services/api webhook endpoint
↓
verify signature
↓
store raw payload in object storage
↓
publish github.webhook.received event
↓
worker processes event
↓
update database
↓
trigger sync/analysis if needed
```

---

## Git Service

The Git service should be written in Go.

### Responsibilities

```text
clone repositories
fetch updates
manage bare mirrors
read commits
read trees
read file contents
compute diffs
extract changed files
prepare patches
support future native Git hosting
```

### Local Mirror Layout

```text
/var/lib/GitYard/mirrors/
└── github.com/
    └── owner/
        └── repo.git
```

### Future Native Hosting

Later, this evolves into:

- Git over SSH;
- Git over HTTPS;
- native repo creation;
- native branches;
- native PRs;
- GitHub mirror mode.

Do not build native hosting first.

But do not design in a way that blocks it.

---

## Pull Request System

The PR system owns GitYard’s pull request model.

GitHub PRs are an input.

GitYard PRs are the product.

### PR Data

Store:

- title;
- body;
- author;
- source branch;
- target branch;
- state;
- draft status;
- mergeability;
- comments;
- reviews;
- changed files;
- commits;
- checks;
- linked issues;
- summary;
- risk level;
- review checklist;
- file groups;
- agent involvement;
- last analyzed commit SHA;
- sync state.

### PR Analysis

PR analysis should generate:

- summary;
- risk assessment;
- affected areas;
- changed file groups;
- reviewer checklist;
- missing tests;
- likely concerns;
- linked issue context;
- agent involvement summary.

---

## Issue System

The issue system owns structured issue state.

### Issue Data

Store:

- title;
- body;
- author;
- labels;
- state;
- comments;
- linked PRs;
- related issues;
- current summary;
- reproduction steps;
- affected versions;
- next actions;
- triage state;
- agent attempts;
- decisions.

### Issue Analysis

Issue analysis should generate:

- current understanding;
- reproduction summary;
- duplicate candidates;
- linked code areas;
- linked PRs;
- open questions;
- next action suggestions.

---

## Review System

The review system owns review state and review decisions.

### Responsibilities

- review comments;
- approval state;
- requested changes;
- review queues;
- reviewer assignment;
- code owner mapping;
- review since last viewed;
- GitHub review writeback;
- decision tracking.

### Review Features

- show what changed since last review;
- group files by concern;
- generate reviewer checklist;
- mark unresolved decisions;
- detect stale approval after new commits;
- highlight risky files;
- support role-specific review modes.

---

## Context and Project Memory

GitYard should maintain project memory.

### Context Sources

- README;
- docs;
- code;
- issues;
- PRs;
- comments;
- reviews;
- commits;
- releases;
- decisions;
- agent runs;
- CI failures.

### Project Memory Types

```text
architecture_note
decision_record
coding_convention
known_risk
failed_attempt
release_constraint
agent_instruction
maintainer_note
```

### Storage

Use:

```text
Postgres for structured records
pgvector for embeddings
Object storage for large raw context
Meilisearch for full-text search
```

---

## CI and Checks

The CI service should ingest and explain checks.

### GitHub Actions First

Start with GitHub check runs and workflow runs.

Store:

- check name;
- status;
- conclusion;
- started time;
- completed time;
- logs URL;
- failure summary;
- related files;
- flakiness signal.

### Future Providers

Support later:

- Buildkite;
- CircleCI;
- Depot;
- Blacksmith;
- self-hosted runners;
- custom check APIs.

### CI Analysis

GitYard should explain:

- what failed;
- why it might have failed;
- whether the failure is likely related to the PR;
- which files are related;
- whether the test is flaky;
- what to do next.

---

## Release System

Release system can come later, but architecture should account for it.

### Release Data

Store:

- version;
- tag;
- date;
- status;
- previous version;
- included commits;
- included PRs;
- fixed issues;
- breaking changes;
- security fixes;
- artifacts;
- changelog;
- rollback notes.

### Release Analysis

Generate:

- changelog;
- migration notes;
- risk summary;
- included PR summary;
- release readiness summary.

---

## Notifications

Notification service can be basic initially.

### Notification Types

- review requested;
- PR analysis completed;
- issue summary updated;
- agent run completed;
- CI failed;
- sync failed;
- mention;
- release published.

### Delivery Channels

Start with:

- in-app notifications.

Later:

- email;
- Slack;
- Discord;
- webhooks.

---

## API Protocols

### External API

Use REST + OpenAPI.

Why:

- easy to document;
- easy to consume;
- easy to generate SDKs;
- good for public API;
- good for integrations.

### Internal API

Use:

- direct package calls early;
- NATS events for async;
- Temporal workflows for durable jobs;
- gRPC later when service boundaries harden.

Do not force gRPC on day one.

### Frontend Data Fetching

Use TanStack Query.

API client should be generated or strongly typed.

---

## CLI

GitYard should eventually have a CLI.

Package:

```text
packages/cli
```

or:

```text
apps/cli
```

Commands:

```bash
GitYard login
GitYard repo connect
GitYard repo sync
GitYard pr view
GitYard pr analyze
GitYard issue summarize
GitYard agent run
GitYard status
```

Not required for first milestone, but useful later.

---

## Browser Extension

The browser extension is optional and should come later.

It is not core infrastructure.

Purpose:

- add “Open in GitYard” button to GitHub;
- show GitYard summary inside GitHub PR pages;
- redirect GitHub URLs to GitYard;
- make adoption easier;
- let users keep GitHub habits.

Example:

```text
github.com/owner/repo/pull/123
↓
GitYard.localhost/owner/repo/pull/123
```

Do not build the extension before the main app is useful.

---

## Self-Hosting

Self-hosting is first-class.

A user should be able to run:

```bash
git clone https://github.com/GitYard-dev/GitYard
cd GitYard
cp .env.example .env
docker compose up
```

Then open:

```text
http://localhost:3000
```

### Self-Hosted Requirements

Self-hosted GitYard should support:

- local Postgres;
- local Redis;
- local NATS;
- local Temporal;
- local Meilisearch;
- local MinIO;
- local Ollama;
- GitHub PAT mode;
- GitHub App mode;
- no-AI mode;
- BYO AI keys;
- no paid services required.

---

## Docker Compose

Local Docker Compose should include:

```text
web
api
worker
git-worker
ai-worker
postgres
redis
nats
temporal
meilisearch
minio
ollama optional
```

### Example Compose Shape

```yaml
services:
  web:
    build: ./apps/web
    ports:
      - "3000:3000"

  api:
    build: ./services/api
    ports:
      - "4000:4000"
    depends_on:
      - postgres
      - redis
      - nats
      - temporal

  worker:
    build: ./services/worker
    depends_on:
      - postgres
      - nats
      - temporal
      - meilisearch
      - minio

  git-worker:
    build: ./services/git-worker
    volumes:
      - git_mirrors:/var/lib/GitYard/mirrors
    depends_on:
      - postgres
      - nats

  ai-worker:
    build: ./services/ai-worker
    depends_on:
      - postgres
      - nats

  postgres:
    image: postgres:17
    environment:
      POSTGRES_USER: GitYard
      POSTGRES_PASSWORD: GitYard
      POSTGRES_DB: GitYard
    ports:
      - "5432:5432"

  redis:
    image: redis:7
    ports:
      - "6379:6379"

  nats:
    image: nats:latest
    command: ["-js"]
    ports:
      - "4222:4222"
      - "8222:8222"

  temporal:
    image: temporalio/auto-setup
    ports:
      - "7233:7233"

  meilisearch:
    image: getmeili/meilisearch:latest
    ports:
      - "7700:7700"

  minio:
    image: minio/minio
    command: server /data --console-address ":9001"
    ports:
      - "9000:9000"
      - "9001:9001"

  ollama:
    image: ollama/ollama
    ports:
      - "11434:11434"
    volumes:
      - ollama:/root/.ollama

volumes:
  git_mirrors:
  ollama:
```

---

## Configuration

Use environment variables and a config package.

### `.env.example`

```env
# App
GitYard_APP_URL=http://localhost:3000
GitYard_API_URL=http://localhost:4000
GitYard_ENV=development

# Database
DATABASE_URL=postgres://GitYard:GitYard@localhost:5432/GitYard

# Redis
REDIS_URL=redis://localhost:6379

# NATS
NATS_URL=nats://localhost:4222

# Temporal
TEMPORAL_ADDRESS=localhost:7233
TEMPORAL_NAMESPACE=default

# Meilisearch
MEILI_URL=http://localhost:7700
MEILI_MASTER_KEY=GitYard

# Object Storage
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY_ID=GitYard
S3_SECRET_ACCESS_KEY=GitYardpassword
S3_BUCKET=GitYard
S3_REGION=local
S3_FORCE_PATH_STYLE=true

# GitHub
GITHUB_AUTH_MODE=pat
GITHUB_TOKEN=
GITHUB_APP_ID=
GITHUB_APP_PRIVATE_KEY=
GITHUB_WEBHOOK_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# AI
GitYard_AI_PROVIDER=ollama
GitYard_AI_BASE_URL=http://localhost:11434
GitYard_AI_CHAT_MODEL=qwen2.5-coder:7b
GitYard_AI_EMBEDDING_MODEL=nomic-embed-text
GitYard_AI_API_KEY=

# Features
GitYard_BILLING_ENABLED=false
GitYard_CLOUD_MODE=false
GitYard_MANAGED_AI_ENABLED=false
```

### Config Package

```text
packages/config
```

Responsibilities:

- load env;
- validate env with Zod;
- expose typed config;
- prevent missing config errors at runtime.

---

## Deployment Path

### Phase 1: Local Only

Use:

- Docker Compose;
- local Ollama;
- local MinIO;
- local Postgres;
- local NATS;
- local Temporal;
- local Meilisearch.

### Phase 2: Public Demo

Use:

- web on Vercel/Fly/Railway;
- API on Fly/Railway;
- Postgres managed;
- Redis managed;
- object storage managed;
- AI disabled or BYO key;
- public repos only.

### Phase 3: Hosted GitYard

Use:

- managed Postgres;
- managed Redis;
- managed NATS or self-hosted;
- Temporal Cloud or self-hosted;
- object storage;
- managed Meilisearch;
- managed AI optional;
- private repo support;
- team features.

### Phase 4: Serious Production

Use Kubernetes when needed.

Kubernetes is not required at the beginning.

Use it when there are:

- many services;
- autoscaling workers;
- isolated agent sandboxes;
- service networking needs;
- serious production traffic;
- multiple environments.

---

## Security

Security is core because GitYard touches code.

### Required Early

- GitHub webhook signature verification;
- encrypted GitHub tokens;
- least-privilege GitHub permissions;
- no token logging;
- per-repo access control;
- service-to-service auth later;
- audit logs;
- agent permission boundaries;
- secret redaction in logs;
- branch protection awareness.

### Token Storage

GitHub tokens must be encrypted at rest.

Use:

- envelope encryption later;
- local dev encryption key initially;
- KMS in hosted/cloud mode later.

### Webhook Security

Every webhook must be:

- signature verified;
- stored raw for debugging;
- processed idempotently;
- linked to installation/repo;
- rejected if invalid.

### Agent Security

Agents must not:

- access secrets by default;
- push to protected branches by default;
- merge by default;
- hide generated changes;
- modify sensitive files without approval.

---

## Permissions

### User Permissions

```text
repo:read
repo:write
pr:read
pr:write
issue:read
issue:write
review:create
review:submit
agent:run
agent:approve
settings:manage
billing:manage
```

### Agent Permissions

```text
agent:read_repo
agent:open_pr
agent:comment
agent:run_tests
agent:modify_docs
agent:modify_code
agent:modify_sensitive_files
agent:access_secrets
agent:merge
```

### Default Agent Permissions

Default:

```text
agent:read_repo = true
agent:comment = true
agent:open_pr = false
agent:modify_code = false
agent:access_secrets = false
agent:merge = false
```

Increase permissions explicitly.

---

## Feature Flags and Paid Features

Paid/cloud features can live in the same repo.

Use feature flags.

Example:

```env
GitYard_BILLING_ENABLED=false
GitYard_CLOUD_MODE=false
GitYard_MANAGED_AI_ENABLED=false
GitYard_ENTERPRISE_FEATURES=false
```

Possible future paid features:

- managed AI;
- private repos on hosted GitYard;
- team dashboards;
- audit logs;
- SSO;
- hosted agents;
- long retention;
- enterprise sync;
- advanced permissions;
- compliance exports.

Do not create separate repos for paid features early.

Keep everything in the monorepo.

---

## Development Tooling

Use:

```text
pnpm
Turbo
Biome
TypeScript
tsx
Drizzle or Prisma
Docker Compose
```

### Root `package.json`

```json
{
  "name": "GitYard",
  "private": true,
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "check": "turbo check",
    "lint": "biome check .",
    "format": "biome format --write .",
    "db:generate": "pnpm --filter @GitYard/db db:generate",
    "db:migrate": "pnpm --filter @GitYard/db db:migrate",
    "docker:up": "docker compose up",
    "docker:down": "docker compose down"
  },
  "packageManager": "pnpm@9.0.0",
  "devDependencies": {
    "@biomejs/biome": "latest",
    "turbo": "latest",
    "typescript": "latest",
    "tsx": "latest"
  }
}
```

### `pnpm-workspace.yaml`

```yaml
packages:
  - "apps/*"
  - "services/*"
  - "packages/*"
```

---

## Package Naming

Use scoped package names.

```text
@GitYard/ui
@GitYard/config
@GitYard/db
@GitYard/events
@GitYard/github
@GitYard/git
@GitYard/ai
@GitYard/agents
@GitYard/protocol
@GitYard/auth
@GitYard/shared
@GitYard/observability
```

Example imports:

```ts
import { db } from "@GitYard/db";
import { publishEvent } from "@GitYard/events";
import { createGitHubClient } from "@GitYard/github";
import { generatePrSummary } from "@GitYard/ai";
```

---

## Data Ownership Boundaries

Each domain should own its own data.

### Auth

Owns:

- users;
- sessions;
- organizations;
- memberships;
- tokens;
- roles.

### GitHub

Owns:

- GitHub installations;
- GitHub account mapping;
- webhook state;
- GitHub API state.

### Repos

Owns:

- repositories;
- mirror state;
- sync state;
- branches;
- provider mapping.

### Pull Requests

Owns:

- PR metadata;
- PR state;
- PR summaries;
- risk scores;
- file groups.

### Issues

Owns:

- issue metadata;
- issue summaries;
- triage state;
- duplicate links.

### Reviews

Owns:

- review comments;
- approval state;
- review queues;
- reviewer state.

### Agents

Owns:

- agent identities;
- agent permissions;
- agent runs;
- agent outputs.

### AI

Owns:

- provider configs;
- prompt versions;
- AI generations;
- embeddings metadata.

### Context

Owns:

- project memory;
- decision records;
- architecture notes;
- retrieval index metadata.

---

## Event Model

Events should be typed and versioned.

Package:

```text
packages/events
```

### Event Example

```ts
export type PullRequestAnalysisCompletedEvent = {
  id: string;
  type: "pull_request.analysis.completed";
  version: 1;
  timestamp: string;
  actor: {
    type: "system" | "user" | "agent";
    id: string;
  };
  repository: {
    id: string;
  };
  pullRequest: {
    id: string;
    number: number;
  };
  data: {
    riskLevel: "low" | "medium" | "high";
    summaryId: string;
  };
};
```

### Event Rules

Events must be:

- immutable;
- versioned;
- serializable;
- idempotent;
- replayable where possible;
- documented.

---

## Service-by-Service Breakdown

### `apps/web`

Language:

```text
TypeScript
```

Stack:

```text
React
Vite
TanStack Router
TanStack Query
Tailwind
shadcn/ui
Monaco
```

Owns:

- UI;
- routes;
- PR page;
- issue page;
- repo dashboard;
- settings;
- local setup UI;
- AI provider setup UI.

---

### `services/api`

Language:

```text
TypeScript
```

Stack:

```text
Hono or Fastify
Zod
OpenAPI
```

Owns:

- HTTP API;
- auth;
- GitHub callbacks;
- webhook endpoint;
- request validation;
- starting workflows;
- publishing events.

---

### `services/worker`

Language:

```text
TypeScript
```

Owns:

- general async jobs;
- GitHub sync orchestration;
- PR analysis orchestration;
- issue analysis orchestration;
- search indexing orchestration.

---

### `services/git-worker`

Language:

```text
Go
```

Owns:

- clone;
- fetch;
- diff;
- file extraction;
- commit inspection;
- local repo mirrors.

Structure:

```text
services/git-worker/
├── cmd/
│   └── GitYard-git-worker/
│       └── main.go
├── internal/
│   ├── git/
│   ├── mirror/
│   ├── diff/
│   └── events/
├── go.mod
└── Dockerfile
```

---

### `services/ai-worker`

Language:

```text
TypeScript
```

Owns:

- AI jobs;
- provider calls;
- prompt execution;
- structured output validation;
- local Ollama support;
- OpenAI-compatible support;
- caching;
- agent reasoning steps.

---

### `packages/db`

Owns:

- schema;
- migrations;
- typed queries;
- database client;
- seed scripts.

Use:

```text
Drizzle
```

or:

```text
Prisma
```

Recommendation:

```text
Drizzle
```

because it is lighter and works well in TypeScript monorepos.

---

### `packages/ai`

Owns:

- provider interface;
- provider implementations;
- prompt templates;
- structured output helpers;
- prompt versioning;
- token estimation;
- AI cache helpers.

---

### `packages/github`

Owns:

- GitHub API clients;
- webhook types;
- GitHub event normalization;
- GitHub App helpers;
- PAT helpers.

---

### `packages/events`

Owns:

- event schemas;
- event publishers;
- event subscribers;
- event validation.

---

### `packages/agents`

Owns:

- agent types;
- agent permissions;
- agent tool definitions;
- agent task lifecycle;
- agent run schemas.

---

### `packages/config`

Owns:

- env loading;
- env validation;
- typed config.

---

### `packages/protocol`

Owns:

- API schemas;
- OpenAPI definitions;
- shared request/response contracts;
- generated clients later.

---

## Initial Build Order

Build in this order.

### 1. Monorepo Foundation

- pnpm workspace;
- Turbo;
- Biome;
- TypeScript config;
- Docker Compose;
- Postgres;
- Redis;
- NATS;
- Temporal;
- Meilisearch;
- MinIO;
- Ollama optional.

### 2. Web + API

- React app;
- API service;
- config package;
- DB package;
- health checks;
- basic layout.

### 3. GitHub Auth

- PAT mode first;
- OAuth after;
- GitHub App after.

### 4. Repo Connection

- connect repo;
- fetch metadata;
- store repo;
- show repo dashboard.

### 5. Git Mirror

- Go git-worker;
- clone repo;
- fetch updates;
- store mirror state;
- read commits/files.

### 6. PR Sync

- fetch PRs;
- fetch changed files;
- fetch comments;
- fetch reviews;
- show PR page.

### 7. AI Provider

- AI abstraction;
- Ollama provider;
- disabled provider;
- OpenAI-compatible provider;
- prompt versioning.

### 8. PR Analysis

- summarize PR;
- risk score;
- file grouping;
- reviewer checklist;
- cache outputs.

### 9. Issue Sync

- fetch issues;
- fetch comments;
- show issue page;
- issue summary.

### 10. Agent Runs

- simple agent task;
- investigate issue;
- summarize issue;
- propose PR plan.

---

## What Not To Use

Avoid:

```text
Next.js API routes as the whole backend
Firebase as the whole backend
Supabase as the whole backend
serverless-only architecture
one giant Node process
Kafka on day one
Kubernetes on day one
LangChain as the core architecture
MongoDB as primary database
Redis as durable event system
hardcoded OpenAI dependency
paid AI as required path
closed-source core
separate enterprise repo early
```

These choices either do not match the platform or add complexity in the wrong place.

---

## Final Stack Decision

Use:

```text
Monorepo:
  pnpm + Turbo

Frontend:
  React + Vite + TanStack Router + TanStack Query + Tailwind + shadcn/ui

API:
  TypeScript + Hono/Fastify + REST/OpenAPI

Core workers:
  TypeScript workers for product jobs
  Go workers for Git/sync/indexing-heavy jobs

Database:
  Postgres

Events:
  NATS JetStream

Workflows:
  Temporal

Cache:
  Redis

Search:
  Meilisearch first
  Custom code search later

Storage:
  S3-compatible object storage
  MinIO locally

AI:
  Pluggable AI gateway
  Ollama first-class
  OpenAI-compatible support
  Anthropic support
  BYO key
  No-AI mode

Observability:
  OpenTelemetry
  Grafana
  Prometheus
  ClickHouse later

Infra:
  Docker Compose first
  Kubernetes later
```

---

## Final Architecture Sentence

GitYard is an open-source, self-hostable, event-driven developer platform built in a single monorepo. It uses React for the app, TypeScript for product/API services, Go for Git and sync workers, Postgres for product state, NATS JetStream for events, Temporal for durable workflows, Redis for cache/coordination, Meilisearch for search, S3-compatible storage for blobs, and a pluggable AI gateway that supports Ollama/local models, OpenAI-compatible APIs, Anthropic, BYO keys, and no-AI mode.

---

## Non-Negotiables

GitYard must be:

- open source;
- self-hostable;
- runnable locally;
- usable without paid AI;
- usable without a domain;
- usable without cloud services;
- GitHub-compatible;
- event-driven;
- agent-ready;
- built as one monorepo;
- structured for the full platform vision.

The initial implementation can be smaller.

The architecture should not be small-minded.
