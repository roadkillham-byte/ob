/**
 * Every word of copy, all product data and all outbound links live in this file.
 * Components read from it and contain no hardcoded strings.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * TODO — PLACEHOLDER VALUES. Replace before this site goes near a real visitor.
 * Each one is marked `TODO` inline as well.
 *
 *   site.url                  real domain (drives canonical + OG tags)
 *   site.contactEmail         real inbox
 *   product.tagline           the real one-line promise
 *   product.priceUSD          the real price — must match Gumroad exactly
 *   product.includes          the real contents of the vault
 *   product.requiredPlugins   the real plugin list
 *   product.obsidianMinVersion  the real minimum version you have tested
 *   product.demoVideo/Poster  real screen capture (placeholders ship in /public)
 *
 * Adding a second product means adding an entry to `products` and nothing else.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface Product {
  id: string;
  name: string;
  tagline: string;
  priceUSD: number;
  gumroadUrl: string;
  /** Path in /public. */
  demoVideo: string;
  /** Poster frame shown before playback. Path in /public. */
  demoPoster: string;
  /** Intrinsic pixel dimensions of the capture, used to reserve layout space. */
  demoWidth: number;
  demoHeight: number;
  /** Human-readable running time, shown in the caption. */
  demoDuration: string;
  includes: string[];
  requiredPlugins: string[];
  obsidianMinVersion: string;
  /** Licence terms, in plain language. One string per line. */
  licence: string[];
}

/** The markdown token shown in the gutter beside each section. */
export interface Section {
  id: string;
  token: string;
  heading: string;
}

export interface Site {
  /** No trailing slash. Drives canonical, OG and Twitter URLs. */
  url: string;
  title: string;
  description: string;
  ogImage: string;
  /** Shown top-left, as a file path. */
  fileName: string;
  contactEmail: string;
  buttondownUsername: string;
  refundPolicy: string;
  footerLicence: string;
}

export const site: Site = {
  // TODO: swap for the custom domain when there is one. Until then this must
  // match the live deployment — a canonical pointing at a domain that does not
  // resolve tells search engines the real page is somewhere else, and every
  // OG/Twitter card resolves against it.
  url: 'https://ob-beta.vercel.app',
  title: 'Second Draft — an Obsidian vault template for finishing what you start',
  description:
    'A pre-built Obsidian vault that turns scattered notes into finished writing. Opinionated structure, working Dataview queries, no setup afternoon.',
  ogImage: '/og.png',
  fileName: 'second-draft.md',
  contactEmail: 'hello@second-draft.example.com', // TODO: real inbox
  buttondownUsername: 'roadkillham',
  refundPolicy:
    'Refunds within 14 days, no questions asked. Email me and I will send the money back.',
  footerLicence: 'One licence per person. Use it in as many vaults as you like.',
};

export const hero = {
  /** Split so the marked phrase can be highlighted without HTML in the copy. */
  headlineLead: 'Second',
  headlineRest: 'Draft',
  subheadLead: 'A pre-built Obsidian vault for people whose notes are ',
  subheadMark: 'full of unfinished writing.',
  subheadRest: '',
  primaryCta: 'Buy — $',
  secondaryCta: 'Watch the demo',
};

export const sections: Record<
  'demo' | 'includes' | 'requirements' | 'buy' | 'email',
  Section
> = {
  demo: { id: 'demo', token: '![[', heading: 'Demo' },
  includes: { id: 'includes', token: '- [x]', heading: "What's included" },
  requirements: { id: 'requirements', token: '---', heading: 'Requirements' },
  buy: { id: 'buy', token: '>', heading: 'Buy' },
  email: { id: 'email', token: '- [ ]', heading: 'Stay in touch' },
};

export const copy = {
  demoCaption: 'No sound. Nothing sped up.',
  requirementsNote:
    'Without these plugins the dashboards render as empty code blocks. The notes themselves are plain markdown and will always open anywhere.',
  requirementsObsidianKey: 'obsidian',
  requirementsPluginsKey: 'plugins',
  buyPriceSuffix: 'one-time',
  buyCta: 'Get Second Draft on Gumroad',
  buyNote: 'Checkout is handled by Gumroad. You get the vault as a .zip, immediately.',
  emailLabel: 'Email address',
  emailPlaceholder: 'you@example.com',
  emailButton: 'Subscribe',
  emailNote:
    'Occasional notes on the templates, and a message when a new one is ready. Nothing else, and you can leave in one click.',
  footerContact: 'Contact',
  footerLicence: 'Licence',
  footerRefunds: 'Refunds',
};

export const products: Product[] = [
  {
    id: 'second-draft',
    name: 'Second Draft',
    tagline:
      'An opinionated Obsidian vault that moves an idea from a stray note to a finished piece.', // TODO: real tagline
    // TODO: must match the price on the Gumroad page exactly. This number is
    // only what the site advertises; Gumroad is what actually charges.
    priceUSD: 29,
    gumroadUrl: 'https://roadkillhamster.gumroad.com/l/vhkzh',
    demoVideo: '/demo.mp4',
    demoPoster: '/demo-poster.webp',
    demoWidth: 1600,
    demoHeight: 900,
    demoDuration: '1:40',
    includes: [
      // TODO: replace with the real contents of the vault
      'A structured vault: inbox, drafts, sources, published',
      'Daily and weekly note templates wired to the drafting workflow',
      'A Dataview dashboard showing every draft and where it is stuck',
      'A source-capture template with citation fields',
      'Twelve prompts for turning a note into an outline',
      'A written walkthrough of the workflow the vault assumes',
    ],
    requiredPlugins: ['dataview', 'templater'], // TODO: real plugin list
    obsidianMinVersion: '1.5.0', // TODO: version you have actually tested
    licence: [
      'Yours to keep and to edit however you want.',
      'Please do not resell or redistribute the vault itself.',
    ],
  },
];

export const product: Product = products[0];
