"use strict";

const DATE_WORDS = new Map([
  ["first", 0],
  ["second", 100],
  ["third", 200],
  ["fourth", 300],
  ["fifth", 400],
  ["sixth", 500],
  ["seventh", 600],
  ["eighth", 700],
  ["ninth", 800],
  ["tenth", 900],
  ["eleventh", 1000],
  ["twelfth", 1100],
  ["thirteenth", 1200],
  ["fourteenth", 1300],
  ["fifteenth", 1400],
  ["sixteenth", 1500],
  ["seventeenth", 1600],
  ["eighteenth", 1700],
  ["nineteenth", 1800],
  ["twentieth", 1900],
]);

const EVIDENCE_LISTS = [
  ["Greek support", "greekSupportWitnesses", "support"],
  ["Latin support", "latinWitnesses", "support"],
  ["Other version support", "versionalWitnesses", "support"],
  ["Printed support", "printedWitnesses", "support"],
  ["Competing / related evidence", "evidenceAgainst", "competing"],
];

const GROUP_DATE_PROSE =
  /\b(?:earliest (?:named )?(?:in (?:this|these) )?groups?|date (?:the|each|every)|keep (?:the|these)|retain (?:the|this)|must be dated|date separately)\b/iu;

const GENERIC_SPLIT_NOTE =
  /\bindividually listed from the catalogued (?:greek|latin|coptic|versional|printed|competing|related)?\s*witness group\b/iu;

const FAKE_ATOMIC_LABEL =
  /^(?:codex|ga|papyrus|minuscule|uncial|washingtonianus|vaticanus|alexandrinus|sinaiticus|ephraemi(?:\s+rescriptus)?|bezae|dublinensis|koridethi)$/iu;

const CONNECTIVE_FRAGMENT = /^(?:and|or|plus)\b/iu;
const BARE_NUMBER = /^\d{1,5}$/u;

function normalize(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .toLocaleLowerCase("en")
    .replace(/[^\p{L}\p{N}*]+/gu, " ")
    .trim();
}

function unitIdentity(row) {
  return normalize(row.unitId ?? row.unit ?? row.unitLabel ?? "single-unit");
}

function parseDateStart(rowOrDate) {
  if (rowOrDate && typeof rowOrDate === "object") {
    const structuredStart =
      rowOrDate.dateStart ??
      rowOrDate.startYear ??
      rowOrDate.sortYear ??
      rowOrDate.dateRange?.start ??
      rowOrDate.dating?.start;
    if (
      structuredStart !== null &&
      structuredStart !== undefined &&
      Number.isFinite(Number(structuredStart))
    ) {
      return Number(structuredStart);
    }
  }

  const raw =
    typeof rowOrDate === "string" ? rowOrDate : String(rowOrDate?.date ?? "");
  const date = raw.normalize("NFKC").trim();
  if (!date) return null;

  const adYear = date.match(/\b(?:AD|CE)\s*(\d{2,4})\b/iu);
  if (adYear) return Number(adYear[1]);

  const numericCentury = date.match(
    /\b(\d{1,2})(?:st|nd|rd|th)[-–—\s]+centur(?:y|ies)\b/iu,
  );
  if (numericCentury) return (Number(numericCentury[1]) - 1) * 100;

  const wordCentury = date.match(
    new RegExp(`\\b(${Array.from(DATE_WORDS.keys()).join("|")})\\b(?:[-–—\\s]+\\w+)?\\s+centur(?:y|ies)\\b`, "iu"),
  );
  if (wordCentury) return DATE_WORDS.get(wordCentury[1].toLowerCase()) ?? null;

  const yearRange = date.match(
    /(?:^|[^\d])(?:c(?:irca)?\.?\s*)?(\d{3,4})(?:s|\s*(?:to|[-–—])\s*\d{2,4})?\b/iu,
  );
  if (yearRange) return Number(yearRange[1]);

  return null;
}

function isClearlyAggregateOrStatus(label) {
  const value = String(label ?? "").normalize("NFKC").trim();
  return (
    /^(?:no|none|all|most|some|many|other|remaining|additional|broad|the remaining)\b/iu.test(
      value,
    ) ||
    /^(?:maj(?:ority)?|byz(?:antine)?|k\/byz|lect(?:ionaries)?)\.?$/iu.test(
      value,
    ) ||
    /\b(?:percent|manuscript majority|majority text|remaining extant|all extant|no extant|no known)\b/iu.test(
      value,
    )
  );
}

function isBareNumberFragment(row, listKey) {
  if (!BARE_NUMBER.test(String(row.witness ?? "").trim())) return false;

  // A bare number is a valid Gregory-Aland minuscule siglum in a Greek list.
  // It is a split artifact in Latin/versional lists, where the parent label
  // (for example, "Vulgate lips4,6") must travel with the number.
  const isGreekList = listKey === "greekSupportWitnesses";
  const isGreekCompetingRow =
    listKey === "evidenceAgainst" && row.kind === "greek-manuscript";
  return !isGreekList && !isGreekCompetingRow;
}

function knownEarliestYear(witness) {
  const value = String(witness ?? "").normalize("NFKC").trim();
  const siglum = (letter) =>
    new RegExp(
      `^${letter}(?:(?:\\*|c|mg|txt|vid|supp|[123])(?:\\/(?:\\*|c|mg|txt|vid|supp|[123]))?)?$`,
      "u",
    );
  const rules = [
    [/(?:sinaiticus|^ℵ(?:\*|c|mg|txt|vid|supp|[123]|\/)+$|^ℵ$)/iu, 300, "Codex Sinaiticus"],
    [/(?:vaticanus)/iu, 300, "Codex Vaticanus"],
    [siglum("B"), 300, "Codex Vaticanus"],
    [/(?:alexandrinus)/iu, 400, "Codex Alexandrinus"],
    [siglum("A"), 400, "Codex Alexandrinus"],
    [/(?:ephraemi)/iu, 400, "Codex Ephraemi"],
    [siglum("C"), 400, "Codex Ephraemi"],
    [/(?:bezae)/iu, 375, "Codex Bezae"],
    [siglum("D"), 375, "Codex Bezae"],
    [/(?:washingtonianus)/iu, 350, "Codex Washingtonianus"],
    [siglum("W"), 350, "Codex Washingtonianus"],
    [/(?:koridethi)/iu, 750, "Codex Koridethi"],
    [siglum("Θ"), 750, "Codex Koridethi"],
    [/\b(?:harklean|harclean)\b/iu, 600, "the Harklean version"],
    [/\bpeshitta\b/iu, 350, "the Peshitta"],
    [/\barmenian\b/iu, 350, "the Armenian version"],
    [/\bgeorgian\b/iu, 350, "the Georgian version"],
    [/\bethiopic\b/iu, 300, "the Ethiopic version"],
    [/\b(?:slavonic|old church slavonic)\b/iu, 800, "the Slavonic version"],
  ];

  for (const [pattern, year, label] of rules) {
    if (pattern.test(value)) return { year, label };
  }
  return null;
}

function collectRows(passage) {
  const rows = [];
  for (const [listLabel, listKey, defaultRole] of EVIDENCE_LISTS) {
    const list = Array.isArray(passage[listKey]) ? passage[listKey] : [];
    for (let index = 0; index < list.length; index += 1) {
      rows.push({
        passage,
        listLabel,
        listKey,
        defaultRole,
        index,
        row: list[index],
      });
    }
  }
  return rows;
}

function validateDerivedOutput(passages, options = {}) {
  const issues = [];
  const add = (code, context, message) => issues.push({ code, context, message });

  if (!Array.isArray(passages) || passages.length === 0) {
    add("dataset", "derived output", "displayedPassages is missing or empty");
    return issues;
  }

  for (const passage of passages) {
    const passageContext = `${passage.reference} (${passage.slug})`;
    const rows = collectRows(passage);
    const seenRows = new Map();

    for (const entry of rows) {
      const { listLabel, listKey, defaultRole, index, row } = entry;
      const rowContext = `${passageContext} — ${listLabel} row ${index + 1}`;
      const witness = String(row?.witness ?? "").trim();
      const date = String(row?.date ?? "").trim();
      const note = String(row?.note ?? "").trim();

      if (!witness) {
        add("witness-label", rowContext, "has a blank witness label");
        continue;
      }

      if (FAKE_ATOMIC_LABEL.test(witness)) {
        add(
          "split-fragment",
          rowContext,
          `"${witness}" is a fragment of an atomic manuscript name`,
        );
      }
      if (CONNECTIVE_FRAGMENT.test(witness)) {
        add(
          "split-fragment",
          rowContext,
          `"${witness}" starts with a stranded list connective`,
        );
      }
      if (isBareNumberFragment(row, listKey)) {
        add(
          "split-fragment",
          rowContext,
          `"${witness}" is a bare numeric fragment outside a Greek manuscript list`,
        );
      }
      if (GENERIC_SPLIT_NOTE.test(note)) {
        add(
          "generic-filler",
          rowContext,
          "uses the mechanical “Individually listed…” filler note",
        );
      }

      if (!date && !isClearlyAggregateOrStatus(witness)) {
        add(
          "blank-date",
          rowContext,
          `"${witness}" has no witness-specific date or date range`,
        );
      }

      if (date && GROUP_DATE_PROSE.test(date)) {
        add(
          "group-date",
          rowContext,
          `"${witness}" uses group/editorial prose instead of its own date: "${date}"`,
        );
      }

      const floor = knownEarliestYear(witness);
      const dateStart = parseDateStart(row);
      if (floor && dateStart !== null && dateStart < floor.year) {
        add(
          "impossible-date",
          rowContext,
          `"${witness}" starts at ${dateStart}, earlier than the plausible date floor for ${floor.label} (${floor.year})`,
        );
      }

      const identity = normalize(witness);
      if (identity) {
        const role = normalize(row.direction ?? defaultRole);
        const key = `${unitIdentity(row)}|${identity}|${role}`;
        const previous = seenRows.get(key);
        if (previous) {
          add(
            "duplicate-row",
            rowContext,
            `"${witness}" repeats the same identity, unit, and direction as ${previous}`,
          );
        } else {
          seenRows.set(key, `${listLabel} row ${index + 1}`);
        }
      }
    }

    for (const [listLabel, listKey] of EVIDENCE_LISTS) {
      const list = Array.isArray(passage[listKey]) ? passage[listKey] : [];
      const latestByUnit = new Map();
      for (let index = 0; index < list.length; index += 1) {
        const row = list[index];
        // An undated later hand is intentionally placed after independently
        // dated evidence. Its base-manuscript bounds are not a contribution
        // date and therefore must not participate in chronology comparison.
        if (row.dateUncertain) continue;
        const start = parseDateStart(row);
        if (start === null) continue;
        const unit = unitIdentity(row);
        const previous = latestByUnit.get(unit);
        if (previous && start < previous.start) {
          add(
            "chronology",
            `${passageContext} — ${listLabel} row ${index + 1}`,
            `"${row.witness}" (${row.date}, start ${start}) appears after "${previous.witness}" (${previous.date}, start ${previous.start}) in the same unit`,
          );
        }
        latestByUnit.set(unit, {
          start,
          witness: row.witness,
          date: row.date,
        });
      }
    }

    const patristic = Array.isArray(passage.patristicWitnesses)
      ? passage.patristicWitnesses
      : [];
    let previousPatristic = null;
    for (let index = 0; index < patristic.length; index += 1) {
      const row = patristic[index];
      const context = `${passageContext} — Patristic row ${index + 1}`;
      if (!String(row.date ?? "").trim()) {
        add(
          "blank-date",
          context,
          `"${row.author ?? row.source ?? "Unnamed patristic witness"}" has no date`,
        );
      }
      if (GENERIC_SPLIT_NOTE.test(String(row.quoteSummary ?? ""))) {
        add("generic-filler", context, "uses mechanical split-row filler");
      }
      const start = parseDateStart(row);
      if (start === null) continue;
      if (previousPatristic && start < previousPatristic.start) {
        add(
          "chronology",
          context,
          `"${row.author ?? row.source}" (${row.date}, start ${start}) appears after "${previousPatristic.witness}" (${previousPatristic.date}, start ${previousPatristic.start})`,
        );
      }
      previousPatristic = {
        start,
        witness: row.author ?? row.source,
        date: row.date,
      };
    }
  }

  const manuscriptProfiles = Array.isArray(options.manuscriptProfiles)
    ? options.manuscriptProfiles
    : [];
  if (manuscriptProfiles.length > 0) {
    const seenNames = new Map();
    const seenSigla = new Map();
    const fakeProfile =
      /^Codex (?:Byzantine|Greek|Remaining|Some)\b|,\s*(?:Byzantine|Greek|Remaining|Some)$/iu;
    const handSpecificProfile =
      /\s—\s|\b(?:first hand|corrector|correction|margin|marginal)\b/iu;

    for (let index = 0; index < manuscriptProfiles.length; index += 1) {
      const profile = manuscriptProfiles[index];
      const context = `Manuscript index profile ${index + 1}`;
      const name = String(profile?.name ?? "").trim();
      const siglum = String(profile?.siglum ?? "").trim();

      if (!name) {
        add("manuscript-index", context, "has a blank profile name");
        continue;
      }
      if (fakeProfile.test(name)) {
        add(
          "manuscript-index",
          context,
          `"${name}" is prose misparsed as a manuscript siglum`,
        );
      }
      if (handSpecificProfile.test(name)) {
        add(
          "manuscript-index",
          context,
          `"${name}" is a hand-specific profile instead of a base-manuscript profile`,
        );
      }

      const normalizedName = normalize(name);
      const previousName = seenNames.get(normalizedName);
      if (previousName) {
        add(
          "manuscript-index",
          context,
          `"${name}" duplicates ${previousName}`,
        );
      } else {
        seenNames.set(normalizedName, context);
      }

      if (siglum) {
        const normalizedSiglum = normalize(siglum);
        const previousSiglum = seenSigla.get(normalizedSiglum);
        if (previousSiglum) {
          add(
            "manuscript-index",
            context,
            `siglum "${siglum}" duplicates ${previousSiglum}`,
          );
        } else {
          seenSigla.set(normalizedSiglum, context);
        }
      }
    }
  }

  return issues;
}

function formatValidationIssues(issues, sampleLimit = 12) {
  const groups = new Map();
  for (const issue of issues) {
    const list = groups.get(issue.code) ?? [];
    list.push(issue);
    groups.set(issue.code, list);
  }

  const lines = [
    `Derived evidence validation failed with ${issues.length} issue${issues.length === 1 ? "" : "s"} across ${groups.size} rule${groups.size === 1 ? "" : "s"}.`,
  ];

  for (const [code, group] of groups) {
    lines.push("", `${code}: ${group.length}`);
    for (const issue of group.slice(0, sampleLimit)) {
      lines.push(`  - ${issue.context}: ${issue.message}`);
    }
    if (group.length > sampleLimit) {
      lines.push(`  - … ${group.length - sampleLimit} more`);
    }
  }

  return lines.join("\n");
}

module.exports = {
  formatValidationIssues,
  parseDateStart,
  validateDerivedOutput,
};
