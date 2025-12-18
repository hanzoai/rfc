import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import config, { type CategoryConfig } from '../rfc.config';

// Directory containing RFC files (from config)
const RFC_DIR = path.join(process.cwd(), config.rfcDir);

export interface RFCMetadata {
  // The RFC number key is dynamic (lp, hip, zip) - accessed via frontmatter[shortNameKey]
  title?: string;
  description?: string;
  status?: 'Draft' | 'Review' | 'Last Call' | 'Final' | 'Withdrawn' | 'Stagnant' | 'Superseded';
  type?: 'Standards Track' | 'Meta' | 'Informational';
  category?: string;
  author?: string;
  created?: string;
  updated?: string;
  requires?: string | number[];
  tags?: string[];
  [key: string]: any;  // Allows dynamic keys like lp, hip, zip
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

// Use categories from config
const RFC_CATEGORIES = config.categories;

function getAllRFCFiles(): string[] {
  try {
    const files = fs.readdirSync(RFC_DIR);
    return files
      .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
      .filter(file => file.startsWith(config.filePrefix));
  } catch (error) {
    console.error('Error reading RFCs directory:', error);
    return [];
  }
}

function readRFCFile(filename: string): RFCPage | null {
  try {
    const filePath = path.join(RFC_DIR, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const slug = filename.replace(/\.mdx?$/, '').split('/');

    // Extract RFC number from filename or frontmatter
    const rfcMatch = filename.match(new RegExp(`${config.filePrefix}(\\d+)`));
    const shortNameKey = config.shortName.toLowerCase();
    const rfcNumber = data[shortNameKey] || data.rfc || (rfcMatch ? parseInt(rfcMatch[1], 10) : null);

    // Convert Date objects to strings
    const processedData: Record<string, any> = {};
    for (const [key, value] of Object.entries(data)) {
      if (value instanceof Date) {
        processedData[key] = value.toISOString().split('T')[0];
      } else {
        processedData[key] = value;
      }
    }

    return {
      slug,
      data: {
        title: processedData.title || filename.replace(/\.mdx?$/, ''),
        description: processedData.description,
        content,
        frontmatter: {
          ...processedData,
          [shortNameKey]: rfcNumber,
        } as RFCMetadata,
      },
    };
  } catch (error) {
    console.error(`Error reading RFC file ${filename}:`, error);
    return null;
  }
}

function getRFCNumber(page: RFCPage): number {
  const shortNameKey = config.shortName.toLowerCase();
  const rfcNum = page.data.frontmatter[shortNameKey];
  if (typeof rfcNum === 'number') return rfcNum;
  if (typeof rfcNum === 'string') return parseInt(rfcNum, 10) || 9999;
  return 9999;
}

export const source = {
  // Configuration accessors
  get config() {
    return config;
  },

  get shortName() {
    return config.shortName;
  },

  getPage(slugParam?: string[]): RFCPage | null {
    if (!slugParam || slugParam.length === 0) {
      return null;
    }

    const slug = slugParam;
    const filename = `${slug.join('/')}.md`;
    const mdxFilename = `${slug.join('/')}.mdx`;

    let page = readRFCFile(filename);
    if (!page) {
      page = readRFCFile(mdxFilename);
    }

    return page;
  },

  generateParams(): { slug: string[] }[] {
    const files = getAllRFCFiles();
    return files.map(file => ({
      slug: file.replace(/\.mdx?$/, '').split('/'),
    }));
  },

  getAllPages(): RFCPage[] {
    const files = getAllRFCFiles();
    return files
      .map(readRFCFile)
      .filter((page): page is RFCPage => page !== null)
      .sort((a, b) => getRFCNumber(a) - getRFCNumber(b));
  },

  getPagesByStatus(status: string): RFCPage[] {
    return this.getAllPages().filter(
      page => page.data.frontmatter.status?.toLowerCase() === status.toLowerCase()
    );
  },

  getPagesByType(type: string): RFCPage[] {
    return this.getAllPages().filter(
      page => page.data.frontmatter.type?.toLowerCase() === type.toLowerCase()
    );
  },

  getPagesByCategory(category: string): RFCPage[] {
    return this.getAllPages().filter(
      page => page.data.frontmatter.category?.toLowerCase() === category.toLowerCase()
    );
  },

  getPagesByTag(tag: string): RFCPage[] {
    const tagLower = tag.toLowerCase();
    return this.getAllPages().filter(page => {
      const tags = page.data.frontmatter.tags || [];
      return tags.some((t: string) => t.toLowerCase() === tagLower);
    });
  },

  getAllTags(): string[] {
    const tags = new Set<string>();
    this.getAllPages().forEach(page => {
      (page.data.frontmatter.tags || []).forEach((tag: string) => tags.add(tag));
    });
    return Array.from(tags).sort();
  },

  getCategorizedPages(): RFCCategory[] {
    const allPages = this.getAllPages();

    return RFC_CATEGORIES.map(cat => ({
      ...cat,
      description: cat.shortDesc,
      rfcs: allPages.filter(page => {
        const rfcNum = getRFCNumber(page);
        return rfcNum >= cat.range[0] && rfcNum <= cat.range[1];
      }),
    })).filter(cat => cat.rfcs.length > 0);
  },

  getAllCategories(): RFCCategory[] {
    const allPages = this.getAllPages();

    return RFC_CATEGORIES.map(cat => ({
      ...cat,
      description: cat.shortDesc,
      rfcs: allPages.filter(page => {
        const rfcNum = getRFCNumber(page);
        return rfcNum >= cat.range[0] && rfcNum <= cat.range[1];
      }),
    }));
  },

  getCategoryByName(name: string): CategoryConfig | undefined {
    return RFC_CATEGORIES.find(cat => cat.name.toLowerCase() === name.toLowerCase());
  },

  getCategoryBySlug(slug: string): RFCCategory | undefined {
    const allPages = this.getAllPages();
    const cat = RFC_CATEGORIES.find(c => c.slug === slug);
    if (!cat) return undefined;

    return {
      ...cat,
      description: cat.shortDesc,
      rfcs: allPages.filter(page => {
        const rfcNum = getRFCNumber(page);
        return rfcNum >= cat.range[0] && rfcNum <= cat.range[1];
      }),
    };
  },

  getAllCategorySlugs(): string[] {
    return RFC_CATEGORIES.map(cat => cat.slug);
  },

  getStats(): { total: number; byStatus: Record<string, number>; byType: Record<string, number> } {
    const pages = this.getAllPages();
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};

    pages.forEach(page => {
      const status = page.data.frontmatter.status || 'Unknown';
      const type = page.data.frontmatter.type || 'Unknown';
      byStatus[status] = (byStatus[status] || 0) + 1;
      byType[type] = (byType[type] || 0) + 1;
    });

    return { total: pages.length, byStatus, byType };
  },

  getPageTree() {
    const categories = this.getCategorizedPages();
    const shortName = config.shortName;

    return {
      name: config.name,
      children: [
        {
          type: 'page' as const,
          name: 'Overview',
          url: '/docs',
        },
        ...categories.map(cat => ({
          type: 'folder' as const,
          name: cat.name,
          description: cat.description,
          children: cat.rfcs.slice(0, 20).map(rfc => {
            const rfcNum = getRFCNumber(rfc);
            return {
              type: 'page' as const,
              name: `${shortName}-${rfcNum}: ${rfc.data.title.substring(0, 40)}${rfc.data.title.length > 40 ? '...' : ''}`,
              url: `/docs/${rfc.slug.join('/')}`,
            };
          }),
        })),
      ],
    };
  },

  search(query: string): RFCPage[] {
    const q = query.toLowerCase();
    return this.getAllPages().filter(page => {
      const title = page.data.title.toLowerCase();
      const description = (page.data.description || '').toLowerCase();
      const content = page.data.content.toLowerCase();
      const tags = (page.data.frontmatter.tags || []).join(' ').toLowerCase();

      return title.includes(q) || description.includes(q) || content.includes(q) || tags.includes(q);
    });
  },
};

// Re-export types for compatibility
export type LPMetadata = RFCMetadata;
export type LPPage = RFCPage;
export type LPCategory = RFCCategory;
export type CategoryMeta = CategoryConfig;
