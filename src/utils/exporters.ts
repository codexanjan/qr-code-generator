import QRCodeStyling from 'qr-code-styling';
import jsPDF from 'jspdf';
import { ExportOptions, QRCustomization } from '../types/qr';

/**
 * Creates a configured QRCodeStyling instance for rendering or exporting.
 */
export function createQRStylingInstance(
  payload: string,
  customization: QRCustomization,
  targetSize: number = customization.size
): QRCodeStyling {
  const isGradient = customization.colorMode === 'gradient';

  // Base dots options
  const dotsOptions: any = {
    type: customization.dotType,
  };

  if (isGradient) {
    dotsOptions.gradient = {
      type: customization.gradientType,
      rotation: (customization.gradientRotation * Math.PI) / 180,
      colorStops: [
        { offset: 0, color: customization.fgColor },
        { offset: 1, color: customization.fgColor2 },
      ],
    };
  } else {
    dotsOptions.color = customization.fgColor;
  }

  // Corners square options
  const cornersSquareOptions: any = {
    type: customization.cornerSquareType,
  };
  if (customization.customCornerColors) {
    cornersSquareOptions.color = customization.cornerSquareColor;
  } else if (!isGradient) {
    cornersSquareOptions.color = customization.fgColor;
  }

  // Corners dot options
  const cornersDotOptions: any = {
    type: customization.cornerDotType,
  };
  if (customization.customCornerColors) {
    cornersDotOptions.color = customization.cornerDotColor;
  } else if (!isGradient) {
    cornersDotOptions.color = customization.fgColor;
  }

  return new QRCodeStyling({
    width: targetSize,
    height: targetSize,
    data: payload,
    margin: customization.margin,
    qrOptions: {
      typeNumber: 0,
      mode: 'Byte',
      errorCorrectionLevel: customization.errorCorrectionLevel,
    },
    imageOptions: {
      hideBackgroundDots: customization.logoBackground,
      imageSize: customization.logoSize,
      margin: customization.logoMargin,
      crossOrigin: 'anonymous',
    },
    dotsOptions,
    cornersSquareOptions,
    cornersDotOptions,
    backgroundOptions: {
      color: customization.bgTransparent ? 'transparent' : customization.bgColor,
    },
    image: customization.logo || undefined,
  });
}

/**
 * Exports the QR code in the requested format (PNG, JPG, SVG, PDF).
 */
export async function exportQRCode(
  payload: string,
  customization: QRCustomization,
  options: ExportOptions,
  filename: string = 'qrcode'
): Promise<void> {
  const qr = createQRStylingInstance(payload, customization, options.resolution);

  if (options.format === 'svg') {
    const rawData = await qr.getRawData('svg');
    if (!rawData) throw new Error('Failed to generate SVG data');
    const blob = rawData instanceof Blob ? rawData : new Blob([rawData as any], { type: 'image/svg+xml;charset=utf-8' });
    downloadBlob(blob, `${filename}.svg`);
    return;
  }

  // For canvas-based formats (PNG, JPG, PDF)
  const rawPng = await qr.getRawData('png');
  if (!rawPng) throw new Error('Failed to render QR Code bitmap');

  const pngBlob = rawPng instanceof Blob ? rawPng : new Blob([rawPng as any], { type: 'image/png' });
  const qrImage = await blobToImage(pngBlob);

  // If a frame/badge is configured, composite it on a canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not available');

  const frame = customization.frame;
  const hasFrame = options.includeFrame && frame && frame.style !== 'none';
  const qrSize = options.resolution;

  if (!hasFrame) {
    canvas.width = qrSize;
    canvas.height = qrSize;

    if (options.format === 'jpg' || (!customization.bgTransparent && !options.transparentBackground)) {
      ctx.fillStyle = customization.bgColor || '#ffffff';
      ctx.fillRect(0, 0, qrSize, qrSize);
    }
    ctx.drawImage(qrImage, 0, 0, qrSize, qrSize);
  } else {
    // Layout with stylish frames
    const padding = Math.round(qrSize * 0.08);
    const bannerHeight = Math.round(qrSize * 0.16);

    if (frame.style === 'bottom-banner' || frame.style === 'card') {
      canvas.width = qrSize + padding * 2;
      canvas.height = qrSize + padding * 2 + bannerHeight;

      // Card Background
      ctx.fillStyle = customization.bgColor || '#ffffff';
      roundRect(ctx, 0, 0, canvas.width, canvas.height, Math.round(padding * 0.8));
      ctx.fill();

      // Draw QR Image
      ctx.drawImage(qrImage, padding, padding, qrSize, qrSize);

      // Draw Banner at bottom
      ctx.fillStyle = frame.bgColor || '#0f172a';
      roundRect(
        ctx,
        padding,
        qrSize + padding + Math.round(padding * 0.2),
        qrSize,
        bannerHeight - Math.round(padding * 0.4),
        Math.round(bannerHeight * 0.25)
      );
      ctx.fill();

      // Text
      ctx.fillStyle = frame.textColor || '#ffffff';
      ctx.font = `bold ${Math.round(bannerHeight * 0.38)}px 'Plus Jakarta Sans', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        frame.text || 'SCAN ME',
        canvas.width / 2,
        qrSize + padding + Math.round(bannerHeight / 2)
      );
    } else if (frame.style === 'top-banner') {
      canvas.width = qrSize + padding * 2;
      canvas.height = qrSize + padding * 2 + bannerHeight;

      // Card Background
      ctx.fillStyle = customization.bgColor || '#ffffff';
      roundRect(ctx, 0, 0, canvas.width, canvas.height, Math.round(padding * 0.8));
      ctx.fill();

      // Draw Banner at top
      ctx.fillStyle = frame.bgColor || '#0f172a';
      roundRect(ctx, padding, padding, qrSize, bannerHeight - Math.round(padding * 0.4), Math.round(bannerHeight * 0.25));
      ctx.fill();

      // Text
      ctx.fillStyle = frame.textColor || '#ffffff';
      ctx.font = `bold ${Math.round(bannerHeight * 0.38)}px 'Plus Jakarta Sans', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(frame.text || 'SCAN ME', canvas.width / 2, padding + Math.round(bannerHeight * 0.38));

      // Draw QR Image
      ctx.drawImage(qrImage, padding, padding + bannerHeight, qrSize, qrSize);
    } else {
      // Pill / Badge style
      const pillHeight = Math.round(qrSize * 0.14);
      canvas.width = qrSize + padding * 2;
      canvas.height = qrSize + padding * 2 + pillHeight;

      ctx.fillStyle = customization.bgColor || '#ffffff';
      roundRect(ctx, 0, 0, canvas.width, canvas.height, Math.round(padding * 0.8));
      ctx.fill();

      ctx.drawImage(qrImage, padding, padding, qrSize, qrSize);

      // Pill shape
      const pillWidth = Math.min(qrSize * 0.85, (frame.text?.length || 7) * Math.round(pillHeight * 0.5) + padding * 2);
      const pillX = (canvas.width - pillWidth) / 2;
      const pillY = qrSize + padding;

      ctx.fillStyle = frame.bgColor || '#0f172a';
      roundRect(ctx, pillX, pillY, pillWidth, pillHeight, Math.round(pillHeight / 2));
      ctx.fill();

      ctx.fillStyle = frame.textColor || '#ffffff';
      ctx.font = `bold ${Math.round(pillHeight * 0.42)}px 'Plus Jakarta Sans', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(frame.text || 'SCAN ME', canvas.width / 2, pillY + Math.round(pillHeight / 2));
    }
  }

  // Handle PDF
  if (options.format === 'pdf') {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Document Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(30, 41, 59);
    doc.text(options.title || 'Scan This QR Code', pageWidth / 2, 35, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(100, 116, 139);
    doc.text('Point your smartphone camera to access instant content', pageWidth / 2, 43, { align: 'center' });

    // Render Canvas image into PDF
    const qrDataUrl = canvas.toDataURL('image/png', 1.0);
    const imgSizeMM = 120; // 120mm x 120mm on A4
    const xPos = (pageWidth - imgSizeMM) / 2;
    const yPos = 55;

    // Subtle card border
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(xPos - 8, yPos - 8, imgSizeMM + 16, imgSizeMM + 16, 6, 6);
    doc.addImage(qrDataUrl, 'PNG', xPos, yPos, imgSizeMM, imgSizeMM);

    // Footer note
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text('Generated with QR Studio Pro • Client-Side & Secure', pageWidth / 2, pageHeight - 20, { align: 'center' });

    doc.save(`${filename}.pdf`);
    return;
  }

  // Handle PNG / JPG
  if (options.format === 'jpg') {
    canvas.toBlob(
      (blob) => {
        if (blob) downloadBlob(blob, `${filename}.jpg`);
      },
      'image/jpeg',
      0.95
    );
  } else {
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, `${filename}.png`);
    }, 'image/png');
  }
}

// Helpers
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function blobToImage(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = reject;
    img.src = url;
  });
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
