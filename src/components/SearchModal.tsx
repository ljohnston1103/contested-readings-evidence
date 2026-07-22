"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CornerDownLeft, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { passageSearchText } from "@/data/derived";
import type { Passage } from "@/data/types";

type SearchModalProps = {
  passages: Passage[];
  open: boolean;
  onClose: () => void;
};

const quickLinks = [
  { href: "/passages", label: "All passages" },
  { href: "/manuscripts", label: "Manuscripts" },
  { href: "/fathers", label: "Church fathers" },
  { href: "/versions", label: "Ancient versions" },
  { href: "/methodology", label: "Oldest & Best" },
  { href: "/research", label: "Research Desk" },
];

export function SearchModal({ passages, open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  const results = useMemo(() => {
    const needle = query.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    if (!needle) return passages.slice(0, 7);
    return passages.filter((passage) => passageSearchText(passage).includes(needle)).slice(0, 8);
  }, [passages, query]);

  const go = useCallback(
    (href: string) => {
      onClose();
      router.push(href);
    },
    [onClose, router],
  );

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (!open) return;
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, results.length - 1));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
      }
      if (event.key === "Enter") {
        if (event.target instanceof HTMLButtonElement) return;
        const target = results[activeIndex];
        if (target) go(`/passages/${target.slug}`);
      }
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
          ),
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, go, onClose, open, results]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (open) {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.requestAnimationFrame(() => inputRef.current?.focus());
      return () => {
        document.body.style.overflow = original;
        returnFocusRef.current?.focus();
      };
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-24 sm:pt-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink-900/55 backdrop-blur-sm dark:bg-black/70"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search the evidence database"
            className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-ink-200 bg-white shadow-card dark:border-white/10 dark:bg-archive-navy"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="flex items-center gap-3 border-b border-ink-100 px-5 py-4 dark:border-white/10">
              <Search className="h-5 w-5 shrink-0 text-archive-teal dark:text-teal-200" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search a passage, manuscript, father, or phrase..."
                className="min-w-0 flex-1 bg-transparent text-base text-ink-900 outline-none placeholder:text-ink-400 dark:text-white dark:placeholder:text-ink-100/40"
                aria-label="Search the evidence database"
                role="combobox"
                aria-autocomplete="list"
                aria-expanded="true"
                aria-controls="search-results"
                aria-activedescendant={results[activeIndex] ? `search-result-${results[activeIndex].id}` : undefined}
              />
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-1.5 text-ink-400 transition hover:bg-ink-100 hover:text-ink-700 dark:text-ink-100/50 dark:hover:bg-white/10 dark:hover:text-white"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div
              id="search-results"
              role="listbox"
              aria-label="Passage search results"
              className="max-h-[55vh] overflow-y-auto p-2"
            >
              {results.length ? (
                results.map((passage, index) => (
                  <button
                    key={passage.id}
                    id={`search-result-${passage.id}`}
                    role="option"
                    aria-selected={index === activeIndex}
                    onClick={() => go(`/passages/${passage.slug}`)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left transition ${
                      index === activeIndex
                        ? "bg-archive-gold/[0.12] dark:bg-white/10"
                        : "hover:bg-archive-gold/10 dark:hover:bg-white/5"
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-black text-ink-900 dark:text-white">
                        {passage.reference} <span className="font-semibold text-ink-500 dark:text-ink-100/60">· {passage.title}</span>
                      </span>
                      <span className="line-clamp-1 text-sm text-ink-600 dark:text-ink-100/70">
                        {passage.shortSummary}
                      </span>
                    </span>
                    {index === activeIndex && (
                      <CornerDownLeft className="h-4 w-4 shrink-0 text-archive-teal dark:text-teal-200" aria-hidden="true" />
                    )}
                  </button>
                ))
              ) : (
                <p className="px-4 py-8 text-center text-sm text-ink-600 dark:text-ink-100/70">
                  No matches yet. Try a reference, witness, or church father.
                </p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 border-t border-ink-100 bg-ink-50/60 px-5 py-3 text-xs font-bold text-ink-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-ink-100/50">
              <span className="uppercase tracking-[0.18em]">Jump to</span>
              {quickLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => go(link.href)}
                  className="inline-flex items-center gap-1 rounded-full border border-ink-200 px-3 py-1 transition hover:border-archive-gold/60 hover:text-archive-blue dark:border-white/10 dark:hover:text-white"
                >
                  {link.label}
                  <ArrowRight className="h-3 w-3" />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
