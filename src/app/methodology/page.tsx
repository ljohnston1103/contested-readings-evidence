import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Methodology",
  description: "How the site organizes manuscript, versional, patristic, and count evidence.",
};

const sections = [
  ["Greek manuscripts", "Greek witnesses are separated into support and evidence-against tables. Aggregate rows such as Byzantine Majority are kept visible when the paper uses count-first summaries."],
  ["Lectionaries", "Lectionary support is listed when the paper names it or when a count snapshot identifies it as part of the evidence profile."],
  ["Ancient versions", "Latin, Syriac, Coptic, Gothic, Armenian, Georgian, Ethiopic, and Slavonic evidence is grouped in versional sections and indexed on the versions page."],
  ["Patristic citations", "Church father entries preserve the paper's date and quote-summary format, with region labels added only to improve browsing."],
  ["Printed Greek editions", "Printed editions are treated as reception evidence, not as manuscript-count evidence."],
  ["Majority support", "A majority-support tag is used only where the data object describes broad Greek manuscript support."],
  ["Scant evidence against", "This category is reserved for passages where the paper gives a small count or small named set of Greek opposition witnesses."],
  ["Complex evidence", "Complex readings keep their mixed category visible. The site does not convert limited Greek support into a false majority claim."],
];

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Methodology" }]} />
      <div className="mt-8">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-archive-teal dark:text-teal-200">
          Methodology
        </p>
        <h1 className="mt-2 font-display text-5xl font-black tracking-tight text-ink-900 dark:text-white">
          Simple categories for a complicated evidence landscape.
        </h1>
        <p className="mt-5 text-lg leading-8 text-ink-700 dark:text-ink-100/75">
          This site is not a long theological essay. It is an organized display layer for the evidence categories used in the source paper.
        </p>
      </div>

      <div className="mt-10 grid gap-4">
        {sections.map(([title, description]) => (
          <section key={title} className="rounded-[2rem] border border-ink-200 bg-white/76 p-6 shadow-card dark:border-white/10 dark:bg-white/[0.05]">
            <h2 className="font-display text-2xl font-black text-ink-900 dark:text-white">{title}</h2>
            <p className="mt-3 leading-7 text-ink-700 dark:text-ink-100/75">{description}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
