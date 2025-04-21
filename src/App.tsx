import React, { useState } from 'react';
import { Upload, Bot, Settings } from 'lucide-react';
import { ChatbotConfig, AIModel } from './types';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [step, setStep] = useState<'upload' | 'configure' | 'chat'>('upload');
  const [config, setConfig] = useState<Partial<ChatbotConfig>>({
    name: '',
    model: 'gpt-4',
    documents: []
  });

  const handleModelSelect = (model: AIModel) => {
    setConfig(prev => ({ ...prev, model }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bot className="w-8 h-8 text-purple-500" />
            <h1 className="text-xl font-semibold">DocBot Builder</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${step === 'upload' ? 'text-purple-500' : 'text-gray-400'}`}>
              <Upload className="w-6 h-6 mr-2" />
              <span>Upload Docs</span>
            </div>
            <div className="w-16 h-px bg-gray-300 dark:bg-gray-700" />
            <div className={`flex items-center ${step === 'configure' ? 'text-purple-500' : 'text-gray-400'}`}>
              <Settings className="w-6 h-6 mr-2" />
              <span>Configure</span>
            </div>
            <div className="w-16 h-px bg-gray-300 dark:bg-gray-700" />
            <div className={`flex items-center ${step === 'chat' ? 'text-purple-500' : 'text-gray-400'}`}>
              <Bot className="w-6 h-6 mr-2" />
              <span>Test Chat</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          {step === 'upload' && (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Upload Your Documentation</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Drag and drop your documentation files or click to browse. We support PDF, DOCX, and MD files.
              </p>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 hover:border-purple-500 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Drop your files here or click to select
                </p>
              </div>
            </div>
          )}

          {step === 'configure' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">Configure Your Chatbot</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Chatbot Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                    placeholder="Enter a name for your chatbot"
                    value={config.name}
                    onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Select AI Model</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['gpt-4', 'gpt-3.5-turbo', 'claude-3', 'gemini-pro'].map((model) => (
                      <button
                        key={model}
                        className={`p-4 border rounded-lg text-left ${
                          config.model === model
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                        onClick={() => handleModelSelect(model as AIModel)}
                      >
                        <h3 className="font-medium">{model}</h3>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
