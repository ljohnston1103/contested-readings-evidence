import type { Metadata } from "next";
import Link from "next/link";

import { AmbientVideo } from "@/components/AmbientVideo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildVersionIndex } from "@/data/derived";

export const metadata: Metadata = {
  title: "Ancient Versions",
  description: "Ancient language traditions and where they support or oppose contested readings.",
};

export default function VersionsPage() {
  const versions = buildVersionIndex();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Versions" }]} />
      <AmbientVideo
        src="/videos/ambient-manuscripts.mp4"
        className="mt-8 rounded-[2.5rem] border border-ink-200 bg-white/70 p-6 shadow-card dark:border-white/10 dark:bg-white/[0.05]"
        videoClassName="opacity-18 dark:opacity-14"
        overlayClassName="bg-gradient-to-br from-white/94 via-archive-paper/84 to-archive-teal/12 dark:from-archive-navy/94 dark:via-archive-navy/84 dark:to-archive-gold/10"
      >
      <div className="max-w-4xl">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-archive-teal dark:text-teal-200">
          Ancient versions
        </p>
        <h1 className="mt-2 font-display text-5xl font-black tracking-tight text-ink-900 dark:text-white">
          Versional evidence by language tradition.
        </h1>
        <p className="mt-5 text-lg leading-8 text-ink-700 dark:text-ink-100/75">
          These cards make it easy to see whether Latin, Syriac, Coptic, Gothic, Armenian, Georgian, Ethiopic, or Slavonic evidence appears for a reading.
        </p>
      </div>
      </AmbientVideo>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {versions.map((version) => (
          <article key={version.name} className="rounded-[2rem] border border-ink-200 bg-white/76 p-5 shadow-card dark:border-white/10 dark:bg-white/[0.05]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-archive-teal dark:text-teal-200">
              {version.language}
            </p>
            <h2 className="mt-2 font-display text-3xl font-black text-ink-900 dark:text-white">{version.name}</h2>
            <p className="mt-1 text-sm font-bold text-ink-500 dark:text-ink-100/60">{version.date}</p>
            <div className="mt-5 grid gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-archive-teal dark:text-teal-200">
                  Supports KJV/TR
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {version.supports.length ? (
                    version.supports.map(({ passage }) => (
                      <Link key={`${version.name}-${passage.id}-support`} href={`/passages/${passage.slug}`} className="rounded-full bg-archive-teal/10 px-3 py-1 text-xs font-bold text-archive-teal dark:text-teal-200">
                        {passage.reference}
                      </Link>
                    ))
                  ) : (
                    <span className="text-sm text-ink-500 dark:text-ink-100/60">No supporting examples listed yet.</span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-700 dark:text-archive-gold">
                  Opposes KJV/TR
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {version.opposes.length ? (
                    version.opposes.map(({ passage }) => (
                      <Link key={`${version.name}-${passage.id}-oppose`} href={`/passages/${passage.slug}`} className="rounded-full bg-amber-700/10 px-3 py-1 text-xs font-bold text-amber-800 dark:text-amber-100">
                        {passage.reference}
                      </Link>
                    ))
                  ) : (
                    <span className="text-sm text-ink-500 dark:text-ink-100/60">No opposing examples listed yet.</span>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
