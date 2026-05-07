"use client";

import { useMemo, useState } from "react";

import { hasTag, normalize, passageSearchText } from "@/data/derived";
import type { Passage } from "@/data/types";

import { FilterSidebar } from "./FilterSidebar";
import { PassageCard } from "./PassageCard";
import { PassageTable } from "./PassageTable";

type PassageBrowserProps = {
  passages: Passage[];
  initialSearch?: string;
};

const sortOptions = [
  ["biblical", "Biblical order"],
  ["support", "Strongest KJV manuscript support"],
  ["against", "Smallest evidence against KJV"],
  ["patristic", "Earliest patristic evidence"],
  ["controversial", "Most controversial"],
  ["alphabetical", "Alphabetical"],
] as const;

export function PassageBrowser({ passages, initialSearch = "" }: PassageBrowserProps) {
  const [query, setQuery] = useState(initialSearch);
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sort, setSort] = useState<(typeof sortOptions)[number][0]>("biblical");
  const [view, setView] = useState<"cards" | "table">("cards");

  const filtered = useMemo(() => {
    const needle = normalize(query);
    return passages
      .filter((passage) => (selectedBook ? passage.book === selectedBook : true))
      .filter((passage) => (selectedVariant ? passage.variantType.includes(selectedVariant) : true))
      .filter((passage) => selectedTags.every((tag) => hasTag(passage, tag)))
      .filter((passage) => (needle ? passageSearchText(passage).includes(needle) : true))
      .sort((a, b) => {
        if (sort === "support") return b.supportScore - a.supportScore;
        if (sort === "against") return a.oppositionScore - b.oppositionScore;
        if (sort === "patristic") return (a.earliestPatristicYear ?? 9999) - (b.earliestPatristicYear ?? 9999);
        if (sort === "controversial") return b.controversyScore - a.controversyScore;
        if (sort === "alphabetical") return a.reference.localeCompare(b.reference);
        return a.biblicalOrder - b.biblicalOrder;
      });
  }, [passages, query, selectedBook, selectedTags, selectedVariant, sort]);

  function toggleTag(tag: string) {
    setSelectedTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag],
    );
  }

  function clearFilters() {
    setQuery("");
    setSelectedBook("");
    setSelectedVariant("");
    setSelectedTags([]);
    setSort("biblical");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <FilterSidebar
        selectedBook={selectedBook}
        selectedTags={selectedTags}
        selectedVariant={selectedVariant}
        onBookChange={setSelectedBook}
        onVariantChange={setSelectedVariant}
        onToggleTag={toggleTag}
        onClear={clearFilters}
      />
      <div className="grid gap-5">
        <div className="rounded-[2rem] border border-ink-200 bg-white/75 p-4 shadow-card dark:border-white/10 dark:bg-white/[0.05]">
          <div className="grid gap-3 xl:grid-cols-[1fr_240px_170px]">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="rounded-2xl border border-ink-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-archive-gold dark:border-white/10 dark:bg-archive-navy dark:text-white"
              placeholder="Search reference, manuscript, church father, or phrase"
            />
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as typeof sort)}
              className="rounded-2xl border border-ink-200 bg-white px-4 py-3 text-sm font-semibold outline-none dark:border-white/10 dark:bg-archive-navy dark:text-white"
            >
              {sortOptions.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setView("cards")}
                className={`rounded-2xl px-4 py-3 text-sm font-black ${view === "cards" ? "bg-ink-900 text-white dark:bg-archive-gold dark:text-ink-900" : "bg-ink-50 text-ink-700 dark:bg-white/5 dark:text-ink-100"}`}
              >
                Cards
              </button>
              <button
                type="button"
                onClick={() => setView("table")}
                className={`rounded-2xl px-4 py-3 text-sm font-black ${view === "table" ? "bg-ink-900 text-white dark:bg-archive-gold dark:text-ink-900" : "bg-ink-50 text-ink-700 dark:bg-white/5 dark:text-ink-100"}`}
              >
                Table
              </button>
            </div>
          </div>
          <p className="mt-3 text-sm font-semibold text-ink-500 dark:text-ink-100/60">
            Showing {filtered.length} of {passages.length} passages.
          </p>
        </div>

        {view === "cards" ? (
          <div className="grid gap-5 xl:grid-cols-2">
            {filtered.map((passage) => (
              <PassageCard key={passage.id} passage={passage} />
            ))}
          </div>
        ) : (
          <PassageTable passages={filtered} />
        )}
      </div>
    </div>
  );
}
