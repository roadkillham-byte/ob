import { copy, site } from '@/content/site';

export function Footer() {
  return (
    <footer className="bg-obsidian text-paper mt-10">
      <div className="mx-auto grid w-full max-w-[calc(var(--gutter)+var(--container-column))] grid-cols-1 gap-8 px-5 py-14 md:grid-cols-[var(--gutter)_minmax(0,1fr)] md:gap-0 md:px-8">
        <div aria-hidden="true" className="font-display text-paper/40 text-sm md:pr-6 md:text-right">
          ---
        </div>
        <dl className="max-w-column space-y-6 text-sm">
          <div>
            <dt className="font-display text-paper/50 text-xs">
              {copy.footerContact}
            </dt>
            <dd className="mt-1">
              <a
                href={`mailto:${site.contactEmail}`}
                className="underline decoration-1 underline-offset-4"
              >
                {site.contactEmail}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-display text-paper/50 text-xs">
              {copy.footerLicence}
            </dt>
            <dd className="mt-1 leading-relaxed">{site.footerLicence}</dd>
          </div>
          <div>
            <dt className="font-display text-paper/50 text-xs">
              {copy.footerRefunds}
            </dt>
            <dd className="mt-1 leading-relaxed">{site.refundPolicy}</dd>
          </div>
        </dl>
      </div>
    </footer>
  );
}
