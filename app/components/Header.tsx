"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { name: "Curriculum", href: "/curriculum" },
  { name: "Sensei", href: "#sensei" },
  { name: "Dojo Locations", href: "#locations" },
  { name: "Membership", href: "#membership" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-5 transition-all duration-500 border-b ${
          isScrolled 
            ? "bg-background/90 backdrop-blur-xl border-outline-variant/20 py-4 shadow-2xl" 
            : "bg-transparent border-transparent"
        }`}
      >
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group z-60">
          <div className="relative w-7 h-7 md:w-8 md:h-8 transition-transform duration-500 group-hover:rotate-12">
            <Image src="/icon.png" alt="Dojo Icon" fill className="object-contain" />
          </div>
          <span className="text-xl md:text-2xl font-serif tracking-tighter text-primary animate-pulse [animation-duration:3s]">
            codeDojo
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className="text-on-surface-variant hover:text-primary transition-all duration-300 font-sans tracking-wider uppercase text-[10px] hover:tracking-[0.2em]"
            >
              {link.name}
            </Link>
          ))}
          <button className="bg-primary text-on-primary px-6 py-2 font-sans text-[10px] uppercase tracking-widest hover:bg-primary/80 transition-all active:scale-95 duration-200 shadow-lg hover:shadow-primary/20 cursor-pointer">
            Join the Hall
          </button>
        </div>

        {/* Mobile Toggle Icon */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-primary z-60 p-2 transition-transform active:scale-75"
        >
          <span className="material-symbols-outlined text-3xl">
            {isMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-55 md:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop blur */}
        <div 
          className="absolute inset-0 bg-background/60 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Slide-out Panel (The Drawer) */}
        <div 
          className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-surface border-l border-outline-variant/20 p-12 pt-32 transition-transform duration-500 ease-out flex flex-col gap-8 shadow-[-20px_0_60px_rgba(0,0,0,0.5)] ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Subtle Texture for the Drawer */}
          <div className="absolute inset-0 tatami-texture opacity-5 pointer-events-none" />

          {NAV_LINKS.map((link, idx) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-serif text-on-surface hover:text-primary transition-colors border-b border-outline-variant/10 pb-4"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <span className="text-primary/30 mr-4 text-sm font-sans italic">0{idx + 1}</span>
              {link.name}
            </Link>
          ))}

          <button className="mt-8 w-full bg-primary text-on-primary py-4 font-sans text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-transform">
            Join the Hall
          </button>
        </div>
      </div>
    </>
  );
}