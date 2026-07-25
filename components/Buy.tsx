import { Section, SectionHeading } from '@/components/Section';
import { copy, product, sections } from '@/content/site';

export function Buy() {
  return (
    <Section id={sections.buy.id} token={sections.buy.token}>
      <SectionHeading>{sections.buy.heading}</SectionHeading>

      <div className="border-wikilink/30 mt-6 border-l-2 pl-5 md:pl-6">
        <p className="font-display text-price">
          ${product.priceUSD}{' '}
          <span className="text-syntax text-base">{copy.buyPriceSuffix}</span>
        </p>

        <a
          href={product.gumroadUrl}
          className="bg-wikilink text-paper font-display hover:bg-obsidian mt-6 inline-block rounded-[3px] px-5 py-3 text-sm transition-colors"
        >
          {copy.buyCta} →
        </a>

        <p className="font-display text-syntax mt-4 text-xs">{copy.buyNote}</p>

        <ul className="mt-6 space-y-2">
          {product.licence.map((line) => (
            <li key={line} className="leading-relaxed text-pretty">
              {line}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
