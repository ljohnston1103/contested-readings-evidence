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
 * Each summary states the direction of the surviving Old Latin evidence in
 * plain language. Named and dated witnesses follow as concrete examples.
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
        "The surviving Old Latin evidence predominantly supports the phrase represented by the KJV's ‘without a cause.’ Fourth-century Codex Bobiensis and Codex Vercellensis are among the earliest named supporting witnesses; Old Latin aur omits it.",
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
        "The complete KJV expansion is not the predominant Old Latin form. Its oldest named complete support is the Latin column of Codex Bezae around AD 400, followed by Codex Claromontanus in the late fifth century; several other Old Latin witnesses preserve only part of the expansion.",
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
        "The complete KJV doxology is a later Vulgate reading but is not the predominant Old Latin form. Its oldest named complete Old Latin support is Codex Brixianus in the sixth century, followed by Codex Monacensis in the sixth or seventh century; g¹ is near-exact without Amen and k is partial.",
      "Most Old Latin representatives":
        "The surviving Old Latin evidence predominantly omits the complete doxology. Codex Brixianus and Codex Monacensis contain the complete form, g¹ is near-exact without Amen, and Codex Bobiensis preserves only a partial form.",
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
        "The surviving Old Latin evidence predominantly supports inclusion of the verse, although e and ff¹ omit it. Codex Vercellensis in the fourth century and the Latin column of Codex Bezae around AD 400 are among the earliest named supporting witnesses.",
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
        "The surviving Old Latin evidence is divided, with somewhat more named witnesses containing the verse than omitting it. Fifth-century Codex Corbeiensis secundus, Codex Veronensis, and Codex Claromontanus are among the earliest named supporting witnesses.",
      "Old Latin witnesses omitting the verse (aggregate)":
        "A substantial Old Latin strand omits the verse: a, aur, d, e, ff¹, and g¹. The main Vulgate text also omits it, while some later Vulgate manuscripts include it.",
      "Later Vulgate manuscripts":
        "Some later Vulgate manuscripts include Matthew 23:14, while the principal Vulgate text omits it.",
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
        "The surviving Old Latin evidence consistently supports inclusion of Mark 7:16. Codex Bobiensis and Codex Vercellensis in the fourth century are among the earliest named supporting witnesses.",
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
        "The surviving Old Latin evidence predominantly supports ‘prayer and fasting.’ Codex Vercellensis in the fourth century and the Latin column of Codex Bezae around AD 400 are among the earliest named supporting witnesses; Codex Bobiensis has the shorter reading.",
      "One Old Latin witness":
        "Old Latin k, Codex Bobiensis, omits ‘and fasting,’ while the surviving Old Latin evidence predominantly includes it.",
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
        "The surviving Old Latin evidence predominantly supports both repeated verses, Mark 9:44 and 9:46. Codex Vercellensis in the fourth century and the Latin column of Codex Bezae around AD 400 are among the earliest named supporting witnesses; Codex Bobiensis omits them.",
      "One Old Latin witness":
        "Old Latin k, Codex Bobiensis, omits Mark 9:44 and 9:46, while the surviving Old Latin evidence predominantly contains both repeated verses.",
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
        "The surviving Old Latin evidence predominantly preserves the qualifying sense. Fourth-century Codex Vercellensis and the Latin column of Codex Bezae around AD 400 are the earliest named supporting witnesses; several witnesses transpose verses 24 and 25.",
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
        "The surviving Old Latin evidence predominantly supports inclusion of Mark 15:28. Fifth-century Codex Corbeiensis secundus and Fragmenta Sangallensia are the earliest named supporting witnesses; d and k omit the verse.",
    },
  },
} as const satisfies Readonly<
  Record<string, LatinRepresentativeWitnessPassage>
>;
