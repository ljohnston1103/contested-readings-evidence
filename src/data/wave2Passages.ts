import wave2Data from "./wave2.generated.json";
import { sortWitnessRows } from "./evidenceDates";
import type {
  Passage,
  PatristicWitness,
  SourceLink,
  TimelineEvent,
  Witness,
} from "./types";
import {
  normalizeWave2GreekRow,
  wave2CrossLanguageWitnesses,
  wave2PrintedWitnesses,
} from "./wave2GreekWitnesses";
import {
  assertWave2VersionWitnessCoverage,
  wave2VersionPatristicExtras,
  wave2VersionWitnessSpecs,
} from "./wave2VersionWitnesses";

type RawSourceLink = {
  label: string;
  url: string | null;
};

type RawEvidenceRow = {
  section: string;
  direction: string;
  directionClass: "FOR_KJV" | "AGAINST_KJV" | "OTHER" | "QUALIFICATION";
  unit: string;
  unitLabel: string;
  details: string;
  confidence: string;
  sourceLabel: string;
  sourceUrl: string | null;
  lastVerified: string;
};

type RawFather = {
  author: string;
  date: string;
  workSection: string;
  reading: string;
  relationship: NonNullable<PatristicWitness["relationship"]>;
  evidence: string;
  confidence: string;
  sourceLabel: string;
  sourceUrl: string | null;
  lastVerified: string;
};

type RawPassage = {
  id: string;
  slug: string;
  reference: string;
  title: string;
  book: string;
  variantType: string;
  tags: string[];
  lastVerified: string;
  kjvText: string;
  disputedUnitsIntro: string | null;
  disputedUnits: Array<{ id: string; label: string; text: string }>;
  variantIssue: string;
  quickRead: string;
  supportCategory: string;
  snapshot: Record<string, string>;
  evidence: {
    greek: RawEvidenceRow[];
    versions: RawEvidenceRow[];
  };
  fathers: RawFather[];
  timeline: Array<{ date: string; label: string }>;
  cautions: string[];
  entrySources: RawSourceLink[];
};

type RawWave2Data = {
  lastVerified: string;
  passageCount: number;
  passages: RawPassage[];
};

const rawWave2Data = wave2Data as unknown as RawWave2Data;

const biblicalOrderBySlug: Record<string, number> = {
  "matthew-1-25": 40001025,
  "matthew-5-22": 40005022,
  "matthew-5-44": 40005044,
  "matthew-19-16-17": 40019016,
  "matthew-27-35": 40027035,
  "mark-1-2": 41001002,
  "mark-10-24": 41010024,
  "luke-2-14": 42002014,
  "luke-2-33": 42002033,
  "luke-4-4": 42004004,
  "luke-24-6": 42024006,
  "john-3-13": 43003013,
  "acts-20-28": 44020028,
  "romans-14-10": 45014010,
  "1-corinthians-15-47": 46015047,
  "ephesians-3-9": 49003009,
  "1-john-4-3": 62004003,
  "revelation-1-8": 66001008,
  "revelation-1-11": 66001011,
  "revelation-16-5": 66016005,
  "revelation-22-19": 66022019,
};

function slugifyVariantType(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function sourceLinks(links: RawSourceLink[]): SourceLink[] {
  return links.map((source) => ({
    label: source.label,
    url: source.url ?? undefined,
  }));
}

function inferTimelineType(label: string): TimelineEvent["type"] {
  const text = label.toLowerCase();
  if (/king james|\bkjv\b|geneva|tyndale/.test(text)) return "reformation-bible";
  if (
    /printed|edition|textus receptus|\btr\b|erasmus|beza|elzevir|scrivener|bengel|critical editions|byzantine editions/.test(
      text,
    )
  ) {
    return "printed-edition";
  }
  if (/vulgate|old latin|latin/.test(text)) return "latin-manuscript";
  if (/syriac|coptic|version|ethiopic|armenian|georgian|gothic/.test(text)) {
    return "ancient-version";
  }
  if (
    /basil|justin|jerome|didache|athenagoras|origen|eusebius|clement|hippolytus|novatian|irenaeus|ignatius|polycarp|tertullian|chrysostom|socrates|beatus/.test(
      text,
    )
  ) {
    return "patristic";
  }
  return "greek-manuscript";
}

function disputedUnitText(passage: RawPassage) {
  const units = passage.disputedUnits.map((unit, index) =>
    passage.disputedUnits.length > 1
      ? `${index + 1}. ${publicUnitLabel(unit.text)}`
      : publicUnitLabel(unit.text),
  );
  const intro = passage.disputedUnitsIntro?.replace(
    "Three textual families must be represented:",
    "Three textual families are distinguished:",
  );
  return [intro, ...units].filter(Boolean).join("\n");
}

function publicUnitLabel(label: string) {
  return label.replace(
    /A separate reading in P46 has πνευματικός \(“spiritual”\) and must not be described as the ordinary short text\./u,
    "P46 separately reads πνευματικός (“spiritual”); this is a distinct third reading.",
  );
}

function snapshotGroups(snapshot: Record<string, string>) {
  const support: string[] = [];
  const opposition: string[] = [];

  for (const [key, value] of Object.entries(snapshot)) {
    if (/against|other|dispensation|dissolves/i.test(key)) {
      opposition.push(value);
    } else {
      support.push(value);
    }
  }

  return {
    support: support.join(" "),
    opposition: opposition.join(" "),
  };
}

function mapPassage(raw: RawPassage): Passage {
  const greekSupportWitnesses: Witness[] = [];
  const latinWitnesses: Witness[] = [];
  const versionalWitnesses: Witness[] = [];
  const evidenceAgainst: Witness[] = [];
  const printedWitnesses: Witness[] = [];

  for (const [rowIndex, row] of raw.evidence.greek.entries()) {
    for (const witness of normalizeWave2GreekRow(
      raw.slug,
      raw.book,
      rowIndex,
      { ...row, unitLabel: publicUnitLabel(row.unitLabel) },
    )) {
      const supportsKjv =
        /FOR_KJV/u.test(witness.direction ?? "") &&
        !/AGAINST/u.test(witness.direction ?? "");
      if (witness.kind === "printed") {
        if (supportsKjv) printedWitnesses.push(witness);
        else evidenceAgainst.push(witness);
      } else if (supportsKjv) {
        greekSupportWitnesses.push(witness);
      } else {
        evidenceAgainst.push(witness);
      }
    }
  }

  for (const [rowIndex, sourceRow] of raw.evidence.versions.entries()) {
    const spec = wave2VersionWitnessSpecs[raw.slug]?.[rowIndex];
    if (!spec) {
      throw new Error(
        `Missing curated version witnesses for ${raw.slug} row ${rowIndex}`,
      );
    }

    for (const item of spec.witnesses) {
      const directionClass = item.directionClass ?? spec.directionClass;
      const direction = item.direction ?? spec.direction;
      const unitId = item.unit ?? spec.unit ?? sourceRow.unit;
      const unitLabel =
        publicUnitLabel(
          raw.disputedUnits.find((unit) => unit.id === unitId)?.text ??
            sourceRow.unitLabel,
        );
      const witness: Witness = {
        witness: item.witness,
        date: item.date,
        dateStart: item.dateStart,
        dateEnd: item.dateEnd,
        dateSource: /wave2\.generated\.json/iu.test(item.dateSource)
          ? sourceRow.sourceLabel
          : item.dateSource,
        dateSourceUrl:
          item.dateSourceUrl ??
          (/wave2\.generated\.json/iu.test(item.dateSource)
            ? sourceRow.sourceUrl ?? undefined
            : undefined),
        note: item.note,
        kind: item.kind,
        direction,
        unitId,
        unitLabel,
        unit: unitLabel,
        confidence: sourceRow.confidence,
        source: sourceRow.sourceLabel,
        sourceUrl: sourceRow.sourceUrl ?? undefined,
        lastVerified: sourceRow.lastVerified,
        relationship:
          item.relationship ??
          (item.kind === "printed"
            ? "printed"
            : directionClass === "FOR_KJV"
              ? "versional"
              : directionClass === "OTHER"
                ? "mixed"
                : "related"),
        aggregate: item.aggregate,
      };

      if (directionClass === "FOR_KJV") {
        if (item.kind === "printed") printedWitnesses.push(witness);
        else if (item.kind === "latin") latinWitnesses.push(witness);
        else versionalWitnesses.push(witness);
      } else {
        evidenceAgainst.push(witness);
      }
    }
  }

  for (const witness of wave2PrintedWitnesses[raw.slug] ?? []) {
    const supportsKjv =
      /FOR_KJV/u.test(witness.direction ?? "") &&
      !/AGAINST/u.test(witness.direction ?? "");
    if (supportsKjv) printedWitnesses.push(witness);
    else evidenceAgainst.push(witness);
  }

  for (const witness of wave2CrossLanguageWitnesses[raw.slug] ?? []) {
    if (
      /FOR_KJV/u.test(witness.direction ?? "") &&
      !/AGAINST/u.test(witness.direction ?? "")
    ) {
      if (witness.kind === "latin") latinWitnesses.push(witness);
      else versionalWitnesses.push(witness);
    } else {
      evidenceAgainst.push(witness);
    }
  }

  const patristicWitnesses: PatristicWitness[] = raw.fathers.map((father) => ({
    source: father.author,
    author: father.author,
    date: father.date,
    workSection: father.workSection,
    reading: father.reading,
    relationship: father.relationship,
    quoteSummary: father.evidence,
    confidence: father.confidence,
    sourceCitation: father.sourceLabel,
    sourceUrl: father.sourceUrl ?? undefined,
    lastVerified: father.lastVerified,
  }));

  const patristicIdentity = new Set(
    patristicWitnesses.map((witness) =>
      `${witness.author ?? witness.source}|${witness.workSection ?? ""}`
        .normalize("NFKC")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim(),
    ),
  );
  for (const extras of Object.values(
    wave2VersionPatristicExtras[raw.slug] ?? {},
  )) {
    for (const extra of extras) {
      const key = `${extra.author ?? extra.source}|${extra.workSection ?? ""}`
        .normalize("NFKC")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
      if (patristicIdentity.has(key)) continue;
      patristicIdentity.add(key);
      patristicWitnesses.push({
        source: extra.source,
        author: extra.author,
        date: extra.date,
        dateStart: extra.dateStart,
        dateEnd: extra.dateEnd,
        workSection: extra.workSection,
        reading: extra.reading,
        relationship: extra.relationship,
        quoteSummary: extra.quoteSummary,
        confidence: extra.confidence,
        sourceCitation: extra.sourceCitation,
        sourceUrl: extra.sourceUrl,
        lastVerified: raw.lastVerified,
      });
    }
  }

  const snapshot = snapshotGroups(raw.snapshot);
  const links = sourceLinks(raw.entrySources);

  return {
    id: raw.id,
    slug: raw.slug,
    reference: raw.reference,
    book: raw.book,
    biblicalOrder: biblicalOrderBySlug[raw.slug],
    title: raw.title,
    readingSupported: raw.kjvText,
    kjvText: raw.kjvText,
    variantIssue: raw.variantIssue,
    variantType: [slugifyVariantType(raw.variantType)],
    tags: raw.tags,
    supportCategory: raw.supportCategory,
    shortSummary: raw.quickRead,
    lastVerified: raw.lastVerified,
    disputedUnit: disputedUnitText(raw),
    cautions: raw.cautions,
    sourceLinks: links,
    manuscriptSnapshot: {
      greekSupport: snapshot.support,
      greekAgainst: snapshot.opposition,
      supportCategory: raw.supportCategory,
      mainEvidenceAgainst: snapshot.opposition
        ? [snapshot.opposition]
        : evidenceAgainst.map((row) => row.witness),
    },
    greekSupportWitnesses: sortWitnessRows(greekSupportWitnesses),
    latinWitnesses: sortWitnessRows(latinWitnesses),
    versionalWitnesses: sortWitnessRows(versionalWitnesses),
    patristicWitnesses,
    evidenceAgainst: sortWitnessRows(evidenceAgainst),
    printedWitnesses: sortWitnessRows(printedWitnesses),
    timeline: raw.timeline.map((event) => ({
      date: event.date,
      label: event.label,
      type: inferTimelineType(event.label),
    })),
    sources: links.map((source) => source.label),
  };
}

assertWave2VersionWitnessCoverage();

if (rawWave2Data.passageCount !== 21 || rawWave2Data.passages.length !== 21) {
  throw new Error("Wave 2 must contain exactly 21 passages.");
}

export const wave2Passages: Passage[] = rawWave2Data.passages.map(mapPassage);
