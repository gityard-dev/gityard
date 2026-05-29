import { z } from "zod";

export const aiProviderSchema = z.enum(["disabled", "ollama", "openai-compatible"]);

export const aiCapabilitySchema = z.enum(["chat", "embedding", "structured_output"]);

export const aiProviderSettingsSchema = z.object({
  provider: aiProviderSchema,
  baseUrl: z.string().url().optional(),
  chatModel: z.string().optional(),
  embeddingModel: z.string().optional(),
  byoKeyConfigured: z.boolean().default(false),
  capabilities: z.array(aiCapabilitySchema).default([]),
});

export const promptContractSchema = z.object({
  id: z.string().min(1),
  version: z.string().min(1),
  purpose: z.enum([
    "pr_summary",
    "pr_risk",
    "review_checklist",
    "issue_summary",
    "issue_duplicates",
    "failed_check_summary",
    "context_extraction",
    "agent_plan",
  ]),
  outputSchemaName: z.string().min(1),
});

export const aiGenerationContractSchema = z.object({
  id: z.string().min(1),
  provider: aiProviderSchema,
  model: z.string().nullable(),
  promptId: z.string().min(1),
  promptVersion: z.string().min(1),
  inputHash: z.string().min(1),
  cacheKey: z.string().min(1),
  status: z.enum(["completed", "disabled", "failed", "invalid"]),
  validationErrors: z.array(z.string()).default([]),
});

export const disabledProviderContract = {
  provider: "disabled",
  requiresApiKey: false,
  networkAccess: false,
  analysisStatus: "disabled",
  message: "AI features are disabled for this GitYard instance.",
} as const;

export const aiCacheKeyParts = [
  "provider",
  "model",
  "promptId",
  "promptVersion",
  "normalizedInputHash",
  "outputSchemaName",
] as const;

export type AiProvider = z.infer<typeof aiProviderSchema>;
export type AiProviderSettings = z.infer<typeof aiProviderSettingsSchema>;
export type PromptContract = z.infer<typeof promptContractSchema>;
export type AiGenerationContract = z.infer<typeof aiGenerationContractSchema>;
