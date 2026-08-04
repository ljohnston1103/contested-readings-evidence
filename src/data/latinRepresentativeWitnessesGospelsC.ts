export type LatinRepresentativeWitnessGospelsCRow = Readonly<{
  witness: string;
  date: string;
  dateStart: number;
  dateEnd: number;
  note: string;
}>;

export type LatinRepresentativeWitnessGospelsCPassage = Readonly<{
  rows: readonly LatinRepresentativeWitnessGospelsCRow[];
  aggregateUpdates?: Readonly<Record<string, string>>;
}>;

/**
 * Additional named Latin representatives for Mark 11:26 and Luke 23:17.
 *
 * Each summary states the direction of the surviving Old Latin evidence in
 * plain language. Existing named support rows are intentionally not repeated.
 */
export const latinRepresentativeWitnessesGospelsC = {
  "mark-11-26": {
    rows: [
      {
        witness: "Old Latin d — Codex Bezae (Latin column)",
        date: "c. AD 400",
        dateStart: 390,
        dateEnd: 420,
        note: "Contains Mark 11:26.",
      },
      {
        witness: "Old Latin ff² — Codex Corbeiensis secundus",
        date: "5th c.",
        dateStart: 400,
        dateEnd: 499,
        note: "Contains Mark 11:26.",
      },
      {
        witness: "Old Latin b — Codex Veronensis",
        date: "late 5th c.",
        dateStart: 475,
        dateEnd: 499,
        note: "Contains Mark 11:26.",
      },
      {
        witness: "Old Latin i — Codex Vindobonensis",
        date: "late 5th c.",
        dateStart: 475,
        dateEnd: 499,
        note: "Contains Mark 11:26.",
      },
      {
        witness: "Old Latin r¹ — Codex Usserianus primus",
        date: "late 5th–early 7th c.",
        dateStart: 475,
        dateEnd: 625,
        note: "Contains Mark 11:26.",
      },
    ],
    aggregateUpdates: {
      "Old Latin copies":
        "The surviving Old Latin evidence predominantly supports inclusion of Mark 11:26. The Latin column of Codex Bezae around AD 400 is the earliest named supporting witness, followed by several fifth-century codices; k and l omit the verse.",
    },
  },

  "luke-23-17": {
    rows: [
      {
        witness: "Old Latin e — Codex Palatinus",
        date: "5th c.",
        dateStart: 400,
        dateEnd: 499,
        note: "Contains Luke 23:17 in the conventional location.",
      },
      {
        witness: "Old Latin ff² — Codex Corbeiensis secundus",
        date: "5th c.",
        dateStart: 400,
        dateEnd: 499,
        note: "Contains Luke 23:17 in the conventional location.",
      },
      {
        witness: "Old Latin b — Codex Veronensis",
        date: "late 5th c.",
        dateStart: 475,
        dateEnd: 499,
        note: "Contains Luke 23:17 in the conventional location.",
      },
      {
        witness: "Old Latin r¹ — Codex Usserianus primus",
        date: "late 5th–early 7th c.",
        dateStart: 475,
        dateEnd: 625,
        note: "Contains Luke 23:17 in the conventional location.",
      },
      {
        witness: "Old Latin f — Codex Brixianus",
        date: "6th c.",
        dateStart: 500,
        dateEnd: 599,
        note: "Contains Luke 23:17 in the conventional location.",
      },
    ],
    aggregateUpdates: {
      "Most Old Latin copies":
        "The surviving Old Latin evidence predominantly supports inclusion of Luke 23:17. Fifth-century Codex Palatinus and Codex Corbeiensis secundus are among the earliest named witnesses in the conventional location; Codex Bezae relocates the verse after verse 19, and Codex Vercellensis omits it.",
      "One Latin witness":
        "Old Latin a, Codex Vercellensis, omits Luke 23:17, while the surviving Old Latin evidence predominantly includes it; d relocates the verse after verse 19.",
    },
  },
} as const satisfies Readonly<
  Record<string, LatinRepresentativeWitnessGospelsCPassage>
>;
