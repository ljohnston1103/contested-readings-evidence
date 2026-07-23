import { ExternalLink, Library } from "lucide-react";

import type { Passage, PatristicWitness, Witness } from "@/data/types";
import { canonicalSourceLabels } from "@/data/witnessCatalog";

type PassageSourcesCardProps = {
  passage: Passage;
};

type SourceEntry = {
  label: string;
  url?: string;
};

// Label shapes the public site never uses as a citation (vague link text,
// file or hosting descriptions). The underlying works remain fully cited in
// each passage's References section.
const prohibitedLabels = new Set([
  "here",
  "online",
  "pdf",
  "parallel greek editions",
]);
const prohibitedEndings = [
  " study",
  " note",
  " preprint",
  " record",
  " archive record",
];

function isProhibitedLabel(label: string) {
  const lower = label.toLowerCase();
  return (
    prohibitedLabels.has(lower) ||
    prohibitedEndings.some((ending) => lower.endsWith(ending))
  );
}

function addSource(
  map: Map<string, SourceEntry>,
  label: string | undefined,
  url?: string,
) {
  const trimmed = label?.trim();
  if (!trimmed) return;
  if (isProhibitedLabel(trimmed)) return;
  // A URL the catalogue knows always displays under its one formal citation,
  // even when the row carried an ad-hoc or mispaired label.
  const canonical = url ? canonicalSourceLabels[url] : undefined;
  const finalLabel = canonical ?? trimmed;
  const key = finalLabel.toLowerCase();
  const existing = map.get(key);
  if (existing) {
    if (!existing.url && url) existing.url = url;
    return;
  }
  map.set(key, { label: finalLabel, url });
}

function collectWitnessSources(map: Map<string, SourceEntry>, rows: Witness[]) {
  for (const row of rows) {
    addSource(map, row.dateSource, row.dateSourceUrl);
    addSource(map, row.source, row.sourceUrl);
  }
}

function collectPatristicSources(
  map: Map<string, SourceEntry>,
  rows: PatristicWitness[],
) {
  for (const row of rows) {
    addSource(map, row.sourceCitation, row.sourceUrl);
  }
}

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

  // Collapse remaining entries that cite the same URL under one pill,
  // keeping the fullest label.
  const byUrl = new Map<string, SourceEntry>();
  const noUrl: SourceEntry[] = [];
  for (const entry of map.values()) {
    if (!entry.url) {
      noUrl.push(entry);
      continue;
    }
    const existing = byUrl.get(entry.url);
    if (!existing || entry.label.length > existing.label.length) {
      byUrl.set(entry.url, entry);
    }
  }

  // Drop entries whose label is subsumed by a fuller citation of the same
  // work (e.g. "Justin" next to "Justin, First Apology").
  const normalize = (label: string) =>
    label
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim();
  const entries = [...byUrl.values(), ...noUrl];
  const sources = entries
    .filter((entry) => {
      const short = normalize(entry.label);
      return (
        short.length > 0 &&
        !entries.some(
          (other) =>
            other !== entry &&
            normalize(other.label).startsWith(short) &&
            normalize(other.label) !== short,
        )
      );
    })
    .sort((a, b) => a.label.localeCompare(b.label));
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
        Every witness, date, and note below draws on these works. Individual
        tables list only the witness, its date range, and any needed note.
        {passage.references?.length
          ? " Complete citations appear in the References section at the end of the page."
          : ""}
      </p>
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
    </section>
  );
}
