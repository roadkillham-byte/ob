/**
 * Every word of copy, all product data and all outbound links live in this file.
 * Components read from it and contain no hardcoded strings.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * Content here is drawn from the shipped vault itself — its READ ME FIRST,
 * START HERE and "Setting up Obsidian" notes, and its .obsidian config. Nothing
 * below is invented. If the vault changes, change this file to match.
 *
 * TODO — still placeholder:
 *   site.url            swap for the custom domain when there is one
 *   product.demoVideo   placeholder capture in /public, and demoDuration with it
 *
 * The refund window and contact address here must stay in step with the vault's
 * own READ ME FIRST, which states both to the buyer.
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
  /** Core plugins the vault depends on. These ship enabled. */
  requiredPlugins: string[];
  /** Community plugins that help but are not needed. Nothing breaks without. */
  optionalPlugins: string[];
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
  // TODO: swap for the custom domain when there is one. Must always match
  // wherever the site actually serves from — canonical and OG resolve against it.
  url: 'https://ob-beta.vercel.app',
  title: 'HSC Vault — an Obsidian study system built on the marks you lose',
  description:
    'A pre-built Obsidian vault for HSC students. A mistake journal, a past paper log and five live dashboards, all running on core plugins. 60 notes, no setup afternoon.',
  ogImage: '/og.png',
  fileName: 'hsc-vault.md',
  contactEmail: 'Obisam123@proton.me',
  buttondownUsername: 'roadkillham',
  refundPolicy:
    'Refunds within 30 days. Email me — no form to fill in. If it is a technical problem, try me first: most take one message to fix.',
  footerLicence:
    'One licence, one person. Use it, change it, delete what you do not need, keep it forever.',
};

export const hero = {
  /** Split so the marked phrase can be highlighted without HTML in the copy. */
  headlineLead: 'HSC',
  headlineRest: 'Vault',
  subheadLead: 'An Obsidian study system built on one idea: ',
  subheadMark: 'the marks you lose are more useful than the marks you get.',
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
    'The dashboards use Bases, a core plugin that arrived in Obsidian 1.9. On anything older every note still opens — only the dashboard files will not. Nothing here needs a community plugin, and the vault ships with its core plugin settings already configured.',
  requirementsObsidianKey: 'obsidian',
  requirementsPluginsKey: 'core_plugins',
  requirementsPluginsComment: 'ship enabled',
  requirementsCommunityKey: 'community_plugins',
  requirementsCommunityValue: 'none required',
  requirementsOptionalKey: 'optional',
  requirementsOptionalComment: 'faster capture, nothing breaks without it',
  buyPriceSuffix: 'one-time',
  buyCta: 'Get the HSC Vault on Gumroad',
  buyNote:
    'Checkout is handled by Gumroad. You get the vault as a .zip, immediately. Buy once, updates free.',
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
    id: 'hsc-vault',
    name: 'HSC Vault',
    tagline:
      'A study system, not a note dump. Most students revise by re-reading what they already understand; this vault makes you revise what you got wrong.',
    priceUSD: 10,
    gumroadUrl: 'https://roadkillhamster.gumroad.com/l/vhkzh',
    demoVideo: '/demo.mp4',
    demoPoster: '/demo-poster.webp',
    demoWidth: 1600,
    demoHeight: 900,
    demoDuration: '1:40',
    includes: [
      '60 notes, 5 dashboards and a worked Chemistry example to copy from',
      'A mistake journal — one note per mistake, not per topic. This is the core of it.',
      'A past paper log, broken down question by question and linked to the mistakes each paper exposed',
      'An assessment schedule with weightings, dates, marks and what you would do differently',
      'Five live dashboards: mistakes, topics, past papers, assessments, review due',
      '12 note templates, plus 5 Templater versions of the capture templates',
      '8 exam technique notes: directive verbs, mark allocation, time allocation, the trap register',
      'Subject hubs for English, Mathematics, Biology, Chemistry and Business Studies',
      'A setup guide and a twenty-minute START HERE walkthrough',
    ],
    requiredPlugins: ['bases', 'templates', 'daily notes'],
    optionalPlugins: ['templater'],
    obsidianMinVersion: '1.9',
    licence: [
      'One licence, one person. Use it, change it, delete what you do not need, keep it forever.',
      'Please do not resell it, share the files, or post it anywhere public. It is a small operation and that genuinely matters.',
      'Everything is plain markdown on your own computer. Nothing is locked, nothing expires, nothing phones home.',
    ],
  },
];

export const product: Product = products[0];
