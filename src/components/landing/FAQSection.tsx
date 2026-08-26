import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Are the generated QR codes free for commercial use?',
      a: 'Yes, 100%! All QR codes generated with QR Studio Pro are completely free to use for personal, business, marketing, and commercial projects without any limits, watermarks, or subscription fees.',
    },
    {
      q: 'Do generated QR codes ever expire?',
      a: 'No. The QR codes generated are static standard QR codes with direct payload encoding (like standard URL, vCard, Wi-Fi strings). They will continue working permanently as long as your destination link or credentials remain valid.',
    },
    {
      q: 'Is my data secure and private?',
      a: 'Absolute privacy is our core promise. All QR code generation and decoding happens 100% locally in your web browser using client-side JavaScript. Your Wi-Fi passwords, contact cards, links, or camera video feeds never get sent to any server.',
    },
    {
      q: 'Which export format should I choose for print and flyers?',
      a: 'For print, billboards, and high-quality packaging, we recommend the vector SVG format or Ultra-HD 4096px PNG. SVG can scale infinitely without pixelation or loss of crispness. For general web and social media, standard PNG or JPG works great.',
    },
    {
      q: 'How does the Scannability Quality Score work?',
      a: 'Our proprietary scannability engine calculates the WCAG color contrast ratio between the foreground pattern and background, tests eye corner distinctness, and checks whether your center logo size complies with the selected Reed-Solomon error correction level (L, M, Q, or H).',
    },
    {
      q: 'Can I scan QR codes using my phone camera on this app?',
      a: 'Yes! Click the "Scan QR" button in the top navigation bar to activate the live WebRTC camera scanner or upload any image file containing a QR code for instant client-side decoding.',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-600 dark:text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Everything you need to know about QR generation, formats, and privacy.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 overflow-hidden transition-all duration-200 shadow-sm"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-850"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-500' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
