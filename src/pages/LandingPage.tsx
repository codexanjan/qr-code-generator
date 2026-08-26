import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { FeatureSection } from '../components/landing/FeatureSection';
import { HowItWorks } from '../components/landing/HowItWorks';
import { FAQSection } from '../components/landing/FAQSection';
import { QR_TYPES_META } from '../constants/qrTypes';
import {
  Globe,
  FileText,
  Contact,
  Mail,
  Phone,
  MessageSquare,
  MessageCircle,
  Share2,
  CreditCard,
  Coins,
  Wifi,
  MapPin,
  Calendar,
  Smartphone,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Instagram, Youtube, Linkedin } from '../components/common/BrandIcons';
import { useQR } from '../context/QRContext';
import { QRType } from '../types/qr';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Globe,
  FileText,
  Contact,
  Mail,
  Phone,
  MessageSquare,
  MessageCircle,
  Instagram,
  Youtube,
  Linkedin,
  Share2,
  CreditCard,
  Coins,
  Wifi,
  MapPin,
  Calendar,
  Smartphone,
};

interface LandingPageProps {
  onStartCreating: () => void;
  onOpenScanner: () => void;
  onOpenAssistant: () => void;
  onSelectType: (type: QRType) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartCreating,
  onOpenScanner,
  onOpenAssistant,
  onSelectType,
}) => {
  return (
    <div className="space-y-4">
      {/* Hero */}
      <HeroSection
        onStartCreating={onStartCreating}
        onOpenScanner={onOpenScanner}
        onOpenAssistant={onOpenAssistant}
      />

      {/* 17 Supported QR Types Showcase Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-600 dark:text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
            Versatile & Complete
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
            17 Powerful QR Code Types
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Click any format below to configure and generate instantly in the Studio.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {QR_TYPES_META.map((item) => {
            const Icon = ICON_MAP[item.iconName] || Globe;
            return (
              <button
                key={item.type}
                onClick={() => onSelectType(item.type)}
                className="flex flex-col items-center p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:border-brand-400 dark:hover:border-brand-500 hover:shadow-lg hover:-translate-y-0.5 transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-brand-500 group-hover:text-white flex items-center justify-center mb-2.5 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  {item.label}
                </span>
                <span className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                  {item.shortDesc}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Feature Grid */}
      <FeatureSection />

      {/* How it works */}
      <HowItWorks onStart={onStartCreating} />

      {/* FAQ */}
      <FAQSection />

      {/* Bottom CTA Banner */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-slate-900 via-brand-950 to-slate-900 text-white overflow-hidden shadow-2xl border border-slate-800 text-center space-y-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Free & Open Web Studio
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight max-w-xl mx-auto">
            Ready to Build Your High-Impact Custom QR Code?
          </h2>

          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Join thousands of designers, developers, and businesses generating high-DPI branded QR codes every day.
          </p>

          <div className="pt-2">
            <button
              onClick={onStartCreating}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm shadow-xl shadow-brand-500/30 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Launch QR Generator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
