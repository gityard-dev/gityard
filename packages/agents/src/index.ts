import { z } from "zod";

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

export const agentToolContractSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  requiredPermissions: z.array(z.string()).default([]),
  requiresApproval: z.boolean().default(false),
  auditAction: z.literal("agent.action"),
});

export const approvalGateContract = {
  sensitiveFileChanges: "needs_approval",
  protectedBranchWrites: "needs_approval",
  secretAccess: "needs_approval",
  merge: "needs_approval",
  defaultCodeModification: "denied",
} as const;

export type AgentTaskType = z.infer<typeof agentTaskTypeSchema>;
export type AgentRunLifecycle = z.infer<typeof agentRunLifecycleSchema>;
export type AgentOutputType = z.infer<typeof agentOutputTypeSchema>;
export type AgentToolContract = z.infer<typeof agentToolContractSchema>;
