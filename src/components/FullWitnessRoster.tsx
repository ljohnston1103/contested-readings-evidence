import { Database, ListChecks, ScrollText } from "lucide-react";

import { PatristicQuoteCard } from "@/components/PatristicQuoteCard";
import { fullWitnessBySlug, type WitnessGroup } from "@/data/fullWitness";
import type { Passage } from "@/data/types";

const toneStyles: Record<WitnessGroup["tone"], string> = {
  support:
    "border-emerald-700/20 bg-emerald-50/70 dark:border-emerald-300/15 dark:bg-emerald-300/[0.06]",
  competing:
    "border-rose-700/20 bg-rose-50/70 dark:border-rose-300/15 dark:bg-rose-300/[0.06]",
  related:
    "border-amber-700/20 bg-amber-50/70 dark:border-amber-300/15 dark:bg-amber-300/[0.06]",
  neutral:
    "border-ink-200 bg-ink-50/70 dark:border-white/10 dark:bg-white/[0.04]",
};

const toneLabels: Record<WitnessGroup["tone"], string> = {
  support: "Supports the KJV/TR form",
  competing: "Competing reading",
  related: "Related or qualified evidence",
  neutral: "Non-directional evidence",
};

export function FullWitnessRoster({ passage }: { passage: Passage }) {
  const entry = fullWitnessBySlug.get(passage.slug);
  if (!entry) return null;

  const snapshotRows = [
    ["Greek support in cited scope", entry.snapshot.greekSupport],
    ["Greek competing evidence in cited scope", entry.snapshot.greekAgainst],
    ["Evidence classification", entry.snapshot.supportCategory],
    ...(entry.snapshot.percentSupport
      ? [["Percentage and denominator", entry.snapshot.percentSupport]]
      : []),
  ];

  return (
    <section
      aria-labelledby={`${passage.slug}-full-witness-roster`}
      className="rounded-[2rem] border border-ink-200 bg-white/80 p-6 shadow-card dark:border-white/10 dark:bg-white/[0.05] sm:p-8"
    >
      <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.22em] text-archive-teal dark:text-teal-200">
        <Database className="h-4 w-4" aria-hidden="true" />
        Complete source-scoped roster
      </p>
      <h2
        id={`${passage.slug}-full-witness-roster`}
        className="mt-2 font-display text-3xl font-black text-ink-900 dark:text-white"
      >
        Complete roster within the stated source scope.
      </h2>
      <p className="mt-3 max-w-5xl text-sm leading-6 text-ink-600 dark:text-ink-100/70">
        This roster preserves every named or grouped state recovered in the governing
        sources, including exact readings, competing readings, corrections, related
        forms, lacunae, versions, and aggregate traditions. A grouped tradition is not
        counted as one manuscript, and a selected apparatus is not described as a
        universal collation of every surviving copy.
      </p>

      <div className="mt-5 rounded-2xl border border-archive-gold/25 bg-archive-gold/10 p-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-ink-500 dark:text-ink-100/60">
          Apparatus and roster scope
        </p>
        <p className="mt-2 leading-7 text-ink-800 dark:text-ink-100/85">
          {entry.scope}
        </p>
      </div>

      <dl className="mt-5 grid gap-3 md:grid-cols-2">
        {snapshotRows.map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-ink-100 bg-ink-50/70 p-4 dark:border-white/10 dark:bg-white/[0.04]"
          >
            <dt className="text-[0.68rem] font-black uppercase tracking-[0.15em] text-ink-500 dark:text-ink-100/55">
              {label}
            </dt>
            <dd className="mt-2 text-sm font-bold leading-6 text-ink-900 dark:text-white">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-7 grid gap-7">
        {entry.units.map((unit) => (
          <section key={unit.id} aria-labelledby={`${passage.slug}-${unit.id}-roster`}>
            <div className="flex items-center gap-2">
              <ScrollText
                className="h-4 w-4 text-archive-teal dark:text-teal-200"
                aria-hidden="true"
              />
              <h3
                id={`${passage.slug}-${unit.id}-roster`}
                className="font-display text-2xl font-black text-ink-900 dark:text-white"
              >
                {unit.label}
              </h3>
            </div>
            {unit.reading ? (
              <p className="mt-2 break-words text-sm leading-6 text-ink-600 dark:text-ink-100/65">
                KJV/TR unit:{" "}
                <span className="font-semibold text-ink-800 dark:text-white">
                  {unit.reading}
                </span>
              </p>
            ) : null}
            <div className="mt-4 grid gap-3">
              {unit.groups.map((group, index) => (
                <div
                  key={`${unit.id}-${group.label}-${index}`}
                  className={`rounded-2xl border p-4 ${toneStyles[group.tone]}`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-black text-ink-900 dark:text-white">
                      {group.label}
                    </h4>
                    <span className="rounded-full bg-white/70 px-2.5 py-1 text-[0.66rem] font-black uppercase tracking-[0.12em] text-ink-600 dark:bg-white/10 dark:text-ink-100/70">
                      {toneLabels[group.tone]}
                    </span>
                  </div>
                  {group.reading ? (
                    <p className="mt-2 text-sm font-semibold leading-6 text-ink-700 dark:text-ink-100/75">
                      {group.reading}
                    </p>
                  ) : null}
                  {group.witnesses ? (
                    <p className="mt-3 break-words font-mono text-sm leading-7 text-ink-800 dark:text-ink-100/85">
                      {group.witnesses}
                    </p>
                  ) : null}
                  {group.aggregates ? (
                    <p className="mt-2 text-sm leading-6 text-ink-700 dark:text-ink-100/75">
                      <span className="font-black">Grouped evidence:</span>{" "}
                      {group.aggregates}
                    </p>
                  ) : null}
                  {group.note ? (
                    <p className="mt-2 text-sm leading-6 text-ink-700 dark:text-ink-100/75">
                      {group.note}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {passage.patristicWitnesses.length ? (
        <section
          className="mt-7"
          aria-labelledby={`${passage.slug}-complete-patristic-roster`}
        >
          <h3
            id={`${passage.slug}-complete-patristic-roster`}
            className="font-display text-2xl font-black text-ink-900 dark:text-white"
          >
            Church Fathers and literary witnesses
          </h3>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-ink-600 dark:text-ink-100/70">
            Precisely located citations and additional names reported by the
            controlling apparatus are kept separate. An apparatus-level attribution
            is not presented as an independently verified exact quotation.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {passage.patristicWitnesses.map((witness, index) => (
              <PatristicQuoteCard
                key={`${passage.slug}-${witness.author ?? witness.source}-${witness.workSection ?? index}-${index}`}
                witness={witness}
              />
            ))}
          </div>
        </section>
      ) : null}

      {entry.notes?.length ? (
        <section className="mt-7 rounded-2xl border border-amber-700/20 bg-amber-50/70 p-5 dark:border-archive-gold/20 dark:bg-archive-gold/[0.07]">
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-amber-800 dark:text-archive-gold">
            <ListChecks className="h-4 w-4" aria-hidden="true" />
            Roster distinctions
          </p>
          <ul className="mt-3 grid gap-2">
            {entry.notes.map((note, index) => (
              <li
                key={`${passage.slug}-roster-note-${index}`}
                className="text-sm leading-6 text-ink-700 dark:text-ink-100/75"
              >
                {note}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </section>
  );
}
