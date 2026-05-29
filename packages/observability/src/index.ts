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

export function redactSecrets(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => redactSecrets(item));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        redactionContract.forbiddenLogFields.some(
          (field) => key.toLowerCase() === field.toLowerCase() || key.toLowerCase().includes(field),
        )
          ? redactionContract.replacement
          : redactSecrets(item),
      ]),
    );
  }

  if (typeof value === "string" && /(?:gh[pousr]_|sk-|xox[baprs]-)/i.test(value)) {
    return redactionContract.replacement;
  }

  return value;
}

export function createStructuredLog(input: StructuredLog): StructuredLog {
  return structuredLogSchema.parse({
    ...input,
    metadata: redactSecrets(input.metadata),
  });
}

export type StructuredLog = z.infer<typeof structuredLogSchema>;
