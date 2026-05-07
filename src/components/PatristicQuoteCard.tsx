import type { PatristicWitness } from "@/data/types";

type PatristicQuoteCardProps = {
  witness: PatristicWitness;
};

export function PatristicQuoteCard({ witness }: PatristicQuoteCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-archive-gold/25 bg-gradient-to-br from-archive-gold/12 to-white/80 p-5 shadow-card dark:from-archive-gold/10 dark:to-white/[0.04]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-display text-2xl font-black text-ink-900 dark:text-white">
          {witness.source}
        </h3>
        <span className="rounded-full border border-archive-gold/35 bg-white/55 px-3 py-1 text-xs font-black text-ink-700 dark:bg-white/10 dark:text-ink-100">
          {witness.date}
        </span>
      </div>
      {witness.region && (
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-archive-teal dark:text-teal-200">
          {witness.region}
        </p>
      )}
      <p className="mt-4 text-sm leading-6 text-ink-700 dark:text-ink-100/78">
        {witness.quoteSummary}
      </p>
    </article>
  );
}
