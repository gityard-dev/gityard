export type LogicalSchema =
  | "auth"
  | "github"
  | "repos"
  | "pull_requests"
  | "issues"
  | "reviews"
  | "agents"
  | "ai"
  | "context"
  | "search"
  | "audit";

export type StorageClass = "postgres" | "object_storage" | "search_index" | "git_mirror";

export type TableContract = {
  readonly schema: LogicalSchema;
  readonly table: string;
  readonly storage: StorageClass;
  readonly owner: string;
  readonly notes?: string;
};

export const tableContracts = {
  users: { schema: "auth", table: "users", storage: "postgres", owner: "auth" },
  organizations: { schema: "auth", table: "organizations", storage: "postgres", owner: "auth" },
  memberships: { schema: "auth", table: "memberships", storage: "postgres", owner: "auth" },
  sessions: { schema: "auth", table: "sessions", storage: "postgres", owner: "auth" },
  encryptedTokens: {
    schema: "auth",
    table: "encrypted_tokens",
    storage: "postgres",
    owner: "auth",
    notes: "Token ciphertext only; plaintext tokens must never be stored.",
  },
  githubInstallations: {
    schema: "github",
    table: "installations",
    storage: "postgres",
    owner: "github",
  },
  webhookEvents: {
    schema: "github",
    table: "webhook_events",
    storage: "postgres",
    owner: "github",
    notes: "Raw payloads live in object storage; this table stores metadata and object keys.",
  },
  repositories: { schema: "repos", table: "repositories", storage: "postgres", owner: "repos" },
  repositoryMirrors: {
    schema: "repos",
    table: "repository_mirrors",
    storage: "postgres",
    owner: "repos",
  },
  branches: { schema: "repos", table: "branches", storage: "postgres", owner: "repos" },
  commits: { schema: "repos", table: "commits", storage: "postgres", owner: "repos" },
  syncEvents: { schema: "repos", table: "sync_events", storage: "postgres", owner: "repos" },
  syncCheckpoints: {
    schema: "repos",
    table: "sync_checkpoints",
    storage: "postgres",
    owner: "repos",
  },
  pullRequests: {
    schema: "pull_requests",
    table: "pull_requests",
    storage: "postgres",
    owner: "pull_requests",
  },
  fileChanges: {
    schema: "pull_requests",
    table: "file_changes",
    storage: "postgres",
    owner: "pull_requests",
    notes: "Large patches live in object storage.",
  },
  issues: { schema: "issues", table: "issues", storage: "postgres", owner: "issues" },
  comments: { schema: "issues", table: "comments", storage: "postgres", owner: "issues" },
  reviews: { schema: "reviews", table: "reviews", storage: "postgres", owner: "reviews" },
  reviewComments: {
    schema: "reviews",
    table: "review_comments",
    storage: "postgres",
    owner: "reviews",
  },
  checkRuns: { schema: "reviews", table: "check_runs", storage: "postgres", owner: "checks" },
  releases: { schema: "repos", table: "releases", storage: "postgres", owner: "releases" },
  agents: { schema: "agents", table: "agents", storage: "postgres", owner: "agents" },
  agentRuns: { schema: "agents", table: "agent_runs", storage: "postgres", owner: "agents" },
  aiGenerations: { schema: "ai", table: "ai_generations", storage: "postgres", owner: "ai" },
  projectMemory: {
    schema: "context",
    table: "project_memory",
    storage: "postgres",
    owner: "context",
  },
  decisionRecords: {
    schema: "context",
    table: "decision_records",
    storage: "postgres",
    owner: "context",
  },
  permissions: { schema: "auth", table: "permissions", storage: "postgres", owner: "auth" },
  auditLogs: { schema: "audit", table: "audit_logs", storage: "postgres", owner: "audit" },
} as const satisfies Record<string, TableContract>;

export const objectStorageContracts = {
  rawWebhookPayloads: "github/webhooks/{repositoryId}/{eventId}.json",
  pullRequestDiffs: "repos/{repositoryId}/pulls/{pullRequestId}/diffs/{headSha}.patch",
  ciLogs: "repos/{repositoryId}/checks/{checkRunId}/logs.txt",
  releaseArtifacts: "repos/{repositoryId}/releases/{releaseId}/artifacts/{artifactName}",
  agentRunTraces: "repos/{repositoryId}/agent-runs/{agentRunId}/trace.json",
  largeAiOutputs: "repos/{repositoryId}/ai/{generationId}/output.json",
} as const;

export const migrationContract = {
  tool: "drizzle-kit",
  directory: "packages/db/migrations",
  naming: "YYYYMMDDHHMMSS_descriptive_name.sql",
  rollbackPolicy:
    "Prefer forward-only migrations; create explicit corrective migrations instead of editing applied migrations.",
} as const;
