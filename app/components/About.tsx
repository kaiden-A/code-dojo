'use client';

import { useEffect, useRef, useState } from 'react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const revealClass = (delay: string) => 
    `transition-all duration-1000 transform ${delay} ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 md:translate-y-12'
    }`;

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-32 bg-surface-container-low relative overflow-hidden" 
      id="about"
    >
      {/* Background Texture */}
      <div className="absolute inset-0 tatami-texture opacity-30 md:opacity-40"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Header Section */}
        <div className={`flex flex-col md:flex-row justify-between items-start mb-16 md:mb-24 gap-6 md:gap-8 ${revealClass('delay-0')}`}>
          <div className="max-w-xl group">
            <h2 className="text-3xl md:text-5xl font-headline text-on-surface mb-4 md:mb-6 italic leading-tight">
              The Way of the Craftsman
            </h2>
            <div className="h-1 w-16 md:w-24 bg-primary mb-6 md:mb-8 transition-all duration-700 group-hover:w-32"></div>
          </div>
          <p className="text-on-surface-variant font-light max-w-md leading-relaxed text-sm md:text-base">
            We follow the ancient concept of Shuhari: the three stages of mastery. 
            From humble student to innovative master.
          </p>
        </div>

        {/* Shuhari Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-outline-variant/20">
          
          {/* Shu - Foundation */}
          <div className={`group p-8 md:p-12 border-b md:border-b-0 md:border-r border-outline-variant/20 hover:bg-surface/70 transition-all duration-500 hover:shadow-2xl ${revealClass('delay-150')}`}>
            <span className="text-4xl md:text-5xl font-headline text-primary/20 group-hover:text-primary transition-all duration-300 block mb-8 md:mb-12 group-hover:scale-110">
              01
            </span>
            <h3 className="text-xl md:text-2xl font-headline text-primary mb-4 md:mb-6 group-hover:tracking-wide transition-all">
              SHU (守)
            </h3>
            <p className="text-on-surface-variant leading-relaxed mb-6 md:mb-8 group-hover:text-on-surface transition text-sm md:text-base">
              Follow the rules. In this stage, the student repeats the kata precisely as taught by the sensei. Mastery of fundamental syntax and architecture.
            </p>
            <div className="text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase text-outline font-bold group-hover:text-primary transition">
              Foundation Period
            </div>
          </div>

          {/* Ha - Innovation */}
          <div className={`group p-8 md:p-12 border-b md:border-b-0 md:border-r border-outline-variant/20 hover:bg-surface/70 transition-all duration-500 bg-surface-container-low/50 ${revealClass('delay-300')}`}>
            <span className="text-4xl md:text-5xl font-headline text-primary/20 group-hover:text-primary transition-all duration-300 block mb-8 md:mb-12 group-hover:scale-110">
              02
            </span>
            <h3 className="text-xl md:text-2xl font-headline text-primary mb-4 md:mb-6 group-hover:tracking-wide transition-all">
              HA (破)
            </h3>
            <p className="text-on-surface-variant leading-relaxed mb-6 md:mb-8 group-hover:text-on-surface transition text-sm md:text-base">
              Break the rules. Having mastered the basics, the student experiments and explores the &quot;why&quot; behind the logic. Refactoring and optimization.
            </p>
            <div className="text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase text-outline font-bold group-hover:text-primary transition">
              Innovation Period
            </div>
          </div>

          {/* Ri - Mastery */}
          <div className={`group p-8 md:p-12 hover:bg-surface/70 transition-all duration-500 ${revealClass('delay-450')}`}>
            <span className="text-4xl md:text-5xl font-headline text-primary/20 group-hover:text-primary transition-all duration-300 block mb-8 md:mb-12 group-hover:scale-110">
              03
            </span>
            <h3 className="text-xl md:text-2xl font-headline text-primary mb-4 md:mb-6 group-hover:tracking-wide transition-all">
              RI (離)
            </h3>
            <p className="text-on-surface-variant leading-relaxed mb-6 md:mb-8 group-hover:text-on-surface transition text-sm md:text-base">
              Be the rule. The student transcends formal instruction. Intuitive development where code flows naturally as an extension of thought.
            </p>
            <div className="text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase text-outline font-bold group-hover:text-primary transition">
              Mastery Period
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}