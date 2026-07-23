import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { Passage } from "@/data/types";

import { TagBadge } from "./TagBadge";

type PassageTableProps = {
  passages: Passage[];
};

export function PassageTable({ passages }: PassageTableProps) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-ink-200 bg-white/75 shadow-card dark:border-white/10 dark:bg-white/[0.05]">
      <div className="overflow-x-auto">
        <table className="min-w-[980px] text-left text-sm">
          <thead className="bg-ink-900 text-white dark:bg-white/10">
            <tr>
              <th className="px-5 py-4 font-bold">Passage</th>
              <th className="px-5 py-4 font-bold">Reading Summary</th>
              <th className="px-5 py-4 font-bold">Earliest KJV support</th>
              <th className="px-5 py-4 font-bold">Primary support</th>
              <th className="px-5 py-4 font-bold">Evidence represented</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100 dark:divide-white/10">
            {passages.map((passage) => (
              <tr key={passage.id} className="group transition hover:bg-archive-gold/10 dark:hover:bg-white/5">
                <td className="px-5 py-4 align-top">
                  <Link href={`/passages/${passage.slug}`} className="inline-flex items-center gap-1.5 font-black text-archive-blue hover:underline dark:text-teal-200">
                    {passage.reference}
                    <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" aria-hidden="true" />
                  </Link>
                  <p className="mt-1 text-xs text-ink-500 dark:text-ink-100/60">{passage.title}</p>
                </td>
                <td className="max-w-xs px-5 py-4 align-top text-ink-700 dark:text-ink-100/75">
                  {passage.readingSupported}
                </td>
                <td className="max-w-sm px-5 py-4 align-top font-bold leading-6 text-ink-900 dark:text-white">
                  {passage.earliestSupport?.[0]?.statement}
                </td>
                <td className="px-5 py-4 align-top">
                  <TagBadge tone="teal">
                    {passage.supportCategory}
                  </TagBadge>
                </td>
                <td className="px-5 py-4 align-top text-ink-700 dark:text-ink-100/75">
                  {[
                    passage.greekSupportWitnesses.length ? "Greek" : "",
                    passage.latinWitnesses.length || passage.versionalWitnesses.length
                      ? "Versions"
                      : "",
                    passage.patristicWitnesses.length ? "Fathers" : "",
                    passage.printedWitnesses?.length ? "Printed editions" : "",
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
