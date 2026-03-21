import Image from 'next/image';

export default function Hero() {
  return (
    <section 
      className="relative min-h-dvh flex items-center justify-center pt-20 md:pt-24 overflow-hidden bg-background" 
      data-purpose="hero"
    >
      {/* Background Layer with Slow Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image 
          alt="Dojo Interior" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZfnHwL11NmP98xuJRz7XqAyna4nOmuc2cMaI0dGA35dndC4LpoRj9Qu9yq9YF4C0ZGMaxAGdVOnB5VvJUazXeNoIxDnddHAsYj2MJth8nUnhlsEcgMZlxW3TXBw37loAnAJ3GnVO9QxMhR9KdVY_0axKwHk1MFfHJ9oxsn-3Yx8M3AnUcI-RpWYuJaMdST6pUAKjzYUzwCVS7MLBhQcSgT6p06zvR0FWluXvBeqNsiIlIZOq-XnJdgM9u2MgBtr_xlZm-s8qoLkc" 
          fill
          priority
          className="object-cover opacity-30 md:opacity-40 animate-slow-zoom"
        />
        {/* Using bg-linear-to-t for v4 compatibility */}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 md:via-background/60 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full py-12 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center md:items-end">
          
          {/* Left Content - Typography */}
          <div className="md:col-span-8 space-y-6 md:space-y-8 animate-fade-up">
            <span className="inline-block text-tertiary font-sans text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase border-l-2 border-tertiary pl-4">
              A Motion-U Initiative
            </span>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-headline font-bold leading-[1.1] tracking-tight text-on-surface">
              Master the <br className="hidden sm:block" /> 
              <span className="text-primary italic animate-glow-pulse">Art of Code</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-on-surface-variant font-light max-w-2xl leading-relaxed">
              A sanctuary for those who seek technical mastery through discipline, focus, and the guidance of the masters.
            </p>
          </div>

          {/* Right Content - The "Intake" Card */}
          <div className="md:col-span-4 flex justify-start md:justify-end animate-fade-up [animation-delay:0.2s]">
            <div className="w-full md:max-w-xs border border-outline-variant/30 p-6 md:p-8 backdrop-blur-md bg-surface/40 md:bg-surface/60 hover:bg-surface/80 transition-all duration-500 hover:border-primary/40 group shadow-2xl">
              <h3 className="font-headline text-lg mb-3 md:mb-4 text-primary">The Seasonal Intake</h3>
              <p className="text-xs md:text-sm text-on-surface-variant mb-6 leading-relaxed">
                The Autumn cohort begins when the first leaf falls. Limited mats available for the dedicated.
              </p>
              <button className="w-full border border-outline py-3 text-primary font-sans text-[10px] md:text-xs tracking-widest hover:bg-primary/20 transition-all duration-300 uppercase hover:tracking-[0.3em] cursor-pointer active:scale-95">
                Secure Your Place
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Decorative Elements - Hidden on smaller mobile for clarity */}
      <div className="absolute bottom-12 left-12 w-16 h-16 border-t border-l border-primary/30 opacity-30 hidden md:block"></div>
      <div className="absolute top-1/4 right-8 w-10 h-10 border-r border-b border-tertiary/30 opacity-30 hidden md:block"></div>
      
      {/* Scroll Indicator - Hidden on small mobile to avoid overlapping with card */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:block opacity-20">
        <div className="w-px h-16 bg-linear-to-b from-primary to-transparent"></div>
      </div>
    </section>
  );
}