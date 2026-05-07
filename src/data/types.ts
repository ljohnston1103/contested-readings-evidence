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

export type Witness = {
  witness: string;
  date: string;
  note: string;
  kind?: EvidenceKind;
};

export type PatristicWitness = {
  source: string;
  date: string;
  quoteSummary: string;
  region?: string;
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
  supportScore: number;
  oppositionScore: number;
  controversyScore: number;
  earliestPatristicYear?: number;
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
