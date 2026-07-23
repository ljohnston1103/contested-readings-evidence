import { passages } from "./passages";
import {
  evidenceDirectionRole,
  isAgainstKjvDirection,
} from "./evidenceDirection";
import { parseEvidenceDate } from "./evidenceDates";
import { applyKjvForwardCorrections } from "./kjvForwardCorrections";
import type { Passage, PatristicWitness, TimelineEvent, Witness } from "./types";
import {
  greekWitnessCatalog,
  resolveGreekWitness,
  resolveVersionWitness,
  versionWitnessCatalog,
  type GreekCorpus,
  type WitnessCatalogEntry,
} from "./witnessCatalog";

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
  return passage.patristicWitnesses
    .filter((witness) => {
      const name = normalize(witness.author ?? witness.source);
      const text = normalize(
        `${name} ${witness.date} ${witness.workSection ?? ""} ${witness.quoteSummary}`,
      );
      if (/editorial placeholder|verification pending|unverified draft/.test(text)) return false;
      if (
        name === "patristic witnesses" ||
        /^(?:related patristic references|later ecclesiastical use|later greek commentators|liturgical ecclesiastical use)$/.test(
          name,
        )
      ) {
        return false;
      }
      return true;
    })
    .map((witness) => ({
      ...witness,
      region:
        witness.region &&
        !/^(?:supporting|opposing|related|mixed)\b/iu.test(witness.region)
          ? witness.region
          : undefined,
    }));
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

function greekCorpusForBook(book: string): GreekCorpus {
  if (["Matthew", "Mark", "Luke", "John"].includes(book)) return "gospels";
  if (book === "Acts") return "acts";
  if (book === "Revelation") return "revelation";
  if (
    [
      "James",
      "1 Peter",
      "2 Peter",
      "1 John",
      "2 John",
      "3 John",
      "Jude",
    ].includes(book)
  ) {
    return "catholic";
  }
  return "paul";
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
  if (/papyrus|\bP\d+(?:\/P\d+)?\b/i.test(name)) return "Papyrus";
  if (/uncial/i.test(name)) return "Uncial";
  if (/minuscule/i.test(name)) return "Minuscule";
  if (/family/i.test(name)) return "Manuscript family";
  if (
    /^codex\s+(?:[a-z]|delta|theta|xi|sigma|phi|psi|pi|gamma|lambda|\u2135|\u0394|\u0398|\u039E|\u03A3|\u03A6|\u03A8|\u03A0|\u0393|\u039B)\b/iu.test(
      name,
    )
  ) {
    return "Uncial";
  }
  if (
    /codex\s+(?:sinaiticus|alexandrinus|vaticanus|ephraemi|bezae|washingtonianus|koridethi|regius|laudianus|claromontanus|coislinianus|augien(?:sis)?|boernerianus|sangermanensis)/i.test(
      name,
    )
  ) {
    return "Major codex / uncial";
  }
  if (/\(GA\s+0\d{2,3}\)/i.test(name)) return "Uncial";
  if (/codex/i.test(name) || /\bGA\s+\d+/i.test(name)) return "Minuscule";
  return "Greek witness";
}

type WitnessRole = "supports" | "opposes";

const namedSigla: Record<string, string> = {
  "ℵ": "Codex Sinaiticus",
  א: "Codex Sinaiticus",
  A: "Codex Alexandrinus",
  B: "Codex Vaticanus",
  C: "Codex Ephraemi Rescriptus",
  D: "Codex D",
  W: "Codex Washingtonianus",
  Θ: "Codex Koridethi",
};

const compactSiglumPattern =
  /^(?:(?:P\d+(?:\/P\d+)?)|(?:f\d+(?:-(?:part|except-\d+))?)|(?:0?\d{1,4})|(?:ℵ|א|[A-ZΔΘΣΨΦΞ]))(?:\*vid|c\/mg|cvid|vid|txt|mg|supp|\*|c|S|s|[123])?$/u;

function compactGreekTokens(value: string) {
  if (/codex|papyrus|minuscule|uncial|\bGA\b|family/i.test(value)) return [];

  return value
    .replace(/\/Byz\b/g, "")
    .replace(/[(),;:[\]]/g, " ")
    .split(/\s+/)
    .map((token) => token.replace(/^[“”"'`]+|[.“”"'`]+$/g, ""))
    .filter(Boolean)
    .filter((token) => !/^(?:Maj|Byz|Lect|K\/Byz)$/i.test(token))
    .filter((token) => compactSiglumPattern.test(token));
}

function compactWitnessName(token: string, corpus: GreekCorpus) {
  const resolved = resolveGreekWitness(token, corpus);
  if (resolved) {
    return resolved.qualifier
      ? `${resolved.displayName} — ${token}`
      : resolved.displayName;
  }
  if (/^P\d/i.test(token)) {
    const papyrusNumber = token.match(/^P(\d+)/i)?.[1];
    return `Papyrus ${papyrusNumber}, ${token}`;
  }
  if (/^f\d/i.test(token)) return `Manuscript family ${token}, ${token}`;
  if (/^\d/.test(token)) return `Minuscule ${token}, ${token}`;

  const baseSiglum = token.match(/^(ℵ|[A-ZΔΘΣΨΦΞ])/)?.[1] ?? token;
  return `${namedSigla[baseSiglum] ?? `Codex ${baseSiglum}`}, ${token}`;
}

const namedCodexCandidates: Array<[RegExp, string]> = [
  [/\bSinaiticus\b/iu, "01"],
  [/\bAlexandrinus\b/iu, "02"],
  [/\bVaticanus\b/iu, "03"],
  [/\bEphraemi(?:\s+Rescriptus)?\b/iu, "04"],
  [/\bBezae\b/iu, "D"],
  [/\bWashingtonianus\b/iu, "W"],
  [/\bKoridethi\b/iu, "Θ"],
  [/\bRegius\b/iu, "L"],
  [/\bSangallensis\b/iu, "Δ"],
  [/\bRossanensis\b/iu, "Σ"],
  [/\bBeratinus\b/iu, "Φ"],
  [/\bZacynthius\b/iu, "Ξ"],
  [/\bAthous\s+Lavrensis\b/iu, "Ψ"],
  [/\bClaromontanus\b/iu, "D"],
  [/\bBoernerianus\b/iu, "G"],
  [/\bAugiensis\b/iu, "F"],
  [/\bLaudianus\b/iu, "E"],
  [/\bPorphyrianus\b/iu, "P"],
  [/\bMosquensis\b/iu, "K"],
  [/\bCyprius\b/iu, "K"],
  [/\bMonacensis\b/iu, "X"],
  [/\bPetropolitanus\s+Purpureus\b/iu, "N"],
  [/\bGuelferbytanus\b/iu, "P"],
  [/\bDublinensis\b/iu, "Z"],
  [/\bBorgianus\b/iu, "T"],
];

const writtenSigla: Array<[RegExp, string]> = [
  [/\bDelta\b/iu, "Δ"],
  [/\bTheta\b/iu, "Θ"],
  [/\bSigma\b/iu, "Σ"],
  [/\bPsi\b/iu, "Ψ"],
  [/\bPhi\b/iu, "Φ"],
  [/\bXi\b/iu, "Ξ"],
];

type CanonicalManuscriptIdentity = {
  key: string;
  name: string;
  siglum: string;
  date?: string;
};

function candidateSiglum(name: string) {
  const baseName = name.split(/\s+—\s+/u, 1)[0].trim();
  const parentheticalGa = baseName.match(
    /\(GA\s+((?:P\d+(?:\/P\d+)?)|(?:0?\d{1,4}))\)/iu,
  );
  if (parentheticalGa) return parentheticalGa[1];

  const leadingGa = baseName.match(
    /\bGA\s+((?:P\d+(?:\/P\d+)?)|(?:0?\d{1,4}))\b/iu,
  );
  if (leadingGa) return leadingGa[1];

  const papyrus = baseName.match(/\bPapyrus\s+(\d+)\b/iu);
  if (papyrus) return `P${papyrus[1]}`;

  const minuscule = baseName.match(/\bMinuscule\s+(\d+)\b/iu);
  if (minuscule) return minuscule[1];

  const uncial = baseName.match(/\bUncial\s+(0\d{2,3})\b/iu);
  if (uncial) return uncial[1];

  const family = baseName.match(
    /\b(?:Manuscript\s+)?Family\s+(\d+)\b/iu,
  );
  if (family) return `f${family[1]}`;

  for (const [pattern, siglum] of namedCodexCandidates) {
    if (pattern.test(baseName)) return siglum;
  }
  for (const [pattern, siglum] of writtenSigla) {
    if (pattern.test(baseName)) return siglum;
  }

  const trailingSiglum = baseName.match(
    /,\s*((?:P\d+(?:\/P\d+)?)|(?:f\d+)|(?:0?\d{1,4})|(?:ℵ|א|[A-ZΔΘΣΨΦΞ])(?:\*vid|c\/mg|cvid|vid|txt|mg|supp|\*|c|S|s|[123])?)$/u,
  );
  if (trailingSiglum) return trailingSiglum[1];

  const codexLetter = baseName.match(
    /^Codex\s+(ℵ|א|[A-ZΔΘΣΨΦΞ])(?:\b|\s|,|$)/u,
  );
  return codexLetter?.[1];
}

function fallbackGaDisplay(siglum: string) {
  if (/^P\d/iu.test(siglum)) {
    const papyrusNumber = siglum.match(/^P(\d+)/iu)?.[1] ?? siglum;
    return `Papyrus ${papyrusNumber} (GA ${siglum.toUpperCase()})`;
  }
  if (/^f\d/iu.test(siglum)) {
    const familyNumber = siglum.match(/^f(\d+)/iu)?.[1] ?? siglum;
    return `Family ${familyNumber} (${siglum.toLowerCase()})`;
  }
  if (/^0\d{2,3}$/u.test(siglum)) {
    return `Uncial ${siglum} (GA ${siglum})`;
  }
  if (/^\d{1,4}$/u.test(siglum)) {
    return `Minuscule ${siglum} (GA ${siglum})`;
  }
  return "";
}

function canonicalManuscriptIdentity(
  name: string,
  passage: Passage,
): CanonicalManuscriptIdentity | undefined {
  const corpus = greekCorpusForBook(passage.book);
  const siglum = candidateSiglum(name);
  if (siglum) {
    const directCatalogKey = siglum
      .replace(/^p/iu, "P")
      .replace(/^f/iu, "f");
    const catalogEntry =
      greekWitnessCatalog[directCatalogKey] ??
      resolveGreekWitness(siglum, corpus);
    if (catalogEntry?.kind === "greek-tradition") return undefined;
    if (catalogEntry) {
      return {
        key: `catalog:${catalogEntry.key}`,
        name: catalogEntry.displayName,
        siglum: `GA ${catalogEntry.key}`,
        date: catalogEntry.date.replace(
          /\s+\(base manuscript; later hand not separately dated\)$/iu,
          "",
        ),
      };
    }

    const normalizedSiglum = siglum
      .replace(/(?:\*vid|c\/mg|cvid|vid|txt|mg|supp|\*|c|S|s)$/u, "")
      .replace(/^(ℵ|א|[A-ZΔΘΣΨΦΞ])[123]$/u, "$1")
      .replace(/^p/iu, "P")
      .replace(/^f/iu, "f");
    const gaDisplay = fallbackGaDisplay(normalizedSiglum);
    if (gaDisplay) {
      return {
        key: `ga:${normalizedSiglum}`,
        name: gaDisplay,
        siglum: `GA ${normalizedSiglum}`,
      };
    }
  }

  const fallbackName = baseWitnessName(name.split(/\s+—\s+/u, 1)[0]);
  const key = normalize(fallbackName);
  if (!key) return undefined;
  return {
    key: `name:${key}`,
    name: fallbackName,
    siglum: shortSiglum(fallbackName),
  };
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
        !isAgainstKjvDirection(witness.direction)
      ) {
        continue;
      }

      if (isAggregateWitness(witness.witness)) continue;

      const compactTokens = compactGreekTokens(witness.witness);
      if (compactTokens.length) {
        const corpus = greekCorpusForBook(passage.book);
        for (const token of compactTokens) {
          rows.push({
            passage,
            role,
            witness: {
              ...witness,
              witness: compactWitnessName(token, corpus),
            },
          });
        }
        continue;
      }

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
  supports: Array<{
    passage: Passage;
    dates: string[];
    notes: string[];
    labels: string[];
  }>;
  opposes: Array<{
    passage: Passage;
    dates: string[];
    notes: string[];
    labels: string[];
  }>;
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
    if (witness.date && !existing.dates.includes(witness.date)) {
      existing.dates.push(witness.date);
    }
    if (label && !existing.labels.includes(label)) existing.labels.push(label);
    if (witness.note && !existing.notes.includes(witness.note)) {
      existing.notes.push(witness.note);
    }
    return;
  }

  target.push({
    passage,
    dates: witness.date ? [witness.date] : [],
    labels: label ? [label] : [],
    notes: witness.note ? [witness.note] : [],
  });
}

export function buildManuscriptIndex(): ManuscriptProfile[] {
  const map = new Map<string, ManuscriptProfile>();
  for (const row of [...collectGreekWitnesses("supports"), ...collectGreekWitnesses("opposes")]) {
    const identity = canonicalManuscriptIdentity(
      row.witness.witness,
      row.passage,
    );
    if (!identity) continue;
    const existing = map.get(identity.key);
    const profile =
      existing ??
      ({
        name: identity.name,
        siglum: identity.siglum,
        date: identity.date ?? row.witness.date,
        category: classifyManuscript(identity.name),
        supports: [],
        opposes: [],
      } satisfies ManuscriptProfile);

    const target = row.role === "supports" ? profile.supports : profile.opposes;
    addManuscriptEvidence(target, row.passage, row.witness);
    map.set(identity.key, profile);
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
  const base = source
    .replace(/,.*$/, "")
    .replace(/\s+\(possible\)$/i, "")
    .trim();
  const aliases: Record<string, string> = {
    Ambrose: "Ambrose of Milan",
    "Ambrose of Milan": "Ambrose of Milan",
    Basil: "Basil of Caesarea",
    "Basil of Caesarea": "Basil of Caesarea",
    Chrysostom: "John Chrysostom",
    "John Chrysostom": "John Chrysostom",
    Eusebius: "Eusebius of Caesarea",
    "Eusebius of Caesarea": "Eusebius of Caesarea",
    "Didache 8": "Didache",
    Diatessaron: "Tatian / Diatessaron",
    Tatian: "Tatian / Diatessaron",
    "Tatian / Diatessaron tradition": "Tatian / Diatessaron",
  };
  return aliases[base] ?? base;
}

const fatherRegions: Record<string, string> = {
  "Ambrose of Milan": "Milan",
  Augustine: "North Africa",
  "John Chrysostom": "Constantinople",
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
  passages: Array<{
    passage: Passage;
    witness: PatristicWitness;
    role: "supports" | "opposes" | "related";
  }>;
};

function patristicRole(
  witness: PatristicWitness,
): FatherProfile["passages"][number]["role"] {
  const role = evidenceDirectionRole(witness.reading);
  if (role === "opposes") return "opposes";
  if (role === "supports") return "supports";
  return "related";
}

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
          region: witness.region ?? fatherRegions[name] ?? "",
          passages: [],
        } satisfies FatherProfile);
      profile.passages.push({
        passage,
        witness,
        role: patristicRole(witness),
      });
      map.set(name, profile);
    }
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export type VersionProfile = {
  name: string;
  language: string;
  date: string;
  dateStart?: number;
  dateEnd?: number;
  aggregate?: boolean;
  supports: Array<{ passage: Passage; dates: string[]; notes: string[] }>;
  opposes: Array<{ passage: Passage; dates: string[]; notes: string[] }>;
  related: Array<{ passage: Passage; dates: string[]; notes: string[] }>;
};

type VersionEvidenceRole = "supports" | "opposes" | "related";

type CanonicalVersionIdentity = {
  key: string;
  name: string;
  language: string;
  date?: string;
  dateStart?: number;
  dateEnd?: number;
  aggregate?: boolean;
};

type VersionAccumulator = {
  identity: CanonicalVersionIdentity;
  dates: Set<string>;
  observedStart?: number;
  observedEnd?: number;
  supports: VersionProfile["supports"];
  opposes: VersionProfile["opposes"];
  related: VersionProfile["related"];
};

const versionCatalogEntries = Object.values(versionWitnessCatalog).filter(
  (entry) =>
    entry.kind === "latin-manuscript" ||
    entry.kind === "version-manuscript" ||
    entry.kind === "version-tradition",
);

function normalizeVersionLabel(value: string) {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("en")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

function isVersionCatalogEntry(
  entry: WitnessCatalogEntry | undefined,
): entry is WitnessCatalogEntry {
  return Boolean(
    entry &&
      (entry.kind === "latin-manuscript" ||
        entry.kind === "version-manuscript" ||
        entry.kind === "version-tradition"),
  );
}

function catalogLanguage(entry: WitnessCatalogEntry, witness: Witness) {
  const label = normalizeVersionLabel(entry.displayName);
  if (witness.kind === "latin" || /\b(?:latin|vulgate)\b/u.test(label)) {
    return "Latin";
  }
  if (witness.kind === "syriac" || /\bsyriac\b/u.test(label)) return "Syriac";
  if (
    witness.kind === "coptic" ||
    /\b(?:coptic|bohairic|sahidic|faiyumic|maeotic)\b/u.test(label)
  ) {
    return "Coptic";
  }
  if (/\barmenian\b/u.test(label)) return "Armenian";
  if (/\bgeorgian\b/u.test(label)) return "Georgian";
  if (/\bgothic\b/u.test(label)) return "Gothic";
  if (/\bethiopic\b/u.test(label)) return "Ethiopic";
  if (/\bslavonic\b/u.test(label)) return "Old Church Slavonic";
  if (/\barabic\b/u.test(label)) return "Arabic";
  return "Other ancient version";
}

function fallbackLanguage(witness: Witness) {
  if (witness.kind === "latin") return "Latin";
  if (witness.kind === "syriac") return "Syriac";
  if (witness.kind === "coptic") return "Coptic";

  const label = normalizeVersionLabel(witness.witness);
  if (/\b(?:latin|vulgate)\b/u.test(label)) return "Latin";
  if (/\b(?:syriac|peshitta|harklean|harclean|philoxenian)\b/u.test(label)) {
    return "Syriac";
  }
  if (
    /\b(?:coptic|bohairic|sahidic|faiyumic|middle egyptian|maeotic)\b/u.test(
      label,
    )
  ) {
    return "Coptic";
  }
  if (/\barmenian\b/u.test(label)) return "Armenian";
  if (/\bgeorgian\b/u.test(label)) return "Georgian";
  if (/\bgothic\b/u.test(label)) return "Gothic";
  if (/\bethiopic\b/u.test(label)) return "Ethiopic";
  if (/\bslavonic\b/u.test(label)) return "Old Church Slavonic";
  if (/\barabic\b/u.test(label)) return "Arabic";
  return undefined;
}

function specificCatalogEntry(
  witness: Witness,
  passage: Passage,
): WitnessCatalogEntry | undefined {
  const corpus = greekCorpusForBook(passage.book);
  const exact = resolveVersionWitness(witness.witness, corpus);
  if (isVersionCatalogEntry(exact)) return exact;

  const label = normalizeVersionLabel(witness.witness);
  const isNonBohairic = /\bnon bohairic\b/u.test(label);
  const displayMatch = versionCatalogEntries
    .map((entry) => ({
      entry,
      display: normalizeVersionLabel(entry.displayName),
    }))
    .filter(
      ({ display }) =>
        label === display ||
        label.startsWith(`${display} `) ||
        label.endsWith(` ${display}`),
    )
    .sort((a, b) => b.display.length - a.display.length)[0]?.entry;
  if (displayMatch) return displayMatch;

  const oldLatinPrefix = label.match(/\bold latin\s+([a-z]{1,3}\d?)\b/u);
  const oldLatinSuffix = label.match(/\bold latin\b.*\s([a-z]{1,3}\d?)$/u);
  const oldLatinSiglum = oldLatinPrefix?.[1] ?? oldLatinSuffix?.[1];
  if (oldLatinSiglum) {
    const entry = versionWitnessCatalog[`old-latin-${oldLatinSiglum}`];
    // An explicit but uncatalogued siglum (for example r1) remains its own
    // row-derived profile instead of being collapsed into an aggregate.
    return isVersionCatalogEntry(entry) ? entry : undefined;
  }

  const namedKey =
    /\bcodex fuldensis\b/u.test(label)
      ? "vulgate-fu"
      : /\b(?:vulgate lips4|leipzig (?:ms|manuscript) 4)\b/u.test(label)
      ? "vulgate-lips4"
      : /\b(?:vulgate lips5|leipzig (?:ms|manuscript) 5)\b/u.test(label)
        ? "vulgate-lips5"
        : /\b(?:vulgate lips6|leipzig (?:ms|manuscript) 6)\b/u.test(label)
          ? "vulgate-lips6"
          : /\b(?:vulgate harl|codex harleianus)\b/u.test(label)
            ? "vulgate-harl"
            : /\b(?:mae ?1|maeotic ?1|codex scheide)\b/u.test(label)
      ? "maeotic-1"
      : /\b(?:mae ?2|maeotic ?2|schøyen|schoyen)\b/u.test(label)
        ? "maeotic-2"
        : /\b(?:sinaitic syriac|syriac sinaitic)\b/u.test(label)
          ? "syriac-sinaitic"
          : /\b(?:curetonian syriac|syriac curetonian)\b/u.test(label)
            ? "syriac-curetonian"
            : /\b(?:christian palestinian syriac|palestinian syriac)\b/u.test(
                  label,
                )
              ? "palestinian-syriac"
              : /\bdiatessaron\b/u.test(label)
                ? "syriac-diatessaron"
                : /\bphiloxenian\b/u.test(label)
                  ? "syriac-philoxenian"
                  : /\b(?:harklean|harclean)\b/u.test(label)
                    ? "syriac-harklean"
                    : /\bpeshitta\b/u.test(label)
                      ? "syriac-peshitta"
                      : /\bbohairic[\s-]*g\b/u.test(label)
                        ? "bohairic-g"
                        : /\bbohairic\b/u.test(label) && !isNonBohairic
                          ? corpus === "revelation"
                            ? "bohairic-revelation"
                            : "bohairic"
                          : /\bsahidic\b/u.test(label)
                            ? "sahidic"
                            : /\bfaiyumic\b/u.test(label)
                              ? "faiyumic"
                              : /\barmenian[\s-]*c\b/u.test(label)
                                ? "armenian-c"
                                : /\barmenian[\s-]*m\b/u.test(label)
                                  ? "armenian-m"
                                  : /\bgeorgian[\s-]*ii\b/u.test(label)
                                    ? "georgian-ii"
                                    : /\bslavonic[\s-]*b\b/u.test(label)
                                      ? "slavonic-b"
                                      : /\barabic[\s-]*w\b/u.test(label)
                                        ? "arabic-w"
                                        : /\barabic[\s-]*s\b/u.test(label)
                                          ? "arabic-s"
                                          : /\barabic[\s-]*e\b/u.test(label)
                                            ? "arabic-e"
                                            : undefined;
  if (namedKey) {
    const entry = versionWitnessCatalog[namedKey];
    if (isVersionCatalogEntry(entry)) return entry;
  }

  return undefined;
}

function aggregateCatalogEntry(
  witness: Witness,
): WitnessCatalogEntry | undefined {
  const label = normalizeVersionLabel(witness.witness);
  const key =
    /\bold latin\b.*\bvulgate\b|\bvulgate\b.*\bold latin\b/u.test(label)
      ? "old-latin-vulgate"
      : /\bold latin\b/u.test(label)
        ? "old-latin-tradition"
        : /\bvulgate\b/u.test(label)
          ? "vulgate-tradition"
          : /\bsyriac\b/u.test(label)
            ? "syriac-tradition"
            : /\b(?:coptic|middle egyptian)\b/u.test(label)
              ? "coptic-tradition"
              : /\barmenian\b/u.test(label)
                ? "armenian"
                : /\bgeorgian\b/u.test(label)
                  ? "georgian"
                  : /\bgothic\b/u.test(label)
                    ? "gothic"
                    : /\bethiopic\b/u.test(label)
                      ? "ethiopic"
                      : /\bslavonic\b/u.test(label)
                        ? "slavonic"
                        : /\barabic\b/u.test(label)
                          ? "arabic"
                            : witness.kind === "latin" && witness.aggregate
                            ? "latin-tradition"
                            : witness.kind === "syriac" && witness.aggregate
                              ? "syriac-tradition"
                              : witness.kind === "coptic" && witness.aggregate
                                ? "coptic-tradition"
                                : undefined;
  const entry = key ? versionWitnessCatalog[key] : undefined;
  return isVersionCatalogEntry(entry) ? entry : undefined;
}

function canonicalVersionIdentity(
  witness: Witness,
  passage: Passage,
): CanonicalVersionIdentity | undefined {
  const label = normalizeVersionLabel(witness.witness);
  const specific = specificCatalogEntry(witness, passage);
  const explicitUncataloguedOldLatin =
    /\bold latin\s+[a-z]{1,3}\d?\b/u.test(label) && !specific;
  const entry =
    specific ??
    (explicitUncataloguedOldLatin
      ? undefined
      : aggregateCatalogEntry(witness));
  if (entry) {
    return {
      key: `catalog:${entry.key}`,
      name: entry.displayName,
      language: catalogLanguage(entry, witness),
      date: entry.date,
      dateStart: entry.dateStart,
      dateEnd: entry.dateEnd,
      aggregate: entry.aggregate,
    };
  }

  const language = fallbackLanguage(witness);
  if (!language || !label) return undefined;
  return {
    key: `row:${language}:${label}`,
    name: witness.witness.trim(),
    language,
    aggregate: witness.aggregate,
  };
}

function versionEvidenceRole(
  witness: Witness,
  listRole: "support" | "competing",
): VersionEvidenceRole {
  const role = evidenceDirectionRole(witness.direction);
  if (role === "opposes") return "opposes";
  if (role === "supports") return "supports";
  if (role === "related") return "related";
  return listRole === "support" ? "supports" : "opposes";
}

function addVersionEvidence(
  target: VersionProfile["supports"],
  passage: Passage,
  witness: Witness,
) {
  const existing = target.find((item) => item.passage.id === passage.id);
  if (existing) {
    if (witness.date && !existing.dates.includes(witness.date)) {
      existing.dates.push(witness.date);
    }
    if (witness.note && !existing.notes.includes(witness.note)) {
      existing.notes.push(witness.note);
    }
    return;
  }

  target.push({
    passage,
    dates: witness.date ? [witness.date] : [],
    notes: witness.note ? [witness.note] : [],
  });
}

function observeVersionDate(accumulator: VersionAccumulator, witness: Witness) {
  if (witness.date.trim()) accumulator.dates.add(witness.date.trim());
  const parsed = parseEvidenceDate(witness.date);
  const start = witness.dateStart ?? parsed?.start;
  const end = witness.dateEnd ?? parsed?.end;
  if (start !== undefined) {
    accumulator.observedStart =
      accumulator.observedStart === undefined
        ? start
        : Math.min(accumulator.observedStart, start);
  }
  if (end !== undefined) {
    accumulator.observedEnd =
      accumulator.observedEnd === undefined
        ? end
        : Math.max(accumulator.observedEnd, end);
  }
}

function observedVersionDate(accumulator: VersionAccumulator) {
  const dates = Array.from(accumulator.dates);
  if (dates.length === 1) return dates[0];
  if (
    accumulator.observedStart !== undefined &&
    accumulator.observedEnd !== undefined
  ) {
    return accumulator.observedStart === accumulator.observedEnd
      ? `AD ${accumulator.observedStart}`
      : `AD ${accumulator.observedStart}–${accumulator.observedEnd} (range represented by the listed witness rows)`;
  }
  return dates.join("; ");
}

export function buildVersionIndex(): VersionProfile[] {
  const map = new Map<string, VersionAccumulator>();

  for (const passage of displayedPassages) {
    const rows: Array<{
      witness: Witness;
      listRole: "support" | "competing";
    }> = [
      ...passage.latinWitnesses.map((witness) => ({
        witness,
        listRole: "support" as const,
      })),
      ...passage.versionalWitnesses.map((witness) => ({
        witness,
        listRole: "support" as const,
      })),
      ...passage.evidenceAgainst
        .filter((witness) =>
          ["latin", "syriac", "coptic", "version"].includes(
            witness.kind ?? "",
          ),
        )
        .map((witness) => ({
          witness,
          listRole: "competing" as const,
        })),
    ];

    for (const { witness, listRole } of rows) {
      const identity = canonicalVersionIdentity(witness, passage);
      if (!identity) continue;
      const accumulator =
        map.get(identity.key) ??
        ({
          identity,
          dates: new Set<string>(),
          supports: [],
          opposes: [],
          related: [],
        } satisfies VersionAccumulator);

      observeVersionDate(accumulator, witness);
      const role = versionEvidenceRole(witness, listRole);
      addVersionEvidence(accumulator[role], passage, witness);
      map.set(identity.key, accumulator);
    }
  }

  return Array.from(map.values())
    .map((accumulator): VersionProfile => ({
      name: accumulator.identity.name,
      language: accumulator.identity.language,
      date: accumulator.identity.date ?? observedVersionDate(accumulator),
      dateStart:
        accumulator.identity.dateStart ?? accumulator.observedStart,
      dateEnd: accumulator.identity.dateEnd ?? accumulator.observedEnd,
      aggregate: accumulator.identity.aggregate,
      supports: accumulator.supports,
      opposes: accumulator.opposes,
      related: accumulator.related,
    }))
    .sort(
      (a, b) =>
        (a.dateStart ?? Number.POSITIVE_INFINITY) -
          (b.dateStart ?? Number.POSITIVE_INFINITY) ||
        a.language.localeCompare(b.language) ||
        a.name.localeCompare(b.name),
    );
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
  return parseEvidenceDate(dateLabel) ?? { start: 0, end: 0 };
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
  dateStart?: number,
  dateEnd?: number,
) {
  const parsed = parseYearRange(date);
  const start = dateStart ?? parsed.start;
  const end = dateEnd ?? parsed.end;
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
    passage.greekSupportWitnesses
      .filter((witness) => !witness.aggregate && !witness.dateUncertain)
      .forEach((witness, i) =>
        pushTimelineEntry(entries, passage, "greek-support", witness.witness, witness.date, "greek", "support", witness.note, i, witness.dateStart, witness.dateEnd),
      );
    passage.latinWitnesses
      .filter((witness) => !witness.aggregate)
      .forEach((witness, i) =>
        pushTimelineEntry(entries, passage, "latin-support", witness.witness, witness.date, "latin", "support", witness.note, i, witness.dateStart, witness.dateEnd),
      );
    passage.versionalWitnesses
      .filter((witness) => !witness.aggregate)
      .forEach((witness, i) =>
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
          witness.dateStart,
          witness.dateEnd,
        ),
      );
    (passage.printedWitnesses ?? [])
      .filter((witness) => !witness.aggregate)
      .forEach((witness, i) =>
        pushTimelineEntry(entries, passage, "printed-support", witness.witness, witness.date, "printed", "support", witness.note, i, witness.dateStart, witness.dateEnd),
      );
    publicPatristicWitnesses(passage).forEach((witness, i) =>
      pushTimelineEntry(
        entries,
        passage,
        "patristic-support",
        witness.author ?? witness.source,
        witness.date,
        "patristic",
        patristicRole(witness) === "opposes" ? "oppose" : "support",
        witness.quoteSummary,
        i,
        witness.dateStart,
        witness.dateEnd,
      ),
    );
    passage.evidenceAgainst
      .filter(
        (witness) =>
          !witness.aggregate && !witness.dateUncertain,
      )
      .forEach((witness, i) => {
      if (
        witness.direction &&
        !isAgainstKjvDirection(witness.direction)
      ) {
        return;
      }
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
        witness.dateStart,
        witness.dateEnd,
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
  related: Passage[];
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
    map.get(branch)!.push({
      id: `father-${father.name}`,
      name: father.name,
      kind: "father",
      detail: `${father.dateRange} · ${father.region}`,
      supports: uniquePassages(
        father.passages
          .filter((item) => item.role === "supports")
          .map((item) => item.passage),
      ),
      opposes: uniquePassages(
        father.passages
          .filter((item) => item.role === "opposes")
          .map((item) => item.passage),
      ),
      related: uniquePassages(
        father.passages
          .filter((item) => item.role === "related")
          .map((item) => item.passage),
      ),
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
      related: uniquePassages(version.related.map((item) => item.passage)),
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
      related: [],
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
