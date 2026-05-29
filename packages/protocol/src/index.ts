import { z } from "zod";

export const idSchema = z.string().min(1);
export const isoDateTimeSchema = z.string().datetime();
export const providerSchema = z.enum(["github", "gityard", "gitlab", "forgejo", "codeberg"]);
export const riskLevelSchema = z.enum(["none", "low", "medium", "high"]);
export const actorTypeSchema = z.enum(["anonymous", "user", "agent", "system"]);

export const actorSchema = z.object({
  type: actorTypeSchema,
  id: idSchema.optional(),
  displayName: z.string().optional(),
});

export const paginationRequestSchema = z.object({
  cursor: z.string().optional(),
  limit: z.number().int().min(1).max(100).default(50),
});

export const pageInfoSchema = z.object({
  nextCursor: z.string().nullable(),
  hasNextPage: z.boolean(),
});

export const apiErrorCodeSchema = z.enum([
  "bad_request",
  "unauthorized",
  "forbidden",
  "not_found",
  "conflict",
  "rate_limited",
  "validation_failed",
  "provider_disabled",
  "provider_unavailable",
  "sync_pending",
  "internal_error",
]);

export const apiErrorSchema = z.object({
  code: apiErrorCodeSchema,
  message: z.string(),
  details: z.record(z.string(), z.unknown()).optional(),
});

export const apiSuccessSchema = <Data extends z.ZodType>(data: Data) =>
  z.object({
    ok: z.literal(true),
    data,
    requestId: idSchema.optional(),
  });

export const apiFailureSchema = z.object({
  ok: z.literal(false),
  error: apiErrorSchema,
  requestId: idSchema.optional(),
});

export const healthResponseSchema = z.object({
  service: z.string(),
  status: z.enum(["ok", "degraded", "unavailable"]),
  version: z.literal("0.0.1"),
  checks: z.record(z.string(), z.enum(["ok", "degraded", "unavailable"])).default({}),
});

export const userPermissionSchema = z.enum([
  "repo:read",
  "repo:write",
  "pr:read",
  "pr:write",
  "issue:read",
  "issue:write",
  "review:create",
  "review:submit",
  "agent:run",
  "agent:approve",
  "settings:manage",
  "billing:manage",
]);

export const agentPermissionSchema = z.enum([
  "agent:read_repo",
  "agent:open_pr",
  "agent:comment",
  "agent:run_tests",
  "agent:modify_docs",
  "agent:modify_code",
  "agent:modify_sensitive_files",
  "agent:access_secrets",
  "agent:merge",
]);

export const defaultAgentPermissions = {
  "agent:read_repo": true,
  "agent:comment": true,
  "agent:open_pr": false,
  "agent:run_tests": false,
  "agent:modify_docs": false,
  "agent:modify_code": false,
  "agent:modify_sensitive_files": false,
  "agent:access_secrets": false,
  "agent:merge": false,
} as const satisfies Record<z.infer<typeof agentPermissionSchema>, boolean>;

export const userSchema = z.object({
  id: idSchema,
  provider: providerSchema,
  providerId: z.string().optional(),
  login: z.string(),
  displayName: z.string().optional(),
  avatarUrl: z.string().url().optional(),
});

export const organizationSchema = z.object({
  id: idSchema,
  provider: providerSchema,
  providerId: z.string().optional(),
  login: z.string(),
  displayName: z.string().optional(),
});

export const repositorySchema = z.object({
  id: idSchema,
  provider: providerSchema,
  providerId: z.string().optional(),
  owner: z.string(),
  name: z.string(),
  fullName: z.string(),
  defaultBranch: z.string(),
  visibility: z.enum(["public", "private", "internal"]),
  description: z.string().nullable(),
  sourceUrl: z.string().url().optional(),
  canonicalProvider: providerSchema,
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
});

export const repositoryMirrorSchema = z.object({
  id: idSchema,
  repositoryId: idSchema,
  mirrorRoot: z.string(),
  barePath: z.string(),
  defaultBranch: z.string(),
  lastFetchedAt: isoDateTimeSchema.nullable(),
  status: z.enum(["pending", "ready", "fetching", "failed"]),
  lastError: z.string().nullable(),
});

export const syncCheckpointSchema = z.object({
  id: idSchema,
  repositoryId: idSchema,
  provider: providerSchema,
  resource: z.enum([
    "repository",
    "git",
    "pull_requests",
    "issues",
    "reviews",
    "checks",
    "releases",
  ]),
  cursor: z.string().nullable(),
  syncedAt: isoDateTimeSchema.nullable(),
  rateLimitResetAt: isoDateTimeSchema.nullable(),
});

export const gitRefSchema = z.object({
  name: z.string(),
  sha: z.string(),
});

export const fileChangeStatusSchema = z.enum([
  "added",
  "modified",
  "deleted",
  "renamed",
  "copied",
  "unchanged",
]);

export const fileChangeSchema = z.object({
  path: z.string(),
  previousPath: z.string().optional(),
  status: fileChangeStatusSchema,
  additions: z.number().int().nonnegative(),
  deletions: z.number().int().nonnegative(),
  patchObjectKey: z.string().optional(),
  isBinary: z.boolean().default(false),
  isGenerated: z.boolean().default(false),
  isTooLarge: z.boolean().default(false),
});

export const fileGroupSchema = z.object({
  name: z.enum([
    "frontend",
    "backend",
    "database",
    "authentication",
    "dependencies",
    "tests",
    "documentation",
    "configuration",
    "generated",
    "migrations",
    "ci",
    "build_system",
    "other",
  ]),
  files: z.array(z.string()),
});

export const checkRunSchema = z.object({
  id: idSchema,
  repositoryId: idSchema,
  pullRequestId: idSchema.optional(),
  providerId: z.string().optional(),
  name: z.string(),
  status: z.enum(["queued", "in_progress", "completed", "waiting", "requested"]),
  conclusion: z
    .enum(["success", "failure", "neutral", "cancelled", "skipped", "timed_out", "action_required"])
    .nullable(),
  startedAt: isoDateTimeSchema.nullable(),
  completedAt: isoDateTimeSchema.nullable(),
  logsUrl: z.string().url().optional(),
  logsObjectKey: z.string().optional(),
  failureSummary: z.string().nullable(),
  relatedFiles: z.array(z.string()).default([]),
  flakiness: z.enum(["unknown", "unlikely", "possible", "likely"]).default("unknown"),
});

export const reviewStateSchema = z.enum([
  "commented",
  "approved",
  "changes_requested",
  "dismissed",
  "pending",
]);

export const commentSchema = z.object({
  id: idSchema,
  author: actorSchema,
  body: z.string(),
  path: z.string().optional(),
  line: z.number().int().optional(),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
});

export const reviewSchema = z.object({
  id: idSchema,
  author: actorSchema,
  state: reviewStateSchema,
  body: z.string().nullable(),
  submittedAt: isoDateTimeSchema.nullable(),
  comments: z.array(commentSchema).default([]),
  isStale: z.boolean().default(false),
});

export const analysisStateSchema = z.enum([
  "not_requested",
  "pending",
  "ready",
  "stale",
  "disabled",
  "failed",
]);

export const pullRequestSchema = z.object({
  id: idSchema,
  repositoryId: idSchema,
  providerId: z.string().optional(),
  number: z.number().int().positive(),
  title: z.string(),
  body: z.string().nullable(),
  author: actorSchema,
  state: z.enum(["open", "closed", "merged"]),
  sourceBranch: gitRefSchema,
  targetBranch: gitRefSchema,
  mergeable: z.boolean().nullable(),
  draft: z.boolean(),
  riskLevel: riskLevelSchema,
  riskReasons: z.array(z.string()).default([]),
  summary: z.string().nullable(),
  reviewStatus: z.enum(["none", "commented", "approved", "changes_requested", "mixed"]),
  checkStatus: z.enum(["none", "pending", "success", "failure", "mixed"]),
  analysisState: analysisStateSchema,
  lastAnalyzedCommitSha: z.string().nullable(),
  fileGroups: z.array(fileGroupSchema).default([]),
  reviewerChecklist: z.array(z.string()).default([]),
  unresolvedQuestions: z.array(z.string()).default([]),
  agentInvolvement: z.array(idSchema).default([]),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
  syncedAt: isoDateTimeSchema.nullable(),
});

export const issueStateSchema = z.enum([
  "new",
  "needs_reproduction",
  "reproduced",
  "needs_design",
  "ready_for_implementation",
  "agent_investigating",
  "pr_open",
  "blocked",
  "fixed",
  "released",
  "closed_as_duplicate",
  "closed_as_not_planned",
]);

export const duplicateCandidateSchema = z.object({
  issueId: idSchema,
  confidence: z.number().min(0).max(1),
  evidence: z.array(z.string()).default([]),
});

export const issueSchema = z.object({
  id: idSchema,
  repositoryId: idSchema,
  providerId: z.string().optional(),
  number: z.number().int().positive(),
  title: z.string(),
  body: z.string().nullable(),
  author: actorSchema,
  labels: z.array(z.string()).default([]),
  state: issueStateSchema,
  priority: z.enum(["none", "low", "medium", "high", "urgent"]).default("none"),
  affectedArea: z.string().nullable(),
  affectedVersions: z.array(z.string()).default([]),
  reproductionSteps: z.array(z.string()).default([]),
  currentSummary: z.string().nullable(),
  linkedPullRequestIds: z.array(idSchema).default([]),
  relatedIssueIds: z.array(idSchema).default([]),
  duplicateCandidates: z.array(duplicateCandidateSchema).default([]),
  agentAttempts: z.array(idSchema).default([]),
  maintainerDecisions: z.array(idSchema).default([]),
  openQuestions: z.array(z.string()).default([]),
  nextActions: z.array(z.string()).default([]),
  analysisState: analysisStateSchema,
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
  syncedAt: isoDateTimeSchema.nullable(),
});

export const releaseSchema = z.object({
  id: idSchema,
  repositoryId: idSchema,
  providerId: z.string().optional(),
  version: z.string().optional(),
  tag: z.string(),
  status: z.enum(["draft", "prerelease", "published", "archived"]),
  previousVersion: z.string().nullable(),
  includedCommitShas: z.array(z.string()).default([]),
  includedPullRequestIds: z.array(idSchema).default([]),
  fixedIssueIds: z.array(idSchema).default([]),
  breakingChanges: z.array(z.string()).default([]),
  securityFixes: z.array(z.string()).default([]),
  artifactObjectKeys: z.array(z.string()).default([]),
  changelog: z.string().nullable(),
  rollbackNotes: z.string().nullable(),
  publishedAt: isoDateTimeSchema.nullable(),
});

export const aiProviderSchema = z.enum(["disabled", "ollama", "openai-compatible"]);

export const aiProviderSettingsSchema = z.object({
  provider: aiProviderSchema,
  baseUrl: z.string().url().optional(),
  chatModel: z.string().optional(),
  embeddingModel: z.string().optional(),
  byoKeyConfigured: z.boolean().default(false),
});

export const aiGenerationSchema = z.object({
  id: idSchema,
  repositoryId: idSchema.optional(),
  provider: aiProviderSchema,
  model: z.string().nullable(),
  promptVersion: z.string(),
  inputHash: z.string(),
  outputType: z.enum([
    "summary",
    "risk",
    "checklist",
    "issue_state",
    "context",
    "decision_suggestion",
  ]),
  status: z.enum(["completed", "disabled", "failed", "invalid"]),
  validationErrors: z.array(z.string()).default([]),
  createdAt: isoDateTimeSchema,
});

export const agentRunLifecycleSchema = z.enum([
  "created",
  "queued",
  "running",
  "needs_approval",
  "completed",
  "failed",
  "cancelled",
  "superseded",
]);

export const agentTaskTypeSchema = z.enum([
  "investigate_issue",
  "summarize_issue",
  "propose_plan",
  "open_pr",
  "review_pr",
  "fix_ci",
  "write_tests",
  "update_docs",
  "refactor",
  "explain_code",
  "triage_issue",
  "find_duplicates",
]);

export const agentOutputTypeSchema = z.enum([
  "summary",
  "plan",
  "comment",
  "review",
  "patch",
  "pull_request",
  "test_result",
  "decision_suggestion",
]);

export const agentSchema = z.object({
  id: idSchema,
  ownerId: idSchema,
  name: z.string(),
  description: z.string().nullable(),
  provider: aiProviderSchema,
  model: z.string().nullable(),
  permissions: z.record(agentPermissionSchema, z.boolean()),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
});

export const agentRunSchema = z.object({
  id: idSchema,
  agentId: idSchema,
  repositoryId: idSchema,
  pullRequestId: idSchema.optional(),
  issueId: idSchema.optional(),
  taskType: agentTaskTypeSchema,
  promptObjectKey: z.string().optional(),
  summary: z.string().nullable(),
  status: agentRunLifecycleSchema,
  outputType: agentOutputTypeSchema.optional(),
  filesChanged: z.array(z.string()).default([]),
  testsRun: z.array(z.string()).default([]),
  resultObjectKey: z.string().optional(),
  createdAt: isoDateTimeSchema,
  completedAt: isoDateTimeSchema.nullable(),
});

export const projectMemoryTypeSchema = z.enum([
  "architecture_note",
  "decision_record",
  "coding_convention",
  "known_risk",
  "failed_attempt",
  "release_constraint",
  "agent_instruction",
  "maintainer_note",
]);

export const projectMemorySchema = z.object({
  id: idSchema,
  repositoryId: idSchema,
  type: projectMemoryTypeSchema,
  title: z.string(),
  content: z.string(),
  source: z.enum(["human", "agent", "ai_generation", "sync", "import"]),
  confidence: z.number().min(0).max(1),
  reviewState: z.enum(["generated", "approved", "rejected", "needs_review"]),
  sourceLinks: z
    .array(
      z.object({
        kind: z.enum(["issue", "pull_request", "commit", "release", "agent_run", "file"]),
        id: z.string(),
      }),
    )
    .default([]),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
});

export const auditActionSchema = z.enum([
  "auth.login",
  "github.sync",
  "github.webhook",
  "agent.action",
  "permission.changed",
  "ai.generation",
  "token.stored",
  "settings.changed",
]);

export const auditLogSchema = z.object({
  id: idSchema,
  actor: actorSchema,
  action: auditActionSchema,
  targetType: z.string(),
  targetId: z.string(),
  metadata: z.record(z.string(), z.unknown()).default({}),
  createdAt: isoDateTimeSchema,
});

export const notificationSchema = z.object({
  id: idSchema,
  repositoryId: idSchema.optional(),
  type: z.enum([
    "review_requested",
    "pr_analysis_completed",
    "issue_summary_updated",
    "agent_run_completed",
    "ci_failed",
    "sync_failed",
    "mention",
    "release_published",
  ]),
  title: z.string(),
  body: z.string().nullable(),
  readAt: isoDateTimeSchema.nullable(),
  createdAt: isoDateTimeSchema,
});

export const searchResultSchema = z.object({
  type: z.enum([
    "repository",
    "pull_request",
    "issue",
    "comment",
    "user",
    "organization",
    "release",
    "file",
  ]),
  id: idSchema,
  title: z.string(),
  subtitle: z.string().optional(),
  url: z.string(),
  highlights: z.array(z.string()).default([]),
});

export const routeContract = {
  health: { method: "GET", path: "/health", response: healthResponseSchema },
  repository: { method: "GET", path: "/api/repos/:owner/:repo", response: repositorySchema },
  pullRequests: {
    method: "GET",
    path: "/api/repos/:owner/:repo/pulls",
    response: z.array(pullRequestSchema),
  },
  pullRequest: {
    method: "GET",
    path: "/api/repos/:owner/:repo/pulls/:number",
    response: pullRequestSchema,
  },
  issues: { method: "GET", path: "/api/repos/:owner/:repo/issues", response: z.array(issueSchema) },
  issue: { method: "GET", path: "/api/repos/:owner/:repo/issues/:number", response: issueSchema },
  agents: { method: "GET", path: "/api/repos/:owner/:repo/agents", response: z.array(agentSchema) },
  search: { method: "GET", path: "/api/search", response: z.array(searchResultSchema) },
  checks: {
    method: "GET",
    path: "/api/repos/:owner/:repo/checks",
    response: z.array(checkRunSchema),
  },
  releases: {
    method: "GET",
    path: "/api/repos/:owner/:repo/releases",
    response: z.array(releaseSchema),
  },
  settings: { method: "GET", path: "/api/settings/ai", response: aiProviderSettingsSchema },
} as const;

export const frontendFixtureContract = {
  repositories: z.array(repositorySchema),
  pullRequests: z.array(pullRequestSchema),
  issues: z.array(issueSchema),
  reviews: z.array(reviewSchema),
  checks: z.array(checkRunSchema),
  releases: z.array(releaseSchema),
  notifications: z.array(notificationSchema),
  aiSettings: aiProviderSettingsSchema,
} as const;

export type Repository = z.infer<typeof repositorySchema>;
export type PullRequest = z.infer<typeof pullRequestSchema>;
export type Issue = z.infer<typeof issueSchema>;
export type Review = z.infer<typeof reviewSchema>;
export type CheckRun = z.infer<typeof checkRunSchema>;
export type Release = z.infer<typeof releaseSchema>;
export type Agent = z.infer<typeof agentSchema>;
export type AgentRun = z.infer<typeof agentRunSchema>;
export type ProjectMemory = z.infer<typeof projectMemorySchema>;
export type AuditLog = z.infer<typeof auditLogSchema>;
export type Notification = z.infer<typeof notificationSchema>;
export type ApiError = z.infer<typeof apiErrorSchema>;
