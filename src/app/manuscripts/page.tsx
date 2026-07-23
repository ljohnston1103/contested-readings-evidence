import { BookOpen, Layers, PenLine, ScrollText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { AmbientVideo } from "@/components/AmbientVideo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SearchBar } from "@/components/SearchBar";
import { buildManuscriptIndex, displayedPassages } from "@/data/derived";

export const metadata: Metadata = {
  title: "Manuscript Witnesses",
  description: "Major Greek manuscript witnesses and where they support or oppose contested KJV/TR readings.",
};

const categoryIcons: Record<string, typeof ScrollText> = {
  Papyrus: ScrollText,
  "Major codex / uncial": BookOpen,
  Uncial: BookOpen,
  Minuscule: PenLine,
  "Manuscript family": Layers,
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
      <Reveal className="grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-archive-teal dark:text-teal-200">
            Manuscript witnesses
          </p>
          <h1 className="mt-2 font-display text-5xl font-black tracking-tight text-ink-900 dark:text-white">
            See where each Greek witness appears in the evidence.
          </h1>
          <p className="mt-5 text-lg leading-8 text-ink-700 dark:text-ink-100/75">
            This index summarizes the available passage evidence.
          </p>
        </div>
        <SearchBar passages={displayedPassages} compact />
      </Reveal>
      </AmbientVideo>

      <RevealGroup className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {manuscripts.map((profile) => {
          const dividedPassages = new Set(
            profile.supports
              .filter((support) => profile.opposes.some((oppose) => oppose.passage.id === support.passage.id))
              .map((support) => support.passage.id),
          );
          const passageLabel = (item: (typeof profile.supports)[number]) => {
            const labels = item.labels.length
              ? item.labels
              : dividedPassages.has(item.passage.id)
                ? ["divided evidence"]
                : [];
            return labels.length ? `${item.passage.reference} (${labels.join(", ")})` : item.passage.reference;
          };

          const Icon = categoryIcons[profile.category] ?? ScrollText;

          return (
            <RevealItem key={profile.name}>
            <article className="group h-full rounded-[2rem] border border-ink-200 bg-white/76 p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-archive-teal/50 dark:border-white/10 dark:bg-white/[0.05]">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-archive-teal/10 text-archive-teal transition group-hover:scale-110 dark:bg-teal-400/10 dark:text-teal-200">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-archive-teal dark:text-teal-200">
                  {profile.category}
                </p>
              </div>
              <h2 className="mt-3 font-display text-2xl font-black text-ink-900 dark:text-white">{profile.name}</h2>
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
                      profile.supports.map((item) => (
                        <Link key={item.passage.id} href={`/passages/${item.passage.slug}`} className="rounded-full bg-archive-teal/10 px-3 py-1 text-xs font-bold text-archive-teal dark:text-teal-200">
                          <span className="block">{passageLabel(item)}</span>
                          <span className="mt-1 block font-medium leading-5 text-ink-600 dark:text-ink-100/70">
                            Earliest KJV support: {item.passage.earliestSupport?.[0]?.statement}
                          </span>
                        </Link>
                      ))
                    ) : (
                      <span className="text-sm text-ink-500 dark:text-ink-100/60">No supporting examples listed yet.</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-700 dark:text-archive-gold">
                    Opposes KJV/TR in
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {profile.opposes.length ? (
                      profile.opposes.map((item) => (
                        <Link key={item.passage.id} href={`/passages/${item.passage.slug}`} className="rounded-full bg-amber-700/10 px-3 py-1 text-xs font-bold text-amber-800 dark:text-amber-100">
                          <span className="block">{passageLabel(item)}</span>
                          <span className="mt-1 block font-medium leading-5 text-ink-600 dark:text-ink-100/70">
                            Earliest KJV support: {item.passage.earliestSupport?.[0]?.statement}
                          </span>
                        </Link>
                      ))
                    ) : (
                      <span className="text-sm text-ink-500 dark:text-ink-100/60">No opposing examples listed yet.</span>
                    )}
                  </div>
                </div>
              </div>
            </article>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </div>
  );
}
