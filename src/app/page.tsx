import {
  ArrowRight,
  BarChart3,
  BookOpen,
  FlaskConical,
  Globe2,
  Landmark,
  Microscope,
  Quote,
  Scale,
  ScrollText,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { AmbientVideo } from "@/components/AmbientVideo";
import { AnimatedCounter } from "@/components/motion/AnimatedCounter";
import { EvidenceAtlas } from "@/components/evidence-atlas/EvidenceAtlas";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { PassageCard } from "@/components/PassageCard";
import { SearchBar } from "@/components/SearchBar";
import { TagBadge } from "@/components/TagBadge";
import { displayedPassages } from "@/data/derived";
import type { Passage } from "@/data/types";

const featuredReferences = [
  "1 John 5:7",
  "Mark 16:9-20",
  "John 7:53-8:11",
  "Acts 8:37",
  "John 5:3b-4",
  "Matthew 17:21",
  "Matthew 18:11",
  "Matthew 23:14",
  "Mark 7:16",
  "Mark 9:44 and Mark 9:46",
  "Mark 11:26",
  "Mark 15:28",
];

const quickLinks = [
  {
    href: "/passages",
    label: "Passage Index",
    description: "Browse every contested reading with filters, sorting, and full-text search.",
    icon: BookOpen,
    tone: "teal" as const,
  },
  {
    href: "/manuscripts",
    label: "Manuscripts",
    description: "See where each Greek witness supports or opposes a reading.",
    icon: ScrollText,
    tone: "gold" as const,
  },
  {
    href: "/fathers",
    label: "Church Fathers",
    description: "Patristic quotations grouped by early Christian writer.",
    icon: Landmark,
    tone: "teal" as const,
  },
  {
    href: "/versions",
    label: "Ancient Versions",
    description: "Latin, Syriac, Coptic, Gothic, Armenian, Georgian, and more.",
    icon: Globe2,
    tone: "gold" as const,
  },
  {
    href: "/methodology",
    label: "Oldest & Best",
    description: "A close examination of Codex Vaticanus and Codex Sinaiticus.",
    icon: Microscope,
    tone: "teal" as const,
  },
  {
    href: "/research",
    label: "Research Desk",
    description: "Save passages, compare evidence records, and share a focused study set.",
    icon: FlaskConical,
    tone: "gold" as const,
  },
];

const categories = [
  {
    title: "Major Omitted Passages",
    description: "Long-form readings with major footnotes and large evidence profiles.",
    icon: ScrollText,
    href: "/passages?search=Major%20omitted%20passage",
  },
  {
    title: "Oldest and Best Footnotes",
    description: "Readings commonly introduced by modern manuscript-footnote language.",
    icon: Quote,
    href: "/passages?search=omitted",
  },
  {
    title: "Doctrinal Variants",
    description: "Places where the reading carries doctrinal or confessional weight.",
    icon: Scale,
    href: "/passages?search=Doctrinal%20variant",
  },
  {
    title: "Majority Greek Support",
    description: "Readings with broad Greek manuscript support.",
    icon: BarChart3,
    href: "/passages?search=Majority%20Greek%20support",
  },
  {
    title: "Patristic Evidence",
    description: "Passages connected to early Christian writers and quotations.",
    icon: Landmark,
    href: "/passages?search=Patristic%20support",
  },
  {
    title: "Latin and Versional Evidence",
    description: "Latin, Syriac, Coptic, Gothic, Armenian, Georgian, Ethiopic, and Slavonic witnesses.",
    icon: Globe2,
    href: "/passages?search=versional",
  },
];

const steps = [
  "Choose a passage",
  "View the KJV/TR reading",
  "Compare evidence records",
  "Review witnesses for and against",
  "Read patristic quotes and versional evidence",
];

const toneStyles = {
  teal: {
    icon: "bg-archive-teal/10 text-archive-teal dark:bg-teal-400/10 dark:text-teal-200",
    accent: "group-hover:border-archive-teal/50",
  },
  gold: {
    icon: "bg-archive-gold/[0.12] text-archive-gold",
    accent: "group-hover:border-archive-gold/60",
  },
};

export default function HomePage() {
  const featuredPassages = featuredReferences
    .map((reference) => displayedPassages.find((passage) => passage.reference === reference))
    .filter((passage): passage is Passage => Boolean(passage))
    .slice(0, 12);
  const evidenceRecordCount = displayedPassages.reduce(
    (total, passage) =>
      total +
      passage.greekSupportWitnesses.length +
      passage.latinWitnesses.length +
      passage.versionalWitnesses.length +
      passage.patristicWitnesses.length +
      passage.evidenceAgainst.length +
      (passage.printedWitnesses?.length ?? 0),
    0,
  );
  const sourceCount = new Set(displayedPassages.flatMap((passage) => passage.sources)).size;

  return (
    <div>
      <AmbientVideo
        src="/videos/ambient-evidence.mp4"
        className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
        videoClassName="opacity-25 blur-[1px] dark:opacity-18"
        overlayClassName="bg-gradient-to-br from-archive-paper/[0.96] via-archive-paper/[0.82] to-archive-teal/[0.12] dark:from-archive-navy/[0.96] dark:via-archive-navy/[0.86] dark:to-archive-gold/10"
        playbackRate={0.5}
      >
        <RevealGroup className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <RevealItem className="flex flex-wrap gap-2">
              <TagBadge tone="gold">Interactive evidence database</TagBadge>
              <TagBadge tone="teal">Greek, versions, fathers</TagBadge>
            </RevealItem>
            <RevealItem>
              <h1 className="mt-6 max-w-5xl font-display text-5xl font-black leading-[0.98] tracking-tight text-ink-900 dark:text-white sm:text-6xl lg:text-7xl">
                Explore the manuscript evidence behind{" "}
                <span className="text-gradient">contested Bible passages</span>.
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-700 dark:text-ink-100/[0.78]">
                Search disputed New Testament readings and compare Greek manuscripts,
                ancient versions, patristic quotations, and evidence for and against the KJV/TR reading.
              </p>
            </RevealItem>
            <RevealItem className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/passages"
                className="group inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-black text-white shadow-card transition hover:-translate-y-0.5 hover:bg-archive-blue dark:bg-archive-gold dark:text-ink-900"
              >
                Browse Passages
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/manuscripts"
                className="rounded-full border border-ink-200 bg-white/70 px-6 py-3 text-sm font-black text-ink-800 transition hover:-translate-y-0.5 hover:border-archive-gold/60 dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                View Manuscript Evidence
              </Link>
              <Link
                href="/fathers"
                className="rounded-full border border-ink-200 bg-white/70 px-6 py-3 text-sm font-black text-ink-800 transition hover:-translate-y-0.5 hover:border-archive-gold/60 dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                Explore Church Father Quotes
              </Link>
            </RevealItem>
          </div>
          <RevealItem className="rounded-[2.5rem] border border-archive-gold/25 bg-white/75 p-5 shadow-card backdrop-blur dark:border-archive-gold/20 dark:bg-white/[0.07]">
            <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.24em] text-archive-teal dark:text-teal-200">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Find evidence fast
            </p>
            <div className="mt-4">
              <SearchBar passages={displayedPassages} />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-ink-900 p-4 text-white dark:bg-archive-gold dark:text-ink-900">
                <p className="font-display text-4xl font-black">
                  <AnimatedCounter value={displayedPassages.length} />
                </p>
                <p className="text-xs font-bold uppercase tracking-[0.18em] opacity-75">Passages</p>
              </div>
              <div className="rounded-3xl border border-ink-100 bg-white/75 p-4 dark:border-white/10 dark:bg-white/5">
                <p className="font-display text-4xl font-black text-ink-900 dark:text-white">
                  <AnimatedCounter value={evidenceRecordCount} />
                </p>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-100/60">Evidence records</p>
              </div>
              <div className="rounded-3xl border border-ink-100 bg-white/75 p-4 dark:border-white/10 dark:bg-white/5">
                <p className="font-display text-4xl font-black text-ink-900 dark:text-white">
                  <AnimatedCounter value={sourceCount} />
                </p>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-100/60">Reference groups</p>
              </div>
            </div>
            <p className="mt-3 text-xs leading-5 text-ink-500 dark:text-ink-100/55">
              Evidence records are displayed database entries, not a count of unique physical manuscripts.
            </p>
          </RevealItem>
        </RevealGroup>
      </AmbientVideo>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-archive-teal dark:text-teal-200">
            Where to start
          </p>
          <h2 className="mt-2 font-display text-4xl font-black text-ink-900 dark:text-white">
            Six ways into the evidence.
          </h2>
        </Reveal>
        <RevealGroup className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            const tone = toneStyles[link.tone];
            return (
              <RevealItem key={link.href}>
                <Link
                  href={link.href}
                  className={`group flex h-full flex-col rounded-[1.75rem] border border-ink-200/80 bg-white/[0.78] p-5 shadow-card backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:shadow-glow dark:border-white/10 dark:bg-white/[0.06] ${tone.accent}`}
                >
                  <span className={`grid h-11 w-11 place-items-center rounded-2xl ${tone.icon}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-black text-ink-900 dark:text-white">
                    {link.label}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-ink-600 dark:text-ink-100/70">
                    {link.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-black text-archive-blue dark:text-teal-200">
                    Explore
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Reveal>
          <EvidenceAtlas initialPassageSlug="mark-16-9-20" />
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-archive-teal dark:text-teal-200">
              Featured passages
            </p>
            <h2 className="mt-2 font-display text-4xl font-black text-ink-900 dark:text-white">
              Start where the footnotes get interesting.
            </h2>
          </div>
          <Link href="/passages" className="group inline-flex items-center gap-1 text-sm font-black text-archive-blue hover:underline dark:text-teal-200">
            View all passages
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
        <RevealGroup className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredPassages.map((passage) => (
            <RevealItem key={passage.id}>
              <PassageCard passage={passage} featured />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-archive-teal dark:text-teal-200">
            Browse by category
          </p>
          <h2 className="mt-2 font-display text-4xl font-black text-ink-900 dark:text-white">
            Six lenses on the same evidence.
          </h2>
        </Reveal>
        <RevealGroup className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categories.map(({ title, description, icon: Icon, href }) => (
            <RevealItem key={title}>
              <Link
                href={href}
                className="group block h-full rounded-[2rem] border border-ink-200 bg-white/70 p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-archive-gold/50 dark:border-white/10 dark:bg-white/[0.05]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-archive-gold/[0.12] text-archive-gold transition group-hover:scale-110">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-2xl font-black text-ink-900 dark:text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-100/70">{description}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-black text-archive-blue dark:text-teal-200">
                  Explore this lens
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Reveal className="overflow-hidden rounded-[2.5rem] border border-archive-gold/25 bg-ink-900 p-6 text-white shadow-card dark:bg-white/[0.06] sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-archive-gold">How it works</p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-black sm:text-4xl">
            From a single reference to the full body of evidence in five steps.
          </h2>
          <RevealGroup className="relative mt-8 grid gap-4 md:grid-cols-5">
            <div className="absolute left-0 right-0 top-5 hidden h-px bg-white/15 md:block" aria-hidden="true" />
            {steps.map((step, index) => (
              <RevealItem key={step} className="relative rounded-3xl border border-white/10 bg-white/[0.08] p-4 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.12]">
                <span className="relative grid h-10 w-10 place-items-center rounded-full bg-archive-gold font-black text-ink-900">
                  {index + 1}
                </span>
                <p className="mt-4 text-sm font-bold leading-6">{step}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>
      </section>
    </div>
  );
}
