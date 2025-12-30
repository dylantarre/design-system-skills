# Installing Design System Skills for OpenCode

## Prerequisites

- [OpenCode.ai](https://opencode.ai) installed
- Git installed

## Installation Steps

### 1. Clone the Repository

```bash
mkdir -p ~/.config/opencode/design-system-skills
git clone https://github.com/dylantarre/design-system-skills.git ~/.config/opencode/design-system-skills
```

### 2. Add to OpenCode Configuration

Add this to your OpenCode agent instructions:

```markdown
## Design System Skills

You have access to design system generation skills.

**Skills location:** ~/.config/opencode/design-system-skills/skills/

**Categories:**
- `tokens/` - Color, spacing, typography, shadow, radius, breakpoints
- `accessibility/` - Contrast, focus states, ARIA patterns
- `frameworks/` - React, Vue, Svelte, Angular patterns
- `tools/` - Figma, Storybook, Framer integration
- `documentation/` - Token and component docs

When generating design system elements, read the relevant SKILL.md file and follow its process.
```

## Available Skills

### Tokens
| Skill | Description |
|-------|-------------|
| `tokens/color-scale` | OKLCH color palette generation |
| `tokens/spacing-scale` | Ratio-based spacing tokens |
| `tokens/type-scale` | Modular typography scales |
| `tokens/shadow-scale` | Layered box-shadow tokens |
| `tokens/radius-scale` | Border radius tokens |
| `tokens/breakpoints` | Responsive breakpoints |

### Accessibility
| Skill | Description |
|-------|-------------|
| `accessibility/color-contrast` | WCAG contrast validation |
| `accessibility/focus-states` | Keyboard focus indicators |
| `accessibility/aria-patterns` | ARIA component patterns |

### Frameworks
| Skill | Description |
|-------|-------------|
| `frameworks/react` | React/Next.js patterns |
| `frameworks/vue` | Vue 3 Composition API |
| `frameworks/svelte` | Svelte 5 runes |
| `frameworks/angular` | Angular signals |

### Tools
| Skill | Description |
|-------|-------------|
| `tools/figma` | Figma Variables sync |
| `tools/storybook` | Storybook stories |
| `tools/framer` | Framer code components |

### Documentation
| Skill | Description |
|-------|-------------|
| `documentation/token-docs` | Token reference docs |
| `documentation/component-docs` | Component API docs |

## Usage

When asked to generate design tokens or components:

1. Read the skill file from the skills directory
2. Follow "The Process" section in the skill
3. Ask clarifying questions as specified
4. Output in requested format (CSS, Tailwind, JSON)

## Updating

```bash
cd ~/.config/opencode/design-system-skills
git pull
```

## Getting Help

- Repository: https://github.com/dylantarre/design-system-skills
- Issues: https://github.com/dylantarre/design-system-skills/issues
