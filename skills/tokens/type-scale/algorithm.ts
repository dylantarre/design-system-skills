/**
 * Type Scale Generation Algorithm
 *
 * Generates typography scales using musical interval ratios.
 * Includes automatic line-height calculation based on font size.
 *
 * Usage:
 *   const tokens = generateTypeScale(16, 1.25, 6, 2, 'px');
 */

type UnitType = 'px' | 'rem' | 'em';

interface TypeToken {
  name: string;
  size: number;
  formatted: string;
  lineHeight: string;
}

/** Musical interval ratios - the foundation of harmonious type scales */
const SCALE_PRESETS = [
  { name: 'Minor Second', ratio: 1.067 },
  { name: 'Major Second', ratio: 1.125 },
  { name: 'Minor Third', ratio: 1.2 },
  { name: 'Major Third', ratio: 1.25 },
  { name: 'Perfect Fourth', ratio: 1.333 },
  { name: 'Augmented Fourth', ratio: 1.414 },
  { name: 'Perfect Fifth', ratio: 1.5 },
  { name: 'Golden Ratio', ratio: 1.618 },
];

/** Names for sizes below base */
const TYPE_NAMES_DOWN = ['xxs', 'xs', 'sm'];

/** Names for sizes above base */
const TYPE_NAMES_UP = ['lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'];

/**
 * Calculate optimal line height based on font size.
 * Larger fonts need tighter line height for readability.
 */
function calculateLineHeight(fontSize: number): number {
  if (fontSize <= 14) return 1.7;
  if (fontSize <= 18) return 1.6;
  if (fontSize <= 24) return 1.5;
  if (fontSize <= 32) return 1.4;
  if (fontSize <= 48) return 1.3;
  return 1.2;
}

/**
 * Generate a typography scale.
 *
 * @param baseSize - The base font size (typically 16px)
 * @param ratio - Scale ratio (e.g., 1.25 for Major Third)
 * @param stepsUp - Number of sizes above base (for headings)
 * @param stepsDown - Number of sizes below base (for small text)
 * @param unit - Output unit: 'px', 'rem', or 'em'
 *
 * The algorithm:
 *   size = baseSize * (ratio ^ step)
 *
 * Steps above base use positive exponents, below use negative.
 */
function generateTypeScale(
  baseSize: number,
  ratio: number,
  stepsUp: number,
  stepsDown: number,
  unit: UnitType
): TypeToken[] {
  const tokens: TypeToken[] = [];

  // Generate steps below base (smallest first)
  for (let i = stepsDown; i > 0; i--) {
    const size = baseSize / Math.pow(ratio, i);
    const roundedSize = Math.round(size * 100) / 100;
    const lineHeight = calculateLineHeight(roundedSize);
    const nameIndex = 3 - i; // Map to xxs, xs, sm
    const name = TYPE_NAMES_DOWN[nameIndex] || `down-${i}`;

    tokens.push({
      name,
      size: roundedSize,
      formatted: `${roundedSize}${unit}`,
      lineHeight: lineHeight.toFixed(2),
    });
  }

  // Base size
  const baseLineHeight = calculateLineHeight(baseSize);
  tokens.push({
    name: 'base',
    size: baseSize,
    formatted: `${baseSize}${unit}`,
    lineHeight: baseLineHeight.toFixed(2),
  });

  // Generate steps above base
  for (let i = 1; i <= stepsUp; i++) {
    const size = baseSize * Math.pow(ratio, i);
    const roundedSize = Math.round(size * 100) / 100;
    const lineHeight = calculateLineHeight(roundedSize);
    const name = TYPE_NAMES_UP[i - 1] || `${i + 1}xl`;

    tokens.push({
      name,
      size: roundedSize,
      formatted: `${roundedSize}${unit}`,
      lineHeight: lineHeight.toFixed(2),
    });
  }

  return tokens;
}

// ============================================================================
// Output Formatting
// ============================================================================

/** Generate CSS custom properties */
function generateCSS(tokens: TypeToken[], prefix = 'text'): string {
  let css = ':root {\n';
  css += '  /* Font Sizes */\n';
  tokens.forEach((token) => {
    css += `  --${prefix}-${token.name}: ${token.formatted};\n`;
  });
  css += '\n  /* Line Heights */\n';
  tokens.forEach((token) => {
    css += `  --leading-${token.name}: ${token.lineHeight};\n`;
  });
  css += '}\n';
  return css;
}

/** Generate Tailwind config */
function generateTailwind(tokens: TypeToken[]): string {
  let config = 'module.exports = {\n  theme: {\n    fontSize: {\n';
  tokens.forEach((token) => {
    config += `      '${token.name}': ['${token.formatted}', { lineHeight: '${token.lineHeight}' }],\n`;
  });
  config += '    }\n  }\n}\n';
  return config;
}

/** Generate JSON tokens */
function generateJSON(tokens: TypeToken[], prefix = 'text'): string {
  const obj: Record<string, { fontSize: string; lineHeight: string }> = {};
  tokens.forEach((token) => {
    obj[`${prefix}-${token.name}`] = {
      fontSize: token.formatted,
      lineHeight: token.lineHeight,
    };
  });
  return JSON.stringify({ typography: obj }, null, 2);
}

export {
  generateTypeScale,
  calculateLineHeight,
  generateCSS,
  generateTailwind,
  generateJSON,
  SCALE_PRESETS,
  TYPE_NAMES_DOWN,
  TYPE_NAMES_UP,
  type TypeToken,
  type UnitType,
};
