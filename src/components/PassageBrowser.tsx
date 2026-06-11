"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LayoutGrid, Search, SearchX, Table2, X } from "lucide-react";
import { useMemo, useState } from "react";

import { hasTag, normalize, passageSearchText } from "@/data/derived";
import type { Passage } from "@/data/types";
import { slugLabel } from "@/lib/utils";

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

const easeOut = [0.21, 0.47, 0.32, 0.98] as const;

const viewOptions = [
  { value: "cards", label: "Cards", icon: LayoutGrid },
  { value: "table", label: "Table", icon: Table2 },
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

  const activeFilters = useMemo(() => {
    const chips: { key: string; label: string; onRemove: () => void }[] = [];
    if (query) chips.push({ key: "query", label: `"${query}"`, onRemove: () => setQuery("") });
    if (selectedBook) chips.push({ key: `book-${selectedBook}`, label: selectedBook, onRemove: () => setSelectedBook("") });
    if (selectedVariant) {
      chips.push({
        key: `variant-${selectedVariant}`,
        label: slugLabel(selectedVariant),
        onRemove: () => setSelectedVariant(""),
      });
    }
    selectedTags.forEach((tag) =>
      chips.push({ key: `tag-${tag}`, label: tag, onRemove: () => toggleTag(tag) }),
    );
    return chips;
  }, [query, selectedBook, selectedTags, selectedVariant]);

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
          <div className="grid gap-3 xl:grid-cols-[1fr_240px_180px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full rounded-2xl border border-ink-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-archive-gold dark:border-white/10 dark:bg-archive-navy dark:text-white"
                placeholder="Search reference, manuscript, church father, or phrase"
              />
            </div>
            <div className="relative">
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as typeof sort)}
                className="w-full appearance-none rounded-2xl border border-ink-200 bg-white py-3 pl-4 pr-10 text-sm font-semibold outline-none transition focus:border-archive-gold dark:border-white/10 dark:bg-archive-navy dark:text-white"
              >
                {sortOptions.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-2 gap-1 rounded-2xl bg-ink-50 p-1 dark:bg-white/5">
              {viewOptions.map(({ value, label, icon: Icon }) => {
                const active = view === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setView(value)}
                    className={`relative flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-black transition ${
                      active
                        ? "text-white dark:text-ink-900"
                        : "text-ink-600 hover:text-ink-900 dark:text-ink-100/70 dark:hover:text-white"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="passage-view-pill"
                        className="absolute inset-0 rounded-xl bg-ink-900 dark:bg-archive-gold"
                        transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                      />
                    )}
                    <Icon className="relative h-4 w-4" aria-hidden="true" />
                    <span className="relative">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-ink-500 dark:text-ink-100/60">
              Showing {filtered.length} of {passages.length} passages.
            </p>
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <AnimatePresence initial={false}>
                  {activeFilters.map((chip) => (
                    <motion.button
                      key={chip.key}
                      type="button"
                      layout
                      onClick={chip.onRemove}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.18 }}
                      className="group inline-flex items-center gap-1.5 rounded-full border border-archive-gold/35 bg-archive-gold/10 px-3 py-1 text-xs font-bold text-ink-700 transition hover:border-archive-gold/60 dark:text-ink-100"
                    >
                      {chip.label}
                      <X className="h-3 w-3 transition group-hover:scale-125" aria-hidden="true" />
                    </motion.button>
                  ))}
                </AnimatePresence>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-bold text-archive-blue transition hover:underline dark:text-teal-200"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="grid place-items-center gap-3 rounded-[2rem] border border-dashed border-ink-200 bg-white/60 p-12 text-center dark:border-white/10 dark:bg-white/[0.03]">
            <SearchX className="h-10 w-10 text-ink-300 dark:text-ink-100/30" aria-hidden="true" />
            <p className="font-display text-xl font-black text-ink-900 dark:text-white">
              No passages match these filters.
            </p>
            <p className="max-w-sm text-sm text-ink-600 dark:text-ink-100/70">
              Try removing a filter or searching for a different reference, manuscript, or church father.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-2 rounded-full bg-ink-900 px-5 py-2.5 text-sm font-black text-white transition duration-300 hover:-translate-y-0.5 hover:bg-archive-blue dark:bg-archive-gold dark:text-ink-900"
            >
              Clear all filters
            </button>
          </div>
        ) : view === "cards" ? (
          <motion.div layout className="grid gap-5 xl:grid-cols-2">
            <AnimatePresence initial={false}>
              {filtered.map((passage) => (
                <motion.div
                  key={passage.id}
                  layout
                  className="h-full"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: easeOut }}
                >
                  <PassageCard passage={passage} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <PassageTable passages={filtered} />
        )}
      </div>
    </div>
  );
}
