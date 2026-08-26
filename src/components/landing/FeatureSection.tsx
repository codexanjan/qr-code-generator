import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Palette,
  Eye,
  Download,
  ScanLine,
  Layers,
  Files,
  Cpu,
  Lock,
  Zap,
  Smartphone,
} from 'lucide-react';

export const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: Palette,
      title: 'Deep Visual Customization',
      desc: 'Customize dots, rounded corners, linear & radial gradients, corner finder eyes, and embedded logos with real-time feedback.',
      badge: 'Design',
    },
    {
      icon: ShieldCheck,
      title: 'Scannability Quality Engine',
      desc: 'Real-time WCAG contrast ratio analysis and Reed-Solomon error correction calculations guarantee your QR code scans reliably.',
      badge: 'Smart Score',
    },
    {
      icon: Download,
      title: 'High-Res Multi-Format Export',
      desc: 'Download crisp vector SVG for billboards, high-DPI PNGs up to 4096px, JPGs for web, and print-ready formatted A4 PDFs.',
      badge: 'Print Ready',
    },
    {
      icon: ScanLine,
      title: 'Integrated QR Scanner',
      desc: 'Scan QR codes directly via your device camera or upload image files with instant decoding and action links.',
      badge: 'Camera & Image',
    },
    {
      icon: Lock,
      title: '100% Client-Side Privacy',
      desc: 'All QR generation and scanning operations execute completely inside your browser. No server logging or data tracking.',
      badge: 'Privacy First',
    },
    {
      icon: Files,
      title: 'Bulk & Batch Generator',
      desc: 'Generate dozens of QR codes at once from raw line items or CSV lists and download them instantly in a single ZIP file.',
      badge: 'Productivity',
    },
    {
      icon: Sparkles,
      title: 'Smart AI Assistant',
      desc: 'Describe what you need in plain words and let our intelligent intent engine pick the right QR type and designer theme.',
      badge: 'Innovation',
    },
    {
      icon: Layers,
      title: 'Local History & Templates',
      desc: 'Save and re-edit previous QR designs without accounts. Access 12+ pre-made templates for hospitality, business, and tech.',
      badge: 'Zero Friction',
    },
  ];

  return (
    <section className="py-20 bg-slate-100/50 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-600 dark:text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
            Why Choose QR Studio Pro
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
            Engineered for Creators & Modern Businesses
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
            Everything you need to create, style, test, and distribute high-converting QR codes.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="relative p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:border-brand-300 dark:hover:border-brand-700 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {f.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
