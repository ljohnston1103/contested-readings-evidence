import { passages } from "./passages";
import type { Passage, PatristicWitness, Witness } from "./types";

export const allPassages = [...passages].sort(
  (a, b) => a.biblicalOrder - b.biblicalOrder,
);

export const displayedPassages = allPassages;

export const books = Array.from(new Set(displayedPassages.map((passage) => passage.book)));

export const variantTypes = Array.from(
  new Set(displayedPassages.flatMap((passage) => passage.variantType)),
).sort();

export const tagOptions = [
  "Major omitted passage",
  "Short omitted phrase",
  "Doctrinal variant",
  "Majority Greek support",
  "Scant evidence against KJV",
  "Complex evidence",
  "Patristic support",
  "Latin support",
  "Syriac support",
  "Coptic support",
  "Lectionary support",
  "Not majority Greek support",
];

export function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function passageSearchText(passage: Passage) {
  return normalize(
    [
      passage.reference,
      passage.title,
      passage.readingSupported,
      passage.kjvText,
      passage.variantIssue,
      passage.tags.join(" "),
      passage.variantType.join(" "),
      passage.manuscriptSnapshot.mainEvidenceAgainst.join(" "),
      passage.greekSupportWitnesses.map((item) => `${item.witness} ${item.note}`).join(" "),
      passage.latinWitnesses.map((item) => `${item.witness} ${item.note}`).join(" "),
      passage.versionalWitnesses.map((item) => `${item.witness} ${item.note}`).join(" "),
      passage.patristicWitnesses.map((item) => `${item.source} ${item.quoteSummary}`).join(" "),
      passage.evidenceAgainst.map((item) => `${item.witness} ${item.note}`).join(" "),
    ].join(" "),
  );
}

export function findPassage(slug: string) {
  return displayedPassages.find((passage) => passage.slug === slug);
}

export function adjacentPassages(slug: string) {
  const index = displayedPassages.findIndex((passage) => passage.slug === slug);
  return {
    previous: index > 0 ? displayedPassages[index - 1] : undefined,
    next: index >= 0 && index < displayedPassages.length - 1 ? displayedPassages[index + 1] : undefined,
  };
}

export function formatEntryCount(count: number) {
  return `${count} ${count === 1 ? "entry" : "entries"}`;
}

export function dedupeWitnessRows(rows: Witness[]) {
  const seen = new Set<string>();
  return rows.filter((row) => {
    const key = normalize(`${row.witness} ${row.date} ${row.note} ${row.kind ?? ""}`);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function publicPatristicWitnesses(passage: Passage) {
  return passage.patristicWitnesses.filter((witness) => {
    const text = normalize(`${witness.source} ${witness.date} ${witness.quoteSummary}`);
    if (/editorial placeholder|verification pending|unverified draft/.test(text)) return false;
    if (normalize(witness.source) === "patristic witnesses") return false;
    return true;
  });
}

function baseWitnessName(name: string) {
  const withoutHandDetails = name
    .replace(/\bfirst hand and later correction group\b/gi, "")
    .replace(/\b(first hand|later correction|correction|corrector|margin|marginal|text|vid|supplement)\b/gi, "")
    .replace(/\bA2\b|\bC3\b/g, "")
    .replace(/\s+,/g, ",")
    .replace(/,\s*$/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const normalized = withoutHandDetails.replace(/^Papyrus\s+(\d+)\s*,?\s*P\1$/i, "Papyrus $1, P$1");
  const canonicalNames: Record<string, string> = {
    "Codex Bezae": "Codex Bezae, D",
    "Codex Vaticanus": "Codex Vaticanus, B",
    "Codex Washingtonianus": "Codex Washingtonianus, W",
  };

  return canonicalNames[normalized] ?? normalized;
}

function isAggregateWitness(name: string) {
  return /percent|manuscripts|majority|lectionaries|tradition|witnesses|copies|representatives|system|some manuscripts|some northern|some old latin|most coptic|most latin|one latin|two latin|three latin/i.test(
    name,
  );
}

function shortSiglum(name: string) {
  const match = name.match(/,\s*([A-Z][A-Za-z0-9 ]{0,16})$/);
  return match?.[1] ?? "";
}

function classifyManuscript(name: string) {
  if (/papyrus/i.test(name)) return "Papyrus";
  if (/codex/i.test(name)) return "Major codex / uncial";
  if (/minuscule|GA/i.test(name)) return "Minuscule";
  if (/uncial/i.test(name)) return "Uncial";
  if (/family/i.test(name)) return "Manuscript family";
  return "Greek witness";
}

type WitnessRole = "supports" | "opposes";

function collectGreekWitnesses(role: WitnessRole) {
  const rows: Array<{ passage: Passage; witness: Witness; role: WitnessRole }> = [];
  for (const passage of displayedPassages) {
    const list = role === "supports" ? passage.greekSupportWitnesses : passage.evidenceAgainst;
    for (const witness of list) {
      if (witness.kind && witness.kind !== "greek-manuscript") continue;
      if (isAggregateWitness(witness.witness)) continue;
      if (!/codex|papyrus|minuscule|uncial|GA|family/i.test(witness.witness)) continue;
      rows.push({ passage, witness, role });
    }
  }
  return rows;
}

export type ManuscriptProfile = {
  name: string;
  siglum: string;
  date: string;
  category: string;
  supports: Array<{ passage: Passage; notes: string[]; labels: string[] }>;
  opposes: Array<{ passage: Passage; notes: string[]; labels: string[] }>;
};

function witnessLabel(witness: Witness) {
  const text = `${witness.witness} ${witness.date} ${witness.note}`;
  const labels = new Set<string>();

  if (/first hand/i.test(text)) labels.add("first hand");
  if (/later correction|correction|corrector/i.test(text)) labels.add("corrector");
  if (/\bmargin|marginal/i.test(text)) labels.add("margin");
  if (/\bvid\b|partial/i.test(text)) labels.add("partial");
  if (/mixed|variation|different form|related|in whole or in part/i.test(text)) labels.add("mixed");
  if (/uncertain|possibly|probably/i.test(text)) labels.add("uncertain");

  return Array.from(labels).join(", ");
}

function addManuscriptEvidence(
  target: ManuscriptProfile["supports"],
  passage: Passage,
  witness: Witness,
) {
  const existing = target.find((item) => item.passage.id === passage.id);
  const label = witnessLabel(witness);
  if (existing) {
    if (label && !existing.labels.includes(label)) existing.labels.push(label);
    if (!existing.notes.includes(witness.note)) existing.notes.push(witness.note);
    return;
  }

  target.push({
    passage,
    labels: label ? [label] : [],
    notes: [witness.note],
  });
}

export function buildManuscriptIndex(): ManuscriptProfile[] {
  const map = new Map<string, ManuscriptProfile>();
  for (const row of [...collectGreekWitnesses("supports"), ...collectGreekWitnesses("opposes")]) {
    const name = baseWitnessName(row.witness.witness);
    const existing = map.get(name);
    const profile =
      existing ??
      ({
        name,
        siglum: shortSiglum(name),
        date: row.witness.date,
        category: classifyManuscript(name),
        supports: [],
        opposes: [],
      } satisfies ManuscriptProfile);

    const target = row.role === "supports" ? profile.supports : profile.opposes;
    addManuscriptEvidence(target, row.passage, row.witness);
    map.set(name, profile);
  }

  return Array.from(map.values()).sort((a, b) => {
    const weight = (profile: ManuscriptProfile) =>
      /Vaticanus|Sinaiticus|Alexandrinus|Bezae|Ephraemi|Washingtonianus|P75|P66|P45|P46|P74/i.test(profile.name)
        ? 0
        : 1;
    return weight(a) - weight(b) || a.name.localeCompare(b.name);
  });
}

function fatherBaseName(source: string) {
  return source
    .replace(/,.*$/, "")
    .replace(/\s+\(possible\)$/i, "")
    .trim();
}

const fatherRegions: Record<string, string> = {
  Ambrose: "Milan",
  Augustine: "North Africa",
  Chrysostom: "Constantinople",
  Cyprian: "North Africa",
  Irenaeus: "Gaul",
  Jerome: "Bethlehem",
  Origen: "Alexandria / Caesarea",
  Tertullian: "North Africa / Rome",
  "Hilary of Poitiers": "Gaul",
};

export type FatherProfile = {
  name: string;
  dateRange: string;
  region: string;
  passages: Array<{ passage: Passage; witness: PatristicWitness }>;
};

export function buildFatherIndex(): FatherProfile[] {
  const map = new Map<string, FatherProfile>();
  for (const passage of displayedPassages) {
    for (const witness of publicPatristicWitnesses(passage)) {
      if (/not listed/i.test(witness.date)) continue;
      const name = fatherBaseName(witness.source);
      const existing = map.get(name);
      const profile =
        existing ??
        ({
          name,
          dateRange: witness.date,
          region: witness.region ?? fatherRegions[name] ?? "Region not specified",
          passages: [],
        } satisfies FatherProfile);
      profile.passages.push({ passage, witness });
      map.set(name, profile);
    }
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export type VersionProfile = {
  name: string;
  language: string;
  date: string;
  supports: Array<{ passage: Passage; notes: string[] }>;
  opposes: Array<{ passage: Passage; notes: string[] }>;
};

const versionCatalog: Array<Omit<VersionProfile, "supports" | "opposes">> = [
  { name: "Old Latin", language: "Latin", date: "c. AD 150 to 400" },
  { name: "Vulgate", language: "Latin", date: "c. AD 383 onward" },
  { name: "Syriac Peshitta", language: "Syriac", date: "early centuries / c. AD 400s onward" },
  { name: "Syriac Harclean", language: "Syriac", date: "AD 616" },
  { name: "Sinaitic Syriac", language: "Syriac", date: "c. AD 300s to 400s" },
  { name: "Curetonian Syriac", language: "Syriac", date: "c. AD 400s" },
  { name: "Sahidic Coptic", language: "Coptic", date: "c. AD 300s to 400s" },
  { name: "Bohairic Coptic", language: "Coptic", date: "early centuries" },
  { name: "Gothic Version", language: "Gothic", date: "c. AD 350" },
  { name: "Armenian", language: "Armenian", date: "c. AD 400 onward" },
  { name: "Georgian", language: "Georgian", date: "c. AD 400s onward" },
  { name: "Ethiopic", language: "Ethiopic", date: "c. AD 500s onward" },
  { name: "Slavonic", language: "Old Church Slavonic", date: "medieval" },
];

function versionMatches(witness: Witness, versionName: string) {
  const haystack = normalize(`${witness.witness} ${witness.note}`);
  const needle = normalize(versionName);
  if (needle === "old latin") return /old latin|latin tradition|latin copies/.test(haystack);
  if (needle === "vulgate") return /vulgate/.test(haystack);
  if (needle === "armenian") return /armenian/.test(haystack);
  if (needle === "georgian") return /georgian/.test(haystack);
  if (needle === "ethiopic") return /ethiopic/.test(haystack);
  if (needle === "slavonic") return /slavonic/.test(haystack);
  return haystack.includes(needle);
}

function addVersionEvidence(target: VersionProfile["supports"], passage: Passage, note: string) {
  const existing = target.find((item) => item.passage.id === passage.id);
  if (existing) {
    if (!existing.notes.includes(note)) existing.notes.push(note);
    return;
  }

  target.push({ passage, notes: [note] });
}

export function buildVersionIndex(): VersionProfile[] {
  return versionCatalog.map((version) => {
    const profile: VersionProfile = { ...version, supports: [], opposes: [] };
    for (const passage of displayedPassages) {
      for (const witness of [...passage.versionalWitnesses, ...passage.latinWitnesses]) {
        if (
          versionMatches(witness, version.name) &&
          !/omit|does not contain|no known|no strong|shorter|against/i.test(witness.note)
        ) {
          addVersionEvidence(profile.supports, passage, witness.note);
        }
      }
      for (const witness of passage.evidenceAgainst) {
        if (versionMatches(witness, version.name) || (version.language === "Coptic" && witness.kind === "coptic")) {
          addVersionEvidence(profile.opposes, passage, witness.note);
        }
      }
    }
    return profile;
  });
}

export function hasTag(passage: Passage, tag: string) {
  return passage.tags.some((item) => item.toLowerCase() === tag.toLowerCase());
}
