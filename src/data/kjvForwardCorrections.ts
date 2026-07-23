import correctionsData from "./kjv-forward.generated.json";
import { parseEvidenceDate, sortWitnessRows } from "./evidenceDates";
import {
  resolveGreekWitness,
  resolveVersionWitness,
  type GreekCorpus,
  type ResolvedGreekWitness,
  type WitnessCatalogEntry,
} from "./witnessCatalog";
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
  if (
    /\bonward\b|early centuries|medieval period|archetype traced earlier|none known|modern forgery|later correction|uncertain date|date unknown/iu.test(
      date,
    )
  ) {
    return true;
  }
  if (parseEvidenceDate(date)) return false;
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

type PublicDate = {
  label: string;
  start: number;
  end: number;
};

const clarifiedAggregateNames: Readonly<Record<string, string>> = {
  "early syriac": "Early Syriac versional tradition (aggregate)",
  "early coptic": "Early Coptic versional tradition (aggregate)",
  "early important vulgate witnesses":
    "Early Vulgate manuscripts omitting the Comma (aggregate)",
  "old latin tradition": "Old Latin tradition (aggregate)",
  "greek manuscript majority": "Greek manuscript majority (aggregate)",
};

function isAggregateEvidenceRow(row: Witness) {
  const label = row.witness.normalize("NFKC").trim();
  return (
    row.kind === "summary" ||
    /^(?:approximately\s+)?\d[\d,+.%]*\s+(?:greek\s+)?manuscripts?\b/iu.test(
      label,
    ) ||
    /^(?:all|most|many|some|other|remaining|additional|two|three|one|hundreds of)\b/iu.test(
      label,
    ) ||
    /\b(?:majority|family \d+|lectionaries|lectionary system|witnesses|manuscripts|copies|representatives|textual tradition|manuscript tradition|liturgical tradition)\b/iu.test(
      label,
    ) ||
    (/\btradition\b/iu.test(label) &&
      !/\b(?:codex|ephrem)\b/iu.test(label))
  );
}

function publicEvidenceNote(note: string) {
  return note
    .replace(
      /Marginal Comma;\s*do not present the manuscript’s [^.;]+ as the date of the addition/iu,
      "Marginal Comma. The base-manuscript date is not the date of the later marginal addition",
    )
    .replace(
      /early Latin support should not be treated as if every Old Latin witness uniformly contains/iu,
      "early Latin support does not imply that every Old Latin witness uniformly contains",
    )
    .replace(
      /;\s*retain the disputed-date\/evidence qualification\.?/giu,
      ". Its date and evidential status remain disputed.",
    )
    .replace(/;\s*place under competing evidence\.?/giu, ".")
    .replace(/\s+\./gu, ".")
    .trim();
}

function joinPublicNotes(notes: Array<string | undefined>) {
  return notes
    .map((note) => note?.trim())
    .filter((note): note is string => Boolean(note))
    .reduce((joined, note) => {
      if (!joined) return note;
      return `${joined}${/[.!?;:]$/u.test(joined) ? " " : ". "}${note}`;
    }, "");
}

/**
 * Honest public ranges for aggregate traditions and undated correction hands
 * already present in the original 30 dossiers. These are deliberately broad:
 * an aggregate tradition is not a single manuscript, and a corrector must not
 * be assigned the date of an unrelated early witness in the same passage.
 */
function legacyPublicDate(row: Witness): PublicDate | undefined {
  const text = `${row.witness} ${row.date}`.normalize("NFKC");

  if (/Harklean|Harclean/iu.test(text)) {
    return { label: "AD 616", start: 616, end: 616 };
  }
  if (/Curetonian Syriac/iu.test(text)) {
    return { label: "Fifth century", start: 401, end: 500 };
  }
  if (/Sinaitic Syriac/iu.test(text)) {
    return {
      label: "Late fourth to early fifth century",
      start: 367,
      end: 433,
    };
  }
  if (/Syriac Peshitta/iu.test(text)) {
    return {
      label: "Early fifth–sixteenth centuries (versional manuscript tradition)",
      start: 401,
      end: 1600,
    };
  }
  if (/Palestinian Syriac|Christian Palestinian Aramaic/iu.test(text)) {
    return {
      label: "c. AD 500–1200 (manuscript tradition)",
      start: 500,
      end: 1200,
    };
  }
  if (/Gothic/iu.test(text)) {
    return { label: "c. AD 350", start: 350, end: 350 };
  }
  if (/Old Latin|early Latin transmission/iu.test(text)) {
    return {
      label: "c. AD 200–500 (Old Latin tradition)",
      start: 200,
      end: 500,
    };
  }
  if (
    /\bLatin\b/iu.test(text) &&
    !/Old Latin|Vulgate/iu.test(text)
  ) {
    return {
      label: "c. AD 300–1500 (Latin manuscript tradition)",
      start: 300,
      end: 1500,
    };
  }
  if (/Vulgate/iu.test(text)) {
    return {
      label: "c. AD 382–1500 (Vulgate manuscript tradition)",
      start: 382,
      end: 1500,
    };
  }
  if (/Bohairic|Sahidic|Coptic|Middle Egyptian/iu.test(text)) {
    return {
      label: "c. AD 300–1500 (Coptic manuscript tradition)",
      start: 300,
      end: 1500,
    };
  }
  if (/Armenian/iu.test(text)) {
    return {
      label: "c. AD 400–1500 (Armenian manuscript tradition)",
      start: 400,
      end: 1500,
    };
  }
  if (/Georgian/iu.test(text)) {
    return {
      label: "c. AD 400–1500 (Georgian manuscript tradition)",
      start: 400,
      end: 1500,
    };
  }
  if (/Ethiopic/iu.test(text)) {
    return {
      label: "c. AD 500–1500 (Ethiopic manuscript tradition)",
      start: 500,
      end: 1500,
    };
  }
  if (/Slavonic/iu.test(text)) {
    return {
      label: "c. AD 900–1500 (Old Church Slavonic tradition)",
      start: 900,
      end: 1500,
    };
  }
  if (/Codex Sinaiticus.*(?:correction|corrector)/iu.test(text)) {
    return {
      label:
        "After c. AD 330–360; correction hand not independently dated here",
      start: 330,
      end: 1000,
    };
  }
  if (/Codex Alexandrinus.*(?:correction|corrector)/iu.test(text)) {
    return {
      label:
        "After c. AD 400–450; correction hand not independently dated here",
      start: 400,
      end: 1000,
    };
  }
  if (/Codex (?:Ephraemi|Bezae).*(?:correction|corrector)/iu.test(text)) {
    return {
      label:
        "After the fifth-century manuscript; correction hand not independently dated here",
      start: 401,
      end: 1000,
    };
  }
  if (/lectionar/iu.test(text)) {
    return {
      label: "c. AD 500–1500 (lectionary manuscript tradition)",
      start: 500,
      end: 1500,
    };
  }
  if (/Byzantine|Majority/iu.test(text)) {
    return {
      label: "c. AD 500–1500 (Byzantine manuscript tradition)",
      start: 500,
      end: 1500,
    };
  }
  if (/\bFamily 1\b/iu.test(text)) {
    return {
      label: "Tenth–fourteenth centuries (extant family members)",
      start: 901,
      end: 1400,
    };
  }
  if (/\bFamily 13\b/iu.test(text)) {
    return {
      label: "Eleventh–fifteenth centuries (extant family members)",
      start: 1001,
      end: 1500,
    };
  }
  if (/Textus Receptus|Erasmus/iu.test(text)) {
    return {
      label: "AD 1516–1894 (printed Textus Receptus editions)",
      start: 1516,
      end: 1894,
    };
  }
  if (/medieval to early modern/iu.test(text)) {
    return { label: "c. AD 500–1700", start: 500, end: 1700 };
  }
  if (/early to medieval|early centuries|early AD|early medieval/iu.test(text)) {
    return { label: "c. AD 200–1500", start: 200, end: 1500 };
  }
  if (/medieval|later ecclesiastical tradition/iu.test(text)) {
    return { label: "c. AD 500–1500", start: 500, end: 1500 };
  }
  return undefined;
}

function normalizeWitnessDate(row: Witness): Witness {
  const existing = parseEvidenceDate(row.date);
  const catalogEntry = resolveVersionWitness(row.witness);
  const normalizedName = normalizedWitnessIdentity(row.witness);
  const clarifiedWitness =
    clarifiedAggregateNames[normalizedName] ?? row.witness;
  const isClarifiedAggregate = clarifiedWitness !== row.witness;
  const hasStructuredDate =
    Number.isFinite(row.dateStart) || Number.isFinite(row.dateEnd);
  const contributionDate: PublicDate | undefined =
    normalizedName === "ga 429 margin"
      ? {
          label: row.date,
          start: 1523,
          end: 1900,
        }
      : normalizedName === "ga 177 margin"
        ? {
            label: row.date,
            start: 1785,
            end: 1785,
          }
        : normalizedName === "ga 221 margin"
          ? {
              label: row.date,
              start: 1855,
              end: 1900,
            }
          : normalizedName === "ga 88 margin"
            ? {
                label: row.date,
                start: 1201,
                end: 1900,
              }
            : normalizedName === "ga 636 margin"
              ? {
                  label: row.date,
                  start: 1401,
                  end: 1500,
                }
              : undefined;
  let replacement =
    !hasStructuredDate && isVagueDate(row.date)
      ? legacyPublicDate(row)
      : undefined;
  if (
    !replacement &&
    existing &&
    /\b(?:correction|corrector|margin|marginal)\b/iu.test(row.witness) &&
    !/\bfirst hand\b/iu.test(row.witness) &&
    !/base manuscript|not independently dated|later addition/iu.test(row.date)
  ) {
    replacement = {
      label: `${row.date.replace(/\s*\/\s*(?:later )?correction$/iu, "")} (base manuscript; later hand not independently dated)`,
      start: existing.start,
      end: existing.end,
    };
  }
  const catalogDate = catalogEntry
    ? {
        label: catalogEntry.date,
        start: catalogEntry.dateStart,
        end: catalogEntry.dateEnd,
      }
    : undefined;
  const range = catalogDate ?? contributionDate ?? replacement ?? existing;
  const finalDate =
    catalogDate?.label ??
    contributionDate?.label ??
    replacement?.label ??
    row.date;
  const dateUncertain =
    row.dateUncertain ??
    ((normalizedName === "ga 88 margin" ||
      normalizedName === "ga 636 margin" ||
      /not independently dated|not separately dated|uncertain date/iu.test(
        finalDate,
      )) &&
      /\b(?:correction|corrector|margin|marginal|supplement)\b/iu.test(
        `${row.witness} ${row.note}`,
      ));

  return {
    ...row,
    witness: clarifiedWitness,
    date: finalDate,
    dateStart: catalogDate?.start ?? row.dateStart ?? range?.start,
    dateEnd: catalogDate?.end ?? row.dateEnd ?? range?.end,
    dateSource: row.dateSource ?? catalogEntry?.dateSource,
    dateSourceUrl: row.dateSourceUrl ?? catalogEntry?.dateSourceUrl,
    dateUncertain,
    aggregate:
      row.aggregate === true ||
      catalogEntry?.aggregate === true ||
      isClarifiedAggregate ||
      isAggregateEvidenceRow(row),
    note: publicEvidenceNote(row.note),
    relationship: inferRelationship(row),
  };
}

const legacyGroupedWitnesses: Readonly<Record<string, readonly string[]>> = {
  "other old latin witnesses c g1 f l q r1 aur": [
    "Old Latin c",
    "Old Latin g1",
    "Old Latin f",
    "Old Latin l",
    "Old Latin q",
    "Old Latin r1",
    "Old Latin aur",
  ],
  "old latin e ff1": ["Old Latin e", "Old Latin ff1"],
  "sinaitic syriac peshitta palestinian syriac": [
    "Syriac Sinaitic",
    "Syriac Peshitta",
    "Palestinian Syriac",
  ],
  "old latin h p": ["Old Latin h", "Old Latin p"],
  "syriac peshitta harclean uncertain apparatus note": [
    "Syriac Peshitta",
    "Syriac Harklean",
  ],
  "latin vulgate": ["Old Latin tradition", "Vulgate tradition"],
};

const uncataloguedLegacyWitnesses: Readonly<
  Record<string, WitnessCatalogEntry>
> = {
  "old latin r1": {
    key: "old-latin-r1",
    displayName: "Old Latin r¹ (Codex Usserianus Primus)",
    date: "Seventh century",
    dateStart: 601,
    dateEnd: 700,
    aggregate: false,
    kind: "latin-manuscript",
    dateSource: "University of Birmingham ITSEE, Old Latin Gospel Manuscripts",
    dateSourceUrl: "https://itseeweb.cal.bham.ac.uk/vetuslatina/GospelMSS/",
  },
  "old latin p": {
    key: "old-latin-p",
    displayName: "Old Latin p",
    date: "Fifth–thirteenth centuries (broad siglum range)",
    dateStart: 401,
    dateEnd: 1300,
    aggregate: false,
    kind: "latin-manuscript",
    dateSource: "University of Birmingham ITSEE, Old Latin sigla concordance",
    dateSourceUrl: "https://itseeweb.cal.bham.ac.uk/vetuslatina/sigla/",
  },
};

function normalizedWitnessIdentity(value: string) {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function evidenceKindForLegacyEntry(
  entry: WitnessCatalogEntry,
): Witness["kind"] {
  if (entry.kind === "latin-manuscript") return "latin";
  if (entry.kind === "printed-edition") return "printed";
  if (/syriac|peshitta|harklean|harclean|palestinian/iu.test(entry.displayName)) {
    return "syriac";
  }
  if (/coptic|sahidic|bohairic/iu.test(entry.displayName)) return "coptic";
  return "version";
}

function greekCorpusForBook(book: string): GreekCorpus {
  if (["Matthew", "Mark", "Luke", "John"].includes(book)) return "gospels";
  if (book === "Acts") return "acts";
  if (book === "Revelation") return "revelation";
  if (
    [
      "James",
      "1 Peter",
      "2 Peter",
      "1 John",
      "2 John",
      "3 John",
      "Jude",
    ].includes(book)
  ) {
    return "catholic";
  }
  return "paul";
}

type LegacyGreekSiglum = {
  lookup: string;
  publicLabel: string;
};

const properCodexSigla: Readonly<Record<string, string>> = {
  sinaiticus: "\u2135",
  alexandrinus: "A",
  vaticanus: "B",
  "ephraemi rescriptus": "C",
  ephraemi: "C",
  bezae: "D",
  claromontanus: "D",
  laudianus: "E",
  washingtonianus: "W",
  koridethi: "\u0398",
  porphyrianus: "P",
  boernerianus: "G",
  dublinensis: "Z",
};

const writtenGreekSigla: Readonly<Record<string, string>> = {
  delta: "\u0394",
  theta: "\u0398",
  xi: "\u039E",
  sigma: "\u03A3",
  phi: "\u03A6",
  psi: "\u03A8",
  pi: "\u03A0",
  gamma: "\u0393",
  lambda: "\u039B",
};

function contributionQualifier(label: string) {
  if (/\bfirst hand\b/iu.test(label)) return "*";
  if (/\b(?:correction|corrector|corrected|later correction)\b/iu.test(label)) {
    return "c";
  }
  if (/\b(?:margin|marginal)\b/iu.test(label)) return "mg";
  if (/\btext\b/iu.test(label)) return "txt";
  if (/\bvid\b/iu.test(label)) return "vid";
  return "";
}

function writtenSiglum(token: string) {
  return writtenGreekSigla[token.toLowerCase()] ?? token;
}

function qualifyLegacySiglum(
  base: string,
  label: string,
  publicLabel?: string,
): LegacyGreekSiglum {
  const contribution = contributionQualifier(label);
  const explicitSuffix =
    base.match(/(?:c|mg|txt|vid)$/iu) ??
    base.match(/^(?:ℵ|[A-ZΔΘΞΣΦΨΠΓΛ])[123*]$/u);
  const lookup =
    explicitSuffix || base === "Ws"
      ? base
      : `${base}${contribution}`;
  const displayLabel =
    publicLabel && contribution && !explicitSuffix
      ? `${publicLabel}${contribution}`
      : publicLabel;
  return { lookup, publicLabel: displayLabel ?? lookup };
}

/**
 * Recover an apparatus siglum from the prose-style labels used by the
 * original 30 passage dossiers. This intentionally handles one named witness
 * at a time; aggregate statements such as "Greek manuscript majority" remain
 * aggregate rows and are not mechanically split.
 */
function legacyGreekSiglum(label: string): LegacyGreekSiglum | undefined {
  const normalized = label.normalize("NFKC").trim();
  if (
    /\b(?:majority|manuscripts|relocating the passage|commentary)\b/iu.test(
      normalized,
    ) ||
    /\bfirst hand and later correction group\b/iu.test(normalized)
  ) {
    return undefined;
  }

  const gaParenthetical = normalized.match(/\(GA\s+([^)]{1,20})\)/iu);
  if (gaParenthetical?.[1]) {
    const siglum = gaParenthetical[1].trim();
    return qualifyLegacySiglum(siglum, normalized);
  }

  const ga = normalized.match(/\bGA\s+(P?\d+(?:\/P?\d+)?)/iu);
  if (ga?.[1]) {
    return qualifyLegacySiglum(ga[1], normalized);
  }

  const minuscule = normalized.match(/\bMinuscule\s+(\d+)/iu);
  if (minuscule?.[1]) {
    return qualifyLegacySiglum(minuscule[1], normalized);
  }

  const uncial = normalized.match(/\bUncial\s+(0\d+)/iu);
  if (uncial?.[1]) {
    return qualifyLegacySiglum(uncial[1], normalized);
  }

  const papyrus = normalized.match(/\bPapyrus\s+(\d+)/iu);
  if (papyrus?.[1]) {
    return qualifyLegacySiglum(`P${papyrus[1]}`, normalized);
  }

  const family = normalized.match(
    /^Family\s+(\d+)(?:\s+core representatives)?$/iu,
  );
  if (family?.[1]) {
    return qualifyLegacySiglum(`f${family[1]}`, normalized);
  }

  if (!/^Codex\b/iu.test(normalized)) return undefined;
  if (/\bWashingtonianus supplement\b/iu.test(normalized)) {
    return { lookup: "Ws", publicLabel: "Ws" };
  }

  const commaTail = normalized.match(/,\s*([^,]+)$/u)?.[1]?.trim();
  if (commaTail) {
    const tailSiglum = commaTail.match(
      /^([A-Z\u2135\u0394\u0398\u039E\u03A3\u03A6\u03A8](?:[123*]|[bc]|mg|txt|vid)?|Delta|Theta|Xi|Sigma|Phi|Psi|Pi|Gamma|Lambda)\b/iu,
    )?.[1];
    if (tailSiglum) {
      const publicLabel = writtenSiglum(tailSiglum);
      // Lettered corrector hands such as Db are not separate codices. Resolve
      // them through the base manuscript's generic corrector record while
      // retaining the apparatus hand label in the public name.
      const lookup = /[b]$/u.test(publicLabel)
        ? `${publicLabel.slice(0, -1)}c`
        : publicLabel;
      return qualifyLegacySiglum(lookup, normalized, publicLabel);
    }
  }

  for (const [properName, siglum] of Object.entries(properCodexSigla)) {
    if (
      new RegExp(
        `\\bCodex\\s+${properName.replaceAll(" ", "\\s+")}\\b`,
        "iu",
      ).test(normalized)
    ) {
      return qualifyLegacySiglum(siglum, normalized);
    }
  }

  const simpleCodex = normalized.match(
    /^Codex\s+([A-Z]|Delta|Theta|Xi|Sigma|Phi|Psi|Pi|Gamma|Lambda)(?:\b|,)/iu,
  )?.[1];
  if (!simpleCodex) return undefined;
  return qualifyLegacySiglum(writtenSiglum(simpleCodex), normalized);
}

function laterContributionIsUndated(
  resolved: ResolvedGreekWitness,
) {
  return (
    resolved.qualifier === "corrector" ||
    resolved.qualifier === "corrector-probable" ||
    resolved.qualifier === "corrector-or-margin" ||
    resolved.qualifier === "margin" ||
    resolved.qualifier === "supplement" ||
    resolved.qualifier === "numbered-corrector"
  );
}

function publicLegacyGreekName(
  resolved: ResolvedGreekWitness,
  publicSiglum: string,
) {
  if (
    resolved.key === publicSiglum ||
    resolved.displayName.includes(`GA ${publicSiglum}`)
  ) {
    return resolved.displayName;
  }
  return `${resolved.displayName} \u2014 ${publicSiglum}`;
}

function normalizeLegacyGreekWitness(
  row: Witness,
  corpus: GreekCorpus,
): Witness {
  const isNamedFamily =
    /^Family\s+\d+(?:\s+core representatives)?$/iu.test(
      row.witness.normalize("NFKC").trim(),
    );
  if (
    row.kind !== "greek-manuscript" ||
    (row.dateSource &&
      Number.isFinite(row.dateStart) &&
      Number.isFinite(row.dateEnd)) ||
    (isAggregateEvidenceRow(row) && !isNamedFamily)
  ) {
    return row;
  }

  const siglum = legacyGreekSiglum(row.witness);
  if (!siglum) return row;
  const resolved = resolveGreekWitness(siglum.lookup, corpus);
  if (!resolved) return row;

  const resolvedNote =
    resolved.qualifier === "margin" &&
    /\b(?:base-manuscript date|catalog date|not independently dated)\b/iu.test(
      row.note,
    )
      ? undefined
      : resolved.qualifier === "margin" && /\bmargin(?:al)?\b/iu.test(row.note)
        ? resolved.note?.replace(/^This is a marginal reading\.\s*/iu, "")
      : resolved.note;
  const notes = [row.note, resolvedNote].filter(
    (note, index, all): note is string =>
      Boolean(note) && all.indexOf(note) === index,
  );

  return {
    ...row,
    witness: publicLegacyGreekName(resolved, siglum.publicLabel),
    date: resolved.date,
    dateStart: resolved.dateStart,
    dateEnd: resolved.dateEnd,
    dateUncertain:
      row.dateUncertain ?? laterContributionIsUndated(resolved),
    dateSource: resolved.dateSource,
    dateSourceUrl: resolved.dateSourceUrl,
    note: joinPublicNotes(notes),
    aggregate: resolved.aggregate,
  };
}

function expandLegacyGroupedWitness(row: Witness): Witness[] {
  const members =
    legacyGroupedWitnesses[normalizedWitnessIdentity(row.witness)];
  if (!members) return [row];

  return members.map((member) => {
    const key = normalizedWitnessIdentity(member);
    const entry =
      resolveVersionWitness(member) ?? uncataloguedLegacyWitnesses[key];
    if (!entry) {
      throw new Error(`Missing legacy witness date for ${member}`);
    }
    return {
      ...row,
      witness: entry.displayName,
      date: entry.date,
      dateStart: entry.dateStart,
      dateEnd: entry.dateEnd,
      dateSource: entry.dateSource,
      dateSourceUrl: entry.dateSourceUrl,
      kind: evidenceKindForLegacyEntry(entry),
      aggregate: entry.aggregate,
      note: joinPublicNotes([row.note, entry.note]),
    };
  });
}

function normalizeWitnessRows(rows: Witness[], book: string) {
  const corpus = greekCorpusForBook(book);
  const seen = new Set<string>();
  return sortWitnessRows(
    rows
      .flatMap(expandLegacyGroupedWitness)
      .map((row) => normalizeLegacyGreekWitness(row, corpus))
      .map(normalizeWitnessDate),
  ).filter((row) => {
    const key = [
      row.witness.normalize("NFKC").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(),
      row.unitId ?? row.unitLabel ?? row.unit ?? "",
      row.direction ?? "",
      row.kind ?? "",
    ].join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function normalizePatristicRows(rows: PatristicWitness[]) {
  return rows
    .map((witness, index) => {
      const existing = parseEvidenceDate(witness.date);
      const replacement = isVagueDate(witness.date)
        ? legacyPublicDate({
            witness: witness.author ?? witness.source,
            date: witness.date,
            note: witness.quoteSummary,
            kind: "patristic",
          })
        : undefined;
      const range = replacement ?? existing;
      return {
        witness: {
          ...witness,
          date: replacement?.label ?? witness.date,
          dateStart: witness.dateStart ?? range?.start,
          dateEnd: witness.dateEnd ?? range?.end,
        },
        index,
        start: witness.dateStart ?? range?.start ?? Number.POSITIVE_INFINITY,
        end: witness.dateEnd ?? range?.end ?? Number.POSITIVE_INFINITY,
      };
    })
    .sort(
      (a, b) =>
        a.start - b.start || a.end - b.end || a.index - b.index,
    )
    .map(({ witness }) => witness);
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
          "Sixth century or later — D², a correcting hand rather than the original scribe.",
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
      statement: curated.statement
        .replace(
          /P45vid supports “prayer and fasting”; retain the vid qualification\./u,
          "P45vid probably supports “prayer and fasting”; vid marks an uncertain reading.",
        )
        .replace(
          /with a correction detail preserved in the evidence row\./iu,
          "with support attributed to a correcting hand.",
        ),
      earliestGreek: curated.earliestGreek
        ?.replace(
          /the Claromontanus correction must retain its later-correction qualification\./iu,
          "the Claromontanus reading belongs to a later correcting hand.",
        )
        .replace(
          /with a correction detail preserved in the evidence row\./iu,
          "with support attributed to a correcting hand.",
        ),
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
  const competingLatinNames = new Set(
    competingLatin.map((row) =>
      row.witness.normalize("NFKC").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(),
    ),
  );

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
  const inheritedPrinted = (passage.printedWitnesses ?? []).filter(
    (row) =>
      !/Douay|Clementine|King James/iu.test(row.witness) &&
      !isVagueDate(row.date),
  );
  const competingPrinted = inheritedPrinted
    .filter(isNegativeSupport)
    .map((row): Witness => ({
      ...row,
      direction: "AGAINST_KJV",
      relationship: "printed",
    }));

  return {
    ...passage,
    greekSupportWitnesses,
    latinWitnesses: supportingLatin,
    versionalWitnesses: [],
    patristicWitnesses,
    printedWitnesses: [
      ...inheritedPrinted.filter((row) => !isNegativeSupport(row)),
      ...reception,
    ],
    evidenceAgainst: [
      ...passage.evidenceAgainst.filter((row) => {
        const name = row.witness
          .normalize("NFKC")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, " ")
          .trim();
        return !Array.from(competingLatinNames).some(
          (curatedName) =>
            name === curatedName ||
            name.includes(curatedName) ||
            curatedName.includes(name),
        );
      }),
      ...competingLatin,
      ...competingPrinted,
    ],
  };
}

function withEditorialConclusion(passage: Passage) {
  if (/\bOldest\s*&\s*Best\b.*\b(?:retain|favor)/iu.test(passage.shortSummary)) {
    return passage.shortSummary;
  }
  return `${passage.shortSummary} Oldest & Best retains the KJV reading while presenting the competing witnesses separately below.`;
}

export function applyKjvForwardCorrections(sourcePassage: Passage): Passage {
  const copy = copyBySlug.get(sourcePassage.slug);

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
  }

  const embeddedPrinted = [
    ...passage.greekSupportWitnesses,
    ...passage.latinWitnesses,
    ...passage.versionalWitnesses,
  ].filter((row) => row.kind === "printed");

  return {
    ...passage,
    greekSupportWitnesses: normalizeWitnessRows(
      passage.greekSupportWitnesses.filter((row) => row.kind !== "printed"),
      passage.book,
    ),
    latinWitnesses: normalizeWitnessRows(
      passage.latinWitnesses.filter((row) => row.kind !== "printed"),
      passage.book,
    ),
    versionalWitnesses: normalizeWitnessRows(
      passage.versionalWitnesses.filter((row) => row.kind !== "printed"),
      passage.book,
    ),
    patristicWitnesses: normalizePatristicRows(
      passage.patristicWitnesses,
    ),
    printedWitnesses: normalizeWitnessRows([
      ...(passage.printedWitnesses ?? []),
      ...embeddedPrinted,
    ], passage.book),
    evidenceAgainst: normalizeWitnessRows(
      passage.evidenceAgainst.map((row) => ({
        ...row,
        direction: row.direction ?? "AGAINST_KJV",
      })),
      passage.book,
    ),
    manuscriptSnapshot: {
      ...passage.manuscriptSnapshot,
      supportCategory:
        copy?.primarySupport ??
        olderCategoryBySlug.get(sourcePassage.slug) ??
        passage.manuscriptSnapshot.supportCategory,
    },
  };
}
