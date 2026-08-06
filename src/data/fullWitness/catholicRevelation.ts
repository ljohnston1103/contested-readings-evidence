import type { FullWitnessEntry } from "./types";

const ECM_REVELATION = {
  label: "INTF digital Editio Critica Maior: Revelation",
  url: "https://ntvmr.uni-muenster.de/ecm",
};
const ECM_CATHOLIC = {
  label: "ECM Catholic Letters / official CBGM 2.0",
  url: "https://ntg.uni-muenster.de/1john/ph4/comparison/",
};
const HIXSON = {
  label: "Elijah Hixson, The Greek Manuscripts of the Comma Johanneum",
  url: "https://evangelicaltextualcriticism.blogspot.com/2020/01/the-greek-manuscripts-of-comma.html",
};
const GALIZA_REEVE = {
  label:
    "Rodrigo B. Galiza and John W. Reeve, The Johannine Comma (1 John 5:7–8): The Status of Its Textual History and Theological Usage in English, Greek, and Latin",
  url: "https://digitalcommons.andrews.edu/auss/vol56/iss1/6/",
  locator: "Andrews University Seminary Studies 56.1 (2018): 63–89",
};
const VETUS_LATINA_NT = {
  label: "Vetus Latina New Testament manuscript register (ITSEE, University of Birmingham)",
  url: "https://itseeweb.cal.bham.ac.uk/vetuslatina/NT-MSS/",
  locator:
    "VL 64, Fragmenta Frisingensia, including the seventh-century Catholic-Epistle replacement leaves",
};
const INTF_LISTE = {
  label: "INTF Kurzgefasste Liste / NTVMR manuscript metadata",
  url: "https://ntvmr.uni-muenster.de/liste",
};
const REVELATION_SCOPE =
  "The current digital ECM Revelation apparatus. Counts are the named Greek reading states displayed for the exact target unit; fully non-extant witnesses remain separate.";

export const catholicRevelationWitnesses: FullWitnessEntry[] = [
  {
    slug: "1-john-4-3",
    reference: "1 John 4:3",
    summary:
      "The Greek evidence contains a short form, several distinct fuller incarnation forms and the λύει alternative preserved in 1739mg. The fuller forms must remain separate because they do not all reproduce the same wording.",
    unit: "The name form at 1 John 4:3/14-16 and the following insertion at 4:3/17, with λύει treated as a separate alternative.",
    scope:
      "Official CBGM unit boundaries with the verified selective Greek rosters recovered in the controlling audit.",
    snapshot: {
      greekSupport: "11 named exact fuller states plus Byz pt and a lectionary aggregate",
      greekAgainst: "9 named selective short-form witnesses",
      supportCategory: "Multiple fuller Greek families, Latin λύει tradition and early related patristic evidence",
      mainEvidenceAgainst: ["Codex Alexandrinus (A)", "Codex Vaticanus (B)", "1739", "1241"],
    },
    sources: [{ ...ECM_CATHOLIC, locator: "1 John 4:3/14-16 and 1 John 4:3/17" }, { label: "INTF Kurzgefasste Liste / NTVMR manuscript metadata", url: "https://ntvmr.uni-muenster.de/liste" }],
    notes: ["629C, not an unqualified 629, supports the exact fuller subform.", "1739 has the short form in its main text; 1739mg alone records λύει."],
    units: [
      {
        id: "confession-form",
        label: "Short and fuller confession forms",
        reading: "Ἰησοῦν Χριστὸν ἐν σαρκὶ ἐληλυθότα",
        groups: [
          { label: "Exact fuller form without initial article", tone: "support", witnesses: "K 056 0142 181 330 629C 1243 1292 1844 2127 2492", aggregates: "Byz pt · lectionary aggregate" },
          { label: "Fuller form with τὸν before Jesus Christ", tone: "related", witnesses: "L 049 451 1175 104 88 326 l590" },
          { label: "Fuller form without Χριστόν", tone: "related", witnesses: "Ψ 81 436 630 1067 1409 1505 1611 1852 2138 2495 (33) (2344) (2464)" },
          { label: "Sinaiticus unique fuller form", tone: "related", witnesses: "01", reading: "Ἰησοῦν κύριον ἐν σαρκὶ ἐληλυθότα" },
          { label: "Selective short-form roster", tone: "competing", witnesses: "A B 322 323 945 1241 1739 1881 2298" },
        ],
      },
      {
        id: "lyei",
        label: "λύει alternative",
        groups: [
          { label: "Greek marginal alternative", tone: "related", witnesses: "1739mg" },
          { label: "Named Old Latin λύει/solvit witnesses", tone: "related", witnesses: "p z ar div c dem", aggregates: "Vulgate/Latin solvit tradition" },
          { label: "Coptic versions", tone: "related", aggregates: "Sahidic · Bohairic", note: "The discovery apparatus assigns Sahidic and Bohairic to non-λύει forms." },
        ],
      },
    ],
    fathers: [
      { author: "Polycarp", work: "Letter to the Philippians 7.1", date: "c. AD 110–140", use: "Close quotation", reading: "Supporting witness", locator: "Philippians 7.1" },
      { author: "Irenaeus", work: "Against Heresies 3.16.8", date: "c. AD 180", use: "Close quotation", reading: "Competing witness", locator: "3.16.8", transmission: "Latin" },
      { author: "Socrates", work: "Church History 7.32", date: "5th century", use: "Manuscript report", reading: "Competing witness", locator: "7.32" },
    ],
  },
  {
    slug: "1-john-5-7",
    reference: "1 John 5:7–8",
    summary:
      "Ten late Greek manuscripts contain a Comma form: five in the biblical text and five as later marginal variants. The forms are heterogeneous rather than ten identical copies of the final Textus Receptus wording. The overwhelming Greek transmission omits the clause. The reading has an earlier and broader Latin reception, beginning with related third-century usage, an explicit complete form in Priscillian, a fifth-century non-continuous Scripture-quotation witness, and seventh-century continuous Latin biblical witnesses.",
    unit: "The heavenly-witness clause and its associated earthly-witness wording; distinct Greek Comma forms remain separate from the Latin biblical, non-continuous quotation, patristic and printed evidence.",
    scope:
      "The complete ten-artifact Greek presence roster verified against manuscript images and catalog records, together with the named Latin manuscript and literary witnesses represented in Galiza and Reeve and the official Vetus Latina manuscript register. Aggregate Greek and Vulgate statements are labeled as traditions rather than universal itemized counts.",
    snapshot: {
      greekSupport: "10 Greek presence artifacts: 5 main-text forms and 5 later marginal forms",
      greekAgainst: "The overwhelming Greek manuscript tradition",
      supportCategory:
        "Late heterogeneous Greek presence witnesses with much earlier Latin literary and biblical reception",
      mainEvidenceAgainst: [
        "Codex Sinaiticus",
        "Codex Vaticanus",
        "Codex Alexandrinus",
        "Codex Fuldensis (Latin biblical text)",
      ],
    },
    sources: [HIXSON, ECM_CATHOLIC, INTF_LISTE, GALIZA_REEVE, VETUS_LATINA_NT],
    notes: [
      "GA 635 does not contain the Comma.",
      "The ten Greek witnesses contain heterogeneous forms and are not ten exact final-TR copies.",
      "Codex Speculum is a non-continuous collection of biblical quotations. The Fragmenta Frisingensia and the León Palimpsest are the earliest continuous Latin biblical witnesses listed here.",
      "Codex Fuldensis omits the Comma in its biblical text. Its prologue is separate literary evidence and is not counted as a biblical-text witness.",
      "The three Fulgentius rows are separate works, not duplicate database records.",
    ],
    units: [
      {
        id: "comma",
        label: "Comma Johanneum presence",
        reading: "The Father, the Word, and the Holy Ghost: and these three are one",
        groups: [
          {
            label: "Greek manuscripts with a Comma form in the biblical text",
            tone: "related",
            witnesses: "629 61 918 2473 2318",
            note: "Presence roster, not five identical forms. 629: AD 1362–1363; 61: c. AD 1495–1521; 918: c. AD 1573–1578; 2473: AD 1634; 2318: eighteenth-century commentary manuscript.",
          },
          {
            label: "Later Greek marginal or variant additions",
            tone: "related",
            witnesses: "429mg 177mg 221mg 88mg 636mg",
            note: "429mg after AD 1522; 177mg c. AD 1785; 221mg after AD 1854; 88mg and 636mg are later hands of uncertain date and do not inherit the dates of their base manuscripts.",
          },
          {
            label: "Early major Greek omission witnesses",
            tone: "competing",
            witnesses: "01 A B 048 P L Ψ K 049 33 2464 056 0142 1739",
            aggregates: "Overwhelming Greek manuscript tradition",
          },
          {
            label: "Earliest named non-continuous Latin Scripture-quotation witness",
            tone: "related",
            witnesses: "Codex-Speculum-(m)",
            note: "Fifth century. Contains the Comma in a collection of Latin Scripture quotations, not in a continuous biblical codex.",
          },
          {
            label: "Earliest named continuous Latin biblical witnesses",
            tone: "support",
            witnesses: "Fragmenta-Frisingensia-(VL64) León-Palimpsest-(l)",
            note: "The Catholic-Epistle replacement leaves of VL 64 were copied in the first half of the seventh century, probably in Spain. The León Palimpsest is seventh century.",
          },
          {
            label: "Further named medieval Latin biblical witnesses",
            tone: "support",
            witnesses:
              "Codex-Wizanburgensis Codex-Theodulphianus Codex-Sangallensis-907 Codex-Cavensis Codex-Ulmensis Codex-Lemovicensis Codex-Vercellensis Codex-Complutensis-I Codex-Gothicus-Legionensis Codex-Toletanus Codex-Demidovianus",
            note: "Wizanburgensis: eighth century, disputed; Theodulphianus and Sangallensis 907: eighth–ninth century; Cavensis, Ulmensis, Lemovicensis, and Vercellensis: ninth century; Complutensis I: AD 927; Gothicus Legionensis: AD 960; Toletanus: tenth century; Demidovianus: second half of the thirteenth century.",
          },
          {
            label: "Latin marginal addition",
            tone: "related",
            witnesses: "Codex-Sangallensis-63-margin",
            note: "Ninth-century base manuscript; the date of the marginal addition is not independently established.",
          },
          {
            label: "Latin biblical-text omissions",
            tone: "competing",
            witnesses: "Codex-Fuldensis Codex-Amiatinus",
            note: "Codex Fuldensis: AD 546. Codex Amiatinus: c. AD 700.",
          },
          {
            label: "Separate literary evidence",
            tone: "related",
            witnesses: "Codex-Fuldensis-prologue",
            note: "The prologue discusses the disputed clause, while the biblical text omits it.",
          },
          {
            label: "Later medieval Latin reception",
            tone: "support",
            aggregates: "Later medieval Vulgate tradition",
          },
          {
            label: "Printed Latin and received-text reception",
            tone: "related",
            witnesses:
              "Complutensian-Polyglot Erasmus-1522 Stephanus-1550 Beza-editions Clementine-Vulgate-1592",
            note: "Printed editions are reception-history witnesses and remain separate from manuscripts.",
          },
        ],
      },
    ],
    fathers: [
      {
        author: "Tertullian",
        work: "Against Praxeas 25",
        date: "c. AD 210–213",
        use: "Close quotation",
        reading: "Supporting witness",
        locator: "Adversus Praxean 25",
        url: "https://www.newadvent.org/fathers/0317.htm",
      },
      {
        author: "Cyprian",
        work: "On the Unity of the Church 6",
        date: "c. AD 251",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "De unitate ecclesiae 6",
        url: "https://www.newadvent.org/fathers/050701.htm",
      },
      {
        author: "Priscillian",
        work: "Liber Apologeticus 1.4",
        date: "c. AD 380",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator: "CSEL 18, 6; Conti, Complete Works, p. 34",
      },
      {
        author: "Expositio Fidei",
        work: "Expositio Fidei",
        date: "Late fourth century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator:
          "Explicit Latin Father, Word, and Spirit three-one form; Galiza and Reeve, AUSS 56.1 (2018): 63–89",
      },
      {
        author: "Contra Varimadum",
        work: "Contra Varimadum",
        date: "c. AD 450",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator:
          "Explicit heavenly-witness form; Galiza and Reeve, AUSS 56.1 (2018): 63–89",
      },
      {
        author: "Carthaginian confession under Huneric",
        work: "Confession of the African bishops",
        date: "AD 484",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator:
          "Explicit heavenly-witness form preserved in the Vandal persecution account; Galiza and Reeve, AUSS 56.1 (2018): 63–89",
      },
      {
        author: "Fulgentius of Ruspe",
        work: "Contra Arianos",
        date: "c. AD 527",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator:
          "Explicit heavenly-witness citation; Galiza and Reeve, AUSS 56.1 (2018): 63–89",
      },
      {
        author: "Fulgentius of Ruspe",
        work: "Contra Fabianum",
        date: "c. AD 527",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator:
          "Explicit three-one form; Galiza and Reeve, AUSS 56.1 (2018): 63–89",
      },
      {
        author: "Fulgentius of Ruspe",
        work: "De Trinitate ad Felicem",
        date: "c. AD 527",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator:
          "Explicit heavenly-witness citation; Galiza and Reeve, AUSS 56.1 (2018): 63–89",
      },
      {
        author: "Cassiodorus",
        work: "Complexiones in Epistolis Apostolorum",
        date: "Sixth century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator:
          "Explicit Father, Son, and Spirit form; Galiza and Reeve, AUSS 56.1 (2018): 63–89",
      },
      {
        author: "Isidore of Seville",
        work: "Testimonia Divinae Scripturae et Patrum",
        date: "Early seventh century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator:
          "Explicit heavenly-witness citation; Galiza and Reeve, AUSS 56.1 (2018): 63–89",
      },
      {
        author: "Ambrose Ansbert",
        work: "Commentary on Revelation",
        date: "Mid-eighth century",
        use: "Direct quotation",
        reading: "Supporting witness",
        locator:
          "Explicit heavenly-witness citation; Galiza and Reeve, AUSS 56.1 (2018): 63–89",
      },
    ],
  },
  {
    slug: "revelation-1-8",
    reference: "Revelation 1:8",
    summary:
      "At ‘beginning and ending,’ ECM displays 23 exact states, eight related article forms and 62 omissions. At the independent attribution, no Greek manuscript has the exact phrase ‘says the Lord’; the Greek tradition overwhelmingly reads a form of ‘says the Lord God.’",
    unit: "Two independent units: ἀρχὴ καὶ τέλος at address 15, and the attribution following the title at addresses 16-22.",
    scope: REVELATION_SCOPE,
    snapshot: {
      greekSupport: "23 exact states at address 15; 0 exact Greek at addresses 16-22",
      greekAgainst: "62 omissions at address 15; 90 assigned non-KJV artifacts at the attribution",
      supportCategory: "Twenty-three exact Greek states for ‘beginning and ending,’ with versional and printed support at the attribution",
      mainEvidenceAgainst: ["01C2", "Codex Alexandrinus (02)", "04", "046"],
    },
    sources: [{ ...ECM_REVELATION, url: "https://ntvmr.uni-muenster.de/ecm?segment=8&verse=Rev.1.8", locator: "Revelation 1:8" }, INTF_LISTE],
    notes: ["The correct exact roster contains 2067, not 2065.", "P18 and P98 are fully non-extant for the verse and are not omission witnesses."],
    units: [
      {
        id: "beginning-ending",
        label: "ἀρχὴ καὶ τέλος",
        reading: "ἀρχὴ καὶ τέλος",
        groups: [
          { label: "Exact ἀρχὴ καὶ τέλος", tone: "support", witnesses: "01* 61mg 250 254 1828 1854 1888 2028 2048r 2050 2056 2057 2067 2071 2073 2081* 2286r 2351 2432 2595 2814 2886 2919" },
          { label: "ἡ ἀρχὴ καὶ τὸ τέλος", tone: "related", witnesses: "1773 2019 2026 2037 2081C 2329 2436", aggregates: "Ar:E" },
          { label: "ἀρχὴ καὶ τὸ τέλος", tone: "related", witnesses: "2074" },
          { label: "Phrase omitted", tone: "competing", witnesses: "01C2 02 04 025 046 35 61* 69 82 91 93 104 141 177 201 218 325 367 452 456 469 498 506 522 620 632 792 808 911 1006 1424 1611 1637 1719 1732 1734 1780 1795 1849 1852 1872 2042 2053 2070 2076 2077 2080 2138 2200 2256 2350 2429 2495 2582 2672 2681 2723 2845 2846 2847 2917 2921", aggregates: "A G Slᵇ L:K S Ä" },
          { label: "Indeterminate among the exact and article forms", tone: "neutral", aggregates: "L:V> Slᵃ S:Hᴹ>", note: "Version states indeterminate among rows b, c and d." },
        ],
      },
      {
        id: "attribution",
        label: "Attribution after the title",
        reading: "λέγει ὁ κύριος",
        groups: [
          { label: "Exact λέγει ὁ κύριος", tone: "support", aggregates: "L:D · Ethiopic Ä · Erasmus 1516 · Erasmus 1521 · Stephanus 1550", note: "No Greek manuscript entry." },
          { label: "λέγει κύριος ὁ θεός", tone: "competing", witnesses: "522" },
          { label: "λέγει κς ὁ θς", tone: "competing", witnesses: "01 02 04 025 046 35 69 82 91 93 104 141 177 201 218 250 254 325 367 452 456 469 498 506 620 632 792 808 911 1006 1611 1637 1719 1732 1734 1773 1780 1795 1828 1849 1852 1854 1872 1888 2019 2026 2028 2037 2042 2048 2053 2056 2057 2067 2070 2071 2073 2076 2077 2080 2081 2138 2200 2256 2286 2350 2351 2429 2432 2436 2495 2582 2595 2672 2681 2723 2814 2845 2846 2847 2886 2917 2919 2921" },
          { label: "λέγει κύριος ὁ θς", tone: "competing", witnesses: "1424" },
          { label: "λέγει κς ὁ θεός", tone: "competing", witnesses: "61" },
          { label: "κς ὁ θς", tone: "competing", witnesses: "2074" },
          { label: "ὁ θς", tone: "competing", witnesses: "2329" },
          { label: "Whole attribution omitted", tone: "competing", witnesses: "2050" },
        ],
      },
      { id: "nonextant", label: "Fully non-extant for the verse", groups: [{ label: "Non-extant", tone: "neutral", witnesses: "P18 P98" }] },
    ],
    fathers: [],
  },
  {
    slug: "revelation-1-11",
    reference: "Revelation 1:11",
    summary:
      "The ECM target row has 90 assigned Greek entries. Eight entries preserve the full KJV lexical and syntactic expansion—seven in the main text and 61mg—while 64 omit the insertion and the remainder carry related forms.",
    unit: "The insertion beginning ‘I am Alpha and Omega, the first and the last’ at word address 3.",
    scope: REVELATION_SCOPE,
    snapshot: {
      greekSupport: "8 exact lexical/syntactic entries: 7 main text plus 61mg",
      greekAgainst: "64 omission entries",
      supportCategory: "Eight ECM Greek entries with the complete lexical and syntactic form",
      mainEvidenceAgainst: ["Codex Sinaiticus (01)", "Codex Alexandrinus (02)", "04", "046"],
    },
    sources: [{ ...ECM_REVELATION, url: "https://ntvmr.uni-muenster.de/ecm?segment=11&verse=Rev.1.11", locator: "Revelation 1:11" }, INTF_LISTE],
    notes: ["The exact family divides into spelled ἄλφα and letter-form α/ω orthography.", "P18 and P98 are fully non-extant; 2344 is not assigned at the target row."],
    units: [
      {
        id: "alpha-omega",
        label: "Alpha and Omega expansion",
        reading: "ἐγὼ ἄλφα καὶ τὸ ω πρῶτος καὶ ὁ ἔσχατος",
        groups: [
          { label: "Exact form with spelled ἄλφα", tone: "support", witnesses: "367 2019 2429 2919" },
          { label: "Exact form with α/ω letters", tone: "support", witnesses: "61mg 2067 2595 2814" },
          { label: "Insertion omitted", tone: "competing", witnesses: "01 02 04 046 35 69 82 91 93 141 177 201 218 250 325 452 456 469 498 506 522 632 792 808 911 1006 1424 1637 1719 1732 1734 1773 1780 1795 1828 1849 1852 1872 1888 2037 2042 2048 2070 2071 2076 2077 2080 2138 2200 2256 2329 2351 2436 2495 2582 2672 2681 2723 2845 2846 2847 2886 2917 2921" },
          { label: "μοι", tone: "related", witnesses: "1611 1854" },
          { label: "μοι Ἰωάννῃ", tone: "related", witnesses: "2053 2350r" },
          { label: "μοι ὡς σάλπιγγος μεγάλης", tone: "related", witnesses: "2050" },
          { label: "ἐγὼ α καὶ ω πρῶτος καὶ ἔσχατος καὶ", tone: "related", witnesses: "2074", note: "ECM row eo; row e has no witness." },
          { label: "ἐγὼ ἄλφα καὶ τὸ ω πρῶτος καὶ ὁ ἔσχατος", tone: "related", witnesses: "104 620", note: "ECM row f." },
          { label: "Row f form with final καί", tone: "related", witnesses: "025", note: "ECM row g: the same form as row f with a final καί." },
          { label: "Other related ECM rows (i, io, j, k, ko, l, mo)", tone: "related", witnesses: "2432 2026 2057 2073 254 2028 2056r 2286 2081", note: "i: 2432; io: 2026; j: 2057; k: 2073; ko: 254 2028 2056r; l: 2286; mo: 2081. Row m has no witness." },
          { label: "Unassigned at target", tone: "neutral", witnesses: "2344" },
          { label: "Fully non-extant", tone: "neutral", witnesses: "P18 P98" },
        ],
      },
    ],
    fathers: [],
  },
  {
    slug: "revelation-16-5",
    reference: "Revelation 16:5",
    summary:
      "ECM treats the title as one complex unit. None of its Greek manuscript entries reads either κύριε or ἐσόμενος. The 91 displayed Greek states, representing 90 physical artifacts, preserve several forms centered on ὅσιος.",
    unit: "The complete title at word addresses 18-32, not separate isolated votes for ‘Lord’ and ‘shall be.’",
    scope: REVELATION_SCOPE,
    snapshot: {
      greekSupport: "0 Greek manuscript entries for the exact KJV future form",
      greekAgainst: "91 Greek states / 90 physical artifacts across the ὅσιος and related forms",
      supportCategory: "Historical printed-text and manuscript-report evidence rather than extant Greek manuscript support",
      mainEvidenceAgainst: ["P47", "Codex Sinaiticus (01)", "025", "051"],
    },
    sources: [{ ...ECM_REVELATION, url: "https://ntvmr.uni-muenster.de/ecm?segment=5&verse=Rev.16.5", locator: "Revelation 16:5" }, INTF_LISTE],
    notes: ["P47 is extant and reads a ὅσιος form.", "2436 retains its uncertainty/damage qualification; 2076* and 2076C are states of one artifact."],
    units: [
      {
        id: "title",
        label: "Complete title at addresses 18-32",
        reading: "κύριε εἶ ὁ ὢν καὶ ὁ ἦν καὶ ὁ ἐσόμενος",
        groups: [
          { label: "Exact KJV future form", tone: "support", note: "No Greek manuscript entry." },
          { label: "κύριε εἶ ὁ ὢν καὶ ὁ ἦν καὶ ὁ ὅσιος", tone: "related", note: "ECM question-mark row; no Greek witness listed." },
          { label: "εἶ ὁ ὢν καὶ ὁ ἦν ὁ ὅσιος", tone: "competing", witnesses: "01 025 051 35 201 254 325 456 469 632 1637 1732 1872 1888 2056 2067 2073 2074 2076C 2077 2080 2081 2256 2286 2595 2672 2681 2723 2847r 2886 2917" },
          { label: "εἶ ὁ ὢν καὶ ὃς ἦν ὁ ὅσιος", tone: "competing", witnesses: "69 1852 2200" },
          { label: "εἶ ὁ ὢν καὶ ὁ ἦν ὅσιος", tone: "competing", witnesses: "02 04 250 367 498 620 808 1611 1854 2076* 2138 2845 2846 2921" },
          { label: "εἶ ὁ ὢν καὶ ὃς ἦν ὅσιος", tone: "competing", witnesses: "046 61 82 91 93 177 452 506 522 1424 1719 1734 1780 1795 1849 2048 2070" },
          { label: "εἶ ὁ ὢν καὶ ὁ ἦν καὶ ὅσιος", tone: "competing", witnesses: "911 2026 2028 2057 2436? 2582" },
          { label: "εἶ ὁ ὢν καὶ ὁ ἦν καὶ ὁ ὅσιος", tone: "competing", witnesses: "792 1006 1773 1828 2019 2037 2042r 2053 2350 2429 2432r 2814" },
          { label: "εἶ ὁ ὢν καὶ ὃς ἦν καὶ ὅσιος", tone: "competing", witnesses: "P47 2329", note: "P47 is extant here and belongs in this row." },
          { label: "ἦν ὁ ὢν καὶ ὃς ἦν ὅσιος", tone: "competing", witnesses: "141" },
          { label: "ὁ ὢν καὶ ὁ ἦν ὁ ὁ ὅσιος", tone: "competing", witnesses: "2344 2919r" },
          { label: "ὁ ὢν καὶ ὁ ἦν ὅσιος", tone: "competing", witnesses: "104" },
          { label: "εἶ ὁ ὢν καὶ ὅσιος", tone: "competing", witnesses: "2071" },
          { label: "ὢν ὁ ὢν καὶ ὁ ἦν", tone: "competing", witnesses: "2495", note: "ECM row lf." },
          { label: "Fully non-extant", tone: "neutral", witnesses: "P43 0163 218 2050 2351 2377 2924" },
        ],
      },
    ],
    fathers: [],
  },
  {
    slug: "revelation-22-19",
    reference: "Revelation 22:19",
    summary:
      "ECM has 74 tree-reading states. No Greek manuscript reads the exact TR βίβλου; two physical artifacts, 61 and 2067, preserve the related βιβλίου form in three states, with an additional uncertain 61*vid assignment.",
    unit: "The noun at word addresses 40-42: tree, related book forms and the exact TR βίβλου form.",
    scope: REVELATION_SCOPE,
    snapshot: {
      greekSupport: "0 exact βίβλου states; 2 artifacts with related βιβλίου states",
      greekAgainst: "74 tree states",
      supportCategory: "Related Greek book readings in 61 and 2067, alongside Latin and printed-text transmission",
      mainEvidenceAgainst: ["Codex Sinaiticus (01)", "Codex Alexandrinus (02)", "046", "35"],
    },
    sources: [{ ...ECM_REVELATION, url: "https://ntvmr.uni-muenster.de/ecm?segment=19&verse=Rev.22.19", locator: "Revelation 22:19" }, INTF_LISTE],
    notes: ["2067* reads tree and 2067C the related book form.", "2814 is non-extant here and cannot be counted on either side; 2344 is unassigned."],
    units: [
      {
        id: "tree-book",
        label: "Tree or book",
        reading: "βίβλου",
        groups: [
          { label: "Exact TR βίβλου", tone: "support", note: "No Greek manuscript entry." },
          { label: "Related τοῦ βιβλίου", tone: "related", witnesses: "61* 61C 2067C" },
          { label: "Uncertain τοῦ μέρους βιβλίου", tone: "related", witnesses: "61*vid" },
          { label: "τοῦ ξύλου", tone: "competing", witnesses: "01 02 046 35 82 91 93 104 141 177 201 250 254 325 367 452 469 498 506 522 620 632 792 808 1006 1424 1611 1637 1719 1732 1734 1773 1780 1795 1849 1852 1854 1872 1888 2026 2028 2037 2042 2048 2050 2053 2056 2057 2070 2071 2073 2074 2076 2077 2081 2138 2286 2329 2350 2377 2432 2436 2495 2595 2672 2681 2723 2845 2846 2847 2886 2917 2921 2067*" },
          { label: "Anarthrous ξύλου", tone: "related", witnesses: "456" },
          { label: "Unassigned at target", tone: "neutral", witnesses: "2344" },
          { label: "Fully non-extant", tone: "neutral", witnesses: "P47 04 025 052 69 218 911 1828 2019 2080 2200 2256 2351 2429 2582 2814 2919 2924" },
        ],
      },
    ],
    fathers: [],
  },
];
