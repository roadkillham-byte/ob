import { Section, SectionHeading } from '@/components/Section';
import { copy, sections, site } from '@/content/site';

/**
 * A plain form POST to Buttondown. No JavaScript, no route handler, no
 * dependency — submitting navigates to Buttondown's own confirmation page.
 */
export function EmailCapture() {
  return (
    <Section id={sections.email.id} token={sections.email.token}>
      <SectionHeading>{sections.email.heading}</SectionHeading>

      <form
        action={`https://buttondown.com/api/emails/embed-subscribe/${site.buttondownUsername}`}
        method="post"
        className="mt-6 flex flex-col gap-3 sm:flex-row"
      >
        <label htmlFor="bd-email" className="sr-only">
          {copy.emailLabel}
        </label>
        <input
          id="bd-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder={copy.emailPlaceholder}
          className="border-syntax/35 bg-vellum text-obsidian placeholder:text-syntax/70 focus:border-wikilink w-full rounded-[3px] border px-4 py-3 sm:max-w-xs"
        />
        {/* Buttondown uses this to answer with a human-readable confirmation
            page instead of a JSON API response. Required for a JS-free form. */}
        <input type="hidden" name="embed" value="1" />
        <button
          type="submit"
          className="bg-obsidian text-paper font-display hover:bg-wikilink rounded-[3px] px-5 py-3 text-sm transition-colors"
        >
          {copy.emailButton}
        </button>
      </form>

      <p className="mt-4 leading-relaxed text-pretty">{copy.emailNote}</p>
    </Section>
  );
}
