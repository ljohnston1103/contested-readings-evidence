import type { FullWitnessEntry } from "./types";

const ECM_ACTS = {
  label: "INTF digital Editio Critica Maior: Acts",
  url: "https://ntvmr.uni-muenster.de/ecm",
};
const INTF_LISTE = {
  label: "INTF Kurzgefasste Liste / NTVMR manuscript metadata",
  url: "https://ntvmr.uni-muenster.de/liste",
};
const INTF_PATRISTIC = {
  label: "INTF Patristic Citations database",
  url: "https://intf.uni-muenster.de/patristik/",
};
const ACTS_SCOPE =
  "The current digital ECM Acts apparatus. Counts describe the named reading states displayed in its selected corpus; Byz remains an unexpanded group.";

export const actsWitnesses: FullWitnessEntry[] = [
  {
    slug: "acts-8-37",
    reference: "Acts 8:37",
    summary:
      "The selected ECM Acts corpus contains 37 Greek entries with the verse in some form and 49 that omit it, with Byz grouped under omission. Internal wording varies; 808C alone matches the complete Scrivener/TR combination across every displayed internal unit.",
    unit:
      "Whole-verse presence at ECM unit 2-44↓, followed by six internal wording units. Presence alone is not exact agreement with the complete KJV/TR form.",
    scope: ACTS_SCOPE,
    snapshot: {
      greekSupport: "1 exact TR state; 37 states contain the verse in some form",
      greekAgainst: "49 named omission states plus Byz",
      supportCategory: "Corrected Greek state 808C, with broader Greek, Latin and patristic presence evidence",
      mainEvidenceAgainst: ["P45", "P74", "Codex Sinaiticus (01)", "Codex Vaticanus (03)"],
    },
    sources: [
      { ...ECM_ACTS, url: "https://ntvmr.uni-muenster.de/ecm?segment=37&verse=Acts.8.37", locator: "Acts 8:37" },
      INTF_LISTE,
      INTF_PATRISTIC,
    ],
    notes: [
      "GA 104 omits the verse in the official transcription.",
      "GA 1739 contains the verse in its main text, not merely in a margin.",
      "Lectionaries are divided: L1178 and L1825 include; L60, L1188 and L2010 omit.",
    ],
    units: [
      {
        id: "whole-verse",
        label: "Whole-verse presence and omission",
        reading: "Acts 8:37 present in the complete TR form",
        groups: [
          {
            label: "Exact complete TR intersection",
            tone: "support",
            witnesses: "808C",
            note: "The first-hand state [808*] omits.",
          },
          {
            label: "Verse present in a non-exact or internally varied form",
            tone: "related",
            witnesses: "08 88C 94 103 180 307 323 429 453 467 522 607 610 629 630 636 876 945 1501 1509 1609 1642 1678 1704 1735 1739 1751 1832 1884 1891 2200 2298 2805 2818 L1178 L1825",
            aggregates: "Ir L:50.51.54.56.57.58.67.70.72.73> K:M S:Hᴬ",
          },
          {
            label: "Verse omitted",
            tone: "competing",
            witnesses: "P45 P74 01 02 03 04 044 5 33 61 81 88* 181 431 436 441 614 619 621 623 915 996 1162 1175 1270 1292 1297 1409 1490 1505 1595 1611 1729 1827 1831 1838 1842 1890 2138 2147 2344 2412 2495 2652 2718 L60 L1188 L2010 [808*]",
            aggregates: "Byz · L:V:189> K:SB G Sl Chrys S:Ph Ä",
          },
        ],
      },
    ],
    fathers: [
      {
        author: "Irenaeus",
        work: "Against Heresies 3.12.8",
        date: "c. AD 180",
        use: "Close quotation",
        reading: "Supporting witness",
        locator: "INTF record 1569; SC 211, 214.4",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=1569",
      },
      { author: "Irenaeus", work: "Against Heresies 4.23.2", date: "c. AD 180", use: "Allusion", reading: "Supporting witness", locator: "SC 100, 696.50, INTF record 3171", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=3171", transmission: "Latin" },
      {
        author: "Chrysostom",
        work: "Homilies on Acts 19.1",
        date: "c. AD 400",
        use: "Textual comment",
        reading: "Competing witness",
        locator: "INTF record 9363; PG 60, 150.28",
        url: "https://intf.uni-muenster.de/patristik/index2.php?submit=9363",
      },
    ],
  },
  {
    slug: "acts-9-5-6",
    reference: "Acts 9:5–6",
    summary:
      "The full expansion occurs in two corrected Greek states, 69C and 808Cf; both first hands have the short text. GA 629 contains the goad saying only. Latin evidence is divided among the shorter, goad-only and full forms.",
    unit:
      "Two independent additions: the goad saying, and Saul's trembling question with the Lord's response introduction.",
    scope: ACTS_SCOPE,
    snapshot: {
      greekSupport: "2 corrected Greek states with the full expansion",
      greekAgainst: "83 short states across two ordinary short forms, plus Byz",
      supportCategory: "Corrected states 69C and 808Cf; Latin witnesses L54, L56, L58, L61, L67 and L189",
      mainEvidenceAgainst: ["P74", "Codex Sinaiticus (01)", "Codex Vaticanus (03)", "69* and [808*]"],
    },
    sources: [
      { ...ECM_ACTS, url: "https://ntvmr.uni-muenster.de/ecm?segment=6&verse=Acts.9.6", locator: "Acts 9:6, unit 2-4" },
      INTF_LISTE,
      INTF_PATRISTIC,
    ],
    notes: [
      "GA 69 is a fifteenth-century codex and GA 808 a fourteenth-century codex; the correcting hands are not separately dated.",
      "P45 is noncollatable at this exact unit and is not counted with the short reading.",
    ],
    units: [
      {
        id: "full-expansion",
        label: "Goad saying plus Saul's question",
        reading: "σκληρόν σοι πρὸς κέντρα λακτίζειν … τί με θέλεις ποιῆσαι",
        groups: [
          { label: "Full expansion", tone: "support", witnesses: "69C 808Cf", aggregates: "L:54.56.58.61.67.189> K:M" },
          { label: "Goad saying only", tone: "related", witnesses: "629", aggregates: "L:51.57.72>" },
          { label: "Short form ἀλλ’ ἀνάστηθι", tone: "competing", witnesses: "049 0142 61 69* 88 180 181 307 383 424 429C 436 441 453 468 610 621 1175 1490 1501 1563 1609 1678 1751 1831 1842 2652 2718 2818 L156 L1825 L2010", aggregates: "L:V:50> Chrys K:SB G Sl Cyr S:Ph Ä" },
          { label: "Short form ἀλλὰ ἀνάστηθι", tone: "competing", witnesses: "P74 01 02 03 04 08 044 5 33 81 94 429* 431 467 522 614 619 623 630 636 915 945 996 1162 1270 1292 1297 1409 1505 1595 1611 1642f 1704 1729 1739 1827 1838 1884 1890 1891 2138 2147 2200 2298 2344 2412 2495 2805 L60 L1188 [808*]", aggregates: "Byz" },
          { label: "Noncollatable at the unit", tone: "neutral", witnesses: "P45 P53 014S 1852 1875" },
        ],
      },
    ],
    fathers: [
      { author: "Chrysostom", work: "Homilies on Acts 19.3", date: "c. AD 400", use: "Direct quotation", reading: "Competing witness", locator: "INTF record 4668; PG 60, 153.9", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=4668" },
      { author: "Cyril of Alexandria", work: "Thesaurus", date: "c. AD 425", use: "Direct quotation", reading: "Competing witness", locator: "INTF record 4178; PG 75, 500B2", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=4178" },
      { author: "Pseudo-Chrysostom", work: "Psalm 50 material", date: "Late antique", use: "Close quotation", reading: "Competing witness", locator: "PG 55, 530.49, INTF record 7742", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=7742" },
      { author: "Chrysostom", work: "Acts 9:6 record", date: "c. AD 400", use: "Direct quotation", reading: "Competing witness", locator: "INTF record 4669", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=4669" },
      { author: "Cyril of Alexandria", work: "Acts 9:6 record", date: "Fifth century", use: "Direct quotation", reading: "Competing witness", locator: "INTF record 4179", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=4179" },
      { author: "Epiphanius", work: "Acts 9:6 records", date: "Fourth century", use: "Close quotation", reading: "Competing witness", locator: "INTF records 1024 and 1025", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=1024" },
      { author: "Pseudo-Caesarius", work: "Acts 9:6 record", date: "Late antique", use: "Close quotation", reading: "Competing witness", locator: "INTF record 6834", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=6834" },
      { author: "Pseudo-Didymus", work: "Acts 9:6 record", date: "Late antique", use: "Close quotation", reading: "Competing witness", locator: "INTF record 9158", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=9158" },
      { author: "Pseudo-Chrysostom", work: "Acts 9:6 record", date: "Late antique", use: "Close quotation", reading: "Competing witness", locator: "INTF record 7745", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=7745" },
    ],
  },
  {
    slug: "acts-20-28",
    reference: "Acts 20:28",
    summary:
      "The selected ECM corpus is multiway at the title: 34 Greek states read God, 34 Lord, 21 Lord and God plus Byz, and two singleton Jesus-inclusive forms. At the separate blood-order unit, 29 named entries have the KJV order plus Byz and 49 have the competing order.",
    unit:
      "Two independent units: θεοῦ/κυρίου and conflations at the church title, followed by ἰδίου αἵματος versus αἵματος τοῦ ἰδίου.",
    scope: ACTS_SCOPE,
    snapshot: {
      greekSupport: "34 God states; 29 KJV-order states plus Byz",
      greekAgainst: "34 Lord states; 49 competing-order entries",
      supportCategory: "Ancient Greek, Syriac, Coptic, Latin and patristic evidence for God, with Byzantine support for the KJV word order",
      mainEvidenceAgainst: ["P41", "P74", "Codex Alexandrinus (02)", "Codex Bezae (05)"],
    },
    sources: [
      { ...ECM_ACTS, url: "https://ntvmr.uni-muenster.de/ecm?segment=28&verse=Acts.20.28", locator: "Acts 20:28" },
      { label: "Official Vetus Latina collation for Acts 20:28", url: "https://download.uni-mainz.de/fb07-klassphil-nttf/Apostelgeschichte/Act%2020/Act%2020_28.pdf", locator: "p. 1, column 30" },
      INTF_LISTE,
      INTF_PATRISTIC,
    ],
    notes: [
      "The noun and word-order units are independent and must not be combined into one vote.",
      "424* has no assigned noun reading; [424C] reads Lord and God.",
    ],
    units: [
      {
        id: "title",
        label: "God, Lord, or a conflated title",
        reading: "θεοῦ",
        groups: [
          { label: "θεοῦ — God", tone: "support", witnesses: "01 03 0142 35* 104 218 383 441 459 614 621 629 1175 1292 1409 1490 1505 1509 1611 1642 1704 1831 1842 1890 2138 2147 2298 2412 2495 2652 2774 L60 L1825 L2010", aggregates: "Antioch Ath Bas Chrys ConstApT L:V:58.189> Cyr Dam Epiph PetrAl S:P>HT ThdMop K:Bᵐˢ" },
          { label: "κυρίου καὶ θεοῦ — Lord and God", tone: "related", witnesses: "04C3 5 61 88 467 619 623C 636 915 1162 1270 1297 1501 1595 1729 1827 1838 2805 L1188 [35C] [424C]", aggregates: "Byz" },
          { label: "Jesus-inclusive conflations", tone: "related", witnesses: "1837 2243", note: "1837 reads Lord Jesus and God; 2243 reads Lord Jesus." },
          { label: "κυρίου — Lord", tone: "competing", witnesses: "P41 P74 02 04* 05 08 044 33 94 180 181 206 228 307 429 431 436 453 522 610 623* 630 945 996 1678 1735 1739 1751 1875 1884 1891 2344 2464 2818", aggregates: "AmAl Chrys ConstApmss Dam Did IrLat Thdrt K:SB L:5.50.51.54> S:Hᴹ" },
          { label: "No assigned noun reading", tone: "neutral", witnesses: "424*" },
        ],
      },
      {
        id: "blood-order",
        label: "Order of ‘his own blood’",
        reading: "ἰδίου αἵματος",
        groups: [
          { label: "KJV/TR order ἰδίου αἵματος", tone: "support", witnesses: "88 94 180 441 467 614 619 621 636 915 996 1162 1270 1297 1409f 1501 1505 1595 1642 1729 1827 1838 1842 2147 2344 2412 2495 2652 L1825", aggregates: "Byz" },
          { label: "Competing order αἵματος τοῦ ἰδίου", tone: "competing", witnesses: "P41 P74 01 02 03 04 05 08 044 5 6 33 61 69 181 206 307 326 429 431 436 453 522 610 623 630 945 1175 1292 1490 1611 1678 1704(*)f 1735 1739 1751 1831 1837 1875 1884 1890 1891 2138 2298 2464 2805 2818 L60 L2010" },
          { label: "Related singleton orders", tone: "related", witnesses: "629 1874" },
        ],
      },
    ],
    fathers: [
      { author: "Athanasius", work: "Sermon 1.6.6", date: "4th century", use: "Direct quotation", reading: "Supporting witness", locator: "INTF record 8183; Wyrwa I.1, 464.29", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=8183" },
      { author: "Basil", work: "Regulae 80.16", date: "4th century", use: "Direct quotation", reading: "Supporting witness", locator: "INTF record 91; PG 31, 865B9", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=91" },
      { author: "Chrysostom", work: "Homilies on Acts 44.2", date: "c. AD 400", use: "Direct quotation", reading: "Supporting witness", locator: "INTF records 6428–6429; PG 60, 310.23", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=6428" },
      { author: "Chrysostom", work: "Purchase-clause quotation", date: "c. AD 400", use: "Close quotation", reading: "Supporting witness", locator: "INTF record 6432", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=6432" },
      { author: "Antiochus", work: "Pandecta 122", date: "Seventh century", use: "Direct quotation", reading: "Supporting witness", locator: "PG 89, 1812B10, INTF records 8320 and 8273", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=8320" },
      { author: "John Damascene", work: "Sacra Parallela E17", date: "Eighth century", use: "Direct quotation", reading: "Supporting witness", locator: "PG 95, 1539B7, INTF record 8434", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=8434" },
      { author: "Cyril of Alexandria", work: "Theotokos 3.22", date: "Fifth century", use: "Direct quotation", reading: "Supporting witness", locator: "ACO I.1.7, 29.14, INTF record 4573", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=4573" },
      { author: "Ammonius of Alexandria", work: "Fragmenta in Acta 20:28", date: "Late antiquity", use: "Textual comment", reading: "Competing witness", locator: "PG 85, 1581A11, INTF record 2672", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=2672" },
      { author: "Pseudo-Didymus", work: "De Trinitate 2.8.2", date: "Late antiquity", use: "Direct quotation", reading: "Competing witness", locator: "PG 39, 621B7, INTF record 9143", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=9143" },
      { author: "Didymus the Blind", work: "Commentary on Zechariah 2.153.259", date: "Fourth century", use: "Close quotation", reading: "Supporting witness", locator: "INTF record 772", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=772" },
      { author: "Pseudo-Athanasius", work: "De incarnatione contra Apollinarium 1.13", date: "Late antiquity", use: "Close quotation", reading: "Supporting witness", locator: "INTF record 482", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=482" },
      { author: "Theodoret", work: "Commentary on Philippians 1:1f", date: "Fifth century", use: "Close quotation", reading: "Supporting witness", locator: "INTF record 2454", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=2454" },
      { author: "Irenaeus", work: "Against Heresies 3.14.2", date: "c. AD 180", use: "Direct quotation", reading: "Competing witness", locator: "INTF record 3320; SC 211, 264.59", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=3320", transmission: "Latin" },
      { author: "Theodoret", work: "Theologia Trinitatis 26", date: "5th century", use: "Direct quotation", reading: "Competing witness", locator: "INTF record 2510; PG 75, 1185B6", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=2510" },
    ],
  },
  {
    slug: "acts-28-29",
    reference: "Acts 28:29",
    summary:
      "The selected ECM Acts corpus contains 56 Greek entries with the verse in some form and 22 that omit it; Byz is grouped with presence. Forty-five named entries match the complete TR/KJV combination, plus Byz. Lectionary, Latin, Syriac and Coptic evidence is divided.",
    unit: "Whole-verse presence followed by the internal wording required for the exact TR/KJV form.",
    scope: ACTS_SCOPE,
    snapshot: {
      greekSupport: "45 exact named states plus Byz; 56 states contain the verse in some form",
      greekAgainst: "22 named omission entries",
      supportCategory: "Broad medieval Greek and Byzantine presence, with divided Latin and Syriac evidence",
      mainEvidenceAgainst: ["P74", "Codex Sinaiticus (01)", "Codex Vaticanus (03)", "Codex Laudianus (08)"],
    },
    sources: [
      { ...ECM_ACTS, url: "https://ntvmr.uni-muenster.de/ecm?segment=29&verse=Acts.28.29", locator: "Acts 28:29" },
      INTF_LISTE,
      INTF_PATRISTIC,
    ],
    notes: [
      "L1825 and L2010 include the verse; L60 omits it.",
      "Chrysostom attests the verse but reads πάλιν rather than πολλήν.",
    ],
    units: [
      {
        id: "whole-verse",
        label: "Presence and exact wording",
        reading: "Complete TR/KJV verse",
        groups: [
          { label: "Exact complete TR/KJV intersection", tone: "support", witnesses: "5 61 88 94 180 206 307 429 431 436 453 467 610 614 619 623 629C 630 636 915 1067 1162 1270 1292 1297 1409 1490 1501 1595 1611 1642 1678 1704 1729 1827 1831 1838 1890 1891 2147 2200 2298 2412 2652 2818", aggregates: "Byz" },
          { label: "Verse present with internal differences", tone: "related", witnesses: "522 945 996 1505 1751 1875 2138 2495 2805 L1825 L2010" },
          { label: "Verse omitted", tone: "competing", witnesses: "P74 01 02 03 08 044 048 33 43 81 181 441 621 1175 1243 1739 1842 1884 2344 2464 2718 L60", aggregates: "L:V:50> K:SB G S:Ph Ä" },
        ],
      },
    ],
    fathers: [
      { author: "Chrysostom", work: "Homilies on Acts 55.1", date: "c. AD 400", use: "Close quotation", reading: "Supporting witness", locator: "INTF record 8127; PG 60, 380.48", url: "https://intf.uni-muenster.de/patristik/index2.php?submit=8127" },
    ],
  },
];
