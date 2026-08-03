import { Library } from "lucide-react";

import type { Passage } from "@/data/types";

import { EvidenceTable } from "./EvidenceTable";

type EditionsSectionProps = {
  passage: Passage;
};

export function editionEvidenceRows(passage: Passage) {
  return [
    ...(passage.printedWitnesses ?? []),
    ...passage.evidenceAgainst.filter((row) => row.kind === "printed"),
  ];
}

export function EditionsSection({ passage }: EditionsSectionProps) {
  const editionRows = editionEvidenceRows(passage);

  if (!editionRows.length) return null;

  return (
    <section
      id="printed-editions"
      aria-labelledby="printed-editions-heading"
      className="relative overflow-hidden rounded-[2rem] border border-archive-gold/45 bg-gradient-to-br from-archive-gold/15 via-white/85 to-archive-teal/10 p-5 shadow-card dark:border-archive-gold/30 dark:from-archive-gold/[0.12] dark:via-white/[0.055] dark:to-archive-teal/10 sm:p-7"
    >
      <div
        className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-archive-gold/15 blur-3xl dark:bg-archive-gold/10"
        aria-hidden="true"
      />
      <div className="relative">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-archive-gold/35 bg-archive-gold/15 text-amber-800 dark:text-archive-gold">
            <Library className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-800 dark:text-archive-gold">
              Separate evidence category
            </p>
            <h2
              id="printed-editions-heading"
              className="mt-1 font-display text-3xl font-black text-ink-900 dark:text-white"
            >
              Printed editions and reception history
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-ink-700 dark:text-ink-100/75">
              Printed editions are presented apart from handwritten manuscripts and ancient versions. Edition-group summaries appear first; named supporting and competing editions then follow chronologically.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <EvidenceTable
            title="Edition evidence for both readings"
            rows={editionRows}
          />
        </div>
      </div>
    </section>
  );
}
