import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/app/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Land of Frameworks — Vue.js",
  description:
    "Explore Vue.js, the progressive JavaScript framework. Learn declarative rendering, component architecture, and reactive state management.",
  openGraph: {
    title: "Land of Frameworks — Vue.js | codeDojo",
    description: "Learn Vue.js fundamentals: declarative rendering, components, reactivity. Framework Focus.",
    url: "https://codedojo.motionukict.com/curriculum/land-of-frameworks",
  },
};

export default function LandOfFrameworksLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { position: 1, name: "Home", url: "https://codedojo.motionukict.com" },
          { position: 2, name: "Curriculum", url: "https://codedojo.motionukict.com/curriculum" },
          { position: 3, name: "Land of Frameworks — Vue.js", url: "https://codedojo.motionukict.com/curriculum/land-of-frameworks" },
        ]}
      />
      {children}
    </>
  );
}
