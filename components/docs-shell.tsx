import Link from 'next/link';
import type { ReactNode } from 'react';
import { BookOpen, ExternalLink, FileText, GitPullRequest, Users } from 'lucide-react';
import { Lockup } from './logo';
import { ThemeToggle } from './theme-toggle';
import { SearchTrigger } from './search';
import { rfcHref, rfcLabel, source } from '@/lib/source';
import config from '@/rfc.config';

/**
 * The documentation shell: a sticky proposal tree beside the content.
 *
 * Groups are `<details>`, so open/closed state is the browser's, survives
 * without JavaScript, and needs no client component.
 */
export function DocsShell({ children }: { children: ReactNode }) {
  const categories = source.getPopulatedCategories();
  const stats = source.getStats();
  const shortName = config.shortName;

  return (
    <div className="rfc-docs">
      <aside className="rfc-sidebar">
        <div className="rfc-cluster" data-between>
          <Link href="/" aria-label={config.name}>
            <Lockup size={20} />
          </Link>
          <ThemeToggle />
        </div>

        <SearchTrigger />

        <div className="rfc-panel rfc-stack" style={{ '--gap': '0.5rem' } as React.CSSProperties}>
          <span className="rfc-cluster rfc-small" style={{ '--gap': '0.5rem', fontWeight: 600 } as React.CSSProperties}>
            <FileText size={16} />
            {shortName} statistics
          </span>
          <div className="rfc-grid" data-cols="2" style={{ gap: '0.25rem' }}>
            {[
              ['Total', stats.total, undefined],
              ['Final', stats.byStatus['Final'] ?? 0, 'Final'],
              ['Draft', stats.byStatus['Draft'] ?? 0, 'Draft'],
              ['Review', stats.byStatus['Review'] ?? 0, 'Review'],
            ].map(([label, value, status]) => (
              <span key={String(label)} className="rfc-fine">
                <span className="rfc-muted">{label}: </span>
                <span
                  style={{
                    fontWeight: 500,
                    color: status ? `var(--status-${String(status).toLowerCase().replace(' ', '-')})` : undefined,
                  }}
                >
                  {value}
                </span>
              </span>
            ))}
          </div>
        </div>

        <nav className="rfc-stack" style={{ '--gap': '0.125rem', flex: 1 } as React.CSSProperties}>
          <Link href="/docs" className="rfc-sidebar-link">
            All {shortName}s
          </Link>
          {categories.map((cat) => (
            <details key={cat.slug} className="rfc-sidebar-group">
              <summary>{cat.name}</summary>
              <div className="rfc-sidebar-nest">
                <Link href={`/docs/category/${cat.slug}`} className="rfc-sidebar-link">
                  Overview · {cat.rfcs.length}
                </Link>
                {cat.rfcs.map((rfc) => (
                  <Link key={rfc.slug.join('/')} href={rfcHref(rfc)} className="rfc-sidebar-link">
                    {rfcLabel(rfc)}: {rfc.data.title}
                  </Link>
                ))}
              </div>
            </details>
          ))}
        </nav>

        <div
          className="rfc-stack rfc-fine"
          style={{ '--gap': '0.5rem', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' } as React.CSSProperties}
        >
          <Link href="/contribute" className="rfc-cluster rfc-link rfc-fine" style={{ '--gap': '0.5rem' } as React.CSSProperties}>
            <GitPullRequest size={14} />
            Contribute
          </Link>
          <a
            href={config.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="rfc-cluster rfc-link rfc-fine"
            style={{ '--gap': '0.5rem' } as React.CSSProperties}
          >
            <ExternalLink size={14} />
            GitHub
          </a>
          {config.forumUrl && (
            <a
              href={config.forumUrl}
              target="_blank"
              rel="noreferrer"
              className="rfc-cluster rfc-link rfc-fine"
              style={{ '--gap': '0.5rem' } as React.CSSProperties}
            >
              <Users size={14} />
              Discussion forum
            </a>
          )}
          {config.helpUrl && (
            <a
              href={config.helpUrl}
              target="_blank"
              rel="noreferrer"
              className="rfc-cluster rfc-link rfc-fine"
              style={{ '--gap': '0.5rem' } as React.CSSProperties}
            >
              <BookOpen size={14} />
              Help
            </a>
          )}
        </div>
      </aside>

      <main className="rfc-content">{children}</main>
    </div>
  );
}
