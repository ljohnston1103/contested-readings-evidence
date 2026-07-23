import type { PatristicWitness } from "@/data/types";

type PatristicQuoteCardProps = {
  witness: PatristicWitness;
};

export function PatristicQuoteCard({ witness }: PatristicQuoteCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-archive-gold/25 bg-gradient-to-br from-archive-gold/12 to-white/80 p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-archive-gold/50 hover:shadow-glow dark:from-archive-gold/10 dark:to-white/[0.04]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-display text-2xl font-black text-ink-900 dark:text-white">
          {witness.author ?? witness.source}
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
      {witness.workSection && (
        <p className="mt-2 text-sm font-bold text-ink-600 dark:text-ink-100/70">
          {witness.workSection}
        </p>
      )}
      {(witness.reading || witness.relationship) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {witness.reading && (
            <span
              className={`rounded-full px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] ${
                witness.reading.startsWith("FOR")
                  ? "bg-archive-teal/10 text-archive-teal dark:text-teal-200"
                  : witness.reading.startsWith("AGAINST")
                    ? "bg-amber-700/10 text-amber-800 dark:text-amber-100"
                    : "bg-ink-100 text-ink-600 dark:bg-white/10 dark:text-ink-100/70"
              }`}
            >
              {witness.reading.replaceAll("_", " ")}
            </span>
          )}
          {witness.relationship && (
            <span className="rounded-full border border-archive-gold/35 bg-white/55 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-ink-700 dark:bg-white/10 dark:text-ink-100">
              {witness.relationship.replaceAll("_", " ")}
            </span>
          )}
        </div>
      )}
      <p className="mt-4 text-sm leading-6 text-ink-700 dark:text-ink-100/78">
        {witness.quoteSummary}
      </p>
      {(witness.confidence || witness.sourceCitation || witness.lastVerified) && (
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-archive-gold/20 pt-3 text-xs font-semibold text-ink-500 dark:text-ink-100/55">
          {witness.confidence && <span>Confidence: {witness.confidence}</span>}
          {witness.lastVerified && <span>Verified: {witness.lastVerified}</span>}
          {witness.sourceCitation &&
            (witness.sourceUrl ? (
              <a
                href={witness.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="font-black text-archive-blue hover:underline dark:text-teal-200"
              >
                Source: {witness.sourceCitation}
              </a>
            ) : (
              <span>Source: {witness.sourceCitation}</span>
            ))}
        </div>
      )}
    </article>
  );
}
