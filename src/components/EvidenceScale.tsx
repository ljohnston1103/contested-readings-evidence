"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Scale as ScaleIcon } from "lucide-react";

import type { Passage } from "@/data/types";

type EvidenceScaleProps = {
  passage: Passage;
};

const viewWidth = 380;
const viewHeight = 220;
const cx = 190;
const fulcrumY = 130;
const beamY = 70;
const beamHalfWidth = 118;
const panDrop = 46;
const maxTiltDeg = 12;
const springTransition = { type: "spring", stiffness: 90, damping: 13 } as const;

function panRadius(count: number) {
  return Math.max(24, Math.min(48, 24 + Math.sqrt(count) * 5));
}

function rotatePoint(x: number, y: number, angleDeg: number) {
  const angle = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: x * cos - y * sin, y: x * sin + y * cos };
}

export function EvidenceScale({ passage }: EvidenceScaleProps) {
  const shouldReduceMotion = useReducedMotion();

  const supportCount =
    passage.greekSupportWitnesses.length +
    passage.latinWitnesses.length +
    passage.versionalWitnesses.length +
    passage.patristicWitnesses.length +
    (passage.printedWitnesses?.length ?? 0);
  const againstCount = passage.evidenceAgainst.length;
  const total = supportCount + againstCount || 1;
  const tiltDeg = shouldReduceMotion ? 0 : ((againstCount - supportCount) / total) * maxTiltDeg;

  const beamRise = beamY - fulcrumY;
  const leftRel = rotatePoint(-beamHalfWidth, beamRise, tiltDeg);
  const rightRel = rotatePoint(beamHalfWidth, beamRise, tiltDeg);
  const leftEnd = { x: cx + leftRel.x, y: fulcrumY + leftRel.y };
  const rightEnd = { x: cx + rightRel.x, y: fulcrumY + rightRel.y };
  const leftPan = { x: leftEnd.x, y: leftEnd.y + panDrop };
  const rightPan = { x: rightEnd.x, y: rightEnd.y + panDrop };

  const supportRadius = panRadius(supportCount);
  const againstRadius = panRadius(againstCount);
  const staticLeftX = cx - beamHalfWidth;
  const staticRightX = cx + beamHalfWidth;

  return (
    <section className="rounded-[2rem] border border-ink-200 bg-white/75 p-5 shadow-card dark:border-white/10 dark:bg-white/[0.05]">
      <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.22em] text-archive-teal dark:text-teal-200">
        <ScaleIcon className="h-4 w-4" aria-hidden="true" />
        Evidence Scale
      </p>
      <h3 className="mt-1 font-display text-2xl font-black text-ink-900 dark:text-white">
        Raw record count, weighed.
      </h3>

      <div className="mt-3 flex justify-center">
        <svg
          viewBox={`0 0 ${viewWidth} ${viewHeight}`}
          className="h-auto w-full max-w-[320px]"
          role="img"
          aria-label={`Balance scale: ${supportCount} supporting records against ${againstCount} opposing records`}
        >
          <polygon
            points={`${cx - 16},${fulcrumY + 34} ${cx + 16},${fulcrumY + 34} ${cx},${fulcrumY}`}
            className="fill-ink-200 dark:fill-white/15"
          />
          <rect x={cx - 34} y={fulcrumY + 34} width={68} height={9} rx={4} className="fill-ink-300 dark:fill-white/20" />

          <motion.line
            animate={{ x1: leftEnd.x, y1: leftEnd.y, x2: rightEnd.x, y2: rightEnd.y }}
            transition={springTransition}
            className="stroke-ink-800 dark:stroke-white/70"
            strokeWidth={8}
            strokeLinecap="round"
          />
          <circle cx={cx} cy={fulcrumY} r={7} className="fill-ink-800 dark:fill-white/70" />

          <motion.line
            animate={{ x1: leftEnd.x, y1: leftEnd.y, x2: leftPan.x, y2: leftPan.y }}
            transition={springTransition}
            className="stroke-ink-400 dark:stroke-white/40"
            strokeWidth={1.5}
          />
          <motion.line
            animate={{ x1: rightEnd.x, y1: rightEnd.y, x2: rightPan.x, y2: rightPan.y }}
            transition={springTransition}
            className="stroke-ink-400 dark:stroke-white/40"
            strokeWidth={1.5}
          />

          <motion.circle
            animate={{ cx: leftPan.x, cy: leftPan.y }}
            transition={springTransition}
            r={supportRadius}
            className="fill-archive-teal/85"
          />
          <motion.text
            animate={{ x: leftPan.x, y: leftPan.y + 5 }}
            transition={springTransition}
            textAnchor="middle"
            className="fill-white text-[15px] font-black"
          >
            {supportCount}
          </motion.text>

          <motion.circle
            animate={{ cx: rightPan.x, cy: rightPan.y }}
            transition={springTransition}
            r={againstRadius}
            className="fill-archive-gold/90"
          />
          <motion.text
            animate={{ x: rightPan.x, y: rightPan.y + 5 }}
            transition={springTransition}
            textAnchor="middle"
            className="fill-ink-900 text-[15px] font-black"
          >
            {againstCount}
          </motion.text>

          <text
            x={staticLeftX}
            y={206}
            textAnchor="middle"
            className="fill-ink-600 text-[11px] font-black uppercase tracking-[0.12em] dark:fill-ink-100/60"
          >
            Supporting records
          </text>
          <text
            x={staticRightX}
            y={206}
            textAnchor="middle"
            className="fill-ink-600 text-[11px] font-black uppercase tracking-[0.12em] dark:fill-ink-100/60"
          >
            Opposing records
          </text>
        </svg>
      </div>

      <p className="mt-2 text-center text-xs leading-5 text-ink-500 dark:text-ink-100/50">
        Pan size and tilt reflect the number of catalog evidence records on each side&mdash;not a
        count of unique manuscripts, and not a measure of argumentative weight.
      </p>
    </section>
  );
}
