# GitYard

**AI-native collaboration for GitHub repos, pull requests, issues, agents, code review, and project context.**

GitYard is a full developer collaboration platform designed for the next era of software development.

It connects to GitHub repositories, mirrors code and project context, provides a faster and more intelligent interface for pull requests and issues, introduces agent-native workflows, and creates a migration path from GitHub as the source of truth to GitYard as the source of truth.

GitYard is not a toy wrapper around GitHub.

GitYard is not a narrow pull request summarizer.

GitYard is not a “better UI” with no long-term platform ambition.

GitYard is the product that should exist if GitHub were being designed today in a world where humans and AI agents both contribute code.

---

## Table of Contents

* [Why GitYard Exists](#why-GitYard-exists)
* [Context: The GitHub Problem](#context-the-github-problem)
* [Context: What the Theo Video Gets Right](#context-what-the-theo-video-gets-right)
* [The Core Thesis](#the-core-thesis)
* [What GitYard Is](#what-GitYard-is)
* [What GitYard Is Not](#what-GitYard-is-not)
* [The Product Vision](#the-product-vision)
* [The Three-Stage Strategy](#the-three-stage-strategy)
* [Stage One: GitHub as Source of Truth](#stage-one-github-as-source-of-truth)
* [Stage Two: GitYard as Daily Interface](#stage-two-GitYard-as-daily-interface)
* [Stage Three: GitYard as Source of Truth](#stage-three-GitYard-as-source-of-truth)
* [Core Product Areas](#core-product-areas)
* [Pull Requests](#pull-requests)
* [Issues](#issues)
* [Code Review](#code-review)
* [Agents](#agents)
* [Project Context](#project-context)
* [Code Search](#code-search)
* [CI and Checks](#ci-and-checks)
* [Releases](#releases)
* [Identity and Reputation](#identity-and-reputation)
* [Repository Mirroring](#repository-mirroring)
* [Migration](#migration)
* [Developer Experience](#developer-experience)
* [System Architecture](#system-architecture)
* [Data Model](#data-model)
* [Agent Model](#agent-model)
* [Permissions Model](#permissions-model)
* [API Design](#api-design)
* [CLI](#cli)
* [Browser Extension](#browser-extension)
* [Open Source Strategy](#open-source-strategy)
* [Business Model](#business-model)
* [Brand](#brand)
* [Org and Repo Structure](#org-and-repo-structure)
* [Initial Milestones](#initial-milestones)
* [Long-Term Roadmap](#long-term-roadmap)
* [Principles](#principles)
* [Why This Can Work](#why-this-can-work)

---

## Why GitYard Exists

GitHub is one of the most important developer platforms ever created.

It made Git social.

It turned repositories into communities.

It made open source discoverable.

It made pull requests the default workflow for modern software collaboration.

It became the default public resume for developers.

For a long time, “send me your GitHub” meant something. It was not just a link to code. It was a link to a developer’s history, credibility, taste, projects, collaborations, and public work.

That is why replacing GitHub is hard.

GitHub is not just Git hosting.

GitHub is:

* repository hosting;
* pull requests;
* issues;
* code review;
* CI/CD;
* release management;
* project management;
* developer identity;
* social proof;
* open-source discovery;
* package ecosystem glue;
* organizational workflow;
* security infrastructure;
* and the default place where software work becomes visible.

But software development is changing.

AI agents are now writing code.

Developers are reviewing more machine-generated changes.

Pull requests are becoming larger, faster, and more numerous.

Codebases are receiving contributions from humans, bots, agents, automated migration tools, dependency updaters, and code-generation systems.

The old model of “show me the diff and let humans figure it out” is not enough.

GitYard exists because the next developer platform needs to understand not just **what changed**, but also:

* why it changed;
* who or what changed it;
* whether an agent was involved;
* what context led to the change;
* what risks exist;
* which tests matter;
* which reviewers are needed;
* what prior attempts failed;
* what issue or user need drove the work;
* and whether the change is safe to merge.

GitHub was built around Git.

GitYard is built around collaboration.

---

## Context: The GitHub Problem

The current concern around GitHub is not only that it has downtime.

Downtime matters, but downtime alone does not create a new platform shift.

The deeper issue is that GitHub has become infrastructure that the entire software world depends on, while its product model still feels rooted in an older generation of development.

GitHub’s core abstractions are still strong:

* repositories;
* branches;
* commits;
* pull requests;
* issues;
* actions;
* releases;
* organizations.

Those words should remain.

Developers already use them.

There is no reason to rename pull requests to “changesets” or invent vocabulary just because the product is new.

The problem is not the words.

The problem is the depth of the product.

A modern pull request should not only be a diff.

A modern issue should not only be a comment thread.

A modern contributor should not only be a username.

A modern CI result should not only be a green or red check.

A modern project should not only be a collection of files.

A modern developer platform should understand the relationships between all of these things.

GitYard is built around that relationship graph.

---

## Context: What the Theo Video Gets Right

The transcript that inspired this project makes several important points.

It argues that many people are beginning to question whether GitHub should remain the default place for code. The reasons include reliability concerns, platform trust concerns, and the feeling that GitHub is struggling under modern development patterns.

The transcript evaluates many GitHub alternatives and makes a distinction between current-generation alternatives and a possible next-generation platform.

The current alternatives include:

* GitLab;
* Bitbucket;
* Gitea;
* Forgejo;
* Codeberg;
* SourceHut;
* older or dead platforms such as Google Code, CodeCommit, SourceForge, and Phabricator;
* newer or adjacent tools such as Graphite, Pierre, Code Storage, Entire, and Zed-related work.

The transcript’s rough conclusion is that most existing alternatives are not true generational replacements for GitHub.

GitLab is framed as enterprise-oriented and powerful, but not pleasant enough to become the obvious developer-first replacement. It is treated as a worse version of the same generation rather than a meaningful new generation.

Bitbucket is framed as primarily useful inside the Atlassian ecosystem, especially for companies already tied to Jira.

Gitea is discussed as an open-source option with some trust issues around governance and direction.

Forgejo and Codeberg are treated much more positively. They are framed as a serious open, self-hostable, community-governed path that is usable today and aligned with free software values.

The transcript also makes a key generational argument:

* Gen 1 source control platforms were built around older systems like SVN and earlier centralized approaches.
* Gen 2 platforms were built around Git, with GitHub as the defining product.
* The next generation may not be a simple GitHub clone.
* The next generation may need to account for agents, massive code-generation throughput, richer context, new review patterns, and possibly new storage models.

The transcript also highlights one of the hardest problems:

GitHub’s community graph is extremely valuable.

If developers scatter across GitLab, Forgejo, Codeberg, Bitbucket, self-hosted instances, and new platforms, the software world loses a shared home. Profiles, contribution histories, issue discussions, social proof, and project discovery become fragmented.

GitYard takes this seriously.

GitYard does not assume the world will instantly move away from GitHub.

GitYard starts by connecting to GitHub because GitHub is still where the network is.

But GitYard is designed so that GitHub can eventually become only one backend among many.

The long-term goal is not to build a prettier GitHub page.

The goal is to build the collaboration layer that survives after the GitHub era fragments.

---

## The Core Thesis

GitHub won because it made Git social.

GitYard wins if it makes software collaboration intelligent, portable, and agent-native.

The next platform cannot simply be:

> GitHub, but open source.

It also cannot simply be:

> GitHub, but with AI summaries.

The next platform has to be structurally different.

The central object is not the repository.

The central object is not the commit.

The central object is not even the pull request.

The central object is the **software decision**.

Every meaningful change to a project is a decision:

* Should this bug be fixed this way?
* Should this dependency be upgraded?
* Should this API change be accepted?
* Should this agent-generated patch be trusted?
* Should this release go out?
* Should this contributor be granted more access?
* Should this failing test block the merge?
* Should this issue be closed?
* Should this migration be automated?
* Should this repo move away from GitHub?

GitHub shows artifacts.

GitYard explains decisions.

That is the difference.

---

## What GitYard Is

GitYard is an AI-native collaboration platform for software projects.

It provides:

* repository mirroring;
* pull request review;
* issue intelligence;
* codebase context;
* agent workflows;
* CI/check understanding;
* release context;
* contributor identity;
* project memory;
* GitHub synchronization;
* and eventually native hosting.

GitYard connects to existing GitHub repositories and builds a richer collaboration layer over them.

It mirrors repository state, pull requests, issues, comments, commits, file changes, checks, reviews, releases, and project metadata.

Then it turns that raw data into a better development surface.

The first version of GitYard uses GitHub as the source of truth.

The mature version of GitYard becomes the source of truth.

---

## What GitYard Is Not

GitYard is not a narrow GitHub UI clone.

GitYard is not a pull request summarizer.

GitYard is not a code review bot.

GitYard is not a project management tool.

GitYard is not a CI provider pretending to be a platform.

GitYard is not a package registry.

GitYard is not a social network for developers.

GitYard is not a replacement for Git on day one.

GitYard is the collaboration layer that connects these things.

GitHub is a place where software work is stored.

GitYard is a place where software work is understood.

---

## The Product Vision

GitYard should feel like the interface developers expected GitHub to become.

When a developer opens a repository in GitYard, they should immediately understand:

* what the project is;
* what changed recently;
* what is risky;
* what needs review;
* what agents are doing;
* which issues matter;
* what releases are active;
* what is blocked;
* what context is missing;
* and what decisions need to be made.

When a developer opens a pull request in GitYard, they should not be dropped into a raw diff and comment thread.

They should see:

* the purpose of the PR;
* the risk level;
* the files grouped by concern;
* the tests that matter;
* the issue context;
* the agent involvement;
* the reviewer checklist;
* the unresolved decisions;
* the state of CI;
* and the merge recommendation.

When a developer opens an issue in GitYard, they should not have to read 70 comments to understand the current state.

They should see:

* the original problem;
* the current understanding;
* confirmed reproduction steps;
* related PRs;
* rejected approaches;
* maintainer decisions;
* agent attempts;
* open questions;
* affected versions;
* and next actions.

When a maintainer opens GitYard in the morning, they should know what matters.

Not everything that happened.

What matters.

---

## The Three-Stage Strategy

GitYard follows a three-stage path.

This is critical because trying to replace GitHub directly from day one creates too much friction.

The strategy is:

1. GitHub remains the source of truth.
2. GitYard becomes the daily interface.
3. GitYard becomes the source of truth.

This creates a practical bridge from today’s ecosystem to the next platform.

---

## Stage One: GitHub as Source of Truth

In Stage One, GitYard connects to GitHub repositories.

GitHub remains the canonical backend.

GitYard mirrors and enhances the experience.

### Capabilities

* Connect GitHub account.
* Connect GitHub organizations.
* Select repositories.
* Mirror repository metadata.
* Mirror pull requests.
* Mirror issues.
* Mirror commits.
* Mirror comments.
* Mirror reviews.
* Mirror CI checks.
* Mirror releases.
* Render a better repository dashboard.
* Render a better pull request page.
* Render a better issue page.
* Provide AI-generated project context.
* Provide agent-aware review workflows.
* Sync comments and reviews back to GitHub.

### Why This Matters

Developers do not need to migrate immediately.

Teams do not need to trust GitYard with write access at first.

Open-source projects do not need to abandon their GitHub communities.

GitYard proves value without asking users to leave the network.

The product must be useful while GitHub is still the system of record.

---

## Stage Two: GitYard as Daily Interface

In Stage Two, GitYard becomes the place developers actually use every day.

GitHub still exists underneath, but GitYard becomes the preferred surface.

### Capabilities

* Faster pull request review.
* Better issue triage.
* Repo-wide project memory.
* Agent-generated pull requests.
* Agent-generated issue updates.
* Agent-assisted review.
* Review queues.
* Maintainer dashboards.
* Risk-based PR sorting.
* Contributor trust views.
* Search across issues, PRs, commits, docs, releases, and comments.
* CI/check explanation.
* Release readiness views.
* Team workflows.
* Organization-wide project context.

### What Changes

GitHub becomes the database.

GitYard becomes the product.

This is the Graphite-style wedge, but with a broader scope.

Graphite focused heavily on stacked PRs and better review.

GitYard includes better review, but also issues, agents, context, project memory, identity, and migration.

GitYard should become the place where developers say:

> I still have GitHub, but I work in GitYard.

---

## Stage Three: GitYard as Source of Truth

In Stage Three, GitYard can host repositories directly.

GitHub becomes optional.

A project can choose to:

* keep GitHub as the source of truth;
* use GitHub as a mirror;
* archive GitHub;
* migrate fully to GitYard;
* mirror to Forgejo;
* mirror to Codeberg;
* mirror to GitLab;
* self-host GitYard;
* or federate with other Git-compatible systems.

### Capabilities

* Native Git hosting.
* Native pull requests.
* Native issues.
* Native reviews.
* Native releases.
* Native checks.
* Native agents.
* Native project memory.
* Native identity.
* GitHub mirror mode.
* One-click migration from GitHub.
* Export to GitHub.
* Export to Forgejo.
* Export to GitLab.
* Self-hosting.
* Organization-level hosting.
* Federation.

### The Goal

GitYard should not trap users.

GitYard should make GitHub optional.

---

## Core Product Areas

GitYard has several major product areas.

Each area should be useful on its own.

Together, they form the next-generation developer platform.

---

## Pull Requests

Pull requests remain pull requests.

Do not rename them.

Developers already understand PRs.

The problem is not the name.

The problem is that current PR interfaces do not understand enough context.

### GitYard PR Page

A GitYard PR page should include:

* PR title;
* author;
* source branch;
* target branch;
* linked issues;
* status;
* review status;
* CI/check status;
* risk level;
* summary;
* file groups;
* agent involvement;
* reviewer checklist;
* timeline;
* unresolved questions;
* suggested reviewers;
* merge readiness.

### PR Overview

The overview should answer:

* What changed?
* Why did it change?
* What areas of the codebase are affected?
* What is risky?
* What tests matter?
* What is missing?
* Who should review this?
* Was an agent involved?
* What changed since the last review?
* Is this ready to merge?

### PR Risk Levels

Risk should be computed from signals such as:

* changed files;
* changed lines;
* code ownership;
* dependency changes;
* database migrations;
* auth/security changes;
* CI failures;
* test coverage;
* historical flakiness;
* contributor history;
* agent involvement;
* size of diff;
* release proximity;
* production-critical paths.

Example:

```text
Risk: High

Reasons:
- Modifies authentication middleware
- Changes token refresh behavior
- Adds a new dependency
- Touches files owned by the security team
- Includes no new tests
- CI passed, but only unit tests ran
```

### PR File Grouping

Files should be grouped by concern:

* frontend;
* backend;
* database;
* authentication;
* dependencies;
* tests;
* documentation;
* configuration;
* generated files;
* migrations;
* CI;
* build system.

This is better than a flat file list.

### PR Timeline

A PR timeline should show the story:

```text
Issue opened
↓
Agent investigated
↓
Plan generated
↓
Human approved plan
↓
Agent opened PR
↓
CI failed
↓
Agent fixed failing tests
↓
Reviewer requested changes
↓
Human edited security logic
↓
CI passed
↓
Ready to merge
```

This is more valuable than a chronological dump of commits and comments.

---

## Issues

Issues are currently treated too much like comment threads.

GitYard treats issues as structured project memory.

### GitYard Issue Page

An issue should include:

* title;
* author;
* labels;
* status;
* priority;
* affected area;
* affected versions;
* reproduction steps;
* current summary;
* linked PRs;
* linked commits;
* related issues;
* agent attempts;
* maintainer decisions;
* open questions;
* next actions.

### Issue Summary

Instead of forcing maintainers to read every comment, GitYard should maintain a living summary:

```text
Current understanding:
- Bug affects Linux arm64 builds.
- It appears related to path normalization.
- Reproduction confirmed on Node 22.
- Two previous fixes were rejected because they broke Windows.
- Current candidate fix is PR #8842.
- Needs review from filesystem maintainers.
```

### Issue State

GitYard should distinguish between:

* new;
* needs reproduction;
* reproduced;
* needs design;
* ready for implementation;
* agent investigating;
* PR open;
* blocked;
* fixed;
* released;
* closed as duplicate;
* closed as not planned.

### Agent-Assisted Issues

Agents should be able to:

* summarize long threads;
* find duplicates;
* reproduce bugs;
* propose fixes;
* create draft PRs;
* update issue summaries;
* ask clarifying questions;
* link related code;
* explain why a previous approach failed.

But agents should not silently rewrite project state.

Important changes should be reviewable.

---

## Code Review

GitYard should make code review faster, safer, and more contextual.

### Review Modes

Different reviewers need different views.

A frontend reviewer may care about:

* components;
* UI changes;
* accessibility;
* bundle size;
* visual diffs;
* Storybook previews.

A backend reviewer may care about:

* API changes;
* database queries;
* migrations;
* latency;
* error handling;
* concurrency.

A security reviewer may care about:

* authentication;
* authorization;
* secrets;
* permissions;
* dependency changes;
* input validation.

GitYard should support role-specific review views.

### Review Checklist

Every PR should generate a checklist.

Example:

```text
Review checklist:
- Confirm token refresh behavior is backwards compatible.
- Verify legacy mobile clients are not broken.
- Check whether refresh tokens rotate too often.
- Confirm new dependency is necessary.
- Request security review before merge.
```

### Review Since Last Viewed

GitYard should show what changed since a reviewer last looked.

This matters because many PRs evolve over time.

Reviewers should not have to manually rediscover changes.

### Review Decision

Reviews should be treated as decisions.

A review is not just a comment.

A review should record:

* what was reviewed;
* what concerns were raised;
* what was approved;
* what was unresolved;
* what changed after approval;
* whether approval still applies.

---

## Agents

GitYard is agent-native.

Agents are not just bots.

Agents are actors in the development workflow.

### Agent Identity

Every agent should have an identity.

Example:

```text
Agent: refactor-bot
Owner: Tiago
Model: claude-sonnet
Permissions:
  - Can read repository
  - Can open draft PRs
  - Can run tests
  - Cannot merge
  - Cannot access secrets
  - Cannot modify billing code
```

### Agent Activity

GitYard should track:

* prompts;
* tasks;
* generated plans;
* files changed;
* tests run;
* failed attempts;
* human edits after agent work;
* reviewer feedback;
* accepted changes;
* reverted changes.

### Agent Trust

Agents should develop measurable trust profiles.

Signals:

* accepted PR rate;
* reverted PR rate;
* average review comments;
* test pass rate;
* frequency of security-sensitive changes;
* human intervention rate;
* code owner approval rate.

Example:

```text
Agent reliability:
- 86% of PRs accepted
- 4% reverted
- Average 2.1 review comments per PR
- 92% initial CI pass rate
- Cannot modify auth files without human approval
```

### Agent Tasks

Agents should support task types:

* investigate issue;
* summarize issue;
* propose implementation plan;
* generate draft PR;
* fix CI failure;
* write tests;
* update docs;
* refactor code;
* explain code;
* review PR;
* find related files;
* detect risky changes.

### Agent Constraints

Agents must be permissioned.

They should not have broad access by default.

Examples:

```text
Can open PRs: yes
Can push to main: no
Can merge: no
Can access secrets: no
Can modify security files: approval required
Can comment on issues: yes
Can close issues: no
```

The platform should make agent actions legible and auditable.

---

## Project Context

GitYard should maintain project memory.

A project is not just a repo.

A project has:

* decisions;
* conventions;
* architecture;
* ownership;
* history;
* previous bugs;
* failed approaches;
* release constraints;
* migration plans;
* active risks;
* coding standards;
* agent instructions.

### Project Memory

GitYard should build a persistent context layer from:

* README;
* docs;
* issues;
* PRs;
* reviews;
* commits;
* releases;
* comments;
* CI failures;
* agent plans;
* maintainer decisions.

This context helps humans and agents.

### Decision Records

Important decisions should become structured records.

Example:

```text
Decision: Do not support Node 18 after v3.0

Reason:
- Node 18 is EOL.
- Supporting it blocks dependency upgrades.
- Maintainers agreed in issue #4210.

Impact:
- v3.0 requires Node 20+.
- Docs must be updated.
- CI matrix should remove Node 18.
```

### Context for Agents

Agents should receive project-specific context:

* coding style;
* test commands;
* architecture notes;
* banned dependencies;
* preferred patterns;
* risky files;
* ownership rules;
* release constraints.

This prevents agents from repeatedly making the same mistakes.

---

## Code Search

GitYard should provide code search that understands project context.

Search should work across:

* code;
* issues;
* PRs;
* comments;
* docs;
* releases;
* commits;
* reviews;
* agent logs;
* decisions.

### Search Examples

```text
Where is auth token refresh handled?
```

```text
Why did we stop supporting Node 18?
```

```text
Show PRs that changed billing logic in the last 6 months.
```

```text
Find issues related to flaky Windows tests.
```

```text
Which agent modified this file?
```

GitHub search is useful.

GitYard search should be contextual.

---

## CI and Checks

GitYard should understand CI/checks, not just display them.

### Check View

A check should include:

* provider;
* status;
* duration;
* logs;
* artifacts;
* failure summary;
* likely cause;
* related files;
* historical flakiness;
* whether failure is blocking;
* suggested next action.

### CI Explanation

Instead of:

```text
test-linux-arm64 failed
```

GitYard should show:

```text
The Linux arm64 test failed in path normalization tests.

Likely related files in this PR:
- src/path/normalize.ts
- tests/path/linux-arm64.test.ts

This test has failed 3 times in the last 30 days, but only once on main.
Failure is likely related to this PR.
```

### CI Providers

GitYard should not depend on one CI system.

It should support:

* GitHub Actions;
* Buildkite;
* CircleCI;
* Depot;
* Blacksmith;
* self-hosted runners;
* custom checks.

---

## Releases

Releases should be first-class.

A release page should answer:

* what changed;
* when it shipped;
* which PRs were included;
* which issues were fixed;
* which commits are included;
* which artifacts were published;
* which breaking changes exist;
* which migrations are needed;
* which security fixes are included;
* who approved the release;
* whether rollback is possible.

### Release Page Example

```text
Version: 2.4.0
Status: Stable
Date: 2026-05-28
Previous version: 2.3.7

Included:
- 184 commits
- 37 PRs
- 12 fixed issues
- 2 breaking changes
- 1 security fix

Artifacts:
- npm package
- Docker image
- binary
- checksum
- SBOM
- provenance

Risk:
- Medium
```

---

## Identity and Reputation

GitHub profiles are valuable.

GitYard should preserve and extend that idea.

### Developer Profile

A GitYard profile should show:

* GitHub identity;
* connected accounts;
* repositories;
* PRs;
* reviews;
* issues;
* packages;
* maintainer roles;
* verified contributions;
* agent ownership;
* reputation signals.

### Portable Identity

Long term, GitYard identity should be portable across:

* GitHub;
* GitLab;
* Forgejo;
* Codeberg;
* self-hosted GitYard;
* package registries;
* other forges.

This matters because the developer world may fragment.

If code moves across platforms, identity must survive.

### Trust Graph

GitYard should help answer:

* Has this contributor worked on this project before?
* Have their PRs been accepted?
* Have their changes been reverted?
* Are they trusted by maintainers?
* Are they associated with suspicious activity?
* Are they using agents responsibly?
* Do they maintain important packages?

The goal is not to create a shallow score.

The goal is to provide context.

---

## Repository Mirroring

GitYard begins by mirroring GitHub repositories.

### Mirrored Data

GitYard should mirror:

* repository metadata;
* branches;
* commits;
* pull requests;
* issues;
* comments;
* reviews;
* check runs;
* releases;
* labels;
* milestones;
* code owners;
* files;
* discussions where available;
* project metadata.

### Sync Direction

Stage One:

```text
GitHub → GitYard
GitYard comments/reviews → GitHub
```

Stage Two:

```text
GitHub ↔ GitYard
```

Stage Three:

```text
GitYard → GitHub mirror
```

### Mirror Guarantees

GitYard should make sync state clear.

Every repo should show:

* last synced time;
* sync status;
* webhook status;
* missing permissions;
* failed syncs;
* data freshness;
* GitHub source link;
* GitYard canonical status.

---

## Migration

Migration should be gradual.

GitYard should not ask projects to leave GitHub immediately.

### Migration Modes

#### Read-Only Mode

GitYard mirrors GitHub.

No write access.

Good for:

* public repos;
* demos;
* trust building;
* open-source browsing.

#### Review Mode

GitYard can post comments and reviews back to GitHub.

Good for:

* teams testing workflow;
* maintainers trying review features.

#### Workflow Mode

GitYard manages PRs, issues, agents, and project context while GitHub remains backend.

Good for:

* daily use.

#### Source of Truth Mode

GitYard becomes canonical.

GitHub becomes a mirror.

Good for:

* teams ready to leave GitHub;
* self-hosted organizations;
* open-source communities wanting independence.

---

## Developer Experience

GitYard must feel fast, sharp, and developer-native.

### Product Requirements

* Fast page loads.
* Keyboard-first navigation.
* Excellent diff viewer.
* Clean file tree.
* Minimal loading jank.
* Good dark mode.
* Excellent search.
* URL compatibility with GitHub where possible.
* No unnecessary renaming of familiar concepts.
* Clear sync status.
* Strong command palette.
* Good mobile read-only experience.
* Great empty states.
* Transparent agent actions.

### URL Model

GitYard URLs should map cleanly from GitHub.

Example:

```text
github.com/vercel/next.js/pull/12345
```

Could map to:

```text
GitYard.dev/vercel/next.js/pull/12345
```

or during development:

```text
GitYard.vercel.app/vercel/next.js/pull/12345
```

This makes the product easy to understand.

---

## System Architecture

GitYard should be built as a modular platform.

### High-Level Architecture

```text
Frontend
├── Web app
├── Browser extension
├── CLI
└── Editor integrations

Application Layer
├── Auth service
├── GitHub integration service
├── Repository mirror service
├── Pull request service
├── Issue service
├── Review service
├── Agent service
├── Search service
├── CI/check service
├── Release service
├── Identity service
└── Notification service

Storage Layer
├── Postgres
├── Redis
├── Object storage
├── Search index
├── Vector index
├── Event log
└── Git object storage later

External Integrations
├── GitHub API
├── GitHub webhooks
├── Git providers
├── CI providers
├── LLM providers
├── OAuth providers
└── package registries
```

### Suggested Initial Stack

For a small team or solo developer:

```text
Framework: Next.js
Language: TypeScript
Database: Postgres
ORM: Drizzle or Prisma
Auth: Auth.js or custom GitHub OAuth
Jobs: Inngest, Trigger.dev, or BullMQ
Cache: Redis
Search: Meilisearch, Typesense, or Postgres full-text initially
Vector Search: pgvector initially
GitHub API: Octokit
LLM: OpenAI / Anthropic / local later
Hosting: Vercel, Fly.io, or Railway
Storage: S3-compatible object storage
```

### Monorepo Structure

```text
GitYard/
├── apps/
│   ├── web/
│   └── worker/
├── packages/
│   ├── github/
│   ├── db/
│   ├── ai/
│   ├── agents/
│   ├── diff/
│   ├── ui/
│   ├── config/
│   └── shared/
├── docs/
├── examples/
└── README.md
```

---

## Data Model

Core entities:

```text
User
Organization
Repository
RepositoryMirror
PullRequest
Issue
Review
Comment
Commit
Branch
FileChange
CheckRun
Release
Agent
AgentRun
ProjectMemory
DecisionRecord
SyncEvent
WebhookEvent
```

### Repository

```text
Repository
- id
- provider
- owner
- name
- full_name
- default_branch
- visibility
- description
- source_url
- canonical_provider
- created_at
- updated_at
```

### Pull Request

```text
PullRequest
- id
- repository_id
- provider_id
- number
- title
- body
- author_id
- state
- source_branch
- target_branch
- mergeable
- draft
- risk_level
- summary
- review_status
- check_status
- created_at
- updated_at
- synced_at
```

### Agent

```text
Agent
- id
- owner_id
- name
- description
- provider
- model
- permissions
- created_at
- updated_at
```

### Agent Run

```text
AgentRun
- id
- agent_id
- repository_id
- pull_request_id
- issue_id
- task_type
- prompt
- summary
- status
- files_changed
- tests_run
- result
- created_at
- completed_at
```

### Project Memory

```text
ProjectMemory
- id
- repository_id
- type
- title
- content
- source
- confidence
- created_at
- updated_at
```

---

## Agent Model

GitYard agents are structured actors.

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

### Agent Run Lifecycle

```text
created
queued
running
needs_approval
completed
failed
cancelled
superseded
```

### Agent Output Types

```text
summary
plan
comment
review
patch
pull_request
test_result
decision_suggestion
```

### Agent Safety Rules

Agents should:

* operate with least privilege;
* explain actions;
* produce reviewable output;
* never silently modify protected branches;
* never access secrets unless explicitly allowed;
* mark generated work clearly;
* preserve failed attempts as useful context;
* require human approval for risky changes.

---

## Permissions Model

GitYard should support fine-grained permissions.

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

Default agent permissions should be conservative.

---

## API Design

GitYard should have a public API.

### REST Examples

```text
GET /api/repos/:owner/:repo
GET /api/repos/:owner/:repo/pulls
GET /api/repos/:owner/:repo/pulls/:number
GET /api/repos/:owner/:repo/issues
GET /api/repos/:owner/:repo/issues/:number
POST /api/repos/:owner/:repo/pulls/:number/analyze
POST /api/repos/:owner/:repo/agents/:agentId/run
```

### Future GraphQL

GraphQL may be useful for complex repo views.

Example:

```graphql
query PullRequestOverview($owner: String!, $repo: String!, $number: Int!) {
  repository(owner: $owner, name: $repo) {
    pullRequest(number: $number) {
      title
      author {
        login
      }
      riskLevel
      summary
      checks {
        status
        conclusion
      }
      fileGroups {
        name
        files {
          path
        }
      }
    }
  }
}
```

---

## CLI

GitYard should have a CLI.

### Commands

```bash
GitYard login
GitYard repo connect
GitYard repo sync
GitYard pr view
GitYard pr analyze
GitYard pr review
GitYard issue summarize
GitYard agent run
GitYard status
```

### Example

```bash
GitYard pr analyze https://github.com/vercel/next.js/pull/12345
```

Output:

```text
Risk: Medium
Summary: Updates routing behavior for intercepted routes.
Review focus:
- Confirm backwards compatibility
- Check app router tests
- Verify docs update
```

---

## Browser Extension

A browser extension can make adoption easier.

### Features

* Add “Open in GitYard” button on GitHub PRs.
* Add GitYard summary sidebar.
* Show PR risk badge.
* Show agent involvement badge.
* Show issue summary.
* Allow URL redirect from GitHub to GitYard.

This allows GitYard to live inside existing GitHub workflows.

---

## Open Source Strategy

GitYard should be open source.

This project is about trust.

A closed replacement for GitHub would be difficult to trust.

### Open Source Components

Open source:

* web app;
* GitHub integration;
* PR analysis logic;
* issue analysis logic;
* diff rendering;
* agent framework;
* CLI;
* docs;
* self-hosting configuration.

Potentially private later:

* hosted deployment secrets;
* abuse detection internals;
* billing;
* enterprise-only integrations.

### License

Possible licenses:

* AGPL if the goal is to ensure hosted modifications stay open.
* Apache 2.0 if the goal is maximum adoption and company friendliness.
* MIT if the goal is simplicity and contributor comfort.

A reasonable starting point:

```text
Apache-2.0
```

This makes adoption easier.

If the product becomes serious infrastructure, licensing can be revisited carefully.

---

## Business Model

GitYard can be open source and still become a company.

### Free

* public repositories;
* open-source projects;
* read-only GitHub analysis;
* local/self-hosted usage.

### Paid

* private repositories;
* team dashboards;
* organization sync;
* advanced agent workflows;
* long-term project memory;
* enterprise permissions;
* compliance logs;
* SSO;
* audit trails;
* managed hosting;
* premium CI/check integrations;
* advanced search;
* hosted agents.

### Funding Paths

Possible funding paths:

* GitHub Sponsors;
* Polar;
* OpenCollective;
* angel investment;
* devtool founders;
* seed funding;
* open-source grants;
* enterprise pilots.

The right fundraising story:

> GitHub remains the system of record for now, but software teams need an AI-native collaboration layer for pull requests, issues, agents, reviews, and project context. GitYard is that layer, and it has a path to becoming the source of truth.

---

## Brand

### Name

```text
GitYard
```

### GitHub Org

```text
github.com/GitYard-dev
```

### Main Repo

```text
github.com/GitYard-dev/GitYard
```

### Description

```text
AI-native collaboration for GitHub repos, PRs, issues, agents, and code review.
```

### Taglines

```text
The AI-native collaboration layer for GitHub.
```

```text
Understand code, context, PRs, issues, and agents in one place.
```

```text
GitHub shows the diff. GitYard explains the decision.
```

```text
A developer platform for humans and agents.
```

### Tone

GitYard should feel:

* serious;
* technical;
* fast;
* open;
* ambitious;
* developer-native;
* not corporate;
* not AI-hype slop;
* not a toy.

Avoid language like:

* “starting with”;
* “just a wrapper”;
* “simple AI summaries”;
* “GitHub killer”;
* “revolutionary”;
* “magical.”

Use language like:

* collaboration layer;
* project context;
* agent-native;
* pull requests;
* issues;
* code review;
* source of truth;
* mirror;
* migration path;
* developer platform.

---

## Org and Repo Structure

Initial GitHub organization:

```text
GitYard-dev
```

Initial repository:

```text
GitYard
```

Path:

```text
github.com/GitYard-dev/GitYard
```

Future repos:

```text
GitYard-dev/GitYard
GitYard-dev/cli
GitYard-dev/docs
GitYard-dev/sdk
GitYard-dev/agents
GitYard-dev/examples
GitYard-dev/diff
GitYard-dev/extension
```

But do not split too early.

Start with one monorepo.

---

## Initial Milestones

GitYard should be scoped as a full platform, but built in milestones.

The milestones should be vertical slices.

Each milestone should produce a working product, not an isolated backend component.

### Milestone 1: GitHub Connection and Repo Mirror

Goals:

* GitHub OAuth.
* Connect a GitHub repository.
* Mirror repository metadata.
* Mirror pull requests.
* Mirror issues.
* Mirror commits.
* Store sync state.
* Display repo dashboard.

Deliverable:

```text
A user can connect a GitHub repo and see GitYard’s repo overview.
```

### Milestone 2: Pull Request Interface

Goals:

* Render PR list.
* Render PR page.
* Show changed files.
* Show checks.
* Show comments.
* Show reviews.
* Show linked issues.
* Generate PR summary.
* Generate risk score.
* Generate review checklist.

Deliverable:

```text
A user can open a GitHub PR in GitYard and understand it faster than on GitHub.
```

### Milestone 3: Issue Interface

Goals:

* Render issue list.
* Render issue page.
* Summarize issue threads.
* Extract reproduction steps.
* Link related PRs.
* Track current issue state.
* Identify duplicates.
* Generate next actions.

Deliverable:

```text
A maintainer can triage issues faster in GitYard than on GitHub.
```

### Milestone 4: Agent Workflows

Goals:

* Define agents.
* Run agent tasks.
* Generate implementation plans.
* Generate draft PRs.
* Summarize agent activity.
* Track agent permissions.
* Show agent involvement on PRs and issues.

Deliverable:

```text
A user can ask an agent to investigate an issue and open a draft PR with full context.
```

### Milestone 5: Review Workflow

Goals:

* Review queue.
* Risk-based sorting.
* Reviewer assignment.
* Code owner awareness.
* Review since last viewed.
* Comment drafting.
* Review submission back to GitHub.

Deliverable:

```text
A team can use GitYard as its daily PR review interface.
```

### Milestone 6: Project Memory

Goals:

* Build repo context index.
* Extract architecture notes.
* Track decisions.
* Store project conventions.
* Feed context to agents.
* Search across issues, PRs, docs, commits, and reviews.

Deliverable:

```text
GitYard understands the project, not just individual PRs.
```

### Milestone 7: GitHub Writeback

Goals:

* Post comments.
* Submit reviews.
* Update labels.
* Update issue summaries.
* Open PRs.
* Sync state back to GitHub.

Deliverable:

```text
GitHub remains source of truth, but GitYard becomes the active collaboration surface.
```

### Milestone 8: Native Hosting Foundation

Goals:

* Git object storage.
* Native repos.
* Native issues.
* Native PRs.
* Native reviews.
* GitHub mirror mode.
* Export/migration.

Deliverable:

```text
A repository can live natively on GitYard while syncing to GitHub.
```

---

## Long-Term Roadmap

### Native Git Hosting

GitYard should eventually support native Git remotes.

```bash
git remote add origin git@GitYard.dev:org/repo.git
```

### One-Click GitHub Migration

A GitHub repo should be migratable into GitYard with:

* code;
* issues;
* PRs;
* comments;
* releases;
* labels;
* milestones;
* reviews;
* CI history where possible;
* contributor mapping.

### GitHub Mirror Mode

After migration, GitHub can remain a mirror.

This preserves discoverability while allowing GitYard to become canonical.

### Federation

GitYard should eventually support collaboration across:

* GitYard Cloud;
* self-hosted GitYard;
* Forgejo;
* Codeberg;
* GitLab;
* GitHub mirrors.

### Portable Identity

A developer’s identity should not disappear when projects leave GitHub.

GitYard should build toward a portable developer profile.

### Agent Marketplace

Eventually, users may install trusted agents for:

* dependency updates;
* security review;
* test generation;
* documentation;
* migration;
* refactoring;
* release management.

### Enterprise

Enterprise features may include:

* SSO;
* audit logs;
* custom retention;
* self-hosting;
* compliance controls;
* private agents;
* policy engine;
* approval workflows;
* sensitive file controls.

---

## Principles

### 1. Keep Developer Vocabulary

Do not rename concepts without a strong reason.

Use:

* repo;
* pull request;
* issue;
* review;
* branch;
* commit;
* release;
* action;
* check.

Developers already understand these words.

### 2. GitHub Compatibility First

GitHub is where the network is.

GitYard must work with GitHub before replacing GitHub.

### 3. Context Over Raw Data

Do not just show events.

Explain meaning.

### 4. Agents Are Actors

Agents should have identities, permissions, logs, and reputations.

### 5. Review Is a Decision Surface

A PR page should help reviewers decide whether to merge.

### 6. Issues Are Project Memory

Issues should accumulate structured knowledge, not just comments.

### 7. Trust Requires Transparency

Sync state, agent actions, permissions, and generated content must be visible.

### 8. Open Source Matters

A platform for code collaboration should be inspectable.

### 9. Migration Must Be Gradual

Do not ask users to abandon GitHub immediately.

Earn the right to become the source of truth.

### 10. Build the Full Platform in Slices

Do not build half a product.

Build vertical slices of the full vision.

Each milestone should be usable.

---

## Why This Can Work

GitYard can work because the developer workflow is changing faster than GitHub’s core experience.

Agents are increasing the amount of code being written.

Maintainers are under more review pressure.

Open-source projects are dealing with more automated contributions.

Teams need better context.

Raw diffs are not enough.

Raw issue threads are not enough.

Green checks are not enough.

GitHub remains important, but the daily interface for understanding code can move somewhere else first.

That is the opening.

GitYard does not need to replace GitHub immediately.

It needs to become the place where developers prefer to understand and manage GitHub work.

Once that happens, GitYard can become the place where the work lives.

---

## One-Sentence Summary

GitYard is the AI-native collaboration layer for GitHub, designed to evolve from a smarter interface for repos, PRs, issues, agents, and reviews into the source of truth for modern software projects.

---

## Short Pitch

GitHub made Git social.

GitYard makes software collaboration intelligent.

It connects to GitHub repositories, mirrors project context, and gives developers a better interface for pull requests, issues, reviews, agents, CI, releases, and codebase understanding.

GitHub shows what happened.

GitYard explains what matters.

---

## Repository Description

```text
AI-native collaboration for GitHub repos, PRs, issues, agents, and code review.
```

---

## README Opening

```md
# GitYard

AI-native collaboration for GitHub repos, pull requests, issues, agents, code review, and project context.

GitYard connects to GitHub repositories, mirrors project context, and provides a faster interface for pull requests, issues, reviews, agent workflows, and codebase understanding.

GitHub shows the diff.

GitYard explains the decision.
```

---

## Final Positioning

GitYard is not trying to be a slightly better GitHub clone.

GitYard is the bridge from today’s GitHub-centered world to the next developer platform.

At first, GitHub remains the source of truth.

Then GitYard becomes the daily interface.

Then GitYard becomes the source of truth.

That is the path.

That is the product.

That is GitYard.
