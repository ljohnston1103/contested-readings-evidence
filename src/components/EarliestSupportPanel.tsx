import { Clock3, ScrollText } from "lucide-react";

import type { Passage } from "@/data/types";

type EarliestSupportPanelProps = {
  passage: Passage;
  compact?: boolean;
};

export function EarliestSupportPanel({
  passage,
  compact = false,
}: EarliestSupportPanelProps) {
  const records = passage.earliestSupport ?? [];
  if (!records.length) return null;

  if (compact) {
    return (
      <div className="rounded-2xl border border-archive-gold/25 bg-archive-gold/[0.08] p-3">
        <p className="flex items-center gap-1.5 text-[0.68rem] font-black uppercase tracking-[0.16em] text-archive-teal dark:text-teal-200">
          <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
          Earliest KJV support
        </p>
        <p className="mt-1.5 text-sm font-bold leading-5 text-ink-800 dark:text-ink-100">
          {records[0].statement}
        </p>
      </div>
    );
  }

  return (
    <section
      aria-labelledby={`${passage.slug}-earliest-support`}
      className="rounded-[2rem] border border-archive-teal/25 bg-gradient-to-br from-archive-teal/[0.09] to-white/80 p-6 shadow-card dark:border-teal-300/20 dark:from-teal-300/[0.08] dark:to-white/[0.04]"
    >
      <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.22em] text-archive-teal dark:text-teal-200">
        <Clock3 className="h-4 w-4" aria-hidden="true" />
        Earliest KJV-supporting evidence
      </p>
      <h2
        id={`${passage.slug}-earliest-support`}
        className="mt-2 font-display text-3xl font-black text-ink-900 dark:text-white"
      >
        The earliest reviewed support at a glance.
      </h2>
      <div className="mt-5 grid gap-4">
        {records.map((record, index) => (
          <article
            key={`${passage.slug}-earliest-${index}`}
            className="rounded-3xl border border-ink-100 bg-white/80 p-5 dark:border-white/10 dark:bg-white/[0.055]"
          >
            {record.label && (
              <p className="text-xs font-black uppercase tracking-[0.18em] text-archive-gold">
                {record.label}
              </p>
            )}
            <p className="mt-1 text-base font-bold leading-7 text-ink-800 dark:text-ink-100">
              {record.statement}
            </p>
            {record.earliestGreek && (
              <div className="mt-3 flex gap-2 rounded-2xl bg-ink-50 p-3 text-sm leading-6 text-ink-700 dark:bg-white/5 dark:text-ink-100/75">
                <ScrollText
                  className="mt-1 h-4 w-4 shrink-0 text-archive-teal dark:text-teal-200"
                  aria-hidden="true"
                />
                <p>
                  <span className="font-black">Earliest surviving Greek support: </span>
                  {record.earliestGreek}
                </p>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
