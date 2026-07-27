import { Section, SectionHeading } from '@/components/Section';
import { copy, product, sections } from '@/content/site';

/**
 * Rendered as a YAML frontmatter block, because that is how a vault declares
 * what it depends on.
 */
export function Requirements() {
  return (
    <Section id={sections.requirements.id} token={sections.requirements.token}>
      <SectionHeading>{sections.requirements.heading}</SectionHeading>

      <pre className="border-syntax/25 bg-vellum font-display mt-6 overflow-x-auto rounded-[3px] border p-5 text-sm leading-relaxed">
        <code>
          <span className="text-syntax">---</span>
          {'\n'}
          <span className="text-syntax">{copy.requirementsObsidianKey}:</span>{' '}
          &quot;&gt;= {product.obsidianMinVersion}&quot;{'\n'}
          <span className="text-syntax">{copy.requirementsPluginsKey}:</span>{' '}
          <span className="text-syntax">
            # {copy.requirementsPluginsComment}
          </span>
          {'\n'}
          {product.requiredPlugins.map((plugin) => (
            <span key={plugin}>
              {'  '}
              <span className="text-syntax">-</span> {plugin}
              {'\n'}
            </span>
          ))}
          <span className="text-syntax">{copy.requirementsCommunityKey}:</span>{' '}
          {copy.requirementsCommunityValue}
          {'\n'}
          <span className="text-syntax">{copy.requirementsOptionalKey}:</span>{' '}
          <span className="text-syntax">
            # {copy.requirementsOptionalComment}
          </span>
          {'\n'}
          {product.optionalPlugins.map((plugin) => (
            <span key={plugin}>
              {'  '}
              <span className="text-syntax">-</span> {plugin}
              {'\n'}
            </span>
          ))}
          <span className="text-syntax">---</span>
        </code>
      </pre>

      <p className="mt-5 leading-relaxed text-pretty">{copy.requirementsNote}</p>
    </Section>
  );
}
