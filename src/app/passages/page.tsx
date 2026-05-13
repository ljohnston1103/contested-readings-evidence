import type { Metadata } from "next";

import { AmbientVideo } from "@/components/AmbientVideo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PassageBrowser } from "@/components/PassageBrowser";
import { displayedPassages } from "@/data/derived";

export const metadata: Metadata = {
  title: "Passage Index",
  description: "Browse contested New Testament readings by book, variant type, evidence strength, manuscript, father, or phrase.",
};

type PassagesPageProps = {
  searchParams?: Promise<{ search?: string }>;
};

export default async function PassagesPage({ searchParams }: PassagesPageProps) {
  const params = await searchParams;
  const initialSearch = params?.search ?? "";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Passages" }]} />
      <AmbientVideo
        src="/videos/ambient-evidence.mp4"
        className="mt-8 rounded-[2.5rem] border border-ink-200 bg-white/70 p-6 shadow-card dark:border-white/10 dark:bg-white/[0.05]"
        videoClassName="opacity-18 dark:opacity-16"
        overlayClassName="bg-gradient-to-br from-white/94 via-archive-paper/86 to-archive-gold/10 dark:from-archive-navy/94 dark:via-archive-navy/84 dark:to-archive-teal/10"
        playbackRate={0.5}
      >
      <div className="max-w-4xl">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-archive-teal dark:text-teal-200">
          Passage index
        </p>
        <h1 className="mt-2 font-display text-5xl font-black tracking-tight text-ink-900 dark:text-white">
          Browse contested readings like an evidence database.
        </h1>
        <p className="mt-5 text-lg leading-8 text-ink-700 dark:text-ink-100/75">
          Filter by book, variant category, manuscript support, versional traditions, patristic citations, or search directly for a witness like Vaticanus or Cyprian.
        </p>
      </div>
      </AmbientVideo>
      <div className="mt-10">
        <PassageBrowser passages={displayedPassages} initialSearch={initialSearch} />
      </div>
    </div>
  );
}
