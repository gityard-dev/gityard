export const serviceName = "worker";

export const workflowNames = [
  "ImportGitHubRepoWorkflow",
  "SyncGitHubRepoWorkflow",
  "AnalyzePullRequestWorkflow",
  "AnalyzeIssueWorkflow",
  "IndexRepositoryWorkflow",
  "RunAgentWorkflow",
  "FixCIFailureWorkflow",
  "GenerateReleaseSummaryWorkflow",
  "MigrateRepoWorkflow",
] as const;

export function readiness() {
  return {
    service: serviceName,
    status: "ok",
    workflows: workflowNames,
  };
}
