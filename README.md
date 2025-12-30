# Design System Skills

Token generators, component patterns, accessibility guidance, and framework integrations.

## Installation

```bash
/plugin https://github.com/dylantarre/design-system-skills
```

## Skills

### Tokens
Generate design tokens in CSS, Tailwind, or JSON formats:

- **color-scale** - Generate color palettes using OKLCH color science
- **spacing-scale** - Create spacing tokens with customizable ratios
- **type-scale** - Typography scales with modular ratios
- **shadow-scale** - Elevation and depth tokens
- **radius-scale** - Border radius tokens
- **breakpoints** - Responsive breakpoint definitions
- **motion-scale** - Animation duration, easing, and timing tokens
- **z-index-scale** - Layering tokens for predictable stacking contexts
- **design-tokens-structure** - Token architecture (primitive, semantic, component layers)
- **responsive-typography** - Fluid type that scales with viewport using clamp()

### Frameworks
Framework-specific component patterns:

- **react** - React components with design tokens
- **vue** - Vue components with design tokens
- **svelte** - Svelte components with design tokens
- **angular** - Angular components with design tokens

### Tools
Design tool integrations:

- **figma** - Sync tokens with Figma
- **storybook** - Component documentation
- **framer** - Framer token integration
- **style-dictionary** - Multi-platform token transformation (CSS, iOS, Android)

### Accessibility
WCAG compliance and a11y patterns:

- **color-contrast** - Check contrast ratios
- **focus-states** - Keyboard focus indicators
- **aria-patterns** - ARIA for interactive components

### Patterns
Implementation patterns for common challenges:

- **dark-mode** - Theme switching, semantic tokens, system preference detection
- **compound-components** - Radix/Headless UI patterns for accessible composable components
- **icon-system** - SVG sprites, icon components, sizing tokens, and accessibility
- **layout-primitives** - Stack, Cluster, Sidebar, Grid composition patterns

### Documentation
Generate documentation:

- **token-docs** - Design token documentation
- **component-docs** - Component API documentation

## Output Formats

Token skills support multiple output formats:

**CSS Custom Properties:**
```css
:root {
  --color-primary-500: #3b82f6;
  --spacing-md: 1rem;
}
```

**Tailwind Config:**
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { 500: '#3b82f6' }
      }
    }
  }
}
```

**JSON Tokens:**
```json
{
  "color": {
    "primary": {
      "500": { "value": "#3b82f6" }
    }
  }
}
```

## License

MIT
