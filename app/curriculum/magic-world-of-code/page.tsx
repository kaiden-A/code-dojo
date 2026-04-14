import SigilScene from './components/SigilScene';
import ArcaneMusic from './components/ArcaneMusic';
import ArcaneFieldBackground from './components/ArcaneFieldBackground';

export default function Home() {
  return (

    <main className="relative bg-ink cursor-none">
      {/* 1. The Full-Page Background Field */}
      <ArcaneFieldBackground />
        <ArcaneMusic src="/bg-music.mp3" volume={0.3} />
      {/* 2. Your existing main component (UI, text, and the central main sigil) */}
      <div className="relative z-10">

        <SigilScene />
      </div>
    </main>
  )

}