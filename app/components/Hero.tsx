import Image from 'next/image';

export default function Hero() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-background" 
      data-purpose="hero"
    >
      {/* Background Layer with Slow Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image 
          alt="Dojo Interior" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZfnHwL11NmP98xuJRz7XqAyna4nOmuc2cMaI0dGA35dndC4LpoRj9Qu9yq9YF4C0ZGMaxAGdVOnB5VvJUazXeNoIxDnddHAsYj2MJth8nUnhlsEcgMZlxW3TXBw37loAnAJ3GnVO9QxMhR9KdVY_0axKwHk1MFfHJ9oxsn-3Yx8M3AnUcI-RpWYuJaMdST6pUAKjzYUzwCVS7MLBhQcSgT6p06zvR0FWluXvBeqNsiIlIZOq-XnJdgM9u2MgBtr_xlZm-s8qoLkc" 
          fill
          priority
          className="object-cover opacity-40 animate-slow-zoom"
        />
        {/* Gradient Overlay using v4 tokens */}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
        <div className="grid md:grid-cols-12 gap-12 items-end">
          
          {/* Left Content - Typography */}
          <div className="md:col-span-8 space-y-8 animate-fade-up">
            <span className="inline-block text-tertiary font-sans text-sm tracking-[0.3em] uppercase border-l-2 border-tertiary pl-4">
              A Motion-U Initiative
            </span>
            
            <h1 className="text-6xl md:text-8xl font-headline font-bold leading-tight tracking-tight text-on-surface">
              Master the <br/> 
              <span className="text-primary italic animate-glow-pulse">Art of Code</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-on-surface-variant font-light max-w-2xl leading-relaxed">
              A sanctuary for those who seek technical mastery through discipline, focus, and the guidance of the masters.
            </p>
          </div>

          {/* Right Content - The "Intake" Card */}
          <div className="md:col-span-4 flex justify-end animate-fade-up [animation-delay:0.2s]">
            <div className="border border-outline-variant/30 p-8 backdrop-blur-md bg-surface/60 hover:bg-surface/80 transition-all duration-500 hover:border-primary/40 max-w-xs group shadow-2xl">
              <h3 className="font-headline text-lg mb-4 text-primary">The Seasonal Intake</h3>
              <p className="text-sm text-outline mb-6 leading-relaxed">
                The Autumn cohort begins when the first leaf falls. Limited mats available.
              </p>
              <button className="w-full border border-outline py-3 text-primary font-sans text-xs tracking-widest hover:bg-primary/20 transition-all duration-300 uppercase hover:tracking-[0.3em] cursor-pointer">
                Secure Your Place
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Decorative Elements (The "Dojo Brackets") */}
      <div className="absolute bottom-12 left-12 w-20 h-20 border-t border-l border-primary/30 opacity-50 hidden lg:block"></div>
      <div className="absolute top-1/3 right-8 w-12 h-12 border-r border-b border-tertiary/30 hidden lg:block"></div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:block opacity-30">
        <div className="w-px h-24 bg-linear-to-b from-primary to-transparent"></div>
      </div>
    </section>
  );
}