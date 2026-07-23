import type { Witness } from "./types";

export type EvidenceDateRange = {
  start: number;
  end: number;
};

const ordinalCenturies: Record<string, number> = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  fifth: 5,
  sixth: 6,
  seventh: 7,
  eighth: 8,
  ninth: 9,
  tenth: 10,
  eleventh: 11,
  twelfth: 12,
  thirteenth: 13,
  fourteenth: 14,
  fifteenth: 15,
  sixteenth: 16,
  seventeenth: 17,
  eighteenth: 18,
  nineteenth: 19,
  twentieth: 20,
  "twenty-first": 21,
};

function centuryRange(century: number, qualifier = ""): EvidenceDateRange {
  const start = (century - 1) * 100 + 1;
  const end = century * 100;
  if (/early/i.test(qualifier)) return { start, end: start + 32 };
  if (/mid|middle/i.test(qualifier)) {
    return { start: start + 33, end: start + 65 };
  }
  if (/late/i.test(qualifier)) return { start: start + 66, end };
  return { start, end };
}

function centuryNumber(value: string) {
  const normalized = value.toLowerCase();
  if (ordinalCenturies[normalized]) return ordinalCenturies[normalized];
  const number = Number.parseInt(normalized, 10);
  return Number.isFinite(number) ? number : undefined;
}

/**
 * Converts the catalogue's public date labels into sortable numeric bounds.
 * The displayed wording remains untouched. Explicit `dateStart`/`dateEnd`
 * values supplied by the witness catalogue take precedence over this parser.
 */
export function parseEvidenceDate(label: string): EvidenceDateRange | undefined {
  const value = label
    .normalize("NFKC")
    .replace(/[‐‑‒–—−]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
  if (!value) return undefined;

  const centuryWords = Object.keys(ordinalCenturies)
    .sort((a, b) => b.length - a.length)
    .join("|");
  const sameCenturyQualifierRange = value.match(
    new RegExp(
      `\\b(early|mid(?:dle)?|late)-to-(early|mid(?:dle)?|late)\\s+(${centuryWords}|\\d{1,2}(?:st|nd|rd|th))(?:\\s+|-)(?:centur(?:y|ies)\\b|c\\.)`,
      "i",
    ),
  );
  if (sameCenturyQualifierRange) {
    const century = centuryNumber(
      sameCenturyQualifierRange[3].replace(
        /^(\d{1,2})(?:st|nd|rd|th)$/i,
        "$1",
      ),
    );
    if (century) {
      const first = centuryRange(century, sameCenturyQualifierRange[1]);
      const last = centuryRange(century, sameCenturyQualifierRange[2]);
      return {
        start: Math.min(first.start, last.start),
        end: Math.max(first.end, last.end),
      };
    }
  }
  const centuryPattern = new RegExp(
      `\\b(?:(early|mid(?:dle)?|late)\\s+)?(${centuryWords}|\\d{1,2}(?:st|nd|rd|th))` +
      `(?:\\s*(?:-|to|through|/|or)\\s*(?:(early|mid(?:dle)?|late)\\s+)?(${centuryWords}|\\d{1,2}(?:st|nd|rd|th)))?` +
      `(?:\\s+|-)(?:centur(?:y|ies)\\b|c\\.)`,
    "i",
  );
  const centuryMatch = value.match(centuryPattern);
  if (centuryMatch) {
    const firstCentury = centuryNumber(
      centuryMatch[2].replace(/^(\d{1,2})(?:st|nd|rd|th)$/i, "$1"),
    );
    if (!firstCentury) return undefined;
    const first = centuryRange(firstCentury, centuryMatch[1]);
    const lastCentury = centuryMatch[4]
      ? centuryNumber(
          centuryMatch[4].replace(/^(\d{1,2})(?:st|nd|rd|th)$/i, "$1"),
        )
      : undefined;
    if (!lastCentury) return first;
    const last = centuryRange(lastCentury, centuryMatch[3]);
    return {
      start: Math.min(first.start, last.start),
      end: Math.max(first.end, last.end),
    };
  }

  const numericTokens = Array.from(
    value.matchAll(/\b(\d{3,4})(s)?(?:\/(\d{2,4}))?\b/g),
  );
  if (!numericTokens.length) return undefined;

  const ranges = numericTokens.map((match) => {
    const start = Number.parseInt(match[1], 10);
    let end = match[2] ? start + 99 : start;
    if (match[3]) {
      const abbreviated = Number.parseInt(match[3], 10);
      const magnitude = 10 ** match[3].length;
      end = Math.floor(start / magnitude) * magnitude + abbreviated;
      if (end < start) end += magnitude;
    }
    return { start, end };
  });
  let start = Math.min(...ranges.map((range) => range.start));
  let end = Math.max(...ranges.map((range) => range.end));

  if (/\bbefore\b/i.test(value)) start = Math.max(1, start - 40);
  if (/\bafter\b|\bonward\b/i.test(value)) end += 40;
  return { start, end: Math.max(start, end) };
}

export function witnessDateRange(
  witness: Pick<Witness, "date" | "dateStart" | "dateEnd">,
): EvidenceDateRange | undefined {
  if (witness.dateStart || witness.dateEnd) {
    const start = witness.dateStart ?? witness.dateEnd!;
    const end = witness.dateEnd ?? witness.dateStart!;
    return { start: Math.min(start, end), end: Math.max(start, end) };
  }
  return parseEvidenceDate(witness.date);
}

export function withStructuredDate<T extends Witness>(witness: T): T {
  if (witness.dateStart && witness.dateEnd) return witness;
  const range = witnessDateRange(witness);
  if (!range) return witness;
  return {
    ...witness,
    dateStart: witness.dateStart ?? range.start,
    dateEnd: witness.dateEnd ?? range.end,
  };
}

export function sortWitnessRows<T extends Witness>(rows: T[]): T[] {
  const unitOrder = new Map<string, number>();
  const indexed = rows.map((row, index) => {
    const dated = withStructuredDate(row);
    const unitKey =
      dated.unitId?.trim() || dated.unitLabel?.trim() || dated.unit?.trim() || "__general";
    if (!unitOrder.has(unitKey)) unitOrder.set(unitKey, unitOrder.size);
    return {
      row: dated,
      index,
      unitIndex: unitOrder.get(unitKey)!,
      range: witnessDateRange(dated),
      dateUncertain: Boolean(dated.dateUncertain),
    };
  });

  return indexed
    .sort(
      (a, b) =>
        a.unitIndex - b.unitIndex ||
        Number(a.dateUncertain) - Number(b.dateUncertain) ||
        (a.range?.start ?? Number.POSITIVE_INFINITY) -
          (b.range?.start ?? Number.POSITIVE_INFINITY) ||
        (a.range?.end ?? Number.POSITIVE_INFINITY) -
          (b.range?.end ?? Number.POSITIVE_INFINITY) ||
        a.index - b.index,
    )
    .map(({ row }) => row);
}
