# Design System Skills

Design system skills by [buoy.design](https://buoy.design) — token generators, component patterns, accessibility guidance, and framework integrations.

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

### Accessibility
WCAG compliance and a11y patterns:

- **color-contrast** - Check contrast ratios
- **focus-states** - Keyboard focus indicators
- **aria-patterns** - ARIA for interactive components

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
