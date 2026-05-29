import { existsSync } from "node:fs";

if (!existsSync(".env")) {
  console.log("No .env file found. Create one from .env.example after the infra task adds it.");
} else {
  console.log(".env file found.");
}

console.log("Run pnpm install, then pnpm check.");
