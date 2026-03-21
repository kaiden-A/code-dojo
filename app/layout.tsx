import type { Metadata, Viewport } from "next";
import { Inter, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

// Inter for body and technical UI elements
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Noto Serif JP for the "Dojo" headlines and traditional feel
const notoSerif = Noto_Serif_JP({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#131313",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Motion-U | codeDojo",
    template: "%s | codeDojo"
  },
  description: "Motion-U initiative. An immersive sanctuary for developers. Master data structures, system design, and clean code through the Shuhari philosophy.",
  keywords: ["Software Engineering", "Coding Bootcamp", "Shuhari", "Fullstack Development", "Code Mentorship" , "Motion-U Initiative"],
  authors: [{ name: "Motion-U" }],
  creator: "Motion-U",
  metadataBase: new URL("https://code-dojo-eight.vercel.app/"), // Replace with your actual domain
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codedojo.io",
    title: "Motion-U | codeDojo",
    description: "Refine your craft through discipline and mentorship in our digital sanctuary.",
    siteName: "codeDojo",
    images: [
      {
        url: "/icon.png", // Create a 1200x630 image for social sharing
        width: 1200,
        height: 630,
        alt: "codeDojo Immersive Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Motion-U | codeDojo",
    description: "The path to technical mastery starts here.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${notoSerif.variable} scroll-smooth dark`}
      suppressHydrationWarning
    >
      <head>
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" 
        />
      </head>
      <body 
        className="antialiased bg-background text-on-surface font-body selection:bg-primary selection:text-on-primary"
      >
        {/* The 'font-body' class uses the --font-sans (Inter) 
            defined in our Tailwind v4 @theme block.
        */}
        <div className="relative min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}