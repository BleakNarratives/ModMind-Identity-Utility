import React, { useEffect, useState } from 'react';
import { SparklesIcon } from './icons';

interface AiProfileSectionProps {
  profile: string;
  isLoading: boolean;
}

export const AiProfileSection: React.FC<AiProfileSectionProps> = ({
  profile,
  isLoading,
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (!isLoading && profile) {
      setShouldAnimate(true);
      const timer = setTimeout(() => setShouldAnimate(false), 500); // Duration of the animation
      return () => clearTimeout(timer);
    }
  }, [isLoading, profile]);

  const ShimmerEffect = () => (
    <div className="space-y-3">
      <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
      <div className="h-4 bg-slate-700/50 rounded w-full"></div>
      <div className="h-4 bg-slate-700/50 rounded w-5/6"></div>
    </div>
  );

  return (
    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 backdrop-blur-sm space-y-4">
      <div className="flex items-center space-x-2">
        <SparklesIcon size={16} className="text-red-400" />
        <h3 className="text-sm font-semibold uppercase text-slate-400 tracking-wider">
          AI-Generated Operative Profile
        </h3>
      </div>
      <div
        className="min-h-[120px] p-4 bg-slate-800/70 rounded-md border border-slate-700 shadow-inner overflow-hidden relative"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-red-500/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"/>
        {isLoading ? (
          <ShimmerEffect />
        ) : (
          <p className={`text-sm text-slate-300 whitespace-pre-wrap font-mono ${shouldAnimate ? 'animate-glitch' : ''}`}>
            {profile}
          </p>
        )}
      </div>
    </div>
  );
};