import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@hanzo/ui/primitives/Button';
import { CategoryIcon } from '@/components/category-icon';
import { ProposalRow } from '@/components/proposal';
import { rfcEntry, source } from '@/lib/source';
import config from '@/rfc.config';

const gap = (value: string) => ({ '--gap': value }) as React.CSSProperties;

/** The lifecycle order a category page groups its proposals into. */
const sections = ['Final', 'Review', 'Draft'] as const;

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = source.getCategoryBySlug(slug);
  if (!category) notFound();

  const grouped = sections.map((status) => ({
    status,
    rfcs: category.rfcs.filter((rfc) => rfc.data.frontmatter.status === status),
  }));
  const other = category.rfcs.filter(
    (rfc) => !sections.includes(rfc.data.frontmatter.status as (typeof sections)[number]),
  );

  return (
    <div className="rfc-stack" style={{ ...gap('2rem'), maxWidth: 'var(--prose-max)' }} data-accent={category.color}>
      <Link href="/docs" className="rfc-cluster rfc-link rfc-small" style={gap('0.25rem')}>
        <ArrowLeft size={14} />
        All proposals
      </Link>

      <header className="rfc-cluster" style={gap('1rem')}>
        <span className="rfc-tile">
          <CategoryIcon name={category.icon} />
        </span>
        <div>
          <h1 className="rfc-heading">{category.name}</h1>
          <p className="rfc-small rfc-muted" style={{ margin: '0.25rem 0 0' }}>
            {config.shortName}-{category.range[0]} to {config.shortName}-{category.range[1]} ·{' '}
            {category.rfcs.length} proposals
          </p>
        </div>
      </header>

      <p className="rfc-lead">{category.description}</p>

      {category.keyTopics?.length ? (
        <div className="rfc-cluster" style={gap('0.375rem')}>
          {category.keyTopics.map((topic) => (
            <span key={topic} className="rfc-pill">
              {topic}
            </span>
          ))}
        </div>
      ) : null}

      {[...grouped, { status: 'Other' as const, rfcs: other }].map(
        ({ status, rfcs }) =>
          rfcs.length > 0 && (
            <section key={status} className="rfc-stack" style={gap('0.75rem')}>
              <h2 className="rfc-subheading">
                {status} <span className="rfc-muted">({rfcs.length})</span>
              </h2>
              <div className="rfc-stack" style={gap('0.5rem')}>
                {rfcs.map((rfc) => (
                  <ProposalRow key={rfc.slug.join('/')} entry={rfcEntry(rfc)} />
                ))}
              </div>
            </section>
          ),
      )}

      {category.rfcs.length === 0 && (
        <p className="rfc-muted">No proposals in this category yet.</p>
      )}

      {category.learnMore && (
        <Button variant="outline" asChild>
          <a href={category.learnMore} target="_blank" rel="noreferrer">
            Learn more
          </a>
        </Button>
      )}
    </div>
  );
}

export function generateStaticParams() {
  return source.getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = source.getCategoryBySlug(slug);
  if (!category) return { title: 'Category not found' };

  return {
    title: `${category.name} — ${config.name}`,
    description: category.description,
  };
}
