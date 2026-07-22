import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import type { Passage } from "@/data/types";

type NextPreviousPassageNavProps = {
  previous?: Passage;
  next?: Passage;
};

export function NextPreviousPassageNav({ previous, next }: NextPreviousPassageNavProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {previous ? (
        <Link
          href={`/passages/${previous.slug}`}
          className="group flex items-center gap-4 rounded-[1.75rem] border border-ink-200 bg-white/75 p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-archive-gold/60 dark:border-white/10 dark:bg-white/[0.05]"
        >
          <ArrowLeft
            className="h-5 w-5 shrink-0 text-archive-gold transition-transform duration-300 group-hover:-translate-x-1"
            aria-hidden="true"
          />
          <span>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-ink-400">Previous contested passage</p>
            <p className="mt-2 font-display text-2xl font-black text-ink-900 dark:text-white">{previous.reference}</p>
            <p className="text-sm text-ink-600 dark:text-ink-100/70">{previous.title}</p>
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next && (
        <Link
          href={`/passages/${next.slug}`}
          className="group flex items-center justify-end gap-4 rounded-[1.75rem] border border-ink-200 bg-white/75 p-5 text-right shadow-card transition duration-300 hover:-translate-y-1 hover:border-archive-gold/60 dark:border-white/10 dark:bg-white/[0.05]"
        >
          <span>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-ink-400">Next contested passage</p>
            <p className="mt-2 font-display text-2xl font-black text-ink-900 dark:text-white">{next.reference}</p>
            <p className="text-sm text-ink-600 dark:text-ink-100/70">{next.title}</p>
          </span>
          <ArrowRight
            className="h-5 w-5 shrink-0 text-archive-gold transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      )}
    </div>
  );
}
