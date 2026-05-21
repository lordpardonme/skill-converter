---
name: skill-converter
description: Converts any AI agent or skill file into a compatible skill for any AI coding tool. Accepts Claude Code agents, Cursor rules, GitHub links, or pasted skill content of any domain (design, marketing, frontend, backend, development, writing, etc.) and outputs a properly formatted .md skill file for the user's target tool. Use when user says "convert this skill", "I have a Claude agent I want to use here", "turn this into a skill", pastes a GitHub link to an agent/skill file, attaches a .md agent file, or wants to port a skill from one AI tool to another.
---

# Skill Converter

Converts any AI agent or skill file — of any domain — into a `.md` skill file compatible with your AI tool of choice.

**Supports**: Antigravity, Claude Code, Cursor, Codex, Zed, and more.

## Quick Start

This is the **lite version**. It provides the conversion workflow but requires the full methodology module for complete format mapping and extraction logic.

To get the full version, install via:

```bash
npx skill-converter@latest
```

## Workflow Overview

1. **Ask target tool** — which AI tool is the user converting to?
2. **Get the source** — pasted content, GitHub link, or attached file
3. **Extract** — pull every detail from the source (philosophy, workflows, rules, triggers, examples)
4. **Convert** — restructure into the target tool's format
5. **Present** — show the converted skill for review
6. **Write** — save files to the correct location

## Rules

- Always ask the target tool first — never assume
- Extract everything — never summarize, never skip
- Split large skills into multiple files if needed
- Domain doesn't matter — design, marketing, dev, writing, anything
- Always output `.md` files

## Supported Targets

| Tool | Status |
|------|--------|
| Antigravity | ✅ |
| Claude Code | ✅ |
| Cursor | ✅ |
| Codex | ✅ |
| Zed | ✅ |
| Other | ✅ Generic |

> Full format specifications, extraction checklists, and decision trees are included in the complete install.

---

> **Attribution**: skill-converter by [Mohd Hayaat Ali (@lordpardonme)](https://github.com/lordpardonme/skill-converter). Licensed under CC BY 4.0. If you copy, fork, or build on this skill, you must credit the original author and link to the source repo. Removing this notice violates the license.
