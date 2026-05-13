"use client";

import { useMemo, useState } from "react";

import { formatEntryCount, publicPatristicWitnesses } from "@/data/derived";
import type { Passage, Witness } from "@/data/types";

import { EvidenceTable } from "./EvidenceTable";
import { PatristicQuoteCard } from "./PatristicQuoteCard";
import { SupportComparisonBar } from "./SupportComparisonBar";
import { Timeline } from "./Timeline";

type EvidenceTabsProps = {
  passage: Passage;
};

const tabs = [
  "Summary",
  "Greek Manuscripts",
  "Early Versions",
  "Latin Witnesses",
  "Syriac Witnesses",
  "Other Versions",
  "Church Fathers",
  "Evidence Against",
  "Timeline",
] as const;

function isSyriac(row: Witness) {
  return row.kind === "syriac" || /syriac|peshitta|harclean|curetonian/i.test(row.witness);
}

function isLatin(row: Witness) {
  return row.kind === "latin" || /latin|vulgate|codex fuldensis|codex amiatinus/i.test(row.witness);
}

export function EvidenceTabs({ passage }: EvidenceTabsProps) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Summary");
  const earlyVersions = useMemo(
    () => [...passage.latinWitnesses, ...passage.versionalWitnesses],
    [passage],
  );
  const visiblePatristicWitnesses = useMemo(() => publicPatristicWitnesses(passage), [passage]);
  const patristicGroups = useMemo(() => {
    const hasSupportGroups = visiblePatristicWitnesses.some((witness) =>
      witness.region?.startsWith("Supporting "),
    );
    if (!hasSupportGroups) {
      return [{ title: "", witnesses: visiblePatristicWitnesses }];
    }

    const groups = new Map<string, typeof visiblePatristicWitnesses>();
    for (const witness of visiblePatristicWitnesses) {
      const title = witness.region ?? "Other patristic witnesses";
      groups.set(title, [...(groups.get(title) ?? []), witness]);
    }

    return Array.from(groups, ([title, witnesses]) => ({ title, witnesses }));
  }, [visiblePatristicWitnesses]);
  const syriac = earlyVersions.filter(isSyriac);
  const otherVersions = earlyVersions.filter((row) => !isLatin(row) && !isSyriac(row));

  return (
    <section className="grid gap-5">
      <div className="sticky top-[5.25rem] z-30 flex gap-2 overflow-x-auto rounded-full border border-ink-200 bg-white/85 p-2 shadow-card backdrop-blur dark:border-white/10 dark:bg-archive-navy/85">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-black transition ${
              activeTab === tab
                ? "bg-ink-900 text-white dark:bg-archive-gold dark:text-ink-900"
                : "text-ink-600 hover:bg-archive-gold/10 dark:text-ink-100/70 dark:hover:bg-white/10"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Summary" && (
        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2rem] border border-ink-200 bg-white/80 p-6 shadow-card dark:border-white/10 dark:bg-white/[0.05]">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-archive-teal dark:text-teal-200">
              Evidence Summary
            </p>
            <h2 className="mt-2 font-display text-3xl font-black text-ink-900 dark:text-white">
              {passage.supportCategory}
            </h2>
            <p className="mt-4 text-base leading-7 text-ink-700 dark:text-ink-100/75">
              {passage.shortSummary}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-ink-50 p-4 dark:bg-white/5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-400">Greek support</p>
                <p className="mt-2 font-black text-ink-900 dark:text-white">{passage.manuscriptSnapshot.greekSupport}</p>
              </div>
              <div className="rounded-3xl bg-ink-50 p-4 dark:bg-white/5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-400">Against</p>
                <p className="mt-2 font-black text-ink-900 dark:text-white">{passage.manuscriptSnapshot.greekAgainst}</p>
              </div>
              <div className="rounded-3xl bg-ink-50 p-4 dark:bg-white/5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-400">Patristic</p>
                <p className="mt-2 font-black text-ink-900 dark:text-white">
                  {visiblePatristicWitnesses.length ? formatEntryCount(visiblePatristicWitnesses.length) : "None listed"}
                </p>
              </div>
            </div>
          </div>
          <SupportComparisonBar passage={passage} />
        </div>
      )}

      {activeTab === "Greek Manuscripts" && (
        <EvidenceTable title="Greek Manuscripts Supporting the KJV/TR Reading" rows={passage.greekSupportWitnesses} />
      )}

      {activeTab === "Early Versions" && (
        <EvidenceTable title="Early Versional Witnesses" rows={earlyVersions} />
      )}

      {activeTab === "Latin Witnesses" && (
        <EvidenceTable title="Latin Witnesses" rows={passage.latinWitnesses} />
      )}

      {activeTab === "Syriac Witnesses" && (
        <EvidenceTable title="Syriac Witnesses" rows={syriac} />
      )}

      {activeTab === "Other Versions" && (
        <EvidenceTable title="Other Ancient Versions" rows={otherVersions} />
      )}

      {activeTab === "Church Fathers" && (
        <div className="grid gap-5">
          {visiblePatristicWitnesses.length ? (
            patristicGroups.map((group) => (
              <div key={group.title || "patristic-witnesses"} className="grid gap-4">
                {group.title && (
                  <h3 className="font-display text-2xl font-black text-ink-900 dark:text-white">
                    {group.title}
                  </h3>
                )}
                <div className="grid gap-4 md:grid-cols-2">
                  {group.witnesses.map((witness) => (
                    <PatristicQuoteCard key={`${witness.source}-${witness.date}`} witness={witness} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="rounded-3xl border border-dashed border-ink-200 p-6 text-sm text-ink-600 dark:border-white/10 dark:text-ink-100/70">
              No patristic witnesses are listed for this passage yet.
            </p>
          )}
        </div>
      )}

      {activeTab === "Evidence Against" && (
        <EvidenceTable title="Evidence Against the KJV/TR Reading" rows={passage.evidenceAgainst} />
      )}

      {activeTab === "Timeline" && <Timeline events={passage.timeline} />}
    </section>
  );
}
