# HSC Vault — storefront

Single-page marketing site for the HSC Vault, an Obsidian study system. Checkout
is Gumroad's; this repo is the storefront only. Every route is generated at
build time.

Product facts on the page — Obsidian version, plugins, contents — are drawn from
the shipped vault's own notes. If the vault changes, `content/site.ts` has to
change with it.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static generation
npm run lint    # tsc --noEmit
```

## Design: "Source and Render"

The page is a rendered markdown document that keeps its own syntax visible in the
margin — the Live Preview duality, which is closer to what Obsidian actually is
than a graph view. The signature element is the **hanging syntax gutter**: a
fixed column to the left of the reading measure carrying the real markdown token
for the block beside it (`#`, `![[`, `- [x]`, `---`, `>`, `- [ ]`). Sections are
divided by the token changing, not by rules or numbers. Below `md` the gutter
collapses to an inline prefix.

Requirements are rendered as a genuine YAML frontmatter block, because that is
how a vault template declares its dependencies.

Tokens live in the `@theme` block in `app/globals.css` and everything derives
from them.

| Token | Hex | Role |
| --- | --- | --- |
| `obsidian` | `#1B1A22` | body text, footer ground |
| `paper` | `#EDEDF1` | page ground |
| `vellum` | `#F9F9FB` | raised surfaces |
| `wikilink` | `#4F3FCF` | links and CTAs (6.0:1 on paper) |
| `syntax` | `#635F7C` | gutter tokens, metadata (5.1:1 on paper) |
| `mark` | `#E9E3A8` | `==highlight==`, one phrase per section |

Type: **JetBrains Mono** as the display face (hero, headings, gutter, buttons,
price — three sizes only) and **Literata** for body prose. Both via
`next/font/google`, self-hosted at build with no layout shift.

## Content

All copy, product data and outbound links live in `content/site.ts`. Components
contain no hardcoded strings. Adding a second product means adding an entry to
`products` and nothing else.

## Placeholders to replace

`content/site.ts` is marked with `TODO` at each one:

- `site.url` — currently the Vercel deployment URL. Swap for the custom domain
  when there is one; it drives canonical, `metadataBase` and the OG/Twitter tags,
  and must always match wherever the site actually serves from.
- `site.contactEmail` — the vault's own README has the same gap (`[YOUR EMAIL]`)
- `site.refundPolicy` — the vault's README says `[NUMBER] days`, the site says
  14. The two must agree before anyone buys.
- `public/demo.mp4` and `public/demo-poster.webp` — placeholders at 1600×900.
  Replace both, and update `demoWidth`/`demoHeight`/`demoDuration` if the real
  capture differs.

Already real: the Buttondown username, the Gumroad link, the price, and every
product fact in `includes[]`, `requiredPlugins`, `optionalPlugins` and
`obsidianMinVersion`.

`public/og.png` is generated at 1200×630 and matches the palette; regenerate it
if the name or tagline changes.

## Dependencies

`next`, `react`, `react-dom`, and `@vercel/analytics` (the analytics choice in
CLAUDE.md). Dev: `typescript`, `tailwindcss`, `@tailwindcss/postcss` and types.
Nothing else.
