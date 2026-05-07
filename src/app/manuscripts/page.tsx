import type { Metadata } from "next";
import Link from "next/link";

import { AmbientVideo } from "@/components/AmbientVideo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SearchBar } from "@/components/SearchBar";
import { buildManuscriptIndex, allPassages } from "@/data/derived";

export const metadata: Metadata = {
  title: "Manuscript Witnesses",
  description: "Major Greek manuscript witnesses and where they support or oppose contested KJV/TR readings.",
};

export default function ManuscriptsPage() {
  const manuscripts = buildManuscriptIndex();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Manuscripts" }]} />
      <AmbientVideo
        src="/videos/ambient-manuscripts.mp4"
        className="mt-8 rounded-[2.5rem] border border-ink-200 bg-white/70 p-6 shadow-card dark:border-white/10 dark:bg-white/[0.05]"
        videoClassName="opacity-22 dark:opacity-18"
        overlayClassName="bg-gradient-to-br from-white/94 via-archive-paper/84 to-archive-teal/12 dark:from-archive-navy/94 dark:via-archive-navy/84 dark:to-archive-gold/10"
      >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-archive-teal dark:text-teal-200">
            Manuscript witnesses
          </p>
          <h1 className="mt-2 font-display text-5xl font-black tracking-tight text-ink-900 dark:text-white">
            See where each Greek witness appears in the evidence.
          </h1>
          <p className="mt-5 text-lg leading-8 text-ink-700 dark:text-ink-100/75">
            This index is generated from the passage data, so additions to a passage automatically update the manuscript profiles.
          </p>
        </div>
        <SearchBar passages={allPassages} compact />
      </div>
      </AmbientVideo>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {manuscripts.map((profile) => (
          <article key={profile.name} className="rounded-[2rem] border border-ink-200 bg-white/76 p-5 shadow-card dark:border-white/10 dark:bg-white/[0.05]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-archive-teal dark:text-teal-200">
              {profile.category}
            </p>
            <h2 className="mt-2 font-display text-2xl font-black text-ink-900 dark:text-white">{profile.name}</h2>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-ink-500 dark:text-ink-100/60">
              {profile.siglum && <span>Siglum: {profile.siglum}</span>}
              <span>Date: {profile.date}</span>
            </div>
            <div className="mt-5 grid gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-archive-teal dark:text-teal-200">
                  Supports KJV/TR in
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.supports.length ? (
                    profile.supports.map(({ passage }) => (
                      <Link key={passage.id} href={`/passages/${passage.slug}`} className="rounded-full bg-archive-teal/10 px-3 py-1 text-xs font-bold text-archive-teal dark:text-teal-200">
                        {passage.reference}
                      </Link>
                    ))
                  ) : (
                    <span className="text-sm text-ink-500 dark:text-ink-100/60">No support rows in current data</span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-700 dark:text-archive-gold">
                  Opposes KJV/TR in
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.opposes.length ? (
                    profile.opposes.map(({ passage }) => (
                      <Link key={passage.id} href={`/passages/${passage.slug}`} className="rounded-full bg-amber-700/10 px-3 py-1 text-xs font-bold text-amber-800 dark:text-amber-100">
                        {passage.reference}
                      </Link>
                    ))
                  ) : (
                    <span className="text-sm text-ink-500 dark:text-ink-100/60">No opposition rows in current data</span>
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
