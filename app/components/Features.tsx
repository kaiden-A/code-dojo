'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const PILLARS = [
  {
    title: "Curriculum",
    icon: "menu_book",
    description: "Deep dives into data structures, system design, and the philosophy of clean code. No frameworks without foundations.",
  },
  {
    title: "Mentorship",
    icon: "diversity_3",
    description: "Direct transmission from industry veterans. 1:1 code reviews that are rigorous yet respectful.",
  },
  {
    title: "Community",
    icon: "temple_buddhist",
    description: "A silent hall of peers. We ship together in disciplined sprints, respecting the 'Ma' of focused work.",
  }
];

export default function Features() {
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

  return (
    <section 
      ref={sectionRef}
      className="py-32 bg-surface relative overflow-hidden" 
      id="features"
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Text & Pillars */}
          <div className={`lg:col-span-5 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <h2 className="text-4xl font-headline mb-12 text-on-surface group">
              The Pillars of <br />
              <span className="text-tertiary relative inline-block after:content-[''] after:absolute after:bottom-1 after:left-0 after:w-full after:h-1 after:bg-tertiary/40 after:scale-x-0 after:transition-transform after:duration-500 group-hover:after:scale-x-100">
                Our Sanctum
              </span>
            </h2>

            <div className="space-y-12">
              {PILLARS.map((pillar, idx) => (
                <div 
                  key={idx} 
                  className="flex gap-6 group/item transition-all duration-300 hover:translate-x-2"
                >
                  <span className="material-symbols-outlined text-primary text-3xl transition-transform group-hover/item:scale-110">
                    {pillar.icon}
                  </span>
                  <div>
                    <h4 className="font-headline text-xl mb-2 text-on-surface">{pillar.title}</h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed max-w-sm">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Image Gallery */}
          <div className={`lg:col-span-7 transition-all duration-1000 delay-300 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="grid grid-cols-2 gap-4">
              
              {/* Image 1: Workspace */}
              <div className="aspect-4/5 bg-surface-container overflow-hidden group/img relative shadow-2xl">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXTh5DQJTKCjdKeziPFDnr9YY4MI7N12rb24LU9ugOCGPN3PdhXgHrjLlfU8f-Gl2oA0f9AdRUizhFfFMbGEC1XcPvYLIGy7cpT7ZNvNVRDylpPlJcmkm5G2kKvTiRLAv0fJr-R4UkuxFMapf4HnhStaan5MSbZNtRucbDfTPWTYSfZR4bpd4L702mNOBnHU1nwnQWa_c6VbCYc1hqC9FWXRe98Tah30Z6lZVam0PEQkBxZ7DL-YL_jShFMb89QkSrbjqgYXOv7CA" 
                  alt="Minimal Workspace"
                  fill
                  className="object-cover grayscale group-hover/img:grayscale-0 transition-all duration-1000 scale-100 group-hover/img:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-all duration-500"></div>
              </div>

              {/* Image 2: Dojo Interior (Offset) */}
              <div className="aspect-4/5 bg-surface-container mt-12 overflow-hidden group/img relative shadow-2xl">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXdrM-nrFK0RHKri24XcxFTZF5FY9eptPVd7ujFW3Z5wGo7QiPPoGQbilvEXMAHU2gHKN_1_dVcbXgCfGlnvegybY3k_xXLV_IuOBNIOPrbb_VPp4Zre8Vh-E1Hi-PCEUWQoMtEfDZVWL5Pl3EZqngF9RruftS_aBMnVCBDB-QhhhtQr49ftnUdhZpJ5ouGRNsV7tajErOtqwH45njWsC6NGHBqe0ehLJ85OK-Q901h5iWSMllHwMTGlyedcJwVbHqST7xrXQs7js" 
                  alt="Dojo Interior Minimal"
                  fill
                  className="object-cover grayscale group-hover/img:grayscale-0 transition-all duration-1000 scale-100 group-hover/img:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-all duration-500"></div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}