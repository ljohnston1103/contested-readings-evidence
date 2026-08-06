import type { FullWitnessEntry } from "./types";

const WILLKER_LUKE = {
  label: "Wieland Willker, A Textual Commentary on the Greek Gospels, Vol. 3: Luke",
  url: "https://www.willker.de/wie/TCG/TC-Luke.pdf",
};
const IGNTP_LUKE = {
  label:
    "IGNTP, The New Testament in Greek: The Gospel According to St Luke, Parts 1–2 (OUP 1984, 1987)",
  url: "https://itseeweb.cal.bham.ac.uk/igntp/publications.html",
  locator: "Comprehensive Luke collation",
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
const IGNTP_JOHN = {
  label: "IGNTP/ITSEE ECM John Greek positive apparatus",
  url: "https://itseeweb.cal.bham.ac.uk/iohannes/ECMGreek/positive/index.html",
};
const VL_JOHN = {
  label: "ITSEE Vetus Latina John synopsis",
  url: "https://itseeweb.cal.bham.ac.uk/iohannes/vetuslatina/edition/",
};
const ECM_JOHN_INTRO = {
  label: "IGNTP/ITSEE ECM John introduction and corpus scope",
  url: "https://itseeweb.cal.bham.ac.uk/iohannes/ECMGreek/introduction.html",
  locator: "Selected corpus of 236 Greek manuscripts including 22 supplements",
};
const ECM_JOHN_INSTRUCTIONS = {
  label: "IGNTP/ITSEE ECM John encoding instructions",
  url: "https://itseeweb.cal.bham.ac.uk/iohannes/ECMGreek/instructions.html",
};
const VL_JOHN_REGISTER = {
  label: "ITSEE Vetus Latina John manuscript register",
  url: "https://itseeweb.cal.bham.ac.uk/iohannes/vetuslatina/manuscripts.html",
};
const SAHIDIC_JOHN_XML = {
  label: "Official Sahidic John XML dataset (University of Birmingham eData 1042)",
  url: "https://edata.bham.ac.uk/1042/",
};
const PROTO_BOHAIRIC = {
  label: "Schulz, proto-Bohairic appendix to the 2021 Sahidic critical edition",
  url: "https://doi.org/10.1515/9783110592153-007",
};
const SAHIDIC_JOHN = {
  label:
    "Förster, Sänger-Böhm and Schulz, Kritische Edition der sahidischen Version des Johannesevangeliums (2021)",
  url: "https://doi.org/10.1515/9783110592153",
};
const KIRAZ = {
  label: "George A. Kiraz, Comparative Edition of the Syriac Gospels",
  url: "https://www.degruyterbrill.com/document/doi/10.31826/9781463209643/html?lang=en",
};
const NEWADVENT = {
  label: "New Advent Fathers of the Church",
  url: "https://www.newadvent.org/fathers/",
};

const LUKE_SCOPE =
  "Willker's selected Luke apparatus, which prints named witnesses together with the group siglum Maj. Counts below name the witnesses this apparatus prints.";
const JOHN_SCOPE =
  "The official IGNTP/ITSEE ECM John Greek apparatus, whose corpus is 236 selected documents including 22 supplements, together with the official Vetus Latina John synopsis and the 2021 Sahidic critical edition.";

export const lukeJohnWitnesses: FullWitnessEntry[] = [
  {
    slug: "luke-2-14",
    reference: "Luke 2:14",
    summary:
      "The nominative εὐδοκία behind “good will toward men” is carried by the correctors of Sinaiticus and Vaticanus, Cyprius, Regius, Zacynthius, Sangallensis, Koridethi, Athous Lavrensis, Families 1 and 13, five further minuscules, lectionary 1043 and the Byzantine tradition. The genitive stands in the first hands of Sinaiticus and Vaticanus with Alexandrinus, Bezae and Washingtonianus.",
    unit: "Nominative εὐδοκία against genitive εὐδοκίας. The omission of ἐν and the Syriac “good hope” rendering are separate forms.",
    scope: LUKE_SCOPE,
    snapshot: {
      greekSupport:
        "12 named Greek witnesses plus Families 1 and 13 and the Maj group in Willker's apparatus",
      greekAgainst: "6 named Greek witnesses in Willker's apparatus",
      supportCategory: "Byzantine tradition and the corrected states of Sinaiticus and Vaticanus",
      mainEvidenceAgainst: [
        "Codex Sinaiticus first hand (01*)",
        "Codex Alexandrinus (02)",
        "Codex Vaticanus first hand (03*)",
        "Codex Bezae (05)",
      ],
    },
    sources: [
      { ...WILLKER_LUKE, locator: "Luke 2:14, PDF pp. 30–31" },
      IGNTP_LUKE,
      INTF_LISTE,
      VETUS_LATINA,
      {
        label: "Irenaeus, Against Heresies 3.10.3",
        url: "https://www.newadvent.org/fathers/0103310.htm",
        locator:
          "Latin transmission: the angelic hymn is quoted with the genitive sense, ‘to men of good will’",
      },
      {
        label: "Origen, Against Celsus 1.60",
        url: "https://www.newadvent.org/fathers/04161.htm",
        locator:
          "Direct quotation of the angelic hymn with the nominative sense, ‘good-will towards men’",
      },
      {
        label: "Eusebius of Caesarea, Demonstratio Evangelica 7.2.8",
        url: "https://catholiclibrary.org/library/view?chunk.id=00000369&docId=Fathers-Synchronized-EN%2FEusebius_Caesariensis__Demonstratio_evangelica.en.html",
        locator:
          "Book 7, chapter 2, section 8; direct quotation of Luke 2:14 with nominative εὐδοκία",
      },
      {
        label: "Epiphanius, Panarion 30.29.4",
        url: "https://www.orcuttchristian.org/Panarion%20Epiphanius%20COMPLETE.pdf",
        locator:
          "Book I, section 30.29.4, printed p. 157; direct quotation with the nominative sense, ‘good-will among men’",
      },
    ],
    notes: [
      "Irenaeus supplies a second-century competing citation in Latin transmission: ‘to men of good will.’",
      "Origen directly quotes the nominative form in Against Celsus 1.60, but Willker reports other Origen citations on both apparatus lines; his wider evidence therefore remains mixed.",
      "Eusebius quotes the full Lukan context in Demonstratio Evangelica 7.2.5–10 and gives the nominative form at 7.2.8.",
      "Epiphanius gives the nominative sense in Panarion 30.29.4.",
    ],
    units: [
      {
        id: "eudokia",
        label: "Nominative or genitive",
        reading: "ἐν ἀνθρώποις εὐδοκία",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses: "01C1 03C2 017 019 037 038 040 044 579 700 892 1241",
            aggregates: "Family 1 · Family 13 · Maj · 041 (with the apparatus's query)",
          },
          { label: "Lectionaries", tone: "support", witnesses: "L1043" },
          {
            label: "Greek manuscripts",
            tone: "competing",
            reading: "ἐν ἀνθρώποις εὐδοκίας",
            witnesses: "01* 02 03*V 05 032 23",
          },
          {
            label: "Latin, Coptic and other versions",
            tone: "competing",
            aggregates: "Latin evidence on the genitive line · Sahidic · Gothic",
          },
          {
            label: "Syriac and harmony tradition",
            tone: "related",
            reading: "the “good hope” rendering",
            witnesses: "Peshitta Diatessaron-descendant",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "ἐν omitted",
            witnesses: "372 724 2737 Sinaitic-Syriac",
          },
          { label: "Lacunose", tone: "neutral", witnesses: "04 022 024" },
        ],
      },
    ],
    fathers: [
      {
        author: "Irenaeus",
        work: "Against Heresies 3.10.3",
        date: "c. AD 180",
        use: "Direct quotation",
        reading: "Competing reading",
        locator:
          "Adversus haereses 3.10.3: the surviving Latin has hominibus bonae voluntatis, ‘to men of good will’",
        url: "https://www.newadvent.org/fathers/0103310.htm",
        transmission: "Latin transmission",
      },
      {
        author: "Origen",
        work: "Against Celsus 1.60",
        date: "c. AD 248",
        use: "Direct quotation",
        reading: "Supports the KJV reading",
        locator:
          "Contra Celsum 1.60: ‘Glory to God in the highest, and on earth peace, good-will towards men’",
        url: "https://www.newadvent.org/fathers/04161.htm",
      },
      {
        author: "Origen",
        work: "Additional Luke 2:14 citations reported in the apparatus",
        date: "Third century",
        use: "Indirect report",
        reading: "Related",
        locator:
          "Willker, Luke, TVU 18, PDF pp. 30–31; other Origen citations are reported on both reading lines",
        url: WILLKER_LUKE.url,
      },
      {
        author: "Eusebius of Caesarea",
        work: "Demonstratio Evangelica 7.2.8",
        date: "c. AD 312–318",
        use: "Direct quotation",
        reading: "Supports the KJV reading",
        locator:
          "Book 7, chapter 2, section 8: δόξα ἐν ὑψίστοις θεῷ ... ἐν ἀνθρώποις εὐδοκία",
        url: "https://catholiclibrary.org/library/view?chunk.id=00000369&docId=Fathers-Synchronized-EN%2FEusebius_Caesariensis__Demonstratio_evangelica.en.html",
      },
      {
        author: "Epiphanius of Salamis",
        work: "Panarion 30.29.4",
        date: "c. AD 374–377",
        use: "Direct quotation",
        reading: "Supports the KJV reading",
        locator:
          "Panarion 30.29.4, printed p. 157: ‘Glory to God in the highest, and on earth peace, good-will among men’",
        url: "https://www.orcuttchristian.org/Panarion%20Epiphanius%20COMPLETE.pdf",
      },
    ],
  },
  {
    slug: "luke-2-33",
    reference: "Luke 2:33",
    summary:
      "“Joseph and his mother” is carried by Codex Alexandrinus, Zacynthius, Sangallensis, Koridethi, Athous Lavrensis, 579, 892, Family 13 and the Byzantine tradition, with Old Latin, several Vulgate manuscripts, the Peshitta, Harklean and Palestinian Syriac, part of Bohairic and Gothic. “His father and his mother” stands in the corrector of Sinaiticus, Vaticanus, Bezae, Regius, Washingtonianus and Family 1.",
    unit: "“Joseph and his mother” against “his father and his mother”, with a no-possessive form, a double-possessive form and a hybrid form.",
    scope: LUKE_SCOPE,
    snapshot: {
      greekSupport:
        "7 named Greek witnesses plus Family 13 and the Maj group in Willker's apparatus",
      greekAgainst: "8 named Greek witnesses plus Family 1",
      supportCategory: "Byzantine tradition with broad Latin and Syriac support",
      mainEvidenceAgainst: [
        "Codex Vaticanus (03)",
        "Codex Bezae (05)",
        "Codex Regius (019)",
        "Codex Washingtonianus (032)",
      ],
    },
    sources: [
      { ...WILLKER_LUKE, locator: "Luke 2:33, PDF p. 41" },
      IGNTP_LUKE,
      INTF_LISTE,
      VETUS_LATINA,
    ],
    units: [
      {
        id: "subject",
        label: "The subject of the verse",
        reading: "Ἰωσὴφ καὶ ἡ μήτηρ αὐτοῦ",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses: "02 037 038 040 044 579 892",
            aggregates: "Family 13 · Maj",
          },
          {
            label: "Latin, Syriac, Coptic and other versions",
            tone: "support",
            witnesses: "Peshitta Harklean Palestinian-Syriac Bohairic-part Gothic",
            aggregates: "Old Latin evidence on this line · some Vulgate manuscripts",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "Ἰωσὴφ καὶ ἡ μήτηρ, without the possessive",
            witnesses: "022 33 579",
            aggregates: "five further manuscripts cited collectively",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "Ἰωσὴφ ὁ πατὴρ αὐτοῦ — hybrid",
            witnesses: "157 165 176 Ethiopic",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            reading: "ὁ πατὴρ αὐτοῦ καὶ ἡ μήτηρ",
            witnesses: "01C1 03 05 019 032 131 700 1241",
            aggregates: "Family 1",
          },
          {
            label: "Latin and Coptic",
            tone: "competing",
            witnesses: "d (VL5) Sahidic Bohairic-part",
            aggregates: "Vulgate tradition",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "ὁ πατὴρ αὐτοῦ καὶ ἡ μήτηρ αὐτοῦ",
            witnesses: "01* 019 Sinaitic-Syriac Harklean-margin",
            aggregates: "a Vulgate manuscript",
          },
          { label: "Lacunose", tone: "neutral", witnesses: "04 033" },
        ],
      },
    ],
    fathers: [],
  },
  {
    slug: "luke-4-4",
    reference: "Luke 4:4",
    summary:
      "“But by every word of God” is carried by Codex Alexandrinus, Bezae, Sangallensis, Koridethi, Athous Lavrensis, 33, 579, 700, 892, Family 1, Family 13 apart from 788 and the Byzantine tradition, with Latin, the Peshitta and Harklean, a Bohairic strand and Gothic. Sinaiticus, Vaticanus, Regius, Washingtonianus, 788, 264 and 1241 carry the short form.",
    unit: "The clause ἀλλ’ ἐπὶ παντὶ ῥήματι θεοῦ after “not by bread alone”, against the short form and an expanded Deuteronomy/Matthew form.",
    scope: LUKE_SCOPE,
    snapshot: {
      greekSupport:
        "9 named Greek witnesses plus Families 1 and 13 and the Maj group in Willker's apparatus",
      greekAgainst: "7 named Greek witnesses in Willker's apparatus",
      supportCategory: "Byzantine tradition with Latin and Syriac support",
      mainEvidenceAgainst: [
        "Codex Sinaiticus (01)",
        "Codex Vaticanus (03)",
        "Codex Regius (019)",
        "Codex Washingtonianus (032)",
      ],
    },
    sources: [
      { ...WILLKER_LUKE, locator: "Luke 4:4, PDF p. 86" },
      IGNTP_LUKE,
      INTF_LISTE,
      VETUS_LATINA,
    ],
    notes: ["GA 157 carries the expanded form."],
    units: [
      {
        id: "clause",
        label: "The clause after “not by bread alone”",
        reading: "ἀλλ’ ἐπὶ παντὶ ῥήματι θεοῦ",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses: "02 05 037 038 044 33 579 700 892",
            aggregates: "Family 1 · Family 13 except 788 · Maj",
          },
          {
            label: "Latin, Syriac, Coptic and other versions",
            tone: "support",
            witnesses: "Peshitta Harklean Bohairic-strand Gothic",
            aggregates: "Latin evidence on this line",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "expanded toward Deuteronomy 8:3 and Matthew 4:4",
            witnesses: "118 157 205 209 1071 1424",
            aggregates: "about 118 further manuscripts cited collectively · some Bohairic manuscripts",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses: "01 03 019 032 264 788 1241",
          },
          {
            label: "Syriac and Coptic",
            tone: "competing",
            witnesses: "Sinaitic Sahidic Bohairic-part",
          },
          { label: "Lacunose", tone: "neutral", witnesses: "04 040" },
        ],
      },
    ],
    fathers: [],
  },
  {
    slug: "luke-9-55-56",
    reference: "Luke 9:55–56",
    summary:
      "The two sentences travel separately. Both stand in Cyprius, Guelferbytanus, 021, 030, Families 1 and 13, 2, 700 and Willker's printed Byzantine subgroup of about 1,300, with nine Old Latin witnesses, the Curetonian, Peshitta, Harklean and Palestinian Syriac, the Wordsworth–White Vulgate, Armenian and Gothic. Codex Bezae and 669 carry the first sentence only, and P75, Sinaiticus, Alexandrinus, Vaticanus and a further group carry neither.",
    unit: "Two independent additions: A, “and said, Ye know not what manner of spirit ye are of”, and B, “For the Son of man is not come to destroy men's lives, but to save them”.",
    scope: LUKE_SCOPE,
    snapshot: {
      greekSupport:
        "9 named Greek witnesses at addition A and 7 at addition B, plus Families 1 and 13 and Willker's printed Byzantine subgroup of about 1,300",
      greekAgainst:
        "23 named Greek witnesses plus Willker's printed Byzantine subgroup of about 430",
      supportCategory: "Byzantine subgroup, Old Latin and Syriac support",
      mainEvidenceAgainst: [
        "P75",
        "Codex Sinaiticus (01)",
        "Codex Vaticanus (03)",
        "Codex Washingtonianus (032)",
      ],
    },
    sources: [
      { ...WILLKER_LUKE, locator: "Luke 9:55–56, PDF pp. 255–256" },
      IGNTP_LUKE,
      INTF_LISTE,
      VETUS_LATINA,
    ],
    notes: [
      "Codex Bezae carries addition A only.",
      "The Wordsworth–White Vulgate carries both additions and the Stuttgart Vulgate neither.",
    ],
    units: [
      {
        id: "addition-a",
        label: "Addition A — “and said, Ye know not what manner of spirit ye are of”",
        reading: "καὶ εἶπεν· οὐκ οἴδατε οἵου πνεύματός ἐστε ὑμεῖς",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses: "05 017 021 024 030 669 2 579 700",
            aggregates: "Family 1 · Family 13 · Maj-part1300",
          },
          {
            label: "Old Latin",
            tone: "support",
            witnesses:
              "d (VL5) a (VL3) aur (VL15) b (VL4) c (VL6) e (VL2) f (VL10) q (VL13) r1 (VL14)",
          },
          {
            label: "Syriac and other versions",
            tone: "support",
            witnesses:
              "Curetonian Peshitta Harklean Palestinian-Syriac Armenian Gothic Bohairic-part Diatessaron-Arabic vgWW",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses:
              "P45 P75 01 02 03 04 019 032 037 040 044 047 0211 28 33 157 565 892 1071 1241 1342 1424 2786",
            aggregates: "Maj-part430",
          },
          {
            label: "Old Latin, Syriac and Coptic",
            tone: "competing",
            witnesses:
              "g1 (VL7) l (VL11) Sinaitic Sahidic vgSt Ethiopic-manuscripts Codex-Fuldensis",
          },
          {
            label: "Assignment open in the printed source",
            tone: "neutral",
            witnesses: "1675",
          },
          {
            label: "Scrambled local text",
            tone: "neutral",
            witnesses: "579",
            note: "Omits 56b–57a.",
          },
        ],
      },
      {
        id: "addition-b",
        label:
          "Addition B — “For the Son of man is not come to destroy men's lives, but to save them”",
        reading:
          "ὁ γὰρ υἱὸς τοῦ ἀνθρώπου οὐκ ἦλθεν ψυχὰς ἀνθρώπων ἀπολέσαι ἀλλὰ σῶσαι",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses: "017 021 024 030 2 579 700",
            aggregates: "Family 1 · Family 13 · Maj-part1300",
          },
          {
            label: "Old Latin",
            tone: "support",
            witnesses:
              "a (VL3) aur (VL15) b (VL4) c (VL6) e (VL2) f (VL10) q (VL13) r1 (VL14)",
          },
          {
            label: "Syriac and other versions",
            tone: "support",
            witnesses:
              "Curetonian Peshitta Harklean Palestinian-Syriac Armenian Gothic Diatessaron-Arabic",
          },
          {
            label: "Coptic and Vulgate",
            tone: "support",
            witnesses: "Bohairic-manuscripts vgWW",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses:
              "P45 P75 01 02 03 04 05 019 032 037 040 044 047 0211 28 33 157 565 669 892 1071 1241 1342 1424 1675 2786",
            aggregates: "Maj-part430",
          },
          {
            label: "Old Latin, Syriac and Coptic",
            tone: "competing",
            witnesses:
              "d (VL5) g1 (VL7) l (VL11) Sinaitic Sahidic vgSt Ethiopic-manuscripts Codex-Fuldensis",
          },
        ],
      },
    ],
    fathers: [
      {
        author: "John Chrysostom",
        work:
          "Homilies on Matthew 29 and 56; Homilies on John 51; Homilies on Romans 22; Homilies on 1 Corinthians 33",
        date: "Late fourth century",
        use: "Close quotation",
        reading: "Supports the KJV reading",
        locator: "Five discussions of addition A, listed at Willker Luke pp. 255–256",
        url: "https://www.willker.de/wie/TCG/TC-Luke.pdf",
      },
    ],
  },
  {
    slug: "luke-11-2-4",
    reference: "Luke 11:2–4",
    summary:
      "Each clause of the fuller prayer travels separately. The address expansion stands in Alexandrinus, Ephraemi, Bezae, Guelferbytanus, Washingtonianus, Zacynthius, Sangallensis, Koridethi, Athous Lavrensis, 070, Family 13, four further minuscules and the Byzantine tradition; “Thy will be done” adds Sinaiticus and 700; and the deliverance clause is carried by a further broad Greek, Latin and Syriac group.",
    unit: "Three independent additions — the address, “Thy will be done, as in heaven, so in earth”, and “but deliver us from evil” — together with the alternative Holy-Spirit petition.",
    scope: LUKE_SCOPE,
    snapshot: {
      greekSupport:
        "15 named Greek witnesses at the address, 16 at “Thy will be done”, and 18 at the deliverance clause, plus Family 13 and the Maj group",
      greekAgainst: "7 named Greek witnesses plus Family 1",
      supportCategory: "Byzantine tradition across all three clauses",
      mainEvidenceAgainst: [
        "P75",
        "Codex Vaticanus (03)",
        "Codex Regius (019)",
        "Family 1",
      ],
    },
    sources: [
      { ...WILLKER_LUKE, locator: "Luke 11:2–4, PDF pp. 301–303" },
      IGNTP_LUKE,
      INTF_LISTE,
      VETUS_LATINA,
    ],
    units: [
      {
        id: "address",
        label: "Clause A — “Our Father which art in heaven”",
        reading: "Πάτερ ἡμῶν ὁ ἐν τοῖς οὐρανοῖς",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses: "02 04 05 024 032 037 038 040 044 070 157 579 892 1241 33V",
            aggregates: "Family 13 · Maj",
          },
          {
            label: "Latin, Syriac and Coptic",
            tone: "support",
            witnesses: "Curetonian Peshitta Harklean",
            aggregates: "Old Latin evidence on this line · Coptic evidence on this line",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "Πάτερ ἡμῶν only",
            witnesses: "019 Armenian",
            aggregates: "several further manuscripts cited collectively",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            reading: "Πάτερ",
            witnesses: "P75 01 03 019 22 700 1342",
            aggregates: "Family 1 · several further manuscripts cited collectively",
          },
          {
            label: "Latin and Syriac",
            tone: "competing",
            witnesses: "aur (VL15) Sinaitic",
            aggregates: "Vulgate tradition",
          },
        ],
      },
      {
        id: "will",
        label: "Clause B — “Thy will be done, as in heaven, so in earth”",
        reading: "γενηθήτω τὸ θέλημά σου ὡς ἐν οὐρανῷ καὶ ἐπὶ γῆς",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses: "01 02 04 05 024 032 037 038 040 044 070 157 579 700 892 33V",
            aggregates: "Family 13 · Maj",
          },
          {
            label: "Latin, Syriac and Coptic",
            tone: "support",
            witnesses: "Peshitta Harklean Bohairic",
            aggregates: "Old Latin evidence on this line",
          },
          {
            label: "Old Latin and Coptic",
            tone: "related",
            reading: "“Thy will be done” only",
            witnesses: "a (VL3) Sahidic Bohairic-manuscripts",
            aggregates: "some Vulgate manuscripts",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses: "P75 03 019 22 1342",
            aggregates: "Family 1 · several further manuscripts cited collectively",
          },
          {
            label: "Syriac and other versions",
            tone: "competing",
            witnesses: "Sinaitic Curetonian Armenian",
            aggregates: "Vulgate tradition",
          },
        ],
      },
      {
        id: "deliverance",
        label: "Clause C — “but deliver us from evil”",
        reading: "ἀλλὰ ῥῦσαι ἡμᾶς ἀπὸ τοῦ πονηροῦ",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses: "02 04 05 07 010 011 012 013 017 032 037 038 041 044 070 33 565 892",
            aggregates: "Family 13 · Maj · lectionary evidence grouped in the apparatus",
          },
          {
            label: "Old Latin",
            tone: "support",
            witnesses:
              "b (VL4) d (VL5) ff2 (VL8) i (VL17) f (VL10) q (VL13) aur (VL15) r1 (VL14) l (VL11)",
          },
          {
            label: "Syriac, Coptic and other versions",
            tone: "support",
            witnesses: "Curetonian Peshitta Harklean Bohairic-part Ethiopic Slavonic Diatessaron-Arabic",
            aggregates: "some Vulgate manuscripts",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "the clause placed after “earth” in verse 2",
            witnesses: "01C1",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses: "P75 01* 01C2 03 019 700 1342",
            aggregates: "Family 1",
          },
          {
            label: "Syriac, Coptic and other versions",
            tone: "competing",
            witnesses: "Sinaitic Sahidic Bohairic-part Armenian Georgian",
            aggregates: "Vulgate tradition",
          },
        ],
      },
      {
        id: "alternative-petition",
        label: "The alternative second petition",
        reading: "ἐλθέτω τὸ ἅγιον πνεῦμά σου ἐφ’ ἡμᾶς καὶ καθαρισάτω ἡμᾶς",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "related",
            witnesses: "700 162",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "a related “upon us let your kingdom come” form",
            witnesses: "05",
          },
          {
            label: "Old Latin",
            tone: "related",
            reading: "a related “upon us let your kingdom come” form",
            witnesses: "d (VL5)",
          },
        ],
      },
    ],
    fathers: [
      {
        author: "Gregory of Nyssa",
        work: "Three passages contrasting Luke's petition with Matthew's",
        date: "Late fourth century",
        use: "Textual comment",
        reading: "Related",
        locator: "Willker Luke, PDF p. 303",
        url: "https://www.willker.de/wie/TCG/TC-Luke.pdf",
      },
      {
        author: "Tertullian",
        work: "Against Marcion 4",
        date: "Early third century",
        use: "Indirect report",
        reading: "Related",
        locator: "Adversus Marcionem 4",
        url: "https://www.newadvent.org/fathers/03124.htm",
      },
    ],
  },
  {
    slug: "luke-22-43-44",
    reference: "Luke 22:43–44",
    summary:
      "The angel and the bloody sweat stand in the first hand of Sinaiticus, Codex Bezae, Cyprius, Guelferbytanus, Regius, 0171, Family 1, 174, 230, 157, 565, 700, the first hand of 892, 1241 and the Byzantine tradition, with Latin, the Curetonian, Peshitta, Harklean and Palestinian Syriac and Bohairic manuscripts. Justin, Irenaeus, Epiphanius and Hilary all use the passage. P75, the corrector of Sinaiticus, Alexandrinus and Vaticanus omit it.",
    unit: "Presence of the two verses, with separate states for inclusion marked by an obelus and for relocation after Matthew 26:39.",
    scope: LUKE_SCOPE,
    snapshot: {
      greekSupport:
        "12 named Greek witnesses plus Family 1 and the Maj group in Willker's apparatus",
      greekAgainst: "12 named Greek witnesses plus four cited collectively",
      supportCategory: "Byzantine tradition with second-century patristic use",
      mainEvidenceAgainst: [
        "P75",
        "Codex Sinaiticus corrector (01C1)",
        "Codex Alexandrinus (02)",
        "Codex Vaticanus (03)",
      ],
    },
    sources: [
      { ...WILLKER_LUKE, locator: "Luke 22:43–44, PDF pp. 538–558" },
      IGNTP_LUKE,
      INTF_LISTE,
      VETUS_LATINA,
      { ...NEWADVENT, locator: "Irenaeus, Haer. 3.22.2; Hilary, De Trinitate 10.41" },
    ],
    notes: [
      "P69 omits the larger block 22:42–44 and part of 45.",
      "0171 is dated around AD 200 and preserves the end of verse 44 with a critical mark.",
      "Sinaiticus is one codex in two states: the first hand includes and a later corrector cancels.",
    ],
    units: [
      {
        id: "verses",
        label: "Presence of the two verses",
        reading:
          "ὤφθη δὲ αὐτῷ ἄγγελος ἀπ’ οὐρανοῦ ἐνισχύων αὐτόν… καὶ ἐγένετο ὁ ἱδρὼς αὐτοῦ ὡσεὶ θρόμβοι αἵματος",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses: "01* 05 017 019 024 174 230 157 565 700 892* 1241",
            aggregates: "Family 1 · Family 13 margin · Maj",
          },
          {
            label: "Latin, Syriac and Coptic",
            tone: "support",
            witnesses: "Curetonian Peshitta Harklean Palestinian-Syriac Bohairic-manuscripts",
            aggregates: "Latin evidence on this line · Diatessaron descendant tradition",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "present with an obelus or critical sign",
            witnesses: "05C 024C 0171 230 892mg 1071mg 1424",
            aggregates: "about 34 further manuscripts cited collectively · Bohairic manuscripts",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "placed after Matthew 26:39",
            witnesses: "713",
            aggregates: "Family 13",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses: "P75 01C1 02 03 022 027 029 032 0211 13* 579 1071*",
            aggregates: "four further manuscripts cited collectively (158, 512*, 552, 1128)",
          },
          {
            label: "Old Latin, Syriac, Coptic and other versions",
            tone: "competing",
            witnesses: "f (VL10) Sinaitic Sahidic Bohairic Armenian Georgian",
          },
          {
            label: "Larger omission of 22:42–44 and part of 45",
            tone: "neutral",
            witnesses: "P69",
          },
          { label: "Lacunose", tone: "neutral", witnesses: "04 33" },
        ],
      },
    ],
    fathers: [
      {
        author: "Irenaeus",
        work: "Against Heresies 3.22.2",
        date: "c. AD 180",
        use: "Direct quotation",
        reading: "Supports the KJV reading",
        locator: "Adversus haereses 3.22.2",
        url: "https://www.newadvent.org/fathers/0103322.htm",
        transmission: "Latin transmission",
      },
      {
        author: "Epiphanius",
        work: "Ancoratus 31.5 and 37.1",
        date: "c. AD 374",
        use: "Direct quotation",
        reading: "Supports the KJV reading",
        locator: "Ancoratus 31.5; 37.1",
      },
      {
        author: "Hilary of Poitiers",
        work: "De Trinitate 10.41",
        date: "c. AD 356–360",
        use: "Textual comment",
        reading: "Related",
        locator: "De Trinitate 10.41",
        url: "https://www.newadvent.org/fathers/330210.htm",
      },
      {
        author: "Jerome",
        work: "Against the Pelagians 2.16",
        date: "c. AD 415",
        use: "Manuscript report",
        reading: "Related",
        locator: "Dialogus adversus Pelagianos 2.16",
      },
      {
        author: "Cyril of Alexandria",
        work: "Contra Julianum book 12, preserved by Severus",
        date: "Fifth century",
        use: "Indirect report",
        reading: "Competing reading",
        locator: "PO 14:245–246",
        transmission: "Preserved through Severus",
      },
      {
        author: "Gregory Nazianzen",
        work: "Theological Oration IV.16",
        date: "Late fourth century",
        use: "Indirect report",
        reading: "Supports the KJV reading",
        locator: "Theological Oration IV.16, reported by Severus",
        transmission: "Preserved through Severus",
      },
      {
        author: "John Chrysostom",
        work: "Homily on “Father, if possible, let this cup pass from me”",
        date: "Late fourth century",
        use: "Indirect report",
        reading: "Supports the KJV reading",
        locator: "Homily on “Father, if possible…”, reported by Severus",
        transmission: "Preserved through Severus",
      },
      {
        author: "Athanasius",
        work: "Against the Arians 3",
        date: "Fourth century",
        use: "Allusion",
        reading: "Related",
        locator: "PG 26:440",
      },
    ],
  },
  {
    slug: "luke-23-17",
    reference: "Luke 23:17",
    summary:
      "The customary-prisoner verse is carried by Sinaiticus, Washingtonianus, Zacynthius, Sangallensis, Koridethi, Athous Lavrensis, 131, 157, 1071, Families 1 and 13 and the Byzantine tradition, with Latin, Syriac and part of Bohairic. Codex Bezae, Old Latin d, the Old Syriac and Ethiopic place it after verse 19. P75, Alexandrinus, Vaticanus, Cyprius, Guelferbytanus, Regius, Borgianus, 070, 0211, the first hand of 892 and 1241 omit it.",
    unit: "Presence of the verse, with separate states for a different word order, an expanded “one prisoner” form, the lexical variant συνήθειαν, and relocation after verse 19.",
    scope: LUKE_SCOPE,
    snapshot: {
      greekSupport:
        "9 named Greek witnesses plus Families 1 and 13 and the Maj group in Willker's apparatus",
      greekAgainst:
        "11 named Greek witnesses plus about 23 cited collectively",
      supportCategory: "Byzantine tradition with broad Latin and Syriac support",
      mainEvidenceAgainst: [
        "P75",
        "Codex Alexandrinus (02)",
        "Codex Vaticanus (03)",
        "Uncial 0211",
      ],
    },
    sources: [
      { ...WILLKER_LUKE, locator: "Luke 23:17, PDF p. 578" },
      IGNTP_LUKE,
      INTF_LISTE,
      VETUS_LATINA,
    ],
    notes: [
      "Codex Bezae and Old Latin d place the verse after verse 19.",
      "Among the eleven named Old Latin witnesses, ten preserve the verse — nine in the normal position and d relocated — and a omits it.",
    ],
    units: [
      {
        id: "verse",
        label: "Presence of the verse",
        reading: "ἀνάγκην δὲ εἶχεν ἀπολύειν αὐτοῖς κατὰ ἑορτὴν ἕνα",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses: "01 032 037 038 040 044 131 157 1071",
            aggregates: "Family 1 · Family 13 · Maj",
          },
          {
            label: "Latin, Syriac and Coptic",
            tone: "support",
            witnesses: "Bohairic-part",
            aggregates: "Latin evidence in the normal position · Syriac evidence on this line",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "present with a different word order",
            witnesses: "579 892mg 1424 1675",
            aggregates: "about 14 further manuscripts cited collectively",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "expanded with “one prisoner”",
            aggregates: "about 129 manuscripts cited collectively",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "συνήθειαν for ἀνάγκην",
            witnesses: "022 Sinaitic Curetonian Peshitta Sahidic-manuscripts",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "placed after verse 19",
            witnesses: "05 d (VL5) Sinaitic Curetonian Ethiopic",
            aggregates: "two further manuscripts cited collectively",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses: "P75 02 03 017 019 024 029 070 0211 892* 1241",
            aggregates: "about 23 further manuscripts cited collectively",
          },
          {
            label: "Old Latin, Coptic and harmony tradition",
            tone: "competing",
            witnesses: "a (VL3) Sahidic Bohairic-part Diatessaron-Arabic",
            aggregates: "a Vulgate manuscript",
          },
          { label: "Lacunose", tone: "neutral", witnesses: "33" },
        ],
      },
    ],
    fathers: [],
  },
  {
    slug: "luke-23-34",
    reference: "Luke 23:34",
    summary:
      "“Father, forgive them” stands in the first hand and second corrector of Sinaiticus, Codex Ephraemi, the second corrector of Bezae, Cyprius, Guelferbytanus, Regius, 0250, Families 1 and 13, 33, 131, 157, 700, 892, 1071 and the Byzantine tradition, with Latin, the Curetonian, Peshitta and Harklean, Bohairic manuscripts, Armenian and the Diatessaron tradition. Irenaeus quotes it directly around AD 180. P75, Vaticanus, the first hand of Bezae, Washingtonianus, Koridethi, 070, 579 and 1241 omit it.",
    unit: "Presence of the prayer, with separate states for the partial form lacking πατήρ and for layered or critically marked states.",
    scope: LUKE_SCOPE,
    snapshot: {
      greekSupport:
        "14 named Greek witnesses plus Families 1 and 13 and the Maj group in Willker's apparatus",
      greekAgainst: "9 named Greek witnesses plus seven cited collectively",
      supportCategory: "Byzantine tradition with second-century patristic quotation",
      mainEvidenceAgainst: [
        "P75",
        "Codex Vaticanus (03)",
        "Codex Bezae first hand (05*)",
        "Codex Washingtonianus (032)",
      ],
    },
    sources: [
      { ...WILLKER_LUKE, locator: "Luke 23:34, PDF pp. 587–606" },
      { ...IGNTP_LUKE, locator: "Part 2, pp. 217–218 for the patristic evidence" },
      INTF_LISTE,
      VETUS_LATINA,
      { ...NEWADVENT, locator: "Irenaeus, Haer. 3.18.5" },
    ],
    notes: [
      "The support siglum is 0250 and the minuscule is 157.",
      "Codex Alexandrinus omits πατήρ and carries a partial form.",
      "Old Latin b first included the prayer and was later erased.",
    ],
    units: [
      {
        id: "prayer",
        label: "Presence of the prayer",
        reading: "ὁ δὲ Ἰησοῦς ἔλεγεν· πάτερ, ἄφες αὐτοῖς· οὐ γὰρ οἴδασιν τί ποιοῦσιν",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses: "01* 01C2 04 05C2 017 019 024 0250 33 131 157 700 892 1071",
            aggregates: "Family 1 · Family 13 · Maj",
          },
          {
            label: "Latin, Syriac, Coptic and other versions",
            tone: "support",
            witnesses: "Curetonian Peshitta Harklean Bohairic-manuscripts Armenian Diatessaron-descendant",
            aggregates: "Latin evidence on the inclusion line",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "present without πατήρ",
            witnesses: "02",
          },
          {
            label: "Layered and marked states",
            tone: "related",
            witnesses: "01C1 05C2 b (VL4)",
            aggregates: "one later uncial tradition marks the phrase with an asterisk",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses: "P75 01C1 03 05* 032 038 070 579 1241",
            aggregates:
              "seven further manuscripts cited collectively (31*, 38, 435, 597*, 1808*, 2622L, 2633)",
          },
          {
            label: "Old Latin, Syriac and Coptic",
            tone: "competing",
            witnesses: "a (VL3) d (VL5) Sinaitic Sahidic Bohairic",
          },
        ],
      },
    ],
    fathers: [
      {
        author: "Irenaeus",
        work: "Against Heresies 3.18.5",
        date: "c. AD 180",
        use: "Direct quotation",
        reading: "Supports the KJV reading",
        locator: "Adversus haereses 3.18.5",
        url: "https://www.newadvent.org/fathers/0103318.htm",
        transmission: "Latin transmission",
      },
      {
        author: "Origen",
        work: "Homilies on Leviticus 2.1.5",
        date: "Third century",
        use: "Direct quotation",
        reading: "Supports the KJV reading",
        locator: "Homiliae in Leviticum 2.1.5",
        transmission: "Rufinus's Latin translation",
      },
      {
        author: "Hippolytus",
        work: "Against the Jews 3; Benedictions of Jacob",
        date: "Early third century",
        use: "Direct quotation",
        reading: "Supports the KJV reading",
        locator: "Demonstratio adversus Iudaeos 3; Benedictions of Jacob, p. 38",
      },
      {
        author: "Didascalia Apostolorum",
        work: "Syriac chapters 6 and 26",
        date: "Third century",
        use: "Close quotation",
        reading: "Supports the KJV reading",
        locator: "Didascalia Apostolorum 6 and 26",
        transmission: "Syriac transmission",
      },
      {
        author: "Apostolic Constitutions",
        work: "Apostolic Constitutions 2.16 and 5.14",
        date: "Late fourth century",
        use: "Direct quotation",
        reading: "Supports the KJV reading",
        locator: "Constitutiones apostolorum 2.16; 5.14",
        url: "https://www.newadvent.org/fathers/07152.htm",
      },
      {
        author: "Pseudo-Basil",
        work: "Adversus Eunomium IV",
        date: "Fourth century",
        use: "Direct quotation",
        reading: "Supports the KJV reading",
        locator: "PG 29:697.26",
      },
      {
        author: "Ambrose",
        work: "De interpellatione Iob et David 1.5.12 and 2.2.6",
        date: "Late fourth century",
        use: "Direct quotation",
        reading: "Supports the KJV reading",
        locator: "CSEL 32.2, pp. 218 and 237",
      },
      {
        author: "Gregory of Nyssa",
        work: "De perfectione christiana",
        date: "Late fourth century",
        use: "Close quotation",
        reading: "Related",
        locator: "PG 46:272",
      },
      {
        author: "Hilary of Poitiers",
        work: "De Trinitate 1.32; 10.48; 10.71",
        date: "c. AD 356–360",
        use: "Direct quotation",
        reading: "Supports the KJV reading",
        locator: "De Trinitate 1.32; 10.48; 10.71",
      },
      {
        author: "John Chrysostom",
        work: "In Ephesios; De Cruce et Latrone 1; In principium actorum; Homily 78 on Matthew",
        date: "Late fourth century",
        use: "Direct quotation",
        reading: "Supports the KJV reading",
        locator: "PG 62:55.9; PG 49:405; PG 51:111",
      },
      {
        author: "John Chrysostom",
        work: "Homily on “Father, if possible, let this cup pass from me”, §4",
        date: "Late fourth century",
        use: "Direct quotation",
        reading: "Supports the KJV reading",
        locator: "Homily on “Father, if possible…”, §4",
      },
      {
        author: "Jerome",
        work: "Epistle 120.8.9",
        date: "Early fifth century",
        use: "Direct quotation",
        reading: "Supports the KJV reading",
        locator: "PL 22:993",
      },
      {
        author: "Eusebian Canon X.320",
        work: "Eusebian canon tables",
        date: "Fourth century",
        use: "Textual comment",
        reading: "Supports the KJV reading",
        locator: "Eusebian Canon X.320",
      },
      {
        author: "Cyril of Alexandria",
        work: "Contra Julianum book 13, preserved by Arethas",
        date: "Fifth century",
        use: "Textual comment",
        reading: "Competing reading",
        locator: "Arethas, catena on Revelation, p. 287",
        transmission: "Preserved through Arethas",
      },
      {
        author: "Hegesippus",
        work: "Reported in Eusebius, Ecclesiastical History 2.23",
        date: "c. AD 175–189",
        use: "Parallel tradition",
        reading: "Related",
        locator: "Historia ecclesiastica 2.23",
        url: "https://www.newadvent.org/fathers/250102.htm",
        transmission: "Reported by Eusebius",
      },
      {
        author: "Marcion",
        work: "Reported in Epiphanius, Panarion 42.11.6, and Tertullian, Adversus Marcionem 4.42.4",
        date: "Second century",
        use: "Indirect report",
        reading: "Competing reading",
        locator: "Panarion 42.11.6 scholion 71; Adversus Marcionem 4.42.4",
      },
    ],
  },
  {
    slug: "luke-24-6",
    reference: "Luke 24:6",
    summary:
      "“He is not here, but is risen” is carried by P75, Sinaiticus, Alexandrinus, Vaticanus and the broad Greek tradition, with Old Latin aur, f and q and the Vulgate. Codex Bezae is the one Greek witness in the apparatus that omits the clause, together with seven named Old Latin witnesses, Armenian manuscripts and Georgian II.",
    unit: "The clause οὐκ ἔστιν ὧδε, ἀλλὰ ἠγέρθη, with related wording variants kept separate.",
    scope: LUKE_SCOPE,
    snapshot: {
      greekSupport: "P75, Sinaiticus, Alexandrinus, Vaticanus and the Maj group in Willker's apparatus",
      greekAgainst: "Codex Bezae, the sole named Greek omission witness",
      supportCategory: "The broad Greek tradition with early papyrus support",
      mainEvidenceAgainst: [
        "Codex Bezae (05)",
        "Old Latin a, b, d, e, ff2, r1, l",
        "Georgian II",
      ],
    },
    sources: [
      { ...WILLKER_LUKE, locator: "Luke 24:6, PDF p. 632" },
      IGNTP_LUKE,
      INTF_LISTE,
      VETUS_LATINA,
    ],
    units: [
      {
        id: "clause",
        label: "The clause “He is not here, but is risen”",
        reading: "οὐκ ἔστιν ὧδε, ἀλλὰ ἠγέρθη",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses: "P75 01 02 03",
            aggregates: "Maj",
          },
          {
            label: "Old Latin and Vulgate",
            tone: "support",
            witnesses: "aur (VL15) f (VL10) q (VL13)",
            aggregates: "Vulgate tradition",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "related wording",
            witnesses: "04* 032",
            note: "04* lacks ἀλλά; 032 reads ἀνέστη.",
          },
          {
            label: "Old Latin and Syriac",
            tone: "related",
            witnesses: "c (VL6) Peshitta",
          },
          { label: "Greek manuscripts", tone: "competing", witnesses: "05" },
          {
            label: "Old Latin and other versions",
            tone: "competing",
            witnesses:
              "a (VL3) b (VL4) d (VL5) e (VL2) ff2 (VL8) r1 (VL14) l (VL11) Armenian-manuscripts Georgian-II",
          },
        ],
      },
    ],
    fathers: [],
  },
  {
    slug: "luke-24-40",
    reference: "Luke 24:40",
    summary:
      "The verse is carried by P75, Sinaiticus, Alexandrinus, Vaticanus, Washingtonianus and the broad Greek tradition, with Old Latin aur, c, f and q, the Vulgate, the Peshitta, Harklean and Palestinian Syriac and Coptic. Codex Bezae is the one Greek witness in the apparatus that omits it, together with seven named Old Latin witnesses and the Sinaitic and Curetonian Syriac.",
    unit: "Presence of the whole verse.",
    scope: LUKE_SCOPE,
    snapshot: {
      greekSupport: "P75, Sinaiticus, Alexandrinus, Vaticanus, Washingtonianus and the Maj group",
      greekAgainst: "Codex Bezae, the sole named Greek omission witness",
      supportCategory: "The broad Greek tradition with early papyrus support",
      mainEvidenceAgainst: [
        "Codex Bezae (05)",
        "Old Latin a, b, d, e, ff2, l, r1",
        "Sinaitic and Curetonian Syriac",
      ],
    },
    sources: [
      { ...WILLKER_LUKE, locator: "Luke 24:40, PDF p. 659" },
      IGNTP_LUKE,
      INTF_LISTE,
      VETUS_LATINA,
    ],
    notes: [
      "Four of the eleven named Old Latin witnesses include the verse and seven omit it.",
      "Codex Ephraemi is lacunose from Luke 24:7–45.",
    ],
    units: [
      {
        id: "verse",
        label: "Presence of the whole verse",
        reading: "καὶ τοῦτο εἰπὼν ἔδειξεν αὐτοῖς τὰς χεῖρας καὶ τοὺς πόδας",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses: "P75 01 02 03 032",
            aggregates: "Maj",
          },
          {
            label: "Old Latin and Vulgate",
            tone: "support",
            witnesses: "aur (VL15) c (VL6) f (VL10) q (VL13)",
            aggregates: "Vulgate tradition",
          },
          {
            label: "Syriac and Coptic",
            tone: "support",
            witnesses: "Peshitta Harklean Palestinian-Syriac",
            aggregates: "Coptic evidence on this line",
          },
          { label: "Greek manuscripts", tone: "competing", witnesses: "05" },
          {
            label: "Old Latin and Syriac",
            tone: "competing",
            witnesses:
              "a (VL3) b (VL4) d (VL5) e (VL2) ff2 (VL8) l (VL11) r1 (VL14) Sinaitic Curetonian",
          },
          { label: "Lacunose", tone: "neutral", witnesses: "04" },
        ],
      },
    ],
    fathers: [],
  },
  {
    slug: "luke-24-51",
    reference: "Luke 24:51",
    summary:
      "The ascension clause is carried by P75, Alexandrinus, Vaticanus, Ephraemi, Washingtonianus and the broad Greek tradition, with Old Latin aur, c, f, gat, q and r1, the Vulgate, the Peshitta, Harklean and Palestinian Syriac and Coptic. The first hand of Sinaiticus and Codex Bezae omit it, and Sinaiticus was corrected to include it.",
    unit: "The clause καὶ ἀνεφέρετο εἰς τὸν οὐρανόν only, kept apart from the preceding διέστη ἀπ’ αὐτῶν.",
    scope: LUKE_SCOPE,
    snapshot: {
      greekSupport: "P75, Alexandrinus, Vaticanus, Ephraemi, Washingtonianus and the Maj group",
      greekAgainst: "2 named Greek states: the first hand of Sinaiticus and Codex Bezae",
      supportCategory: "The broad Greek tradition with early papyrus support",
      mainEvidenceAgainst: [
        "Codex Sinaiticus first hand (01*)",
        "Codex Bezae (05)",
        "Old Latin a, b, d, e, ff2, l",
      ],
    },
    sources: [
      { ...WILLKER_LUKE, locator: "Luke 24:51, PDF pp. 672–675" },
      IGNTP_LUKE,
      INTF_LISTE,
      VETUS_LATINA,
    ],
    notes: [
      "The Sinaitic Syriac carries a shorter equivalent, and the Curetonian is lacunose at Luke 24:44–51.",
    ],
    units: [
      {
        id: "ascension",
        label: "The ascension clause",
        reading: "καὶ ἀνεφέρετο εἰς τὸν οὐρανόν",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses: "P75 02 03 04 032",
            aggregates: "Maj",
          },
          {
            label: "Old Latin and Vulgate",
            tone: "support",
            witnesses: "aur (VL15) c (VL6) f (VL10) gat (VL30) q (VL13) r1 (VL14)",
            aggregates: "Vulgate tradition",
          },
          {
            label: "Syriac and Coptic",
            tone: "support",
            witnesses: "Peshitta Harklean Palestinian-Syriac",
            aggregates: "Coptic evidence on this line",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "supplied by a corrector",
            witnesses: "01C2",
          },
          {
            label: "Syriac",
            tone: "related",
            reading: "a shorter equivalent",
            witnesses: "Sinaitic",
          },
          { label: "Greek manuscripts", tone: "competing", witnesses: "01* 05" },
          {
            label: "Old Latin and other versions",
            tone: "competing",
            witnesses: "a (VL3) b (VL4) d (VL5) e (VL2) ff2 (VL8) l (VL11) Georgian-I",
          },
          { label: "Lacunose", tone: "neutral", witnesses: "Curetonian" },
        ],
      },
    ],
    fathers: [],
  },
  {
    slug: "luke-24-52",
    reference: "Luke 24:52",
    summary:
      "“Worshipped him” is carried by P75, Sinaiticus, Alexandrinus, Vaticanus, Ephraemi, Washingtonianus and the broad Greek tradition, with Old Latin aur, c, f and q, the Vulgate, the Peshitta, Harklean and Palestinian Syriac and Coptic. Codex Bezae is the one Greek witness in the apparatus that omits it, and 700, 1344, 1253 and lectionary 253 carry an objectless “having worshipped”.",
    unit: "Presence of the phrase “worshipped him”, with the objectless προσκυνήσαντες form kept separate.",
    scope: LUKE_SCOPE,
    snapshot: {
      greekSupport:
        "P75, Sinaiticus, Alexandrinus, Vaticanus, Ephraemi, Washingtonianus and the Maj group",
      greekAgainst: "Codex Bezae, the sole named Greek omission witness",
      supportCategory: "The broad Greek tradition with early papyrus support",
      mainEvidenceAgainst: [
        "Codex Bezae (05)",
        "Old Latin a, b, d, e, ff2, l",
        "Sinaitic Syriac",
      ],
    },
    sources: [
      { ...WILLKER_LUKE, locator: "Luke 24:52, PDF p. 676" },
      IGNTP_LUKE,
      INTF_LISTE,
      VETUS_LATINA,
    ],
    notes: [
      "Four of the ten named Old Latin witnesses carry the exact phrase and six omit it.",
      "The Curetonian Syriac is lacunose here.",
    ],
    units: [
      {
        id: "worship",
        label: "The phrase “worshipped him”",
        reading: "καὶ αὐτοὶ προσκυνήσαντες αὐτόν",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses: "P75 01 02 03 04 032",
            aggregates: "Maj",
          },
          {
            label: "Old Latin and Vulgate",
            tone: "support",
            witnesses: "aur (VL15) c (VL6) f (VL10) q (VL13)",
            aggregates: "Vulgate tradition",
          },
          {
            label: "Syriac and Coptic",
            tone: "support",
            witnesses: "Peshitta Harklean Palestinian-Syriac",
            aggregates: "Coptic evidence on this line",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "προσκυνήσαντες without the object",
            witnesses: "700 1253 1344 L253",
            aggregates: "some Vulgate manuscripts",
          },
          { label: "Greek manuscripts", tone: "competing", witnesses: "05" },
          {
            label: "Old Latin, Syriac and other versions",
            tone: "competing",
            witnesses:
              "a (VL3) b (VL4) d (VL5) e (VL2) ff2 (VL8) l (VL11) Sinaitic Georgian-II",
          },
          { label: "Lacunose", tone: "neutral", witnesses: "Curetonian" },
        ],
      },
    ],
    fathers: [],
  },

  {
    slug: "john-1-18",
    reference: "John 1:18",
    summary:
      "In the 236-document IGNTP/ITSEE John corpus, 132 named Greek entries read υἱός and seven read θεός. GA 2192 carries the expanded υἱὸς τοῦ θεοῦ. All twenty collatable rows in the official Vetus Latina John synopsis read unigenitus filius, and Tertullian and Hilary use the Son reading directly.",
    unit: "The noun following μονογενής: υἱός against θεός, with the expanded υἱὸς τοῦ θεοῦ kept separate.",
    scope: JOHN_SCOPE,
    snapshot: {
      greekSupport: "132 named Greek entries in the 236-document IGNTP John corpus",
      greekAgainst: "7 named Greek states in the 236-document IGNTP John corpus",
      supportCategory: "132 named entries in the selected IGNTP John corpus",
      mainEvidenceAgainst: ["P66", "P75", "Codex Sinaiticus (01)", "Codex Vaticanus (03)"],
    },
    sources: [
      { ...IGNTP_JOHN, locator: "John 1:18, word address 12" },
      { ...VL_JOHN, locator: "John 1:18" },
      { ...SAHIDIC_JOHN, locator: "John 1:18" },
      INTF_LISTE,
      { ...NEWADVENT, locator: "Tertullian, Adv. Prax. 15; Hilary, De Trinitate 5.33–34" },
      ECM_JOHN_INTRO,
      {
        ...ECM_JOHN_INSTRUCTIONS,
        locator: "Meaning of the state suffixes * C S r V used in the rosters",
      },
      {
        ...VL_JOHN_REGISTER,
        locator: "Identity and physical date of the VL sigla named at John 1:18",
      },
      { ...SAHIDIC_JOHN_XML, locator: "Raw Sahidic John 1:18 verse files" },
      { ...PROTO_BOHAIRIC, locator: "Proto-Bohairic John 1:18" },
    ],
    notes: [
      "The 132 entries include manuscript, supplement and lectionary states.",
      "The Sahidic text carries a conflated form with God language followed by “the only Son”.",
    ],
    units: [
      {
        id: "noun",
        label: "The noun after μονογενής",
        reading: "υἱός",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses:
              "02 04C2 07 011 017 028 032S 033 037 038 041 044 045 063 0141 0211 1 13 18 22 35 69 109 118 124 138 157 168 173 209 213 226 265 295 333 346 357 377 382 397 430 543 544 565 579 597 732 788 792 799 807 821 826 828 841 865 884 892 983 992 994 1009 1010 1014 1029 1071 1079 1093 1128 1192 1210 1219 1230 1241 1242 1253 1278 1293 1319 1320 1321 1344 1424 1463 1546 1561 1571 1582 1654 1689 1788 1797 2106 2193 2223 2372 2411 2561 2575 2615 2680 2713 2718 2766 2768 2786 2886",
          },
          {
            label: "Lectionaries",
            tone: "support",
            witnesses:
              "L5 L17 L32 L60 L141 L252 L253 L335 L387 L425 L638 L663 L704 L735 L770 L847 L1000S L1073 L1075 L1076 L1086 L1091 L1096 L1552 L1692",
          },
          {
            label: "Old Latin",
            tone: "support",
            reading: "unigenitus filius",
            witnesses:
              "VL2 VL3 VL4 VL6 VL7 VL8 VL9A VL10 VL11 VL11A VL13 VL14 VL15 VL27 VL29 VL30 VL33 VL35 VL47 VL48",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "υἱὸς τοῦ θεοῦ",
            witnesses: "2192",
          },
          {
            label: "Coptic",
            tone: "related",
            reading: "the conflated Sahidic form",
            witnesses: "sa1 sa3 sa4 sa5 sa9 sa13 sa134",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            reading: "θεός",
            witnesses: "P66 P75 01 03 04* 019 33",
          },
          {
            label: "Coptic",
            tone: "neutral",
            reading: "reconstructed at the target",
            witnesses: "sa10 sa40 sa103 sa117 sa139 pbo",
            note:
              "Target letters are mostly or entirely editorial reconstruction; proto-Bohairic has the phrase wholly inside restoration brackets.",
          },
          {
            label: "Coptic",
            tone: "neutral",
            reading: "fragmentary, unassigned",
            witnesses: "fa16",
            note:
              "Fayumic fa16 (GA 0260 / P.Berlin 5542) is fragmentary at the target and cannot be assigned cleanly.",
          },
          {
            label: "Deficient at the verse",
            tone: "neutral",
            witnesses:
              "P2 P5 P6 P22 P28 P36 P39 P44 P45 P52 P55 P59 P60 P63 P76 P80 P84 P90 P93 P95 P106 P107 P108 P109 P119 P120 P121 P122 P128 05 05S 022 024 026 029 032 050 054 060 065 068 070 078 083 086 087 091 0109 0127 0145 0162 0210 0216 0217 0218 0233 0234 0238 0256 0260 0264 0268 0290 0299 0301 0302 0309 118S 213S 249 317 333S 565S 869 892S 994S 1010S 1128S 1571S 1582S 2193S 2561S 2585 2790 L141S L329 L640S L640 L704S L1000 L1076S L1077 L1082 L1091S L1100 L1692S2 L1692S",
          },
        ],
      },
    ],
    fathers: [
      {
        author: "Tertullian",
        work: "Against Praxeas 15",
        date: "Early third century",
        use: "Direct quotation",
        reading: "Supports the KJV reading",
        locator: "Adversus Praxean 15",
        url: "https://www.newadvent.org/fathers/0317.htm",
        transmission: "Latin",
      },
      {
        author: "Hilary of Poitiers",
        work: "De Trinitate 5.33–34 and 6.39",
        date: "c. AD 356–360",
        use: "Direct quotation",
        reading: "Supports the KJV reading",
        locator: "De Trinitate 5.33–34; 6.39",
        url: "https://www.newadvent.org/fathers/330205.htm",
        transmission: "Latin",
      },
      {
        author: "Irenaeus",
        work: "Against Heresies 3.11.6",
        date: "c. AD 180",
        use: "Close quotation",
        reading: "Related",
        locator: "Adversus haereses 3.11.6",
        url: "https://www.newadvent.org/fathers/0103311.htm",
        transmission: "Latin transmission",
      },
    ],
  },
  {
    slug: "john-3-13",
    reference: "John 3:13",
    summary:
      "In the 236-document IGNTP/ITSEE John corpus, 151 named Greek entries carry ὁ ὢν ἐν τῷ οὐρανῷ and fourteen omit the final clause. All collatable rows in the official Vetus Latina John synopsis carry a final heavenly clause. Four further entries read “from heaven”, and GA 2575 omits the whole verse.",
    unit: "The final clause after ὁ υἱὸς τοῦ ἀνθρώπου.",
    scope: JOHN_SCOPE,
    snapshot: {
      greekSupport: "151 named Greek entries in the 236-document IGNTP John corpus",
      greekAgainst: "14 named Greek states in the 236-document IGNTP John corpus",
      supportCategory: "151 named entries in the selected IGNTP John corpus",
      mainEvidenceAgainst: ["P66", "P75", "Codex Sinaiticus (01)", "Codex Vaticanus (03)"],
    },
    sources: [
      { ...IGNTP_JOHN, locator: "John 3:13, word address 35" },
      { ...VL_JOHN, locator: "John 3:13" },
      { ...SAHIDIC_JOHN, locator: "John 3:13" },
      INTF_LISTE,
      ECM_JOHN_INTRO,
      {
        ...ECM_JOHN_INSTRUCTIONS,
        locator: "Meaning of the state suffixes r * C S used in the John 3:13 roster",
      },
      {
        ...VL_JOHN_REGISTER,
        locator: "Identity and physical date of the VL sigla named at John 3:13",
      },
      { ...SAHIDIC_JOHN_XML, locator: "The 17 extant Sahidic John 3:13 witnesses" },
      { ...PROTO_BOHAIRIC, locator: "Proto-Bohairic lacuna at John 3:1–32" },
    ],
    notes: ["GA 2575 omits the whole verse."],
    units: [
      {
        id: "final-clause",
        label: "The final clause",
        reading: "ὁ ὢν ἐν τῷ οὐρανῷ",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses:
              "02 07 011 017r 022 028 037 038 041 044 045 050 063r 0211 1 13 18 22 35 69 118 124 138 157 168 173 209 213 226 265 295 333 346 357 377 382 430 544 565 579*r 579C 597 732 788 792r 799 807 826 828 841 884 892 983 992 1009r 1029 1071 1079 1093 1128 1192 1210 1219 1230 1242 1253 1278 1319 1320 1321 1344 1424 1463 1546 1561 1571 1582 1654 1689 1788 1797 2106 2192 2193 2223 2372 2411 2561 2585 2615 2680 2713 2718 2766 2768 2786 2790 2886",
            aggregates: "the selected lectionary states encoded in the IGNTP John XML",
          },
          {
            label: "Old Latin",
            tone: "support",
            reading: "qui est in caelo / caelis",
            witnesses:
              "VL3 VL4 VL6 VL7 VL8 VL9A VL10 VL11 VL11A VL13 VL14 VL15 VL22 VL27 VL29 VL30 VL32 VL33 VL35 VL47 VL48",
            aggregates:
              "all 23 collatable Vetus Latina John synopsis rows carry a final heavenly clause",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "ὁ ὢν ἐκ τοῦ οὐρανοῦ",
            witnesses: "0141 397 821 L335-Sp2",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "ὁ ὢν ἐκ τῷ οὐρανῷ",
            witnesses: "L335-S1W1D5",
          },
          {
            label: "Old Latin",
            tone: "related",
            reading: "qui erat in caelis",
            witnesses: "VL2",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses: "P66 P75 01 03 019 029 032S 083 086 33 109 1010 1241 1293",
          },
          {
            label: "Coptic",
            tone: "competing",
            witnesses: "Sahidic fa6",
            aggregates:
              "all 17 extant Sahidic John XML witnesses, and the printed Sahidic critical text",
            note: "All extant Sahidic witnesses end the verse at “Son of Man”.",
          },
          {
            label: "Coptic",
            tone: "neutral",
            witnesses: "proto-Bohairic",
            note: "Lacunose throughout John 3:1–32.",
          },
          {
            label: "Whole verse absent",
            tone: "neutral",
            witnesses: "2575",
          },
          {
            label: "Deficient at the verse",
            tone: "neutral",
            witnesses:
              "P2 P5 P6 P22 P28 P36 P39 P44 P45 P52 P55 P59 P60 P63 P76 P80 P84 P90 P93 P95 P106 P107 P108 P109 P119 P120 P121 P122 P128 04 05 05S 024 026 032 033 054 060 065 068 070 078 087 091 0109 0127 0145 0162 0210 0216 0217 0218 0233 0234 0238 0256 0260 0264 0268 0290 0299 0301 0302 0309 118S 213S 249 317 333S 543 565S 865 869 892S 994 994S 1010S 1014 1128S 1571S 1582S",
          },
        ],
      },
    ],
    fathers: [],
  },
  {
    slug: "john-5-3b-4",
    reference: "John 5:3b–4",
    summary:
      "The two clauses travel separately. In the 236-document IGNTP/ITSEE John corpus, ten named Greek states omit the waiting clause at 5:3b and thirteen omit the whole of verse 4, while the rest of the enumerated corpus carries the longer text. Seventeen rows of the official Vetus Latina John synopsis carry verse 4 and five omit it. Ambrose quotes the long verse twice and Chrysostom expounds it.",
    unit: "Two independent units: 5:3b, “waiting for the moving of the water”, and the whole of verse 4, the angel explanation.",
    scope: JOHN_SCOPE,
    snapshot: {
      greekSupport: "138 named clause-present states at 5:3b; 134 named angel-opening states at 5:4",
      greekAgainst:
        "10 named Greek states at 5:3b and 13 at verse 4 in the 236-document IGNTP John corpus",
      supportCategory: "The named clause-present states in the selected IGNTP John corpus",
      mainEvidenceAgainst: ["P66", "P75", "Codex Sinaiticus (01)", "Codex Vaticanus (03)"],
    },
    sources: [
      { ...IGNTP_JOHN, locator: "John 5:3 word address 20–28; John 5:4 whole verse" },
      { ...VL_JOHN, locator: "John 5:4" },
      { ...SAHIDIC_JOHN, locator: "John 5:3–4" },
      INTF_LISTE,
      { ...NEWADVENT, locator: "Ambrose, De mysteriis 4.22; Chrysostom, Hom. in Ioann. 36" },
      ECM_JOHN_INTRO,
      {
        ...ECM_JOHN_INSTRUCTIONS,
        locator: "Meaning of the state suffixes * C S used at John 5:3–4",
      },
      {
        ...VL_JOHN_REGISTER,
        locator: "Identity and physical date of the VL sigla named at John 5:4",
      },
      { ...SAHIDIC_JOHN_XML, locator: "Raw Sahidic John 5:3 and 5:4 files" },
      { ...PROTO_BOHAIRIC, locator: "Proto-Bohairic John 5:3–4; verse 4 unattested" },
      {
        label: "New Advent Fathers of the Church",
        url: "https://www.newadvent.org/fathers/0321.htm",
        locator: "Tertullian, De baptismo 5",
      },
      {
        label: "New Advent Fathers of the Church",
        url: "https://www.newadvent.org/fathers/34021.htm",
        locator: "Ambrose, De Spiritu Sancto 1.88",
      },
    ],
    notes: [
      "GA 02 preserves verse 4 and omits its opening ἄγγελος γὰρ κυρίου; 02C* supplies it.",
    ],
    units: [
      {
        id: "v3b",
        label: "John 5:3b — “waiting for the moving of the water”",
        reading: "ἐκδεχομένων τὴν τοῦ ὕδατος κίνησιν",
        groups: [
          {
            label: "Greek clause-present states",
            tone: "support",
            witnesses:
              "02 04C2r 05 07* 07Cr 011 017 028 037 038*r 038Cb 041 044 045 063V 078 0211 0233 1 13 18 22 33 35 69 109 118 124 138 168 209 213 226 249 265 295 333 357 377 382r 397 430 544 565 579 597 732 792 799 807 826 828 841 865 884 892 983 992 994 1009 1010 1014 1029 1071 1079 1093 1128 1192 1210 1219 1230 1241 1242 1253 1278 1293 1319 1320 1321C 1344 1424 1463 1546 1561 1571r 1582 1654 1689 1788 1797 2106 2192 2193 2223 2372 2411 2561 2575 2585 2615 2680 2713 2718 2766 2768 2786 2790 2886 L5-S1W4D1 L17-S1W4D1r L32-S1W4D1 L60-S1W4D1r L141-S1W4D1 L252-S1W4D1 L253-S1W4D1 L329-S1W4D1 L335-S1W4D1 L387-S1W4D1 L425-S1W4D1 L638-S1W4D1 L640-S1W4D1 L663-S1W4D1 L704-S1W4D1 L735-S1W4D1 L770-S1W4D1 L847-S1W4D1 L1000-S1W4D1 L1073-S1W4D1 L1075-S1W4D1 L1076-S1W4D1 L1086-S1W4D1 L1091-S1W4D1 L1096-S1W4D1 L1100-S1W4D1 L1552-S1W4D1 L1692-S1W4D1 032S 173",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses: "P66 P75 01 03 04* 019 029 0141 157 821",
          },
          {
            label: "Coptic",
            tone: "competing",
            witnesses: "proto-Bohairic",
            aggregates: "the ten raw Sahidic John 5:3 files",
            note:
              "The Sahidic 5:3 files and proto-Bohairic end with the sick-person list and have no 3b clause.",
          },
          {
            label: "Deficient at John 5:3",
            tone: "neutral",
            witnesses:
              "P2 P5 P6 P22 P28 P36 P39 P44 P45 P52 P55 P59 P60 P63 P76 P80 P84 P90 P93 P95 P106 P107 P108 P109 P119 P120 P121 P122 P128 05S 022 024 026 032 033 050 054 060 065 068 070 083 086 087 091 0109 0127 0145 0162 0210 0216 0217 0218 0234 0238 0256 0260 0264 0268 0290 0299 0301 0302 0309 118S 213S 317 333S 346 543 565S 788 869 892S 994S 1010S 1128S 1321* 1571S 1582S 2193S 2561S L141S L640S L704S L1000S L1076S L1077 L1082 L1091S L1692S2 L1692S",
          },
        ],
      },
      {
        id: "v4",
        label: "John 5:4 — the angel explanation",
        reading:
          "ἄγγελος γὰρ κυρίου κατὰ καιρὸν κατέβαινεν ἐν τῇ κολυμβήθρᾳ καὶ ἐτάρασσεν τὸ ὕδωρ…",
        groups: [
          {
            label: "Greek states with the angel opening",
            tone: "support",
            witnesses:
              "02C* 04C2 07 011 017 028 037 038 041 044 045 063 078 0141 0211 0233 1 13 18 22 35 69 109 118 124 138 168 173 209 213 226 249 265 295 333 357 377 382 397 430 544 565 579 597 732 792 799 807 826 828 841 865 884 892 983 992 994 1009 1010 1014 1029 1071 1079 1093 1128 1192 1210 1219 1230 1241 1242 1253 1278 1293 1319 1320 1321C 1344 1424 1463 1546 1561 1571 1582 1654 1689 1788 1797 2106 2192 2193 2223 2372 2411 2561 2575 2585 2615 2680 2713 2766 2768 2786 2790 2886 L5-S1W4D1 L17-S1W4D1 L32-S1W4D1 L60-S1W4D1 L141-S1W4D1 L252-S1W4D1 L253-S1W4D1 L329-S1W4D1 L335-S1W4D1 L387-S1W4D1 L425-S1W4D1 L638-S1W4D1 L640-S1W4D1 L663-S1W4D1 L704-S1W4D1 L735-S1W4D1 L770-S1W4D1 L847-S1W4D1 L1000-S1W4D1 L1073-S1W4D1 L1075-S1W4D1 L1076-S1W4D1 L1086-S1W4D1 L1091-S1W4D1 L1096-S1W4D1 L1100-S1W4D1 L1552-S1W4D1 L1692-S1W4D1 019",
          },
          {
            label: "Old Latin",
            tone: "support",
            witnesses:
              "VL2 VL3 VL4 VL6 VL7 VL8 VL9A VL14 VL15 VL22 VL27 VL29 VL30 VL33 VL35 VL47 VL48",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses: "P66 P75 01 03 04* 05 029 032S 33 157 821 1321* 2718",
          },
          {
            label: "Old Latin",
            tone: "competing",
            witnesses: "VL5 VL10 VL11 VL11A VL13",
          },
          {
            label: "Coptic",
            tone: "competing",
            witnesses: "sa1",
          },
          {
            label: "Greek manuscripts",
            tone: "related",
            reading: "verse 4 without its opening ἄγγελος γὰρ κυρίου",
            witnesses: "02* 02C*",
            note:
              "02* preserves verse 4 but omits its opening ἄγγελος γὰρ κυρίου; 02C* supplies it. Two states of one codex.",
          },
          {
            label: "Coptic",
            tone: "neutral",
            reading: "damaged at the point",
            witnesses: "sa103 sa101",
            note:
              "sa103 is damaged and is not a second clean omission; sa101 carries damaged tail material from the sick-person list, not verse 4.",
          },
          {
            label: "Not transmitted in the Sahidic tradition",
            tone: "neutral",
            witnesses: "Sahidic proto-Bohairic",
          },
          {
            label: "Deficient at John 5:4",
            tone: "neutral",
            witnesses:
              "P2 P5 P6 P22 P28 P36 P39 P44 P45 P52 P55 P59 P60 P63 P76 P80 P84 P90 P93 P95 P106 P107 P108 P109 P119 P120 P121 P122 P128 05S 022 024 026 032 033 050 054 060 065 068 070 083 086 087 091 0109 0127 0145 0162 0210 0216 0217 0218 0234 0238 0256 0260 0264 0268 0290 0299 0301 0302 0309 118S 213S 317 333S 346 543 565S 788 869 892S 994S 1010S 1128S 1571S 1582S 2193S 2561S L141S L640S L704S L1000S L1076S L1077 L1082 L1091S L1692S2 L1692S",
          },
        ],
      },
    ],
    fathers: [
      {
        author: "Ambrose",
        work: "De mysteriis 4.22",
        date: "c. AD 390",
        use: "Direct quotation",
        reading: "Supports the KJV reading",
        locator: "De mysteriis 4.22",
        url: "https://www.newadvent.org/fathers/3405.htm",
        transmission: "Latin",
      },
      {
        author: "Ambrose",
        work: "De Spiritu Sancto 1.88",
        date: "c. AD 381",
        use: "Direct quotation",
        reading: "Supports the KJV reading",
        locator: "De Spiritu Sancto 1.88",
        url: "https://www.newadvent.org/fathers/34021.htm",
        transmission: "Latin",
      },
      {
        author: "John Chrysostom",
        work: "Homilies on John 36",
        date: "Late fourth century",
        use: "Direct quotation",
        reading: "Supports the KJV reading",
        locator: "Homiliae in Ioannem 36, on John 5:2–3",
        url: "https://www.newadvent.org/fathers/240136.htm",
      },
      {
        author: "Tertullian",
        work: "On Baptism 5",
        date: "Early third century",
        use: "Close quotation",
        reading: "Related",
        locator: "De baptismo 5",
        url: "https://www.newadvent.org/fathers/0321.htm",
        transmission: "Latin",
      },
      {
        author: "Didymus the Blind",
        work: "De Trinitate 2.14",
        date: "Fourth century",
        use: "Parallel tradition",
        reading: "Related",
        locator: "De Trinitate 2.14",
        transmission: "Greek; the attribution of the work is disputed",
      },
    ],
  },
  {
    slug: "john-6-47",
    reference: "John 6:47",
    summary:
      "In the 236-document IGNTP/ITSEE John corpus, 107 named Greek entries carry εἰς ἐμέ and ten omit it. Every collatable row of the official Vetus Latina John synopsis except VL22 reads credit in me, and the Peshitta, Harklean, Sahidic, Middle Fayumic and proto-Bohairic are long.",
    unit: "Whether εἰς ἐμέ follows ὁ πιστεύων.",
    scope: JOHN_SCOPE,
    snapshot: {
      greekSupport: "107 named Greek entries in the 236-document IGNTP John corpus",
      greekAgainst: "10 named Greek states in the 236-document IGNTP John corpus",
      supportCategory: "107 named entries in the selected IGNTP John corpus",
      mainEvidenceAgainst: ["P66", "P75", "Codex Sinaiticus (01)", "Codex Vaticanus (03)"],
    },
    sources: [
      { ...IGNTP_JOHN, locator: "John 6:47, word address 13" },
      { ...VL_JOHN, locator: "John 6:47" },
      { ...SAHIDIC_JOHN, locator: "John 6:47" },
      KIRAZ,
      INTF_LISTE,
      ECM_JOHN_INTRO,
      {
        ...ECM_JOHN_INSTRUCTIONS,
        locator: "Meaning of the state suffixes r and S used at John 6:47",
      },
      {
        ...VL_JOHN_REGISTER,
        locator: "Identity and physical date of the VL sigla named at John 6:47",
      },
      { ...SAHIDIC_JOHN_XML, locator: "The 11 raw Sahidic John 6:47 verse files" },
      { ...PROTO_BOHAIRIC, locator: "Proto-Bohairic John 6:47 reads ⲉⲣⲟⲓ" },
    ],
    notes: [
      "GA 04 and 091 are lacunose at this unit.",
      "The Old Syriac Sinaitic and Curetonian read “believes in God”.",
    ],
    units: [
      {
        id: "eis-eme",
        label: "Whether εἰς ἐμέ follows ὁ πιστεύων",
        reading: "εἰς ἐμέ",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses:
              "02 05 07 011 017 022 028 037 041 044 045 0141 0211 0233 1 13 18 22 33 35 69 109 118 124 138 157 168 173 209 213 226 249 265 295 333 357 377 382 397 430 543 544 565 579r 597 732 788 792 799 807 821 826 828 841 869 884 983 992 994 1009 1010 1014 1029 1079 1093 1128 1192 1210 1219 1230 1241 1242 1253 1278 1293 1319 1320 1321 1344 1424 1463 1546 1561 1571S 1582 1654 1689 1788 1797 2106 2192 2193 2223 2372 2411 2561 2575 2585 2615 2680 2713 2718 2766 2768 2786 2790 2886",
            aggregates: "plus the selected lectionary entries encoded in the IGNTP John XML",
          },
          {
            label: "Old Latin",
            tone: "support",
            reading: "credit in me",
            witnesses:
              "VL2 VL3 VL4 VL5 VL6 VL7 VL8 VL9A VL10 VL10A VL11A VL13 VL14 VL15 VL22 VL27 VL29 VL30 VL35 VL39 VL40 VL46 VL47 VL48",
          },
          {
            label: "Syriac and Coptic",
            tone: "support",
            witnesses: "Peshitta Harklean Sahidic cw1 proto-Bohairic",
            aggregates:
              "the printed Sahidic critical text and all 11 raw Sahidic John 6:47 files",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses: "P66 P75 01 03 019 029 032 038 892 1071",
          },
          {
            label: "Syriac",
            tone: "related",
            reading: "“believes in God”",
            witnesses: "Sinaitic Curetonian",
          },
          { label: "Lacunose", tone: "neutral", witnesses: "04 091" },
        ],
      },
    ],
    fathers: [],
  },
  {
    slug: "john-7-53-8-11",
    reference: "John 7:53–8:11",
    summary:
      "In the 236-document IGNTP/ITSEE John corpus at John 7:53, 71 documentary entries carry the verse at the standard location, 49 omit it there and 116 are deficient. Codex Bezae is the earliest extant Greek manuscript carrying the story at the Johannine location. Sixteen rows of the official Vetus Latina John synopsis carry it at the normal location, and Ambrose, Jerome and Augustine all treat it as Johannine.",
    unit: "Presence of the story at the standard Johannine location, with relocation, first-hand-blank and deficiency kept as separate states.",
    scope: JOHN_SCOPE,
    snapshot: {
      greekSupport: "71 documentary entries at the standard location in the 236-document IGNTP John corpus",
      greekAgainst: "49 named entries omit at the standard location",
      supportCategory: "71 entries at the standard location in the selected IGNTP John corpus",
      mainEvidenceAgainst: ["P66", "P75", "Codex Sinaiticus (01)", "Codex Vaticanus (03)"],
    },
    sources: [
      { ...IGNTP_JOHN, locator: "John 7:53, whole verse" },
      { ...VL_JOHN, locator: "John 7:53" },
      { ...SAHIDIC_JOHN, locator: "John 7:53–8:11" },
      INTF_LISTE,
      { ...NEWADVENT, locator: "Ambrose, Ep. 26.2; Jerome, Adv. Pelag. 2.17" },
      {
        label: "Augustine, De adulterinis coniugiis",
        url: "https://www.augustinus.it/latino/connubi_adulterini/connubi_adulterini_2_libro.htm",
        locator: "De adulterinis coniugiis 2.6.7",
      },
      {
        label: "Schulz, Sahidic ostracon study of the Pericope Adulterae (2021)",
        url: "https://doi.org/10.1515/9783110592153-003",
        locator:
          "British Museum ostracon EA 21424, John 8:9–11; Trismegistos date AD 400–899; Askeland's challenge to the identification",
      },
      ECM_JOHN_INTRO,
      {
        ...ECM_JOHN_INSTRUCTIONS,
        locator:
          "Meaning of the state suffixes * C S r V and the -1/-2 entry labels used at John 7:53",
      },
      {
        ...VL_JOHN_REGISTER,
        locator: "Identity and physical date of the VL sigla named at John 7:53",
      },
      { ...PROTO_BOHAIRIC, locator: "Proto-Bohairic marks John 7:53–8:11 deest" },
    ],
    notes: [
      "116 deficient entries plus 49 omitting at the standard location plus 71 present there make up the 236 selected documentary entries.",
      "P45 is deficient at this point.",
      "British Museum ostracon EA 21424 carries John 8:9–11 and is dated AD 400–899.",
    ],
    units: [
      {
        id: "standard-location",
        label: "The story at the standard Johannine location",
        reading: "καὶ ἐπορεύθησαν ἕκαστος εἰς τὸν οἶκον αὐτοῦ",
        groups: [
          {
            label: "Greek manuscripts",
            tone: "support",
            witnesses:
              "05 07 011 017 028 041 045 0233 1 13 18 35 69-1 69-2C 109 118 124-1 124-2 138 173 209 226 226* 226C 265 346 357 377 382 543 544 579 597 788 792 807 826 828 884 892 983 992 994 1009 1010 1014 1071 1079 1093 1128-1 1219 1278 1293 1319 1320 1344 1463 1546 1561 1571S 1582 1654 1689 1788 1797 2193S 2223 2223r 2372 2561C2 2561C2V 2561C4 2575 2585 2615 2680 2713 2766 2786 2790 2886",
            aggregates:
              "71 documentary entries present at the standard location in the selected 236-document corpus",
          },
          {
            label: "Old Latin",
            tone: "support",
            witnesses:
              "VL2 VL5 VL6 VL7 VL8C VL9A VL11C VL11A VL14 VL15 VL29 VL30 VL33 VL35 VL47 VL48",
            aggregates: "standard Vulgate",
          },
          {
            label: "Greek manuscripts",
            tone: "competing",
            witnesses:
              "P66 P75 01 03 019 022 029 032 033 037 038 044 0141 0211 22 33 69-2* 157 168 213 249 295 333 397 430 565 732 799 821 841 865 869 1029 1128-2 1192 1210 1230 1241 1242 1253 1321 1424 2106 2192 2193 2411 2561* 2718 2768",
          },
          {
            label: "Old Latin",
            tone: "competing",
            witnesses: "VL3 VL10 VL13 VL27",
          },
          {
            label: "Relocated placements",
            tone: "related",
            witnesses: "225 1128",
            aggregates:
              "Family 13 after Luke 21:38 · Family 1 and end-of-John forms · 225 and 1128 after John 7:36 · placements after John 8:12, 8:14 and 8:20 · Georgian placements",
          },
          {
            label: "First hand blank, later hand supplies",
            tone: "related",
            witnesses: "VL8* VL11*",
          },
          {
            label: "Coptic",
            tone: "related",
            reading: "John 8:9–11 on a Sahidic ostracon",
            witnesses: "EA21424",
          },
          {
            label: "Lacunose or deficient",
            tone: "neutral",
            witnesses: "P45 VL4",
            aggregates: "116 deficient documentary entries in the selected corpus",
          },
          {
            label: "Not transmitted in the Sahidic Gospel tradition",
            tone: "neutral",
            witnesses: "Sahidic proto-Bohairic",
          },
        ],
      },
    ],
    fathers: [
      {
        author: "Ambrose",
        work: "Epistle 25.7 and Epistle 26.2",
        date: "Late fourth century",
        use: "Direct quotation",
        reading: "Supports the KJV reading",
        locator: "Epistulae 25.7 and 26.2",
        transmission: "Latin",
      },
      {
        author: "Jerome",
        work: "Against the Pelagians 2.17",
        date: "c. AD 415",
        use: "Manuscript report",
        reading: "Supports the KJV reading",
        locator: "PL 23:553",
      },
      {
        author: "Augustine",
        work: "De adulterinis coniugiis 2.6.7",
        date: "c. AD 419",
        use: "Manuscript report",
        reading: "Supports the KJV reading",
        locator: "De adulterinis coniugiis 2.6.7",
        url: "https://www.augustinus.it/latino/connubi_adulterini/connubi_adulterini_2_libro.htm",
      },
      {
        author: "Didymus",
        work: "Commentary on Ecclesiastes 223.6b–13a",
        date: "Fourth century",
        use: "Parallel tradition",
        reading: "Related",
        locator: "Kramer and Krebber 1972, folio 223 lines 7–13",
      },
      {
        author: "Didascalia Apostolorum",
        work: "Didascalia Apostolorum 7",
        date: "Early third century",
        use: "Parallel tradition",
        reading: "Related",
        locator: "Vööbus, CSCO 401–2/407–8, Scriptores Syri 175:92–93 and 176:89",
        transmission: "Syriac transmission",
      },
      {
        author: "Papias",
        work: "Reported in Eusebius, Ecclesiastical History 3.39.17",
        date: "Second century",
        use: "Parallel tradition",
        reading: "Related",
        locator: "Historia ecclesiastica 3.39.17",
        url: "https://www.newadvent.org/fathers/250103.htm",
        transmission: "Reported by Eusebius",
      },
      {
        author: "Apostolic Constitutions",
        work: "Apostolic Constitutions 2.24.6",
        date: "Later than the Didascalia Apostolorum",
        use: "Derivative use",
        reading: "Related",
        locator: "Apostolic Constitutions 2.24.6",
        transmission: "Literary descendant of the Didascalia form; not an independent early stream",
      },
    ],
  },
];
