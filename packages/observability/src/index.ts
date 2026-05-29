import { z } from "zod";

export const logLevelSchema = z.enum(["debug", "info", "warn", "error"]);

export const structuredLogSchema = z.object({
  level: logLevelSchema,
  service: z.string().min(1),
  message: z.string(),
  requestId: z.string().optional(),
  traceId: z.string().optional(),
  actorId: z.string().optional(),
  repositoryId: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).default({}),
});

export const redactionContract = {
  forbiddenLogFields: [
    "token",
    "access_token",
    "refresh_token",
    "authorization",
    "github_token",
    "api_key",
    "private_key",
    "GITYARD_ENCRYPTION_KEY",
  ],
  replacement: "[REDACTED]",
  tokenLogging: "forbidden",
} as const;

export type StructuredLog = z.infer<typeof structuredLogSchema>;
