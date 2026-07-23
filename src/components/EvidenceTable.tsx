"use client";

import { Fragment, useMemo, useState } from "react";

import { dedupeWitnessRows } from "@/data/derived";
import type { Witness } from "@/data/types";
import {
  isAgainstKjvDirection,
  isForKjvDirection,
} from "@/data/evidenceDirection";

type EvidenceTableProps = {
  title?: string;
  rows: Witness[];
  columns?: [string, string, string];
  searchable?: boolean;
};

type StructuredWitness = Witness & {
  dateStart?: number | string;
  dateEnd?: number | string;
  unitId?: string;
  unitLabel?: string;
};

type YearRange = {
  start: number;
  end: number;
};

const ordinalWords: Record<string, number> = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  fifth: 5,
  sixth: 6,
  seventh: 7,
  eighth: 8,
  ninth: 9,
  tenth: 10,
  eleventh: 11,
  twelfth: 12,
  thirteenth: 13,
  fourteenth: 14,
  fifteenth: 15,
  sixteenth: 16,
  seventeenth: 17,
  eighteenth: 18,
  nineteenth: 19,
  twentieth: 20,
  "twenty-first": 21,
};

const ordinalWordPattern = Object.keys(ordinalWords)
  .sort((a, b) => b.length - a.length)
  .join("|");

function numericValue(value: number | string | undefined) {
  if (typeof value === "number") {
    return Number.isFinite(value) && value > 0 ? value : undefined;
  }
  if (typeof value !== "string" || !value.trim()) return undefined;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function centurySegment(
  century: number,
  qualifier?: string,
): YearRange {
  const firstYear = (century - 1) * 100 + 1;
  const lastYear = century * 100;
  const normalizedQualifier = qualifier?.toLowerCase();

  if (normalizedQualifier === "early") {
    return { start: firstYear, end: firstYear + 32 };
  }
  if (normalizedQualifier === "mid" || normalizedQualifier === "middle") {
    return { start: firstYear + 33, end: firstYear + 65 };
  }
  if (normalizedQualifier === "late") {
    return { start: firstYear + 66, end: lastYear };
  }
  return { start: firstYear, end: lastYear };
}

/**
 * Parse public-facing manuscript date labels for chronological display.
 * The data pipeline may provide structured bounds; this fallback handles the
 * labels already in the catalogue, including "fifth century",
 * "late 4th–5th century", "c. AD 400s", and abbreviated ranges such as
 * "AD 1558/59".
 */
function parseDateLabel(dateLabel: string): YearRange | undefined {
  if (!dateLabel.trim()) return undefined;

  const normalized = dateLabel
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[‐‑‒–—−]/g, "-")
    .replace(
      new RegExp(`\\b(${ordinalWordPattern})\\b`, "gi"),
      (word) => `${ordinalWords[word.toLowerCase()]}th`,
    )
    .replace(/\s+/g, " ")
    .trim();

  const centuryMatch = normalized.match(
    /\b(?:(early|mid|middle|late)\s+)?(\d{1,2})(?:st|nd|rd|th)\s*(?:(?:-|to|through|\/)\s*(?:(early|mid|middle|late)\s+)?(\d{1,2})(?:st|nd|rd|th))?\s*(?:centur(?:y|ies)|cent\.?|c\.)(?!\w)/i,
  );
  if (centuryMatch) {
    const first = centurySegment(
      Number.parseInt(centuryMatch[2], 10),
      centuryMatch[1],
    );
    if (!centuryMatch[4]) return first;
    const last = centurySegment(
      Number.parseInt(centuryMatch[4], 10),
      centuryMatch[3],
    );
    return {
      start: Math.min(first.start, last.start),
      end: Math.max(first.end, last.end),
    };
  }

  const yearMatch = normalized.match(
    /\b(?:ad\s*)?(\d{3,4})(s)?(?:\s*(?:-|to|through|\/)\s*(?:ad\s*)?(\d{2,4})(s)?)?/i,
  );
  if (!yearMatch) return undefined;

  const firstYear = Number.parseInt(yearMatch[1], 10);
  const firstEnd = yearMatch[2] ? firstYear + 99 : firstYear;
  let lastYear = yearMatch[3]
    ? Number.parseInt(yearMatch[3], 10)
    : firstEnd;

  if (yearMatch[3] && yearMatch[3].length < yearMatch[1].length) {
    const magnitude = 10 ** yearMatch[3].length;
    lastYear = Math.floor(firstYear / magnitude) * magnitude + lastYear;
    if (lastYear < firstYear) lastYear += magnitude;
  }
  if (yearMatch[4]) lastYear += 99;

  let start = firstYear;
  let end = Math.max(firstEnd, lastYear);
  if (/\bbefore\b/i.test(normalized)) start = Math.max(1, firstYear - 40);
  if (/\bafter\b|\bonward\b/i.test(normalized)) end += 40;

  return { start, end };
}

function witnessDateRange(row: StructuredWitness): YearRange | undefined {
  const structuredStart = numericValue(row.dateStart);
  const structuredEnd = numericValue(row.dateEnd);
  if (structuredStart || structuredEnd) {
    const start = structuredStart ?? structuredEnd!;
    const end = structuredEnd ?? structuredStart!;
    return { start: Math.min(start, end), end: Math.max(start, end) };
  }
  return parseDateLabel(row.date);
}

function unitDetails(row: StructuredWitness) {
  const label = row.unitLabel?.trim() || row.unit?.trim() || "";
  const key = row.unitId?.trim() || label || "__general-evidence";
  return { key, label };
}

function unitHeadingKind(label: string) {
  return /\b(?:evidence|witness(?:es)?)\b/i.test(label)
    ? "Evidence group"
    : "Textual unit";
}

function relationshipLabel(row: Witness) {
  if (isAgainstKjvDirection(row.direction)) return "Competing witness";
  if (row.relationship === "exact") return "Exact reading";
  if (row.relationship === "close") return "Close quotation";
  if (row.relationship === "related") return "Related evidence";
  if (row.relationship === "mixed") return "Mixed citation";
  if (row.relationship === "versional") return "Versional witness";
  if (row.relationship === "printed") return "Printed edition";
  if (isForKjvDirection(row.direction)) return "Supporting witness";
  return "";
}

export function EvidenceTable({
  title,
  rows,
  columns = ["Witness", "Public evidence date", "Witness-specific qualification"],
  searchable = true,
}: EvidenceTableProps) {
  const [query, setQuery] = useState("");
  const uniqueRows = useMemo(() => dedupeWitnessRows(rows), [rows]);
  const filteredRows = useMemo(() => {
    const needle = query.toLowerCase().trim();
    if (!needle) return uniqueRows;
    return uniqueRows.filter((row) =>
      `${row.direction ?? ""} ${(row as StructuredWitness).unitLabel ?? row.unit ?? ""} ${row.witness} ${row.date} ${row.note}`
        .toLowerCase()
        .includes(needle),
    );
  }, [query, uniqueRows]);
  const groupedRows = useMemo(() => {
    const groups = new Map<
      string,
      {
        label: string;
        rows: Array<{
          row: StructuredWitness;
          sourceIndex: number;
          range?: YearRange;
          dateUncertain: boolean;
        }>;
      }
    >();

    filteredRows.forEach((rawRow, sourceIndex) => {
      const row = rawRow as StructuredWitness;
      const unit = unitDetails(row);
      const existing = groups.get(unit.key) ?? { label: unit.label, rows: [] };
      existing.rows.push({
        row,
        sourceIndex,
        range: witnessDateRange(row),
        dateUncertain: Boolean(row.dateUncertain),
      });
      groups.set(unit.key, existing);
    });

    return Array.from(groups.values()).map((group) => {
      const rows = group.rows
        .sort(
          (a, b) =>
            Number(a.dateUncertain) - Number(b.dateUncertain) ||
            (a.range?.start ?? Number.POSITIVE_INFINITY) -
              (b.range?.start ?? Number.POSITIVE_INFINITY) ||
            (a.range?.end ?? Number.POSITIVE_INFINITY) -
              (b.range?.end ?? Number.POSITIVE_INFINITY) ||
            a.sourceIndex - b.sourceIndex,
        )
        .map(({ row }) => row);
      const relationshipLabels = new Set(
        rows.map(relationshipLabel).filter(Boolean),
      );
      return {
        ...group,
        rows,
        sharedRelationship:
          relationshipLabels.size === 1
            ? Array.from(relationshipLabels)[0]
            : "",
      };
    });
  }, [filteredRows]);
  const showUnitHeadings = groupedRows.some(
    (group) => group.label || group.sharedRelationship,
  );

  if (!uniqueRows.length) {
    return (
      <div className="rounded-3xl border border-dashed border-ink-200 p-6 text-sm text-ink-600 dark:border-white/10 dark:text-ink-100/70">
        No witness is listed in this section.
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-ink-200 bg-white/80 shadow-card dark:border-white/10 dark:bg-white/[0.05]">
      {(title || searchable) && (
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink-100 p-4 dark:border-white/10">
          {title && (
            <h3 className="font-display text-2xl font-black text-ink-900 dark:text-white">
              {title}
            </h3>
          )}
          {searchable && uniqueRows.length > 5 && (
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="min-w-0 rounded-2xl border border-ink-200 bg-white px-4 py-2 text-sm outline-none transition focus:border-archive-gold dark:border-white/10 dark:bg-white/5 dark:text-white"
              placeholder="Search this table"
              aria-label={`Search ${title ?? "evidence"} table`}
            />
          )}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-ink-50 text-ink-600 dark:bg-white/5 dark:text-ink-100/70">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-5 py-3 font-black">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100 dark:divide-white/10">
            {groupedRows.length ? (
              groupedRows.map((group, groupIndex) => (
                <Fragment key={`evidence-group-${group.label}-${groupIndex}`}>
                  {showUnitHeadings && (
                    <tr
                      className="bg-archive-teal/[0.07] dark:bg-archive-teal/10"
                    >
                      <th colSpan={columns.length} className="px-5 py-3 text-left">
                        <span className="mr-2 text-[0.66rem] font-black uppercase tracking-[0.18em] text-archive-teal dark:text-teal-200">
                          {unitHeadingKind(group.label || "General evidence")}
                        </span>
                        <span className="font-display text-base font-black text-ink-900 dark:text-white">
                          {group.label || "General evidence"}
                        </span>
                        {group.sharedRelationship && (
                          <span className="ml-3 inline-flex rounded-full bg-archive-teal/10 px-2.5 py-1 text-[0.66rem] font-black uppercase tracking-[0.12em] text-archive-teal dark:text-teal-200">
                            {group.sharedRelationship}
                          </span>
                        )}
                      </th>
                    </tr>
                  )}
                  {group.rows.map((row, index) => {
                    const badge = relationshipLabel(row);
                    const showRelationshipBadge =
                      badge && badge !== group.sharedRelationship;
                    return (
                      <tr
                        key={`${row.direction ?? ""}-${row.unitId ?? row.unit ?? ""}-${row.witness}-${index}`}
                        className="align-top transition hover:bg-archive-gold/10 dark:hover:bg-white/5"
                      >
                        <td className="px-5 py-4">
                          <p className="font-bold text-ink-900 dark:text-white">
                            {row.witness}
                          </p>
                          {row.aggregate && (
                            <span className="mt-2 mr-2 inline-flex rounded-full bg-violet-100 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-violet-800 dark:bg-violet-300/15 dark:text-violet-200">
                              Aggregate / tradition
                            </span>
                          )}
                          {showRelationshipBadge && (
                            <span className="mt-2 inline-flex rounded-full bg-archive-teal/10 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-archive-teal dark:text-teal-200">
                              {badge}
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-ink-600 dark:text-ink-100/70">
                          {row.date.trim() ? (
                            <>
                              <span className="inline-flex rounded-lg border-2 border-archive-gold/60 bg-archive-gold/15 px-3 py-1.5 text-xs font-black tracking-wide text-amber-900 shadow-[0_2px_0_rgba(180,135,35,0.18)] dark:border-archive-gold/70 dark:bg-archive-gold/15 dark:text-amber-100">
                                {row.date}
                              </span>
                              {row.dateUncertain && (
                                <span className="mt-2 block max-w-xs text-[0.7rem] font-bold leading-4 text-amber-800 dark:text-amber-200">
                                  Later contribution; its exact date is not independently established.
                                </span>
                              )}
                              {row.dateSource && (
                                <span className="mt-2 block max-w-xs text-[0.68rem] leading-4 text-ink-500 dark:text-ink-100/55">
                                  Dating source:{" "}
                                  {row.dateSourceUrl ? (
                                    <a
                                      href={row.dateSourceUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="font-bold underline decoration-archive-gold/60 underline-offset-2 hover:text-archive-teal dark:hover:text-teal-200"
                                    >
                                      {row.dateSource}
                                    </a>
                                  ) : (
                                    row.dateSource
                                  )}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-ink-400 dark:text-ink-100/35" aria-label="Date not specified">
                              —
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4 leading-6 text-ink-700 dark:text-ink-100/75">
                          {row.note ? (
                            <p>{row.note}</p>
                          ) : (
                            <span
                              className="text-ink-400 dark:text-ink-100/35"
                              aria-label="No additional witness-specific qualification"
                            >
                              —
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </Fragment>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-8 text-center text-ink-500 dark:text-ink-100/60"
                >
                  No evidence matches this search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
