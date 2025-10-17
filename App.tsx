import React, { useState, useEffect, useContext, useCallback } from 'react';
import { GenerateContentResponse } from '@google/genai';
import { AiContext } from './utils';
import { UserIdentity, AiModel } from './types';
import { generateUserIdentity, copyToClipboard } from './utils';
import { IdentityDetailRow } from './components/IdentityDetailRow';
import { ModelSelector } from './components/ModelSelector';
import { AiProfileSection } from './components/AiProfileSection';
import { RefreshCwIcon } from './components/icons';

const getModelName = (model: AiModel): string => {
  switch (model) {
    case 'creative':
      return 'gemini-2.5-pro';
    case 'tactical':
    case 'standard':
    default:
      return 'gemini-2.5-flash';
  }
};

const App: React.FC = () => {
  const ai = useContext(AiContext);
  const [identity, setIdentity] = useState<UserIdentity>(generateUserIdentity());
  const [selectedModel, setSelectedModel] = useState<AiModel>('standard');
  const [aiProfile, setAiProfile] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const generateProfile = useCallback(async (currentIdentity: UserIdentity, model: AiModel) => {
    if (!ai) return;
    setIsLoading(true);
    setError(null);
    setAiProfile(''); // Clear previous profile

    const modelName = getModelName(model);
    const persona = {
      standard: "a standard, balanced operative",
      creative: "a highly creative and unconventional operative",
      tactical: "a ruthlessly efficient and tactical operative whose profile should be returned as a list of key-value pairs (e.g., Codename: Ghost, Primary Skill: Infiltration)."
    };

    const prompt = `Generate a concise, intriguing operative profile based on the following identity data. The operative is ${persona[model]}. Keep it to 2-3 sentences. Be punchy and evocative, like a dossier summary. Do not mention the ID or color explicitly. Instead, use them as creative inspiration for the profile. ${model === 'tactical' ? 'Format the response as a list of key-value pairs.' : ''}`;

    try {
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
      });
      const text = response.text;
      setAiProfile(text.trim());
    } catch (e) {
      console.error(e);
      setError('Failed to generate AI profile. Please check your API key and try again.');
      setAiProfile('Error: Could not connect to the AI service.');
    } finally {
      setIsLoading(false);
    }
  }, [ai]);

  useEffect(() => {
    generateProfile(identity, selectedModel);
  }, [identity, selectedModel, generateProfile]);

  const handleRegenerate = () => {
    if (isLoading) return;
    setIsAnimating(true);
    const newIdentity = generateUserIdentity();
    setIdentity(newIdentity);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleModelChange = (model: AiModel) => {
    if (isLoading) return;
    setSelectedModel(model);
  };

  return (
    <>
      <div className="aurora-bg"></div>
      <div className="relative min-h-screen text-white font-sans p-4 sm:p-6 lg:p-8 flex flex-col justify-center items-center">
        <div className="w-full max-w-2xl mx-auto space-y-8">
          
          <header className="text-center space-y-2 opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.4)]">
              AI Operative ID
            </h1>
            <p className="text-slate-400 max-w-md mx-auto">
              Generate a unique operative identity and get an AI-powered profile assessment.
            </p>
          </header>

          <main className="space-y-6">
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 items-center opacity-0 animate-fade-in-up`} style={{ animationDelay: '200ms' }}>
              <IdentityDetailRow
                label="Operative ID"
                value={identity.id}
                onCopy={() => copyToClipboard(identity.id)}
                disabled={isLoading}
                isAnimating={isAnimating}
              />
              <IdentityDetailRow
                label="Chroma Key"
                value={identity.color}
                onCopy={() => copyToClipboard(identity.color)}
                disabled={isLoading}
                isAnimating={isAnimating}
                prefixElement={
                  <div
                    className="w-5 h-5 rounded-full border-2 border-slate-500 shadow-md transition-all"
                    style={{ 
                      backgroundColor: identity.color,
                      boxShadow: `0 0 10px ${identity.color}, 0 0 5px rgba(255,255,255,0.3)`
                    }}
                  />
                }
              />
            </div>
            
            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <ModelSelector
                selectedModel={selectedModel}
                onModelChange={handleModelChange}
                disabled={isLoading}
              />
            </div>
            
            {error && <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-lg text-sm opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms' }}>{error}</div>}

            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <AiProfileSection
                profile={aiProfile}
                isLoading={isLoading}
              />
            </div>

            <div className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
              <button
                onClick={handleRegenerate}
                disabled={isLoading}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-800/50 disabled:to-red-900/50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center mx-auto space-x-2 shadow-lg shadow-red-500/10 hover:shadow-xl hover:shadow-red-500/20 transform hover:-translate-y-0.5"
              >
                <RefreshCwIcon size={16} className={isLoading ? 'animate-spin' : ''}/>
                <span>{isLoading ? 'Generating...' : 'Regenerate Identity'}</span>
              </button>
            </div>
          </main>

          <footer className="text-center text-xs text-slate-600 pt-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <p>API key is handled client-side for demonstration. Do not expose keys in a production app.</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default App;