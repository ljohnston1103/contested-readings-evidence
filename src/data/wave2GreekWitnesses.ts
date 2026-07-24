import type {
  EvidenceDirection,
  EvidenceKind,
  EvidenceRelationship,
  Witness,
} from "./types";
import {
  resolveGreekWitness,
  type GreekCorpus,
  type ResolvedGreekWitness,
} from "./witnessCatalog";

export type Wave2GreekRow = {
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

type Addition = {
  siglum?: string;
  witness?: string;
  date?: string;
  dateStart?: number;
  dateEnd?: number;
  direction?: EvidenceDirection;
  relationship?: EvidenceRelationship;
  note: string;
  aggregate?: boolean;
};

type RowOverride = {
  skip?: string[];
  additions?: Addition[];
};

const aggregateDateSource = "INTF Kurzgefasste Liste / NTVMR manuscript metadata";
const aggregateDateSourceUrl =
  "https://ntvmr.uni-muenster.de/liste?docID=LISTE";

const rowOverrides: Record<string, RowOverride> = {
  "luke-4-4:0": {
    // The source's fuller-reading row explicitly assigns 157 to an expanded
    // Deuteronomy form, so it must not also appear as exact KJV support.
    skip: ["157"],
  },
  "matthew-27-35:0": {
    additions: [
      {
        siglum: "174",
        direction: "AGAINST_KJV",
        relationship: "related",
        note: "Omits the added clause; within Family 13 (a group of about thirteen related manuscripts) this one is the exception.",
      },
      {
        siglum: "828",
        direction: "AGAINST_KJV",
        relationship: "related",
        note: "Omits the added clause; within Family 13 (a group of about thirteen related manuscripts) this one is the exception.",
      },
      {
        siglum: "983",
        direction: "OTHER",
        relationship: "related",
        note: "Relocates the fulfillment clause after verse 36 rather than omitting it.",
      },
    ],
  },
  "matthew-27-35:1": {
    skip: ["Maj/Byz"],
    additions: [
      {
        witness:
          "Remaining extant Greek manuscript tradition (including Byzantine witnesses)",
        date: "Fourth–sixteenth centuries (aggregate tradition)",
        dateStart: 301,
        dateEnd: 1600,
        direction: "AGAINST_KJV",
        relationship: "related",
        note: "Stands for the group of other surviving Greek manuscripts that omit the added clause — a group drawn from the roughly 5,800 catalogued copies, not one manuscript.",
        aggregate: true,
      },
    ],
  },
  "luke-24-6:0": {
    additions: [
      {
        siglum: "C*",
        direction: "RELATED_TO_KJV",
        relationship: "related",
        note: "Includes the clause without ἀλλά; this is close support rather than an exact word-for-word match.",
      },
      {
        siglum: "W",
        direction: "RELATED_TO_KJV",
        relationship: "related",
        note: "Uses the active wording “rose” rather than “was raised”; it does not omit the clause.",
      },
      {
        witness: "Remaining extant Greek manuscript tradition",
        date: "Fourth–sixteenth centuries (aggregate tradition)",
        dateStart: 301,
        dateEnd: 1600,
        direction: "FOR_KJV",
        relationship: "exact",
        note: "Stands for the other surviving Greek manuscripts reported as including the clause — a group, not one manuscript.",
        aggregate: true,
      },
    ],
  },
  "john-3-13:0": {
    skip: ["A"],
    additions: [
      {
        siglum: "Ac",
        direction: "FOR_KJV",
        relationship: "exact",
        note: "The correcting hand supplies the exact longer form.",
      },
      {
        siglum: "A*",
        direction: "RELATED_TO_KJV",
        relationship: "related",
        note: "The first hand has the longer phrase but lacks the participle “being”; it is related rather than exact support.",
      },
    ],
  },
  "ephesians-3-9:0": {
    additions: [
      {
        siglum: "2817",
        direction: "FOR_KJV_FELLOWSHIP",
        relationship: "exact",
        note: "Directly catalogued Greek witness for κοινωνία (“fellowship”); no larger manuscript count is claimed.",
      },
    ],
  },
  "1-john-4-3:0": {
    additions: [
      ...[
        "ℵ",
        "Ψ",
        "33",
        "81",
        "436",
        "630",
        "1067",
        "1409",
        "1505",
        "1611",
        "1852",
        "2138",
        "2464",
        "2495",
      ].map(
        (siglum): Addition => ({
          siglum,
          direction: "RELATED_TO_KJV_FULLER",
          relationship: "related",
          note: "Attests a related fuller “Jesus … in flesh” form, not the exact wording shared by every member of the fuller family.",
        }),
      ),
    ],
  },
  "1-john-4-3:2": {
    skip: ["1739"],
    additions: [
      {
        siglum: "1739mg",
        direction: "OTHER_DISSOLVES",
        relationship: "related",
        note: "The λύει (“dissolves”) reading occurs as a marginal alternative, not in the manuscript's main text.",
      },
    ],
  },
  "revelation-1-8:2": {
    additions: [
      {
        siglum: "2074",
        direction: "RELATED_EXPANSION",
        relationship: "related",
        note: "Reads τὸ ὦ ἀρχὴ καὶ τὸ τέλος, a related expansion rather than the exact KJV-aligned form.",
      },
    ],
  },
  "revelation-16-5:1": {
    additions: [
      {
        witness: "All Greek manuscripts in Palmer's collation",
        date: "Fourth–sixteenth centuries (aggregate collation)",
        dateStart: 301,
        dateEnd: 1600,
        direction: "AGAINST_KJV_LORD",
        relationship: "related",
        note: "Aggregate collation statement: the witnesses omit κύριε. This is not an individual manuscript.",
        aggregate: true,
      },
    ],
  },
  "revelation-22-19:2": {
    additions: [
      {
        witness: "Remaining extant Greek manuscript tradition",
        date: "Fourth–sixteenth centuries (aggregate tradition)",
        dateStart: 301,
        dateEnd: 1600,
        direction: "AGAINST_KJV_TREE",
        relationship: "related",
        note: "Stands for the remaining readable Greek manuscripts that read ξύλου (“tree”) — a group, not one manuscript.",
        aggregate: true,
      },
    ],
  },
};

function corpusForBook(book: string): GreekCorpus {
  if (["Matthew", "Mark", "Luke", "John"].includes(book)) return "gospels";
  if (book === "Acts") return "acts";
  if (book === "Revelation") return "revelation";
  if (/^(?:Romans|1 Corinthians|2 Corinthians|Galatians|Ephesians|Philippians|Colossians|1 Thessalonians|2 Thessalonians|1 Timothy|2 Timothy|Titus|Philemon|Hebrews)$/u.test(book)) {
    return "paul";
  }
  return "catholic";
}

function looksLikeSiglum(token: string) {
  return /^(?:P\d+(?:\/P\d+)?(?:vid)?|ℵ(?:[^\s]*)?|[A-ZΔΘΞΣΦΨ](?:[0-9*]|c|mg|txt|vid|s|\/)*|f\d+(?:-[A-Za-z0-9]+)*|0\d{2,3}(?:[A-Za-z*]+)?|\d{1,4}(?:[A-Za-z*]+)?|Maj(?:\/Byz)?|Byz|Lect|K\/Byz)$/u.test(
    token,
  );
}

function candidateSigla(details: string) {
  const witnessList = details.split(/[.;]/u, 1)[0];
  return witnessList
    .replaceAll("`", "")
    .replace(/[()[\],]/gu, " ")
    .split(/\s+/u)
    .map((token) => token.replace(/^["'“”‘’]+|["'“”‘’]+$/gu, ""))
    .filter(Boolean)
    .filter(looksLikeSiglum);
}

function publicWitnessName(
  resolved: ResolvedGreekWitness,
  rawSiglum: string,
) {
  const normalizedRaw = rawSiglum.normalize("NFKC");
  if (
    resolved.key === normalizedRaw ||
    resolved.displayName.includes(normalizedRaw)
  ) {
    return resolved.displayName;
  }
  return `${resolved.displayName} — ${normalizedRaw}`;
}

function catalogWitness(
  row: Wave2GreekRow,
  resolved: ResolvedGreekWitness,
  rawSiglum: string,
  overrides: Partial<Witness> = {},
): Witness {
  const laterContributionIsUndated =
    resolved.qualifier === "corrector" ||
    resolved.qualifier === "corrector-probable" ||
    resolved.qualifier === "corrector-or-margin" ||
    resolved.qualifier === "margin" ||
    resolved.qualifier === "supplement" ||
    resolved.qualifier === "numbered-corrector";

  return {
    witness: publicWitnessName(resolved, rawSiglum),
    date: resolved.date,
    dateStart: resolved.dateStart,
    dateEnd: resolved.dateEnd,
    dateUncertain:
      overrides.dateUncertain ?? laterContributionIsUndated,
    dateSource: resolved.dateSource,
    dateSourceUrl: resolved.dateSourceUrl,
    // The unit heading already states the shared reading. Keep only
    // witness-specific qualifications here instead of repeating identical
    // boilerplate on every manuscript row.
    note: [overrides.note, resolved.note]
      .filter(Boolean)
      .join(" "),
    kind: "greek-manuscript",
    direction: overrides.direction ?? row.direction,
    unitId: row.unit,
    unitLabel: row.unitLabel,
    unit: row.unitLabel,
    confidence: row.confidence,
    source: row.sourceLabel,
    sourceUrl: row.sourceUrl ?? undefined,
    lastVerified: row.lastVerified,
    relationship:
      overrides.relationship ??
      (row.directionClass === "FOR_KJV"
        ? "exact"
        : row.directionClass === "QUALIFICATION"
          ? "mixed"
          : "related"),
    aggregate: resolved.aggregate,
  };
}

function manualAddition(
  row: Wave2GreekRow,
  corpus: GreekCorpus,
  addition: Addition,
): Witness | undefined {
  if (addition.siglum) {
    const resolved = resolveGreekWitness(addition.siglum, corpus);
    if (!resolved) {
      throw new Error(
        `Unresolved curated Greek siglum ${addition.siglum} for ${row.unit}`,
      );
    }
    return catalogWitness(row, resolved, addition.siglum, {
      direction: addition.direction,
      relationship: addition.relationship,
      note: addition.note,
    });
  }
  if (!addition.witness || !addition.date || !addition.dateStart || !addition.dateEnd) {
    return undefined;
  }
  return {
    witness: addition.witness,
    date: addition.date,
    dateStart: addition.dateStart,
    dateEnd: addition.dateEnd,
    dateSource: aggregateDateSource,
    dateSourceUrl: aggregateDateSourceUrl,
    note: addition.note,
    kind: "greek-manuscript",
    direction: addition.direction ?? row.direction,
    unitId: row.unit,
    unitLabel: row.unitLabel,
    unit: row.unitLabel,
    confidence: row.confidence,
    source: row.sourceLabel,
    sourceUrl: row.sourceUrl ?? undefined,
    lastVerified: row.lastVerified,
    relationship: addition.relationship ?? "related",
    aggregate: addition.aggregate ?? true,
  };
}

export function normalizeWave2GreekRow(
  slug: string,
  book: string,
  rowIndex: number,
  row: Wave2GreekRow,
): Witness[] {
  const corpus = corpusForBook(book);
  const override = rowOverrides[`${slug}:${rowIndex}`];
  const skipped = new Set(
    (override?.skip ?? []).map((siglum) => siglum.normalize("NFKC")),
  );
  const seen = new Set<string>();
  const witnesses: Witness[] = [];

  for (const siglum of candidateSigla(row.details)) {
    if (skipped.has(siglum.normalize("NFKC"))) continue;
    const resolved = resolveGreekWitness(siglum, corpus);
    if (!resolved) continue;
    const identity = `${resolved.key}|${resolved.qualifier ?? ""}|${resolved.qualifierText ?? ""}`;
    if (seen.has(identity)) continue;
    seen.add(identity);
    witnesses.push(catalogWitness(row, resolved, siglum));
  }

  for (const addition of override?.additions ?? []) {
    const witness = manualAddition(row, corpus, addition);
    if (!witness) continue;
    const identity = `${witness.witness}|${witness.direction ?? ""}`;
    if (seen.has(identity)) continue;
    seen.add(identity);
    witnesses.push(witness);
  }

  return witnesses;
}

function printedWitness(
  witness: string,
  date: string,
  dateStart: number,
  dateEnd: number,
  note: string,
  unitId: string,
  unitLabel: string,
  direction: EvidenceDirection,
  source: string,
  sourceUrl?: string,
): Witness {
  return {
    witness,
    date,
    dateStart,
    dateEnd,
    dateSource: source,
    dateSourceUrl: sourceUrl,
    note,
    kind: "printed",
    direction,
    unitId,
    unitLabel,
    unit: unitLabel,
    source,
    sourceUrl,
    relationship: "printed",
  };
}

export const wave2PrintedWitnesses: Readonly<Record<string, Witness[]>> = {
  "acts-20-28": [
    printedWitness(
      "Scrivener Textus Receptus",
      "AD 1894",
      1894,
      1894,
      "Prints διὰ τοῦ ἰδίου αἵματος, the word order represented by the KJV.",
      "unit-2",
      "Word order in the phrase translated “with his own blood”",
      "FOR_KJV",
      "Scrivener, The New Testament in the Original Greek according to the Text Followed in the Authorised Version",
    ),
    printedWitness(
      "Westcott–Hort Greek New Testament",
      "AD 1881",
      1881,
      1881,
      "Prints διὰ τοῦ αἵματος τοῦ ἰδίου, the competing word order.",
      "unit-2",
      "Word order in the phrase translated “with his own blood”",
      "AGAINST_KJV",
      "Westcott and Hort, The New Testament in the Original Greek",
    ),
    printedWitness(
      "Robinson–Pierpont Byzantine Textform",
      "AD 2018",
      2018,
      2018,
      "Prints the same word order as the Textus Receptus for this unit.",
      "unit-2",
      "Word order in the phrase translated “with his own blood”",
      "FOR_KJV",
      "Robinson–Pierpont Byzantine Textform 2018",
      "https://byzantinetext.com/wp-content/uploads/2021/03/robinson-pierpont-2018-gnt-edition.pdf",
    ),
  ],
  "ephesians-3-9": [
    printedWitness(
      "Textus Receptus editions",
      "AD 1516–1894 (edition tradition)",
      1516,
      1894,
      "Printed Greek editions that read κοινωνία (“fellowship”) here — a group of printed editions, not handwritten manuscript evidence.",
      "unit-1",
      "κοινωνία (“fellowship”) versus οἰκονομία (“dispensation/administration/stewardship”)",
      "FOR_KJV_FELLOWSHIP",
      "Textus Receptus printed tradition",
    ),
  ],
  "revelation-1-11": [
    printedWitness(
      "Textus Receptus editions",
      "AD 1516–1894 (edition tradition)",
      1516,
      1894,
      "Printed Greek editions that carry the full Alpha and Omega wording found in the KJV — printed editions, not early manuscript evidence.",
      "primary",
      "The full “I am Alpha and Omega, the first and the last” expansion",
      "FOR_KJV_EXACT",
      "Textus Receptus printed tradition",
    ),
  ],
  "revelation-16-5": [
    printedWitness(
      "Beza's third Greek edition",
      "AD 1582",
      1582,
      1582,
      "Prints καὶ ὁ ἐσόμενος, the exact future-tense Greek form represented by the KJV.",
      "unit-2",
      "καὶ ὁ ἐσόμενος (“and the one who shall be”)",
      "FOR_KJV_FUTURE",
      "Palmer, Revelation 16:5 apparatus",
      "https://www.bibletranslation.ws/trans/revwgrk.pdf",
    ),
    printedWitness(
      "Earlier Textus Receptus editions",
      "AD 1516–1551",
      1516,
      1551,
      "Print καὶ ὁ ὅσιος rather than Beza's later future-tense form.",
      "unit-2",
      "καὶ ὁ ἐσόμενος (“and the one who shall be”) versus forms of ὁ ὅσιος (“the Holy One”)",
      "AGAINST_KJV_KAI_HO_HOSIOS",
      "Palmer, Revelation 16:5 apparatus",
      "https://www.bibletranslation.ws/trans/revwgrk.pdf",
    ),
  ],
  "revelation-22-19": [
    printedWitness(
      "Erasmus's first Greek New Testament",
      "AD 1516",
      1516,
      1516,
      "Prints the exact βίβλου (“book”) form followed by the received Greek text.",
      "primary",
      "βίβλου τῆς ζωῆς (“book of life”) versus ξύλου τῆς ζωῆς (“tree of life”)",
      "FOR_KJV_EXACT_BIBLOU",
      "Palmer, Revelation 22:19 apparatus",
      "https://www.bibletranslation.ws/trans/revwgrk.pdf",
    ),
  ],
};

export const wave2CrossLanguageWitnesses: Readonly<
  Record<string, Witness[]>
> = {
  "john-3-13": [
    {
      witness: "Old Latin e",
      date: "Fifth century",
      dateStart: 401,
      dateEnd: 500,
      dateSource: "Wieland Willker, Textual Commentary on John",
      dateSourceUrl: "https://www.willker.de/wie/TCG/TC-John.pdf",
      note: "Reads a related “who was in heaven” form rather than the exact KJV wording.",
      kind: "latin",
      direction: "OTHER",
      unitId: "primary",
      unitLabel:
        "ὁ ὢν ἐν τῷ οὐρανῷ (“who/which is in heaven”) and related ancient forms",
      unit:
        "ὁ ὢν ἐν τῷ οὐρανῷ (“who/which is in heaven”) and related ancient forms",
      relationship: "related",
    },
  ],
};

export function evidenceKindForCatalogKind(
  kind: ResolvedGreekWitness["kind"],
): EvidenceKind {
  return kind === "printed-edition" ? "printed" : "greek-manuscript";
}
