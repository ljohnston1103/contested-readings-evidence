# Code fixes — exact edits

Five code changes, each self-contained. Ordered by impact per minute of work.
Every one is a bug I confirmed in your tree at HEAD `41320c2`.

---

## Fix 1 — The sources card claims to cite evidence but cites dates

**File:** `src/lib/evidenceSources.ts`
**Severity:** makes a false statement on all 51 pages

`collectWitnessSources` reads `dateSource` only. The card it feeds is headed *"Where the evidence on this page comes from — every witness, date, and note below draws on these works."*

### Current

```ts
export function collectWitnessSources(
  map: Map<string, SourceEntry>,
  rows: Witness[],
) {
  for (const row of rows) {
    addSource(map, row.dateSource, row.dateSourceUrl);
  }
}
```

### Replace with

```ts
export function collectWitnessSources(
  map: Map<string, SourceEntry>,
  rows: Witness[],
) {
  for (const row of rows) {
    addSource(map, row.source, row.sourceUrl);
  }
}

/**
 * Dating provenance is a separate question from reading provenance. The two
 * were previously merged, which is why Mark 9:29 credited Palmer's Revelation
 * apparatus: that work supplied the Vulgate's date range, nothing more.
 */
export function collectWitnessDateSources(
  map: Map<string, SourceEntry>,
  rows: Witness[],
) {
  for (const row of rows) {
    addSource(map, row.dateSource, row.dateSourceUrl);
  }
}
```

**Then in `src/components/PassageSourcesCard.tsx`,** render two groups — "Evidence sources" from `collectWitnessSources`, and "Dating sources" from `collectWitnessDateSources`.

⚠️ **Expect the evidence group to be empty on 30 passages.** Those rows have no `source` (see `wave1SourceAssignments.ts`). That is the true state; showing it is better than showing dating sources under an evidence heading.

---

## Fix 2 — The label filter is deleting Hoskier

**File:** `src/lib/evidenceSources.ts`
**Severity:** the most important Revelation source never displays

The filter matches on the *end* of the label, so any citation ending in "note", "record", "study" or "preprint" is silently dropped.

### Current

```ts
const prohibitedEndings = [
  " study",
  " note",
  " preprint",
  " record",
  " archive record",
];

function isProhibitedLabel(label: string) {
  const lower = label.toLowerCase();
  return (
    prohibitedLabels.has(lower) ||
    prohibitedEndings.some((ending) => lower.endsWith(ending))
  );
}
```

### Replace with

```ts
/**
 * Labels that are pure link-text and carry no bibliographic content. Matched
 * whole, not by suffix: a suffix match was silently deleting real citations
 * such as "Hoskier archive record" and "NA28/UBS5 apparatus; NET note".
 */
const prohibitedLabels = new Set([
  "here",
  "online",
  "pdf",
  "parallel greek editions",
  "internet archive record",
  "vu publication record",
]);

function isProhibitedLabel(label: string) {
  return prohibitedLabels.has(label.toLowerCase().trim());
}
```

### Then rename these labels in the data

| Current label | Where | Rename to |
|---|---|---|
| `Hoskier archive record` | revelation-1-11, revelation-16-5, revelation-22-19 | `Hoskier, Concerning the Text of the Apocalypse (1929)` |
| `NET note` | mark-10-24, john-3-13 | `NET Bible textual notes` |
| `NET/Acts 20:28 note` | acts-20-28 | `NET Bible textual note on Acts 20:28` |
| `NA28/UBS5 apparatus; NET note` | acts-20-28 | `NA28 / UBS5 apparatus; NET Bible textual notes` |
| `NA28/UBS5 apparatus; concise list also in the NET note` | acts-20-28 | `NA28 / UBS5 apparatus` |
| `Houghton preprint` | 1-john-4-3 | `Houghton, The Text of the Gospel and Letters of John` |
| `P46 study` | 1-corinthians-15-47 | `Published study of P46` — or the actual article |
| `Jerome study` | matthew-5-22 | the actual article title |

---

## Fix 3 — Latin tab renders empty while the page holds Latin evidence

**File:** wherever the tab panels select rows (`src/components/EvidenceTabs.tsx` / `EvidenceTable.tsx`)
**Severity:** 7 passages, including 1 Timothy 3:16

The Latin tab reads `passage.latinWitnesses`. Latin rows that oppose the KJV reading are stored in `evidenceAgainst`, so they never reach the Latin tab. 1 Timothy 3:16 advertises "D plus Latin/Vulgate support for 'which'" on its index card and shows an empty Latin tab.

### Select by `kind`, not by array

```ts
const ALL_ROWS = (p: Passage): Witness[] => [
  ...p.greekSupportWitnesses,
  ...p.latinWitnesses,
  ...p.versionalWitnesses,
  ...p.evidenceAgainst,
  ...(p.printedWitnesses ?? []),
];

const latinRows   = ALL_ROWS(passage).filter((r) => r.kind === "latin");
const syriacRows  = ALL_ROWS(passage).filter((r) => r.kind === "syriac");
const copticRows  = ALL_ROWS(passage).filter((r) => r.kind === "coptic");
const greekRows   = ALL_ROWS(passage).filter((r) => r.kind === "greek-manuscript");
```

Then show each row's `direction` (supports / opposes) as a badge inside the tab, so a Latin witness against the reading is visible *as* a Latin witness.

**Affected:** matthew-19-16-17, luke-2-14, 1-corinthians-15-47, ephesians-3-9, 1-timothy-3-16, 1-john-4-3, revelation-1-11.

---

## Fix 4 — Three different totals for one database

**Files:** `src/app/page.tsx` (atlas), `src/components/timeline/TransmissionTimelineExplorer.tsx`

| Shown | Figure |
|---|---|
| Homepage atlas | 1,579 |
| Timeline | 1,672 |
| Actual | **2,078** (1,957 witness + 121 patristic) |

### Add one shared counter in `src/data/derived.ts`

```ts
export function countEvidenceRows(passages: readonly Passage[]) {
  let witness = 0;
  let patristic = 0;
  for (const p of passages) {
    witness +=
      p.greekSupportWitnesses.length +
      p.latinWitnesses.length +
      p.versionalWitnesses.length +
      p.evidenceAgainst.length +
      (p.printedWitnesses?.length ?? 0);
    patristic += p.patristicWitnesses.length;
  }
  return { witness, patristic, total: witness + patristic };
}

export const evidenceRowCounts = countEvidenceRows(allPassages);
```

Use `evidenceRowCounts.total` in both places. If the timeline genuinely counts only dated rows, label it *"1,672 rows carrying a resolved date, of 2,078 total"* — the qualifier is what's missing, not the number.

---

## Fix 5 — Redeploy: the live index shows 30 of 51

**No code change needed.**

`src/data/derived.ts` line 22 is `export const displayedPassages = allPassages;`, and `PassageBrowser` applies no default filter. Current source renders all 51. The live site is serving a build from before wave 2 was merged into `displayedPassages` — which is why 1 Corinthians, Ephesians and Revelation are missing from the book filter, while the homepage and timeline (different code paths) correctly say 51.

Redeploy from HEAD.

While you're there: `robots.txt` is empty and `sitemap.xml` serves nothing readable. `src/app/sitemap.ts` is modified in your working tree but the deployed output isn't valid XML.

---

## Fix 6 — Show the variant unit on multi-unit passages

**Severity:** cosmetic, but it makes three pages look self-contradictory

matthew-19-16-17, ephesians-3-9 and revelation-1-8 legitimately list some witnesses as both supporting and opposing, because each passage has two disputed units and a witness can go one way on each. **The data is correct.** But if the tabs group by for/against without showing which unit is in view, a reader sees Codex Sinaiticus in both columns and concludes the page is broken.

Render `row.unitLabel` as a heading or badge on every row in any passage where `new Set(rows.map(r => r.unitId)).size > 1`.
