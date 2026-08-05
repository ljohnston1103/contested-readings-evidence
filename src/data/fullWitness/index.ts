import type {
  Passage,
  PatristicWitness,
  ReferenceEntry,
  SourceLink,
  Witness,
} from "../types";
import { actsWitnesses } from "./acts";
import { catholicRevelationWitnesses } from "./catholicRevelation";
import { lukeJohnWitnesses } from "./lukeJohn";
import { matthewMarkWitnesses } from "./matthewMark";
import { paulWitnesses } from "./paul";
import type { FatherRow, FullWitnessEntry } from "./types";

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

function normalizedPatristicText(value: string | undefined) {
  return (value ?? "")
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function patristicRelationship(
  use: FatherRow["use"],
): PatristicWitness["relationship"] {
  if (use === "Direct quotation") return "explicit_quote";
  if (use === "Close quotation") return "close_quote";
  if (use === "Manuscript report") return "manuscript_report";
  if (use === "Parallel tradition") return "parallel_tradition";
  if (use === "Derivative use") return "theological_parallel";
  return "theological_parallel";
}

function patristicReading(
  reading: FatherRow["reading"],
): PatristicWitness["reading"] {
  if (reading === "Supports the KJV reading") return "FOR_KJV";
  if (reading === "Competing reading") return "AGAINST_KJV";
  return "RELATED_TO_KJV";
}

function patristicFallbackSource(entry: FullWitnessEntry) {
  return entry.sources.find((source) =>
    /patristic|fathers|new advent|biblindex|galiza|critical edition/iu.test(
      source.label,
    ),
  );
}

function patristicRow(
  father: FatherRow,
  entry: FullWitnessEntry,
): PatristicWitness {
  const fallback = patristicFallbackSource(entry);
  return {
    source: father.author,
    author: father.author,
    date: father.date,
    workSection: father.work,
    reading: patristicReading(father.reading),
    relationship: patristicRelationship(father.use),
    quoteSummary: father.reading,
    sourceCitation: father.locator,
    sourceUrl: father.url ?? fallback?.url,
    lastVerified: "2026-08-05",
  };
}

function alreadyHasPatristicRow(
  existing: PatristicWitness[],
  father: FatherRow,
) {
  const author = normalizedPatristicText(father.author);
  const work = normalizedPatristicText(father.work);
  const locator = normalizedPatristicText(father.locator);
  const recordId = locator.match(/\bintf(?: record)?\s+(\d+)\b/iu)?.[1];

  return existing.some((row) => {
    const text = normalizedPatristicText(
      [
        row.author,
        row.source,
        row.workSection,
        row.sourceCitation,
      ]
        .filter(Boolean)
        .join(" "),
    );
    if (!text.includes(author)) return false;
    if (recordId && text.includes(`intf ${recordId}`)) return true;
    return work.length >= 8 && text.includes(work);
  });
}

function mergePatristicRows(
  existing: PatristicWitness[],
  entry: FullWitnessEntry,
) {
  const merged = [...existing];
  for (const father of entry.fathers) {
    if (!alreadyHasPatristicRow(merged, father)) {
      merged.push(patristicRow(father, entry));
    }
  }
  return merged;
}

const relatedVersionRowsBySlug: Readonly<Record<string, readonly Witness[]>> = {
  "luke-24-6": [
    {
      witness: "Syriac Peshitta tradition",
      date: "Early fifth-century translation tradition",
      dateStart: 401,
      dateEnd: 450,
      note: "Carries a related form of the clause rather than the exact KJV/TR wording.",
      kind: "syriac",
      direction: "RELATED_TO_KJV",
      relationship: "related",
      aggregate: true,
      dateSource: "Bruce M. Metzger, The Early Versions of the New Testament",
      dateSourceUrl: "https://academic.oup.com/book/26742",
      source: "Wieland Willker, A Textual Commentary on the Greek Gospels, Vol. 3: Luke",
      sourceUrl: "https://www.willker.de/wie/TCG/TC-Luke.pdf",
      lastVerified: "2026-08-05",
    },
  ],
  "john-7-53-8-11": [
    {
      witness: "Sahidic ostracon EA 21424",
      date: "AD 400–899",
      dateStart: 400,
      dateEnd: 899,
      note: "Carries John 8:9–11; it does not attest the story's complete wording or its location in a Gospel codex.",
      kind: "coptic",
      direction: "RELATED_TO_KJV",
      relationship: "related",
      dateUncertain: true,
      dateSource: "Schulz, Sahidic ostracon study of the Pericope Adulterae (2021)",
      dateSourceUrl: "https://doi.org/10.1515/9783110592153-003",
      source: "Schulz, Sahidic ostracon study of the Pericope Adulterae (2021)",
      sourceUrl: "https://doi.org/10.1515/9783110592153-003",
      lastVerified: "2026-08-05",
    },
  ],
};

const supportingGreekRowsBySlug: Readonly<Record<string, readonly Witness[]>> = {
  "acts-9-5-6": [
    {
      witness: "Minuscule 69, later correction",
      date: "Fifteenth-century base manuscript; correction not independently dated",
      dateStart: 1401,
      dateEnd: 1500,
      dateUncertain: true,
      note: "The correcting hand carries the full Acts 9:5–6 expansion.",
      kind: "greek-manuscript",
      direction: "FOR_KJV",
      relationship: "exact",
      dateSource: "INTF Kurzgefasste Liste / NTVMR manuscript metadata",
      dateSourceUrl: "https://ntvmr.uni-muenster.de/liste",
      source: "INTF digital Editio Critica Maior: Acts",
      sourceUrl: "https://ntvmr.uni-muenster.de/ecm",
      lastVerified: "2026-08-05",
    },
    {
      witness: "Minuscule 808, correcting hand",
      date: "Fourteenth-century base manuscript; correcting hand not independently dated",
      dateStart: 1301,
      dateEnd: 1400,
      dateUncertain: true,
      note: "The correcting hand carries the full Acts 9:5–6 expansion.",
      kind: "greek-manuscript",
      direction: "FOR_KJV",
      relationship: "exact",
      dateSource: "INTF Kurzgefasste Liste / NTVMR manuscript metadata",
      dateSourceUrl: "https://ntvmr.uni-muenster.de/liste",
      source: "INTF digital Editio Critica Maior: Acts",
      sourceUrl: "https://ntvmr.uni-muenster.de/ecm",
      lastVerified: "2026-08-05",
    },
  ],
};

function mergeWitnessRows(existing: Witness[], additions: readonly Witness[]) {
  const merged = [...existing];
  for (const addition of additions) {
    const key = normalizedPatristicText(
      `${addition.witness} ${addition.direction ?? ""} ${addition.unit ?? ""}`,
    );
    if (
      !merged.some(
        (row) =>
          normalizedPatristicText(
            `${row.witness} ${row.direction ?? ""} ${row.unit ?? ""}`,
          ) === key,
      )
    ) {
      merged.push({ ...addition });
    }
  }
  return merged;
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
    patristicWitnesses: mergePatristicRows(
      passage.patristicWitnesses,
      entry,
    ),
    evidenceAgainst: mergeWitnessRows(
      sourcedRows.evidenceAgainst,
      relatedVersionRowsBySlug[passage.slug] ?? [],
    ),
    greekSupportWitnesses: mergeWitnessRows(
      passage.greekSupportWitnesses,
      supportingGreekRowsBySlug[passage.slug] ?? [],
    ),
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
