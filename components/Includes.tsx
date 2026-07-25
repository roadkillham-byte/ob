import { Section, SectionHeading } from '@/components/Section';
import { product, sections } from '@/content/site';

export function Includes() {
  return (
    <Section id={sections.includes.id} token={sections.includes.token}>
      <SectionHeading>{sections.includes.heading}</SectionHeading>

      <ul className="mt-6 space-y-3.5">
        {product.includes.map((item) => (
          <li
            key={item}
            className="grid grid-cols-[2.1rem_minmax(0,1fr)] items-baseline"
          >
            <span
              aria-hidden="true"
              className="font-display text-wikilink text-sm"
            >
              [x]
            </span>
            <span className="leading-relaxed text-pretty">{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
