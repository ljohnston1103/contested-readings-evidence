"use client";

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
  return (
    <aside className="rounded-[2rem] border border-ink-200 bg-white/75 p-5 shadow-card dark:border-white/10 dark:bg-white/[0.05] lg:sticky lg:top-28">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-2xl font-black text-ink-900 dark:text-white">Filters</h2>
        <button type="button" onClick={onClear} className="text-sm font-bold text-archive-blue hover:underline dark:text-teal-200">
          Clear
        </button>
      </div>

      <label className="mt-5 grid gap-2 text-sm font-bold text-ink-700 dark:text-ink-100">
        Book
        <select
          value={selectedBook}
          onChange={(event) => onBookChange(event.target.value)}
          className="rounded-2xl border border-ink-200 bg-white px-4 py-3 text-sm outline-none dark:border-white/10 dark:bg-archive-navy"
        >
          <option value="">All books</option>
          {books.map((book) => (
            <option key={book} value={book}>
              {book}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-5 grid gap-2 text-sm font-bold text-ink-700 dark:text-ink-100">
        Variant type
        <select
          value={selectedVariant}
          onChange={(event) => onVariantChange(event.target.value)}
          className="rounded-2xl border border-ink-200 bg-white px-4 py-3 text-sm outline-none dark:border-white/10 dark:bg-archive-navy"
        >
          <option value="">All types</option>
          {variantTypes.map((type) => (
            <option key={type} value={type}>
              {slugLabel(type)}
            </option>
          ))}
        </select>
      </label>

      <div className="mt-6">
        <p className="text-sm font-bold text-ink-700 dark:text-ink-100">Evidence tags</p>
        <div className="mt-3 grid gap-2">
          {tagOptions.map((tag) => (
            <label key={tag} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-ink-100 bg-white/60 px-3 py-2 text-sm font-semibold text-ink-700 transition hover:border-archive-gold/50 dark:border-white/10 dark:bg-white/5 dark:text-ink-100">
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
