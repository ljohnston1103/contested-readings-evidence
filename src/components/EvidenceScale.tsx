import { BookText, Globe2, Landmark, Printer, ScrollText } from "lucide-react";

import type { Passage } from "@/data/types";

type EvidenceScaleProps = {
  passage: Passage;
};

export function EvidenceScale({ passage }: EvidenceScaleProps) {
  const categories = [
    {
      label: "Greek",
      represented:
        passage.greekSupportWitnesses.length > 0 ||
        passage.evidenceAgainst.some(
          (row) => row.kind === "greek-manuscript",
        ),
      icon: ScrollText,
    },
    {
      label: "Latin",
      represented:
        passage.latinWitnesses.length > 0 ||
        passage.evidenceAgainst.some(
          (row) => row.kind === "latin",
        ),
      icon: BookText,
    },
    {
      label: "Other versions",
      represented:
        passage.versionalWitnesses.length > 0 ||
        passage.evidenceAgainst.some((row) =>
          ["syriac", "coptic", "version"].includes(row.kind ?? ""),
        ),
      icon: Globe2,
    },
    {
      label: "Fathers",
      represented: passage.patristicWitnesses.length > 0,
      icon: Landmark,
    },
    {
      label: "Printed editions",
      represented: (passage.printedWitnesses?.length ?? 0) > 0,
      icon: Printer,
    },
  ];

  return (
    <section className="rounded-[2rem] border border-ink-200 bg-white/75 p-5 shadow-card dark:border-white/10 dark:bg-white/[0.05]">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-archive-teal dark:text-teal-200">
        Evidence represented on this page
      </p>
      <h3 className="mt-1 font-display text-2xl font-black text-ink-900 dark:text-white">
        Evidence types, without turning rows into votes.
      </h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {categories.map(({ label, represented, icon: Icon }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-ink-50/70 p-3 dark:border-white/10 dark:bg-white/5"
          >
            <Icon
              className={`h-4 w-4 ${
                represented
                  ? "text-archive-teal dark:text-teal-200"
                  : "text-ink-300 dark:text-white/25"
              }`}
              aria-hidden="true"
            />
            <span className="text-sm font-black text-ink-800 dark:text-ink-100">
              {label}
            </span>
            <span className="ml-auto text-xs font-bold text-ink-500 dark:text-ink-100/55">
              {represented ? "Represented" : "Not listed"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
