import { BookOpen, Globe2, Landmark, Printer, ScrollText } from "lucide-react";

import { MajorityTextStandingCard } from "@/components/MajorityTextStandingCard";
import { publicPatristicWitnesses } from "@/data/derived";
import type { Passage } from "@/data/types";

type ManuscriptSnapshotCardProps = {
  passage: Passage;
};

export function ManuscriptSnapshotCard({ passage }: ManuscriptSnapshotCardProps) {
  const patristicWitnesses = publicPatristicWitnesses(passage);
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
      present: patristicWitnesses.length > 0,
      icon: Landmark,
    },
    {
      label: "Printed editions",
      present: (passage.printedWitnesses?.length ?? 0) > 0,
      icon: Printer,
    },
  ];
  const snapshot = passage.manuscriptSnapshot;
  const countRows = [
    { label: "Greek support in the cited corpus", value: snapshot.greekSupport },
    { label: "Greek competing evidence in the cited corpus", value: snapshot.greekAgainst },
    ...(snapshot.lectionarySupport
      ? [{ label: "Lectionary evidence", value: snapshot.lectionarySupport }]
      : []),
    ...(snapshot.percentSupport
      ? [{ label: "Published percentage", value: snapshot.percentSupport }]
      : []),
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

      <MajorityTextStandingCard slug={passage.slug} className="mt-5" />

      {passage.evidenceScope ? (
        <div className="mt-5 rounded-2xl border border-archive-teal/25 bg-archive-teal/[0.06] p-4 dark:border-teal-200/15 dark:bg-teal-200/[0.05]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-archive-teal dark:text-teal-200">
            Source scope and denominator
          </p>
          <p className="mt-2 text-sm leading-6 text-ink-700 dark:text-ink-100/75">
            {passage.evidenceScope}
          </p>
        </div>
      ) : null}

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {countRows.map((row) => (
          <div
            key={row.label}
            className="rounded-2xl border border-ink-100 bg-white/80 p-4 dark:border-white/10 dark:bg-archive-navy/55"
          >
            <p className="text-xs font-black uppercase tracking-[0.16em] text-ink-500 dark:text-ink-100/55">
              {row.label}
            </p>
            <p className="mt-2 text-sm font-bold leading-6 text-ink-900 dark:text-white">
              {row.value}
            </p>
          </div>
        ))}
      </div>

      {snapshot.mainEvidenceAgainst.length > 0 ? (
        <div className="mt-5 rounded-2xl border border-rose-700/15 bg-rose-50/60 p-4 dark:border-rose-300/15 dark:bg-rose-300/[0.05]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-rose-800 dark:text-rose-200">
            Principal competing witnesses named in the snapshot
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {snapshot.mainEvidenceAgainst.map((witness) => (
              <li
                key={witness}
                className="rounded-xl bg-white/70 px-3 py-2 text-sm font-semibold text-ink-700 dark:bg-white/[0.06] dark:text-ink-100/75"
              >
                {witness}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

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
                  {present ? "Represented" : "No entry listed"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
