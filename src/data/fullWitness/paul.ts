import type { FullWitnessEntry } from "./types";

const PAUL_PORTAL = {
  label: "IGNTP/ITSEE Pauline Epistles electronic editions",
  url: "https://itseeweb.cal.bham.ac.uk/epistulae/",
};
const ROMANS = {
  label: "IGNTP/ITSEE Romans ECM-preparation apparatus, version 1.1",
  url: "https://itseeweb.cal.bham.ac.uk/epistulae/apparatus/romans/introduction.html",
};
const COMPAUL = {
  label: "Official COMPAUL Latin transcriptions",
  url: "https://itseeweb.cal.bham.ac.uk/epistulae/transcriptions/compaul/compaul.xml",
};
const ROMANS_POSITIVE = {
  label: "IGNTP/ITSEE Romans ECM-preparation apparatus, positive apparatus",
  url: "https://itseeweb.cal.bham.ac.uk/epistulae/apparatus/romans/positive/",
};
const ROMANS_NEGATIVE = {
  label: "IGNTP/ITSEE Romans ECM-preparation apparatus, negative apparatus",
  url: "https://itseeweb.cal.bham.ac.uk/epistulae/apparatus/romans/negative/",
};
const ROMANS_SYNOPSIS = {
  label: "IGNTP/ITSEE Romans direct-transcription synopsis",
  url: "https://itseeweb.cal.bham.ac.uk/epistulae/synopsis/romans/index.html",
};
const COMPAUL_ROMANS = {
  label: "Official COMPAUL Latin transcriptions, Romans files",
  url: COMPAUL.url,
  locator: "Individual Romans files follow .../transcriptions/06_VL61.xml",
};
const COMPAUL_1COR = {
  label: "Official COMPAUL Latin transcriptions, 1 Corinthians files",
  url: COMPAUL.url,
  locator: "Individual 1 Corinthians files follow .../transcriptions/07_VL61.xml",
};
const INTF_ECM = {
  label: "INTF, Editio Critica Maior project status (Pauline letters in preparation with ITSEE/IGNTP)",
  url: "https://www.uni-muenster.de/INTF/en/forschung/ecm/index.html",
};
const ROMANS_SCOPE =
  "The official Romans ECM-preparation apparatus: 152 selected witnesses. Counts are reading states and preserve hands, corrections, lectionary occurrences and deficiencies.";
const SYNOPSIS_SCOPE =
  "The official IGNTP/ITSEE direct-transcription synopsis for the named Pauline letter. Counts describe displayed rows and reading states, not the total manuscript tradition.";

export const paulWitnesses: FullWitnessEntry[] = [
  {
    slug: "romans-8-1",
    reference: "Romans 8:1",
    summary:
      "In the official 152-witness Romans apparatus, the exact full clause has 92 reading states. Twelve omit the clause, thirteen have the shorter flesh-only clause, and the remaining states are related, partial or deficient.",
    unit: "The words following τοῖς ἐν Χριστῷ Ἰησοῦ: the full flesh-and-Spirit clause, the flesh-only clause, omission and related forms.",
    scope: ROMANS_SCOPE,
    snapshot: {
      greekSupport: "92 exact states in the 152-witness apparatus",
      greekAgainst: "12 omissions and 13 ordinary shorter states",
      supportCategory: "Extensive Greek support in the selected Romans corpus, including corrected early codices",
      mainEvidenceAgainst: ["01*", "Codex Vaticanus (03)", "04C2", "1739"],
    },
    sources: [ROMANS, ROMANS_POSITIVE, ROMANS_NEGATIVE, ROMANS_SYNOPSIS, COMPAUL, COMPAUL_ROMANS, PAUL_PORTAL, INTF_ECM],
    notes: ["33V and 2659K* use an infinitive and are related rather than exact.", "0311 has two partial hand states and is not a clean vote."],
    units: [
      {
        id: "final-clause",
        label: "Final clause after ‘Christ Jesus’",
        reading: "μὴ κατὰ σάρκα περιπατοῦσιν ἀλλὰ κατὰ πνεῦμα",
        groups: [
          { label: "Exact full clause", tone: "support", witnesses: "01C2 06C2 020 025 049 1 5 35 38 43 61 69 88 104 218 326 330 398 400 424K* 441K 451 455K 459f 467 606K 608K 621K 623K 630 915 1069 1108 1115 1175 1241 1359 1505 1524K 1611 1617 1718 1751 1798K 1834 1837 1838 1846 1875 1877 1893C 1908A 1909K 1912 1942K 1950K 1961K 1962K 1963K 1973K 1985K 1987K 1995K 1996K 1999K 2000K 2012K 2102K 2105K 2197K 2200 2352 2400 2464 2495 2516 2523 2544 2576K 2659K-C* 2685C 2853 2936K L156 L169 L587 L809 L1159 L1178 L1188f L1440 L2058" },
          { label: "Clause omitted", tone: "competing", witnesses: "01* 03 04C2 06* 012 6 424K-C 1506K 1739 1881 1908K* 2110K" },
          { label: "Flesh-only shorter clause", tone: "competing", witnesses: "02 06C1b 044 81 256 263 629 1243 1319 1573 1852 1893* 2127" },
          { label: "Other related forms", tone: "related", witnesses: "33V 2659K* 886K L2010 1991K 436 1886 2344 365" },
          { label: "Partial or lacunose at the unit", tone: "neutral", witnesses: "0311* 0311C 0150K 1947K 1987SK 1991S1K 1991S2K" },
          { label: "COMPAUL Latin exact full clause", tone: "support", witnesses: "VL61 VL76" },
          { label: "COMPAUL Latin flesh-only form", tone: "related", witnesses: "VL135 VL251 VL51 VL54 VL58 VL78 VL88 VL75C VL86C" },
          { label: "COMPAUL Latin omission", tone: "competing", witnesses: "VL77 VL89 VL75* VL86*" },
          { label: "Latin edition text", tone: "competing", reading: "qui non secundum carnem ambulant", aggregates: "Stuttgart Vulgate electronic text", note: "The Stuttgart Vulgate electronic text has the flesh-only form, not the full KJV clause." },
          { label: "Latin patristic lemma traditions", tone: "related", aggregates: "Ambrosiaster editorial lemma; Pelagius editorial lemma", note: "Ambrosiaster’s lemma is short, with a variant adding the flesh clause only; Pelagius’s lemma is flesh-only, with edition variant B adding sed secundum spiritum." },
          { label: "Whole-verse deficient", tone: "neutral", aggregates: "The official Romans apparatus’s whole-verse deficient list for this verse", note: "Deficient rows are kept separate from the subunit lacunae and are not counted as omissions." },
          { label: "Not among the official selected rows", tone: "neutral", witnesses: "614", note: "614 is not one of the 152 selected witnesses of the official Romans apparatus; absence from the corpus is not a reading." },
        ],
      },
    ],
    fathers: [],
  },
  {
    slug: "romans-14-10",
    reference: "Romans 14:10",
    summary:
      "In the official selected Romans apparatus, ‘of Christ’ has 104 reading states and ‘of God’ has 15. The related dative in 0150K is separate, and P46 is noncollatable at the noun.",
    unit: "τοῦ Χριστοῦ against τοῦ θεοῦ at the judgment seat; the dative τῷ θεῷ is a separate related form.",
    scope: ROMANS_SCOPE,
    snapshot: {
      greekSupport: "104 Christ states",
      greekAgainst: "15 God states; 1 related dative",
      supportCategory: "Broad Greek support in the official selected Romans apparatus",
      mainEvidenceAgainst: ["01*", "Codex Alexandrinus (02)", "Codex Vaticanus (03)", "04*"],
    },
    sources: [ROMANS, ROMANS_POSITIVE, ROMANS_NEGATIVE, ROMANS_SYNOPSIS, COMPAUL, COMPAUL_ROMANS, PAUL_PORTAL, INTF_ECM, { label: "Chrysostom, Homily 25 on Romans", url: "https://www.newadvent.org/fathers/210225.htm" }],
    notes: ["0209V reads God, not Christ.", "01 and 04 each preserve first-hand God and corrected Christ states."],
    units: [
      {
        id: "judgment-seat",
        label: "Christ or God",
        reading: "τοῦ Χριστοῦ",
        groups: [
          { label: "τοῦ Χριστοῦ", tone: "support", witnesses: "01C2 04C2V 020 025 044 048V 049 1 5 6 33 35 38 43 61 69 81 88 103K 104 218 256 263 326 330 365 398 400 424K 436 441K 451 455K 459 467 606K 608K 621K 623K 629 886K 915 1069 1108 1115 1175 1241 1243 1319 1359 1505 1524K 1573 1611 1617 1718 1751 1798K 1834 1837 1838 1875 1877 1881 1886 1893 1909K 1912 1942K 1961K 1962K 1963K 1973K 1985K 1991K 1995K 1996K 1999K 2012K 2102K 2105K 2127 2197K 2344 2352 2400 2495 2516 2523 2544 2576K 2659K 2685 2853 2936K L156 L169 L587 L809 L1159 L1188 L1440 L2010 L2058" },
          { label: "τοῦ θεοῦ", tone: "competing", witnesses: "01* 02 03 04* 06 012 0209V 630 1506K 1739 1852 1908K-C 2110K 2200 L1178" },
          { label: "Related dative τῷ θεῷ", tone: "related", witnesses: "0150K" },
          { label: "Noncollatable noun", tone: "neutral", witnesses: "P46" },
          { label: "COMPAUL Latin Christ", tone: "support", witnesses: "VL54 VL58 VL64 VL79" },
          { label: "COMPAUL Latin God", tone: "competing", witnesses: "VL135 VL51 VL61 VL67 VL75 VL76 VL77 VL78 VL88 VL89" },
          { label: "COMPAUL Latin lacuna", tone: "neutral", witnesses: "VL86" },
          { label: "Latin edition text", tone: "competing", reading: "dei", aggregates: "Stuttgart Vulgate electronic text", note: "The Stuttgart Vulgate reads dei." },
          { label: "Ambrosiaster editorial text", tone: "related", aggregates: "Ambrosiaster editorial lemma", note: "Ambrosiaster’s editorial text reads christi, with a dei variant: a mixed edition." },
          { label: "Pelagius editorial lemma", tone: "competing", reading: "dei", aggregates: "Pelagius editorial lemma", note: "Pelagius’s editorial lemma reads dei." },
          { label: "Whole-verse deficient", tone: "neutral", aggregates: "The official Romans apparatus’s whole-verse deficient list for this verse", note: "Kept separate from P46, whose surrounding verse survives but whose key noun is lacunose." },
        ],
      },
    ],
    fathers: [
      { author: "Chrysostom", work: "Homily 25 on Romans", date: "c. AD 400", use: "Direct quotation", reading: "Supports the KJV reading", locator: "Romans 14:10", url: "https://www.newadvent.org/fathers/210225.htm" },
      { author: "Polycarp", work: "Letter to the Philippians 6.2", date: "c. AD 110–140", use: "Parallel tradition", reading: "Related", locator: "Philippians 6.2" },
    ],
  },
  {
    slug: "romans-16-24",
    reference: "Romans 16:24",
    summary:
      "The official 152-witness Romans apparatus has 89 exact full forms at verse 24, 18 related or qualified inclusions, 15 omissions and 30 witnesses deficient for the verse.",
    unit: "The entire benediction at verse 24, including every name, pronoun and amen in the displayed order.",
    scope: ROMANS_SCOPE,
    snapshot: {
      greekSupport: "89 exact full forms",
      greekAgainst: "15 omissions; 18 related; 30 deficient",
      supportCategory: "A large exact group in the complete 152-witness selected apparatus",
      mainEvidenceAgainst: ["P46", "P61", "Codex Sinaiticus (01)", "Codex Vaticanus (03)"],
    },
    sources: [
      ROMANS,
      ROMANS_POSITIVE,
      ROMANS_NEGATIVE,
      { ...ROMANS_SYNOPSIS, locator: "Verse-24 rows for 33, 104 and 025" },
      COMPAUL,
      COMPAUL_ROMANS,
      PAUL_PORTAL,
      INTF_ECM,
    ],
    notes: ["GA 630 is related, not exact: it reads μεθ’ ὑμῶν and omits amen.", "Witnesses that also copy the benediction later are not described as relocating it away from verse 24."],
    units: [
      {
        id: "benediction",
        label: "Complete benediction",
        reading: "ἡ χάρις τοῦ κυρίου ἡμῶν Ἰησοῦ Χριστοῦ μετὰ πάντων ὑμῶν. ἀμήν.",
        groups: [
          { label: "Exact complete form", tone: "support", witnesses: "06 020 044 049 1 6 33 38 43 88 103K 104 218 256 263 326 330 365 398 400 424K 436 441K 451 455K 459 467 606K 608K 629 886K 915 1069 1108 1115 1175 1241 1319 1359 1505 1524K 1611 1617 1718 1751 1798K 1837 1838 1875 1877 1881 1886 1893 1908K 1909K 1942K 1947K 1961K 1962K 1963K 1973K 1987K 1991K 1995K 1996K 1999K 2000K 2012K 2105K 2197K 2344 2352 2400 2495 2523 2544 2576K 2659K 2685 2853 2936K L169 L587 L809 L1159 L1178 L1188 L1440 L2058" },
          { label: "Related or qualified inclusion", tone: "related", witnesses: "35 69 012 025 61 630 1243 1573 1834 1846 1852 1912 1950K 1985K 2102K 2200 2516 L2010" },
          { label: "Verse omitted", tone: "competing", witnesses: "P46 P61 01 02 03 04 0150K 5 81 621K 623K 1739 2110K 2127 2464" },
          { label: "Whole-verse deficient", tone: "neutral", witnesses: "P10 P26 P27 P31 P40 P94 P113 P118 P131 048 0172 0209 0219 0220 0221 0278 0285 0289 0311 1506K 1987SK 1991S1K 1991S2K 2400S 2816S L23 L60 L156 L1126 L1298" },
          { label: "COMPAUL Latin exact", tone: "support", witnesses: "VL135 VL51 VL54 VL58 VL75 VL86 VL88" },
          { label: "COMPAUL Latin related", tone: "related", witnesses: "VL61 VL76 VL77 VL78" },
          { label: "COMPAUL Latin omission", tone: "competing", witnesses: "VL89" },
          { label: "Latin edition text", tone: "competing", aggregates: "Stuttgart Vulgate electronic text", note: "The Stuttgart Vulgate electronic text marks the verse absent." },
          { label: "Pelagius editorial lemma", tone: "related", aggregates: "Pelagius editorial lemma", note: "Pelagius’s lemma is the full benediction; its edition records variants omitting Jesus Christ and/or amen." },
        ],
      },
    ],
    fathers: [],
  },
  {
    slug: "1-corinthians-15-47",
    reference: "1 Corinthians 15:47",
    summary:
      "The official synopsis has 113 present rows. Expanding four corrected codices gives 99 exact-position Lord states, 12 ordinary short states, five related Lord forms and P46's distinct spiritual reading.",
    unit: "ὁ κύριος immediately after ὁ δεύτερος ἄνθρωπος and before ἐξ οὐρανοῦ.",
    scope: SYNOPSIS_SCOPE,
    snapshot: {
      greekSupport: "99 exact-position Lord states",
      greekAgainst: "12 ordinary short states; 5 related forms; 1 distinct P46 reading",
      supportCategory: "Extensive Greek support in the official 1 Corinthians synopsis",
      mainEvidenceAgainst: ["P46", "Codex Vaticanus (03)", "04", "01*"],
    },
    sources: [
      { label: "IGNTP/ITSEE 1 Corinthians direct-transcription synopsis", url: "https://itseeweb.cal.bham.ac.uk/epistulae/synopsis/1Cor/index.html" },
      COMPAUL,
      COMPAUL_1COR,
      PAUL_PORTAL,
      INTF_ECM,
      { label: "Tertullian, works cited", url: "https://www.newadvent.org/fathers/0315.htm" },
    ],
    notes: ["424* contains the phrase; 424C deletes it.", "All eleven collatable COMPAUL Latin rows have the short form.", "1751 has the exact unit reading but duplicates an earlier clause in the verse."],
    units: [
      {
        id: "lord",
        label: "Presence and position of ὁ κύριος",
        reading: "ὁ δεύτερος ἄνθρωπος ὁ κύριος ἐξ οὐρανοῦ",
        groups: [
          { label: "Exact-position Lord", tone: "support", witnesses: "02 020 025 044 049 075 1 5 35 38 61 69 81 88 104 181 218 256 263 326 330 365 398 436 442 451 459 460 467 606 608 621 623 629 915 917 1069 1108 1115 1241 1319 1505 1524 1563 1573 1611 1617 1751 1834 1837 1874 1875 1877 1881 1942 1943 1945 1947 1950 1961 1962 1963 1969 1973 1985 1991 1995 1996 1999 2002 2004 2012 2102 2105 2110 2127 2197 2352 2464 2482 2495 2523 2659 2853 2865 2892 2936 01C 06C 1739C 424* L23-Additional L60-S2W14D7 L60-Additional L587-Additional L809-Additional L1159-Additional L1440-Additional L2010-Additional" },
          { label: "Ordinary short form", tone: "competing", witnesses: "03 04 012 0150 0243 6 33 1175 01* 06* 1739* 424C" },
          { label: "Related Lord forms", tone: "related", witnesses: "630 1912 2200 2400 1836" },
          { label: "P46 distinct spiritual reading", tone: "related", witnesses: "P46" },
          { label: "Not present in the verse", tone: "neutral", witnesses: "P11 P15 P34 P61 P68 P123 P129 015 016 048 088 0121 0185 0199 0201 0222 0270 0278 0285 0289 06S 06S1 441 1506 1838 L156 L169 L1126 L1178 L1188 L1298 L2058" },
          { label: "COMPAUL Latin short form", tone: "competing", witnesses: "VL251 VL51 VL54 VL58 VL61 VL75 VL76 VL77 VL78 VL88 VL89" },
          { label: "Latin edition and lemma texts", tone: "competing", reading: "short form without ὁ κύριος", aggregates: "Stuttgart Vulgate electronic text; Ambrosiaster editorial lemma; Pelagius editorial lemma", note: "All three are short edition texts, distinct from the eleven COMPAUL manuscript rows." },
        ],
      },
    ],
    fathers: [
      { author: "Tertullian", work: "On the Flesh of Christ 8", date: "c. AD 210", use: "Direct quotation", reading: "Supports the KJV reading", locator: "Chapter 8", url: "https://www.newadvent.org/fathers/0315.htm" },
      { author: "Tertullian", work: "Against Marcion 5.10", date: "c. AD 207", use: "Direct quotation", reading: "Supports the KJV reading", locator: "Book 5, chapter 10", url: "https://www.newadvent.org/fathers/03125.htm" },
      { author: "Tertullian", work: "On the Resurrection of the Flesh 49", date: "c. AD 210", use: "Direct quotation", reading: "Competing reading", locator: "Chapter 49", url: "https://www.newadvent.org/fathers/0316.htm" },
    ],
  },
  {
    slug: "ephesians-3-9",
    reference: "Ephesians 3:9",
    summary:
      "The two variations are independent. At the first unit 69C alone reads κοινωνία against 111 οἰκονομία states. At the second unit 78 states contain διὰ Ἰησοῦ Χριστοῦ in the KJV order, 36 omit it and 0278 reverses the name order.",
    unit: "Two units: κοινωνία versus οἰκονομία, and the independent phrase διὰ Ἰησοῦ Χριστοῦ.",
    scope:
      "The official Ephesians ECM-preparation apparatus: 131 selected witnesses, with hands, reversed order and whole-verse deficiencies preserved.",
    snapshot: {
      greekSupport: "1 κοινωνία state; 78 exact phrase states",
      greekAgainst: "111 οἰκονομία states; 36 phrase omissions",
      supportCategory: "A corrected Greek state for κοινωνία and broad Greek support for διὰ Ἰησοῦ Χριστοῦ",
      mainEvidenceAgainst: ["P46V", "Codex Sinaiticus (01)", "Codex Vaticanus (03)", "69*"],
    },
    sources: [
      { label: "IGNTP/ITSEE Ephesians ECM-preparation apparatus", url: "https://itseeweb.cal.bham.ac.uk/epistulae/apparatus/ephesians/introduction.html" },
      { label: "IGNTP/ITSEE Ephesians apparatus conventions and instructions", url: "https://itseeweb.cal.bham.ac.uk/epistulae/apparatus/ephesians/instructions.html" },
      { label: "IGNTP/ITSEE Ephesians direct-transcription synopsis", url: "https://itseeweb.cal.bham.ac.uk/epistulae/synopsis/ephesians/index.html" },
      { label: "Chrysostom, Homily 7 on Ephesians", url: "https://www.newadvent.org/fathers/230107.htm" },
      PAUL_PORTAL,
      INTF_ECM,
    ],
    notes: ["69* reads οἰκονομία and 69C reads κοινωνία.", "1505 omits διὰ Ἰησοῦ Χριστοῦ; 0278 has the phrase in reversed order."],
    units: [
      {
        id: "noun",
        label: "κοινωνία or οἰκονομία",
        reading: "κοινωνία",
        groups: [
          { label: "κοινωνία", tone: "support", witnesses: "69C" },
          { label: "οἰκονομία", tone: "competing", witnesses: "P46V 01 02 03 04 06 012 020 025 044 049 075 0150 1 6 33 35 38 61 69* 81 88 93 94V 104 181 218 256 263 326 330 365 383 398 424 436 442 451 459 462 467 606 629 636 664 665 915 1069 1108 1115 1127 1175 1241 1319 1398 1505 1573 1611 1617 1739 1751 1831 1834 1836 1837 1838 1877 1881 1893 1908 1910 1912 1918 1939 1962 1963 1985 1987 1991 1996 1999 2004 2011 2012 2127 2138 2180 2243 2344 2352 2400 2464 2492 2495 2516 2523 2544 2576 2805 2853 2865 L156 L169 L587 L809 L1159 L1178 L1188 L1440 L2010 L2058" },
          { label: "Lacunose at the noun", tone: "neutral", witnesses: "0278" },
          { label: "Whole-verse deficient", tone: "neutral", aggregates: "19 whole-verse deficient witnesses in the official Ephesians apparatus", note: "Held separate from 0278, which is lacunose only at the noun." },
        ],
      },
      {
        id: "creator-phrase",
        label: "Presence of διὰ Ἰησοῦ Χριστοῦ",
        reading: "διὰ Ἰησοῦ Χριστοῦ",
        groups: [
          { label: "Exact KJV order", tone: "support", witnesses: "06C2 020 049 1 6 35 38 61 69 88 93 94 104 181 218 326 330 383 398 424 436 451 459 462 467 606 629C 636 664 665 1069 1115 1127 1241 1617 1751 1831 1836 1837 1838 1877 1881 1893 1910-2 1912 1918 1939 1963 1985 1987 1991 1996 1999 2004 2011 2012 2138 2180 2243 2344 2352 2400 2523 2544 2576 2805 2853 2865 L156 L169 L587 L809 L1159 L1178 L1188 L1440 L2010 L2058" },
          { label: "Reversed διὰ Χριστοῦ Ἰησοῦ", tone: "related", witnesses: "0278" },
          { label: "Phrase omitted", tone: "competing", witnesses: "P46 01 02 03 04 06* 012 025 044 075 0150 33 81 256 263 365 442 629* 915 1108 1175 1319 1398 1505 1573 1611 1739 1834 1908 1910-1 1962 2127 2464 2492 2495 2516" },
          { label: "Whole-verse deficient", tone: "neutral", aggregates: "19 whole-verse deficient witnesses in the official Ephesians apparatus", note: "These rows are not placed under omission." },
        ],
      },
    ],
    fathers: [
      { author: "Chrysostom", work: "Homily 7 on Ephesians", date: "c. AD 400", use: "Textual comment", reading: "Related", locator: "Ephesians 3:9 exposition", url: "https://www.newadvent.org/fathers/230107.htm" },
      { author: "Chrysostom", work: "Homily 7 on Ephesians", date: "c. AD 400", use: "Close quotation", reading: "Supports the KJV reading", locator: "Homily 7 on Ephesians, later exposition: “who created all things by Jesus Christ”", url: "https://www.newadvent.org/fathers/230107.htm", transmission: "Cited from the received English translation; the Greek edition is not collated here" },
    ],
  },
  {
    slug: "colossians-1-14",
    reference: "Colossians 1:14",
    summary:
      "The official direct-transcription page has 200 present manuscript and lectionary rows. Expanding corrections gives 47 exact-position states, 11 related or partial states and 150 non-exact states; 11 further identifiers are absent from the verse.",
    unit: "διὰ τοῦ αἵματος αὐτοῦ in its position after τὴν ἀπολύτρωσιν.",
    scope: SYNOPSIS_SCOPE,
    snapshot: {
      greekSupport: "47 exact states in 46 physical rows",
      greekAgainst: "150 non-exact states; 11 related or partial",
      supportCategory: "Forty-six displayed Greek manuscript/lectionary rows with the exact-position phrase",
      mainEvidenceAgainst: ["2495", "1319*", "1509*", "2011*"],
    },
    sources: [
      { label: "IGNTP/ITSEE Colossians direct-transcription synopsis", url: "https://itseeweb.cal.bham.ac.uk/epistulae/synopsis/colossians/index.html" },
      PAUL_PORTAL,
      INTF_ECM,
    ],
    notes: ["2495 omits the phrase; 2464 is partial rather than exact.", "424 has two exact states separated by a correction that deletes the phrase."],
    units: [
      {
        id: "blood-phrase",
        label: "Through his blood",
        reading: "διὰ τοῦ αἵματος αὐτοῦ",
        groups: [
          { label: "Exact phrase in exact position", tone: "support", witnesses: "35 94 142 206 330 429 451 467 496 636 1108 1127 1315 1398 1490 1505 1611 1617 1678 1729 1758 1769 1831 1892 1912 1916 1945 1959 1975 1995 2005 2080 2138 2352 2400 2492 2516 2696 L1159-S3W12D1 L2058-S3W12D1 424* 424C-restore 1509C 1848* 2011C 2544C 2805C" },
          { label: "Related or partial forms", tone: "related", witnesses: "1175 1319C 1919 2086 1939 1963 1996 1999 2012 2464 2805*" },
          { label: "Named corrected non-exact states", tone: "competing", witnesses: "424C-delete 1319* 1509* 1848C-delete 2011* 2544*", aggregates: "144 further uncorrected present rows without the blood phrase" },
          { label: "Absent from the verse", tone: "neutral", witnesses: "P46 P61 015 016 048 0198 0208 0278 0289 2834 L1126" },
          { label: "Not rows in this official synopsis corpus", tone: "neutral", witnesses: "614 630", note: "614 and 630 have no rows in the official Colossians direct-transcription synopsis; absence from the corpus is not a reading." },
        ],
      },
    ],
    fathers: [],
  },
  {
    slug: "1-timothy-3-16",
    reference: "1 Timothy 3:16",
    summary:
      "The official synopsis exposes 323 present manuscript and lectionary rows. Expanding corrected hands gives 297 exact θεός states, 11 ὃς states, one ὅ state, 14 related or partial states and five deficient states; 15 identifiers are absent from the verse.",
    unit: "The grammatical subject immediately before ἐφανερώθη: θεός, ὃς, ὅ and related or partially preserved forms.",
    scope: SYNOPSIS_SCOPE,
    snapshot: {
      greekSupport: "297 exact θεός states",
      greekAgainst: "11 ὃς states and 1 ὅ state",
      supportCategory: "The dominant reading in the official 1 Timothy direct-transcription synopsis",
      mainEvidenceAgainst: ["01*", "02*", "04*", "06*"],
    },
    sources: [
      { label: "IGNTP/ITSEE 1 Timothy direct-transcription synopsis", url: "https://itseeweb.cal.bham.ac.uk/epistulae/synopsis/1timothy/index.html" },
      PAUL_PORTAL,
      { label: "Chrysostom, Homily 11 on 1 Timothy", url: "https://www.newadvent.org/fathers/230611.htm" },
      INTF_ECM,
    ],
    notes: ["The early codices 01, 02, 04 and 06 preserve corrected hand changes at the subject.", "061 is supplied and related, not a clean fifth-century θεός witness."],
    units: [
      {
        id: "subject",
        label: "Subject before ἐφανερώθη",
        reading: "θεός",
        groups: [
          { label: "Exact θεός", tone: "support", witnesses: "018 020 025 044 056 075 0142 0150 0151 1 3 5 6 18 35 38 42 43 61 81 82 90 93 103 104 105 110 131 133 141 142 149 177 181 189 203 205 209 218 234 250 254 263 296 321 322 323 326 330 337 356 363 367 383 384 398 404 424 425 432 436 451 452 454 455 456 457 459 460 462 467 547 582 602 606 608 612 619 620 622 623 627 629 630 632 639 664 676 699 794 796 808 823 824 876 886 909 914 922 945 997 999 1022 1069 1099 1100 1106 1108 1115 1127 1149 1161 1240 1241 1242 1244 1245 1251 1319 1352 1359 1390 1398 1404 1424 1425 1448 1503 1505 1509 1573 1611 1617 1626 1642 1646 1661 1678 1718 1721 1725 1727 1728 1734 1735 1738 1739 1740 1750 1751 1757 1760 1766 1769 1770 1780 1795 1798 1799 1827 1830 1832 1834 1836 1837 1839 1840-1 1845 1847 1848 1851 1852 1854 1855 1864 1867 1869 1870 1874 1876 1877 1879 1880 1881 1886 1889 1891 1893 1894 1897 1900 1905 1908 1910 1912 1916 1917 1919 1920 1922 1925 1929 1933 1939 1945 1947 1948 1950 1959 1961 1962 1963 1969 1973 1976 1977 1984 1985 1987-1 1991 1992 1994 1995 1997 1998 1999 2000 2003 2004 2005 2007 2011 2012 2080 2086 2102 2105 2110 2138 2194 2197 2200 2201 2221 2248 2257 2344 2352 2374 2400 2401 2482 2484 2492 2495 2516 2523 2541 2544 2554 2576 2587 2625 2629 2659 2674 2690 2705 2718 2736 2739 2772 2774 2817 2865 2886 2889 2892 2899 2903 L23 L156 L169 L587 L809 L1126 L1159 L1188 L1298 L1440 L2010-1 L2010-2 L2058 01C3 02C 04C3 06C2" },
          { label: "ὃς", tone: "competing", witnesses: "010 012 33 365 442 1175 2127 L60 01* 02* 04*" },
          { label: "ὅ", tone: "competing", witnesses: "06*" },
          { label: "Related, partial or subjectless", tone: "related", witnesses: "69 88 915 1524 1918 1943 2002 91 336 256 2243 P133 061 1996C" },
          { label: "Deficient present-row states", tone: "neutral", witnesses: "0241 1840-2 1987-2 2008 1996*" },
          { label: "Absent from the verse", tone: "neutral", witnesses: "015 016 048 0259 0262 0285 0319 339 720 1838 1942 2716 2805 2893 L1178" },
        ],
      },
    ],
    fathers: [
      { author: "Chrysostom", work: "Homily 11 on 1 Timothy", date: "c. AD 400", use: "Close quotation", reading: "Related", locator: "Homily 11 on 1 Timothy, on 3:16", url: "https://www.newadvent.org/fathers/230611.htm", transmission: "The received English translation prints “God [He who] was manifest”; the underlying Greek edition is not collated here" },
    ],
  },
];
