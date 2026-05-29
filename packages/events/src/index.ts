import { z } from "zod";

export const eventSubjectSchema = z.enum([
  "github.webhook.received",
  "github.installation.created",
  "github.installation.deleted",
  "repo.sync.requested",
  "repo.sync.started",
  "repo.sync.completed",
  "repo.sync.failed",
  "git.clone.requested",
  "git.clone.completed",
  "git.fetch.completed",
  "git.diff.completed",
  "pull_request.created",
  "pull_request.updated",
  "pull_request.closed",
  "pull_request.analysis.requested",
  "pull_request.analysis.completed",
  "issue.created",
  "issue.updated",
  "issue.closed",
  "issue.analysis.requested",
  "issue.analysis.completed",
  "review.submitted",
  "review.requested",
  "review.dismissed",
  "agent.run.requested",
  "agent.run.started",
  "agent.run.completed",
  "agent.run.failed",
  "check.created",
  "check.updated",
  "check.failed",
  "check.completed",
  "release.created",
  "release.updated",
  "release.published",
  "search.index.requested",
  "search.index.completed",
  "notification.created",
]);

export const eventEnvelopeSchema = z.object({
  id: z.string().min(1),
  type: eventSubjectSchema,
  version: z.literal(1),
  timestamp: z.string().datetime(),
  actor: z.object({
    type: z.enum(["system", "user", "agent"]),
    id: z.string().min(1),
  }),
  repository: z
    .object({
      id: z.string().min(1),
    })
    .optional(),
  idempotencyKey: z.string().min(1),
  data: z.record(z.string(), z.unknown()),
});

export const eventRules = {
  immutable: true,
  versioned: true,
  serializable: true,
  idempotent: true,
  replayableWherePossible: true,
} as const;

export type EventSubject = z.infer<typeof eventSubjectSchema>;
export type EventEnvelope = z.infer<typeof eventEnvelopeSchema>;
