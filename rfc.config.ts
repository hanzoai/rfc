/**
 * RFC Site Configuration
 *
 * Customize this file for your RFC documentation site.
 * Works with LPs, HIPs, ZIPs, or any proposal-style documentation.
 */

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: 'github' | 'twitter' | 'discord' | 'telegram' | 'youtube' | 'linkedin' | 'website';
  href: string;
  label?: string;
}

export interface RFCConfig {
  // Site identity
  name: string;
  shortName: string;  // e.g., "LP", "HIP", "ZIP"
  title: string;
  description: string;

  // URLs
  baseUrl: string;
  repoUrl: string;
  forumUrl?: string;
  helpUrl?: string;
  docsUrl?: string;

  // Directory containing RFC markdown files (relative to project root)
  rfcDir: string;

  // File pattern for RFC files (e.g., "lp-" for lp-0001.md)
  filePrefix: string;

  // Categories with number ranges
  categories: CategoryConfig[];

  // Branding
  branding: {
    primaryColor: string;
    logo?: string;  // Path to logo component or image
  };

  // Theme configuration
  theme: {
    storageKey: string;
    defaultTheme: 'light' | 'dark' | 'system';
  };

  // Footer configuration
  footer: {
    sections: FooterSection[];
    copyright: string;
    socials: SocialLink[];
  };
}

export interface CategoryConfig {
  slug: string;
  name: string;
  shortDesc: string;
  description: string;
  range: [number, number];
  icon: string;
  color: string;
  learnMore?: string;
  keyTopics?: string[];
}

/**
 * Default configuration - customize for your project
 */
const config: RFCConfig = {
  // Site identity
  name: 'Proposals',
  shortName: 'RFC',
  title: 'RFC Documentation',
  description: 'Improvement proposals and standards documentation',

  // URLs
  baseUrl: 'https://rfc.example.com',
  repoUrl: 'https://github.com/example/rfc',
  forumUrl: 'https://forum.example.com',
  helpUrl: 'https://help.example.com',

  // Directory containing RFC markdown files
  rfcDir: '../RFCs',  // Relative to docs folder

  // File pattern prefix
  filePrefix: 'rfc-',

  // Categories with number ranges
  categories: [
    {
      slug: 'core',
      name: 'Core',
      shortDesc: 'Core specifications',
      description: 'Foundational specifications and protocols.',
      range: [0, 99],
      icon: 'layers',
      color: 'blue',
      keyTopics: ['Architecture', 'Protocols', 'Standards'],
    },
    {
      slug: 'networking',
      name: 'Networking',
      shortDesc: 'Network protocols',
      description: 'Network layer specifications and protocols.',
      range: [100, 199],
      icon: 'network',
      color: 'purple',
      keyTopics: ['P2P', 'Transport', 'Discovery'],
    },
    {
      slug: 'interface',
      name: 'Interface',
      shortDesc: 'API specifications',
      description: 'Interface and API specifications.',
      range: [200, 299],
      icon: 'code',
      color: 'green',
      keyTopics: ['APIs', 'RPC', 'SDKs'],
    },
  ],

  // Branding
  branding: {
    primaryColor: 'blue',
  },

  // Theme
  theme: {
    storageKey: 'rfc-theme',
    defaultTheme: 'system',
  },

  // Footer
  footer: {
    sections: [
      {
        title: 'Categories',
        links: [
          { label: 'Core', href: '/docs/?type=core' },
          { label: 'Networking', href: '/docs/?type=networking' },
          { label: 'Interface', href: '/docs/?type=interface' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'All Proposals', href: '/docs/' },
          { label: 'Developer Docs', href: 'https://docs.example.com', external: true },
          { label: 'Help Center', href: 'https://help.example.com', external: true },
          { label: 'Discussion Forum', href: 'https://forum.example.com', external: true },
        ],
      },
      {
        title: 'Community',
        links: [
          { label: 'GitHub', href: 'https://github.com/example/rfc', external: true },
          { label: 'Discord', href: 'https://discord.gg/example', external: true },
          { label: 'Twitter', href: 'https://twitter.com/example', external: true },
        ],
      },
    ],
    copyright: 'Example Organization',
    socials: [
      { platform: 'github', href: 'https://github.com/example' },
      { platform: 'twitter', href: 'https://twitter.com/example' },
      { platform: 'discord', href: 'https://discord.gg/example' },
    ],
  },
};

export default config;

// Re-export for type-safe access
export { config };
