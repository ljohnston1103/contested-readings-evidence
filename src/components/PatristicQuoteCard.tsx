import { ExternalLink } from "lucide-react";

import {
  patristicCategoryFor,
  patristicCategoryLabels,
  patristicEvidenceFormLabel,
  type PatristicCategory,
} from "@/data/patristicCategory";
import type { PatristicWitness } from "@/data/types";
import { evidenceYearLabel } from "@/data/evidenceDates";

type PatristicQuoteCardProps = {
  witness: PatristicWitness;
  passageSlug: string;
};

const cardStyles: Record<PatristicCategory, string> = {
  supporting:
    "border-emerald-700/25 bg-gradient-to-br from-emerald-50/90 to-white/80 hover:border-emerald-700/45 dark:border-emerald-300/20 dark:from-emerald-300/[0.08] dark:to-white/[0.04]",
  competing:
    "border-rose-700/25 bg-gradient-to-br from-rose-50/90 to-white/80 hover:border-rose-700/45 dark:border-rose-300/20 dark:from-rose-300/[0.08] dark:to-white/[0.04]",
  mixed:
    "border-amber-700/25 bg-gradient-to-br from-amber-50/90 to-white/80 hover:border-amber-700/45 dark:border-amber-300/20 dark:from-amber-300/[0.08] dark:to-white/[0.04]",
};

const badgeStyles: Record<PatristicCategory, string> = {
  supporting:
    "border-emerald-700/35 bg-emerald-100/75 text-emerald-900 dark:border-emerald-300/30 dark:bg-emerald-300/10 dark:text-emerald-100",
  competing:
    "border-rose-700/35 bg-rose-100/75 text-rose-900 dark:border-rose-300/30 dark:bg-rose-300/10 dark:text-rose-100",
  mixed:
    "border-amber-700/35 bg-amber-100/75 text-amber-900 dark:border-amber-300/30 dark:bg-amber-300/10 dark:text-amber-100",
};

export function PatristicQuoteCard({
  witness,
  passageSlug,
}: PatristicQuoteCardProps) {
  const category = patristicCategoryFor(passageSlug, witness);
  const categoryLabel = patristicCategoryLabels[category];
  const evidenceForm = patristicEvidenceFormLabel(witness);

  return (
    <article
      className={`rounded-[1.75rem] border p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-glow ${cardStyles[category]}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-display text-2xl font-black text-ink-900 dark:text-white">
          {witness.author ?? witness.source}
        </h3>
        <span
          className={`rounded-lg border px-3 py-1.5 text-xs font-black tracking-wide ${badgeStyles[category]}`}
        >
          {evidenceYearLabel(witness)}
        </span>
      </div>
      {witness.region ? (
        <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-archive-teal dark:text-teal-200">
          {witness.region}
        </p>
      ) : null}
      {witness.workSection ? (
        <p className="mt-2 text-sm font-bold text-ink-700 dark:text-ink-100/75">
          {witness.workSection}
        </p>
      ) : null}
      <div className="mt-3 flex flex-wrap gap-2">
        <span
          className={`rounded-full border px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] ${badgeStyles[category]}`}
        >
          {categoryLabel}
        </span>
        <span className="rounded-full border border-ink-200 bg-white/65 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-ink-700 dark:border-white/10 dark:bg-white/10 dark:text-ink-100">
          Citation type: {evidenceForm}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-ink-700 dark:text-ink-100/78">
        {witness.quoteSummary}
      </p>
      {witness.sourceCitation &&
      witness.sourceCitation !== witness.workSection ? (
        <p className="mt-3 text-xs font-semibold leading-5 text-ink-500 dark:text-ink-100/55">
          Locator: {witness.sourceCitation}
        </p>
      ) : null}
      {witness.sourceUrl ? (
        <a
          href={witness.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-black text-archive-teal hover:underline dark:text-teal-200"
        >
          Open source
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      ) : null}
    </article>
  );
}
