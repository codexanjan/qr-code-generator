import React, { useState, useMemo } from 'react';
import { useQR } from '../../context/QRContext';
import { QRHistoryItem, QRType } from '../../types/qr';
import { exportQRCode } from '../../utils/exporters';
import {
  History,
  Trash2,
  Download,
  RotateCcw,
  Search,
  Calendar,
  ExternalLink,
  Layers,
  FileJson,
  FileSpreadsheet,
  Check,
  Sparkles,
} from 'lucide-react';

interface HistoryManagerProps {
  onLoadItem: () => void;
}

export const HistoryManager: React.FC<HistoryManagerProps> = ({ onLoadItem }) => {
  const { history, deleteHistoryItem, clearHistory, loadHistoryItem, showToast } = useQR();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const matchesType = typeFilter === 'all' || item.type === typeFilter;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.rawPayload.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [history, typeFilter, searchQuery]);

  const handleQuickDownload = async (item: QRHistoryItem) => {
    try {
      await exportQRCode(
        item.rawPayload,
        item.customization,
        {
          format: 'png',
          resolution: 1024,
          transparentBackground: item.customization.bgTransparent,
          includeFrame: true,
          title: item.title,
        },
        `history-qr-${item.id}`
      );
      showToast({ type: 'success', title: 'Downloaded PNG image' });
    } catch (err: any) {
      showToast({ type: 'error', title: 'Download failed' });
    }
  };

  const exportHistoryJSON = () => {
    const jsonStr = JSON.stringify(history, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qr-studio-history-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast({ type: 'success', title: 'History exported to JSON' });
  };

  const handleLoad = (item: QRHistoryItem) => {
    loadHistoryItem(item);
    onLoadItem();
  };

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
            <span>Recent Generation History</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {history.length} items
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Your QR code creations are securely stored right in your browser.
          </p>
        </div>

        {history.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={exportHistoryJSON}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>Export Backup</span>
            </button>
            <button
              onClick={clearHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {/* Filters */}
      {history.length > 0 && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search history by keyword, title, payload..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>
      )}

      {/* List */}
      {history.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center mx-auto text-brand-500">
            <History className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No QR codes generated yet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Your customized QR designs will automatically appear here as you create them.
          </p>
          <button
            onClick={onLoadItem}
            className="mt-2 px-4 py-2 text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-sm transition-all"
          >
            Start Creating QR Code
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:shadow-lg transition-all"
            >
              {/* Thumbnail */}
              <div className="w-20 h-20 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex-shrink-0 p-1.5 flex items-center justify-center overflow-hidden">
                {item.previewDataUrl ? (
                  <img
                    src={item.previewDataUrl}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400">
                    {item.type}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 truncate mt-0.5 font-mono">
                  {item.subtitle}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => handleLoad(item)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-brand-500 hover:text-white rounded-lg transition-colors text-slate-700 dark:text-slate-300"
                    title="Load into Generator"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleQuickDownload(item)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    title="Download PNG"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => deleteHistoryItem(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors ml-auto"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
