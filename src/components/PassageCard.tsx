"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import type { Passage } from "@/data/types";

import { EarliestSupportPanel } from "./EarliestSupportPanel";
import { TagBadge } from "./TagBadge";

type PassageCardProps = {
  passage: Passage;
  featured?: boolean;
};

export function PassageCard({ passage, featured = false }: PassageCardProps) {
  return (
    <motion.div
      className="h-full"
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
    >
      <Link
        href={`/passages/${passage.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-ink-200/80 bg-white/78 p-5 shadow-card backdrop-blur transition-colors duration-300 hover:border-archive-gold/60 hover:shadow-glow dark:border-white/10 dark:bg-white/[0.06]"
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
          <span className="line-clamp-2 max-w-[11rem] rounded-2xl border border-archive-gold/40 bg-archive-gold/12 px-3 py-1 text-right text-xs font-black text-ink-700 dark:text-ink-50">
            {passage.supportCategory.split(",")[0]}
          </span>
        </div>
        <p className="relative mt-4 line-clamp-3 text-sm leading-6 text-ink-600 dark:text-ink-100/75">
          {featured ? passage.readingSupported : passage.shortSummary}
        </p>
        <div className="relative mt-5">
          <EarliestSupportPanel passage={passage} compact />
        </div>
        <div className="relative mt-5 flex flex-wrap gap-2">
          {passage.tags.slice(0, 4).map((tag) => (
            <TagBadge key={tag}>{tag}</TagBadge>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
