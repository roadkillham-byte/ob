import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Literata } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { site } from '@/content/site';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

const literata = Literata({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-literata',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: site.url,
    title: site.title,
    description: site.description,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: [site.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: '#ededf1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${literata.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
