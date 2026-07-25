import { Gutter, Mark } from '@/components/Section';
import { hero, product, sections } from '@/content/site';

export function Hero() {
  return (
    <header className="grid grid-cols-1 gap-y-2 pt-10 pb-14 md:grid-cols-[var(--gutter)_minmax(0,1fr)] md:gap-y-0 md:pt-16 md:pb-20">
      <Gutter token="#" />
      <div className="max-w-column">
        <h1 className="font-display text-hero">
          {hero.headlineLead}
          <br />
          {hero.headlineRest}
        </h1>

        <p className="mt-7 text-lg leading-relaxed text-pretty md:text-xl">
          {hero.subheadLead}
          <Mark>{hero.subheadMark}</Mark>
          {hero.subheadRest}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
          <a
            href={product.gumroadUrl}
            className="bg-wikilink text-paper font-display hover:bg-obsidian rounded-[3px] px-5 py-3 text-sm transition-colors"
          >
            {hero.primaryCta}
            {product.priceUSD}
          </a>
          <a
            href={`#${sections.demo.id}`}
            className="font-display text-syntax hover:text-obsidian text-sm underline decoration-1 underline-offset-4 transition-colors"
          >
            {hero.secondaryCta} ↓
          </a>
        </div>
      </div>
    </header>
  );
}
