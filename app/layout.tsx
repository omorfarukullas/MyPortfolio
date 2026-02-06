import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import LayoutClient from "./components/LayoutClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const siteUrl = "https://omorfarukullas.vercel.app"; // Update with your actual domain

export const metadata: Metadata = {
  title: "Omor Faruk Ullas | Full Stack Developer & CSE Student",
  description: "Computer Science student at UIU passionate about building innovative solutions. Specializing in Full Stack Development with React, Node.js, and TypeScript. Currently developing MediconnectBD healthcare system.",
  keywords: [
    "Omor Faruk Ullas",
    "Full Stack Developer",
    "React Developer",
    "Node.js",
    "TypeScript",
    "CSE Student",
    "UIU",
    "MediconnectBD",
    "Bangladesh Developer",
    "Football Analyst",
    "Web Developer",
    "Software Engineer",
  ],
  authors: [{ name: "Omor Faruk Ullas" }],
  creator: "Omor Faruk Ullas",
  publisher: "Omor Faruk Ullas",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Omor Faruk Ullas Portfolio",
    title: "Omor Faruk Ullas - Full Stack Developer",
    description: "Computer Science student at UIU passionate about building innovative solutions. Specializing in Full Stack Development with React, Node.js, and TypeScript. Currently developing MediconnectBD healthcare system.",
    images: [
      {
        url: "/og-image.png", // You'll need to create this 1200x630 image
        width: 1200,
        height: 630,
        alt: "Omor Faruk Ullas - Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Omor Faruk Ullas - Full Stack Developer",
    description: "Computer Science student at UIU passionate about building innovative solutions. Specializing in Full Stack Development with React, Node.js, and TypeScript.",
    images: ["/og-image.png"],
    creator: "@omorfarukullas", // Update with your Twitter handle if you have one
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add when you set up Google Search Console
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Favicons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('ServiceWorker registration successful');
                    },
                    function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />

        {/* JSON-LD Structured Data for Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Omor Faruk Ullas",
              jobTitle: "Full Stack Developer",
              description: "Computer Science student at UIU passionate about building innovative solutions",
              url: siteUrl,
              image: `${siteUrl}/og-image.png`,
              sameAs: [
                "https://github.com/omorfarukullas", // Update with your actual profiles
                "https://linkedin.com/in/omorfarukullas",
                "https://twitter.com/omorfarukullas",
              ],
              knowsAbout: [
                "React",
                "Node.js",
                "TypeScript",
                "JavaScript",
                "Full Stack Development",
                "Web Development",
                "MediconnectBD",
              ],
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "United International University",
                sameAs: "https://www.uiu.ac.bd/",
              },
              nationality: {
                "@type": "Country",
                name: "Bangladesh",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
