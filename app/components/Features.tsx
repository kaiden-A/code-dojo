'use client';

import { useEffect, useRef } from 'react';

const FEATURE_DATA = [
  {
    title: "Curriculum",
    description: "A meticulous path from fundamental structures to complex distributed systems, designed for longevity.",
    points: ["Algorithmic Efficiency", "Architectural Patterns", "Clean Code Ethics"],
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
      </svg>
    ),
    stagger: "stagger-1"
  },
  {
    title: "Mentorship",
    description: "Direct transmission of knowledge through code reviews and pair programming sessions with Industry Senseis.",
    points: ["1-on-1 Deep Dives", "Career Guidance", "Technical Mastery"],
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
      </svg>
    ),
    stagger: "stagger-2"
  },
  {
    title: "Community",
    description: "Join a global \"Sangha\" of developers who value quality, collaboration, and mutual growth.",
    points: ["Peer Support", "Exclusive Workshops", "Collaborative Build"],
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
      </svg>
    ),
    stagger: "stagger-3"
  }
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll('.reveal-fade, .reveal-scale');
            children.forEach((el) => el.classList.add('reveal-visible'));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6" ref={containerRef}>
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20 reveal-fade">
          <h2 className="font-serif text-3xl sm:text-4xl mb-2 sm:mb-4">The Pillars of Study</h2>
          <p className="text-gray-500 uppercase tracking-widest text-xs sm:text-sm">Three paths to mastery</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {FEATURE_DATA.map((feature, idx) => (
            <div 
              key={idx}
              className={`zen-pattern p-6 sm:p-8 rounded-eight border border-gray-100 hover:border-brand/30 transition-all group reveal-scale ${feature.stagger} ${idx === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
            >
              {/* Icon Container */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-brand/10 rounded-full flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                {feature.icon}
              </div>

              <h3 className="font-serif text-xl sm:text-2xl mb-2 sm:mb-4 group-hover:text-brand transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                {feature.description}
              </p>

              {/* Points List */}
              <ul className="space-y-2 text-xs sm:text-sm text-gray-500">
                {feature.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-brand rounded-full mr-2 shrink-0"></span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}