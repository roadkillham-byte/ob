import type { ReactNode } from 'react';

/**
 * The signature element: a hanging gutter carrying the real markdown token for
 * the block beside it. On desktop it sits outside the reading column; below the
 * `md` breakpoint it collapses to an inline prefix above the heading.
 */
export function Gutter({ token }: { token: string }) {
  return (
    <div
      aria-hidden="true"
      className="font-display text-syntax pointer-events-none text-xs select-none md:pt-2 md:pr-6 md:text-right md:text-sm"
    >
      {token}
    </div>
  );
}

export function Section({
  id,
  token,
  children,
}: {
  id: string;
  token: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="grid scroll-mt-8 grid-cols-1 gap-y-2 py-14 md:grid-cols-[var(--gutter)_minmax(0,1fr)] md:gap-y-0 md:py-20"
    >
      <Gutter token={token} />
      <div className="max-w-column">{children}</div>
    </section>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="font-display text-section">{children}</h2>;
}

/** Highlighter. One phrase per section, maximum. */
export function Mark({ children }: { children: ReactNode }) {
  return (
    <mark className="bg-mark text-obsidian box-decoration-clone px-1 py-0.5">
      {children}
    </mark>
  );
}
