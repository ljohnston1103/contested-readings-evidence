import { ExternalLink, Library } from "lucide-react";

import type { SourceEntry } from "@/lib/evidenceSources";

type SourcesStripProps = {
  sources: SourceEntry[];
  heading?: string;
};

/**
 * The one place a table or card grid names its sources — individual rows
 * stay free of citations.
 */
export function SourcesStrip({
  sources,
  heading = "Sources for the dates and readings in this section",
}: SourcesStripProps) {
  if (!sources.length) return null;

  return (
    <div className="rounded-2xl border border-archive-teal/20 bg-archive-teal/[0.05] p-4 dark:border-teal-300/20 dark:bg-teal-300/[0.05]">
      <p className="flex items-center gap-2 text-[0.7rem] font-black uppercase tracking-[0.16em] text-archive-teal dark:text-teal-200">
        <Library className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {heading}
      </p>
      <ul className="mt-2.5 flex flex-wrap gap-2">
        {sources.map((source) => (
          <li key={source.label}>
            {source.url ? (
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-archive-teal/25 bg-white/70 px-3 py-1 text-xs font-bold text-archive-teal transition hover:border-archive-teal/50 hover:bg-white dark:border-teal-300/25 dark:bg-white/5 dark:text-teal-200 dark:hover:bg-white/10"
              >
                {source.label}
                <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
              </a>
            ) : (
              <span className="inline-flex rounded-full border border-ink-200 bg-white/60 px-3 py-1 text-xs font-bold text-ink-600 dark:border-white/10 dark:bg-white/5 dark:text-ink-100/70">
                {source.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
