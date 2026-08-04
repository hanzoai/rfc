'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { SearchProvider } from '@/components/search';
import type { RFCEntry } from '@/lib/source';
import config from '@/rfc.config';

/**
 * The one provider stack. `next-themes` owns the `.dark` class on <html> —
 * including the pre-paint script that avoids a flash — and search owns the
 * index that the static export bakes in.
 */
export function Providers({ index, children }: { index: RFCEntry[]; children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={config.theme.defaultTheme}
      storageKey={config.theme.storageKey}
      enableSystem
      disableTransitionOnChange
    >
      <SearchProvider index={index}>{children}</SearchProvider>
    </ThemeProvider>
  );
}
