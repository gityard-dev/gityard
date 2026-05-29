import { loadConfig } from "@gityard/config";
import { Hono } from "hono";

export const app = new Hono();
const config = loadConfig();

app.get("/health", (context) =>
  context.json({
    service: "api",
    status: "ok",
    version: config.version,
    checks: {
      process: "ok",
      ai: config.aiProvider === "disabled" ? "ok" : "degraded",
    },
  }),
);

app.get("/ready", (context) =>
  context.json({
    service: "api",
    status: "ok",
    dependencies: {
      databaseUrlConfigured: Boolean(config.databaseUrl),
      natsUrlConfigured: Boolean(config.natsUrl),
      temporalAddressConfigured: Boolean(config.temporalAddress),
    },
  }),
);
