import { z } from "zod";

export const aiProviderSchema = z.enum(["disabled", "ollama", "openai-compatible"]);

export const configSchema = z.object({
  appUrl: z.string().url().default("http://localhost:3000"),
  apiUrl: z.string().url().default("http://localhost:4000"),
  environment: z.enum(["development", "test", "production"]).default("development"),
  aiProvider: aiProviderSchema.default("disabled"),
  aiBaseUrl: z.string().url().optional(),
  aiChatModel: z.string().optional(),
  aiEmbeddingModel: z.string().optional(),
});

export type GityardConfig = z.infer<typeof configSchema>;
export type AiProvider = z.infer<typeof aiProviderSchema>;

export function loadConfig(env: NodeJS.ProcessEnv = process.env): GityardConfig {
  return configSchema.parse({
    appUrl: env.GITYARD_APP_URL,
    apiUrl: env.GITYARD_API_URL,
    environment: env.GITYARD_ENV,
    aiProvider: env.GITYARD_AI_PROVIDER,
    aiBaseUrl: env.GITYARD_AI_BASE_URL,
    aiChatModel: env.GITYARD_AI_CHAT_MODEL,
    aiEmbeddingModel: env.GITYARD_AI_EMBEDDING_MODEL,
  });
}
