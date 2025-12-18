/**
 * Zoo Improvement Proposals (ZIPs) Configuration
 * For: zips.zoo.ngo
 */
import type { RFCConfig } from '../rfc.config';

const config: RFCConfig = {
  name: 'Zoo Improvement Proposals',
  shortName: 'ZIP',
  title: 'ZIPs - Zoo Labs Foundation Standards',
  description: 'Improvement proposals for the Zoo decentralized AI research network.',

  baseUrl: 'https://zips.zoo.ngo',
  repoUrl: 'https://github.com/zoo-labs/zips',
  forumUrl: 'https://forum.zoo.ngo',
  helpUrl: 'https://zoo.ngo/docs',

  rfcDir: '../ZIPs',
  filePrefix: 'zip-',

  categories: [
    {
      slug: 'core',
      name: 'Core Infrastructure',
      shortDesc: 'Network fundamentals',
      description: 'Core network and infrastructure specifications.',
      range: [0, 99],
      icon: 'layers',
      color: 'blue',
      keyTopics: ['Infrastructure', 'Networking', 'Protocols'],
    },
    {
      slug: 'deai',
      name: 'Decentralized AI',
      shortDesc: 'DeAI standards',
      description: 'Decentralized AI training, inference, and coordination.',
      range: [100, 199],
      icon: 'brain',
      color: 'purple',
      keyTopics: ['Training', 'Inference', 'Model sharing'],
    },
    {
      slug: 'desci',
      name: 'Decentralized Science',
      shortDesc: 'DeSci protocols',
      description: 'Decentralized scientific research and publishing.',
      range: [200, 299],
      icon: 'flask',
      color: 'emerald',
      keyTopics: ['Publishing', 'Peer review', 'Funding'],
    },
    {
      slug: 'governance',
      name: 'Governance',
      shortDesc: 'DAO governance',
      description: 'Foundation governance and voting mechanisms.',
      range: [300, 399],
      icon: 'vote',
      color: 'indigo',
      keyTopics: ['Proposals', 'Voting', 'Treasury'],
    },
    {
      slug: 'tokens',
      name: 'Token Standards',
      shortDesc: 'Token specs',
      description: 'ZRC token standards for the Zoo ecosystem.',
      range: [400, 499],
      icon: 'token',
      color: 'amber',
      keyTopics: ['ZRC-20', 'ZRC-721', 'NFTs'],
    },
    {
      slug: 'research',
      name: 'Research',
      shortDesc: 'Research proposals',
      description: 'Experimental research and innovation proposals.',
      range: [500, 599],
      icon: 'research',
      color: 'pink',
      keyTopics: ['Experiments', 'Innovation', 'Prototypes'],
    },
  ],

  branding: {
    primaryColor: 'emerald',
  },

  theme: {
    storageKey: 'zoo-zips-theme',
    defaultTheme: 'system',
  },

  footer: {
    sections: [
      {
        title: 'Categories',
        links: [
          { label: 'Core Infrastructure', href: '/docs/?type=core' },
          { label: 'Decentralized AI', href: '/docs/?type=deai' },
          { label: 'Decentralized Science', href: '/docs/?type=desci' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'All ZIPs', href: '/docs/' },
          { label: 'Developer Docs', href: 'https://zoo.ngo/docs', external: true },
          { label: 'Discussion Forum', href: 'https://forum.zoo.ngo', external: true },
        ],
      },
    ],
    copyright: 'Zoo Labs Foundation',
    socials: [
      { platform: 'github', href: 'https://github.com/zoo-labs' },
      { platform: 'twitter', href: 'https://twitter.com/zoolabs' },
      { platform: 'discord', href: 'https://discord.gg/zoolabs' },
    ],
  },
};

export default config;
