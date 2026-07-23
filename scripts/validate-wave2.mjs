import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectDirectory = resolve(scriptDirectory, "..");
const researchPath = resolve(
  projectDirectory,
  "oldestandbest-wave-2-complete-research.md",
);
const dataPath = resolve(projectDirectory, "src/data/wave2.generated.json");
const verifiedDate = "2026-07-23";

const expectedSlugs = [
  "matthew-1-25",
  "matthew-5-22",
  "matthew-5-44",
  "matthew-19-16-17",
  "matthew-27-35",
  "mark-1-2",
  "mark-10-24",
  "luke-2-14",
  "luke-2-33",
  "luke-4-4",
  "luke-24-6",
  "john-3-13",
  "acts-20-28",
  "romans-14-10",
  "1-corinthians-15-47",
  "ephesians-3-9",
  "1-john-4-3",
  "revelation-1-8",
  "revelation-1-11",
  "revelation-16-5",
  "revelation-22-19",
];

const allowedRelationships = new Set([
  "explicit_quote",
  "close_quote",
  "parallel_tradition",
  "mixed_citation",
  "manuscript_report",
  "theological_parallel",
]);

const allowedDirectionClasses = new Set([
  "FOR_KJV",
  "AGAINST_KJV",
  "QUALIFICATION",
  "OTHER",
]);

const passageFields = [
  "id",
  "slug",
  "researchNumber",
  "reference",
  "title",
  "book",
  "variantType",
  "tags",
  "lastVerified",
  "kjvText",
  "disputedUnitsIntro",
  "disputedUnits",
  "variantIssue",
  "quickRead",
  "supportCategory",
  "snapshot",
  "evidence",
  "fathers",
  "fatherExclusion",
  "timelineLabel",
  "timeline",
  "cautions",
  "entrySourceCitation",
  "entrySourceCitationMarkdown",
  "entrySources",
];

const evidenceFields = [
  "section",
  "sectionType",
  "direction",
  "directionClass",
  "unit",
  "unitLabel",
  "details",
  "detailsMarkdown",
  "confidence",
  "confidenceMarkdown",
  "sourceLabel",
  "sourceUrl",
  "sourceLinks",
  "sourceCitationMarkdown",
  "lastVerified",
];

const fatherFields = [
  "author",
  "date",
  "workSection",
  "reading",
  "relationship",
  "evidence",
  "evidenceMarkdown",
  "confidence",
  "confidenceMarkdown",
  "sourceLabel",
  "sourceUrl",
  "sourceLinks",
  "sourceCitationMarkdown",
  "lastVerified",
];

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function assertRecord(value, context) {
  assert.ok(isRecord(value), `${context} must be an object`);
}

function assertOwnFields(value, fields, context) {
  assertRecord(value, context);
  for (const field of fields) {
    assert.ok(
      Object.hasOwn(value, field),
      `${context} is missing required field "${field}"`,
    );
  }
}

function assertText(value, context) {
  assert.equal(typeof value, "string", `${context} must be a string`);
  assert.ok(value.trim().length > 0, `${context} must not be empty`);
}

function assertTextArray(value, context) {
  assert.ok(Array.isArray(value), `${context} must be an array`);
  assert.ok(value.length > 0, `${context} must not be empty`);
  value.forEach((item, index) => assertText(item, `${context}[${index}]`));
}

function assertUrl(value, context) {
  assertText(value, context);
  const url = new URL(value);
  assert.ok(
    url.protocol === "https:" || url.protocol === "http:",
    `${context} must use http or https`,
  );
}

function validateLinks(links, context, allowEmpty = true) {
  assert.ok(Array.isArray(links), `${context} must be an array`);
  if (!allowEmpty) {
    assert.ok(links.length > 0, `${context} must include at least one link`);
  }
  links.forEach((link, index) => {
    const linkContext = `${context}[${index}]`;
    assertOwnFields(link, ["label", "url"], linkContext);
    assertText(link.label, `${linkContext}.label`);
    assertUrl(link.url, `${linkContext}.url`);
  });
}

function stripOuterQuotes(value, context) {
  const trimmed = value.trim();
  if (trimmed.startsWith("“") && trimmed.endsWith("”")) {
    return trimmed.slice(1, -1);
  }
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed.slice(1, -1);
  }
  assert.fail(`${context} must be enclosed in quotation marks`);
}

function parseCodeField(line, field, context) {
  const escapedField = field.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
  const match = line.match(
    new RegExp("`" + escapedField + "`:\\s*`([^`]*)`", "u"),
  );
  assert.ok(match, `${context} is missing backticked field "${field}"`);
  return match[1];
}

function parseSourceEvidenceRow(line, context) {
  const start = line.match(/^- `(?<direction>[^`]+)` — /u);
  assert.ok(start, `${context} is not a structured evidence row`);
  const remainder = line.slice(start[0].length);
  const confidenceIndex = remainder.lastIndexOf(" Confidence: ");
  assert.notEqual(
    confidenceIndex,
    -1,
    `${context} is missing its Confidence field`,
  );
  return {
    direction: start.groups.direction,
    detailsMarkdown: remainder.slice(0, confidenceIndex).trim(),
  };
}

function parseResearch(markdown) {
  const normalized = markdown.replace(/\r\n?/gu, "\n");
  const headingPattern =
    /^## (?<researchNumber>\d+[ab]?)\. (?<reference>.+?) — (?<quotedTitle>.+)$/gmu;
  const headings = [...normalized.matchAll(headingPattern)];
  assert.equal(
    headings.length,
    21,
    "Research must contain exactly 21 numbered passage blocks",
  );

  const passages = headings.map((heading, index) => {
    const correctionLogIndex = normalized.indexOf(
      "\n## Required correction log for the coding agent",
      heading.index,
    );
    const blockEnd =
      index + 1 < headings.length
        ? headings[index + 1].index
        : correctionLogIndex === -1
          ? normalized.length
          : correctionLogIndex;
    const block = normalized.slice(heading.index, blockEnd);
    const lines = block.split("\n");
    const slugLine = lines.find((line) => line.startsWith("- `slug`:"));
    assert.ok(slugLine, `${heading[0]} is missing its slug`);
    const slug = parseCodeField(slugLine, "slug", heading[0]);
    const kjvLines = lines.filter((line) => line.startsWith("**KJV:**"));
    assert.equal(kjvLines.length, 1, `${slug} must have exactly one KJV line`);
    const kjvText = stripOuterQuotes(
      kjvLines[0].slice("**KJV:**".length),
      `${slug} KJV text`,
    );

    const greekRows = [];
    const versionRows = [];
    const fathers = [];
    let cautionCount = 0;
    let section = "";

    lines.forEach((line, lineIndex) => {
      const sectionMatch = line.match(/^\*\*(?<title>.+)\*\*$/u);
      if (sectionMatch) {
        section = sectionMatch.groups.title;
        return;
      }

      const lineContext = `${slug} research line ${lineIndex + 1}`;
      if (section.startsWith("Greek evidence") && line.startsWith("- `")) {
        greekRows.push(parseSourceEvidenceRow(line, lineContext));
      } else if (
        section.startsWith("Ancient versions") &&
        line.startsWith("- `")
      ) {
        versionRows.push(parseSourceEvidenceRow(line, lineContext));
      } else if (
        section.startsWith("Church father") &&
        line.startsWith("- `author`:")
      ) {
        fathers.push({
          author: parseCodeField(line, "author", lineContext),
          date: parseCodeField(line, "date", lineContext),
          workSection: parseCodeField(line, "workSection", lineContext),
          reading: parseCodeField(line, "reading", lineContext),
          relationship: parseCodeField(line, "relationship", lineContext),
        });
      } else if (
        section === "Cautions to publish" &&
        line.startsWith("- ")
      ) {
        cautionCount += 1;
      }
    });

    return {
      slug,
      researchNumber: heading.groups.researchNumber,
      reference: heading.groups.reference,
      title: stripOuterQuotes(heading.groups.quotedTitle, `${slug} title`),
      kjvText,
      greekRows,
      versionRows,
      fathers,
      cautionCount,
    };
  });

  return passages;
}

function fold(value) {
  return String(value)
    .normalize("NFC")
    .replace(/\s+/gu, " ")
    .trim()
    .toLocaleLowerCase("en-US");
}

function assertIncludes(value, fragment, context) {
  assert.ok(
    fold(value).includes(fold(fragment)),
    `${context} must include "${fragment}"`,
  );
}

function detailTokens(value) {
  return new Set(
    value.normalize("NFC").match(
      /[\p{L}\p{N}ℵ]+(?:[*/.-][\p{L}\p{N}ℵ]+)*(?:\*)?/gu,
    ) ?? [],
  );
}

function assertToken(row, token, context) {
  assert.ok(
    detailTokens(row.details).has(token),
    `${context} must preserve witness token "${token}"`,
  );
}

function assertNoToken(row, token, context) {
  assert.ok(
    !detailTokens(row.details).has(token),
    `${context} must not assign witness token "${token}"`,
  );
}

function hasMajorityMarker(row) {
  const tokens = detailTokens(row.details);
  return (
    tokens.has("Maj") ||
    tokens.has("Byz") ||
    tokens.has("Maj/Byz") ||
    /\bmajority\b/iu.test(row.details)
  );
}

function selectRow(passage, bucket, direction, unit = undefined) {
  const rows = passage.evidence[bucket].filter(
    (row) =>
      row.direction === direction && (unit === undefined || row.unit === unit),
  );
  assert.equal(
    rows.length,
    1,
    `${passage.slug} must have exactly one ${bucket} row ${direction}${
      unit ? ` for ${unit}` : ""
    }`,
  );
  return rows[0];
}

function selectFather(passage, author) {
  const fathers = passage.fathers.filter((father) => father.author === author);
  assert.equal(
    fathers.length,
    1,
    `${passage.slug} must have exactly one father row for ${author}`,
  );
  return fathers[0];
}

function validateEvidenceRow(row, passage, bucket, index) {
  const context = `${passage.slug} ${bucket}[${index}]`;
  assertOwnFields(row, evidenceFields, context);
  for (const field of [
    "section",
    "sectionType",
    "direction",
    "directionClass",
    "unit",
    "unitLabel",
    "details",
    "detailsMarkdown",
    "confidence",
    "confidenceMarkdown",
    "sourceLabel",
    "sourceCitationMarkdown",
  ]) {
    assertText(row[field], `${context}.${field}`);
  }
  assert.equal(
    row.sectionType,
    bucket === "greek" ? "greek" : "version",
    `${context}.sectionType is wrong`,
  );
  assert.ok(
    allowedDirectionClasses.has(row.directionClass),
    `${context}.directionClass "${row.directionClass}" is not allowed`,
  );
  assert.equal(
    row.lastVerified,
    verifiedDate,
    `${context}.lastVerified is stale`,
  );
  if (row.sourceUrl !== null) {
    assertUrl(row.sourceUrl, `${context}.sourceUrl`);
  }
  validateLinks(row.sourceLinks, `${context}.sourceLinks`);

  for (const key of Object.keys(row)) {
    assert.doesNotMatch(
      key,
      /(?:percent(?:age)?|supportCount|againstCount|witnessCount|manuscriptCount|voteCount|total(?:Support|Against|Witness|Manuscript))/iu,
      `${context} contains fabricated metric field "${key}"`,
    );
  }
}

function validateFather(father, passage, index) {
  const context = `${passage.slug} fathers[${index}]`;
  assertOwnFields(father, fatherFields, context);
  for (const field of [
    "author",
    "date",
    "workSection",
    "reading",
    "relationship",
    "evidence",
    "evidenceMarkdown",
    "confidence",
    "confidenceMarkdown",
    "sourceLabel",
    "sourceCitationMarkdown",
  ]) {
    assertText(father[field], `${context}.${field}`);
  }
  assert.ok(
    allowedRelationships.has(father.relationship),
    `${context}.relationship "${father.relationship}" is not allowed`,
  );
  assert.doesNotMatch(
    father.author,
    /^(?:anonymous|unknown|early (?:church )?father)\b/iu,
    `${context}.author must name the source`,
  );
  assert.equal(
    father.lastVerified,
    verifiedDate,
    `${context}.lastVerified is stale`,
  );
  if (father.sourceUrl !== null) {
    assertUrl(father.sourceUrl, `${context}.sourceUrl`);
  }
  validateLinks(father.sourceLinks, `${context}.sourceLinks`, false);
}

function validateNoPlaceholdersOrPercentages(value, path = "$") {
  if (Array.isArray(value)) {
    value.forEach((item, index) =>
      validateNoPlaceholdersOrPercentages(item, `${path}[${index}]`),
    );
    return;
  }
  if (isRecord(value)) {
    for (const [key, child] of Object.entries(value)) {
      assert.doesNotMatch(
        key,
        /percent(?:age)?/iu,
        `${path}.${key} is a forbidden percentage field`,
      );
      validateNoPlaceholdersOrPercentages(child, `${path}.${key}`);
    }
    return;
  }
  if (typeof value !== "string") {
    return;
  }

  const prose = value.replace(/https?:\/\/[^\s)\]}]+/gu, "");
  assert.doesNotMatch(
    prose,
    /\b(?:TODO|TBD|placeholder|unresolved)\b/iu,
    `${path} contains an unresolved marker`,
  );
  assert.doesNotMatch(
    prose,
    /(?:\b\d+(?:\.\d+)?\s*%|\b\d+(?:\.\d+)?\s+percent(?:age)?s?\b|\bpercentages?\b)/iu,
    `${path} contains a prohibited percentage claim`,
  );
  assert.doesNotMatch(
    prose,
    /\banonymous\s+[“"'‘’]?early father\b/iu,
    `${path} contains an anonymous early-father claim`,
  );
}

const researchDocument = readFileSync(researchPath, "utf8");
const sourcePassages = parseResearch(researchDocument);
const generatedData = JSON.parse(readFileSync(dataPath, "utf8"));

assertOwnFields(
  generatedData,
  [
    "schemaVersion",
    "generatedFrom",
    "lastVerified",
    "passageCount",
    "validation",
    "passages",
  ],
  "Wave 2 data root",
);
assert.equal(
  generatedData.generatedFrom,
  "oldestandbest-wave-2-complete-research.md",
);
assert.equal(generatedData.lastVerified, verifiedDate);
assert.ok(
  Array.isArray(generatedData.passages),
  "Wave 2 data root.passages must be an array",
);
assert.equal(generatedData.passages.length, 21);
assert.equal(generatedData.passageCount, generatedData.passages.length);

const sourceSlugs = sourcePassages.map((passage) => passage.slug);
const generatedSlugs = generatedData.passages.map((passage) => passage.slug);
assert.deepEqual(sourceSlugs, expectedSlugs, "Research slugs or order changed");
assert.deepEqual(
  generatedSlugs,
  expectedSlugs,
  "Generated slugs or order changed",
);
assert.equal(
  new Set(generatedSlugs).size,
  generatedSlugs.length,
  "Generated slugs must be unique",
);

const sourceBySlug = new Map(
  sourcePassages.map((passage) => [passage.slug, passage]),
);
const generatedBySlug = new Map(
  generatedData.passages.map((passage) => [passage.slug, passage]),
);

for (const passage of generatedData.passages) {
  const source = sourceBySlug.get(passage.slug);
  assert.ok(source, `${passage.slug} does not exist in the research`);
  const context = `passage ${passage.slug}`;
  assertOwnFields(passage, passageFields, context);

  for (const field of [
    "id",
    "slug",
    "researchNumber",
    "reference",
    "title",
    "book",
    "variantType",
    "lastVerified",
    "kjvText",
    "variantIssue",
    "quickRead",
    "supportCategory",
    "timelineLabel",
    "entrySourceCitation",
    "entrySourceCitationMarkdown",
  ]) {
    assertText(passage[field], `${context}.${field}`);
  }
  assert.equal(passage.id, passage.slug, `${context}.id must equal its slug`);
  assert.equal(passage.lastVerified, verifiedDate);
  assert.equal(passage.researchNumber, source.researchNumber);
  assert.equal(passage.reference, source.reference);
  assert.equal(passage.title, source.title);
  assert.equal(
    passage.kjvText,
    source.kjvText,
    `${passage.slug} KJV quotation must exactly match the research`,
  );
  assertTextArray(passage.tags, `${context}.tags`);

  assert.ok(
    passage.disputedUnitsIntro === null ||
      (typeof passage.disputedUnitsIntro === "string" &&
        passage.disputedUnitsIntro.trim().length > 0),
    `${context}.disputedUnitsIntro must be null or nonempty text`,
  );
  assert.ok(
    Array.isArray(passage.disputedUnits) &&
      passage.disputedUnits.length > 0,
    `${context}.disputedUnits must not be empty`,
  );
  const unitIds = new Set();
  passage.disputedUnits.forEach((unit, index) => {
    const unitContext = `${context}.disputedUnits[${index}]`;
    assertOwnFields(unit, ["id", "label", "text", "markdown"], unitContext);
    for (const field of ["id", "label", "text", "markdown"]) {
      assertText(unit[field], `${unitContext}.${field}`);
    }
    assert.ok(!unitIds.has(unit.id), `${context} repeats unit id ${unit.id}`);
    unitIds.add(unit.id);
  });

  assertRecord(passage.snapshot, `${context}.snapshot`);
  assert.ok(
    Object.keys(passage.snapshot).length >= 2,
    `${context}.snapshot must include at least two sides`,
  );
  for (const [key, value] of Object.entries(passage.snapshot)) {
    assertText(value, `${context}.snapshot.${key}`);
  }

  assertOwnFields(passage.evidence, ["greek", "versions"], `${context}.evidence`);
  assert.ok(
    Array.isArray(passage.evidence.greek) &&
      passage.evidence.greek.length > 0,
    `${context}.evidence.greek must not be empty`,
  );
  assert.ok(
    Array.isArray(passage.evidence.versions) &&
      passage.evidence.versions.length > 0,
    `${context}.evidence.versions must not be empty`,
  );
  passage.evidence.greek.forEach((row, index) =>
    validateEvidenceRow(row, passage, "greek", index),
  );
  passage.evidence.versions.forEach((row, index) =>
    validateEvidenceRow(row, passage, "versions", index),
  );

  assert.deepEqual(
    passage.evidence.greek.map(({ direction, detailsMarkdown }) => ({
      direction,
      detailsMarkdown,
    })),
    source.greekRows,
    `${passage.slug} Greek rows must preserve the research directions and details`,
  );
  assert.deepEqual(
    passage.evidence.versions.map(({ direction, detailsMarkdown }) => ({
      direction,
      detailsMarkdown,
    })),
    source.versionRows,
    `${passage.slug} version rows must preserve the research directions and details`,
  );

  assert.ok(Array.isArray(passage.fathers), `${context}.fathers must be an array`);
  passage.fathers.forEach((father, index) =>
    validateFather(father, passage, index),
  );
  assert.deepEqual(
    passage.fathers.map(
      ({ author, date, workSection, reading, relationship }) => ({
        author,
        date,
        workSection,
        reading,
        relationship,
      }),
    ),
    source.fathers,
    `${passage.slug} father rows must preserve the research`,
  );
  if (passage.fathers.length === 0) {
    assertText(
      passage.fatherExclusion,
      `${context}.fatherExclusion for none-to-publish decision`,
    );
  } else {
    assert.equal(
      passage.fatherExclusion,
      null,
      `${context}.fatherExclusion must be null when father rows exist`,
    );
  }

  assert.ok(
    Array.isArray(passage.timeline) && passage.timeline.length > 0,
    `${context}.timeline must not be empty`,
  );
  passage.timeline.forEach((item, index) => {
    const timelineContext = `${context}.timeline[${index}]`;
    assertOwnFields(item, ["date", "label"], timelineContext);
    assertText(item.date, `${timelineContext}.date`);
    assertText(item.label, `${timelineContext}.label`);
  });

  assertTextArray(passage.cautions, `${context}.cautions`);
  assert.equal(
    passage.cautions.length,
    source.cautionCount,
    `${passage.slug} must preserve every research caution`,
  );
  validateLinks(passage.entrySources, `${context}.entrySources`, false);
}

const greekEvidenceRowCount = generatedData.passages.reduce(
  (count, passage) => count + passage.evidence.greek.length,
  0,
);
const versionEvidenceRowCount = generatedData.passages.reduce(
  (count, passage) => count + passage.evidence.versions.length,
  0,
);
const fatherRowCount = generatedData.passages.reduce(
  (count, passage) => count + passage.fathers.length,
  0,
);
const sourceGreekRowCount = sourcePassages.reduce(
  (count, passage) => count + passage.greekRows.length,
  0,
);
const sourceVersionRowCount = sourcePassages.reduce(
  (count, passage) => count + passage.versionRows.length,
  0,
);
const sourceFatherRowCount = sourcePassages.reduce(
  (count, passage) => count + passage.fathers.length,
  0,
);

assert.equal(greekEvidenceRowCount, sourceGreekRowCount);
assert.equal(versionEvidenceRowCount, sourceVersionRowCount);
assert.equal(fatherRowCount, sourceFatherRowCount);
assertRecord(generatedData.validation, "Wave 2 data root.validation");
assert.equal(
  generatedData.validation.greekEvidenceRowCount,
  greekEvidenceRowCount,
);
assert.equal(
  generatedData.validation.versionEvidenceRowCount,
  versionEvidenceRowCount,
);
assert.equal(generatedData.validation.fatherRowCount, fatherRowCount);

validateNoPlaceholdersOrPercentages(generatedData);

// Mandatory correction traps. Witness checks tokenize details so "33" does not
// accidentally match "233", and caution text can name a rejected claim safely.
{
  const passage = generatedBySlug.get("matthew-1-25");
  const forKjv = selectRow(passage, "greek", "FOR_KJV");
  const againstKjv = selectRow(passage, "greek", "AGAINST_KJV");
  assertToken(againstKjv, "33", "Matthew 1:25 shorter row");
  assertNoToken(forKjv, "33", "Matthew 1:25 KJV row");
  const basil = selectFather(passage, "Pseudo-Basil / Basilian corpus");
  assertIncludes(basil.workSection, "Against Eunomius, Book 4", "Matthew 1:25");
  assert.equal(basil.relationship, "explicit_quote");
  assert.ok(
    !passage.fathers.some((father) => /Chrysostom/iu.test(father.author)),
    "Matthew 1:25 must not contain an unverified Chrysostom row",
  );
}

{
  const passage = generatedBySlug.get("matthew-5-22");
  const againstKjv = selectRow(passage, "greek", "AGAINST_KJV");
  assertToken(againstKjv, "P64/P67vid", "Matthew 5:22 omission row");
  assertNoToken(againstKjv, "P64/P67", "Matthew 5:22 omission row");
  assertToken(
    selectRow(passage, "greek", "QUALIFICATION"),
    "W",
    "Matthew 5:22 qualification row",
  );
  const versionOmission = selectRow(passage, "versions", "AGAINST_KJV");
  assertIncludes(versionOmission.details, "Vulgate", "Matthew 5:22 versions");
  assertIncludes(versionOmission.details, "omission", "Matthew 5:22 versions");
  const jerome = selectFather(passage, "Jerome");
  assert.equal(jerome.relationship, "manuscript_report");
  assertIncludes(jerome.evidence, "copies", "Matthew 5:22 Jerome row");
  assert.ok(
    !passage.fathers.some((father) =>
      /Cyprian|Chrysostom/iu.test(father.author),
    ),
    "Matthew 5:22 must exclude unverified Cyprian/Chrysostom rows",
  );
}

{
  const passage = generatedBySlug.get("matthew-5-44");
  const expected = new Map([
    ["Didache", "parallel_tradition"],
    ["Justin Martyr", "mixed_citation"],
    ["Athenagoras", "close_quote"],
  ]);
  for (const [author, relationship] of expected) {
    assert.equal(
      selectFather(passage, author).relationship,
      relationship,
      `Matthew 5:44 ${author} relationship changed`,
    );
  }
  const greekText = passage.evidence.greek.map((row) => row.details).join(" ");
  assert.doesNotMatch(
    greekText,
    /Didache|Justin|Athenagoras/iu,
    "Matthew 5:44 fathers must not be entered as Greek manuscripts",
  );
}

{
  const passage = generatedBySlug.get("matthew-27-35");
  const forKjv = selectRow(passage, "greek", "FOR_KJV");
  const againstKjv = selectRow(passage, "greek", "AGAINST_KJV");
  assertToken(forKjv, "Φ", "Matthew 27:35 KJV row");
  assertNoToken(forKjv, "Δ", "Matthew 27:35 KJV row");
  assert.ok(
    !hasMajorityMarker(forKjv) && hasMajorityMarker(againstKjv),
    "Matthew 27:35 must place the Greek majority against the KJV clause",
  );
}

{
  const passage = generatedBySlug.get("mark-1-2");
  for (const row of passage.evidence.greek) {
    assertNoToken(row, "2427", `Mark 1:2 ${row.direction} row`);
  }
}

{
  const passage = generatedBySlug.get("luke-2-14");
  const forKjv = selectRow(passage, "greek", "FOR_KJV");
  const againstKjv = selectRow(passage, "greek", "AGAINST_KJV");
  for (const token of ["ℵc", "Bc", "Cc"]) {
    assertToken(forKjv, token, "Luke 2:14 nominative row");
  }
  assertToken(againstKjv, "B*vid", "Luke 2:14 genitive row");
  const evidentiarySummary = [
    passage.supportCategory,
    passage.quickRead,
    ...Object.values(passage.snapshot),
    ...passage.evidence.greek.map((row) => row.details),
    ...passage.evidence.versions.map((row) => row.details),
  ].join(" ");
  assert.doesNotMatch(
    evidentiarySummary,
    /\bunanim(?:ous|ity)\b/iu,
    "Luke 2:14 must not claim unanimous early or versional evidence",
  );
}

{
  const passage = generatedBySlug.get("luke-2-33");
  for (const row of passage.evidence.greek) {
    for (const token of ["X", "Δ", "053", "28", "565", "1009"]) {
      assertNoToken(row, token, `Luke 2:33 ${row.direction} row`);
    }
  }
}

{
  const passage = generatedBySlug.get("luke-24-6");
  const forKjv = selectRow(passage, "greek", "FOR_KJV");
  const omission = selectRow(passage, "greek", "AGAINST_KJV");
  for (const token of ["P75", "ℵ", "A", "B"]) {
    assertToken(forKjv, token, "Luke 24:6 inclusion row");
  }
  assertToken(omission, "D", "Luke 24:6 omission row");
  assertIncludes(
    omission.details,
    "only principal Greek witness",
    "Luke 24:6 omission row",
  );
  assert.ok(
    passage.cautions.some(
      (caution) =>
        /current critical Greek editions/iu.test(caution) &&
        /\binclude\b/iu.test(caution),
    ),
    "Luke 24:6 must state that current critical editions include the clause",
  );
}

{
  const passage = generatedBySlug.get("acts-20-28");
  const god = selectRow(passage, "greek", "FOR_KJV_GOD");
  const byzantine = selectRow(passage, "greek", "OTHER_LORD_AND_GOD");
  const wordOrder = selectRow(passage, "greek", "WORD_ORDER");
  assert.equal(god.unit, "unit-1");
  assert.equal(byzantine.unit, "unit-1");
  assert.equal(byzantine.directionClass, "OTHER");
  assert.ok(
    hasMajorityMarker(byzantine),
    "Acts 20:28 must keep Byzantine 'Lord and God' as the third reading",
  );
  assert.equal(wordOrder.unit, "unit-2");
  assertIncludes(wordOrder.details, "Scrivener TR", "Acts 20:28 word-order row");
  assertIncludes(
    wordOrder.details,
    "Nestle/Westcott-Hort",
    "Acts 20:28 word-order row",
  );
  assertIncludes(
    passage.quickRead,
    "KJV agrees with the modern critical text",
    "Acts 20:28 quick read",
  );
}

{
  const passage = generatedBySlug.get("romans-14-10");
  const polycarp = selectFather(passage, "Polycarp of Smyrna");
  assert.equal(polycarp.relationship, "close_quote");
  assertIncludes(
    polycarp.confidence,
    "2 Corinthians 5:10",
    "Romans 14:10 Polycarp confidence",
  );
}

{
  const passage = generatedBySlug.get("1-corinthians-15-47");
  const ordinaryShort = selectRow(passage, "greek", "AGAINST_KJV");
  const papyrus = selectRow(passage, "greek", "OTHER_P46");
  assertNoToken(ordinaryShort, "P46", "1 Corinthians 15:47 short row");
  assertToken(papyrus, "P46", "1 Corinthians 15:47 third-reading row");
  assertIncludes(
    papyrus.details,
    "πνευματικ",
    "1 Corinthians 15:47 P46 row",
  );
  assert.equal(papyrus.directionClass, "OTHER");
  const tertullian = selectFather(passage, "Tertullian");
  assert.equal(tertullian.reading, "MIXED");
  assert.equal(tertullian.relationship, "mixed_citation");
}

{
  const passage = generatedBySlug.get("ephesians-3-9");
  const fellowship = selectRow(
    passage,
    "greek",
    "FOR_KJV_FELLOWSHIP",
  );
  const dispensation = selectRow(
    passage,
    "greek",
    "AGAINST_KJV_DISPENSATION",
  );
  const byJesusChrist = selectRow(
    passage,
    "greek",
    "FOR_KJV_BY_JESUS_CHRIST",
  );
  assert.equal(fellowship.unit, "unit-1");
  assertToken(fellowship, "2817", "Ephesians 3:9 fellowship row");
  assertIncludes(fellowship.details, "small late", "Ephesians 3:9 fellowship row");
  assert.ok(
    !hasMajorityMarker(fellowship),
    "Ephesians 3:9 fellowship must not be labeled Byzantine-majority",
  );
  assert.equal(dispensation.unit, "unit-1");
  assert.ok(
    hasMajorityMarker(dispensation),
    "Ephesians 3:9 dispensation row must include Byzantine support",
  );
  assertIncludes(
    dispensation.details,
    "οἰκονομία",
    "Ephesians 3:9 dispensation row",
  );
  assert.equal(byJesusChrist.unit, "unit-2");
  assert.ok(
    hasMajorityMarker(byJesusChrist),
    "Ephesians 3:9 'by Jesus Christ' must retain Byzantine support",
  );
  const chrysostom = selectFather(passage, "John Chrysostom");
  assert.equal(chrysostom.reading, "MIXED");
  assert.equal(chrysostom.relationship, "mixed_citation");
}

{
  const passage = generatedBySlug.get("1-john-4-3");
  const fuller = selectRow(
    passage,
    "greek",
    "FOR_KJV_FULLER_EXACT_OR_NEAR",
  );
  const short = selectRow(passage, "greek", "AGAINST_KJV_SHORT");
  const dissolves = selectRow(passage, "greek", "OTHER_DISSOLVES");
  assertToken(fuller, "ℵ", "1 John 4:3 fuller-family row");
  assertNoToken(short, "ℵ", "1 John 4:3 short row");
  assert.equal(dissolves.directionClass, "OTHER");
  assertIncludes(dissolves.details, "λύει", "1 John 4:3 marginal row");
  assertIncludes(dissolves.details, "margin of 1739", "1 John 4:3 marginal row");
  assertIncludes(
    dissolves.details,
    "not as the main text",
    "1 John 4:3 marginal row",
  );
}

const revelationPassages = [
  generatedBySlug.get("revelation-1-8"),
  generatedBySlug.get("revelation-1-11"),
  generatedBySlug.get("revelation-16-5"),
  generatedBySlug.get("revelation-22-19"),
];
for (const passage of revelationPassages) {
  assert.equal(passage.book, "Revelation");
  for (const row of passage.evidence.greek) {
    assertNoToken(
      row,
      "B",
      `${passage.reference} ${row.direction} (Vaticanus has no Revelation)`,
    );
  }
}

{
  const revelation18a = generatedBySlug.get("revelation-1-8");
  const revelation18b = generatedBySlug.get("revelation-1-11");
  assert.equal(revelation18a.researchNumber, "18a");
  assert.equal(revelation18b.researchNumber, "18b");
  assert.notEqual(revelation18a.slug, revelation18b.slug);
  assert.notEqual(revelation18a.reference, revelation18b.reference);

  const expansion = selectRow(revelation18a, "greek", "FOR_KJV", "unit-1");
  const short = selectRow(
    revelation18a,
    "greek",
    "AGAINST_KJV",
    "unit-1",
  );
  assert.ok(
    !hasMajorityMarker(expansion) && hasMajorityMarker(short),
    "Revelation 1:8 expansion must not be labeled majority Greek",
  );
  const exactLord = selectRow(
    revelation18a,
    "greek",
    "FOR_KJV_EXACT",
    "unit-2",
  );
  assertIncludes(
    exactLord.details,
    "no Greek manuscript",
    "Revelation 1:8 exact 'saith the Lord' row",
  );
  assertIncludes(
    exactLord.details,
    "λέγει ὁ κύριος",
    "Revelation 1:8 exact 'saith the Lord' row",
  );

  const exactExpansion = selectRow(
    revelation18b,
    "greek",
    "FOR_KJV_EXACT",
  );
  for (const token of ["2067", "2814"]) {
    assertToken(exactExpansion, token, "Revelation 1:11 exact row");
  }
  assertIncludes(
    exactExpansion.details,
    "Both are late",
    "Revelation 1:11 exact row",
  );
  for (const token of ["P", "922", "2074", "2065", "2081"]) {
    assertNoToken(exactExpansion, token, "Revelation 1:11 exact row");
  }
  const related = selectRow(
    revelation18b,
    "greek",
    "RELATED_EXPANSIONS",
  );
  assert.equal(related.directionClass, "OTHER");
  assertIncludes(
    related.details,
    "not FOR_KJV_EXACT",
    "Revelation 1:11 related-expansion row",
  );
}

{
  const passage = generatedBySlug.get("revelation-16-5");
  const exactLord = selectRow(
    passage,
    "greek",
    "FOR_KJV_EXACT",
    "unit-1",
  );
  const exactFuture = selectRow(
    passage,
    "greek",
    "FOR_KJV_EXACT",
    "unit-2",
  );
  assertIncludes(
    exactLord.details,
    "no Greek manuscripts",
    "Revelation 16:5 added-Lord row",
  );
  assertIncludes(
    exactFuture.details,
    "no Greek manuscripts",
    "Revelation 16:5 future-form row",
  );
  assertIncludes(
    exactFuture.details,
    "ὁ ἐσόμενος",
    "Revelation 16:5 future-form row",
  );
  const greekDetails = passage.evidence.greek
    .map((row) => row.details)
    .join(" ");
  assert.doesNotMatch(
    greekDetails,
    /Beatus|Ethiopic/iu,
    "Revelation 16:5 must not turn Beatus or Ethiopic into Greek witnesses",
  );
  const futureVersion = selectRow(
    passage,
    "versions",
    "FOR_KJV_FUTURE",
  );
  assertIncludes(futureVersion.details, "Ethiopic", "Revelation 16:5 versions");
  assertIncludes(futureVersion.details, "Beatus", "Revelation 16:5 versions");
  assert.equal(
    selectFather(passage, "Beatus of Liébana").relationship,
    "close_quote",
  );
  const firstEdition = passage.timeline.find((item) => item.date === "1582");
  assert.ok(firstEdition, "Revelation 16:5 timeline must include 1582");
  assertIncludes(firstEdition.label, "Beza's third edition", "Revelation 16:5");
  assertIncludes(firstEdition.label, "first replaces", "Revelation 16:5");
  const laterEditions = passage.timeline.find((item) =>
    item.date.includes("1598"),
  );
  assert.ok(laterEditions, "Revelation 16:5 timeline must include 1598");
  assert.doesNotMatch(
    laterEditions.label,
    /\bfirst\b/iu,
    "Revelation 16:5 must not date the first change to 1598",
  );
}

{
  const passage = generatedBySlug.get("revelation-22-19");
  const exact = selectRow(
    passage,
    "greek",
    "FOR_KJV_EXACT_BIBLOU",
  );
  const related = selectRow(
    passage,
    "greek",
    "RELATED_BOOK_BIBLIOU",
  );
  const tree = selectRow(passage, "greek", "AGAINST_KJV_TREE");
  assertIncludes(
    exact.details,
    "no Greek manuscripts",
    "Revelation 22:19 exact βίβλου row",
  );
  assertIncludes(exact.details, "βίβλου", "Revelation 22:19 exact row");
  assertNoToken(exact, "61", "Revelation 22:19 exact row");
  assertNoToken(exact, "2067c", "Revelation 22:19 exact row");
  assertToken(related, "61", "Revelation 22:19 related-book row");
  assertToken(related, "2067c", "Revelation 22:19 related-book row");
  assertIncludes(related.details, "βιβλίου", "Revelation 22:19 related row");
  assertIncludes(related.details, "not the exact TR", "Revelation 22:19 related row");
  assertToken(tree, "2814", "Revelation 22:19 lacunose list");
  assertIncludes(tree.details, "lacunose", "Revelation 22:19 tree row");
  assertIncludes(tree.details, "must not be counted", "Revelation 22:19 tree row");
  assert.ok(
    passage.cautions.some(
      (caution) =>
        /\bligno\b/iu.test(caution) &&
        /\blibro\b/iu.test(caution) &&
        /not one letter apart/iu.test(caution),
    ),
    "Revelation 22:19 must reject the one-letter ligno/libro claim",
  );
}

console.log(
  [
    "Wave 2 validation passed:",
    `${generatedData.passages.length} passages`,
    `${greekEvidenceRowCount} Greek rows`,
    `${versionEvidenceRowCount} version rows`,
    `${fatherRowCount} father rows`,
    "exact source KJV text and mandatory correction traps verified",
  ].join(" "),
);
