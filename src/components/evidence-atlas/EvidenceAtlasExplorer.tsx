"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Asterisk, ChartNoAxesCombined, Info } from "lucide-react";
import Link from "next/link";
import { useId, useMemo, useRef, useState } from "react";

type EvidenceRecordKey =
  | "greek"
  | "latin"
  | "versions"
  | "fathers"
  | "printed"
  | "against";

type AtlasMeasure = "all" | EvidenceRecordKey;

export type EvidenceAtlasDatum = {
  slug: string;
  reference: string;
  title: string;
  book: string;
  biblicalOrder: number;
  reading: string;
  variantTypes: string[];
  records: Record<EvidenceRecordKey, number>;
  totalRecords: number;
};

type EvidenceAtlasExplorerProps = {
  data: EvidenceAtlasDatum[];
  initialPassageSlug?: string;
  className?: string;
};

const recordKeys: EvidenceRecordKey[] = [
  "greek",
  "latin",
  "versions",
  "fathers",
  "printed",
  "against",
];

const measureMeta: Record<
  AtlasMeasure,
  { shortLabel: string; label: string; color: string; pale: string }
> = {
  all: {
    shortLabel: "All records",
    label: "All raw evidence records",
    color: "#0f766e",
    pale: "rgba(15, 118, 110, 0.14)",
  },
  greek: {
    shortLabel: "Greek",
    label: "Greek-support array records",
    color: "#0369a1",
    pale: "rgba(3, 105, 161, 0.14)",
  },
  latin: {
    shortLabel: "Latin",
    label: "Latin-support array records",
    color: "#a16207",
    pale: "rgba(161, 98, 7, 0.14)",
  },
  versions: {
    shortLabel: "Versions",
    label: "Versional-support array records",
    color: "#0f766e",
    pale: "rgba(15, 118, 110, 0.14)",
  },
  fathers: {
    shortLabel: "Fathers",
    label: "Patristic array records",
    color: "#7c3aed",
    pale: "rgba(124, 58, 237, 0.14)",
  },
  printed: {
    shortLabel: "Printed",
    label: "Printed-edition array records",
    color: "#be123c",
    pale: "rgba(190, 18, 60, 0.14)",
  },
  against: {
    shortLabel: "Against field",
    label: "Evidence-against array records",
    color: "#475569",
    pale: "rgba(71, 85, 105, 0.14)",
  },
};

const chartHeight = 430;
const plotTop = 72;
const plotBottom = 326;

function valueFor(datum: EvidenceAtlasDatum, measure: AtlasMeasure) {
  return measure === "all" ? datum.totalRecords : datum.records[measure];
}

function fingerprint(records: EvidenceAtlasDatum["records"]) {
  const total = recordKeys.reduce((sum, key) => sum + records[key], 0);
  if (total === 0) return "#cbd5e1";

  let cursor = 0;
  const stops = recordKeys.flatMap((key) => {
    const start = cursor;
    cursor += (records[key] / total) * 360;
    return [
      `${measureMeta[key].color} ${start.toFixed(2)}deg`,
      `${measureMeta[key].color} ${cursor.toFixed(2)}deg`,
    ];
  });

  return `conic-gradient(${stops.join(", ")})`;
}

function joinClassNames(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function EvidenceAtlasExplorer({
  data,
  initialPassageSlug,
  className,
}: EvidenceAtlasExplorerProps) {
  const shouldReduceMotion = useReducedMotion();
  const instanceId = useId().replace(/:/g, "");
  const titleId = `evidence-atlas-title-${instanceId}`;
  const descriptionId = `evidence-atlas-description-${instanceId}`;
  const lineGradientId = `evidence-atlas-line-${instanceId}`;
  const orderedData = useMemo(
    () => [...data].sort((a, b) => a.biblicalOrder - b.biblicalOrder),
    [data],
  );
  const fallbackPassage = useMemo(
    () =>
      orderedData.reduce<EvidenceAtlasDatum | undefined>(
        (largest, datum) =>
          !largest || datum.totalRecords > largest.totalRecords ? datum : largest,
        undefined,
      ),
    [orderedData],
  );
  const [measure, setMeasure] = useState<AtlasMeasure>("all");
  const [selectedSlug, setSelectedSlug] = useState(
    orderedData.some((datum) => datum.slug === initialPassageSlug)
      ? initialPassageSlug
      : fallbackPassage?.slug,
  );
  const pointRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selected =
    orderedData.find((datum) => datum.slug === selectedSlug) ?? fallbackPassage;
  const chartWidth = Math.max(1020, orderedData.length * 42 + 120);
  const plotLeft = 72;
  const plotRight = chartWidth - 44;
  const values = orderedData.map((datum) => valueFor(datum, measure));
  const maxValue = Math.max(1, ...values);
  const corpusTotal = orderedData.reduce(
    (total, datum) => total + datum.totalRecords,
    0,
  );

  const points = orderedData.map((datum, index) => {
    const value = valueFor(datum, measure);
    const x =
      orderedData.length === 1
        ? (plotLeft + plotRight) / 2
        : plotLeft + (index / (orderedData.length - 1)) * (plotRight - plotLeft);
    const y = plotBottom - (value / maxValue) * (plotBottom - plotTop);
    return { datum, value, x, y };
  });

  const path = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const bookBands = orderedData.reduce<
    Array<{ book: string; firstIndex: number; lastIndex: number }>
  >((bands, datum, index) => {
    const lastBand = bands[bands.length - 1];
    if (lastBand?.book === datum.book) {
      lastBand.lastIndex = index;
    } else {
      bands.push({ book: datum.book, firstIndex: index, lastIndex: index });
    }
    return bands;
  }, []);

  const corpusTotals = recordKeys.reduce(
    (totals, key) => {
      totals[key] = orderedData.reduce(
        (sum, datum) => sum + datum.records[key],
        0,
      );
      return totals;
    },
    {} as Record<EvidenceRecordKey, number>,
  );

  const movePointFocus = (index: number, direction: -1 | 1) => {
    const nextIndex = Math.min(
      orderedData.length - 1,
      Math.max(0, index + direction),
    );
    pointRefs.current[nextIndex]?.focus();
  };

  if (!selected || orderedData.length === 0) return null;

  return (
    <section
      className={joinClassNames(
        "relative isolate overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-card dark:border-white/10 dark:bg-archive-navy",
        className,
      )}
      aria-labelledby={titleId}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-70 dark:opacity-40"
        style={{
          background:
            "radial-gradient(circle at 8% 0%, rgba(196,154,63,.18), transparent 30%), radial-gradient(circle at 92% 8%, rgba(15,118,110,.16), transparent 32%)",
        }}
        aria-hidden="true"
      />

      <div className="grid gap-6 border-b border-ink-100 p-5 dark:border-white/10 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-archive-teal dark:text-teal-200">
            <ChartNoAxesCombined className="h-4 w-4" aria-hidden="true" />
            Interactive evidence atlas
          </p>
          <h2
            id={titleId}
            className="mt-3 max-w-3xl font-display text-3xl font-black tracking-tight text-ink-900 dark:text-white sm:text-4xl"
          >
            See the shape of the archive.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-ink-600 dark:text-ink-100/70 sm:text-base">
            Each point is a passage. Its height represents the selected record field;
            its segmented center shows the mix of records stored for that passage.
          </p>
        </div>
        <div className="rounded-2xl border border-archive-gold/30 bg-archive-paper px-5 py-4 text-left dark:bg-white/5">
          <p className="font-display text-3xl font-black text-ink-900 dark:text-white">
            {corpusTotal.toLocaleString()}
          </p>
          <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-ink-600 dark:text-ink-100/60">
            Raw evidence records
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <div className="flex items-start gap-3 rounded-2xl bg-archive-teal/10 px-4 py-3 text-sm leading-6 text-ink-700 dark:bg-teal-300/10 dark:text-ink-100/80">
          <Info
            className="mt-0.5 h-4 w-4 shrink-0 text-archive-teal dark:text-teal-200"
            aria-hidden="true"
          />
          <p>
            These are stored rows—not unique manuscripts, people, independent
            witnesses, or a measure of evidential strength. Taller points indicate
            denser documentation in the current database.
          </p>
        </div>

        <fieldset className="mt-6">
          <legend className="text-xs font-black uppercase tracking-[0.18em] text-ink-500 dark:text-ink-100/60">
            Plot by record field
          </legend>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2" aria-label="Evidence atlas measures">
            {(Object.keys(measureMeta) as AtlasMeasure[]).map((key) => {
              const meta = measureMeta[key];
              const count = key === "all" ? corpusTotal : corpusTotals[key];
              const active = key === measure;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMeasure(key)}
                  aria-pressed={active}
                  className={joinClassNames(
                    "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-bold transition-colors",
                    active
                      ? "border-ink-900 bg-ink-900 text-white dark:border-archive-gold dark:bg-archive-gold dark:text-ink-900"
                      : "border-ink-200 bg-white text-ink-700 hover:border-archive-gold dark:border-white/15 dark:bg-white/5 dark:text-ink-100",
                  )}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: meta.color }}
                    aria-hidden="true"
                  />
                  {meta.shortLabel}
                  <span className={active ? "opacity-70" : "text-ink-500 dark:text-ink-100/50"}>
                    {count.toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <figure className="mt-4" aria-describedby={descriptionId}>
          <figcaption
            id={descriptionId}
            className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm"
          >
            <span className="font-bold text-ink-800 dark:text-white">
              {measureMeta[measure].label}
            </span>
            <span className="text-ink-500 dark:text-ink-100/55">
              Biblical order → · use ← and → to inspect points
            </span>
          </figcaption>

          <div className="overflow-x-auto rounded-2xl border border-ink-100 bg-archive-paper/70 dark:border-white/10 dark:bg-white/[0.03]">
            <div
              className="relative"
              style={{ width: chartWidth, height: chartHeight }}
              role="group"
              aria-label={`Passage plot for ${measureMeta[measure].label}`}
            >
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id={lineGradientId} x1="0" x2="1">
                    <stop offset="0" stopColor="#0f766e" />
                    <stop offset="0.5" stopColor="#c49a3f" />
                    <stop offset="1" stopColor="#0369a1" />
                  </linearGradient>
                </defs>

                {[0, 0.5, 1].map((ratio) => {
                  const y = plotBottom - ratio * (plotBottom - plotTop);
                  return (
                    <g key={ratio}>
                      <line
                        x1={plotLeft}
                        x2={plotRight}
                        y1={y}
                        y2={y}
                        stroke="currentColor"
                        strokeDasharray="3 8"
                        className="text-ink-200 dark:text-white/10"
                      />
                      <text
                        x={plotLeft - 16}
                        y={y + 4}
                        textAnchor="end"
                        className="fill-ink-500 text-[11px] dark:fill-ink-100/50"
                      >
                        {Math.round(maxValue * ratio)}
                      </text>
                    </g>
                  );
                })}

                {bookBands.map((band, index) => {
                  const first = points[band.firstIndex];
                  const last = points[band.lastIndex];
                  const center = (first.x + last.x) / 2;
                  return (
                    <g key={`${band.book}-${band.firstIndex}`}>
                      {index > 0 ? (
                        <line
                          x1={first.x - 21}
                          x2={first.x - 21}
                          y1={plotTop - 20}
                          y2={plotBottom + 50}
                          stroke="currentColor"
                          className="text-ink-200 dark:text-white/10"
                        />
                      ) : null}
                      <text
                        x={center}
                        y={394}
                        textAnchor="end"
                        transform={`rotate(-32 ${center} 394)`}
                        className="fill-ink-600 text-[11px] font-bold dark:fill-ink-100/60"
                      >
                        {band.book}
                      </text>
                    </g>
                  );
                })}

                <motion.path
                  initial={false}
                  animate={{ d: path }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  fill="none"
                  stroke={
                    measure === "all"
                      ? `url(#${lineGradientId})`
                      : measureMeta[measure].color
                  }
                  strokeWidth="2"
                  strokeOpacity="0.58"
                />
              </svg>

              {points.map(({ datum, value, x, y }, index) => {
                const active = datum.slug === selected.slug;
                const pointSize = Math.round(11 + Math.sqrt(value / maxValue) * 18);
                return (
                  <motion.button
                    key={datum.slug}
                    ref={(node) => {
                      pointRefs.current[index] = node;
                    }}
                    type="button"
                    initial={false}
                    animate={{ left: x - 22, top: y - 22 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => setSelectedSlug(datum.slug)}
                    onFocus={() => setSelectedSlug(datum.slug)}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowRight") {
                        event.preventDefault();
                        movePointFocus(index, 1);
                      }
                      if (event.key === "ArrowLeft") {
                        event.preventDefault();
                        movePointFocus(index, -1);
                      }
                      if (event.key === "Home") {
                        event.preventDefault();
                        pointRefs.current[0]?.focus();
                      }
                      if (event.key === "End") {
                        event.preventDefault();
                        pointRefs.current[orderedData.length - 1]?.focus();
                      }
                    }}
                    aria-pressed={active}
                    aria-label={`${datum.reference}: ${value} ${measureMeta[measure].label.toLowerCase()}. Select to inspect this passage.`}
                    title={`${datum.reference} · ${value} records`}
                    className={joinClassNames(
                      "absolute grid h-11 w-11 place-items-center rounded-full",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-archive-gold",
                    )}
                  >
                    <span
                      className={joinClassNames(
                        "grid place-items-center rounded-full border-2 border-white shadow-md transition-[box-shadow,filter] dark:border-archive-navy",
                        active
                          ? "ring-4 ring-archive-gold/45 shadow-lg"
                          : "hover:brightness-110",
                      )}
                      style={{
                        width: pointSize,
                        height: pointSize,
                        background: measure === "all" ? fingerprint(datum.records) : measureMeta[measure].color,
                      }}
                      aria-hidden="true"
                    >
                      {active ? (
                        <span className="h-1.5 w-1.5 rounded-full bg-white shadow-sm dark:bg-archive-navy" />
                      ) : null}
                    </span>
                  </motion.button>
                );
              })}

              <div
                className="pointer-events-none absolute bottom-3 left-[72px] right-11 flex justify-between text-[10px] font-bold uppercase tracking-[0.16em] text-ink-400 dark:text-ink-100/35"
                aria-hidden="true"
              >
                <span>{orderedData[0]?.book}</span>
                <span>{orderedData[orderedData.length - 1]?.book}</span>
              </div>
            </div>
          </div>
        </figure>

        <p className="sr-only" aria-live="polite">
          Selected {selected.reference}, {selected.totalRecords} total raw evidence records.
        </p>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selected.slug}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -5 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="mt-6 grid overflow-hidden rounded-3xl border border-ink-200 bg-white dark:border-white/10 dark:bg-white/[0.04] lg:grid-cols-[0.8fr_1.2fr]"
          >
            <div className="border-b border-ink-100 p-5 dark:border-white/10 sm:p-6 lg:border-b-0 lg:border-r">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-archive-teal dark:text-teal-200">
                Selected passage
              </p>
              <h3 className="mt-2 font-display text-3xl font-black text-ink-900 dark:text-white">
                {selected.reference}
              </h3>
              <p className="mt-1 font-bold text-ink-700 dark:text-ink-100/80">
                {selected.title}
              </p>
              <p className="mt-4 text-sm leading-6 text-ink-600 dark:text-ink-100/65">
                <span className="font-bold text-ink-800 dark:text-white">Cataloged reading:</span>{" "}
                {selected.reading}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selected.variantTypes.map((variantType) => (
                  <span
                    key={variantType}
                    className="rounded-md border border-ink-200 px-2 py-1 text-xs font-bold text-ink-600 dark:border-white/15 dark:text-ink-100/65"
                  >
                    {variantType}
                  </span>
                ))}
              </div>
              <Link
                href={`/passages/${selected.slug}`}
                className="group mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink-900 px-5 text-sm font-black text-white hover:bg-archive-blue dark:bg-archive-gold dark:text-ink-900"
              >
                Open evidence record
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-ink-500 dark:text-ink-100/55">
                    Record fingerprint
                  </p>
                  <p className="mt-1 text-sm text-ink-600 dark:text-ink-100/65">
                    Composition of this passage’s stored evidence rows
                  </p>
                </div>
                <p className="font-display text-3xl font-black text-ink-900 dark:text-white">
                  {selected.totalRecords}
                  <span className="ml-2 font-sans text-xs font-black uppercase tracking-[0.14em] text-ink-500 dark:text-ink-100/50">
                    total
                  </span>
                </p>
              </div>

              <div
                className="mt-5 flex h-3 overflow-hidden rounded-full bg-ink-100 dark:bg-white/10"
                role="img"
                aria-label={recordKeys
                  .map((key) => `${measureMeta[key].label}: ${selected.records[key]}`)
                  .join("; ")}
              >
                {recordKeys.map((key) => (
                  <span
                    key={key}
                    style={{
                      width: `${(selected.records[key] / Math.max(1, selected.totalRecords)) * 100}%`,
                      backgroundColor: measureMeta[key].color,
                    }}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <dl className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {recordKeys.map((key) => (
                  <div
                    key={key}
                    className="flex min-h-14 items-center justify-between gap-3 rounded-xl px-3 py-2"
                    style={{ backgroundColor: measureMeta[key].pale }}
                  >
                    <dt className="flex items-center gap-2 text-xs font-bold leading-4 text-ink-700 dark:text-ink-100/75">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: measureMeta[key].color }}
                        aria-hidden="true"
                      />
                      {measureMeta[key].shortLabel}
                    </dt>
                    <dd className="font-display text-xl font-black text-ink-900 dark:text-white">
                      {selected.records[key]}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-ink-500 dark:text-ink-100/50">
                <Asterisk className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                “Against field” is the database’s mixed evidence-against array; it may
                contain manuscripts, versions, or patristic records.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
