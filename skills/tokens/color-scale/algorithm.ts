/**
 * Color Scale Generation Algorithm
 *
 * Generates perceptually uniform color scales using OKLCH internally,
 * with output in any format (OKLCH, HSL, RGB, hex).
 *
 * Usage:
 *   const scale = generateColorScale('#3B82F6');
 *   const neutral = generateNeutralScale('#3B82F6');
 *   const semantic = generateSemanticColors('#3B82F6');
 */

// ============================================================================
// Color Space Conversions
// ============================================================================

/** Convert hex to RGB tuple */
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 0, 0];
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
  ];
}

/** Convert RGB to hex string */
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

/** sRGB to linear RGB (gamma expansion) */
function srgbToLinear(c: number): number {
  c = c / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/** Linear RGB to sRGB (gamma compression) */
function linearToSrgb(c: number): number {
  const clamped = Math.max(0, Math.min(1, c));
  return clamped <= 0.0031308
    ? Math.round(clamped * 12.92 * 255)
    : Math.round((1.055 * Math.pow(clamped, 1 / 2.4) - 0.055) * 255);
}

/** RGB to OKLCH - the key conversion for perceptual uniformity */
function rgbToOklch(r: number, g: number, b: number): [number, number, number] {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  const l_ = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m_ = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s_ = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  const l = Math.cbrt(l_);
  const m = Math.cbrt(m_);
  const s = Math.cbrt(s_);

  const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
  const bVal = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;

  const C = Math.sqrt(a * a + bVal * bVal);
  let H = Math.atan2(bVal, a) * 180 / Math.PI;
  if (H < 0) H += 360;

  return [L, C, H];
}

/** OKLCH to RGB */
function oklchToRgb(L: number, C: number, H: number): [number, number, number] {
  const a = C * Math.cos(H * Math.PI / 180);
  const b = C * Math.sin(H * Math.PI / 180);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  const lr = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

  return [linearToSrgb(lr), linearToSrgb(lg), linearToSrgb(lb)];
}

/** RGB to HSL */
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

// ============================================================================
// Scale Generation
// ============================================================================

interface ColorStop {
  step: number;
  hex: string;
  oklch: [number, number, number];
  rgb: [number, number, number];
  hsl: [number, number, number];
}

/** The 11 lightness stops - these produce visually balanced scales */
const LIGHTNESS_STOPS = [
  { step: 50,  L: 0.97 },
  { step: 100, L: 0.93 },
  { step: 200, L: 0.87 },
  { step: 300, L: 0.78 },
  { step: 400, L: 0.65 },
  { step: 500, L: 0.55 },
  { step: 600, L: 0.45 },
  { step: 700, L: 0.37 },
  { step: 800, L: 0.27 },
  { step: 900, L: 0.20 },
  { step: 950, L: 0.14 },
];

/** Generate 11-step color scale from base hex */
function generateColorScale(hex: string): ColorStop[] {
  const [r, g, b] = hexToRgb(hex);
  const [, C, H] = rgbToOklch(r, g, b);

  return LIGHTNESS_STOPS.map(({ step, L }) => {
    // Reduce chroma at extremes to prevent washed-out or muddy colors
    const chromaMultiplier = L > 0.9 ? 0.3 : L < 0.2 ? 0.7 : 1;
    const adjustedC = C * chromaMultiplier;

    const [newR, newG, newB] = oklchToRgb(L, adjustedC, H);
    const newHex = rgbToHex(newR, newG, newB);
    const hsl = rgbToHsl(newR, newG, newB);

    return { step, hex: newHex, oklch: [L, adjustedC, H], rgb: [newR, newG, newB], hsl };
  });
}

/** Generate neutral scale tinted with brand hue */
function generateNeutralScale(brandHex: string): ColorStop[] {
  const [r, g, b] = hexToRgb(brandHex);
  const [, , H] = rgbToOklch(r, g, b);
  const neutralHex = rgbToHex(...oklchToRgb(0.55, 0.01, H));
  return generateColorScale(neutralHex);
}

/** Blend semantic hue toward brand for visual harmony */
function generateHarmonizedSemantic(brandHex: string, baseHue: number, influence = 0.15): string {
  const [r, g, b] = hexToRgb(brandHex);
  const [, , brandH] = rgbToOklch(r, g, b);
  const blendedHue = baseHue + (brandH - baseHue) * influence;
  const normalizedHue = ((blendedHue % 360) + 360) % 360;
  return rgbToHex(...oklchToRgb(0.55, 0.15, normalizedHue));
}

/** Generate semantic colors harmonized with brand */
function generateSemanticColors(brandHex: string) {
  return {
    success: generateColorScale(generateHarmonizedSemantic(brandHex, 145, 0.10)),
    warning: generateColorScale(generateHarmonizedSemantic(brandHex, 70, 0.10)),
    error: generateColorScale(generateHarmonizedSemantic(brandHex, 25, 0.08)),
    info: generateColorScale(generateHarmonizedSemantic(brandHex, 250, 0.15)),
  };
}

// ============================================================================
// Output Formatting
// ============================================================================

type ColorFormat = 'oklch' | 'hsl' | 'rgb' | 'hex';

function formatColor(stop: ColorStop, format: ColorFormat): string {
  switch (format) {
    case 'oklch':
      return `oklch(${(stop.oklch[0] * 100).toFixed(1)}% ${stop.oklch[1].toFixed(3)} ${stop.oklch[2].toFixed(1)})`;
    case 'hsl':
      return `hsl(${stop.hsl[0]} ${stop.hsl[1]}% ${stop.hsl[2]}%)`;
    case 'rgb':
      return `rgb(${stop.rgb[0]} ${stop.rgb[1]} ${stop.rgb[2]})`;
    case 'hex':
    default:
      return stop.hex;
  }
}

export {
  hexToRgb, rgbToHex, rgbToOklch, oklchToRgb, rgbToHsl,
  generateColorScale, generateNeutralScale, generateSemanticColors, formatColor,
  type ColorStop, type ColorFormat,
};
