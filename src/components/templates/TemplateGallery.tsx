import React, { useState, useMemo } from 'react';
import { useQR } from '../../context/QRContext';
import { TEMPLATES_GALLERY } from '../../constants/presets';
import { QRTemplate } from '../../types/qr';
import {
  Layers,
  Sparkles,
  ArrowRight,
  Utensils,
  Wifi,
  Briefcase,
  CreditCard,
  Calendar,
  Coins,
  Smartphone,
  Search,
} from 'lucide-react';
import { Instagram } from '../common/BrandIcons';

interface TemplateGalleryProps {
  onApply: (template: QRTemplate) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onApply }) => {
  const { applyTemplate } = useQR();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const set = new Set(TEMPLATES_GALLERY.map((t) => t.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredTemplates = useMemo(() => {
    return TEMPLATES_GALLERY.filter((t) => {
      const matchCat = activeCategory === 'All' || t.category === activeCategory;
      const matchSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleSelect = (tpl: QRTemplate) => {
    applyTemplate(tpl);
    onApply(tpl);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
            Professional Template Library
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Choose from ready-to-use branded layouts engineered for maximum scan rates.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTemplates.map((tpl) => (
          <div
            key={tpl.id}
            className="flex flex-col justify-between p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:border-brand-400 dark:hover:border-brand-500 hover:shadow-xl transition-all duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {tpl.category}
                </span>
                {tpl.badge && (
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-sm">
                    {tpl.badge}
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {tpl.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                {tpl.description}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono text-brand-600 dark:text-brand-400 font-semibold uppercase">
                {tpl.type}
              </span>
              <button
                onClick={() => handleSelect(tpl)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-brand-600 dark:hover:bg-brand-400 dark:hover:text-white rounded-xl transition-all shadow-sm active:scale-95"
              >
                <span>Use Template</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
