import type { Metadata } from "next";

import { AmbientVideo } from "@/components/AmbientVideo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/motion/Reveal";
import { TransmissionExplorer } from "@/components/timeline/TransmissionExplorer";
import { buildFullTimeline, buildWitnessConstellation } from "@/data/derived";

export const metadata: Metadata = {
  title: "The Transmission Timeline",
  description:
    "Every dated event and every ancient witness in the catalog, plotted on one interactive timeline and one geographic-linguistic constellation.",
};

export default function TimelinePage() {
  const entries = buildFullTimeline();
  const branches = buildWitnessConstellation();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Timeline" }]} />
      <AmbientVideo
        src="/videos/ambient-evidence.mp4"
        className="mt-8 rounded-[2.5rem] border border-ink-200 bg-white/70 p-6 shadow-card dark:border-white/10 dark:bg-white/[0.05]"
        videoClassName="opacity-20 dark:opacity-16"
        overlayClassName="bg-gradient-to-br from-white/94 via-archive-paper/84 to-archive-gold/12 dark:from-archive-navy/94 dark:via-archive-navy/84 dark:to-archive-teal/10"
        playbackRate={0.5}
      >
        <Reveal className="max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-archive-teal dark:text-teal-200">
            Two ways to see the whole record
          </p>
          <h1 className="mt-2 font-display text-5xl font-black tracking-tight text-ink-900 dark:text-white">
            Watch sixteen centuries of testimony take shape.
          </h1>
          <p className="mt-5 text-lg leading-8 text-ink-700 dark:text-ink-100/75">
            Every passage&rsquo;s evidence file contributes dated events and named witnesses. Play
            the timeline to see the record accumulate era by era, or open the constellation to see
            how far the testimony for each reading actually spreads across the ancient church.
          </p>
        </Reveal>
      </AmbientVideo>

      <div className="mt-10">
        <TransmissionExplorer entries={entries} branches={branches} />
      </div>
    </div>
  );
}
