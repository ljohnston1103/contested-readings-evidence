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
   * only their notes with a plain conclusion followed by named early examples.
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
        "The surviving Old Latin evidence predominantly reads ‘Joseph and his mother.’ Fourth-century Codex Vercellensis is the earliest named supporting witness, followed by several fifth-century codices; the Latin column of Codex Bezae reads ‘his father and mother.’",
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
        "The surviving Old Latin evidence consistently supports ‘but by every word of God.’ Fourth-century Codex Vercellensis and the Latin column of Codex Bezae around AD 400 are the earliest named supporting witnesses.",
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
        "The surviving Old Latin evidence broadly supports both longer clauses. Fourth-century Codex Vercellensis is the earliest named witness to both; the Latin column of Codex Bezae around AD 400 supports only the first added sentence.",
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
        "The Old Latin evidence supports individual KJV clauses rather than one uniform longer form. The Latin column of Codex Bezae around AD 400 is the earliest named support for ‘our’; Codex Brixianus and Codex Monacensis also include ‘deliver us from evil.’",
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
        "The surviving Old Latin evidence predominantly includes the angel and agony account. Fourth-century Codex Vercellensis and the Latin column of Codex Bezae around AD 400 are the earliest named supporting witnesses; Codex Brixianus omits the verses.",
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
        "Inclusion of Luke 24:40 is not the predominant Old Latin reading. Its oldest named support is Codex Brixianus in the sixth century, followed by Codex Monacensis in the sixth or seventh century.",
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
        "The ascension phrase is not the predominant Old Latin reading. Its oldest named support is Codex Usserianus primus, dated from the late fifth to early seventh century, followed by Codex Brixianus and Codex Monacensis.",
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
        "The worship clause is not the predominant Old Latin reading. Its oldest named support is Codex Brixianus in the sixth century, followed by Codex Monacensis in the sixth or seventh century.",
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
        "The surviving Old Latin evidence consistently supports a Son reading rather than ‘God.’ Fourth-century Codex Vercellensis is the earliest named supporting witness; Codex Bezae is lacunose at this point.",
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
        "The surviving Old Latin evidence predominantly supports the exact phrase ‘who is in heaven.’ Fourth-century Codex Vercellensis is the earliest named supporting witness; Codex Palatinus has the related form ‘who was,’ and Codex Bezae is lacunose.",
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
        "The surviving Old Latin evidence predominantly supports the full longer unit about the angel and the moving of the water. Fourth-century Codex Vercellensis is the earliest named supporting witness, followed by several fifth-century codices.",
      "One Latin witness":
        "A substantial Latin strand omits the full longer unit, including d, f, l, 11A, and q.",
      "Later Vulgate manuscripts":
        "Later Vulgate transmission supports the longer reading about the angel and the moving of the water.",
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
        "The surviving Old Latin evidence predominantly supports ‘believeth on me.’ Fourth-century Codex Vercellensis and the Latin column of Codex Bezae around AD 400 are the earliest named supporting witnesses; Codex Rehdigeranus omits ‘on me.’",
    },
  },
} as const satisfies Readonly<
  Record<
    LatinRepresentativeGospelsBSlug,
    LatinRepresentativeGospelsBWitnessSet
  >
>;
