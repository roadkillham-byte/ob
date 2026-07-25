# CLAUDE.md

Project instructions. Read this fully before writing any code.

## What this project is

A single-page marketing site for a small store selling Obsidian vault templates. Checkout is hosted externally on Gumroad. This repo contains the storefront only.

## What success looks like

A visitor lands, understands what an Obsidian vault template is and why this one is worth paying for, watches a short demo, and then either clicks through to Gumroad or leaves an email address. That's the entire job of this site. Anything that doesn't serve one of those two outcomes is out of scope.

## Stack

- Next.js (App Router), TypeScript
- Tailwind CSS
- Deployed to Vercel via GitHub integration
- Static generation only

## Hard constraints

These are not preferences. Ask before violating any of them.

- Do not add a dependency without asking, and justify each one when you do.
- Do not build a cart, checkout, or payment flow. Gumroad handles all of it. The buy button is an outbound link.
- No database, no auth, no CMS, no admin panel.
- No blog, docs section, or multi-page navigation until I explicitly ask for it.
- No SSR and no client-side data fetching. Everything is static at build time.
- Keep the JS bundle small enough that Lighthouse mobile performance stays above 95.

## Content architecture

All copy, product data, and outbound links live in a single file: `content/site.ts`, typed with exported interfaces. Components read from it and contain no hardcoded copy. I should be able to add a second product by editing one file and nothing else.

Rough shape to start from:

```ts
export interface Product {
  id: string;
  name: string;
  tagline: string;
  priceUSD: number;
  gumroadUrl: string;
  demoVideo: string;      // path in /public
  includes: string[];
  requiredPlugins: string[];
  obsidianMinVersion: string;
}
```

## Page structure

One route, `/`. Sections in this order:

1. Hero — headline, subhead, primary CTA to Gumroad, secondary anchor down to the demo.
2. Demo — the screen capture. Self-hosted MP4 in `/public` with a poster frame. No autoplay with sound. Controls visible.
3. What's included — rendered from `includes[]`.
4. Requirements — Obsidian version and plugins needed. This goes before the buy section, deliberately. A refund from a surprised buyer costs more than a lost sale.
5. Buy — price, Gumroad button, licence terms stated in plain language.
6. Email capture — one field, one button, one line of copy about what they'll receive.
7. Footer — contact, licence, refund policy.

## Design brief

No visual direction is locked in. Make a real choice, state it, and defend it before building.

Things to avoid, because they are the current defaults rather than decisions: a cream background near `#F4F1EA` with a high-contrast serif display and a terracotta accent; a near-black page with one bright acid accent; hairline-ruled broadsheet columns; and `01 / 02 / 03` numbered section markers where the content isn't actually a sequence.

The source material is the subject's own world. Obsidian is plain-text markdown, local files, backlinks, monospace, a graph of connected notes. Something in the design should be true to that. But a graph-view background is the first idea anyone has, so either earn it or skip it.

Deliverable before any code: 4–6 named hex values, two typefaces (one display used with restraint, one body), a layout concept, and one signature element the page will be remembered for. Write the palette and type into the Tailwind config as tokens and derive every subsequent decision from them.

## Quality floor

Meet these without announcing them:

- Responsive down to 375px
- Visible keyboard focus states on every interactive element
- `prefers-reduced-motion` respected
- Real `<title>`, meta description, and OG image
- All images through `next/image` with explicit dimensions

## Email capture

Ask me which provider before building this. Reasonable options are Buttondown, ConvertKit, or Resend behind a route handler. Do not roll a custom solution that writes to a file or to local storage.

## Analytics

Vercel Analytics only. No Google Analytics, no third-party trackers, no cookie banner.
