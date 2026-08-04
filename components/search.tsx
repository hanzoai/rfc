'use client';

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Hash, Layers, Search as SearchIcon } from 'lucide-react';
import type { SearchEntry } from '@/lib/source';
import config from '@/rfc.config';

/**
 * Search, whole.
 *
 * The site is a static export, so there is nothing to query: the index is built
 * during `next build` and handed in as a prop. Matching is a substring scan —
 * for a few hundred proposals that is instant and needs no engine.
 *
 * The dialog is the platform's own `<dialog>` element. It gives modality, focus
 * trapping, the backdrop and Escape-to-close for free, which is the entire
 * reason a component library was here before.
 */

interface Command {
  key: string;
  title: string;
  detail: string;
  icon: ReactNode;
  run: () => void;
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

export function SearchProvider({ index, children }: { index: SearchEntry[]; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const router = useRouter();

  const open = useCallback(() => {
    setQuery('');
    setCursor(0);
    dialog.current?.showModal();
  }, []);

  const close = useCallback(() => dialog.current?.close(), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (dialog.current?.open) close();
        else open();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  // Jumping to a category is as much "search" as finding a proposal is, so the
  // categories are commands in the same list rather than a separate menu.
  const commands = useMemo<Command[]>(
    () =>
      config.categories.map((cat) => ({
        key: `category:${cat.slug}`,
        title: cat.name,
        detail: `${config.shortName}-${cat.range[0]} to ${config.shortName}-${cat.range[1]} · ${cat.shortDesc}`,
        icon: <Layers size={16} />,
        run: () => router.push(`/docs/category/${cat.slug}`),
      })),
    [router],
  );

  const needle = query.trim().toLowerCase();

  const matches = useMemo<Command[]>(() => {
    if (needle.length < 2) return commands;

    const proposals = index
      .filter((entry) => entry.haystack.includes(needle))
      .slice(0, 20)
      .map<Command>((entry) => ({
        key: entry.url,
        title: `${entry.label}: ${entry.title}`,
        detail: entry.description || (entry.status ?? ''),
        icon: <Hash size={16} />,
        run: () => router.push(entry.url),
      }));

    const named = commands.filter((c) => c.title.toLowerCase().includes(needle));
    return [...proposals, ...named];
  }, [needle, index, commands, router]);

  const choose = (command: Command) => {
    close();
    command.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!matches.length) return;
      const step = e.key === 'ArrowDown' ? 1 : matches.length - 1;
      setCursor((c) => (c + step) % matches.length);
    } else if (e.key === 'Enter' && matches[cursor]) {
      e.preventDefault();
      choose(matches[cursor]);
    }
  };

  return (
    <SearchContext.Provider value={open}>
      {children}
      <dialog ref={dialog} className="rfc-dialog" aria-label="Search" onKeyDown={onKeyDown}>
        <div className="rfc-search-field">
          <SearchIcon size={18} />
          <input
            autoFocus
            value={query}
            placeholder={`Search ${config.name}…`}
            aria-label="Search query"
            onChange={(e) => {
              setQuery(e.target.value);
              setCursor(0);
            }}
          />
          <kbd className="rfc-kbd">ESC</kbd>
        </div>

        <ul className="rfc-search-results">
          <li className="rfc-search-heading">
            {needle.length >= 2 ? `${matches.length} results` : 'Jump to'}
          </li>
          {matches.map((command, i) => (
            <li key={command.key}>
              <button
                type="button"
                className="rfc-search-item"
                data-active={i === cursor || undefined}
                onMouseEnter={() => setCursor(i)}
                onClick={() => choose(command)}
              >
                <span className="rfc-tile" data-size="sm">
                  {command.icon}
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span className="rfc-truncate" style={{ display: 'block', fontWeight: 500 }}>
                    {command.title}
                  </span>
                  <span className="rfc-truncate rfc-small rfc-muted" style={{ display: 'block' }}>
                    {command.detail}
                  </span>
                </span>
                <ArrowRight size={16} className="rfc-muted" />
              </button>
            </li>
          ))}
          {matches.length === 0 && (
            <li className="rfc-search-empty">No proposals match “{query}”.</li>
          )}
        </ul>

        <div className="rfc-search-foot">
          <span>
            <kbd className="rfc-kbd">↑</kbd> <kbd className="rfc-kbd">↓</kbd> navigate
          </span>
          <span>
            <kbd className="rfc-kbd">Enter</kbd> open
          </span>
          <span>
            <kbd className="rfc-kbd">Esc</kbd> close
          </span>
        </div>
      </dialog>
    </SearchContext.Provider>
  );
}
