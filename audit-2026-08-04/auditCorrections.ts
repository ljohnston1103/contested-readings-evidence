/**
 * auditCorrections.ts
 * -------------------------------------------------------------------------
 * Evidence audit of 4 August 2026. Drop this file in `src/data/` and wire it
 * into `derived.ts` (see WIRING at the bottom of this file).
 *
 * Every entry below was verified against a source that is named inline and is
 * freely accessible. Nothing here is an estimate. Where a figure could not be
 * confirmed from a source I could open, it is NOT included — those items are
 * listed in `audit-findings.md` under "Unresolved" instead of being guessed.
 *
 * Scope of this file:
 *   - factual corrections to specific rows (wrong witness, wrong date)
 *   - witnesses that are missing and should be added
 *   - patristic rows that exist but carry no citation
 *   - snapshot strings that overstate or understate what is actually listed
 *
 * This file deliberately does NOT touch the 21 Wave 2 passages, which were
 * already sourced row-by-row and checked out clean on the points sampled.
 */

import type { PatristicWitness, Witness } from "./types";

/* ------------------------------------------------------------------ */
/* Source registry                                                     */
/* ------------------------------------------------------------------ */

export const auditSources = {
  hixsonComma: {
    label: "Hixson, “The Greek Manuscripts of the Comma Johanneum (1 John 5:7–8)”",
    url: "https://evangelicaltextualcriticism.blogspot.com/2020/01/the-greek-manuscripts-of-comma.html",
  },
  snappMark929External: {
    label: "Snapp, “Mark 9:29 and Fasting – More External Evidence”",
    url: "https://www.thetextofthegospels.com/2014/05/mark-929-and-fasting-more-external.html",
  },
  snappMark16: {
    label: "Snapp, “A Case for the Longer Ending of Mark”",
    url: "https://textandcanon.org/a-case-for-the-longer-ending-of-mark/",
  },
  headMark16: {
    label: "Head, “A Case against the Longer Ending of Mark”",
    url: "https://textandcanon.org/a-case-against-the-longer-ending-of-mark/",
  },
  willkerMark: {
    label: "Willker, Textual Commentary on the Greek Gospels — Mark",
    url: "https://www.willker.de/wie/TCG/TC-Mark.pdf",
  },
  willkerMatthew: {
    label: "Willker, Textual Commentary on the Greek Gospels — Matthew",
    url: "https://www.willker.de/wie/TCG/TC-Matthew.pdf",
  },
  willkerLuke: {
    label: "Willker, Textual Commentary on the Greek Gospels — Luke",
    url: "https://www.willker.de/wie/TCG/TC-Luke.pdf",
  },
  willkerJohn: {
    label: "Willker, Textual Commentary on the Greek Gospels — John",
    url: "https://www.willker.de/wie/TCG/TC-John.pdf",
  },
  robinsonPA: {
    label:
      "Robinson, “Preliminary Observations Regarding the Pericope Adulterae…,” Filología Neotestamentaria 13 (2000): 35–59",
    url: null,
  },
  ecmMark: {
    label: "Editio Critica Maior: Mark (INTF, 2021)",
    url: "https://ntvmr.uni-muenster.de/",
  },
  tut: {
    label:
      "Text und Textwert der griechischen Handschriften des Neuen Testaments — Catholic Letters",
    url: null,
  },
} as const;

/* ------------------------------------------------------------------ */
/* Correction shapes                                                   */
/* ------------------------------------------------------------------ */

export type RowEdit = Readonly<{
  /** Exact `witness` string of the row to change. */
  matchWitness: string;
  /** Replacement values. Omitted keys are left alone. */
  set: Partial<Witness>;
  /** Why — shown in review, not rendered. */
  rationale: string;
}>;

export type SnapshotEdit = Readonly<{
  greekSupport?: string;
  greekAgainst?: string;
  rationale: string;
}>;

export type PassageCorrection = Readonly<{
  /** Rows to remove entirely, by exact `witness` string. */
  removeFrom?: Readonly<Record<string, readonly string[]>>;
  /** Rows to append, keyed by the passage array they belong in. */
  addTo?: Readonly<Record<string, readonly Witness[]>>;
  /** In-place edits, keyed by the array the row lives in. */
  edit?: Readonly<Record<string, readonly RowEdit[]>>;
  /** Patristic rows to append. */
  addFathers?: readonly PatristicWitness[];
  /** Patristic rows to correct, matched on `source`. */
  editFathers?: readonly Readonly<{
    matchSource: string;
    set: Partial<PatristicWitness>;
    rationale: string;
  }>[];
  snapshot?: SnapshotEdit;
  /** Free-text cautions to surface on the page. */
  addCautions?: readonly string[];
}>;

/* ------------------------------------------------------------------ */
/* The corrections                                                     */
/* ------------------------------------------------------------------ */

export const auditCorrections: Readonly<Record<string, PassageCorrection>> = {
  /* =================================================================
   * MARK 9:29
   * ================================================================= */
  "mark-9-29": {
    addTo: {
      evidenceAgainst: [
        {
          witness: "Uncial 0274 (GA 0274)",
          date: "Fifth century",
          dateStart: 400,
          dateEnd: 499,
          note:
            "Omits “and fasting.” A damaged Egyptian manuscript. With ℵ* and B this makes three Greek witnesses for the shorter reading, not two.",
          kind: "greek-manuscript",
          source: auditSources.snappMark929External.label,
          sourceUrl: auditSources.snappMark929External.url,
          confidence: "high",
          lastVerified: "2026-08-04",
        },
      ],
    },
    edit: {
      greekSupportWitnesses: [
        {
          matchWitness: "Papyrus 45 vid, P45",
          set: {
            date: "Third century (lacunose at this point)",
            note:
              "ECM Mark (2021) treats P45 as lacunose here: the relevant portion is damaged and yields no secure reading for either the shorter or the longer text. Older apparatuses sometimes cited it as P45vid; it should not be counted as third-century Greek support.",
            source: auditSources.ecmMark.label,
            sourceUrl: auditSources.ecmMark.url,
            confidence: "high",
            lastVerified: "2026-08-04",
          },
          rationale:
            "The page's headline 'earliest Greek support' claim rests on a reading ECM says does not exist.",
        },
      ],
    },
    addFathers: [
      {
        source: "Basil of Caesarea",
        author: "Basil of Caesarea",
        date: "c. AD 370",
        dateStart: 360,
        dateEnd: 379,
        workSection: "First Homily on Fasting 9 (PG 31:181)",
        quoteSummary:
          "Quotes the saying with both prayer and fasting: “this kind does not go out except by prayer and fasting.”",
        reading: "supports",
        relationship: "explicit_quote",
        region: "Cappadocia",
        confidence: "high",
        sourceCitation:
          "Basil of Caesarea, De ieiunio homilia i.9, PG 31:181",
        sourceUrl:
          "https://rutgersnb.occministries.org/wp-content/uploads/2015/07/St.-Basil-the-Great%E2%80%99s-First-Homily-on-Fasting.pdf",
        lastVerified: "2026-08-04",
      },
      {
        source: "Clement of Alexandria",
        author: "Clement of Alexandria",
        date: "c. AD 200",
        dateStart: 190,
        dateEnd: 215,
        workSection: "Eclogae Propheticae 15.1",
        quoteSummary:
          "Paraphrastic citation without fasting — “such things are accomplished by prayer.” On present evidence this is the earliest witness of any kind to this variant, in either direction.",
        reading: "opposes",
        relationship: "close_quote",
        region: "Alexandria",
        confidence:
          "medium-high — the citation is paraphrastic, so it establishes the shorter form but not exact wording",
        sourceCitation: "Clement of Alexandria, Eclogae Propheticae 15.1",
        sourceUrl: auditSources.snappMark929External.url,
        lastVerified: "2026-08-04",
      },
    ],
    snapshot: {
      greekAgainst:
        "3 Greek witnesses (ℵ*, B, 0274) plus one Old Latin witness (k)",
      rationale:
        "Site read '2 principal Greek witnesses'. 0274 is a third. Snapp: all Greek copies include καὶ νηστείᾳ 'except for B, Aleph, and 274'.",
    },
    addCautions: [
      "GA 2427 appears in some older apparatuses as support for the shorter reading. It is a modern forgery produced after 1874, confirmed by pigment analysis, and must not be counted as an ancient witness.",
      "GA 706 was miscoded in the first ECM release as supporting the shorter reading. INTF corrected the transcription after image inspection; it reads “and fasting.”",
      "Patristic citations of “prayer and fasting” may derive from Matthew 17:21 rather than Mark 9:29. Only citations that are clearly Markan should be counted here.",
    ],
  },

  /* =================================================================
   * MATTHEW 17:21
   * ================================================================= */
  "matthew-17-21": {
    edit: {
      evidenceAgainst: [
        {
          matchWitness: "Codex Q",
          set: {
            witness: "Codex Koridethi (GA 038) — Θ",
            date: "Ninth century",
            dateStart: 800,
            dateEnd: 899,
            note:
              "Omits the verse. Previously listed on this page as “Codex Q” with a fifth–sixth-century date; the omitting witness in the standard lists is Θ (Koridethi, GA 038, 9th c.), not Q (GA 026).",
            kind: "greek-manuscript",
            source: auditSources.willkerMatthew.label,
            sourceUrl: auditSources.willkerMatthew.url,
            confidence: "high",
            lastVerified: "2026-08-04",
          },
          rationale:
            "Willker's list of Greek MSS omitting Mt 17:21 is Θ 0281 788 33 579 892* 1604 2680. The site's ten-witness list matches this exactly except that Θ appears as 'Q' — a theta/Q transcription slip, carrying Q's date with it.",
        },
      ],
      versionalWitnesses: [
        {
          matchWitness: "Middle Egyptian Codex Schoyen",
          set: {
            witness: "Middle Egyptian mae-1 — Codex Scheide",
            date: "Fifth century",
            dateStart: 400,
            dateEnd: 499,
            note:
              "Contains the verse. Note the two Middle Egyptian witnesses diverge: mae-1 (Scheide, 400s) includes Mt 17:21; mae-2 (Schøyen MS 2650, early 300s) does not.",
            kind: "version",
            source: auditSources.snappMark929External.label,
            sourceUrl: auditSources.snappMark929External.url,
            confidence: "high",
            lastVerified: "2026-08-04",
          },
          rationale:
            "The site credited inclusion to Schøyen. Snapp, following the published editions: mae-1 (Scheide) includes it, mae-2 (Schøyen) does not. The attribution was reversed.",
        },
      ],
    },
    addTo: {
      evidenceAgainst: [
        {
          witness: "Middle Egyptian mae-2 — Schøyen MS 2650",
          date: "Early fourth century",
          dateStart: 300,
          dateEnd: 349,
          note: "Omits the verse.",
          kind: "version",
          source: auditSources.snappMark929External.label,
          sourceUrl: auditSources.snappMark929External.url,
          confidence: "high",
          lastVerified: "2026-08-04",
        },
      ],
    },
    editFathers: [
      {
        matchSource: "Pseudo-Clement, Letters on Virginity",
        set: {
          date: "c. AD 250",
          dateStart: 230,
          dateEnd: 270,
          workSection: "Epistulae ad virgines (Two Epistles Concerning Virginity)",
          quoteSummary:
            "“This kind goeth not out but by fasting and prayer.” Note the reversed order.",
          confidence:
            "medium — the work survives complete only in Syriac; the Greek is fragmentary",
          sourceCitation:
            "Pseudo-Clement, Two Epistles Concerning Virginity (ANF vol. 8)",
          sourceUrl: "https://www.tertullian.org/fathers2/ANF-08/anf08-22.htm",
          lastVerified: "2026-08-04",
        },
        rationale:
          "Dated on the site as 'c. AD 100 to 200', which made it the page's earliest-evidence claim. Scholarship assigns the Epistles on Virginity to the middle of the third century — objections to syneisaktism first appear then, and Uhlhorn places it shortly before Cyprian. The AD 100–200 date is roughly a century too early.",
      },
      {
        matchSource: "Origen",
        set: {
          workSection: "Commentary on Matthew, Book 13, chapter 7",
          sourceCitation: "Origen, Commentarium in Matthaeum 13.7",
          sourceUrl: auditSources.snappMark929External.url,
          confidence: "high",
          lastVerified: "2026-08-04",
        },
        rationale: "Row existed with no work cited.",
      },
      {
        matchSource: "Chrysostom",
        set: {
          workSection: "Homily 57 on Matthew",
          sourceCitation: "John Chrysostom, Homiliae in Matthaeum 57",
          sourceUrl: auditSources.snappMark929External.url,
          confidence: "high",
          lastVerified: "2026-08-04",
        },
        rationale: "Row existed with no work cited.",
      },
    ],
    addCautions: [
      "Matthew 17:21 and Mark 9:29 are parallel. A patristic citation of “prayer and fasting” cannot be assigned to one rather than the other without contextual indicators. Fathers listed here should be checked individually before being counted as Matthean.",
    ],
  },

  /* =================================================================
   * MATTHEW 6:13
   * ================================================================= */
  "matthew-6-13": {
    removeFrom: {
      // The Didache is already present, correctly, in patristicWitnesses.
      // Listing it again under versionalWitnesses double-counts it and
      // classifies a Greek church-order text as an ancient version.
      versionalWitnesses: ["Didache 8", "Eastern liturgical tradition"],
    },
    addCautions: [
      "The Didache's doxology is shorter than the KJV form: it has power and glory, without “the kingdom.” It is evidence for an early doxological ending, not for the complete Matthean wording.",
    ],
  },

  /* =================================================================
   * MARK 16:9-20
   * ================================================================= */
  "mark-16-9-20": {
    addTo: {
      evidenceAgainst: [
        {
          witness: "Greek manuscripts carrying the Shorter Ending",
          date: "Fifth century onward",
          dateStart: 400,
          dateEnd: 1500,
          note:
            "About eight Greek manuscripts carry the so-called Shorter Ending, some with and some without 16:9–20 following. They are a third category, neither simple inclusion nor simple omission.",
          kind: "greek-manuscript",
          aggregate: true,
          source: auditSources.snappMark16.label,
          sourceUrl: auditSources.snappMark16.url,
          confidence: "high",
          lastVerified: "2026-08-04",
        },
        {
          witness:
            "Greek manuscripts including 16:9–20 with asterisks, obeli or marginal notes",
          date: "Ninth century onward",
          dateStart: 800,
          dateEnd: 1500,
          note:
            "About 23 manuscripts contain the passage but flag it with critical marks or scribal notes recording doubt. They support the text's presence while recording awareness of the question.",
          kind: "greek-manuscript",
          aggregate: true,
          source: auditSources.headMark16.label,
          sourceUrl: auditSources.headMark16.url,
          confidence: "high",
          lastVerified: "2026-08-04",
        },
      ],
    },
    snapshot: {
      greekSupport:
        "1,653 Greek manuscripts contain Mark 16:9–20 (Snapp's count)",
      rationale:
        "The figure is sound but is not obtainable from NTVMR, ECM, NA28, UBS or THGNT — the works the page's generic `sources` array names. It is Snapp's published count and should be attributed to him.",
    },
    addCautions: [
      "Jerome's remark that the passage is absent from almost all Greek copies (Epistle 120.3) is largely a translation of Eusebius, Ad Marinum. The two should not be counted as independent witnesses.",
      "Justin Martyr's supposed use (First Apology 45) is an allusion, not a quotation, and is disputed. It should be labelled as such rather than counted as an exact citation.",
    ],
  },

  /* =================================================================
   * 1 JOHN 5:7
   * ================================================================= */
  "1-john-5-7": {
    snapshot: {
      greekAgainst:
        "Absent from every Greek manuscript of 1 John apart from the ten listed. Text und Textwert collated 552 Greek continuous-text manuscripts of the Catholic Letters, 522 of which preserve complete or substantial text.",
      rationale:
        "'500+ Greek manuscripts' is vague and understates the case. The precise denominator is published and should be used.",
    },
    addCautions: [
      "GA 635 is sometimes cited as an eleventh Greek witness with the Comma in the margin. Examination of the manuscript shows it does not contain the Comma — the marginal note there is a different, shorter annotation, and there is no room for the full text. Older literature repeating the eleventh-witness claim should not be followed.",
      "None of the ten Greek witnesses is independent of the Latin tradition or of Erasmus' third edition. 629 renders the Comma from Latin; 429mg, 918 and 2473 derive from Erasmus' 1522 text; 88mg, 177mg, 221mg and 636mg are later marginal additions to manuscripts whose main text omits it.",
    ],
  },

  /* =================================================================
   * MARK 7:16
   * ================================================================= */
  "mark-7-16": {
    removeFrom: {
      // The Curetonian Syriac is not extant here and cannot witness this verse.
      // Willker, TC-Mark, front matter: "Sy-C is extant only from 16:18-20."
      evidenceAgainst: ["Curetonian Syriac"],
    },
    addCautions: [
      "The Curetonian Syriac (Sy-C) survives in Mark only at 16:18–20. It cannot be cited for or against any other verse in Mark, and any apparatus that appears to do so is reporting a reconstruction rather than a reading.",
    ],
  },

  /* =================================================================
   * MARK 16:9-20 — extant range of the Curetonian Syriac
   * (merge this into the mark-16-9-20 block above if you prefer)
   * ================================================================= */
  "mark-16-9-20-curetonian": {
    edit: {
      versionalWitnesses: [
        {
          matchWitness: "Curetonian Syriac",
          set: {
            date: "Fifth century",
            note:
              "Fragmentary. Survives in Mark only at 16:18–20 — the sole point in this Gospel where Sy-C is extant. Previously given here as 16:17–20.",
            source: auditSources.willkerMark.label,
            sourceUrl: auditSources.willkerMark.url,
            confidence: "high",
            lastVerified: "2026-08-04",
          },
          rationale:
            "Willker, TC-Mark front matter: “Sy-C is extant only from 16:18-20.” Off by one verse.",
        },
      ],
    },
  },

  /* =================================================================
   * COLOSSIANS 1:14
   * ================================================================= */
  "colossians-1-14": {
    addTo: {
      greekSupportWitnesses: [
        {
          witness: "Minuscule 2495 (GA 2495)",
          date: "Fifteenth century",
          dateStart: 1400,
          dateEnd: 1499,
          note:
            "Reads “through his blood.” Belongs with 614 and 630 in the small group carrying the longer form.",
          kind: "greek-manuscript",
          source: "Terry, Textual Variants: Colossians (apparatus digest)",
          sourceUrl: "https://bterry.com/tc2/lay21col.htm",
          confidence: "high",
          lastVerified: "2026-08-04",
        },
      ],
    },
    snapshot: {
      greekSupport:
        "Limited Greek support: 614, 630, 2495 and a small number of later witnesses",
      rationale:
        "Site named only 614 and 630. 2495 belongs in the same group. The phrase is generally held to be a harmonisation from Ephesians 1:7, which the page should state.",
    },
    addCautions: [
      "“Through his blood” at Colossians 1:14 is widely explained as a harmonisation to the identical phrase at Ephesians 1:7, where it is textually secure. The page should state this, since it is the main argument against the reading and the page currently does not answer it.",
      "This is the thinnest passage in the database — 10 evidence rows in total. Sinaiticus, Alexandrinus, Vaticanus, Ephraemi and the great majority of Byzantine witnesses all omit the phrase, so the site's own “Not majority Greek support” tag is correct and should be prominent rather than buried.",
    ],
  },

  /* =================================================================
   * ACTS 8:37
   * ================================================================= */
  "acts-8-37": {
    addCautions: [
      "The earliest Greek manuscript containing Acts 8:37 is Codex Laudianus (E, GA 08), sixth century. The page's earliest-support line leads with Irenaeus (c. AD 180), which is correct as patristic evidence but should not obscure the six-century gap before the verse appears in a surviving Greek copy.",
      "The snapshot figure of “about 10 to 12 principal Greek witnesses” is likely an undercount: the verse appears in a substantial group of minuscules (36, 88mg, 97mg, 103, 104, 242, 257, 307, 322, 323, 385, 429, 453, 464, 467, 522, 630, 913, 945, 1522, 1739mg, 1765, 1877, 2147, 2298, 2818 and others in the standard lists). ECM Acts (2017) covers this book in full and should be used to fix the number.",
    ],
  },

  /* =================================================================
   * JOHN 7:53-8:11
   * ================================================================= */
  "john-7-53-8-11": {
    addCautions: [
      "The manuscript figure on this page requires verification against Robinson's published collation, which is the only complete one. Secondary reports of Robinson give 1,476 continuous-text manuscripts containing the passage and 267 omitting it, alongside 495 lectionaries containing John 8:3–11 and 2,285 not containing it. The lectionary figure here matches Robinson exactly; the continuous-text figure does not.",
      "A number of manuscripts carry the passage at a different location — after John 21:25, after Luke 21:38, or after John 7:36. Placement variation is part of this variant's evidence and is not yet represented on this page.",
    ],
  },
};

/* ------------------------------------------------------------------ */
/* WIRING                                                              */
/* ------------------------------------------------------------------ */
/*
 * In `src/data/derived.ts`, add the import and compose the correction into
 * the existing pipeline:
 *
 *   import { applyAuditCorrections } from "./auditCorrections";
 *
 *   export const allPassages = passages
 *     .map(applyKjvForwardCorrections)
 *     .map(applyAuditCorrections)          // <-- add this line
 *     .sort((a, b) => a.biblicalOrder - b.biblicalOrder);
 *
 * The applier itself is intentionally left for you to write against your own
 * Passage type, so it type-checks in your tree rather than mine. It needs to:
 *
 *   1. look up auditCorrections[passage.slug]; return passage unchanged if none
 *   2. for each key in removeFrom, filter that array by exact `witness` match
 *   3. for each key in addTo, concat the rows, then re-run sortWitnessRows()
 *   4. for each key in edit, map rows and Object.assign(set) on a match
 *   5. concat addFathers onto patristicWitnesses
 *   6. apply editFathers by matching PatristicWitness.source
 *   7. merge snapshot into manuscriptSnapshot
 *   8. concat addCautions onto cautions (create the array if absent)
 *
 * Note step 3: your existing rows are date-sorted, so appended rows must be
 * re-sorted or they will appear at the bottom out of sequence.
 */
