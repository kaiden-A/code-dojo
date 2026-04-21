import type { Metadata, Viewport } from "next";
import { Inter, Noto_Serif_JP } from "next/font/google";
import "./globals.css";
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

const BASE_URL = "https://codedojo.motionukict.com";
const OG_IMAGE = `${BASE_URL}/og-image.png`;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#131313" },
    { media: "(prefers-color-scheme: light)", color: "#131313" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "codeDojo | Motion-U",
    template: "%s | codeDojo",
  },
  description:
    "An immersive sanctuary for developers. Master data structures, algorithms, system design, and clean code through the Shuhari philosophy. Refine your craft through discipline and mentorship.",
  keywords: [
    "coding practice",
    "data structures",
    "algorithms",
    "system design",
    "clean code",
    "Shuhari philosophy",
    "developer mentorship",
    "coding dojo",
    "software engineering",
    "Motion-U",
    "programming exercises",
    "code mastery",
  ],

  authors: [{ name: "Motion-U", url: "https://motionukict.com" }],
  creator: "Motion-U",
  publisher: "Motion-U",
  category: "Education",

  alternates: {
    canonical: BASE_URL,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "codeDojo | Motion-U",
    description:
      "An immersive sanctuary for developers. Master data structures, system design, and clean code through the Shuhari philosophy.",
    siteName: "codeDojo",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "codeDojo — Immersive developer sanctuary by Motion-U",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "codeDojo | Motion-U",
    description:
      "Master data structures, system design & clean code through the Shuhari philosophy.",
    site: "@motionukict",     // ← replace with your handle
    creator: "@motionukict",  // ← replace with your handle
    images: [OG_IMAGE],
  },

  verification: {
    google: "REPLACE_WITH_YOUR_GOOGLE_VERIFICATION_TOKEN",
  },

  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  applicationName: "codeDojo",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${BASE_URL}/#organization`,
      name: "codeDojo by Motion-U",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` },
      parentOrganization: {
        "@type": "Organization",
        name: "Motion-U",
        url: "https://motionukict.com",
      },
      sameAs: [
        // "https://twitter.com/motionukict",
        // "https://github.com/motionukict",
      ],
    },
    {
      "@type": "Course",
      "@id": `${BASE_URL}/#course`,
      name: "codeDojo — Developer Mastery Program",
      description:
        "Master data structures, algorithms, system design, and clean code through the Shuhari philosophy of learning.",
      url: BASE_URL,
      provider: { "@id": `${BASE_URL}/#organization` },
      educationalLevel: "Intermediate to Advanced",
      teaches: [
        "Data Structures",
        "Algorithms",
        "System Design",
        "Clean Code",
        "Software Engineering",
      ],
      inLanguage: "en",
      courseMode: "online",
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "codeDojo",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
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
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Preconnect for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Material Symbols */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />

        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>

      <body className="antialiased bg-surface text-on-surface font-body selection:bg-primary-container selection:text-primary">
        <Header />
        <div className="relative min-h-screen flex flex-col">
          <main className="grow">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}