"use client";

import { useMemo, useState } from "react";

import { dedupeWitnessRows } from "@/data/derived";
import type { Witness } from "@/data/types";

type EvidenceTableProps = {
  title?: string;
  rows: Witness[];
  columns?: [string, string, string];
  searchable?: boolean;
};

function relationshipLabel(row: Witness) {
  if (row.direction?.startsWith("AGAINST")) return "Competing witness";
  if (row.relationship === "exact") return "Exact reading";
  if (row.relationship === "close") return "Close quotation";
  if (row.relationship === "related") return "Related evidence";
  if (row.relationship === "mixed") return "Mixed citation";
  if (row.relationship === "versional") return "Versional witness";
  if (row.relationship === "printed") return "Printed edition";
  return "Evidence record";
}

export function EvidenceTable({
  title,
  rows,
  columns = ["Witness", "Public evidence date", "Reading / note"],
  searchable = true,
}: EvidenceTableProps) {
  const [query, setQuery] = useState("");
  const uniqueRows = useMemo(() => dedupeWitnessRows(rows), [rows]);
  const filteredRows = useMemo(() => {
    const needle = query.toLowerCase().trim();
    if (!needle) return uniqueRows;
    return uniqueRows.filter((row) =>
      `${row.direction ?? ""} ${row.unit ?? ""} ${row.witness} ${row.date} ${row.note}`
        .toLowerCase()
        .includes(needle),
    );
  }, [query, uniqueRows]);

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
            {filteredRows.map((row, index) => (
              <tr
                key={`${row.direction ?? ""}-${row.unit ?? ""}-${row.witness}-${index}`}
                className="align-top transition hover:bg-archive-gold/10 dark:hover:bg-white/5"
              >
                <td className="px-5 py-4">
                  <p className="font-bold text-ink-900 dark:text-white">
                    {row.witness}
                  </p>
                  <span className="mt-2 inline-flex rounded-full bg-archive-teal/10 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-archive-teal dark:text-teal-200">
                    {relationshipLabel(row)}
                  </span>
                </td>
                <td className="px-5 py-4 text-ink-600 dark:text-ink-100/70">
                  <span className="inline-flex rounded-lg border-2 border-archive-gold/60 bg-archive-gold/15 px-3 py-1.5 text-xs font-black tracking-wide text-amber-900 shadow-[0_2px_0_rgba(180,135,35,0.18)] dark:border-archive-gold/70 dark:bg-archive-gold/15 dark:text-amber-100">
                    {row.date}
                  </span>
                </td>
                <td className="px-5 py-4 leading-6 text-ink-700 dark:text-ink-100/75">
                  {row.unit && (
                    <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-archive-teal dark:text-teal-200">
                      {row.unit}
                    </p>
                  )}
                  <p>{row.note}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
