import React, { useState, useMemo } from 'react';
import { useQR } from '../../context/QRContext';
import { QRCategory, QRType } from '../../types/qr';
import { QR_CATEGORIES, QR_TYPES_META } from '../../constants/qrTypes';
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
  Search,
  Flame,
} from 'lucide-react';
import { Instagram, Youtube, Linkedin } from '../common/BrandIcons';

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

export const QRTypeSelector: React.FC = () => {
  const { selectedType, switchQRType } = useQR();
  const [activeCategory, setActiveCategory] = useState<QRCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTypes = useMemo(() => {
    return QR_TYPES_META.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="space-y-4">
      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 sm:pb-0 custom-scrollbar">
          {QR_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[180px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search types..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
          />
        </div>
      </div>

      {/* Grid of QR Types */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 max-h-[290px] overflow-y-auto pr-1 custom-scrollbar">
        {filteredTypes.map((item) => {
          const Icon = ICON_MAP[item.iconName] || Globe;
          const isSelected = selectedType === item.type;

          return (
            <button
              key={item.type}
              onClick={() => switchQRType(item.type)}
              className={`relative flex flex-col items-start p-3 rounded-xl border text-left transition-all group ${
                isSelected
                  ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 ring-2 ring-brand-500/30 shadow-sm'
                  : 'border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:border-brand-300 dark:hover:border-brand-700 hover:bg-slate-50/80 dark:hover:bg-slate-850'
              }`}
            >
              {item.popular && (
                <span className="absolute top-2 right-2 flex items-center gap-0.5 text-[9px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/50 px-1 py-0.2 rounded">
                  <Flame className="w-2.5 h-2.5 fill-amber-500" />
                  Top
                </span>
              )}

              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 transition-transform group-hover:scale-105 ${
                  isSelected
                    ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                {item.label}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                {item.shortDesc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
