import { QRCustomization, ScannabilityReport } from '../types/qr';

// Helper to convert hex or named colors to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleanHex = hex.replace(/^#/, '');
  if (cleanHex.length === 3) {
    return {
      r: parseInt(cleanHex[0] + cleanHex[0], 16),
      g: parseInt(cleanHex[1] + cleanHex[1], 16),
      b: parseInt(cleanHex[2] + cleanHex[2], 16),
    };
  }
  if (cleanHex.length === 6) {
    return {
      r: parseInt(cleanHex.substring(0, 2), 16),
      g: parseInt(cleanHex.substring(2, 4), 16),
      b: parseInt(cleanHex.substring(4, 6), 16),
    };
  }
  return null;
}

// Calculate relative luminance (WCAG standard)
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio between two hex colors
export function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1) || { r: 0, g: 0, b: 0 };
  const rgb2 = hexToRgb(hex2) || { r: 255, g: 255, b: 255 };

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Evaluates the scannability, contrast, error tolerance, and readability of the configured QR code.
 */
export function evaluateQRScannability(
  customization: QRCustomization,
  payloadLength: number = 50
): ScannabilityReport {
  let score = 100;
  const warnings: string[] = [];
  const tips: string[] = [];

  const bgHex = customization.bgTransparent ? '#ffffff' : customization.bgColor;
  const fg1Hex = customization.fgColor;
  const fg2Hex = customization.colorMode === 'gradient' ? customization.fgColor2 : fg1Hex;

  // 1. Contrast Check
  const contrast1 = getContrastRatio(fg1Hex, bgHex);
  const contrast2 = getContrastRatio(fg2Hex, bgHex);
  const minContrast = Math.min(contrast1, contrast2);

  if (minContrast < 2.5) {
    score -= 45;
    warnings.push('Extremely low contrast between QR pattern and background. Standard scanners will likely fail.');
    tips.push('Increase contrast by pairing dark foreground colors with a light background.');
  } else if (minContrast < 4.5) {
    score -= 25;
    warnings.push('Moderate contrast. Scanning might be slow in dim lighting or with older camera sensors.');
    tips.push('Aim for a contrast ratio of at least 5:1 for guaranteed instant scanning.');
  } else if (minContrast >= 7.0) {
    tips.push('Superb WCAG AAA contrast ratio for lightning-fast scan detection.');
  }

  // 2. Inverted QR Check (Light QR on Dark Background)
  const bgLum = getLuminance(...(Object.values(hexToRgb(bgHex) || { r: 255, g: 255, b: 255 }) as [number, number, number]));
  const fgLum = getLuminance(...(Object.values(hexToRgb(fg1Hex) || { r: 0, g: 0, b: 0 }) as [number, number, number]));
  if (fgLum > bgLum && !customization.bgTransparent) {
    score -= 10;
    warnings.push('Inverted colors (light dots on dark background). Some basic camera apps take longer to decode.');
    tips.push('Standard black-on-white or dark-on-light has highest universal hardware support.');
  }

  // 3. Logo & Error Correction Check
  if (customization.logo) {
    const ec = customization.errorCorrectionLevel;
    if (ec === 'L') {
      score -= 30;
      warnings.push('Error correction level "Low (L)" with a center logo will cause scan failure.');
      tips.push('Switch Error Correction to "High (H)" or "Quartile (Q)" when using a logo.');
    } else if (ec === 'M' && customization.logoSize > 0.3) {
      score -= 15;
      warnings.push('Large logo paired with Medium (M) error correction may obscure critical data modules.');
      tips.push('Upgrade error correction to High (H) or decrease logo size.');
    }

    if (customization.logoSize > 0.38) {
      score -= 15;
      warnings.push('Logo occupies > 38% of the QR matrix area.');
    }
  }

  // 4. Data Density / Payload Length
  if (payloadLength > 450) {
    score -= 12;
    warnings.push('Dense payload requires a fine module grid. Print at larger physical dimensions.');
    tips.push('Consider using URL shorteners for lengthy links to keep the QR grid clean.');
  }

  // 5. Corner Contrast Check
  if (customization.customCornerColors) {
    const cornerSquareContrast = getContrastRatio(customization.cornerSquareColor, bgHex);
    const cornerDotContrast = getContrastRatio(customization.cornerDotColor, bgHex);
    if (cornerSquareContrast < 3.5 || cornerDotContrast < 3.5) {
      score -= 15;
      warnings.push('Corner eye finder markers have low contrast. Scanners rely heavily on these 3 corners to locate the QR code.');
    }
  }

  // Normalize score
  score = Math.max(10, Math.min(100, Math.round(score)));

  let grade: ScannabilityReport['grade'] = 'Excellent';
  let level: ScannabilityReport['level'] = 'green';

  if (score < 50) {
    grade = 'Poor';
    level = 'red';
  } else if (score < 75) {
    grade = 'Fair';
    level = 'yellow';
  } else if (score < 90) {
    grade = 'Good';
    level = 'green';
  }

  return {
    score,
    grade,
    contrastRatio: Number(minContrast.toFixed(2)),
    warnings,
    tips,
    level,
  };
}
