'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Suspense, useEffect } from 'react';

interface RFCPage {
  slug: string[];
  data: {
    title: string;
    frontmatter: {
      [key: string]: any;
      status?: string;
      type?: string;
      tags?: string[];
    };
  };
}

function FilteredContent({ allPages, shortName }: { allPages: RFCPage[]; shortName: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tag = searchParams.get('tag');
  const type = searchParams.get('type');
  const shortNameKey = shortName.toLowerCase();

  const hasFilter = !!(tag || type);

  // Show the default index when no filter is active (it's hidden by default)
  useEffect(() => {
    const indexEl = document.getElementById('rfc-index');
    if (indexEl) {
      if (hasFilter) {
        indexEl.classList.add('hidden');
      } else {
        indexEl.classList.remove('hidden');
      }
    }
  }, [hasFilter]);

  // No filter - don't render anything
  if (!hasFilter) {
    return null;
  }

  // Filter pages
  const filteredPages = tag
    ? allPages.filter(page => {
        const tags = page.data.frontmatter.tags || [];
        return tags.some((t: string) => t.toLowerCase() === tag.toLowerCase());
      })
    : type
    ? allPages.filter(page =>
        page.data.frontmatter.type?.toLowerCase() === type.toLowerCase()
      )
    : [];

  const filterLabel = tag ? `Tag: ${tag}` : `Type: ${type}`;

  const handleBack = () => {
    router.push('/docs/');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={handleBack}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
        </button>
        <h1 className="text-2xl font-bold">{filterLabel}</h1>
        <span className="text-sm text-muted-foreground px-2 py-0.5 rounded-full bg-accent">
          {filteredPages.length} proposals
        </span>
      </div>

      {filteredPages.length === 0 ? (
        <p className="text-muted-foreground">No proposals found.</p>
      ) : (
        <div className="space-y-2">
          {filteredPages.map((rfc) => {
            const rfcNum = rfc.data.frontmatter[shortNameKey];
            return (
              <Link
                key={rfc.slug.join('/')}
                href={`/docs/${rfc.slug.join('/')}`}
                className="flex items-center gap-4 p-3 rounded-lg border border-border hover:border-foreground/20 hover:bg-accent/50 transition-colors group"
              >
                <span className="text-sm font-mono text-muted-foreground w-20 shrink-0">
                  {shortName}-{String(rfcNum).padStart(4, '0')}
                </span>
                <span className="flex-1 font-medium text-sm truncate group-hover:text-foreground">
                  {rfc.data.title}
                </span>
                {rfc.data.frontmatter.status && (
                  <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                    rfc.data.frontmatter.status === 'Final' ? 'bg-green-500/10 text-green-500' :
                    rfc.data.frontmatter.status === 'Draft' ? 'bg-yellow-500/10 text-yellow-500' :
                    rfc.data.frontmatter.status === 'Review' ? 'bg-blue-500/10 text-blue-500' :
                    'bg-gray-500/10 text-gray-500'
                  }`}>
                    {rfc.data.frontmatter.status}
                  </span>
                )}
                <ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function FilteredView({ allPages, shortName }: { allPages: RFCPage[]; shortName: string }) {
  return (
    <Suspense fallback={null}>
      <FilteredContent allPages={allPages} shortName={shortName} />
    </Suspense>
  );
}
