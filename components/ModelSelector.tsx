import React from 'react';
import type { AiModel } from '../types';
import { CpuIcon } from './icons';

interface ModelSelectorProps {
  selectedModel: AiModel;
  onModelChange: (model: AiModel) => void;
  disabled: boolean;
}

const models: { id: AiModel; name: string }[] = [
  { id: 'standard', name: 'Standard' },
  { id: 'creative', name: 'Creative' },
  { id: 'tactical', name: 'Tactical' },
];

export const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelChange, disabled }) => {
  return (
    <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800 backdrop-blur-sm">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-slate-800/70 rounded-lg border border-slate-700">
          <CpuIcon size={16} className="text-red-400" />
        </div>
        <div className="flex-1 grid grid-cols-3 gap-2">
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => onModelChange(model.id)}
              disabled={disabled}
              className={`px-2 py-1.5 text-xs font-bold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/80 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60 ${
                selectedModel === model.id
                  ? 'bg-red-600 text-white shadow-md shadow-red-500/10'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700/80 hover:text-white'
              }`}
            >
              {model.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};