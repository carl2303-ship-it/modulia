/**
 * Para servidores dev locais e apaga o cache .next corrompido.
 * Uso: npm run dev:reset && npm run dev
 */
import { rmSync } from "node:fs";
import { execSync } from "node:child_process";

const PORTS = [3000, 3001, 3002, 3010];

function killPortWindows(port) {
  try {
    const out = execSync(`netstat -ano | findstr :${port}`, { encoding: "utf8" });
    const pids = new Set();
    for (const line of out.split("\n")) {
      if (!line.includes("LISTENING")) continue;
      const pid = line.trim().split(/\s+/).pop();
      if (pid && pid !== "0") pids.add(pid);
    }
    for (const pid of pids) {
      try {
        execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
        console.log(`Parado processo ${pid} (porta ${port})`);
      } catch {
        /* ignore */
      }
    }
  } catch {
    /* porta livre */
  }
}

if (process.platform === "win32") {
  for (const port of PORTS) killPortWindows(port);
}

try {
  rmSync(".next", { recursive: true, force: true });
  console.log("Cache .next apagado.");
} catch {
  console.log("Nenhum cache .next para apagar.");
}

console.log("\nAgora execute apenas: npm run dev");
console.log("URL: http://localhost:3000\n");
