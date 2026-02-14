/**
 * Lux Proposals (LPs) Configuration
 * For: lps.lux.network
 */
import type { RFCConfig } from '../rfc.config';

const config: RFCConfig = {
  name: 'Lux Proposals',
  shortName: 'LP',
  title: 'Lux Proposals (LPs) - Quantum-Safe Blockchain Standards',
  description: 'Technical standards and improvement proposals for the Lux Network blockchain ecosystem.',

  baseUrl: 'https://lps.lux.network',
  repoUrl: 'https://github.com/luxfi/lps',
  discussionsUrl: 'https://github.com/luxfi/lps/discussions',
  forumUrl: 'https://lux.forum',
  helpUrl: 'https://lux.help',
  docsUrl: 'https://docs.lux.network',

  github: {
    org: 'luxfi',
    repo: 'lps',
    branch: 'main',
    discussionsEnabled: true,
  },

  rfcDir: '../LPs',
  filePrefix: 'lp-',

  categories: [
    {
      slug: 'core',
      name: 'Core Architecture',
      shortDesc: 'Network fundamentals',
      description: 'Foundational specifications for Lux Network.',
      range: [0, 99],
      icon: 'layers',
      color: 'blue',
      keyTopics: ['Network topology', 'Node specs', 'Multi-chain'],
    },
    {
      slug: 'consensus',
      name: 'Consensus',
      shortDesc: 'Consensus protocols',
      description: 'Snowman, Avalanche, and quantum consensus mechanisms.',
      range: [100, 199],
      icon: 'consensus',
      color: 'purple',
      keyTopics: ['Snowman', 'Avalanche', 'BFT', 'Finality'],
    },
    {
      slug: 'cryptography',
      name: 'Cryptography',
      shortDesc: 'Cryptographic standards',
      description: 'Post-quantum cryptography and security primitives.',
      range: [200, 299],
      icon: 'lock',
      color: 'emerald',
      keyTopics: ['ML-KEM', 'ML-DSA', 'SLH-DSA', 'ZK proofs'],
    },
    {
      slug: 'tokens',
      name: 'Token Standards',
      shortDesc: 'LRC token specs',
      description: 'Fungible and non-fungible token standards.',
      range: [300, 399],
      icon: 'token',
      color: 'amber',
      keyTopics: ['LRC-20', 'LRC-721', 'LRC-1155'],
    },
    {
      slug: 'defi',
      name: 'DeFi',
      shortDesc: 'Decentralized finance',
      description: 'AMMs, lending, and DeFi primitives.',
      range: [400, 499],
      icon: 'chart',
      color: 'green',
      keyTopics: ['AMM', 'Lending', 'Liquid staking'],
    },
    {
      slug: 'governance',
      name: 'Governance',
      shortDesc: 'On-chain governance',
      description: 'DAO governance and voting mechanisms.',
      range: [500, 599],
      icon: 'vote',
      color: 'indigo',
      keyTopics: ['Proposals', 'Voting', 'Treasury'],
    },
    {
      slug: 'upgrades',
      name: 'Network Upgrades',
      shortDesc: 'Protocol upgrades',
      description: 'Hard forks and feature activations.',
      range: [600, 699],
      icon: 'upgrade',
      color: 'orange',
      keyTopics: ['Hard forks', 'Migrations'],
    },
    {
      slug: 'research',
      name: 'Research',
      shortDesc: 'Research & innovation',
      description: 'Cutting-edge research and experimental protocols.',
      range: [700, 799],
      icon: 'research',
      color: 'pink',
      keyTopics: ['Quantum security', 'Scalability'],
    },
  ],

  branding: {
    primaryColor: 'blue',
  },

  theme: {
    storageKey: 'lux-lps-theme',
    defaultTheme: 'system',
  },

  footer: {
    sections: [
      {
        title: 'Categories',
        links: [
          { label: 'Core Architecture', href: '/docs/?type=core' },
          { label: 'Consensus', href: '/docs/?type=consensus' },
          { label: 'Cryptography', href: '/docs/?type=cryptography' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'All LPs', href: '/docs/' },
          { label: 'Developer Docs', href: 'https://docs.lux.network', external: true },
          { label: 'Discussion Forum', href: 'https://lux.forum', external: true },
        ],
      },
    ],
    copyright: 'Lux Network',
    socials: [
      { platform: 'github', href: 'https://github.com/luxfi' },
      { platform: 'twitter', href: 'https://twitter.com/luxnetwork' },
      { platform: 'discord', href: 'https://discord.gg/luxnetwork' },
    ],
  },
};

export default config;
