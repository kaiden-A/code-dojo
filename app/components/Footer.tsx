'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-16 px-12 flex flex-col md:flex-row justify-between items-center bg-surface-container-low border-t border-outline-variant/10">
      
      {/* Brand & Copyright */}
      <div className="flex flex-col items-center md:items-start mb-12 md:mb-0 group">
        <div className="text-xl font-serif text-primary mb-2 transition-all duration-300 group-hover:tracking-wider">
          codeDojo
        </div>
        <p className="text-on-surface-variant font-sans text-xs tracking-tight italic opacity-60">
          © {new Date().getFullYear()} codeDojo. A Motion-U Initiative.
        </p>
      </div>

      {/* Navigation Scrolls */}
      <div className="flex gap-10 mb-12 md:mb-0">
        <Link 
          href="#" 
          className="text-on-surface-variant hover:text-tertiary transition-all duration-300 font-sans text-xs tracking-tight hover:tracking-wide uppercase"
        >
          The Scroll
        </Link>
        <Link 
          href="#" 
          className="text-on-surface-variant hover:text-tertiary transition-all duration-300 font-sans text-xs tracking-tight hover:tracking-wide uppercase"
        >
          Terms of Honor
        </Link>
        <Link 
          href="#" 
          className="text-on-surface-variant hover:text-tertiary transition-all duration-300 font-sans text-xs tracking-tight hover:tracking-wide uppercase"
        >
          Privacy
        </Link>
      </div>

      {/* Social / Technical Icons */}
      <div className="flex gap-8">
        <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-all duration-500 hover:scale-125 hover:rotate-6">
          terminal
        </span>
        <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-all duration-500 hover:scale-125 hover:-rotate-6">
          code
        </span>
        <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-all duration-500 hover:scale-125 hover:rotate-12">
          hub
        </span>
      </div>

    </footer>
  );
}