import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import {
  QRCustomization,
  QRFormData,
  QRHistoryItem,
  QRTemplate,
  QRType,
  ScannabilityReport,
  ToastMessage,
} from '../types/qr';
import { DEFAULT_FORM_DATA } from '../constants/qrTypes';
import { DEFAULT_CUSTOMIZATION, DESIGN_PRESETS } from '../constants/presets';
import { generateQRPayload, getQRSummary } from '../utils/qrPayloads';
import { evaluateQRScannability } from '../utils/scannabilityScore';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface QRContextType {
  formData: QRFormData;
  setFormData: (data: QRFormData | ((prev: QRFormData) => QRFormData)) => void;
  customization: QRCustomization;
  setCustomization: (customization: QRCustomization | ((prev: QRCustomization) => QRCustomization)) => void;
  updateCustomization: (partial: Partial<QRCustomization>) => void;
  payload: string;
  scannabilityReport: ScannabilityReport;
  
  // Type switcher
  selectedType: QRType;
  switchQRType: (type: QRType) => void;
  
  // Presets & Templates
  applyPreset: (presetId: string) => void;
  applyTemplate: (template: QRTemplate) => void;
  resetCustomization: () => void;
  
  // History
  history: QRHistoryItem[];
  addToHistory: (previewDataUrl?: string) => void;
  deleteHistoryItem: (id: string) => void;
  clearHistory: () => void;
  loadHistoryItem: (item: QRHistoryItem) => void;

  // Compare A/B
  comparedCustomization: QRCustomization | null;
  setComparedCustomization: (c: QRCustomization | null) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const QRContext = createContext<QRContextType | undefined>(undefined);

export const QRProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<QRFormData>(DEFAULT_FORM_DATA.url);
  const [customization, setCustomization] = useState<QRCustomization>(DEFAULT_CUSTOMIZATION);
  const [comparedCustomization, setComparedCustomization] = useState<QRCustomization | null>(null);
  
  // History stored in LocalStorage
  const [history, setHistory] = useLocalStorage<QRHistoryItem[]>('qr_history_v1', []);
  
  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toast.duration || 3500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateCustomization = useCallback((partial: Partial<QRCustomization>) => {
    setCustomization((prev) => {
      const next = { ...prev, ...partial };
      // Auto-bump error correction level if logo is attached and EC is low
      if (next.logo && (next.errorCorrectionLevel === 'L' || !next.errorCorrectionLevel)) {
        next.errorCorrectionLevel = 'H';
      }
      return next;
    });
  }, []);

  const switchQRType = useCallback((type: QRType) => {
    const initial = DEFAULT_FORM_DATA[type];
    setFormData(initial);
  }, []);

  const payload = useMemo(() => {
    return generateQRPayload(formData);
  }, [formData]);

  const scannabilityReport = useMemo(() => {
    return evaluateQRScannability(customization, payload.length);
  }, [customization, payload]);

  const applyPreset = useCallback((presetId: string) => {
    const preset = DESIGN_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      updateCustomization(preset.customization);
      showToast({
        type: 'info',
        title: `Applied preset: ${preset.name}`,
      });
    }
  }, [updateCustomization, showToast]);

  const applyTemplate = useCallback((template: QRTemplate) => {
    setFormData(template.defaultFormData);
    if (template.customization) {
      setCustomization((prev) => ({
        ...prev,
        ...template.customization,
      }));
    }
    showToast({
      type: 'success',
      title: `Applied template: ${template.name}`,
      message: template.description,
    });
  }, [showToast]);

  const resetCustomization = useCallback(() => {
    setCustomization(DEFAULT_CUSTOMIZATION);
    showToast({
      type: 'info',
      title: 'Reset to default styling',
    });
  }, [showToast]);

  const addToHistory = useCallback((previewDataUrl?: string) => {
    const summary = getQRSummary(formData);
    const item: QRHistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type: formData.type,
      title: summary.title,
      subtitle: summary.subtitle,
      rawPayload: payload,
      formData: JSON.parse(JSON.stringify(formData)),
      customization: JSON.parse(JSON.stringify(customization)),
      createdAt: Date.now(),
      previewDataUrl,
    };

    setHistory((prev) => {
      // Keep up to 50 recent items
      const filtered = prev.filter((p) => p.rawPayload !== payload || p.type !== formData.type);
      return [item, ...filtered].slice(0, 50);
    });
  }, [formData, customization, payload, setHistory]);

  const deleteHistoryItem = useCallback((id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    showToast({
      type: 'info',
      title: 'Item removed from history',
    });
  }, [setHistory, showToast]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    showToast({
      type: 'info',
      title: 'History cleared',
    });
  }, [setHistory, showToast]);

  const loadHistoryItem = useCallback((item: QRHistoryItem) => {
    setFormData(item.formData);
    setCustomization(item.customization);
    showToast({
      type: 'success',
      title: `Loaded: ${item.title}`,
      message: 'QR code configuration restored.',
    });
  }, [showToast]);

  return (
    <QRContext.Provider
      value={{
        formData,
        setFormData,
        customization,
        setCustomization,
        updateCustomization,
        payload,
        scannabilityReport,
        selectedType: formData.type,
        switchQRType,
        applyPreset,
        applyTemplate,
        resetCustomization,
        history,
        addToHistory,
        deleteHistoryItem,
        clearHistory,
        loadHistoryItem,
        comparedCustomization,
        setComparedCustomization,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </QRContext.Provider>
  );
};

export const useQR = () => {
  const context = useContext(QRContext);
  if (!context) {
    throw new Error('useQR must be used within a QRProvider');
  }
  return context;
};
