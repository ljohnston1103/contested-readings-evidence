/**
 * Passage-specific Majority Text standing for the exact KJV/TR unit.
 *
 * Exact selected-corpus counts are stated when the governing apparatus supplies
 * them. Wider manuscript totals are conservative working estimates, presented
 * as ranges when a complete verse-level census is not available. These cards do
 * not turn lacunose manuscripts, related forms, or corrected states into votes.
 */
export type MajorityTextStanding = {
  unit: string;
  statement: string;
  estimate: string;
  basis: string;
  qualification?: string;
};

const GOSPEL_ESTIMATE_BASIS =
  "This is a conservative working estimate based on the published Majority or Byzantine designation and the approximate number of continuous-text manuscripts that preserve the book. Lacunae and collation scope make the exact denominator vary by verse.";

const ACTS_ESTIMATE_BASIS =
  "This is a conservative working estimate for the wider Acts manuscript tradition. The exact source-scoped count remains printed beside the roster, and lacunose copies are not treated as votes.";

const PAUL_ESTIMATE_BASIS =
  "The exact selected-apparatus count is stated first. The wider estimate reflects the several-hundred-manuscript Pauline tradition and is intentionally presented as a range rather than as a fresh universal collation.";

export const majorityTextBySlug: Readonly<
  Record<string, readonly MajorityTextStanding[]>
> = {
  "matthew-1-25": [
    {
      unit: "The phrase “her firstborn son”",
      statement:
        "The KJV/TR form is the numerical Majority Text reading at this wording unit and is the dominant Byzantine form.",
      estimate: "Approximately 1,500 to 1,700 Greek manuscripts",
      basis: GOSPEL_ESTIMATE_BASIS,
    },
  ],
  "matthew-5-22": [
    {
      unit: "The words “without a cause”",
      statement:
        "The KJV/TR phrase is the numerical Majority Text reading and is preserved by the dominant Greek transmission.",
      estimate: "Approximately 1,500 to 1,700 Greek manuscripts",
      basis: GOSPEL_ESTIMATE_BASIS,
    },
  ],
  "matthew-5-44": [
    {
      unit: "The fuller three-clause form",
      statement:
        "The KJV/TR wording is the Byzantine majority endpoint across the three disputed clauses.",
      estimate: "Approximately 1,400 to 1,600 Greek manuscripts",
      basis: GOSPEL_ESTIMATE_BASIS,
      qualification:
        "The three clauses also travel separately in some witnesses, so the estimate describes the dominant fuller form rather than claiming that every supporting copy has an identical local arrangement.",
    },
  ],
  "matthew-6-13": [
    {
      unit: "The complete closing doxology",
      statement:
        "The complete KJV/TR doxology is the numerical Majority Text reading and dominates the later Greek transmission.",
      estimate: "Approximately 1,400 to 1,600 Greek manuscripts",
      basis: GOSPEL_ESTIMATE_BASIS,
      qualification:
        "Partial and expanded doxologies are listed separately and are not counted as exact copies of the complete KJV form.",
    },
  ],
  "matthew-17-21": [
    {
      unit: "Presence of the whole verse",
      statement:
        "Matthew 17:21 is the overwhelming numerical Majority Text reading in the surviving Greek tradition.",
      estimate: "Approximately 1,650 to 1,700 Greek manuscripts",
      basis: GOSPEL_ESTIMATE_BASIS,
    },
  ],
  "matthew-18-11": [
    {
      unit: "Presence of the verse",
      statement:
        "The verse is the overwhelming numerical Majority Text reading and stands in the dominant Byzantine stream.",
      estimate: "More than 1,500 Greek manuscripts",
      basis: GOSPEL_ESTIMATE_BASIS,
      qualification:
        "A secondary group expands the verse toward Luke; the exact KJV form and the expanded form remain separated in the roster.",
    },
  ],
  "matthew-19-16-17": [
    {
      unit: "The traditional wording in verses 16 and 17",
      statement:
        "The KJV/TR pair is the numerical Byzantine majority form at both linked units.",
      estimate: "Approximately 1,400 to 1,600 Greek manuscripts",
      basis: GOSPEL_ESTIMATE_BASIS,
    },
  ],
  "matthew-23-14": [
    {
      unit: "Presence of the verse",
      statement:
        "The presence of Matthew 23:14 is the numerical Majority Text reading in the Greek tradition.",
      estimate: "Approximately 1,400 to 1,600 Greek manuscripts",
      basis: GOSPEL_ESTIMATE_BASIS,
      qualification:
        "This majority claim concerns the verse's presence. Its exact position relative to the preceding woe is a separate unit, and the Byzantine order is not identical to the KJV order in every witness.",
    },
  ],
  "mark-1-2": [
    {
      unit: "The attribution “in the prophets”",
      statement:
        "The KJV/TR attribution is the numerical Majority Text reading and the reconstructed Byzantine reading.",
      estimate: "Approximately 1,400 to 1,600 Greek manuscripts",
      basis: GOSPEL_ESTIMATE_BASIS,
    },
  ],
  "mark-7-16": [
    {
      unit: "Presence of the hearing refrain",
      statement:
        "Mark 7:16 is the overwhelming numerical Majority Text reading in Greek.",
      estimate: "More than 1,500 Greek manuscripts",
      basis: GOSPEL_ESTIMATE_BASIS,
    },
  ],
  "mark-9-29": [
    {
      unit: "The words “and fasting”",
      statement:
        "The KJV/TR phrase is the overwhelming numerical Majority Text reading and the dominant Byzantine form.",
      estimate: "More than 1,500 Greek manuscripts",
      basis: GOSPEL_ESTIMATE_BASIS,
    },
  ],
  "mark-9-44-46": [
    {
      unit: "Presence of verses 44 and 46",
      statement:
        "Both repeated sayings are the overwhelming numerical Majority Text reading in Greek.",
      estimate: "More than 1,500 Greek manuscripts",
      basis: GOSPEL_ESTIMATE_BASIS,
    },
  ],
  "mark-10-24": [
    {
      unit: "The phrase “for them that trust in riches”",
      statement:
        "The KJV/TR qualification is the numerical Majority Text reading and the dominant Byzantine form.",
      estimate: "Approximately 1,400 to 1,600 Greek manuscripts",
      basis: GOSPEL_ESTIMATE_BASIS,
    },
  ],
  "mark-11-26": [
    {
      unit: "Presence of the verse",
      statement:
        "Mark 11:26 is the overwhelming numerical Majority Text reading in the surviving Greek tradition.",
      estimate: "Approximately 1,585 or more Greek manuscripts",
      basis: GOSPEL_ESTIMATE_BASIS,
    },
  ],
  "mark-15-28": [
    {
      unit: "Presence of the verse",
      statement:
        "Mark 15:28 is the numerical Majority Text reading and belongs to the dominant Byzantine text.",
      estimate: "Approximately 1,400 to 1,600 Greek manuscripts",
      basis: GOSPEL_ESTIMATE_BASIS,
    },
  ],
  "mark-16-9-20": [
    {
      unit: "The Longer Ending, Mark 16:9-20",
      statement:
        "The Longer Ending is the overwhelming numerical Majority Text reading and the form transmitted by nearly the entire surviving Greek manuscript tradition.",
      estimate: "Approximately 1,653 Greek manuscripts",
      basis:
        "This is the site's established working count for Greek manuscripts containing the Longer Ending. The exact total can change as fragmentary, damaged, or newly catalogued witnesses are assessed.",
    },
  ],
  "luke-2-14": [
    {
      unit: "The nominative εὐδοκία, “good will”",
      statement:
        "The KJV/TR nominative is the numerical Majority Text reading in Greek.",
      estimate: "Approximately 1,400 to 1,600 Greek manuscripts",
      basis: GOSPEL_ESTIMATE_BASIS,
    },
  ],
  "luke-2-33": [
    {
      unit: "“Joseph and his mother”",
      statement:
        "The KJV/TR wording is the numerical Majority Text reading and the dominant Byzantine form.",
      estimate: "Approximately 1,400 to 1,600 Greek manuscripts",
      basis: GOSPEL_ESTIMATE_BASIS,
    },
  ],
  "luke-4-4": [
    {
      unit: "The fuller quotation ending “by every word of God”",
      statement:
        "The KJV/TR clause is the numerical Majority Text reading in the Greek tradition.",
      estimate: "Approximately 1,400 to 1,600 Greek manuscripts",
      basis: GOSPEL_ESTIMATE_BASIS,
    },
  ],
  "luke-9-55-56": [
    {
      unit: "Addition A: “Ye know not what manner of spirit ye are of”",
      statement:
        "The fuller KJV clause belongs to the larger Byzantine subgroup and substantially outnumbers the shorter subgroup in the published estimate.",
      estimate: "Approximately 1,300 Greek manuscripts, compared with about 430 in the shorter subgroup",
      basis:
        "This uses the two explicit subgroup estimates printed in the governing Luke apparatus and keeps the two additions separate.",
    },
    {
      unit: "Addition B: “The Son of man is not come to destroy men's lives, but to save them”",
      statement:
        "The fuller KJV clause belongs to the larger Byzantine subgroup and substantially outnumbers the shorter subgroup in the published estimate.",
      estimate: "Approximately 1,300 Greek manuscripts, compared with about 430 in the shorter subgroup",
      basis:
        "This uses the two explicit subgroup estimates printed in the governing Luke apparatus and keeps the two additions separate.",
    },
  ],
  "luke-11-2-4": [
    {
      unit: "The fuller traditional clauses in the Lord's Prayer",
      statement:
        "Each of the fuller KJV/TR clauses marked Maj is the numerical Majority Text reading at its own variation unit.",
      estimate: "More than 1,500 Greek manuscripts for the fuller clauses where Majority support is listed",
      basis: GOSPEL_ESTIMATE_BASIS,
      qualification:
        "The address, will petition, and deliverance clause are separate units and do not share one mechanically identical witness list.",
    },
  ],
  "luke-22-43-44": [
    {
      unit: "Presence of the angel and bloody-sweat verses",
      statement:
        "The two verses are the overwhelming numerical Majority Text reading in the Greek tradition.",
      estimate: "More than 1,500 Greek manuscripts",
      basis: GOSPEL_ESTIMATE_BASIS,
    },
  ],
  "luke-23-17": [
    {
      unit: "Presence of the verse",
      statement:
        "Luke 23:17 is the overwhelming numerical Majority Text reading in Greek.",
      estimate: "More than 1,500 Greek manuscripts",
      basis: GOSPEL_ESTIMATE_BASIS,
    },
  ],
  "luke-23-34": [
    {
      unit: "The prayer, “Father, forgive them”",
      statement:
        "The KJV prayer is the numerical Majority Text reading and the dominant Greek form.",
      estimate: "Approximately 1,400 to 1,600 Greek manuscripts",
      basis: GOSPEL_ESTIMATE_BASIS,
    },
  ],
  "luke-24-6": [
    {
      unit: "“He is not here, but is risen”",
      statement:
        "The KJV sentence is the overwhelming numerical Majority Text reading and is also supported by major early Greek witnesses.",
      estimate: "More than 1,500 Greek manuscripts",
      basis: GOSPEL_ESTIMATE_BASIS,
    },
  ],
  "luke-24-40": [
    {
      unit: "Presence of the verse",
      statement:
        "Luke 24:40 is the overwhelming numerical Majority Text reading in Greek.",
      estimate: "More than 1,500 Greek manuscripts",
      basis: GOSPEL_ESTIMATE_BASIS,
    },
  ],
  "luke-24-51": [
    {
      unit: "The ascension clause",
      statement:
        "The KJV ascension clause is the overwhelming numerical Majority Text reading in Greek.",
      estimate: "More than 1,500 Greek manuscripts",
      basis: GOSPEL_ESTIMATE_BASIS,
    },
  ],
  "luke-24-52": [
    {
      unit: "The words “worshipped him”",
      statement:
        "The KJV worship clause is the overwhelming numerical Majority Text reading in Greek.",
      estimate: "More than 1,500 Greek manuscripts",
      basis: GOSPEL_ESTIMATE_BASIS,
    },
  ],
  "john-1-18": [
    {
      unit: "“Only begotten Son”",
      statement:
        "The KJV/TR Son reading is the overwhelming numerical Majority Text reading in Greek.",
      estimate: "Approximately 1,610 Greek manuscripts, plus about 17 minor Son-form variations",
      basis:
        "This preserves the site's established working estimate while the selected IGNTP roster independently shows 132 Son states against 7 God states.",
    },
  ],
  "john-3-13": [
    {
      unit: "The clause “which is in heaven”",
      statement:
        "The KJV/TR clause is the overwhelming numerical Majority Text reading in the wider Greek tradition.",
      estimate: "More than 1,500 Greek manuscripts; 151 supporting entries in the selected 236-document corpus",
      basis:
        "The selected IGNTP corpus supplies the exact displayed count. The broader estimate reflects the established Majority reading in the wider John tradition.",
    },
  ],
  "john-5-3b-4": [
    {
      unit: "The moving-water clause and verse 4",
      statement:
        "The KJV passage is the overwhelming numerical Majority Text reading in the wider Greek tradition.",
      estimate: "More than 1,400 Greek manuscripts; 138 and 134 supporting states at the two selected units",
      basis:
        "The selected IGNTP counts are unit-specific. The wider estimate reflects the broader Byzantine majority and does not merge partial or corrected forms into an exact total.",
    },
  ],
  "john-6-47": [
    {
      unit: "The words “on me”",
      statement:
        "The KJV/TR phrase is the overwhelming numerical Majority Text reading in Greek.",
      estimate: "More than 1,500 Greek manuscripts; 107 supporting states in the selected corpus",
      basis:
        "The selected IGNTP count is exact for its corpus. The broader estimate reflects the established Majority reading in the wider John tradition.",
    },
  ],
  "john-7-53-8-11": [
    {
      unit: "Presence of the account of the woman taken in adultery",
      statement:
        "The passage is present in the overwhelming numerical majority of Greek manuscripts, most commonly at its traditional Johannine location.",
      estimate: "Approximately 1,495 Greek manuscripts contain the passage in whole or in part, with about 495 supporting lectionaries",
      basis:
        "The selected roster separately reports 71 witnesses at the standard location and 49 omissions. Relocated and partial forms remain classified separately.",
    },
  ],
  "acts-20-28": [
    {
      unit: "The order “his own blood”",
      statement:
        "At the blood-order unit, the KJV/TR order is the Byzantine majority reading.",
      estimate: "Approximately 450 to 550 Greek manuscripts in the wider Acts tradition",
      basis: ACTS_ESTIMATE_BASIS,
      qualification:
        "This majority claim applies only to the order of “his own blood.” At the divine-title unit, the Byzantine reading is the conflated “Lord and God,” not the exact KJV “God.”",
    },
  ],
  "acts-28-29": [
    {
      unit: "Presence and complete wording of the verse",
      statement:
        "The complete KJV/TR verse is the Byzantine majority reading in Acts.",
      estimate: "Approximately 450 to 550 Greek manuscripts; 45 exact states are named in the selected ECM roster",
      basis: ACTS_ESTIMATE_BASIS,
    },
  ],
  "romans-8-1": [
    {
      unit: "The full flesh-and-Spirit clause",
      statement:
        "The complete KJV/TR clause is the numerical majority form in the selected Romans apparatus and the dominant later Greek reading.",
      estimate: "92 exact states in the 152-witness apparatus; approximately 500 to 600 Greek manuscripts in the wider tradition",
      basis: PAUL_ESTIMATE_BASIS,
    },
  ],
  "romans-14-10": [
    {
      unit: "“The judgment seat of Christ”",
      statement:
        "The KJV/TR Christ reading is the numerical majority in the selected Romans apparatus and the dominant Greek reading.",
      estimate: "104 Christ states against 15 God states in the selected apparatus; approximately 500 to 600 Greek manuscripts in the wider tradition",
      basis: PAUL_ESTIMATE_BASIS,
    },
  ],
  "romans-16-24": [
    {
      unit: "Presence of the benediction",
      statement:
        "The complete KJV/TR benediction is the numerical majority form in the selected Greek corpus and the dominant later reading.",
      estimate: "89 exact states in the selected apparatus; approximately 500 to 600 Greek manuscripts in the wider tradition",
      basis: PAUL_ESTIMATE_BASIS,
    },
  ],
  "1-corinthians-15-47": [
    {
      unit: "The title “the Lord”",
      statement:
        "The KJV/TR Lord reading is the numerical majority form in the selected Greek corpus and the dominant Byzantine reading.",
      estimate: "99 exact Lord states against 12 ordinary short states; approximately 500 to 600 Greek manuscripts in the wider tradition",
      basis: PAUL_ESTIMATE_BASIS,
    },
  ],
  "ephesians-3-9": [
    {
      unit: "The phrase “by Jesus Christ” only",
      statement:
        "The Christological phrase is the numerical majority reading in the selected Ephesians apparatus and the dominant later Greek form.",
      estimate: "78 exact phrase states against 36 omissions; approximately 500 to 600 Greek manuscripts in the wider tradition",
      basis: PAUL_ESTIMATE_BASIS,
      qualification:
        "This majority claim does not apply to κοινωνία, “fellowship.” At the noun unit, οἰκονομία is the Greek majority reading and κοινωνία has a narrow Greek base.",
    },
  ],
  "1-timothy-3-16": [
    {
      unit: "θεός, “God was manifest in the flesh”",
      statement:
        "The KJV/TR θεός reading is the overwhelming numerical Majority Text reading in the Greek tradition.",
      estimate: "297 exact θεός states in the selected synopsis; approximately 500 to 600 Greek manuscripts in the wider tradition",
      basis: PAUL_ESTIMATE_BASIS,
    },
  ],
  "1-john-4-3": [
    {
      unit: "The fuller confession that Jesus Christ is come in the flesh",
      statement:
        "The fuller KJV confession belongs to the dominant Byzantine and numerical majority family of Greek readings.",
      estimate: "Approximately 400 to 500 Greek manuscripts across the fuller Byzantine confession family",
      basis:
        "The exact Greek wording varies among fuller subforms, so this estimate describes the majority confessional family rather than claiming one letter-for-letter form in every manuscript.",
    },
  ],
};

export const nonMajorityKjvSlugs = new Set([
  "matthew-27-35",
  "acts-8-37",
  "acts-9-5-6",
  "colossians-1-14",
  "1-john-5-7",
  "revelation-1-8",
  "revelation-1-11",
  "revelation-16-5",
  "revelation-22-19",
]);

export function majorityTextStandingsForSlug(slug: string) {
  return majorityTextBySlug[slug] ?? [];
}
