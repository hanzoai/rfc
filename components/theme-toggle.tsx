'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Before hydration the resolved theme is unknown; render the same button
  // shape so the header does not reflow when it arrives.
  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <button
      type="button"
      className="rfc-icon-btn"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
