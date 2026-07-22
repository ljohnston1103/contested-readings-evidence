"use client";

import { motion } from "framer-motion";
import { History, Network } from "lucide-react";
import { useState } from "react";

import type { ConstellationBranch, FullTimelineEntry } from "@/data/derived";

import { TransmissionTimelineExplorer } from "./TransmissionTimelineExplorer";
import { WitnessConstellationExplorer } from "./WitnessConstellationExplorer";

type TransmissionExplorerProps = {
  entries: FullTimelineEntry[];
  branches: ConstellationBranch[];
};

const views = [
  { key: "timeline", label: "Timeline", icon: History },
  { key: "constellation", label: "Constellation", icon: Network },
] as const;

export function TransmissionExplorer({ entries, branches }: TransmissionExplorerProps) {
  const [view, setView] = useState<(typeof views)[number]["key"]>("timeline");

  return (
    <div className="grid gap-6">
      <div className="inline-flex w-fit gap-1 rounded-full border border-ink-200 bg-white/85 p-1.5 shadow-card backdrop-blur dark:border-white/10 dark:bg-archive-navy/85">
        {views.map((item) => {
          const Icon = item.icon;
          const active = view === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setView(item.key)}
              className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-black transition ${
                active ? "text-white dark:text-ink-900" : "text-ink-600 hover:bg-archive-gold/10 dark:text-ink-100/70 dark:hover:bg-white/10"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="transmission-view-pill"
                  className="absolute inset-0 rounded-full bg-ink-900 dark:bg-archive-gold"
                  transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                />
              )}
              <Icon className="relative h-4 w-4" aria-hidden="true" />
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </div>

      {view === "timeline" ? (
        <TransmissionTimelineExplorer entries={entries} />
      ) : (
        <WitnessConstellationExplorer branches={branches} />
      )}
    </div>
  );
}
