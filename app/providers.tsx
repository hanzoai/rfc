'use client';

import type { ReactNode } from 'react';
import { NextThemeProvider, useThemeSetting } from '@hanzogui/next-theme';
import { GuiProvider } from '@hanzo/gui';
import { config as gui } from '@hanzo/ui/gui-config';
import { SearchProvider } from '@/components/search';
import type { RFCEntry } from '@/lib/source';
import config from '@/rfc.config';

/**
 * The one provider stack, and — the point of this file — the one light/dark
 * switch.
 *
 * There are two token sources on the page and they read different classes:
 * `@hanzo/ui/theme.css` keys the Hanzo identity off `.dark`, while gui resolves
 * `$color…` through its own root theme class, `t_light`/`t_dark`. Drive one and
 * the other silently stays behind — measured, in exactly that state: dark mode
 * gave `--foreground: oklch(0.985)` (near-white text) over `--background:
 * hsla(0,0%,97%)` (a near-white page).
 *
 * So both classes get written, by one state, on one user action:
 *
 *   `.dark`   ← NextThemeProvider, via the `value` map below
 *   `.t_dark` ← GuiProvider, from `defaultTheme`
 *
 * Neither writer touches the other's class, and `resolvedTheme` is the single
 * value both read. `NextThemeProvider` is next-themes — gui ships its own copy,
 * same API and same pre-paint script — so this is one theme library, not two.
 */
export function Providers({ index, children }: { index: RFCEntry[]; children: ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme={config.theme.defaultTheme}
      storageKey={config.theme.storageKey}
      enableSystem
      disableTransitionOnChange
      // Left at its default this maps light/dark to `t_light`/`t_dark` — gui's
      // class, which GuiProvider already writes. That is two writers for one
      // class, and nobody writing the `.dark` that theme.css actually reads.
      value={{ light: 'light', dark: 'dark' }}
    >
      <Gui>
        <SearchProvider index={index}>{children}</SearchProvider>
      </Gui>
    </NextThemeProvider>
  );
}

/**
 * Separate component because `useThemeSetting` reads the context the provider
 * above creates. `defaultTheme` is a gui theme name, never `'system'`: gui has
 * no theme by that name, and asking for one wrote a `t_system` class that
 * nothing in the injected theme CSS matches. "system" is a *preference*, which
 * `resolvedTheme` has already resolved by the time it gets here.
 */
function Gui({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useThemeSetting();

  return (
    <GuiProvider config={gui} defaultTheme={resolvedTheme === 'dark' ? 'dark' : 'light'}>
      {children}
    </GuiProvider>
  );
}
