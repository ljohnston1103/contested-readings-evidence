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
 * The percentages describe only the bounded set of individually reported Old
 * Latin witnesses in the passage-level apparatus. Existing named support rows
 * are intentionally not repeated here.
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
        "In the bounded passage-level apparatus set, 10 of 12 individually listed Old Latin witnesses contain Mark 11:26 (about 83%); k and l omit it. This is not a percentage of every surviving Latin manuscript.",
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
        "In the bounded passage-level apparatus set, 10 of 11 individually listed Old Latin witnesses contain Luke 23:17 (about 91%): nine place it conventionally, while d relocates it after verse 19. Old Latin a alone omits it.",
      "One Latin witness":
        "Old Latin a, Codex Vercellensis, is the one individually listed Old Latin witness that omits Luke 23:17; the other 10 of 11 include it, although d relocates the verse after verse 19.",
    },
  },
} as const satisfies Readonly<
  Record<string, LatinRepresentativeWitnessGospelsCPassage>
>;
