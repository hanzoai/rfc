'use client';

import { useEffect, useState } from 'react';
import type { Heading } from '@/lib/toc';

/**
 * The on-this-page rail. Highlights whichever heading is currently on screen;
 * an IntersectionObserver does the tracking so there is no scroll handler.
 */
export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-80px 0px -80% 0px' },
    );

    for (const { id } of headings) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav className="rfc-toc" aria-label="On this page">
      <p className="rfc-small" style={{ fontWeight: 500, margin: '0 0 0.75rem' }}>
        On this page
      </p>
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          data-active={active === heading.id || undefined}
          style={{ marginInlineStart: `${(heading.depth - 2) * 0.75}rem` }}
        >
          {heading.title}
        </a>
      ))}
    </nav>
  );
}
