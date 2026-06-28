import SigilScene from './components/SigilScene';
import ArcaneMusic from './components/ArcaneMusic';
import ArcaneFieldBackground from './components/ArcaneFieldBackground';
import BreadcrumbJsonLd from "@/app/components/BreadcrumbJsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Magic World of Code",
  description:
    "An arcane exploration into the magic world of code. Coming soon — a journey for Adepts seeking deeper understanding.",
  openGraph: {
    title: "Magic World of Code | codeDojo",
    description: "Arcane exploration into the deeper realms of programming.",
    url: "https://codedojo.motionukict.com/curriculum/magic-world-of-code",
  },
};

export default function Home() {
  return (
    <main className="relative bg-ink cursor-none">
      <BreadcrumbJsonLd
        items={[
          { position: 1, name: "Home", url: "https://codedojo.motionukict.com" },
          { position: 2, name: "Curriculum", url: "https://codedojo.motionukict.com/curriculum" },
          { position: 3, name: "Magic World of Code", url: "https://codedojo.motionukict.com/curriculum/magic-world-of-code" },
        ]}
      />
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
