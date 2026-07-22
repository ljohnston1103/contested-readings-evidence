"use client";

import { ArrowUp, ArrowUpRight, BookOpen, FlaskConical, Globe2, Landmark, ScrollText } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";

const exploreLinks = [
  { href: "/passages", label: "Passage index", icon: BookOpen },
  { href: "/manuscripts", label: "Manuscript witnesses", icon: ScrollText },
  { href: "/fathers", label: "Church fathers", icon: Landmark },
  { href: "/versions", label: "Ancient versions", icon: Globe2 },
  { href: "/research", label: "Research Desk", icon: FlaskConical },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-200/70 bg-white/45 dark:border-white/10 dark:bg-white/[0.03]">
      <Reveal className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-display text-2xl font-black text-ink-900 transition hover:text-archive-teal dark:text-white dark:hover:text-teal-200"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-archive-gold/15 text-archive-gold">
              <ScrollText className="h-5 w-5" aria-hidden="true" />
            </span>
            Evidence Atlas
          </Link>
          <p className="mt-4 max-w-xl text-sm leading-6 text-ink-600 dark:text-ink-100/75">
            A structured, expandable evidence database for comparing manuscript,
            versional, and patristic witnesses behind contested New Testament readings.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-200">
            Explore
          </p>
          <div className="mt-4 grid gap-3 text-sm">
            {exploreLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-2 font-semibold text-ink-700 transition hover:text-archive-teal dark:text-ink-100/80 dark:hover:text-teal-200"
              >
                <Icon
                  className="h-4 w-4 shrink-0 text-archive-teal/70 transition group-hover:translate-x-0.5 dark:text-teal-200/70"
                  aria-hidden="true"
                />
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-200">
            Approach
          </p>
          <div className="mt-4 grid gap-3 text-sm">
            <Link
              href="/methodology"
              className="group flex items-center gap-2 font-semibold text-ink-700 transition hover:text-archive-gold dark:text-ink-100/80 dark:hover:text-archive-gold"
            >
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-archive-gold/70 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
              Oldest &amp; Best Examination
            </Link>
          </div>
        </div>
      </Reveal>
      <div className="border-t border-ink-200/70 dark:border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 text-xs font-semibold text-ink-500 sm:px-6 lg:px-8 dark:text-ink-100/50">
          <p>For study and discussion of New Testament textual evidence.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white/70 px-4 py-2 font-bold text-ink-700 transition duration-300 hover:-translate-y-0.5 hover:border-archive-gold/60 hover:text-archive-gold dark:border-white/10 dark:bg-white/5 dark:text-ink-100"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
