export default function Hero() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 overflow-hidden" 
      data-purpose="hero"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="Japanese Dojo Interior" 
          className="w-full h-full object-cover opacity-20" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbCA343iGYzH2VNiiq6CYfb9erkMFbeeAgiwPnmhOH1R-nB1MofFZUC1NAUqnxGafWARW0GfDgBsQSbo5g4zZm05E8u1M4MDKz-MJT70Ot07koFhpPLxcHA1gzdUAd0w0XdeGsSts20HbK5rRxxkBBNJRAo5bPqTJHt7eCrUH8PH3YStkZF0o8CnDemY0UXKj3lzzB1KeEwGIPWzEkpvJHVkgGRYayVuPpOJcSDG71TU4nw7AVfx-AMSChUkf2AQhisrs7KXc0hhM" 
          loading="lazy" 
        />
        <div className="absolute inset-0 bg-linear-to-b from-parchment/0 via-parchment/50 to-parchment"></div>
      </div>

      {/* Main Content - Uses the v4 custom animation */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-soft-fade-up">
        <span className="inline-block px-3 sm:px-4 py-1 mb-4 sm:mb-6 border border-brand/50 text-brand font-semibold rounded-full text-[0.7rem] sm:text-xs tracking-widest uppercase">
          A motion-u initiative
        </span>
        
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-4 sm:mb-6 text-sumi leading-tight">
          Master the Art of <span className="text-brand whitespace-nowrap">Code</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-10 font-light leading-relaxed max-w-3xl mx-auto px-2">
          A sanctuary for developers to refine their craft through discipline, mentorship, and the pursuit of digital perfection.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
          <button className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-brand text-sumi font-bold rounded-eight hover:shadow-lg hover:shadow-brand/20 transition-all transform hover:-translate-y-1 text-sm sm:text-base cursor-pointer">
            Join the Dojo
          </button>
          <button className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 border border-wood/30 text-wood font-medium rounded-eight hover:bg-wood/5 transition-all text-sm sm:text-base cursor-pointer">
            Explore the Path
          </button>
        </div>
      </div>

      {/* Animated Scroll Indicator - Uses the v4 custom bounce animation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-scroll-bounce hidden sm:block">
        <div className="w-px h-16 bg-linear-to-b from-brand to-transparent"></div>
      </div>
    </section>
  );
}