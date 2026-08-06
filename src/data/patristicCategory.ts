import type { PatristicWitness } from "./types";

export type PatristicCategory = "supporting" | "competing" | "mixed";

export const patristicCategoryLabels: Record<PatristicCategory, string> = {
  supporting: "Supporting witness",
  competing: "Competing witness",
  mixed: "Mixed witness",
};

function normalized(value: string | undefined) {
  return (value ?? "")
    .normalize("NFKD")
    .toLocaleLowerCase("en")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function authorKey(witness: PatristicWitness) {
  const value = normalized(witness.author ?? witness.source);
  const aliases: Array<[RegExp, string]> = [
    [/^(?:john )?chrysostom\b/u, "chrysostom"],
    [/^clement of alexandria\b/u, "clement of alexandria"],
    [/^irenaeus\b/u, "irenaeus"],
    [/^origen\b/u, "origen"],
    [/^socrates(?: scholasticus)?\b/u, "socrates"],
    [/^cyprian\b/u, "cyprian"],
    [/^tertullian\b/u, "tertullian"],
    [/^severus of antioch\b/u, "severus of antioch"],
    [/^eusebius(?: of caesarea)?\b/u, "eusebius"],
    [/^gregory of nyssa\b/u, "gregory of nyssa"],
    [/^cyril of alexandria\b/u, "cyril of alexandria"],
    [/^basil(?: of caesarea)?\b/u, "basil"],
    [/^justin martyr\b/u, "justin martyr"],
  ];
  return aliases.find(([pattern]) => pattern.test(value))?.[1] ?? value;
}

function workKey(witness: PatristicWitness) {
  return normalized(
    [witness.workSection, witness.sourceCitation, witness.quoteSummary]
      .filter(Boolean)
      .join(" "),
  );
}

function directionKey(witness: PatristicWitness) {
  return (witness.reading ?? "").trim().toUpperCase();
}

function explicitCategoryOverride(
  passageSlug: string,
  witness: PatristicWitness,
): PatristicCategory | undefined {
  const author = authorKey(witness);
  const work = workKey(witness);

  if (passageSlug === "1-john-5-7" && author === "cyprian") {
    return "supporting";
  }
  if (passageSlug === "1-john-5-7" && author === "tertullian") {
    return "supporting";
  }

  if (passageSlug === "1-john-4-3" && author === "irenaeus") {
    return "competing";
  }
  if (passageSlug === "1-john-4-3" && author === "socrates") {
    return "competing";
  }

  if (passageSlug === "luke-11-2-4" && author === "gregory of nyssa") {
    return "competing";
  }
  if (passageSlug === "luke-11-2-4" && author === "tertullian") {
    return "competing";
  }

  if (passageSlug === "john-1-18") {
    if (author === "basil" || author === "cyril of alexandria") {
      return "competing";
    }
    if (
      author === "irenaeus" ||
      author === "clement of alexandria" ||
      author === "origen"
    ) {
      return "mixed";
    }
  }

  if (
    passageSlug === "matthew-19-16-17" &&
    author === "justin martyr"
  ) {
    return "supporting";
  }

  if (
    passageSlug === "ephesians-3-9" &&
    author === "chrysostom" &&
    (/opening running quotation|dispensation|textual comment|ephesians 3 9 exposition/u.test(
      work,
    ) ||
      directionKey(witness) === "MIXED")
  ) {
    return "mixed";
  }

  if (
    passageSlug === "mark-16-9-20" &&
    (author === "eusebius" || author === "severus of antioch")
  ) {
    return "mixed";
  }

  if (
    passageSlug === "luke-2-14" &&
    author === "origen" &&
    /additional luke 2 14 citations|both reading lines/u.test(work)
  ) {
    return "mixed";
  }

  if (
    passageSlug === "luke-22-43-44" &&
    authorKey(witness) === "jerome" &&
    /pelagians 2 16|manuscript report/u.test(work)
  ) {
    return "mixed";
  }

  return undefined;
}

export function patristicCategoryFor(
  passageSlug: string,
  witness: PatristicWitness,
): PatristicCategory {
  const override = explicitCategoryOverride(passageSlug, witness);
  if (override) return override;

  const direction = directionKey(witness);
  if (
    direction.includes("AGAINST_KJV") ||
    direction.startsWith("AGAINST") ||
    direction.includes("DISSOLVES") ||
    direction.includes("SEPARATES")
  ) {
    return "competing";
  }
  if (direction === "MIXED") return "mixed";

  return "supporting";
}

export function patristicDirectionForCategory(
  category: PatristicCategory,
): PatristicWitness["reading"] {
  if (category === "supporting") return "FOR_KJV";
  if (category === "competing") return "AGAINST_KJV";
  return "MIXED";
}

export function patristicEvidenceFormLabel(witness: PatristicWitness) {
  switch (witness.relationship) {
    case "explicit_quote":
      return "Direct quotation";
    case "close_quote":
      return "Close quotation";
    case "textual_comment":
      return "Textual comment";
    case "manuscript_report":
      return "Manuscript report";
    case "allusion":
      return "Allusion";
    case "parallel_tradition":
      return "Parallel tradition";
    case "indirect_report":
      return "Indirect report";
    case "derivative_use":
      return "Derivative use";
    case "mixed_citation":
      return "Evidence on both forms";
    case "theological_parallel":
      return "Literary or theological use";
    default:
      return "Patristic citation";
  }
}

const GENERIC_SUMMARY = /^(?:supporting witness|supports the kjv reading|competing witness|competing reading|mixed witness|related|uses (?:the )?(?:reading|verse|saying|passage)(?: pastorally)?|knows (?:the )?(?:reading|verse|saying|passage)|reflects (?:awareness of|material from) .+|includes material from .+|preserves related early testimony|patristic citation)$/iu;

function naturalPatristicSummary(
  category: PatristicCategory,
  witness: PatristicWitness,
) {
  const author = witness.author ?? witness.source;
  const work = witness.workSection?.trim();
  const evidenceForm = patristicEvidenceFormLabel(witness);
  const categoryLabel = patristicCategoryLabels[category];

  if (work === "Apparatus-level attribution") {
    return `The controlling apparatus reports ${author} for this reading, but the exact work and section are not identified in the current dossier.`;
  }
  if (work) {
    return `${evidenceForm} in ${work}.`;
  }
  return `${evidenceForm}; classified as a ${categoryLabel.toLowerCase()}.`;
}

export function normalizePatristicWitness(
  passageSlug: string,
  witness: PatristicWitness,
): PatristicWitness {
  const category = patristicCategoryFor(passageSlug, witness);
  const summary = witness.quoteSummary?.trim();
  const author = authorKey(witness);

  if (passageSlug === "1-john-5-7" && author === "cyprian") {
    return {
      ...witness,
      reading: "FOR_KJV",
      relationship: "explicit_quote",
      quoteSummary:
        "Cyprian introduces the Father, Son, and Holy Spirit wording with ‘it is written’ and concludes, ‘And these three are one.’ It is classified here as a supporting witness.",
    };
  }

  if (passageSlug === "1-john-5-7" && author === "tertullian") {
    return {
      ...witness,
      reading: "FOR_KJV",
      relationship: "close_quote",
      quoteSummary:
        "Tertullian joins the Father, Son, and Holy Spirit with the three-one wording in Against Praxeas 25. It is classified here as a supporting witness.",
    };
  }

  return {
    ...witness,
    reading: patristicDirectionForCategory(category),
    relationship:
      category === "mixed" ? "mixed_citation" : witness.relationship,
    quoteSummary:
      summary && !GENERIC_SUMMARY.test(summary)
        ? summary
        : naturalPatristicSummary(category, witness),
  };
}

function canonicalAuthor(value: string | undefined) {
  const key = normalized(value);
  if (/^(?:john )?chrysostom\b/u.test(key)) return "chrysostom";
  if (/^socrates(?: scholasticus)?\b/u.test(key)) return "socrates";
  if (/^polycarp(?: of smyrna)?\b/u.test(key)) return "polycarp";
  if (/^eusebius(?: of caesarea)?\b/u.test(key)) return "eusebius";
  if (/^didymus(?: the blind)?\b/u.test(key)) return "didymus";
  return key;
}

function richness(witness: PatristicWitness) {
  let score = 0;
  if (witness.workSection && witness.workSection !== "Apparatus-level attribution") {
    score += 8;
  }
  if (witness.sourceCitation) score += 4;
  if (witness.sourceUrl) score += 2;
  if (witness.quoteSummary && !GENERIC_SUMMARY.test(witness.quoteSummary)) {
    score += Math.min(6, Math.ceil(witness.quoteSummary.length / 80));
  }
  if (witness.confidence) score += 1;
  return score;
}

function normalizedWorkIdentity(witness: PatristicWitness) {
  const work = normalized(witness.workSection);
  const citation = normalized(witness.sourceCitation);
  if (work && work !== "apparatus level attribution") return work;
  const intf = citation.match(/\bintf(?: record)?\s+(\d+)\b/u)?.[1];
  if (intf) return `intf ${intf}`;
  return work || citation || "apparatus level attribution";
}

export function normalizePatristicWitnesses(
  passageSlug: string,
  witnesses: readonly PatristicWitness[],
) {
  const normalizedRows = witnesses.map((witness) =>
    normalizePatristicWitness(passageSlug, witness),
  );

  if (passageSlug === "1-corinthians-15-47") {
    const hasPreciseTertullianRows =
      normalizedRows.filter(
        (row) =>
          canonicalAuthor(row.author ?? row.source) === "tertullian" &&
          row.workSection &&
          row.workSection !== "Apparatus-level attribution",
      ).length >= 3;
    if (hasPreciseTertullianRows) {
      for (let index = normalizedRows.length - 1; index >= 0; index -= 1) {
        const row = normalizedRows[index];
        if (
          canonicalAuthor(row.author ?? row.source) === "tertullian" &&
          patristicCategoryFor(passageSlug, row) === "mixed" &&
          (/multiple|mixed|both forms/u.test(
            normalized(`${row.workSection ?? ""} ${row.quoteSummary}`),
          ) || Boolean(row.workSection?.includes(";")))
        ) {
          normalizedRows.splice(index, 1);
        }
      }
    }
  }

  if (passageSlug === "matthew-19-16-17") {
    const hasSeparateJustinRows = normalizedRows.some(
      (row) =>
        canonicalAuthor(row.author ?? row.source) === "justin martyr" &&
        /first apology|dialogue with trypho/u.test(normalized(row.workSection)),
    );
    if (hasSeparateJustinRows) {
      for (let index = normalizedRows.length - 1; index >= 0; index -= 1) {
        const row = normalizedRows[index];
        if (
          canonicalAuthor(row.author ?? row.source) === "justin martyr" &&
          /first apology.*and.*dialogue with trypho/u.test(
            normalized(row.workSection),
          )
        ) {
          normalizedRows.splice(index, 1);
        }
      }
    }
  }

  const byExactKey = new Map<string, PatristicWitness>();
  for (const row of normalizedRows) {
    const category = patristicCategoryFor(passageSlug, row);
    const key = [
      canonicalAuthor(row.author ?? row.source),
      category,
      normalizedWorkIdentity(row),
    ].join("|");
    const current = byExactKey.get(key);
    if (!current || richness(row) > richness(current)) {
      byExactKey.set(key, row);
    }
  }

  const deduped = Array.from(byExactKey.values());
  const grouped = new Map<string, PatristicWitness[]>();
  for (const row of deduped) {
    const category = patristicCategoryFor(passageSlug, row);
    const key = `${canonicalAuthor(row.author ?? row.source)}|${category}`;
    const list = grouped.get(key) ?? [];
    list.push(row);
    grouped.set(key, list);
  }

  return deduped.filter((row) => {
    if (row.workSection !== "Apparatus-level attribution") return true;
    const category = patristicCategoryFor(passageSlug, row);
    const peers =
      grouped.get(`${canonicalAuthor(row.author ?? row.source)}|${category}`) ?? [];
    const precise = peers.filter(
      (peer) =>
        peer !== row &&
        peer.workSection &&
        peer.workSection !== "Apparatus-level attribution",
    );
    return precise.length !== 1;
  });
}
