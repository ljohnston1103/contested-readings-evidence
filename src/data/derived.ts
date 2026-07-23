import { passages } from "./passages";
import { applyKjvForwardCorrections } from "./kjvForwardCorrections";
import type { Passage, PatristicWitness, TimelineEvent, Witness } from "./types";

export const allPassages = passages.map(applyKjvForwardCorrections).sort(
  (a, b) => a.biblicalOrder - b.biblicalOrder,
);

export const displayedPassages = allPassages;

export const books = Array.from(new Set(displayedPassages.map((passage) => passage.book)));

export const variantTypes = Array.from(
  new Set(displayedPassages.flatMap((passage) => passage.variantType)),
).sort();

const preferredTagOptions = [
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

const allTagOptions = Array.from(
  new Set(displayedPassages.flatMap((passage) => passage.tags)),
).sort((a, b) => a.localeCompare(b));

export const tagOptions = [
  ...preferredTagOptions,
  ...allTagOptions.filter((tag) => !preferredTagOptions.includes(tag)),
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
      passage.disputedUnit ?? "",
      passage.cautions?.join(" ") ?? "",
      passage.tags.join(" "),
      passage.variantType.join(" "),
      passage.manuscriptSnapshot.mainEvidenceAgainst.join(" "),
      passage.greekSupportWitnesses
        .map((item) => `${item.direction ?? ""} ${item.unit ?? ""} ${item.witness} ${item.note} ${item.source ?? ""}`)
        .join(" "),
      passage.latinWitnesses
        .map((item) => `${item.direction ?? ""} ${item.unit ?? ""} ${item.witness} ${item.note} ${item.source ?? ""}`)
        .join(" "),
      passage.versionalWitnesses
        .map((item) => `${item.direction ?? ""} ${item.unit ?? ""} ${item.witness} ${item.note} ${item.source ?? ""}`)
        .join(" "),
      passage.patristicWitnesses
        .map(
          (item) =>
            `${item.author ?? item.source} ${item.workSection ?? ""} ${item.reading ?? ""} ${item.relationship ?? ""} ${item.quoteSummary} ${item.sourceCitation ?? ""}`,
        )
        .join(" "),
      passage.printedWitnesses
        ?.map((item) => `${item.direction ?? ""} ${item.witness} ${item.note} ${item.source ?? ""}`)
        .join(" ") ?? "",
      passage.evidenceAgainst
        .map((item) => `${item.direction ?? ""} ${item.unit ?? ""} ${item.witness} ${item.note} ${item.source ?? ""}`)
        .join(" "),
      passage.timeline.map((item) => `${item.date} ${item.label}`).join(" "),
      passage.sourceLinks?.map((item) => item.label).join(" ") ?? "",
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
    const key = normalize(
      `${row.direction ?? ""} ${row.unit ?? ""} ${row.witness} ${row.date} ${row.note} ${row.kind ?? ""}`,
    );
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function publicPatristicWitnesses(passage: Passage) {
  return passage.patristicWitnesses.filter((witness) => {
    const text = normalize(
      `${witness.author ?? witness.source} ${witness.date} ${witness.workSection ?? ""} ${witness.quoteSummary}`,
    );
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
  const match = name.match(/,\s*([^,]{1,24})$/);
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

const namedSigla: Record<string, string> = {
  "ℵ": "Codex Sinaiticus",
  A: "Codex Alexandrinus",
  B: "Codex Vaticanus",
  C: "Codex Ephraemi Rescriptus",
  D: "Codex D",
  W: "Codex Washingtonianus",
  Θ: "Codex Koridethi",
};

function compactGreekTokens(value: string) {
  if (/codex|papyrus|minuscule|uncial|\bGA\b|family/i.test(value)) return [];

  return value
    .replace(/\/Byz\b/g, "")
    .replace(/[(),;:[\]]/g, " ")
    .split(/\s+/)
    .map((token) => token.replace(/^[“”"'`]+|[.“”"'`]+$/g, ""))
    .filter(Boolean)
    .filter((token) => !/^(?:Maj|Byz|Lect|K\/Byz)$/i.test(token))
    .filter((token) =>
      /^(?:P\d+(?:\/P\d+)?|ℵ|[A-ZΔΘΣΨΦΞ]|f\d+(?:-[A-Za-z0-9]+)*|0?\d{1,4})(?:[A-Za-z*]+(?:\/[A-Za-z*]+)?)?$/.test(
        token,
      ),
    );
}

function compactWitnessName(token: string) {
  if (/^P\d/i.test(token)) {
    const papyrusNumber = token.match(/^P(\d+)/i)?.[1];
    return `Papyrus ${papyrusNumber}, ${token}`;
  }
  if (/^f\d/i.test(token)) return `Manuscript family ${token}, ${token}`;
  if (/^\d/.test(token)) return `Minuscule ${token}, ${token}`;

  const baseSiglum = token.match(/^(ℵ|[A-ZΔΘΣΨΦΞ])/)?.[1] ?? token;
  return `${namedSigla[baseSiglum] ?? `Codex ${baseSiglum}`}, ${token}`;
}

function collectGreekWitnesses(role: WitnessRole) {
  const rows: Array<{ passage: Passage; witness: Witness; role: WitnessRole }> = [];
  for (const passage of displayedPassages) {
    const list = role === "supports" ? passage.greekSupportWitnesses : passage.evidenceAgainst;
    for (const witness of list) {
      if (witness.kind && witness.kind !== "greek-manuscript") continue;
      if (
        role === "opposes" &&
        witness.direction &&
        !witness.direction.startsWith("AGAINST")
      ) {
        continue;
      }

      const compactTokens = compactGreekTokens(witness.witness);
      if (compactTokens.length) {
        for (const token of compactTokens) {
          rows.push({
            passage,
            role,
            witness: {
              ...witness,
              witness: compactWitnessName(token),
            },
          });
        }
        continue;
      }

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
      const name = fatherBaseName(witness.author ?? witness.source);
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
        if (witness.direction && !witness.direction.startsWith("AGAINST")) continue;
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

// ---------------------------------------------------------------------------
// Full transmission timeline: every individual Greek, Latin, versional, and
// patristic witness, every "evidence against" row, and every curated
// milestone event, each with its own parsed date range, flattened onto one
// axis. This is deliberately the raw, complete witness list rather than the
// ~5 curated highlights per passage.
// ---------------------------------------------------------------------------

/**
 * Extracts a {start, end} year range from a free-text date label such as
 * "c. AD 210", "AD 1362 to 1363", "AD 500s to 1500s", or "before AD 150".
 * A trailing "s" (e.g. "1300s") is treated as spanning that whole century-ish
 * decade block. Returns {0, 0} when no year can be found.
 */
export function parseYearRange(dateLabel: string): { start: number; end: number } {
  const tokens = dateLabel.match(/\d{3,4}s?/g);
  if (!tokens || !tokens.length) return { start: 0, end: 0 };

  const parsed = tokens.map((token) => {
    const fuzzy = /s$/.test(token);
    const value = Number.parseInt(token, 10);
    return { start: value, end: fuzzy ? value + 99 : value };
  });

  let start = Math.min(...parsed.map((p) => p.start));
  let end = Math.max(...parsed.map((p) => p.end));

  if (/\bbefore\b/i.test(dateLabel)) start = Math.max(1, start - 40);
  if (/\bafter\b/i.test(dateLabel)) end += 40;

  return { start, end: Math.max(start, end) };
}

export type TimelineCategory =
  | "patristic"
  | "greek"
  | "latin"
  | "versional"
  | "lectionary"
  | "printed"
  | "reformation";

export type TimelineSide = "support" | "oppose" | "milestone";

export type FullTimelineEntry = {
  id: string;
  name: string;
  date: string;
  start: number;
  end: number;
  category: TimelineCategory;
  side: TimelineSide;
  note: string;
  passageSlug: string;
  passageReference: string;
  passageTitle: string;
};

export const timelineCategoryOrder: TimelineCategory[] = [
  "patristic",
  "greek",
  "latin",
  "versional",
  "lectionary",
  "printed",
  "reformation",
];

export const timelineCategoryLabels: Record<TimelineCategory, string> = {
  patristic: "Church Fathers",
  greek: "Greek Manuscripts",
  latin: "Latin Witnesses",
  versional: "Versions (Syriac, Coptic & more)",
  lectionary: "Lectionaries",
  printed: "Printed Editions",
  reformation: "Reformation Bibles",
};

export const timelineCategoryColors: Record<TimelineCategory, string> = {
  patristic: "#7c3aed",
  greek: "#0369a1",
  latin: "#a16207",
  versional: "#0f766e",
  lectionary: "#475569",
  printed: "#be123c",
  reformation: "#c49a3f",
};

function classifyWitnessCategory(witness: Witness): TimelineCategory {
  switch (witness.kind) {
    case "greek-manuscript":
      return "greek";
    case "latin":
      return "latin";
    case "syriac":
    case "coptic":
    case "version":
      return "versional";
    case "patristic":
      return "patristic";
    case "printed":
      return "printed";
    case "lectionary":
      return "lectionary";
    default:
      break;
  }
  const text = witness.witness;
  if (/lectionar/i.test(text)) return "lectionary";
  if (/codex|papyrus|minuscule|uncial|\bGA\s?\d|byzantine|majority|family \d/i.test(text)) return "greek";
  if (/vulgate|old latin|\blatin\b/i.test(text)) return "latin";
  if (/syriac|peshitta|coptic|sahidic|bohairic|gothic|armenian|georgian|ethiopic|slavonic|version/i.test(text)) {
    return "versional";
  }
  if (/chrysostom|augustine|origen|tertullian|jerome|cyprian|irenaeus|father|hilary|ambrose|eusebius/i.test(text)) {
    return "patristic";
  }
  return "greek";
}

const milestoneCategory: Record<TimelineEvent["type"], TimelineCategory> = {
  patristic: "patristic",
  "greek-manuscript": "greek",
  "latin-manuscript": "latin",
  "ancient-version": "versional",
  "printed-edition": "printed",
  "reformation-bible": "reformation",
  lectionary: "lectionary",
};

function pushTimelineEntry(
  list: FullTimelineEntry[],
  passage: Passage,
  source: string,
  name: string,
  date: string,
  category: TimelineCategory,
  side: TimelineSide,
  note: string,
  index: number,
) {
  const { start, end } = parseYearRange(date);
  if (start <= 0) return;
  list.push({
    id: `${passage.slug}-${source}-${index}`,
    name,
    date,
    start,
    end,
    category,
    side,
    note,
    passageSlug: passage.slug,
    passageReference: passage.reference,
    passageTitle: passage.title,
  });
}

export function buildFullTimeline(): FullTimelineEntry[] {
  const entries: FullTimelineEntry[] = [];

  for (const passage of displayedPassages) {
    passage.greekSupportWitnesses.forEach((witness, i) =>
      pushTimelineEntry(entries, passage, "greek-support", witness.witness, witness.date, "greek", "support", witness.note, i),
    );
    passage.latinWitnesses.forEach((witness, i) =>
      pushTimelineEntry(entries, passage, "latin-support", witness.witness, witness.date, "latin", "support", witness.note, i),
    );
    passage.versionalWitnesses.forEach((witness, i) =>
      pushTimelineEntry(
        entries,
        passage,
        "versional-support",
        witness.witness,
        witness.date,
        classifyWitnessCategory(witness),
        "support",
        witness.note,
        i,
      ),
    );
    (passage.printedWitnesses ?? []).forEach((witness, i) =>
      pushTimelineEntry(entries, passage, "printed-support", witness.witness, witness.date, "printed", "support", witness.note, i),
    );
    publicPatristicWitnesses(passage).forEach((witness, i) =>
      pushTimelineEntry(
        entries,
        passage,
        "patristic-support",
        witness.author ?? witness.source,
        witness.date,
        "patristic",
        witness.reading?.startsWith("AGAINST") ? "oppose" : "support",
        witness.quoteSummary,
        i,
      ),
    );
    passage.evidenceAgainst.forEach((witness, i) => {
      if (witness.direction && !witness.direction.startsWith("AGAINST")) return;
      pushTimelineEntry(
        entries,
        passage,
        "evidence-against",
        witness.witness,
        witness.date,
        classifyWitnessCategory(witness),
        "oppose",
        witness.note,
        i,
      );
    });
    passage.timeline.forEach((event, i) =>
      pushTimelineEntry(
        entries,
        passage,
        "milestone",
        event.label,
        event.date,
        milestoneCategory[event.type],
        "milestone",
        event.label,
        i,
      ),
    );
  }

  return entries.sort((a, b) => a.start - b.start);
}

// ---------------------------------------------------------------------------
// Witness constellation: fathers + versions grouped into ancient-church
// branches, for a radial network view of how geographically wide the
// support for each reading actually is.
// ---------------------------------------------------------------------------

const branchOrder = [
  "byzantine-east",
  "alexandrian-greek",
  "latin-west",
  "syriac-east",
  "coptic-egypt",
  "armenian-georgian",
  "gothic",
  "ethiopic",
  "slavonic",
] as const;

export type ConstellationBranchId = (typeof branchOrder)[number];

export const branchLabels: Record<ConstellationBranchId, string> = {
  "byzantine-east": "Byzantine Greek East",
  "alexandrian-greek": "Alexandrian Greek",
  "latin-west": "Latin West",
  "syriac-east": "Syriac East",
  "coptic-egypt": "Coptic Egypt",
  "armenian-georgian": "Armenian & Georgian",
  gothic: "Gothic",
  ethiopic: "Ethiopic",
  slavonic: "Slavonic",
};

export const branchColors: Record<ConstellationBranchId, string> = {
  "byzantine-east": "#1b4f72",
  "alexandrian-greek": "#64748b",
  "latin-west": "#c49a3f",
  "syriac-east": "#0f766e",
  "coptic-egypt": "#7c3aed",
  "armenian-georgian": "#b45309",
  gothic: "#0369a1",
  ethiopic: "#be123c",
  slavonic: "#16a34a",
};

export type ConstellationLeaf = {
  id: string;
  name: string;
  kind: "father" | "version" | "aggregate";
  detail: string;
  supports: Passage[];
  opposes: Passage[];
};

export type ConstellationBranch = {
  id: ConstellationBranchId;
  label: string;
  color: string;
  leaves: ConstellationLeaf[];
};

function uniquePassages(list: Passage[]) {
  const seen = new Set<string>();
  return list.filter((passage) => {
    if (seen.has(passage.id)) return false;
    seen.add(passage.id);
    return true;
  });
}

function fatherBranch(region: string): ConstellationBranchId {
  if (/constantinople/i.test(region)) return "byzantine-east";
  if (/alexandria|caesarea/i.test(region)) return "alexandrian-greek";
  return "latin-west";
}

function versionBranch(language: string): ConstellationBranchId {
  switch (language) {
    case "Syriac":
      return "syriac-east";
    case "Coptic":
      return "coptic-egypt";
    case "Gothic":
      return "gothic";
    case "Armenian":
    case "Georgian":
      return "armenian-georgian";
    case "Ethiopic":
      return "ethiopic";
    case "Old Church Slavonic":
      return "slavonic";
    default:
      return "latin-west";
  }
}

export function buildWitnessConstellation(): ConstellationBranch[] {
  const map = new Map<ConstellationBranchId, ConstellationLeaf[]>();
  for (const id of branchOrder) map.set(id, []);

  for (const father of buildFatherIndex()) {
    const branch = fatherBranch(father.region);
    const passages = uniquePassages(father.passages.map((item) => item.passage));
    map.get(branch)!.push({
      id: `father-${father.name}`,
      name: father.name,
      kind: "father",
      detail: `${father.dateRange} · ${father.region}`,
      supports: passages,
      opposes: [],
    });
  }

  for (const version of buildVersionIndex()) {
    const branch = versionBranch(version.language);
    map.get(branch)!.push({
      id: `version-${version.name}`,
      name: version.name,
      kind: "version",
      detail: `${version.language} · ${version.date}`,
      supports: uniquePassages(version.supports.map((item) => item.passage)),
      opposes: uniquePassages(version.opposes.map((item) => item.passage)),
    });
  }

  const majorityPassages = displayedPassages.filter((passage) =>
    hasTag(passage, "Majority Greek support"),
  );
  if (majorityPassages.length) {
    map.get("byzantine-east")!.push({
      id: "aggregate-byzantine-majority",
      name: "Byzantine Majority Text",
      kind: "aggregate",
      detail: `${majorityPassages.length} passages with majority Greek support`,
      supports: majorityPassages,
      opposes: [],
    });
  }

  return branchOrder
    .map((id) => ({
      id,
      label: branchLabels[id],
      color: branchColors[id],
      leaves: map.get(id)!.sort((a, b) => b.supports.length - a.supports.length),
    }))
    .filter((branch) => branch.leaves.length > 0);
}
