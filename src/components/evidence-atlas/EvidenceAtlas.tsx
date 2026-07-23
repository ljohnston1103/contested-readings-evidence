import { displayedPassages } from "@/data/derived";
import {
  isCompetingEvidenceDirection,
  isRelatedEvidenceDirection,
} from "@/data/evidenceDirection";
import type { Passage } from "@/data/types";

import {
  EvidenceAtlasExplorer,
  type EvidenceAtlasDatum,
} from "./EvidenceAtlasExplorer";

type EvidenceAtlasProps = {
  passages?: Passage[];
  initialPassageSlug?: string;
  className?: string;
};

function toAtlasDatum(passage: Passage): EvidenceAtlasDatum {
  const records = {
    greek: passage.greekSupportWitnesses.filter((row) => !row.aggregate).length,
    latin: passage.latinWitnesses.filter((row) => !row.aggregate).length,
    versions: passage.versionalWitnesses.filter((row) => !row.aggregate).length,
    fathers: passage.patristicWitnesses.length,
    printed:
      passage.printedWitnesses?.filter((row) => !row.aggregate).length ?? 0,
    against: passage.evidenceAgainst.filter(
      (record) =>
        !record.aggregate &&
        isCompetingEvidenceDirection(record.direction),
    ).length,
    other: passage.evidenceAgainst.filter(
      (record) =>
        !record.aggregate &&
        isRelatedEvidenceDirection(record.direction),
    ).length,
  };

  return {
    slug: passage.slug,
    reference: passage.reference,
    title: passage.title,
    book: passage.book,
    biblicalOrder: passage.biblicalOrder,
    reading: passage.readingSupported,
    variantTypes: passage.variantType,
    records,
    totalRecords: Object.values(records).reduce((total, count) => total + count, 0),
  };
}

/**
 * A server wrapper that keeps the full passage corpus out of the client bundle.
 * Only the compact, reproducible row counts needed by the visualization cross
 * the server/client boundary.
 */
export function EvidenceAtlas({
  passages = displayedPassages,
  initialPassageSlug,
  className,
}: EvidenceAtlasProps) {
  const data = passages
    .map(toAtlasDatum)
    .sort((a, b) => a.biblicalOrder - b.biblicalOrder);

  return (
    <EvidenceAtlasExplorer
      data={data}
      initialPassageSlug={initialPassageSlug}
      className={className}
    />
  );
}
