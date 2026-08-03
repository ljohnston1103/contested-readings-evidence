export type LatinRepresentativeWitnessRow = Readonly<{
  witness: string;
  date: string;
  dateStart: number;
  dateEnd: number;
  note: string;
}>;

export type LatinRepresentativeWitnessPassage = Readonly<{
  rows: readonly LatinRepresentativeWitnessRow[];
  aggregateUpdates?: Readonly<Record<string, string>>;
  removeCompeting?: readonly string[];
}>;

/**
 * Named Latin representatives for the first Matthew/Mark research group.
 *
 * Percentages below describe only the bounded set of individually reported
 * Old Latin witnesses in the passage-level apparatus. They are not estimates
 * for every surviving Latin manuscript.
 */
export const latinRepresentativeWitnessesGospelsA = {
  "matthew-5-22": {
    rows: [
      {
        witness: "Old Latin k — Codex Bobiensis",
        date: "4th c.",
        dateStart: 300,
        dateEnd: 399,
        note: "Includes the phrase represented by the KJV's ‘without a cause.’",
      },
      {
        witness: "Old Latin a — Codex Vercellensis",
        date: "second half of the 4th c.",
        dateStart: 350,
        dateEnd: 399,
        note: "Includes the phrase represented by the KJV's ‘without a cause.’",
      },
      {
        witness: "Old Latin d — Codex Bezae (Latin column)",
        date: "c. AD 400",
        dateStart: 390,
        dateEnd: 420,
        note: "Includes the phrase represented by the KJV's ‘without a cause.’",
      },
      {
        witness: "Old Latin b — Codex Veronensis",
        date: "late 5th c.",
        dateStart: 475,
        dateEnd: 499,
        note: "Includes the phrase represented by the KJV's ‘without a cause.’",
      },
      {
        witness: "Old Latin h — Codex Claromontanus (Matthew hand)",
        date: "late 5th c. in Matthew",
        dateStart: 475,
        dateEnd: 499,
        note: "Includes the phrase represented by the KJV's ‘without a cause.’",
      },
    ],
    aggregateUpdates: {
      "Old Latin witnesses including the phrase":
        "In the bounded passage-level apparatus set, 11 of 12 individually listed Old Latin witnesses include the phrase (about 92%); Old Latin aur omits it. This is not a percentage of every surviving Latin manuscript.",
    },
  },

  "matthew-5-44": {
    rows: [
      {
        witness: "Old Latin d — Codex Bezae (Latin column)",
        date: "c. AD 400",
        dateStart: 390,
        dateEnd: 420,
        note: "Preserves the complete fuller command represented by the KJV wording.",
      },
      {
        witness: "Old Latin h — Codex Claromontanus (Matthew hand)",
        date: "late 5th c. in Matthew",
        dateStart: 475,
        dateEnd: 499,
        note: "Preserves the complete fuller command represented by the KJV wording.",
      },
      {
        witness: "Old Latin f — Codex Brixianus",
        date: "6th c.",
        dateStart: 500,
        dateEnd: 599,
        note: "Preserves the complete fuller command represented by the KJV wording.",
      },
      {
        witness: "Old Latin c — Codex Colbertinus",
        date: "12th c.",
        dateStart: 1100,
        dateEnd: 1199,
        note: "Preserves the complete fuller command represented by the KJV wording.",
      },
    ],
    aggregateUpdates: {
      "Latin witnesses with the fuller form":
        "Four of 11 individually listed Old Latin witnesses preserve the complete KJV expansion (about 36%). Six more preserve only part of the expansion, while Old Latin k has the short form; the broader figure is larger only if partial forms are counted.",
    },
  },

  "matthew-6-13": {
    rows: [
      {
        witness: "Old Latin f — Codex Brixianus",
        date: "6th c.",
        dateStart: 500,
        dateEnd: 599,
        note: "Contains the complete kingdom, power, and glory doxology with Amen.",
      },
      {
        witness: "Old Latin q — Codex Monacensis",
        date: "6th–7th c.",
        dateStart: 500,
        dateEnd: 699,
        note: "Supports the complete doxology; the apparatus marks its support as having a minor difference.",
      },
      {
        witness: "Old Latin g¹ — Codex Sangermanensis primus",
        date: "c. AD 810",
        dateStart: 800,
        dateEnd: 820,
        note: "Has the kingdom, power, and glory doxology but lacks Amen, so it is near-exact rather than an exact KJV-form witness.",
      },
    ],
    aggregateUpdates: {
      "Many Vulgate manuscripts":
        "Later Vulgate support remains an aggregate report, not a complete census. In the separate bounded Old Latin set, f and q support the complete doxology; g¹ is near-exact without Amen, k is partial, and seven omit.",
      "Most Old Latin representatives":
        "Seven of 11 individually listed Old Latin witnesses omit the complete doxology (about 64%); f and q contain it, g¹ is near-exact without Amen, and k preserves only a partial form.",
    },
  },

  "matthew-18-11": {
    rows: [
      {
        witness: "Old Latin a — Codex Vercellensis",
        date: "second half of the 4th c.",
        dateStart: 350,
        dateEnd: 399,
        note: "Contains the verse with a minor difference noted in the apparatus.",
      },
      {
        witness: "Old Latin d — Codex Bezae (Latin column)",
        date: "c. AD 400",
        dateStart: 390,
        dateEnd: 420,
        note: "Contains the verse represented by the KJV text.",
      },
      {
        witness: "Old Latin ff² — Codex Corbeiensis secundus",
        date: "5th c.",
        dateStart: 400,
        dateEnd: 499,
        note: "Contains the verse represented by the KJV text.",
      },
      {
        witness: "Old Latin b — Codex Veronensis",
        date: "late 5th c.",
        dateStart: 475,
        dateEnd: 499,
        note: "Contains the verse with a minor difference noted in the apparatus.",
      },
      {
        witness: "Old Latin r¹ — Codex Usserianus primus",
        date: "late 5th–early 7th c.",
        dateStart: 475,
        dateEnd: 625,
        note: "Contains the verse represented by the KJV text.",
      },
    ],
    aggregateUpdates: {
      "Latin tradition":
        "In the bounded passage-level apparatus set, 11 of 13 individually listed Old Latin witnesses contain the verse (about 85%), although several have minor wording differences; e and ff¹ omit it.",
    },
  },

  "matthew-23-14": {
    rows: [
      {
        witness: "Old Latin ff² — Codex Corbeiensis secundus",
        date: "5th c.",
        dateStart: 400,
        dateEnd: 499,
        note: "Contains Matthew 23:14.",
      },
      {
        witness: "Old Latin b — Codex Veronensis",
        date: "late 5th c.",
        dateStart: 475,
        dateEnd: 499,
        note: "Contains Matthew 23:14.",
      },
      {
        witness: "Old Latin h — Codex Claromontanus (Matthew hand)",
        date: "late 5th c. in Matthew",
        dateStart: 475,
        dateEnd: 499,
        note: "Contains Matthew 23:14.",
      },
      {
        witness: "Old Latin r¹ — Codex Usserianus primus",
        date: "late 5th–early 7th c.",
        dateStart: 475,
        dateEnd: 625,
        note: "Contains Matthew 23:14.",
      },
      {
        witness: "Old Latin f — Codex Brixianus",
        date: "6th c.",
        dateStart: 500,
        dateEnd: 599,
        note: "Contains Matthew 23:14; the verse's placement varies elsewhere in the tradition.",
      },
    ],
    aggregateUpdates: {
      "Old Latin witnesses containing the verse (aggregate)":
        "Seven of 13 individually listed Old Latin witnesses contain the verse (about 54%). The bounded Old Latin set is nearly divided rather than a broad majority.",
      "Old Latin witnesses omitting the verse (aggregate)":
        "Six of 13 individually listed Old Latin witnesses omit the verse (about 46%): a, aur, d, e, ff¹, and g¹. The main Vulgate text also omits, while some later Vulgate manuscripts include it.",
    },
  },

  "mark-7-16": {
    rows: [
      {
        witness: "Old Latin a — Codex Vercellensis",
        date: "second half of the 4th c.",
        dateStart: 350,
        dateEnd: 399,
        note: "Contains Mark 7:16; the published manuscript text reads the call to hear at this locus.",
      },
      {
        witness: "Old Latin d — Codex Bezae (Latin column)",
        date: "c. AD 400",
        dateStart: 390,
        dateEnd: 420,
        note: "Contains Mark 7:16.",
      },
      {
        witness: "Old Latin ff² — Codex Corbeiensis secundus",
        date: "5th c.",
        dateStart: 400,
        dateEnd: 499,
        note: "Contains Mark 7:16.",
      },
      {
        witness: "Old Latin b — Codex Veronensis",
        date: "late 5th c.",
        dateStart: 475,
        dateEnd: 499,
        note: "Contains Mark 7:16.",
      },
      {
        witness: "Old Latin i — Codex Vindobonensis",
        date: "late 5th c.",
        dateStart: 475,
        dateEnd: 499,
        note: "Contains Mark 7:16.",
      },
    ],
    aggregateUpdates: {
      "Old Latin copies":
        "All 12 individually listed Old Latin witnesses in the bounded passage-level apparatus set contain Mark 7:16 (100% of that set). This is not a claim about every surviving Latin manuscript.",
    },
    removeCompeting: ["Old Latin Vercellensis, a"],
  },

  "mark-9-29": {
    rows: [
      {
        witness: "Old Latin a — Codex Vercellensis",
        date: "second half of the 4th c.",
        dateStart: 350,
        dateEnd: 399,
        note: "Supports ‘prayer and fasting.’",
      },
      {
        witness: "Old Latin d — Codex Bezae (Latin column)",
        date: "c. AD 400",
        dateStart: 390,
        dateEnd: 420,
        note: "Supports ‘prayer and fasting.’",
      },
      {
        witness: "Old Latin ff² — Codex Corbeiensis secundus",
        date: "5th c.",
        dateStart: 400,
        dateEnd: 499,
        note: "Supports ‘prayer and fasting.’",
      },
      {
        witness: "Old Latin b — Codex Veronensis",
        date: "late 5th c.",
        dateStart: 475,
        dateEnd: 499,
        note: "Supports ‘prayer and fasting.’",
      },
      {
        witness: "Old Latin i — Codex Vindobonensis",
        date: "late 5th c.",
        dateStart: 475,
        dateEnd: 499,
        note: "Supports ‘prayer and fasting.’",
      },
    ],
    aggregateUpdates: {
      "Most Old Latin witnesses":
        "In the bounded passage-level apparatus set, 11 of 12 individually listed Old Latin witnesses support ‘prayer and fasting’ (about 92%); k alone has the shorter reading.",
      "One Old Latin witness":
        "Old Latin k, Codex Bobiensis, is the one individually listed Old Latin witness that omits ‘and fasting’; the other 11 of 12 listed witnesses include it.",
    },
  },

  "mark-9-44-46": {
    rows: [
      {
        witness: "Old Latin a — Codex Vercellensis",
        date: "second half of the 4th c.",
        dateStart: 350,
        dateEnd: 399,
        note: "Contains both repeated verses, Mark 9:44 and 9:46.",
      },
      {
        witness: "Old Latin d — Codex Bezae (Latin column)",
        date: "c. AD 400",
        dateStart: 390,
        dateEnd: 420,
        note: "Contains both repeated verses, Mark 9:44 and 9:46.",
      },
      {
        witness: "Old Latin ff² — Codex Corbeiensis secundus",
        date: "5th c.",
        dateStart: 400,
        dateEnd: 499,
        note: "Contains both repeated verses, Mark 9:44 and 9:46.",
      },
      {
        witness: "Old Latin b — Codex Veronensis",
        date: "late 5th c.",
        dateStart: 475,
        dateEnd: 499,
        note: "Contains both repeated verses, Mark 9:44 and 9:46.",
      },
      {
        witness: "Old Latin i — Codex Vindobonensis",
        date: "late 5th c.",
        dateStart: 475,
        dateEnd: 499,
        note: "Contains both repeated verses, Mark 9:44 and 9:46.",
      },
    ],
    aggregateUpdates: {
      "Most Old Latin copies":
        "In the bounded passage-level apparatus set, 11 of 12 individually listed Old Latin witnesses contain both repeated verses (about 92%); k alone omits them.",
      "One Old Latin witness":
        "Old Latin k, Codex Bobiensis, is the one individually listed Old Latin witness that omits Mark 9:44 and 9:46; the other 11 of 12 listed witnesses contain both.",
    },
  },

  "mark-10-24": {
    rows: [
      {
        witness: "Old Latin a — Codex Vercellensis",
        date: "second half of the 4th c.",
        dateStart: 350,
        dateEnd: 399,
        note: "Preserves the qualifying phrase, with verses 24 and 25 transposed and a minor grammatical difference.",
      },
      {
        witness: "Old Latin d — Codex Bezae (Latin column)",
        date: "c. AD 400",
        dateStart: 390,
        dateEnd: 420,
        note: "Preserves the qualifying phrase, with verses 24 and 25 transposed and a minor grammatical difference.",
      },
      {
        witness: "Old Latin ff² — Codex Corbeiensis secundus",
        date: "5th c.",
        dateStart: 400,
        dateEnd: 499,
        note: "Preserves the qualifying phrase, with verses 24 and 25 transposed and a minor grammatical difference.",
      },
      {
        witness: "Old Latin b — Codex Veronensis",
        date: "late 5th c.",
        dateStart: 475,
        dateEnd: 499,
        note: "Preserves the qualifying phrase, with verses 24 and 25 transposed and a minor grammatical difference.",
      },
      {
        witness: "Old Latin f — Codex Brixianus",
        date: "6th c.",
        dateStart: 500,
        dateEnd: 599,
        note: "Preserves the qualifying phrase in the conventional verse order.",
      },
    ],
    aggregateUpdates: {
      "Latin witnesses with the qualifying phrase":
        "Eight of 10 individually listed Old Latin witnesses preserve the qualifying sense (80% of the bounded set). Four transpose verses 24 and 25; c has only ‘a rich man,’ and k has the shorter reading.",
    },
  },

  "mark-15-28": {
    rows: [
      {
        witness: "Old Latin ff² — Codex Corbeiensis secundus",
        date: "5th c.",
        dateStart: 400,
        dateEnd: 499,
        note: "Contains Mark 15:28.",
      },
      {
        witness: "Old Latin n — Fragmenta Sangallensia",
        date: "5th c.",
        dateStart: 400,
        dateEnd: 499,
        note: "Contains Mark 15:28.",
      },
      {
        witness: "Old Latin r¹ — Codex Usserianus primus",
        date: "late 5th–early 7th c.",
        dateStart: 475,
        dateEnd: 625,
        note: "Contains Mark 15:28.",
      },
      {
        witness: "Old Latin l — Codex Rehdigeranus",
        date: "first half of the 8th c.",
        dateStart: 700,
        dateEnd: 749,
        note: "Contains Mark 15:28.",
      },
      {
        witness: "Old Latin aur — Codex Aureus Holmiensis",
        date: "c. AD 775",
        dateStart: 750,
        dateEnd: 799,
        note: "Contains Mark 15:28.",
      },
    ],
    aggregateUpdates: {
      "Two Latin witnesses":
        "Old Latin d and k are the two individually listed Latin witnesses that omit the verse (25% of the bounded set); six of the eight reported Old Latin witnesses at this locus include it.",
    },
  },
} as const satisfies Readonly<
  Record<string, LatinRepresentativeWitnessPassage>
>;
