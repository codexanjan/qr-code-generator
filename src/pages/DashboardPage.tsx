import React, { useState } from 'react';
import { useQR } from '../context/QRContext';
import { QRTypeSelector } from '../components/generator/QRTypeSelector';
import { QRInputForms } from '../components/generator/QRInputForms';
import { QRCustomizer } from '../components/generator/QRCustomizer';
import { QRPreview } from '../components/generator/QRPreview';
import { ExportPanel } from '../components/generator/ExportPanel';
import {
  Sparkles,
  Layers,
  History,
  GitCompare,
  Files,
  ScanLine,
  Sliders,
  Edit3,
  QrCode,
  ShieldCheck,
} from 'lucide-react';

interface DashboardPageProps {
  onOpenAssistant: () => void;
  onOpenScanner: () => void;
  onOpenTemplates: () => void;
  onOpenHistory: () => void;
  onOpenBatch: () => void;
  onOpenCompare: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onOpenAssistant,
  onOpenScanner,
  onOpenTemplates,
  onOpenHistory,
  onOpenBatch,
  onOpenCompare,
}) => {
  const { selectedType, formData } = useQR();
  const [leftTab, setLeftTab] = useState<'content' | 'design'>('content');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Top Studio Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
            <QrCode className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
              QR Studio Workspace
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Active Type: <span className="font-semibold uppercase text-brand-600 dark:text-brand-400">{selectedType}</span>
            </p>
          </div>
        </div>

        {/* Quick Tools Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
          <button
            onClick={onOpenAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent-50 dark:bg-accent-950/40 hover:bg-accent-100 dark:hover:bg-accent-900/50 text-accent-600 dark:text-accent-400 border border-accent-200 dark:border-accent-800/50 text-xs font-bold transition-all active:scale-95"
            title="Smart AI Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent-500" />
            <span>AI Assistant</span>
          </button>

          <button
            onClick={onOpenTemplates}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all active:scale-95"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Templates</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all active:scale-95"
          >
            <History className="w-3.5 h-3.5" />
            <span>History</span>
          </button>

          <button
            onClick={onOpenBatch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all active:scale-95"
          >
            <Files className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Batch QR</span>
          </button>

          <button
            onClick={onOpenCompare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all active:scale-95"
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Compare</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Creator Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card: Configuration Panel */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-5">
            {/* Step 1: QR Type Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Step 1: Choose QR Type
                </span>
              </div>
              <QRTypeSelector />
            </div>

            {/* Step 2: Content & Customization Tabs */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Step 2: Setup & Visual Design
                </span>

                {/* Sub-Switch: Content vs Design */}
                <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
                  <button
                    onClick={() => setLeftTab('content')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      leftTab === 'content'
                        ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                        : 'text-slate-500'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Content Data</span>
                  </button>
                  <button
                    onClick={() => setLeftTab('design')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      leftTab === 'design'
                        ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                        : 'text-slate-500'
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Visual Customizer</span>
                  </button>
                </div>
              </div>

              {/* Dynamic View based on sub-tab */}
              {leftTab === 'content' ? (
                <div className="animate-in fade-in duration-200">
                  <QRInputForms />
                </div>
              ) : (
                <div className="animate-in fade-in duration-200">
                  <QRCustomizer />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Live Centerpiece Preview & Export Panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
          {/* Card: Live Preview */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Live Dynamic Preview
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                100% Vector Canvas
              </span>
            </div>

            <QRPreview />
          </div>

          {/* Card: Export Options */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Export & Download
              </span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Zero Watermarks
              </span>
            </div>

            <ExportPanel />
          </div>
        </div>
      </div>
    </div>
  );
};
