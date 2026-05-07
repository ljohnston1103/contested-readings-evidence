"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { passageSearchText } from "@/data/derived";
import type { Passage } from "@/data/types";

type SearchBarProps = {
  passages: Passage[];
  placeholder?: string;
  compact?: boolean;
};

export function SearchBar({
  passages,
  placeholder = "Search a passage, manuscript, or church father",
  compact = false,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.toLowerCase().trim();

  const results = useMemo(() => {
    if (!normalizedQuery) return passages.slice(0, compact ? 3 : 6);
    return passages
      .filter((passage) => passageSearchText(passage).includes(normalizedQuery.replace(/[^a-z0-9]+/g, " ").trim()))
      .slice(0, 8);
  }, [compact, normalizedQuery, passages]);

  return (
    <div className="relative">
      <div className="flex rounded-3xl border border-ink-200 bg-white/90 p-2 shadow-card backdrop-blur dark:border-white/10 dark:bg-white/10">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base text-ink-900 outline-none placeholder:text-ink-400 dark:text-white dark:placeholder:text-ink-100/45"
          placeholder={placeholder}
          aria-label={placeholder}
        />
        <Link
          href={`/passages?search=${encodeURIComponent(query)}`}
          className="rounded-2xl bg-ink-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-archive-blue dark:bg-archive-gold dark:text-ink-900"
        >
          Search
        </Link>
      </div>
      {query && (
        <div className="absolute left-0 right-0 top-full z-20 mt-3 overflow-hidden rounded-3xl border border-ink-200 bg-white/95 shadow-card backdrop-blur dark:border-white/10 dark:bg-archive-navy/95">
          {results.length ? (
            results.map((passage) => (
              <Link
                key={passage.id}
                href={`/passages/${passage.slug}`}
                className="grid gap-1 border-b border-ink-100 px-5 py-4 transition last:border-b-0 hover:bg-archive-gold/10 dark:border-white/10 dark:hover:bg-white/5"
              >
                <span className="text-sm font-black text-ink-900 dark:text-white">
                  {passage.reference} · {passage.title}
                </span>
                <span className="line-clamp-1 text-sm text-ink-600 dark:text-ink-100/70">
                  {passage.shortSummary}
                </span>
              </Link>
            ))
          ) : (
            <p className="px-5 py-4 text-sm text-ink-600 dark:text-ink-100/70">
              No matching passage yet. Try a reference, witness, father, or reading phrase.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
