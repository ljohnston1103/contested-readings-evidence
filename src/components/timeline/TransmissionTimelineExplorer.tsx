"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Maximize2, Pause, Play, RotateCcw, Search, X } from "lucide-react";
import Link from "next/link";
import { memo, useEffect, useMemo, useRef, useState } from "react";

import {
  timelineCategoryColors,
  timelineCategoryLabels,
  timelineCategoryOrder,
  type FullTimelineEntry,
  type TimelineCategory,
  type TimelineSide,
} from "@/data/derived";
import { formatDateLabel } from "@/data/evidenceDates";

type TransmissionTimelineExplorerProps = {
  entries: FullTimelineEntry[];
};

type EraDef = { id: string; label: string; start: number; end: number; weight: number; tint: string };

const baseEras: EraDef[] = [
  { id: "apostolic", label: "Apostolic & Sub-Apostolic Age", start: 30, end: 100, weight: 0.7, tint: "rgba(15,118,110,0.07)" },
  { id: "ante-nicene", label: "Ante-Nicene Age", start: 100, end: 325, weight: 2.1, tint: "rgba(124,58,237,0.06)" },
  { id: "nicene-imperial", label: "Nicene & Imperial Age", start: 325, end: 451, weight: 1.5, tint: "rgba(196,154,63,0.14)" },
  { id: "byzantine-medieval", label: "Byzantine & Medieval Copying", start: 451, end: 1450, weight: 1.9, tint: "rgba(71,85,105,0.06)" },
  { id: "print-reformation", label: "Printing, Erasmus & the Reformation", start: 1450, end: 1611, weight: 1.2, tint: "rgba(3,105,161,0.08)" },
  { id: "after-kjv", label: "After the King James Bible", start: 1611, end: 1650, weight: 0.5, tint: "rgba(190,18,60,0.05)" },
];

const sideOrder: TimelineSide[] = ["support", "oppose", "milestone"];
const sideLabels: Record<TimelineSide, string> = {
  support: "Supports a reading",
  oppose: "Opposes a reading",
  milestone: "Curated milestone",
};

const dotSize = 12;
const dotSpacing = 13;
const minGapPx = 8;
const laneMinHeight = 54;
const laneGap = 8;
const plotTop = 20;
const plotLeftMargin = 10;
const plotRightMargin = 26;
const maxRowsPerLane = 5;
const clusterBinPx = 18;
const clusterDotSize = 22;

function cx(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function formatYear(year: number) {
  return `AD ${Math.round(year)}`;
}

type PointGeometry = {
  entry: FullTimelineEntry;
  x: number;
  xEnd: number;
  y: number;
  isRange: boolean;
};

type ClusterGeometry = {
  id: string;
  category: TimelineCategory;
  x: number;
  y: number;
  minStart: number;
  entries: FullTimelineEntry[];
};

type TimelinePointProps = {
  point: PointGeometry;
  color: string;
  revealed: boolean;
  selected: boolean;
  reduceMotion: boolean;
  onSelect: (id: string) => void;
};

const TimelinePoint = memo(function TimelinePoint({ point, color, revealed, selected, reduceMotion, onSelect }: TimelinePointProps) {
  const { entry, x, xEnd, y, isRange } = point;
  const isMilestone = entry.side === "milestone";
  const dashed = entry.side === "oppose";
  const width = isRange ? xEnd - x : dotSize;
  const height = isMilestone ? dotSize * 0.82 : dotSize;
  const left = isRange ? x : x - dotSize / 2;
  const top = y - height / 2;

  const shapeStyle: React.CSSProperties = isRange
    ? {
        left,
        top,
        width,
        height,
        borderRadius: 999,
        background: `linear-gradient(90deg, ${color} 0%, ${color}99 55%, ${color}33 100%)`,
        border: dashed ? `1.5px dashed ${color}` : `1.5px solid white`,
      }
    : isMilestone
      ? {
          left,
          top,
          width,
          height,
          backgroundColor: color,
          border: "2px solid white",
          transform: "rotate(45deg)",
        }
      : {
          left,
          top,
          width,
          height,
          borderRadius: 999,
          backgroundColor: color,
          border: dashed ? `2px dashed ${color}` : "2px solid white",
        };

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(entry.id)}
      initial={false}
      animate={{ opacity: revealed ? 1 : 0.14, scale: selected ? 1.35 : 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.25 }}
      className={cx(
        "absolute shadow-sm dark:shadow-none",
        selected ? "ring-2 ring-archive-gold ring-offset-1 ring-offset-white dark:ring-offset-archive-navy" : "hover:brightness-110",
      )}
      style={shapeStyle}
      aria-pressed={selected}
      aria-label={`${entry.name}, ${formatDateLabel(entry.date)}, ${sideLabels[entry.side]}, ${entry.passageReference}`}
      title={`${entry.name} · ${formatDateLabel(entry.date)}`}
    />
  );
});

type ClusterMarkerProps = {
  cluster: ClusterGeometry;
  color: string;
  revealed: boolean;
  selected: boolean;
  reduceMotion: boolean;
  onSelect: (id: string) => void;
};

const ClusterMarker = memo(function ClusterMarker({ cluster, color, revealed, selected, reduceMotion, onSelect }: ClusterMarkerProps) {
  const left = cluster.x - clusterDotSize / 2;
  const top = cluster.y - clusterDotSize / 2;
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(cluster.id)}
      initial={false}
      animate={{ opacity: revealed ? 1 : 0.14, scale: selected ? 1.15 : 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.25 }}
      className={cx(
        "absolute flex items-center justify-center rounded-full text-[9px] font-black leading-none text-white shadow-sm dark:shadow-none",
        selected ? "ring-2 ring-archive-gold ring-offset-1 ring-offset-white dark:ring-offset-archive-navy" : "hover:brightness-110",
      )}
      style={{ left, top, width: clusterDotSize, height: clusterDotSize, backgroundColor: color, border: "2px solid white" }}
      aria-label={`${cluster.entries.length} more witnesses clustered near this date on the timeline, press to view the full list`}
      title={`+${cluster.entries.length} more witnesses`}
    >
      +{cluster.entries.length}
    </motion.button>
  );
});

export function TransmissionTimelineExplorer({ entries }: TransmissionTimelineExplorerProps) {
  const shouldReduceMotion = useReducedMotion();
  const [search, setSearch] = useState("");
  const [hiddenCategories, setHiddenCategories] = useState<Set<TimelineCategory>>(new Set());
  const [hiddenSides, setHiddenSides] = useState<Set<TimelineSide>>(new Set());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedClusterId, setSelectedClusterId] = useState<string | null>(null);
  const [expandedClusterEntryId, setExpandedClusterEntryId] = useState<string | null>(null);
  const [cursorYear, setCursorYear] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [focusedEraId, setFocusedEraId] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const dataMinYear = Math.min(30, ...entries.map((entry) => entry.start));
  const dataMaxYear = Math.max(1611, ...entries.map((entry) => entry.end));

  const eras = useMemo(() => {
    const list = baseEras.map((era) => ({ ...era }));
    list[0].start = Math.min(list[0].start, dataMinYear);
    list[list.length - 1].end = Math.max(list[list.length - 1].end, dataMaxYear);
    return list;
  }, [dataMinYear, dataMaxYear]);

  const searchNeedle = search.trim().toLowerCase();

  const visibleEntries = useMemo(() => {
    return entries.filter((entry) => {
      if (hiddenCategories.has(entry.category)) return false;
      if (hiddenSides.has(entry.side)) return false;
      if (!searchNeedle) return true;
      const haystack = `${entry.name} ${entry.note} ${entry.passageReference} ${entry.passageTitle}`.toLowerCase();
      return haystack.includes(searchNeedle);
    });
  }, [entries, hiddenCategories, hiddenSides, searchNeedle]);

  const focusedEra = focusedEraId ? eras.find((era) => era.id === focusedEraId) : undefined;

  useEffect(() => {
    setCursorYear(null);
    setIsPlaying(false);
  }, [focusedEraId]);

  const scrubMin = focusedEra ? focusedEra.start : dataMinYear;
  const scrubMax = focusedEra ? focusedEra.end : dataMaxYear;

  const plotWidth = Math.max(1180, Math.min(2200, 1180 + visibleEntries.length * 0.6));
  const chartInnerWidth = plotWidth - plotLeftMargin - plotRightMargin;

  const erasWithGeometry = useMemo(() => {
    const active = focusedEraId ? eras.filter((era) => era.id === focusedEraId) : eras;
    const totalWeight = active.reduce((sum, era) => sum + era.weight, 0) || 1;
    let cursor = plotLeftMargin;
    return active.map((era) => {
      const width = (era.weight / totalWeight) * chartInnerWidth;
      const geometry = { ...era, x0: cursor, width };
      cursor += width;
      return geometry;
    });
  }, [eras, focusedEraId, chartInnerWidth]);

  function yearToX(year: number) {
    if (!erasWithGeometry.length) return plotLeftMargin;
    const lo = erasWithGeometry[0].start;
    const hi = erasWithGeometry[erasWithGeometry.length - 1].end;
    const clamped = Math.max(lo, Math.min(hi, year));
    const era =
      erasWithGeometry.find((item) => clamped >= item.start && clamped <= item.end) ??
      erasWithGeometry[erasWithGeometry.length - 1];
    const span = era.end - era.start || 1;
    const fraction = (clamped - era.start) / span;
    return era.x0 + fraction * era.width;
  }

  const timeFilteredEntries = useMemo(() => {
    if (!focusedEra) return visibleEntries;
    return visibleEntries.filter((entry) => entry.end >= focusedEra.start && entry.start <= focusedEra.end);
  }, [visibleEntries, focusedEra]);

  const layout = useMemo(() => {
    let offsetY = plotTop;
    const positions = new Map<string, PointGeometry>();
    const clusterPositions = new Map<string, ClusterGeometry>();
    const lanes = timelineCategoryOrder.map((category) => {
      const laneEntries = timeFilteredEntries.filter((entry) => entry.category === category);
      const withX = laneEntries
        .map((entry) => {
          const xStartRaw = yearToX(entry.start);
          const xEndRaw = yearToX(entry.end);
          const isRange = xEndRaw - xStartRaw > 11;
          return { entry, xStart: xStartRaw, xEnd: isRange ? xEndRaw : xStartRaw, isRange };
        })
        .sort((a, b) => a.xStart - b.xStart);

      // True interval-scheduling row assignment (as before) so range bars and dots
      // never visually overlap, however many rows it takes.
      const rowEnds: number[] = [];
      const withRow = withX.map(({ entry, xStart, xEnd, isRange }) => {
        let row = rowEnds.findIndex((end) => end + minGapPx <= xStart);
        if (row === -1) {
          row = rowEnds.length;
          rowEnds.push(xEnd);
        } else {
          rowEnds[row] = xEnd;
        }
        return { entry, xStart, xEnd, isRange, row };
      });

      // Cap what renders individually at maxRowsPerLane rows; anything that would
      // need a deeper row gets bundled into a numbered cluster marker instead, so a
      // lane with a dense cluster of same-era witnesses doesn't grow without limit.
      const shown = withRow.filter((item) => item.row < maxRowsPerLane);
      const overflow = withRow.filter((item) => item.row >= maxRowsPerLane);

      const overflowBuckets: (typeof overflow)[] = [];
      for (const item of overflow) {
        const currentBucket = overflowBuckets[overflowBuckets.length - 1];
        const lastItem = currentBucket?.[currentBucket.length - 1];
        if (currentBucket && lastItem && item.xStart - lastItem.xStart <= clusterBinPx) {
          currentBucket.push(item);
        } else {
          overflowBuckets.push([item]);
        }
      }

      // Cluster markers are small and fixed-width, so they get their own simple
      // interval scheduling, starting one row below the deepest individual row.
      const clusterRowEnds: number[] = [];
      const clusters: Array<{ id: string; x: number; minStart: number; entries: FullTimelineEntry[]; row: number }> = [];
      overflowBuckets.forEach((bucket, bucketIndex) => {
        const x = bucket.reduce((sum, item) => sum + item.xStart, 0) / bucket.length;
        const left = x - clusterDotSize / 2;
        const right = x + clusterDotSize / 2;
        let slot = clusterRowEnds.findIndex((end) => end + minGapPx <= left);
        if (slot === -1) {
          slot = clusterRowEnds.length;
          clusterRowEnds.push(right);
        } else {
          clusterRowEnds[slot] = right;
        }
        clusters.push({
          id: `${category}-cluster-${bucketIndex}`,
          x,
          minStart: Math.min(...bucket.map((item) => item.entry.start)),
          entries: bucket.map((item) => item.entry),
          row: maxRowsPerLane + slot,
        });
      });

      let maxRow = 0;
      shown.forEach((item) => {
        if (item.row > maxRow) maxRow = item.row;
      });
      clusters.forEach((cluster) => {
        if (cluster.row > maxRow) maxRow = cluster.row;
      });
      const rowCount = Math.max(1, maxRow + 1);
      const laneHeight = Math.max(laneMinHeight, rowCount * dotSpacing + 24);
      const baseline = offsetY + laneHeight - 15;

      const points: PointGeometry[] = shown.map(({ entry, xStart, xEnd, isRange, row }) => {
        const point = { entry, x: xStart, xEnd, y: baseline - row * dotSpacing, isRange };
        positions.set(entry.id, point);
        return point;
      });
      const laneClusters: ClusterGeometry[] = clusters.map(({ id, x, minStart, entries, row }) => {
        const cluster = { id, category, x, y: baseline - row * dotSpacing, minStart, entries };
        clusterPositions.set(id, cluster);
        return cluster;
      });

      const lane = { category, top: offsetY, height: laneHeight, points, clusters: laneClusters };
      offsetY += laneHeight + laneGap;
      return lane;
    });
    return { lanes, totalHeight: offsetY, positions, clusterPositions };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeFilteredEntries, erasWithGeometry]);

  const chartHeight = layout.totalHeight + 44;

  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    const step = (scrubMax - scrubMin) / 140 || 1;
    intervalRef.current = setInterval(() => {
      setCursorYear((current) => {
        const next = (current ?? scrubMin) + step;
        if (next >= scrubMax) {
          setIsPlaying(false);
          return scrubMax;
        }
        return next;
      });
    }, 40);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, scrubMin, scrubMax]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedId(null);
        setSelectedClusterId(null);
        setExpandedClusterEntryId(null);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function togglePlay() {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    setCursorYear(scrubMin);
    setIsPlaying(true);
  }

  function toggleCategory(category: TimelineCategory) {
    setHiddenCategories((current) => {
      const next = new Set(current);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  }

  function toggleSide(side: TimelineSide) {
    setHiddenSides((current) => {
      const next = new Set(current);
      if (next.has(side)) next.delete(side);
      else next.add(side);
      return next;
    });
  }

  const effectiveYear = cursorYear ?? scrubMax;
  const distinctWitnesses = new Set(timeFilteredEntries.map((entry) => entry.name)).size;
  const distinctPassages = new Set(timeFilteredEntries.map((entry) => entry.passageSlug)).size;

  const selected = selectedId ? timeFilteredEntries.find((entry) => entry.id === selectedId) : undefined;
  const selectedPoint = selectedId ? layout.positions.get(selectedId) : undefined;
  const selectedCluster = selectedClusterId ? layout.clusterPositions.get(selectedClusterId) : undefined;
  const activeAnchor = selectedPoint ?? selectedCluster;

  let popoverLeft = 0;
  let popoverTop = 0;
  const popoverWidth = 336;
  if (activeAnchor) {
    const anchorX = activeAnchor.x;
    popoverLeft =
      anchorX + popoverWidth + 28 > plotWidth ? anchorX - popoverWidth - 20 : anchorX + 20;
    popoverLeft = Math.max(8, Math.min(plotWidth - popoverWidth - 8, popoverLeft));
    popoverTop = Math.max(8, Math.min(chartHeight - 210, activeAnchor.y - 70));
  }

  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-card dark:border-white/10 dark:bg-archive-navy">
      <div className="grid gap-6 border-b border-ink-100 p-5 dark:border-white/10 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-archive-teal dark:text-teal-200">
            The transmission timeline
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-black tracking-tight text-ink-900 dark:text-white sm:text-4xl">
            Every witness, every date, on one axis.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-ink-600 dark:text-ink-100/70 sm:text-base">
            Every Greek manuscript, Latin witness, ancient version, church father, printed edition,
            and competing-evidence row in the catalog&mdash;each with a catalogued date or a transparently bounded range. Search a
            witness, filter a lane, or press play to watch the record build.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="rounded-2xl border border-archive-gold/30 bg-archive-paper px-5 py-4 text-left dark:bg-white/5">
            <p className="font-display text-3xl font-black text-ink-900 dark:text-white">{entries.length}</p>
            <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-ink-600 dark:text-ink-100/60">
              Dated witness entries
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <label className="flex min-h-11 items-center gap-2 rounded-full border border-ink-200 bg-white px-4 dark:border-white/15 dark:bg-white/5">
          <Search className="h-4 w-4 shrink-0 text-ink-400 dark:text-ink-100/50" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search a witness, note, or passage (e.g. Vaticanus, Chrysostom, Mark 16)"
            className="min-h-11 w-full bg-transparent text-sm text-ink-800 outline-none placeholder:text-ink-400 dark:text-white dark:placeholder:text-ink-100/40"
          />
          {search && (
            <button type="button" onClick={() => setSearch("")} aria-label="Clear search">
              <X className="h-4 w-4 text-ink-400 hover:text-ink-700 dark:text-ink-100/50 dark:hover:text-white" aria-hidden="true" />
            </button>
          )}
        </label>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink-900 px-5 text-sm font-black text-white shadow-card transition hover:-translate-y-0.5 hover:bg-archive-blue dark:bg-archive-gold dark:text-ink-900"
          >
            {isPlaying ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
            {isPlaying ? "Pause" : "Play the history"}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setCursorYear(null);
            }}
            disabled={cursorYear === null}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink-200 bg-white px-4 text-sm font-bold text-ink-700 transition hover:border-archive-gold/60 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/15 dark:bg-white/5 dark:text-ink-100"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Show everything
          </button>
          <input
            type="range"
            min={scrubMin}
            max={scrubMax}
            step={1}
            value={Math.round(effectiveYear)}
            onChange={(event) => {
              setIsPlaying(false);
              setCursorYear(Number(event.target.value));
            }}
            aria-label="Scrub through history by year"
            className="h-2 min-w-[160px] flex-1 accent-archive-gold"
          />
          <span className="min-w-[7ch] text-right font-display text-lg font-black text-ink-900 dark:text-white">
            {formatYear(effectiveYear)}
          </span>
        </div>

        {focusedEra && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-archive-gold/15 px-4 py-3 text-sm font-bold text-ink-800 dark:bg-archive-gold/10 dark:text-white">
            <span>
              Zoomed into <span className="font-black">{focusedEra.label}</span> (AD {focusedEra.start}&ndash;{focusedEra.end})
            </span>
            <button
              type="button"
              onClick={() => setFocusedEraId(null)}
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-ink-900/20 bg-white px-3 text-xs font-black text-ink-900 hover:bg-archive-paper dark:border-white/20 dark:bg-white/10 dark:text-white"
            >
              <RotateCcw className="h-3 w-3" aria-hidden="true" />
              All eras
            </button>
          </div>
        )}

        <p className="mt-4 text-sm font-bold text-ink-600 dark:text-ink-100/65">
          Showing {timeFilteredEntries.length} of {entries.length} entries &middot; {distinctWitnesses} distinct
          witnesses &middot; {distinctPassages} passages
        </p>

        <fieldset className="mt-4">
          <legend className="text-xs font-black uppercase tracking-[0.18em] text-ink-500 dark:text-ink-100/60">
            Filter by lane
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {timelineCategoryOrder.map((category) => {
              const active = !hiddenCategories.has(category);
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  aria-pressed={active}
                  className={cx(
                    "inline-flex min-h-9 items-center gap-2 rounded-full border px-3.5 text-xs font-bold transition-colors",
                    active
                      ? "border-ink-900 bg-ink-900 text-white dark:border-archive-gold dark:bg-archive-gold dark:text-ink-900"
                      : "border-ink-200 bg-white text-ink-500 hover:border-archive-gold dark:border-white/15 dark:bg-white/5 dark:text-ink-100/50",
                  )}
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: timelineCategoryColors[category] }} aria-hidden="true" />
                  {timelineCategoryLabels[category]}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="mt-3">
          <legend className="text-xs font-black uppercase tracking-[0.18em] text-ink-500 dark:text-ink-100/60">
            Filter by kind
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {sideOrder.map((side) => {
              const active = !hiddenSides.has(side);
              return (
                <button
                  key={side}
                  type="button"
                  onClick={() => toggleSide(side)}
                  aria-pressed={active}
                  className={cx(
                    "inline-flex min-h-9 items-center gap-2 rounded-full border px-3.5 text-xs font-bold transition-colors",
                    active
                      ? "border-ink-900 bg-ink-900 text-white dark:border-archive-gold dark:bg-archive-gold dark:text-ink-900"
                      : "border-ink-200 bg-white text-ink-500 hover:border-archive-gold dark:border-white/15 dark:bg-white/5 dark:text-ink-100/50",
                  )}
                >
                  <span
                    className={cx(
                      "h-2.5 w-2.5 shrink-0 bg-current",
                      side === "milestone" ? "rotate-45 rounded-[2px]" : "rounded-full",
                      side === "oppose" ? "border border-dashed border-current bg-transparent" : "",
                    )}
                    aria-hidden="true"
                  />
                  {sideLabels[side]}
                </button>
              );
            })}
          </div>
        </fieldset>

        <figure className="relative mt-5">
          <div className="overflow-x-auto rounded-2xl border border-ink-100 bg-archive-paper/70 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="relative" style={{ width: plotWidth, height: chartHeight }}>
              <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${plotWidth} ${chartHeight}`} aria-hidden="true">
                {erasWithGeometry.map((era) => (
                  <g key={era.id}>
                    <rect x={era.x0} y={0} width={era.width} height={layout.totalHeight} fill={era.tint} />
                    <line x1={era.x0} x2={era.x0} y1={0} y2={layout.totalHeight} stroke="currentColor" className="text-ink-200 dark:text-white/10" />
                  </g>
                ))}
                {cursorYear !== null && (
                  <line
                    x1={yearToX(cursorYear)}
                    x2={yearToX(cursorYear)}
                    y1={0}
                    y2={layout.totalHeight}
                    stroke="#c49a3f"
                    strokeWidth={2}
                  />
                )}
                {layout.lanes.map((lane) => {
                  const laneCount =
                    lane.points.length + lane.clusters.reduce((sum, cluster) => sum + cluster.entries.length, 0);
                  return (
                    <text
                      key={lane.category}
                      x={plotLeftMargin}
                      y={lane.top + 12}
                      className="fill-ink-500 text-[10px] font-black uppercase tracking-wide dark:fill-ink-100/50"
                    >
                      {timelineCategoryLabels[lane.category]} ({laneCount})
                    </text>
                  );
                })}
              </svg>

              {erasWithGeometry.map((era) => (
                <button
                  key={`zoom-${era.id}`}
                  type="button"
                  onClick={() => setFocusedEraId((current) => (current === era.id ? null : era.id))}
                  className="group absolute bottom-0 flex translate-y-full items-center gap-1 whitespace-nowrap px-1 pt-1.5 text-[10px] font-bold uppercase tracking-wide text-ink-600 hover:text-archive-blue dark:text-ink-100/55 dark:hover:text-white"
                  style={{ left: era.x0, width: era.width }}
                  title={`Zoom into ${era.label}`}
                >
                  <Maximize2 className="h-2.5 w-2.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                  <span className="truncate">{era.label}</span>
                </button>
              ))}

              {layout.lanes.flatMap((lane) => [
                ...lane.points.map((point) => {
                  const revealed = cursorYear === null || point.entry.start <= cursorYear;
                  return (
                    <TimelinePoint
                      key={point.entry.id}
                      point={point}
                      color={timelineCategoryColors[point.entry.category]}
                      revealed={revealed}
                      selected={point.entry.id === selectedId}
                      reduceMotion={Boolean(shouldReduceMotion)}
                      onSelect={(id) => {
                        setSelectedId(id);
                        setSelectedClusterId(null);
                      }}
                    />
                  );
                }),
                ...lane.clusters.map((cluster) => {
                  const revealed = cursorYear === null || cluster.minStart <= cursorYear;
                  return (
                    <ClusterMarker
                      key={cluster.id}
                      cluster={cluster}
                      color={timelineCategoryColors[cluster.category]}
                      revealed={revealed}
                      selected={cluster.id === selectedClusterId}
                      reduceMotion={Boolean(shouldReduceMotion)}
                      onSelect={(id) => {
                        setSelectedClusterId(id);
                        setSelectedId(null);
                        setExpandedClusterEntryId(null);
                      }}
                    />
                  );
                }),
              ])}

              {selected && selectedPoint && !selectedCluster && (
                <div
                  className="pointer-events-none absolute z-20 w-[336px] rounded-2xl border border-archive-gold/40 bg-white p-4 shadow-card dark:border-archive-gold/30 dark:bg-archive-navy"
                  style={{ left: popoverLeft, top: popoverTop }}
                  role="dialog"
                  aria-label={`Details for ${selected.name}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p
                        className="text-xs font-black uppercase tracking-[0.14em]"
                        style={{ color: timelineCategoryColors[selected.category] }}
                      >
                        {timelineCategoryLabels[selected.category]} &middot; {sideLabels[selected.side]}
                      </p>
                      <h4 className="mt-1 font-display text-lg font-black leading-tight text-ink-900 dark:text-white">
                        {selected.name}
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedId(null)}
                      className="pointer-events-auto shrink-0 rounded-full p-1 text-ink-400 hover:bg-ink-100 hover:text-ink-800 dark:text-ink-100/50 dark:hover:bg-white/10 dark:hover:text-white"
                      aria-label="Close details"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="mt-2 text-xs font-bold uppercase tracking-wide text-ink-500 dark:text-ink-100/50">
                    {formatDateLabel(selected.date)}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-ink-700 dark:text-ink-100/75">{selected.note}</p>
                  <Link
                    href={`/passages/${selected.passageSlug}`}
                    className="pointer-events-auto mt-3 inline-flex min-h-9 items-center gap-1 rounded-full bg-ink-900 px-4 text-xs font-black text-white hover:bg-archive-blue dark:bg-archive-gold dark:text-ink-900"
                  >
                    {selected.passageReference} &middot; {selected.passageTitle}
                  </Link>
                </div>
              )}

              {selectedCluster && (
                <div
                  className="pointer-events-none absolute z-20 w-[336px] rounded-2xl border border-archive-gold/40 bg-white p-4 shadow-card dark:border-archive-gold/30 dark:bg-archive-navy"
                  style={{ left: popoverLeft, top: popoverTop }}
                  role="dialog"
                  aria-label={`${selectedCluster.entries.length} clustered witnesses`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className="text-xs font-black uppercase tracking-[0.14em]"
                      style={{ color: timelineCategoryColors[selectedCluster.category] }}
                    >
                      {timelineCategoryLabels[selectedCluster.category]} &middot; {selectedCluster.entries.length}{" "}
                      witnesses, nearly the same date
                    </p>
                    <button
                      type="button"
                      onClick={() => setSelectedClusterId(null)}
                      className="pointer-events-auto shrink-0 rounded-full p-1 text-ink-400 hover:bg-ink-100 hover:text-ink-800 dark:text-ink-100/50 dark:hover:bg-white/10 dark:hover:text-white"
                      aria-label="Close list"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <ul className="pointer-events-auto mt-3 max-h-[260px] space-y-1 overflow-y-auto pr-1">
                    {selectedCluster.entries.map((entry) => {
                      const expanded = expandedClusterEntryId === entry.id;
                      return (
                        <li key={entry.id}>
                          <button
                            type="button"
                            onClick={() => setExpandedClusterEntryId(expanded ? null : entry.id)}
                            aria-expanded={expanded}
                            className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-xs font-bold text-ink-700 hover:bg-archive-paper dark:text-ink-100/80 dark:hover:bg-white/10"
                          >
                            <span className="truncate">{entry.name}</span>
                            <span className="ml-2 shrink-0 text-ink-400 dark:text-ink-100/40">{formatDateLabel(entry.date)}</span>
                          </button>
                          {expanded && (
                            <div className="mt-1 rounded-lg bg-archive-paper px-2.5 py-2 dark:bg-white/5">
                              <p className="text-xs leading-5 text-ink-700 dark:text-ink-100/75">{entry.note}</p>
                              <Link
                                href={`/passages/${entry.passageSlug}`}
                                className="mt-2 inline-flex min-h-8 items-center gap-1 rounded-full bg-ink-900 px-3 text-[11px] font-black text-white hover:bg-archive-blue dark:bg-archive-gold dark:text-ink-900"
                              >
                                {entry.passageReference} &middot; {entry.passageTitle}
                              </Link>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </figure>

        <p className="mt-3 text-xs leading-5 text-ink-500 dark:text-ink-100/50">
          A solid dot marks a single attested date; a fading bar marks a witness whose date is a
          range in the source note. A dashed outline means the row counts as evidence against a
          reading; a diamond is a curated milestone rather than an individual witness. A larger
          numbered marker bundles several witnesses that share nearly the same date&mdash;click it
          to open the full list. Hover an era label to zoom into it. Click any marker for its full
          record.
        </p>
      </div>
    </section>
  );
}
