import React from 'react';
import Link from 'next/link';
import { Logo, LogoWithText } from '@/components/logo';
import { source, type RFCCategory } from '@/lib/source';
import { ThemeToggle } from '@/components/theme-toggle';
import config from '@/rfc.config';

type ProposalStatus = 'Final' | 'Draft' | 'Review' | 'Last Call' | 'Withdrawn' | 'Stagnant';

const shortName = config.shortName;
const shortNameKey = shortName.toLowerCase();

function StatusBadge({ status }: { status: ProposalStatus }) {
  const styles: Record<string, string> = {
    Final: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    Review: 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30',
    'Last Call': 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30',
    Draft: 'bg-muted/50 text-muted-foreground border-border',
    Withdrawn: 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30',
    Stagnant: 'bg-muted/30 text-muted-foreground/70 border-border',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status] || styles.Draft}`}>
      {status}
    </span>
  );
}

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

// Category icons with consistent styling
function CategoryIcon({ icon, color }: { icon: string; color: string }) {
  const colorClasses: Record<string, string> = {
    blue: 'text-blue-600 dark:text-blue-400 bg-blue-500/10',
    purple: 'text-purple-600 dark:text-purple-400 bg-purple-500/10',
    emerald: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10',
    amber: 'text-amber-600 dark:text-amber-400 bg-amber-500/10',
    green: 'text-green-600 dark:text-green-400 bg-green-500/10',
    indigo: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10',
    orange: 'text-orange-600 dark:text-orange-400 bg-orange-500/10',
    pink: 'text-pink-600 dark:text-pink-400 bg-pink-500/10',
    cyan: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10',
    violet: 'text-violet-600 dark:text-violet-400 bg-violet-500/10',
    rose: 'text-rose-600 dark:text-rose-400 bg-rose-500/10',
  };

  const icons: Record<string, React.ReactElement> = {
    layers: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    network: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3"/><circle cx="12" cy="4" r="2"/><circle cx="12" cy="20" r="2"/>
        <circle cx="4" cy="12" r="2"/><circle cx="20" cy="12" r="2"/>
        <path d="M12 7v2M12 15v2M7 12h2M15 12h2"/>
      </svg>
    ),
    code: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>
      </svg>
    ),
    brain: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 2.5 2.5 0 0 0 .34 3.58 2.5 2.5 0 0 0 1.98 3 2.5 2.5 0 0 0 4.96.46"/>
        <path d="M12 4.5a2.5 2.5 0 0 1 4.96-.46 2.5 2.5 0 0 1 1.98 3 2.5 2.5 0 0 1 1.32 4.24 2.5 2.5 0 0 1-.34 3.58 2.5 2.5 0 0 1-1.98 3 2.5 2.5 0 0 1-4.96.46"/>
        <path d="M12 2v20"/>
      </svg>
    ),
    plug: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22v-5M7 11v4h10v-4M7 11l-1.5-6h13L17 11"/>
      </svg>
    ),
    bot: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="7" width="14" height="12" rx="2"/><path d="M9 12h.01M15 12h.01M12 2v3"/>
      </svg>
    ),
    eye: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    blocks: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/>
        <rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/>
      </svg>
    ),
    token: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9"/><path d="M12 6v12M8 10h8M8 14h8"/>
      </svg>
    ),
    vote: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4"/><rect x="3" y="3" width="18" height="18" rx="2"/>
      </svg>
    ),
    flask: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 3h6M10 3v6l-5 8.5a1 1 0 0 0 .9 1.5h12.2a1 1 0 0 0 .9-1.5L14 9V3"/>
      </svg>
    ),
    research: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
      </svg>
    ),
  };

  return (
    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colorClasses[color] || colorClasses.blue}`}>
      {icons[icon] || icons.layers}
    </div>
  );
}

export default function HomePage() {
  const stats = source.getStats();
  const allCategories = source.getAllCategories();
  const allPages = source.getAllPages();

  // Get recent RFCs sorted by created date
  const recentRFCs = [...allPages]
    .filter(rfc => rfc.data.frontmatter.created)
    .sort((a, b) => {
      const dateA = new Date(a.data.frontmatter.created || '2000-01-01');
      const dateB = new Date(b.data.frontmatter.created || '2000-01-01');
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 6);

  // Get finalized standards
  const finalizedRFCs = allPages
    .filter(rfc => rfc.data.frontmatter.status === 'Final')
    .slice(0, 4);

  // Category stats helper
  const getCategoryStats = (cat: RFCCategory) => {
    const final = cat.rfcs.filter(rfc => rfc.data.frontmatter.status === 'Final').length;
    const draft = cat.rfcs.filter(rfc => rfc.data.frontmatter.status === 'Draft').length;
    return { final, draft, total: cat.rfcs.length };
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <LogoWithText size={18} />
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/docs"
              className="inline-flex h-8 items-center justify-center rounded-md bg-foreground px-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Browse
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <p className="text-sm font-medium text-muted-foreground">
            {stats.byStatus['Final'] || 0} standards finalized
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {config.name}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {config.description}
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <a
              href={config.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <GitHubIcon size={16} />
              GitHub
            </a>
            <Link
              href="/docs"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Browse proposals
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-border bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 divide-x divide-border sm:grid-cols-4">
              {[
                { label: `Total ${shortName}s`, value: stats.total },
                { label: 'Finalized', value: stats.byStatus['Final'] || 0 },
                { label: 'In Review', value: (stats.byStatus['Review'] || 0) + (stats.byStatus['Last Call'] || 0) },
                { label: 'Categories', value: allCategories.length },
              ].map((stat) => (
                <div key={stat.label} className="px-4 py-8 text-center sm:px-6">
                  <div className="text-3xl font-bold tabular-nums sm:text-4xl">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Categories</h2>
              <p className="mt-1 text-muted-foreground">Browse proposals by category</p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allCategories.map((cat) => {
              const catStats = getCategoryStats(cat);
              return (
                <Link
                  key={cat.name}
                  href="/docs"
                  className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-border/80 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <CategoryIcon icon={cat.icon} color={cat.color} />
                    <span className="rounded-full bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
                      {cat.range[0]}-{cat.range[1]}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{cat.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">
                    {cat.description}
                  </p>
                  {cat.keyTopics && cat.keyTopics.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1">
                      {cat.keyTopics.slice(0, 3).map((topic) => (
                        <span key={topic} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex items-center gap-3 border-t border-border pt-4 text-xs">
                    {catStats.total > 0 ? (
                      <>
                        <span className="flex items-center gap-1">
                          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                          {catStats.final} final
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="inline-block h-2 w-2 rounded-full bg-muted-foreground/50"></span>
                          {catStats.draft} draft
                        </span>
                        <span className="ml-auto font-medium">{catStats.total} {shortName}s</span>
                      </>
                    ) : (
                      <span className="text-muted-foreground/60">Coming soon</span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Finalized Standards */}
        {finalizedRFCs.length > 0 && (
          <section className="bg-emerald-500/5">
            <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Finalized Standards</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Production-ready specifications</p>
                </div>
                <Link href="/docs" className="text-sm font-medium text-emerald-600 dark:text-emerald-400 transition-colors hover:text-emerald-500">
                  View all {stats.byStatus['Final'] || 0} &rarr;
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {finalizedRFCs.map((rfc) => {
                  const rfcNum = String(rfc.data.frontmatter[shortNameKey] || '0').padStart(4, '0');
                  return (
                    <Link
                      key={rfc.slug.join('/')}
                      href={`/docs/${rfc.slug.join('/')}`}
                      className="group flex items-start gap-4 rounded-xl border border-emerald-500/20 bg-card p-5 transition-all hover:border-emerald-500/40 hover:shadow-sm"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 12l2 2 4-4"/>
                          <circle cx="12" cy="12" r="10"/>
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm text-muted-foreground">{shortName}-{rfcNum}</span>
                        </div>
                        <h3 className="mt-1 font-semibold leading-snug line-clamp-1 group-hover:text-muted-foreground">
                          {rfc.data.title}
                        </h3>
                        {rfc.data.description && (
                          <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                            {rfc.data.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Recent Proposals */}
        <section className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Recent proposals</h2>
                <p className="mt-1 text-sm text-muted-foreground">Latest additions to the repository</p>
              </div>
              <Link href="/docs" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                View all &rarr;
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recentRFCs.map((rfc) => {
                const rfcNum = String(rfc.data.frontmatter[shortNameKey] || '0').padStart(4, '0');
                const status = (rfc.data.frontmatter.status || 'Draft') as ProposalStatus;
                const created = rfc.data.frontmatter.created;
                return (
                  <Link
                    key={rfc.slug.join('/')}
                    href={`/docs/${rfc.slug.join('/')}`}
                    className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-border/80 hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm text-muted-foreground">{shortName}-{rfcNum}</span>
                      <StatusBadge status={status} />
                    </div>
                    <h3 className="mt-3 font-semibold leading-snug line-clamp-2 group-hover:text-muted-foreground">
                      {rfc.data.title}
                    </h3>
                    {rfc.data.description && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {rfc.data.description}
                      </p>
                    )}
                    {created && (
                      <p className="mt-3 text-xs text-muted-foreground/70">
                        Created {created}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Type Distribution */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="text-2xl font-bold">Proposal Types</h2>
          <p className="mt-2 text-muted-foreground">Different types of proposals serve different purposes</p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="text-3xl font-bold">{stats.byType['Standards Track'] || 0}</div>
              <div className="mt-1 font-medium">Standards Track</div>
              <p className="mt-2 text-sm text-muted-foreground">Technical specifications that describe new features, protocols, or standards. Requires implementation and consensus.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="text-3xl font-bold">{stats.byType['Meta'] || 0}</div>
              <div className="mt-1 font-medium">Meta</div>
              <p className="mt-2 text-sm text-muted-foreground">Process proposals that describe governance, decision-making, or changes to how proposals work.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="text-3xl font-bold">{stats.byType['Informational'] || 0}</div>
              <div className="mt-1 font-medium">Informational</div>
              <p className="mt-2 text-sm text-muted-foreground">Educational content, guidelines, and best practices that don&apos;t require implementation.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <div className="rounded-2xl bg-foreground p-8 text-background sm:p-12">
            <h2 className="text-2xl font-bold sm:text-3xl">Contribute to {config.name}</h2>
            <p className="mt-3 max-w-xl opacity-80">
              Help shape the future by contributing proposals, reviewing drafts, and participating in discussions.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/docs"
                className="inline-flex h-10 items-center justify-center rounded-md bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-background/90"
              >
                Read guidelines
              </Link>
              <a
                href={config.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-background/30 px-4 text-sm font-medium transition-colors hover:bg-background/10"
              >
                <GitHubIcon size={16} />
                Open on GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <Logo size={40} />
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a
                href={config.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 transition-colors hover:text-foreground"
              >
                GitHub
              </a>
              {config.forumUrl && (
                <a
                  href={config.forumUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  Forum
                </a>
              )}
              {config.helpUrl && (
                <a
                  href={config.helpUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  Help
                </a>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {config.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
