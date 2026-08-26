import React, { useState, useEffect, useRef } from 'react';
import { useQR } from '../../context/QRContext';
import { createQRStylingInstance } from '../../utils/exporters';
import { Modal } from '../common/Modal';
import { DESIGN_PRESETS } from '../../constants/presets';
import { QRCustomization } from '../../types/qr';
import { GitCompare, Check, ArrowLeftRight } from 'lucide-react';

interface QRCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRCompareModal: React.FC<QRCompareModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { payload, customization, setCustomization, showToast } = useQR();
  const [altCustomization, setAltCustomization] = useState<QRCustomization>(() => {
    return {
      ...customization,
      dotType: 'dots',
      colorMode: 'gradient',
      gradientType: 'linear',
      fgColor: '#9333ea',
      fgColor2: '#db2777',
      cornerSquareType: 'dot',
      cornerDotType: 'dot',
    };
  });

  const previewARef = useRef<HTMLDivElement>(null);
  const previewBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    if (previewARef.current) {
      previewARef.current.innerHTML = '';
      const qrA = createQRStylingInstance(payload, customization, 240);
      qrA.append(previewARef.current);
    }

    if (previewBRef.current) {
      previewBRef.current.innerHTML = '';
      const qrB = createQRStylingInstance(payload, altCustomization, 240);
      qrB.append(previewBRef.current);
    }
  }, [isOpen, payload, customization, altCustomization]);

  const handleApplyA = () => {
    showToast({ type: 'info', title: 'Design A is currently active.' });
    onClose();
  };

  const handleApplyB = () => {
    setCustomization(altCustomization);
    showToast({ type: 'success', title: 'Design B applied as active design!' });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="A/B QR Design Comparison"
      subtitle="Compare two distinct visual themes side-by-side before downloading or printing."
      maxWidth="2xl"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Option A (Current) */}
          <div className="flex flex-col items-center p-4 rounded-2xl border-2 border-brand-500/50 bg-slate-50 dark:bg-slate-900/60 relative">
            <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-brand-500 text-white text-[10px] font-extrabold uppercase">
              Design A (Current)
            </span>
            <div className="mt-6 mb-4 p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-lg">
              <div ref={previewARef} className="w-[200px] sm:w-[220px] aspect-square flex items-center justify-center" />
            </div>
            <button
              onClick={handleApplyA}
              className="w-full py-2 px-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              Keep Design A
            </button>
          </div>

          {/* Option B (Alternative) */}
          <div className="flex flex-col items-center p-4 rounded-2xl border-2 border-accent-500/50 bg-slate-50 dark:bg-slate-900/60 relative">
            <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-accent-500 text-white text-[10px] font-extrabold uppercase">
              Design B (Alternative)
            </span>
            <div className="mt-6 mb-4 p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-lg">
              <div ref={previewBRef} className="w-[200px] sm:w-[220px] aspect-square flex items-center justify-center" />
            </div>
            <button
              onClick={handleApplyB}
              className="w-full py-2 px-3 rounded-xl bg-accent-600 hover:bg-accent-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              Switch to Design B
            </button>
          </div>
        </div>

        {/* Quick Style Switcher for Option B */}
        <div className="pt-2">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            Change Design B Preset:
          </label>
          <div className="flex flex-wrap gap-2">
            {DESIGN_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setAltCustomization((prev) => ({ ...prev, ...preset.customization }))}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold hover:border-accent-400 transition-all text-slate-700 dark:text-slate-300"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
