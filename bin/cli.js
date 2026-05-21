#!/usr/bin/env node

const readline = require("readline");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { exec } = require("child_process");

const TOOLS = {
  "1": { name: "Antigravity",  dir: ".agents/skills/skill-converter", files: ["SKILL.md", "REFERENCE.md"] },
  "2": { name: "Claude Code",  dir: ".claude/agents",                 files: ["skill-converter.md"], merge: true },
  "3": { name: "Cursor",       dir: ".cursor/rules",                  files: ["skill-converter.mdc"], merge: true },
  "4": { name: "Codex",        dir: ".codex/skills",                  files: ["skill-converter.md"], merge: true },
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

function spawnTerminal() {
  const msg = "skill-converter has been installed system-wide! You can now run it in any IDE or terminal.";
  if (process.platform === "win32") {
    exec(`start cmd.exe /k "echo ${msg}"`);
  } else if (process.platform === "darwin") {
    exec(`osascript -e 'tell app "Terminal" to do script "echo \\"${msg}\\""'`);
  } else {
    exec(`x-terminal-emulator -e "echo '${msg}'; exec bash" || gnome-terminal -- bash -c "echo '${msg}'; exec bash" || xterm -e "echo '${msg}'; exec bash"`);
  }
}

async function runLocalInstaller(rl) {
  console.log(c("cyan", "\n  Which IDE or tool are you installing this for?\n"));
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

  console.log(c("green", `\n  ✓ Installing locally for ${tool.name}...\n`));

  const targetDir = path.resolve(process.cwd(), tool.dir);
  mkdirSafe(targetDir);

  const skillContent = getTemplateContent("SKILL.md");
  const refContent = getTemplateContent("REFERENCE.md");

  if (tool.merge) {
    const merged = skillContent + "\n\n---\n\n" + refContent;
    const outFile = path.join(targetDir, tool.files[0]);
    fs.writeFileSync(outFile, merged, "utf-8");
    console.log(c("dim", `  → ${path.relative(process.cwd(), outFile)}`));
  } else {
    const skillOut = path.join(targetDir, "SKILL.md");
    const refOut = path.join(targetDir, "REFERENCE.md");
    fs.writeFileSync(skillOut, skillContent, "utf-8");
    fs.writeFileSync(refOut, refContent, "utf-8");
    console.log(c("dim", `  → ${path.relative(process.cwd(), skillOut)}`));
    console.log(c("dim", `  → ${path.relative(process.cwd(), refOut)}`));
  }

  console.log(c("green", "\n  ✅ Local installation completed successfully!\n"));
  rl.close();
}

async function runGlobalInstaller(rl) {
  console.log(c("green", "\n  ✓ Installing system-wide (Universal)...\n"));

  const homeDir = os.homedir();
  const skillContent = getTemplateContent("SKILL.md");
  const refContent = getTemplateContent("REFERENCE.md");
  const mergedContent = skillContent + "\n\n---\n\n" + refContent;

  const globalTargets = [
    // Antigravity global
    { dir: path.join(homeDir, ".agents", "skills", "skill-converter"), files: ["SKILL.md", "REFERENCE.md"] },
    // Claude Code global
    { dir: path.join(homeDir, ".claude", "agents"), files: ["skill-converter.md"], merge: true },
    // Cursor global
    { dir: path.join(homeDir, ".cursor", "rules"), files: ["skill-converter.mdc"], merge: true },
    // Codex global
    { dir: path.join(homeDir, ".codex", "skills"), files: ["skill-converter.md"], merge: true },
    // Zed global
    { dir: path.join(homeDir, ".zed", "instructions"), files: ["skill-converter.md"], merge: true }
  ];

  for (const target of globalTargets) {
    try {
      mkdirSafe(target.dir);
      if (target.merge) {
        fs.writeFileSync(path.join(target.dir, target.files[0]), mergedContent, "utf-8");
      } else {
        fs.writeFileSync(path.join(target.dir, "SKILL.md"), skillContent, "utf-8");
        fs.writeFileSync(path.join(target.dir, "REFERENCE.md"), refContent, "utf-8");
      }
      console.log(c("dim", `  → Installed in: ${target.dir}`));
    } catch (err) {
      console.log(c("dim", `  → Skipped path: ${target.dir} (${err.message})`));
    }
  }

  console.log(c("green", "\n  ✅ System-wide installation completed successfully!\n"));
  console.log(c("cyan", "  Opening a new terminal window...\n"));
  
  try {
    spawnTerminal();
  } catch (err) {
    console.log(c("dim", `  Could not open new terminal window automatically: ${err.message}`));
  }

  rl.close();
}

async function main() {
  banner();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(c("cyan", "  Where would you like to install skill-converter?\n"));
  console.log("  1) IDE-Specific (Local project directories)");
  console.log("  2) Universal / System-wide (Global user folders)");
  console.log("");

  const choice = await ask(rl, c("yellow", "  Enter choice (1-2): "));

  if (choice === "1") {
    await runLocalInstaller(rl);
  } else if (choice === "2") {
    await runGlobalInstaller(rl);
  } else {
    console.log(c("yellow", "\n  ⚠ Invalid choice. Run again and pick 1 or 2.\n"));
    rl.close();
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(c("yellow", `\n  ⚠ Error: ${err.message}\n`));
  process.exit(1);
});
