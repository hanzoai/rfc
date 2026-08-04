'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Hash, Layers, Search as SearchIcon } from 'lucide-react';
import { Command } from '@hanzo/ui/primitives/Command';
import { CommandDialog } from '@hanzo/ui/primitives/CommandDialog';
import { CommandEmpty } from '@hanzo/ui/primitives/CommandEmpty';
import { CommandGroup } from '@hanzo/ui/primitives/CommandGroup';
import { CommandInput } from '@hanzo/ui/primitives/CommandInput';
import { CommandItem } from '@hanzo/ui/primitives/CommandItem';
import { CommandList } from '@hanzo/ui/primitives/CommandList';
import type { RFCEntry } from '@/lib/source';
import config from '@/rfc.config';

/**
 * Search, whole.
 *
 * The site is a static export, so there is nothing to query: the index is built
 * during `next build` and handed in as a prop.
 *
 * The palette itself is `Command` from @hanzo/ui — the modal, the cursor, the
 * arrow-key traversal, the wrap-around, the empty state. It is gui-native (no
 * cmdk), so it is the same palette on web, native and desktop, and it was
 * already the answer to "how does a Hanzo surface do a command palette".
 *
 * What stays local is the part that is about proposals: which rows exist and
 * where each one goes. `shouldFilter={false}` is deliberate — Command keeps
 * filtered-out items MOUNTED, which is the right trade at menu scale and the
 * wrong one for an index of hundreds of proposals, so matching stays a capped
 * substring scan and Command is left to own the interaction.
 */

interface Row {
  key: string;
  title: string;
  detail: string;
  icon: ReactNode;
  href: string;
}

const SearchContext = createContext<(() => void) | null>(null);

/** The button that opens search. Reads the opener from context. */
export function SearchTrigger() {
  const open = useContext(SearchContext);
  if (!open) return null;

  return (
    <button type="button" className="rfc-search-trigger" onClick={open}>
      <SearchIcon size={16} />
      <span style={{ flex: 1 }}>Search {config.shortName}s…</span>
      <kbd className="rfc-kbd">⌘K</kbd>
    </button>
  );
}

export function SearchProvider({ index, children }: { index: RFCEntry[]; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const show = useCallback(() => {
    setQuery('');
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((wasOpen) => !wasOpen);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Jumping to a category is as much "search" as finding a proposal is, so the
  // categories are rows in the same list rather than a separate menu.
  const categories = useMemo<Row[]>(
    () =>
      config.categories.map((cat) => ({
        key: `category:${cat.slug}`,
        title: cat.name,
        detail: `${config.shortName}-${cat.range[0]} to ${config.shortName}-${cat.range[1]} · ${cat.shortDesc}`,
        icon: <Layers size={16} />,
        href: `/docs/category/${cat.slug}`,
      })),
    [],
  );

  const needle = query.trim().toLowerCase();

  const rows = useMemo<Row[]>(() => {
    if (needle.length < 2) return categories;

    const proposals = index
      .filter((entry) => entry.haystack.includes(needle))
      .slice(0, 20)
      .map<Row>((entry) => ({
        key: entry.url,
        title: `${entry.label}: ${entry.title}`,
        detail: entry.description || (entry.status ?? ''),
        icon: <Hash size={16} />,
        href: entry.url,
      }));

    return [...proposals, ...categories.filter((c) => c.title.toLowerCase().includes(needle))];
  }, [needle, index, categories]);

  const choose = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <SearchContext.Provider value={show}>
      {children}
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title={`Search ${config.name}`}
        description={`Find a ${config.shortName} or jump to a category`}
      >
        <Command shouldFilter={false} loop>
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder={`Search ${config.name}…`}
          />
          <CommandList>
            <CommandEmpty>No proposals match “{query}”.</CommandEmpty>
            <CommandGroup heading={needle.length >= 2 ? `${rows.length} results` : 'Jump to'}>
              {rows.map((row) => (
                <CommandItem key={row.key} value={row.key} onSelect={() => choose(row.href)}>
                  <span className="rfc-tile" data-size="sm">
                    {row.icon}
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span className="rfc-truncate" style={{ display: 'block', fontWeight: 500 }}>
                      {row.title}
                    </span>
                    <span className="rfc-truncate rfc-small rfc-muted" style={{ display: 'block' }}>
                      {row.detail}
                    </span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </SearchContext.Provider>
  );
}
