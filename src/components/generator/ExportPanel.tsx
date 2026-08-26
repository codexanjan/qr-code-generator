import React, { useState } from 'react';
import { useQR } from '../../context/QRContext';
import { ExportFormat, ExportOptions } from '../../types/qr';
import { exportQRCode } from '../../utils/exporters';
import confetti from 'canvas-confetti';
import {
  Download,
  FileImage,
  FileCode,
  FileText,
  Share2,
  Printer,
  Sparkles,
  Check,
  Layers,
  ChevronDown,
} from 'lucide-react';

export const ExportPanel: React.FC = () => {
  const { payload, customization, formData, showToast, addToHistory } = useQR();
  const [resolution, setResolution] = useState<number>(1024);
  const [isExporting, setIsExporting] = useState(false);
  const [exportTitle, setExportTitle] = useState('My QR Code');

  const triggerConfetti = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#3b82f6', '#d946ef', '#10b981', '#f59e0b'],
    });
  };

  const handleExport = async (format: ExportFormat) => {
    try {
      setIsExporting(true);
      const options: ExportOptions = {
        format,
        resolution,
        transparentBackground: customization.bgTransparent,
        includeFrame: true,
        title: exportTitle || 'My QR Code',
      };

      const filename = `qrcode-${formData.type}-${Date.now()}`;
      await exportQRCode(payload, customization, options, filename);

      triggerConfetti();
      showToast({
        type: 'success',
        title: `QR Code downloaded as ${format.toUpperCase()}!`,
        message: format === 'pdf' ? 'Print-ready PDF generated.' : `Rendered at ${resolution}×${resolution}px resolution.`,
      });
      addToHistory();
    } catch (err: any) {
      showToast({
        type: 'error',
        title: 'Export Failed',
        message: err.message || 'Could not complete the export.',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Custom QR Code',
          text: 'Scan this custom QR code created with QR Studio Pro!',
          url: payload.startsWith('http') ? payload : window.location.href,
        });
        showToast({ type: 'success', title: 'Shared successfully!' });
      } catch (err) {
        // user cancelled share
      }
    } else {
      await navigator.clipboard.writeText(payload);
      showToast({
        type: 'info',
        title: 'Payload copied to clipboard',
        message: 'Share API not supported on this device.',
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Title & Resolution Header */}
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Export Label / Title
          </label>
          <input
            type="text"
            placeholder="e.g. Table 4 Menu or Reception WiFi"
            value={exportTitle}
            onChange={(e) => setExportTitle(e.target.value)}
            className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            Image Resolution (Quality)
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { res: 512, label: '512px', desc: 'Screen / Web' },
              { res: 1024, label: '1024px', desc: 'HD Digital' },
              { res: 2048, label: '2048px', desc: 'Print High' },
              { res: 4096, label: '4096px', desc: 'Ultra 4K Print' },
            ].map((item) => (
              <button
                key={item.res}
                onClick={() => setResolution(item.res)}
                className={`p-2 rounded-xl border text-center transition-all ${
                  resolution === item.res
                    ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 ring-2 ring-brand-500/20 font-bold'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <span className="block text-xs leading-none">{item.label}</span>
                <span className="text-[9px] text-slate-400 block mt-1 leading-none">{item.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Download Buttons Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* PNG */}
        <button
          onClick={() => handleExport('png')}
          disabled={isExporting}
          className="flex items-center justify-between p-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/25 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 group"
        >
          <div className="flex items-center gap-2.5">
            <FileImage className="w-4 h-4 text-brand-200" />
            <div className="text-left">
              <span className="block text-sm leading-tight">PNG</span>
              <span className="text-[10px] text-brand-200 font-normal">Lossless Raster</span>
            </div>
          </div>
          <Download className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform" />
        </button>

        {/* SVG */}
        <button
          onClick={() => handleExport('svg')}
          disabled={isExporting}
          className="flex items-center justify-between p-3.5 rounded-2xl bg-accent-600 hover:bg-accent-700 text-white font-bold text-xs shadow-md shadow-accent-500/25 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 group"
        >
          <div className="flex items-center gap-2.5">
            <FileCode className="w-4 h-4 text-accent-200" />
            <div className="text-left">
              <span className="block text-sm leading-tight">SVG</span>
              <span className="text-[10px] text-accent-200 font-normal">Infinite Vector</span>
            </div>
          </div>
          <Download className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform" />
        </button>

        {/* PDF */}
        <button
          onClick={() => handleExport('pdf')}
          disabled={isExporting}
          className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-semibold text-xs transition-all active:scale-95 disabled:opacity-50 group"
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-500" />
            <div className="text-left">
              <span className="block leading-tight">PDF Document</span>
              <span className="text-[10px] text-slate-400 font-normal">Printable Sheet</span>
            </div>
          </div>
          <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white" />
        </button>

        {/* JPG */}
        <button
          onClick={() => handleExport('jpg')}
          disabled={isExporting}
          className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-semibold text-xs transition-all active:scale-95 disabled:opacity-50 group"
        >
          <div className="flex items-center gap-2">
            <FileImage className="w-4 h-4 text-cyan-500" />
            <div className="text-left">
              <span className="block leading-tight">JPG Image</span>
              <span className="text-[10px] text-slate-400 font-normal">Compact Web</span>
            </div>
          </div>
          <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-white" />
        </button>
      </div>

      {/* Secondary Quick Actions */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all shadow-sm active:scale-95"
        >
          <Share2 className="w-3.5 h-3.5 text-brand-500" />
          <span>Share QR</span>
        </button>

        <button
          onClick={handlePrint}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all shadow-sm active:scale-95"
        >
          <Printer className="w-3.5 h-3.5 text-slate-500" />
          <span>Print Poster</span>
        </button>
      </div>
    </div>
  );
};
