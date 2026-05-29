import { z } from "zod";

export const userPermissionSchema = z.enum([
  "repo:read",
  "repo:write",
  "pr:read",
  "pr:write",
  "issue:read",
  "issue:write",
  "review:create",
  "review:submit",
  "agent:run",
  "agent:approve",
  "settings:manage",
  "billing:manage",
]);

export const agentPermissionSchema = z.enum([
  "agent:read_repo",
  "agent:open_pr",
  "agent:comment",
  "agent:run_tests",
  "agent:modify_docs",
  "agent:modify_code",
  "agent:modify_sensitive_files",
  "agent:access_secrets",
  "agent:merge",
]);

export const defaultAgentPermissions = {
  "agent:read_repo": true,
  "agent:comment": true,
  "agent:open_pr": false,
  "agent:run_tests": false,
  "agent:modify_docs": false,
  "agent:modify_code": false,
  "agent:modify_sensitive_files": false,
  "agent:access_secrets": false,
  "agent:merge": false,
} as const satisfies Record<z.infer<typeof agentPermissionSchema>, boolean>;

export const sessionContract = {
  strategy: "custom-github-oauth",
  publicReadOnlyRequiresSession: false,
  tokenStorage: "encrypted-at-rest",
  localEncryptionKeyEnv: "GITYARD_ENCRYPTION_KEY",
  hostedKeyManagement: "kms-envelope-encryption",
  tokenLogging: "forbidden",
} as const;

export type EncryptedSecret = {
  readonly ciphertext: string;
  readonly keyId: string;
  readonly algorithm: "local-envelope-placeholder" | "kms-envelope";
};

export type TokenEncryptionProvider = {
  readonly keyId: string;
  encrypt(plaintext: string): Promise<EncryptedSecret>;
  decrypt(secret: EncryptedSecret): Promise<string>;
};

export function createLocalTokenEncryptionPlaceholder(keyId = "GITYARD_ENCRYPTION_KEY") {
  return {
    keyId,
    async encrypt(plaintext: string) {
      return {
        ciphertext: `encrypted:${plaintext.length}`,
        keyId,
        algorithm: "local-envelope-placeholder",
      } satisfies EncryptedSecret;
    },
    async decrypt(secret: EncryptedSecret) {
      throw new Error(
        `Decrypt is not implemented for ${secret.algorithm}; wire a real provider in I010.`,
      );
    },
  } satisfies TokenEncryptionProvider;
}

export type UserPermission = z.infer<typeof userPermissionSchema>;
export type AgentPermission = z.infer<typeof agentPermissionSchema>;
