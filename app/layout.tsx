import './global.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Providers } from './providers';
import { source } from '@/lib/source';
import config from '@/rfc.config';

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers index={source.getIndex()}>{children}</Providers>
      </body>
    </html>
  );
}
