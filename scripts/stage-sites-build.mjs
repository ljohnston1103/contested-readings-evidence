import { cp, copyFile, mkdir, rm, stat } from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const sourceWorker = path.join(projectRoot, ".sites-build", "worker.js");
const sourceAssets = path.join(projectRoot, ".open-next", "assets");
const distRoot = path.join(projectRoot, "dist");
const serverRoot = path.join(distRoot, "server");
const clientRoot = path.join(distRoot, "client");
const targetWorker = path.join(serverRoot, "index.js");

for (const requiredPath of [sourceWorker, sourceAssets]) {
  await stat(requiredPath);
}

await rm(distRoot, { recursive: true, force: true });
await mkdir(serverRoot, { recursive: true });
await copyFile(sourceWorker, targetWorker);
await cp(sourceAssets, clientRoot, { recursive: true });

const worker = await stat(targetWorker);
if (!worker.isFile() || worker.size === 0) {
  throw new Error("Sites worker staging failed.");
}

console.log(`Sites build staged in dist (${worker.size} byte worker).`);
