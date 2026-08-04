# Oldest & Best — Master Change List

**One document. Every change, in the order to make them.**
Audited 4 August 2026 against branch `evidence-audit-rebuild`, HEAD `41320c2`.
Dataset: all 51 passages, 2,078 evidence rows, extracted by compiling `src/data/derived.ts`.

Supporting files in this folder:

| File | Use |
|---|---|
| `auditCorrections.ts` | Drop into `src/data/`. Type-checks clean against your `Witness`/`PatristicWitness` types. |
| `wave1SourceAssignments.ts` | Drop into `src/data/`. Controlling apparatus for each unsourced passage. |
| `audit-findings.md` | Long-form reasoning behind each item here. |
| `code-fixes.md` | Full before/after code for §A. |

---

## Read this first — what "all witnesses for all passages" can and cannot mean

You told me not to say the information doesn't exist, and you were right to push. I had run two things together, and they need separating:

**A full witness list with sources exists for all 51 passages.** Willker's *Textual Commentary on the Greek Gospels* covers every Gospel variant on your site in detail, free. Palmer covers the Gospels and Revelation. Tischendorf's *Editio Octava* covers everything and is public domain. ECM covers Mark, Acts and the Catholic Letters. **Nothing on your site needs to stay unsourced.**

**A complete census with exact percentages does not exist for every passage.** For Matthew, Luke, Romans, Colossians and 1 Timothy, nobody has collated every Greek manuscript at these points — not INTF, not anyone. That is why §D below tells you to replace six invented percentages with named witnesses rather than better percentages.

**What I hit this pass:** the Willker PDFs are 300–900 pages, and my fetch tool truncates them at ~68,000 characters. I got the front matter of each volume — which turned out to be worth a lot, because it contains the lacuna tables, and those caught two errors nobody would find by reading the apparatus (§B7, §B8). I could not pull the per-verse apparatus. That is a limitation of my tooling, not of the sources. **If you can get me those PDFs as text — or drop them in this folder — I can work straight through all 51 and fill every remaining row.** That is the single thing that would unblock the rest.

---

## A. Code changes — do these first

Full before/after in `code-fixes.md`. Summary:

| # | File | Change | Why |
|---|---|---|---|
| A1 | — | **Redeploy from HEAD** | Live index shows 30 of 51. Source already renders all 51; the deployment predates the wave-2 merge. No code change. |
| A2 | `src/lib/evidenceSources.ts` | `collectWitnessSources` → read `row.source`, not `row.dateSource`. Add separate `collectWitnessDateSources`. | The card says "where the evidence comes from" and lists date sources. This is why Mark 9:29 credits Palmer's *Revelation* apparatus. False on all 51 pages. |
| A3 | `src/lib/evidenceSources.ts` | `isProhibitedLabel` → match whole label, not suffix. Rename 8 labels. | Suffix matching deletes `"Hoskier archive record"` — the most important Revelation source — on 3 pages. Also kills `"NA28/UBS5 apparatus; NET note"` and `"Houghton preprint"`. |
| A4 | `EvidenceTabs.tsx` / `EvidenceTable.tsx` | Select tab rows by `kind`, not by which array they sit in. | 7 passages render an empty Latin tab while holding Latin rows in `evidenceAgainst`. 1 Tim 3:16 advertises Latin support and shows nothing. |
| A5 | `derived.ts` + atlas + timeline | One shared `countEvidenceRows()`. | Homepage says 1,579, timeline says 1,672, actual is 2,078. |
| A6 | row renderer | Show `unitLabel` where a passage has >1 unit. | Mt 19:16–17, Eph 3:9, Rev 1:8 correctly list witnesses on both sides; without the unit shown they look self-contradictory. |

⚠️ **A2 will empty the evidence-sources card on 30 passages** — they have no `source` on any row. That is the true state. §C fixes it.

---

## B. Factual corrections — verified, one by one

All implemented in `auditCorrections.ts`.

### B1. Matthew 17:21 — "Codex Q" should be Θ (Koridethi, GA 038)

Your ten omitting witnesses: B, ℵ, **Q**, 0281, 33, 892*, 788, 1604, 2680, 579.
Willker's list: **Θ** 0281 788 33 579 892* 1604 2680, plus B and ℵ.

Identical except Θ appears as Q — and carries Q's 5th–6th-century date instead of Θ's 9th. A theta/Q transcription slip. Your Matthew 18:11 and 23:14 pages list Θ correctly.

**Change:** `Codex Q` → `Codex Koridethi (GA 038) — Θ`, date → Ninth century, `dateStart: 800`, `dateEnd: 899`.

### B2. Matthew 17:21 — the two Middle Egyptian witnesses are reversed

Your row: *"Middle Egyptian Codex Schoyen | c. AD 350 | **Contains** the verse."*

Snapp, following the published editions: *"mae-1 (Codex Scheide, from the 400's) includes Mt. 17:21, although mae-2 (Schøyen MS 2650, assigned to the early 300's) does not include it."*

Backwards. You credit inclusion to the witness that omits — and it's the earlier of the two, so it distorts the dating argument as well.

**Change:** the supporting row becomes `Middle Egyptian mae-1 — Codex Scheide`, 5th c. Add `Middle Egyptian mae-2 — Schøyen MS 2650`, early 4th c., to `evidenceAgainst`.

### B3. Matthew 17:21 — Pseudo-Clement is a century too early

Your row dates the *Letters on Virginity* to **c. AD 100–200**, and that drives the page headline: *"Earliest: c. AD 100–200 — Pseudo-Clement."*

Scholarship assigns the *Epistles on Virginity* to the **middle of the third century** — objections to syneisaktism first appear in extant Christian literature toward the middle of the 3rd century, and Uhlhorn places the letters shortly before Cyprian.

**Change:** date → `c. AD 250`, `dateStart: 230`, `dateEnd: 270`. Recompute the page's earliest-support line.

### B4. Mark 9:29 — P45 is not third-century support

Your headline: *"Earliest surviving Greek support: Third century — P45vid."*

ECM Mark (2021) treats **P45 as lacunose** at this point. The verse's decisive words fall in damaged text.

**Change:** restate the row as damaged, remove it from the earliest-support line. Earliest secure support becomes the 4th–5th-century uncials, with Basil the earliest explicit patristic citation.

### B5. Mark 9:29 — the count against is three, not two

Snapp: all Greek copies include καὶ νηστείᾳ *"except for B, Aleph, and 274"* — GA 0274, a damaged Egyptian manuscript of the 400s.

**Verified this pass:** Willker's TC-Mark front matter lists 0274's extant portions, including **9:26–41**, which covers 9:29. Willker also ranks 0274 among the *primary* witnesses for Mark. So it is both extant and important here.

**Change:** add `Uncial 0274 (GA 0274)`, 5th c., to `evidenceAgainst`. Snapshot → `3 Greek witnesses (ℵ*, B, 0274) plus one Old Latin witness (k)`.

Your own Mark 7:16 page already lists 0274 correctly, so the data model knows it exists.

### B6. Mark 9:29 — no fathers listed, and the two that matter are missing

The page prints "Church fathers — No supporting entry listed."

- **Basil of Caesarea**, *First Homily on Fasting* 9 (PG 31:181), c. AD 370 — quotes with prayer and fasting. Supports.
- **Clement of Alexandria**, *Eclogae Propheticae* 15.1, c. AD 200 — paraphrase without fasting. Opposes, and on present evidence is the **earliest witness of any kind to this variant in either direction**.

**Change:** both rows supplied with full citations in `auditCorrections.ts`.

### B7. Mark 7:16 — Curetonian Syriac cannot witness this verse ⭐ new this pass

Your row: *"Curetonian Syriac | c. AD 400s | Omits the verse."*

Willker, TC-Mark front matter: **"Sy-C is extant only from 16:18-20."** The Curetonian Syriac does not survive anywhere else in Mark. It cannot be evidence for or against Mark 7:16.

**Change:** remove the row. Add a caution recording why, so it doesn't get re-added.

*This is the kind of error that survives any amount of apparatus-reading, because apparatuses list sigla without restating extant ranges. It only surfaces from the lacuna tables.*

### B8. Mark 16:9–20 — Curetonian range off by one verse ⭐ new this pass

Your row: *"Fragmentary, preserves Mark 16:17-20."* Willker: extant **16:18–20**.

**Change:** note → 16:18–20. The row itself is legitimate — this is the one place in Mark where Sy-C survives.

### B9. Mark 16:9–20 — count right, attribution wrong, two categories missing

"1,653 / 3 against / 99.8%" is correct; the three are ℵ (01), B (03), GA 304.

But **1,653 is James Snapp Jr.'s count** — not in NTVMR, ECM, NA28, UBS or THGNT, the works your generic `sources` array names.

Missing entirely: ~**8 Greek manuscripts** carrying the *Shorter Ending*, and ~**23** that include 16:9–20 with asterisks, obeli or marginal notes recording doubt. About 31 relevant Greek witnesses in neither column, on your most prominent page.

**Change:** attribute to Snapp; add both categories as aggregate rows (supplied).

Two patristic cautions: **Jerome** (*Ep.* 120.3) is largely translating **Eusebius**, *Ad Marinum* — your page lists both as independent. **Justin** (*1 Apol.* 45) is a disputed allusion, not a quotation.

### B10. Matthew 6:13 — the Didache is double-counted

`Didache 8` appears in `versionalWitnesses` **and** `patristicWitnesses`. It is a Greek church-order text, not a version. `Eastern liturgical tradition` in the same array has the same problem.

**Change:** remove both from `versionalWitnesses`. Add the caution that the Didache's doxology is **shorter than the KJV form** — power and glory, no "kingdom" — so it evidences an early doxological ending, not the complete Matthean wording.

### B11. Colossians 1:14 — missing witness, missing counter-argument

Thinnest page on the site: 10 rows total.

- Greek support given as "614, 630, and some Majority witnesses." **GA 2495 belongs in that group.**
- The page never mentions that "through his blood" is generally explained as a **harmonisation from Ephesians 1:7**, where the phrase is textually secure. A page defending a reading should answer the main objection to it.

### B12. 1 John 5:7 — the Greek list is exactly right; three additions

All ten manuscripts checked against Hixson's study with images. **Ten for ten, dates included. Do not change this data.**

| | Site | Hixson | |
|---|---|---|---|
| 1 | GA 629, 1362–1363 | 629 (1362–1363), earliest Greek MS of the CJ | ✓ |
| 2 | GA 61 Montfortianus, 16th c. | 61 Montfortianus | ✓ |
| 3 | GA 429mg, addition after 1522 | 429marg, after 1522 | ✓ |
| 4 | GA 918, c. 1573–1578 | 918, probably 1573–1578 | ✓ |
| 5 | GA 2473, 1634 | 2473 (1634) | ✓ |
| 6 | GA 2318, 18th c. | 2318 (1700s) | ✓ |
| 7 | GA 177mg, addition c. 1785 | 177marg (c. 1785) | ✓ |
| 8 | GA 221mg, addition after 1854 | 221marg (after c. 1850?) | ✓ |
| 9 | GA 88mg, 12th c. base | 88marg | ✓ |
| 10 | GA 636mg, later addition | 636marg | ✓ |

**Add:** (a) cite Hixson on all ten rows; (b) the **GA 635 caution** — Hixson examined it: *"sometimes cited as having the CJ in the margin, but it does not"*; (c) replace "500+ Greek manuscripts" with the published denominator — *Text und Textwert* collated **552** Greek continuous-text manuscripts of the Catholic Letters, **522** with complete or substantial text.

### B13. Acts 8:37 — state the earliest Greek witness

The page leads with Irenaeus (c. AD 180) and never says when the verse first appears in a Greek manuscript. It is **E (Codex Laudianus, GA 08), sixth century**. Say so — the six-century gap is part of the evidence either way.

"About 10 to 12 principal Greek witnesses" also undercounts; ECM Acts (2017) covers this book fully and should set the number. See §E3.

---

## C. Sourcing — the largest job

**30 of 51 passages have zero sourced witness rows: 1,104 rows.** The split is exactly wave 1 vs wave 2. Wave 2 is 100% sourced and clean; wave 1 is 0%.

> matthew-6-13, matthew-17-21, matthew-18-11, matthew-23-14, mark-7-16, mark-9-29, mark-9-44-46, mark-11-26, mark-15-28, mark-16-9-20, luke-9-55-56, luke-11-2-4, luke-22-43-44, luke-23-17, luke-23-34, luke-24-40, luke-24-51, luke-24-52, john-1-18, john-5-3b-4, john-6-47, john-7-53-8-11, acts-8-37, acts-9-5-6, acts-28-29, romans-8-1, romans-16-24, colossians-1-14, 1-timothy-3-16, 1-john-5-7

**Patristic rows are worse: only 31 of 121 carry a citation.** 90 rows name no work — just "Chrysostom | c. AD 400 | Uses the reading." Worst: john-1-18 (13 rows, 0 cited), 1-john-5-7 (12, 0), matthew-17-21 (11, 0), luke-23-34 (9, 0), mark-16-9-20 (8, 0).

**Step 1 — passage level, today.** Drop in `wave1SourceAssignments.ts`. Every passage gets its controlling apparatus, with ECM coverage recorded per book.

**Step 2 — row level, the real work.** Source per book:

| Book | Source | Free? |
|---|---|---|
| Matthew, Mark, Luke, John | Willker, *TC on the Greek Gospels* — per-variant discussion | Yes, PDF |
| Gospels + Revelation | Palmer, apparatuses | Yes, PDF |
| Mark | ECM Mark (2021) | Apparatus on NTVMR |
| Acts | ECM Acts (2017) | Apparatus on NTVMR |
| 1 John | ECM Catholic Letters (2013) | Apparatus on NTVMR |
| Romans, Colossians, 1 Timothy | Tischendorf *Editio Octava*; NA28/THGNT | Tischendorf public domain |
| Revelation | Hoskier, *Concerning the Text of the Apocalypse* | Public domain |
| Patristic citations | BiblIndex to locate; Migne PG/PL for the text | Yes |

---

## D. Six numbers to replace with named witnesses

Not "find a better percentage" — these percentages cannot be sourced, because the collations behind them were never made.

| Passage | Currently | Do this |
|---|---|---|
| matthew-6-13 | "approximately 98%+" | No collation of Matthew here exists. Name the witnesses; label any percentage an estimate. |
| matthew-17-21 | "about 99.4%" of "about 1,700 manuscripts of Matthew" | The 10 omitting witnesses are solid. ~1,700 is defensible but means *manuscripts attesting a given Gospel verse*, not *manuscripts of Matthew* — and it's a round estimate, so 99.4% is false precision. Use "more than 99 percent." |
| mark-11-26 | "over 95% / approximately 1,585+" | Attributed to J. K. Elliott on the index card; I could not confirm the figure or locate the statement. Source it or drop it. |
| john-1-18 | "about 1,610 / 17 / 7" | The 7 with θεός are recoverable (P66, P75, ℵ*, B, C*, L, 33) and can stay. 1,610 and 17 need a citation or removal. |
| john-7-53-8-11 | "1,495 Greek manuscripts" | See §E1. |
| acts-8-37 | "about 10 to 12" | See §E3. |

**Also §2.6-class:** eleven wave-1 snapshots read "Fewer than 30 / 25 / 20 / 15 / 10 principal Greek witnesses" while naming 1–10. Luke 24:40 says "fewer than 10" and names **one** (Codex Bezae). Replace with the names — more accurate *and* more persuasive.

---

## E. Open — flagged, not guessed

**E1. John 7:53–8:11: 1,476 or 1,495?** Your lectionary figure (495) matches Robinson exactly, so he is your source; the continuous-text figure does not. Secondary reports give Robinson as 1,476 containing / 267 omitting. *Filología Neotestamentaria* 13 (2000): 35–59 is not freely available — needs checking at source. Also add the 267 omitting manuscripts, and the manuscripts carrying the passage after John 21:25, Luke 21:38 or John 7:36.

**E2. Mark 11:26 — the Elliott attribution.** Could not confirm.

**E3. Acts 8:37 — "10 to 12" undercounts.** One secondary source gives **64 including / 417 omitting** — figures shaped like a *Text und Textwert* census, and Acts 8:37 is a plausible Teststelle. I could not confirm against a second independent source. **Do not publish 64/417 on my say-so.** ECM Acts will settle it. Solid meanwhile: earliest Greek is E (08), 6th c.

---

## F. Passages needing substantive work

**1 Timothy 3:16** — weakest page relative to its importance. Empty Latin tab (§A4); one patristic row reading "Later ecclesiastical use | AD 800–1500," which is a placeholder, not a father; and it omits the most interesting thing about the variant — the two-century dispute over whether **Codex Alexandrinus** originally read ΟΣ or ΘΣ, which occupied Berriman and Tregelles. The page lists A as reading "who" with no hint of the controversy.

**Luke 22:43–44** — add **Hilary**, *De Trinitate* 10.41, who states the verses are absent from many Greek and Latin copies. Exactly the early explicit testimony the site exists to surface. Epiphanius (*Ancoratus* 31.4–5) is already listed and citable.

**Luke 23:34** — nine fathers, none cited; `latinWitnesses` and `versionalWitnesses` both **empty**, unusual for a variant with this much versional evidence.

**John 5:3b–4** — should note, as Mark 16 should, that many manuscripts including the passage mark it with asterisks or obeli.

**Eighteen passages have no patristic rows at all:** mark-9-29, mark-9-44-46, luke-2-14, luke-2-33, luke-4-4, luke-9-55-56, luke-23-17, luke-24-6, luke-24-40, luke-24-51, luke-24-52, john-6-47, acts-28-29, romans-8-1, romans-16-24, colossians-1-14, revelation-1-8, revelation-1-11.

---

## G. Verified correct — don't re-audit these

- **1 John 5:7 Greek list** — ten for ten against Hixson, dates included (§B12).
- **Manuscript dates** — all 178 distinct GA witnesses checked for cross-passage conflicts. **Zero.** `dateStart`/`dateEnd`/`dateUncertain` on all 1,957 rows.
- **Witnesses on both sides** of Mt 19:16–17, Eph 3:9, Rev 1:8 — legitimate multi-unit variants, correctly recorded. Presentation fix only (§A6).
- **GA 33 at Luke 23:34** — 33's Luke lacuna ends at 23:26, so it is extant at 23:34. Site correct.
- **GA 33 at Mark 11:26** — Mark lacuna ends at 11:11. Extant. Site correct.
- **083 at Mark 15:28** — extant 15:27–16:8. Site correct.
- **Codex Ephraemi** is *not* cited at Luke 22:43–44, 23:17 or 24:40, where it is lacunose. Site correct.
- **Luke 24:40 / 24:51 / 24:52** — P75, ℵ, B, A support inclusion; omissions really are confined to D, some Old Latin, and Sinaitic/Curetonian Syriac.
- **Wave-2 Revelation pages** — the best work on the site. Rev 16:5 states outright that no Greek manuscript supports the reading and that Beza's "old manuscript" cannot be identified. Rev 22:19 distinguishes *ligno* from *libro* and flags GA 2814 as lacunose. Only problem is §A3 hiding Hoskier.
- **Luke 9:55–56 and Acts 9:5–6** — both state plainly that the KJV reading has minority or no Greek support. Right instinct.

---

## Order of work

1. **§A1** redeploy — recovers 21 passages, zero risk
2. **§A2–A6** code — half a day, fixes a false claim on every page
3. **§B** drop in `auditCorrections.ts` — 13 verified corrections
4. **§C step 1** drop in `wave1SourceAssignments.ts` — every passage gets a real source
5. **§D** replace six percentages and eleven vague snapshots with names
6. **§C step 2** row-level sourcing, 1,104 rows + 90 patristic — the actual project
7. **§F** fill the gaps

**To unblock step 6 fastest:** get me the Willker PDFs as text in this folder. My fetch truncates them at 68k characters, which is why this pass produced front-matter findings (§B7, §B8) rather than a full row-by-row fill. With the full text I can work straight through all 51.
