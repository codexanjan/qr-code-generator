import React from 'react';
import { Layers, Edit3, Palette, Download, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onStart: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStart }) => {
  const steps = [
    {
      step: '01',
      title: 'Select QR Type',
      desc: 'Pick from 17 supported categories including Wi-Fi, vCard, WhatsApp, URL, Crypto, or UPI.',
      icon: Layers,
    },
    {
      step: '02',
      title: 'Enter Content',
      desc: 'Fill in your data with real-time validation and helper formatting.',
      icon: Edit3,
    },
    {
      step: '03',
      title: 'Customize Design',
      desc: 'Style patterns, gradients, custom colors, eye shapes, and center brand logos.',
      icon: Palette,
    },
    {
      step: '04',
      title: 'Export & Share',
      desc: 'Download high-DPI PNG, vector SVG, or print-ready PDF in 1 tap.',
      icon: Download,
    },
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-accent-600 dark:text-accent-400 bg-accent-500/10 px-3 py-1 rounded-full border border-accent-500/20">
          Simple 4-Step Process
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
          How It Works
        </h2>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          Create professional, scannable QR codes ready for print and screen in under 30 seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="relative p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col justify-between group hover:border-brand-400 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl font-black font-display text-slate-200 dark:text-slate-800 group-hover:text-brand-500/30 transition-colors">
                    {s.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:bg-brand-500 group-hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={onStart}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm shadow-xl hover:bg-slate-800 dark:hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all"
        >
          <span>Open QR Studio</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
