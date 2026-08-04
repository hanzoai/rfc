'use client';

import type { ReactNode } from 'react';
import { Theme } from '@hanzo/gui';
import { useThemeSetting } from '@hanzogui/next-theme';

/**
 * The gui theme for controls sitting on a surface that inverts the page.
 *
 * `.rfc-cta` paints itself `--foreground` on `--background`, so it is always the
 * opposite of the page around it. Its own CSS tokens flip with the page; gui
 * components do not, because they resolve `$color…` through the gui theme, which
 * is still the page's. Measured, without this: a solid Button on the CTA came
 * out `rgb(5,5,5)` on an `oklch(0.145)` panel — a black button on a black card.
 *
 * Wraps the CONTROLS, not the panel. `--background` is the one token gui also
 * owns, so an inverted theme around the whole panel flips it for the panel's own
 * `color: var(--background)` too, and the heading disappears into the card —
 * traded one invisible element for another. The panel keeps its CSS; only the
 * things that read the gui theme get the inverted gui theme.
 *
 * `<Theme inverse>` is NOT this. gui 8's `ThemeProps` is
 * `{className, name, componentName, children, reset, debug, forceClassName,
 * shallow}` — there is no `inverse`, so that prop type-checks, renders, and
 * inverts nothing. The theme has to be named.
 */
export function Inverted({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useThemeSetting();

  return <Theme name={resolvedTheme === 'dark' ? 'light' : 'dark'}>{children}</Theme>;
}
