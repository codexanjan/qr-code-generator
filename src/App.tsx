import React, { useState } from 'react';
import { QRProvider, useQR } from './context/QRContext';
import { Navbar, NavTab } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { TemplateGallery } from './components/templates/TemplateGallery';
import { HistoryManager } from './components/history/HistoryManager';
import { QRScannerModal } from './components/scanner/QRScannerModal';
import { SmartAssistantModal } from './components/generator/SmartAssistantModal';
import { QRCompareModal } from './components/generator/QRCompareModal';
import { BatchGeneratorModal } from './components/generator/BatchGeneratorModal';
import { ToastContainer } from './components/common/ToastContainer';
import { QRType, QRTemplate } from './types/qr';

const AppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('landing');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isBatchOpen, setIsBatchOpen] = useState(false);

  const { switchQRType } = useQR();

  const handleSelectTypeFromLanding = (type: QRType) => {
    switchQRType(type);
    setCurrentTab('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTemplateApply = (template: QRTemplate) => {
    setCurrentTab('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors selection:bg-brand-500 selection:text-white">
      {/* Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'scanner') {
            setIsScannerOpen(true);
          } else if (tab === 'assistant') {
            setIsAssistantOpen(true);
          } else if (tab === 'bulk') {
            setIsBatchOpen(true);
          } else if (tab === 'compare') {
            setIsCompareOpen(true);
          } else {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        openScanner={() => setIsScannerOpen(true)}
        openAssistant={() => setIsAssistantOpen(true)}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {currentTab === 'landing' && (
          <LandingPage
            onStartCreating={() => setCurrentTab('generator')}
            onOpenScanner={() => setIsScannerOpen(true)}
            onOpenAssistant={() => setIsAssistantOpen(true)}
            onSelectType={handleSelectTypeFromLanding}
          />
        )}

        {currentTab === 'generator' && (
          <DashboardPage
            onOpenAssistant={() => setIsAssistantOpen(true)}
            onOpenScanner={() => setIsScannerOpen(true)}
            onOpenTemplates={() => setCurrentTab('templates')}
            onOpenHistory={() => setCurrentTab('history')}
            onOpenBatch={() => setIsBatchOpen(true)}
            onOpenCompare={() => setIsCompareOpen(true)}
          />
        )}

        {currentTab === 'templates' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <TemplateGallery onApply={handleTemplateApply} />
          </div>
        )}

        {currentTab === 'history' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <HistoryManager onLoadItem={() => setCurrentTab('generator')} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onSelectTab={(tab) => setCurrentTab(tab)} />

      {/* Interactive Modals */}
      <QRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
      />

      <SmartAssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />

      <QRCompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
      />

      <BatchGeneratorModal
        isOpen={isBatchOpen}
        onClose={() => setIsBatchOpen(false)}
      />

      {/* Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <QRProvider>
      <AppContent />
    </QRProvider>
  );
}
