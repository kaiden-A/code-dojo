"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle navbar background transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 flex justify-between items-center px-8 py-5 transition-all duration-300 border-b ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl border-outline-variant/20 py-4" 
          : "bg-transparent border-transparent"
      }`}
    >
      {/* Brand Logo & Name */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="relative w-8 h-8 transition-transform duration-500 group-hover:rotate-12">
          <Image 
            src="/icon.png" 
            alt="Dojo Icon" 
            fill 
            className="object-contain"
          />
        </div>
        <span className="text-2xl font-serif tracking-tighter text-primary animate-pulse [animation-duration:3s]">
          codeDojo
        </span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-12">
        <Link 
          href="#curriculum" 
          className="text-primary border-b-2 border-primary pb-1 font-bold font-sans tracking-wider uppercase text-xs transition-all duration-300 hover:tracking-widest"
        >
          Curriculum
        </Link>
        <Link 
          href="#sensei" 
          className="text-outline hover:text-primary transition-all duration-300 font-sans tracking-wider uppercase text-xs hover:tracking-wider"
        >
          Sensei
        </Link>
        <Link 
          href="#locations" 
          className="text-outline hover:text-primary transition-all duration-300 font-sans tracking-wider uppercase text-xs hover:tracking-wider"
        >
          Dojo Locations
        </Link>
        <Link 
          href="#membership" 
          className="text-outline hover:text-primary transition-all duration-300 font-sans tracking-wider uppercase text-xs hover:tracking-wider"
        >
          Membership
        </Link>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button className="bg-primary text-on-primary px-6 py-2 font-sans text-xs uppercase tracking-widest hover:bg-primary/80 transition-all active:scale-95 duration-200 shadow-lg hover:shadow-primary/20 cursor-pointer">
          Join the Hall
        </button>
        
        {/* Mobile Menu Icon (Requires Material Symbols font in layout) */}
        <button className="md:hidden text-primary transition-transform hover:scale-110">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </nav>
  );
}