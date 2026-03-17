import type { Metadata } from "next";
import { Inter, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

// Configure Inter for sans-serif needs
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Configure Noto Serif JP for the Dojo aesthetic
const notoSerif = Noto_Serif_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Motion-U · codeDojo",
  description: "A sanctuary for developers to refine their craft through discipline and mentorship.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // We apply the font variables to the html tag so Tailwind v4 can pick them up
    <html lang="en" className={`${inter.variable} ${notoSerif.variable} scroll-smooth`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}