import { z } from "zod";

export const objectReferenceSchema = z.object({
  bucket: z.string().min(1),
  key: z.string().min(1),
  contentType: z.string().optional(),
  sizeBytes: z.number().int().nonnegative().optional(),
  sha256: z.string().optional(),
});

export const protectedBranchAwarenessContract = {
  branchProtectionSource: "provider-sync",
  defaultProtectedBranchWrite: "deny_without_approval",
  agentProtectedBranchWrite: "needs_approval",
} as const;

export const disabledStateSchema = z.object({
  disabled: z.boolean(),
  reason: z.string(),
  recoveryAction: z.string().optional(),
});

export type ObjectReference = z.infer<typeof objectReferenceSchema>;
export type DisabledState = z.infer<typeof disabledStateSchema>;
