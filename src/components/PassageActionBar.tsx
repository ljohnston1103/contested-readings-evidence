"use client";

import {
  BookmarkCheck,
  BookmarkPlus,
  Check,
  Copy,
  Download,
  FlaskConical,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { Passage } from "@/data/types";
import { downloadEvidenceCard } from "@/lib/evidenceCard";

const researchShelfKey = "oldest-best-research-passages";

type PassageActionBarProps = {
  passage: Passage;
};

function readResearchShelf() {
  try {
    const stored = window.localStorage.getItem(researchShelfKey);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
}

export function PassageActionBar({ passage }: PassageActionBarProps) {
  const { slug, reference, title, kjvText } = passage;
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setSaved(readResearchShelf().includes(slug));
  }, [slug]);

  function announce(nextMessage: string) {
    setMessage(nextMessage);
    window.setTimeout(() => setMessage(""), 2400);
  }

  async function copyReading() {
    await navigator.clipboard.writeText(`${reference} (KJV)\n${kjvText}`);
    announce("KJV reading copied");
  }

  async function sharePassage() {
    const shareData = {
      title: `${reference}: ${title}`,
      text: `${reference} — ${title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        announce("Share sheet opened");
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    await navigator.clipboard.writeText(window.location.href);
    announce("Passage link copied");
  }

  function toggleSaved() {
    const shelf = readResearchShelf();
    const nextShelf = shelf.includes(slug)
      ? shelf.filter((item) => item !== slug)
      : [...shelf, slug];

    window.localStorage.setItem(researchShelfKey, JSON.stringify(nextShelf));
    window.dispatchEvent(
      new CustomEvent("research-shelf-change", { detail: nextShelf }),
    );
    setSaved(nextShelf.includes(slug));
    announce(nextShelf.includes(slug) ? "Added to Research Desk" : "Removed from Research Desk");
  }

  function saveCard() {
    downloadEvidenceCard(passage, `${window.location.origin}/passages/${slug}`);
    announce("Evidence card downloaded");
  }

  const buttonClass =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white/80 px-4 py-2.5 text-sm font-black text-ink-700 shadow-sm transition hover:-translate-y-0.5 hover:border-archive-gold/60 hover:text-ink-900 dark:border-white/10 dark:bg-white/[0.06] dark:text-ink-100 dark:hover:text-white";

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-ink-200/70 pt-5 dark:border-white/10">
      <button type="button" onClick={copyReading} className={buttonClass}>
        {message === "KJV reading copied" ? (
          <Check className="h-4 w-4 text-archive-teal dark:text-teal-200" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
        Copy reading
      </button>

      <button
        type="button"
        onClick={toggleSaved}
        className={buttonClass}
        aria-pressed={saved}
      >
        {saved ? (
          <BookmarkCheck className="h-4 w-4 text-archive-teal dark:text-teal-200" aria-hidden="true" />
        ) : (
          <BookmarkPlus className="h-4 w-4" aria-hidden="true" />
        )}
        {saved ? "Saved to Desk" : "Save to Desk"}
      </button>

      <button type="button" onClick={sharePassage} className={buttonClass}>
        <Share2 className="h-4 w-4" aria-hidden="true" />
        Share
      </button>

      <button type="button" onClick={saveCard} className={buttonClass}>
        {message === "Evidence card downloaded" ? (
          <Check className="h-4 w-4 text-archive-teal dark:text-teal-200" aria-hidden="true" />
        ) : (
          <Download className="h-4 w-4" aria-hidden="true" />
        )}
        Save evidence card
      </button>

      <Link
        href={`/research?passages=${encodeURIComponent(slug)}`}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-ink-900 px-4 py-2.5 text-sm font-black text-white shadow-card transition hover:-translate-y-0.5 hover:bg-archive-blue dark:bg-archive-gold dark:text-ink-900"
      >
        <FlaskConical className="h-4 w-4" aria-hidden="true" />
        Open in Research Desk
      </Link>

      <span className="sr-only" role="status" aria-live="polite">
        {message}
      </span>
    </div>
  );
}
