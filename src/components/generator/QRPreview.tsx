import React, { useEffect, useRef, useState } from 'react';
import { useQR } from '../../context/QRContext';
import { createQRStylingInstance } from '../../utils/exporters';
import {
  RotateCcw,
  Copy,
  Check,
  ZoomIn,
  ShieldCheck,
  AlertTriangle,
  Info,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const QRPreview: React.FC = () => {
  const { payload, customization, scannabilityReport, resetCustomization, showToast, addToHistory } = useQR();
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    // Create 320px responsive preview instance
    const qrInstance = createQRStylingInstance(payload, customization, 320);
    qrInstance.append(containerRef.current);

    // Capture preview for history after render
    const timeout = setTimeout(async () => {
      try {
        const raw = await qrInstance.getRawData('png');
        if (raw) {
          const blob = raw instanceof Blob ? raw : new Blob([raw as any], { type: 'image/png' });
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.result) {
              addToHistory(reader.result as string);
            }
          };
          reader.readAsDataURL(blob);
        }
      } catch (err) {
        // silent capture fallback
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, [payload, customization, addToHistory]);

  const copyToClipboard = async () => {
    try {
      const qrInstance = createQRStylingInstance(payload, customization, 1024);
      const raw = await qrInstance.getRawData('png');
      if (!raw) throw new Error('Failed to capture QR image');

      const blob = raw instanceof Blob ? raw : new Blob([raw as any], { type: 'image/png' });
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);

      setCopied(true);
      showToast({
        type: 'success',
        title: 'Copied to clipboard!',
        message: 'QR code image copied. You can paste it into Figma, Canva, or docs.',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showToast({
        type: 'warning',
        title: 'Clipboard restricted',
        message: 'Direct clipboard image copy is not supported in this browser. Use the download button below.',
      });
    }
  };

  const frame = customization.frame;
  const hasFrame = frame && frame.style !== 'none';

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Center QR Preview Container */}
      <div className="relative group">
        {/* Glow ambient background */}
        <div className="absolute -inset-2 bg-gradient-to-r from-brand-500/20 via-accent-500/20 to-brand-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-90 transition duration-500" />

        {/* Card Box */}
        <div
          className="relative p-6 sm:p-7 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-800/80 transition-all duration-300 flex flex-col items-center justify-center overflow-hidden"
          style={{
            backgroundColor: customization.bgTransparent ? 'transparent' : customization.bgColor || '#ffffff',
          }}
        >
          {/* Top Banner Frame */}
          {hasFrame && frame.style === 'top-banner' && (
            <div
              className="w-full py-2 px-4 mb-3 rounded-xl text-center font-bold text-xs uppercase tracking-wider shadow-sm"
              style={{
                backgroundColor: frame.bgColor,
                color: frame.textColor,
              }}
            >
              {frame.text || 'SCAN ME'}
            </div>
          )}

          {/* QR Canvas Target */}
          <div
            ref={containerRef}
            className="flex items-center justify-center max-w-[280px] sm:max-w-[320px] aspect-square rounded-2xl overflow-hidden"
          />

          {/* Bottom Banner Frame */}
          {hasFrame && (frame.style === 'bottom-banner' || frame.style === 'card') && (
            <div
              className="w-full py-2 px-4 mt-3 rounded-xl text-center font-bold text-xs uppercase tracking-wider shadow-sm"
              style={{
                backgroundColor: frame.bgColor,
                color: frame.textColor,
              }}
            >
              {frame.text || 'SCAN ME'}
            </div>
          )}

          {/* Pill Badge Frame */}
          {hasFrame && frame.style === 'pill' && (
            <div
              className="mt-3 px-5 py-1.5 rounded-full text-center font-bold text-xs uppercase tracking-wider shadow-sm"
              style={{
                backgroundColor: frame.bgColor,
                color: frame.textColor,
              }}
            >
              {frame.text || 'SCAN ME'}
            </div>
          )}
        </div>
      </div>

      {/* Scannability Quality Widget */}
      <div className="w-full max-w-sm">
        <button
          onClick={() => setShowScoreModal(true)}
          className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all ${
            scannabilityReport.level === 'green'
              ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100/80'
              : scannabilityReport.level === 'yellow'
              ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60 hover:bg-amber-100/80'
              : 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60 hover:bg-rose-100/80'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {scannabilityReport.level === 'green' ? (
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            )}
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Scan Quality Score:
                </span>
                <span
                  className={`text-xs font-extrabold ${
                    scannabilityReport.level === 'green'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : scannabilityReport.level === 'yellow'
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {scannabilityReport.score}/100 ({scannabilityReport.grade})
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Contrast Ratio {scannabilityReport.contrastRatio}:1 • Click for audit details
              </p>
            </div>
          </div>
          <Info className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-all shadow-sm active:scale-95"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied!' : 'Copy Image'}</span>
        </button>

        <button
          onClick={() => setIsZoomed(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-all shadow-sm active:scale-95"
          title="Zoom View"
        >
          <ZoomIn className="w-3.5 h-3.5" />
          <span>Zoom</span>
        </button>

        <button
          onClick={resetCustomization}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-all shadow-sm active:scale-95"
          title="Reset Customization"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Scannability Breakdown Modal */}
      <Modal
        isOpen={showScoreModal}
        onClose={() => setShowScoreModal(false)}
        title="QR Scannability & Quality Audit"
        subtitle="Real-time scan reliability analysis calculated from WCAG luminance formulas"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-2xl font-black font-display text-slate-900 dark:text-white">
                {scannabilityReport.score}
              </span>
              <span className="text-sm text-slate-400 font-bold"> / 100</span>
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                Rating: {scannabilityReport.grade}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-500">WCAG Contrast Ratio</span>
              <p className="text-lg font-mono font-bold text-slate-900 dark:text-white">
                {scannabilityReport.contrastRatio}:1
              </p>
            </div>
          </div>

          {scannabilityReport.warnings.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                Potential Scanning Issues
              </h4>
              <div className="space-y-1.5">
                {scannabilityReport.warnings.map((warning, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{warning}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {scannabilityReport.tips.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Optimizations & Best Practices
              </h4>
              <div className="space-y-1.5">
                {scannabilityReport.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-xs text-slate-700 dark:text-slate-300">
                    <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5 text-brand-500" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Zoom Modal */}
      <Modal
        isOpen={isZoomed}
        onClose={() => setIsZoomed(false)}
        title="High-Resolution Preview"
        subtitle="Ultra crisp vector rendering"
        maxWidth="md"
      >
        <div className="flex flex-col items-center p-4">
          <div
            className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex items-center justify-center max-w-full"
            style={{
              backgroundColor: customization.bgTransparent ? 'transparent' : customization.bgColor || '#ffffff',
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: containerRef.current?.innerHTML || '',
              }}
              className="max-w-[340px] aspect-square"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
