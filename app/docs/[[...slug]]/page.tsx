import type { ReactNode } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, ExternalLink, Tag, User } from 'lucide-react';
import { TableOfContents } from '@/components/toc';
import { ProposalIndex } from '@/components/proposal-index';
import { StatusBadge } from '@/components/proposal';
import { extractHeadings, headingId } from '@/lib/toc';
import { rfcLabel, rfcNumber, source, type RFCPage } from '@/lib/source';
import config from '@/rfc.config';

const gap = (value: string) => ({ '--gap': value }) as React.CSSProperties;

/** Recover a heading's plain text so its anchor matches the table of contents. */
function toText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(toText).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return toText((node as { props: { children?: ReactNode } }).props.children);
  }
  return '';
}

function heading(level: 2 | 3 | 4): Components['h2'] {
  const Tag = `h${level}` as const;
  return ({ children }) => <Tag id={headingId(toText(children))}>{children}</Tag>;
}

const markdown: Components = {
  h2: heading(2),
  h3: heading(3),
  h4: heading(4),
  // GFM table cells hand inline code back with its fences still attached; strip
  // them so `foo` does not render as `` `foo` ``.
  code: ({ className, children, ...rest }) =>
    className ? (
      <code className={className} {...rest}>
        {children}
      </code>
    ) : (
      <code {...rest}>{toText(children).replace(/^`+|`+$/g, '')}</code>
    ),
};

/** Author strings look like `Name (@handle)`, `@handle`, or just `Name`. */
function AuthorLink({ author }: { author: string }) {
  const handle = author.match(/@([a-zA-Z0-9_-]+)/)?.[1];
  if (!handle) return <span style={{ fontWeight: 500 }}>{author}</span>;

  const name = author.replace(`(@${handle})`, '').replace(`@${handle}`, '').trim();
  return (
    <a
      href={`https://github.com/${handle}`}
      target="_blank"
      rel="noreferrer"
      className="rfc-link"
      style={{ fontWeight: 500 }}
    >
      {name || `@${handle}`}
    </a>
  );
}

function Field({ label, icon, children }: { label: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <div>
      <div className="rfc-cluster rfc-fine rfc-muted" style={gap('0.25rem')}>
        {icon}
        {label}
      </div>
      <div className="rfc-fine" style={{ fontWeight: 500 }}>
        {children}
      </div>
    </div>
  );
}

function Detail({ page }: { page: RFCPage }) {
  const { frontmatter } = page.data;
  const headings = extractHeadings(page.data.content);
  const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
  const number = rfcNumber(page);
  const sourcePath = `${config.rfcDir.replace(/^\.\.\//, '')}/${config.filePrefix}${String(number).padStart(4, '0')}.md`;

  return (
    <div className="rfc-article">
      <article className="rfc-stack" style={gap('1.5rem')}>
        <header
          className="rfc-stack"
          style={{ ...gap('0.75rem'), borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}
        >
          <Link href="/docs" className="rfc-cluster rfc-link rfc-small" style={gap('0.25rem')}>
            <ArrowLeft size={14} />
            All proposals
          </Link>

          <div className="rfc-cluster" data-between style={{ alignItems: 'flex-start' }}>
            <div>
              <span className="rfc-mono rfc-fine rfc-muted">{rfcLabel(page)}</span>
              <h1 className="rfc-heading">{page.data.title}</h1>
            </div>
            <StatusBadge status={frontmatter.status} />
          </div>

          {page.data.description && <p className="rfc-small rfc-muted" style={{ margin: 0 }}>{page.data.description}</p>}

          <div className="rfc-panel rfc-grid" data-cols="4" style={{ gap: '0.75rem' }}>
            {frontmatter.type && (
              <Field label="Type">
                <Link href={`/docs?type=${encodeURIComponent(frontmatter.type)}`} className="rfc-link">
                  {frontmatter.type}
                </Link>
              </Field>
            )}
            {frontmatter.category && (
              <Field label="Category">
                <Link
                  href={`/docs/category/${frontmatter.category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="rfc-link"
                >
                  {frontmatter.category}
                </Link>
              </Field>
            )}
            {frontmatter.author && (
              <Field label="Author" icon={<User size={12} />}>
                <AuthorLink author={frontmatter.author} />
              </Field>
            )}
            {frontmatter.created && (
              <Field label="Created" icon={<Calendar size={12} />}>
                {frontmatter.created}
              </Field>
            )}
          </div>

          {tags.length > 0 && (
            <div className="rfc-cluster" style={gap('0.25rem')}>
              <Tag size={12} className="rfc-muted" />
              {tags.map((tag) => (
                <Link key={tag} href={`/docs?tag=${encodeURIComponent(tag)}`} className="rfc-pill">
                  {tag}
                </Link>
              ))}
            </div>
          )}

          <div className="rfc-cluster rfc-fine" style={gap('1rem')}>
            {frontmatter['discussions-to'] && (
              <a
                href={frontmatter['discussions-to']}
                target="_blank"
                rel="noreferrer"
                className="rfc-cluster rfc-link rfc-fine"
                style={gap('0.25rem')}
              >
                <ExternalLink size={12} />
                Discussions
              </a>
            )}
            <a
              href={`${config.repoUrl}/edit/main/${sourcePath}`}
              target="_blank"
              rel="noreferrer"
              className="rfc-cluster rfc-link rfc-fine"
              style={gap('0.25rem')}
            >
              <ExternalLink size={12} />
              Edit on GitHub
            </a>
          </div>
        </header>

        <div className="rfc-prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdown}>
            {page.data.content}
          </ReactMarkdown>
        </div>
      </article>

      <TableOfContents headings={headings} />
    </div>
  );
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;

  if (!slug?.length) {
    return (
      <ProposalIndex
        entries={source.getIndex()}
        groups={source.getAllCategories().map(({ slug: s, name, shortDesc, range }) => ({
          slug: s,
          name,
          shortDesc,
          range,
        }))}
        stats={source.getStats()}
      />
    );
  }

  const page = source.getPage(slug);
  if (!page) notFound();

  return <Detail page={page} />;
}

export function generateStaticParams() {
  return [{ slug: [] }, ...source.generateParams()];
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;

  if (!slug?.length) {
    return {
      title: 'All proposals',
      description: `Browse all ${config.name} — standards and improvements`,
    };
  }

  const page = source.getPage(slug);
  if (!page) return {};

  return {
    title: `${rfcLabel(page)}: ${page.data.title}`,
    description: page.data.description ?? `${config.name} ${rfcLabel(page)}`,
  };
}
