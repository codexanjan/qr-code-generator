import React from 'react';
import { QrCode, Shield, Zap, Heart } from 'lucide-react';
import { Github } from '../common/BrandIcons';

interface FooterProps {
  onSelectTab: (tab: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-500 flex items-center justify-center text-white shadow-md">
                <QrCode className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-display text-white tracking-tight">
                QR Studio Pro
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The world’s most advanced, private, client-side QR Code studio. Generate branded, scannable, high-DPI vector QR codes with live preview and multi-format exports.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <Shield className="w-4 h-4" /> 100% Client-Side Privacy
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-brand-400 font-medium">
                <Zap className="w-4 h-4" /> Zero-Lag Engine
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              QR Studio
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onSelectTab('generator')}
                  className="hover:text-brand-400 transition-colors"
                >
                  QR Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('scanner')}
                  className="hover:text-brand-400 transition-colors"
                >
                  Camera & Image Scanner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('templates')}
                  className="hover:text-brand-400 transition-colors"
                >
                  Template Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('history')}
                  className="hover:text-brand-400 transition-colors"
                >
                  Local History
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('bulk')}
                  className="hover:text-brand-400 transition-colors"
                >
                  Batch & Bulk Generator
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Types */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Supported Types
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onSelectTab('generator')}>
                  Wi-Fi Auto-Connect
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onSelectTab('generator')}>
                  vCard Digital Business Card
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onSelectTab('generator')}>
                  UPI & Crypto Payments
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onSelectTab('generator')}>
                  Social Media Multi-Link
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer" onClick={() => onSelectTab('generator')}>
                  Google Maps & iCal Events
                </span>
              </li>
            </ul>
          </div>

          {/* Formats & Privacy */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Export Formats
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-xs font-mono text-brand-300">SVG</span>
                <span>Infinite Vector Scale</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-xs font-mono text-emerald-300">PNG</span>
                <span>Up to 4096px Ultra-HD</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-xs font-mono text-amber-300">PDF</span>
                <span>Print-Ready A4 Sheet</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-xs font-mono text-cyan-300">JPG</span>
                <span>Compact Raster Image</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} QR Studio Pro. Free & open for personal and commercial use.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for creators & developers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
