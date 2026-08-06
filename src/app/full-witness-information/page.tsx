import { ArrowUp, ExternalLink, Library, ScrollText, UsersRound } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MajorityTextStandingCard } from "@/components/MajorityTextStandingCard";
import { Reveal } from "@/components/motion/Reveal";
import { PatristicQuoteCard } from "@/components/PatristicQuoteCard";
import { displayedPassages, publicPatristicWitnesses } from "@/data/derived";
import { fullWitnessEntries, type WitnessGroup } from "@/data/fullWitness";

export const metadata: Metadata = {
  title: "Full Witness Information",
  description: "Complete source-scoped witness rosters for the 51 passages examined by Oldest & Best.",
  alternates: { canonical: "/full-witness-information" },
};

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

const patristicRowsBySlug = new Map(
  displayedPassages.map((passage) => [
    passage.slug,
    publicPatristicWitnesses(passage),
  ]),
);

export default function FullWitnessInformationPage() {
  return (
    <div id="top" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ href: "/passages", label: "Passages" }, { label: "Full witness information" }]} />

      <Reveal className="mt-8 rounded-[2.5rem] border border-ink-200 bg-white/80 p-6 shadow-card dark:border-white/10 dark:bg-white/[0.05] sm:p-8">
        <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.22em] text-archive-teal dark:text-teal-200">
          <UsersRound className="h-4 w-4" aria-hidden="true" />
          Full witness information
        </p>
        <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-ink-900 dark:text-white sm:text-5xl">
          Witness rosters for all 51 passages
        </h1>
        <p className="mt-4 max-w-4xl text-base leading-7 text-ink-700 dark:text-ink-100/75">
          This page gathers the Greek manuscripts, Latin witnesses, ancient versions,
          lectionaries, corrected states and Church Fathers recovered in the passage
          research. When Maj or Byz supports the KJV reading, it identifies the
          numerically dominant Greek transmission at that unit. In the Gospels this
          often represents well over one thousand continuous-text manuscripts, while
          Acts and the Epistles normally involve several hundred. Each green Majority
          Text card gives the best available passage-specific estimate, followed by the
          source scope and any necessary qualification.
        </p>
      </Reveal>

      <Reveal className="mt-8 rounded-[2rem] border border-ink-200 bg-white/80 p-6 shadow-card dark:border-white/10 dark:bg-white/[0.05]">
        <h2 className="font-display text-2xl font-black text-ink-900 dark:text-white">Passage index</h2>
        <nav className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3" aria-label="Full witness passage index">
          {fullWitnessEntries.map((entry) => (
            <a
              key={entry.slug}
              href={`#${entry.slug}`}
              className="rounded-2xl border border-ink-100 bg-ink-50/70 px-4 py-3 text-sm font-bold text-ink-800 transition hover:border-archive-gold hover:bg-archive-gold/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
            >
              {entry.reference}
            </a>
          ))}
        </nav>
      </Reveal>

      <div className="mt-10 grid gap-8">
        {fullWitnessEntries.map((entry) => (
          <Reveal
            key={entry.slug}
            className="scroll-mt-24 rounded-[2.5rem] border border-ink-200 bg-white/80 p-6 shadow-card dark:border-white/10 dark:bg-white/[0.05] sm:p-8"
          >
            <article id={entry.slug} aria-labelledby={`${entry.slug}-heading`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-archive-teal dark:text-teal-200">
                    Full witness roster
                  </p>
                  <h2 id={`${entry.slug}-heading`} className="mt-2 font-display text-3xl font-black text-ink-900 dark:text-white">
                    {entry.reference}
                  </h2>
                </div>
                <Link
                  href={`/passages/${entry.slug}`}
                  className="rounded-full border border-archive-teal/25 bg-archive-teal/[0.06] px-4 py-2 text-sm font-black text-archive-teal transition hover:bg-archive-teal/10 dark:text-teal-200"
                >
                  Passage dossier
                </Link>
              </div>

              <p className="mt-4 max-w-5xl leading-7 text-ink-700 dark:text-ink-100/75">{entry.summary}</p>
              <div className="mt-5 rounded-2xl border border-archive-teal/25 bg-archive-teal/[0.06] p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-ink-500 dark:text-ink-100/60">Apparatus and roster scope</p>
                <p className="mt-2 leading-7 text-ink-800 dark:text-ink-100/85">{entry.scope}</p>
              </div>
              <div className="mt-5 rounded-2xl border border-archive-gold/25 bg-archive-gold/10 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-ink-500 dark:text-ink-100/60">Disputed unit</p>
                <p className="mt-2 leading-7 text-ink-800 dark:text-ink-100/85">{entry.unit}</p>
              </div>

              <MajorityTextStandingCard slug={entry.slug} className="mt-5" />

              <dl className="mt-5 grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-ink-100 bg-ink-50/70 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                  <dt className="text-[0.68rem] font-black uppercase tracking-[0.15em] text-ink-500 dark:text-ink-100/55">Greek support in cited scope</dt>
                  <dd className="mt-2 text-sm font-bold leading-6 text-ink-900 dark:text-white">{entry.snapshot.greekSupport}</dd>
                </div>
                <div className="rounded-2xl border border-ink-100 bg-ink-50/70 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                  <dt className="text-[0.68rem] font-black uppercase tracking-[0.15em] text-ink-500 dark:text-ink-100/55">Greek competing evidence in cited scope</dt>
                  <dd className="mt-2 text-sm font-bold leading-6 text-ink-900 dark:text-white">{entry.snapshot.greekAgainst}</dd>
                </div>
                <div className="rounded-2xl border border-ink-100 bg-ink-50/70 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                  <dt className="text-[0.68rem] font-black uppercase tracking-[0.15em] text-ink-500 dark:text-ink-100/55">Evidence classification</dt>
                  <dd className="mt-2 text-sm font-bold leading-6 text-ink-900 dark:text-white">{entry.snapshot.supportCategory}</dd>
                </div>
                {entry.snapshot.percentSupport ? (
                  <div className="rounded-2xl border border-ink-100 bg-ink-50/70 p-4 dark:border-white/10 dark:bg-white/[0.04]">
                    <dt className="text-[0.68rem] font-black uppercase tracking-[0.15em] text-ink-500 dark:text-ink-100/55">Percentage and denominator</dt>
                    <dd className="mt-2 text-sm font-bold leading-6 text-ink-900 dark:text-white">{entry.snapshot.percentSupport}</dd>
                  </div>
                ) : null}
              </dl>


              {entry.snapshot.mainEvidenceAgainst.length ? (
                <div className="mt-5 rounded-2xl border border-rose-700/15 bg-rose-50/50 p-4 dark:border-rose-300/15 dark:bg-rose-300/[0.04]">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-rose-800 dark:text-rose-200">
                    Principal competing witnesses named in the snapshot
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {entry.snapshot.mainEvidenceAgainst.map((witness) => (
                      <span key={witness} className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-ink-700 dark:bg-white/10 dark:text-ink-100/75">
                        {witness}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {entry.notes?.length ? (
                <div className="mt-5 rounded-2xl border border-amber-700/15 bg-amber-50/60 p-4 dark:border-archive-gold/20 dark:bg-archive-gold/[0.05]">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-800 dark:text-archive-gold">
                    Factual distinctions
                  </p>
                  <ul className="mt-3 grid gap-2">
                    {entry.notes.map((note, index) => (
                      <li key={`${entry.slug}-note-${index}`} className="text-sm leading-6 text-ink-700 dark:text-ink-100/75">
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-6 grid gap-6">
                {entry.units.map((unit) => (
                  <section key={unit.id} aria-labelledby={`${entry.slug}-${unit.id}`}>
                    <div className="flex items-center gap-2">
                      <ScrollText className="h-4 w-4 text-archive-teal dark:text-teal-200" aria-hidden="true" />
                      <h3 id={`${entry.slug}-${unit.id}`} className="font-display text-2xl font-black text-ink-900 dark:text-white">
                        {unit.label}
                      </h3>
                    </div>
                    {unit.reading ? (
                      <p className="mt-2 text-sm leading-6 text-ink-600 dark:text-ink-100/65">
                        KJV/TR unit: <span className="font-semibold text-ink-800 dark:text-white">{unit.reading}</span>
                      </p>
                    ) : null}
                    <div className="mt-4 grid gap-3">
                      {unit.groups.map((group, index) => (
                        <div key={`${unit.id}-${group.label}-${index}`} className={`rounded-2xl border p-4 ${toneStyles[group.tone]}`}>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="font-black text-ink-900 dark:text-white">{group.label}</h4>
                            <span className="rounded-full bg-white/70 px-2.5 py-1 text-[0.66rem] font-black uppercase tracking-[0.12em] text-ink-600 dark:bg-white/10 dark:text-ink-100/70">
                              {toneLabels[group.tone]}
                            </span>
                          </div>
                          {group.reading ? <p className="mt-2 text-sm font-semibold text-ink-700 dark:text-ink-100/75">{group.reading}</p> : null}
                          {group.witnesses ? <p className="mt-3 break-words font-mono text-sm leading-7 text-ink-800 dark:text-ink-100/85">{group.witnesses}</p> : null}
                          {group.aggregates ? <p className="mt-2 text-sm leading-6 text-ink-700 dark:text-ink-100/75"><span className="font-black">Grouped evidence:</span> {group.aggregates}</p> : null}
                          {group.note ? <p className="mt-2 text-sm leading-6 text-ink-700 dark:text-ink-100/75">{group.note}</p> : null}
                        </div>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {(patristicRowsBySlug.get(entry.slug)?.length ?? 0) > 0 ? (
                <section className="mt-7" aria-labelledby={`${entry.slug}-fathers`}>
                  <h3 id={`${entry.slug}-fathers`} className="font-display text-2xl font-black text-ink-900 dark:text-white">Church Fathers and literary witnesses</h3>
                  <p className="mt-2 max-w-4xl text-sm leading-6 text-ink-600 dark:text-ink-100/65">
                    Precisely located citations and additional apparatus-level attributions are
                    displayed separately. An apparatus-level attribution does not claim that the
                    exact work and section have been independently verified here.
                  </p>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {(patristicRowsBySlug.get(entry.slug) ?? []).map((father, index) => (
                      <PatristicQuoteCard
                        key={`${entry.slug}-${father.author ?? father.source}-${father.workSection ?? index}-${index}`}
                        witness={father}
                        passageSlug={entry.slug}
                      />
                    ))}
                  </div>
                </section>
              ) : null}

              <section className="mt-7" aria-labelledby={`${entry.slug}-sources`}>
                <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-archive-teal dark:text-teal-200">
                  <Library className="h-4 w-4" aria-hidden="true" /> Sources
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {entry.sources.map((source) =>
                    source.url ? (
                      <a key={`${source.label}-${source.url}`} href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-archive-teal/25 bg-archive-teal/[0.06] px-3.5 py-2 text-xs font-bold text-archive-teal hover:bg-archive-teal/10 dark:text-teal-200">
                        {source.label}{source.locator ? ` — ${source.locator}` : ""}
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    ) : (
                      <span key={source.label} className="rounded-full border border-ink-200 bg-ink-50 px-3.5 py-2 text-xs font-bold text-ink-600 dark:border-white/10 dark:bg-white/5 dark:text-ink-100/70">
                        {source.label}{source.locator ? ` — ${source.locator}` : ""}
                      </span>
                    ),
                  )}
                </div>
              </section>

              <a href="#top" className="mt-7 inline-flex items-center gap-1.5 text-sm font-black text-archive-teal hover:underline dark:text-teal-200">
                <ArrowUp className="h-4 w-4" aria-hidden="true" /> Back to top
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
