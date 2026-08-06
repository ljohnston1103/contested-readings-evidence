import { ScrollText, UserRound } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { AmbientVideo } from "@/components/AmbientVideo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { buildFatherIndex } from "@/data/derived";
import { formatDateLabel } from "@/data/evidenceDates";
import { patristicEvidenceFormLabel } from "@/data/patristicCategory";

export const metadata: Metadata = {
  title: "Church Fathers",
  description: "Early Christian writers cited as patristic evidence for contested readings.",
};

const roleStyles = {
  supports:
    "border-emerald-700/25 bg-emerald-50/75 hover:border-emerald-700/50 dark:border-emerald-300/20 dark:bg-emerald-300/[0.07]",
  opposes:
    "border-rose-700/25 bg-rose-50/75 hover:border-rose-700/50 dark:border-rose-300/20 dark:bg-rose-300/[0.07]",
  mixed:
    "border-amber-700/25 bg-amber-50/75 hover:border-amber-700/50 dark:border-amber-300/20 dark:bg-amber-300/[0.07]",
} as const;

const roleLabels = {
  supports: "Supporting witness",
  opposes: "Competing witness",
  mixed: "Mixed witness",
} as const;

const roleAccentStyles = {
  supports: "text-emerald-800 dark:text-emerald-200",
  opposes: "text-rose-800 dark:text-rose-200",
  mixed: "text-amber-800 dark:text-amber-200",
} as const;

export default function FathersPage() {
  const fathers = buildFatherIndex();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Fathers" }]} />
      <AmbientVideo
        src="/videos/ambient-evidence.mp4"
        className="mt-8 rounded-[2.5rem] border border-ink-200 bg-white/70 p-6 shadow-card dark:border-white/10 dark:bg-white/[0.05]"
        videoClassName="opacity-18 dark:opacity-14"
        overlayClassName="bg-gradient-to-br from-white/94 via-archive-paper/84 to-archive-gold/12 dark:from-archive-navy/94 dark:via-archive-navy/84 dark:to-archive-teal/10"
        playbackRate={0.5}
      >
      <Reveal className="max-w-4xl">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-archive-teal dark:text-teal-200">
          Church fathers
        </p>
        <h1 className="mt-2 font-display text-5xl font-black tracking-tight text-ink-900 dark:text-white">
          Patristic evidence, grouped by source.
        </h1>
        <p className="mt-5 text-lg leading-8 text-ink-700 dark:text-ink-100/75">
          Every citation is classified as a Supporting witness, a Competing
          witness, or, only where the same evidence cannot responsibly be placed
          on one side, a Mixed witness. Green supports the KJV/TR reading, red
          carries a competing reading, and tan marks the rare mixed cases.
        </p>
      </Reveal>
      </AmbientVideo>

      <RevealGroup className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {fathers.map((father) => (
          <RevealItem key={father.name}>
          <article className="group h-full rounded-[2rem] border border-archive-gold/25 bg-white/78 p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-archive-gold/60 dark:border-archive-gold/20 dark:bg-white/[0.05]">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-archive-gold/12 text-archive-gold transition group-hover:scale-110">
                <UserRound className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-archive-gold">
                {formatDateLabel(father.dateRange)}
              </p>
            </div>
            <h2 className="mt-3 font-display text-3xl font-black text-ink-900 dark:text-white">{father.name}</h2>
            {father.region && (
              <p className="mt-1 text-sm font-bold text-archive-teal dark:text-teal-200">
                {father.region}
              </p>
            )}
            <div className="mt-5 grid gap-3">
              {father.passages.map(({ passage, witness, role }) => (
                <Link
                  key={`${passage.id}-${witness.author ?? witness.source}-${witness.workSection ?? ""}`}
                  href={`/passages/${passage.slug}`}
                  className={`group/link flex items-start gap-3 rounded-3xl border p-4 transition hover:-translate-y-0.5 ${roleStyles[role]}`}
                >
                  <ScrollText className={`mt-0.5 h-4 w-4 shrink-0 transition group-hover/link:scale-110 ${roleAccentStyles[role]}`} aria-hidden="true" />
                  <span>
                    <p className="text-sm font-black text-ink-900 dark:text-white">
                      {passage.reference} · {passage.title}
                    </p>
                    <p className={`mt-1 text-xs font-bold leading-5 ${roleAccentStyles[role]}`}>
                      Date: {formatDateLabel(witness.date)}
                    </p>
                    <p className={`mt-1 text-xs font-extrabold uppercase tracking-[0.12em] ${roleAccentStyles[role]}`}>
                      {roleLabels[role]}
                    </p>
                    {witness.workSection ? (
                      <p className="mt-1 text-xs font-bold text-ink-700 dark:text-ink-100/75">
                        {witness.workSection}
                      </p>
                    ) : null}
                    <p className={`mt-1 text-xs font-bold ${roleAccentStyles[role]}`}>
                      Citation type: {patristicEvidenceFormLabel(witness)}
                    </p>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-600 dark:text-ink-100/70">
                      {witness.quoteSummary}
                    </p>
                  </span>
                </Link>
              ))}
            </div>
          </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
