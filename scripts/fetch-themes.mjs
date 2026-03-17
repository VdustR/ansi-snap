#!/usr/bin/env node
// Fetch all Ghostty themes from iTerm2-Color-Schemes and generate a JSON file.
// Usage: node scripts/fetch-themes.mjs

import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const REPO = "mbadolato/iTerm2-Color-Schemes";
const DIR = "ghostty";

function ghApi(path) {
  const result = execFileSync("gh", ["api", path], {
    encoding: "utf-8",
    maxBuffer: 50 * 1024 * 1024,
  });
  return JSON.parse(result);
}

function parseTheme(name, content) {
  const theme = { name, palette: {} };
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^(\S+)\s*=\s*(.+)$/);
    if (!match) continue;
    const [, key, value] = match;
    const val = value.trim();
    if (key === "palette") {
      const pm = val.match(/^(\d+)=(.+)$/);
      if (pm) theme.palette[pm[1]] = pm[2].trim();
    } else if (key === "background") theme.background = val;
    else if (key === "foreground") theme.foreground = val;
    else if (key === "cursor-color") theme.cursorColor = val;
    else if (key === "cursor-text") theme.cursorText = val;
    else if (key === "selection-background") theme.selectionBackground = val;
    else if (key === "selection-foreground") theme.selectionForeground = val;
  }
  return theme;
}

async function main() {
  console.log("Fetching theme list...");
  const files = ghApi(`repos/${REPO}/contents/${DIR}`);
  console.log(`Found ${files.length} themes`);

  // Get the tree SHA for batch fetching
  const ref = ghApi(`repos/${REPO}/git/ref/heads/master`);
  const commitSha = ref.object.sha;
  console.log(`Commit: ${commitSha}`);

  // Fetch full tree to get all file contents via git trees API (faster than individual requests)
  const tree = ghApi(`repos/${REPO}/git/trees/${commitSha}?recursive=1`);
  const ghosttyFiles = tree.tree.filter((f) => f.path.startsWith("ghostty/") && f.type === "blob");
  console.log(`Found ${ghosttyFiles.length} ghostty files in tree`);

  const themes = [];
  let fetched = 0;

  for (const file of ghosttyFiles) {
    const name = file.path.replace("ghostty/", "");
    try {
      const blob = ghApi(`repos/${REPO}/git/blobs/${file.sha}`);
      const content = Buffer.from(blob.content, "base64").toString("utf-8");
      const theme = parseTheme(name, content);
      if (theme.background && theme.foreground) {
        themes.push(theme);
      }
    } catch {
      console.error(`Failed to fetch: ${name}`);
    }
    fetched++;
    if (fetched % 50 === 0) console.log(`  ${fetched}/${ghosttyFiles.length}`);
  }

  themes.sort((a, b) => a.name.localeCompare(b.name));

  const output = {
    source: `https://github.com/${REPO}`,
    commit: commitSha,
    count: themes.length,
    themes,
  };

  const outPath = "src/constants/all-themes.json";
  writeFileSync(outPath, JSON.stringify(output));
  console.log(`Wrote ${themes.length} themes to ${outPath}`);
}

void main();
