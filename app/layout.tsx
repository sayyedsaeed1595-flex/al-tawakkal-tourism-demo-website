import type { Metadata, Viewport } from 'next';

import { DemoStoreProvider } from '@/lib/demo-store';
import { contactConfig, siteConfig } from '@/lib/config';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    absolute: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.shortDescription,
  applicationName: siteConfig.name,
  keywords: [
    'Umrah packages',
    'Umrah tourism',
    'Makkah hotel',
    'Madinah hotel',
    'Ziyarat',
    'Islamic tourism',
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.shortDescription,
    locale: siteConfig.locale,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.shortDescription,
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: ['/favicon.svg'],
    apple: [{ url: '/icon.svg' }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#1B1A17',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: siteConfig.name,
    description: siteConfig.shortDescription,
    url: siteConfig.url,
    telephone: contactConfig.phone,
    email: contactConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${contactConfig.addressLine1}, ${contactConfig.addressLine2}`,
      addressLocality: contactConfig.addressCity,
      addressCountry: contactConfig.addressCountry,
    },
    areaServed: ['Makkah', 'Madinah'],
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://wa.me" />
        {/*
          Marks the document as script-enabled before first paint so the scroll
          reveal styles only hide content when JavaScript can bring it back.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-ivory">
        <DemoStoreProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-charcoal focus:px-4 focus:py-2 focus:text-sm focus:text-ivory"
          >
            Skip to main content
          </a>
          <div className="flex min-h-screen flex-col">{children}</div>
        </DemoStoreProvider>
      </body>
    </html>
  );
}
