#!/usr/bin/env node

const readline = require("readline");
const fs = require("fs");
const path = require("path");

const TOOLS = {
  "1": { name: "Antigravity",  dir: ".agents/skills/skill-converter", files: ["SKILL.md", "REFERENCE.md"] },
  "2": { name: "Claude Code",  dir: ".claude/agents",                 files: ["skill-converter.md"], merge: true },
  "3": { name: "Cursor",       dir: ".cursor/rules",                  files: ["skill-converter.mdc"], merge: true },
  "4": { name: "Codex",        dir: ".codex",                         files: ["skill-converter.md"], merge: true },
  "5": { name: "Zed",          dir: ".zed/instructions",              files: ["skill-converter.md"], merge: true },
  "6": { name: "Other",        dir: "skills/skill-converter",         files: ["SKILL.md", "REFERENCE.md"] },
};

const COLORS = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  magenta: "\x1b[35m",
  white: "\x1b[37m",
  bgMagenta: "\x1b[45m",
};

const c = (color, text) => `${COLORS[color]}${text}${COLORS.reset}`;

function banner() {
  console.log("");
  console.log(c("magenta", "  ╔══════════════════════════════════════════════════╗"));
  console.log(c("magenta", "  ║") + c("bold", "            ⚡ skill-converter                   ") + c("magenta", "║"));
  console.log(c("magenta", "  ║") + c("dim", "   Convert any AI agent into a universal skill   ") + c("magenta", "║"));
  console.log(c("magenta", "  ╚══════════════════════════════════════════════════╝"));
  console.log("");
  console.log(c("dim", "  by @lordpardonme • CC BY 4.0"));
  console.log("");
}

function ask(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

function mkdirSafe(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getTemplateContent(filename) {
  const templatePath = path.join(__dirname, "..", "templates", filename);
  return fs.readFileSync(templatePath, "utf-8");
}

async function main() {
  banner();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(c("cyan", "  What AI tool are you installing this for?\n"));
  console.log("  1) Antigravity");
  console.log("  2) Claude Code");
  console.log("  3) Cursor");
  console.log("  4) Codex");
  console.log("  5) Zed");
  console.log("  6) Other");
  console.log("");

  const choice = await ask(rl, c("yellow", "  Enter number (1-6): "));

  const tool = TOOLS[choice];
  if (!tool) {
    console.log(c("yellow", "\n  ⚠ Invalid choice. Run again and pick 1-6.\n"));
    rl.close();
    process.exit(1);
  }

  console.log(c("green", `\n  ✓ Installing for ${tool.name}...\n`));

  const targetDir = path.resolve(process.cwd(), tool.dir);
  mkdirSafe(targetDir);

  const skillContent = getTemplateContent("SKILL.md");
  const refContent = getTemplateContent("REFERENCE.md");

  if (tool.merge) {
    // Single-file tools: merge SKILL.md + REFERENCE.md into one file
    const merged = skillContent + "\n\n---\n\n" + refContent;
    const outFile = path.join(targetDir, tool.files[0]);
    fs.writeFileSync(outFile, merged, "utf-8");
    console.log(c("dim", `  → ${path.relative(process.cwd(), outFile)}`));
  } else {
    // Multi-file tools: write SKILL.md and REFERENCE.md separately
    const skillOut = path.join(targetDir, "SKILL.md");
    const refOut = path.join(targetDir, "REFERENCE.md");
    fs.writeFileSync(skillOut, skillContent, "utf-8");
    fs.writeFileSync(refOut, refContent, "utf-8");
    console.log(c("dim", `  → ${path.relative(process.cwd(), skillOut)}`));
    console.log(c("dim", `  → ${path.relative(process.cwd(), refOut)}`));
  }

  console.log(c("green", "\n  ✅ Installed successfully!\n"));
  console.log(c("white", `  The skill-converter is now ready in your ${tool.name} setup.`));
  console.log(c("white", "  Just ask your AI agent to \"convert a skill\" and it'll know what to do.\n"));
  console.log(c("dim", "  ─────────────────────────────────────────────────"));
  console.log(c("dim", "  skill-converter by @lordpardonme • CC BY 4.0"));
  console.log(c("dim", "  https://github.com/lordpardonme/skill-converter"));
  console.log("");

  rl.close();
}

main().catch((err) => {
  console.error(c("yellow", `\n  ⚠ Error: ${err.message}\n`));
  process.exit(1);
});
