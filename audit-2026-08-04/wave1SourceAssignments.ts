/**
 * wave1SourceAssignments.ts
 * -------------------------------------------------------------------------
 * The 30 Wave 1 passages carry no `source` on any witness row (1,105 rows).
 * This file assigns the controlling apparatus for each passage so the
 * PassageSourcesCard has something real to display, and so a reader can
 * trace any row back to a work they can open.
 *
 * These are PASSAGE-LEVEL assignments. They are correct as the work in which
 * that passage's evidence is set out, and they are the right first step, but
 * they are not a substitute for row-level citation. Rows carrying unusual or
 * contested attributions still need their own source.
 *
 * Coverage note recorded per passage: ECM exists for Mark, Acts, the Catholic
 * Letters and (in progress) John. There is NO ECM for Matthew, Luke, Romans,
 * Colossians or 1 Timothy — for those, no complete collation of all Greek
 * manuscripts at these points has ever been published, and any percentage
 * given for them is an estimate that should be labelled as one.
 */

export type Wave1SourceAssignment = Readonly<{
  slug: string;
  reference: string;
  /** Rows on this passage currently lacking any `source` value. */
  unsourcedRows: number;
  /** Primary apparatus in which this variant is set out. */
  primary: { label: string; url: string | null };
  /** Whether a complete modern critical edition covers this book. */
  ecmCoverage: string;
}>;

export const wave1SourceAssignments: readonly Wave1SourceAssignment[] = [
  {
    slug: "matthew-6-13",
    reference: "Matthew 6:13",
    unsourcedRows: 33,
    primary: { label: "Willker, Textual Commentary on the Greek Gospels — Matthew", url: "https://www.willker.de/wie/TCG/TC-Matthew.pdf" },
    ecmCoverage: "No ECM for Matthew. No complete collation exists at these points.",
  },
  {
    slug: "matthew-17-21",
    reference: "Matthew 17:21",
    unsourcedRows: 59,
    primary: { label: "Willker, Textual Commentary on the Greek Gospels — Matthew", url: "https://www.willker.de/wie/TCG/TC-Matthew.pdf" },
    ecmCoverage: "No ECM for Matthew. No complete collation exists at these points.",
  },
  {
    slug: "matthew-18-11",
    reference: "Matthew 18:11",
    unsourcedRows: 29,
    primary: { label: "Willker, Textual Commentary on the Greek Gospels — Matthew", url: "https://www.willker.de/wie/TCG/TC-Matthew.pdf" },
    ecmCoverage: "No ECM for Matthew. No complete collation exists at these points.",
  },
  {
    slug: "matthew-23-14",
    reference: "Matthew 23:14",
    unsourcedRows: 36,
    primary: { label: "Willker, Textual Commentary on the Greek Gospels — Matthew", url: "https://www.willker.de/wie/TCG/TC-Matthew.pdf" },
    ecmCoverage: "No ECM for Matthew. No complete collation exists at these points.",
  },
  {
    slug: "mark-7-16",
    reference: "Mark 7:16",
    unsourcedRows: 28,
    primary: { label: "Willker, Textual Commentary on the Greek Gospels — Mark", url: "https://www.willker.de/wie/TCG/TC-Mark.pdf" },
    ecmCoverage: "ECM Mark (2021) — full apparatus",
  },
  {
    slug: "mark-9-29",
    reference: "Mark 9:29",
    unsourcedRows: 40,
    primary: { label: "Willker, Textual Commentary on the Greek Gospels — Mark", url: "https://www.willker.de/wie/TCG/TC-Mark.pdf" },
    ecmCoverage: "ECM Mark (2021) — full apparatus",
  },
  {
    slug: "mark-9-44-46",
    reference: "Mark 9:44 and Mark 9:46",
    unsourcedRows: 39,
    primary: { label: "Willker, Textual Commentary on the Greek Gospels — Mark", url: "https://www.willker.de/wie/TCG/TC-Mark.pdf" },
    ecmCoverage: "ECM Mark (2021) — full apparatus",
  },
  {
    slug: "mark-11-26",
    reference: "Mark 11:26",
    unsourcedRows: 38,
    primary: { label: "Willker, Textual Commentary on the Greek Gospels — Mark", url: "https://www.willker.de/wie/TCG/TC-Mark.pdf" },
    ecmCoverage: "ECM Mark (2021) — full apparatus",
  },
  {
    slug: "mark-15-28",
    reference: "Mark 15:28",
    unsourcedRows: 42,
    primary: { label: "Willker, Textual Commentary on the Greek Gospels — Mark", url: "https://www.willker.de/wie/TCG/TC-Mark.pdf" },
    ecmCoverage: "ECM Mark (2021) — full apparatus",
  },
  {
    slug: "mark-16-9-20",
    reference: "Mark 16:9-20",
    unsourcedRows: 30,
    primary: { label: "Willker, Textual Commentary on the Greek Gospels — Mark", url: "https://www.willker.de/wie/TCG/TC-Mark.pdf" },
    ecmCoverage: "ECM Mark (2021) — full apparatus",
  },
  {
    slug: "luke-9-55-56",
    reference: "Luke 9:55-56",
    unsourcedRows: 41,
    primary: { label: "Willker, Textual Commentary on the Greek Gospels — Luke", url: "https://www.willker.de/wie/TCG/TC-Luke.pdf" },
    ecmCoverage: "No ECM for Luke. No complete collation exists at these points.",
  },
  {
    slug: "luke-11-2-4",
    reference: "Luke 11:2-4",
    unsourcedRows: 39,
    primary: { label: "Willker, Textual Commentary on the Greek Gospels — Luke", url: "https://www.willker.de/wie/TCG/TC-Luke.pdf" },
    ecmCoverage: "No ECM for Luke. No complete collation exists at these points.",
  },
  {
    slug: "luke-22-43-44",
    reference: "Luke 22:43-44",
    unsourcedRows: 41,
    primary: { label: "Willker, Textual Commentary on the Greek Gospels — Luke", url: "https://www.willker.de/wie/TCG/TC-Luke.pdf" },
    ecmCoverage: "No ECM for Luke. No complete collation exists at these points.",
  },
  {
    slug: "luke-23-17",
    reference: "Luke 23:17",
    unsourcedRows: 41,
    primary: { label: "Willker, Textual Commentary on the Greek Gospels — Luke", url: "https://www.willker.de/wie/TCG/TC-Luke.pdf" },
    ecmCoverage: "No ECM for Luke. No complete collation exists at these points.",
  },
  {
    slug: "luke-23-34",
    reference: "Luke 23:34",
    unsourcedRows: 30,
    primary: { label: "Willker, Textual Commentary on the Greek Gospels — Luke", url: "https://www.willker.de/wie/TCG/TC-Luke.pdf" },
    ecmCoverage: "No ECM for Luke. No complete collation exists at these points.",
  },
  {
    slug: "luke-24-40",
    reference: "Luke 24:40",
    unsourcedRows: 38,
    primary: { label: "Willker, Textual Commentary on the Greek Gospels — Luke", url: "https://www.willker.de/wie/TCG/TC-Luke.pdf" },
    ecmCoverage: "No ECM for Luke. No complete collation exists at these points.",
  },
  {
    slug: "luke-24-51",
    reference: "Luke 24:51",
    unsourcedRows: 40,
    primary: { label: "Willker, Textual Commentary on the Greek Gospels — Luke", url: "https://www.willker.de/wie/TCG/TC-Luke.pdf" },
    ecmCoverage: "No ECM for Luke. No complete collation exists at these points.",
  },
  {
    slug: "luke-24-52",
    reference: "Luke 24:52",
    unsourcedRows: 38,
    primary: { label: "Willker, Textual Commentary on the Greek Gospels — Luke", url: "https://www.willker.de/wie/TCG/TC-Luke.pdf" },
    ecmCoverage: "No ECM for Luke. No complete collation exists at these points.",
  },
  {
    slug: "john-1-18",
    reference: "John 1:18",
    unsourcedRows: 41,
    primary: { label: "Willker, Textual Commentary on the Greek Gospels — John", url: "https://www.willker.de/wie/TCG/TC-John.pdf" },
    ecmCoverage: "ECM John — in progress; use NA28/THGNT plus Willker",
  },
  {
    slug: "john-5-3b-4",
    reference: "John 5:3b-4",
    unsourcedRows: 45,
    primary: { label: "Willker, Textual Commentary on the Greek Gospels — John", url: "https://www.willker.de/wie/TCG/TC-John.pdf" },
    ecmCoverage: "ECM John — in progress; use NA28/THGNT plus Willker",
  },
  {
    slug: "john-6-47",
    reference: "John 6:47",
    unsourcedRows: 40,
    primary: { label: "Willker, Textual Commentary on the Greek Gospels — John", url: "https://www.willker.de/wie/TCG/TC-John.pdf" },
    ecmCoverage: "ECM John — in progress; use NA28/THGNT plus Willker",
  },
  {
    slug: "john-7-53-8-11",
    reference: "John 7:53-8:11",
    unsourcedRows: 42,
    primary: { label: "Willker, Textual Commentary on the Greek Gospels — John", url: "https://www.willker.de/wie/TCG/TC-John.pdf" },
    ecmCoverage: "ECM John — in progress; use NA28/THGNT plus Willker",
  },
  {
    slug: "acts-8-37",
    reference: "Acts 8:37",
    unsourcedRows: 51,
    primary: { label: "ECM Acts (INTF, 2017)", url: "https://ntvmr.uni-muenster.de/" },
    ecmCoverage: "ECM Acts (INTF, 2017) — full apparatus available",
  },
  {
    slug: "acts-9-5-6",
    reference: "Acts 9:5-6",
    unsourcedRows: 21,
    primary: { label: "ECM Acts (INTF, 2017)", url: "https://ntvmr.uni-muenster.de/" },
    ecmCoverage: "ECM Acts (INTF, 2017) — full apparatus available",
  },
  {
    slug: "acts-28-29",
    reference: "Acts 28:29",
    unsourcedRows: 31,
    primary: { label: "ECM Acts (INTF, 2017)", url: "https://ntvmr.uni-muenster.de/" },
    ecmCoverage: "ECM Acts (INTF, 2017) — full apparatus available",
  },
  {
    slug: "romans-8-1",
    reference: "Romans 8:1",
    unsourcedRows: 33,
    primary: { label: "NA28 / Tyndale House GNT apparatus", url: null },
    ecmCoverage: "NA28 / THGNT apparatus; no ECM for Romans",
  },
  {
    slug: "romans-16-24",
    reference: "Romans 16:24",
    unsourcedRows: 32,
    primary: { label: "NA28 / Tyndale House GNT apparatus", url: null },
    ecmCoverage: "NA28 / THGNT apparatus; no ECM for Romans",
  },
  {
    slug: "colossians-1-14",
    reference: "Colossians 1:14",
    unsourcedRows: 10,
    primary: { label: "NA28 / Tyndale House GNT apparatus", url: null },
    ecmCoverage: "NA28 / THGNT apparatus; no ECM for Colossians",
  },
  {
    slug: "1-timothy-3-16",
    reference: "1 Timothy 3:16",
    unsourcedRows: 32,
    primary: { label: "NA28 / Tyndale House GNT apparatus", url: null },
    ecmCoverage: "NA28 / THGNT apparatus; no ECM for the Pastorals",
  },
  {
    slug: "1-john-5-7",
    reference: "1 John 5:7",
    unsourcedRows: 44,
    primary: { label: "ECM Catholic Letters (2nd ed., 2013)", url: "https://ntvmr.uni-muenster.de/" },
    ecmCoverage: "ECM Catholic Letters (2nd ed., 2013) — full apparatus available",
  },
];

/** Total Wave 1 witness rows currently without a source: 1104 */
export const WAVE1_UNSOURCED_ROW_COUNT = 1104;