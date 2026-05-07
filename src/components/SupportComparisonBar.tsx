import type { Passage } from "@/data/types";

type SupportComparisonBarProps = {
  passage: Passage;
};

export function SupportComparisonBar({ passage }: SupportComparisonBarProps) {
  const support = Math.max(4, Math.min(100, passage.supportScore));
  const against = Math.max(4, Math.min(100, passage.oppositionScore));
  const total = support + against;
  const supportWidth = `${(support / total) * 100}%`;

  return (
    <div className="rounded-[2rem] border border-ink-200 bg-white/75 p-5 shadow-card dark:border-white/10 dark:bg-white/[0.05]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-archive-teal dark:text-teal-200">
            Visual Support Bar
          </p>
          <h3 className="mt-1 font-display text-2xl font-black text-ink-900 dark:text-white">
            {passage.manuscriptSnapshot.percentSupport
              ? `${passage.manuscriptSnapshot.percentSupport} listed support`
              : passage.supportCategory}
          </h3>
        </div>
        <p className="max-w-md text-sm leading-6 text-ink-600 dark:text-ink-100/70">
          This bar follows the data category. Complex readings do not claim a fake majority.
        </p>
      </div>
      <div className="mt-5 h-5 overflow-hidden rounded-full bg-ink-100 dark:bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-archive-teal to-archive-gold"
          style={{ width: supportWidth }}
          aria-label={`Support score ${passage.supportScore}`}
        />
      </div>
      <div className="mt-3 grid gap-2 text-sm font-bold text-ink-700 dark:text-ink-100 sm:grid-cols-2">
        <p>KJV/TR support: {passage.manuscriptSnapshot.greekSupport}</p>
        <p>Against: {passage.manuscriptSnapshot.greekAgainst}</p>
      </div>
    </div>
  );
}
