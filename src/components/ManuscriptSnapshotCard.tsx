import type { Passage } from "@/data/types";

type ManuscriptSnapshotCardProps = {
  passage: Passage;
};

export function ManuscriptSnapshotCard({ passage }: ManuscriptSnapshotCardProps) {
  const stats = [
    ["Support summary", passage.manuscriptSnapshot.greekSupport],
    ["Opposition / alternatives", passage.manuscriptSnapshot.greekAgainst],
    ["Support category", passage.manuscriptSnapshot.supportCategory],
    ["Lectionary support", passage.manuscriptSnapshot.lectionarySupport ?? "Not specified"],
  ];

  return (
    <section className="rounded-[2rem] border border-archive-gold/25 bg-gradient-to-br from-white to-archive-paper p-5 shadow-card dark:border-archive-gold/20 dark:from-white/[0.08] dark:to-white/[0.03]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-archive-gold">
            Evidence snapshot
          </p>
          <h2 className="mt-2 font-display text-3xl font-black text-ink-900 dark:text-white">
            The cited evidence at a glance.
          </h2>
        </div>
        {passage.manuscriptSnapshot.percentSupport && (
          <div className="rounded-3xl bg-ink-900 px-5 py-4 text-right text-white shadow-glow transition duration-300 hover:scale-[1.03] dark:bg-archive-gold dark:text-ink-900">
            <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-70">Greek support</p>
            <p className="font-display text-4xl font-black">{passage.manuscriptSnapshot.percentSupport}</p>
          </div>
        )}
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-3xl border border-ink-100 bg-white/80 p-4 transition duration-300 hover:-translate-y-1 hover:border-archive-gold/40 dark:border-white/10 dark:bg-archive-navy/55">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-400 dark:text-ink-100/45">
              {label}
            </p>
            <p className="mt-2 text-lg font-black leading-tight text-ink-900 dark:text-white">
              {value}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-3xl border border-amber-900/10 bg-archive-gold/10 p-4 dark:border-archive-gold/20">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-100/60">
          Main evidence against
        </p>
        <p className="mt-2 font-semibold text-ink-800 dark:text-ink-50">
          {passage.manuscriptSnapshot.mainEvidenceAgainst.join(", ")}
        </p>
      </div>
    </section>
  );
}
