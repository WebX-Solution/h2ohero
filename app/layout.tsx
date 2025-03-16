import './globals.css';
import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import { Providers } from '@/lib/providers';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { CookieConsent } from '@/components/ui/cookie-consent';

const urbanist = Urbanist({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true
});

export const metadata: Metadata = {
  title: 'Bäderbetriebsleistungen Gersthofen - Professionelle Schwimmkurse & Beratung',
  description: 'Ihr Partner für Bäderbetriebsleistungen in Gersthofen. Von Schwimmkursen über Einzelstunden bis hin zu Coaching und Mentoring. Deutschlandweit verfügbar.',
  keywords: 'Bäderbetriebsleistungen, Schwimmkurse, Gersthofen, Einzelstunden, Coaching, Mentoring, Bäderbetrieb, Schwimmunterricht, Betriebsoptimierung',
  applicationName: 'H2oHero',
  authors: [{ name: 'H2oHero' }],
  creator: 'H2oHero',
  publisher: 'H2oHero',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#00A3FF',
  robots: 'index, follow',
  referrer: 'origin-when-cross-origin',
  metadataBase: new URL('https://baederbetrieb-gersthofen.de'),
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  appleWebApp: {
    capable: true,
    title: 'H2oHero',
    statusBarStyle: 'black-translucent',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://baederbetrieb-gersthofen.de',
    title: 'Bäderbetriebsleistungen Gersthofen - Professionelle Schwimmkurse & Beratung',
    description: 'Ihr Partner für Bäderbetriebsleistungen in Gersthofen. Deutschlandweit verfügbar mit spezialisierten Teams und individuellen Lösungen.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714',
        width: 1200,
        height: 630,
        alt: 'Bäderbetriebsleistungen Gersthofen',
      },
    ],
  },
};

const NoSSR = dynamic(() => Promise.resolve(({ children }: { children: ReactNode }) => <>{children}</>), {
  ssr: false
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon-192.png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className={urbanist.className}>
        <Providers>
          <NoSSR>
            <div suppressHydrationWarning>
              {children}
              <CookieConsent />
              <Analytics debug={process.env.NODE_ENV === 'development'} />
            </div>
          </NoSSR>
        </Providers>
      </body>
    </html>
  );
}