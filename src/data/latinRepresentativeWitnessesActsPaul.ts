import type { Witness } from "./types";

export type LatinRepresentativeSlug =
  | "acts-8-37"
  | "acts-9-5-6"
  | "acts-20-28"
  | "acts-28-29"
  | "romans-8-1"
  | "romans-14-10"
  | "romans-16-24"
  | "colossians-1-14"
  | "mark-16-9-20"
  | "john-7-53-8-11";

export type LatinRepresentativeRow = Readonly<
  Pick<Witness, "witness" | "date" | "dateStart" | "dateEnd" | "note">
>;

export type LatinRepresentativeWitnessSet = Readonly<{
  rows: readonly LatinRepresentativeRow[];
  /**
   * Keys are the exact labels of existing aggregate support rows. Values are
   * replacement notes that preserve the claim without implying unanimity or a
   * reading-specific percentage that the cited dossier does not establish.
  */
  aggregateUpdates?: Readonly<Record<string, string>>;
  aggregateLabelUpdates?: Readonly<Record<string, string>>;
  removeCompeting?: readonly string[];
}>;

export const latinRepresentativeWitnessesActsPaul = {
  "acts-8-37": {
    rows: [
      {
        witness: "Codex Laudianus, Latin column (it e / VL 50)",
        date: "Sixth or seventh century",
        dateStart: 501,
        dateEnd: 700,
        note: "Contains the eunuch's confession in a different Latin form; this supports the verse in substance, not the exact KJV wording.",
      },
      {
        witness: "Palimpsestus Legionensis (it l / VL 67)",
        date: "Seventh century",
        dateStart: 601,
        dateEnd: 700,
        note: "Contains a close Latin form of the confession and Philip's condition for baptism.",
      },
      {
        witness: "Sélestat 1A lectionary (it r / VL 57)",
        date: "Eighth century",
        dateStart: 701,
        dateEnd: 800,
        note: "Contains a close Latin form of Acts 8:37.",
      },
      {
        witness: "Book of Armagh (it ar / VL 61)",
        date: "AD 807–808",
        dateStart: 807,
        dateEnd: 808,
        note: "Contains the confession, but the cited form omits “Christ”; treat it as partial support rather than an exact KJV match.",
      },
      {
        witness: "Codex Perpinianensis (it p / VL 54)",
        date: "Second half of the twelfth century",
        dateStart: 1151,
        dateEnd: 1200,
        note: "Contains a close full Latin form of Acts 8:37.",
      },
    ],
    aggregateUpdates: {
      "Old Latin tradition":
        "Multiple named Latin witnesses from the sixth or seventh century onward contain the confession in exact, close, or partial forms; the evidence does not establish a corpus-wide percentage or uniform wording.",
      "Vulgate tradition":
        "The Vulgate transmission is divided: later received Latin tradition includes the verse, while the principal critical Vulgate texts omit it; do not imply Vulgate unanimity.",
    },
  },

  "acts-9-5-6": {
    rows: [
      {
        witness: "Fleury Palimpsest (it h / VL 55)",
        date: "Fifth century",
        dateStart: 401,
        dateEnd: 500,
        note: "Contains the full long Latin form corresponding to the KJV addition.",
      },
      {
        witness: "Palimpsestus Legionensis (it l / VL 67)",
        date: "Seventh century",
        dateStart: 601,
        dateEnd: 700,
        note: "Contains the full long Latin form corresponding to the KJV addition.",
      },
      {
        witness: "Sélestat 1A lectionary (it r / VL 57)",
        date: "Eighth century",
        dateStart: 701,
        dateEnd: 800,
        note: "Contains the longer wording, including the goad saying and Saul's response.",
      },
      {
        witness: "Book of Armagh (it ar / VL 61)",
        date: "AD 807–808",
        dateStart: 807,
        dateEnd: 808,
        note: "Contains the full long Latin form corresponding to the KJV addition.",
      },
      {
        witness: "Michigan MS 146 (it ph / VL 63)",
        date: "First half of the twelfth century",
        dateStart: 1101,
        dateEnd: 1150,
        note: "Contains the full long Latin form corresponding to the KJV addition.",
      },
      {
        witness: "Codex Perpinianensis (it p / VL 54)",
        date: "Second half of the twelfth century",
        dateStart: 1151,
        dateEnd: 1200,
        note: "Contains the full long Latin form corresponding to the KJV addition.",
      },
    ],
    aggregateUpdates: {
      "Latin Vulgate manuscripts":
        "Several individually identified Latin witnesses contain the full longer wording, beginning with the fifth-century Fleury Palimpsest; other Latin witnesses omit it, so the tradition is not unanimous.",
    },
    removeCompeting: ["Old Latin h, p", "Old Latin h", "Old Latin p"],
  },

  "acts-20-28": {
    rows: [
      {
        witness: "Book of Armagh (it ar / VL 61)",
        date: "AD 807–808",
        dateStart: 807,
        dateEnd: 808,
        note: "Reads “the church of God.”",
      },
      {
        witness: "Bible de Roda (it ro / VL 62)",
        date: "Middle of the eleventh century",
        dateStart: 1026,
        dateEnd: 1075,
        note: "Reads “the church of God.”",
      },
      {
        witness: "Michigan MS 146 (it ph / VL 63)",
        date: "First half of the twelfth century",
        dateStart: 1101,
        dateEnd: 1150,
        note: "Reads “the church of God.”",
      },
      {
        witness: "Codex Colbertinus (it c / VL 6)",
        date: "Twelfth century",
        dateStart: 1101,
        dateEnd: 1200,
        note: "Reads “the church of God.”",
      },
      {
        witness: "Codex Demidovianus (it dem / VL 59)",
        date: "Second half of the thirteenth century",
        dateStart: 1251,
        dateEnd: 1300,
        note: "The manuscript is now lost, but its surviving collation cites it for “the church of God.”",
      },
    ],
    aggregateUpdates: {
      "Vulgate manuscript tradition":
        "Named Latin support for “God” is preserved from the Book of Armagh onward. Important Latin witnesses also read “Lord,” so this row must not imply an early Latin majority or unanimity.",
    },
  },

  "acts-28-29": {
    rows: [
      {
        witness: "Book of Armagh (it ar / VL 61)",
        date: "AD 807–808",
        dateStart: 807,
        dateEnd: 808,
        note: "Contains Acts 28:29.",
      },
      {
        witness: "Michigan MS 146 (it ph / VL 63)",
        date: "First half of the twelfth century",
        dateStart: 1101,
        dateEnd: 1150,
        note: "Contains Acts 28:29.",
      },
      {
        witness: "Codex Colbertinus (it c / VL 6)",
        date: "Twelfth century",
        dateStart: 1101,
        dateEnd: 1200,
        note: "Contains Acts 28:29.",
      },
      {
        witness: "Codex Perpinianensis (it p / VL 54)",
        date: "Second half of the twelfth century",
        dateStart: 1151,
        dateEnd: 1200,
        note: "Contains Acts 28:29.",
      },
      {
        witness: "Codex Gigas (it gig / VL 51)",
        date: "AD 1204–1227",
        dateStart: 1204,
        dateEnd: 1227,
        note: "Contains Acts 28:29.",
      },
    ],
    aggregateUpdates: {
      "Most Latin witnesses":
        "The named Latin evidence is divided: these witnesses include the verse, while several other cited Latin witnesses omit it. The dossier does not establish a corpus-wide “most” percentage.",
      "Later Vulgate manuscripts":
        "Later Vulgate evidence is divided, and the dossier provides no reading-specific numerator or denominator from which to calculate a percentage.",
      "Two Latin witnesses":
        "Several individually cited Latin witnesses omit the verse, including e, dem, ro, and s; the compact dossier does not provide a corpus-wide numerator or denominator.",
      "Earlier Vulgate witnesses":
        "The principal critical Vulgate line and several earlier Latin witnesses omit the verse; the dossier does not provide a reading-specific percentage.",
    },
    aggregateLabelUpdates: {
      "Most Latin witnesses": "Latin witnesses containing the verse (aggregate)",
      "Two Latin witnesses": "Latin witnesses omitting the verse (aggregate)",
    },
  },

  "romans-8-1": {
    rows: [
      {
        witness: "Book of Armagh (it ar / VL 61)",
        date: "AD 807–808",
        dateStart: 807,
        dateEnd: 808,
        note: "Contains the full clause “who walk not after the flesh, but after the Spirit.”",
      },
      {
        witness: "Codex Sangermanensis, Pauline Epistles (it e / VL 76)",
        date: "Ninth century",
        dateStart: 801,
        dateEnd: 900,
        note: "Cited with a videtur (“apparently”) qualification for the full clause; its support is probable, not certain.",
      },
      {
        witness: "Pelagius lemma text in Balliol College MS 157 (it o)",
        date: "Fifteenth-century manuscript preserving an older Latin text",
        dateStart: 1401,
        dateEnd: 1500,
        note: "Contains the full clause, but this is a late commentary manuscript preserving an older Latin textual form, not an early physical witness.",
      },
    ],
    aggregateUpdates: {
      "Two Old Latin witnesses containing the full clause (aggregate)":
        "The compact apparatus cites the Book of Armagh, Codex Sangermanensis with a videtur qualification, and the Pelagius lemma text in Balliol MS 157. Their different kinds and qualifications do not support a simple corpus-wide count or percentage.",
    },
    aggregateLabelUpdates: {
      "Two Old Latin witnesses containing the full clause (aggregate)":
        "Three cited Latin sources containing the full clause (aggregate)",
    },
  },

  "romans-14-10": {
    rows: [
      {
        witness: "Codex Carolinus (it gue / VL 79)",
        date: "Beginning of the sixth century",
        dateStart: 501,
        dateEnd: 525,
        note: "Reads “the judgment seat of Christ.”",
      },
      {
        witness: "Fragmenta Frisingensia (it r / VL 64)",
        date: "Second half of the sixth to first half of the seventh century",
        dateStart: 551,
        dateEnd: 650,
        note: "Reads “the judgment seat of Christ.”",
      },
      {
        witness: "Codex Demidovianus (it dem / VL 59)",
        date: "Second half of the thirteenth century",
        dateStart: 1251,
        dateEnd: 1300,
        note: "The manuscript is now lost, but its surviving collation cites it for “Christ.”",
      },
    ],
    aggregateUpdates: {
      "Latin witnesses reading “Christ”":
        "Three individually cited Latin witnesses read “Christ”: Codex Carolinus, the Freising fragments, and the lost Codex Demidovianus. Broader early Latin evidence reads “God,” so this is not a Latin-majority claim.",
    },
  },

  "romans-16-24": {
    rows: [
      {
        witness: "Codex Claromontanus, Latin column (it d / VL 75)",
        date: "Middle of the fifth century",
        dateStart: 451,
        dateEnd: 500,
        note: "Contains the full benediction at Romans 16:24.",
      },
      {
        witness: "Book of Armagh (it ar / VL 61)",
        date: "AD 807–808",
        dateStart: 807,
        dateEnd: 808,
        note: "Contains the benediction in a qualified or slightly variant form; do not present it as an exact word-for-word match.",
      },
      {
        witness: "Monza Pauline fragments (it mon / VL 86)",
        date: "Middle of the ninth century",
        dateStart: 801,
        dateEnd: 900,
        note: "Contains the full benediction at Romans 16:24.",
      },
      {
        witness: "Codex Boernerianus (it g / VL 77)",
        date: "AD 860–870",
        dateStart: 860,
        dateEnd: 870,
        note: "Contains the verse but omits “Jesus Christ”; this is partial support for the benediction, not an exact KJV match.",
      },
      {
        witness: "Codex Augiensis (it f / VL 78)",
        date: "Last third of the ninth century",
        dateStart: 867,
        dateEnd: 900,
        note: "Contains the verse but omits “Jesus Christ”; this is partial support for the benediction, not an exact KJV match.",
      },
      {
        witness: "Pelagius lemma text in Balliol College MS 157 (it o)",
        date: "Fifteenth-century manuscript preserving an older Latin text",
        dateStart: 1401,
        dateEnd: 1500,
        note: "Contains the full benediction, but the physical manuscript is late and transmits a commentary lemma text.",
      },
    ],
    aggregateUpdates: {
      "Most Latin witnesses":
        "Several individually cited Latin witnesses contain the benediction in exact, qualified, or partial forms, while other Latin evidence omits it. This apparatus sample should not be generalized into a corpus-wide percentage.",
      "Later Vulgate manuscripts":
        "The later Latin evidence is divided, and the dossier does not identify a reading-specific manuscript total from which to calculate a percentage.",
    },
    aggregateLabelUpdates: {
      "Most Latin witnesses":
        "Latin witnesses containing the benediction (aggregate)",
    },
  },

  "colossians-1-14": {
    rows: [],
    aggregateUpdates: {
      "Later Vulgate manuscripts":
        "The cited dossier does not name an individual Latin manuscript for “through his blood”; do not infer named manuscripts or a reading-specific percentage from the overall size of the Vulgate tradition.",
    },
    aggregateLabelUpdates: {
      "Later Vulgate manuscripts": "Later Vulgate evidence (aggregate)",
    },
  },

  "mark-16-9-20": {
    rows: [
      {
        witness: "Codex Corbeiensis secundus (it ff2 / VL 8)",
        date: "Fifth century",
        dateStart: 401,
        dateEnd: 500,
        note: "Contains Mark 16:9–20.",
      },
      {
        witness: "Fragmenta Sangallensia / Curiensia (it n and it o / VL 16)",
        date: "Fifth century, with one seventh-century replacement leaf",
        dateStart: 401,
        dateEnd: 700,
        note: "The surviving Mark fragments attest the longer ending; the replacement-leaf qualification belongs to the manuscript group and should remain visible.",
      },
      {
        witness: "Codex Monacensis / Valerianus (it q / VL 13)",
        date: "Sixth or seventh century",
        dateStart: 501,
        dateEnd: 700,
        note: "Contains Mark 16:9–20.",
      },
      {
        witness: "Codex Rehdigeranus (it l / VL 11)",
        date: "First half of the eighth century",
        dateStart: 701,
        dateEnd: 750,
        note: "Contains Mark 16:9–20.",
      },
      {
        witness: "Codex Aureus Holmiensis (it aur / VL 15)",
        date: "Around AD 775",
        dateStart: 750,
        dateEnd: 800,
        note: "Contains Mark 16:9–20.",
      },
    ],
    aggregateUpdates: {
      "Old Latin tradition":
        "Several individually named Old Latin witnesses contain Mark 16:9–20, while Codex Bobiensis preserves the shorter ending. The surviving set is not a complete denominator for a global Latin percentage.",
      Vulgate:
        "The Vulgate tradition broadly transmits Mark 16:9–20, but the dossier does not supply a reading-specific manuscript total or percentage; Codex Fuldensis remains separately named.",
    },
  },

  "john-7-53-8-11": {
    rows: [
      {
        witness: "Codex Bezae, Latin column (it d / VL 5)",
        date: "Around AD 400",
        dateStart: 375,
        dateEnd: 425,
        note: "Contains John 7:53–8:11 in its customary location.",
      },
      {
        witness: "Codex Palatinus (it e / VL 2)",
        date: "Fifth century",
        dateStart: 401,
        dateEnd: 500,
        note: "Contains John 7:53–8:11.",
      },
      {
        witness: "Codex Corbeiensis secundus (it ff2 / VL 8)",
        date: "Fifth century",
        dateStart: 401,
        dateEnd: 500,
        note: "Contains John 7:53–8:11.",
      },
      {
        witness: "Codex Usserianus primus (it r1 / VL 14)",
        date: "Fifth century or around AD 600",
        dateStart: 401,
        dateEnd: 600,
        note: "Contains John 7:53–8:11; the broad date range reflects the manuscript's alternative palaeographical datings.",
      },
      {
        witness: "Codex Sarzanensis (it j / VL 22 and 22A)",
        date: "Beginning of the sixth century",
        dateStart: 501,
        dateEnd: 525,
        note: "Its surviving Johannine fragments attest at least part of the passage; treat this as qualified rather than complete-wording support.",
      },
    ],
    aggregateUpdates: {
      "Old Latin tradition":
        "In the bounded comparison set of 23 extant Old Latin manuscripts covering John 7–8, 17 contain at least part of the passage (about 74%, or roughly two-thirds to three-quarters). This is not a percentage of all Latin or Vulgate manuscripts, and partial or mixed texts are included in the count.",
      Vulgate:
        "The Vulgate tradition broadly transmits John 7:53–8:11, but the dossier does not supply a reading-specific total for all Vulgate manuscripts; Codex Fuldensis remains separately named.",
    },
  },
} as const satisfies Readonly<
  Record<LatinRepresentativeSlug, LatinRepresentativeWitnessSet>
>;
