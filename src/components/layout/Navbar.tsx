import React, { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import {
  QrCode,
  ScanLine,
  Sparkles,
  Layers,
  History,
  GitCompare,
  Files,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';
import { Github } from '../common/BrandIcons';

export type NavTab = 'generator' | 'scanner' | 'templates' | 'history' | 'bulk' | 'compare' | 'assistant' | 'landing';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  openScanner: () => void;
  openAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  openScanner,
  openAssistant,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-xl"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-accent-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
              <QrCode className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-lg font-extrabold tracking-tight font-display bg-gradient-to-r from-slate-900 via-brand-600 to-accent-600 dark:from-white dark:via-brand-400 dark:to-accent-400 bg-clip-text text-transparent">
                QR Studio <span className="text-xs uppercase px-1.5 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 font-semibold tracking-wider align-middle ml-1">Pro</span>
              </span>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                <ShieldCheck className="w-3 h-3" />
                <span>100% Client-Side Private</span>
              </div>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => handleNavClick('generator')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                currentTab === 'generator'
                  ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/30'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>Generator</span>
            </button>

            <button
              onClick={() => {
                handleNavClick('templates');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                currentTab === 'templates'
                  ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/30'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Templates</span>
            </button>

            <button
              onClick={() => {
                handleNavClick('history');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                currentTab === 'history'
                  ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/30'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <History className="w-4 h-4" />
              <span>History</span>
            </button>

            <button
              onClick={openAssistant}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-accent-600 dark:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-950/40 border border-accent-200 dark:border-accent-800/50 transition-all ml-1 group"
            >
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform text-accent-500" />
              <span>Smart AI</span>
            </button>

            <button
              onClick={() => handleNavClick('bulk')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                currentTab === 'bulk'
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
              title="Batch Bulk Generator"
            >
              <Files className="w-4 h-4" />
              <span className="hidden xl:inline">Batch QR</span>
            </button>

            <button
              onClick={() => handleNavClick('compare')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                currentTab === 'compare'
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
              title="Compare A/B Designs"
            >
              <GitCompare className="w-4 h-4" />
              <span className="hidden xl:inline">A/B Compare</span>
            </button>
          </nav>

          {/* Right Action Icons & Theme Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Scan QR Button */}
            <button
              onClick={openScanner}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-sm transition-all active:scale-95"
            >
              <ScanLine className="w-4 h-4 text-brand-400 dark:text-brand-600" />
              <span className="hidden sm:inline">Scan QR</span>
            </button>

            {/* GitHub Repo Link */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="View on GitHub"
              aria-label="GitHub Repository"
            >
              <Github className="w-5 h-5" />
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
          <button
            onClick={() => handleNavClick('generator')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              currentTab === 'generator'
                ? 'bg-brand-500 text-white'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <QrCode className="w-5 h-5" />
            <span>QR Generator</span>
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openScanner();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ScanLine className="w-5 h-5 text-brand-500" />
            <span>Scan QR (Camera & File)</span>
          </button>

          <button
            onClick={() => handleNavClick('templates')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              currentTab === 'templates'
                ? 'bg-brand-500 text-white'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-5 h-5" />
            <span>Templates Gallery</span>
          </button>

          <button
            onClick={() => handleNavClick('history')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              currentTab === 'history'
                ? 'bg-brand-500 text-white'
                : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <History className="w-5 h-5" />
            <span>My QR History</span>
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openAssistant();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-accent-600 dark:text-accent-400 bg-accent-50 dark:bg-accent-950/40 border border-accent-200 dark:border-accent-800"
          >
            <Sparkles className="w-5 h-5 text-accent-500" />
            <span>Smart AI Assistant</span>
          </button>

          <button
            onClick={() => handleNavClick('bulk')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Files className="w-5 h-5" />
            <span>Batch & Bulk Generator</span>
          </button>

          <button
            onClick={() => handleNavClick('compare')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <GitCompare className="w-5 h-5" />
            <span>A/B Design Compare</span>
          </button>
        </div>
      )}
    </header>
  );
};
