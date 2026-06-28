import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/app/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Behind the Scenes of a Website",
  description:
    "Witness the lifecycle of a web request as it physically traverses the Dojo infrastructure. From client to server to database and back.",
  openGraph: {
    title: "Behind the Scenes of a Website | codeDojo",
    description: "Follow a data packet from client through server to database. Digital Forge — the request lifecycle.",
    url: "https://codedojo.motionukict.com/curriculum/how-website-work",
  },
};

export default function HowWebsiteWorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { position: 1, name: "Home", url: "https://codedojo.motionukict.com" },
          { position: 2, name: "Curriculum", url: "https://codedojo.motionukict.com/curriculum" },
          { position: 3, name: "Behind the Scenes of a Website", url: "https://codedojo.motionukict.com/curriculum/how-website-work" },
        ]}
      />
      {children}
    </>
  );
}
