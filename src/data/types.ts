export type EvidenceKind =
  | "greek-manuscript"
  | "latin"
  | "syriac"
  | "coptic"
  | "version"
  | "patristic"
  | "lectionary"
  | "printed"
  | "summary";

export type EvidenceDirection =
  | "FOR_KJV"
  | "AGAINST_KJV"
  | "OTHER"
  | "QUALIFICATION"
  | "RELATED_TO_KJV"
  | string;

export type SourceLink = {
  label: string;
  url?: string;
};

export type EvidenceRelationship =
  | "exact"
  | "close"
  | "related"
  | "mixed"
  | "versional"
  | "printed";

export type EarliestSupport = {
  label?: string;
  statement: string;
  earliestGreek?: string;
};

export type ReferenceEntry = {
  citation: string;
  links?: SourceLink[];
};

export type Witness = {
  witness: string;
  date: string;
  note: string;
  kind?: EvidenceKind;
  direction?: EvidenceDirection;
  unit?: string;
  confidence?: string;
  source?: string;
  sourceUrl?: string;
  lastVerified?: string;
  relationship?: EvidenceRelationship;
};

export type PatristicWitness = {
  source: string;
  date: string;
  quoteSummary: string;
  region?: string;
  author?: string;
  workSection?: string;
  reading?: EvidenceDirection;
  relationship?:
    | "explicit_quote"
    | "close_quote"
    | "parallel_tradition"
    | "mixed_citation"
    | "manuscript_report"
    | "theological_parallel";
  confidence?: string;
  sourceCitation?: string;
  sourceUrl?: string;
  lastVerified?: string;
};

export type ManuscriptSnapshot = {
  greekSupport: string;
  greekAgainst: string;
  supportCategory: string;
  lectionarySupport?: string;
  percentSupport?: string;
  mainEvidenceAgainst: string[];
};

export type TimelineEventType =
  | "patristic"
  | "greek-manuscript"
  | "latin-manuscript"
  | "ancient-version"
  | "printed-edition"
  | "reformation-bible"
  | "lectionary";

export type TimelineEvent = {
  date: string;
  label: string;
  type: TimelineEventType;
};

export type Passage = {
  id: string;
  slug: string;
  reference: string;
  book: string;
  biblicalOrder: number;
  title: string;
  readingSupported: string;
  kjvText: string;
  variantIssue: string;
  variantType: string[];
  tags: string[];
  supportCategory: string;
  shortSummary: string;
  supportScore?: number;
  oppositionScore?: number;
  controversyScore?: number;
  earliestPatristicYear?: number;
  lastVerified?: string;
  disputedUnit?: string;
  cautions?: string[];
  sourceLinks?: SourceLink[];
  earliestSupport?: EarliestSupport[];
  references?: ReferenceEntry[];
  manuscriptSnapshot: ManuscriptSnapshot;
  greekSupportWitnesses: Witness[];
  latinWitnesses: Witness[];
  versionalWitnesses: Witness[];
  patristicWitnesses: PatristicWitness[];
  evidenceAgainst: Witness[];
  printedWitnesses?: Witness[];
  timeline: TimelineEvent[];
  sources: string[];
};
