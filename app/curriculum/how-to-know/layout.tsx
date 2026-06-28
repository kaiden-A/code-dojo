import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/app/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "How to Know What to Know",
  description:
    "A vertical descent into the disciplines of code. Beyond tools, toward the spirit of engineering — the Digital Carpenter's Oath. Five stages of mastery.",
  openGraph: {
    title: "How to Know What to Know | codeDojo",
    description: "The five stages of learning: Confusion, Curiosity, Learning, Application, Teaching.",
    url: "https://codedojo.motionukict.com/curriculum/how-to-know",
  },
};

export default function HowToKnowLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { position: 1, name: "Home", url: "https://codedojo.motionukict.com" },
          { position: 2, name: "Curriculum", url: "https://codedojo.motionukict.com/curriculum" },
          { position: 3, name: "How to Know What to Know", url: "https://codedojo.motionukict.com/curriculum/how-to-know" },
        ]}
      />
      {children}
    </>
  );
}
