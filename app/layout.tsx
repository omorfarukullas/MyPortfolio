import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './components/ThemeProvider';
import { generatePersonSchema, generateWebSiteSchema } from '@/lib/seo';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const siteUrl = 'https://omorfarukullas.vercel.app';

export const metadata: Metadata = {
  title: {
    default: 'Omor Faruk Ullas | Full Stack Developer & CSE Student',
    template: '%s | Omor Faruk Ullas',
  },
  description:
    'Computer Science student at United International University, passionate about building innovative solutions. Specializing in Full Stack Development with React, Node.js, and TypeScript.',
  keywords: [
    'Omor Faruk Ullas', 'Full Stack Developer', 'React Developer',
    'Node.js', 'TypeScript', 'CSE Student', 'UIU', 'MediconnectBD',
    'Bangladesh Developer', 'Web Developer', 'Software Engineer',
  ],
  authors: [{ name: 'Omor Faruk Ullas' }],
  creator: 'Omor Faruk Ullas',
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Omor Faruk Ullas Portfolio',
    title: 'Omor Faruk Ullas — Full Stack Developer',
    description: 'CSE student at UIU building innovative full-stack solutions.',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: 'Omor Faruk Ullas Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Omor Faruk Ullas — Full Stack Developer',
    description: 'CSE student at UIU building innovative full-stack solutions.',
    images: ['/images/og-image.png'],
    creator: '@omorfarukullas',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||((window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />

        {/* JSON-LD Schemas */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generatePersonSchema()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebSiteSchema()) }} />

        {/* PWA */}
        <meta name="theme-color" content="#7c6ee6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${inter.variable} ${plusJakarta.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
