import React, { useState } from 'react';
import { ClipboardIcon, CheckIcon } from './icons';

interface IdentityDetailRowProps {
  label: string;
  value: string;
  onCopy: () => void;
  disabled: boolean;
  prefixElement?: React.ReactNode;
  isAnimating: boolean;
}

export const IdentityDetailRow: React.FC<IdentityDetailRowProps> = ({
  label,
  value,
  onCopy,
  disabled,
  prefixElement,
  isAnimating
}) => {
  const [isCopied, setIsCopied] = useState(false);
  
  const handleCopyClick = () => {
    if (disabled) return;
    onCopy();
    setIsCopied(true);
    setTimeout(() => {
        setIsCopied(false);
    }, 2000);
  };

  const copyButtonAriaLabel = isCopied ? 'Copied!' : `Copy ${label}`;

  return (
    <div className={`bg-slate-900/50 p-4 rounded-xl border border-slate-800 backdrop-blur-sm transition-all duration-300 ${isAnimating ? 'scale-105' : 'scale-100'}`}>
      <label className="block text-xs font-semibold uppercase text-slate-400 mb-2 tracking-wider">
        {label}
      </label>
      <div className="flex items-center space-x-3">
        {prefixElement}
        <code className="flex-1 text-sm font-mono break-all text-slate-200 p-2 bg-slate-800/70 rounded-md border border-slate-700 shadow-inner drop-shadow-[0_0_5px_rgba(255,255,255,0.05)]">
          {value}
        </code>
        <button
          onClick={handleCopyClick}
          disabled={disabled}
          className="relative w-10 h-10 flex items-center justify-center bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-700/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500/80 focus:ring-offset-2 focus:ring-offset-slate-950"
          title={copyButtonAriaLabel}
          aria-label={copyButtonAriaLabel}
        >
          <span className={`transition-opacity duration-300 ${isCopied ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}>
            <ClipboardIcon size={18} />
          </span>
          <span className={`absolute transition-all duration-300 ${isCopied ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
            <CheckIcon size={18} className="text-green-400" />
          </span>
        </button>
      </div>
    </div>
  );
};