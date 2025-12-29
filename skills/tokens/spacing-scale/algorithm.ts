/**
 * Spacing Scale Generation Algorithm
 *
 * Generates consistent spacing scales using exponential ratios.
 * The scale is centered on a base value, expanding in both directions.
 *
 * Usage:
 *   const tokens = generateSpacingScale(4, 1.5, 10, 'px', 'tshirt');
 */

type UnitType = 'px' | 'rem' | 'em';
type NamingStyle = 'tshirt' | 'numeric';

interface SpacingToken {
  name: string;
  value: number;
  formatted: string;
}

/** T-shirt size names from smallest to largest */
const TSHIRT_SIZES = ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'];

/**
 * Generate a spacing scale.
 *
 * @param baseValue - The middle value of the scale (e.g., 4 for 4px)
 * @param ratio - Growth ratio between steps (e.g., 1.5, 2)
 * @param steps - Total number of steps to generate
 * @param unit - Output unit: 'px', 'rem', or 'em'
 * @param namingStyle - 'tshirt' (xs, sm, md...) or 'numeric' (100, 200, 300...)
 *
 * The algorithm:
 *   value = baseValue * (ratio ^ (step - midpoint))
 *
 * This centers the base value at the midpoint, with smaller values below
 * and larger values above.
 */
function generateSpacingScale(
  baseValue: number,
  ratio: number,
  steps: number,
  unit: UnitType,
  namingStyle: NamingStyle
): SpacingToken[] {
  const tokens: SpacingToken[] = [];
  const midpoint = Math.floor(steps / 2);

  for (let i = 0; i < steps; i++) {
    const exponent = i - midpoint;
    const value = baseValue * Math.pow(ratio, exponent);
    const roundedValue = Math.round(value * 100) / 100;

    let name: string;
    if (namingStyle === 'tshirt') {
      // Map step index to t-shirt size, centering on 'md'
      const sizeIndex = i + Math.max(0, 4 - midpoint);
      name = TSHIRT_SIZES[sizeIndex] || `${i + 1}`;
    } else {
      // Numeric: 100, 200, 300...
      name = String((i + 1) * 100);
    }

    tokens.push({
      name,
      value: roundedValue,
      formatted: `${roundedValue}${unit}`,
    });
  }

  return tokens;
}

// ============================================================================
// Output Formatting
// ============================================================================

/** Generate CSS custom properties */
function generateCSS(tokens: SpacingToken[], prefix = 'spacing'): string {
  let css = ':root {\n';
  tokens.forEach((token) => {
    css += `  --${prefix}-${token.name}: ${token.formatted};\n`;
  });
  css += '}\n';
  return css;
}

/** Generate Tailwind config */
function generateTailwind(tokens: SpacingToken[]): string {
  let config = 'module.exports = {\n  theme: {\n    spacing: {\n';
  tokens.forEach((token) => {
    config += `      '${token.name}': '${token.formatted}',\n`;
  });
  config += '    }\n  }\n}\n';
  return config;
}

/** Generate JSON tokens */
function generateJSON(tokens: SpacingToken[], prefix = 'spacing'): string {
  const obj: Record<string, string> = {};
  tokens.forEach((token) => {
    obj[`${prefix}-${token.name}`] = token.formatted;
  });
  return JSON.stringify({ spacing: obj }, null, 2);
}

// ============================================================================
// Common Presets
// ============================================================================

const RATIO_PRESETS = {
  tight: 1.25,      // Subtle progression
  balanced: 1.5,    // Good default
  golden: 1.618,    // Golden ratio
  dramatic: 2,      // Doubles each step (4, 8, 16, 32...)
};

export {
  generateSpacingScale,
  generateCSS,
  generateTailwind,
  generateJSON,
  TSHIRT_SIZES,
  RATIO_PRESETS,
  type SpacingToken,
  type UnitType,
  type NamingStyle,
};
