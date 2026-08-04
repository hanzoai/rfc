import Link from 'next/link';
import { ArrowRight, CheckCircle2, Github } from 'lucide-react';
import { SiteHeader, SiteFooter } from '@/components/chrome';
import { CategoryIcon } from '@/components/category-icon';
import { StatusBadge } from '@/components/proposal';
import { rfcHref, rfcLabel, source } from '@/lib/source';
import config from '@/rfc.config';

const gap = (value: string) => ({ '--gap': value }) as React.CSSProperties;

export default function HomePage() {
  const stats = source.getStats();
  const categories = source.getAllCategories();
  const all = source.getAllPages();

  const recent = [...all]
    .filter((rfc) => rfc.data.frontmatter.created)
    .sort((a, b) => String(b.data.frontmatter.created).localeCompare(String(a.data.frontmatter.created)))
    .slice(0, 6);

  const finalized = all.filter((rfc) => rfc.data.frontmatter.status === 'Final').slice(0, 4);
  const finalCount = stats.byStatus['Final'] ?? 0;

  return (
    <>
      <SiteHeader />

      <main>
        <section className="rfc-shell rfc-section rfc-stack" style={{ ...gap('1.5rem'), textAlign: 'center' }}>
          <p className="rfc-small rfc-muted" style={{ margin: 0 }}>
            {finalCount} standards finalized
          </p>
          <h1 className="rfc-title">{config.name}</h1>
          <p className="rfc-lead" style={{ maxWidth: '42rem', marginInline: 'auto' }}>
            {config.description}
          </p>
          <div className="rfc-cluster" data-center>
            <a href={config.repoUrl} target="_blank" rel="noreferrer" className="rfc-btn" data-variant="outline">
              <Github size={16} />
              GitHub
            </a>
            <Link href="/docs" className="rfc-btn" data-variant="solid">
              Browse proposals
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section data-tinted>
          <div className="rfc-shell">
            <div className="rfc-stats">
              {[
                { label: `Total ${config.shortName}s`, value: stats.total },
                { label: 'Finalized', value: finalCount },
                {
                  label: 'In review',
                  value: (stats.byStatus['Review'] ?? 0) + (stats.byStatus['Last Call'] ?? 0),
                },
                { label: 'Categories', value: categories.length },
              ].map((stat) => (
                <div key={stat.label} className="rfc-stat">
                  <div className="rfc-stat-value">{stat.value}</div>
                  <div className="rfc-small rfc-muted">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rfc-shell rfc-section rfc-stack" style={gap('2rem')}>
          <div>
            <h2 className="rfc-heading">Categories</h2>
            <p className="rfc-muted" style={{ margin: '0.25rem 0 0' }}>
              Browse proposals by category
            </p>
          </div>
          <div className="rfc-grid" data-cols="3">
            {categories.map((cat) => {
              const final = cat.rfcs.filter((r) => r.data.frontmatter.status === 'Final').length;
              const draft = cat.rfcs.filter((r) => r.data.frontmatter.status === 'Draft').length;
              return (
                <Link key={cat.slug} href={`/docs/category/${cat.slug}`} className="rfc-card" data-accent={cat.color}>
                  <div className="rfc-cluster" data-between style={{ alignItems: 'flex-start' }}>
                    <span className="rfc-tile">
                      <CategoryIcon name={cat.icon} />
                    </span>
                    <span className="rfc-pill rfc-mono">
                      {cat.range[0]}–{cat.range[1]}
                    </span>
                  </div>
                  <h3 className="rfc-subheading" style={{ marginTop: '0.5rem' }}>
                    {cat.name}
                  </h3>
                  <p className="rfc-small rfc-muted" style={{ flex: 1, margin: 0 }}>
                    {cat.shortDesc}
                  </p>
                  {cat.keyTopics?.length ? (
                    <div className="rfc-cluster" style={gap('0.25rem')}>
                      {cat.keyTopics.slice(0, 3).map((topic) => (
                        <span key={topic} className="rfc-pill">
                          {topic}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div
                    className="rfc-cluster rfc-fine"
                    style={{ ...gap('0.75rem'), borderTop: '1px solid var(--border)', paddingTop: '1rem' }}
                  >
                    {cat.rfcs.length ? (
                      <>
                        <span className="rfc-cluster" style={gap('0.375rem')}>
                          <span className="rfc-dot" style={{ '--hue': 'var(--status-final)' } as React.CSSProperties} />
                          {final} final
                        </span>
                        <span className="rfc-cluster" style={gap('0.375rem')}>
                          <span className="rfc-dot" />
                          {draft} draft
                        </span>
                        <span style={{ marginInlineStart: 'auto', fontWeight: 500 }}>
                          {cat.rfcs.length} {config.shortName}s
                        </span>
                      </>
                    ) : (
                      <span className="rfc-muted">Coming soon</span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {finalized.length > 0 && (
          <section data-tinted>
            <div className="rfc-shell rfc-section rfc-stack" style={gap('2rem')}>
              <div className="rfc-cluster" data-between>
                <div>
                  <h2 className="rfc-heading">Finalized standards</h2>
                  <p className="rfc-small rfc-muted" style={{ margin: '0.25rem 0 0' }}>
                    Production-ready specifications
                  </p>
                </div>
                <Link href="/docs" className="rfc-link rfc-small">
                  View all {finalCount} →
                </Link>
              </div>
              <div className="rfc-grid" data-cols="2">
                {finalized.map((rfc) => (
                  <Link
                    key={rfc.slug.join('/')}
                    href={rfcHref(rfc)}
                    className="rfc-card"
                    data-accent="emerald"
                    style={{ flexDirection: 'row', gap: '1rem', padding: '1.25rem' }}
                  >
                    <span className="rfc-tile" data-accent="emerald">
                      <CheckCircle2 size={24} />
                    </span>
                    <span style={{ minWidth: 0 }}>
                      <span className="rfc-mono rfc-small rfc-muted">{rfcLabel(rfc)}</span>
                      <h3 className="rfc-subheading rfc-clamp" style={{ '--lines': 1 } as React.CSSProperties}>
                        {rfc.data.title}
                      </h3>
                      {rfc.data.description && (
                        <p
                          className="rfc-small rfc-muted rfc-clamp"
                          style={{ ...({ '--lines': 1 } as React.CSSProperties), margin: '0.25rem 0 0' }}
                        >
                          {rfc.data.description}
                        </p>
                      )}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {recent.length > 0 && (
          <section className="rfc-shell rfc-section rfc-stack" style={gap('2rem')}>
            <div className="rfc-cluster" data-between>
              <div>
                <h2 className="rfc-heading">Recent proposals</h2>
                <p className="rfc-small rfc-muted" style={{ margin: '0.25rem 0 0' }}>
                  Latest additions to the repository
                </p>
              </div>
              <Link href="/docs" className="rfc-link rfc-small">
                View all →
              </Link>
            </div>
            <div className="rfc-grid" data-cols="3">
              {recent.map((rfc) => (
                <Link key={rfc.slug.join('/')} href={rfcHref(rfc)} className="rfc-card" style={{ padding: '1.25rem' }}>
                  <div className="rfc-cluster" data-between>
                    <span className="rfc-mono rfc-small rfc-muted">{rfcLabel(rfc)}</span>
                    <StatusBadge status={rfc.data.frontmatter.status} />
                  </div>
                  <h3 className="rfc-subheading rfc-clamp">{rfc.data.title}</h3>
                  {rfc.data.description && (
                    <p className="rfc-small rfc-muted rfc-clamp" style={{ margin: 0 }}>
                      {rfc.data.description}
                    </p>
                  )}
                  <p className="rfc-fine rfc-muted" style={{ margin: 0 }}>
                    Created {String(rfc.data.frontmatter.created)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="rfc-shell rfc-section rfc-stack" style={gap('2rem')}>
          <div>
            <h2 className="rfc-heading">Proposal types</h2>
            <p className="rfc-muted" style={{ margin: '0.25rem 0 0' }}>
              Different types of proposals serve different purposes
            </p>
          </div>
          <div className="rfc-grid" data-cols="3">
            {[
              {
                type: 'Standards Track',
                blurb:
                  'Technical specifications describing new features, protocols or standards. Requires implementation and consensus.',
              },
              {
                type: 'Meta',
                blurb:
                  'Process proposals covering governance, decision-making, or changes to how proposals themselves work.',
              },
              {
                type: 'Informational',
                blurb: 'Educational content, guidelines and best practices that do not require implementation.',
              },
            ].map(({ type, blurb }) => (
              <div key={type} className="rfc-card">
                <div className="rfc-stat-value">{stats.byType[type] ?? 0}</div>
                <div style={{ fontWeight: 500 }}>{type}</div>
                <p className="rfc-small rfc-muted" style={{ margin: 0 }}>
                  {blurb}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rfc-shell" style={{ paddingBottom: '4rem' }}>
          <div className="rfc-cta rfc-stack" style={gap('1.5rem')}>
            <h2 className="rfc-heading">Contribute to {config.name}</h2>
            <p style={{ maxWidth: '36rem', margin: 0, opacity: 0.8 }}>
              Help shape the future by contributing proposals, reviewing drafts and participating in discussions.
            </p>
            <div className="rfc-cluster">
              <Link href="/contribute" className="rfc-btn" data-variant="solid">
                Read guidelines
              </Link>
              <a href={config.repoUrl} target="_blank" rel="noreferrer" className="rfc-btn" data-variant="outline">
                <Github size={16} />
                Open on GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
