'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useThemeSetting } from '@hanzogui/next-theme';
import { Button } from '@hanzo/ui/primitives/Button';

export function ThemeToggle() {
  const { resolvedTheme, set } = useThemeSetting();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Before hydration the resolved theme is unknown; render the same button
  // shape so the header does not reflow when it arrives.
  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onPress={() => set(isDark ? 'light' : 'dark')}
    >
      {isDark ? <Moon size={18} /> : <Sun size={18} />}
    </Button>
  );
}
