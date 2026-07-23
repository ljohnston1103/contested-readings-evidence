export type EvidenceDirectionRole =
  | "supports"
  | "opposes"
  | "related"
  | "unspecified";

function normalizedDirection(value: string | undefined) {
  return value?.trim().toUpperCase() ?? "";
}

export function isAgainstKjvDirection(value: string | undefined) {
  const direction = normalizedDirection(value);
  return (
    direction.includes("AGAINST_KJV") ||
    direction.startsWith("AGAINST")
  );
}

export function isForKjvDirection(value: string | undefined) {
  const direction = normalizedDirection(value);
  return (
    direction.includes("FOR_KJV") ||
    direction.startsWith("FOR_TRADITIONAL")
  );
}

export function evidenceDirectionRole(
  value: string | undefined,
): EvidenceDirectionRole {
  if (!value?.trim()) return "unspecified";
  if (isAgainstKjvDirection(value)) return "opposes";
  if (isForKjvDirection(value)) return "supports";
  return "related";
}

export function isCompetingEvidenceDirection(value: string | undefined) {
  return !value?.trim() || isAgainstKjvDirection(value);
}

export function isRelatedEvidenceDirection(value: string | undefined) {
  return evidenceDirectionRole(value) === "related";
}
