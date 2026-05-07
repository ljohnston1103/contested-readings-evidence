import Link from "next/link";

import type { Passage } from "@/data/types";

import { TagBadge } from "./TagBadge";

type PassageCardProps = {
  passage: Passage;
  featured?: boolean;
};

export function PassageCard({ passage, featured = false }: PassageCardProps) {
  return (
    <Link
      href={`/passages/${passage.slug}`}
      className="group relative overflow-hidden rounded-[2rem] border border-ink-200/80 bg-white/78 p-5 shadow-card backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-archive-gold/60 hover:shadow-glow dark:border-white/10 dark:bg-white/[0.06]"
    >
      <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-[4rem] bg-archive-gold/10 transition group-hover:bg-archive-gold/20" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-archive-teal dark:text-teal-200">
            {passage.reference}
          </p>
          <h3 className="mt-2 font-display text-2xl font-black leading-tight text-ink-900 dark:text-white">
            {passage.title}
          </h3>
        </div>
        <span className="rounded-full border border-archive-gold/40 bg-archive-gold/12 px-3 py-1 text-xs font-black text-ink-700 dark:text-ink-50">
          {passage.manuscriptSnapshot.percentSupport ?? passage.supportCategory.split(",")[0]}
        </span>
      </div>
      <p className="relative mt-4 line-clamp-3 text-sm leading-6 text-ink-600 dark:text-ink-100/75">
        {featured ? passage.readingSupported : passage.shortSummary}
      </p>
      <div className="relative mt-5 grid gap-3 rounded-2xl border border-ink-100 bg-ink-50/70 p-4 dark:border-white/10 dark:bg-archive-navy/50">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-400">Support</p>
            <p className="mt-1 text-sm font-black text-ink-900 dark:text-white">
              {passage.manuscriptSnapshot.greekSupport}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-400">Against</p>
            <p className="mt-1 text-sm font-black text-ink-900 dark:text-white">
              {passage.manuscriptSnapshot.greekAgainst}
            </p>
          </div>
        </div>
      </div>
      <div className="relative mt-5 flex flex-wrap gap-2">
        {passage.tags.slice(0, 4).map((tag) => (
          <TagBadge key={tag}>{tag}</TagBadge>
        ))}
      </div>
    </Link>
  );
}
