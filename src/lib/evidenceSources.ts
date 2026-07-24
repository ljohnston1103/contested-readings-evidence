import type { PatristicWitness, Witness } from "@/data/types";
import { canonicalSourceLabels } from "@/data/witnessCatalog";

export type SourceEntry = {
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

export function addSource(
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

export function collectWitnessSources(
  map: Map<string, SourceEntry>,
  rows: Witness[],
) {
  for (const row of rows) {
    addSource(map, row.dateSource, row.dateSourceUrl);
    addSource(map, row.source, row.sourceUrl);
  }
}

export function collectPatristicSources(
  map: Map<string, SourceEntry>,
  rows: PatristicWitness[],
) {
  for (const row of rows) {
    addSource(map, row.sourceCitation, row.sourceUrl);
  }
}

/**
 * Collapses same-URL entries under one pill (fullest label wins), drops
 * labels subsumed by a fuller citation of the same work ("Justin" next to
 * "Justin, First Apology"), and sorts alphabetically.
 */
export function finalizeSources(map: Map<string, SourceEntry>): SourceEntry[] {
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

  const normalize = (label: string) =>
    label
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim();
  const entries = [...byUrl.values(), ...noUrl];
  return entries
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
}

export function witnessRowSources(rows: Witness[]): SourceEntry[] {
  const map = new Map<string, SourceEntry>();
  collectWitnessSources(map, rows);
  return finalizeSources(map);
}

export function patristicRowSources(rows: PatristicWitness[]): SourceEntry[] {
  const map = new Map<string, SourceEntry>();
  collectPatristicSources(map, rows);
  return finalizeSources(map);
}
