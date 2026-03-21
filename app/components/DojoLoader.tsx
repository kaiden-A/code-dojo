'use client';

import { useEffect, useState } from 'react';

interface DojoLoaderProps {
  children: React.ReactNode;
}

export default function DojoLoader({ children }: DojoLoaderProps) {
  const [shouldOpen, setShouldOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Parting sequence begins shortly after mount
    const startAnimation = setTimeout(() => {
      setShouldOpen(true);
    }, 400);

    // Unmount after doors complete their slide (approx 3s)
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
      {/* Content Layer */}
      <div className={isMounted ? 'h-screen overflow-hidden' : ''}>
        {children}
      </div>

      {/* The Black Lacquer & Gold Doors */}
      {isMounted && (
        <div className="fixed inset-0 z-[9999] flex overflow-hidden pointer-events-none">
          
          {/* Left Door: Black Lacquer with Gold Edge */}
          <div 
            className={`relative h-full w-1/2 bg-[#0a0a0a] border-r-2 border-primary/40 shadow-[20px_0_50px_rgba(0,0,0,0.5)] flex items-center justify-end transition-transform duration-[2200ms] ease-in-out
              ${shouldOpen ? '-translate-x-full' : 'translate-x-0'}`}
          >
            {/* Subtle Tatami/Zen Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 tatami-texture"></div>
            
            {/* Gold Vertical Handle */}
            <div className="relative mr-6 group">
               <div className="w-1.5 h-48 bg-primary rounded-full shadow-[0_0_15px_rgba(234,191,141,0.4)] transition-all duration-1000"></div>
               <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 border-t-2 border-r-2 border-primary/50 rotate-45"></div>
            </div>
          </div>

          {/* Right Door: Black Lacquer with Gold Edge */}
          <div 
            className={`relative h-full w-1/2 bg-[#0a0a0a] border-l-2 border-primary/40 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex items-center justify-start transition-transform duration-[2200ms] ease-in-out
              ${shouldOpen ? 'translate-x-full' : 'translate-x-0'}`}
          >
            <div className="absolute inset-0 opacity-10 tatami-texture"></div>
            
            {/* Gold Vertical Handle */}
            <div className="relative ml-6 group">
               <div className="w-1.5 h-48 bg-primary rounded-full shadow-[0_0_15px_rgba(234,191,141,0.4)] transition-all duration-1000"></div>
               <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 border-b-2 border-l-2 border-primary/50 rotate-45"></div>
            </div>
          </div>

          {/* Central Brand Symbol (Fades Out) */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out z-10
            ${shouldOpen ? 'opacity-0 scale-150 blur-2xl' : 'opacity-100 scale-100'}`}>
            <div className="flex flex-col items-center">
              {/* Spinning Dojo Diamond */}
              <div className="w-16 h-16 border-2 border-primary rotate-45 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                 <div className="w-8 h-8 bg-primary shadow-[0_0_30px_rgba(234,191,141,0.6)]"></div>
              </div>
              <span className="mt-12 font-serif text-primary tracking-[0.8em] uppercase text-[10px] font-bold animate-pulse">
                Entering the Sanctum
              </span>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}