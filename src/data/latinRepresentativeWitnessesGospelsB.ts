import type { Witness } from "./types";

export type LatinRepresentativeGospelsBSlug =
  | "luke-2-33"
  | "luke-4-4"
  | "luke-9-55-56"
  | "luke-11-2-4"
  | "luke-22-43-44"
  | "luke-24-40"
  | "luke-24-51"
  | "luke-24-52"
  | "john-1-18"
  | "john-3-13"
  | "john-5-3b-4"
  | "john-6-47";

export type LatinRepresentativeGospelsBRow = Readonly<
  Pick<Witness, "witness" | "date" | "dateStart" | "dateEnd" | "note">
>;

export type LatinRepresentativeGospelsBWitnessSet = Readonly<{
  rows: readonly LatinRepresentativeGospelsBRow[];
  /**
   * Keys are exact labels of existing aggregate support rows. Values replace
   * only their notes. Percentages are limited to an explicitly bounded set of
   * witnesses collated at the passage, never the global Latin manuscript pool.
  */
  aggregateUpdates?: Readonly<Record<string, string>>;
  aggregateLabelUpdates?: Readonly<Record<string, string>>;
}>;

export const latinRepresentativeWitnessesGospelsB = {
  "luke-2-33": {
    rows: [
      {
        witness: "Codex Vercellensis (it a / VL 3)",
        date: "Second half of the fourth century",
        dateStart: 350,
        dateEnd: 399,
        note: "Reads ‘Joseph and his mother’ rather than ‘his father and mother.’",
      },
      {
        witness: "Codex Palatinus (it e / VL 2)",
        date: "Fifth century",
        dateStart: 400,
        dateEnd: 499,
        note: "Reads ‘Joseph and his mother’ rather than ‘his father and mother.’",
      },
      {
        witness: "Codex Veronensis (it b / VL 4)",
        date: "Late fifth century",
        dateStart: 475,
        dateEnd: 499,
        note: "Reads ‘Joseph and his mother’ rather than ‘his father and mother.’",
      },
      {
        witness: "Codex Corbeiensis secundus (it ff² / VL 8)",
        date: "Fifth century",
        dateStart: 400,
        dateEnd: 499,
        note: "Reads ‘Joseph and his mother’ rather than ‘his father and mother.’",
      },
      {
        witness: "Codex Brixianus (it f / VL 10)",
        date: "Sixth century",
        dateStart: 500,
        dateEnd: 599,
        note: "Reads ‘Joseph and his mother’ rather than ‘his father and mother.’",
      },
    ],
    aggregateUpdates: {
      "Old Latin witnesses reading “Joseph and his mother”":
        "In the bounded Itala apparatus set, 11 of 12 named Latin witnesses with a collatable reading (about 92%) read ‘Joseph and his mother’; the Latin column of Codex Bezae reads ‘his father and mother.’ This is not a percentage of every surviving Latin manuscript.",
    },
  },

  "luke-4-4": {
    rows: [
      {
        witness: "Codex Vercellensis (it a / VL 3)",
        date: "Second half of the fourth century",
        dateStart: 350,
        dateEnd: 399,
        note: "Includes ‘but by every word of God’ in Luke 4:4.",
      },
      {
        witness: "Codex Bezae, Latin column (it d / VL 5)",
        date: "c. AD 400",
        dateStart: 390,
        dateEnd: 420,
        note: "Includes ‘but by every word of God’ in Luke 4:4.",
      },
      {
        witness: "Codex Palatinus (it e / VL 2)",
        date: "Fifth century",
        dateStart: 400,
        dateEnd: 499,
        note: "Includes ‘but by every word of God’ in Luke 4:4.",
      },
      {
        witness: "Codex Veronensis (it b / VL 4)",
        date: "Late fifth century",
        dateStart: 475,
        dateEnd: 499,
        note: "Includes ‘but by every word of God’ in Luke 4:4.",
      },
      {
        witness: "Codex Corbeiensis secundus (it ff² / VL 8)",
        date: "Fifth century",
        dateStart: 400,
        dateEnd: 499,
        note: "Includes ‘but by every word of God’ in Luke 4:4.",
      },
    ],
    aggregateUpdates: {
      "Latin witnesses with the fuller quotation":
        "All 11 principal Old Latin witnesses collated at this verse (11/11, 100% of that bounded apparatus set) include the disputed phrase. This is not a claim about every surviving Latin manuscript, and the percentage gives no genealogical weight.",
    },
  },

  "luke-9-55-56": {
    rows: [
      {
        witness: "Codex Vercellensis (it a / VL 3)",
        date: "Second half of the fourth century",
        dateStart: 350,
        dateEnd: 399,
        note: "Contains both disputed longer clauses in Luke 9:55–56.",
      },
      {
        witness: "Codex Palatinus (it e / VL 2)",
        date: "Fifth century",
        dateStart: 400,
        dateEnd: 499,
        note: "Contains both disputed longer clauses in Luke 9:55–56.",
      },
      {
        witness: "Codex Veronensis (it b / VL 4)",
        date: "Late fifth century",
        dateStart: 475,
        dateEnd: 499,
        note: "Contains both disputed longer clauses in Luke 9:55–56.",
      },
      {
        witness: "Codex Brixianus (it f / VL 10)",
        date: "Sixth century",
        dateStart: 500,
        dateEnd: 599,
        note: "Contains both disputed longer clauses in Luke 9:55–56.",
      },
      {
        witness: "Codex Monacensis (it q / VL 13)",
        date: "Sixth or seventh century",
        dateStart: 500,
        dateEnd: 699,
        note: "Contains both disputed longer clauses in Luke 9:55–56.",
      },
    ],
    aggregateUpdates: {
      "Most Latin witnesses":
        "The compact apparatus names eight Old Latin witnesses (a, aur, b, c, e, f, q, r¹) for both longer clauses; Codex Bezae's Latin column (d) supports only the first added sentence. Because the apparatus does not enumerate a complete denominator, no corpus-wide percentage is claimed.",
    },
  },

  "luke-11-2-4": {
    rows: [
      {
        witness: "Codex Veronensis (it b / VL 4)",
        date: "Late fifth century",
        dateStart: 475,
        dateEnd: 499,
        note: "Attests ‘our’ in the opening invocation; this is clause-level support, not support for every longer phrase in the KJV prayer.",
      },
      {
        witness: "Codex Bezae, Latin column (it d / VL 5)",
        date: "c. AD 400",
        dateStart: 390,
        dateEnd: 420,
        note: "Attests ‘our’ in the opening invocation; this is clause-level support, not support for every longer phrase in the KJV prayer.",
      },
      {
        witness: "Codex Brixianus (it f / VL 10)",
        date: "Sixth century",
        dateStart: 500,
        dateEnd: 599,
        note: "Attests ‘our’ in the invocation and ‘deliver us from evil’ at the close; it does not establish every longer phrase as one textual unit.",
      },
      {
        witness: "Codex Monacensis (it q / VL 13)",
        date: "Sixth or seventh century",
        dateStart: 500,
        dateEnd: 699,
        note: "Attests ‘our’ in the invocation and ‘deliver us from evil’ at the close; it does not establish every longer phrase as one textual unit.",
      },
      {
        witness: "Codex Usserianus primus (it r¹ / VL 14)",
        date: "Late fifth to early seventh century",
        dateStart: 475,
        dateEnd: 625,
        note: "Attests ‘our’ in the opening invocation; this is clause-level support, not support for every longer phrase in the KJV prayer.",
      },
    ],
    aggregateUpdates: {
      "Most Old Latin witnesses":
        "Luke 11:2–4 contains several independent variants, so a single Latin percentage would be misleading. The apparatus names b, d, f, l, q, and r¹ for ‘our’; f and q also include ‘deliver us from evil.’ These clause-level witnesses do not all support every longer KJV phrase as one unit.",
    },
  },

  "luke-22-43-44": {
    rows: [
      {
        witness: "Codex Vercellensis (it a / VL 3)",
        date: "Second half of the fourth century",
        dateStart: 350,
        dateEnd: 399,
        note: "Includes the angel and agony account in Luke 22:43–44.",
      },
      {
        witness: "Codex Bezae, Latin column (it d / VL 5)",
        date: "c. AD 400",
        dateStart: 390,
        dateEnd: 420,
        note: "Includes the angel and agony account in Luke 22:43–44.",
      },
      {
        witness: "Codex Palatinus (it e / VL 2)",
        date: "Fifth century",
        dateStart: 400,
        dateEnd: 499,
        note: "Includes the angel and agony account in Luke 22:43–44.",
      },
      {
        witness: "Codex Veronensis (it b / VL 4)",
        date: "Late fifth century",
        dateStart: 475,
        dateEnd: 499,
        note: "Includes the angel and agony account in Luke 22:43–44.",
      },
      {
        witness: "Codex Corbeiensis secundus (it ff² / VL 8)",
        date: "Fifth century",
        dateStart: 400,
        dateEnd: 499,
        note: "Includes the angel and agony account in Luke 22:43–44.",
      },
    ],
    aggregateUpdates: {
      "Most Old Latin witnesses":
        "Early Latin evidence broadly includes the verses, and the compact apparatus identifies Codex Brixianus (it f) as an omission. It does not provide a complete, locus-specific Latin denominator, so no corpus-wide percentage is claimed.",
    },
  },

  "luke-24-40": {
    rows: [
      {
        witness: "Codex Brixianus (it f / VL 10)",
        date: "Sixth century",
        dateStart: 500,
        dateEnd: 599,
        note: "Contains Luke 24:40, where Jesus shows the disciples his hands and feet.",
      },
      {
        witness: "Codex Monacensis (it q / VL 13)",
        date: "Sixth or seventh century",
        dateStart: 500,
        dateEnd: 699,
        note: "Contains Luke 24:40, where Jesus shows the disciples his hands and feet.",
      },
      {
        witness: "Codex Aureus Holmiensis (it aur / VL 15)",
        date: "c. AD 775",
        dateStart: 750,
        dateEnd: 799,
        note: "Contains Luke 24:40, where Jesus shows the disciples his hands and feet.",
      },
      {
        witness: "Codex Colbertinus (it c / VL 6)",
        date: "Twelfth century",
        dateStart: 1100,
        dateEnd: 1199,
        note: "Contains Luke 24:40, where Jesus shows the disciples his hands and feet.",
      },
    ],
    aggregateUpdates: {
      "Old Latin witnesses containing the verse (aggregate)":
        "In the bounded apparatus set, 4 of 11 named Old Latin witnesses with a listed reading (about 36%) contain the verse: aur, c, f, and q. Seven named witnesses omit it. This is not a percentage of the entire Latin manuscript tradition.",
    },
  },

  "luke-24-51": {
    rows: [
      {
        witness: "Codex Brixianus (it f / VL 10)",
        date: "Sixth century",
        dateStart: 500,
        dateEnd: 599,
        note: "Contains ‘and was carried up into heaven.’",
      },
      {
        witness: "Codex Monacensis (it q / VL 13)",
        date: "Sixth or seventh century",
        dateStart: 500,
        dateEnd: 699,
        note: "Contains ‘and was carried up into heaven.’",
      },
      {
        witness: "Codex Usserianus primus (it r¹ / VL 14)",
        date: "Late fifth to early seventh century",
        dateStart: 475,
        dateEnd: 625,
        note: "Contains the ascension phrase, with Latin wording that varies from other witnesses.",
      },
      {
        witness: "Codex Aureus Holmiensis (it aur / VL 15)",
        date: "c. AD 775",
        dateStart: 750,
        dateEnd: 799,
        note: "Contains ‘and was carried up into heaven.’",
      },
      {
        witness: "Codex Colbertinus (it c / VL 6)",
        date: "Twelfth century",
        dateStart: 1100,
        dateEnd: 1199,
        note: "Contains ‘and was carried up into heaven.’",
      },
    ],
    aggregateUpdates: {
      "Old Latin witnesses containing the phrase (aggregate)":
        "In the bounded apparatus set, 5 of 11 named Old Latin witnesses with a listed reading (about 45%) contain the phrase: aur, c, f, q, and r¹. Six named witnesses omit it. This is not a percentage of the entire Latin manuscript tradition.",
    },
  },

  "luke-24-52": {
    rows: [
      {
        witness: "Codex Brixianus (it f / VL 10)",
        date: "Sixth century",
        dateStart: 500,
        dateEnd: 599,
        note: "Contains ‘and they worshipped him.’",
      },
      {
        witness: "Codex Monacensis (it q / VL 13)",
        date: "Sixth or seventh century",
        dateStart: 500,
        dateEnd: 699,
        note: "Contains ‘and they worshipped him.’",
      },
      {
        witness: "Codex Aureus Holmiensis (it aur / VL 15)",
        date: "c. AD 775",
        dateStart: 750,
        dateEnd: 799,
        note: "Contains ‘and they worshipped him.’",
      },
      {
        witness: "Codex Colbertinus (it c / VL 6)",
        date: "Twelfth century",
        dateStart: 1100,
        dateEnd: 1199,
        note: "Contains ‘and they worshipped him.’",
      },
    ],
    aggregateUpdates: {
      "Old Latin witnesses containing the phrase (aggregate)":
        "In the bounded apparatus set, 4 of 10 named Old Latin witnesses with a listed reading (40%) contain the phrase: aur, c, f, and q. Six named witnesses omit it; witnesses not listed at the locus are excluded from the denominator.",
    },
  },

  "john-1-18": {
    rows: [
      {
        witness: "Codex Vercellensis (it a / VL 3)",
        date: "Second half of the fourth century",
        dateStart: 350,
        dateEnd: 399,
        note: "Reads ‘only-begotten Son,’ supporting the Son reading rather than ‘God.’",
      },
      {
        witness: "Codex Palatinus (it e / VL 2)",
        date: "Fifth century",
        dateStart: 400,
        dateEnd: 499,
        note: "Reads ‘only-begotten Son,’ supporting the Son reading rather than ‘God.’",
      },
      {
        witness: "Codex Veronensis (it b / VL 4)",
        date: "Late fifth century",
        dateStart: 475,
        dateEnd: 499,
        note: "Reads ‘only-begotten Son,’ supporting the Son reading rather than ‘God.’",
      },
      {
        witness: "Codex Corbeiensis secundus (it ff² / VL 8)",
        date: "Fifth century",
        dateStart: 400,
        dateEnd: 499,
        note: "Reads ‘only-begotten Son,’ supporting the Son reading rather than ‘God.’",
      },
      {
        witness: "Codex Sarzanensis (it j / VL 22)",
        date: "Early sixth century",
        dateStart: 500,
        dateEnd: 525,
        note: "Reads ‘only-begotten Son,’ supporting the Son reading rather than ‘God.’",
      },
    ],
    aggregateUpdates: {
      "Most Old Latin witnesses":
        "All 10 consistently Old Latin John codices extant at this locus (10/10, 100% of that bounded set) support a Son reading; Codex Bezae is lacunose here and is excluded. This is not a percentage of every Latin manuscript.",
    },
  },

  "john-3-13": {
    rows: [
      {
        witness: "Codex Vercellensis (it a / VL 3)",
        date: "Second half of the fourth century",
        dateStart: 350,
        dateEnd: 399,
        note: "Includes ‘who is in heaven’ in John 3:13.",
      },
      {
        witness: "Codex Veronensis (it b / VL 4)",
        date: "Late fifth century",
        dateStart: 475,
        dateEnd: 499,
        note: "Includes ‘who is in heaven’ in John 3:13.",
      },
      {
        witness: "Codex Corbeiensis secundus (it ff² / VL 8)",
        date: "Fifth century",
        dateStart: 400,
        dateEnd: 499,
        note: "Includes ‘who is in heaven’ in John 3:13.",
      },
      {
        witness: "Codex Brixianus (it f / VL 10)",
        date: "Sixth century",
        dateStart: 500,
        dateEnd: 599,
        note: "Includes ‘who is in heaven’ in John 3:13.",
      },
      {
        witness: "Codex Sarzanensis (it j / VL 22)",
        date: "Early sixth century",
        dateStart: 500,
        dateEnd: 525,
        note: "Includes ‘who is in heaven’ in John 3:13.",
      },
    ],
    aggregateUpdates: {
      "Old Latin witnesses with “who is in heaven”":
        "In the bounded Itala apparatus set, 10 of 11 collatable Latin witnesses (about 91%) have the exact ‘who is in heaven’ form; Codex Palatinus has the related ‘who was’ form, and Codex Bezae is lacunose and excluded. This is not a percentage of all surviving Latin manuscripts.",
    },
  },

  "john-5-3b-4": {
    rows: [
      {
        witness: "Codex Vercellensis (it a / VL 3)",
        date: "Second half of the fourth century",
        dateStart: 350,
        dateEnd: 399,
        note: "Contains the full longer unit about the angel and the moving of the water.",
      },
      {
        witness: "Codex Palatinus (it e / VL 2)",
        date: "Fifth century",
        dateStart: 400,
        dateEnd: 499,
        note: "Contains the full longer unit about the angel and the moving of the water.",
      },
      {
        witness: "Codex Veronensis (it b / VL 4)",
        date: "Late fifth century",
        dateStart: 475,
        dateEnd: 499,
        note: "Contains the full longer unit about the angel and the moving of the water.",
      },
      {
        witness: "Codex Corbeiensis secundus (it ff² / VL 8)",
        date: "Fifth century",
        dateStart: 400,
        dateEnd: 499,
        note: "Contains the full longer unit about the angel and the moving of the water.",
      },
      {
        witness: "Codex Sarzanensis (it j / VL 22)",
        date: "Early sixth century",
        dateStart: 500,
        dateEnd: 525,
        note: "Contains the full longer unit about the angel and the moving of the water.",
      },
    ],
    aggregateUpdates: {
      "Most Latin witnesses":
        "In the bounded apparatus set, 9 of 14 named Latin witnesses (about 64%) contain the full longer unit, while five omit it. The percentage describes only that collated set, not the entire Latin manuscript tradition.",
      "One Latin witness":
        "Five of the 14 named Latin witnesses in the bounded apparatus set omit the full longer unit (about 36%): d, f, l, 11A, and q.",
    },
    aggregateLabelUpdates: {
      "One Latin witness":
        "Five named Latin witnesses omitting the full unit (aggregate)",
    },
  },

  "john-6-47": {
    rows: [
      {
        witness: "Codex Vercellensis (it a / VL 3)",
        date: "Second half of the fourth century",
        dateStart: 350,
        dateEnd: 399,
        note: "Reads ‘believeth on me,’ including the disputed object.",
      },
      {
        witness: "Codex Bezae, Latin column (it d / VL 5)",
        date: "c. AD 400",
        dateStart: 390,
        dateEnd: 420,
        note: "Reads ‘believeth on me,’ including the disputed object.",
      },
      {
        witness: "Codex Palatinus (it e / VL 2)",
        date: "Fifth century",
        dateStart: 400,
        dateEnd: 499,
        note: "Reads ‘believeth on me,’ including the disputed object.",
      },
      {
        witness: "Codex Veronensis (it b / VL 4)",
        date: "Late fifth century",
        dateStart: 475,
        dateEnd: 499,
        note: "Reads ‘believeth on me,’ including the disputed object.",
      },
      {
        witness: "Codex Corbeiensis secundus (it ff² / VL 8)",
        date: "Fifth century",
        dateStart: 400,
        dateEnd: 499,
        note: "Reads ‘believeth on me,’ including the disputed object.",
      },
    ],
    aggregateUpdates: {
      "Most Old Latin witnesses":
        "In the bounded Itala apparatus set, 11 of 12 named Latin witnesses with a listed reading (about 92%) include ‘on me’; Codex Rehdigeranus (it l) omits it. This is not a percentage of the entire Latin manuscript tradition.",
    },
  },
} as const satisfies Readonly<
  Record<
    LatinRepresentativeGospelsBSlug,
    LatinRepresentativeGospelsBWitnessSet
  >
>;
