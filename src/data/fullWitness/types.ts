/**
 * Audited, source-scoped witness rosters for the 51 displayed dossiers.
 *
 * One record per passage. Each record supplies the exact variation unit(s), the
 * governing apparatus and its scope, the full roster recovered for each reading,
 * the verified patristic evidence, and the works that prove those readings.
 *
 * The same record drives two surfaces: the ordinary passage page (summary,
 * disputed unit, snapshot counts, source links) and the Full witness
 * information page (complete rosters). There is therefore only one roster.
 */

export type WitnessTone =
  /** Reads the exact KJV/TR text at the whole unit. */
  | "support"
  /** Reads a competing text at the unit. */
  | "competing"
  /** Related, partial, expanded, reordered, relocated, mixed or corrected. */
  | "related"
  /** Lacunose, deficient, nonextant, unassigned, or outside the source corpus. */
  | "neutral";

export type WitnessGroup = {
  /** Heading for the roster, e.g. "Greek manuscripts". */
  label: string;
  tone: WitnessTone;
  /** Reading text or form this group carries, when it differs from the unit's. */
  reading?: string;
  /** Space-separated sigla, preserved exactly as the governing source prints them. */
  witnesses?: string;
  /** Unexpanded group sigla such as Byz, Maj, or a version family. */
  aggregates?: string;
  /** One short factual line where the siglum alone is not self-explanatory. */
  note?: string;
};

export type WitnessUnit = {
  /** Anchor-safe id, unique inside the passage. */
  id: string;
  /** The exact variation unit. */
  label: string;
  /** The KJV/TR reading at this unit. */
  reading?: string;
  groups: WitnessGroup[];
};

export type FatherUse =
  | "Direct quotation"
  | "Close quotation"
  | "Textual comment"
  | "Manuscript report"
  | "Allusion"
  | "Parallel tradition"
  | "Indirect report"
  | "Derivative use";

export type FatherRow = {
  author: string;
  work: string;
  date: string;
  use: FatherUse;
  reading: "Supports the KJV reading" | "Competing reading" | "Related";
  locator: string;
  url?: string;
  /** Transmission language when the surviving evidence is a translation. */
  transmission?: string;
};

export type SourceRow = {
  label: string;
  url?: string;
  /** Exact unit, page, section, or record id inside that work. */
  locator?: string;
};

export type Snapshot = {
  greekSupport: string;
  greekAgainst: string;
  supportCategory: string;
  percentSupport?: string;
  mainEvidenceAgainst: string[];
};

export type FullWitnessEntry = {
  slug: string;
  reference: string;
  /** Replaces the dossier's short summary. */
  summary: string;
  /** Replaces the dossier's disputed-unit statement. */
  unit: string;
  /** Governing apparatus and the corpus it collates. */
  scope: string;
  snapshot: Snapshot;
  sources: SourceRow[];
  units: WitnessUnit[];
  fathers: FatherRow[];
  /** Short factual distinctions shown in the passage's evidence-notes card. */
  notes?: string[];
};

export function witnessList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

export function countWitnesses(group: WitnessGroup) {
  return witnessList(group.witnesses).length;
}
