import { ExternalLink, Library } from "lucide-react";

import type { Passage } from "@/data/types";

type ReferencesSectionProps = {
  passage: Passage;
};

export function ReferencesSection({ passage }: ReferencesSectionProps) {
  const references = passage.references ?? [];
  if (!references.length) return null;

  return (
    <section
      aria-labelledby={`${passage.slug}-references`}
      className="rounded-[2rem] border border-ink-200 bg-white/80 p-6 shadow-card dark:border-white/10 dark:bg-white/[0.05]"
    >
      <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.22em] text-archive-teal dark:text-teal-200">
        <Library className="h-4 w-4" aria-hidden="true" />
        References
      </p>
      <h2
        id={`${passage.slug}-references`}
        className="mt-2 font-display text-3xl font-black text-ink-900 dark:text-white"
      >
        Editions and works cited.
      </h2>
      <ol className="mt-5 grid gap-4">
        {references.map((reference, index) => (
          <li
            key={`${passage.slug}-reference-${index}`}
            className="rounded-2xl border border-ink-100 bg-ink-50/70 p-4 text-sm leading-6 text-ink-700 dark:border-white/10 dark:bg-white/5 dark:text-ink-100/75"
          >
            <p>{reference.citation}</p>
            {reference.links?.length ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {reference.links.map((link) => (
                  <a
                    key={`${link.label}-${link.url}`}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-archive-teal/20 bg-white px-3 py-1 text-xs font-black text-archive-blue hover:underline dark:bg-white/5 dark:text-teal-200"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                ))}
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
