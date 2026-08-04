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
   * replacement notes that state the direction of the evidence and identify
   * the earliest named supporting witnesses without implying unanimity.
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
        "The surviving Old Latin evidence supports the presence of the confession in several forms. The sixth- or seventh-century Latin column of Codex Laudianus is the earliest named supporting witness, followed by the seventh-century León Palimpsest.",
      "Vulgate tradition":
        "The Vulgate transmission is divided: the later received Latin tradition includes the verse, while the principal critical Vulgate text omits it.",
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
        "The Latin tradition is divided, but the full longer wording has early support in the fifth-century Fleury Palimpsest. The seventh-century León Palimpsest and later named witnesses also contain it.",
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
        "The Latin evidence is divided between ‘God’ and ‘Lord.’ The earliest named Latin support for the KJV's ‘God’ reading is the Book of Armagh, AD 807–808, followed by the eleventh-century Bible de Roda.",
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
        "The Latin evidence is divided. The earliest named Latin support for inclusion is the Book of Armagh, AD 807–808, followed by several twelfth- and thirteenth-century witnesses.",
      "Later Vulgate manuscripts":
        "Later Vulgate evidence is divided between inclusion and omission of the verse.",
      "Two Latin witnesses":
        "Several named Latin witnesses omit the verse, including e, dem, ro, and s.",
      "Earlier Vulgate witnesses":
        "The principal critical Vulgate line and several earlier Latin witnesses omit the verse.",
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
        "The full KJV clause has named Latin support beginning with the Book of Armagh, AD 807–808. Ninth-century Codex Sangermanensis probably supports it, and the later Pelagius lemma text also contains it.",
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
        "‘Christ’ is not the predominant early Latin reading. Its oldest named Latin support is Codex Carolinus at the beginning of the sixth century, followed by the sixth- or seventh-century Freising fragments.",
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
        "The Latin evidence is divided, but the complete benediction has early support in the mid-fifth-century Latin column of Codex Claromontanus. Later named witnesses preserve exact, qualified, or partial forms.",
      "Later Vulgate manuscripts":
        "The later Vulgate evidence is divided between inclusion and omission of the benediction.",
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
        "The KJV phrase ‘through his blood’ is supported in later Vulgate transmission.",
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
        "The surviving Old Latin evidence broadly supports Mark 16:9–20. Fifth-century Codex Corbeiensis secundus and the St Gall/Chur fragments are the earliest named supporting witnesses; Codex Bobiensis preserves the shorter ending.",
      Vulgate:
        "The Vulgate tradition broadly supports Mark 16:9–20; sixth-century Codex Fuldensis is an important named supporting witness.",
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
        "The surviving Old Latin evidence predominantly supports at least part of John 7:53–8:11. The Latin column of Codex Bezae around AD 400 is the earliest named supporting witness, followed by Codex Palatinus and Codex Corbeiensis secundus in the fifth century.",
      Vulgate:
        "The Vulgate tradition broadly supports John 7:53–8:11; sixth-century Codex Fuldensis is an important named supporting witness.",
    },
  },
} as const satisfies Readonly<
  Record<LatinRepresentativeSlug, LatinRepresentativeWitnessSet>
>;
