import BackendScene from './components/BackendScene';
import ServerFieldBackground from './components/ServerFieldBackground';
import SectionNav from './components/SectionNav';
import BreadcrumbJsonLd from "@/app/components/BreadcrumbJsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Architecture of Requests — Backend & REST",
  description:
    "Learn how servers breathe, how REST APIs speak, and how to build the invisible half of every application. Every click hides a conversation.",
  openGraph: {
    title: "The Architecture of Requests | codeDojo",
    description: "Server architecture, REST APIs, and the lifecycle of a network request.",
    url: "https://codedojo.motionukict.com/curriculum/backend-and-rest",
  },
};

export default function BackendAndRestPage() {
  return (
    <main className="relative bg-ink cursor-none">
      <BreadcrumbJsonLd
        items={[
          { position: 1, name: "Home", url: "https://codedojo.motionukict.com" },
          { position: 2, name: "Curriculum", url: "https://codedojo.motionukict.com/curriculum" },
          { position: 3, name: "The Architecture of Requests", url: "https://codedojo.motionukict.com/curriculum/backend-and-rest" },
        ]}
      />
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
