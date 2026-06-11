"use client";

import { BookOpen, ChevronDown, GitCompare, SlidersHorizontal, Tags } from "lucide-react";

import { books, tagOptions, variantTypes } from "@/data/derived";
import { slugLabel } from "@/lib/utils";

type FilterSidebarProps = {
  selectedBook: string;
  selectedTags: string[];
  selectedVariant: string;
  onBookChange: (book: string) => void;
  onVariantChange: (variant: string) => void;
  onToggleTag: (tag: string) => void;
  onClear: () => void;
};

export function FilterSidebar({
  selectedBook,
  selectedTags,
  selectedVariant,
  onBookChange,
  onVariantChange,
  onToggleTag,
  onClear,
}: FilterSidebarProps) {
  const activeCount = (selectedBook ? 1 : 0) + (selectedVariant ? 1 : 0) + selectedTags.length;

  return (
    <aside className="rounded-[2rem] border border-ink-200 bg-white/75 p-5 shadow-card dark:border-white/10 dark:bg-white/[0.05] lg:sticky lg:top-24">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-display text-2xl font-black text-ink-900 dark:text-white">
          <SlidersHorizontal className="h-5 w-5 text-archive-gold" aria-hidden="true" />
          Filters
          {activeCount > 0 && (
            <span className="grid h-6 min-w-6 place-items-center rounded-full bg-archive-gold px-1.5 text-sm font-black text-ink-900">
              {activeCount}
            </span>
          )}
        </h2>
        <button
          type="button"
          onClick={onClear}
          disabled={activeCount === 0}
          className="text-sm font-bold text-archive-blue transition hover:underline disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:no-underline dark:text-teal-200"
        >
          Clear
        </button>
      </div>

      <label className="mt-5 grid gap-2 text-sm font-bold text-ink-700 dark:text-ink-100">
        <span className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-archive-teal dark:text-teal-200" aria-hidden="true" />
          Book
        </span>
        <div className="relative">
          <select
            value={selectedBook}
            onChange={(event) => onBookChange(event.target.value)}
            className="w-full appearance-none rounded-2xl border border-ink-200 bg-white px-4 py-3 pr-10 text-sm outline-none transition focus:border-archive-gold dark:border-white/10 dark:bg-archive-navy"
          >
            <option value="">All books</option>
            {books.map((book) => (
              <option key={book} value={book}>
                {book}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
        </div>
      </label>

      <label className="mt-5 grid gap-2 text-sm font-bold text-ink-700 dark:text-ink-100">
        <span className="flex items-center gap-2">
          <GitCompare className="h-4 w-4 text-archive-teal dark:text-teal-200" aria-hidden="true" />
          Variant type
        </span>
        <div className="relative">
          <select
            value={selectedVariant}
            onChange={(event) => onVariantChange(event.target.value)}
            className="w-full appearance-none rounded-2xl border border-ink-200 bg-white px-4 py-3 pr-10 text-sm outline-none transition focus:border-archive-gold dark:border-white/10 dark:bg-archive-navy"
          >
            <option value="">All types</option>
            {variantTypes.map((type) => (
              <option key={type} value={type}>
                {slugLabel(type)}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
        </div>
      </label>

      <div className="mt-6">
        <p className="flex items-center gap-2 text-sm font-bold text-ink-700 dark:text-ink-100">
          <Tags className="h-4 w-4 text-archive-teal dark:text-teal-200" aria-hidden="true" />
          Evidence tags
        </p>
        <div className="mt-3 grid gap-2">
          {tagOptions.map((tag) => (
            <label
              key={tag}
              className="flex cursor-pointer items-center gap-3 rounded-2xl border border-ink-100 bg-white/60 px-3 py-2 text-sm font-semibold text-ink-700 transition duration-200 hover:-translate-y-0.5 hover:border-archive-gold/50 hover:bg-archive-gold/5 dark:border-white/10 dark:bg-white/5 dark:text-ink-100"
            >
              <input
                type="checkbox"
                checked={selectedTags.includes(tag)}
                onChange={() => onToggleTag(tag)}
                className="h-4 w-4 accent-archive-teal"
              />
              {tag}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
