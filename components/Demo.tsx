import { Section, SectionHeading } from '@/components/Section';
import { copy, product, sections } from '@/content/site';

const fileName = product.demoVideo.replace(/^\//, '');

export function Demo() {
  return (
    <Section id={sections.demo.id} token={sections.demo.token}>
      {/* The poster is the LCP element on mobile, and a `poster` attribute is
          fetched at low priority by default. React hoists this into <head>. */}
      <link
        rel="preload"
        as="image"
        href={product.demoPoster}
        fetchPriority="high"
      />

      <SectionHeading>{sections.demo.heading}</SectionHeading>

      <video
        className="border-syntax/25 bg-vellum mt-6 h-auto w-full rounded-[3px] border"
        controls
        preload="none"
        playsInline
        poster={product.demoPoster}
        width={product.demoWidth}
        height={product.demoHeight}
      >
        <source src={product.demoVideo} type="video/mp4" />
      </video>

      <p className="font-display text-syntax mt-3 text-xs">
        {fileName} · {product.demoDuration} · {copy.demoCaption}
      </p>
    </Section>
  );
}
