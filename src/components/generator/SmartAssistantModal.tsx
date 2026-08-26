import React, { useState } from 'react';
import { useQR } from '../../context/QRContext';
import { parseAssistantPrompt } from '../../utils/smartAssistant';
import { Modal } from '../common/Modal';
import { Sparkles, ArrowRight, CheckCircle2, Wand2 } from 'lucide-react';

interface SmartAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STARTER_PROMPTS = [
  'Create a Wi-Fi QR code for my coffee shop guests',
  'QR code for my Italian restaurant digital food menu',
  'Digital business card with my phone, email & title',
  'Instagram QR code for my design studio portfolio',
  'Accept UPI payments at my store checkout counter',
  'Bitcoin donation wallet QR for my GitHub open-source project',
  'Directions to our wedding reception venue with Google Maps',
  'Calendar event invite for our Tech Summit keynote',
];

export const SmartAssistantModal: React.FC<SmartAssistantModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { setFormData, applyPreset, showToast } = useQR();
  const [promptText, setPromptText] = useState('');
  const [result, setResult] = useState<any | null>(null);

  const handleGenerate = (text: string) => {
    if (!text.trim()) return;
    const res = parseAssistantPrompt(text);
    setResult(res);
  };

  const handleApplyResult = () => {
    if (!result) return;
    setFormData(result.prefilledFormData);
    applyPreset(result.suggestedPresetId);
    showToast({
      type: 'success',
      title: 'Smart recommendation applied!',
      message: result.reason,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Smart QR Assistant"
      subtitle="Describe what you want to create in plain English and let AI configure the best QR type & theme."
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Input Textarea */}
        <div className="relative">
          <textarea
            rows={3}
            placeholder="e.g. I need a QR code for my restaurant menu with an elegant warm design..."
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            className="w-full p-3.5 text-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent-500/30 focus:border-accent-500"
          />
          <button
            onClick={() => handleGenerate(promptText)}
            disabled={!promptText.trim()}
            className="mt-2.5 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all active:scale-95 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-accent-200" />
            <span>Generate Setup</span>
          </button>
        </div>

        {/* Quick Starters */}
        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
            Try a popular prompt:
          </label>
          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto custom-scrollbar">
            {STARTER_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPromptText(prompt);
                  handleGenerate(prompt);
                }}
                className="text-[11px] px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-left transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Results Card */}
        {result && (
          <div className="p-4 rounded-2xl bg-gradient-to-tr from-brand-500/10 via-accent-500/10 to-transparent border border-brand-500/30 animate-in fade-in slide-in-from-bottom-2 space-y-3">
            <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Recommendation Ready
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Recommended Type: <span className="text-brand-600 dark:text-brand-400 uppercase">{result.recommendedType}</span>
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {result.reason}
              </p>
            </div>

            <button
              onClick={handleApplyResult}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-md active:scale-95"
            >
              <span>Apply Configuration Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};
