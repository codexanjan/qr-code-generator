import React, { useState } from 'react';
import { useQR } from '../../context/QRContext';
import { createQRStylingInstance } from '../../utils/exporters';
import { Modal } from '../common/Modal';
import JSZip from 'jszip';
import confetti from 'canvas-confetti';
import { Files, Download, Loader2, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface BatchGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BatchGeneratorModal: React.FC<BatchGeneratorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { customization, showToast } = useQR();
  const [inputText, setInputText] = useState(
    'https://example.com/item1\nhttps://example.com/item2\nhttps://example.com/item3\nhttps://example.com/item4'
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const lines = inputText
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const handleGenerateBatch = async () => {
    if (lines.length === 0) return;

    try {
      setIsProcessing(true);
      setProgress(0);
      const zip = new JSZip();

      for (let i = 0; i < lines.length; i++) {
        const payload = lines[i];
        const qr = createQRStylingInstance(payload, customization, 1024);
        const raw = await qr.getRawData('png');
        if (raw) {
          const blob = raw instanceof Blob ? raw : new Blob([raw as any], { type: 'image/png' });
          const safeName = payload.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
          zip.file(`qr_${i + 1}_${safeName}.png`, blob);
        }
        setProgress(Math.round(((i + 1) / lines.length) * 100));
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `batch_qr_codes_${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      confetti({ particleCount: 80, spread: 80, origin: { y: 0.8 } });
      showToast({
        type: 'success',
        title: `Batch completed!`,
        message: `Successfully generated ${lines.length} high-res QR codes into a ZIP archive.`,
      });
      onClose();
    } catch (err: any) {
      showToast({
        type: 'error',
        title: 'Batch Generation Failed',
        message: err.message || 'Error creating batch archive.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Batch QR Code Generator"
      subtitle="Paste multiple URLs, text payloads, or serial codes (one per line) and download all as a ZIP archive."
      maxWidth="lg"
    >
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
            <span>Payload Items (1 per line)</span>
            <span className="text-brand-500">{lines.length} items ready</span>
          </div>
          <textarea
            rows={7}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isProcessing}
            placeholder="https://mysite.com/page1&#10;https://mysite.com/page2&#10;WIFI:S:MyNet;P:pass;;..."
            className="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        {isProcessing && (
          <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-brand-500" />
                Rendering QR codes...
              </span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-brand-500 h-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <button
          onClick={handleGenerateBatch}
          disabled={isProcessing || lines.length === 0}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/25 transition-all active:scale-95 disabled:opacity-50"
        >
          {isProcessing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          <span>Download All {lines.length} QR Codes (.ZIP)</span>
        </button>
      </div>
    </Modal>
  );
};
