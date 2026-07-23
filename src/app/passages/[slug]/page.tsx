import { BookOpenCheck, GitCompare, ListChecks, Quote, ScrollText } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AmbientVideo } from "@/components/AmbientVideo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EarliestSupportPanel } from "@/components/EarliestSupportPanel";
import { EvidenceTabs } from "@/components/EvidenceTabs";
import { ManuscriptSnapshotCard } from "@/components/ManuscriptSnapshotCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { NextPreviousPassageNav } from "@/components/NextPreviousPassageNav";
import { PassageActionBar } from "@/components/PassageActionBar";
import { ReferencesSection } from "@/components/ReferencesSection";
import { TagBadge } from "@/components/TagBadge";
import { adjacentPassages, displayedPassages, findPassage } from "@/data/derived";

type PassagePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return displayedPassages.map((passage) => ({ slug: passage.slug }));
}

export async function generateMetadata({ params }: PassagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const passage = findPassage(slug);
  if (!passage) return {};
  return {
    title: `${passage.reference}: ${passage.title}`,
    description: passage.shortSummary,
    alternates: {
      canonical: `/passages/${passage.slug}`,
    },
  };
}

export default async function PassagePage({ params }: PassagePageProps) {
  const { slug } = await params;
  const passage = findPassage(slug);
  if (!passage) notFound();
  const adjacent = adjacentPassages(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { href: "/passages", label: "Passages" },
          { label: passage.reference },
        ]}
      />

      <RevealGroup className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.78fr] lg:items-start">
        <RevealItem className="rounded-[2.5rem] border border-ink-200 bg-white/[0.78] p-6 shadow-card dark:border-white/10 dark:bg-white/[0.06]">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-archive-teal dark:text-teal-200">
            {passage.reference}
          </p>
          <h1 className="mt-3 font-display text-5xl font-black leading-tight tracking-tight text-ink-900 dark:text-white">
            {passage.title}
          </h1>
          <div className="mt-6 grid gap-4">
            <div className="rounded-3xl border border-archive-gold/25 bg-archive-gold/10 p-5 transition duration-300 hover:border-archive-gold/50 hover:bg-archive-gold/15">
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-ink-500 dark:text-ink-100/60">
                <BookOpenCheck className="h-4 w-4 text-archive-gold" aria-hidden="true" />
                KJV Reading Defended
              </p>
              <p className="mt-2 font-display text-2xl font-black leading-9 text-ink-900 dark:text-white">
                {passage.readingSupported}
              </p>
            </div>
            <div className="rounded-3xl border border-ink-100 bg-ink-50/80 p-5 transition duration-300 hover:border-archive-teal/40 hover:bg-archive-teal/5 dark:border-white/10 dark:bg-white/5">
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-ink-500 dark:text-ink-100/60">
                <GitCompare className="h-4 w-4 text-archive-teal dark:text-teal-200" aria-hidden="true" />
                Why the KJV Reading Is Retained
              </p>
              <p className="mt-2 text-base leading-7 text-ink-700 dark:text-ink-100/75">
                {passage.variantIssue}
              </p>
            </div>
            {passage.disputedUnit && (
              <div className="rounded-3xl border border-ink-100 bg-white/70 p-5 transition duration-300 hover:border-archive-teal/40 dark:border-white/10 dark:bg-white/5">
                <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-ink-500 dark:text-ink-100/60">
                  <ScrollText className="h-4 w-4 text-archive-teal dark:text-teal-200" aria-hidden="true" />
                  Disputed unit
                </p>
                <p className="mt-2 whitespace-pre-line break-words text-base leading-7 text-ink-700 dark:text-ink-100/75">
                  {passage.disputedUnit}
                </p>
              </div>
            )}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {passage.tags.map((tag) => (
              <TagBadge key={tag} tone={tag.includes("Complex") ? "red" : tag.includes("Majority") ? "teal" : "neutral"}>
                {tag}
              </TagBadge>
            ))}
          </div>
        </RevealItem>
        <RevealItem>
        <AmbientVideo
          src="/videos/ambient-manuscripts.mp4"
          className="h-full rounded-[2.5rem] border border-ink-200 bg-ink-900 text-white shadow-card dark:border-white/10 dark:bg-white/[0.06]"
          videoClassName="opacity-30 dark:opacity-20"
          overlayClassName="bg-gradient-to-br from-ink-900/[0.94] via-ink-900/[0.88] to-archive-teal/35 dark:from-archive-navy/[0.94] dark:via-archive-navy/[0.84] dark:to-archive-gold/[0.14]"
        >
        <div className="p-6">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-archive-gold">
            Editorial conclusion
          </p>
          <p className="mt-4 text-lg leading-8 text-white/[0.82] dark:text-ink-100/80">
            {passage.shortSummary}
          </p>
          <div className="mt-6 grid gap-3">
            <div className="rounded-3xl bg-white/10 p-4 transition duration-300 hover:bg-white/15">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/55">
                Primary support for the KJV reading
              </p>
              <p className="mt-2 font-black">{passage.supportCategory}</p>
            </div>
          </div>
        </div>
        </AmbientVideo>
        </RevealItem>
      </RevealGroup>

      <Reveal className="mt-8">
        <section
          id="kjv-reading"
          aria-labelledby="kjv-reading-heading"
          className="relative overflow-hidden rounded-[2rem] border border-archive-gold/30 bg-white/80 p-6 shadow-card dark:border-archive-gold/20 dark:bg-white/[0.055] sm:p-8"
        >
          <div
            className="absolute -right-12 -top-16 font-display text-[13rem] leading-none text-archive-gold/[0.07] dark:text-archive-gold/[0.08]"
            aria-hidden="true"
          >
            &ldquo;
          </div>
          <div className="relative">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-archive-teal dark:text-teal-200">
              <Quote className="h-4 w-4" aria-hidden="true" />
              King James Bible reading
            </p>
            <h2 id="kjv-reading-heading" className="sr-only">
              {passage.reference} in the King James Bible
            </h2>
            <blockquote className="mt-5 max-w-5xl whitespace-pre-line font-display text-2xl font-bold leading-[1.55] text-ink-900 dark:text-white sm:text-3xl">
              {passage.kjvText}
            </blockquote>
            <PassageActionBar passage={passage} />
          </div>
        </section>
      </Reveal>

      <Reveal className="mt-8">
        <EarliestSupportPanel passage={passage} />
      </Reveal>

      <Reveal className="mt-8">
        <ManuscriptSnapshotCard passage={passage} />
      </Reveal>

      {passage.cautions?.length ? (
        <Reveal className="mt-8">
          <section className="rounded-[2rem] border border-amber-700/20 bg-amber-50/80 p-6 shadow-card dark:border-archive-gold/20 dark:bg-archive-gold/[0.07]">
            <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.22em] text-amber-800 dark:text-archive-gold">
              <ListChecks className="h-4 w-4" aria-hidden="true" />
              Evidence notes
            </p>
            <h2 className="mt-2 font-display text-3xl font-black text-ink-900 dark:text-white">
              Important distinctions in the evidence.
            </h2>
            <ul className="mt-5 grid gap-3">
              {passage.cautions.map((caution, index) => (
                <li
                  key={`${passage.slug}-caution-${index}`}
                  className="flex gap-3 rounded-2xl border border-amber-700/10 bg-white/70 p-4 text-sm leading-6 text-ink-700 dark:border-white/10 dark:bg-white/5 dark:text-ink-100/75"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-700 dark:bg-archive-gold"
                    aria-hidden="true"
                  />
                  <span>{caution}</span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      ) : null}

      <Reveal className="mt-8" delay={0.05}>
        <EvidenceTabs passage={passage} />
      </Reveal>

      <Reveal className="mt-8" delay={0.05}>
        <ReferencesSection passage={passage} />
      </Reveal>

      <Reveal className="mt-10" delay={0.05}>
        <NextPreviousPassageNav previous={adjacent.previous} next={adjacent.next} />
      </Reveal>
    </div>
  );
}
