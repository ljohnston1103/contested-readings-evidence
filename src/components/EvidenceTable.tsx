"use client";

import { useMemo, useState } from "react";

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

type DisplayRow = {
  row: Witness;
  sourceIndex: number;
  range?: EvidenceDateRange;
  dateUncertain: boolean;
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

function evidenceSpan(rows: Witness[]) {
  const ranges = rows
    .map((row) => witnessDateRange(row))
    .filter((range): range is EvidenceDateRange => Boolean(range));
  if (!ranges.length) return "Not catalogued";
  const start = Math.min(...ranges.map((range) => range.start));
  const end = Math.max(...ranges.map((range) => range.end));
  return start === end ? `AD ${start}` : `AD ${start}\u2013${end}`;
}

function isCollectivePrintedEdition(row: Witness) {
  return (
    row.kind === "printed" &&
    /\b(?:editions|edition series|printed tradition)\b/iu.test(row.witness)
  );
}

function isAggregateRow(row: Witness) {
  return Boolean(row.aggregate || isCollectivePrintedEdition(row));
}

function evidenceScope(row: Witness) {
  if (!isAggregateRow(row)) return "Named witness";
  if (isCollectivePrintedEdition(row)) return "Edition group";

  const label = row.witness.normalize("NFKC");
  const text = `${label} ${row.note}`.normalize("NFKC");

  const boundedSample = text.match(
    /\b(\d[\d,]*)\s+(?:out\s+)?of\s+(\d[\d,]*)\b/iu,
  );
  if (boundedSample?.[1] && boundedSample[2]) {
    const numerator = Number(boundedSample[1].replaceAll(",", ""));
    const denominator = Number(boundedSample[2].replaceAll(",", ""));
    if (denominator > 0 && numerator <= denominator) {
      return `${boundedSample[1]} of ${boundedSample[2]} in cited set (≈${Math.round(
        (numerator / denominator) * 100,
      )}%)`;
    }
  }

  const percentageRange = text.match(
    /\b(approximately|about|roughly|c\.?\s*)?(\d+(?:\.\d+)?)\s*[–-]\s*(\d+(?:\.\d+)?)\s*(?:percent|%)/iu,
  );
  if (percentageRange?.[2] && percentageRange[3]) {
    const qualifier = percentageRange[1] ? "About " : "";
    return `${qualifier}${percentageRange[2]}–${percentageRange[3]}% of cited set`;
  }
  const percentage = text.match(
    /\b(approximately|about|roughly|c\.?\s*)?(\d+(?:\.\d+)?)\s*(?:percent|%)/iu,
  );
  if (percentage?.[2]) {
    const qualifier = percentage[1] ? "About " : "";
    return `${qualifier}${percentage[2]}% of cited set`;
  }

  const countedRange = label.match(
    /\b(\d[\d,]*)\s*(?:to|[–—-])\s*(\d[\d,]*)\s+(?:(?:principal|named|cited|Greek|Latin)\s+)*(?:manuscripts?|witnesses?|copies|lectionaries)\b/iu,
  );
  if (countedRange?.[1] && countedRange[2]) {
    return `${countedRange[1]}–${countedRange[2]} cited witnesses`;
  }

  const counted = label.match(
    /\b(\d[\d,]*(?:\+)?)\s+(?:(?:principal|named|cited|Greek|Latin)\s+)*(?:manuscripts?|witnesses?|copies|lectionaries)\b/iu,
  );
  if (counted?.[1]) return `${counted[1]} cited witnesses`;

  const writtenCount = label.match(
    /\b(one|two|three)\s+(?:(?:principal|named|cited|Latin|Greek)\s+)*(?:manuscripts?|witnesses?|copies)\b/iu,
  );
  if (writtenCount?.[1]) {
    const count = { one: "1", two: "2", three: "3" }[
      writtenCount[1].toLowerCase() as "one" | "two" | "three"
    ];
    return `${count} cited ${count === "1" ? "witness" : "witnesses"}`;
  }

  return null;
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
  const aggregateCount = useMemo(
    () => uniqueRows.filter(isAggregateRow).length,
    [uniqueRows],
  );
  const namedCount = uniqueRows.length - aggregateCount;
  const span = useMemo(() => evidenceSpan(uniqueRows), [uniqueRows]);
  const filteredRows = useMemo(() => {
    const needle = query.toLowerCase().trim();
    if (!needle) return uniqueRows;
    return uniqueRows.filter((row) =>
      `${row.direction ?? ""} ${row.unitLabel ?? row.unit ?? ""} ${row.witness} ${row.date} ${displayDate(row, witnessDateRange(row))} ${row.note}`
        .toLowerCase()
        .includes(needle),
    );
  }, [query, uniqueRows]);
  const displayRows = useMemo<DisplayRow[]>(
    () =>
      filteredRows
      .map((row, sourceIndex) => ({
        row,
        sourceIndex,
        range: witnessDateRange(row),
        dateUncertain: Boolean(row.dateUncertain),
      }))
      .sort(
        (a, b) =>
          Number(!isAggregateRow(a.row)) - Number(!isAggregateRow(b.row)) ||
          (a.range?.start ?? Number.POSITIVE_INFINITY) -
            (b.range?.start ?? Number.POSITIVE_INFINITY) ||
          (a.range?.end ?? Number.POSITIVE_INFINITY) -
            (b.range?.end ?? Number.POSITIVE_INFINITY) ||
          Number(a.dateUncertain) - Number(b.dateUncertain) ||
          a.sourceIndex - b.sourceIndex,
      ),
    [filteredRows],
  );

  if (!uniqueRows.length) {
    return (
      <div className="overflow-hidden rounded-[2rem] border border-ink-200 bg-white/80 shadow-card dark:border-white/10 dark:bg-white/[0.05]">
        {title && (
          <div className="border-b border-ink-100 p-4 dark:border-white/10">
            <h3 className="font-display text-2xl font-black text-ink-900 dark:text-white">
              {title}
            </h3>
          </div>
        )}
        <div className="grid gap-3 border-b border-ink-100 bg-ink-50/60 p-4 dark:border-white/10 dark:bg-white/[0.025] sm:grid-cols-3">
          <EvidenceStat label="Catalogued records" value="0" />
          <EvidenceStat label="Named / aggregate" value="0 / 0" />
          <EvidenceStat label="Date span" value="Not catalogued" />
        </div>
        <p className="p-6 text-sm leading-6 text-ink-600 dark:text-ink-100/70">
          No passage-specific evidence is individually catalogued in this
          section. The tab remains in the same position on every passage page
          so comparisons follow one consistent pattern.
        </p>
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
      <div className="grid gap-3 border-b border-ink-100 bg-ink-50/60 p-4 dark:border-white/10 dark:bg-white/[0.025] sm:grid-cols-3">
        <EvidenceStat
          label="Catalogued records"
          value={uniqueRows.length.toLocaleString()}
        />
        <EvidenceStat
          label="Named / aggregate"
          value={`${namedCount.toLocaleString()} / ${aggregateCount.toLocaleString()}`}
        />
        <EvidenceStat label="Date span" value={span} />
      </div>
      {aggregateCount > 0 && (
        <p className="border-b border-ink-100 px-5 py-3 text-xs leading-5 text-ink-500 dark:border-white/10 dark:text-ink-100/55">
          Tradition summaries appear first; named witnesses follow from oldest
          to newest. A percentage appears only when the source gives a total for
          this passage or explicitly states a percentage. Named rows are
          examples unless a note identifies a complete collated set.
        </p>
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
            {displayRows.length ? (
              displayRows.map(({ row, range }, index) => {
                const badge = relationshipLabel(row);
                const aggregate = isAggregateRow(row);
                const scope = evidenceScope(row);
                const unit = unitDetails(row);
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
                      {unit.label && (
                        <p className="mt-1 text-xs leading-5 text-ink-600 dark:text-ink-100/65">
                          <span className="mr-1.5 font-black uppercase tracking-[0.12em] text-archive-teal dark:text-teal-200">
                            {unitHeadingKind(unit.label)}
                          </span>
                          {unit.label}
                        </p>
                      )}
                      {aggregate && (
                        <span className="mt-2 mr-2 inline-flex rounded-full bg-violet-100 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-violet-800 dark:bg-violet-300/15 dark:text-violet-200">
                          Aggregate / tradition
                        </span>
                      )}
                      {scope && (
                        <span
                          className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[0.68rem] font-black tracking-[0.04em] ${
                            aggregate
                              ? "bg-archive-gold/15 text-amber-900 dark:bg-archive-gold/15 dark:text-amber-100"
                              : "bg-archive-teal/10 text-archive-teal dark:bg-teal-200/10 dark:text-teal-200"
                          }`}
                        >
                          {scope}
                        </span>
                      )}
                      {badge && (
                        <span className="mt-2 ml-2 inline-flex rounded-full bg-archive-teal/10 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-archive-teal dark:text-teal-200">
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
              })
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

function EvidenceStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white/75 px-4 py-3 dark:border-white/10 dark:bg-white/[0.04]">
      <p className="text-[0.66rem] font-black uppercase tracking-[0.16em] text-ink-500 dark:text-ink-100/55">
        {label}
      </p>
      <p className="mt-1 font-bold text-ink-900 dark:text-white">{value}</p>
    </div>
  );
}
