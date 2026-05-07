import type { Metadata } from "next";
import Link from "next/link";

import { AmbientVideo } from "@/components/AmbientVideo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { allPassages } from "@/data/derived";

export const metadata: Metadata = {
  title: "About",
  description: "About the contested Bible passage evidence database.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "About" }]} />
      <AmbientVideo
        src="/videos/ambient-evidence.mp4"
        className="mt-8 rounded-[2.5rem] border border-ink-200 bg-white/78 p-8 shadow-card dark:border-white/10 dark:bg-white/[0.05]"
        videoClassName="opacity-16 dark:opacity-12"
        overlayClassName="bg-gradient-to-br from-white/95 via-archive-paper/86 to-archive-gold/10 dark:from-archive-navy/95 dark:via-archive-navy/86 dark:to-archive-teal/10"
        playbackRate={0.5}
      >
        <p className="text-sm font-black uppercase tracking-[0.24em] text-archive-teal dark:text-teal-200">
          About
        </p>
        <h1 className="mt-2 font-display text-5xl font-black tracking-tight text-ink-900 dark:text-white">
          A research dashboard for contested readings.
        </h1>
        <div className="mt-6 grid gap-5 text-lg leading-8 text-ink-700 dark:text-ink-100/75">
          <p>
            Evidence Atlas is designed to make manuscript claims visible: what the KJV/TR reading says, what modern editions do with it, how much Greek support is listed, and which witnesses are named for and against.
          </p>
          <p>
            The launch dataset is structured from the supplied paper, with {allPassages.length} passage entries and reusable witness sections that can be expanded by editing one TypeScript data file.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/passages" className="rounded-full bg-ink-900 px-6 py-3 text-sm font-black text-white shadow-card transition hover:-translate-y-0.5 hover:bg-archive-blue dark:bg-archive-gold dark:text-ink-900">
            Browse the database
          </Link>
          <Link href="/methodology" className="rounded-full border border-ink-200 bg-white/70 px-6 py-3 text-sm font-black text-ink-800 transition hover:-translate-y-0.5 hover:border-archive-gold/60 dark:border-white/10 dark:bg-white/5 dark:text-white">
            Read methodology
          </Link>
        </div>
      </AmbientVideo>
    </div>
  );
}
