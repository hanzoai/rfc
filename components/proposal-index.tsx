'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ProposalRow } from './proposal';
import type { RFCEntry, RFCStats } from '@/lib/source';
import config from '@/rfc.config';

/**
 * The `/docs` listing.
 *
 * Grouped by category by default, or filtered when the URL carries `?tag=` /
 * `?type=`. Both views are the same component over the same slim index — the
 * previous arrangement rendered a server list and then hid it from the client
 * with a class toggle, which meant two sources of truth for one listing.
 */

interface Group {
  slug: string;
  name: string;
  shortDesc: string;
  range: [number, number];
}

interface Props {
  entries: RFCEntry[];
  groups: Group[];
  stats: RFCStats;
}

const gap = (value: string) => ({ '--gap': value }) as React.CSSProperties;

function Listing({ entries, groups, stats }: Props) {
  const params = useSearchParams();
  const tag = params.get('tag');
  const type = params.get('type');

  if (tag || type) {
    const matched = tag
      ? entries.filter((e) => e.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
      : entries.filter((e) => e.type?.toLowerCase() === type?.toLowerCase());

    return (
      <div className="rfc-stack" style={gap('1.5rem')}>
        <div className="rfc-cluster">
          <Link href="/docs" className="rfc-link" aria-label="All proposals">
            <ArrowLeft size={16} />
          </Link>
          <h1 className="rfc-heading">{tag ? `Tag: ${tag}` : `Type: ${type}`}</h1>
          <span className="rfc-pill">{matched.length} proposals</span>
        </div>
        {matched.length ? (
          <div className="rfc-stack" style={gap('0.5rem')}>
            {matched.map((entry) => (
              <ProposalRow key={entry.url} entry={entry} />
            ))}
          </div>
        ) : (
          <p className="rfc-muted">No proposals found.</p>
        )}
      </div>
    );
  }

  return (
    <div className="rfc-stack" style={gap('2rem')}>
      <div className="rfc-stack" style={gap('0.75rem')}>
        <h1 className="rfc-heading">All {config.name}</h1>
        <p className="rfc-muted" style={{ margin: 0 }}>
          Browse all {stats.total} proposals organized by category, or press{' '}
          <kbd className="rfc-kbd">⌘K</kbd> to search.
        </p>
      </div>

      <div className="rfc-panel rfc-stats" style={{ padding: 0 }}>
        {[
          ['Total', stats.total, undefined],
          ['Final', stats.byStatus['Final'] ?? 0, 'final'],
          ['Review', stats.byStatus['Review'] ?? 0, 'review'],
          ['Draft', stats.byStatus['Draft'] ?? 0, 'draft'],
        ].map(([label, value, status]) => (
          <div key={String(label)} className="rfc-stat" style={{ padding: '1rem' }}>
            <div
              className="rfc-stat-value"
              style={{ fontSize: '1.5rem', color: status ? `var(--status-${status})` : undefined }}
            >
              {value}
            </div>
            <div className="rfc-fine rfc-muted">{label}</div>
          </div>
        ))}
      </div>

      {groups.map((group) => {
        const members = entries.filter((e) => e.number >= group.range[0] && e.number <= group.range[1]);
        if (!members.length) return null;
        return (
          <section key={group.slug} className="rfc-stack" style={gap('0.75rem')}>
            <Link href={`/docs/category/${group.slug}`} className="rfc-cluster" style={{ width: 'fit-content' }}>
              <h2 className="rfc-subheading">{group.name}</h2>
              <span className="rfc-pill">{members.length} proposals</span>
              <ArrowRight size={16} className="rfc-muted" />
            </Link>
            <p className="rfc-small rfc-muted" style={{ margin: 0 }}>
              {group.shortDesc}
            </p>
            <div className="rfc-stack" style={gap('0.5rem')}>
              {members.map((entry) => (
                <ProposalRow key={entry.url} entry={entry} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function ProposalIndex(props: Props) {
  // `useSearchParams` suspends during prerender; the shell around it is static.
  return (
    <Suspense fallback={null}>
      <Listing {...props} />
    </Suspense>
  );
}
