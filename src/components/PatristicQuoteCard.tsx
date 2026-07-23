import type { PatristicWitness } from "@/data/types";

type PatristicQuoteCardProps = {
  witness: PatristicWitness;
};

function relationshipLabel(witness: PatristicWitness) {
  switch (witness.relationship) {
    case "explicit_quote":
      return "Exact reading";
    case "close_quote":
      return "Close quotation";
    case "mixed_citation":
      return "Mixed citation";
    case "parallel_tradition":
    case "manuscript_report":
    case "theological_parallel":
      return "Related evidence";
    default:
      return /mixed|debated/iu.test(witness.quoteSummary)
        ? "Mixed citation"
        : "Close quotation";
  }
}

export function PatristicQuoteCard({ witness }: PatristicQuoteCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-archive-gold/25 bg-gradient-to-br from-archive-gold/12 to-white/80 p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-archive-gold/50 hover:shadow-glow dark:from-archive-gold/10 dark:to-white/[0.04]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-display text-2xl font-black text-ink-900 dark:text-white">
          {witness.author ?? witness.source}
        </h3>
        <span className="rounded-lg border-2 border-archive-gold/60 bg-archive-gold/15 px-3 py-1.5 text-xs font-black tracking-wide text-amber-900 shadow-[0_2px_0_rgba(180,135,35,0.18)] dark:border-archive-gold/70 dark:bg-archive-gold/15 dark:text-amber-100">
          {witness.date}
        </span>
      </div>
      {witness.region && (
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-archive-teal dark:text-teal-200">
          {witness.region}
        </p>
      )}
      {witness.workSection && (
        <p className="mt-2 text-sm font-bold text-ink-600 dark:text-ink-100/70">
          {witness.workSection}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-full border border-archive-gold/35 bg-white/55 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-ink-700 dark:bg-white/10 dark:text-ink-100">
          {relationshipLabel(witness)}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-ink-700 dark:text-ink-100/78">
        {witness.quoteSummary}
      </p>
    </article>
  );
}
