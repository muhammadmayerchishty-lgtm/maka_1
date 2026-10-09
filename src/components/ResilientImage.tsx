import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ResilientImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackLabel?: string;
  containerClassName?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  fallbackLabel,
  className = '',
  containerClassName = '',
  loading = 'lazy',
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`w-full h-full bg-gradient-to-br from-[#1C1917] via-[#111113] to-[#261D11] flex flex-col items-center justify-center p-6 text-center select-none ${containerClassName}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-10 h-10 rounded-full border border-[#C9A24B]/30 bg-[#C9A24B]/10 flex items-center justify-center text-[#C9A24B] mb-3">
          <Sparkles className="w-4 h-4" />
        </div>
        <span className="font-serif-display italic text-lg sm:text-xl text-[#F3E2A9]/85 max-w-xs">
          {fallbackLabel || alt}
        </span>
        <span className="mt-1 text-[10px] font-mono tracking-widest uppercase text-[#C9A24B]/60">
          MAKA · Architectural Hardware
        </span>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#121215] ${containerClassName}`}>
      {/* Shimmering dark luxury placeholder until image finishes decoding */}
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#111113] via-[#1D1B18] to-[#111113] animate-pulse"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`${className} transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...rest}
      />
    </div>
  );
};
