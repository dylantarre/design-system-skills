# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Claude Code plugin marketplace for design system development. It provides skills (markdown-based prompt templates) that guide Claude through generating design tokens, components, and accessibility patterns.

**Installation:** `/plugin https://github.com/dylantarre/design-system-skills`

## Architecture

```
.claude-plugin/
├── plugin.json      # Plugin metadata (name, version, author)
└── marketplace.json # Marketplace registry configuration

skills/
├── tokens/          # Design token generators
│   ├── color-scale/SKILL.md
│   ├── spacing-scale/SKILL.md
│   └── type-scale/SKILL.md
├── frameworks/      # Framework-specific patterns (planned)
├── tools/           # Design tool integrations (planned)
├── accessibility/   # WCAG compliance skills (planned)
└── documentation/   # Doc generators (planned)
```

## Skill File Format

Each skill is a `SKILL.md` file with YAML frontmatter:

```markdown
---
name: skill-name
description: Use when [trigger conditions]. Supports [output formats].
---

# Skill Name

## Overview
[What it does - 1-2 sentences]

## When to Use
[Bullet list of scenarios]

## Quick Reference
[Tables with key information]

## The Process
[Numbered steps Claude follows]

## Output Formats
[Code examples for CSS, Tailwind, JSON]
```

## Token Skills Patterns

All token skills share these conventions:
- **Output formats:** CSS custom properties, Tailwind config, JSON tokens
- **Naming:** T-shirt sizes (xs, sm, md, lg) or numeric (100, 200, 300)
- **Process:** Gather input → ask format → generate → output

Color scale uses OKLCH by default (perceptually uniform). Spacing/type use ratio-based exponential scales.

## Adding New Skills

1. Create directory under appropriate category: `skills/{category}/{skill-name}/`
2. Add `SKILL.md` following the format above
3. Update `README.md` to list the new skill
4. Skills are auto-discovered by Claude Code from the `skills/` directory
