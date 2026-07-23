"use strict";

/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS is required to install the local TypeScript require hook. */

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
const { buildManuscriptIndex, displayedPassages } = require(derivedPath);
const issues = validateDerivedOutput(displayedPassages, {
  manuscriptProfiles: buildManuscriptIndex(),
});

if (issues.length > 0) {
  console.error(formatValidationIssues(issues));
  process.exitCode = 1;
} else {
  console.log(
    `Derived evidence validation passed: ${displayedPassages.length} passage dossiers checked for atomic witness labels, witness-specific dates, duplicate rows, and chronological order.`,
  );
}
