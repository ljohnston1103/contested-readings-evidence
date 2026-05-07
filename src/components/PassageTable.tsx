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
              <th className="px-5 py-4 font-bold">Greek Support</th>
              <th className="px-5 py-4 font-bold">Against</th>
              <th className="px-5 py-4 font-bold">Strength</th>
              <th className="px-5 py-4 font-bold">Key Evidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100 dark:divide-white/10">
            {passages.map((passage) => (
              <tr key={passage.id} className="transition hover:bg-archive-gold/10 dark:hover:bg-white/5">
                <td className="px-5 py-4 align-top">
                  <Link href={`/passages/${passage.slug}`} className="font-black text-archive-blue hover:underline dark:text-teal-200">
                    {passage.reference}
                  </Link>
                  <p className="mt-1 text-xs text-ink-500 dark:text-ink-100/60">{passage.title}</p>
                </td>
                <td className="max-w-xs px-5 py-4 align-top text-ink-700 dark:text-ink-100/75">
                  {passage.readingSupported}
                </td>
                <td className="px-5 py-4 align-top font-bold text-ink-900 dark:text-white">
                  {passage.manuscriptSnapshot.greekSupport}
                </td>
                <td className="px-5 py-4 align-top text-ink-700 dark:text-ink-100/75">
                  {passage.manuscriptSnapshot.greekAgainst}
                </td>
                <td className="px-5 py-4 align-top">
                  <TagBadge tone={passage.supportScore > 90 ? "teal" : passage.supportScore < 30 ? "red" : "gold"}>
                    {passage.supportCategory}
                  </TagBadge>
                </td>
                <td className="px-5 py-4 align-top text-ink-700 dark:text-ink-100/75">
                  {passage.manuscriptSnapshot.mainEvidenceAgainst.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
