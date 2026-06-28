import DeploymentScene from './components/DeploymentScene';
import DeploymentBackground from './components/DeploymentBackground';
import SectionNav from './components/SectionNav';
import BreadcrumbJsonLd from "@/app/components/BreadcrumbJsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vue.js to Production — Deployment",
  description:
    "From localhost to live. Deploy your Vue.js frontend on Vercel with your Express backend on Render, wire them with CORS, and master environment variables.",
  openGraph: {
    title: "Vue.js to Production | codeDojo",
    description: "Deploy a Vue.js frontend and Express backend. CORS, environment variables, and production readiness.",
    url: "https://codedojo.motionukict.com/curriculum/deployment",
  },
};

export default function DeploymentPage() {
  return (
    <main className="relative bg-ink cursor-none">
      <BreadcrumbJsonLd
        items={[
          { position: 1, name: "Home", url: "https://codedojo.motionukict.com" },
          { position: 2, name: "Curriculum", url: "https://codedojo.motionukict.com/curriculum" },
          { position: 3, name: "Vue.js to Production", url: "https://codedojo.motionukict.com/curriculum/deployment" },
        ]}
      />
      <DeploymentBackground />
      <div className="relative z-10">
        <SectionNav />
        <DeploymentScene />
      </div>
    </main>
  );
}
