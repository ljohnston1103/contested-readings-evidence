import { BookOpen, Globe2, Landmark, Printer, ScrollText } from "lucide-react";

import type { Passage } from "@/data/types";

type ManuscriptSnapshotCardProps = {
  passage: Passage;
};

export function ManuscriptSnapshotCard({ passage }: ManuscriptSnapshotCardProps) {
  const categories = [
    {
      label: "Greek manuscripts",
      present: passage.greekSupportWitnesses.length > 0,
      icon: ScrollText,
    },
    {
      label: "Ancient versions",
      present:
        passage.latinWitnesses.length > 0 ||
        passage.versionalWitnesses.length > 0,
      icon: Globe2,
    },
    {
      label: "Church fathers",
      present: passage.patristicWitnesses.length > 0,
      icon: Landmark,
    },
    {
      label: "Printed editions",
      present: (passage.printedWitnesses?.length ?? 0) > 0,
      icon: Printer,
    },
  ];

  return (
    <section className="rounded-[2rem] border border-archive-gold/25 bg-gradient-to-br from-white to-archive-paper p-6 shadow-card dark:border-archive-gold/20 dark:from-white/[0.08] dark:to-white/[0.03]">
      <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.22em] text-archive-gold">
        <BookOpen className="h-4 w-4" aria-hidden="true" />
        Primary support for the KJV reading
      </p>
      <h2 className="mt-2 font-display text-3xl font-black text-ink-900 dark:text-white">
        {passage.supportCategory}
      </h2>
      <p className="mt-4 max-w-4xl text-base leading-7 text-ink-700 dark:text-ink-100/75">
        The sections below preserve each supporting, competing, and related
        record under its proper evidence type.
      </p>
      <div className="mt-6">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-ink-500 dark:text-ink-100/60">
          Evidence represented on this page
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map(({ label, present, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-white/80 p-4 dark:border-white/10 dark:bg-archive-navy/55"
            >
              <span
                className={`grid h-9 w-9 place-items-center rounded-xl ${
                  present
                    ? "bg-archive-teal/10 text-archive-teal dark:text-teal-200"
                    : "bg-ink-100 text-ink-400 dark:bg-white/5"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-black text-ink-900 dark:text-white">
                  {label}
                </p>
                <p className="text-xs text-ink-500 dark:text-ink-100/55">
                  {present ? "Represented" : "No supporting entry listed"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
