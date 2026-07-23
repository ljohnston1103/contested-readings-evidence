import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectDirectory = resolve(scriptDirectory, "..");
const sourcePath = resolve(
  projectDirectory,
  "oldestandbest-kjv-forward-site-corrections.md",
);
const outputPath = resolve(
  projectDirectory,
  "src/data/kjv-forward.generated.json",
);

const markdown = readFileSync(sourcePath, "utf8").replace(/\r\n?/gu, "\n");

const referenceToSlug = new Map(
  [
    ["Matthew 1:25", "matthew-1-25"],
    ["Matthew 5:22", "matthew-5-22"],
    ["Matthew 5:44", "matthew-5-44"],
    ["Matthew 6:13", "matthew-6-13"],
    ["Matthew 17:21", "matthew-17-21"],
    ["Matthew 18:11", "matthew-18-11"],
    ["Matthew 19:16–17", "matthew-19-16-17"],
    ["Matthew 23:14", "matthew-23-14"],
    ["Matthew 27:35", "matthew-27-35"],
    ["Mark 1:2", "mark-1-2"],
    ["Mark 7:16", "mark-7-16"],
    ["Mark 9:29", "mark-9-29"],
    ["Mark 9:44, 46", "mark-9-44-46"],
    ["Mark 10:24", "mark-10-24"],
    ["Mark 11:26", "mark-11-26"],
    ["Mark 15:28", "mark-15-28"],
    ["Mark 16:9–20", "mark-16-9-20"],
    ["Luke 2:14", "luke-2-14"],
    ["Luke 2:33", "luke-2-33"],
    ["Luke 4:4", "luke-4-4"],
    ["Luke 9:55–56", "luke-9-55-56"],
    ["Luke 11:2–4", "luke-11-2-4"],
    ["Luke 22:43–44", "luke-22-43-44"],
    ["Luke 23:17", "luke-23-17"],
    ["Luke 23:34", "luke-23-34"],
    ["Luke 24:6", "luke-24-6"],
    ["Luke 24:40", "luke-24-40"],
    ["Luke 24:51", "luke-24-51"],
    ["Luke 24:52", "luke-24-52"],
    ["John 1:18", "john-1-18"],
    ["John 3:13", "john-3-13"],
    ["John 5:3b–4", "john-5-3b-4"],
    ["John 6:47", "john-6-47"],
    ["John 7:53–8:11", "john-7-53-8-11"],
    ["Acts 8:37", "acts-8-37"],
    ["Acts 9:5–6", "acts-9-5-6"],
    ["Acts 20:28", "acts-20-28"],
    ["Acts 28:29", "acts-28-29"],
    ["Romans 8:1", "romans-8-1"],
    ["Romans 14:10", "romans-14-10"],
    ["Romans 16:24", "romans-16-24"],
    ["1 Corinthians 15:47", "1-corinthians-15-47"],
    ["Ephesians 3:9", "ephesians-3-9"],
    ["Colossians 1:14", "colossians-1-14"],
    ["1 Timothy 3:16", "1-timothy-3-16"],
    ["1 John 4:3", "1-john-4-3"],
    ["1 John 5:7", "1-john-5-7"],
    ["Revelation 1:8", "revelation-1-8"],
    ["Revelation 1:11", "revelation-1-11"],
    ["Revelation 16:5", "revelation-16-5"],
    ["Revelation 22:19", "revelation-22-19"],
  ],
);

function plain(value) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/gu, "$1")
    .replace(/[*_`]/gu, "")
    .replace(/\s+/gu, " ")
    .trim();
}

function section(start, end) {
  const startIndex = markdown.indexOf(start);
  assert.notEqual(startIndex, -1, `Missing section: ${start}`);
  const endIndex = end ? markdown.indexOf(end, startIndex + start.length) : -1;
  return markdown.slice(startIndex, endIndex === -1 ? undefined : endIndex);
}

function tableRows(block) {
  return block
    .split("\n")
    .filter((line) => line.startsWith("|"))
    .map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()))
    .filter(
      (cells) =>
        cells.length > 1 &&
        !cells.every((cell) => /^:?-+:?$/u.test(cell)) &&
        !/^(Passage|Evidence|Current category|Passage and evidence group)$/u.test(
          cells[0],
        ),
    );
}

const earliestBlock = section(
  "### Exact earliest-evidence copy for every passage",
  "### Evidence-card date behavior",
);
const earliestSupport = tableRows(earliestBlock).map(
  ([reference, statement, earliestGreek]) => {
    const slug = referenceToSlug.get(plain(reference));
    assert.ok(slug, `No slug for earliest-support reference ${reference}`);
    return {
      slug,
      reference: plain(reference),
      statement: plain(statement),
      earliestGreek: plain(earliestGreek),
    };
  },
);
assert.equal(earliestSupport.length, 51, "Expected 51 earliest-support rows");

const referenceBlock = section(
  "## Exact References sections for the 21 new pages",
  "## Older-page category corrections",
);
const referenceHeadings = [
  ...referenceBlock.matchAll(/^### (?<reference>.+)$/gmu),
];
const references = referenceHeadings.map((heading, index) => {
  const reference = plain(heading.groups.reference);
  const slug = referenceToSlug.get(reference);
  assert.ok(slug, `No slug for references section ${reference}`);
  const blockEnd =
    index + 1 < referenceHeadings.length
      ? referenceHeadings[index + 1].index
      : referenceBlock.length;
  const block = referenceBlock.slice(heading.index, blockEnd);
  const entries = block
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((line) => {
      const source = line.slice(2).trim();
      const links = [...source.matchAll(/\[([^\]]+)\]\(([^)]+)\)/gu)].map(
        (match) => ({ label: plain(match[1]), url: match[2] }),
      );
      return {
        citation: plain(source),
        links,
      };
    });
  assert.ok(entries.length > 0, `${reference} has no references`);
  return { slug, entries };
});
assert.equal(references.length, 21, "Expected 21 reference sections");

const copyBlock = section(
  "# Exact public-copy replacements for the 21 new pages",
  "# Data and reference handling",
);
const copyHeadings = [
  ...copyBlock.matchAll(
    /^## (?<number>\d+)\. (?<reference>.+?) — (?<title>.+)$/gmu,
  ),
];

function copySection(block, heading, nextHeading) {
  const startIndex = block.indexOf(`### ${heading}`);
  assert.notEqual(startIndex, -1, `Missing copy heading ${heading}`);
  const contentStart = block.indexOf("\n", startIndex) + 1;
  const nextIndex = nextHeading
    ? block.indexOf(`### ${nextHeading}`, contentStart)
    : block.length;
  return block.slice(contentStart, nextIndex).trim();
}

const wave2Copy = copyHeadings.map((heading, index) => {
  const blockEnd =
    index + 1 < copyHeadings.length ? copyHeadings[index + 1].index : copyBlock.length;
  const block = copyBlock.slice(heading.index, blockEnd);
  const reference = plain(heading.groups.reference);
  const slug = referenceToSlug.get(reference);
  assert.ok(slug, `No slug for copy section ${reference}`);
  return {
    slug,
    reference,
    title: plain(heading.groups.title),
    whyRetained: plain(
      copySection(block, "Why the KJV Reading Is Retained", "Editorial conclusion"),
    ),
    editorialConclusion: plain(
      copySection(
        block,
        "Editorial conclusion",
        "Primary support for the KJV reading",
      ),
    ),
    primarySupport: plain(
      copySection(
        block,
        "Primary support for the KJV reading",
        "Evidence notes",
      ),
    ),
    evidenceNotes: copySection(block, "Evidence notes")
      .split("\n")
      .filter((line) => line.startsWith("- "))
      .map((line) => plain(line.slice(2))),
  };
});
assert.equal(wave2Copy.length, 21, "Expected 21 exact copy sections");

const olderBlock = section(
  "## Older-page category corrections",
  "# Exact public-copy replacements for the 21 new pages",
);
const olderCategoryRows = tableRows(olderBlock)
  .filter((cells) => cells.length === 3 && referenceToSlug.has(plain(cells[0])))
  .map(([reference, , replacement]) => ({
    slug: referenceToSlug.get(plain(reference)),
    supportCategory: plain(replacement),
  }));
assert.equal(olderCategoryRows.length, 5, "Expected five older category corrections");

const olderConclusionHeadings = [
  ...olderBlock.matchAll(/^### (?<reference>.+)$/gmu),
];
const olderConclusions = olderConclusionHeadings.map((heading, index) => {
  const reference = plain(heading.groups.reference);
  const slug = referenceToSlug.get(reference);
  assert.ok(slug, `No slug for older conclusion ${reference}`);
  const contentStart = olderBlock.indexOf("\n", heading.index) + 1;
  const blockEnd =
    index + 1 < olderConclusionHeadings.length
      ? olderConclusionHeadings[index + 1].index
      : olderBlock.length;
  return {
    slug,
    editorialConclusion: plain(olderBlock.slice(contentStart, blockEnd)),
  };
});
assert.equal(olderConclusions.length, 5, "Expected five older conclusions");

function rowsBetween(startHeading, endHeading) {
  return tableRows(section(startHeading, endHeading)).map(
    ([evidence, date, relationship]) => ({
      evidence: plain(evidence),
      date: plain(date),
      relationship: plain(relationship),
    }),
  );
}

const oneJohnFiveSeven = {
  latinWriters: rowsBetween(
    "#### Latin writers and conciliar evidence",
    "#### Latin biblical and manuscript evidence",
  ),
  latinManuscripts: rowsBetween(
    "#### Latin biblical and manuscript evidence",
    "#### Greek manuscript evidence",
  ),
  greekManuscripts: rowsBetween(
    "#### Greek manuscript evidence",
    "#### Printed Latin and English reception",
  ),
  reception: rowsBetween(
    "#### Printed Latin and English reception",
    "### Required dates for the currently aggregated new-page evidence",
  ),
};
assert.equal(oneJohnFiveSeven.latinWriters.length, 12);
assert.equal(oneJohnFiveSeven.latinManuscripts.length, 17);
assert.equal(oneJohnFiveSeven.greekManuscripts.length, 10);
assert.equal(oneJohnFiveSeven.reception.length, 3);

const groupedDates = tableRows(
  section(
    "### Required dates for the currently aggregated new-page evidence",
    "### Date and relationship fields",
  ),
).map(([group, publicDate]) => ({
  group: plain(group),
  publicDate: plain(publicDate),
}));
assert.equal(groupedDates.length, 41, "Expected 41 grouped-date instructions");

const payload = {
  schemaVersion: 1,
  generatedFrom: "oldestandbest-kjv-forward-site-corrections.md",
  earliestSupport,
  references,
  wave2Copy,
  olderCategoryRows,
  olderConclusions,
  oneJohnFiveSeven,
  groupedDates,
};

writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(
  `Generated KJV-forward corrections: ${earliestSupport.length} earliest panels, ${wave2Copy.length} passage copy blocks, ${references.length} reference sections.`,
);
