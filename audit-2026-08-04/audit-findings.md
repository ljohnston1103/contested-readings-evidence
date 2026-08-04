# Oldest & Best — Evidence Audit, Final

**Date:** 4 August 2026
**Basis:** the site's source tree, branch `evidence-audit-rebuild`, HEAD `41320c2`
**Dataset:** all 51 passages, **2,078 evidence rows** (1,957 witness rows + 121 patristic rows), extracted by compiling `src/data/derived.ts` and dumping `allPassages`

This supersedes my two earlier passes. Where they differ, this document is right — including on one point where I got it wrong myself (§0).

**Files that accompany this document:**

| File | What it is |
|---|---|
| `auditCorrections.ts` | Paste-ready. Verified factual corrections, missing witnesses, patristic citations, cautions. Wiring instructions at the bottom of the file. |
| `wave1SourceAssignments.ts` | Paste-ready. Controlling apparatus for each of the 30 unsourced passages, with ECM coverage noted per book. |

Confidence labels:

| Label | Meaning |
|---|---|
| **VERIFIED** | Computed from your data, or confirmed against a source I opened and read. |
| **DISCREPANCY** | Your figure conflicts with a published figure. Both given. |
| **CORRECT** | I checked it and it holds. Recorded so you don't re-audit it. |
| **UNRESOLVED** | Could not be settled from sources I can reach. Flagged, not guessed. |

---

## 0. A correction to my own Pass 2

In Pass 2 I reported that **patristic rows are sourced 121/121**. That was wrong, and I want to flag it before anything else.

`PatristicWitness.source` is the **author-name field**, not a citation. I tested for its presence and read a populated field as a citation. The real citation fields are `sourceCitation`, `sourceUrl` and `workSection`.

Corrected figures:

| | Cited | Total | Share |
|---|---|---|---|
| Patristic rows with a real citation | 31 | 121 | **26%** |
| Witness rows with a source for the reading | 852 | 1,957 | **44%** |
| **All evidence rows** | **883** | **2,078** | **42%** |

So the patristic evidence is in *worse* shape than the manuscript evidence, not better. **90 of 121 patristic rows name no work at all** — just "Chrysostom | c. AD 400 | Uses the reading." For a database whose organising question is how old a reading is, an uncitable father is close to unusable.

Worst affected: john-1-18 (13 rows, 0 cited), 1-john-5-7 (12, 0), matthew-17-21 (11, 0), luke-23-34 (9, 0), mark-16-9-20 (8, 0), john-7-53-8-11 (7, 0).

---

## 1. The structural finding

### 1.1 Thirty of 51 passages have zero sourced evidence rows — VERIFIED

Witness rows carry two distinct source fields: `dateSource` (where the manuscript's *date* came from) and `source` (where the *reading attribution* came from).

The split is exactly wave 1 versus wave 2:

- **21 wave-2 passages — 100% sourced.** Every row has `source`, `sourceUrl`, `confidence`, `lastVerified`. This work is good and I found nothing wrong with it on the points I sampled.
- **30 wave-1 passages — 0% sourced.** Literally zero of 1,104 rows.

> matthew-6-13, matthew-17-21, matthew-18-11, matthew-23-14, mark-7-16, **mark-9-29**, mark-9-44-46, mark-11-26, mark-15-28, **mark-16-9-20**, luke-9-55-56, luke-11-2-4, luke-22-43-44, luke-23-17, luke-23-34, luke-24-40, luke-24-51, luke-24-52, **john-1-18**, john-5-3b-4, john-6-47, **john-7-53-8-11**, **acts-8-37**, acts-9-5-6, acts-28-29, romans-8-1, romans-16-24, colossians-1-14, **1-timothy-3-16**, **1-john-5-7**

Every headline passage is in that list. `wave1SourceAssignments.ts` gives the controlling apparatus for each.

### 1.2 The "Evidence sources" card cites date provenance, not evidence provenance — VERIFIED

`PassageSourcesCard.tsx` calls `collectWitnessSources`, which in `lib/evidenceSources.ts` reads:

```ts
addSource(map, row.dateSource, row.dateSourceUrl);
```

It reads `dateSource`. It never reads `source`. So the card headed **"Where the evidence on this page comes from — every witness, date, and note below draws on these works"** is listing works consulted for *dates*.

That is why Mark 9:29 credits Palmer's *Revelation* apparatus and Willker's *Matthew* commentary: those supplied the Vulgate and Syriac date ranges. As printed, the sentence is false on all 51 pages.

**Fix — pick one:**
1. Reword the card to say it lists dating sources; add a second card for reading sources; **or**
2. Make `collectWitnessSources` also read `row.source`.

Option 2 renders the card empty on all 30 wave-1 passages until they're sourced. That is the honest state and arguably what should show.

---

## 2. Structural defects

### 2.1 Three different totals for the same database — VERIFIED

| Location | Figure |
|---|---|
| Homepage atlas | "1,579 Catalogued witness records" |
| Timeline page | "1672 Dated witness entries" |
| Actual data | **2,078** rows |

None matches. Derive all three from one function over `allPassages` and label what each excludes.

### 2.2 The live index shows 30 of 51 — stale deployment, not a data bug — VERIFIED

`derived.ts` line 22 is `export const displayedPassages = allPassages;` — all 51 — and `PassageBrowser` applies no default filter. **Current source would render all 51.** The live site is running a build from before wave 2 was merged. Redeploy from HEAD; nothing in the data needs changing.

Also worth fixing: `robots.txt` is empty and `sitemap.xml` serves nothing readable.

### 2.3 Seven passages render an empty Latin tab while holding Latin evidence — VERIFIED

`latinWitnesses` is empty; Latin rows sit in `evidenceAgainst`:

| Passage | Latin rows filed elsewhere |
|---|---|
| matthew-19-16-17 | 2 |
| luke-2-14 | 1 |
| 1-corinthians-15-47 | 2 |
| ephesians-3-9 | 1 |
| **1-timothy-3-16** | 2 |
| 1-john-4-3 | 3 |
| revelation-1-11 | 1 |

1 Timothy 3:16 is the clearest failure: the index card advertises "D plus Latin/Vulgate support for 'which'" and the Latin tab is empty.

**Fix:** select tabs by `kind`, not by which array the row happens to occupy. A Latin witness that opposes the KJV reading is still a Latin witness.

### 2.4 Eighteen passages have no patristic evidence at all — VERIFIED

> mark-9-29, mark-9-44-46, luke-2-14, luke-2-33, luke-4-4, luke-9-55-56, luke-23-17, luke-24-6, luke-24-40, luke-24-51, luke-24-52, john-6-47, acts-28-29, romans-8-1, romans-16-24, colossians-1-14, revelation-1-8, revelation-1-11

Plus **1 Timothy 3:16**, which has one row reading "Later ecclesiastical use | AD 800–1500" — a placeholder, not a father. On your second most important doctrinal passage, there is effectively no patristic evidence.

`auditCorrections.ts` supplies Basil and Clement for Mark 9:29 with full citations.

### 2.5 499 rows are aggregates standing for an unstated number of manuscripts — VERIFIED

499 of 1,957 rows carry `aggregate: true` — 26% of the evidence. "Most Old Latin witnesses," "Byzantine Majority," "Coptic traditions including the phrase," "1,500+ Greek manuscripts."

Densest: matthew-17-21 (16), revelation-1-8 (16), matthew-19-16-17 (14), john-5-3b-4 (14), matthew-6-13 (13), mark-1-2 (13), mark-9-29 (12), mark-15-28 (12).

### 2.6 Wave-1 "against" snapshots don't match what the page actually lists — VERIFIED

Wave-2 snapshots name witnesses ("ℵ, B, Zvid, 071vid, f1, 33, 788, 1192…"). Wave-1 snapshots use vague ceilings that are typically 3–5× the number of witnesses actually named:

| Passage | Snapshot says | Greek witnesses actually named |
|---|---|---|
| matthew-18-11 | "Fewer than 30 principal Greek witnesses" | 6 |
| matthew-23-14 | "Fewer than 30" | 8 |
| mark-7-16 | "Fewer than 20" | 6 |
| mark-9-44-46 | "Fewer than 30" | 10 |
| mark-15-28 | "Fewer than 30" | 7 |
| luke-22-43-44 | "Fewer than 25" | 7 |
| luke-23-17 | "Fewer than 20" | 10 |
| luke-24-40 | "Fewer than 10" | 1 |
| luke-24-51 | "Fewer than 10" | 2 |
| luke-24-52 | "Fewer than 10" | 2 |
| john-5-3b-4 | "Fewer than 15" | 9 |
| john-6-47 | "Fewer than 15" | 10 |

These are technically true and practically uninformative — and they imply a census that doesn't exist. **Fix:** name the witnesses, as wave 2 does.

### 2.7 The source-label filter is silently deleting real citations — VERIFIED

`lib/evidenceSources.ts` suppresses labels that are vague link text:

```ts
const prohibitedLabels = new Set(["here", "online", "pdf", "parallel greek editions"]);
const prohibitedEndings = [" study", " note", " preprint", " record", " archive record"];
```

The intent is right, but it matches on the **end of the string**, so it is killing substantive citations that merely happen to end with one of those words:

| Suppressed label | Passages | What is actually being lost |
|---|---|---|
| `Hoskier archive record` | revelation-1-11, revelation-16-5, revelation-22-19 | **Hoskier's collation — the single most important source for Revelation.** Never displays. |
| `NA28/UBS5 apparatus; NET note` | acts-20-28 | A real apparatus citation |
| `NA28/UBS5 apparatus; concise list also in the NET note` | acts-20-28 | A real apparatus citation |
| `Houghton preprint` | 1-john-4-3 | H. A. G. Houghton, the leading Latin NT scholar |
| `P46 study` | 1-corinthians-15-47 | A manuscript study |
| `Jerome study` | matthew-5-22 | A patristic study |
| `NET note` | mark-10-24, john-3-13 | The NET textual notes |
| `parallel Greek editions` | 8 passages | Edition comparison |
| `Internet Archive record`, `VU publication record`, `here` | 3 passages | Genuinely vague — filter working correctly |

So on your four Revelation pages, the "Evidence sources" card omits Hoskier entirely, while your `references` section cites him. A reader comparing the two will think the page is inconsistent.

**Fix — two parts:**
1. Rename the labels to proper citations: `Hoskier archive record` → `Hoskier, Concerning the Text of the Apocalypse (1929)`; `NET note` → `NET Bible textual notes`; `Houghton preprint` → `Houghton, The Text of the Gospel and Letters of John`.
2. Change the filter to match the **whole label**, not the ending — otherwise any future citation ending in "note" or "record" disappears without warning.

### 2.8 Manuscript dates are internally consistent — CORRECT

All 178 distinct GA-numbered witnesses checked for conflicting date ranges across passages: **zero genuine conflicts.** `dateStart`/`dateEnd`/`dateUncertain` on all 1,957 rows, `dateSource` on 1,542. This is a real strength.

(My Pass 1 "six conflicts" was my own regex conflating GA 02 with GA 2, GA 033 with GA 33, and so on. The data was clean; my check wasn't.)

### 2.9 Witnesses appearing on both sides are legitimate — CORRECT

matthew-19-16-17, ephesians-3-9 and revelation-1-8 each list some witnesses as both supporting and opposing. I checked: these are genuine **multi-unit** variants, and the witness supports one unit while opposing another. The data is right.

**Presentation risk:** if the tabs group by for/against without showing the unit prominently, a reader sees the same manuscript in both columns and concludes the page contradicts itself. Surface `unitLabel` in the row.

---

## 3. Verified content errors

Each of these is implemented in `auditCorrections.ts`.

### 3.1 Matthew 17:21 — "Codex Q" should be Codex Koridethi (Θ) — DISCREPANCY

The page lists ten Greek witnesses omitting the verse: B, ℵ, **Q**, 0281, 33, 892*, 788, 1604, 2680, 579.

Willker's list of Greek manuscripts omitting Mt 17:21 is **Θ 0281 788 33 579 892* 1604 2680**, plus B and ℵ. Your list matches that exactly *except* that Θ appears as "Q" — and carries Q's fifth–sixth-century date instead of Θ's ninth century.

This is a theta/Q transcription slip. **Θ (Koridethi, GA 038, 9th c.) is the omitting witness; Q (GA 026) is not in the list.** Your own Matthew 18:11 and Matthew 23:14 pages list Θ correctly, which makes this an isolated slip rather than a systematic misunderstanding.

### 3.2 Matthew 17:21 — the two Middle Egyptian witnesses are reversed — DISCREPANCY

Page: "Middle Egyptian Codex Schoyen | c. AD 350 | **Contains** the verse."

Snapp, following the published editions: *"mae-1 (Codex Scheide, from the 400's) includes Mt. 17:21, although mae-2 (Schøyen MS 2650, assigned to the early 300's) does not include it."*

The attribution is backwards. **Scheide (mae-1, 5th c.) includes it; Schøyen (mae-2, early 4th c.) omits it.** As printed, the page claims support from the one witness that omits — and it is the earlier of the two, so this affects the dating argument as well.

### 3.3 Matthew 17:21 — Pseudo-Clement is a century too early — DISCREPANCY

Page: "Pseudo-Clement, Letters on Virginity | **c. AD 100 to 200**," and this drives the page's headline: *"Earliest: c. AD 100–200 — Pseudo-Clement."*

The *Epistles on Virginity* are assigned by scholarship to the **middle of the third century** — objections to syneisaktism first appear in extant Christian literature toward the middle of the 3rd century, and Uhlhorn places the letters shortly before Cyprian. **c. AD 250**, not AD 100–200.

This changes the page's earliest-evidence claim by roughly a century, in the direction that weakens it. It should be corrected regardless.

### 3.4 Mark 9:29 — three problems — DISCREPANCY

1. **"Earliest surviving Greek support: Third century — P45vid."** ECM Mark (2021) treats **P45 as lacunose** here. The page's headline claim asserts third-century Greek support that the current critical edition says does not exist.
2. **"2 principal Greek witnesses" against.** It is **three**. Snapp: all Greek copies include καὶ νηστείᾳ *"except for B, Aleph, and 274"* — i.e. GA 0274, a damaged Egyptian manuscript of the 400s. Your own Mark 7:16 page lists 0274 correctly, so the data model knows it exists.
3. **No fathers.** Basil (*First Homily on Fasting* 9, PG 31:181, c. AD 370) supports; Clement of Alexandria (*Eclogae Propheticae* 15.1, c. AD 200) has the shorter form and is the earliest witness of any kind to this variant in either direction.

Two traps guarded against in the corrections file: **GA 2427** is a modern forgery (post-1874, pigment analysis) that appears in older apparatuses for the shorter reading; **GA 706** was miscoded in ECM's first release and actually reads "and fasting."

### 3.5 Matthew 6:13 — the Didache is double-counted — VERIFIED

"Didache 8" appears in `versionalWitnesses` **and** in `patristicWitnesses`. It is a Greek church-order text, not an ancient version, so the versional row is both a duplicate and a miscategorisation. "Eastern liturgical tradition" in the same array has the same problem.

Also worth stating on the page: the Didache's doxology is **shorter than the KJV form** — power and glory, without "the kingdom." It is evidence for an early doxological ending, not for the complete Matthean wording. The page's own earliest-support note gets this right; the versional row does not.

### 3.6 Mark 16:9–20 — count right, attribution wrong, two categories missing — DISCREPANCY

"1,653 Greek manuscripts / 3 against / 99.8%" is correct, and the three are ℵ (01), B (03), GA 304.

But 1,653 is **James Snapp Jr.'s** count. It is not in NTVMR, ECM, NA28, UBS or THGNT — the works your generic `sources` array names. Cite Snapp.

Missing: roughly **8 Greek manuscripts** carrying the *Shorter Ending*, and about **23** that include 16:9–20 with asterisks, obeli or marginal notes recording doubt. About 31 relevant Greek witnesses currently sit in neither column on your most prominent page.

Two patristic cautions: **Jerome**'s statement that the passage is absent from almost all Greek copies (*Ep.* 120.3) is largely a translation of **Eusebius**, *Ad Marinum* — they are not independent witnesses, and your page lists both. **Justin Martyr**'s supposed use (*First Apology* 45) is a disputed allusion, not a quotation.

### 3.7 1 John 5:7 — the Greek list is exactly right — CORRECT

All ten rows checked against Hixson's manuscript-by-manuscript study with images:

| # | Site | Hixson | |
|---|---|---|---|
| 1 | GA 629, AD 1362–1363 | 629 (1362–1363), earliest Greek MS of the CJ | ✓ |
| 2 | GA 61 Montfortianus, 16th c. | 61 Montfortianus | ✓ |
| 3 | GA 429mg, 14th-c. MS, addition after 1522 | 429marg, after 1522 | ✓ |
| 4 | GA 918, c. 1573–1578 | 918, probably 1573–1578 | ✓ |
| 5 | GA 2473, AD 1634 | 2473 (1634) | ✓ |
| 6 | GA 2318, 18th c. | 2318 (1700s) | ✓ |
| 7 | GA 177mg, 11th-c. MS, addition c. 1785 | 177marg (c. 1785) | ✓ |
| 8 | GA 221mg, 10th-c. MS, addition after 1854 | 221marg (after c. 1850?) | ✓ |
| 9 | GA 88mg, 12th c. base | 88marg | ✓ |
| 10 | GA 636mg, 15th-c. MS, later addition | 636marg | ✓ |

Ten for ten, dates included. **Do not change this data.** Three additions, all in the corrections file:

1. **Cite Hixson.** All ten rows are unsourced and this is the source.
2. **Add the GA 635 caution.** Hixson examined it: *"GA 635 is sometimes cited as having the CJ in the margin, but it does not."* Older literature repeats the eleventh-witness claim.
3. **Replace "500+ Greek manuscripts."** The precise denominator is published: *Text und Textwert* collated **552** Greek continuous-text manuscripts of the Catholic Letters, **522** with complete or substantial text. "500+" understates your own case and reads like a guess.

### 3.8 John 7:53–8:11 — possible 19-manuscript error — UNRESOLVED

| | Robinson (per secondary reports) | Site |
|---|---|---|
| Continuous-text MSS containing | **1,476** | 1,495 |
| Continuous-text MSS omitting | 267 | not stated |
| Lectionaries containing 8:3–11 | **495** | 495 ✓ |
| Lectionaries not containing | 2,285 | not stated |

Your lectionary figure matches Robinson exactly, which suggests he is the source and the continuous-text figure has drifted. **I could not open Robinson's article** — *Filología Neotestamentaria* 13 (2000): 35–59 is not freely available — so this stays flagged rather than corrected. Of everything in this document, this is the number I would most want checked at source.

Also missing: the 267 omitting manuscripts, and the manuscripts carrying the passage at a different location (after John 21:25, after Luke 21:38, after John 7:36).

---

## 3A. Wave 2 spot-check — CORRECT

I sampled the 21 sourced passages, concentrating on Revelation because those pages make the most unusual claims. They hold up well, and the Revelation pages in particular are the best work on the site.

**Revelation 16:5** states plainly *"No Greek manuscripts"* support the KJV reading, lists the four forms the Greek tradition actually divides among (ὁ ὅσιος, ὅσιος, καὶ ὅσιος, καὶ ὁ ὅσιος), and carries four cautions including the important one that **Beza referred to an old manuscript but no presently identifiable Greek witness can be connected to that report**. That is exactly right and exactly the kind of thing a partisan site usually fudges.

**Revelation 22:19** is equally careful: it distinguishes *ligno* from *libro* as different Latin words rather than a one-letter variation, notes that GA 61 and the corrected 2067 read βιβλίου rather than the exact TR βίβλου, and flags that **GA 2814 is lacunose here and is evidence for neither reading**.

Sourcing on these pages points to Palmer's *Revelation* apparatus — which is the correct volume for Revelation, unlike the Mark 9:29 case (§1.2) where the same work was cited for the wrong book.

The one thing wrong with these pages is §2.7: Hoskier, their most important underlying source, is filtered out of the display.

## 4. Passages needing substantive work

Not errors I can correct from free sources, but gaps large enough to name.

**1 Timothy 3:16** is the weakest page on the site relative to its importance. No Latin tab (§2.3), no real patristic evidence (§2.4), and the page omits the single most interesting thing about the variant: the long-running dispute over whether **Codex Alexandrinus** originally read ΟΣ or ΘΣ, which occupied Berriman, Tregelles and others for two centuries. The page lists A as reading "who" without noting the controversy.

**John 1:18** carries very specific figures — "about 1,610 Greek manuscripts for 'only begotten Son'; 17 with minor Son variations; 7 with God readings" — with no source. The seven with θεός are recoverable (P66, P75, ℵ*, B, C*, L, 33), and the page's handling of Irenaeus and Origen having *both* readings is a genuinely good piece of nuance. But 1,610 and 17 need a citation or they should go.

**Acts 8:37**'s "about 10 to 12 principal Greek witnesses" probably understates. The verse appears in a good number of minuscules (E, 36, 88mg, 97mg, 103, 104, 242, 257, 307, 322, 323, 385, 429, 453, 464, 467, 522, 630, 913, 945, 1522, 1739mg, 1765, 1877, 2147, 2298, 2818 and others in the standard lists). ECM Acts (2017) covers this book fully and is the right source.

**Luke 22:43–44** should add **Hilary**, *De Trinitate* 10.41, who states the verses are absent from many Greek and Latin copies — that is exactly the kind of early explicit testimony the site exists to surface. Epiphanius (*Ancoratus* 31.4–5) is already listed and is citable.

**Luke 23:34** has nine fathers, none cited, and no Latin or versional rows at all (`latinWitnesses` and `versionalWitnesses` are both empty) — unusual for a variant with this much versional evidence.

**Colossians 1:14** is the thinnest page on the site: **10 evidence rows in total.** Two concrete problems, both fixed in the corrections file:

- The Greek support is given as "614, 630, and some Majority witnesses." **GA 2495 belongs in that group** and is missing.
- The page never mentions the standard argument against the reading — that "through his blood" is a harmonisation to the identical, textually secure phrase at **Ephesians 1:7**. A page defending the reading should answer the main objection to it, not omit it.

**Luke 24:40, 24:51, 24:52** are accurate — P75, ℵ, B, A support inclusion and the omissions really are confined to D, a little Old Latin, and Sinaitic/Curetonian Syriac. The only problem is §2.6: "fewer than 10 principal witnesses" when the page names one Greek manuscript (24:40) or two (24:51, 24:52). Say "Codex Bezae, supported by part of the Old Latin and the Sinaitic Syriac" — it is both more accurate and more persuasive.

**Luke 9:55–56 and Acts 9:5–6** deserve credit: both state plainly that the KJV reading has minority or no Greek support, rather than dressing it up. Acts 9:5–6 says outright *"No known Greek manuscript supports the full KJV/TR wording at this location."* That is the right instinct throughout.

**John 5:3b–4** should note, as Mark 16:9–20 should (§3.6), that a significant number of manuscripts including the passage mark it with asterisks or obeli. Same category of evidence, same omission.

---

## 5. On the counting standard you set

You asked for figures shaped like *"approx. 5,500 of 9,000 Latin witnesses from 100 AD to 900 AD."* No figure of that shape can be produced honestly, for any verse — not because the research is hard, but because the quantities don't exist. Publishing in that format would put fabrications on the site.

**Latin.** Roughly **80–90** Old Latin manuscripts survive for the whole New Testament. Most are fragmentary; a given verse is typically attested in 3–15, few enough to name individually — which your `latinRepresentativeWitnesses*.ts` files already do well for 34 passages. The Vulgate survives in perhaps **10,000** manuscripts, overwhelmingly 9th century and later, with no verse-by-verse collation of all of them ever published. Wordsworth–White and the Stuttgart Vulgate collate a selected 20–40 of the oldest; those are the citable ones. **Nothing Latin survives from AD 100** — the Latin versions begin late in the second century at the earliest and the oldest Latin manuscripts are fourth century.

**Greek.** Exact "X of Y" counts exist only where every known manuscript has been collated at that point: *Text und Textwert* (at its selected test passages only) or ECM (Catholic Letters, Acts, Mark, John in progress). **There is no ECM for Matthew, Luke, Romans, Colossians or 1 Timothy** — 17 of your 51 passages.

**Fathers.** A father counts only where a citation preserving the disputed wording survives, checked in a critical edition. Silence is not evidence. Two traps: parallel passages (Matthew 17:21 / Mark 9:29 is the live one on your site — you currently assign eleven fathers to Matthew and none to Mark), and paraphrase, which usually cannot settle word order.

**The honest alternative** is what wave 2 already does: name witnesses individually, and where you must aggregate, say what has actually been collated. *"Supported by the great majority of Greek manuscripts; no complete collation of this verse has been published"* is a **stronger** claim than an invented percentage, because it cannot be knocked down.

---

## 6. Order of work

**Code, quick:**

1. Redeploy from HEAD — recovers 21 passages on the index (§2.2)
2. Fix the sources-card text or its field (§1.2) — currently false on every page
3. Fix the Latin tab selector (§2.3) — 7 passages
4. Reconcile the three totals (§2.1)
5. Surface `unitLabel` on rows in multi-unit passages (§2.8)

**Data, immediate:**

6. Apply `auditCorrections.ts` — the verified fixes in §3
7. Apply `wave1SourceAssignments.ts` — gives all 30 passages a real controlling source

**Research, the actual project:**

8. Row-level sourcing for 1,104 wave-1 rows (§1.1)
9. Citations for 90 patristic rows (§0)
10. Fill 18 empty father lists (§2.4)
11. Replace vague wave-1 snapshots with named witnesses (§2.6)
12. Decompose 499 aggregate rows (§2.5)

---

## 7. Unresolved — flagged, not guessed

1. **John 7:53–8:11: 1,476 or 1,495?** Needs Robinson at source. *Filología Neotestamentaria* 13 (2000): 35–59 is not freely available.
2. **John 1:18: where do 1,610 and 17 come from?** If unrecoverable, remove them. The 7 Greek witnesses with θεός are recoverable (P66, P75, ℵ*, B, C*, L, 33) and can stay.
3. **Acts 8:37: "about 10 to 12 principal Greek witnesses" probably understates.** One secondary source gives **64 Greek manuscripts including the verse and 417 omitting** — figures with the shape of a *Text und Textwert* census, and Acts 8:37 is a plausible Teststelle. I could not confirm this against a second independent source, so **do not publish 64/417 on my say-so.** ECM Acts (2017) covers this book fully and will settle it. What is solid: the earliest Greek manuscript containing the verse is **E (Codex Laudianus, 08), sixth century** — worth stating explicitly, since the page currently leads with Irenaeus and never gives the earliest Greek witness.
4. **Mark 11:26: "over 95 percent / approximately 1,585+."** The index card attributes this to J. K. Elliott. I could not confirm the figure or locate the statement.
5. **Matthew 6:13: "approximately 98%+."** No collation of Matthew at this point has been published; this is an estimate and should be labelled one.
6. **Matthew 17:21: "about 99.4 percent" of "about 1,700 surviving Greek manuscripts of Matthew."** The 10 omitting witnesses are solid, and the ~1,700 denominator is defensible — the standard figure is that around 2,000 Greek manuscripts contain Gospel material, but because of fragments and lacunae roughly **1,700 attest any given Gospel verse**. Two precision notes: that is "manuscripts attesting a given verse," not "manuscripts of Matthew," and the phrasing should say so; and 1,700 is a round scholarly estimate, so 99.4% carries false precision. "More than 99 percent" is the defensible form.

---

## 8. What I could not do

You asked for every witness on every passage fully accounted for. I want to be plain about the gap between that and what is in these files.

I verified: the structure of all 2,078 rows, all 178 manuscript dates for internal consistency, and the specific content claims listed in §3 — the ones that could be checked against a source I could open. That is a real audit and it found real errors, including two (§3.1, §3.2) that put wrong witnesses on the page.

I did **not** verify all 2,078 rows individually against primary sources. That would require *Text und Textwert*, the ECM print volumes and the Vetus Latina Database — all paywalled, and you specified free sources only. For the 17 passages in Matthew, Luke, Romans, Colossians and 1 Timothy, the complete collations you would need **have never been published in any form**, free or paid.

So "all witnesses accounted for, 100% accurate" is not reachable for roughly a third of your passages by anyone, at any budget. What *is* reachable is what wave 2 already demonstrates: every row carrying a citation a reader can open, aggregates named rather than counted, and the limits of the evidence stated on the page. That standard is achievable across all 51, and it is a better site than one carrying confident percentages nobody can check.
