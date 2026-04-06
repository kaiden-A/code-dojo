"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const DojoScene = dynamic(() => import("./components/DojoScene"), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-background" /> 
});

const GROWTH_STAGES = [
  { num: "01", title: "Confusion", desc: "The fog of the unknown. Essential resistance before the breakthrough." },
  { num: "02", title: "Curiosity", desc: "The spark. Turning frustration into a systematic 'How?'." },
  { num: "03", title: "Learning", desc: "The deep work. Absorbing the core principles and root logic." },
  { num: "04", title: "Application", desc: "The forge. Building projects that break your assumptions." },
  { num: "05", title: "Teaching", desc: "The mastery. Solidifying the self by guiding another." },
];

export default function HowToKnowPage() {
  const growthRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // 3. Reveal Logic for Pillar Cards
    const cards = gsap.utils.toArray(".reveal-card");
    cards.forEach((card: any) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          end: "top 40%",
          scrub: 1,
        },
        opacity: 1,
        y: 0,
        ease: "power2.out"
      });
    });

    // 4. IMPROVED Growth Node Animation
    // We target the section ID directly to ensure the trigger exists
    const nodes = gsap.utils.toArray(".growth-node");
    
    nodes.forEach((node: any, i: number) => {
      gsap.fromTo(node, 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          backgroundColor: "rgba(234, 191, 141, 0.15)",
          borderColor: "rgba(234, 191, 141, 1)",
          scrollTrigger: {
            trigger: "#growth-section",
            // We use absolute percentages of the 300vh container
            start: `${i * 15}% center`, 
            end: `${(i * 15) + 10}% center`,
            scrub: true,
          }
        }
      );
    });

    // 5. Final CTA Reveal
    gsap.to(".final-cta", {
      scrollTrigger: {
        trigger: "#growth-section",
        start: "80% center",
        end: "95% center",
        scrub: true,
      },
      opacity: 1,
      scale: 1,
      y: 0
    });

    // 6. CRITICAL: Refresh after a short delay to allow Three.js to mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className="bg-background text-on-surface selection:bg-primary selection:text-on-primary">
      <DojoScene />

      {/* Main content wrapper with pointer-events-none to allow 3D interaction */}
      <div className="relative z-20 pointer-events-none w-full">
        
        {/* HERO */}
        <section className="h-screen flex flex-col justify-center items-center text-center px-10">
          <div className="animate-fade-up pointer-events-auto">
            <span className="text-primary tracking-[0.6em] uppercase text-xs font-bold mb-4 block">The Digital Carpenter's Oath</span>
            <h1 className="text-7xl md:text-9xl mb-6 font-headline font-bold italic text-glow">Mastery</h1>
            <p className="text-outline max-w-lg mx-auto font-body opacity-60">A vertical descent into the disciplines of code. Beyond tools, toward the spirit of engineering.</p>
          </div>
        </section>

        {/* PILLARS (I & II) */}
        <section className="h-screen flex items-center px-[10%]">
          <div className="reveal-card opacity-0 translate-y-12 p-10 max-w-[450px] bg-surface/90 backdrop-blur-xl border-l-2 border-primary pointer-events-auto shadow-2xl">
            <span className="text-primary text-xs font-bold tracking-widest uppercase">Pillar I</span>
            <h2 className="text-4xl my-4 font-headline">Core vs. Tool</h2>
            <p className="text-on-surface-variant leading-relaxed mb-4 font-body">Tools are seasonal. They are the leaves of the tree that bloom and fall.</p>
            <p className="text-sm border-l border-primary/30 pl-4 italic text-outline font-body opacity-50">"The man who masters the tool is a technician; the man who masters the principle is an architect."</p>
          </div>
        </section>

        <section className="h-screen flex items-center justify-end px-[10%]">
          <div className="reveal-card opacity-0 translate-y-12 p-10 max-w-[450px] bg-surface/90 backdrop-blur-xl border-l-2 border-primary pointer-events-auto shadow-2xl">
            <span className="text-primary text-xs font-bold tracking-widest uppercase">Pillar II</span>
            <h2 className="text-4xl my-4 font-headline">The Project Compass</h2>
            <p className="text-on-surface-variant leading-relaxed font-body">Identify the <strong>"Gap of Knowledge"</strong>—the single skill that makes the rest of the project easier. Don't learn the path; learn what the path requires.</p>
          </div>
        </section>

        {/* PILLAR III */}
        <section className="h-screen flex items-center px-[10%]">
          <div className="reveal-card opacity-0 translate-y-12 p-10 max-w-[450px] bg-surface/90 backdrop-blur-xl border-l-2 border-primary pointer-events-auto shadow-2xl">
            <span className="text-primary text-xs font-bold tracking-widest uppercase">Pillar III</span>
            <h2 className="text-4xl my-4 font-headline">Vertical Descent</h2>
            <div className="space-y-4 mt-6">
              <div className="flex gap-4 items-center">
                <span className="text-primary font-bold">III</span>
                <span className="text-sm uppercase tracking-widest text-on-surface">System Thinking</span>
              </div>
              <div className="flex gap-4 items-center opacity-40">
                <span className="font-bold">II</span>
                <span className="text-sm uppercase tracking-widest">Application</span>
              </div>
              <div className="flex gap-4 items-center opacity-40">
                <span className="font-bold">I</span>
                <span className="text-sm uppercase tracking-widest">Language Logic</span>
              </div>
            </div>
          </div>
        </section>

        {/* THE GROWTH CYCLE - 300vh SECTION */}
        <section id="growth-section" className="relative w-full h-[300vh] flex flex-col pt-32">
          {/* Sticky container stays in view for the whole 300vh */}
          <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 overflow-hidden">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl italic font-headline mb-4">The Cycle of Growth</h2>
              <p className="text-primary tracking-[0.3em] uppercase text-xs">The Alchemical Process of Learning</p>
            </div>
            
            {/* The Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 max-w-7xl w-full mx-auto">
              {GROWTH_STAGES.map((stage, i) => (
                <div 
                  key={i} 
                  className="growth-node opacity-0 p-8 border border-white/10 bg-white/5 backdrop-blur-md pointer-events-auto"
                >
                  <span className="text-primary text-2xl font-black mb-4 block">{stage.num}</span>
                  <h3 className="font-bold uppercase tracking-widest text-sm mb-3">{stage.title}</h3>
                  <p className="text-[10px] uppercase tracking-tighter opacity-60 leading-relaxed">{stage.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}