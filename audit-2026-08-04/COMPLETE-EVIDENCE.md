# Oldest & Best — Complete Evidence Report

**4 August 2026.** Every passage now has a full witness list from a citable apparatus.

Gemini's suggestions were worth chasing. Three of the five didn't pan out, but one did, and it changed the picture completely.

---

## What worked, what didn't

| Gemini's suggestion | Result |
|---|---|
| **LaParola variant apparatus** | ✅ **This is the answer.** Per-verse apparatus for the whole NT — Greek, versions, and fathers, each with a date and text-type. Free. It covers Romans, Colossians, 1 Timothy and Revelation, which is exactly where I had no modern critical edition. I harvested all 51 passages from it. |
| Willker's Gospel PDFs | ⚠️ Partly. Fetch truncates at ~68k chars against 300–900-page files. Front matter only — but that front matter carries the lacuna tables, which caught two errors (see §5). |
| Tischendorf via CrossWire SWORD | ❌ The SWORD "Tisch" module is Tischendorf's *text*, not his *apparatus*. It won't give versional or patristic evidence. Gemini was wrong about this one. |
| Vetus Latina Database | ❌ Paid academic subscription (Brepolis). Not accessible. |
| CNTTS apparatus | ❌ Proprietary, licensed only inside Logos/Accordance. Also Greek-only — no versions or fathers. |

**Method:** LaParola's form is POST-only, so I drove it through the browser, pulled all 51 passages, normalised the sigla to match your data model, and diffed. Full method is reproducible; the numbers below are computed, not estimated.

---

## 1. The headline number

**Your site names 8–47 witnesses per passage. LaParola names 62–144 for the same verses.**

Across the 51 passages the site carries roughly **a quarter to a third of the witness record** that a standard free apparatus lists.

| | Site witnesses | LaParola witnesses |
|---|---|---|
| Colossians 1:14 | **8** | 74 |
| Luke 24:6 | 13 | 90 |
| 1 John 5:7 | **15** | 114 |
| Acts 9:5–6 | 15 | 62 |
| Luke 2:14 | 21 | 109 |
| Ephesians 3:9 | 22 | 95 |
| Romans 8:1 | 22 | 94 |
| Matthew 18:11 | 23 | 119 |
| Acts 28:29 | 23 | 79 |
| Mark 10:24 | 23 | 83 |
| 1 Timothy 3:16 | **24** | 101 |
| Mark 7:16 | 24 | 99 |
| Mark 16:9–20 | **24** | 119 |
| Romans 16:24 | 24 | 63 |
| Luke 23:34 | 25 | 112 |
| John 7:53–8:11 | **29** | 144 |

The bolded rows are your flagship passages.

---

## 2. Two honest caveats before you act on this

**Caveat 1 — LaParola lists every variant unit in the verse.** Matthew 1:25 has several separate disputes; LaParola's 86 witnesses cover all of them, while your page covers one. So "missing 62" overstates what belongs on your page. The gap is real but not the full number.

**Caveat 2 — for Revelation, your site is *better* than LaParola.** LaParola has almost nothing there:

| | Site | LaParola |
|---|---|---|
| Revelation 1:8 | 41 | 32 |
| Revelation 1:11 | 31 | **4** |
| Revelation 16:5 | 36 | **5** |
| Revelation 22:19 | 12 | 22 |

Your Revelation pages are built on Palmer and Hoskier, which are the right sources, and they beat the general apparatus. **Do not touch Revelation 1:11 or 16:5 based on this report.** That work is sound.

---

## 3. What's missing, passage by passage

Dates in parentheses are LaParola's, in Roman numerals by century.

### Mark 9:29 — confirms every correction I made, and adds more

**Shorter reading ("prayer"), missing from your page:**
`Clement (215)` · `itk (IV/V)` · **`0274 (V)`** · `geo1 (V)` · `2427 (XIV)`

**Longer reading ("prayer and fasting"), missing from your page:**
**`Diatessaron a and p (II)`** · `copsa (III/IV)` · `copbo (III/IV)` · **`goth (IV)`** · **`Basil (379)`** · `itd, itff2 (V)` · `geo2 (V)` · `N (VI)` · `itf (VI)` · `itq (VI/VII)` · `itaur, itr1 (VII)` · `E, itl (VIII)` · `F G H Π slav (IX)` · `1424 (IX/X)` · plus ~25 later minuscules and lectionaries

Three things to note. **0274 is confirmed** — and Willker's own front matter lists 0274 as extant at Mark 9:26–41 and ranks it a *primary* witness for Mark. **Clement is confirmed** as the earliest witness in either direction. And the **Diatessaron (2nd century)** supports the longer reading — earlier than anything currently on your page, and it strengthens your case.

⚠️ `2427` appears in LaParola for the shorter reading. **It is a modern forgery** (post-1874, confirmed by pigment analysis). LaParola predates that finding. Do not add it.

### 1 John 5:7 — your ten Greek witnesses are right; the other side is unbuilt

LaParola confirms your marginal witnesses in its own notation: `221 v.r. (X)`, `177 v.r. (XI)`, `88 v.r. (XII)`, `429 v.r. (XIV)`, `636 v.r. (XV)`. Ten for ten still stands.

But your page states the opposing evidence as an aggregate — "500+ Greek manuscripts omit." LaParola **names about 45 of them individually**:

`A (V)` · `048 (V)` · `P (VI)` · `L (VIII)` · `Ψ (VIII/IX)` · `K (IX)` · `049 (IX)` · `33 (IX)` · `2464 (IX)` · `Lect (IX)` · `056, 0142 (X)` · `1739 (X)` · `81 (1044)` · `181, 323, 436, 451, 945, 1175, 1243, 1846, 2298, 2344 (XI)` · `2138 (1072)` · `104 (1087)` · `1735 (XI/XII)` · `326, 330, 1241, 1505, 1611, 2127, 2412 (XII)` · `614, 1292, 1852, 2492 (XIII)` · `630, 1067, 1409, 1877, 1881 (XIV)` · `2495 (XIV/XV)` · `322, 1844 (XV)`

Versions and fathers against, also absent: `copsa`, `copbo`, `syrp`, `syrh`, `arm`, `geo`, `eth`, `slav`, `vgww`, `vgst`, and **Irenaeus (202), Tertullian (220), Hippolytus (235), Origen, Hilary (367), Athanasius (373), Basil (379), Ambrose (397), Didymus (398), Epiphanius (403), Chrysostom (407), Jerome (420), Augustine (430), Cyril (444)** — none of whom cite the Comma where you would expect it.

Latin support for the Comma, which your page should have and doesn't: `vgcl (IV)`, `Cyprian (258)`, `Ps-Cyprian (IV)`, `Priscillian (385)`, `Ps-Vigilius (IV/V)`, `Cassian (435)`, `Speculum (V)`, `Varimadum (445–480)`, `Fulgentius (533)`, `Victor-Vita`, `Ansbert (VIII)`.

### 1 Timothy 3:16 — the 5th-century witness you're missing

**`061 (V)`** — a fifth-century witness at this verse, absent from your page. This matters: your page currently claims the earliest support is "sixth century onward — Byzantine Greek transmission."

The entire patristic dimension is missing (your page has one placeholder row, "Later ecclesiastical use, AD 800–1500"):
`Origen lat (254)` · `Ambrosiaster (IV)` · `Hilary (367)` · `Ephraem (373)` · `Gregory-Nyssa (394)` · `Didymus (398)` · `Epiphanius (403)` · `Chrysostom (407)` · `Severian (408)` · `Pelagius (418)` · `Jerome (420)` · `Theodore lat (428)` · `Apollinaris (428)` · `Augustine (430)` · `Cyril (444)` · `Quodvultdeus (453)` · `Theodoret (466)` · `Varimadum (445–480)` · `Mercator (V)` · `Ps-Dionysius (V)` · `Liberatus (566)` · `Ps-Oecumenius (VI)`

Latin, which your page advertises and shows an empty tab for: `itd, itb (V)` · `itf (VI)` · `itz (VIII)` · `itar, itg, itx (IX)` · `itmon (X)` · `itdiv (XII)` · `itc (XII/XIII)` · `itde (XIII)` · `ito (VII)` · `vgms (IV)`

Plus `goth (IV)`, `copsa`, `copbo`, `eth`, `arm`, `geo2`, `syrh`.

### Colossians 1:14 — the thinnest page, 8 witnesses against 74

Your page names 8. Missing includes `D (V)`, `Ψ (VIII/IX)`, `P (VI)`, `F G K (IX)`, `L (VIII)`, `0150 (IX)`, `33 (IX)`, `075 (X)`, `1739 (X)`, `81 (1044)`, `104 (1087)`, and ~25 more minuscules; versions `copsa`, `copbo`, `syrp`, `syrpal`, `eth`, `geo`, `arm`, `vgww`, `vgst`, `vgcl`; fathers **`Irenaeus lat (202)`, `Ambrosiaster (IV)`, `Athanasius (373)`, `Gregory-Nyssa (394)`, `Ambrose (397)`, `Didymus (398)`, `Chrysostom (407)`, `Pelagius (418)`, `Theodore lat (428)`, `Augustine (430)`, `Cyril (444)`, `Cassiodorus (580)`**; Latin `itd, itb (V)`, `itf (VI)`, `itar, itg (IX)`, `itmon (X)`, `ito (VII)`.

### Mark 16:9–20 — the ~23 manuscripts with critical marks, now named

I flagged that about 23 manuscripts include the passage but flag it. LaParola names them:

`083 (VI/VII)` · `0112 (VI/VII)` · `099 (VII)` · `L (VIII)` · `l1602 (VIII)` · `Ψ (VIII/IX)` · `274 (X)` · `2812 (X)` · `2346 (X/XI)` · `1110, 1210, 1221 (XI)` · `22, 138, 264 (XII)` · `579 (XIII)` · `205 (XV)` · `1582 (949)`

Patristic evidence missing from your page: `Justin (165)` · `Irenaeus lat (202)` · `Clement (215)` · `Origen (254)` · `Eusebius (339)` · `Aphraates (367)` · `Constitutions (c. 380)` · `Ambrose (397)` · `Didymus (398)` · `Epiphanius (403)` · `Severian (408)` · `Jerome (420)` · `Augustine (430)` · `Eremita (430)` · `Hesychius (450)` · `Nestorius (451)` · `Euthymius (XII)` · `Severus` · **`Diatessaron a, i, n (II)`**

### Luke 23:34 — a first-century witness

`Hegesippus (I)` — LaParola dates him to the first century. Your page has him at "c. AD 170s, preserved by Eusebius," which is the safer framing, but LaParola's dating is worth noting on the page.

Also missing: `Diatessaron (II)`, `Marcion (II)`, `Irenaeus lat (202)`, `Clement (215)`, `Hippolytus (235)`, `Origen lat (254)`, and ~30 fathers from Eusebius through John of Damascus, plus `syrc`, `syrp`, `syrpal`, `eth`, `arm`, `geo`, `slav`, `copbo`, `copsa`.

### John 7:53–8:11 — 29 named against 144

Missing includes the lectionary evidence that is central to Robinson's argument: `l185 (XI)`, `l387, l751, l773 (XI)`, `l69, l70, l211, l1780 (XII)`, `l514 (IX)`, `l184 (1319)`, `l1579 (XIV)`, `l890 (1420)`, `l1761 (XV)` — and `1443 (1047)`, `1445 (1323)`, `225 (1192)`, `1077 (X)`, `S (949)`.

Fathers: `Didascalia (III)`, `Ambrosiaster (IV)`, `Constitutions (c. 380)`, `Pacian (392)`, `Ambrose (397)`, `Rufinus (410)`, `Jerome (420)`, `Augustine (430)`, `Didymus (398)`.

### Remaining passages — summary

| Passage | Site | LaParola | Most significant absences |
|---|---|---|---|
| matthew-1-25 | 28 | 86 | `syrs`, `itk`, `copsa`, `copmae`, Ambrose, Chromatius, Athanasius, Jerome, Augustine |
| matthew-5-22 | 29 | 98 | Ptolemy (II), Justin (165), Tertullian, Origen, Irenaeus, Cyprian, Diatessaron |
| matthew-5-44 | 32 | 122 | Theophilus (180), Athenagoras (II), Irenaeus, Origen, Cyprian, Adamantius |
| matthew-6-13 | 28 | 103 | **Didache (II)**, Tertullian, Origen, Cyprian, `vgcl`, `copfay` |
| matthew-17-21 | 42 | 106 | **`Θ (IX)`** (your "Codex Q"), Diatessaron, Origen, Asterius, Hilary, Basil, Ambrose |
| matthew-18-11 | 23 | 119 | Origen, Juvencus (330), Eusebius, Hilary, Jerome, Diatessaron |
| matthew-19-16-17 | 30 | 102 | Marcion (II), Clement, Novatian, Irenaeus, Origen |
| matthew-23-14 | 28 | 104 | Origen gr/lat, Diatessaron n/t, Hilary, Jerome, Cyril |
| matthew-27-35 | 36 | 85 | `B`, `א`, `A`, `W`, Origen lat, Eusebius |
| mark-1-2 | 31 | 105 | Irenaeus gr (202), Origen, Ambrosiaster, Serapion, Titus-Bostra, Basil |
| mark-7-16 | 24 | 99 | Diatessaron a/p (II), Augustine, `274`, `2427` |
| mark-9-44-46 | 31 | 87 | Diatessaron a/p, Irenaeus lat, Basil, `0274`, `itk`, `copfay` |
| mark-10-24 | 23 | 83 | Clement (215), Diatessaron, `syrs`, `syrp`, `syrh` |
| mark-11-26 | 32 | 114 | Diatessaron, Cyprian (258), Augustine, `itk`, `copsa` |
| mark-15-28 | 37 | 93 | Diatessaron ar, Origen, Jerome, `itk`, `copsa`, Vigilius |
| luke-2-14 | 21 | 109 | Irenaeus lat, Origen gr/lat, Diatessaron s, ~40 fathers |
| luke-2-33 | 24 | 92 | Diatessaron a/n/t, `goth`, Hilary, Hesychius |
| luke-4-4 | 39 | 80 | Origen gr/lat, Titus-Bostra, Diatessaron |
| luke-9-55-56 | 35 | 94 | Diatessaron, Marcion (II), Ambrosiaster, Ambrose, Basil, Cyril-Jerusalem |
| luke-11-2-4 | 31 | 99 | Tertullian, Origen, Gregory-Nyssa, Titus-Bostra, Cyril |
| luke-22-43-44 | 34 | 118 | Diatessaron ar/i/n, **Justin (165)**, Irenaeus gr, Hippolytus, Hilary, Epiphanius |
| luke-23-17 | 33 | 86 | Diatessaron, `copsa`, `copbo`, Augustine |
| luke-24-6 | 13 | 90 | Marcion (II), Diatessaron, Eusebius, Amphilochius, Cyril |
| luke-24-40 | 31 | 85 | Athanasius, Amphilochius, Chrysostom, Jerome, Augustine, Cyril |
| luke-24-51 | 32 | 83 | Diatessaron, Severian, Augustine, Cyril, Hesychius, Cosmas |
| luke-24-52 | 31 | 76 | `copsa`, `copbo`, Augustine, `vgmss` |
| john-1-18 | 34 | 128 | Heracleon, Ptolemy, Theodotus (II), Irenaeus, Clement, ~35 more fathers |
| john-3-13 | 39 | 124 | Hippolytus, Novatian, Eustathius, Aphraates, Lucifer, ~30 fathers |
| john-5-3b-4 | 36 | 98 | Diatessaron a/i/n, Tertullian, Hilary, Ambrose, Didymus, Chrysostom |
| john-6-47 | 31 | 91 | Diatessaron a/i/n, Origen, `goth`, Hilary, Didymus, Augustine |
| acts-8-37 | 42 | 89 | **Irenaeus (202)**, **Cyprian (258)**, Tertullian, Ambrose, Chromatius, Pacian, Augustine |
| acts-9-5-6 | 15 | 62 | `copsa`, `copbo`, Lucifer, Ephraem, Ambrose, Chrysostom, ~20 Latin |
| acts-20-28 | 47 | 108 | Irenaeus lat, Athanasius, Basil, Ambrose, Epiphanius, Chrysostom, Cyril |
| acts-28-29 | 23 | 79 | `copsa`, `copbo`, Chrysostom, Euthalius, Cassiodorus |
| romans-8-1 | 22 | 94 | Origen lat, Adamantius, Ambrosiaster, Athanasius, Basil, Chrysostom, Jerome |
| romans-14-10 | 31 | 96 | **Polycarp (156)**, Tertullian, Cyprian, Ambrosiaster, Ambrose, Chrysostom |
| romans-16-24 | 24 | 63 | Origen lat, Ambrosiaster, Pelagius, Theodoret, `p61 (c. 700)` |
| 1-corinthians-15-47 | 37 | 105 | Tertullian, Hippolytus, Origen, Cyprian, Marcellus, Priscillian, ~20 fathers |
| ephesians-3-9 | 22 | 95 | Tertullian, Adamantius, Origen, Ambrosiaster, Hilary, Chrysostom, Jerome |
| 1-john-4-3 | 37 | 96 | **Polycarp (156)**, Irenaeus lat, Tertullian, Origen, Cyprian, Priscillian, Tyconius |

---

## 4. The pattern

Three kinds of evidence are systematically absent across nearly every passage:

**The Diatessaron (2nd century).** It appears in LaParola for at least 20 of your 51 passages and is almost never on your site. It is among the earliest evidence that exists, and in several cases — Mark 9:29 is the clearest — **it supports the KJV reading.** You are leaving your strongest early evidence on the table.

**Church fathers.** Your 121 patristic rows across 51 passages, against LaParola's several hundred. Eighteen of your passages have no fathers at all. For a site whose organising question is *how old is this reading*, this is the biggest single gap.

**Named minuscules and lectionaries.** Your pages stop at the famous uncials and a handful of minuscules, then say "Byzantine Majority" or "1,500+ manuscripts." LaParola names 40–80 individual witnesses with dates for the same verses. **Replacing your aggregate rows with these named lists is the single change that would most improve the site** — and it directly answers what you originally asked for, because it turns an unverifiable "1,500+" into a list a reader can check.

---

## 5. Corrections confirmed or added this pass

**Confirmed by LaParola:** 0274 at Mark 9:29 · Clement as earliest witness at Mark 9:29 · the ten Greek manuscripts of the Comma · Θ (not Q) at Matthew 17:21 · 061 as a 5th-century witness at 1 Timothy 3:16.

**From Willker's lacuna tables (new, in `auditCorrections.ts`):**
- **Mark 7:16 cites Curetonian Syriac.** Sy-C survives in Mark only at 16:18–20. It cannot witness this verse. Remove.
- **Mark 16:9–20** gives the Curetonian range as 16:17–20. It is 16:18–20.

**Verified clean, do not re-audit:** GA 33 at Luke 23:34 and Mark 11:26 (falls outside the lacuna) · 083 at Mark 15:28 · Ephraemi correctly absent from Luke 22:43–44, 23:17, 24:40.

**Do not add:** `2427` at Mark 9:29 or Mark 7:16 — modern forgery, post-1874, confirmed by pigment analysis. LaParola predates that finding and still lists it.

---

## 6. What to do

1. **Redeploy** — recovers 21 passages on the index (no code change).
2. **Fix the sources card** — it cites date provenance under an evidence heading, on all 51 pages.
3. **Fix the label filter** — it is deleting Hoskier from your three Revelation pages.
4. **Apply `auditCorrections.ts`** — the verified factual fixes.
5. **Add the missing witnesses in §3**, passage by passage, citing LaParola. Start with Colossians 1:14 (8 witnesses), 1 John 5:7 (15), 1 Timothy 3:16 (24) and Mark 16:9–20 (24) — the four where the gap is widest relative to the passage's prominence.
6. **Replace aggregate rows with named witnesses.** This is the change that answers your original question.

**Leave Revelation 1:11 and 16:5 alone.** Your data there is better than the general apparatus.

---

## 7. Source to cite

> LaParola, *Greek New Testament with Textual Variants* (laparola.net/greco/). Apparatus compiled from NA/UBS with witness dates and text-types. Greek text: SBLGNT.

It is free, per-verse, covers the whole New Testament, and gives a date for every witness — which is exactly what your site is organised around. For Revelation, keep citing Palmer and Hoskier, which are better.
