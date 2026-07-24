"use client";

import { motion } from "framer-motion";
import {
  BookText,
  CircleEllipsis,
  Globe,
  Globe2,
  History,
  LayoutGrid,
  Library,
  ScrollText,
  ShieldAlert,
  UserRound,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { dedupeWitnessRows, publicPatristicWitnesses } from "@/data/derived";
import {
  isCompetingEvidenceDirection,
  isRelatedEvidenceDirection,
} from "@/data/evidenceDirection";
import type { Passage, Witness } from "@/data/types";

import { patristicRowSources } from "@/lib/evidenceSources";

import { EvidenceScale } from "./EvidenceScale";
import { EvidenceTable } from "./EvidenceTable";
import { PatristicQuoteCard } from "./PatristicQuoteCard";
import { SourcesStrip } from "./SourcesStrip";
import { Timeline } from "./Timeline";

type EvidenceTabsProps = {
  passage: Passage;
};

const tabs = [
  { label: "Summary", icon: LayoutGrid },
  { label: "Greek Manuscripts", icon: ScrollText },
  { label: "Early Versions", icon: Globe2 },
  { label: "Latin Witnesses", icon: BookText },
  { label: "Syriac Witnesses", icon: Globe },
  { label: "Other Versions", icon: Globe2 },
  { label: "Church Fathers", icon: UserRound },
  { label: "Printed Editions", icon: Library },
  { label: "Competing Reading", icon: ShieldAlert },
  { label: "Related Evidence", icon: CircleEllipsis },
  { label: "Timeline", icon: History },
] as const;

type TabLabel = (typeof tabs)[number]["label"];

const easeOut = [0.21, 0.47, 0.32, 0.98] as const;

function witnessName(row: Witness) {
  return row.witness.normalize("NFKC");
}

function isExplicitlyMixedVersion(row: Witness) {
  const name = witnessName(row);
  return (
    /(?:latin|vulgate).*(?:syriac|peshitta|harklean|harclean)|(?:syriac|peshitta|harklean|harclean).*(?:latin|vulgate)/iu.test(
      name,
    )
  );
}

function isSyriac(row: Witness) {
  const name = witnessName(row);
  if (isExplicitlyMixedVersion(row)) return false;
  if (row.kind === "syriac") return true;
  if (/syriac|peshitta|harclean|harklean|curetonian/iu.test(name)) {
    return true;
  }
  if (
    /latin|vulgate|coptic|sahidic|bohairic|armenian|georgian|ethiopic|gothic|slavonic|arabic/iu.test(
      name,
    )
  ) {
    return false;
  }
  return false;
}

function isLatin(row: Witness) {
  const name = witnessName(row);
  if (isExplicitlyMixedVersion(row)) return false;
  if (row.kind === "latin") return true;
  if (
    /old latin|vulgate|latin tradition|codex (?:fuldensis|amiatinus)|\bit(?:ala)?\b/iu.test(
      name,
    )
  ) {
    return true;
  }
  if (
    /syriac|peshitta|harclean|harklean|curetonian|coptic|sahidic|bohairic|armenian|georgian|ethiopic|\bgothic\b|slavonic|arabic/iu.test(
      name,
    )
  ) {
    return false;
  }
  return false;
}

export function EvidenceTabs({ passage }: EvidenceTabsProps) {
  const [activeTab, setActiveTab] = useState<TabLabel>("Summary");
  const greekWitnesses = useMemo(
    () => dedupeWitnessRows(passage.greekSupportWitnesses),
    [passage.greekSupportWitnesses],
  );
  const earlyVersions = useMemo(
    () =>
      dedupeWitnessRows([
        ...passage.latinWitnesses,
        ...passage.versionalWitnesses,
      ]),
    [passage],
  );
  const latin = useMemo(
    () => earlyVersions.filter(isLatin),
    [earlyVersions],
  );
  const syriac = useMemo(
    () => earlyVersions.filter(isSyriac),
    [earlyVersions],
  );
  const otherVersions = useMemo(
    () => earlyVersions.filter((row) => !isLatin(row) && !isSyriac(row)),
    [earlyVersions],
  );
  const visiblePatristicWitnesses = useMemo(
    () => publicPatristicWitnesses(passage),
    [passage],
  );
  const competingEvidence = useMemo(
    () =>
      passage.evidenceAgainst.filter(
        (row) => isCompetingEvidenceDirection(row.direction),
      ),
    [passage.evidenceAgainst],
  );
  const relatedEvidence = useMemo(
    () =>
      passage.evidenceAgainst.filter(
        (row) => isRelatedEvidenceDirection(row.direction),
      ),
    [passage.evidenceAgainst],
  );
  const printedEditions = passage.printedWitnesses ?? [];
  const visibleTabs = useMemo(
    () =>
      tabs.filter((tab) => {
        switch (tab.label) {
          case "Summary":
            return true;
          case "Greek Manuscripts":
            return greekWitnesses.length > 0;
          case "Early Versions":
            return earlyVersions.length > 0;
          case "Latin Witnesses":
            return latin.length > 0;
          case "Syriac Witnesses":
            return syriac.length > 0;
          case "Other Versions":
            return otherVersions.length > 0;
          case "Church Fathers":
            return visiblePatristicWitnesses.length > 0;
          case "Printed Editions":
            return printedEditions.length > 0;
          case "Competing Reading":
            return competingEvidence.length > 0;
          case "Related Evidence":
            return relatedEvidence.length > 0;
          case "Timeline":
            return passage.timeline.length > 0;
        }
      }),
    [
      competingEvidence.length,
      earlyVersions.length,
      latin.length,
      otherVersions.length,
      greekWitnesses.length,
      passage.timeline.length,
      printedEditions.length,
      relatedEvidence.length,
      syriac.length,
      visiblePatristicWitnesses.length,
    ],
  );

  useEffect(() => {
    if (!visibleTabs.some((tab) => tab.label === activeTab)) {
      setActiveTab("Summary");
    }
  }, [activeTab, visibleTabs]);

  return (
    <section className="grid gap-5">
      <div
        role="tablist"
        aria-label="Passage evidence"
        className="sticky top-16 z-30 flex gap-2 overflow-x-auto rounded-full border border-ink-200 bg-white/85 p-2 shadow-card backdrop-blur dark:border-white/10 dark:bg-archive-navy/85 sm:top-20"
      >
        {visibleTabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.label;
          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveTab(tab.label)}
              role="tab"
              aria-selected={active}
              aria-controls="passage-evidence-panel"
              className={`relative flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-black transition ${
                active
                  ? "text-white dark:text-ink-900"
                  : "text-ink-600 hover:bg-archive-gold/10 dark:text-ink-100/70 dark:hover:bg-white/10"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="evidence-tab-pill"
                  className="absolute inset-0 rounded-full bg-ink-900 dark:bg-archive-gold"
                  transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                />
              )}
              <Icon
                className="relative h-3.5 w-3.5 shrink-0"
                aria-hidden="true"
              />
              <span className="relative">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <motion.div
        key={activeTab}
        id="passage-evidence-panel"
        role="tabpanel"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: easeOut }}
      >
          {activeTab === "Summary" && (
            <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
              <div className="rounded-[2rem] border border-ink-200 bg-white/80 p-6 shadow-card dark:border-white/10 dark:bg-white/[0.05]">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-archive-teal dark:text-teal-200">
                  Evidence assessment
                </p>
                <h2 className="mt-2 font-display text-3xl font-black text-ink-900 dark:text-white">
                  Why the KJV reading is retained
                </h2>
                <p className="mt-4 text-base leading-7 text-ink-700 dark:text-ink-100/75">
                  {passage.shortSummary}
                </p>
                <div className="mt-6 rounded-3xl bg-archive-gold/10 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-100/60">
                    Primary support for the KJV reading
                  </p>
                  <p className="mt-2 font-black text-ink-900 dark:text-white">
                    {passage.supportCategory}
                  </p>
                </div>
              </div>
              <EvidenceScale passage={passage} />
            </div>
          )}

          {activeTab === "Greek Manuscripts" && (
            <EvidenceTable
              title="Greek manuscripts supporting the KJV reading"
              rows={greekWitnesses}
            />
          )}

          {activeTab === "Early Versions" && (
            <EvidenceTable
              title="Ancient versional witnesses supporting the KJV reading"
              rows={earlyVersions}
            />
          )}

          {activeTab === "Latin Witnesses" && (
            <EvidenceTable
              title="Latin witnesses supporting the KJV reading"
              rows={latin}
            />
          )}

          {activeTab === "Syriac Witnesses" && (
            <EvidenceTable
              title="Syriac witnesses supporting the KJV reading"
              rows={syriac}
            />
          )}

          {activeTab === "Other Versions" && (
            <EvidenceTable
              title="Other and mixed ancient versions supporting the KJV reading"
              rows={otherVersions}
            />
          )}

          {activeTab === "Church Fathers" && (
            <div className="grid gap-4">
              <SourcesStrip
                sources={patristicRowSources(visiblePatristicWitnesses)}
                heading="Sources for the quotations in this section"
              />
              <div className="grid gap-4 md:grid-cols-2">
                {visiblePatristicWitnesses.map((witness, witnessIndex) => (
                  <PatristicQuoteCard
                    key={`${witness.source}-${witness.workSection ?? ""}-${witness.date}-${witnessIndex}`}
                    witness={witness}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === "Printed Editions" && (
            <EvidenceTable
              title="Printed editions supporting the KJV reading"
              rows={printedEditions}
            />
          )}

          {activeTab === "Competing Reading" && (
            <EvidenceTable
              title="Competing reading and witnesses"
              rows={competingEvidence}
            />
          )}

          {activeTab === "Related Evidence" && (
            <EvidenceTable
              title="Related evidence and qualifications"
              rows={relatedEvidence}
            />
          )}

          {activeTab === "Timeline" && <Timeline events={passage.timeline} />}
      </motion.div>
    </section>
  );
}
