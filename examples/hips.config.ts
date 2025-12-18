/**
 * Hanzo Improvement Proposals (HIPs) Configuration
 * For: hips.hanzo.ai
 */
import type { RFCConfig } from '../rfc.config';

const config: RFCConfig = {
  name: 'Hanzo Improvement Proposals',
  shortName: 'HIP',
  title: 'HIPs - Hanzo AI Platform Standards',
  description: 'Improvement proposals for the Hanzo AI platform and infrastructure.',

  baseUrl: 'https://hips.hanzo.ai',
  repoUrl: 'https://github.com/hanzoai/hips',
  forumUrl: 'https://forum.hanzo.ai',
  helpUrl: 'https://hanzo.ai/docs',

  rfcDir: '../HIPs',
  filePrefix: 'hip-',

  categories: [
    {
      slug: 'core',
      name: 'Core Platform',
      shortDesc: 'Platform fundamentals',
      description: 'Core platform architecture and infrastructure.',
      range: [0, 99],
      icon: 'layers',
      color: 'blue',
      keyTopics: ['Architecture', 'Infrastructure', 'APIs'],
    },
    {
      slug: 'llm',
      name: 'LLM Infrastructure',
      shortDesc: 'LLM standards',
      description: 'Large language model serving and optimization.',
      range: [100, 199],
      icon: 'brain',
      color: 'purple',
      keyTopics: ['Inference', 'Fine-tuning', 'Serving'],
    },
    {
      slug: 'mcp',
      name: 'Model Context Protocol',
      shortDesc: 'MCP standards',
      description: 'MCP servers, tools, and context management.',
      range: [200, 299],
      icon: 'plug',
      color: 'emerald',
      keyTopics: ['Servers', 'Tools', 'Resources'],
    },
    {
      slug: 'agents',
      name: 'Agent Framework',
      shortDesc: 'Agent standards',
      description: 'AI agent orchestration and capabilities.',
      range: [300, 399],
      icon: 'bot',
      color: 'amber',
      keyTopics: ['Agents', 'Orchestration', 'Tools'],
    },
    {
      slug: 'jin',
      name: 'Jin Architecture',
      shortDesc: 'Jin multimodal',
      description: 'Unified multimodal AI architecture.',
      range: [400, 499],
      icon: 'eye',
      color: 'pink',
      keyTopics: ['Vision', 'Audio', 'Multimodal'],
    },
    {
      slug: 'aci',
      name: 'AI Chain',
      shortDesc: 'ACI standards',
      description: 'AI blockchain and compute infrastructure.',
      range: [500, 599],
      icon: 'blocks',
      color: 'indigo',
      keyTopics: ['Compute', 'Verification', 'Consensus'],
    },
  ],

  branding: {
    primaryColor: 'purple',
  },

  theme: {
    storageKey: 'hanzo-hips-theme',
    defaultTheme: 'system',
  },

  footer: {
    sections: [
      {
        title: 'Categories',
        links: [
          { label: 'Core Platform', href: '/docs/?type=core' },
          { label: 'LLM Infrastructure', href: '/docs/?type=llm' },
          { label: 'Agent Framework', href: '/docs/?type=agents' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'All HIPs', href: '/docs/' },
          { label: 'Developer Docs', href: 'https://hanzo.ai/docs', external: true },
          { label: 'Discussion Forum', href: 'https://forum.hanzo.ai', external: true },
        ],
      },
    ],
    copyright: 'Hanzo AI',
    socials: [
      { platform: 'github', href: 'https://github.com/hanzoai' },
      { platform: 'twitter', href: 'https://twitter.com/hanaboratory' },
      { platform: 'discord', href: 'https://discord.gg/hanzo' },
    ],
  },
};

export default config;
