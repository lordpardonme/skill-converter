---
name: skill-converter
description: Converts any AI agent or skill file into a compatible skill for any AI coding tool. Accepts Claude Code agents, Cursor rules, GitHub links, or pasted skill content of any domain (design, marketing, frontend, backend, development, writing, etc.) and outputs a properly formatted .md skill file for the user's target tool. Use when user says "convert this skill", "I have a Claude agent I want to use here", "turn this into a skill", pastes a GitHub link to an agent/skill file, attaches a .md agent file, or wants to port a skill from one AI tool to another.
---

# Skill Converter

Converts any AI agent or skill file — of any domain — into a `.md` skill file compatible with your AI tool of choice.

Works with: Claude Code agents, Cursor rules, Zed instructions, raw markdown skill files, GitHub links, pasted content.
Outputs for: Antigravity, Claude Code, Cursor, Codex, Zed, or any other tool.

## Workflow

### Step 1 — Ask the target tool

Ask the user:

> "What AI tool are you converting **to**? (e.g. Antigravity, Claude Code, Cursor, Codex, Zed, or other — just type the name)"

Wait for their answer before doing anything else.

### Step 2 — Ask for the skill source

Ask the user:

> "Now share the skill or agent you want to convert. You can:
> - Paste the file content directly
> - Give a GitHub link (raw or regular)
> - Describe what you want if you don't have a file yet"

### Step 3 — Extract all content

Read the source and extract:

- **Name** — what this skill/agent is called
- **Domain** — design, marketing, frontend, backend, writing, etc.
- **Core philosophy** — the mindset and approach it takes
- **Triggers** — when should this skill activate? What keywords, file types, or user actions invoke it?
- **Workflows** — step-by-step processes it follows
- **Rules & constraints** — what it always/never does
- **Response format** — how it structures its output (if any)
- **Examples** — any good/bad examples it uses
- **Anti-patterns** — things it warns against
- **References** — sources, docs, studies it cites

If the source is a GitHub link, read it using available tools before extracting.

### Step 4 — Convert to target format

Use the format mapping from [REFERENCE.md](REFERENCE.md) to structure the output correctly for the user's tool.

Always output `.md` files. Split into `SKILL.md` + `REFERENCE.md` if content exceeds ~100 lines.

### Step 5 — Present the converted skill

Show the user:
1. The complete converted `SKILL.md` content (in a code block)
2. `REFERENCE.md` content if applicable (in a separate code block)
3. Where to put the files for their tool (exact folder path)
4. One-line summary of what the skill does

Then ask:
> "Does this look right? Anything you want to adjust before I write the files?"

### Step 6 — Write the files

Once confirmed, write the files to disk in the correct location for their tool.

## Rules

- Never assume the target tool — always ask first
- Never skip extraction — pull every piece of methodology, not just the summary
- Always split large skills into `SKILL.md` + `REFERENCE.md`
- Keep `SKILL.md` under 100 lines — move detail to `REFERENCE.md`
- The `description` frontmatter field is critical — it must include trigger keywords so the agent knows when to load this skill
- If the source is vague or incomplete, ask clarifying questions before converting
- Domain doesn't matter — convert design skills, marketing skills, dev skills, writing skills, anything

See [REFERENCE.md](REFERENCE.md) for format maps per tool and description writing rules.

---

> **Attribution**: skill-converter by [Mohd Hayaat Ali (@lordpardonme)](https://github.com/lordpardonme/skill-converter). Licensed under CC BY 4.0. If you copy, fork, or build on this skill, you must credit the original author and link to the source repo. Removing this notice violates the license.
