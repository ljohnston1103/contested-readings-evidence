import type { Passage, PatristicWitness, Witness } from "@/data/types";
import { isCompetingEvidenceDirection } from "@/data/evidenceDirection";

const cardWidth = 1200;
const cardHeight = 630;

function normalizeCountKey(value: string) {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\p{S}]+/gu, " ")
    .trim();
}

function uniqueWitnessCount(rows: Witness[]) {
  return new Set(
    rows.map((row) =>
      normalizeCountKey(
        `${row.direction ?? ""} ${row.unit ?? ""} ${row.witness} ${row.date} ${row.note}`,
      ),
    ),
  ).size;
}

function uniquePatristicCount(rows: PatristicWitness[]) {
  const publicRows = rows.filter((row) => {
    const text = normalizeCountKey(
      `${row.author ?? row.source} ${row.date} ${row.workSection ?? ""} ${row.quoteSummary}`,
    );
    return (
      !/editorial placeholder|verification pending|unverified draft/.test(text) &&
      normalizeCountKey(row.source) !== "patristic witnesses"
    );
  });

  return new Set(
    publicRows.map((row) =>
      normalizeCountKey(
        `${row.author ?? row.source} ${row.date} ${row.workSection ?? ""} ${row.quoteSummary}`,
      ),
    ),
  ).size;
}

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number,
) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(testLine).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  }
  if (line) lines.push(line);

  const truncated = lines.length > maxLines;
  const visible = truncated ? lines.slice(0, maxLines) : lines;
  if (truncated && visible.length) {
    let last = visible[visible.length - 1];
    while (last.includes(" ") && ctx.measureText(`${last}…`).width > maxWidth) {
      last = last.slice(0, last.lastIndexOf(" "));
    }
    visible[visible.length - 1] = `${last}…`;
  }
  visible.forEach((textLine, index) => ctx.fillText(textLine, x, y + index * lineHeight));
  return visible.length;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function drawEvidenceCard(canvas: HTMLCanvasElement, passage: Passage, siteUrl: string) {
  canvas.width = cardWidth;
  canvas.height = cardHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const serif = "Georgia, 'Times New Roman', serif";
  const sans = "Arial, Helvetica, sans-serif";

  const backgroundGradient = ctx.createLinearGradient(0, 0, cardWidth, cardHeight);
  backgroundGradient.addColorStop(0, "#0c1424");
  backgroundGradient.addColorStop(1, "#161f33");
  ctx.fillStyle = backgroundGradient;
  ctx.fillRect(0, 0, cardWidth, cardHeight);

  ctx.fillStyle = "#c49a3f";
  ctx.fillRect(0, 0, cardWidth, 10);

  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#c49a3f";
  ctx.font = `700 22px ${sans}`;
  ctx.fillText("OLDEST & BEST · MANUSCRIPT EVIDENCE DATABASE", 64, 78);

  ctx.fillStyle = "rgba(255,255,255,0.65)";
  ctx.font = `700 24px ${sans}`;
  ctx.fillText(passage.reference.toUpperCase(), 64, 120);

  ctx.fillStyle = "#ffffff";
  ctx.font = `900 48px ${serif}`;
  const titleLines = wrapCanvasText(ctx, passage.title, 64, 178, cardWidth - 128, 54, 2);

  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = `italic 400 25px ${serif}`;
  const quoteTop = 178 + titleLines * 54 + 30;
  wrapCanvasText(ctx, `“${passage.kjvText}”`, 64, quoteTop, cardWidth - 128, 35, 4);

  const competingRows = passage.evidenceAgainst.filter(
    (row) =>
      !row.aggregate && isCompetingEvidenceDirection(row.direction),
  );
  const stats: Array<[string, number]> = [
    [
      "Greek support",
      uniqueWitnessCount(
        passage.greekSupportWitnesses.filter((row) => !row.aggregate),
      ),
    ],
    [
      "Versional support",
      uniqueWitnessCount([
        ...passage.latinWitnesses.filter((row) => !row.aggregate),
        ...passage.versionalWitnesses.filter((row) => !row.aggregate),
      ]),
    ],
    ["Church fathers", uniquePatristicCount(passage.patristicWitnesses)],
    ["Competing", uniqueWitnessCount(competingRows)],
  ];
  const statsTop = 452;
  const statWidth = (cardWidth - 128 - 3 * 16) / 4;
  stats.forEach(([label, value], index) => {
    const x = 64 + index * (statWidth + 16);
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    roundRect(ctx, x, statsTop, statWidth, 96, 18);
    ctx.fill();
    ctx.fillStyle = "#c49a3f";
    ctx.font = `900 34px ${serif}`;
    ctx.fillText(String(value), x + 20, statsTop + 46);
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.font = `700 14px ${sans}`;
    ctx.fillText(label.toUpperCase(), x + 20, statsTop + 74);
  });

  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.font = `700 18px ${sans}`;
  ctx.fillText(siteUrl, 64, cardHeight - 30);
}

export function downloadEvidenceCard(passage: Passage, siteUrl: string) {
  const canvas = document.createElement("canvas");
  drawEvidenceCard(canvas, passage, siteUrl);
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = `${passage.slug}-evidence-card.png`;
  link.click();
}
