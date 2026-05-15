import BackendScene from './components/BackendScene';
import ServerFieldBackground from './components/ServerFieldBackground';
import SectionNav from './components/SectionNav';

export default function BackendAndRestPage() {
  return (
    <main className="relative bg-ink cursor-none">
      {/* 1. The Full-Page Background Field */}
      <ServerFieldBackground />
      {/* 2. Main content — UI, text, and the central sigil */}
      <div className="relative z-10">
        <SectionNav />
        <BackendScene />
      </div>
    </main>
  );
}
