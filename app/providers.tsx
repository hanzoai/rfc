'use client';

import type { ReactNode } from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import { GuiProvider, Theme } from '@hanzo/gui';
import { config as gui } from '@hanzo/ui/gui-config';
import { SearchProvider } from '@/components/search';
import type { RFCEntry } from '@/lib/source';
import config from '@/rfc.config';

/**
 * The one provider stack.
 *
 * `GuiProvider` carries the @hanzo/gui scale — the same type, radius and space
 * ladders every Hanzo surface renders on — so an `@hanzo/ui` component here is
 * sized by the shared config rather than by this site's opinion. It does not
 * inject CSS: the tokens already arrive through `@hanzo/ui/theme.css`, and two
 * token sources would be two sources of truth.
 *
 * `next-themes` owns the `.dark` class on <html>, including the pre-paint
 * script that avoids a flash, and search owns the index the static export bakes
 * in.
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
      <GuiProvider config={gui} defaultTheme={config.theme.defaultTheme}>
        <FollowTheme>
          <SearchProvider index={index}>{children}</SearchProvider>
        </FollowTheme>
      </GuiProvider>
    </ThemeProvider>
  );
}

/**
 * gui resolves `$color…` through its own theme, which knows nothing about the
 * `.dark` class next-themes writes. Left alone the two drift: the stylesheet
 * goes dark and every gui component stays light. One switch drives both.
 */
function FollowTheme({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  return <Theme name={resolvedTheme === 'dark' ? 'dark' : 'light'}>{children}</Theme>;
}
