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
  const yearToCentury = value.match(
    new RegExp(
      `\\b(\\d{3,4})\\s*(?:-|to|through)\\s*(?:(early|mid(?:dle)?|late)\\s+)?(${centuryWords}|\\d{1,2}(?:st|nd|rd|th))(?:\\s+|-)(?:centur(?:y|ies)\\b|c\\.)`,
      "i",
    ),
  );
  if (yearToCentury) {
    const century = centuryNumber(
      yearToCentury[3].replace(/^(\d{1,2})(?:st|nd|rd|th)$/i, "$1"),
    );
    if (century) {
      const start = Number.parseInt(yearToCentury[1], 10);
      const last = centuryRange(century, yearToCentury[2]);
      return {
        start: Math.min(start, last.start),
        end: Math.max(start, last.end),
      };
    }
  }
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

  const adShortRange = value.match(
    /\bad\s*(\d{1,4})\s*(?:-|to|through)\s*(?:ad\s*)?(\d{1,4})\b/i,
  );
  if (adShortRange) {
    const start = Number.parseInt(adShortRange[1], 10);
    let end = Number.parseInt(adShortRange[2], 10);
    if (adShortRange[2].length < adShortRange[1].length) {
      const magnitude = 10 ** adShortRange[2].length;
      end = Math.floor(start / magnitude) * magnitude + end;
      if (end < start) end += magnitude;
    }
    return { start: Math.min(start, end), end: Math.max(start, end) };
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

/**
 * Renders numeric bounds as the public year-range label, e.g. "AD 325–360"
 * or "AD 1611" when the bounds coincide.
 */
export function formatEvidenceYears(
  range: EvidenceDateRange | undefined,
): string | undefined {
  if (!range) return undefined;
  if (range.start === range.end) return `AD ${range.start}`;
  return `AD ${range.start}–${range.end}`;
}

const openAfterPattern = /\bafter\s*(?:ad\s*)?(\d{3,4})\b/i;
const openOnwardPattern = /\b(?:ad\s*)?(\d{3,4})\s*(?:onward\b|and later\b)/i;
const openBeforePattern = /\bbefore\s*(?:ad\s*)?(\d{3,4})\b/i;
const approximatePattern = /\b(?:c\.|ca\.|circa|about|around)\s/i;

/**
 * Open-ended labels ("addition after AD 1522", "AD 1516 onward",
 * "before AD 150") must not display an invented closing year — the numeric
 * bounds those rows carry exist only so sorting has something to order by.
 * Returns the honest simplified label, or undefined when the label is not
 * open-ended.
 */
export function openEndedDateLabel(label: string): string | undefined {
  const value = label.normalize("NFKC").replace(/[‐‑‒–—−]/g, "-");
  const after = value.match(openAfterPattern);
  if (after) return `after AD ${after[1]}`;
  const onward = value.match(openOnwardPattern);
  if (onward) return `AD ${onward[1]} onward`;
  const before = value.match(openBeforePattern);
  if (before) {
    const bound = Number.parseInt(before[1], 10);
    const base = parseEvidenceDate(value.replace(openBeforePattern, ""));
    if (base && base.start < bound) {
      return formatEvidenceYears({
        start: base.start,
        end: Math.min(base.end, bound),
      });
    }
    return `before AD ${before[1]}`;
  }
  return undefined;
}

/**
 * The uniform public date label: honest open-ended wording when the label is
 * open-ended, otherwise the year range from the given bounds ("c." preserved
 * for approximate single years), otherwise the original label unchanged.
 */
export function formatWitnessDate(
  label: string,
  range: EvidenceDateRange | undefined,
): string {
  const open = openEndedDateLabel(label);
  if (open) return open;
  if (!range) return label.trim();
  if (range.start === range.end && approximatePattern.test(label)) {
    return `c. AD ${range.start}`;
  }
  return formatEvidenceYears(range)!;
}

/**
 * The uniform public date label for a witness: its structured bounds when
 * available, otherwise bounds parsed from the catalogue label, otherwise the
 * original label unchanged.
 */
export function evidenceYearLabel(
  witness: Pick<Witness, "date" | "dateStart" | "dateEnd">,
): string {
  return formatWitnessDate(witness.date, witnessDateRange(witness));
}

/**
 * Formats a free-text date label ("late fourth century") as a year range
 * when it can be parsed, otherwise returns the label unchanged.
 */
export function formatDateLabel(label: string): string {
  return formatWitnessDate(label, parseEvidenceDate(label));
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
