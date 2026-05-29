import { execSync } from "node:child_process";

function commandExists(command: string): boolean {
  try {
    execSync(`${command} --version`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

const requiredCommands = ["node", "pnpm", "docker"];
const missing = requiredCommands.filter((command) => !commandExists(command));

if (missing.length > 0) {
  console.error(`Missing required local commands: ${missing.join(", ")}`);
  process.exit(1);
}

console.log("Local development commands are available.");
