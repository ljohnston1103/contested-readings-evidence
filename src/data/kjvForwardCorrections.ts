import correctionsData from "./kjv-forward.generated.json";
import type {
  EarliestSupport,
  EvidenceRelationship,
  Passage,
  PatristicWitness,
  ReferenceEntry,
  Witness,
} from "./types";

type GeneratedCorrections = typeof correctionsData;

const corrections = correctionsData as GeneratedCorrections;
const earliestBySlug = new Map(
  corrections.earliestSupport.map((entry) => [entry.slug, entry]),
);
const copyBySlug = new Map(
  corrections.wave2Copy.map((entry) => [entry.slug, entry]),
);
const referencesBySlug = new Map(
  corrections.references.map((entry) => [entry.slug, entry.entries]),
);
const olderCategoryBySlug = new Map(
  corrections.olderCategoryRows.map((entry) => [
    entry.slug,
    entry.supportCategory,
  ]),
);
const olderConclusionBySlug = new Map(
  corrections.olderConclusions.map((entry) => [
    entry.slug,
    entry.editorialConclusion,
  ]),
);

const commonReferences: ReferenceEntry[] = [
  {
    citation:
      "Institut für Neutestamentliche Textforschung. New Testament Virtual Manuscript Room. Münster: University of Münster.",
    links: [
      {
        label: "New Testament Virtual Manuscript Room",
        url: "https://ntvmr.uni-muenster.de/",
      },
    ],
  },
  {
    citation:
      "Aland, Barbara, et al., eds. Novum Testamentum Graece. 28th rev. ed. Stuttgart: Deutsche Bibelgesellschaft, 2012.",
  },
  {
    citation:
      "Robinson, Maurice A., and William G. Pierpont. The New Testament in the Original Greek: Byzantine Textform 2018. Nürnberg: VTR Publications, 2018.",
    links: [
      {
        label:
          "The New Testament in the Original Greek: Byzantine Textform 2018",
        url: "https://byzantinetext.com/wp-content/uploads/2021/03/robinson-pierpont-2018-gnt-edition.pdf",
      },
    ],
  },
  {
    citation:
      "Tyndale House, Cambridge, ed. The Greek New Testament. Wheaton, IL: Crossway, 2017.",
  },
];

function groupedDate(groupPrefix: string) {
  const match = corrections.groupedDates.find((entry) =>
    entry.group.startsWith(groupPrefix),
  );
  if (!match) throw new Error(`Missing grouped public date for ${groupPrefix}`);
  return match.publicDate;
}

const wave2PublicDates: Record<
  string,
  { greek?: string[]; versions?: string[] }
> = {
  "matthew-1-25": {
    greek: [groupedDate("Matthew 1:25 — Greek group")],
    versions: [groupedDate("Matthew 1:25 — Latin and Syriac group")],
  },
  "matthew-5-22": {
    greek: [groupedDate("Matthew 5:22 — Greek group")],
    versions: [groupedDate("Matthew 5:22 — versional group")],
  },
  "matthew-5-44": {
    greek: [groupedDate("Matthew 5:44 — Greek group")],
    versions: [groupedDate("Matthew 5:44 — versional group")],
  },
  "matthew-19-16-17": {
    greek: [
      groupedDate("Matthew 19:16–17 — Greek groups"),
      groupedDate("Matthew 19:16–17 — Greek groups"),
    ],
    versions: [groupedDate("Matthew 19:16–17 — versional group")],
  },
  "matthew-27-35": {
    greek: [groupedDate("Matthew 27:35 — Greek group")],
    versions: [groupedDate("Matthew 27:35 — versional group")],
  },
  "mark-1-2": {
    greek: [groupedDate("Mark 1:2 — Greek group")],
    versions: [groupedDate("Mark 1:2 — versional group")],
  },
  "mark-10-24": {
    greek: [groupedDate("Mark 10:24 — Greek group")],
    versions: [groupedDate("Mark 10:24 — versional group")],
  },
  "luke-2-14": {
    greek: [groupedDate("Luke 2:14 — Greek group")],
    versions: [groupedDate("Luke 2:14 — versional group")],
  },
  "luke-2-33": {
    greek: [groupedDate("Luke 2:33 — Greek group")],
    versions: [groupedDate("Luke 2:33 — versional group")],
  },
  "luke-4-4": {
    greek: [groupedDate("Luke 4:4 — Greek group")],
    versions: [groupedDate("Luke 4:4 — versional group")],
  },
  "luke-24-6": {
    greek: [groupedDate("Luke 24:6 — Greek group")],
    versions: [groupedDate("Luke 24:6 — Latin group")],
  },
  "john-3-13": {
    greek: [groupedDate("John 3:13 — Greek group")],
    versions: [groupedDate("John 3:13 — versional group")],
  },
  "acts-20-28": {
    greek: [groupedDate("Acts 20:28 — Greek “God” group")],
    versions: [groupedDate("Acts 20:28 — Vulgate and Syriac group")],
  },
  "romans-14-10": {
    greek: [groupedDate("Romans 14:10 — Greek “Christ” group")],
    versions: [groupedDate("Romans 14:10 — versional group")],
  },
  "1-corinthians-15-47": {
    greek: [groupedDate("1 Corinthians 15:47 — Greek “the Lord” group")],
    versions: [groupedDate("1 Corinthians 15:47 — versional group")],
  },
  "ephesians-3-9": {
    greek: [
      groupedDate("Ephesians 3:9 — “fellowship” group"),
      groupedDate("Ephesians 3:9 — “by Jesus Christ” Greek group"),
    ],
    versions: [groupedDate("Ephesians 3:9 — Syriac Harklean")],
  },
  "1-john-4-3": {
    greek: [
      groupedDate("1 John 4:3 — exact KJV-family Greek group"),
    ],
  },
  "revelation-1-8": {
    greek: [
      groupedDate("Revelation 1:8 — “beginning and ending” Greek group"),
      "",
    ],
    versions: [
      groupedDate("Revelation 1:8 — “saith the Lord” versional group"),
      groupedDate("Revelation 1:8 — “saith the Lord” versional group"),
    ],
  },
  "revelation-1-11": {
    greek: [groupedDate("Revelation 1:11 — exact Greek expansion group")],
  },
  "revelation-16-5": {
    greek: ["", ""],
    versions: [
      groupedDate("Revelation 16:5 — “O Lord” versional group"),
      groupedDate("Revelation 16:5 — related future-tense evidence"),
    ],
  },
  "revelation-22-19": {
    greek: [""],
    versions: [
      groupedDate(
        "Revelation 22:19 — “book of life” versional/patristic group",
      ),
    ],
  },
};

function inferRelationship(row: Witness): EvidenceRelationship {
  if (row.relationship) return row.relationship;
  if (row.direction?.includes("RELATED")) return "related";
  if (row.direction?.includes("MIXED")) return "mixed";
  if (row.kind === "printed") return "printed";
  if (
    row.kind === "latin" ||
    row.kind === "syriac" ||
    row.kind === "coptic" ||
    row.kind === "version"
  ) {
    return "versional";
  }
  return "exact";
}

function isNegativeSupport(row: Witness) {
  return /\b(?:does not|do not|omits?|lacks?|no known|no Greek manuscripts?|not evidence for either)\b/iu.test(
    `${row.witness} ${row.note}`,
  );
}

function isVagueDate(date: string) {
  return (
    !date.trim() ||
    /^(?:ancient|early|later|medieval|byzantine|latin tradition|church fathers)/iu.test(
      date.trim(),
    ) ||
    /early to medieval|medieval to early modern|early centuries|medieval period|later correction|early to medieval|later ecclesiastical tradition/iu.test(
      date,
    )
  );
}

function fallbackDate(row: Witness, passage: Passage) {
  const text = `${row.witness} ${row.note}`;
  if (/Harklean|Harclean/iu.test(text)) return "AD 616";
  if (/Peshitta/iu.test(text)) return "Early fifth century";
  if (/Gothic/iu.test(text)) return "c. AD 350";
  if (/Old Latin|Latin/iu.test(text)) return "Fourth century onward";
  if (/Vulgate/iu.test(text)) return "c. AD 382–405";
  if (/Coptic|Bohairic|Sahidic/iu.test(text)) return "Fourth century onward";
  if (/Armenian/iu.test(text)) return "Fifth century onward";
  if (/lectionar/iu.test(text)) return "Sixth century onward";
  if (/Byzantine|Majority/iu.test(text)) return "Sixth century onward";
  const earliest = earliestBySlug.get(passage.slug);
  return (
    earliest?.statement.split(" — ")[0]?.trim() ||
    "Date documented in the curated evidence record"
  );
}

function dateSupportingRows(
  rows: Witness[],
  passage: Passage,
  publicDates: string[] | undefined,
) {
  return rows.map((row, index) => ({
    ...row,
    date:
      publicDates?.[index] ||
      (isVagueDate(row.date) ? fallbackDate(row, passage) : row.date),
    relationship: inferRelationship(row),
  }));
}

function moveNegativeRows(
  passage: Passage,
  rows: Witness[],
  competing: Witness[],
) {
  const support: Witness[] = [];
  for (const row of rows) {
    if (isNegativeSupport(row)) {
      competing.push({
        ...row,
        direction: "AGAINST_KJV",
        relationship: "related",
      });
    } else {
      support.push(row);
    }
  }
  return support;
}

function earliestSupportFor(passage: Passage): EarliestSupport[] {
  const curated = earliestBySlug.get(passage.slug);
  if (!curated) throw new Error(`Missing curated earliest support for ${passage.slug}`);

  if (passage.slug === "matthew-19-16-17") {
    return [
      {
        label: "Verse 16 — traditional question",
        statement: curated.statement,
        earliestGreek: curated.earliestGreek,
      },
      {
        label: "Verse 17 — traditional answer",
        statement:
          "Fifth century — Codices C and W preserve the traditional wording of the second textual unit.",
        earliestGreek: curated.earliestGreek,
      },
    ];
  }

  if (passage.slug === "ephesians-3-9") {
    return [
      {
        label: "Unit 1 — “fellowship”",
        statement:
          "Twelfth century — minuscule 2817; early printed period — Textus Receptus.",
        earliestGreek: "Twelfth century — minuscule 2817.",
      },
      {
        label: "Unit 2 — “by Jesus Christ”",
        statement:
          "Late fourth century — Chrysostom, mixed exposition; sixth century or later — Greek correction D²; AD 616 — Syriac Harklean.",
        earliestGreek:
          "Sixth century or later — D², retaining the correction qualification.",
      },
    ];
  }

  if (passage.slug === "revelation-1-8") {
    return [
      {
        label: "Unit 1 — “the beginning and the ending”",
        statement:
          "Fourth century — Codex Sinaiticus first hand. Sinaiticus includes “the beginning and the ending.”",
        earliestGreek:
          "Fourth century — Codex Sinaiticus first hand.",
      },
      {
        label: "Unit 2 — “saith the Lord”",
        statement:
          "Fourth–fifth century onward — ancient Latin and versional evidence; the exact wording also stands in received-text history.",
        earliestGreek:
          "No surviving Greek manuscript is presently identified for the exact “saith the Lord” form.",
      },
    ];
  }

  if (passage.slug === "revelation-16-5") {
    return [
      {
        label: "Unit 1 — “O Lord”",
        statement:
          "Eighth century — Beatus of Liébana supplies related Latin commentary evidence; AD 1592 — the Clementine Vulgate contains the title.",
        earliestGreek:
          "No surviving Greek manuscript is presently identified for the added title.",
      },
      {
        label: "Unit 2 — “and shalt be”",
        statement:
          "Eighth century — Beatus of Liébana, related Latin future-tense form. Exact printed Greek form: AD 1582 — Beza’s third edition.",
        earliestGreek:
          "No surviving Greek manuscript is presently identified; the earliest exact Greek evidence is Beza’s printed text of AD 1582.",
      },
    ];
  }

  if (passage.slug === "revelation-22-19") {
    return [
      {
        label: "“Book of life” reading",
        statement:
          "Late fourth century — Ambrose and Bachiarius, Latin “book of life” evidence.",
        earliestGreek:
          "Related βιβλίου appears in minuscule 61, c. AD 1520, and the corrector of 2067.",
      },
      {
        label: "Exact received Greek form",
        statement: "AD 1516 — Erasmus, exact printed Greek βίβλου.",
        earliestGreek:
          "No surviving Greek manuscript is identified for exact Textus Receptus βίβλου.",
      },
    ];
  }

  if (passage.slug === "1-john-5-7") {
    return [
      {
        label: "Earliest related Latin evidence",
        statement:
          "c. AD 210 — Tertullian, Against Praxeas 25, related three-one theological language.",
      },
      {
        label: "Early debated verbal evidence",
        statement:
          "c. AD 250 — Cyprian, On the Unity of the Church 6; the verbal relationship is debated.",
      },
      {
        label: "Earliest explicit full Latin formula listed here",
        statement:
          "c. AD 380 — Priscillian, Liber Apologeticus 1, gives the Father, the Word, and the Spirit bearing witness in heaven and being one.",
      },
      {
        label: "Earliest Latin biblical-text witness listed here",
        statement:
          "Fifth century — Codex Speculum (m) contains the Comma in its Latin Scripture quotations.",
        earliestGreek:
          "AD 1362–1363 — GA 629, Codex Ottobonianus, is the earliest dated Greek main-text witness listed here.",
      },
    ];
  }

  return [
    {
      statement: curated.statement,
      earliestGreek: curated.earliestGreek,
    },
  ];
}

function oneJohnFiveSevenRows(passage: Passage) {
  const latinManuscripts = corrections.oneJohnFiveSeven.latinManuscripts.map(
    (row): Witness => ({
      witness: row.evidence,
      date: row.date,
      note: row.relationship,
      kind: "latin",
      relationship: "versional",
    }),
  );
  const supportingLatin = latinManuscripts.filter((row) => !isNegativeSupport(row));
  const competingLatin = latinManuscripts.filter(isNegativeSupport).map((row) => ({
    ...row,
    direction: "AGAINST_KJV",
  }));

  const greekSupportWitnesses = corrections.oneJohnFiveSeven.greekManuscripts.map(
    (row): Witness => ({
      witness: row.evidence,
      date: row.date,
      note: row.relationship,
      kind: "greek-manuscript",
      relationship: "exact",
    }),
  );

  const patristicWitnesses = corrections.oneJohnFiveSeven.latinWriters.map(
    (row): PatristicWitness => ({
      source: row.evidence,
      date: row.date,
      quoteSummary: row.relationship,
      reading: "FOR_KJV",
      relationship: /related|debated/iu.test(row.relationship)
        ? "theological_parallel"
        : "explicit_quote",
    }),
  );

  const reception = corrections.oneJohnFiveSeven.reception.map(
    (row): Witness => ({
      witness: row.evidence,
      date: row.date,
      note: row.relationship,
      kind: "printed",
      relationship: "printed",
    }),
  );

  return {
    ...passage,
    greekSupportWitnesses,
    latinWitnesses: supportingLatin,
    versionalWitnesses: [],
    patristicWitnesses,
    printedWitnesses: [
      ...(passage.printedWitnesses ?? []).filter(
        (row) =>
          !/Douay|Clementine|King James/iu.test(row.witness) &&
          !isVagueDate(row.date),
      ),
      ...reception,
    ],
    evidenceAgainst: [...passage.evidenceAgainst, ...competingLatin],
  };
}

function withEditorialConclusion(passage: Passage) {
  if (/\bOldest\s*&\s*Best\b.*\b(?:retain|favor)/iu.test(passage.shortSummary)) {
    return passage.shortSummary;
  }
  return `${passage.shortSummary} Oldest & Best retains the KJV reading while presenting the competing witnesses separately below.`;
}

function groupedWitnessNote(row: Witness) {
  const kind =
    row.kind === "latin"
      ? "Latin"
      : row.kind === "syriac"
        ? "Syriac"
        : row.kind === "coptic"
          ? "Coptic"
          : row.kind === "version"
            ? "versional"
            : row.kind === "printed"
              ? "printed-edition"
              : "Greek";
  return `Individually listed from the catalogued ${kind} witness group for this reading.`;
}

function expandLanguageGroup(value: string) {
  const clean = value
    .replace(/^(?:much of|broad|most|some|part of|portions of|the)\s+/iu, "")
    .replace(/\b(?:include|includes|support|supports|omit|omits|read|reads)\b.*$/iu, "")
    .replace(/[.;]+$/u, "")
    .trim();

  const slashGroup = clean.match(
    /^(Syriac|Coptic|Vulgate|Old Latin)\s+([\p{L}\d*.-]+(?:\/[\p{L}\d*.-]+)+)$/iu,
  );
  if (slashGroup) {
    return slashGroup[2]
      .split("/")
      .map((name) => `${slashGroup[1]} ${name}`);
  }

  const siglaGroup = clean.match(
    /^(Old Latin|Vulgate)\s+((?:[a-z]+\d*(?:,\d+)?\s*){2,})$/iu,
  );
  if (siglaGroup) {
    return siglaGroup[2]
      .trim()
      .split(/\s+/u)
      .map((siglum) => `${siglaGroup[1]} ${siglum}`);
  }

  return [clean];
}

function splitGroupedWitnesses(rows: Witness[]) {
  return rows.flatMap((row) => {
    const list = row.witness
      .replaceAll("`", "")
      .replace(/\band some others.*$/iu, "")
      .replace(/\bwithin .+$/iu, "")
      .replace(/\balthough .+$/iu, "")
      .replace(/[.;]+$/u, "")
      .trim();

    if (row.kind !== "greek-manuscript") {
      const looksGrouped =
        /,\s*[^,]+,\s*/u.test(list) ||
        /\b(?:Latin|Vulgate|Syriac|Coptic|Sahidic|Bohairic|Armenian|Georgian|Ethiopic|Gothic|Slavonic|Arabic)[^.;]*(?:,|\band\b|\/)[^.;]+/iu.test(
          list,
        );
      if (!looksGrouped) return [row];

      const witnesses = list
        .split(/\s*,\s*|\s*,?\s+and\s+/iu)
        .flatMap(expandLanguageGroup)
        .map((witness) => witness.trim())
        .filter(
          (witness) =>
            witness &&
            !/^(?:additional|another|other|several|some|most|wider|broader)\b/iu.test(
              witness,
            ),
        );

      if (witnesses.length < 2) return [row];
      return witnesses.map((witness) => ({
        ...row,
        witness,
        note: groupedWitnessNote(row),
      }));
    }

    const greekList = list.replaceAll(",", " ");
    const tokens = greekList.split(/\s+/u).filter(Boolean);
    const siglumPattern =
      /^(?:[\p{Lu}ℵΔΘΣΦΨ][\p{L}\d*/-]*|P\d+|0\d{2,3}|f\d+(?:-part)?|Maj|Byz|𝔓\d+|\d+[a-z]?|[a-z]\d+)$/u;
    const sigla = tokens.filter((token) => siglumPattern.test(token));

    if (tokens.length < 3 || sigla.length / tokens.length < 0.8) return [row];

    return sigla.map((witness) => ({
      ...row,
      witness: witness.replace(/\.$/u, ""),
      note: groupedWitnessNote(row),
    }));
  });
}

export function applyKjvForwardCorrections(sourcePassage: Passage): Passage {
  const copy = copyBySlug.get(sourcePassage.slug);
  const publicDates = wave2PublicDates[sourcePassage.slug];
  let competing = [...sourcePassage.evidenceAgainst];

  let passage: Passage = {
    ...sourcePassage,
    variantIssue: copy?.whyRetained ?? sourcePassage.variantIssue,
    shortSummary:
      copy?.editorialConclusion ??
      olderConclusionBySlug.get(sourcePassage.slug) ??
      withEditorialConclusion(sourcePassage),
    supportCategory:
      copy?.primarySupport ??
      olderCategoryBySlug.get(sourcePassage.slug) ??
      sourcePassage.supportCategory,
    cautions: copy?.evidenceNotes ?? sourcePassage.cautions,
    earliestSupport: earliestSupportFor(sourcePassage),
    references:
      (referencesBySlug.get(sourcePassage.slug) as ReferenceEntry[] | undefined) ??
      commonReferences,
  };

  if (passage.slug === "1-john-5-7") {
    passage = oneJohnFiveSevenRows(passage);
    competing = [...passage.evidenceAgainst];
  }

  const greekSupport = moveNegativeRows(
    passage,
    passage.greekSupportWitnesses,
    competing,
  );
  const latinSupport = moveNegativeRows(passage, passage.latinWitnesses, competing);
  const versionSupport = moveNegativeRows(
    passage,
    passage.versionalWitnesses,
    competing,
  );
  const printedSupport = moveNegativeRows(
    passage,
    passage.printedWitnesses ?? [],
    competing,
  );

  return {
    ...passage,
    greekSupportWitnesses: splitGroupedWitnesses(
      dateSupportingRows(greekSupport, passage, publicDates?.greek),
    ),
    latinWitnesses: splitGroupedWitnesses(
      dateSupportingRows(latinSupport, passage, publicDates?.versions),
    ),
    versionalWitnesses: splitGroupedWitnesses(
      dateSupportingRows(versionSupport, passage, publicDates?.versions),
    ),
    patristicWitnesses: passage.patristicWitnesses.map((witness) => ({
      ...witness,
      date: isVagueDate(witness.date)
        ? fallbackDate(
            {
              witness: witness.author ?? witness.source,
              date: witness.date,
              note: witness.quoteSummary,
              kind: "patristic",
            },
            passage,
          )
        : witness.date,
    })),
    printedWitnesses: splitGroupedWitnesses(
      dateSupportingRows(printedSupport, passage, undefined),
    ),
    evidenceAgainst: splitGroupedWitnesses(competing),
    manuscriptSnapshot: {
      ...passage.manuscriptSnapshot,
      supportCategory:
        copy?.primarySupport ??
        olderCategoryBySlug.get(sourcePassage.slug) ??
        passage.manuscriptSnapshot.supportCategory,
    },
  };
}
