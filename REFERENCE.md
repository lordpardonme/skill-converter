# Skill Converter — Reference

## Format Map by Tool

Use this to know exactly how to structure the output `.md` for each tool.

---

### Antigravity

**Frontmatter fields:**
```md
---
name: skill-name
description: What it does. Use when [specific triggers — keywords, file types, user actions].
---
```

**File location:**
```
.agents/skills/<skill-name>/SKILL.md
.agents/skills/<skill-name>/REFERENCE.md   (if needed)
```

**Rules:**
- `description` is what the agent reads to decide when to load the skill — make it specific
- `SKILL.md` should be under 100 lines
- Split detailed content into `REFERENCE.md`
- Use `## Quick Start`, `## Workflow`, `## Rules` sections

---

### Claude Code

**Frontmatter fields:**
```md
---
name: skill-name
description: What the agent does and when to invoke it.
tools: Read, Write, Bash, Grep, Glob, WebFetch   (list only what it needs)
---
```

**File location:**
```
.claude/agents/<skill-name>.md
```

**Rules:**
- Single file (no split)
- `tools` field restricts what the agent can use — be minimal
- Can be much longer than Antigravity SKILL.md — all content in one file is fine

---

### Cursor

**Frontmatter fields:**
```md
---
description: What this rule does and when it applies.
globs: **/*.ts, **/*.tsx   (file patterns this rule applies to — optional)
alwaysApply: false
---
```

**File location:**
```
.cursor/rules/<skill-name>.mdc
```

**Rules:**
- Extension is `.mdc` (not `.md`) but content is markdown
- `globs` makes the rule auto-attach when matching files are open
- `alwaysApply: true` to always include regardless of context
- No `name` field — file name IS the name

---

### Codex (OpenAI Codex)

**File location:**
```
.codex/<skill-name>.md
```

**Rules:**
- No strict frontmatter — plain markdown
- Start with a `# Title` heading
- Include a clear `## Purpose` section at the top
- Keep it concise and instruction-focused

---

### Zed

**File location:**
```
.zed/instructions/<skill-name>.md
```

**Rules:**
- Plain markdown, no frontmatter required
- Zed reads these as context for its AI assistant
- Use clear headings and bullet lists

---

### Generic / Other / Unknown Tool

When the user names a tool not on this list:

```md
---
name: skill-name
description: What it does. Use when [triggers].
---
```

**File location:**
```
skills/<skill-name>/SKILL.md
```

Tell the user: "I've used a generic format. Check your tool's docs for the exact frontmatter — the content and structure are solid, just the wrapper may need adjusting."

---

## Description Writing Rules

The `description` field is the most important part of any skill. It's what the agent reads to decide whether to load the skill. Write it well.

**Format:**
- Max ~200 words (1024 chars absolute max for Antigravity)
- First sentence: what it does
- Second sentence: "Use when [specific triggers]"
- Include keywords the user would naturally say

**Good example:**
```
Senior UI/UX design critic that audits interfaces using Nielsen Norman Group research and WCAG accessibility standards. Use when user shares screenshots, CSS, HTML, or asks for design feedback, font critique, color palette review, layout audit, or accessibility check.
```

**Bad example:**
```
Helps with design.
```

---

## Extraction Checklist

When reading a source agent/skill file, extract all of these:

- [ ] **Name** — what it's called
- [ ] **Domain** — design / marketing / dev / writing / etc.
- [ ] **Philosophy** — the mindset (e.g. "research over opinion", "ship over perfection")
- [ ] **Triggers** — when to activate (keywords, file types, user actions)
- [ ] **Workflows** — step-by-step processes
- [ ] **Rules** — always/never do
- [ ] **Response format** — how output is structured
- [ ] **Examples** — good vs bad examples included in the source
- [ ] **Anti-patterns** — what it warns against
- [ ] **References** — sources, docs, studies, URLs cited
- [ ] **Personality** — tone, style, how it communicates

Don't summarize — extract fully. If it's long, that's what `REFERENCE.md` is for.

---

## Output Structure Decision Tree

```
Is SKILL.md content > 100 lines?
├── YES → Split into SKILL.md (core) + REFERENCE.md (detail)
└── NO  → Single SKILL.md is fine

Is the source a GitHub link?
├── YES → Fetch raw content first, then extract
└── NO  → Extract directly from pasted/attached content

Is the target tool on the format map?
├── YES → Use exact format from map above
└── NO  → Use Generic format, note it to the user
```

---

## Common Source Formats

### Claude Code Agent (`.claude/agents/*.md`)
Identified by: `tools:` frontmatter field, often very long, includes `## Your Core Philosophy` or similar sections.

### Cursor Rule (`.cursor/rules/*.mdc`)
Identified by: `globs:` or `alwaysApply:` frontmatter, `.mdc` extension.

### Antigravity Skill
Identified by: `name:` + `description:` frontmatter only, split across `SKILL.md` + optional `REFERENCE.md`.

### Raw markdown / no format
Extract by structure — look for headings, bullet lists, and instructional language regardless of format.
