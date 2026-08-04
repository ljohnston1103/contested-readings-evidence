import type { Passage, ReferenceEntry, SourceLink } from "../types";
import { actsWitnesses } from "./acts";
import { catholicRevelationWitnesses } from "./catholicRevelation";
import { lukeJohnWitnesses } from "./lukeJohn";
import { matthewMarkWitnesses } from "./matthewMark";
import { paulWitnesses } from "./paul";
import type { FullWitnessEntry } from "./types";

export const fullWitnessEntries: FullWitnessEntry[] = [
  ...matthewMarkWitnesses,
  ...lukeJohnWitnesses,
  ...actsWitnesses,
  ...paulWitnesses,
  ...catholicRevelationWitnesses,
];

export const fullWitnessBySlug = new Map(
  fullWitnessEntries.map((entry) => [entry.slug, entry]),
);

function mergeSourceLinks(
  existing: SourceLink[] | undefined,
  entry: FullWitnessEntry,
) {
  const merged = [
    ...(existing ?? []),
    ...entry.sources.map((source) => ({
      label: source.label,
      url: source.url,
    })),
  ];
  const seen = new Set<string>();
  return merged.filter((source) => {
    const key = `${source.label}\u0000${source.url ?? ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function mergeReferences(
  existing: ReferenceEntry[] | undefined,
  entry: FullWitnessEntry,
) {
  const additions: ReferenceEntry[] = entry.sources.map((source) => ({
    citation: source.locator
      ? `${source.label}. ${source.locator}.`
      : source.label,
    links: source.url
      ? [{ label: "Open source", url: source.url }]
      : undefined,
  }));
  const merged = [...(existing ?? []), ...additions];
  const seen = new Set<string>();
  return merged.filter((reference) => {
    const key = reference.citation.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function sourceForVersionRow(entry: FullWitnessEntry, kind: string | undefined) {
  const pattern =
    kind === "latin"
      ? /Vetus Latina|Latin|Vulgate|Galiza|COMPAUL|Palmer|Willker|Editio Critica|IGNTP/iu
      : kind === "syriac"
        ? /Kiraz|Syriac|Willker|Editio Critica|IGNTP|Palmer/iu
        : kind === "coptic"
          ? /Sahidic|Coptic|Willker|Editio Critica|IGNTP|Palmer/iu
          : /Willker|Editio Critica|IGNTP|Palmer|Early Versions/iu;
  return entry.sources.find((source) => pattern.test(source.label)) ?? entry.sources[0];
}

function attachVersionReadingSources(passage: Passage, entry: FullWitnessEntry) {
  const attach = (row: Passage["latinWitnesses"][number]) => {
    if (
      (row.source && row.sourceUrl) ||
      !["latin", "syriac", "coptic", "version"].includes(row.kind ?? "")
    ) {
      return row;
    }
    const source = sourceForVersionRow(entry, row.kind);
    return source
      ? { ...row, source: source.label, sourceUrl: source.url }
      : row;
  };

  return {
    latinWitnesses: passage.latinWitnesses.map(attach),
    versionalWitnesses: passage.versionalWitnesses.map(attach),
    evidenceAgainst: passage.evidenceAgainst.map(attach),
  };
}

/**
 * Preserve each dossier's existing individual witness rows and layout.
 * The new research supplements its source list and powers the separate full
 * witness page; it never replaces dated rows with aggregate roster summaries.
 */
export function applyFullWitnessEntry(passage: Passage): Passage {
  const entry = fullWitnessBySlug.get(passage.slug);
  if (!entry) return passage;
  const sourcedRows = attachVersionReadingSources(passage, entry);

  return {
    ...passage,
    ...sourcedRows,
    sourceLinks: mergeSourceLinks(passage.sourceLinks, entry),
    references: mergeReferences(passage.references, entry),
    sources: Array.from(
      new Set([
        ...passage.sources,
        ...entry.sources.map((source) => source.label),
      ]),
    ),
    lastVerified: "2026-08-04",
  };
}

export type { FullWitnessEntry, WitnessGroup } from "./types";
