import wave2Data from "./wave2.generated.json";
import type {
  EvidenceKind,
  Passage,
  PatristicWitness,
  SourceLink,
  TimelineEvent,
  Witness,
} from "./types";

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

function witnessLabel(details: string) {
  const semicolon = details.indexOf(";");
  const verb = details.search(
    /\b(?:read|reads|omit|omits|include|includes|support|supports|attest|attests)\b/i,
  );
  const boundary =
    semicolon > 0 && verb > 0
      ? Math.min(semicolon, verb)
      : semicolon > 0
        ? semicolon
        : verb > 0
          ? verb
          : -1;

  if (boundary > 0 && boundary <= 180) return details.slice(0, boundary).trim();
  if (details.length <= 180) return details;

  const shortened = details.slice(0, 180);
  const lastSpace = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, lastSpace > 80 ? lastSpace : 180).trim()}…`;
}

function classifyVersionKind(details: string): EvidenceKind {
  const text = details.toLowerCase();
  const hasLatin = /old latin|vulgate|latin/.test(text);
  const hasSyriac = /syriac|peshitta|harklean|harclean|curetonian/.test(text);
  const hasCoptic = /coptic|sahidic|bohairic/.test(text);
  const languageGroups = [hasLatin, hasSyriac, hasCoptic].filter(Boolean).length;

  if (languageGroups > 1) return "version";
  if (hasLatin) return "latin";
  if (hasSyriac) return "syriac";
  if (hasCoptic) return "coptic";
  return "version";
}

function evidenceRowToWitness(
  row: RawEvidenceRow,
  kind: EvidenceKind,
): Witness {
  return {
    witness: witnessLabel(row.details),
    date: "",
    note: row.details,
    kind,
    direction: row.direction,
    unit: row.section,
    confidence: row.confidence,
    source: row.sourceLabel,
    sourceUrl: row.sourceUrl ?? undefined,
    lastVerified: row.lastVerified,
  };
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
    passage.disputedUnits.length > 1 ? `${index + 1}. ${unit.text}` : unit.text,
  );
  return [passage.disputedUnitsIntro, ...units].filter(Boolean).join("\n");
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

  for (const row of raw.evidence.greek) {
    const witness = evidenceRowToWitness(row, "greek-manuscript");
    if (row.directionClass === "FOR_KJV") greekSupportWitnesses.push(witness);
    else evidenceAgainst.push(witness);
  }

  for (const row of raw.evidence.versions) {
    const kind = classifyVersionKind(row.details);
    const witness = evidenceRowToWitness(row, kind);
    if (row.directionClass === "FOR_KJV") {
      if (kind === "latin") latinWitnesses.push(witness);
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
    greekSupportWitnesses,
    latinWitnesses,
    versionalWitnesses,
    patristicWitnesses,
    evidenceAgainst,
    timeline: raw.timeline.map((event) => ({
      date: event.date,
      label: event.label,
      type: inferTimelineType(event.label),
    })),
    sources: links.map((source) => source.label),
  };
}

if (rawWave2Data.passageCount !== 21 || rawWave2Data.passages.length !== 21) {
  throw new Error("Wave 2 must contain exactly 21 passages.");
}

export const wave2Passages: Passage[] = rawWave2Data.passages.map(mapPassage);
