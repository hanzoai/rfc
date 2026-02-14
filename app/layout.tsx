import './global.css';
import { RootProvider } from '@hanzo/radix/provider/base';
import { NextProvider } from '@hanzo/docs/framework/next';
import { Inter, Roboto_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import { SearchDialog } from '@/components/search-dialog';
import config from '@/rfc.config';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

export const metadata = {
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
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: config.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: config.title,
    description: config.description,
    images: ['/twitter.png'],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Prevent flash - respect system preference or stored preference */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem('${config.theme.storageKey}');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (stored === 'dark' || (stored !== 'light' && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-svh bg-background font-sans antialiased">
        <NextProvider>
          <RootProvider
            search={{
              enabled: false,
            }}
            theme={{
              enabled: true,
              defaultTheme: config.theme.defaultTheme,
              storageKey: config.theme.storageKey,
            }}
          >
            <SearchDialog />
            <div className="relative flex min-h-svh flex-col bg-background">
              {children}
            </div>
          </RootProvider>
        </NextProvider>
      </body>
    </html>
  );
}
