import { readFile, writeFile } from "node:fs/promises";
import { parseContributions } from "./lib/github-contributions.mjs";

const file = new URL("../src/data/github-contributions.json", import.meta.url);
const source = "https://github.com/users/wangyz1999/contributions";
try {
  const response = await fetch(source, { headers: { "User-Agent": "yunzhe-portfolio", "Accept": "text/html" }, signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
  const days = parseContributions(await response.text());
  if (days.length < 350 || days.length > 371) throw new Error("Unexpected calendar length");
  const data = { username: "wangyz1999", source, fetchedAt: new Date().toISOString(), days };
  await writeFile(file, JSON.stringify(data, null, 2) + "\n");
  console.log(`Saved ${days.length} days of public GitHub contribution data.`);
} catch (error) {
  const cached = JSON.parse(await readFile(file, "utf8").catch(() => "null"));
  if (!cached?.days?.length) throw error;
  console.warn(`GitHub refresh unavailable; retaining the snapshot from ${cached.fetchedAt}. ${error.message}`);
}
