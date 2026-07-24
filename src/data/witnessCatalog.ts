/**
 * Curated public dates for the manuscript and version sigla used by Wave 2.
 *
 * A date on a manuscript entry dates the physical witness, not the reading's
 * archetype.  A date on an aggregate entry describes the dated span of the
 * named group and must never be presented as though the group were one codex.
 */

export type GreekCorpus =
  | "gospels"
  | "acts"
  | "paul"
  | "catholic"
  | "revelation";

export type WitnessCatalogKind =
  | "greek-manuscript"
  | "greek-family"
  | "greek-tradition"
  | "latin-manuscript"
  | "version-manuscript"
  | "version-tradition"
  | "patristic"
  | "printed-edition";

export type GreekWitnessQualifier =
  | "first-hand"
  | "corrector"
  | "corrector-probable"
  | "corrector-or-margin"
  | "margin"
  | "main-text"
  | "probable-reading"
  | "first-hand-probable"
  | "supplement"
  | "numbered-corrector"
  | "partial-family"
  | "family-exception";

export type WitnessCatalogEntry = {
  key: string;
  displayName: string;
  date: string;
  dateStart: number;
  dateEnd: number;
  aggregate: boolean;
  kind: WitnessCatalogKind;
  dateSource: string;
  dateSourceUrl: string;
  note?: string;
};

export type NormalizedGreekSiglum = {
  rawSiglum: string;
  normalizedSiglum: string;
  baseSiglum: string;
  qualifier?: GreekWitnessQualifier;
  qualifierText?: string;
};

export type ResolvedGreekWitness = WitnessCatalogEntry & {
  rawSiglum: string;
  baseSiglum: string;
  qualifier?: GreekWitnessQualifier;
  qualifierText?: string;
  qualifierNote?: string;
};

const INTF_LISTE = "INTF Kurzgefasste Liste / NTVMR manuscript metadata";
const INTF_LISTE_URL =
  "https://ntvmr.uni-muenster.de/liste?docID=LISTE";
const PALMER_REVELATION = "David Robert Palmer, Revelation apparatus";
const PALMER_REVELATION_URL =
  "https://www.bibletranslation.ws/trans/revwgrk.pdf";
const WILLKER_MATTHEW = "Wieland Willker, Textual Commentary on Matthew";
const WILLKER_MATTHEW_URL =
  "https://www.willker.de/wie/TCG/TC-Matthew.pdf";
const CNTR_MATTHEW_5_22 = "CNTR collation, Matthew 5:22";
const CNTR_MATTHEW_5_22_URL =
  "https://greekcntr.org/collation/data/40005022.html";

/**
 * Canonical public citation label for each catalogue source URL. Display
 * components use this so ad-hoc labels in imported rows ("Willker Matthew
 * apparatus") collapse into the one formal citation per work.
 */
export const canonicalSourceLabels: Record<string, string> = {
  [INTF_LISTE_URL]: INTF_LISTE,
  [PALMER_REVELATION_URL]: PALMER_REVELATION,
  [WILLKER_MATTHEW_URL]: WILLKER_MATTHEW,
  [CNTR_MATTHEW_5_22_URL]: CNTR_MATTHEW_5_22,
};

function intfManuscriptUrl(gaNum: string) {
  return `https://ntvmr.uni-muenster.de/community/vmr/api/metadata/manuscript/get/?gaNum=${encodeURIComponent(gaNum)}&detail=1&format=json`;
}

type GreekRow = readonly [
  key: string,
  date: string,
  dateStart: number,
  dateEnd: number,
  properName?: string,
  note?: string,
];

function greekManuscript(row: GreekRow): WitnessCatalogEntry {
  const [key, date, dateStart, dateEnd, properName, note] = row;
  const isPapyrus = /^P\d/u.test(key);
  const isMajuscule = /^0\d/u.test(key);
  const className = isPapyrus
    ? `Papyrus ${key}`
    : isMajuscule
      ? `Uncial ${key}`
      : key.startsWith("l")
        ? `Lectionary ${key.slice(1)}`
        : `Minuscule ${key}`;
  const isMatthewPapyrusComposite = key === "P64/P67";

  return {
    key,
    displayName: properName ? `${properName} (GA ${key})` : `${className} (GA ${key})`,
    date,
    dateStart,
    dateEnd,
    aggregate: false,
    kind: "greek-manuscript",
    dateSource: isMatthewPapyrusComposite ? CNTR_MATTHEW_5_22 : INTF_LISTE,
    dateSourceUrl: isMatthewPapyrusComposite
      ? CNTR_MATTHEW_5_22_URL
      : intfManuscriptUrl(key),
    note,
  };
}

const greekRows: readonly GreekRow[] = [
  ["P46", "Late second–early third century", 175, 225, "Papyrus 46"],
  ["P47", "Third century", 201, 300, "Papyrus 47"],
  [
    "P64/P67",
    "Second century (AD 150–199)",
    150,
    199,
    "P64/P67 composite",
    "The two fragments are treated as parts of the same Gospel codex.",
  ],
  ["P66", "Late second–early third century", 175, 225, "Papyrus 66"],
  ["P74", "Seventh century", 601, 700, "Papyrus 74"],
  ["P75", "Late second–early third century", 175, 225, "Papyrus 75"],

  ["01", "Fourth century (AD 325–360)", 325, 360, "Codex Sinaiticus"],
  ["02", "Fifth century", 401, 500, "Codex Alexandrinus"],
  ["03", "Fourth century (AD 325–350)", 325, 350, "Codex Vaticanus"],
  ["04", "Fifth century", 401, 500, "Codex Ephraemi Rescriptus"],
  ["05", "Late fourth–early fifth century", 375, 425, "Codex Bezae"],
  ["06", "Sixth century", 501, 600, "Codex Claromontanus"],
  ["08", "Sixth century", 501, 600, "Codex Laudianus"],
  ["010", "Ninth century", 801, 900, "Codex Augiensis"],
  ["012", "Ninth century", 801, 900, "Codex Boernerianus"],
  ["014", "Ninth century", 801, 900, "Codex Mutinensis"],
  ["017", "Ninth century", 801, 900, "Codex Cyprius"],
  ["018", "Ninth century", 801, 900, "Codex Mosquensis I"],
  ["019", "Eighth century", 701, 800, "Codex Regius"],
  ["020", "Ninth century", 801, 900, "Codex Angelicus"],
  ["022", "Sixth century", 501, 600, "Codex Petropolitanus Purpureus"],
  ["024", "Sixth century", 501, 600, "Codex Guelferbytanus A"],
  ["025", "Ninth century", 801, 900, "Codex Porphyrianus"],
  ["026", "Fifth–sixth century", 401, 600],
  ["029", "Fifth century", 401, 500, "Codex Borgianus"],
  ["032", "Late fourth–fifth century", 375, 499, "Codex Washingtonianus"],
  ["033", "Tenth century", 901, 1000, "Codex Monacensis"],
  ["035", "Sixth century", 501, 600, "Codex Dublinensis"],
  ["037", "Ninth century", 801, 900, "Codex Sangallensis"],
  ["038", "Ninth century", 801, 900, "Codex Koridethi"],
  ["040", "Sixth century", 501, 600, "Codex Zacynthius"],
  ["042", "Sixth century", 501, 600, "Codex Rossanensis"],
  ["043", "Sixth century", 501, 600, "Codex Beratinus"],
  ["044", "Ninth–tenth century", 801, 1000, "Codex Athous Lavrensis"],
  ["046", "Tenth century", 901, 1000],
  ["047", "Eighth century", 701, 800],
  ["048", "Fifth century", 401, 500],
  ["049", "Ninth century", 801, 900],
  ["050", "Ninth century", 801, 900],
  ["051", "Tenth century", 901, 1000],
  ["056", "Tenth century", 901, 1000],
  ["071", "Fifth–sixth century", 401, 600],
  ["083", "Fifth–sixth century", 401, 600],
  ["086", "Sixth century", 501, 600],
  ["087", "Sixth century", 501, 600],
  ["0141", "Tenth century", 901, 1000],
  ["0142", "Tenth century", 901, 1000],
  ["0150", "Ninth century", 801, 900],
  ["0170", "Fifth–sixth century", 401, 600],
  ["0171", "Fourth century", 301, 400],
  ["0209", "Seventh century", 601, 700],
  ["0233", "Eighth century", 701, 800],
  ["0243", "Tenth century", 901, 1000],
  ["0250", "Eighth century", 701, 800],
  ["0278", "Ninth century", 801, 900],
  ["0287", "Ninth century", 801, 900],

  ["2", "Eleventh–twelfth century", 1001, 1200],
  ["4", "Thirteenth century", 1201, 1300],
  ["6", "Thirteenth century", 1201, 1300],
  ["22", "Twelfth century", 1101, 1200],
  ["23", "Eleventh century", 1001, 1100],
  ["28", "Eleventh century", 1001, 1100],
  ["33", "Ninth century", 801, 900],
  ["36", "Tenth century", 901, 1000],
  [
    "61",
    "Sixteenth century (often dated c. AD 1520)",
    1501,
    1600,
    "Codex Montfortianus",
  ],
  ["81", "AD 1044", 1044, 1044],
  ["88", "Twelfth century", 1101, 1200],
  ["91", "Eleventh century", 1001, 1100],
  ["93", "Tenth–eleventh century", 901, 1100],
  ["104", "AD 1087", 1087, 1087],
  ["118", "Thirteenth century", 1201, 1300],
  ["124", "Twelfth century", 1101, 1200],
  ["157", "AD 1122", 1122, 1122],
  ["174", "AD 1052", 1052, 1052],
  ["181", "Tenth century", 901, 1000],
  ["205", "Fifteenth century", 1401, 1500],
  ["209", "Fourteenth century", 1301, 1400],
  ["218", "Thirteenth century", 1201, 1300],
  ["264", "Twelfth century", 1101, 1200],
  ["279", "Twelfth century", 1101, 1200],
  ["312", "Eleventh century", 1001, 1100],
  ["322", "Fourteenth century", 1301, 1400],
  ["323", "Twelfth century", 1101, 1200],
  ["326", "Tenth century", 901, 1000],
  ["330", "Twelfth century", 1101, 1200],
  ["372", "Sixteenth century", 1501, 1600],
  ["397", "Tenth–eleventh century", 901, 1100],
  ["424", "Eleventh century", 1001, 1100],
  ["436", "Eleventh–twelfth century", 1001, 1200],
  ["451", "Eleventh century", 1001, 1100],
  ["453", "Fourteenth century", 1301, 1400],
  ["459", "AD 1092", 1092, 1092],
  ["469", "Thirteenth century", 1201, 1300],
  ["517", "Eleventh–twelfth century", 1001, 1200],
  ["565", "Ninth century", 801, 900],
  ["579", "Thirteenth century", 1201, 1300],
  ["614", "Thirteenth century", 1201, 1300],
  ["629", "AD 1362–1363", 1362, 1363],
  ["630", "Twelfth–thirteenth century", 1101, 1300],
  ["652", "Tenth century", 901, 1000],
  ["660", "Twelfth century", 1101, 1200],
  ["700", "Eleventh century", 1001, 1100],
  ["788", "Eleventh century", 1001, 1100],
  ["792", "Thirteenth century", 1201, 1300],
  ["828", "Twelfth century", 1101, 1200],
  ["892", "Ninth century", 801, 900],
  ["911", "Twelfth century", 1101, 1200],
  ["917", "Twelfth century", 1101, 1200],
  ["922", "AD 1116", 1116, 1116],
  ["945", "Eleventh century", 1001, 1100],
  ["954", "Fifteenth century", 1401, 1500],
  ["983", "Twelfth century", 1101, 1200],
  ["1006", "Eleventh century", 1001, 1100],
  ["1010", "Twelfth century", 1101, 1200],
  ["1067", "Fourteenth century", 1301, 1400],
  ["1071", "Twelfth century", 1101, 1200],
  ["1175", "Tenth century", 901, 1000],
  ["1182", "Fourteenth century", 1301, 1400],
  ["1192", "Eleventh century", 1001, 1100],
  ["1241", "Twelfth century", 1101, 1200],
  ["1243", "Eleventh century", 1001, 1100],
  ["1292", "Thirteenth century", 1201, 1300],
  ["1293", "Eleventh century", 1001, 1100],
  ["1319", "Twelfth century", 1101, 1200],
  ["1342", "Thirteenth–fourteenth century", 1201, 1400],
  ["1409", "Fourteenth century", 1301, 1400],
  ["1424", "Ninth–tenth century", 801, 1000],
  ["1463", "Thirteenth century", 1201, 1300],
  ["1505", "Twelfth century", 1101, 1200],
  ["1506", "AD 1320", 1320, 1320],
  [
    "1522",
    "Fourteenth century",
    1301,
    1400,
    undefined,
    "Former GA 1522; this witness was subsequently renumbered GA 1890.",
  ],
  ["1611", "Tenth century", 901, 1000],
  ["1675", "Fourteenth century", 1301, 1400],
  ["1678", "Fourteenth century", 1301, 1400],
  ["1734", "AD 1015", 1015, 1015],
  ["1739", "Tenth century", 901, 1000],
  ["1758", "Thirteenth century", 1201, 1300],
  ["1778", "Fifteenth century", 1401, 1500],
  ["1828", "Eleventh century", 1001, 1100],
  ["1831", "Fourteenth century", 1301, 1400],
  ["1841", "Ninth–tenth century", 801, 1000],
  ["1844", "Sixteenth century", 1501, 1600],
  ["1852", "Thirteenth century", 1201, 1300],
  ["1854", "Eleventh century", 1001, 1100],
  ["1877", "Fourteenth century", 1301, 1400],
  ["1881", "Fourteenth century", 1301, 1400],
  ["1888", "Eleventh century", 1001, 1100],
  ["1891", "Tenth century", 901, 1000],
  ["1984", "Fourteenth century", 1301, 1400],
  ["1985", "Sixteenth century", 1501, 1600],
  ["2050", "Twelfth century", 1101, 1200],
  ["2053", "Thirteenth century", 1201, 1300],
  ["2062", "Thirteenth century", 1201, 1300],
  ["2065", "Fifteenth century", 1401, 1500],
  ["2067", "Fifteenth century", 1401, 1500],
  ["2070", "AD 1356", 1356, 1356],
  ["2074", "Tenth century", 901, 1000],
  ["2080", "Fourteenth century", 1301, 1400],
  ["2081", "Eleventh century", 1001, 1100],
  ["2127", "Twelfth century", 1101, 1200],
  ["2138", "AD 1072", 1072, 1072],
  ["2200", "Fourteenth century", 1301, 1400],
  ["2298", "Twelfth century", 1101, 1200],
  ["2329", "Tenth century", 901, 1000],
  ["2344", "Eleventh century", 1001, 1100],
  ["2351", "Tenth century", 901, 1000],
  ["2412", "Twelfth century", 1101, 1200],
  ["2414", "Tenth century", 901, 1000],
  ["2464", "Ninth century", 801, 900],
  ["2492", "Fourteenth century", 1301, 1400],
  ["2495", "Fifteenth century", 1401, 1500],
  ["2542", "Thirteenth century", 1201, 1300],
  [
    "2737",
    "AD 1558–1559",
    1558,
    1559,
    undefined,
    "The INTF metadata gives the origin year as 1558/59.",
  ],
  ["2786", "Fourteenth century", 1301, 1400],
  ["2814", "Twelfth century", 1101, 1200],
  [
    "2817",
    "Twelfth century",
    1101,
    1200,
    undefined,
    "Formerly numbered 7 in the Pauline corpus.",
  ],
  ["2818", "Twelfth century", 1101, 1200],
  ["2846", "Twelfth century", 1101, 1200],
  ["l1178", "Eleventh century", 1001, 1100, "Lectionary 1178"],
] as const;

const greekAggregateRows: readonly WitnessCatalogEntry[] = [
  {
    key: "Ws",
    displayName: "Washingtonianus supplement (Ws)",
    date: "Seventh century",
    dateStart: 601,
    dateEnd: 700,
    aggregate: false,
    kind: "greek-manuscript",
    dateSource: INTF_LISTE,
    dateSourceUrl: intfManuscriptUrl("032"),
    note:
      "Ws is the later replacement text in Codex Washingtonianus for John 1:1–5:11, copied to restore lost pages; it is not the fourth/fifth-century original text of the codex (W).",
  },
  {
    key: "f1",
    displayName: "Family 1 (f1)",
    date: "Tenth–fourteenth centuries (family members)",
    dateStart: 901,
    dateEnd: 1400,
    aggregate: true,
    kind: "greek-family",
    dateSource: INTF_LISTE,
    dateSourceUrl: INTF_LISTE_URL,
    note:
      "A family of about a dozen related manuscripts copied from a common ancestor (core members include minuscules 1, 118, 131, 209, and 1582). The date range covers the whole group.",
  },
  {
    key: "f13",
    displayName: "Family 13 (f13)",
    date: "Eleventh–fifteenth centuries (family members)",
    dateStart: 1001,
    dateEnd: 1500,
    aggregate: true,
    kind: "greek-family",
    dateSource: INTF_LISTE,
    dateSourceUrl: INTF_LISTE_URL,
    note:
      "A family of about thirteen related manuscripts (including minuscules 13, 69, 124, 346, 543, 788, and 826). The date range covers the whole group.",
  },
  {
    key: "f052",
    displayName: "Revelation Family 052 (f052)",
    date: "Tenth–fifteenth centuries (family members)",
    dateStart: 901,
    dateEnd: 1500,
    aggregate: true,
    kind: "greek-family",
    dateSource: PALMER_REVELATION,
    dateSourceUrl: PALMER_REVELATION_URL,
    note:
      "A small family of four related manuscripts of Revelation — uncial 052 together with minuscules 1678, 1778, and 2080 — not GA 052 alone. The date range covers the whole group.",
  },
  {
    key: "Maj",
    displayName: "Greek majority tradition (Maj)",
    date: "Sixth–sixteenth centuries (aggregate tradition)",
    dateStart: 501,
    dateEnd: 1600,
    aggregate: true,
    kind: "greek-tradition",
    dateSource: INTF_LISTE,
    dateSourceUrl: INTF_LISTE_URL,
    note:
      "“Maj” means the majority of all surviving Greek New Testament manuscripts as one group — roughly 5,000 of the approximately 5,800 catalogued copies, most written from the sixth century onward — not one individual manuscript.",
  },
  {
    key: "Byz",
    displayName: "Byzantine tradition (Byz)",
    date: "Sixth–sixteenth centuries (aggregate tradition)",
    dateStart: 501,
    dateEnd: 1600,
    aggregate: true,
    kind: "greek-tradition",
    dateSource: INTF_LISTE,
    dateSourceUrl: INTF_LISTE_URL,
    note:
      "“Byz” means the Byzantine text found in the great majority of surviving Greek manuscripts — roughly 5,000 of the approximately 5,800 catalogued copies — considered as one group, not one individual manuscript.",
  },
  {
    key: "Maj/Byz",
    displayName: "Majority/Byzantine tradition (Maj/Byz)",
    date: "Sixth–sixteenth centuries (aggregate tradition)",
    dateStart: 501,
    dateEnd: 1600,
    aggregate: true,
    kind: "greek-tradition",
    dateSource: INTF_LISTE,
    dateSourceUrl: INTF_LISTE_URL,
    note:
      "The majority and Byzantine groups counted together — roughly 5,000 later Greek manuscripts — not one individual manuscript.",
  },
  {
    key: "Lect",
    displayName: "Greek lectionary tradition (Lect)",
    date: "Sixth–sixteenth centuries (aggregate tradition)",
    dateStart: 501,
    dateEnd: 1600,
    aggregate: true,
    kind: "greek-tradition",
    dateSource: INTF_LISTE,
    dateSourceUrl: INTF_LISTE_URL,
    note:
      "Not one manuscript but the whole body of Greek lectionaries — church service books that present Scripture readings for each day — of which about 2,300 are catalogued.",
  },
] as const;

export const greekWitnessCatalog: Readonly<Record<string, WitnessCatalogEntry>> =
  Object.freeze(
    Object.fromEntries(
      [...greekRows.map(greekManuscript), ...greekAggregateRows].map((entry) => [
        entry.key,
        Object.freeze(entry),
      ]),
    ),
  );

const commonAliases = {
  "ℵ": "01",
  א: "01",
  A: "02",
  B: "03",
  C: "04",
} as const;

export const greekSiglumAliases: Readonly<
  Record<GreekCorpus, Readonly<Record<string, string>>>
> = Object.freeze({
  gospels: Object.freeze({
    ...commonAliases,
    D: "05",
    K: "017",
    L: "019",
    N: "022",
    P: "024",
    T: "029",
    W: "032",
    X: "033",
    Z: "035",
    Δ: "037",
    Θ: "038",
    Ξ: "040",
    Σ: "042",
    Φ: "043",
    Ψ: "044",
  }),
  acts: Object.freeze({
    ...commonAliases,
    D: "05",
    E: "08",
    H: "014",
    K: "018",
    L: "020",
    P: "025",
    Ψ: "044",
  }),
  paul: Object.freeze({
    ...commonAliases,
    D: "06",
    F: "010",
    G: "012",
    H: "014",
    K: "018",
    L: "020",
    P: "025",
    Ψ: "044",
  }),
  catholic: Object.freeze({
    ...commonAliases,
    K: "018",
    L: "020",
    P: "025",
    Ψ: "044",
  }),
  revelation: Object.freeze({
    "ℵ": "01",
    א: "01",
    A: "02",
    C: "04",
    P: "025",
    K: "Byz",
  }),
});

function canonicalBaseSiglum(value: string) {
  if (/^p\d/iu.test(value)) return `P${value.slice(1)}`;
  if (/^f\d/iu.test(value)) return `f${value.slice(1)}`;
  if (/^l\d/iu.test(value)) return `l${value.slice(1)}`;
  if (/^ws$/iu.test(value)) return "Ws";
  if (/^maj\/byz$/iu.test(value) || /^byz\/maj$/iu.test(value)) {
    return "Maj/Byz";
  }
  if (/^k\/byz$/iu.test(value)) return "Byz";
  if (/^maj$/iu.test(value)) return "Maj";
  if (/^byz$/iu.test(value)) return "Byz";
  if (/^lect$/iu.test(value)) return "Lect";
  if (/^[a-z]$/iu.test(value)) return value.toUpperCase();
  return value;
}

export function normalizeGreekSiglum(siglum: string): NormalizedGreekSiglum {
  const rawSiglum = siglum.trim();
  let token = rawSiglum
    .replaceAll("`", "")
    .replace(/^𝔓/u, "P")
    .replace(/^א/u, "ℵ")
    .replaceAll("²", "2")
    .replaceAll("³", "3")
    .replace(/^[,;]+|[,;.]+$/gu, "")
    .trim();

  let qualifier: GreekWitnessQualifier | undefined;
  let qualifierText: string | undefined;

  if (/^P64\/P67vid$/iu.test(token)) {
    token = "P64/P67";
    qualifier = "probable-reading";
    qualifierText = "vid";
  } else {
    const partialFamily = token.match(/^(f\d+)-part$/iu);
    const familyException = token.match(/^(f\d+)-except-(.+)$/iu);
    if (partialFamily) {
      token = partialFamily[1];
      qualifier = "partial-family";
      qualifierText = "part";
    } else if (familyException) {
      token = familyException[1];
      qualifier = "family-exception";
      qualifierText = `except ${familyException[2]}`;
    } else {
      const suffixes: Array<{
        pattern: RegExp;
        qualifier: GreekWitnessQualifier;
      }> = [
        { pattern: /^(.*)\*vid$/iu, qualifier: "first-hand-probable" },
        { pattern: /^(.*)c\/mg$/iu, qualifier: "corrector-or-margin" },
        { pattern: /^(.*)cvid$/iu, qualifier: "corrector-probable" },
        { pattern: /^(.*)vid$/iu, qualifier: "probable-reading" },
        { pattern: /^(.*)txt$/iu, qualifier: "main-text" },
        { pattern: /^(.*)mg$/iu, qualifier: "margin" },
        { pattern: /^(.*)\*$/u, qualifier: "first-hand" },
        { pattern: /^(.*)c$/iu, qualifier: "corrector" },
        { pattern: /^(\d+)S$/u, qualifier: "supplement" },
      ];

      for (const suffix of suffixes) {
        const match = token.match(suffix.pattern);
        if (!match?.[1]) continue;
        qualifier = suffix.qualifier;
        qualifierText = token.slice(match[1].length);
        token = match[1];
        break;
      }

      if (!qualifier) {
        const numberedCorrector = token.match(/^([A-ZℵΔΘΞΣΦΨ])([123])$/u);
        if (numberedCorrector) {
          token = numberedCorrector[1];
          qualifier = "numbered-corrector";
          qualifierText = numberedCorrector[2];
        }
      }
    }
  }

  const baseSiglum = canonicalBaseSiglum(token);
  return {
    rawSiglum,
    normalizedSiglum: qualifierText
      ? `${baseSiglum}${qualifierText}`
      : baseSiglum,
    baseSiglum,
    qualifier,
    qualifierText,
  };
}

function qualifierNote(
  qualifier: GreekWitnessQualifier | undefined,
  qualifierText: string | undefined,
) {
  switch (qualifier) {
    case "first-hand":
      return "The asterisk marks what the original scribe first wrote, before any later correction. The manuscript's own date applies.";
    case "corrector":
      return "This reading was added by a later corrector after the original scribe finished. The date shown is the manuscript's own date; exactly when the correction was made is not known.";
    case "corrector-probable":
      return "This reading most likely comes from a later corrector rather than the original scribe. The date shown is the manuscript's own date; the correction itself is not separately dated.";
    case "corrector-or-margin":
      return "This reading comes from a correction or margin note added to the manuscript by a later scribe. The date shown is the original manuscript's date; exactly when the note was added is not known.";
    case "margin":
      return "This reading stands in the manuscript's margin, written beside the main text. The date shown is the manuscript's own date; the margin note is not separately dated.";
    case "main-text":
      return "This reading is the manuscript's main running text, not a margin note or correction; the manuscript's own date applies.";
    case "probable-reading":
      return "The abbreviation “vid” means the manuscript is damaged or hard to read here but most likely contains this reading. The manuscript's own date still applies.";
    case "first-hand-probable":
      return "The original scribe most likely wrote this reading, though the manuscript is hard to read here. The manuscript's own date applies.";
    case "supplement":
      return "The letter S marks replacement pages added later where the original pages were lost. The replacement is later than the original manuscript but is not separately dated here.";
    case "numbered-corrector":
      return `This reading comes from corrector ${qualifierText ?? ""} — one of the later scribes who corrected this manuscript. The date shown is the manuscript's own date; the correction is not separately dated.`;
    case "partial-family":
      return "Only part of this family of manuscripts supports the reading; the date range still covers the whole group.";
    case "family-exception":
      return `This family of manuscripts supports the reading (${qualifierText ?? "with an exception"} — the named member differs); the date range still covers the whole group.`;
    default:
      return undefined;
  }
}

function qualifierNeedsDateCaveat(
  qualifier: GreekWitnessQualifier | undefined,
) {
  return (
    qualifier === "corrector" ||
    qualifier === "corrector-probable" ||
    qualifier === "corrector-or-margin" ||
    qualifier === "margin" ||
    qualifier === "supplement" ||
    qualifier === "numbered-corrector"
  );
}

export function resolveGreekWitness(
  siglum: string,
  corpus: GreekCorpus,
): ResolvedGreekWitness | undefined {
  const normalized = normalizeGreekSiglum(siglum);
  const alias = greekSiglumAliases[corpus][normalized.baseSiglum];
  const catalogKey = alias ?? normalized.baseSiglum;
  const entry = greekWitnessCatalog[catalogKey];
  if (!entry) return undefined;

  const handNote = qualifierNote(
    normalized.qualifier,
    normalized.qualifierText,
  );
  const date = qualifierNeedsDateCaveat(normalized.qualifier)
    ? `${entry.date} (base manuscript; later hand not separately dated)`
    : entry.date;

  return {
    ...entry,
    date,
    note: [entry.note, handNote].filter(Boolean).join(" "),
    rawSiglum: normalized.rawSiglum,
    baseSiglum: catalogKey,
    qualifier: normalized.qualifier,
    qualifierText: normalized.qualifierText,
    qualifierNote: handNote,
  };
}

type VersionRow = readonly [
  key: string,
  displayName: string,
  date: string,
  dateStart: number,
  dateEnd: number,
  kind: WitnessCatalogKind,
  aggregate: boolean,
  source: string,
  sourceUrl: string,
  note?: string,
];

function versionRecord(row: VersionRow): WitnessCatalogEntry {
  const [
    key,
    displayName,
    date,
    dateStart,
    dateEnd,
    kind,
    aggregate,
    dateSource,
    dateSourceUrl,
    note,
  ] = row;
  return {
    key,
    displayName,
    date,
    dateStart,
    dateEnd,
    kind,
    aggregate,
    dateSource,
    dateSourceUrl,
    note,
  };
}

const versionRows: readonly VersionRow[] = [
  [
    "old-latin-tradition",
    "Old Latin tradition",
    "Late second–thirteenth centuries (aggregate tradition)",
    175,
    1300,
    "version-tradition",
    true,
    PALMER_REVELATION,
    PALMER_REVELATION_URL,
    "A whole translation tradition, not one manuscript — about 90 Old Latin manuscripts survive (roughly 30 of them with the Gospels). The date range covers the tradition.",
  ],
  [
    "latin-tradition",
    "Latin tradition",
    "Late second–sixteenth centuries (aggregate tradition)",
    175,
    1600,
    "version-tradition",
    true,
    PALMER_REVELATION,
    PALMER_REVELATION_URL,
    "The Old Latin and Vulgate translations counted together — roughly 90 Old Latin manuscripts plus more than 10,000 surviving Vulgate manuscripts — not one dated copy.",
  ],
  [
    "early-latin",
    "Early Latin evidence",
    "Late second–sixth centuries (aggregate evidence)",
    175,
    600,
    "version-tradition",
    true,
    WILLKER_MATTHEW,
    WILLKER_MATTHEW_URL,
    "The earliest layer of Latin translation evidence, drawn from several of the roughly 90 surviving Old Latin manuscripts and citations, not one dated copy.",
  ],
  [
    "old-latin-vulgate",
    "Old Latin/Vulgate evidence",
    "Late second–sixteenth centuries (aggregate traditions)",
    175,
    1600,
    "version-tradition",
    true,
    PALMER_REVELATION,
    PALMER_REVELATION_URL,
    "The Old Latin and Vulgate translations counted together — roughly 90 Old Latin manuscripts plus more than 10,000 surviving Vulgate manuscripts — not one dated copy.",
  ],
  [
    "vulgate-tradition",
    "Vulgate tradition",
    "Late fourth–sixteenth centuries (aggregate tradition)",
    382,
    1600,
    "version-tradition",
    true,
    PALMER_REVELATION,
    PALMER_REVELATION_URL,
    "Jerome's Latin Vulgate translation and its copies as a whole tradition — more than 10,000 manuscripts survive — not one dated copy.",
  ],
  [
    "vulgate-manuscripts",
    "Vulgate manuscripts",
    "Sixth–sixteenth centuries (aggregate manuscripts)",
    501,
    1600,
    "version-tradition",
    true,
    PALMER_REVELATION,
    PALMER_REVELATION_URL,
    "A group of Vulgate manuscripts from this span, drawn from the more than 10,000 that survive overall, not one dated copy.",
  ],
  [
    "vulgate-main-line",
    "Main Vulgate line",
    "Sixth–sixteenth centuries (aggregate tradition)",
    501,
    1600,
    "version-tradition",
    true,
    PALMER_REVELATION,
    PALMER_REVELATION_URL,
    "The main line of Vulgate copies used for later printed Bibles, one strand within the more than 10,000 surviving Vulgate manuscripts, not one dated copy.",
  ],

  ["old-latin-a", "Old Latin a", "Fourth century", 301, 400, "latin-manuscript", false, WILLKER_MATTHEW, WILLKER_MATTHEW_URL],
  ["old-latin-aur", "Old Latin aur", "Eighth century (c. AD 750–799)", 750, 799, "latin-manuscript", false, PALMER_REVELATION, PALMER_REVELATION_URL],
  ["old-latin-b", "Old Latin b", "Late fourth–early fifth century", 375, 425, "latin-manuscript", false, WILLKER_MATTHEW, WILLKER_MATTHEW_URL],
  ["old-latin-c", "Old Latin c", "Twelfth–thirteenth century", 1101, 1300, "latin-manuscript", false, WILLKER_MATTHEW, WILLKER_MATTHEW_URL],
  ["old-latin-d", "Old Latin d", "Fifth century", 401, 500, "latin-manuscript", false, WILLKER_MATTHEW, WILLKER_MATTHEW_URL],
  ["old-latin-e", "Old Latin e", "Fifth century", 401, 500, "latin-manuscript", false, WILLKER_MATTHEW, WILLKER_MATTHEW_URL],
  ["old-latin-f", "Old Latin f", "Sixth century", 501, 600, "latin-manuscript", false, WILLKER_MATTHEW, WILLKER_MATTHEW_URL],
  ["old-latin-ff1", "Old Latin ff1", "Eighth century", 701, 800, "latin-manuscript", false, WILLKER_MATTHEW, WILLKER_MATTHEW_URL],
  ["old-latin-ff2", "Old Latin ff2", "Fifth century", 401, 500, "latin-manuscript", false, WILLKER_MATTHEW, WILLKER_MATTHEW_URL],
  ["old-latin-g1", "Old Latin g1", "Eighth–ninth century", 701, 900, "latin-manuscript", false, WILLKER_MATTHEW, WILLKER_MATTHEW_URL],
  ["old-latin-h", "Old Latin h", "Fifth century", 401, 500, "latin-manuscript", false, PALMER_REVELATION, PALMER_REVELATION_URL],
  ["old-latin-k", "Old Latin k", "About AD 400", 375, 425, "latin-manuscript", false, WILLKER_MATTHEW, WILLKER_MATTHEW_URL],
  ["old-latin-l", "Old Latin l", "Seventh–eighth century", 601, 800, "latin-manuscript", false, WILLKER_MATTHEW, WILLKER_MATTHEW_URL],
  ["old-latin-q", "Old Latin q", "Sixth–seventh century", 501, 700, "latin-manuscript", false, WILLKER_MATTHEW, WILLKER_MATTHEW_URL],
  ["old-latin-ar", "Old Latin ar (Book of Armagh)", "AD 807", 807, 807, "latin-manuscript", false, PALMER_REVELATION, PALMER_REVELATION_URL],
  ["old-latin-gig", "Old Latin gig (Codex Gigas)", "Thirteenth century", 1201, 1300, "latin-manuscript", false, PALMER_REVELATION, PALMER_REVELATION_URL],
  ["old-latin-t", "Old Latin t", "Seventh–eleventh century", 601, 1100, "latin-manuscript", false, PALMER_REVELATION, PALMER_REVELATION_URL],

  ["vulgate-am", "Vulgate am (Codex Amiatinus)", "About AD 700 (early eighth century)", 700, 716, "latin-manuscript", false, PALMER_REVELATION, PALMER_REVELATION_URL],
  ["vulgate-fu", "Vulgate fu (Codex Fuldensis)", "AD 541–546", 541, 546, "latin-manuscript", false, PALMER_REVELATION, PALMER_REVELATION_URL],
  ["vulgate-harl", "Vulgate harl (Revelation)", "Ninth century", 801, 900, "latin-manuscript", false, PALMER_REVELATION, PALMER_REVELATION_URL, "Palmer explicitly distinguishes this Revelation witness from the sixth-century Harleian Gospel manuscript."],
  ["vulgate-dem", "Vulgate dem", "Thirteenth century", 1201, 1300, "latin-manuscript", false, PALMER_REVELATION, PALMER_REVELATION_URL],
  ["vulgate-lips4", "Vulgate Leipzig manuscript 4 (lips4)", "Seventh–fifteenth centuries (broad range; exact century uncertain)", 601, 1500, "latin-manuscript", false, PALMER_REVELATION, PALMER_REVELATION_URL, "Palmer identifies the Leipzig manuscript number but does not supply a narrower date."],
  ["vulgate-lips5", "Vulgate Leipzig manuscript 5 (lips5)", "Seventh–fifteenth centuries (broad range; exact century uncertain)", 601, 1500, "latin-manuscript", false, PALMER_REVELATION, PALMER_REVELATION_URL, "Palmer identifies the Leipzig manuscript number but does not supply a narrower date."],
  ["vulgate-lips6", "Vulgate Leipzig manuscript 6 (lips6)", "Seventh–fifteenth centuries (broad range; exact century uncertain)", 601, 1500, "latin-manuscript", false, PALMER_REVELATION, PALMER_REVELATION_URL, "Palmer identifies the Leipzig manuscript number but does not supply a narrower date."],
  ["vulgate-cle", "Clementine Vulgate", "AD 1592", 1592, 1592, "printed-edition", false, PALMER_REVELATION, PALMER_REVELATION_URL],
  ["vulgate-st", "Stuttgart Vulgate critical text", "AD 1969–2007 editions", 1969, 2007, "printed-edition", true, PALMER_REVELATION, PALMER_REVELATION_URL, "The modern scholarly printed edition of the Vulgate, published in revised editions across this span — not an ancient manuscript."],
  ["vulgate-ww", "Wordsworth–White Vulgate edition", "AD 1889–1954", 1889, 1954, "printed-edition", true, PALMER_REVELATION, PALMER_REVELATION_URL, "A scholarly printed edition of the Vulgate New Testament published in installments across this span — not an ancient manuscript."],

  ["syriac-tradition", "Syriac traditions", "Fourth–seventh centuries (aggregate traditions)", 301, 700, "version-tradition", true, WILLKER_MATTHEW, WILLKER_MATTHEW_URL, "The Syriac translations counted together as a group — including the Old Syriac, Peshitta, and Harklean versions — not one dated copy."],
  ["syriac-peshitta", "Syriac Peshitta", "Early fifth century", 401, 450, "version-tradition", true, WILLKER_MATTHEW, WILLKER_MATTHEW_URL, "The standard Syriac translation, produced around this time and preserved today in more than 350 surviving manuscripts."],
  ["syriac-harklean", "Syriac Harklean", "AD 615–616", 615, 616, "version-tradition", true, PALMER_REVELATION, PALMER_REVELATION_URL, "A precise, literal Syriac revision made in AD 615–616, preserved today in roughly 120 surviving manuscripts."],
  ["syriac-philoxenian", "Syriac Philoxenian", "AD 507–508", 507, 508, "version-tradition", true, PALMER_REVELATION, PALMER_REVELATION_URL, "An earlier Syriac revision made in AD 507–508; it survives mainly through its later Harklean revision rather than in manuscripts of its own."],
  ["syriac-sinaitic", "Syriac Sinaitic", "Late fourth–early fifth century", 375, 425, "version-manuscript", false, WILLKER_MATTHEW, WILLKER_MATTHEW_URL],
  ["syriac-curetonian", "Syriac Curetonian", "Fifth century", 401, 500, "version-manuscript", false, WILLKER_MATTHEW, WILLKER_MATTHEW_URL],
  ["palestinian-syriac", "Palestinian Syriac", "Sixth–eighth centuries", 501, 800, "version-tradition", true, WILLKER_MATTHEW, WILLKER_MATTHEW_URL, "A distinct Syriac dialect translation, known today mainly from a small number of surviving lectionary manuscripts."],
  ["syriac-diatessaron", "Syriac Diatessaron tradition", "Late second century (composition c. AD 170)", 165, 180, "version-tradition", true, WILLKER_MATTHEW, WILLKER_MATTHEW_URL, "Tatian's single-narrative harmony of the four Gospels, composed around AD 170. No copy of the original Syriac text survives; it is known through later translations and citations, and this dates the tradition, not Ephrem's later surviving commentary manuscript."],

  ["coptic-tradition", "Coptic traditions", "Third–fifteenth centuries (aggregate traditions)", 201, 1500, "version-tradition", true, PALMER_REVELATION, PALMER_REVELATION_URL, "The Egyptian Coptic translations counted together — chiefly the Sahidic and Bohairic dialects, together several hundred manuscripts and fragments — not one dated copy."],
  ["sahidic", "Sahidic Coptic", "Third–eleventh centuries (tradition and cited manuscripts)", 201, 1100, "version-tradition", true, PALMER_REVELATION, PALMER_REVELATION_URL, "The earlier of the two major Coptic dialect translations, surviving in several hundred manuscripts and fragments."],
  ["bohairic", "Bohairic Coptic", "Fourth–fifteenth centuries (aggregate tradition)", 301, 1500, "version-tradition", true, PALMER_REVELATION, PALMER_REVELATION_URL, "The later of the two major Coptic dialect translations, which became the standard liturgical text of the Egyptian church and survives in well over a hundred manuscripts."],
  ["bohairic-revelation", "Bohairic Revelation witness", "Fifteenth century", 1401, 1500, "version-manuscript", false, PALMER_REVELATION, PALMER_REVELATION_URL, "Palmer's Revelation table dates the cited Bohairic manuscript (MS 91) to the fifteenth century."],
  ["bohairic-g", "Bohairic-G", "Ninth–fourteenth centuries (broad apparatus range)", 801, 1400, "version-manuscript", false, PALMER_REVELATION, PALMER_REVELATION_URL],
  ["faiyumic", "Faiyumic Coptic", "Seventh–eighth century", 601, 800, "version-tradition", true, PALMER_REVELATION, PALMER_REVELATION_URL, "A minor Coptic dialect translation, known from a small number of surviving manuscripts and fragments."],

  ["armenian", "Armenian version", "Fifth–sixteenth centuries (aggregate tradition)", 401, 1600, "version-tradition", true, PALMER_REVELATION, PALMER_REVELATION_URL, "The Armenian Bible translation and its copies as a whole tradition — well over 1,200 Gospel manuscripts alone are catalogued — not one dated copy."],
  ["armenian-c", "Armenian-c (Revelation)", "Tenth century", 901, 1000, "version-manuscript", false, PALMER_REVELATION, PALMER_REVELATION_URL],
  ["armenian-m", "Armenian-m (Revelation)", "Tenth century", 901, 1000, "version-manuscript", false, PALMER_REVELATION, PALMER_REVELATION_URL],
  ["georgian", "Georgian version", "Fifth–sixteenth centuries (aggregate tradition)", 401, 1600, "version-tradition", true, PALMER_REVELATION, PALMER_REVELATION_URL, "The Georgian Bible translation and its copies as a whole tradition — several hundred manuscripts survive — not one dated copy."],
  ["georgian-ii", "Georgian-II recension", "Ninth–tenth centuries", 801, 1000, "version-tradition", true, WILLKER_MATTHEW, WILLKER_MATTHEW_URL, "A later revised form of the Georgian translation, represented by a handful of manuscripts from this period."],
  ["gothic", "Gothic version", "Mid-fourth century (c. AD 350)", 340, 380, "version-tradition", true, WILLKER_MATTHEW, WILLKER_MATTHEW_URL, "Bishop Ulfilas's Gothic translation, made around AD 350. Fewer than ten manuscript witnesses survive today, chiefly the Codex Argenteus and a few fragments."],
  ["ethiopic", "Ethiopic version", "About AD 500 (translation tradition; surviving witnesses are later)", 475, 525, "version-tradition", true, PALMER_REVELATION, PALMER_REVELATION_URL, "The Ethiopic Bible translation, first made around AD 500 and preserved today in several hundred later biblical manuscripts. Palmer notes that the continuous-text Revelation manuscripts preserving the earliest Ethiopic form are fourteenth–sixteenth century."],
  ["walton-ethiopic", "Walton's Ethiopic text", "AD 1657", 1657, 1657, "printed-edition", false, PALMER_REVELATION, PALMER_REVELATION_URL, "This is the Ethiopic text printed in Walton's Polyglot, not an ancient Ethiopic manuscript."],
  ["slavonic", "Slavonic version", "Ninth–sixteenth centuries (aggregate tradition)", 801, 1600, "version-tradition", true, PALMER_REVELATION, PALMER_REVELATION_URL, "The Old Church Slavonic Bible translation and its copies as a whole tradition — several thousand manuscripts survive — not one dated copy."],
  ["slavonic-b", "Slavonic-b", "Ninth–sixteenth centuries (versional strand)", 801, 1600, "version-tradition", true, PALMER_REVELATION, PALMER_REVELATION_URL, "A distinct manuscript strand within the wider Slavonic translation tradition (see Slavonic version), not one dated copy."],
  ["arabic", "Arabic versions", "Seventh–sixteenth centuries (aggregate traditions)", 601, 1600, "version-tradition", true, PALMER_REVELATION, PALMER_REVELATION_URL, "The several distinct Arabic Bible translations counted together — several hundred manuscripts survive across them — not one dated copy."],
  ["arabic-w", "Arabic-w", "Ninth century (apparatus estimate)", 801, 900, "version-manuscript", false, PALMER_REVELATION, PALMER_REVELATION_URL],
  ["arabic-s", "Arabic-s", "Thirteenth century", 1201, 1300, "version-manuscript", false, PALMER_REVELATION, PALMER_REVELATION_URL],
  ["arabic-e", "Arabic-e", "Sixteenth century (apparatus estimate)", 1501, 1600, "version-manuscript", false, PALMER_REVELATION, PALMER_REVELATION_URL],
  ["maeotic-1", "Middle Egyptian mae-1 (Codex Scheide)", "Fifth century", 401, 500, "version-manuscript", false, WILLKER_MATTHEW, WILLKER_MATTHEW_URL],
  ["maeotic-2", "Middle Egyptian mae-2 (Codex Schøyen)", "Early fourth century", 301, 350, "version-manuscript", false, WILLKER_MATTHEW, WILLKER_MATTHEW_URL],

  ["ephrem", "Ephrem the Syrian", "AD 306–373", 306, 373, "patristic", false, WILLKER_MATTHEW, WILLKER_MATTHEW_URL],
  ["primasius", "Primasius", "Sixth century (fl. c. AD 550)", 501, 600, "patristic", false, PALMER_REVELATION, PALMER_REVELATION_URL],
  ["ambrose", "Ambrose of Milan", "Fourth century (AD 339–397)", 339, 397, "patristic", false, PALMER_REVELATION, PALMER_REVELATION_URL],
  ["haymo", "Haymo of Halberstadt", "Ninth century", 801, 900, "patristic", false, PALMER_REVELATION, PALMER_REVELATION_URL],
  ["acts-saturninus", "Acts of Saturninus", "Early fourth century", 301, 350, "patristic", false, PALMER_REVELATION, PALMER_REVELATION_URL],
  ["apringius", "Apringius of Beja", "Sixth century", 501, 600, "patristic", false, PALMER_REVELATION, PALMER_REVELATION_URL],
  ["tyconius", "Tyconius", "Late fourth century", 351, 400, "patristic", false, PALMER_REVELATION, PALMER_REVELATION_URL],
  ["beatus", "Beatus of Liébana", "Eighth century", 701, 800, "patristic", false, PALMER_REVELATION, PALMER_REVELATION_URL],
] as const;

export const versionWitnessCatalog: Readonly<
  Record<string, WitnessCatalogEntry>
> = Object.freeze(
  Object.fromEntries(
    versionRows.map(versionRecord).map((entry) => [
      entry.key,
      Object.freeze(entry),
    ]),
  ),
);

function normalizeVersionName(value: string) {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[’‘]/gu, "'")
    .replaceAll("`", "")
    .replace(/^the\s+/u, "")
    .replace(/[.;:]+$/gu, "")
    .replace(/\s+/gu, " ")
    .trim();
}

export const versionWitnessAliases: Readonly<Record<string, string>> =
  Object.freeze({
    "old latin": "old-latin-tradition",
    "old latin tradition": "old-latin-tradition",
    "old latin witnesses": "old-latin-tradition",
    "much of old latin tradition": "old-latin-tradition",
    "part of old latin tradition": "old-latin-tradition",
    "latin": "latin-tradition",
    "latin tradition": "latin-tradition",
    "latin witnesses": "latin-tradition",
    "some latin witnesses": "latin-tradition",
    "much of latin tradition": "latin-tradition",
    "broad latin": "latin-tradition",
    "broad old latin": "old-latin-tradition",
    "early latin": "early-latin",
    "most early latin": "early-latin",
    "old latin/vulgate": "old-latin-vulgate",
    "broad old latin/vulgate": "old-latin-vulgate",
    vulgate: "vulgate-tradition",
    "vulgate tradition": "vulgate-tradition",
    "vulgate manuscript": "vulgate-manuscripts",
    "vulgate manuscripts": "vulgate-manuscripts",
    "some vulgate manuscripts": "vulgate-manuscripts",
    "main vulgate line": "vulgate-main-line",

    "old latin a": "old-latin-a",
    "old latin aur": "old-latin-aur",
    "old latin b": "old-latin-b",
    "old latin c": "old-latin-c",
    "old latin d": "old-latin-d",
    "old latin e": "old-latin-e",
    "old latin f": "old-latin-f",
    "old latin ff1": "old-latin-ff1",
    "old latin ff2": "old-latin-ff2",
    "old latin g1": "old-latin-g1",
    "old latin h": "old-latin-h",
    "old latin k": "old-latin-k",
    "old latin l": "old-latin-l",
    "old latin q": "old-latin-q",
    "old latin ar": "old-latin-ar",
    "old latin gig": "old-latin-gig",
    "old latin t": "old-latin-t",
    a: "old-latin-a",
    aur: "old-latin-aur",
    b: "old-latin-b",
    c: "old-latin-c",
    d: "old-latin-d",
    e: "old-latin-e",
    f: "old-latin-f",
    ff1: "old-latin-ff1",
    ff2: "old-latin-ff2",
    g1: "old-latin-g1",
    h: "old-latin-h",
    k: "old-latin-k",
    l: "old-latin-l",
    q: "old-latin-q",
    ar: "old-latin-ar",
    gig: "old-latin-gig",
    t: "old-latin-t",
    ita: "old-latin-a",
    itaur: "old-latin-aur",
    itb: "old-latin-b",
    itc: "old-latin-c",
    itd: "old-latin-d",
    ite: "old-latin-e",
    itf: "old-latin-f",
    itff1: "old-latin-ff1",
    itff2: "old-latin-ff2",
    itg1: "old-latin-g1",
    ith: "old-latin-h",
    itk: "old-latin-k",
    itl: "old-latin-l",
    itq: "old-latin-q",
    itar: "old-latin-ar",
    itgig: "old-latin-gig",
    itt: "old-latin-t",

    "vulgate am": "vulgate-am",
    "vulgate fu": "vulgate-fu",
    "vulgate harl": "vulgate-harl",
    "vulgate dem": "vulgate-dem",
    "vulgate lips4": "vulgate-lips4",
    "vulgate lips5": "vulgate-lips5",
    "vulgate lips6": "vulgate-lips6",
    am: "vulgate-am",
    fu: "vulgate-fu",
    harl: "vulgate-harl",
    dem: "vulgate-dem",
    lips4: "vulgate-lips4",
    lips5: "vulgate-lips5",
    lips6: "vulgate-lips6",
    "clementine vulgate": "vulgate-cle",
    "vulgate cle": "vulgate-cle",
    cle: "vulgate-cle",
    "stuttgart vulgate": "vulgate-st",
    "stuttgart vulgate text": "vulgate-st",
    "vulgate st": "vulgate-st",
    st: "vulgate-st",
    "wordsworth-white vulgate": "vulgate-ww",
    "vulgate ww": "vulgate-ww",
    ww: "vulgate-ww",

    syriac: "syriac-tradition",
    "syriac tradition": "syriac-tradition",
    "syriac traditions": "syriac-tradition",
    "broad syriac": "syriac-tradition",
    "syriac peshitta": "syriac-peshitta",
    peshitta: "syriac-peshitta",
    "syriac harklean": "syriac-harklean",
    "syriac harclean": "syriac-harklean",
    harklean: "syriac-harklean",
    harclean: "syriac-harklean",
    "syriac philoxenian": "syriac-philoxenian",
    philoxenian: "syriac-philoxenian",
    "syriac sinaitic": "syriac-sinaitic",
    "syriac curetonian": "syriac-curetonian",
    curetonian: "syriac-curetonian",
    "palestinian syriac": "palestinian-syriac",
    "syriac palestinian": "palestinian-syriac",
    "syriac diatessaron": "syriac-diatessaron",
    "syriac diatessaron tradition": "syriac-diatessaron",

    coptic: "coptic-tradition",
    "coptic witnesses": "coptic-tradition",
    "coptic strands": "coptic-tradition",
    sahidic: "sahidic",
    "sahidic coptic": "sahidic",
    bohairic: "bohairic",
    "bohairic coptic": "bohairic",
    "bohairic strand": "bohairic",
    "a bohairic strand": "bohairic",
    "another bohairic strand": "bohairic",
    "bohairic-g": "bohairic-g",
    faiyumic: "faiyumic",

    armenian: "armenian",
    "armenian version": "armenian",
    "armenian manuscripts": "armenian",
    "some armenian manuscripts": "armenian",
    "armenian-c": "armenian-c",
    "armenian-m": "armenian-m",
    georgian: "georgian",
    "georgian version": "georgian",
    "georgian-ii": "georgian-ii",
    gothic: "gothic",
    ethiopic: "ethiopic",
    "ethiopic evidence": "ethiopic",
    "walton's ethiopic": "walton-ethiopic",
    slavonic: "slavonic",
    "slavonic-b": "slavonic-b",
    arabic: "arabic",
    "arabic-w": "arabic-w",
    "arabic-s": "arabic-s",
    "arabic-e": "arabic-e",
    "maeotic-1": "maeotic-1",
    "maeotic-2": "maeotic-2",

    ephrem: "ephrem",
    primasius: "primasius",
    ambrose: "ambrose",
    haymo: "haymo",
    "acts of saturninus": "acts-saturninus",
    apringius: "apringius",
    tyconius: "tyconius",
    beatus: "beatus",
    "beatus's latin wording": "beatus",
  });

export function resolveVersionWitness(
  witness: string,
  corpus?: GreekCorpus,
): WitnessCatalogEntry | undefined {
  const normalized = normalizeVersionName(witness);
  const key = versionWitnessAliases[normalized] ?? normalized;
  if (
    corpus === "revelation" &&
    (key === "bohairic" || key === "bohairic-revelation")
  ) {
    return versionWitnessCatalog["bohairic-revelation"];
  }
  return versionWitnessCatalog[key];
}
