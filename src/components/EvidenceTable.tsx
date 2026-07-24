"use client";

import { Fragment, useMemo, useState } from "react";

import { dedupeWitnessRows } from "@/data/derived";
import {
  formatWitnessDate,
  witnessDateRange,
  type EvidenceDateRange,
} from "@/data/evidenceDates";
import type { Witness } from "@/data/types";
import {
  isAgainstKjvDirection,
  isForKjvDirection,
} from "@/data/evidenceDirection";
import { witnessRowSources } from "@/lib/evidenceSources";

import { SourcesStrip } from "./SourcesStrip";

type EvidenceTableProps = {
  title?: string;
  rows: Witness[];
  columns?: [string, string, string];
  searchable?: boolean;
};

const DATE_UNCERTAIN_NOTE =
  "Added by a later hand; exactly when is not known.";

// The generic "later hand" caveat is redundant when the row's own note already
// explains that the reading is a later correction or margin addition.
function noteExplainsLaterHand(note: string) {
  return /later hand|not separately dated|not the date of the later|later marginal addition|not independently dated/i.test(
    note,
  );
}

function unitDetails(row: Witness) {
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

function displayDate(row: Witness, range: EvidenceDateRange | undefined) {
  return formatWitnessDate(row.date, range);
}

export function EvidenceTable({
  title,
  rows,
  columns = ["Witness", "Date range", "Notes"],
  searchable = true,
}: EvidenceTableProps) {
  const [query, setQuery] = useState("");
  const uniqueRows = useMemo(() => dedupeWitnessRows(rows), [rows]);
  const sources = useMemo(() => witnessRowSources(uniqueRows), [uniqueRows]);
  const filteredRows = useMemo(() => {
    const needle = query.toLowerCase().trim();
    if (!needle) return uniqueRows;
    return uniqueRows.filter((row) =>
      `${row.direction ?? ""} ${row.unitLabel ?? row.unit ?? ""} ${row.witness} ${row.date} ${displayDate(row, witnessDateRange(row))} ${row.note}`
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
          row: Witness;
          sourceIndex: number;
          range?: EvidenceDateRange;
          dateUncertain: boolean;
        }>;
      }
    >();

    filteredRows.forEach((row, sourceIndex) => {
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
      const rows = group.rows.sort(
        (a, b) =>
          Number(a.dateUncertain) - Number(b.dateUncertain) ||
          (a.range?.start ?? Number.POSITIVE_INFINITY) -
            (b.range?.start ?? Number.POSITIVE_INFINITY) ||
          (a.range?.end ?? Number.POSITIVE_INFINITY) -
            (b.range?.end ?? Number.POSITIVE_INFINITY) ||
          a.sourceIndex - b.sourceIndex,
      );
      const relationshipLabels = new Set(
        rows.map(({ row }) => relationshipLabel(row)).filter(Boolean),
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
      {sources.length > 0 && (
        <div className="border-b border-ink-100 p-4 dark:border-white/10">
          <SourcesStrip sources={sources} />
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
                  {group.rows.map(({ row, range }, index) => {
                    const badge = relationshipLabel(row);
                    const showRelationshipBadge =
                      badge && badge !== group.sharedRelationship;
                    const date = displayDate(row, range);
                    return (
                      <tr
                        key={`${row.direction ?? ""}-${row.unitId ?? row.unit ?? ""}-${row.witness}-${index}`}
                        className="align-top transition even:bg-ink-50/50 hover:bg-archive-gold/10 dark:even:bg-white/[0.03] dark:hover:bg-white/5"
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
                        <td className="whitespace-nowrap px-5 py-4 text-ink-600 dark:text-ink-100/70">
                          {date ? (
                            <span className="inline-flex rounded-lg border border-archive-gold/50 bg-archive-gold/10 px-3 py-1.5 text-xs font-black tracking-wide text-amber-900 dark:border-archive-gold/60 dark:bg-archive-gold/15 dark:text-amber-100">
                              {date}
                            </span>
                          ) : (
                            <span className="text-ink-400 dark:text-ink-100/35" aria-label="Date not specified">
                              —
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4 leading-6 text-ink-700 dark:text-ink-100/75">
                          {row.note || (row.dateUncertain && !noteExplainsLaterHand(row.note)) ? (
                            <>
                              {row.note && <p>{row.note}</p>}
                              {row.dateUncertain && !noteExplainsLaterHand(row.note) && (
                                <p className="mt-1 text-[0.78rem] font-bold leading-5 text-amber-800 dark:text-amber-200">
                                  {DATE_UNCERTAIN_NOTE}
                                </p>
                              )}
                            </>
                          ) : (
                            <span
                              className="text-ink-400 dark:text-ink-100/35"
                              aria-label="No additional note"
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
