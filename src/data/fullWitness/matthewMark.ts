import type { FullWitnessEntry } from "./types";

const WILLKER_MATTHEW = {
  label: "Wieland Willker, A Textual Commentary on the Greek Gospels, Vol. 1: Matthew",
  url: "https://www.willker.de/wie/TCG/TC-Matthew.pdf",
};
const INTF_LISTE = {
  label: "INTF Kurzgefasste Liste / NTVMR manuscript metadata",
  url: "https://ntvmr.uni-muenster.de/liste",
  locator: "Physical dates for the named Greek manuscripts",
};
const VETUS_LATINA = {
  label: "Vetus Latina Gospel manuscripts register (ITSEE, University of Birmingham)",
  url: "https://itseeweb.cal.bham.ac.uk/vetuslatina/GospelMSS/",
  locator: "Identity and physical date of the named Old Latin manuscripts",
};
const LAPAROLA = {
  label: "LaParola Münster-linked verse apparatus",
  url: "https://www.laparola.net/greco/index.php",
};
const BL_CURETONIAN = {
  label: "British Library Archives and Manuscripts record, Curetonian Syriac (Add MS 14451)",
  url: "https://searcharchives.bl.uk/catalog/040-002086117",
  locator: "Physical date of the Curetonian manuscript, c. AD 450–470",
};
const WILLKER_MAE2 = {
  label: "Wieland Willker, study of Middle Egyptian mae-2 (Schøyen MS 2650)",
  url: "https://www.willker.de/wie/TCG/Mt-mae-2.pdf",
};
const DECM = {
  label: "Digital Editio Critica Maior, Mark (INTF)",
  url: "https://ntvmr.uni-muenster.de/ecm",
};
const INTF_PATRISTIC = {
  label: "INTF Patristic Citations database",
  url: "https://intf.uni-muenster.de/patristik/",
};
const KIRAZ = {
  label: "George A. Kiraz, Comparative Edition of the Syriac Gospels",
  url: "https://www.degruyterbrill.com/document/doi/10.31826/9781463209643/html?lang=en",
};

const WILLKER_SCOPE =
  "Willker's selected Matthew apparatus, checked against the Münster-linked verse apparatus and, at Matthew 27:35, against a primary transcription. Counts below name the witnesses this apparatus prints.";
const DECM_SCOPE =
  "The current digital ECM Mark apparatus, built on full transcriptions of 209 selected Greek manuscripts together with the reconstructed versional and patristic states. Counts below name the entries this apparatus displays.";

export const matthewMarkWitnesses: FullWitnessEntry[] = [
  {
    slug: "matthew-1-25",
    reference: "Matthew 1:25",
    summary:
      "The exact KJV form is ancient and stands in fifth-century Greek codices, several Old Latin and Vulgate witnesses, the Syriac Peshitta and Harklean, and explicit fourth-century patristic quotations. Sinaiticus and Vaticanus carry the shortest form, and three further intermediate forms circulate alongside them.",
    unit: "The wording after “till she had brought forth”: τὸν υἱὸν αὐτῆς τὸν πρωτότοκον (“her firstborn son”), against the short υἱόν and three intermediate forms.",
    scope: WILLKER_SCOPE,
    snapshot: {
      greekSupport:
        "10 named Greek witnesses plus Family 13 and the Byzantine tradition in Willker's apparatus",
      greekAgainst: "7 named Greek witnesses in Willker's apparatus",
      supportCategory: "Byzantine and fifth-century Greek support",
      mainEvidenceAgainst: [
        "Codex Sinaiticus (01)",
        "Codex Vaticanus (03)",
        "Minuscule 33",
        "Family 1",
      ],
    },
    sources: [
      { ...WILLKER_MATTHEW, locator: "TVU 10, PDF p. 24" },
      {
        ...LAPAROLA,
        locator: "Matthew 1:25 — subvariant separation and patristic/versional index",
      },
      INTF_LISTE,
      VETUS_LATINA,
      {
        ...BL_CURETONIAN,
        locator:
          "Physical date of the Curetonian manuscript, c. AD 450–470, distinct from the Old Syriac translation date",
      },
      {
        ...WILLKER_MAE2,
        locator: "Identity and date of mae-1 (Codex Scheide) and mae-2 (Schøyen MS 2650)",
      },
      {
        label: "New Advent Fathers of the Church",
        url: "https://www.newadvent.org/fathers/",
        locator: "Cyril of Jerusalem, Catechesis 7.9; Chrysostom, Hom. in Matt. 5",
      },
    ],
    notes: [
      "The KJV's Greek base contains αὐτῆς (“her”) explicitly.",
      "Ephrem's Diatessaron tradition reads “until she bore her first-born” without “son”, while the Arabic Diatessaron has “firstborn son”.",
    ],
    units: [
      {
        id: "form",
        label: "Wording after “till she had brought forth”",
        reading: "τὸν υἱὸν αὐτῆς τὸν πρωτότοκον",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            reading: "τὸν υἱὸν αὐτῆς τὸν πρωτότοκον",
            witnesses: "04 05 019C 032 037C 087 124 372 892 1071",
            aggregates: "Family 13 (part) · Byz",
          },
          {
            label: "Old Latin",
            tone: "support",
            witnesses: "aur (VL15) f (VL10) ff1 (VL9)",
            aggregates: "Vulgate tradition",
          },
          {
            label: "Syriac",
            tone: "support",
            witnesses: "Peshitta Harklean",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "τὸν υἱόν· τὸν πρωτότοκον — “the son, the firstborn”, without “her”",
            witnesses: "019* 037*",
          },
          {
            label: "Old Latin",
            tone: "related",
            reading: "the same intermediate form, without “her”",
            witnesses: "d (VL5) q (VL13)",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "υἱὸν αὐτῆς — “her son”, without “firstborn”",
            witnesses: "1182",
          },
          {
            label: "Coptic",
            tone: "related",
            reading: "υἱὸν αὐτῆς — “her son”",
            witnesses: "Sahidic",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            reading: "υἱόν — “a son”",
            witnesses: "01 03 035V 071V 33 788 1192",
            aggregates: "Family 1",
          },
          {
            label: "Syriac and Coptic",
            tone: "competing",
            reading: "short forms",
            witnesses: "Sinaitic Curetonian Bohairic mae-1",
            note: "Sinaitic Syriac reads the equivalent of “a son to him”; Bohairic reads “the son”.",
          },
          {
            label: "Lacunose",
            tone: "neutral",
            witnesses: "038 1424",
          },
        ],
      },
    ],
    fathers: [
      {
        author: "Cyril of Jerusalem",
        work: "Catechetical Lecture 7.9",
        date: "Delivered c. AD 350",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "Catechesis 7.9",
        url: "https://www.newadvent.org/fathers/310107.htm",
      },
      {
        author: "John Chrysostom",
        work: "Homilies on Matthew 5",
        date: "Late fourth century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "Homiliae in Matthaeum 5",
        url: "https://www.newadvent.org/fathers/200105.htm",
      },
      {
        author: "Pseudo-Basil",
        work: "Against Eunomius 4",
        date: "Fourth century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "Adversus Eunomium 4 (Basilian corpus)",
      },
      {
        author: "Jerome",
        work: "Against Helvidius",
        date: "c. AD 383",
        use: "Textual comment",
        reading: "Supporting witness",
        locator: "Adversus Helvidium",
        url: "https://www.newadvent.org/fathers/3007.htm",
        transmission: "Latin",
      },
    ],
  },
  {
    slug: "matthew-5-22",
    reference: "Matthew 5:22",
    summary:
      "εἰκῇ (“without a cause”) stands in Codex Bezae, seven further named uncials, Families 1 and 13, and the Byzantine tradition, and it is quoted by Irenaeus in the second century and Cyprian in the third. The earliest surviving Greek fragment, the P64/P67 codex of about AD 200–225, reads the short text, and Origen and Jerome both discuss the variant.",
    unit: "Presence of εἰκῇ (“without a cause”) after “whosoever is angry with his brother”. The neighbouring variants in “his brother”, “Raca” and “fool” are separate units.",
    scope: WILLKER_SCOPE,
    snapshot: {
      greekSupport:
        "13 named Greek witnesses plus Families 1 and 13 and the Byzantine tradition in Willker's apparatus",
      greekAgainst:
        "6 named Greek witnesses plus about 25 further manuscripts cited collectively",
      supportCategory: "Broad Greek, Latin, Syriac and Coptic support",
      mainEvidenceAgainst: [
        "P64/P67 (one codex, c. AD 200–225)",
        "Codex Sinaiticus first hand (01*)",
        "Codex Vaticanus (03)",
      ],
    },
    sources: [
      { ...WILLKER_MATTHEW, locator: "TVU 36, PDF p. 67" },
      {
        ...LAPAROLA,
        locator: "Matthew 5:22 — the W/032 assignment and versional leads",
      },
      INTF_LISTE,
      VETUS_LATINA,
      BL_CURETONIAN,
      {
        label: "New Advent Fathers of the Church",
        url: "https://www.newadvent.org/fathers/",
        locator: "Justin, 1 Apol. 16.2; Irenaeus, Haer. 2.32.1; Chrysostom, De sacerdotio 3.14",
      },
      {
        label: "Catena Bible transcription of Jerome on Matthew 5:22",
        url: "https://catenabible.com/com/5735de4fec4bd7c9723b95e0",
        locator: "Commentarii in Matthaeum 1, at 5:22",
      },
    ],
    notes: [
      "P64 and P67 are two GA numbers for one codex, and its reading is videtur because only the upper parts of the letters survive.",
    ],
    units: [
      {
        id: "eike",
        label: "Presence of εἰκῇ",
        reading: "εἰκῇ",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses: "01C 05 017 019 024 037 038 042 0233 0287 33 700 892",
            aggregates: "Family 1 · Family 13 · Byz",
          },
          {
            label: "Old Latin",
            tone: "support",
            witnesses:
              "a (VL3) k (VL1) b (VL4) d (VL5) h (VL12) f (VL10) q (VL13) ff1 (VL9) l (VL11) g1 (VL7)",
          },
          {
            label: "Syriac",
            tone: "support",
            witnesses: "Sinaitic Curetonian Peshitta Harklean",
          },
          {
            label: "Coptic and other versions",
            tone: "support",
            witnesses: "Sahidic Bohairic Middle-Egyptian Gothic",
            aggregates: "Armenian · Georgian",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses: "P64/P67V 01* 03 372 1424mg 2737",
            aggregates: "about 25 further manuscripts cited collectively",
          },
          {
            label: "Latin and other versions",
            tone: "competing",
            witnesses: "aur (VL15)",
            aggregates: "principal Vulgate text · Ethiopic",
            note: "Some Vulgate manuscripts include the word.",
          },
          {
            label: "Greek manuscripts — assignment disputed",
            tone: "neutral",
            witnesses: "032",
            note: "LaParola assigns 032 to inclusion; Willker's compact line places it in both columns.",
          },
          { label: "Lacunose", tone: "neutral", witnesses: "04 22" },
        ],
      },
    ],
    fathers: [
      {
        author: "Justin Martyr",
        work: "First Apology 16.2",
        date: "c. AD 155",
        use: "Close quotation",
        reading: "Competing witness",
        locator: "1 Apologia 16.2",
        url: "https://www.newadvent.org/fathers/0126.htm",
      },
      {
        author: "Irenaeus",
        work: "Against Heresies 2.32.1",
        date: "Late second century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "Adversus haereses 2.32.1",
        url: "https://www.newadvent.org/fathers/0103232.htm",
        transmission: "Latin transmission",
      },
      {
        author: "Cyprian",
        work: "Testimonies 3.8",
        date: "Mid third century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "Ad Quirinum 3.8",
        url: "https://www.newadvent.org/fathers/050712c.htm",
      },
      {
        author: "Origen",
        work: "Commentary on Ephesians, fragment",
        date: "Third century",
        use: "Textual comment",
        reading: "Competing witness",
        locator: "Fragment printed at Willker TVU 36",
        url: "https://www.willker.de/wie/TCG/TC-Matthew.pdf",
      },
      {
        author: "Jerome",
        work: "Commentary on Matthew 1, at 5:22",
        date: "Early fifth century",
        use: "Textual comment",
        reading: "Competing witness",
        locator: "Commentarii in Matthaeum 1, at 5:22",
        url: "https://catenabible.com/com/5735de4fec4bd7c9723b95e0",
      },
      {
        author: "Augustine",
        work: "On the Sermon on the Mount 1.9.25",
        date: "c. AD 394",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "De sermone Domini in monte 1.9.25",
      },
      {
        author: "John Chrysostom",
        work: "On the Priesthood 3.14",
        date: "Late fourth century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "De sacerdotio 3.14",
        url: "https://www.newadvent.org/fathers/19223.htm",
      },
      {
        author: "Apostolic Constitutions",
        work: "Apostolic Constitutions 2.53",
        date: "Late fourth century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "Constitutiones apostolorum 2.53",
        url: "https://www.newadvent.org/fathers/07152.htm",
      },
    ],
  },
  {
    slug: "matthew-5-44",
    reference: "Matthew 5:44",
    summary:
      "The KJV's longer wording combines three elements that travel independently: “bless them that curse you”, “do good to them that hate you”, and the fuller prayer clause. The full combination stands in Codex Bezae, Washingtonianus, six further named uncials, Family 13 and the Byzantine tradition, and in the Apostolic Constitutions. Sinaiticus, Vaticanus, Old Latin k, the Old Syriac and mae-2 carry the short endpoint.",
    unit: "Three independent clauses: A “bless them that curse you”, B “do good to them that hate you”, and C the object of the prayer clause.",
    scope: WILLKER_SCOPE,
    snapshot: {
      greekSupport:
        "13 named Greek witnesses plus Family 13 and the Byzantine tradition carry the full combination",
      greekAgainst: "7 named Greek witnesses plus Family 1 carry the short endpoint",
      supportCategory: "Byzantine and fifth-century Greek support across all three clauses",
      mainEvidenceAgainst: [
        "Codex Sinaiticus (01)",
        "Codex Vaticanus (03)",
        "Old Latin k",
        "Old Syriac Sinaitic and Curetonian",
      ],
    },
    sources: [
      { ...WILLKER_MATTHEW, locator: "TVU 45, PDF p. 82" },
      INTF_LISTE,
      VETUS_LATINA,
      BL_CURETONIAN,
      {
        ...WILLKER_MAE2,
        locator: "Identity and date of mae-2 (Schøyen MS 2650)",
      },
      {
        label: "New Advent Fathers of the Church",
        url: "https://www.newadvent.org/fathers/",
        locator: "Didache 1.3; Athenagoras, Legatio 11; Apostolic Constitutions 1.2",
      },
    ],
    notes: [
      "Old Latin is divided across the three clauses: d, h, f and c carry the full endpoint, k is short, and several others carry only selected elements.",
    ],
    units: [
      {
        id: "clause-a",
        label: "Clause A — “bless them that curse you”",
        reading: "εὐλογεῖτε τοὺς καταρωμένους ὑμᾶς",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses: "05 019 032 037 038 042 047 33 118 372 700 892 1071 2737",
            aggregates: "Family 13 · Byz · lectionaries cited collectively",
          },
          {
            label: "Old Latin",
            tone: "support",
            witnesses: "d (VL5) h (VL12) f (VL10) c (VL6)",
          },
          {
            label: "Coptic and other versions",
            tone: "support",
            witnesses: "Bohairic-part Georgian-1",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses: "01 03 22 279 660* 1192 2786*",
            aggregates: "Family 1",
          },
          {
            label: "Old Latin and Vulgate",
            tone: "competing",
            witnesses: "k (VL1) a (VL3) b (VL4) aur (VL15) ff1 (VL9) l (VL11) g1 (VL7)",
            aggregates: "Vulgate tradition",
          },
          {
            label: "Syriac and Coptic",
            tone: "competing",
            witnesses: "Sinaitic Curetonian Sahidic Bohairic-strand mae-2",
          },
          { label: "Lacunose", tone: "neutral", witnesses: "04" },
        ],
      },
      {
        id: "clause-b",
        label: "Clause B — “do good to them that hate you”",
        reading: "καλῶς ποιεῖτε τοῖς μισοῦσιν ὑμᾶς",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses: "05 019 032 037 038 042 047 33 118 372 700 892 1230 1242* 2737",
            aggregates: "Family 13 · Byz",
          },
          {
            label: "Old Latin and Vulgate",
            tone: "support",
            witnesses:
              "a (VL3) b (VL4) aur (VL15) ff1 (VL9) l (VL11) g1 (VL7) d (VL5) h (VL12) f (VL10) c (VL6)",
            aggregates: "Vulgate tradition · Armenian manuscripts",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses: "01 03 22 279 660* 1071 1192 2786*",
            aggregates: "Family 1",
          },
          {
            label: "Old Latin, Syriac and Coptic",
            tone: "competing",
            witnesses: "k (VL1) Sinaitic Curetonian Sahidic Bohairic-strand mae-2",
          },
          { label: "Lacunose", tone: "neutral", witnesses: "04" },
        ],
      },
      {
        id: "clause-c",
        label: "Clause C — object of the prayer clause",
        reading: "…ὑπὲρ τῶν ἐπηρεαζόντων ὑμᾶς καὶ διωκόντων ὑμᾶς",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses: "05 019 032 037 038 042 047 33 118 372 700 892 2737",
            aggregates: "Family 13 · Byz",
          },
          {
            label: "Syriac",
            tone: "support",
            witnesses: "Peshitta Harklean",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "“despitefully use” only",
            witnesses: "1230 1241",
            aggregates: "Gothic · lectionaries cited collectively",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            reading: "καὶ προσεύχεσθε ὑπὲρ τῶν διωκόντων ὑμᾶς",
            witnesses: "01 03",
            aggregates: "Family 1",
          },
          {
            label: "Syriac and Coptic",
            tone: "competing",
            witnesses: "Sinaitic Curetonian Sahidic",
          },
          { label: "Lacunose", tone: "neutral", witnesses: "04" },
        ],
      },
    ],
    fathers: [
      {
        author: "Didache",
        work: "Didache 1.3",
        date: "Late first / early second century",
        use: "Parallel tradition",
        reading: "Supporting witness",
        locator: "Didache 1.3",
        url: "https://www.newadvent.org/fathers/0714.htm",
      },
      {
        author: "Athenagoras",
        work: "Plea for the Christians 11",
        date: "c. AD 177",
        use: "Close quotation",
        reading: "Supporting witness",
        locator: "Legatio pro Christianis 11",
        url: "https://www.newadvent.org/fathers/0205.htm",
      },
      {
        author: "Theophilus of Antioch",
        work: "To Autolycus 3.14",
        date: "Late second century",
        use: "Allusion",
        reading: "Supporting witness",
        locator: "Ad Autolycum 3.14",
        url: "https://www.newadvent.org/fathers/02043.htm",
      },
      {
        author: "Clement of Alexandria",
        work: "Stromata 4",
        date: "c. AD 200",
        use: "Close quotation",
        reading: "Supporting witness",
        locator: "Stromateis 4",
      },
      {
        author: "Cyprian",
        work: "Testimonies 3.49",
        date: "c. AD 248–249",
        use: "Direct quotation",
        reading: "Competing witness",
        locator: "Ad Quirinum 3.49",
        url: "https://www.newadvent.org/fathers/050712c.htm",
      },
      {
        author: "Apostolic Constitutions",
        work: "Apostolic Constitutions 1.2",
        date: "Late fourth century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "Constitutiones apostolorum 1.2",
        url: "https://www.newadvent.org/fathers/07151.htm",
      },
    ],
  },
  {
    slug: "matthew-6-13",
    reference: "Matthew 6:13",
    summary:
      "The doxology stands in Washingtonianus, Rossanensis, Regius, six further named uncials, Family 13 and the Byzantine tradition, and Chrysostom expounds it in full in the late fourth century. Sinaiticus, Vaticanus, Bezae and a fourth-century Greek ostracon end the prayer at “evil”, and the Didache, Sahidic, Fayyumic and Curetonian carry partial doxologies.",
    unit: "The closing doxology: kingdom, power, glory, for ever, Amen — against partial doxologies, Trinitarian expansions, and no doxology.",
    scope: WILLKER_SCOPE,
    snapshot: {
      greekSupport:
        "12 named Greek witnesses plus Family 13 and the Byzantine tradition in Willker's apparatus",
      greekAgainst: "13 named Greek witnesses plus Family 1",
      supportCategory: "Byzantine, Syriac and Gothic support",
      mainEvidenceAgainst: [
        "Codex Sinaiticus (01)",
        "Codex Vaticanus (03)",
        "Codex Bezae (05)",
        "Fourth-century Megara ostracon",
      ],
    },
    sources: [
      { ...WILLKER_MATTHEW, locator: "TVU 55, PDF p. 99" },
      INTF_LISTE,
      VETUS_LATINA,
      {
        ...BL_CURETONIAN,
        locator:
          "Physical date of the Curetonian manuscript, c. AD 450–470 (Curetonian carries the partial kingdom + glory + Amen doxology)",
      },
      {
        ...WILLKER_MAE2,
        locator: "Identity and date of mae-1 (Codex Scheide) and mae-2 (Schøyen MS 2650)",
      },
      {
        label: "New Advent Fathers of the Church",
        url: "https://www.newadvent.org/fathers/",
        locator: "Didache 8.2; Tertullian, De oratione 8; Chrysostom, Hom. in Matt. 19.10",
      },
      {
        label: "Origen, On Prayer (CCEL)",
        url: "https://www.ccel.org/ccel/origen/prayer.xx.html",
        locator: "De oratione 19",
      },
    ],
    notes: [
      "Sahidic and Fayyumic read power, glory, for ever and Amen without “kingdom”; Curetonian reads kingdom, glory and Amen without “power”.",
      "The Clementine Vulgate's Amen-only reading belongs to a printed 1592 edition.",
    ],
    units: [
      {
        id: "doxology",
        label: "The closing doxology",
        reading: "ὅτι σοῦ ἐστιν ἡ βασιλεία καὶ ἡ δύναμις καὶ ἡ δόξα εἰς τοὺς αἰῶνας. ἀμήν",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses: "011 017 019 032 037 038 041 042 0233 33 565 892",
            aggregates: "Family 13 · Byz · many later minuscules and lectionaries",
          },
          {
            label: "Old Latin",
            tone: "support",
            witnesses: "f (VL10) q (VL13)",
          },
          {
            label: "Syriac, Coptic and other versions",
            tone: "support",
            witnesses: "Peshitta Harklean Christian-Palestinian-Aramaic Bohairic Armenian Georgian Ethiopic Gothic",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "partial doxology",
            witnesses: "1342",
            note: "Kingdom, glory and Amen, without “power”.",
          },
          {
            label: "Old Latin, Syriac and Coptic",
            tone: "related",
            reading: "partial doxology",
            witnesses: "g1 (VL7) k (VL1) Curetonian Sahidic Fayyumic",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "Trinitarian expansion",
            witnesses: "157 225 418 1253",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            reading: "no doxology",
            witnesses: "01 03 05 035 0170 130 372 890 1090C 2701S 2737 2780* 2786",
            aggregates: "Family 1",
          },
          {
            label: "Old Latin and Vulgate",
            tone: "competing",
            witnesses: "a (VL3) b (VL4) h (VL12) aur (VL15) ff1 (VL9) l (VL11) c (VL6)",
            aggregates: "principal Vulgate text",
          },
          {
            label: "Coptic and other evidence",
            tone: "competing",
            witnesses:
              "Bohairic-strand mae-1 mae-2 Syriac-Diatessaron-descendant Megara-ostracon",
            note: "The Megara ostracon is fourth-century Greek and ends at “evil”.",
          },
          { label: "Lacunose", tone: "neutral", witnesses: "04" },
        ],
      },
    ],
    fathers: [
      {
        author: "Didache",
        work: "Didache 8.2",
        date: "Late first / early second century",
        use: "Parallel tradition",
        reading: "Supporting witness",
        locator: "Didache 8.2",
        url: "https://www.newadvent.org/fathers/0714.htm",
      },
      {
        author: "Tertullian",
        work: "On Prayer 8",
        date: "Early third century",
        use: "Direct quotation",
        reading: "Competing witness",
        locator: "De oratione 8",
        url: "https://www.newadvent.org/fathers/0322.htm",
      },
      {
        author: "Origen",
        work: "On Prayer 19",
        date: "c. AD 233",
        use: "Direct quotation",
        reading: "Competing witness",
        locator: "De oratione 19",
        url: "https://www.ccel.org/ccel/origen/prayer.xx.html",
      },
      {
        author: "Cyprian",
        work: "On the Lord's Prayer 27",
        date: "Mid third century",
        use: "Direct quotation",
        reading: "Competing witness",
        locator: "De dominica oratione 27",
        url: "https://www.newadvent.org/fathers/050704.htm",
      },
      {
        author: "Acts of Thomas",
        work: "Acts of Thomas 144",
        date: "Early third century",
        use: "Parallel tradition",
        reading: "Competing witness",
        locator: "Acta Thomae 144, printed at Willker TVU 55",
      },
      {
        author: "Apostolic Constitutions",
        work: "Apostolic Constitutions 7.24",
        date: "Late fourth century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "Constitutiones apostolorum 7.24",
        url: "https://www.newadvent.org/fathers/07157.htm",
      },
      {
        author: "John Chrysostom",
        work: "Homilies on Matthew 19.10",
        date: "Late fourth century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "Homiliae in Matthaeum 19.10",
        url: "https://www.newadvent.org/fathers/200119.htm",
      },
    ],
  },
  {
    slug: "matthew-17-21",
    reference: "Matthew 17:21",
    summary:
      "The verse stands in Codex Ephraemi, Bezae, Washingtonianus, Regius, Monacensis, Sangallensis, Families 1 and 13 and the Byzantine tradition, with broad Latin, Syriac and Middle-Egyptian support, and Origen quotes it exactly in a third-century Commentary on Matthew. It is absent from the first hands of Sinaiticus and Vaticanus, from Koridethi, and from several early versions.",
    unit: "Presence of the whole verse: τοῦτο δὲ τὸ γένος οὐκ ἐκπορεύεται εἰ μὴ ἐν προσευχῇ καὶ νηστείᾳ.",
    scope: WILLKER_SCOPE,
    snapshot: {
      greekSupport:
        "10 named Greek witnesses plus Families 1 and 13 and the Byzantine tradition in Willker's apparatus",
      greekAgainst: "10 named Greek witnesses in Willker's apparatus",
      supportCategory: "Byzantine, Latin and Syriac support with third-century patristic quotation",
      mainEvidenceAgainst: [
        "Codex Sinaiticus first hand (01*)",
        "Codex Vaticanus (03)",
        "Codex Koridethi (038)",
        "Middle Egyptian mae-2",
      ],
    },
    sources: [
      { ...WILLKER_MATTHEW, locator: "TVU 230, PDF p. 362" },
      {
        ...LAPAROLA,
        locator: "Matthew 17:21 — lectionary 253 (dated 1020) listed as omission",
      },
      INTF_LISTE,
      VETUS_LATINA,
      BL_CURETONIAN,
      {
        label: "New Advent Fathers of the Church",
        url: "https://www.newadvent.org/fathers/",
        locator: "Pseudo-Clement, First Epistle Concerning Virginity 12; Origen, Comm. in Matt. 13.7; Chrysostom, Hom. in Matt. 57.4",
      },
      {
        label: "Beth Mardutho, Gorgias Encyclopedic Dictionary of the Syriac Heritage",
        url: "https://gedsh.bethmardutho.org/Clement-of-Rome-and-Pseudo-Clementine-literature",
        locator: "Dates the two Pseudo-Clementine letters on virginity to the late third or early fourth century",
      },
      {
        label: "Wieland Willker, study of Middle Egyptian mae-2 (Schøyen MS 2650)",
        url: "https://www.willker.de/wie/TCG/Mt-mae-2.pdf",
        locator: "Identity and date of mae-2",
      },
      {
        label: "Tyndale Bulletin study of the Schøyen Middle Egyptian codex (mae-2)",
        url: "https://www.galaxie.com/article/tynbul65-1-11",
        locator: "Orientation on the identity and early-fourth-century date of mae-2",
      },
    ],
    notes: [
      "Do not confuse the correction of Sinaiticus (01C), which carries a related long form, with Codex Koridethi (Θ / GA 038), which omits the verse.",
      "mae-1 (Codex Scheide) contains the verse and mae-2 (Schøyen MS 2650) omits it.",
      "Lectionary 253, dated 1020, omits the verse.",
    ],
    units: [
      {
        id: "verse",
        label: "Presence of the whole verse",
        reading: "τοῦτο δὲ τὸ γένος οὐκ ἐκπορεύεται εἰ μὴ ἐν προσευχῇ καὶ νηστείᾳ",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses: "04 05 019 032 033 037 22 372 700 2737",
            aggregates: "Family 1 · Family 13 (most members) · Byz",
          },
          {
            label: "Old Latin, Vulgate and Syriac",
            tone: "support",
            aggregates: "broad Old Latin · Vulgate tradition · Peshitta · Harklean",
          },
          {
            label: "Coptic and other versions",
            tone: "support",
            witnesses: "mae-1 Bohairic-strand Armenian Georgian-B Ethiopic-TH",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "the verse with a different verb (ἐκβάλλεται / ἐξέρχεται)",
            witnesses: "01C 118 205 209 892mg",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses: "01* 03 038 0281 33 579 788 892* 1604 2680",
          },
          {
            label: "Old Latin, Syriac and Coptic",
            tone: "competing",
            witnesses:
              "e (VL2) ff1 (VL9) Sinaitic Curetonian Christian-Palestinian-Aramaic Sahidic Bohairic-strand mae-2",
          },
          {
            label: "Other versions and lectionaries",
            tone: "competing",
            witnesses: "Georgian-A Ethiopic-manuscript L253",
          },
        ],
      },
    ],
    fathers: [
      {
        author: "Pseudo-Clement",
        work: "First Epistle Concerning Virginity 12",
        date: "Late third or early fourth century",
        use: "Parallel tradition",
        reading: "Supporting witness",
        locator:
          "Book I, chapter 12: ‘This kind goes not out but by fasting and prayer’; the wording may reflect Matthew 17:21, Mark 9:29, or harmonization",
        url: "https://www.newadvent.org/fathers/0803.htm",
        transmission: "Surviving Syriac transmission",
      },
      {
        author: "Origen",
        work: "Commentary on Matthew 13.7",
        date: "Mid third century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "Commentarium in Matthaeum 13.7",
        url: "https://www.newadvent.org/fathers/101613.htm",
      },
      {
        author: "John Chrysostom",
        work: "Homilies on Matthew 57.4",
        date: "Late fourth century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "Homiliae in Matthaeum 57.4",
        url: "https://www.newadvent.org/fathers/200157.htm",
      },
    ],
  },
  {
    slug: "matthew-18-11",
    reference: "Matthew 18:11",
    summary:
      "The exact KJV wording stands in Codex Bezae, Washingtonianus, Petropolitanus Purpureus, Rossanensis, 078, the correctors of Koridethi and Family 1, and the Byzantine tradition, and Chrysostom quotes it in immediate Matthew 18 context. Sinaiticus and Vaticanus omit the verse, and a Luke-like expansion with “seek and” circulates in a further group of Greek and Syriac witnesses.",
    unit: "Three states: the exact KJV wording, a Luke-expanded form adding ζητῆσαι καί (“seek and”), and omission.",
    scope: WILLKER_SCOPE,
    snapshot: {
      greekSupport:
        "11 named Greek witnesses plus the Byzantine tradition in Willker's apparatus",
      greekAgainst:
        "16 named Greek witnesses plus Family 1 and much of Family 13",
      supportCategory: "Byzantine and fifth-century Greek support",
      mainEvidenceAgainst: [
        "Codex Sinaiticus (01)",
        "Codex Vaticanus (03)",
        "Codex Regius first hand (019*)",
        "Family 13 member 788",
      ],
    },
    sources: [
      { ...WILLKER_MATTHEW, locator: "TVU 237, PDF p. 377" },
      {
        ...LAPAROLA,
        locator: "Matthew 18:11 — subvariant separation for the ζητῆσαι καί expansion",
      },
      INTF_LISTE,
      VETUS_LATINA,
      BL_CURETONIAN,
      {
        ...WILLKER_MAE2,
        locator: "Identity and date of mae-1 (Codex Scheide) and mae-2 (Schøyen MS 2650)",
      },
      {
        label: "New Advent Fathers of the Church",
        url: "https://www.newadvent.org/fathers/",
        locator: "Chrysostom, Hom. in Matt. 59.4",
      },
    ],
    notes: [
      "The Syriac Harklean and the corrected/marginal state of Regius carry the expanded form, not the exact KJV wording.",
      "Family 1 is split: the corrector of 1 has the exact wording while its first hand omits; within Family 13, 346 expands and 788 omits.",
    ],
    units: [
      {
        id: "verse",
        label: "Presence and form of the verse",
        reading: "ἦλθεν γὰρ ὁ υἱὸς τοῦ ἀνθρώπου σῶσαι τὸ ἀπολωλός",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses: "05 022 032 038C 042 078V 1C 22 372 700 2737",
            aggregates: "Byz",
          },
          {
            label: "Latin, Syriac and Coptic",
            tone: "support",
            aggregates:
              "much Old Latin · Vulgate tradition · Curetonian · Peshitta · a Bohairic strand",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "ζητῆσαι καὶ σῶσαι — the Luke-expanded form",
            witnesses: "011 019C 021 157 346 579 713 892mg",
            aggregates:
              "about 250 later manuscripts cited collectively · Syriac Harklean · a Bohairic strand · Ethiopic evidence",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses: "01 03 019* 038* 9 33 146 556 837 892* 899* 929* 1294 1502 2317 2680",
            aggregates: "Family 1 · much of Family 13",
          },
          {
            label: "Old Latin, Syriac and Coptic",
            tone: "competing",
            witnesses:
              "e (VL2) ff1 (VL9) Sinaitic Christian-Palestinian-Aramaic Sahidic Bohairic-strand mae-1 mae-2 Georgian-2A",
          },
          { label: "Lacunose", tone: "neutral", witnesses: "04" },
        ],
      },
    ],
    fathers: [
      {
        author: "John Chrysostom",
        work: "Homilies on Matthew 59.4",
        date: "Late fourth century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "Homiliae in Matthaeum 59.4",
        url: "https://www.newadvent.org/fathers/200159.htm",
      },
      {
        author: "Clement of Alexandria",
        work: "Stromata 3",
        date: "c. AD 200",
        use: "Allusion",
        reading: "Supporting witness",
        locator: "Stromateis 3",
      },
      {
        author: "Apostolic Constitutions",
        work: "Apostolic Constitutions 2",
        date: "Late fourth century",
        use: "Close quotation",
        reading: "Supporting witness",
        locator: "Constitutiones apostolorum 2",
        url: "https://www.newadvent.org/fathers/07152.htm",
      },
    ],
  },
  {
    slug: "matthew-19-16-17",
    reference: "Matthew 19:16–17",
    summary:
      "Verses 16 and 17 vary independently. The exact KJV pair is the Byzantine form, carried by Codex Ephraemi, Cyprius, Washingtonianus, Sangallensis, Family 13 and a substantial minuscule group. Sinaiticus, Vaticanus, Bezae and Regius carry the competing pair, and Koridethi, 700, much of the Latin tradition and the Old Syriac combine a traditional verse 16 with a competing verse 17.",
    unit: "Two coupled units: the address in verse 16 (“Good Master”) and the answer in verse 17 (“Why callest thou me good? none is good but one, that is, God”).",
    scope: WILLKER_SCOPE,
    snapshot: {
      greekSupport:
        "16 named Greek witnesses at verse 16 and 13 at verse 17, plus Family 13 and the Byzantine tradition",
      greekAgainst:
        "6 named Greek witnesses at verse 16 and 10 at verse 17, plus Family 1",
      supportCategory: "Byzantine support at both units",
      mainEvidenceAgainst: [
        "Codex Sinaiticus (01)",
        "Codex Vaticanus (03)",
        "Codex Bezae (05)",
        "Codex Regius (019)",
      ],
    },
    sources: [
      { ...WILLKER_MATTHEW, locator: "TVU 257, PDF p. 403" },
      INTF_LISTE,
      VETUS_LATINA,
      BL_CURETONIAN,
      {
        ...WILLKER_MAE2,
        locator: "Identity and date of mae-1 (Codex Scheide)",
      },
      {
        label: "New Advent Fathers of the Church",
        url: "https://www.newadvent.org/fathers/",
        locator: "Augustine, De consensu evangelistarum 2.63",
      },
    ],
    notes: [
      "Codex Bezae omits λέγεις in verse 17 and therefore carries a partial form there.",
      "The Latin tradition adds “God” or “Father” at the end of verse 17; only a and d omit it.",
    ],
    units: [
      {
        id: "v16",
        label: "Verse 16 — the address to Jesus",
        reading: "διδάσκαλε ἀγαθέ, τί ἀγαθὸν ποιήσω…",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses: "04 017 032 037 038 28 33 118 372 565 579 700 892mg 1071 1241 2737",
            aggregates: "Family 13 · Byz",
          },
          {
            label: "Syriac and Coptic",
            tone: "support",
            witnesses: "Sinaitic Curetonian Christian-Palestinian-Aramaic Bohairic-strand mae-1",
          },
          {
            label: "Latin",
            tone: "support",
            aggregates: "much of the Latin tradition",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            reading: "διδάσκαλε, τί ἀγαθὸν ποιήσω…",
            witnesses: "01 03 05 019 22 892*",
            aggregates: "Family 1 · several further manuscripts cited collectively",
          },
          {
            label: "Old Latin, Coptic and other versions",
            tone: "competing",
            witnesses: "Bohairic-strand Georgian Ethiopic",
            aggregates: "some Old Latin",
          },
        ],
      },
      {
        id: "v17",
        label: "Verse 17 — the answer of Jesus",
        reading: "τί με λέγεις ἀγαθόν; οὐδεὶς ἀγαθὸς εἰ μὴ εἷς ὁ θεός",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses: "04 017 032 037 28 33 118 372 565 1071 1241 1424 2737",
            aggregates: "Family 13 · Byz",
          },
          {
            label: "Syriac and Coptic",
            tone: "support",
            witnesses: "Peshitta Harklean Sahidic",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "the traditional answer without λέγεις",
            witnesses: "05",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            reading: "τί με ἐρωτᾷς περὶ τοῦ ἀγαθοῦ; εἷς ἐστιν ὁ ἀγαθός",
            witnesses: "01 03C 05 019 038 22 700 892* 1192* 1424mg",
            aggregates: "Family 1 · five further manuscripts cited collectively",
          },
          {
            label: "Syriac and Coptic",
            tone: "competing",
            witnesses: "Sinaitic Curetonian Christian-Palestinian-Aramaic Bohairic-strand mae-1",
          },
          {
            label: "Old Latin",
            tone: "competing",
            witnesses: "a (VL3) d (VL5)",
          },
          {
            label: "Latin",
            tone: "related",
            reading: "the competing question with “God” or “Father” added at the end",
            aggregates: "Latin tradition",
          },
        ],
      },
    ],
    fathers: [
      {
        author: "Justin Martyr",
        work: "First Apology 16.7 and Dialogue with Trypho 101.2",
        date: "c. AD 155–165",
        use: "Close quotation",
        reading: "Supporting witness",
        locator: "Both citations printed at Willker TVU 257",
      },
      {
        author: "Clement of Alexandria",
        work: "Paedagogus 1.8 and Stromata 5.63.8",
        date: "c. AD 200",
        use: "Close quotation",
        reading: "Supporting witness",
        locator: "Paedagogus 1.8; Stromateis 5.63.8",
      },
      {
        author: "Origen",
        work: "Commentary on Matthew 15.14",
        date: "Mid third century",
        use: "Direct quotation",
        reading: "Competing witness",
        locator: "Commentarium in Matthaeum 15.14",
      },
      {
        author: "Augustine",
        work: "Harmony of the Gospels 2.63",
        date: "c. AD 400",
        use: "Textual comment",
        reading: "Supporting witness",
        locator: "De consensu evangelistarum 2.63",
        url: "https://www.newadvent.org/fathers/1602263.htm",
      },
    ],
  },
  {
    slug: "matthew-23-14",
    reference: "Matthew 23:14",
    summary:
      "The verse stands in Washingtonianus, Sangallensis, 0102, 0107, 0233, Family 13, twelve further minuscules and the Byzantine tradition, and Chrysostom quotes and expounds it. Sinaiticus, Vaticanus, Bezae, Regius and several early versions omit it. Its placement also varies: some witnesses put it after the woe now numbered 13, others before it.",
    unit: "Two coupled questions: presence of the verse, and its position relative to the woe now numbered 13.",
    scope: WILLKER_SCOPE,
    snapshot: {
      greekSupport:
        "17 named Greek witnesses plus Family 13 and the Byzantine tradition in Willker's apparatus",
      greekAgainst: "8 named Greek witnesses plus Family 1",
      supportCategory: "Byzantine and Syriac support with fourth-century patristic quotation",
      mainEvidenceAgainst: [
        "Codex Sinaiticus (01)",
        "Codex Vaticanus (03)",
        "Codex Bezae (05)",
        "Codex Regius (019)",
      ],
    },
    sources: [
      { ...WILLKER_MATTHEW, locator: "TVU 324, PDF p. 521" },
      {
        ...LAPAROLA,
        locator: "Matthew 23:14 — presence and verse-order subvariants",
      },
      INTF_LISTE,
      VETUS_LATINA,
      BL_CURETONIAN,
      {
        ...WILLKER_MAE2,
        locator: "Identity and date of mae-1 (Codex Scheide) and mae-2 (Schøyen MS 2650)",
      },
      {
        label: "New Advent Fathers of the Church",
        url: "https://www.newadvent.org/fathers/",
        locator: "Chrysostom, Hom. in Matt. 73; Arabic Diatessaron 40.42",
      },
    ],
    notes: [
      "The principal Vulgate text omits the verse while later Vulgate manuscripts include it.",
    ],
    units: [
      {
        id: "presence",
        label: "Presence of the verse",
        reading:
          "οὐαὶ δὲ ὑμῖν, γραμματεῖς καὶ Φαρισαῖοι, ὑποκριταί, ὅτι κατεσθίετε τὰς οἰκίας τῶν χηρῶν…",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses:
              "032 036 037 0102 0107 0233 22 28 157 372 565 579 700 892C 1071 1241 1424",
            aggregates: "Family 13 · Byz",
          },
          {
            label: "Old Latin and Vulgate",
            tone: "support",
            witnesses: "b (VL4) c (VL6) f (VL10) ff2 (VL8) h (VL12) l (VL11) r1 (VL14)",
            aggregates: "some Vulgate manuscripts",
          },
          {
            label: "Syriac and Coptic",
            tone: "support",
            witnesses: "Curetonian Peshitta Harklean Christian-Palestinian-Aramaic Bohairic-manuscripts",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses: "01 03 05 019 035 038 33 892*",
            aggregates: "Family 1 · further manuscripts cited collectively",
          },
          {
            label: "Old Latin and Vulgate",
            tone: "competing",
            witnesses: "a (VL3) aur (VL15) d (VL5) e (VL2) ff1 (VL9) g1 (VL7)",
            aggregates: "principal Vulgate text",
          },
          {
            label: "Syriac, Coptic and other versions",
            tone: "competing",
            witnesses:
              "Sinaitic Christian-Palestinian-Aramaic-manuscript Sahidic Bohairic-strand mae-1 mae-2 Armenian Georgian",
          },
          { label: "Lacunose", tone: "neutral", witnesses: "04" },
        ],
      },
      {
        id: "order",
        label: "Position relative to the woe now numbered 13",
        reading: "verse 13 then verse 14",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            reading: "after verse 13",
            witnesses: "0233 2C 372",
            aggregates: "Family 13 · some further Greek manuscripts",
          },
          {
            label: "Old Latin, Syriac and Coptic",
            tone: "support",
            reading: "after verse 13",
            aggregates: "Old Latin witnesses in this order · selected Syriac · selected Bohairic",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "before verse 13",
            witnesses: "032 036 037 0102 0107 579 700 892C 2737",
            aggregates: "Byz",
          },
          {
            label: "Old Latin, Syriac and Coptic",
            tone: "related",
            reading: "before verse 13",
            witnesses: "f (VL10) Peshitta Harklean Bohairic-strand",
          },
        ],
      },
    ],
    fathers: [
      {
        author: "John Chrysostom",
        work: "Homilies on Matthew 73",
        date: "Late fourth century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "Homiliae in Matthaeum 73",
        url: "https://www.newadvent.org/fathers/200173.htm",
      },
      {
        author: "Arabic Diatessaron",
        work: "Arabic Diatessaron 40.42",
        date: "Harmony tradition",
        use: "Parallel tradition",
        reading: "Supporting witness",
        locator: "Arabic Diatessaron 40.42",
        url: "https://www.newadvent.org/fathers/100240.htm",
      },
    ],
  },
  {
    slug: "matthew-27-35",
    reference: "Matthew 27:35",
    summary:
      "The fulfilment clause stands in Sangallensis, Koridethi, Beratinus, 0233, 0250, Family 1, much of Family 13, ten further minuscules and lectionary 844, together with six Old Latin witnesses, the Syriac Harklean, Armenian, Georgian and mae-1. Eusebius quotes the whole clause and attributes it to Matthew in the early fourth century. Sinaiticus, Alexandrinus, Vaticanus, Bezae, Washingtonianus and the Byzantine tradition omit it.",
    unit: "Presence of the fulfilment formula and the Psalm 22:18 quotation after “and parted his garments, casting lots”.",
    scope:
      "Willker's selected Matthew apparatus with the primary transcription control for Matthew 27:35, which fixes the Greek sigla that PDF extraction distorts.",
    snapshot: {
      greekSupport:
        "16 named Greek witnesses plus Family 1, much of Family 13 and lectionary 844",
      greekAgainst:
        "7 named Greek witnesses plus the Byzantine tradition",
      supportCategory: "Old Latin, Θ/Δ/Φ and early patristic support",
      mainEvidenceAgainst: [
        "Codex Sinaiticus (01)",
        "Codex Alexandrinus (02)",
        "Codex Vaticanus (03)",
        "Codex Bezae (05)",
        "Codex Washingtonianus (032)",
      ],
    },
    sources: [
      { ...WILLKER_MATTHEW, locator: "TVU 386, PDF p. 623" },
      {
        label: "greeknewtestament.net transcription control, Matthew 27:35",
        url: "https://greeknewtestament.net/mt27-35",
        locator: "Matthew 27:35 supporting and omitting sigla",
      },
      INTF_LISTE,
      VETUS_LATINA,
      {
        ...BL_CURETONIAN,
        locator:
          "Physical date of the Curetonian manuscript, c. AD 450–470; it is lacunose at Matthew 27:35",
      },
      {
        ...WILLKER_MAE2,
        locator: "Identity and date of mae-1 (Codex Scheide)",
      },
      {
        label: "Eusebius, Demonstratio Evangelica, book 10",
        url: "https://demonax.info/doku.php?id=text:demonstration_of_the_gospel_book_10",
        locator: "Demonstratio Evangelica 10.8",
      },
    ],
    notes: [
      "Codex Bezae (D/05) omits the clause; the supporting uncials are Δ (037), Θ (038) and Φ (043).",
      "The earliest surviving Greek support is Φ/043 in the sixth century; Eusebius and Old Latin a are earlier.",
      "Family 13 is split: 174 and 828 omit, and 983 places the clause after verse 36.",
    ],
    units: [
      {
        id: "fulfilment",
        label: "Presence of the fulfilment formula and Psalm quotation",
        reading:
          "ἵνα πληρωθῇ τὸ ῥηθὲν ὑπὸ τοῦ προφήτου· διεμερίσαντο τὰ ἱμάτιά μου ἑαυτοῖς καὶ ἐπὶ τὸν ἱματισμόν μου ἔβαλον κλῆρον",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses:
              "037 038 043 0233 0250 2C 22 372 517 652 954 1071 1243 1424 1675 2737",
            aggregates: "Family 1 · Family 13 (much of the family)",
          },
          { label: "Lectionaries", tone: "support", witnesses: "L844" },
          {
            label: "Old Latin",
            tone: "support",
            witnesses: "a (VL3) aur (VL15) b (VL4) c (VL6) h (VL12) q (VL13)",
          },
          {
            label: "Syriac, Coptic and other versions",
            tone: "support",
            witnesses: "Harklean Christian-Palestinian-Aramaic Armenian Georgian mae-1",
          },
          {
            label: "Printed editions",
            tone: "related",
            witnesses: "Clementine-Vulgate-1592",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "the clause placed after verse 36",
            witnesses: "983",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "a Mark 15:24-like ἐπ’ αὐτά with deletion dots",
            witnesses: "892*",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses: "01 02 03 05 032 174 828",
            aggregates: "Byz",
          },
          {
            label: "Old Latin and Vulgate",
            tone: "competing",
            witnesses: "d (VL5) f (VL10) ff1 (VL9) ff2 (VL8) g1 (VL7) l (VL11)",
            aggregates: "principal Vulgate text",
          },
          {
            label: "Syriac and Coptic",
            tone: "competing",
            witnesses: "Peshitta",
            aggregates: "other Coptic evidence",
          },
          {
            label: "Lacunose",
            tone: "neutral",
            witnesses: "04 Curetonian",
          },
        ],
      },
    ],
    fathers: [
      {
        author: "Eusebius of Caesarea",
        work: "Demonstratio Evangelica 10.8",
        date: "Early fourth century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "Demonstratio Evangelica 10.8",
        url: "https://demonax.info/doku.php?id=text:demonstration_of_the_gospel_book_10",
      },
    ],
  },

  {
    slug: "mark-1-2",
    reference: "Mark 1:2",
    summary:
      "“In the prophets” is carried by Washingtonianus, twenty further named Greek entries, lectionary 547 and the Byzantine reconstructed witness, together with the Harklean and Ethiopic states. Asterius, Germanus, Photius and the Latin transmission of Irenaeus quote it directly. The Isaiah attribution stands in Sinaiticus, Vaticanus, Bezae, Koridethi and a large minuscule group, and is quoted by the Greek Irenaeus fragment, Origen, Basil and Epiphanius.",
    unit: "Mark 1:2/8–14: “in the prophets” against the two Isaiah forms and two further attributions.",
    scope: DECM_SCOPE,
    snapshot: {
      greekSupport:
        "21 named Greek entries plus a lectionary and the Byzantine reconstructed witness in the ECM Mark selected corpus",
      greekAgainst:
        "10 named entries for the articled Isaiah form and 27 for the anarthrous Isaiah form",
      supportCategory: "Byzantine reconstructed witness and a broad later Greek group",
      mainEvidenceAgainst: [
        "Codex Sinaiticus (01)",
        "Codex Vaticanus (03)",
        "Codex Bezae (05)",
        "Codex Koridethi (038)",
      ],
    },
    sources: [
      { ...DECM, url: "https://ntvmr.uni-muenster.de/ecm?segment=8-14&verse=Mark.1.2", locator: "Mark 1:2/8–14" },
      INTF_LISTE,
      INTF_PATRISTIC,
      {
        label: "INTF official list of passages with a split guiding line",
        url: "https://www.uni-muenster.de/imperia/md/content/INTF/passages_with_a_split_guiding_line.pdf",
        locator: "Mark 1:2/2 and 1:2/43",
      },
    ],
    units: [
      {
        id: "attribution",
        label: "Mark 1:2/8–14 — the prophetic attribution",
        reading: "τοῖς προφήταις",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses:
              "032 13 28 69 124 346 427 543 579 732 788 792r 826 828 837 983 1342 1424 1689 2193A 2542",
            aggregates: "Byz · [791r L60r L387]r",
          },
          { label: "Lectionaries", tone: "support", witnesses: "L547" },
          {
            label: "Versional states",
            tone: "support",
            witnesses: "L:Ialt S:Hᵀ Ä",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            reading: "τῷ Ἠσαΐᾳ τῷ προφήτῃ",
            witnesses: "01 03 019r 037 33 222 565 728 892 1241",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            reading: "Ἠσαΐᾳ τῷ προφήτῃ",
            witnesses:
              "05 038 1 61 131 152 176r 184 205 209 348 372 555 700r 829 872*V 873 1071r 1243 1279 1579 1582r 2174 2193* 2486 2737 2886",
          },
          { label: "Lectionaries", tone: "competing", witnesses: "L844 L2211" },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "βίβλῳ λόγων Ἠσαΐου τοῦ προφήτου",
            witnesses: "544 1273 2680r",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "προφήτῃ",
            witnesses: "872C",
          },
          {
            label: "Versional states between the two Isaiah forms",
            tone: "neutral",
            witnesses: "L:DIV S:PHM CPA:CL K:SB Go",
          },
          {
            label: "Non-extant at the unit",
            tone: "neutral",
            witnesses: "P137 04 011 055 064 0104 0130 0233 733 807 954 2517 2538 L950",
          },
        ],
      },
    ],
    fathers: [
      {
        author: "Asterius the Sophist",
        work: "Commentary on Psalms 18.4",
        date: "Fourth century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "Richard 129.11, CPG 2815, INTF 12543",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=12543",
      },
      {
        author: "Germanus of Constantinople",
        work: "Historia ecclesiastica 44",
        date: "Eighth century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "Brightman 389.10, CPG 8023, INTF 11703",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=11703",
      },
      {
        author: "Irenaeus",
        work: "Against Heresies 3.10.6",
        date: "c. AD 180",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "SC 211,134.177, INTF 10039",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=10039",
        transmission: "Latin transmission",
      },
      {
        author: "Irenaeus",
        work: "Against Heresies 3.16.3",
        date: "c. AD 180",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "SC 211,298.99, INTF 10044",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=10044",
        transmission: "Latin transmission",
      },
      {
        author: "Photius",
        work: "Contra Manichaeos 4.9",
        date: "Ninth century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "PG 102,196C8, CPG 9700, INTF 11938",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=11938",
      },
      {
        author: "Irenaeus",
        work: "Against Heresies 3.11.8",
        date: "c. AD 180",
        use: "Direct quotation",
        reading: "Competing witness",
        locator: "SC 211,166.38, CPG 1306, INTF 10042",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=10042",
        transmission: "Greek fragment",
      },
      {
        author: "Origen",
        work: "Against Celsus 2.4",
        date: "c. AD 248",
        use: "Direct quotation",
        reading: "Competing witness",
        locator: "Marcovich 80.10, CPG 1476, INTF 11166",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=11166",
      },
      {
        author: "Origen",
        work: "Commentary on John 6.24.128f.",
        date: "Third century",
        use: "Direct quotation",
        reading: "Competing witness",
        locator: "GCS 10,134.20, INTF 10883",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=10883",
      },
      {
        author: "Basil of Caesarea",
        work: "Against Eunomius 2.15",
        date: "c. AD 364",
        use: "Direct quotation",
        reading: "Competing witness",
        locator: "SC 305,58.16, CPG 2837, INTF 10047",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=10047",
      },
      {
        author: "Epiphanius",
        work: "Panarion 51.6.4",
        date: "c. AD 377",
        use: "Direct quotation",
        reading: "Competing witness",
        locator: "GCS 31,255.3, CPG 3745, INTF 9559",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=9559",
      },
      {
        author: "Rufinus's Latin Origen",
        work: "Commentary on Romans 1.5.4",
        date: "Latin translation c. AD 405",
        use: "Indirect report",
        reading: "Competing witness",
        locator: "SC 532,170.3, INTF 10876",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=10876",
        transmission: "Rufinus's Latin translation",
      },
      { author: "Origen", work: "Commentary on John 1.13.81", date: "Third century", use: "Direct quotation", reading: "Competing witness", locator: "GCS 10,18.19, INTF 10886", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=10886" },
      { author: "Pseudo-Athanasius", work: "Synopsis 98", date: "Late antiquity", use: "Direct quotation", reading: "Competing witness", locator: "PG 28,292A1, CPG 2249, INTF 11855", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=11855" },
      { author: "Serapion of Thmuis", work: "Contra Manichaeos 25", date: "Fourth century", use: "Direct quotation", reading: "Competing witness", locator: "Casey HThS 15,41.15, CPG 2485, INTF 9959", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=9959" },
      { author: "Severian of Gabala", work: "In sigillum librorum 5", date: "Late fourth century", use: "Direct quotation", reading: "Competing witness", locator: "PG 63,541.9, CPG 4209, INTF 10588", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=10588" },
      { author: "Titus of Bostra", work: "Manichaean work appendix", date: "Fourth century", use: "Direct quotation", reading: "Competing witness", locator: "Lagarde 81.23, CPG 3575, INTF 9918", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=9918" },
      { author: "Hesychius of Jerusalem", work: "Collection of Difficulties 1", date: "Fifth century", use: "Textual comment", reading: "Competing witness", locator: "PG 93,1392B3 and 1393A1, CPG 6561, INTF 10387 and 11798", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=10387" },
      { author: "Anastasius Sinaita", work: "Quaestiones, embedded Irenaeus material", date: "Seventh century", use: "Derivative use", reading: "Supporting witness", locator: "PG 89,797D8, CPG 7746, INTF 11051", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=11051" },
    ],
  },
  {
    slug: "mark-7-16",
    reference: "Mark 7:16",
    summary:
      "The hearing refrain is carried by Codex Bezae, Washingtonianus, the correction of Sangallensis, Koridethi, thirty further named Greek entries, lectionary 950 and the Byzantine reconstructed witness, with Latin, Old Syriac, Peshitta, Harklean, Christian Palestinian Aramaic, Ethiopic and Gothic support. Sinaiticus, Vaticanus, Regius, the first hand of Sangallensis, 0274, 28, 1342 and 2786 omit it.",
    unit: "Mark 7:16/2–12: presence of εἴ τις ἔχει ὦτα ἀκούειν ἀκουέτω.",
    scope: DECM_SCOPE,
    snapshot: {
      greekSupport:
        "30 named Greek entries plus a bracketed apparatus group and the Byzantine reconstructed witness in the ECM Mark selected corpus",
      greekAgainst: "8 named Greek entries plus five lectionary portions",
      supportCategory: "Byzantine reconstructed witness with broad versional support",
      mainEvidenceAgainst: [
        "Codex Sinaiticus (01)",
        "Codex Vaticanus (03)",
        "Codex Regius (019)",
        "Codex Sangallensis first hand (037*)",
        "Uncial 0274",
      ],
    },
    sources: [
      { ...DECM, url: "https://ntvmr.uni-muenster.de/ecm?segment=2-12&verse=Mark.7.16", locator: "Mark 7:16/2–12" },
      INTF_LISTE,
      INTF_PATRISTIC,
      VETUS_LATINA,
    ],
    notes: [
      "Sangallensis is one codex in two states: 037* omits and 037C includes.",
    ],
    units: [
      {
        id: "refrain",
        label: "Mark 7:16/2–12 — the hearing refrain",
        reading: "εἴ τις ἔχει ὦτα ἀκούειν ἀκουέτω",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses:
              "05 032 037C 038 1 13 33 69 124r 205 209 346 427 543 565r 579 700 732r 788 792 826 828 892 983 1424 1582 1689 2193 2542 2886",
            aggregates:
              "Byz · [017r 043V 261r 273r 513r 1253r 1279r 1446r 1515r 1546r 1593r 2206r 2726r L211-1r L387-1 L770-1 L773-1]",
          },
          { label: "Lectionaries", tone: "support", witnesses: "L950-1" },
          {
            label: "Versional states",
            tone: "support",
            witnesses: "L:DIV S:VSPH CPA:C K:Smss>Bmss Ä Go",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses: "01 03 019 037* 0274 28 1342 2786",
          },
          {
            label: "Lectionaries",
            tone: "competing",
            witnesses: "L211-2 L387-2 L770-2 L773-2 L950-2",
          },
          {
            label: "Versional states",
            tone: "competing",
            witnesses: "K:SmssBmss",
          },
          {
            label: "Patristic sigla on the omission line",
            tone: "competing",
            witnesses: "Adam AetAnt Ath Bas Chrys Did Epiph Eus GregNy IusMar Or",
          },
          {
            label: "Non-extant at the unit",
            tone: "neutral",
            witnesses: "P45 022 055 0131 0292 2517 L60 L547 L563 L2211",
          },
        ],
      },
    ],
    fathers: [],
  },
  {
    slug: "mark-9-29",
    reference: "Mark 9:29",
    summary:
      "“And fasting” is carried by 44 named Greek apparatus entries in the ECM Mark selected corpus, including the correction of Sinaiticus, Codex Ephraemi, Bezae, Regius, Washingtonianus, Koridethi and Athous Lavrensis, together with three lectionaries and the Byzantine reconstructed witness. Two further Greek entries carry related long forms. The short reading is carried by the first hand of Sinaiticus, Vaticanus and 0274.",
    unit: "Whether καὶ νηστείᾳ (“and fasting”) follows προσευχῇ.",
    scope: DECM_SCOPE,
    snapshot: {
      greekSupport:
        "44 named Greek apparatus entries for the exact long reading, 46 with the two related long forms, plus the Byzantine reconstructed witness",
      greekAgainst: "3 named Greek witnesses in the ECM Mark selected corpus",
      supportCategory: "44 named apparatus entries in the ECM Mark selected corpus",
      mainEvidenceAgainst: [
        "Codex Sinaiticus first hand (01*)",
        "Codex Vaticanus (03)",
        "Uncial 0274",
      ],
    },
    sources: [
      { ...DECM, url: "https://ntvmr.uni-muenster.de/ecm?segment=29&verse=Mark.9.29", locator: "Mark 9:29" },
      {
        label: "INTF official list of passages with a split guiding line",
        url: "https://www.uni-muenster.de/imperia/md/content/INTF/passages_with_a_split_guiding_line.pdf",
        locator: "Mark 9:29",
      },
      {
        label: "NTVMR correction record for GA 706 at Mark 9:29",
        url: "https://ntvmr.uni-muenster.de/forum/-/message_boards/view_message/2274649",
        locator: "GA 706",
      },
      INTF_LISTE,
      INTF_PATRISTIC,
    ],
    notes: [
      "The 44 entries count hands, supplements and bracketed apparatus entries.",
      "P45 is lacunose at this unit.",
      "The ECM split guiding line leaves the initial reading open between the two candidates.",
    ],
    units: [
      {
        id: "fasting",
        label: "Whether “and fasting” follows “prayer”",
        reading: "καὶ νηστείᾳ",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses:
              "01C2 04 05 019r 032r 038r 044 1 13 28r 33 69 124 205 209 346 427r 543 565 579 700 706 732 788 792 826 828 892 983 1342 1424 1542S 1582 1689 2193 2542 2886",
            aggregates: "Byz · [022r 0211r 179r L60]r",
          },
          { label: "Lectionaries", tone: "support", witnesses: "L547 L950 L2211" },
          {
            label: "Patristic and versional sigla",
            tone: "support",
            witnesses: "AnastS Antioch Bas Evagr HesH PsAthmss K:B",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "καὶ τῇ νηστείᾳ",
            witnesses: "037r",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "διὰ προσευχῆς καὶ νηστείας",
            witnesses: "827",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses: "01* 03 0274",
          },
          {
            label: "Versional state",
            tone: "competing",
            witnesses: "L:K",
          },
          {
            label: "Versional forms containing fasting",
            tone: "neutral",
            witnesses: "L:DIV S:VS>P>H CPA:C>L K:S Ä Go",
          },
          {
            label: "Deficient at the unit",
            tone: "neutral",
            witnesses: "P45 043 067 0131 0233 590 L844",
          },
        ],
      },
    ],
    fathers: [
      {
        author: "Basil of Caesarea",
        work: "Homily on Fasting 1.9",
        date: "c. AD 370",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "PG 31:181",
        url: "https://intf.uni-muenster.de/patristik/",
      },
      {
        author: "Clement of Alexandria",
        work: "Eclogae Propheticae 15.1",
        date: "c. AD 200",
        use: "Allusion",
        reading: "Competing witness",
        locator: "Eclogae Propheticae 15.1",
      },
    ],
  },
  {
    slug: "mark-9-44-46",
    reference: "Mark 9:44, 46",
    summary:
      "Both verses are carried by Codex Bezae, Koridethi, Family 13, twenty further named Greek entries, lectionary 950 and the Byzantine reconstructed witness, with the Latin D/I/V states, Philoxenian, Ethiopic and Gothic. Sinaiticus, Vaticanus, Ephraemi, Regius, Washingtonianus, Sangallensis and Athous Lavrensis omit both. The two verses have separate rosters.",
    unit: "Two independent verse units, Mark 9:44/2–22 and Mark 9:46/2–22, each carrying ὅπου ὁ σκώληξ αὐτῶν οὐ τελευτᾷ καὶ τὸ πῦρ οὐ σβέννυται.",
    scope: DECM_SCOPE,
    snapshot: {
      greekSupport:
        "20 named Greek entries at 9:44 and 19 at 9:46, plus the Byzantine reconstructed witness",
      greekAgainst: "29 named Greek entries at 9:44 and 34 at 9:46",
      supportCategory: "Byzantine reconstructed witness with Latin, Syriac and Gothic support",
      mainEvidenceAgainst: [
        "Codex Sinaiticus (01)",
        "Codex Vaticanus (03)",
        "Codex Ephraemi (04)",
        "Codex Washingtonianus (032)",
      ],
    },
    sources: [
      { ...DECM, url: "https://ntvmr.uni-muenster.de/ecm?segment=2-22&verse=Mark.9.44", locator: "Mark 9:44/2–22 and Mark 9:46/2–22" },
      INTF_LISTE,
      INTF_PATRISTIC,
    ],
    notes: [
      "GA 2193 has a hand change at 9:44, where 2193* omits and 2193C includes, and stands on the omission line at 9:46.",
      "The same wording stands undisputed at Mark 9:48.",
    ],
    units: [
      {
        id: "v44",
        label: "Mark 9:44/2–22",
        reading: "ὅπου ὁ σκώληξ αὐτῶν οὐ τελευτᾷ καὶ τὸ πῦρ οὐ σβέννυται",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses:
              "05 038 13 69 124 346 543 579 700 788 792 826 828r 983 1342 1424 1542S 1689 2193C 2542",
            aggregates: "Byz · [0211r 117r 872C 1128r 2411r L387]r",
          },
          { label: "Lectionaries", tone: "support", witnesses: "L950" },
          { label: "Versional states", tone: "support", witnesses: "L:DIV S:Ph Ä Go" },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses:
              "01 03 04 019 032 037 044 055 0274 1 28 118 205 209 427 544 565 697 732 791 863 872* 892 1337 1582 2106 2193* 2738 2886",
          },
          { label: "Versional states", tone: "competing", witnesses: "K:SB L:K S:Vˢ CPA:C" },
          {
            label: "Non-extant or partial",
            tone: "neutral",
            witnesses: "P45 043 067 0131 0233 33 1337 1542 L60 L547 L563 L844 L2211",
          },
        ],
      },
      {
        id: "v46",
        label: "Mark 9:46/2–22",
        reading: "ὅπου ὁ σκώληξ αὐτῶν οὐ τελευτᾷ καὶ τὸ πῦρ οὐ σβέννυται",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses:
              "05 038 13 69 124 346 543 579 700 788 792r 826 828 983 1342 1424 1542S 1689 2542",
            aggregates: "Byz · [011r 261r 349r 382]r",
          },
          { label: "Lectionaries", tone: "support", witnesses: "L950" },
          { label: "Versional states", tone: "support", witnesses: "L:DIV S:Ph CPA:C Ä Go" },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses:
              "01 03 04 019 032 037 044 0274 1 28 118 191 205 209 377 389 427 472 544 565 697 728 732 740 791 863 872 892 1009 1273 1582 2106 2193 2738 2786 2886",
          },
          { label: "Versional states", tone: "competing", witnesses: "K:SBF L:K S:Vˢ" },
          {
            label: "Non-extant or partial",
            tone: "neutral",
            witnesses:
              "P45 043 055 067 0131 0233 33 124 1337 1542 1574 2206 2517 L60 L387 L547 L563 L844 L2211",
          },
        ],
      },
    ],
    fathers: [
      {
        author: "Basil of Caesarea",
        work: "Asceticon magnum 2.267",
        date: "Fourth century",
        use: "Parallel tradition",
        reading: "Supporting witness",
        locator: "PG 31,1264C10, CPG 2875, INTF 11426",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=11426",
      },
      {
        author: "John Chrysostom",
        work: "Homilies on Ephesians 24",
        date: "Late fourth century",
        use: "Parallel tradition",
        reading: "Supporting witness",
        locator: "Field 4 (1852),364.1, CPG 4431, INTF 9946",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=9946",
      },
      {
        author: "Anastasius Sinaita",
        work: "Quaestiones 93.2",
        date: "Seventh century",
        use: "Parallel tradition",
        reading: "Supporting witness",
        locator: "CCSG 59,148.18, CPG 7746, INTF 11429",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=11429",
      },
      {
        author: "Justinian",
        work: "Oratio 1",
        date: "Sixth century",
        use: "Parallel tradition",
        reading: "Supporting witness",
        locator: "ACO III,206.27, CPG 6880, INTF 11435",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=11435",
      },
      {
        author: "Photius",
        work: "Amphilochia 34",
        date: "Ninth century",
        use: "Parallel tradition",
        reading: "Supporting witness",
        locator: "Westerink (1986),127.161, CPG 9510, INTF 11379",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=11379",
      },
      { author: "Basil of Caesarea", work: "Prologus 8.4", date: "Fourth century", use: "Parallel tradition", reading: "Supporting witness", locator: "PG 31,685.11, CPG 2886, INTF 11427", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=11427" },
      { author: "Basil of Caesarea", work: "Sermones morales 14.3", date: "Fourth century", use: "Parallel tradition", reading: "Supporting witness", locator: "PG 32,1301B11, CPG 2908, INTF 11428", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=11428" },
      { author: "John Chrysostom", work: "Homilies on 1 Thessalonians 5", date: "Late fourth century", use: "Parallel tradition", reading: "Supporting witness", locator: "Field 5 (1855),371.8, CPG 4434, INTF 9948", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=9948" },
      { author: "John Chrysostom", work: "Homilies on Romans 12 and 26", date: "Late fourth century", use: "Parallel tradition", reading: "Supporting witness", locator: "INTF 9867, 9870 and 9871", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=9867" },
      { author: "Pseudo-Isaiah material", work: "Besson 202.6", date: "Late antiquity", use: "Parallel tradition", reading: "Supporting witness", locator: "CPG 7869, INTF 11761", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=11761" },
    ],
  },
  {
    slug: "mark-10-24",
    reference: "Mark 10:24",
    summary:
      "The qualification about trusting in riches is carried by Codex Ephraemi, the correction of Athous Lavrensis, ten further named Greek entries, lectionary 950 and the Byzantine reconstructed witness, with three further Greek subforms in a large minuscule group, and Clement of Alexandria quotes the long form directly. Sinaiticus, Vaticanus, Washingtonianus, Sangallensis, the first hand of Athous Lavrensis and 2786 omit it.",
    unit: "Mark 10:24, word 39: presence of τοὺς πεποιθότας ἐπὶ χρήμασιν and its prepositional subforms.",
    scope: DECM_SCOPE,
    snapshot: {
      greekSupport:
        "10 named Greek entries for the primary long form plus 37 further entries in three subforms, with the Byzantine reconstructed witness",
      greekAgainst: "6 named Greek entries in the ECM Mark selected corpus",
      supportCategory: "Byzantine reconstructed witness with third-century patristic quotation",
      mainEvidenceAgainst: [
        "Codex Sinaiticus (01)",
        "Codex Vaticanus (03)",
        "Codex Washingtonianus (032)",
        "Codex Sangallensis (037)",
      ],
    },
    sources: [
      { ...DECM, url: "https://ntvmr.uni-muenster.de/ecm?segment=39&verse=Mark.10.24", locator: "Mark 10:24, word 39" },
      INTF_LISTE,
      INTF_PATRISTIC,
    ],
    notes: [
      "The larger paraphrase δυσκόλως οἱ τὰ χρήματα ἔχοντες… belongs to GA 1241.",
      "Athous Lavrensis is one codex in two states: 044* omits and 044C includes.",
    ],
    units: [
      {
        id: "riches",
        label: "Mark 10:24, word 39 — the qualification about riches",
        reading: "τοὺς πεποιθότας ἐπὶ χρήμασιν",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses: "04 044C 427r 579r 700 732 792 892 1342 1424",
            aggregates:
              "Byz · [0211r 0233V 61r 131r 179r 261r 382r 472r 513r 740r 752r 803r 829r 863r 873r 1009r 1128r 1243r 1326r 1515r 1555r 2106r 2148r 2738]r · Clem",
          },
          { label: "Lectionaries", tone: "support", witnesses: "L950r" },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "τοὺς πεποιθότας ἐπὶ τοῖς χρήμασιν",
            witnesses:
              "05 038r 043V 1 4 13r 28r 69 124 205 209 273r 346 372 543 565r 788 826 828r 872 983r 1093 1542S 1574 1582 1654 1689 2193 2542 2726 2737 2886",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "τοὺς πεποιθότας ἐπὶ τὰ χρήματα",
            witnesses: "728 1546r 2206r 2487 L387-1r",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "τοὺς πεποιθότας ἐπὶ χρήματα",
            witnesses: "780 L387-2r",
          },
          {
            label: "Versional states carrying the qualification",
            tone: "related",
            witnesses: "L:IV S:VS>P>H K:Bmss Ä Go",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses: "01 03 032 037 044* 2786",
          },
          { label: "Versional states", tone: "competing", witnesses: "L:K K:S" },
          {
            label: "Non-extant at the unit",
            tone: "neutral",
            witnesses: "019 055 0274 544 2744 L60 L547 L563 L844 L2211",
          },
        ],
      },
    ],
    fathers: [
      {
        author: "Clement of Alexandria",
        work: "Quis dives salvetur? 9",
        date: "Around the turn of the third century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "GCS 17,162.31, CPG 1379, INTF 9476",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=9476",
      },
    ],
  },
  {
    slug: "mark-11-26",
    reference: "Mark 11:26",
    summary:
      "The verse is carried by Codex Ephraemi, Bezae, Koridethi, twenty-five further named Greek entries, lectionary 950 and the Byzantine reconstructed witness, with the Latin K/D/I/V states, Peshitta and Harklean manuscripts, Bohairic manuscripts and Gothic. Cyprian quotes Mark 11:25–26 and names Mark explicitly in about AD 248–249. Sinaiticus, Vaticanus, Regius, Washingtonianus, Sangallensis and Athous Lavrensis omit it.",
    unit: "Mark 11:26/2–35: presence of the whole verse.",
    scope: DECM_SCOPE,
    snapshot: {
      greekSupport:
        "27 named Greek entries plus a bracketed apparatus group and the Byzantine reconstructed witness",
      greekAgainst: "30 named Greek entries in the ECM Mark selected corpus",
      supportCategory: "Byzantine reconstructed witness with third-century Latin quotation",
      mainEvidenceAgainst: [
        "Codex Sinaiticus (01)",
        "Codex Vaticanus (03)",
        "Codex Regius (019)",
        "Codex Washingtonianus (032)",
      ],
    },
    sources: [
      { ...DECM, url: "https://ntvmr.uni-muenster.de/ecm?segment=2-35&verse=Mark.11.26", locator: "Mark 11:26/2–35" },
      INTF_LISTE,
      INTF_PATRISTIC,
      {
        label: "BiblIndex work-edition record for Cyprian, Ad Quirinum (CCSL 3)",
        url: "https://www.biblindex.org/en/work-editions/ad-quirinum/corpus-christianorum-series-latina-3",
        locator: "Testimonia ad Quirinum 3.22",
      },
    ],
    notes: [
      "Three codices have hand changes here: 154* omits and 154C includes; 1160* omits and 1160C includes; 2193* omits and 2193A includes.",
    ],
    units: [
      {
        id: "verse",
        label: "Mark 11:26/2–35 — presence of the whole verse",
        reading:
          "εἰ δὲ ὑμεῖς οὐκ ἀφίετε, οὐδὲ ὁ πατὴρ ὑμῶν ὁ ἐν τοῖς οὐρανοῖς ἀφήσει τὰ παραπτώματα ὑμῶν",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses:
              "04 05r 038r 1 13r 28 33 69 124 209 346 427r 543 579r 732r 788 792r 826 828 983r 1342 1424 1542S 1582 1689 2193A 2542",
            aggregates:
              "Byz · [043V 0233r 16r 61r 152r 153r 154C 178r 273r 382r 513r 517r 555r 706r 713r 716r 827r 829r 949r 1082r 1160Cr 1243r 1279r 1446r 1457r 1515r 1546r 1579r 1593r 2106r L387r L563r L773]r",
          },
          { label: "Lectionaries", tone: "support", witnesses: "L950r" },
          {
            label: "Versional states",
            tone: "support",
            witnesses: "L:KDIV S:PmssHmss K:Bmss Go",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses:
              "01 03 019 032 037 044 055 4 154* 179 184 205 348 565 590 700 733 892 979 1093 1160* 1216 1273 1302 1337 1574 2193* 2206 2680 2766 2886",
          },
          {
            label: "Versional states",
            tone: "competing",
            witnesses: "L:Kalt K:SBmss S:VSPmsHmss CPA:CL Ä",
          },
          {
            label: "Non-extant or partial",
            tone: "neutral",
            witnesses: "P45 043 154C 590 2517 L547 L844",
          },
        ],
      },
    ],
    fathers: [
      {
        author: "Cyprian",
        work: "Testimonia ad Quirinum 3.22",
        date: "c. AD 248–249",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "CCSL 3, CPL 39",
        url: "https://www.biblindex.org/en/work-editions/ad-quirinum/corpus-christianorum-series-latina-3",
        transmission: "Latin",
      },
      {
        author: "Anastasius Sinaita",
        work: "Synopsis 12",
        date: "Seventh century",
        use: "Parallel tradition",
        reading: "Supporting witness",
        locator: "PG 89,840C12, CPG 7750, INTF 12362",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=12362",
      },
      { author: "Pseudo-Anastasius material", work: "Mark 11:26 parallel record", date: "Late antique or Byzantine", use: "Parallel tradition", reading: "Supporting witness", locator: "PG 59,566.67, CPG 4583, INTF 12363", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=12363" },
    ],
  },
  {
    slug: "mark-15-28",
    reference: "Mark 15:28",
    summary:
      "The fulfilment sentence is carried by Codex Regius, Sangallensis, Koridethi, 083, Family 13, twenty-eight further named Greek entries, lectionary 844 and the Byzantine reconstructed witness, with the Latin D/I/V states, Christian Palestinian Aramaic, Bohairic manuscripts, Philoxenian, Ethiopic and Gothic. Eusebius quotes Mark 15:27–28 and names Mark explicitly. Sinaiticus, Alexandrinus, Vaticanus, Ephraemi, Bezae and Athous Lavrensis omit it.",
    unit: "Mark 15:28/2–20: presence of the whole verse.",
    scope: DECM_SCOPE,
    snapshot: {
      greekSupport:
        "32 named Greek entries plus a lectionary and the Byzantine reconstructed witness",
      greekAgainst: "7 named Greek entries plus nine lectionaries",
      supportCategory: "Byzantine reconstructed witness with early fourth-century quotation",
      mainEvidenceAgainst: [
        "Codex Sinaiticus (01)",
        "Codex Alexandrinus (02)",
        "Codex Vaticanus (03)",
        "Codex Ephraemi (04)",
        "Codex Bezae (05)",
      ],
    },
    sources: [
      { ...DECM, url: "https://ntvmr.uni-muenster.de/ecm?segment=2-20&verse=Mark.15.28", locator: "Mark 15:28/2–20" },
      INTF_LISTE,
      INTF_PATRISTIC,
    ],
    notes: [
      "Washingtonianus (032) is non-extant at this unit.",
      "Majuscule 033 (X) is a different manuscript from minuscule 33, which stands on the inclusion line.",
    ],
    units: [
      {
        id: "verse",
        label: "Mark 15:28/2–20 — presence of the whole verse",
        reading: "καὶ ἐπληρώθη ἡ γραφὴ ἡ λέγουσα· καὶ μετὰ ἀνόμων ἐλογίσθη",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses:
              "019 037r 038r 083 1 13 28 33 69 124r 205 209 346 427 543 565 579 700 732 788 792 826 828 892 983 1342 1424 1542S 1582 1689 2193 2542S 2886",
            aggregates: "Byz · [0211r 1396r L211-2]",
          },
          { label: "Lectionaries", tone: "support", witnesses: "L844" },
          {
            label: "Patristic and versional sigla",
            tone: "support",
            witnesses: "Anon Eus Or Thdrt L:DIV CPA:CL K:Bmss S:Ph Ä Go",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses: "01 02 03 04 05 044 055",
          },
          {
            label: "Lectionaries",
            tone: "competing",
            witnesses: "L60 L211-1 L387 L547 L563 L770 L773 L950",
          },
          { label: "Versional states", tone: "competing", witnesses: "K:SBmss L:K S:Vˢ" },
          {
            label: "Non-extant or partial",
            tone: "neutral",
            witnesses:
              "022 032 083 0184 0233 179 544 590 719 766 1273 2517 2537 2766 L547S",
          },
        ],
      },
    ],
    fathers: [
      {
        author: "Eusebius of Caesarea",
        work: "Commentary on Isaiah 42.53.12",
        date: "Early fourth century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "GCS (Ziegler) 339.8, CPG 3468, INTF 9755",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=9755",
      },
      {
        author: "Theodoret",
        work: "Commentary on Isaiah 17.53.12",
        date: "Fifth century",
        use: "Parallel tradition",
        reading: "Supporting witness",
        locator: "SC 315,162.189, CPG 6204, INTF 10260",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=10260",
      },
      {
        author: "Origen",
        work: "Against Celsus 8.54 and 2.44",
        date: "c. AD 248",
        use: "Parallel tradition",
        reading: "Supporting witness",
        locator: "Marcovich 571.17 and 115.27, CPG 1476, INTF 12061 and 11189",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=12061",
      },
      { author: "Anonymous", work: "Dialogus cum Iudaeis 9", date: "Later sixth century", use: "Parallel tradition", reading: "Supporting witness", locator: "CCSG 30,80.33, CPG 7803, INTF 11636", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=11636" },
      { author: "Severian of Gabala", work: "In filium? 3", date: "Late fourth century", use: "Allusion", reading: "Supporting witness", locator: "PG 59,636.6, CPG 4200, INTF 10292", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=10292" },
    ],
  },
  {
    slug: "mark-16-9-20",
    reference: "Mark 16:9–20",
    summary:
      "The Longer Ending is carried by Codex Ephraemi, Bezae, Washingtonianus, Sangallensis, Koridethi, Families 1 and 13, twenty-six further named Greek entries, three lectionaries and the Byzantine reconstructed witness, with the Latin D/I/V states, Peshitta and Harklean, Ethiopic and Gothic. Irenaeus quotes Mark 16:19 as the conclusion of Mark's Gospel around AD 180. Sinaiticus, Vaticanus and 304 end at 16:8, and four further Greek entries carry the Short Ending before the Longer Ending.",
    unit: "The ending complex at Mark 16:8/38–16:20/33, with five ending states.",
    scope: DECM_SCOPE,
    snapshot: {
      greekSupport:
        "33 named Greek entries plus three lectionaries and the Byzantine reconstructed witness carry the Longer Ending",
      greekAgainst: "3 named Greek entries end at 16:8",
      supportCategory: "Byzantine reconstructed witness with second-century patristic quotation",
      mainEvidenceAgainst: [
        "Codex Sinaiticus (01)",
        "Codex Vaticanus (03)",
        "Minuscule 304",
      ],
    },
    sources: [
      { ...DECM, url: "https://ntvmr.uni-muenster.de/ecm?verse=Mark.16.8", locator: "Mark 16:8/38–16:20/33" },
      INTF_LISTE,
      INTF_PATRISTIC,
      VETUS_LATINA,
    ],
    notes: [
      "GA 304 is a twelfth-century catena manuscript.",
      "Codex Bobiensis (k) carries the Short Ending.",
      "Codex Fuldensis is a sixth-century Latin Gospel harmony manuscript.",
      "The surviving Curetonian text in Mark preserves 16:18–20.",
    ],
    units: [
      {
        id: "ending",
        label: "Mark 16:8/38–16:20/33 — the ending complex",
        reading: "the Longer Ending, Mark 16:9–20",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            reading: "Longer Ending",
            witnesses:
              "04 05 032 037 038 1 13 28 33 69 124 205 209 346 427 543 565 700 732 788 792 826 828 892 983 1342 1424 1542S 1582 1689 2193 2542S 2886",
            aggregates: "Byz · [055V]",
          },
          { label: "Lectionaries", tone: "support", witnesses: "L547 L844 L2211" },
          {
            label: "Versional states",
            tone: "support",
            witnesses: "L:DIV K:Sms>B S:PHT Ä Go",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "Short Ending followed by the Longer Ending",
            witnesses: "019 044 083V 579 K:Bms",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "Short Ending, intermediate material, then the Longer Ending",
            witnesses: "099V K:Smss>Bms>F",
          },
          {
            label: "Versional states",
            tone: "related",
            reading: "Short Ending only",
            witnesses: "L:K S:Hᴹ",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            reading: "the Gospel ends at 16:8",
            witnesses: "01 03 304",
          },
          {
            label: "Patristic and versional sigla on the end-at-16:8 line",
            tone: "competing",
            witnesses: "Eus HesH PetrEv SevAnt CPA:CL2 K:Smss S:Vˢ",
          },
          {
            label: "Assignment open among the Longer-Ending states",
            tone: "neutral",
            witnesses: "4",
          },
          {
            label: "Non-extant or partial",
            tone: "neutral",
            witnesses: "041S 055 083 0233 L211 L547S L950",
          },
        ],
      },
    ],
    fathers: [
      {
        author: "Irenaeus",
        work: "Against Heresies 3.10.5",
        date: "c. AD 180",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "SC 211, INTF 10081",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=10081",
        transmission: "Latin transmission",
      },
      {
        author: "Macarius Magnes",
        work: "Apocriticus, on 16:9, 15, 17 and 18",
        date: "Late fourth / early fifth century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "INTF 10436, 10437, 10438, 10440, 10441",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=10436",
      },
      {
        author: "Apostolic Constitutions",
        work: "Records at Mark 16:9 and 16:15–19",
        date: "Late fourth century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "INTF 11944, 9513–9516",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=11944",
      },
      {
        author: "Epiphanius",
        work: "Panarion, on 16:19",
        date: "c. AD 377",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "INTF 9635 and 9636",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=9635",
      },
      {
        author: "Eusebius of Caesarea",
        work: "Quaestiones ad Marinum, on 16:9",
        date: "Early fourth century",
        use: "Manuscript report",
        reading: "Mixed witness",
        locator: "INTF 9725, 9726, 9727, 9730",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=9725",
      },
      {
        author: "Severus of Antioch",
        work: "Homiliae cathedrales, on the ending and on 16:19",
        date: "Sixth century",
        use: "Manuscript report",
        reading: "Mixed witness",
        locator: "INTF 11795, 11806, 11910",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=11795",
      },
      {
        author: "Jerome",
        work: "Epistle 120.3",
        date: "Early fifth century",
        use: "Derivative use",
        reading: "Supporting witness",
        locator: "Epistula 120.3",
      },
      {
        author: "Photius",
        work: "Amphilochia, on 16:9 and 16:19",
        date: "Ninth century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "INTF 11540 and 11541",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=11540",
      },
      { author: "Justin Martyr", work: "Record attached to Mark 16:20", date: "Second century", use: "Allusion", reading: "Supporting witness", locator: "INTF 12554", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=12554" },
      { author: "Pseudo-Clement", work: "Epitome records at Mark 16:16", date: "Late antique", use: "Derivative use", reading: "Supporting witness", locator: "INTF 9381 and 9382", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=9381" },
      { author: "Acts of Pilate", work: "Records at Mark 16:15–19", date: "Late antique", use: "Parallel tradition", reading: "Supporting witness", locator: "INTF 11946–11953", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=11946" },
      { author: "Asterius", work: "Record at Mark 16:17", date: "Fourth century", use: "Close quotation", reading: "Supporting witness", locator: "INTF 9980", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=9980" },
      { author: "Philostorgius", work: "Church History, record at Mark 16:17", date: "Fifth century", use: "Close quotation", reading: "Supporting witness", locator: "INTF 10820", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=10820" },
      { author: "Nestorius", work: "Sermon material at Mark 16:20", date: "Fifth century", use: "Close quotation", reading: "Supporting witness", locator: "INTF 10795", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=10795" },
      { author: "Cyril of Alexandria", work: "Anti-Nestorian material at Mark 16:20", date: "Fifth century", use: "Close quotation", reading: "Supporting witness", locator: "INTF 11234", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=11234" },
    ],
  },
];

export const matthewMarkSources = { WILLKER_MATTHEW, INTF_LISTE, VETUS_LATINA, DECM, INTF_PATRISTIC, KIRAZ };
