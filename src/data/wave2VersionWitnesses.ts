import type {
  EvidenceDirection,
  EvidenceKind,
  EvidenceRelationship,
  PatristicWitness,
} from "./types";

/**
 * Explicit normalization for the 46 version rows in wave2.generated.json.
 *
 * Why this is deliberately data-heavy:
 * - an apparatus siglum is not safely splittable with punctuation heuristics;
 * - language-wide labels are aggregates, not individual manuscripts;
 * - several rows mix two disputed units or a genuine witness with a lacunose one;
 * - the Revelation apparatus mixes manuscripts, modern editions, and commentators.
 *
 * Every public witness produced here has its own date label and numeric bounds.
 * Broad bounds are intentional when the source row identifies a tradition or textual
 * strand rather than a datable manuscript. They must not be narrowed by borrowing a
 * passage's earliest-evidence date.
 */

export type Wave2DirectionClass = "FOR_KJV" | "AGAINST_KJV" | "OTHER";

export type Wave2VersionWitnessSpec = {
  witness: string;
  kind: EvidenceKind;
  date: string;
  dateStart: number;
  dateEnd: number;
  dateSource: string;
  dateSourceUrl?: string;
  note: string;
  directionClass?: Wave2DirectionClass;
  direction?: EvidenceDirection;
  unit?: string;
  relationship?: EvidenceRelationship;
  aggregate?: boolean;
};

export type Wave2VersionRowSpec = {
  unit: string;
  directionClass: Wave2DirectionClass;
  direction: EvidenceDirection;
  witnesses: readonly Wave2VersionWitnessSpec[];
};

export type Wave2VersionPatristicExtra = PatristicWitness & {
  rowIndex: number;
  unit: string;
  directionClass: Wave2DirectionClass;
  direction: EvidenceDirection;
};

type DateKey = keyof typeof WITNESS_DATES;

const DATE_SOURCES = {
  vetusLatinaGospels:
    "University of Birmingham ITSEE, Old Latin Gospel Manuscripts",
  vetusLatinaSigla:
    "University of Birmingham ITSEE, Concordance of Old Latin New Testament sigla",
  palmer:
    "David Robert Palmer, The Revelation of John: Greek and English, version apparatus",
  vulgate:
    "H. A. G. Houghton, The Latin New Testament; Palmer's Vulgate manuscript key",
  ancientVersions:
    "B. M. Metzger, The Early Versions of the New Testament; standard version histories",
  sourceApparatus:
    "The passage apparatus cited in wave2.generated.json",
  patristic:
    "The named author or work as cited in Palmer's Revelation apparatus",
} as const;

const SOURCE_URLS = {
  vetusLatinaGospels: "https://itseeweb.cal.bham.ac.uk/vetuslatina/GospelMSS/",
  vetusLatinaSigla: "https://itseeweb.cal.bham.ac.uk/vetuslatina/sigla/",
  palmer: "https://www.bibletranslation.ws/trans/revwgrk.pdf",
  vulgate: "https://bibletranslation.ws/vulgate-manuscripts/",
} as const;

/**
 * These dates describe the named witness, edition, or honestly broad tradition.
 * For ancient versions, the numeric span reflects the label as displayed; it is
 * not a claim that every surviving manuscript in that language has that date.
 */
const WITNESS_DATES = {
  oldLatinTradition: {
    date:
      "late 2nd–13th c. tradition; extant witnesses represented by 4th–13th c. manuscripts",
    dateStart: 180,
    dateEnd: 1299,
    dateSource: DATE_SOURCES.vetusLatinaSigla,
    dateSourceUrl: SOURCE_URLS.vetusLatinaSigla,
  },
  latinTraditions: {
    date: "late 2nd–16th c. Latin transmission (Old Latin and Vulgate)",
    dateStart: 180,
    dateEnd: 1599,
    dateSource: DATE_SOURCES.sourceApparatus,
  },
  earlyLatinTradition: {
    date: "4th–8th c. aggregate early Latin witness tradition",
    dateStart: 300,
    dateEnd: 799,
    dateSource: DATE_SOURCES.sourceApparatus,
  },
  earlyVersionTraditions: {
    date: "late 2nd–7th c. early translation traditions",
    dateStart: 180,
    dateEnd: 699,
    dateSource: DATE_SOURCES.ancientVersions,
  },
  vulgateTradition: {
    date: "late 4th–16th c. Vulgate manuscript tradition",
    dateStart: 382,
    dateEnd: 1592,
    dateSource: DATE_SOURCES.vulgate,
    dateSourceUrl: SOURCE_URLS.vulgate,
  },
  oldLatinA: {
    date: "second half of the 4th c.",
    dateStart: 350,
    dateEnd: 399,
    dateSource: DATE_SOURCES.vetusLatinaGospels,
    dateSourceUrl: SOURCE_URLS.vetusLatinaGospels,
  },
  oldLatinAur: {
    date: "c. AD 775",
    dateStart: 750,
    dateEnd: 799,
    dateSource: DATE_SOURCES.vetusLatinaGospels,
    dateSourceUrl: SOURCE_URLS.vetusLatinaGospels,
  },
  oldLatinB: {
    date: "late 5th c.",
    dateStart: 475,
    dateEnd: 499,
    dateSource: DATE_SOURCES.vetusLatinaGospels,
    dateSourceUrl: SOURCE_URLS.vetusLatinaGospels,
  },
  oldLatinC: {
    date: "12th c.",
    dateStart: 1100,
    dateEnd: 1199,
    dateSource: DATE_SOURCES.vetusLatinaGospels,
    dateSourceUrl: SOURCE_URLS.vetusLatinaGospels,
  },
  oldLatinD: {
    date: "c. AD 400",
    dateStart: 390,
    dateEnd: 420,
    dateSource: DATE_SOURCES.vetusLatinaGospels,
    dateSourceUrl: SOURCE_URLS.vetusLatinaGospels,
  },
  oldLatinF: {
    date: "6th c.",
    dateStart: 500,
    dateEnd: 599,
    dateSource: DATE_SOURCES.vetusLatinaGospels,
    dateSourceUrl: SOURCE_URLS.vetusLatinaGospels,
  },
  oldLatinFf1: {
    date: "first half of the 8th c.",
    dateStart: 700,
    dateEnd: 749,
    dateSource: DATE_SOURCES.vetusLatinaGospels,
    dateSourceUrl: SOURCE_URLS.vetusLatinaGospels,
  },
  oldLatinFf2: {
    date: "5th c.",
    dateStart: 400,
    dateEnd: 499,
    dateSource: DATE_SOURCES.vetusLatinaGospels,
    dateSourceUrl: SOURCE_URLS.vetusLatinaGospels,
  },
  oldLatinG1: {
    date: "c. AD 810",
    dateStart: 800,
    dateEnd: 820,
    dateSource: DATE_SOURCES.vetusLatinaGospels,
    dateSourceUrl: SOURCE_URLS.vetusLatinaGospels,
  },
  oldLatinHGospel: {
    date: "late 5th c. in Matthew",
    dateStart: 475,
    dateEnd: 499,
    dateSource: DATE_SOURCES.vetusLatinaGospels,
    dateSourceUrl: SOURCE_URLS.vetusLatinaGospels,
  },
  oldLatinK: {
    date: "4th c.",
    dateStart: 300,
    dateEnd: 399,
    dateSource: DATE_SOURCES.vetusLatinaGospels,
    dateSourceUrl: SOURCE_URLS.vetusLatinaGospels,
  },
  oldLatinL: {
    date: "first half of the 8th c.",
    dateStart: 700,
    dateEnd: 749,
    dateSource: DATE_SOURCES.vetusLatinaGospels,
    dateSourceUrl: SOURCE_URLS.vetusLatinaGospels,
  },
  oldLatinQ: {
    date: "6th–7th c.",
    dateStart: 500,
    dateEnd: 699,
    dateSource: DATE_SOURCES.vetusLatinaGospels,
    dateSourceUrl: SOURCE_URLS.vetusLatinaGospels,
  },
  oldLatinAr: {
    date: "AD 807–808",
    dateStart: 807,
    dateEnd: 808,
    dateSource: DATE_SOURCES.vetusLatinaSigla,
    dateSourceUrl: SOURCE_URLS.vetusLatinaSigla,
  },
  oldLatinGig: {
    date: "13th c. (Codex Gigas)",
    dateStart: 1200,
    dateEnd: 1250,
    dateSource: DATE_SOURCES.vetusLatinaSigla,
    dateSourceUrl: SOURCE_URLS.vetusLatinaSigla,
  },
  oldLatinHRevelation: {
    date: "5th c. (Codex Floriacensis)",
    dateStart: 400,
    dateEnd: 499,
    dateSource: DATE_SOURCES.vetusLatinaSigla,
    dateSourceUrl: SOURCE_URLS.vetusLatinaSigla,
  },
  oldLatinTRevelation: {
    date: "c. AD 1050 (Liber Comicus witness used for siglum t)",
    dateStart: 1000,
    dateEnd: 1099,
    dateSource: DATE_SOURCES.vetusLatinaSigla,
    dateSourceUrl: SOURCE_URLS.vetusLatinaSigla,
  },
  vulgateAm: {
    date: "early 8th c.; completed by AD 716",
    dateStart: 700,
    dateEnd: 716,
    dateSource: DATE_SOURCES.vulgate,
    dateSourceUrl: SOURCE_URLS.vulgate,
  },
  vulgateFu: {
    date: "AD 541–546",
    dateStart: 541,
    dateEnd: 546,
    dateSource: DATE_SOURCES.vulgate,
    dateSourceUrl: SOURCE_URLS.vulgate,
  },
  vulgateHarl: {
    date: "second half of the 9th c.",
    dateStart: 850,
    dateEnd: 899,
    dateSource: DATE_SOURCES.vulgate,
    dateSourceUrl: SOURCE_URLS.vulgate,
  },
  vulgateDem: {
    date: "13th c. (Codex Demidovianus)",
    dateStart: 1200,
    dateEnd: 1299,
    dateSource: DATE_SOURCES.vulgate,
    dateSourceUrl: SOURCE_URLS.vulgate,
  },
  vulgateClementine: {
    date: "AD 1592 printed edition",
    dateStart: 1592,
    dateEnd: 1592,
    dateSource: DATE_SOURCES.vulgate,
    dateSourceUrl: SOURCE_URLS.vulgate,
  },
  vulgateStuttgart: {
    date: "AD 1969–2007 critical-edition series",
    dateStart: 1969,
    dateEnd: 2007,
    dateSource: DATE_SOURCES.vulgate,
    dateSourceUrl: SOURCE_URLS.vulgate,
  },
  vulgateWordsworthWhite: {
    date: "AD 1889–1954 Oxford critical edition",
    dateStart: 1889,
    dateEnd: 1954,
    dateSource: DATE_SOURCES.vulgate,
    dateSourceUrl: SOURCE_URLS.vulgate,
  },
  vulgateLips4: {
    date:
      "medieval Leipzig Vulgate MS 4; broad 7th–15th c. range because the source gives only this broad range",
    dateStart: 600,
    dateEnd: 1499,
    dateSource: DATE_SOURCES.palmer,
    dateSourceUrl: SOURCE_URLS.palmer,
  },
  vulgateLips5: {
    date:
      "medieval Leipzig Vulgate MS 5; broad 7th–15th c. range because the source gives only this broad range",
    dateStart: 600,
    dateEnd: 1499,
    dateSource: DATE_SOURCES.palmer,
    dateSourceUrl: SOURCE_URLS.palmer,
  },
  vulgateLips6: {
    date:
      "medieval Leipzig Vulgate MS 6; broad 7th–15th c. range because the source gives only this broad range",
    dateStart: 600,
    dateEnd: 1499,
    dateSource: DATE_SOURCES.palmer,
    dateSourceUrl: SOURCE_URLS.palmer,
  },
  syriacPeshitta: {
    date: "early 5th c. New Testament tradition",
    dateStart: 400,
    dateEnd: 450,
    dateSource: DATE_SOURCES.ancientVersions,
  },
  syriacHarklean: {
    date: "AD 616 revision",
    dateStart: 616,
    dateEnd: 616,
    dateSource: DATE_SOURCES.ancientVersions,
  },
  syriacPhiloxenian: {
    date: "AD 508 revision",
    dateStart: 508,
    dateEnd: 508,
    dateSource: DATE_SOURCES.ancientVersions,
  },
  syriacPalestinian: {
    date: "6th c. Christian Palestinian Syriac tradition",
    dateStart: 500,
    dateEnd: 599,
    dateSource: DATE_SOURCES.ancientVersions,
  },
  syriacSinaitic: {
    date: "late 4th–early 5th c. manuscript",
    dateStart: 375,
    dateEnd: 425,
    dateSource: DATE_SOURCES.ancientVersions,
  },
  syriacCuretonian: {
    date: "5th c. manuscript",
    dateStart: 400,
    dateEnd: 499,
    dateSource: DATE_SOURCES.ancientVersions,
  },
  syriacTraditions: {
    date: "late 4th–7th c. Syriac textual traditions",
    dateStart: 375,
    dateEnd: 699,
    dateSource: DATE_SOURCES.ancientVersions,
  },
  syriacRevelation: {
    date: "AD 508–616 Syriac Revelation traditions (Philoxenian/Harklean)",
    dateStart: 508,
    dateEnd: 616,
    dateSource: DATE_SOURCES.ancientVersions,
  },
  diatessaronEphrem: {
    date: "c. AD 172 Diatessaron; reflected by Ephrem, AD 306–373",
    dateStart: 172,
    dateEnd: 373,
    dateSource: DATE_SOURCES.ancientVersions,
  },
  copticTraditions: {
    date: "3rd–14th c. Coptic textual traditions",
    dateStart: 200,
    dateEnd: 1399,
    dateSource: DATE_SOURCES.ancientVersions,
  },
  sahidic: {
    date: "3rd–12th c. Sahidic textual tradition",
    dateStart: 200,
    dateEnd: 1199,
    dateSource: DATE_SOURCES.ancientVersions,
  },
  bohairic: {
    date: "4th–14th c. Bohairic textual tradition",
    dateStart: 300,
    dateEnd: 1399,
    dateSource: DATE_SOURCES.ancientVersions,
  },
  bohairicG: {
    date:
      "medieval Bohairic witness G; broad 9th–14th c. range",
    dateStart: 800,
    dateEnd: 1399,
    dateSource: DATE_SOURCES.palmer,
    dateSourceUrl: SOURCE_URLS.palmer,
  },
  middleEgyptian1: {
    date: "5th c. (Middle Egyptian witness mae-1, Codex Scheide)",
    dateStart: 400,
    dateEnd: 499,
    dateSource: DATE_SOURCES.sourceApparatus,
  },
  middleEgyptian2: {
    date: "early 4th c. (Middle Egyptian witness mae-2, Schøyen MS 2650)",
    dateStart: 300,
    dateEnd: 349,
    dateSource: DATE_SOURCES.sourceApparatus,
  },
  armenian: {
    date: "early 5th–13th c. Armenian textual tradition",
    dateStart: 405,
    dateEnd: 1299,
    dateSource: DATE_SOURCES.ancientVersions,
  },
  georgian: {
    date: "5th–13th c. Georgian textual tradition",
    dateStart: 400,
    dateEnd: 1299,
    dateSource: DATE_SOURCES.ancientVersions,
  },
  ethiopic: {
    date: "4th–13th c. Ethiopic textual tradition",
    dateStart: 300,
    dateEnd: 1299,
    dateSource: DATE_SOURCES.ancientVersions,
  },
  gothic: {
    date: "4th–6th c. Gothic version and manuscript tradition",
    dateStart: 350,
    dateEnd: 550,
    dateSource: DATE_SOURCES.ancientVersions,
  },
  slavonic: {
    date: "late 9th–16th c. Slavonic textual tradition",
    dateStart: 850,
    dateEnd: 1599,
    dateSource: DATE_SOURCES.ancientVersions,
  },
  arabicTradition: {
    date: "8th–17th c. Arabic biblical tradition",
    dateStart: 700,
    dateEnd: 1699,
    dateSource: DATE_SOURCES.ancientVersions,
  },
  waltonPolyglot: {
    date: "AD 1657 London Polyglot printed text",
    dateStart: 1657,
    dateEnd: 1657,
    dateSource: DATE_SOURCES.palmer,
    dateSourceUrl: SOURCE_URLS.palmer,
  },
} as const;

function witness(
  witnessName: string,
  kind: EvidenceKind,
  dateKey: DateKey,
  note: string,
  overrides: Partial<
    Pick<
      Wave2VersionWitnessSpec,
      | "directionClass"
      | "direction"
      | "unit"
      | "relationship"
      | "aggregate"
    >
  > = {},
): Wave2VersionWitnessSpec {
  return {
    witness: witnessName,
    kind,
    ...WITNESS_DATES[dateKey],
    note,
    ...overrides,
  };
}

function row(
  unit: string,
  directionClass: Wave2DirectionClass,
  direction: EvidenceDirection,
  witnesses: readonly Wave2VersionWitnessSpec[],
): Wave2VersionRowSpec {
  return { unit, directionClass, direction, witnesses };
}

const aggregate = { aggregate: true } as const;

export const wave2VersionWitnessSpecs: Readonly<
  Record<string, Readonly<Record<number, Wave2VersionRowSpec>>>
> = {
  "matthew-1-25": {
    0: row("primary", "FOR_KJV", "FOR_KJV", [
      witness(
        "Old Latin aur — Codex Aureus Holmiensis",
        "latin",
        "oldLatinAur",
        "Includes “firstborn.”",
      ),
      witness(
        "Old Latin f — Codex Brixianus",
        "latin",
        "oldLatinF",
        "Includes “firstborn.”",
      ),
      witness(
        "Old Latin ff¹ — Codex Corbeiensis primus",
        "latin",
        "oldLatinFf1",
        "Includes “firstborn.”",
      ),
      witness(
        "Vulgate manuscript tradition",
        "latin",
        "vulgateTradition",
        "Includes “firstborn”; this cites the tradition as a group, not one manuscript.",
        aggregate,
      ),
      witness(
        "Syriac Peshitta",
        "syriac",
        "syriacPeshitta",
        "Includes “firstborn.”",
      ),
      witness(
        "Syriac Harklean",
        "syriac",
        "syriacHarklean",
        "Includes “firstborn.”",
      ),
      witness(
        "Diatessaron tradition reflected in Ephrem",
        "syriac",
        "diatessaronEphrem",
        "Ephrem's Diatessaronic tradition includes “firstborn”; the range distinguishes the second-century harmony from Ephrem's fourth-century witness.",
        {
          relationship: "related",
          directionClass: "OTHER",
          direction: "RELATED_ONLY",
        },
      ),
    ]),
    1: row("primary", "AGAINST_KJV", "AGAINST_KJV", [
      witness(
        "Old Latin witnesses with the shorter form",
        "latin",
        "oldLatinTradition",
        "An unspecified subset of the Old Latin tradition supports the shorter form; the row does not license a claim about all Old Latin witnesses.",
        aggregate,
      ),
      witness(
        "Syriac Sinaitic",
        "syriac",
        "syriacSinaitic",
        "Supports the shorter form.",
      ),
      witness(
        "Syriac Curetonian",
        "syriac",
        "syriacCuretonian",
        "Supports the shorter form.",
      ),
      witness(
        "Non-Bohairic Coptic witnesses with the shorter form",
        "coptic",
        "copticTraditions",
        "Coptic support outside the separately listed Bohairic strands is cited across the tradition as a whole.",
        aggregate,
      ),
      witness(
        "Bohairic textual strands",
        "coptic",
        "bohairic",
        "Some Bohairic witnesses support the shorter form, but the exact wording is not uniform.",
        { ...aggregate, directionClass: "OTHER", direction: "MIXED_BOHAIRIC" },
      ),
    ]),
  },

  "matthew-5-22": {
    0: row("primary", "FOR_KJV", "FOR_KJV", [
      witness(
        "Old Latin witnesses including the phrase",
        "latin",
        "oldLatinTradition",
        "A large part of the Old Latin tradition (about 90 manuscripts survive overall) includes the phrase, though not every copy does.",
        aggregate,
      ),
      witness(
        "Syriac traditions including the phrase",
        "syriac",
        "syriacTraditions",
        "The cited Syriac streams include the phrase; the source cites the tradition as a group rather than naming each manuscript.",
        aggregate,
      ),
      witness(
        "Coptic traditions including the phrase",
        "coptic",
        "copticTraditions",
        "The cited Coptic evidence includes the phrase across the tradition as a whole.",
        aggregate,
      ),
      witness(
        "Armenian version",
        "version",
        "armenian",
        "Includes the phrase.",
        aggregate,
      ),
      witness(
        "Georgian version",
        "version",
        "georgian",
        "Includes the phrase.",
        aggregate,
      ),
      witness(
        "Gothic version",
        "version",
        "gothic",
        "Includes the phrase.",
        aggregate,
      ),
    ]),
    1: row("primary", "AGAINST_KJV", "AGAINST_KJV", [
      witness(
        "Old Latin aur — Codex Aureus Holmiensis",
        "latin",
        "oldLatinAur",
        "Omits the phrase; this individual witness demonstrates that the Latin evidence is divided.",
      ),
      witness(
        "Vulgate manuscript tradition",
        "latin",
        "vulgateTradition",
        "Supports omission in the cited apparatus; this strand is distinct from the Old Latin witnesses that include the phrase.",
        aggregate,
      ),
      witness(
        "Ethiopic version",
        "version",
        "ethiopic",
        "Supports omission.",
        aggregate,
      ),
    ]),
  },

  "matthew-5-44": {
    0: row("primary", "FOR_KJV", "FOR_KJV", [
      witness(
        "Latin witnesses with the fuller form",
        "latin",
        "latinTraditions",
        "Much of the Latin transmission supports the fuller form, without implying Latin unanimity.",
        aggregate,
      ),
      witness(
        "Syriac Peshitta",
        "syriac",
        "syriacPeshitta",
        "Supports the fuller form.",
      ),
      witness(
        "Syriac Harklean",
        "syriac",
        "syriacHarklean",
        "Supports the fuller form.",
      ),
      witness(
        "Christian Palestinian Syriac",
        "syriac",
        "syriacPalestinian",
        "Supports the fuller form.",
        aggregate,
      ),
      witness(
        "Middle Egyptian mae-1 — Codex Scheide",
        "coptic",
        "middleEgyptian1",
        "Supports the fuller form.",
      ),
      witness(
        "Gothic version",
        "version",
        "gothic",
        "Supports the fuller form.",
        aggregate,
      ),
    ]),
    1: row("primary", "AGAINST_KJV", "AGAINST_KJV", [
      witness(
        "Old Latin k — Codex Bobiensis",
        "latin",
        "oldLatinK",
        "Supports the shorter form.",
      ),
      witness(
        "Syriac Sinaitic",
        "syriac",
        "syriacSinaitic",
        "Supports the shorter form.",
      ),
      witness(
        "Syriac Curetonian",
        "syriac",
        "syriacCuretonian",
        "Supports the shorter form.",
      ),
      witness(
        "Sahidic Coptic",
        "coptic",
        "sahidic",
        "Supports the shorter form.",
        aggregate,
      ),
      witness(
        "Bohairic witnesses with the shorter form",
        "coptic",
        "bohairic",
        "A Bohairic strand supports the shorter form; this does not describe every Bohairic witness.",
        aggregate,
      ),
      witness(
        "Middle Egyptian mae-2 — Schøyen MS 2650",
        "coptic",
        "middleEgyptian2",
        "Supports the shorter form.",
      ),
    ]),
  },

  "matthew-19-16-17": {
    0: row("unit-1", "FOR_KJV", "FOR_KJV_OR_MIXED_TRADITIONAL", [
      witness(
        "Latin witnesses with traditional elements",
        "latin",
        "latinTraditions",
        "The Latin evidence is mixed across Matthew 19:16 and 19:17; it supports traditional elements but is not an exact, unit-wide vote.",
        {
          ...aggregate,
          directionClass: "OTHER",
          direction: "MIXED_BY_SUBUNIT",
          relationship: "mixed",
        },
      ),
      witness(
        "Syriac Peshitta",
        "syriac",
        "syriacPeshitta",
        "Supports traditional elements, with the exact form requiring subunit-level qualification.",
        {
          directionClass: "OTHER",
          direction: "MIXED_BY_SUBUNIT",
          relationship: "mixed",
        },
      ),
      witness(
        "Syriac Harklean",
        "syriac",
        "syriacHarklean",
        "Supports traditional elements, with the exact form requiring subunit-level qualification.",
        {
          directionClass: "OTHER",
          direction: "MIXED_BY_SUBUNIT",
          relationship: "mixed",
        },
      ),
    ]),
    1: row("unit-1", "AGAINST_KJV", "AGAINST_KJV", [
      witness(
        "Old Latin witnesses with the critical form",
        "latin",
        "oldLatinTradition",
        "Old Latin support applies to one or both subunits, not automatically to both.",
        {
          ...aggregate,
          directionClass: "OTHER",
          direction: "AGAINST_KJV_CRITICAL_FORM_IN_ONE_OR_BOTH_SUBUNITS",
          relationship: "mixed",
        },
      ),
      witness(
        "Syriac Sinaitic",
        "syriac",
        "syriacSinaitic",
        "Supports the critical wording in one or both subunits; it is retained as qualified rather than counted twice.",
        {
          directionClass: "OTHER",
          direction: "AGAINST_KJV_CRITICAL_FORM_IN_ONE_OR_BOTH_SUBUNITS",
          relationship: "mixed",
        },
      ),
      witness(
        "Syriac Curetonian",
        "syriac",
        "syriacCuretonian",
        "Supports the critical wording in one or both subunits; it is retained as qualified rather than counted twice.",
        {
          directionClass: "OTHER",
          direction: "AGAINST_KJV_CRITICAL_FORM_IN_ONE_OR_BOTH_SUBUNITS",
          relationship: "mixed",
        },
      ),
      witness(
        "Coptic versions",
        "coptic",
        "copticTraditions",
        "Favor the critical wording specifically in Matthew 19:17.",
        { ...aggregate, unit: "unit-2" },
      ),
      witness(
        "Armenian version",
        "version",
        "armenian",
        "Favors the critical wording specifically in Matthew 19:17.",
        { ...aggregate, unit: "unit-2" },
      ),
      witness(
        "Georgian version",
        "version",
        "georgian",
        "Favors the critical wording specifically in Matthew 19:17.",
        { ...aggregate, unit: "unit-2" },
      ),
      witness(
        "Ethiopic version",
        "version",
        "ethiopic",
        "Favors the critical wording specifically in Matthew 19:17.",
        { ...aggregate, unit: "unit-2" },
      ),
    ]),
  },

  "matthew-27-35": {
    0: row("primary", "FOR_KJV", "FOR_KJV", [
      witness(
        "Old Latin a — Codex Vercellensis",
        "latin",
        "oldLatinA",
        "Includes the clause.",
      ),
      witness(
        "Old Latin aur — Codex Aureus Holmiensis",
        "latin",
        "oldLatinAur",
        "Includes the clause.",
      ),
      witness(
        "Old Latin b — Codex Veronensis",
        "latin",
        "oldLatinB",
        "Includes the clause.",
      ),
      witness(
        "Old Latin c — Codex Colbertinus",
        "latin",
        "oldLatinC",
        "Includes the clause.",
      ),
      witness(
        "Old Latin h — Codex Claromontanus (Matthew hand)",
        "latin",
        "oldLatinHGospel",
        "Includes the clause.",
      ),
      witness(
        "Old Latin q — Codex Monacensis",
        "latin",
        "oldLatinQ",
        "Includes the clause.",
      ),
      witness(
        "Clementine Vulgate",
        "printed",
        "vulgateClementine",
        "The 1592 printed Vulgate text includes the clause; it is an edition, not a medieval manuscript.",
        { relationship: "printed" },
      ),
      witness(
        "Syriac Harklean",
        "syriac",
        "syriacHarklean",
        "Includes the clause.",
      ),
      witness(
        "Christian Palestinian Syriac witnesses",
        "syriac",
        "syriacPalestinian",
        "Some witnesses in this tradition include the clause; not every manuscript in the tradition agrees.",
        aggregate,
      ),
      witness(
        "Armenian version",
        "version",
        "armenian",
        "Includes the clause.",
        aggregate,
      ),
      witness(
        "Georgian version",
        "version",
        "georgian",
        "Includes the clause.",
        aggregate,
      ),
      witness(
        "Middle Egyptian mae-1 — Codex Scheide",
        "coptic",
        "middleEgyptian1",
        "Includes the clause.",
      ),
    ]),
    1: row("primary", "AGAINST_KJV", "AGAINST_KJV", [
      witness(
        "Old Latin d — Codex Bezae",
        "latin",
        "oldLatinD",
        "Omits the clause.",
      ),
      witness(
        "Old Latin f — Codex Brixianus",
        "latin",
        "oldLatinF",
        "Omits the clause.",
      ),
      witness(
        "Old Latin ff¹ — Codex Corbeiensis primus",
        "latin",
        "oldLatinFf1",
        "Omits the clause.",
      ),
      witness(
        "Old Latin ff² — Codex Corbeiensis secundus",
        "latin",
        "oldLatinFf2",
        "Omits the clause.",
      ),
      witness(
        "Old Latin g¹ — Codex Sangermanensis primus",
        "latin",
        "oldLatinG1",
        "Omits the clause.",
      ),
      witness(
        "Old Latin l — Codex Rehdigeranus",
        "latin",
        "oldLatinL",
        "Omits the clause.",
      ),
      witness(
        "Stuttgart Vulgate",
        "printed",
        "vulgateStuttgart",
        "The modern critical Vulgate text omits the clause; this is an edition-level judgment.",
        { relationship: "printed" },
      ),
    ]),
  },

  "mark-1-2": {
    0: row("primary", "FOR_KJV", "FOR_KJV", [
      witness(
        "Syriac Harklean",
        "syriac",
        "syriacHarklean",
        "Supports “in the prophets.”",
      ),
      witness(
        "Bohairic witnesses reading “prophets”",
        "coptic",
        "bohairic",
        "A Bohairic strand supports “prophets”; the label does not describe the entire Bohairic tradition.",
        aggregate,
      ),
      witness(
        "Vulgate manuscript reading “prophets”",
        "latin",
        "vulgateTradition",
        "The apparatus cites one unidentified Vulgate manuscript reading “prophets”; it does not attribute that reading to the whole Vulgate tradition.",
        {
          directionClass: "FOR_KJV",
          direction: "FOR_KJV",
        },
      ),
    ]),
    1: row("primary", "AGAINST_KJV", "AGAINST_KJV", [
      witness(
        "Latin witnesses reading “Isaiah”",
        "latin",
        "latinTraditions",
        "Broad Latin support is cited for “Isaiah,” without treating every Latin manuscript as identical.",
        aggregate,
      ),
      witness(
        "Syriac Peshitta",
        "syriac",
        "syriacPeshitta",
        "Supports “Isaiah.”",
      ),
      witness(
        "Christian Palestinian Syriac",
        "syriac",
        "syriacPalestinian",
        "Supports “Isaiah.”",
        aggregate,
      ),
      witness(
        "Sahidic Coptic",
        "coptic",
        "sahidic",
        "Supports “Isaiah.”",
        aggregate,
      ),
      witness(
        "Bohairic Coptic",
        "coptic",
        "bohairic",
        "Bohairic witnesses supporting “Isaiah” stand alongside a separate Bohairic strand reading “prophets.”",
        aggregate,
      ),
      witness(
        "Armenian version",
        "version",
        "armenian",
        "Supports “Isaiah.”",
        aggregate,
      ),
      witness(
        "Georgian version",
        "version",
        "georgian",
        "Supports “Isaiah.”",
        aggregate,
      ),
      witness(
        "Gothic version",
        "version",
        "gothic",
        "Supports “Isaiah.”",
        aggregate,
      ),
    ]),
  },

  "mark-10-24": {
    0: row("primary", "FOR_KJV", "FOR_KJV", [
      witness(
        "Latin witnesses with the qualifying phrase",
        "latin",
        "latinTraditions",
        "Broad Latin evidence supports the qualifying phrase; this is a transmission-level summary.",
        aggregate,
      ),
      witness(
        "Syriac traditions with the qualifying phrase",
        "syriac",
        "syriacTraditions",
        "The cited Syriac evidence supports the qualifying phrase across the tradition as a whole.",
        aggregate,
      ),
      witness(
        "Bohairic witnesses with the qualifying phrase",
        "coptic",
        "bohairic",
        "A Bohairic strand includes the phrase; Bohairic evidence is divided.",
        aggregate,
      ),
      witness(
        "Gothic version",
        "version",
        "gothic",
        "Includes the qualifying phrase.",
        aggregate,
      ),
    ]),
    1: row("primary", "AGAINST_KJV", "AGAINST_KJV", [
      witness(
        "Old Latin k — Codex Bobiensis",
        "latin",
        "oldLatinK",
        "Supports the shorter form.",
      ),
      witness(
        "Sahidic Coptic",
        "coptic",
        "sahidic",
        "Supports the shorter form.",
        aggregate,
      ),
      witness(
        "Bohairic witnesses with the shorter form",
        "coptic",
        "bohairic",
        "A separate Bohairic strand supports the shorter form.",
        aggregate,
      ),
    ]),
  },

  "luke-2-14": {
    0: row("primary", "FOR_KJV", "FOR_KJV", [
      witness(
        "Syriac witnesses with the nominative sense",
        "syriac",
        "syriacTraditions",
        "Syriac traditions support the nominative sense represented by the KJV rendering.",
        aggregate,
      ),
      witness(
        "Bohairic witnesses with the nominative sense",
        "coptic",
        "bohairic",
        "One Bohairic strand supports the nominative sense; Bohairic evidence is divided.",
        aggregate,
      ),
    ]),
    1: row("primary", "AGAINST_KJV", "AGAINST_KJV", [
      witness(
        "Latin tradition — hominibus bonae voluntatis",
        "latin",
        "latinTraditions",
        "Supports the genitive sense, including the Vulgate wording hominibus bonae voluntatis.",
        aggregate,
      ),
      witness(
        "Sahidic Coptic",
        "coptic",
        "sahidic",
        "Supports the genitive sense.",
        aggregate,
      ),
      witness(
        "Bohairic witnesses with the genitive sense",
        "coptic",
        "bohairic",
        "A distinct Bohairic strand supports the genitive sense rather than the nominative form.",
        aggregate,
      ),
      witness(
        "Gothic version",
        "version",
        "gothic",
        "Supports the genitive sense.",
        aggregate,
      ),
    ]),
  },

  "luke-2-33": {
    0: row("primary", "FOR_KJV", "FOR_KJV", [
      witness(
        "Old Latin witnesses reading “Joseph and his mother”",
        "latin",
        "oldLatinTradition",
        "Old Latin support is cited across the tradition as a whole for “Joseph and his mother.”",
        aggregate,
      ),
      witness(
        "Vulgate manuscripts reading “Joseph and his mother”",
        "latin",
        "vulgateTradition",
        "Some Vulgate manuscripts support this form; the main Vulgate line supports the competing form.",
        aggregate,
      ),
      witness(
        "Syriac Peshitta",
        "syriac",
        "syriacPeshitta",
        "Supports “Joseph and his mother.”",
      ),
      witness(
        "Syriac Harklean",
        "syriac",
        "syriacHarklean",
        "Supports “Joseph and his mother.”",
      ),
      witness(
        "Bohairic witnesses reading “Joseph and his mother”",
        "coptic",
        "bohairic",
        "One Bohairic strand supports this wording.",
        aggregate,
      ),
    ]),
    1: row("primary", "AGAINST_KJV", "AGAINST_KJV", [
      witness(
        "Main Vulgate manuscript line",
        "latin",
        "vulgateTradition",
        "Supports “his father and mother”; this remains distinct from the Vulgate manuscripts cited for “Joseph.”",
        aggregate,
      ),
      witness(
        "Syriac Sinaitic",
        "syriac",
        "syriacSinaitic",
        "Supports “his father and mother.”",
      ),
      witness(
        "Sahidic Coptic",
        "coptic",
        "sahidic",
        "Supports “his father and mother.”",
        aggregate,
      ),
      witness(
        "Bohairic witnesses reading “his father and mother”",
        "coptic",
        "bohairic",
        "A Bohairic strand supports this competing wording.",
        aggregate,
      ),
    ]),
  },

  "luke-4-4": {
    0: row("primary", "FOR_KJV", "FOR_KJV", [
      witness(
        "Latin witnesses with the fuller quotation",
        "latin",
        "latinTraditions",
        "Broad Latin evidence includes the disputed phrase.",
        aggregate,
      ),
      witness(
        "Syriac Peshitta",
        "syriac",
        "syriacPeshitta",
        "Includes the disputed phrase.",
      ),
      witness(
        "Syriac Harklean",
        "syriac",
        "syriacHarklean",
        "Includes the disputed phrase.",
      ),
      witness(
        "Bohairic witnesses with the fuller quotation",
        "coptic",
        "bohairic",
        "One Bohairic strand includes the phrase.",
        aggregate,
      ),
      witness(
        "Gothic version",
        "version",
        "gothic",
        "Includes the disputed phrase.",
        aggregate,
      ),
    ]),
    1: row("primary", "AGAINST_KJV", "AGAINST_KJV", [
      witness(
        "Syriac Sinaitic",
        "syriac",
        "syriacSinaitic",
        "Supports the shorter quotation.",
      ),
      witness(
        "Sahidic Coptic",
        "coptic",
        "sahidic",
        "Supports the shorter quotation.",
        aggregate,
      ),
      witness(
        "Bohairic witnesses with the shorter quotation",
        "coptic",
        "bohairic",
        "A separate Bohairic strand supports the shorter form.",
        aggregate,
      ),
    ]),
  },

  "luke-24-6": {
    0: row("primary", "FOR_KJV", "FOR_KJV", [
      witness(
        "Old Latin aur — Codex Aureus Holmiensis",
        "latin",
        "oldLatinAur",
        "Includes the clause.",
      ),
      witness(
        "Old Latin f — Codex Brixianus",
        "latin",
        "oldLatinF",
        "Includes the clause.",
      ),
      witness(
        "Old Latin q — Codex Monacensis",
        "latin",
        "oldLatinQ",
        "Includes the clause.",
      ),
      witness(
        "Vulgate manuscript tradition",
        "latin",
        "vulgateTradition",
        "Includes the clause across the tradition as a whole.",
        aggregate,
      ),
    ]),
    1: row("primary", "AGAINST_KJV", "AGAINST_KJV", [
      witness(
        "Old Latin witnesses omitting the clause",
        "latin",
        "oldLatinTradition",
        "Part of the Old Latin tradition omits; the source does not identify each manuscript in this summary row.",
        aggregate,
      ),
      witness(
        "Armenian manuscripts omitting the clause",
        "version",
        "armenian",
        "Some Armenian manuscripts support omission; this is not an Armenian-wide claim.",
        aggregate,
      ),
      witness(
        "Georgian-II textual branch",
        "version",
        "georgian",
        "The Georgian-II branch supports omission; it is a textual branch rather than one datable codex.",
        aggregate,
      ),
    ]),
  },

  "john-3-13": {
    0: row("primary", "FOR_KJV", "FOR_KJV", [
      witness(
        "Old Latin witnesses with “who is in heaven”",
        "latin",
        "oldLatinTradition",
        "Broad Old Latin evidence includes the phrase.",
        aggregate,
      ),
      witness(
        "Vulgate manuscript tradition",
        "latin",
        "vulgateTradition",
        "Broad Vulgate evidence includes the phrase.",
        aggregate,
      ),
      witness(
        "Syriac Peshitta",
        "syriac",
        "syriacPeshitta",
        "Includes the phrase.",
      ),
      witness(
        "Syriac Harklean",
        "syriac",
        "syriacHarklean",
        "Includes the phrase.",
      ),
      witness(
        "Christian Palestinian Syriac",
        "syriac",
        "syriacPalestinian",
        "Includes the phrase.",
        aggregate,
      ),
      witness(
        "Bohairic witnesses including the phrase",
        "coptic",
        "bohairic",
        "One Bohairic strand includes the phrase.",
        aggregate,
      ),
    ]),
    1: row("primary", "AGAINST_KJV", "AGAINST_KJV", [
      witness(
        "Sahidic Coptic",
        "coptic",
        "sahidic",
        "Supports omission.",
        aggregate,
      ),
      witness(
        "Bohairic witnesses omitting the phrase",
        "coptic",
        "bohairic",
        "A separate Bohairic strand supports omission.",
        aggregate,
      ),
      witness(
        "Syriac Curetonian — “who was in heaven”",
        "syriac",
        "syriacCuretonian",
        "Preserves the distinct wording “who was in heaven”; it is related evidence, not exact support for either the KJV present-tense phrase or simple omission.",
        {
          directionClass: "OTHER",
          direction: "OTHER_WAS_IN_HEAVEN",
          relationship: "related",
        },
      ),
    ]),
  },

  "acts-20-28": {
    0: row("unit-1", "FOR_KJV", "FOR_KJV_GOD", [
      witness(
        "Vulgate manuscript tradition",
        "latin",
        "vulgateTradition",
        "Supports “God.”",
        aggregate,
      ),
      witness(
        "Syriac Peshitta",
        "syriac",
        "syriacPeshitta",
        "Supports “God.”",
      ),
      witness(
        "Syriac Harklean",
        "syriac",
        "syriacHarklean",
        "Supports “God.”",
      ),
      witness(
        "Bohairic Coptic",
        "coptic",
        "bohairic",
        "The standard apparatus cites Bohairic support for “God.”",
        aggregate,
      ),
    ]),
    1: row("unit-1", "AGAINST_KJV", "AGAINST_KJV_LORD", [
      witness(
        "Old Latin gig — Codex Gigas",
        "latin",
        "oldLatinGig",
        "Supports “Lord.”",
      ),
      witness(
        "Non-Bohairic Coptic witnesses reading “Lord”",
        "coptic",
        "copticTraditions",
        "Coptic support is divided, so this label excludes the Bohairic evidence separately cited for “God.”",
        aggregate,
      ),
      witness(
        "Armenian witnesses reading “Lord”",
        "version",
        "armenian",
        "Supports “Lord” across the tradition as a whole; the source does not claim Armenian unanimity.",
        aggregate,
      ),
    ]),
  },

  "romans-14-10": {
    0: row("primary", "FOR_KJV", "FOR_KJV", [
      witness(
        "Syriac Peshitta",
        "syriac",
        "syriacPeshitta",
        "Supports “Christ.”",
      ),
      witness(
        "Syriac Harklean",
        "syriac",
        "syriacHarklean",
        "Supports “Christ.”",
      ),
      witness(
        "Gothic version",
        "version",
        "gothic",
        "Supports “Christ.”",
        aggregate,
      ),
      witness(
        "Latin witnesses reading “Christ”",
        "latin",
        "latinTraditions",
        "Some Latin witnesses support “Christ”; the Latin transmission is divided.",
        aggregate,
      ),
      witness(
        "Clementine Vulgate",
        "printed",
        "vulgateClementine",
        "The 1592 printed Vulgate supports “Christ”; it is not a manuscript.",
        { relationship: "printed" },
      ),
    ]),
    1: row("primary", "AGAINST_KJV", "AGAINST_KJV", [
      witness(
        "Old Latin witnesses reading “God”",
        "latin",
        "oldLatinTradition",
        "Broad Old Latin evidence supports “God,” without implying that every Latin witness agrees.",
        aggregate,
      ),
      witness(
        "Stuttgart Vulgate",
        "printed",
        "vulgateStuttgart",
        "The modern critical Vulgate text supports “God.”",
        { relationship: "printed" },
      ),
      witness(
        "Coptic witnesses reading “God”",
        "coptic",
        "copticTraditions",
        "Supports “God” across the tradition as a whole.",
        aggregate,
      ),
    ]),
  },

  "1-corinthians-15-47": {
    0: row("primary", "FOR_KJV", "FOR_KJV", [
      witness(
        "Syriac witnesses containing “the Lord”",
        "syriac",
        "syriacTraditions",
        "Only portions of the Syriac tradition support the longer form; the source row does not identify the individual manuscripts.",
        aggregate,
      ),
    ]),
    1: row("primary", "AGAINST_KJV", "AGAINST_KJV", [
      witness(
        "Old Latin witnesses with the shorter form",
        "latin",
        "oldLatinTradition",
        "Broad Old Latin evidence supports the ordinary shorter form.",
        aggregate,
      ),
      witness(
        "Vulgate manuscript tradition",
        "latin",
        "vulgateTradition",
        "Broad Vulgate evidence supports the shorter form.",
        aggregate,
      ),
      witness(
        "Bohairic Coptic",
        "coptic",
        "bohairic",
        "Supports the shorter form.",
        aggregate,
      ),
      witness(
        "Ethiopic version",
        "version",
        "ethiopic",
        "Supports the shorter form.",
        aggregate,
      ),
    ]),
  },

  "ephesians-3-9": {
    0: row("unit-1", "OTHER", "FELLOWSHIP_UNIT", [
      witness(
        "Major early version traditions",
        "version",
        "earlyVersionTraditions",
        "Support the οἰκονομία (“administration/stewardship”) sense rather than the KJV's “fellowship”; this counts several versions together as a group, not one witness.",
        {
          ...aggregate,
          directionClass: "AGAINST_KJV",
          direction: "AGAINST_KJV_OIKONOMIA",
          relationship: "versional",
        },
      ),
    ]),
    1: row("unit-2", "FOR_KJV", "BY_JESUS_CHRIST_FOR_KJV", [
      witness(
        "Syriac Harklean",
        "syriac",
        "syriacHarklean",
        "Supports the added phrase “by Jesus Christ.”",
      ),
    ]),
    2: row("unit-2", "AGAINST_KJV", "BY_JESUS_CHRIST_AGAINST_KJV", [
      witness(
        "Early Latin witnesses omitting “by Jesus Christ”",
        "latin",
        "earlyLatinTradition",
        "Most early Latin evidence omits the phrase; the source cites the group rather than naming each codex.",
        aggregate,
      ),
      witness(
        "Early Syriac witnesses omitting “by Jesus Christ”",
        "syriac",
        "syriacTraditions",
        "Most early Syriac evidence omits the phrase.",
        aggregate,
      ),
      witness(
        "Coptic witnesses omitting “by Jesus Christ”",
        "coptic",
        "copticTraditions",
        "Coptic evidence supports omission across the tradition as a whole.",
        aggregate,
      ),
    ]),
  },

  "1-john-4-3": {
    0: row("unit-1", "OTHER", "AGAINST_KJV_SHORT_OR_NONFULLER", [
      witness(
        "Latin witnesses with a shorter or non-fuller form",
        "latin",
        "latinTraditions",
        "Supports a non-Byzantine-fuller form; this row excludes the distinct solvit Iesum reading catalogued separately.",
        {
          ...aggregate,
          directionClass: "OTHER",
          direction: "AGAINST_KJV_SHORT_OR_NONFULLER",
          relationship: "mixed",
        },
      ),
      witness(
        "Coptic witnesses with a shorter or non-fuller form",
        "coptic",
        "copticTraditions",
        "Supports a shorter/non-fuller form without being reduced to a generic vote against the KJV.",
        {
          ...aggregate,
          directionClass: "OTHER",
          direction: "AGAINST_KJV_SHORT_OR_NONFULLER",
          relationship: "mixed",
        },
      ),
    ]),
    1: row("unit-3", "OTHER", "DISSOLVES", [
      witness(
        "Vulgate tradition — solvit Iesum",
        "latin",
        "vulgateTradition",
        "Reads solvit Iesum (“dissolves Jesus”), a distinct Latin reading rather than Greek-manuscript evidence.",
        {
          ...aggregate,
          directionClass: "OTHER",
          direction: "DISSOLVES",
          relationship: "related",
        },
      ),
      witness(
        "Related Old Latin tradition — solvit Iesum",
        "latin",
        "oldLatinTradition",
        "Preserves the related “dissolves Jesus” reading and witnesses its antiquity without being counted as the KJV or critical Greek form.",
        {
          ...aggregate,
          directionClass: "OTHER",
          direction: "DISSOLVES",
          relationship: "related",
        },
      ),
    ]),
  },

  "revelation-1-8": {
    0: row("unit-1", "FOR_KJV", "UNIT1_FOR_KJV", [
      witness(
        "Old Latin ar — Book of Armagh",
        "latin",
        "oldLatinAr",
        "Supports “beginning and end.”",
      ),
      witness(
        "Old Latin gig — Codex Gigas",
        "latin",
        "oldLatinGig",
        "Supports “beginning and end.”",
      ),
      witness(
        "Old Latin t — Liber Comicus",
        "latin",
        "oldLatinTRevelation",
        "Supports “beginning and end”; siglum t in this corpus denotes the Liber Comicus witness, not a Gospel codex.",
      ),
      witness(
        "Vulgate am — Codex Amiatinus",
        "latin",
        "vulgateAm",
        "Supports “beginning and end.”",
      ),
      witness(
        "Vulgate fu — Codex Fuldensis",
        "latin",
        "vulgateFu",
        "Supports “beginning and end.”",
      ),
      witness(
        "Vulgate harl — Codex Harleianus",
        "latin",
        "vulgateHarl",
        "Supports “beginning and end.”",
      ),
      witness(
        "Clementine Vulgate",
        "printed",
        "vulgateClementine",
        "The 1592 printed edition supports “beginning and end.”",
        { relationship: "printed" },
      ),
      witness(
        "Stuttgart Vulgate",
        "printed",
        "vulgateStuttgart",
        "The modern critical edition supports “beginning and end.”",
        { relationship: "printed" },
      ),
      witness(
        "Wordsworth–White Vulgate",
        "printed",
        "vulgateWordsworthWhite",
        "The Oxford critical edition supports “beginning and end.”",
        { relationship: "printed" },
      ),
      witness(
        "Coptic witnesses",
        "coptic",
        "copticTraditions",
        "Support “beginning and end” across the tradition as a whole.",
        aggregate,
      ),
    ]),
    1: row("unit-1", "AGAINST_KJV", "UNIT1_AGAINST_KJV", [
      witness(
        "Old Latin h — Codex Floriacensis",
        "latin",
        "oldLatinHRevelation",
        "Supports the shorter form.",
      ),
      witness(
        "Vulgate manuscripts with the shorter form",
        "latin",
        "vulgateTradition",
        "A Vulgate manuscript strand supports the shorter form; this is not the entire Vulgate tradition.",
        aggregate,
      ),
      witness(
        "Syriac Revelation tradition",
        "syriac",
        "syriacRevelation",
        "Supports the shorter form; Revelation's Syriac evidence belongs to the Philoxenian/Harklean transmission, not the original Peshitta canon.",
        aggregate,
      ),
      witness(
        "Armenian version",
        "version",
        "armenian",
        "Supports the shorter form.",
        aggregate,
      ),
      witness(
        "Ethiopic version",
        "version",
        "ethiopic",
        "Supports the shorter form.",
        aggregate,
      ),
      witness(
        "Georgian version",
        "version",
        "georgian",
        "Supports the shorter form.",
        aggregate,
      ),
      witness(
        "Slavonic-b textual branch",
        "version",
        "slavonic",
        "Supports the shorter form; the suffix marks a textual branch, not a separate language.",
        aggregate,
      ),
    ]),
    2: row("unit-2", "FOR_KJV", "UNIT2_FOR_KJV_EXACT", [
      witness(
        "Old Latin ar — Book of Armagh",
        "latin",
        "oldLatinAr",
        "Supports “says the Lord” without “God.”",
      ),
      witness(
        "Ethiopic version",
        "version",
        "ethiopic",
        "Supports “says the Lord” without “God.”",
        aggregate,
      ),
      witness(
        "Armenian-c textual branch",
        "version",
        "armenian",
        "Supports “says the Lord” without “God”; the suffix identifies a branch within Armenian transmission.",
        aggregate,
      ),
    ]),
    3: row("unit-2", "AGAINST_KJV", "UNIT2_AGAINST_KJV", [
      witness(
        "Old Latin h — Codex Floriacensis",
        "latin",
        "oldLatinHRevelation",
        "Supports “Lord God.”",
      ),
      witness(
        "Vulgate manuscript tradition",
        "latin",
        "vulgateTradition",
        "Supports “Lord God.”",
        aggregate,
      ),
      witness(
        "Syriac Revelation tradition",
        "syriac",
        "syriacRevelation",
        "Supports “Lord God.”",
        aggregate,
      ),
      witness(
        "Coptic versions",
        "coptic",
        "copticTraditions",
        "Support “Lord God.”",
        aggregate,
      ),
      witness(
        "Armenian-m textual branch",
        "version",
        "armenian",
        "Supports “Lord God”; the suffix marks a branch of Armenian transmission.",
        aggregate,
      ),
      witness(
        "Georgian version",
        "version",
        "georgian",
        "Supports “Lord God.”",
        aggregate,
      ),
      witness(
        "Arabic Revelation tradition",
        "version",
        "arabicTradition",
        "Supports “Lord God” across the tradition as a whole.",
        aggregate,
      ),
    ]),
  },

  "revelation-1-11": {
    0: row("primary", "AGAINST_KJV", "AGAINST_KJV", [
      witness(
        "Vulgate manuscript tradition",
        "latin",
        "vulgateTradition",
        "Supports the short text.",
        aggregate,
      ),
      witness(
        "Syriac Revelation tradition",
        "syriac",
        "syriacRevelation",
        "Supports the short text.",
        aggregate,
      ),
      witness(
        "Sahidic Coptic",
        "coptic",
        "sahidic",
        "Supports the short text.",
        aggregate,
      ),
      witness(
        "Armenian-m textual branch",
        "version",
        "armenian",
        "Supports the short text.",
        aggregate,
      ),
      witness(
        "Ethiopic textual tradition",
        "version",
        "ethiopic",
        "Broad Ethiopic evidence supports the short text.",
        aggregate,
      ),
      witness(
        "Georgian textual tradition",
        "version",
        "georgian",
        "Broad Georgian evidence supports the short text.",
        aggregate,
      ),
      witness(
        "Slavonic textual tradition",
        "version",
        "slavonic",
        "Broad Slavonic evidence supports the short text.",
        aggregate,
      ),
      witness(
        "Arabic textual tradition",
        "version",
        "arabicTradition",
        "Broad Arabic evidence supports the short text.",
        aggregate,
      ),
    ]),
    1: row("primary", "OTHER", "RELATED_ONLY", [
      witness(
        "Arabic text in Walton's London Polyglot (arab-w)",
        "printed",
        "waltonPolyglot",
        "Aligns with a related expansion, not the exact KJV form; arab-w identifies Walton's printed Arabic text rather than an ancient Arabic manuscript.",
        {
          directionClass: "OTHER",
          direction: "RELATED_ONLY",
          relationship: "printed",
        },
      ),
    ]),
  },

  "revelation-16-5": {
    0: row("unit-1", "FOR_KJV", "FOR_KJV_LORD", [
      witness(
        "Clementine Vulgate",
        "printed",
        "vulgateClementine",
        "The 1592 printed Vulgate includes “Lord.”",
        { relationship: "printed" },
      ),
      witness(
        "Vulgate lips4 — Leipzig MS 4",
        "latin",
        "vulgateLips4",
        "Includes “Lord.”",
      ),
      witness(
        "Vulgate lips6 — Leipzig MS 6",
        "latin",
        "vulgateLips6",
        "Includes “Lord.”",
      ),
      witness(
        "Bohairic-G",
        "coptic",
        "bohairicG",
        "Includes “Lord”; G is the apparatus's Bohairic witness label.",
      ),
      witness(
        "Ethiopic text in Walton's London Polyglot",
        "printed",
        "waltonPolyglot",
        "Walton's 1657 printed Ethiopic text includes “Lord”; it is not an ancient Ethiopic manuscript.",
        { relationship: "printed" },
      ),
    ]),
    1: row("unit-2", "FOR_KJV", "FOR_KJV_FUTURE", [
      witness(
        "Ethiopic text in Walton's London Polyglot",
        "printed",
        "waltonPolyglot",
        "Has a future-tense form (“who are and will be”); it is related to the KJV future, but not identical to the full TR wording.",
        {
          directionClass: "OTHER",
          direction: "RELATED_FUTURE_FORM",
          relationship: "printed",
        },
      ),
    ]),
    2: row("unit-2", "AGAINST_KJV", "AGAINST_KJV_HOLY", [
      witness(
        "Vulgate manuscript tradition",
        "latin",
        "vulgateTradition",
        "Supports “the Holy One.”",
        aggregate,
      ),
      witness(
        "Sahidic Coptic",
        "coptic",
        "sahidic",
        "Supports “the Holy One.”",
        aggregate,
      ),
    ]),
  },

  "revelation-22-19": {
    0: row("primary", "FOR_KJV", "FOR_KJV_BOOK", [
      witness(
        "Clementine Vulgate",
        "printed",
        "vulgateClementine",
        "The 1592 printed Vulgate reads “book of life.”",
        { relationship: "printed" },
      ),
      witness(
        "Vulgate fu — Codex Fuldensis",
        "latin",
        "vulgateFu",
        "Reads “book of life.”",
      ),
      witness(
        "Vulgate lips4 — Leipzig MS 4",
        "latin",
        "vulgateLips4",
        "Reads “book of life.”",
      ),
      witness(
        "Vulgate lips5 — Leipzig MS 5",
        "latin",
        "vulgateLips5",
        "Reads “book of life.”",
      ),
      witness(
        "Bohairic Coptic",
        "coptic",
        "bohairic",
        "Supports “book of life.”",
        aggregate,
      ),
      witness(
        "Arabic text in Walton's London Polyglot (arab-w)",
        "printed",
        "waltonPolyglot",
        "Supports “book of life”; arab-w is Walton's 1657 printed Arabic text.",
        { relationship: "printed" },
      ),
    ]),
    1: row("primary", "AGAINST_KJV", "AGAINST_KJV_TREE", [
      witness(
        "Old Latin gig — Codex Gigas",
        "latin",
        "oldLatinGig",
        "Reads “tree of life.”",
      ),
      witness(
        "Vulgate am — Codex Amiatinus",
        "latin",
        "vulgateAm",
        "Reads “tree of life.”",
      ),
      witness(
        "Vulgate dem — Codex Demidovianus",
        "latin",
        "vulgateDem",
        "Reads “tree of life.”",
      ),
      witness(
        "Stuttgart Vulgate",
        "printed",
        "vulgateStuttgart",
        "The modern critical Vulgate reads “tree of life.”",
        { relationship: "printed" },
      ),
      witness(
        "Wordsworth–White Vulgate",
        "printed",
        "vulgateWordsworthWhite",
        "The Oxford critical edition reads “tree of life.”",
        { relationship: "printed" },
      ),
      witness(
        "Vulgate lips6 — Leipzig MS 6",
        "latin",
        "vulgateLips6",
        "Reads “tree of life.”",
      ),
      witness(
        "Syriac Philoxenian",
        "syriac",
        "syriacPhiloxenian",
        "Supports “tree of life”; Revelation was not part of the original Peshitta collection, so this witness is identified as Philoxenian rather than Peshitta.",
      ),
      witness(
        "Syriac Harklean",
        "syriac",
        "syriacHarklean",
        "Supports “tree of life.”",
      ),
      witness(
        "Sahidic Coptic",
        "coptic",
        "sahidic",
        "Supports “tree of life.”",
        aggregate,
      ),
      witness(
        "Ethiopic version",
        "version",
        "ethiopic",
        "Supports “tree of life.”",
        aggregate,
      ),
      witness(
        "Armenian version",
        "version",
        "armenian",
        "Supports “tree of life.”",
        aggregate,
      ),
    ]),
  },
} as const;

/**
 * Named fathers and commentators found inside version rows are intentionally
 * exported separately. They must be rendered with patristic evidence, not as
 * Latin/Vulgate/Coptic manuscripts.
 */
export const wave2VersionPatristicExtras: Readonly<
  Record<string, Readonly<Record<number, readonly Wave2VersionPatristicExtra[]>>>
> = {
  "revelation-16-5": {
    1: [
      {
        rowIndex: 1,
        unit: "unit-2",
        directionClass: "OTHER",
        direction: "RELATED_FUTURE_FORM",
        source: "Beatus of Liébana",
        author: "Beatus of Liébana",
        date: "AD 776–786 commentary",
        dateStart: 776,
        dateEnd: 786,
        workSection: "Commentary on the Apocalypse, lemma/comment on Revelation 16:5",
        quoteSummary:
          "The cited Latin wording has a future form (“who were and will be”), related to but not identical with the full TR/KJV wording.",
        reading: "RELATED_TO_KJV",
        relationship: "close_quote",
        confidence:
          "High for Palmer's cited Latin form; medium for whether it reflects an independent biblical lemma rather than commentary adaptation.",
        sourceCitation: "Palmer, Revelation 16:5 apparatus",
        sourceUrl: SOURCE_URLS.palmer,
      },
    ],
  },
  "revelation-22-19": {
    0: [
      {
        rowIndex: 0,
        unit: "primary",
        directionClass: "FOR_KJV",
        direction: "FOR_KJV_BOOK",
        source: "Ambrose of Milan",
        author: "Ambrose of Milan",
        date: "c. AD 339–397",
        dateStart: 339,
        dateEnd: 397,
        workSection: "Latin citation tradition for Revelation 22:19",
        quoteSummary: "Cited in the apparatus for the “book of life” reading.",
        reading: "FOR_KJV",
        relationship: "close_quote",
        confidence: "High for the apparatus attribution; no verbatim quotation supplied here.",
        sourceCitation: "Palmer, Revelation 22:19 apparatus",
        sourceUrl: SOURCE_URLS.palmer,
      },
      {
        rowIndex: 0,
        unit: "primary",
        directionClass: "FOR_KJV",
        direction: "FOR_KJV_BOOK",
        source: "Acts of Saturninus",
        author: "Acts of Saturninus",
        date: "late antique, broadly 4th–5th c.",
        dateStart: 300,
        dateEnd: 499,
        workSection: "Latin martyr-text citation of Revelation 22:19",
        quoteSummary: "Cited in the apparatus for the “book of life” reading.",
        reading: "FOR_KJV",
        relationship: "close_quote",
        confidence:
          "Medium-high; the apparatus names the martyr text, whose precise recension/date requires broad bounds.",
        sourceCitation: "Palmer, Revelation 22:19 apparatus",
        sourceUrl: SOURCE_URLS.palmer,
      },
      {
        rowIndex: 0,
        unit: "primary",
        directionClass: "FOR_KJV",
        direction: "FOR_KJV_BOOK",
        source: "Primasius of Hadrumetum",
        author: "Primasius of Hadrumetum",
        date: "mid-6th c., c. AD 540–560",
        dateStart: 540,
        dateEnd: 560,
        workSection: "Commentary on the Apocalypse, Revelation 22:19",
        quoteSummary: "Cited in the apparatus for the “book of life” reading.",
        reading: "FOR_KJV",
        relationship: "close_quote",
        confidence: "High for the apparatus attribution.",
        sourceCitation: "Palmer, Revelation 22:19 apparatus",
        sourceUrl: SOURCE_URLS.palmer,
      },
      {
        rowIndex: 0,
        unit: "primary",
        directionClass: "FOR_KJV",
        direction: "FOR_KJV_BOOK",
        source: "Haymo of Halberstadt",
        author: "Haymo of Halberstadt",
        date: "9th c., before AD 853",
        dateStart: 800,
        dateEnd: 853,
        workSection: "Commentary tradition on Revelation 22:19",
        quoteSummary: "Cited in the apparatus for the “book of life” reading.",
        reading: "FOR_KJV",
        relationship: "close_quote",
        confidence: "High for the apparatus attribution.",
        sourceCitation: "Palmer, Revelation 22:19 apparatus",
        sourceUrl: SOURCE_URLS.palmer,
      },
    ],
    1: [
      {
        rowIndex: 1,
        unit: "primary",
        directionClass: "AGAINST_KJV",
        direction: "AGAINST_KJV_TREE",
        source: "Tyconius",
        author: "Tyconius",
        date: "c. AD 380–385",
        dateStart: 380,
        dateEnd: 385,
        workSection: "Commentary tradition on Revelation 22:19",
        quoteSummary: "Cited in the apparatus for the “tree of life” reading.",
        reading: "AGAINST_KJV",
        relationship: "close_quote",
        confidence:
          "High for the apparatus attribution; Tyconius's lost commentary survives through later excerpting traditions.",
        sourceCitation: "Palmer, Revelation 22:19 apparatus",
        sourceUrl: SOURCE_URLS.palmer,
      },
      {
        rowIndex: 1,
        unit: "primary",
        directionClass: "AGAINST_KJV",
        direction: "AGAINST_KJV_TREE",
        source: "Apringius of Beja",
        author: "Apringius of Beja",
        date: "mid-6th c., c. AD 540–560",
        dateStart: 540,
        dateEnd: 560,
        workSection: "Commentary on the Apocalypse, Revelation 22:19",
        quoteSummary: "Cited in the apparatus for the “tree of life” reading.",
        reading: "AGAINST_KJV",
        relationship: "close_quote",
        confidence: "High for the apparatus attribution.",
        sourceCitation: "Palmer, Revelation 22:19 apparatus",
        sourceUrl: SOURCE_URLS.palmer,
      },
      {
        rowIndex: 1,
        unit: "primary",
        directionClass: "AGAINST_KJV",
        direction: "AGAINST_KJV_TREE",
        source: "Beatus of Liébana",
        author: "Beatus of Liébana",
        date: "AD 776–786 commentary",
        dateStart: 776,
        dateEnd: 786,
        workSection: "Commentary on the Apocalypse, Revelation 22:19",
        quoteSummary: "Cited in the apparatus for the “tree of life” reading.",
        reading: "AGAINST_KJV",
        relationship: "close_quote",
        confidence: "High for the apparatus attribution.",
        sourceCitation: "Palmer, Revelation 22:19 apparatus",
        sourceUrl: SOURCE_URLS.palmer,
      },
    ],
  },
} as const;

export const EXPECTED_WAVE2_VERSION_ROW_COUNTS = {
  "matthew-1-25": 2,
  "matthew-5-22": 2,
  "matthew-5-44": 2,
  "matthew-19-16-17": 2,
  "matthew-27-35": 2,
  "mark-1-2": 2,
  "mark-10-24": 2,
  "luke-2-14": 2,
  "luke-2-33": 2,
  "luke-4-4": 2,
  "luke-24-6": 2,
  "john-3-13": 2,
  "acts-20-28": 2,
  "romans-14-10": 2,
  "1-corinthians-15-47": 2,
  "ephesians-3-9": 3,
  "1-john-4-3": 2,
  "revelation-1-8": 4,
  "revelation-1-11": 2,
  "revelation-16-5": 3,
  "revelation-22-19": 2,
} as const;

export type Wave2VersionCoverageReport = {
  expectedRows: number;
  coveredRows: number;
  witnessRecords: number;
};

/**
 * Throws if a source passage or row index is missing, duplicated through an
 * out-of-range key, empty, or contains a witness without usable numeric dates.
 */
export function assertWave2VersionWitnessCoverage(): Wave2VersionCoverageReport {
  const expectedSlugs = Object.keys(EXPECTED_WAVE2_VERSION_ROW_COUNTS).sort();
  const actualSlugs = Object.keys(wave2VersionWitnessSpecs).sort();

  if (expectedSlugs.join("|") !== actualSlugs.join("|")) {
    throw new Error(
      `Wave 2 version-spec slug mismatch.\nExpected: ${expectedSlugs.join(", ")}\nActual: ${actualSlugs.join(", ")}`,
    );
  }

  let expectedRows = 0;
  let coveredRows = 0;
  let witnessRecords = 0;

  for (const slug of expectedSlugs) {
    const expectedCount =
      EXPECTED_WAVE2_VERSION_ROW_COUNTS[
        slug as keyof typeof EXPECTED_WAVE2_VERSION_ROW_COUNTS
      ];
    const passageSpecs = wave2VersionWitnessSpecs[slug];
    const actualIndexes = Object.keys(passageSpecs)
      .map(Number)
      .sort((a, b) => a - b);
    const expectedIndexes = Array.from(
      { length: expectedCount },
      (_, index) => index,
    );

    expectedRows += expectedCount;
    coveredRows += actualIndexes.length;

    if (actualIndexes.join("|") !== expectedIndexes.join("|")) {
      throw new Error(
        `${slug}: expected version row indexes ${expectedIndexes.join(", ")}, got ${actualIndexes.join(", ")}`,
      );
    }

    for (const rowIndex of actualIndexes) {
      const spec = passageSpecs[rowIndex];
      if (!spec || spec.witnesses.length === 0) {
        throw new Error(`${slug}[${rowIndex}] has no curated witness records.`);
      }

      for (const item of spec.witnesses) {
        witnessRecords += 1;
        if (
          !item.witness.trim() ||
          !item.date.trim() ||
          !Number.isFinite(item.dateStart) ||
          !Number.isFinite(item.dateEnd) ||
          item.dateStart > item.dateEnd
        ) {
          throw new Error(
            `${slug}[${rowIndex}] has an invalid dated witness: ${JSON.stringify(item)}`,
          );
        }
      }
    }
  }

  if (expectedRows !== 46 || coveredRows !== 46) {
    throw new Error(
      `Wave 2 version coverage must be exactly 46 rows; expected ${expectedRows}, covered ${coveredRows}.`,
    );
  }

  return { expectedRows, coveredRows, witnessRecords };
}
