"use strict";

/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS is required to install the local TypeScript require hook. */

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const {
  formatValidationIssues,
  validateDerivedOutput,
} = require("./lib/derived-output-validator.cjs");

// Validate the same TypeScript-derived dataset that the Next.js application
// imports. This intentionally does not inspect only the raw/generated JSON.
require.extensions[".ts"] = function loadTypeScript(module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      resolveJsonModule: true,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: filename,
    reportDiagnostics: true,
  });

  const errors = (output.diagnostics ?? []).filter(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
  );
  if (errors.length > 0) {
    const host = {
      getCanonicalFileName: (fileName) => fileName,
      getCurrentDirectory: () => process.cwd(),
      getNewLine: () => "\n",
    };
    throw new Error(ts.formatDiagnostics(errors, host));
  }

  module._compile(output.outputText, filename);
};

const derivedPath = path.resolve(__dirname, "../src/data/derived.ts");
const evidenceDatesPath = path.resolve(
  __dirname,
  "../src/data/evidenceDates.ts",
);
const { parseEvidenceDate } = require(evidenceDatesPath);

for (const [label, expected] of [
  ["AD 370s", { start: 370, end: 379 }],
  ["AD 370s to 390s", { start: 370, end: 399 }],
  ["AD 400s", { start: 400, end: 499 }],
  ["AD 1770s", { start: 1770, end: 1779 }],
  ["AD 1300s", { start: 1300, end: 1399 }],
]) {
  const parsed = parseEvidenceDate(label);
  assert.ok(parsed, `Date parser returned no range for ${label}`);
  assert.equal(parsed.start, expected.start, `Wrong start for ${label}`);
  assert.equal(parsed.end, expected.end, `Wrong end for ${label}`);
}

const {
  buildManuscriptIndex,
  displayedPassages,
  publicPatristicWitnesses,
} = require(derivedPath);
const fullWitnessPath = path.resolve(
  __dirname,
  "../src/data/fullWitness/index.ts",
);
const { fullWitnessEntries } = require(fullWitnessPath);
const majorityTextPath = path.resolve(
  __dirname,
  "../src/data/majorityText.ts",
);
const { majorityTextBySlug, nonMajorityKjvSlugs } = require(majorityTextPath);
const publicPatristicBySlug = Object.fromEntries(
  displayedPassages.map((passage) => [
    passage.slug,
    publicPatristicWitnesses(passage),
  ]),
);
const issues = validateDerivedOutput(displayedPassages, {
  manuscriptProfiles: buildManuscriptIndex(),
  fullWitnessEntries,
  publicPatristicBySlug,
  majorityTextBySlug,
  nonMajorityKjvSlugs: Array.from(nonMajorityKjvSlugs),
});

if (issues.length > 0) {
  console.error(formatValidationIssues(issues));
  process.exitCode = 1;
} else {
  console.log(
    `Derived evidence validation passed: ${displayedPassages.length} passage dossiers and ${fullWitnessEntries.length} full rosters checked for source scope, Majority Text estimates, three-way patristic classification, Cyprian at 1 John 5:7, witness-specific dates, corrected-hand dating, duplicate rows, source-book mismatches, and chronological order.`,
  );
}
