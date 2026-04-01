import type { Metadata, Viewport } from "next";
import { Inter, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

// Import your custom components
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const notoSerif = Noto_Serif_JP({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-headline",
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
  metadataBase: new URL("https://codedojo.motionukict.com/"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codedojo.motionukict.com/",
    title: "Motion-U | codeDojo",
    description: "Refine your craft through discipline and mentorship in our digital sanctuary.",
    siteName: "codeDojo",
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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

      </head>

      <body className="antialiased bg-surface text-on-surface font-body selection:bg-primary-container selection:text-primary">
        
        {/* The Header is now global across all pages */}
        <Header />

        <div className="relative min-h-screen flex flex-col">
          {/* Main content injected here */}
          <main className="grow">
            {children}
          </main>
        </div>

        {/* The Footer is now global across all pages */}
        <Footer />

      </body>
    </html>
  );
}