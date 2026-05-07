import Link from "next/link";

import { AmbientVideo } from "@/components/AmbientVideo";
import { PassageCard } from "@/components/PassageCard";
import { SearchBar } from "@/components/SearchBar";
import { TagBadge } from "@/components/TagBadge";
import { allPassages } from "@/data/derived";
import type { Passage } from "@/data/types";

const featuredReferences = [
  "1 John 5:7",
  "Mark 16:9-20",
  "John 7:53-8:11",
  "Acts 8:37",
  "John 5:3b-4",
  "Matthew 17:21",
  "Matthew 18:11",
  "Matthew 23:14",
  "Mark 7:16",
  "Mark 9:44 and Mark 9:46",
  "Mark 11:26",
  "Mark 15:28",
];

const categories = [
  ["Major Omitted Passages", "Long-form readings with major footnotes and large evidence profiles."],
  ["Oldest and Best Footnotes", "Readings commonly introduced by modern manuscript-footnote language."],
  ["Doctrinal Variants", "Places where the reading carries doctrinal or confessional weight."],
  ["Majority Greek Support", "Readings where the paper lists broad Greek manuscript support."],
  ["Patristic Evidence", "Passages connected to early Christian writers and quotations."],
  ["Latin and Versional Evidence", "Latin, Syriac, Coptic, Gothic, Armenian, Georgian, Ethiopic, and Slavonic witnesses."],
];

const steps = [
  "Choose a passage",
  "View the KJV/TR reading",
  "Compare manuscript counts",
  "Review witnesses for and against",
  "Read patristic quotes and versional evidence",
];

export default function HomePage() {
  const featuredPassages = featuredReferences
    .map((reference) => allPassages.find((passage) => passage.reference === reference))
    .filter((passage): passage is Passage => Boolean(passage))
    .slice(0, 12);

  return (
    <div>
      <AmbientVideo
        src="/videos/ambient-evidence.mp4"
        className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
        videoClassName="opacity-25 blur-[1px] dark:opacity-18"
        overlayClassName="bg-gradient-to-br from-archive-paper/96 via-archive-paper/82 to-archive-teal/12 dark:from-archive-navy/96 dark:via-archive-navy/86 dark:to-archive-gold/10"
        playbackRate={0.5}
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <div className="flex flex-wrap gap-2">
              <TagBadge tone="gold">Interactive evidence database</TagBadge>
              <TagBadge tone="teal">Greek, versions, fathers</TagBadge>
            </div>
            <h1 className="mt-6 max-w-5xl font-display text-5xl font-black leading-[0.98] tracking-tight text-ink-900 dark:text-white sm:text-6xl lg:text-7xl">
              Explore the manuscript evidence behind contested Bible passages.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-700 dark:text-ink-100/78">
              Search disputed New Testament readings and compare Greek manuscripts,
              ancient versions, patristic quotations, and evidence for and against the KJV/TR reading.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/passages" className="rounded-full bg-ink-900 px-6 py-3 text-sm font-black text-white shadow-card transition hover:-translate-y-0.5 hover:bg-archive-blue dark:bg-archive-gold dark:text-ink-900">
                Browse Passages
              </Link>
              <Link href="/manuscripts" className="rounded-full border border-ink-200 bg-white/70 px-6 py-3 text-sm font-black text-ink-800 transition hover:-translate-y-0.5 hover:border-archive-gold/60 dark:border-white/10 dark:bg-white/5 dark:text-white">
                View Manuscript Evidence
              </Link>
              <Link href="/fathers" className="rounded-full border border-ink-200 bg-white/70 px-6 py-3 text-sm font-black text-ink-800 transition hover:-translate-y-0.5 hover:border-archive-gold/60 dark:border-white/10 dark:bg-white/5 dark:text-white">
                Explore Church Father Quotes
              </Link>
            </div>
          </div>
          <div className="rounded-[2.5rem] border border-archive-gold/25 bg-white/75 p-5 shadow-card backdrop-blur dark:border-archive-gold/20 dark:bg-white/[0.07]">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-archive-teal dark:text-teal-200">
              Find evidence fast
            </p>
            <div className="mt-4">
              <SearchBar passages={allPassages} />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-ink-900 p-4 text-white dark:bg-archive-gold dark:text-ink-900">
                <p className="font-display text-4xl font-black">{allPassages.length}</p>
                <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-75">Passages</p>
              </div>
              <div className="rounded-3xl border border-ink-100 bg-white/75 p-4 dark:border-white/10 dark:bg-white/5">
                <p className="font-display text-4xl font-black text-ink-900 dark:text-white">500+</p>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-100/60">Witness rows</p>
              </div>
              <div className="rounded-3xl border border-ink-100 bg-white/75 p-4 dark:border-white/10 dark:bg-white/5">
                <p className="font-display text-4xl font-black text-ink-900 dark:text-white">1</p>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-100/60">Data source</p>
              </div>
            </div>
          </div>
        </div>
      </AmbientVideo>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-archive-teal dark:text-teal-200">
              Featured passages
            </p>
            <h2 className="mt-2 font-display text-4xl font-black text-ink-900 dark:text-white">
              Start where the footnotes get interesting.
            </h2>
          </div>
          <Link href="/passages" className="text-sm font-black text-archive-blue hover:underline dark:text-teal-200">
            View all passages
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredPassages.map((passage) => (
            <PassageCard key={passage.id} passage={passage} featured />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map(([title, description]) => (
            <div key={title} className="rounded-[2rem] border border-ink-200 bg-white/70 p-6 shadow-card dark:border-white/10 dark:bg-white/[0.05]">
              <h3 className="font-display text-2xl font-black text-ink-900 dark:text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-100/70">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] border border-archive-gold/25 bg-ink-900 p-6 text-white shadow-card dark:bg-white/[0.06]">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-archive-gold">How it works</p>
          <div className="mt-6 grid gap-4 md:grid-cols-5">
            {steps.map((step, index) => (
              <div key={step} className="rounded-3xl border border-white/10 bg-white/8 p-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-archive-gold font-black text-ink-900">
                  {index + 1}
                </span>
                <p className="mt-4 text-sm font-bold leading-6">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
