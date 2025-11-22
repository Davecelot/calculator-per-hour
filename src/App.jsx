import React, { useState } from 'react';

// Import components
import CalculatorView from './components/CalculatorView';
import InstructionsView from './components/InstructionsView';

// Import hooks
import { useTranslation } from './hooks/useTranslation';

export default function App() {
  const { t, language, setLanguage } = useTranslation();
  const [activeTab, setActiveTab] = useState('calculator');

  return (
    <div className="min-h-screen flex flex-col bg-background text-text font-sans selection:bg-white selection:text-black">
      {/* Dithering Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-dither mix-blend-overlay"></div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <h1 className="text-lg font-bold tracking-tight uppercase">
              Rate<span className="text-textMuted">Calculator</span>
              <span className="ml-2 text-xs px-1.5 py-0.5 border border-border rounded text-textMuted font-mono">v2.0</span>
            </h1>
          </div>

          {/* Tab Navigation - Desktop */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 h-full items-end gap-8">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`h-full px-4 border-b-2 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'calculator'
                ? 'border-white text-white'
                : 'border-transparent text-textMuted hover:text-white'
                }`}
            >
              {t.tabs?.calculator || "Calculator"}
            </button>
            <button
              onClick={() => setActiveTab('instructions')}
              className={`h-full px-4 border-b-2 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'instructions'
                ? 'border-white text-white'
                : 'border-transparent text-textMuted hover:text-white'
                }`}
            >
              {t.tabs?.instructions || "Instructions"}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="relative group">
                <select
                  className="appearance-none bg-black/20 border border-border/50 text-xs text-white font-mono rounded px-2 py-1 pr-6 focus:outline-none focus:border-white transition-colors uppercase cursor-pointer hover:bg-black/40"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="en" className="bg-background text-white">EN</option>
                  <option value="es" className="bg-background text-white">ES</option>
                  <option value="pt" className="bg-background text-white">PT</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none text-white group-hover:text-white transition-colors">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-textMuted">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {t.systemOnline}
            </div>
          </div>
        </div>

        {/* Mobile Tab Navigation */}
        <div className="md:hidden flex border-t border-border">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'calculator'
              ? 'bg-surfaceHighlight text-white'
              : 'text-textMuted'
              }`}
          >
            {t.tabs?.calculator || "Calculator"}
          </button>
          <button
            onClick={() => setActiveTab('instructions')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${activeTab === 'instructions'
              ? 'bg-surfaceHighlight text-white'
              : 'text-textMuted'
              }`}
          >
            {t.tabs?.instructions || "Instructions"}
          </button>
        </div>
      </header>

      <main className="flex-grow p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {activeTab === 'calculator' ? (
          <CalculatorView t={t} language={language} />
        ) : (
          <InstructionsView t={t} />
        )}
      </main>
    </div>
  );
}