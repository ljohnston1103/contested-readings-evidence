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

export function EvidenceTable({
  title,
  rows,
  columns = ["Witness", "Date", "Reading / Note"],
  searchable = true,
}: EvidenceTableProps) {
  const [query, setQuery] = useState("");
  const uniqueRows = useMemo(() => dedupeWitnessRows(rows), [rows]);
  const filteredRows = useMemo(() => {
    const needle = query.toLowerCase().trim();
    if (!needle) return uniqueRows;
    return uniqueRows.filter((row) =>
      `${row.witness} ${row.date} ${row.note}`.toLowerCase().includes(needle),
    );
  }, [query, uniqueRows]);

  if (!uniqueRows.length) {
    return (
      <div className="rounded-3xl border border-dashed border-ink-200 p-6 text-sm text-ink-600 dark:border-white/10 dark:text-ink-100/70">
        No witnesses are listed in this section yet.
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-ink-200 bg-white/80 shadow-card dark:border-white/10 dark:bg-white/[0.05]">
      {(title || searchable) && (
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink-100 p-4 dark:border-white/10">
          {title && <h3 className="font-display text-2xl font-black text-ink-900 dark:text-white">{title}</h3>}
          {searchable && uniqueRows.length > 5 && (
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="min-w-0 rounded-2xl border border-ink-200 bg-white px-4 py-2 text-sm outline-none transition focus:border-archive-gold dark:border-white/10 dark:bg-white/5 dark:text-white"
              placeholder="Search this table"
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
              <tr key={`${row.witness}-${index}`} className="align-top transition hover:bg-archive-gold/10 dark:hover:bg-white/5">
                <td className="px-5 py-4 font-bold text-ink-900 dark:text-white">{row.witness}</td>
                <td className="whitespace-nowrap px-5 py-4 text-ink-600 dark:text-ink-100/70">{row.date}</td>
                <td className="px-5 py-4 leading-6 text-ink-700 dark:text-ink-100/75">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
