import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectDirectory = resolve(scriptDirectory, "..");
const inputPath = resolve(
  projectDirectory,
  "oldestandbest-wave-2-complete-research.md",
);
const outputPath = resolve(projectDirectory, "src/data/wave2.generated.json");

const sourceDocument = readFileSync(inputPath, "utf8").replace(/\r\n?/g, "\n");
const lines = sourceDocument.split("\n");
const sourceSha256 = createHash("sha256")
  .update(sourceDocument, "utf8")
  .digest("hex");
const expectedSourceSha256 =
  "b81a0f2cb828c407744fc60d073655797b133db51541078bd931efe4a7129945";

assert.equal(
  sourceSha256,
  expectedSourceSha256,
  "Research handoff changed; review and update parser assertions deliberately",
);

const passageHeadingPattern =
  /^## (?<researchNumber>\d+[ab]?)\. (?<reference>.+?) — “(?<title>.+)”$/u;
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

const expectedRowCounts = {
  "matthew-1-25": { greek: 3, versions: 2, fathers: 1 },
  "matthew-5-22": { greek: 3, versions: 2, fathers: 2 },
  "matthew-5-44": { greek: 2, versions: 2, fathers: 3 },
  "matthew-19-16-17": { greek: 4, versions: 2, fathers: 3 },
  "matthew-27-35": { greek: 2, versions: 2, fathers: 1 },
  "mark-1-2": { greek: 2, versions: 2, fathers: 2 },
  "mark-10-24": { greek: 3, versions: 2, fathers: 1 },
  "luke-2-14": { greek: 2, versions: 2, fathers: 0 },
  "luke-2-33": { greek: 2, versions: 2, fathers: 0 },
  "luke-4-4": { greek: 3, versions: 2, fathers: 0 },
  "luke-24-6": { greek: 2, versions: 2, fathers: 0 },
  "john-3-13": { greek: 3, versions: 2, fathers: 2 },
  "acts-20-28": { greek: 4, versions: 2, fathers: 2 },
  "romans-14-10": { greek: 2, versions: 2, fathers: 1 },
  "1-corinthians-15-47": { greek: 4, versions: 2, fathers: 1 },
  "ephesians-3-9": { greek: 4, versions: 3, fathers: 1 },
  "1-john-4-3": { greek: 3, versions: 2, fathers: 3 },
  "revelation-1-8": { greek: 6, versions: 4, fathers: 0 },
  "revelation-1-11": { greek: 3, versions: 2, fathers: 0 },
  "revelation-16-5": { greek: 7, versions: 3, fathers: 1 },
  "revelation-22-19": { greek: 3, versions: 2, fathers: 0 },
};

const expectedUnitCounts = {
  "matthew-1-25": 1,
  "matthew-5-22": 1,
  "matthew-5-44": 1,
  "matthew-19-16-17": 2,
  "matthew-27-35": 1,
  "mark-1-2": 1,
  "mark-10-24": 1,
  "luke-2-14": 1,
  "luke-2-33": 1,
  "luke-4-4": 1,
  "luke-24-6": 1,
  "john-3-13": 1,
  "acts-20-28": 2,
  "romans-14-10": 1,
  "1-corinthians-15-47": 1,
  "ephesians-3-9": 2,
  "1-john-4-3": 3,
  "revelation-1-8": 2,
  "revelation-1-11": 1,
  "revelation-16-5": 2,
  "revelation-22-19": 1,
};

function cleanLinkLabel(value) {
  return value.replaceAll("*", "").replaceAll("`", "");
}

function inlineText(value) {
  return value
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gu, (_, label) =>
      cleanLinkLabel(label),
    )
    .replaceAll("`", "")
    .replaceAll("**", "")
    .replace(
      /(?<![\p{L}\p{N}])\*([^*\n]+?)\*(?![\p{L}\p{N}])/gu,
      "$1",
    )
    .trim();
}

function removeTerminalPeriod(value) {
  return value.endsWith(".") ? value.slice(0, -1) : value;
}

function parseLinks(value) {
  const links = [];
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/gu;

  for (const match of value.matchAll(linkPattern)) {
    links.push({
      label: cleanLinkLabel(match[1]),
      url: match[2],
    });
  }

  return links;
}

function sourceFields(rawCitation) {
  const sourceCitationMarkdown = removeTerminalPeriod(rawCitation.trim());
  const sourceLinks = parseLinks(sourceCitationMarkdown);
  const sourceLabel = inlineText(sourceCitationMarkdown);
  const sourceUrl = sourceLinks[0]?.url ?? null;

  return {
    source: {
      label: sourceLabel,
      url: sourceUrl,
    },
    sourceLabel,
    sourceUrl,
    sourceLinks,
    sourceCitationMarkdown,
  };
}

function standaloneSectionTitle(line) {
  const match = line.match(/^\*\*(.+)\*\*$/u);
  return match?.[1] ?? null;
}

function isStandaloneSection(line) {
  return standaloneSectionTitle(line) !== null;
}

function sectionRange(blockLines, startIndex) {
  let endIndex = startIndex + 1;

  while (
    endIndex < blockLines.length &&
    !isStandaloneSection(blockLines[endIndex]) &&
    !blockLines[endIndex].startsWith("**Entry sources:**")
  ) {
    endIndex += 1;
  }

  return blockLines.slice(startIndex + 1, endIndex);
}

function findStandaloneSections(blockLines, predicate) {
  const sections = [];

  blockLines.forEach((line, index) => {
    const title = standaloneSectionTitle(line);
    if (title && predicate(title)) {
      sections.push({
        title,
        lines: sectionRange(blockLines, index),
      });
    }
  });

  return sections;
}

function extractInlineField(blockLines, label) {
  const prefix = `**${label}:**`;
  const line = blockLines.find((candidate) => candidate.startsWith(prefix));
  assert.ok(line, `Missing "${label}" field`);
  return line.slice(prefix.length).trim();
}

function stripOuterSmartQuotes(value) {
  assert.ok(
    value.startsWith("“") && value.endsWith("”"),
    `Expected smart-quoted value, received: ${value}`,
  );
  return value.slice(1, -1);
}

function parseMetadata(blockLines) {
  const [section] = findStandaloneSections(
    blockLines,
    (title) => title === "Metadata",
  );
  assert.ok(section, "Missing Metadata section");

  const metadata = {};

  for (const line of section.lines) {
    const match = line.match(/^- `(?<key>[^`]+)`: (?<value>.+)$/u);
    if (!match) {
      continue;
    }

    const { key, value } = match.groups;
    const codeValues = [...value.matchAll(/`([^`]+)`/gu)].map(
      (codeMatch) => codeMatch[1],
    );
    metadata[key] = key === "tags" ? codeValues : inlineText(value);
  }

  return metadata;
}

function parseDisputedUnits(blockLines) {
  const fieldIndex = blockLines.findIndex((line) =>
    line.startsWith("**Disputed unit"),
  );
  assert.notEqual(fieldIndex, -1, "Missing disputed unit(s)");

  const fieldLine = blockLines[fieldIndex];
  const fieldMatch = fieldLine.match(
    /^\*\*Disputed units?:\*\*(?: (?<intro>.*))?$/u,
  );
  assert.ok(fieldMatch, `Malformed disputed unit field: ${fieldLine}`);

  const followingLines = [];
  let index = fieldIndex + 1;
  while (index < blockLines.length && !blockLines[index].startsWith("**")) {
    if (blockLines[index].trim()) {
      followingLines.push(blockLines[index].trim());
    }
    index += 1;
  }

  const numberedUnits = followingLines
    .map((line) => line.match(/^(?<number>\d+)\. (?<text>.+)$/u))
    .filter(Boolean)
    .map((match) => ({
      id: `unit-${match.groups.number}`,
      label: `Unit ${match.groups.number}`,
      text: inlineText(match.groups.text),
      markdown: match.groups.text,
    }));

  if (numberedUnits.length > 0) {
    return {
      disputedUnitsIntro: fieldMatch.groups.intro
        ? inlineText(fieldMatch.groups.intro)
        : null,
      disputedUnits: numberedUnits,
    };
  }

  assert.ok(fieldMatch.groups.intro, "Single disputed unit is empty");
  return {
    disputedUnitsIntro: null,
    disputedUnits: [
      {
        id: "primary",
        label: "Primary disputed unit",
        text: inlineText(fieldMatch.groups.intro),
        markdown: fieldMatch.groups.intro,
      },
    ],
  };
}

function parseSnapshot(blockLines) {
  const [section] = findStandaloneSections(
    blockLines,
    (title) => title === "Snapshot",
  );
  assert.ok(section, "Missing Snapshot section");

  const snapshot = {};

  for (const line of section.lines) {
    const match = line.match(/^- `(?<key>[^`]+)`: (?<value>.+)$/u);
    if (match) {
      snapshot[match.groups.key] = inlineText(match.groups.value);
    }
  }

  return snapshot;
}

function splitConfidenceAndSource(remainder, context) {
  const confidenceMarker = " Confidence: ";
  const confidenceIndex = remainder.lastIndexOf(confidenceMarker);
  assert.notEqual(confidenceIndex, -1, `Missing confidence in ${context}`);

  const detailsMarkdown = remainder.slice(0, confidenceIndex).trim();
  const confidenceAndSource = remainder
    .slice(confidenceIndex + confidenceMarker.length)
    .trim();
  const sourceMatch = confidenceAndSource.match(
    /^(?<confidence>.+?) Sources?: (?<source>.+)$/u,
  );
  assert.ok(sourceMatch, `Missing source in ${context}`);
  const confidenceMarkdown = removeTerminalPeriod(
    sourceMatch.groups.confidence,
  );

  return {
    details: inlineText(detailsMarkdown),
    detailsMarkdown,
    confidence: inlineText(confidenceMarkdown),
    confidenceMarkdown,
    ...sourceFields(sourceMatch.groups.source),
  };
}

function directionClass(direction) {
  if (direction.includes("QUALIFICATION")) {
    return "QUALIFICATION";
  }
  if (direction.includes("AGAINST_KJV")) {
    return "AGAINST_KJV";
  }
  if (direction.includes("FOR_KJV")) {
    return "FOR_KJV";
  }
  return "OTHER";
}

function evidenceUnit(
  slug,
  section,
  direction,
  disputedUnits,
) {
  const explicitUnit = section.match(/— unit (?<number>\d+)/u);
  if (explicitUnit) {
    const id = `unit-${explicitUnit.groups.number}`;
    const unit = disputedUnits.find((candidate) => candidate.id === id);
    return { unit: id, unitLabel: unit?.text ?? inlineText(section) };
  }

  const verseUnit = direction.match(/^VERSE_(?<verse>\d+)_/u);
  if (verseUnit) {
    const unitIndex = verseUnit.groups.verse === "16" ? 0 : 1;
    return {
      unit: `verse-${verseUnit.groups.verse}`,
      unitLabel: disputedUnits[unitIndex]?.text ?? `Verse ${verseUnit.groups.verse}`,
    };
  }

  const directionUnit = direction.match(/^UNIT_?(?<number>\d+)_/u);
  if (directionUnit) {
    const id = `unit-${directionUnit.groups.number}`;
    const unit = disputedUnits.find((candidate) => candidate.id === id);
    return { unit: id, unitLabel: unit?.text ?? id };
  }

  if (slug === "acts-20-28") {
    const unitIndex = direction === "WORD_ORDER" ? 1 : 0;
    return {
      unit: `unit-${unitIndex + 1}`,
      unitLabel: disputedUnits[unitIndex].text,
    };
  }

  if (slug === "ephesians-3-9") {
    const unitIndex =
      direction.includes("BY_JESUS_CHRIST") ? 1 : 0;
    return {
      unit: `unit-${unitIndex + 1}`,
      unitLabel: disputedUnits[unitIndex].text,
    };
  }

  if (slug === "1-john-4-3") {
    const unitIndex = direction.includes("DISSOLVES")
      ? 2
      : direction.includes("SHORT") || direction.includes("NONFULLER")
        ? 0
        : 1;
    return {
      unit: `unit-${unitIndex + 1}`,
      unitLabel: disputedUnits[unitIndex].text,
    };
  }

  if (slug === "revelation-16-5") {
    const unitIndex =
      direction.includes("FUTURE") || direction.includes("HOLY")
        ? 1
        : 0;
    return {
      unit: `unit-${unitIndex + 1}`,
      unitLabel: disputedUnits[unitIndex].text,
    };
  }

  return {
    unit: disputedUnits[0].id,
    unitLabel: disputedUnits[0].text,
  };
}

function parseEvidenceRows(
  slug,
  sections,
  sectionType,
  disputedUnits,
  lastVerified,
) {
  const rows = [];

  for (const section of sections) {
    for (const line of section.lines) {
      const match = line.match(
        /^- `(?<direction>[^`]+)` — (?<remainder>.+)$/u,
      );
      if (!match) {
        continue;
      }

      const direction = match.groups.direction;
      rows.push({
        section: inlineText(section.title),
        sectionType,
        direction,
        directionClass: directionClass(direction),
        ...evidenceUnit(slug, section.title, direction, disputedUnits),
        ...splitConfidenceAndSource(
          match.groups.remainder,
          `${slug} ${section.title} ${direction}`,
        ),
        lastVerified,
      });
    }
  }

  return rows;
}

function parseFatherRows(blockLines, lastVerified) {
  const [section] = findStandaloneSections(blockLines, (title) =>
    title.startsWith("Church father"),
  );
  assert.ok(section, "Missing Church father rows section");

  const exclusionLine = section.lines.find((line) =>
    line.startsWith("- `noneToPublish`:"),
  );
  const fatherExclusion = exclusionLine
    ? inlineText(exclusionLine.slice("- `noneToPublish`:".length).trim())
    : null;
  const fathers = [];
  const fieldPattern =
    /`(?<field>author|date|workSection|reading|relationship|evidence|confidence)`:\s*/gu;

  for (const line of section.lines) {
    if (!line.startsWith("- `author`:")) {
      continue;
    }

    const content = line.slice(2);
    const matches = [...content.matchAll(fieldPattern)];
    assert.equal(matches.length, 7, `Malformed father row: ${line}`);

    const fields = {};
    matches.forEach((match, index) => {
      const valueStart = match.index + match[0].length;
      const valueEnd =
        index + 1 < matches.length ? matches[index + 1].index : content.length;
      fields[match.groups.field] = content
        .slice(valueStart, valueEnd)
        .replace(/;\s*$/u, "")
        .trim();
    });

    const confidenceWithSource = fields.confidence;
    const sourceMatch = confidenceWithSource.match(
      /^(?<confidence>.+?) Sources?: (?<source>.+)$/u,
    );
    assert.ok(sourceMatch, `Father row is missing source: ${line}`);
    const confidenceMarkdown = removeTerminalPeriod(
      sourceMatch.groups.confidence,
    );

    fathers.push({
      author: inlineText(fields.author),
      date: inlineText(fields.date),
      workSection: inlineText(fields.workSection),
      reading: inlineText(fields.reading),
      relationship: inlineText(fields.relationship),
      evidence: inlineText(fields.evidence),
      evidenceMarkdown: fields.evidence,
      confidence: inlineText(confidenceMarkdown),
      confidenceMarkdown,
      ...sourceFields(sourceMatch.groups.source),
      lastVerified,
    });
  }

  assert.ok(
    (fathers.length > 0 && fatherExclusion === null) ||
      (fathers.length === 0 && fatherExclusion !== null),
    "Father section must contain structured rows or a noneToPublish exclusion",
  );

  return { fathers, fatherExclusion };
}

function parseTimeline(blockLines) {
  const [section] = findStandaloneSections(
    blockLines,
    (title) => title === "Timeline" || title === "Printed-text timeline",
  );
  assert.ok(section, "Missing timeline section");

  const timeline = section.lines
    .filter((line) => line.startsWith("- "))
    .map((line) => {
      const content = line.slice(2);
      const separatorIndex = content.indexOf(": ");
      assert.notEqual(
        separatorIndex,
        -1,
        `Timeline row is missing date separator: ${line}`,
      );
      return {
        date: inlineText(content.slice(0, separatorIndex)),
        label: inlineText(content.slice(separatorIndex + 2)),
      };
    });

  return {
    timelineLabel: section.title,
    timeline,
  };
}

function parseCautions(blockLines) {
  const [section] = findStandaloneSections(
    blockLines,
    (title) => title === "Cautions to publish",
  );
  assert.ok(section, "Missing cautions section");

  return section.lines
    .filter((line) => line.startsWith("- "))
    .map((line) => inlineText(line.slice(2)));
}

function parseEntrySources(blockLines) {
  const prefix = "**Entry sources:**";
  const line = blockLines.find((candidate) => candidate.startsWith(prefix));
  assert.ok(line, "Missing Entry sources");
  const citationMarkdown = line.slice(prefix.length).trim();

  return {
    entrySourceCitation: inlineText(citationMarkdown),
    entrySourceCitationMarkdown: citationMarkdown,
    entrySources: parseLinks(citationMarkdown),
  };
}

function parsePassage(headingMatch, blockLines) {
  const metadata = parseMetadata(blockLines);
  const {
    slug,
    book,
    variantType,
    tags,
    lastVerified,
  } = metadata;
  assert.ok(slug && book && variantType && tags && lastVerified);

  const { disputedUnitsIntro, disputedUnits } =
    parseDisputedUnits(blockLines);
  const greekSections = findStandaloneSections(blockLines, (title) =>
    title.startsWith("Greek evidence"),
  );
  const versionSections = findStandaloneSections(blockLines, (title) =>
    title.startsWith("Ancient versions"),
  );

  const kjvText = stripOuterSmartQuotes(
    extractInlineField(blockLines, "KJV"),
  );
  const supportCategoryMarkdown = extractInlineField(
    blockLines,
    "Support category",
  );

  return {
    id: slug,
    slug,
    researchNumber: headingMatch.groups.researchNumber,
    reference: headingMatch.groups.reference,
    title: headingMatch.groups.title,
    book,
    variantType,
    tags,
    lastVerified,
    kjvText,
    disputedUnitsIntro,
    disputedUnits,
    variantIssue: inlineText(extractInlineField(blockLines, "Variant issue")),
    quickRead: inlineText(extractInlineField(blockLines, "Quick read")),
    supportCategory: inlineText(supportCategoryMarkdown),
    snapshot: parseSnapshot(blockLines),
    evidence: {
      greek: parseEvidenceRows(
        slug,
        greekSections,
        "greek",
        disputedUnits,
        lastVerified,
      ),
      versions: parseEvidenceRows(
        slug,
        versionSections,
        "version",
        disputedUnits,
        lastVerified,
      ),
    },
    ...parseFatherRows(blockLines, lastVerified),
    ...parseTimeline(blockLines),
    cautions: parseCautions(blockLines),
    ...parseEntrySources(blockLines),
  };
}

const headingIndexes = [];
lines.forEach((line, index) => {
  const match = line.match(passageHeadingPattern);
  if (match) {
    headingIndexes.push({ index, match });
  }
});

const passages = headingIndexes.map(({ index, match }, passageIndex) => {
  const endIndex =
    passageIndex + 1 < headingIndexes.length
      ? headingIndexes[passageIndex + 1].index
      : lines.findIndex(
          (line, lineIndex) =>
            lineIndex > index &&
            line === "## Required correction log for the coding agent",
        );
  assert.ok(endIndex > index, `Could not find end of ${match[0]}`);
  return parsePassage(match, lines.slice(index + 1, endIndex));
});

assert.equal(passages.length, 21, "Expected exactly 21 passage entries");
assert.deepEqual(
  passages.map((passage) => passage.slug),
  expectedSlugs,
  "Passage slugs or ordering changed",
);
assert.equal(
  new Set(passages.map((passage) => passage.slug)).size,
  passages.length,
  "Passage slugs must be unique",
);

const requiredPassageFields = [
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
  "disputedUnits",
  "variantIssue",
  "quickRead",
  "supportCategory",
  "snapshot",
  "evidence",
  "fathers",
  "timelineLabel",
  "timeline",
  "cautions",
  "entrySourceCitation",
  "entrySources",
];

for (const passage of passages) {
  for (const field of requiredPassageFields) {
    assert.ok(
      Object.hasOwn(passage, field),
      `${passage.slug} is missing required field ${field}`,
    );
  }

  assert.equal(passage.lastVerified, "2026-07-23");
  assert.ok(passage.reference.length > 0);
  assert.ok(passage.title.length > 0);
  assert.ok(passage.kjvText.length > 0);
  assert.ok(passage.variantIssue.length > 0);
  assert.ok(passage.quickRead.length > 0);
  assert.ok(passage.supportCategory.length > 0);
  assert.ok(passage.tags.length > 0);
  assert.equal(
    passage.disputedUnits.length,
    expectedUnitCounts[passage.slug],
    `${passage.slug} disputed-unit count changed`,
  );
  assert.ok(Object.keys(passage.snapshot).length >= 2);
  assert.ok(passage.timeline.length > 0);
  assert.ok(passage.cautions.length > 0);
  assert.ok(passage.entrySources.length > 0);

  const expectedCounts = expectedRowCounts[passage.slug];
  assert.deepEqual(
    {
      greek: passage.evidence.greek.length,
      versions: passage.evidence.versions.length,
      fathers: passage.fathers.length,
    },
    expectedCounts,
    `${passage.slug} evidence-row count changed`,
  );

  for (const row of [
    ...passage.evidence.greek,
    ...passage.evidence.versions,
  ]) {
    for (const field of [
      "section",
      "sectionType",
      "direction",
      "directionClass",
      "unit",
      "unitLabel",
      "details",
      "confidence",
      "source",
      "sourceLabel",
      "sourceUrl",
      "sourceLinks",
      "sourceCitationMarkdown",
      "lastVerified",
    ]) {
      assert.ok(
        Object.hasOwn(row, field),
        `${passage.slug} ${row.direction} is missing ${field}`,
      );
    }
    assert.ok(row.section.length > 0);
    assert.ok(row.unit.length > 0);
    assert.ok(row.unitLabel.length > 0);
    assert.ok(row.details.length > 0);
    assert.ok(row.confidence.length > 0);
    assert.ok(row.source.label.length > 0);
    assert.ok(row.sourceLabel.length > 0);
    assert.equal(row.lastVerified, "2026-07-23");
  }

  for (const father of passage.fathers) {
    for (const field of [
      "author",
      "date",
      "workSection",
      "reading",
      "relationship",
      "evidence",
      "confidence",
      "source",
      "sourceLabel",
      "sourceUrl",
      "sourceLinks",
      "sourceCitationMarkdown",
      "lastVerified",
    ]) {
      assert.ok(
        Object.hasOwn(father, field),
        `${passage.slug} father row is missing ${field}`,
      );
      if (field !== "sourceUrl" && field !== "source") {
        assert.ok(
          Array.isArray(father[field]) || father[field].length > 0,
          `${passage.slug} father row has empty ${field}`,
        );
      }
    }
    assert.ok(father.source.label.length > 0);
    assert.equal(father.lastVerified, "2026-07-23");
  }
}

const greekEvidenceRowCount = passages.reduce(
  (count, passage) => count + passage.evidence.greek.length,
  0,
);
const versionEvidenceRowCount = passages.reduce(
  (count, passage) => count + passage.evidence.versions.length,
  0,
);
const fatherRowCount = passages.reduce(
  (count, passage) => count + passage.fathers.length,
  0,
);

assert.equal(greekEvidenceRowCount, 67);
assert.equal(versionEvidenceRowCount, 46);
assert.equal(fatherRowCount, 24);

const kjvCorpus = passages
  .map((passage) => `${passage.slug}\n${passage.kjvText}`)
  .join("\n---\n");
const kjvCorpusSha256 = createHash("sha256")
  .update(kjvCorpus, "utf8")
  .digest("hex");
assert.equal(
  kjvCorpusSha256,
  "be47c34bae3a417e1505c1516d0747031c9c8e17c0f48380ff1f5d110373e6c3",
  "One or more exact KJV quotations changed",
);

const evidenceCorpus = JSON.stringify(
  passages.flatMap((passage) => [
    ...passage.evidence.greek,
    ...passage.evidence.versions,
  ]),
);
for (const requiredToken of [
  "P64/P67vid",
  "B*vid",
  "ℵc/mg",
  "D*",
  "1739mg",
  "2053txt",
  "2067c",
  "lacunose",
]) {
  assert.ok(
    evidenceCorpus.includes(requiredToken),
    `Evidence corpus lost required state/qualification: ${requiredToken}`,
  );
}
assert.ok(
  passages.some((passage) =>
    passage.evidence.greek.some((row) => row.direction === "OTHER"),
  ),
  "Exact OTHER direction was not preserved",
);
assert.ok(
  passages.some((passage) =>
    passage.evidence.greek.some((row) => row.direction === "QUALIFICATION"),
  ),
  "Exact QUALIFICATION direction was not preserved",
);

const generatedData = {
  schemaVersion: 1,
  generatedFrom: "oldestandbest-wave-2-complete-research.md",
  sourceSha256,
  lastVerified: "2026-07-23",
  passageCount: passages.length,
  validation: {
    greekEvidenceRowCount,
    versionEvidenceRowCount,
    fatherRowCount,
    kjvCorpusSha256,
  },
  passages,
};

writeFileSync(outputPath, `${JSON.stringify(generatedData, null, 2)}\n`, "utf8");

console.log(
  `Generated ${passages.length} passages (${greekEvidenceRowCount} Greek rows, ${versionEvidenceRowCount} version rows, ${fatherRowCount} father rows) at ${outputPath}`,
);
