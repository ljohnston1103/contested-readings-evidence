import { BarChart3 } from "lucide-react";

import { majorityTextStandingsForSlug } from "@/data/majorityText";

type MajorityTextStandingCardProps = {
  slug: string;
  className?: string;
  compact?: boolean;
};

export function MajorityTextStandingCard({
  slug,
  className = "",
  compact = false,
}: MajorityTextStandingCardProps) {
  const standings = majorityTextStandingsForSlug(slug);
  if (standings.length === 0) return null;

  return (
    <section
      className={`rounded-2xl border border-emerald-700/25 bg-emerald-50/75 p-5 dark:border-emerald-300/20 dark:bg-emerald-300/[0.07] ${className}`.trim()}
      aria-label="Majority Text standing"
    >
      <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-800 dark:text-emerald-200">
        <BarChart3 className="h-4 w-4" aria-hidden="true" />
        Majority Text standing
      </p>
      <div className={compact ? "mt-3 grid gap-3" : "mt-4 grid gap-4"}>
        {standings.map((standing) => (
          <div
            key={standing.unit}
            className="rounded-xl border border-emerald-700/15 bg-white/75 p-4 dark:border-white/10 dark:bg-white/[0.05]"
          >
            <p className="text-sm font-black text-ink-900 dark:text-white">
              {standing.unit}
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-emerald-900 dark:text-emerald-100">
              {standing.statement}
            </p>
            <p className="mt-2 text-sm leading-6 text-ink-700 dark:text-ink-100/75">
              <span className="font-black">Estimated Greek support:</span>{" "}
              {standing.estimate}
            </p>
            {standing.qualification ? (
              <p className="mt-2 text-sm leading-6 text-amber-900 dark:text-amber-100">
                <span className="font-black">Unit qualification:</span>{" "}
                {standing.qualification}
              </p>
            ) : null}
            {!compact ? (
              <p className="mt-2 text-xs leading-5 text-ink-500 dark:text-ink-100/55">
                {standing.basis}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
