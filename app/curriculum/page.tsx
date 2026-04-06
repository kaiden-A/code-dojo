import ScrollReveal from "./components/ScrollReveal";
import DojoBackground from "./components/DojoBackground";
import CurriculumCard from "./components/CurriculumCard";

export default function CurriculumPage() {
  return (
    <main className="relative min-h-screen pt-32 pb-20 px-6 md:px-12">
      <DojoBackground />

      <header className="relative z-10 max-w-7xl mx-auto mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl animate-fade-up">
            <span className="text-tertiary font-label tracking-[0.3em] uppercase text-xs mb-4 block">
              The Path of Mastery
            </span>
            <h1 className="text-5xl md:text-7xl font-headline text-on-surface mb-6 leading-tight tracking-tight">
              The Curriculum of <br/><span className="text-primary italic">Digital Carpentry</span>
            </h1>
            <p className="text-outline max-w-lg text-lg leading-relaxed">
              We move beyond syntax. We learn to join systems with the precision of Sashimono, where every line serves a structural purpose.
            </p>
          </div>
        </div>
      </header>

      <section className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        <ScrollReveal delay={100}>
          <CurriculumCard 
            id="01"
            link="how-website-work"
            title="Behind the Scenes of a Websites"
            description="Many developers learn frontend or backend separately, but real understanding comes from seeing how everything connects."
            level="Initiate"
            status="active"
          />
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <CurriculumCard 
            id="02"
            link="how-to-know"
            title="How to Know What to Know"
            description="Sometimes I feel like i want to build everything in the world...but how?"
            level="Initiate"
            status="active"
          />
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <CurriculumCard 
            id="03"
            title="Coming Soon..."
            description="Coming soon..."
            level="Adept"
            status="locked"
          />
        </ScrollReveal>

      </section>
    </main>
  );
}