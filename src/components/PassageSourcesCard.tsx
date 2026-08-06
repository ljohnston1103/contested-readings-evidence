import { ExternalLink, Library, UsersRound } from "lucide-react";
import Link from "next/link";

import type { Passage } from "@/data/types";
import {
  addSource,
  collectPatristicSources,
  collectWitnessSources,
  finalizeSources,
  type SourceEntry,
} from "@/lib/evidenceSources";

type PassageSourcesCardProps = {
  passage: Passage;
};

/**
 * Aggregates every distinct source cited by this passage's evidence rows into
 * one card so individual tables stay free of per-witness citations.
 */
export function PassageSourcesCard({ passage }: PassageSourcesCardProps) {
  const map = new Map<string, SourceEntry>();
  collectWitnessSources(map, passage.greekSupportWitnesses);
  collectWitnessSources(map, passage.latinWitnesses);
  collectWitnessSources(map, passage.versionalWitnesses);
  collectWitnessSources(map, passage.evidenceAgainst);
  collectWitnessSources(map, passage.printedWitnesses ?? []);
  collectPatristicSources(map, passage.patristicWitnesses);
  for (const link of passage.sourceLinks ?? []) {
    addSource(map, link.label, link.url);
  }

  const sources = finalizeSources(map);
  if (!sources.length) return null;

  return (
    <section
      aria-labelledby={`${passage.slug}-evidence-sources`}
      className="rounded-[2rem] border border-ink-200 bg-white/80 p-6 shadow-card dark:border-white/10 dark:bg-white/[0.05]"
    >
      <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.22em] text-archive-teal dark:text-teal-200">
        <Library className="h-4 w-4" aria-hidden="true" />
        Evidence sources
      </p>
      <h2
        id={`${passage.slug}-evidence-sources`}
        className="mt-2 font-display text-2xl font-black text-ink-900 dark:text-white"
      >
        Where the evidence on this page comes from.
      </h2>
      <p className="mt-2 text-sm leading-6 text-ink-600 dark:text-ink-100/70">
        Sources used for the witnesses, readings, dates, and notes on this page.
        {passage.references?.length
          ? " Complete citations appear in the References section at the end of the page."
          : ""}
      </p>
      {passage.evidenceScope ? (
        <div className="mt-4 rounded-2xl border border-archive-gold/25 bg-archive-gold/10 p-4">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-ink-500 dark:text-ink-100/55">
            Governing apparatus and count scope
          </p>
          <p className="mt-2 text-sm leading-6 text-ink-700 dark:text-ink-100/75">
            {passage.evidenceScope}
          </p>
        </div>
      ) : null}
      <ul className="mt-4 flex flex-wrap gap-2">
        {sources.map((source) => (
          <li key={source.label}>
            {source.url ? (
              <a
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-archive-teal/25 bg-archive-teal/[0.06] px-3.5 py-1.5 text-xs font-bold text-archive-teal transition hover:border-archive-teal/50 hover:bg-archive-teal/10 dark:border-teal-300/25 dark:bg-teal-300/[0.06] dark:text-teal-200"
              >
                {source.label}
                <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
              </a>
            ) : (
              <span className="inline-flex rounded-full border border-ink-200 bg-ink-50/70 px-3.5 py-1.5 text-xs font-bold text-ink-600 dark:border-white/10 dark:bg-white/5 dark:text-ink-100/70">
                {source.label}
              </span>
            )}
          </li>
        ))}
      </ul>
      <Link
        href={`/full-witness-information#${passage.slug}`}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-archive-gold/35 bg-archive-gold/10 px-4 py-2 text-sm font-black text-ink-800 transition hover:border-archive-gold hover:bg-archive-gold/15 dark:text-white"
      >
        <UsersRound className="h-4 w-4 text-archive-gold" aria-hidden="true" />
        Full witness information
      </Link>
    </section>
  );
}
