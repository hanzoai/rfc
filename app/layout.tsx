import './global.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import { Providers } from './providers';
import { source } from '@/lib/source';
import config from '@/rfc.config';

// Geist is the Hanzo identity's typeface; `@hanzo/ui/theme.css` resolves its
// own --font-geist-* variables to whatever these bind, so nothing downstream
// names a family.
const sans = Geist({ subsets: ['latin'], variable: '--font-sans-provided', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono-provided', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: config.title,
    template: `%s | ${config.name}`,
  },
  description: config.description,
  keywords: [config.shortName, 'proposals', 'standards', 'documentation'],
  authors: [{ name: config.name }],
  metadataBase: new URL(config.baseUrl),
  openGraph: {
    title: config.title,
    description: config.description,
    type: 'website',
    siteName: config.name,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: config.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: config.title,
    description: config.description,
    images: ['/twitter.png'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <Providers index={source.getIndex()}>{children}</Providers>
      </body>
    </html>
  );
}
