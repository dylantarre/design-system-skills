# Installing Design System Skills for Codex

Quick setup to enable design system skills in Codex.

## Installation

1. **Clone the repository**:
   ```bash
   mkdir -p ~/.codex/design-system-skills
   cd ~/.codex/design-system-skills
   git clone https://github.com/dylantarre/design-system-skills.git .
   ```

2. **Update ~/.codex/AGENTS.md** to include:
   ```markdown
   ## Design System Skills

   You have access to design system skills for generating tokens, components, and patterns.

   **Skills location:** ~/.codex/design-system-skills/skills/

   **Available skills:**
   - `tokens/color-scale` - Generate OKLCH color palettes
   - `tokens/spacing-scale` - Create spacing token scales
   - `tokens/type-scale` - Typography with modular ratios
   - `tokens/shadow-scale` - Elevation/depth tokens
   - `tokens/radius-scale` - Border radius tokens
   - `tokens/breakpoints` - Responsive breakpoints
   - `accessibility/color-contrast` - WCAG contrast checking
   - `accessibility/focus-states` - Keyboard focus indicators
   - `accessibility/aria-patterns` - ARIA for components
   - `frameworks/react` - React component patterns
   - `frameworks/vue` - Vue 3 component patterns
   - `frameworks/svelte` - Svelte 5 component patterns
   - `frameworks/angular` - Angular component patterns
   - `tools/figma` - Figma token sync
   - `tools/storybook` - Storybook documentation
   - `tools/framer` - Framer integration
   - `documentation/token-docs` - Token documentation
   - `documentation/component-docs` - Component API docs

   When asked to create design tokens, components, or design system patterns, read the relevant skill file and follow its instructions.
   ```

## Usage

When a user asks to generate design tokens or components:

1. Read the skill: `cat ~/.codex/design-system-skills/skills/<category>/<skill>/SKILL.md`
2. Follow the process defined in the skill
3. Output in the requested format (CSS, Tailwind, JSON)

## Updating

```bash
cd ~/.codex/design-system-skills
git pull
```
