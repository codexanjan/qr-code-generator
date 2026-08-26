import React, { useState } from 'react';
import {
  QrCode,
  ScanLine,
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Download,
  Lock,
} from 'lucide-react';

interface HeroSectionProps {
  onStartCreating: () => void;
  onOpenScanner: () => void;
  onOpenAssistant: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartCreating,
  onOpenScanner,
  onOpenAssistant,
}) => {
  const [quickInput, setQuickInput] = useState('https://github.com');

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-brand-500/20 via-accent-500/20 to-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Hero Content */}
          <div className="flex-1 text-center lg:text-left space-y-6 max-w-2xl">
            {/* Top Tag Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-accent-500" />
              <span>Next-Gen QR Code Engine & Studio</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Create Beautiful{' '}
              <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 bg-clip-text text-transparent">
                QR Codes
              </span>{' '}
              in Seconds.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Generate, customize, scan, and download professional vector QR codes — completely from your browser with zero data tracking.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onStartCreating}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-xl shadow-brand-500/30 hover:shadow-brand-500/40 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <QrCode className="w-5 h-5" />
                <span>Create QR Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenScanner}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm border border-slate-200 dark:border-slate-800 shadow-sm active:scale-95 transition-all"
              >
                <ScanLine className="w-5 h-5 text-brand-500" />
                <span>Scan QR Code</span>
              </button>

              <button
                onClick={onOpenAssistant}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-accent-500/10 hover:bg-accent-500/20 text-accent-600 dark:text-accent-400 font-bold text-sm border border-accent-500/30 transition-all"
              >
                <Sparkles className="w-4 h-4 text-accent-500" />
                <span>Smart AI</span>
              </button>
            </div>

            {/* Feature Bullet Perks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>100% Free Forever</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Zero Server Tracking</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <span>High-DPI Vector Export</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Card */}
          <div className="w-full max-w-md flex-shrink-0">
            <div className="relative p-7 rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl shadow-brand-500/10 space-y-5">
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Live Visual Sandbox
                </span>
              </div>

              {/* Sample QR Visual Graphic */}
              <div className="p-6 rounded-2xl bg-gradient-to-tr from-brand-500/5 to-accent-500/5 border border-slate-100 dark:border-slate-800/80 flex flex-col items-center justify-center">
                <div className="w-48 h-48 rounded-2xl bg-white dark:bg-slate-950 p-4 shadow-lg flex items-center justify-center border border-slate-200/60 dark:border-slate-800">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full text-slate-900 dark:text-white fill-current"
                  >
                    {/* Finder 1 */}
                    <rect x="5" y="5" width="26" height="26" rx="6" fill="#2563eb" />
                    <rect x="10" y="10" width="16" height="16" rx="4" fill="white" />
                    <rect x="13" y="13" width="10" height="10" rx="3" fill="#2563eb" />
                    {/* Finder 2 */}
                    <rect x="69" y="5" width="26" height="26" rx="6" fill="#2563eb" />
                    <rect x="74" y="10" width="16" height="16" rx="4" fill="white" />
                    <rect x="77" y="13" width="10" height="10" rx="3" fill="#2563eb" />
                    {/* Finder 3 */}
                    <rect x="5" y="69" width="26" height="26" rx="6" fill="#2563eb" />
                    <rect x="10" y="74" width="16" height="16" rx="4" fill="white" />
                    <rect x="13" y="77" width="10" height="10" rx="3" fill="#2563eb" />
                    {/* Decorative Matrix Dots */}
                    <circle cx="45" cy="18" r="3" fill="#3b82f6" />
                    <circle cx="55" cy="18" r="3" fill="#3b82f6" />
                    <circle cx="40" cy="35" r="3" fill="#60a5fa" />
                    <circle cx="50" cy="45" r="3.5" fill="#d946ef" />
                    <circle cx="60" cy="35" r="3" fill="#3b82f6" />
                    <circle cx="45" cy="55" r="3" fill="#d946ef" />
                    <circle cx="75" cy="45" r="3" fill="#3b82f6" />
                    <circle cx="85" cy="55" r="3" fill="#3b82f6" />
                    <circle cx="45" cy="75" r="3" fill="#3b82f6" />
                    <circle cx="55" cy="85" r="3" fill="#3b82f6" />
                    <circle cx="75" cy="75" r="3" fill="#3b82f6" />
                    <circle cx="85" cy="85" r="3" fill="#3b82f6" />
                    {/* Center Icon */}
                    <circle cx="50" cy="50" r="11" fill="white" stroke="#d946ef" strokeWidth="2" />
                    <path d="M47 45h6v10h-6z" fill="#d946ef" />
                  </svg>
                </div>

                <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Scannability Rating: 98/100 (AAA)</span>
                </div>
              </div>

              {/* Quick Input Bar */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={quickInput}
                    onChange={(e) => setQuickInput(e.target.value)}
                    placeholder="Enter any destination link..."
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                  />
                  <button
                    onClick={onStartCreating}
                    className="px-4 py-2 text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm transition-all"
                  >
                    Customize
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
