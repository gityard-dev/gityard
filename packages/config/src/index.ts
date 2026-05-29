import { z } from "zod";

export const aiProviderSchema = z.enum(["disabled", "ollama", "openai-compatible"]);

export const configSchema = z.object({
  appUrl: z.string().url().default("http://localhost:3000"),
  apiUrl: z.string().url().default("http://localhost:4000"),
  environment: z.enum(["development", "test", "production"]).default("development"),
  version: z.literal("0.0.1").default("0.0.1"),
  databaseUrl: z.string().url().default("postgres://gityard:gityard@localhost:5432/gityard"),
  redisUrl: z.string().url().default("redis://localhost:6379"),
  natsUrl: z.string().url().default("nats://localhost:4222"),
  temporalAddress: z.string().default("localhost:7233"),
  temporalNamespace: z.string().default("default"),
  meiliUrl: z.string().url().default("http://localhost:7700"),
  meiliMasterKey: z.string().default("gityard-local"),
  s3Endpoint: z.string().url().default("http://localhost:9000"),
  s3AccessKeyId: z.string().default("gityard"),
  s3SecretAccessKey: z.string().default("gityardpassword"),
  s3Bucket: z.string().default("gityard"),
  s3Region: z.string().default("local"),
  s3ForcePathStyle: z.boolean().default(true),
  gitMirrorRoot: z.string().default("/var/lib/gityard/mirrors"),
  aiProvider: aiProviderSchema.default("disabled"),
  aiBaseUrl: z.string().url().optional(),
  aiChatModel: z.string().optional(),
  aiEmbeddingModel: z.string().optional(),
  aiApiKeyConfigured: z.boolean().default(false),
  encryptionKey: z.string().min(1).default("local-development-key-change-me"),
  billingEnabled: z.boolean().default(false),
  cloudMode: z.boolean().default(false),
  managedAiEnabled: z.boolean().default(false),
});

export type GityardConfig = z.infer<typeof configSchema>;
export type AiProvider = z.infer<typeof aiProviderSchema>;

export function loadConfig(env: NodeJS.ProcessEnv = process.env): GityardConfig {
  return configSchema.parse({
    appUrl: env.GITYARD_APP_URL,
    apiUrl: env.GITYARD_API_URL,
    environment: env.GITYARD_ENV,
    version: env.GITYARD_VERSION,
    databaseUrl: env.DATABASE_URL,
    redisUrl: env.REDIS_URL,
    natsUrl: env.NATS_URL,
    temporalAddress: env.TEMPORAL_ADDRESS,
    temporalNamespace: env.TEMPORAL_NAMESPACE,
    meiliUrl: env.MEILI_URL,
    meiliMasterKey: env.MEILI_MASTER_KEY,
    s3Endpoint: env.S3_ENDPOINT,
    s3AccessKeyId: env.S3_ACCESS_KEY_ID,
    s3SecretAccessKey: env.S3_SECRET_ACCESS_KEY,
    s3Bucket: env.S3_BUCKET,
    s3Region: env.S3_REGION,
    s3ForcePathStyle: env.S3_FORCE_PATH_STYLE === "true",
    gitMirrorRoot: env.GITYARD_GIT_MIRROR_ROOT,
    aiProvider: env.GITYARD_AI_PROVIDER,
    aiBaseUrl: env.GITYARD_AI_BASE_URL,
    aiChatModel: env.GITYARD_AI_CHAT_MODEL,
    aiEmbeddingModel: env.GITYARD_AI_EMBEDDING_MODEL,
    aiApiKeyConfigured: Boolean(env.GITYARD_AI_API_KEY),
    encryptionKey: env.GITYARD_ENCRYPTION_KEY,
    billingEnabled: env.GITYARD_BILLING_ENABLED === "true",
    cloudMode: env.GITYARD_CLOUD_MODE === "true",
    managedAiEnabled: env.GITYARD_MANAGED_AI_ENABLED === "true",
  });
}
