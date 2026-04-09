/**
 * Scrape first Wowhead search hit for each unique loot name.
 * Run: node scripts/build-item-ids.mjs
 * Be respectful: ~250ms delay between requests.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dungeonsDir = path.join(__dirname, "../src/data/dungeons");
const outFile = path.join(__dirname, "../src/data/item-ids-by-name.json");

/** Long browser UAs get HTTP 403 from Wowhead search; minimal UA works for programmatic fetch. */
const UA = "Mozilla/5.0";

function collectNames() {
  const names = new Set();
  for (const file of fs.readdirSync(dungeonsDir)) {
    if (!file.endsWith(".json")) continue;
    const data = JSON.parse(fs.readFileSync(path.join(dungeonsDir, file), "utf8"));
    for (const boss of data.bosses ?? []) {
      for (const row of boss.loot ?? []) {
        if (row.name) names.add(row.name);
      }
    }
  }
  return [...names].sort();
}

function extractItemId(html) {
  const m = html.match(/\/item=(\d{4,8})/);
  return m ? Number(m[1]) : null;
}

async function fetchId(name) {
  const q = encodeURIComponent(name);
  const url = `https://www.wowhead.com/search?q=${q}`;
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  const html = await res.text();
  return extractItemId(html);
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const names = collectNames();
  console.log(`Found ${names.length} unique item names.`);

  const map = {};
  const missing = [];

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    process.stdout.write(`[${i + 1}/${names.length}] ${name}... `);
    try {
      const id = await fetchId(name);
      if (id) {
        map[name] = id;
        console.log(id);
      } else {
        missing.push(name);
        console.log("NOT FOUND");
      }
    } catch (e) {
      missing.push(name);
      console.log(String(e.message ?? e));
    }
    await delay(280);
  }

  const out = { items: map };
  if (missing.length) Object.assign(out, { missing });
  fs.writeFileSync(outFile, JSON.stringify(out, null, 2), "utf8");
  console.log(`\nWrote ${Object.keys(map).length} ids to ${outFile}`);
  if (missing.length) console.log(`Missing (${missing.length}):`, missing.slice(0, 20).join(", "), "...");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
