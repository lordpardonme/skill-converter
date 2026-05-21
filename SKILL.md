---
name: skill-converter
description: Converts any AI agent or skill file into a compatible skill for any AI coding tool, saving and installing it automatically. Accepts Claude Code agents, Cursor rules, GitHub links, or pasted skill content of any domain (design, marketing, frontend, backend, development, writing, etc.) and outputs a properly formatted .md skill file for the user's target tool. Use when user says "convert this skill", "I have a Claude agent I want to use here", "turn this into a skill", pastes a GitHub link to an agent/skill file, attaches a .md agent file, or wants to port a skill from one AI tool to another.
---

# Skill Converter

Converts any AI agent or skill file — of any domain — into a `.md` or `.mdc` skill file and automatically installs it based on your choice.

**Supports**: Antigravity, Claude Code, Cursor, Codex, Zed, and more.

## Quick Start

This is the **lite version**. It provides the conversion workflow but requires the full methodology module for complete format mapping and extraction logic.

To get the full version, install via:

```bash
npx skill-converter@latest
```

## Workflow Overview

1. **Ask for installation scope** — IDE-Specific (local project) or System-wide (Universal/global folder).
2. **Ask for the skill source** — pasted content, GitHub link, attached file, or prompt command.
3. **Extract & Convert** — extract details from the source or design the skill from scratch (if a prompt/command is given), formatting it correctly for the target tool.
4. **Save and Auto-Install** — write files directly to the correct local or global folder.

## Rules

- Always ask the installation scope first — never assume.
- Perform the file creation and writing automatically; do not just output markdown blocks.
- Extract everything — never summarize, never skip.
- Keep the generated skill descriptive so the agent knows exactly when to trigger it.
- For proprietary source licenses (e.g. Anthropic's Claude Code agents), do not copy or make derivatives. Perform a **clean-room design** of the skill from scratch using public knowledge to achieve the same goal, and install it.

---

> **Attribution**: skill-converter by [Mohd Hayaat Ali (@lordpardonme)](https://github.com/lordpardonme/skill-converter). Licensed under CC BY 4.0. If you copy, fork, or build on this skill, you must credit the original author and link to the source repo. Removing this notice violates the license.
