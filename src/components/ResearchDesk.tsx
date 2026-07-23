"use client";

import {
  ArrowRight,
  BookMarked,
  Check,
  Clipboard,
  ExternalLink,
  FileText,
  Link2,
  Plus,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  isCompetingEvidenceDirection,
  isRelatedEvidenceDirection,
} from "@/data/evidenceDirection";
import type { Passage } from "@/data/types";

import styles from "./ResearchDesk.module.css";

type ResearchDeskProps = {
  passages: Passage[];
};

type EvidenceKey =
  | "greek"
  | "latin"
  | "versions"
  | "fathers"
  | "opposition"
  | "other"
  | "printed";

type EvidenceSegment = {
  key: EvidenceKey;
  shortLabel: string;
  label: string;
  count: number;
};

const storageKey = "oldest-best-research-passages";
const notesStorageKey = "oldest-best-research-notes";
const maximumSelection = 4;
const starterPassages = ["1-john-5-7", "mark-16-9-20", "john-7-53-8-11"];

function evidenceSegments(passage: Passage): EvidenceSegment[] {
  return [
    {
      key: "greek",
      shortLabel: "Greek",
      label: "Greek support records",
      count: passage.greekSupportWitnesses.filter((row) => !row.aggregate)
        .length,
    },
    {
      key: "latin",
      shortLabel: "Latin",
      label: "Latin support records",
      count: passage.latinWitnesses.filter((row) => !row.aggregate).length,
    },
    {
      key: "versions",
      shortLabel: "Versions",
      label: "Versional support records",
      count: passage.versionalWitnesses.filter((row) => !row.aggregate).length,
    },
    {
      key: "fathers",
      shortLabel: "Fathers",
      label: "Patristic records",
      count: passage.patristicWitnesses.length,
    },
    {
      key: "opposition",
      shortLabel: "Competing",
      label: "Competing reading records",
      count: passage.evidenceAgainst.filter(
        (record) =>
          !record.aggregate &&
          isCompetingEvidenceDirection(record.direction),
      ).length,
    },
    {
      key: "other",
      shortLabel: "Other",
      label: "Other or qualified reading records",
      count: passage.evidenceAgainst.filter(
        (record) =>
          !record.aggregate &&
          isRelatedEvidenceDirection(record.direction),
      ).length,
    },
    {
      key: "printed",
      shortLabel: "Printed",
      label: "Printed-edition records",
      count:
        passage.printedWitnesses?.filter((row) => !row.aggregate).length ?? 0,
    },
  ];
}

function uniqueValidSlugs(slugs: string[], passages: Passage[]) {
  const valid = new Set(passages.map((passage) => passage.slug));
  return Array.from(new Set(slugs.filter((slug) => valid.has(slug)))).slice(0, maximumSelection);
}

function buildBrief(passages: Passage[]) {
  const sections = passages.map((passage) => {
    const breakdown = evidenceSegments(passage)
      .filter((segment) => segment.count > 0)
      .map((segment) => segment.shortLabel)
      .join("; ");

    return [
      `## ${passage.reference} — ${passage.title}`,
      `KJV text: “${passage.kjvText}”`,
      `Reading catalogued by the site: ${passage.readingSupported}`,
      `Variant issue: ${passage.variantIssue}`,
      `Earliest KJV-supporting evidence: ${
        passage.earliestSupport
          ?.map((record) =>
            record.label
              ? `${record.label}: ${record.statement}`
              : record.statement,
          )
          .join(" | ") ?? "See full dossier"
      }`,
      `Evidence represented: ${breakdown}`,
      `Full dossier: ${window.location.origin}/passages/${passage.slug}`,
    ].join("\n");
  });

  return [
    "# Oldest & Best — Research Set",
    "",
    "Evidence types are listed without treating database rows as votes. Read the full dossiers for dates, qualifications, competing witnesses, and references.",
    "",
    ...sections.flatMap((section) => [section, ""]),
  ].join("\n");
}

export function ResearchDesk({ passages }: ResearchDeskProps) {
  const [query, setQuery] = useState("");
  const [book, setBook] = useState("All books");
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(starterPassages);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [storageReady, setStorageReady] = useState(false);
  const initialized = useRef(false);

  const books = useMemo(
    () => Array.from(new Set(passages.map((passage) => passage.book))),
    [passages],
  );

  useEffect(() => {
    const querySlugs = new URLSearchParams(window.location.search)
      .get("passages")
      ?.split(",")
      .filter(Boolean);

    let storedSlugs: string[] = [];
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
          storedSlugs = parsed;
        }
      }
      setNotes(window.localStorage.getItem(notesStorageKey) ?? "");
    } catch {
      // Storage can be unavailable in privacy-restricted browser contexts.
    }

    const initial = uniqueValidSlugs(
      querySlugs?.length ? querySlugs : storedSlugs.length ? storedSlugs : starterPassages,
      passages,
    );
    setSelectedSlugs(initial);
    initialized.current = true;
    setStorageReady(true);
  }, [passages]);

  useEffect(() => {
    if (!initialized.current) return;

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(selectedSlugs));
    } catch {
      // The URL remains a shareable fallback when storage is unavailable.
    }

    const url = new URL(window.location.href);
    if (selectedSlugs.length) {
      url.searchParams.set("passages", selectedSlugs.join(","));
    } else {
      url.searchParams.delete("passages");
    }
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }, [selectedSlugs]);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem(notesStorageKey, notes);
    } catch {
      // Notes remain usable for the current session if storage is unavailable.
    }
  }, [notes, storageReady]);

  const filteredPassages = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return passages.filter((passage) => {
      if (book !== "All books" && passage.book !== book) return false;
      if (!needle) return true;
      return [
        passage.reference,
        passage.title,
        passage.shortSummary,
        passage.readingSupported,
        ...passage.tags,
        ...passage.variantType,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [book, passages, query]);

  const selectedPassages = selectedSlugs
    .map((slug) => passages.find((passage) => passage.slug === slug))
    .filter((passage): passage is Passage => Boolean(passage));

  const selectedBooks = new Set(selectedPassages.map((passage) => passage.book)).size;
  const selectedVariantTypes = new Set(
    selectedPassages.flatMap((passage) => passage.variantType),
  ).size;
  const tagCounts = selectedPassages
    .flatMap((passage) => passage.tags)
    .reduce<Record<string, number>>((counts, tag) => {
      counts[tag] = (counts[tag] ?? 0) + 1;
      return counts;
    }, {});
  const recurringThemes = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 4)
    .map(([tag]) => tag);

  function togglePassage(slug: string) {
    if (selectedSlugs.includes(slug)) {
      setSelectedSlugs((current) => current.filter((item) => item !== slug));
      setStatus("Passage removed from the research set.");
      return;
    }
    if (selectedSlugs.length >= maximumSelection) {
      setStatus(`Compare up to ${maximumSelection} passages at a time.`);
      return;
    }
    setSelectedSlugs((current) => [...current, slug]);
    setStatus("Passage added to the research set.");
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("Shareable research link copied.");
    } catch {
      setStatus("Copy was unavailable. You can copy the URL from your browser.");
    }
  }

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(buildBrief(selectedPassages));
      setStatus("Research brief copied as plain text.");
    } catch {
      setStatus("Copy was unavailable in this browser.");
    }
  }

  return (
    <div className={styles.root}>
      <section className={styles.hero} aria-labelledby="research-title">
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>
            <Sparkles aria-hidden="true" />
            Experimental research workspace
          </div>
          <div className={styles.heroGrid}>
            <div>
              <h1 id="research-title">
                Your evidence,
                <span> in conversation.</span>
              </h1>
              <p className={styles.heroCopy}>
                Build a focused set of contested readings, compare their catalogued evidence,
                and carry your own notes alongside the site—without losing the full historical dossiers.
              </p>
              <div className={styles.heroActions}>
                <a href="#workspace" className={styles.primaryAction}>
                  Open the desk
                  <ArrowRight aria-hidden="true" />
                </a>
                <button type="button" className={styles.secondaryAction} onClick={copyLink}>
                  <Link2 aria-hidden="true" />
                  Copy share link
                </button>
              </div>
            </div>

            <div className={styles.heroInstrument} aria-label="Catalog overview">
              <div className={styles.orbit} aria-hidden="true">
                <span />
                <span />
                <span />
                <BookMarked />
              </div>
              <dl>
                <div>
                  <dt>Passage dossiers</dt>
                  <dd>{passages.length}</dd>
                </div>
                <div>
                  <dt>Curated earliest dates</dt>
                  <dd>{passages.length}</dd>
                </div>
                <div>
                  <dt>Desk capacity</dt>
                  <dd>{maximumSelection}</dd>
                </div>
              </dl>
              <p>Every dossier includes a reviewed earliest-support record.</p>
            </div>
          </div>
        </div>
      </section>

      <div id="workspace" className={styles.workspace}>
        <aside className={styles.catalog} aria-labelledby="catalog-title">
          <div className={styles.catalogHeading}>
            <div>
              <span className={styles.sectionKicker}>Catalog</span>
              <h2 id="catalog-title">Build your set</h2>
            </div>
            <span className={styles.selectionCount}>{selectedSlugs.length}/{maximumSelection}</span>
          </div>

          <label className={styles.searchField}>
            <span className={styles.srOnly}>Search passage dossiers</span>
            <Search aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Reference, title, theme…"
            />
            {query ? (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
                <X aria-hidden="true" />
              </button>
            ) : null}
          </label>

          <label className={styles.bookFilter}>
            <span>Filter by book</span>
            <select value={book} onChange={(event) => setBook(event.target.value)}>
              <option>All books</option>
              {books.map((bookName) => (
                <option key={bookName}>{bookName}</option>
              ))}
            </select>
          </label>

          <p className={styles.resultCount} aria-live="polite">
            {filteredPassages.length} {filteredPassages.length === 1 ? "dossier" : "dossiers"}
          </p>

          <div className={styles.catalogList}>
            {filteredPassages.map((passage) => {
              const selected = selectedSlugs.includes(passage.slug);
              return (
                <button
                  key={passage.slug}
                  type="button"
                  className={styles.catalogItem}
                  data-selected={selected}
                  aria-pressed={selected}
                  onClick={() => togglePassage(passage.slug)}
                >
                  <span className={styles.catalogAction} aria-hidden="true">
                    {selected ? <Check /> : <Plus />}
                  </span>
                  <span>
                    <strong>{passage.reference}</strong>
                    <small>{passage.title}</small>
                  </span>
                  <em>
                    {passage.earliestSupport
                      ?.map((record) =>
                        record.label
                          ? `${record.label}: ${record.statement}`
                          : record.statement,
                      )
                      .join(" · ")}
                  </em>
                </button>
              );
            })}
          </div>
        </aside>

        <section className={styles.desk} aria-labelledby="desk-title">
          <div className={styles.deskHeader}>
            <div>
              <span className={styles.sectionKicker}>Active research set</span>
              <h2 id="desk-title">Comparison desk</h2>
              <p>
                Select up to {maximumSelection} dossiers. Your set is saved in this browser and
                encoded in the page link for sharing.
              </p>
            </div>
            <div className={styles.deskActions}>
              <button type="button" onClick={copyBrief} disabled={!selectedPassages.length}>
                <Clipboard aria-hidden="true" />
                Copy brief
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedSlugs([]);
                  setStatus("Research set cleared.");
                }}
                disabled={!selectedPassages.length}
              >
                <Trash2 aria-hidden="true" />
                Clear
              </button>
            </div>
          </div>

          <p className={styles.liveStatus} role="status" aria-live="polite">
            {status}
          </p>

          {!selectedPassages.length ? (
            <div className={styles.emptyState}>
              <BookMarked aria-hidden="true" />
              <h3>The desk is ready.</h3>
              <p>Choose a dossier from the catalog to begin a side-by-side study.</p>
              <button type="button" onClick={() => setSelectedSlugs(starterPassages)}>
                Load a sample set
              </button>
            </div>
          ) : (
            <>
              <div className={styles.selectionRail} aria-label="Selected passage dossiers">
                {selectedPassages.map((passage, index) => (
                  <article key={passage.slug}>
                    <span>0{index + 1}</span>
                    <div>
                      <strong>{passage.reference}</strong>
                      <small>{passage.title}</small>
                    </div>
                    <button
                      type="button"
                      onClick={() => togglePassage(passage.slug)}
                      aria-label={`Remove ${passage.reference} from the research set`}
                    >
                      <X aria-hidden="true" />
                    </button>
                  </article>
                ))}
              </div>

              <section className={styles.pulse} aria-labelledby="pulse-title">
                <div className={styles.pulseHeading}>
                  <div>
                    <span className={styles.sectionKicker}>Set pulse</span>
                    <h3 id="pulse-title">What is on the desk</h3>
                  </div>
                  <span>{selectedPassages.length} selected</span>
                </div>
                <dl className={styles.metricGrid}>
                  <div>
                    <dt>Curated earliest dates</dt>
                    <dd>{selectedPassages.length}</dd>
                    <small>One or more per selected dossier</small>
                  </div>
                  <div>
                    <dt>Biblical books</dt>
                    <dd>{selectedBooks}</dd>
                    <small>Represented in this set</small>
                  </div>
                  <div>
                    <dt>Variant categories</dt>
                    <dd>{selectedVariantTypes}</dd>
                    <small>Distinct site classifications</small>
                  </div>
                </dl>
                {recurringThemes.length ? (
                  <div className={styles.themeLine}>
                    <span>Leading themes</span>
                    <div>
                      {recurringThemes.map((theme) => (
                        <span key={theme}>{theme}</span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </section>

              <section className={styles.matrixSection} aria-labelledby="matrix-title">
                <div className={styles.sectionHeading}>
                  <div>
                    <span className={styles.sectionKicker}>Comparison matrix</span>
                    <h3 id="matrix-title">Read across the dossiers</h3>
                  </div>
                  <p id="record-count-note">Dates come from each dossier’s curated earliest-support record.</p>
                </div>
                <div className={styles.tableFrame} tabIndex={0} role="region" aria-label="Scrollable passage comparison">
                  <table aria-describedby="record-count-note">
                    <caption>Comparison of selected passage dossiers</caption>
                    <thead>
                      <tr>
                        <th scope="col">Research lens</th>
                        {selectedPassages.map((passage) => (
                          <th scope="col" key={passage.slug}>
                            {passage.reference}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Reading catalogued</th>
                        {selectedPassages.map((passage) => (
                          <td key={passage.slug}>{passage.readingSupported}</td>
                        ))}
                      </tr>
                      <tr>
                        <th scope="row">Support category</th>
                        {selectedPassages.map((passage) => (
                          <td key={passage.slug}>{passage.supportCategory}</td>
                        ))}
                      </tr>
                      <tr>
                        <th scope="row">Variant type</th>
                        {selectedPassages.map((passage) => (
                          <td key={passage.slug}>{passage.variantType.join(", ")}</td>
                        ))}
                      </tr>
                      <tr>
                        <th scope="row">Earliest KJV-supporting evidence</th>
                        {selectedPassages.map((passage) => (
                          <td key={passage.slug}>
                            {passage.earliestSupport?.map((entry) => entry.statement).join("; ")}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <th scope="row">Evidence represented</th>
                        {selectedPassages.map((passage) => (
                          <td key={passage.slug}>
                            {evidenceSegments(passage).filter((segment) => segment.count > 0).map((segment) => segment.label).join(", ")}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <th scope="row">Evidence assessment</th>
                        {selectedPassages.map((passage) => (
                          <td key={passage.slug}>{passage.shortSummary}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className={styles.dossierGrid} aria-labelledby="dossiers-title">
                <div className={styles.sectionHeading}>
                  <div>
                    <span className={styles.sectionKicker}>Reading room</span>
                    <h3 id="dossiers-title">Return to the full argument</h3>
                  </div>
                  <p>The desk is a comparison layer; the dossier remains the complete record.</p>
                </div>
                <div>
                  {selectedPassages.map((passage) => (
                    <article key={passage.slug}>
                      <div className={styles.dossierIndex}>{passage.reference}</div>
                      <h4>{passage.title}</h4>
                      <blockquote>{passage.kjvText}</blockquote>
                      <p>{passage.shortSummary}</p>
                      <Link href={`/passages/${passage.slug}`}>
                        Open full dossier
                        <ExternalLink aria-hidden="true" />
                      </Link>
                    </article>
                  ))}
                </div>
              </section>

              <section className={styles.notebook} aria-labelledby="notebook-title">
                <div>
                  <span className={styles.notebookIcon}>
                    <FileText aria-hidden="true" />
                  </span>
                  <div>
                    <span className={styles.sectionKicker}>Private field notes</span>
                    <h3 id="notebook-title">Your research notebook</h3>
                    <p>Saved locally in this browser. Nothing is sent or published.</p>
                  </div>
                </div>
                <label>
                  <span className={styles.srOnly}>Research notes</span>
                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Capture a question, comparison, source to investigate, or teaching outline…"
                    rows={7}
                  />
                </label>
                <div className={styles.notesFooter}>
                  <span>{notes.length.toLocaleString()} characters</span>
                  <span>{storageReady ? "Saved on this device" : "Preparing notebook…"}</span>
                </div>
              </section>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
