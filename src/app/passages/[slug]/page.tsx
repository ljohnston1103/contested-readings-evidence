import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AmbientVideo } from "@/components/AmbientVideo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EvidenceTabs } from "@/components/EvidenceTabs";
import { ManuscriptSnapshotCard } from "@/components/ManuscriptSnapshotCard";
import { NextPreviousPassageNav } from "@/components/NextPreviousPassageNav";
import { TagBadge } from "@/components/TagBadge";
import { adjacentPassages, allPassages, findPassage } from "@/data/derived";

type PassagePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allPassages.map((passage) => ({ slug: passage.slug }));
}

export async function generateMetadata({ params }: PassagePageProps): Promise<Metadata> {
  const { slug } = await params;
  const passage = findPassage(slug);
  if (!passage) return {};
  return {
    title: `${passage.reference}: ${passage.title}`,
    description: passage.shortSummary,
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

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.78fr] lg:items-start">
        <div className="rounded-[2.5rem] border border-ink-200 bg-white/78 p-6 shadow-card dark:border-white/10 dark:bg-white/[0.06]">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-archive-teal dark:text-teal-200">
            {passage.reference}
          </p>
          <h1 className="mt-3 font-display text-5xl font-black leading-tight tracking-tight text-ink-900 dark:text-white">
            {passage.title}
          </h1>
          <div className="mt-6 grid gap-4">
            <div className="rounded-3xl border border-archive-gold/25 bg-archive-gold/10 p-5">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-ink-500 dark:text-ink-100/60">
                Reading Supported
              </p>
              <p className="mt-2 font-display text-2xl font-black leading-9 text-ink-900 dark:text-white">
                {passage.readingSupported}
              </p>
            </div>
            <div className="rounded-3xl border border-ink-100 bg-ink-50/80 p-5 dark:border-white/10 dark:bg-white/5">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-ink-500 dark:text-ink-100/60">
                Variant Issue
              </p>
              <p className="mt-2 text-base leading-7 text-ink-700 dark:text-ink-100/75">
                {passage.variantIssue}
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {passage.tags.map((tag) => (
              <TagBadge key={tag} tone={tag.includes("Complex") ? "red" : tag.includes("Majority") ? "teal" : "neutral"}>
                {tag}
              </TagBadge>
            ))}
          </div>
        </div>
        <AmbientVideo
          src="/videos/ambient-manuscripts.mp4"
          className="rounded-[2.5rem] border border-ink-200 bg-ink-900 text-white shadow-card dark:border-white/10 dark:bg-white/[0.06]"
          videoClassName="opacity-30 dark:opacity-20"
          overlayClassName="bg-gradient-to-br from-ink-900/94 via-ink-900/88 to-archive-teal/35 dark:from-archive-navy/94 dark:via-archive-navy/84 dark:to-archive-gold/14"
        >
        <div className="p-6">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-archive-gold">
            Quick read
          </p>
          <p className="mt-4 text-lg leading-8 text-white/82 dark:text-ink-100/80">
            {passage.shortSummary}
          </p>
          <div className="mt-6 grid gap-3">
            <div className="rounded-3xl bg-white/10 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/55">Support category</p>
              <p className="mt-2 font-black">{passage.supportCategory}</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/55">Sources used</p>
              <p className="mt-2 text-sm leading-6">{passage.sources.join("; ")}</p>
            </div>
          </div>
        </div>
        </AmbientVideo>
      </section>

      <div className="mt-8">
        <ManuscriptSnapshotCard passage={passage} />
      </div>

      <div className="mt-8">
        <EvidenceTabs passage={passage} />
      </div>

      <div className="mt-10">
        <NextPreviousPassageNav previous={adjacent.previous} next={adjacent.next} />
      </div>
    </div>
  );
}
