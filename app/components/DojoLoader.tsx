'use client';

import { useEffect, useState } from 'react';

interface DojoLoaderProps {
  children: React.ReactNode;
}

export default function DojoLoader({ children }: DojoLoaderProps) {
  const [shouldOpen, setShouldOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Start the parting sequence shortly after mount
    const startAnimation = setTimeout(() => {
      setShouldOpen(true);
    }, 200);

    // Increase this to 3000ms so the doors have time to finish their 2.2s slide
    const unmountTimer = setTimeout(() => {
      setIsMounted(false);
    }, 3000);

    return () => {
      clearTimeout(startAnimation);
      clearTimeout(unmountTimer);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* The Inside (Your Content) */}
      <div className={isMounted ? 'h-screen overflow-hidden' : ''}>
        {children}
      </div>

      {/* The Doors Overlay */}
      {isMounted && (
        <div className="fixed inset-0 z-9999 flex overflow-hidden pointer-events-none">
          
          {/* Left Door */}
          <div 
            className={`relative h-full w-1/2 bg-parchment border-r border-wood/30 shadow-[10px_0_30px_rgba(0,0,0,0.1)] flex items-center justify-end
              ${shouldOpen ? 'animate-shoji-left' : 'translate-x-0'}`}
          >
            <div className="absolute inset-0 opacity-10 zen-pattern"></div>
            {/* Visual handle */}
            <div className="w-1.5 h-32 bg-wood/20 rounded-full mr-4 border-r border-white/10"></div>
          </div>

          {/* Right Door */}
          <div 
            className={`relative h-full w-1/2 bg-parchment border-l border-wood/30 shadow-[-10px_0_30px_rgba(0,0,0,0.1)] flex items-center justify-start
              ${shouldOpen ? 'animate-shoji-right' : 'translate-x-0'}`}
          >
            <div className="absolute inset-0 opacity-10 zen-pattern"></div>
            {/* Visual handle */}
            <div className="w-1.5 h-32 bg-wood/20 rounded-full ml-4 border-l border-white/10"></div>
          </div>

          {/* Center Brand Symbol - Fades first to signal the opening */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out
            ${shouldOpen ? 'opacity-0 scale-150 blur-xl' : 'opacity-100 scale-100'}`}>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-brand rounded-eight rotate-45 animate-pulse shadow-[0_0_40px_rgba(108,238,43,0.4)]"></div>
              <span className="mt-10 font-serif text-sumi tracking-[0.6em] uppercase text-xs font-bold">
                Entering
              </span>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}