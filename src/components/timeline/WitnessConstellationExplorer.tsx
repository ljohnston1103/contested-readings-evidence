"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Landmark, Network, ScrollText, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { ConstellationBranch, ConstellationLeaf } from "@/data/derived";

type WitnessConstellationExplorerProps = {
  branches: ConstellationBranch[];
};

const width = 1260;
const height = 1040;
const cx = width / 2;
const cy = height / 2 - 10;
const branchRadius = 175;
const leafRadius = 300;
const hubRadius = 40;
const maxLeavesPerRing = 7;
const ringGap = 28;

function joinClassNames(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

function leafSize(leaf: ConstellationLeaf) {
  const total = leaf.supports.length + leaf.opposes.length;
  return Math.max(9, Math.min(30, 9 + Math.sqrt(total) * 4.4));
}

export function WitnessConstellationExplorer({ branches }: WitnessConstellationExplorerProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hiddenBranches, setHiddenBranches] = useState<Set<string>>(new Set());
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const searchNeedle = search.trim().toLowerCase();

  const allLeaves = useMemo(() => branches.flatMap((branch) => branch.leaves), [branches]);
  const defaultLeaf = useMemo(
    () =>
      allLeaves.reduce<ConstellationLeaf | undefined>((largest, leaf) => {
        const total = leaf.supports.length + leaf.opposes.length;
        const largestTotal = largest ? largest.supports.length + largest.opposes.length : -1;
        return total > largestTotal ? leaf : largest;
      }, undefined),
    [allLeaves],
  );
  const [selectedId, setSelectedId] = useState<string | undefined>(defaultLeaf?.id);

  const branchCount = branches.length;
  const branchAngleStep = (2 * Math.PI) / Math.max(1, branchCount);
  const startAngle = -Math.PI / 2;

  const branchNodes = branches.map((branch, index) => {
    const angle = startAngle + index * branchAngleStep;
    return {
      branch,
      angle,
      x: cx + branchRadius * Math.cos(angle),
      y: cy + branchRadius * Math.sin(angle),
    };
  });

  // Leaves fan out around their branch's angle. Branches with more leaves
  // than fit cleanly on one arc (without overlapping) spill onto additional
  // concentric rings further from the hub, rather than crowding one ring.
  const leafNodes = branchNodes.flatMap(({ branch, angle }) => {
    const count = branch.leaves.length;
    const arcWidth = count <= 1 ? 0 : branchAngleStep * 0.92;
    return branch.leaves.map((leaf, index) => {
      const ring = Math.floor(index / maxLeavesPerRing);
      const ringStart = ring * maxLeavesPerRing;
      const ringCount = Math.min(maxLeavesPerRing, count - ringStart);
      const indexInRing = index - ringStart;
      const leafAngle =
        ringCount <= 1 ? angle : angle - arcWidth / 2 + (indexInRing / (ringCount - 1)) * arcWidth;
      const radius = leafRadius + ring * ringGap;
      return {
        leaf,
        branch,
        angle: leafAngle,
        x: cx + radius * Math.cos(leafAngle),
        y: cy + radius * Math.sin(leafAngle),
      };
    });
  });

  const maxRingCount = Math.max(1, ...branches.map((branch) => Math.ceil(branch.leaves.length / maxLeavesPerRing)));
  const outerBoundaryRadius = leafRadius + (maxRingCount - 1) * ringGap + 20;

  const selected = selectedId ? allLeaves.find((leaf) => leaf.id === selectedId) : undefined;
  const selectedNode = selectedId ? leafNodes.find((node) => node.leaf.id === selectedId) : undefined;
  const hovered = leafNodes.find((node) => node.leaf.id === hoveredId);
  const totalFathers = allLeaves.filter((leaf) => leaf.kind === "father").length;
  const totalVersions = allLeaves.filter((leaf) => leaf.kind === "version").length;

  function leafMatchesSearch(leaf: ConstellationLeaf) {
    return !searchNeedle || leaf.name.toLowerCase().includes(searchNeedle);
  }

  function toggleBranch(id: string) {
    setHiddenBranches((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedId(undefined);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const popoverWidth = 340;
  let popoverLeft = 0;
  let popoverTop = 0;
  if (selectedNode) {
    popoverLeft =
      selectedNode.x + popoverWidth + 32 > width ? selectedNode.x - popoverWidth - 24 : selectedNode.x + 24;
    popoverLeft = Math.max(8, Math.min(width - popoverWidth - 8, popoverLeft));
    popoverTop = Math.max(8, Math.min(height - 300, selectedNode.y - 90));
  }

  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-card dark:border-white/10 dark:bg-archive-navy">
      <div className="grid gap-6 border-b border-ink-100 p-5 dark:border-white/10 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-archive-teal dark:text-teal-200">
            <Network className="h-4 w-4" aria-hidden="true" />
            Witness constellation
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-black tracking-tight text-ink-900 dark:text-white sm:text-4xl">
            One reading, testified across the whole ancient church.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-ink-600 dark:text-ink-100/70 sm:text-base">
            Every church father and ancient version in the catalog, grouped by linguistic and
            geographic branch. Search or select a node to see exactly which passages it speaks to.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="rounded-2xl border border-archive-gold/30 bg-archive-paper px-5 py-4 text-left dark:bg-white/5">
            <p className="font-display text-3xl font-black text-ink-900 dark:text-white">{branches.length}</p>
            <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-ink-600 dark:text-ink-100/60">
              Branches
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
            placeholder="Search a church father or ancient version (e.g. Augustine, Peshitta)"
            className="min-h-11 w-full bg-transparent text-sm text-ink-800 outline-none placeholder:text-ink-400 dark:text-white dark:placeholder:text-ink-100/40"
          />
          {search && (
            <button type="button" onClick={() => setSearch("")} aria-label="Clear search">
              <X className="h-4 w-4 text-ink-400 hover:text-ink-700 dark:text-ink-100/50 dark:hover:text-white" aria-hidden="true" />
            </button>
          )}
        </label>

        <div className="mt-4 flex flex-wrap gap-2">
          {branchNodes.map(({ branch }) => {
            const active = !hiddenBranches.has(branch.id);
            return (
              <button
                key={branch.id}
                type="button"
                onClick={() => toggleBranch(branch.id)}
                aria-pressed={active}
                className={joinClassNames(
                  "inline-flex min-h-9 items-center gap-2 rounded-full border px-3.5 text-xs font-bold transition-colors",
                  active
                    ? "border-ink-900 bg-ink-900 text-white dark:border-archive-gold dark:bg-archive-gold dark:text-ink-900"
                    : "border-ink-200 bg-white text-ink-500 hover:border-archive-gold dark:border-white/15 dark:bg-white/5 dark:text-ink-100/50",
                )}
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: branch.color }} aria-hidden="true" />
                {branch.label}
                <span className={active ? "opacity-70" : "text-ink-400 dark:text-ink-100/40"}>{branch.leaves.length}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap gap-4 text-xs font-bold text-ink-500 dark:text-ink-100/55">
          <span className="inline-flex items-center gap-1.5">
            <Landmark className="h-3.5 w-3.5" aria-hidden="true" /> {totalFathers} church fathers
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ScrollText className="h-3.5 w-3.5" aria-hidden="true" /> {totalVersions} ancient versions / aggregates
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-archive-gold" aria-hidden="true" /> dashed ring = also cited against a reading somewhere in the catalog
          </span>
        </div>

        <div className="relative mt-5 overflow-x-auto rounded-2xl border border-ink-100 bg-archive-paper/70 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="relative mx-auto" style={{ width, height }}>
            <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
              <circle cx={cx} cy={cy} r={outerBoundaryRadius} fill="none" stroke="currentColor" strokeDasharray="2 10" className="text-ink-200 dark:text-white/10" />

              {branchNodes.map(({ branch, x, y }) => (
                <line
                  key={`hub-${branch.id}`}
                  x1={cx}
                  y1={cy}
                  x2={x}
                  y2={y}
                  stroke={branch.color}
                  strokeWidth={hiddenBranches.has(branch.id) ? 1 : 2.5}
                  strokeOpacity={hiddenBranches.has(branch.id) ? 0.12 : 0.55}
                />
              ))}

              {leafNodes.map(({ leaf, branch, x, y }) => {
                const dimmed = hiddenBranches.has(branch.id) || !leafMatchesSearch(leaf);
                const focused = hoveredId === leaf.id || selectedId === leaf.id;
                return (
                  <line
                    key={`branch-leaf-${leaf.id}`}
                    x1={branchNodes.find((b) => b.branch.id === branch.id)!.x}
                    y1={branchNodes.find((b) => b.branch.id === branch.id)!.y}
                    x2={x}
                    y2={y}
                    stroke={branch.color}
                    strokeWidth={focused ? 2.5 : 1.25}
                    strokeOpacity={dimmed ? 0.08 : focused ? 0.9 : 0.32}
                  />
                );
              })}

              <circle cx={cx} cy={cy} r={hubRadius} fill="#c49a3f" />
              <text x={cx} y={cy - hubRadius - 14} textAnchor="middle" className="fill-ink-900 text-[13px] font-black dark:fill-white">
                The KJV / TR reading
              </text>

              {branchNodes.map(({ branch, x, y, angle }) => {
                const dimmed = hiddenBranches.has(branch.id);
                const isRight = Math.cos(angle) >= 0;
                const labelX = x + (isRight ? 1 : -1) * 16;
                return (
                  <g key={`label-${branch.id}`} opacity={dimmed ? 0.25 : 1}>
                    <circle cx={x} cy={y} r={13} fill={branch.color} stroke="white" strokeWidth={2} className="dark:stroke-archive-navy" />
                    <text
                      x={labelX}
                      y={y + 4}
                      textAnchor={isRight ? "start" : "end"}
                      className="fill-ink-800 text-[11px] font-black dark:fill-ink-100"
                    >
                      {branch.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {leafNodes.map(({ leaf, branch, x, y }) => {
              const size = leafSize(leaf);
              const dimmed = hiddenBranches.has(branch.id) || !leafMatchesSearch(leaf);
              const isSelected = leaf.id === selectedId;
              return (
                <motion.button
                  key={leaf.id}
                  type="button"
                  onMouseEnter={() => setHoveredId(leaf.id)}
                  onMouseLeave={() => setHoveredId((current) => (current === leaf.id ? null : current))}
                  onFocus={() => setHoveredId(leaf.id)}
                  onBlur={() => setHoveredId((current) => (current === leaf.id ? null : current))}
                  onClick={() => setSelectedId(leaf.id)}
                  initial={false}
                  animate={{
                    left: x - size / 2,
                    top: y - size / 2,
                    opacity: dimmed ? 0.12 : 1,
                    scale: isSelected ? 1.18 : 1,
                  }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className={joinClassNames(
                    "absolute grid place-items-center rounded-full shadow-sm",
                    dimmed ? "pointer-events-none" : "hover:brightness-110",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-archive-gold",
                  )}
                  style={{
                    width: size,
                    height: size,
                    backgroundColor: branch.color,
                    border: leaf.opposes.length ? "2.5px dashed #c49a3f" : "2.5px solid white",
                  }}
                  aria-pressed={isSelected}
                  aria-label={`${leaf.name}: ${leaf.supports.length} supporting, ${leaf.opposes.length} opposing catalog entries`}
                  title={leaf.name}
                />
              );
            })}

            {hovered && hovered.leaf.id !== selectedId && (
              <div
                className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+12px)] whitespace-nowrap rounded-xl border border-ink-200 bg-white px-3 py-1.5 text-xs font-black text-ink-900 shadow-card dark:border-white/10 dark:bg-archive-navy dark:text-white"
                style={{ left: hovered.x, top: hovered.y }}
              >
                {hovered.leaf.name}
                <span className="ml-1.5 font-bold text-archive-teal dark:text-teal-200">{hovered.leaf.supports.length} for</span>
                {hovered.leaf.opposes.length > 0 && (
                  <span className="ml-1.5 font-bold text-amber-700 dark:text-archive-gold">{hovered.leaf.opposes.length} against</span>
                )}
              </div>
            )}

            {selected && selectedNode && (
              <div
                className="pointer-events-none absolute z-20 w-[340px] rounded-2xl border border-archive-gold/40 bg-white p-4 shadow-card dark:border-archive-gold/30 dark:bg-archive-navy"
                style={{ left: popoverLeft, top: popoverTop }}
                role="dialog"
                aria-label={`Details for ${selected.name}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-archive-teal dark:text-teal-200">
                      Selected witness
                    </p>
                    <h3 className="mt-1 font-display text-xl font-black text-ink-900 dark:text-white">{selected.name}</h3>
                    <p className="mt-0.5 text-xs font-bold text-ink-600 dark:text-ink-100/70">{selected.detail}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedId(undefined)}
                    className="pointer-events-auto shrink-0 rounded-full p-1 text-ink-400 hover:bg-ink-100 hover:text-ink-800 dark:text-ink-100/50 dark:hover:bg-white/10 dark:hover:text-white"
                    aria-label="Close details"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-archive-teal/10 p-2.5">
                    <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-archive-teal dark:text-teal-200">Supports</dt>
                    <dd className="font-display text-xl font-black text-ink-900 dark:text-white">{selected.supports.length}</dd>
                  </div>
                  <div className="rounded-xl bg-amber-700/10 p-2.5">
                    <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-amber-800 dark:text-archive-gold">Opposes</dt>
                    <dd className="font-display text-xl font-black text-ink-900 dark:text-white">{selected.opposes.length}</dd>
                  </div>
                </dl>
                <div className="pointer-events-auto mt-3 max-h-[220px] overflow-y-auto pr-1">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.14em] text-archive-teal dark:text-teal-200">
                      Supports the reading in
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {selected.supports.length ? (
                        selected.supports.map((passage) => (
                          <Link
                            key={`${selected.id}-support-${passage.id}`}
                            href={`/passages/${passage.slug}`}
                            className="group inline-flex items-center gap-1 rounded-full bg-archive-teal/10 px-2.5 py-1 text-[11px] font-bold text-archive-teal transition hover:bg-archive-teal/20 dark:text-teal-200"
                          >
                            {passage.reference}
                            <ArrowRight className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                          </Link>
                        ))
                      ) : (
                        <span className="text-xs text-ink-500 dark:text-ink-100/60">None listed.</span>
                      )}
                    </div>
                  </div>
                  {selected.opposes.length > 0 && (
                    <div className="mt-3">
                      <p className="text-[11px] font-black uppercase tracking-[0.14em] text-amber-800 dark:text-archive-gold">
                        Opposes the reading in
                      </p>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {selected.opposes.map((passage) => (
                          <Link
                            key={`${selected.id}-oppose-${passage.id}`}
                            href={`/passages/${passage.slug}`}
                            className="group inline-flex items-center gap-1 rounded-full bg-amber-700/10 px-2.5 py-1 text-[11px] font-bold text-amber-800 transition hover:bg-amber-700/20 dark:text-amber-100"
                          >
                            {passage.reference}
                            <ArrowRight className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
