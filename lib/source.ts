import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import config, { type CategoryConfig } from '../rfc.config';

const RFC_DIR = path.join(process.cwd(), config.rfcDir);

/** The frontmatter key carrying the proposal number: `lp`, `hip`, `zip`, … */
const numberKey = config.shortName.toLowerCase();

export type RFCStatus =
  | 'Draft'
  | 'Review'
  | 'Last Call'
  | 'Final'
  | 'Withdrawn'
  | 'Stagnant'
  | 'Superseded';

export interface RFCMetadata {
  title?: string;
  description?: string;
  status?: RFCStatus;
  type?: 'Standards Track' | 'Meta' | 'Informational';
  category?: string;
  author?: string;
  created?: string;
  updated?: string;
  tags?: string[];
  'discussions-to'?: string;
  /** The number lives under a per-site key (`lp`/`hip`/`zip`), hence the index. */
  [key: string]: unknown;
}

export interface RFCPage {
  slug: string[];
  data: {
    title: string;
    description?: string;
    content: string;
    frontmatter: RFCMetadata;
  };
}

export interface RFCCategory extends CategoryConfig {
  rfcs: RFCPage[];
}

/**
 * The slim projection of a proposal: everything the browser needs to list,
 * filter or find one, and nothing it does not. Search, the `/docs` index and
 * the tag/type filters all read this same array — one shape, one build pass.
 */
export interface RFCEntry {
  url: string;
  label: string;
  number: number;
  title: string;
  description: string;
  status?: string;
  type?: string;
  category?: string;
  tags: string[];
  /** Pre-lowercased haystack, so matching is a substring test. */
  haystack: string;
}

export interface RFCStats {
  total: number;
  byStatus: Record<string, number>;
  byType: Record<string, number>;
}

function readDir(): string[] {
  try {
    return fs
      .readdirSync(RFC_DIR)
      .filter((f) => /\.mdx?$/.test(f) && f.startsWith(config.filePrefix));
  } catch {
    // A fresh clone has no proposals directory yet; an empty site is valid.
    return [];
  }
}

function readFile(filename: string): RFCPage | null {
  let raw: string;
  try {
    raw = fs.readFileSync(path.join(RFC_DIR, filename), 'utf8');
  } catch {
    return null;
  }

  const { data, content } = matter(raw);
  const stem = filename.replace(/\.mdx?$/, '');

  // gray-matter hands back Date objects for unquoted YAML dates; they are not
  // serializable across the server/client boundary, so normalise to ISO days.
  const frontmatter: RFCMetadata = {};
  for (const [key, value] of Object.entries(data)) {
    frontmatter[key] = value instanceof Date ? value.toISOString().slice(0, 10) : value;
  }

  const fromName = stem.match(new RegExp(`${config.filePrefix}(\\d+)`));
  frontmatter[numberKey] =
    frontmatter[numberKey] ?? (fromName ? Number.parseInt(fromName[1], 10) : null);

  return {
    slug: stem.split('/'),
    data: {
      title: typeof frontmatter.title === 'string' ? frontmatter.title : stem,
      description: typeof frontmatter.description === 'string' ? frontmatter.description : undefined,
      content,
      frontmatter,
    },
  };
}

/** Unnumbered proposals sort last rather than crashing the comparator. */
export function rfcNumber(page: RFCPage): number {
  const value = page.data.frontmatter[numberKey];
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return Number.parseInt(value, 10) || Number.MAX_SAFE_INTEGER;
  return Number.MAX_SAFE_INTEGER;
}

/** `LP-0042` — the one place a proposal's display id is formed. */
export function rfcLabel(page: RFCPage): string {
  const n = rfcNumber(page);
  return `${config.shortName}-${n === Number.MAX_SAFE_INTEGER ? '????' : String(n).padStart(4, '0')}`;
}

export function rfcHref(page: RFCPage): string {
  return `/docs/${page.slug.join('/')}`;
}

/** The one projection from a parsed proposal to its listable/searchable form. */
export function rfcEntry(page: RFCPage): RFCEntry {
  const { frontmatter } = page.data;
  const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
  const label = rfcLabel(page);
  const description = page.data.description ?? '';

  return {
    url: rfcHref(page),
    label,
    number: rfcNumber(page),
    title: page.data.title,
    description,
    status: frontmatter.status,
    type: frontmatter.type,
    category: frontmatter.category,
    tags,
    haystack: [label, page.data.title, description, frontmatter.category ?? '', ...tags]
      .join(' ')
      .toLowerCase(),
  };
}

// Read once per build. Every accessor below is a view over this array, so the
// filesystem is walked a single time no matter how many pages are rendered.
let cache: RFCPage[] | undefined;

function pages(): RFCPage[] {
  cache ??= readDir()
    .map(readFile)
    .filter((p): p is RFCPage => p !== null)
    .sort((a, b) => rfcNumber(a) - rfcNumber(b));
  return cache;
}

function categories(): RFCCategory[] {
  const all = pages();
  return config.categories.map((cat) => ({
    ...cat,
    rfcs: all.filter((p) => {
      const n = rfcNumber(p);
      return n >= cat.range[0] && n <= cat.range[1];
    }),
  }));
}

export const source = {
  getAllPages: pages,

  getPage(slug?: string[]): RFCPage | null {
    if (!slug?.length) return null;
    const key = slug.join('/');
    return pages().find((p) => p.slug.join('/') === key) ?? null;
  },

  generateParams(): { slug: string[] }[] {
    return pages().map((p) => ({ slug: p.slug }));
  },

  /** Every category, including the empty ones — the home page shows those. */
  getAllCategories: categories,

  /** Categories that actually have proposals — the docs navigation. */
  getPopulatedCategories(): RFCCategory[] {
    return categories().filter((cat) => cat.rfcs.length > 0);
  },

  getCategoryBySlug(slug: string): RFCCategory | undefined {
    return categories().find((cat) => cat.slug === slug);
  },

  getAllCategorySlugs(): string[] {
    return config.categories.map((cat) => cat.slug);
  },

  getStats(): RFCStats {
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    for (const page of pages()) {
      const { status = 'Unknown', type = 'Unknown' } = page.data.frontmatter;
      byStatus[status] = (byStatus[status] ?? 0) + 1;
      byType[type] = (byType[type] ?? 0) + 1;
    }
    return { total: pages().length, byStatus, byType };
  },

  /**
   * The browser-side index, built at export time and embedded in the page.
   *
   * The site is a static export: there is no server to query, so search and the
   * tag/type filters both scan this array. Titles, descriptions, tags and ids
   * are indexed; proposal bodies are not, because shipping every body would
   * multiply the payload for a marginal recall gain.
   */
  getIndex(): RFCEntry[] {
    return pages().map(rfcEntry);
  },
};
