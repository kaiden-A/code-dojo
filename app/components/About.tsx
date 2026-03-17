'use client';

import { useEffect, useRef } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Find all children with reveal classes and make them visible
            const reveals = entry.target.querySelectorAll(
              '.reveal-left, .reveal-right, .reveal-fade'
            );
            reveals.forEach((el) => el.classList.add('reveal-visible'));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-24 px-4 sm:px-6 paper-texture overflow-hidden" 
      id="about"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Content Column */}
          <div className="order-2 md:order-1 reveal-left">
            <div className="wood-divider mb-6 sm:mb-8 w-20 sm:w-24"></div>
            
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-8">
              The Way of the Craftsman
            </h2>
            
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed">
              <p>
                codeDojo is not a bootcamp. It is a lifelong initiative by{" "}
                <span className="font-semibold text-sumi">motion-u</span> designed to transform developers into software artisans. We believe that code is more than logic—it is an expression of discipline.
              </p>
              <p>
                Our philosophy is rooted in the <span className="italic">"Shuhari"</span> stages of learning: first following the rules (Shu), then breaking them (Ha), and finally transcending them (Ri) to find one's own unique path in software architecture.
              </p>
            </div>

            {/* Stats/Pillars Grid */}
            <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-4 sm:gap-8 border-t border-wood/10 pt-6 sm:pt-10">
              <div>
                <span className="block text-2xl sm:text-3xl font-serif text-brand">01.</span>
                <span className="font-bold text-sumi text-sm sm:text-base uppercase tracking-tight">Discipline</span>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">Consistent practice and rigorous standards.</p>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-serif text-brand">02.</span>
                <span className="font-bold text-sumi text-sm sm:text-base uppercase tracking-tight">Mentorship</span>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">Direct guidance from industry masters.</p>
              </div>
            </div>
          </div>

          {/* Visual Column */}
          <div className="order-1 md:order-2 relative reveal-right">
            <div className="aspect-square bg-white rounded-eight shadow-2xl overflow-hidden p-3 sm:p-4 rotate-2 md:rotate-3 transform hover:rotate-0 transition-transform duration-500">
              <img 
                alt="Bonsai Tree representing growth" 
                className="w-full h-full object-cover rounded-eight" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0FTbUlatlp5twpyyTbxCLMnb-6kPc_Ra43Fzck2nExni0U2U0MQtPgH_vGiGRj-6NWuEBOjPpX9np70ctP6zpBwhVz9k4Q3Ab-FhW_TCTqJ62pO_0q5h-AgHQZTN4oAiqDwP7bo4QQ4Dbx82KMFjzgUp6selo4-Elt3dwnk0mx5sN7wxxjGgKikq4w2ABJm9wvlREmNfMbaehXOqNvPxhdolnec657TwfkyG6VqVNlMa8UaKSrV8RYkyQcVe02gOgo7pMGn0jJg4" 
                loading="lazy" 
              />
            </div>
            
            {/* Floating Zen Stone */}
            <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-brand/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-brand/20 animate-float">
              <span className="text-[0.6rem] sm:text-xs tracking-widest font-bold text-center leading-tight">
                HARMONY<br />IN LOGIC
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}