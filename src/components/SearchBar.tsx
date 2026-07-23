"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { passageSearchText } from "@/data/derived";
import type { Passage } from "@/data/types";

type SearchBarProps = {
  passages: Passage[];
  placeholder?: string;
  compact?: boolean;
};

const easeOut = [0.21, 0.47, 0.32, 0.98] as const;

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
      <div className="flex items-center rounded-3xl border border-ink-200 bg-white/90 p-2 pl-4 shadow-card backdrop-blur transition focus-within:border-archive-gold dark:border-white/10 dark:bg-white/10">
        <Search className="h-4 w-4 shrink-0 text-ink-400" aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base text-ink-900 outline-none placeholder:text-ink-400 dark:text-white dark:placeholder:text-ink-100/45"
          placeholder={placeholder}
          aria-label={placeholder}
        />
        <Link
          href={`/passages?search=${encodeURIComponent(query)}`}
          className="group flex items-center gap-1.5 rounded-2xl bg-ink-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-archive-blue dark:bg-archive-gold dark:text-ink-900"
        >
          Search
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
      <AnimatePresence>
        {query && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: easeOut }}
            className="absolute left-0 right-0 top-full z-20 mt-3 overflow-hidden rounded-3xl border border-ink-200 bg-white/95 shadow-card backdrop-blur dark:border-white/10 dark:bg-archive-navy/95"
          >
            {results.length ? (
              results.map((passage) => (
                <Link
                  key={passage.id}
                  href={`/passages/${passage.slug}`}
                  className="group grid gap-1 border-b border-ink-100 px-5 py-4 transition last:border-b-0 hover:bg-archive-gold/10 dark:border-white/10 dark:hover:bg-white/5"
                >
                  <span className="flex items-center justify-between gap-2 text-sm font-black text-ink-900 dark:text-white">
                    {passage.reference} · {passage.title}
                    <ArrowRight className="h-4 w-4 shrink-0 text-archive-gold opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                  </span>
                  <span className="line-clamp-1 text-sm text-ink-600 dark:text-ink-100/70">
                    {passage.shortSummary}
                  </span>
                  <span className="line-clamp-2 text-xs font-bold leading-5 text-archive-teal dark:text-teal-200">
                    Earliest KJV support:{" "}
                    {passage.earliestSupport
                      ?.map((record) =>
                        record.label
                          ? `${record.label}: ${record.statement}`
                          : record.statement,
                      )
                      .join(" · ")}
                  </span>
                </Link>
              ))
            ) : (
              <p className="px-5 py-4 text-sm text-ink-600 dark:text-ink-100/70">
                No matching passage yet. Try a reference, witness, father, or reading phrase.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
