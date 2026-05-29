import { z } from "zod";

export const mirrorLayoutContract = {
  rootEnv: "GITYARD_GIT_MIRROR_ROOT",
  layout: "{repositoryId}.git",
  mode: "bare",
  providerAgnostic: true,
} as const;

export const gitObjectRequestSchema = z.object({
  repositoryId: z.string().min(1),
  ref: z.string().min(1),
});

export const gitFileExtractionSchema = z.object({
  repositoryId: z.string().min(1),
  commitSha: z.string().min(1),
  path: z.string().min(1),
  maxBytes: z.number().int().positive(),
});

export const gitDiffRequestSchema = z.object({
  repositoryId: z.string().min(1),
  baseSha: z.string().min(1),
  headSha: z.string().min(1),
});

export const gitSkippedFileReasonSchema = z.enum(["binary", "too_large", "missing", "unsupported"]);

export type GitObjectRequest = z.infer<typeof gitObjectRequestSchema>;
export type GitFileExtraction = z.infer<typeof gitFileExtractionSchema>;
export type GitDiffRequest = z.infer<typeof gitDiffRequestSchema>;
