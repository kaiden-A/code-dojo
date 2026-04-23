"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { ChevronDown, Code, Sparkles, Zap, Rocket, Layers, Target, Cpu, Puzzle } from "lucide-react";
import React from "react";

const VueScene = dynamic(() => import("./components/VueScene").catch(err => {
  console.error('Failed to load VueScene:', err);
  return { default: () => <div className="fixed inset-0 bg-background">Failed to load 3D scene</div> };
}), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-background">Loading 3D scene...</div> 
});

const ACTIVITY_STEPS = [
  { 
    num: "01", 
    title: "Summon the AI", 
    desc: "Initialize your Stitch AI environment. Configure the prompt engineering for landing page generation.",
    icon: <Sparkles size={24} />
  },
  { 
    num: "02", 
    title: "Weave with Stitch", 
    desc: "Integrate Stitch components. Build modular sections with pre-built UI patterns.",
    icon: <Layers size={24} />
  },
  { 
    num: "03", 
    title: "Bind the Data", 
    desc: "Connect reactive state. Use Vue's reactivity system to make components dynamic.",
    icon: <Cpu size={24} />
  },
  { 
    num: "04", 
    title: "Polish the Blade", 
    desc: "Refine animations, optimize performance, and deploy your landing page.",
    icon: <Rocket size={24} />
  },
];

export default function LandOfFrameworksPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    console.log('LandOfFrameworksPage: Initializing...');
    
    try {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      gsap.registerPlugin(ScrollTrigger);

      const cards = gsap.utils.toArray(".vue-reveal");
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

      const activityNodes = gsap.utils.toArray(".activity-node");
      activityNodes.forEach((node: any, i: number) => {
        gsap.fromTo(node, 
          { opacity: 0, x: -30, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            scrollTrigger: {
              trigger: "#activity-section",
              start: `${i * 15}% center`,
              end: `${(i * 15) + 10}% center`,
              scrub: true,
            }
          }
        );
      });

      gsap.to(".final-cta", {
        scrollTrigger: {
          trigger: "#activity-section",
          start: "85% center",
          end: "95% center",
          scrub: true,
        },
        opacity: 1,
        scale: 1,
        y: 0
      });

      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
        console.log('LandOfFrameworksPage: ScrollTrigger refreshed');
      }, 500);

      console.log('LandOfFrameworksPage: Animations set up');
      
      return () => {
        clearTimeout(timer);
        lenis.destroy();
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    } catch (error) {
      console.error('LandOfFrameworksPage error:', error);
    }
  }, []);

  return (
    <main className="bg-background text-on-surface selection:bg-primary selection:text-on-primary relative min-h-screen">
      <VueScene />

      <div className="relative z-10 w-full">
        
        {/* HERO - Vue.js Focus */}
        <section className="h-screen flex flex-col justify-center items-center text-center px-10">
          <div className="animate-fade-up pointer-events-auto">
            <span className="text-primary tracking-[0.6em] uppercase text-xs font-bold mb-4 block">Framework Focus</span>
            <h1 className="text-8xl md:text-[10rem] mb-6 font-headline font-bold italic text-glow">
              Vue<span className="text-primary">.js</span>
            </h1>
            <p className="text-outline max-w-2xl mx-auto font-body opacity-60 text-lg md:text-xl leading-relaxed">
              The Progressive JavaScript Framework. Build user interfaces with an approachable, versatile, and performant foundation.
            </p>
          </div>
        </section>

        {/* PHILOSOPHY SECTION */}
        <section className="h-screen flex items-center px-[10%]">
          <div className="vue-reveal opacity-0 translate-y-12 p-10 max-w-[500px] bg-surface/90 backdrop-blur-xl border-l-2 border-primary pointer-events-auto shadow-2xl">
            <span className="text-primary text-xs font-bold tracking-widest uppercase">Philosophy I</span>
            <h2 className="text-4xl my-4 font-headline">Declarative Rendering</h2>
            <p className="text-on-surface-variant leading-relaxed font-body">
              Vue extends standard HTML with template syntax. Declare the desired state, and Vue efficiently updates and renders components.
            </p>
            <Code className="text-primary mt-6" size={32} />
          </div>
        </section>

        <section className="h-screen flex items-center justify-end px-[10%]">
          <div className="vue-reveal opacity-0 translate-y-12 p-10 max-w-[500px] bg-surface/90 backdrop-blur-xl border-l-2 border-tertiary pointer-events-auto shadow-2xl">
            <span className="text-tertiary text-xs font-bold tracking-widest uppercase">Philosophy II</span>
            <h2 className="text-4xl my-4 font-headline">Component-Based</h2>
            <p className="text-on-surface-variant leading-relaxed font-body">
              Build encapsulated components that manage their own state, then compose them to form complex UIs.
            </p>
            <Puzzle className="text-tertiary mt-6" size={32} />
          </div>
        </section>

        <section className="h-screen flex items-center px-[10%]">
          <div className="vue-reveal opacity-0 translate-y-12 p-10 max-w-[500px] bg-surface/90 backdrop-blur-xl border-l-2 border-primary pointer-events-auto shadow-2xl">
            <span className="text-primary text-xs font-bold tracking-widest uppercase">Philosophy III</span>
            <h2 className="text-4xl my-4 font-headline">Reactive State</h2>
            <p className="text-on-surface-variant leading-relaxed font-body">
              Vue's reactivity system automatically tracks dependencies and updates the DOM when state changes.
            </p>
            <Zap className="text-primary mt-6" size={32} />
          </div>
        </section>

        {/* FRAMEWORK COMPARISON */}
        <section className="min-h-screen py-20 flex items-center justify-center px-10">
          <div className="vue-reveal opacity-0 translate-y-12 text-center max-w-4xl pointer-events-auto">
            <span className="text-primary tracking-[0.4em] uppercase text-xs font-bold mb-4 block">Framework Comparison</span>
            <h2 className="text-5xl md:text-6xl font-headline mb-12">Why Vue.js?</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-surface-container-low border border-primary/20 p-6 rounded-lg">
                <h3 className="text-primary font-headline text-xl mb-3">Approachable</h3>
                <p className="text-outline text-sm">Low barrier to entry. Easy to learn for beginners.</p>
              </div>
              <div className="bg-surface-container-low border border-tertiary/20 p-6 rounded-lg">
                <h3 className="text-tertiary font-headline text-xl mb-3">Versatile</h3>
                <p className="text-outline text-sm">From simple widgets to complex SPAs.</p>
              </div>
              <div className="bg-surface-container-low border border-primary/20 p-6 rounded-lg">
                <h3 className="text-primary font-headline text-xl mb-3">Performant</h3>
                <p className="text-outline text-sm">Efficient reactivity system with minimal overhead.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ACTIVITY BRIEFING - 300vh SECTION */}
        <section id="activity-section" className="relative w-full h-[500vh] flex flex-col pt-20 sm:pt-32 pb-20">
          <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 overflow-hidden">
            <div className="text-center mb-8 sm:mb-12 px-2">
              <span className="text-primary tracking-[0.2em] sm:tracking-[0.4em] uppercase text-[10px] sm:text-xs font-bold">Activity Briefing</span>
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-headline italic mb-2 sm:mb-4 mt-2 sm:mt-4">The Landing Page Forge</h2>
              <p className="text-outline max-w-md sm:max-w-xl mx-auto font-body opacity-60 text-sm sm:text-base">
                Master the art of building landing pages using Vue.js, Stitch, and AI assistance.
              </p>
            </div>
            
            <div className="space-y-3 sm:space-y-4 max-w-3xl w-full mx-auto px-2 sm:px-4">
              {ACTIVITY_STEPS.map((step, i) => (
                <div 
                  key={i} 
                  className="activity-node opacity-0 p-3 sm:p-4 md:p-6 border border-white/10 bg-surface/90 backdrop-blur-md pointer-events-auto flex gap-2 sm:gap-3 md:gap-6 items-start"
                >
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center">
                    <span className="text-primary font-headline text-sm sm:text-lg md:text-xl">{step.num}</span>
                  </div>
                  <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-primary/20 border border-primary/40 rounded-lg flex items-center justify-center text-primary">
                    {React.cloneElement(step.icon, { size: i === 0 ? 16 : i === 1 ? 16 : i === 2 ? 16 : 16, className: "w-4 h-4 sm:w-5 sm:h-5" })}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold uppercase tracking-widest text-[10px] sm:text-xs md:text-sm mb-1 sm:mb-2 text-primary truncate">{step.title}</h3>
                    <p className="text-[10px] sm:text-xs md:text-sm text-on-surface-variant leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

       

          </div>
        </section>

      </div>
    </main>
  );
}