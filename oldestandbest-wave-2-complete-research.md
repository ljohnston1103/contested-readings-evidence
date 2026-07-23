# OLDESTANDBEST.COM — COMPLETED WAVE-2 RESEARCH HANDOFF

**Research status:** complete  
**Last verified:** 2026-07-23  
**Intended destination:** `oldestandbest.com`  
**Research blocks:** 20  
**Actual passage objects/pages:** 21 (Revelation 1:8 and Revelation 1:11 are separate pages)  
**Expected passage count after implementation:** 51 if the live site still contains 30 passages

This file replaces the earlier draft's verification placeholders. It is ready to give to the coding agent. It is deliberately schema-neutral: map the named fields to the site's existing passage, witness, version, father, source, and confidence fields rather than inventing a second data model.

## Non-negotiable implementation rules

1. Add all 21 passage objects. Do not merge Revelation 1:8 and 1:11.
2. Preserve the exact KJV quotations below.
3. Treat the Greek lists as **principal witnesses**, not complete censuses. Never turn them into percentages.
4. `Maj` or `Byz` means that the reading belongs to the Greek majority/Byzantine tradition; it is not a manuscript count.
5. Keep correction states (`*`, `c`, superscripted correctors), `vid`, lacunae, and family qualifications. Do not flatten `P67vid` into an unqualified witness or a corrected manuscript into a single reading.
6. A version is evidence for the wording available to its translator or reviser. It is not a surviving Greek manuscript.
7. Every church-father row below has a relationship label:
   - `explicit_quote`: the writer presents the wording as Scripture and the variant is visible.
   - `close_quote`: recognizably cites/echoes the passage, but wording, source, or transmission is not exact enough to treat as a direct Greek-manuscript equivalent.
   - `parallel_tradition`: related early Christian teaching, not a secure quotation of this verse.
   - `mixed_citation`: the same writer or work exhibits more than one form.
   - `manuscript_report`: a writer reports what copies read; this is not the same as a surviving manuscript.
   - `theological_parallel`: relevant theology or phrasing, not a textual witness to the verse.
8. Do not create patristic rows from apparatus names alone. Where this file says “none to publish,” that is a completed exclusion decision.
9. Add `source`, `lastVerified: "2026-07-23"`, and the stated confidence to every new evidence row.
10. Add book-filter values for `1 Corinthians`, `Ephesians`, and `Revelation`. Add variant-type values `Intermediate Reading`, `Multiple Independent Variants`, and `Conjectural Emendation` only if the current schema uses a closed enumeration.
11. Update search, book/type/tag filters, related/previous/next navigation, father and version indexes, sitemap/static routes, featured collections if appropriate, and all calculated counts. The final passage count is 51, not 50, if starting from the 30 passages visible on 2026-07-23.
12. Do not describe a reading as doctrinally necessary when the same doctrine is explicit elsewhere. Each entry's caution text must remain visible.

## Source and siglum conventions

- `ℵ` = Codex Sinaiticus; `A`, `B`, `C`, `D`, etc. are standard Gregory–Aland manuscript sigla.
- `f1` and `f13` are manuscript families; `Maj`/`Byz` is the majority/Byzantine tradition.
- `it` = Old Latin tradition; `vg` = Vulgate tradition; `Sy` = Syriac; `sa`/`bo` = Sahidic/Bohairic Coptic.
- Gospel apparatus data comes principally from Wieland Willker's *A Textual Commentary on the Greek Gospels*. Revelation data comes principally from David Robert Palmer's continuously updated collation, checked against H. C. Hoskier where historical detail was needed.
- Confidence describes the accuracy of the row as entered, not a verdict on which reading is original.

---

## 1. Matthew 1:25 — “Her Firstborn Son”

**Metadata**

- `slug`: `matthew-1-25`
- `book`: `Matthew`
- `variantType`: `Short Omitted Phrase`
- `tags`: `Short omitted phrase`, `Majority Greek support`, `Latin support`, `Syriac support`, `Patristic evidence`, `Complex evidence`
- `lastVerified`: `2026-07-23`

**KJV:** “And knew her not till she had brought forth her firstborn son: and he called his name JESUS.”

**Disputed unit:** `τὸν πρωτότοκον` (“her/the firstborn”). The shorter reading has simply `υἱόν` (“a son”); the possessive “her” is supplied by English context rather than a separate Greek pronoun in the TR phrase.

**Variant issue:** The KJV follows the longer Byzantine form, `τὸν υἱὸν αὐτῆς τὸν πρωτότοκον` in the TR tradition. The earliest surviving continuous-text witnesses divide: Sinaiticus, Vaticanus, and several other witnesses omit “firstborn,” while a broad later Greek tradition includes it. Luke 2:7 supplies a strong parallel that could either preserve familiar wording or encourage scribal expansion.

**Quick read:** The longer form has broad Greek, Latin, and Syriac transmission and a fourth-century patristic quotation. The shorter form is supported by two major fourth-century codices and important early Syriac/Coptic evidence. This is a real early split, not an “all old versus all late” case.

**Support category:** `Broad majority/Byzantine support with important early opposition`

**Snapshot**

- `support`: Broad Byzantine Greek support; Old Latin and Vulgate support; Peshitta/Harklean support; Basilian quotation.
- `against`: ℵ, B, Zvid, 071vid, f1, 33, 788, 1192 and early Syriac/Coptic witnesses read the shorter form.

**Greek evidence**

- `FOR_KJV` — `C D L W Δ 087 124 f13-part 372 892 1071 Maj`; note that `L Δ*` also attest a reordered form, `τὸν υἱόν· τὸν πρωτότοκον`. Confidence: `high`. Source: [Willker, Matthew](https://www.willker.de/wie/TCG/TC-Matthew.pdf).
- `AGAINST_KJV` — `ℵ B Zvid 071vid f1 33 788 (= f13 member) 1192`; these read the shorter `υἱόν`. Confidence: `high`. Source: [Willker, Matthew](https://www.willker.de/wie/TCG/TC-Matthew.pdf).
- `OTHER` — `1182` reads `υἱὸν αὐτῆς`; it supports neither exact endpoint. Confidence: `high`. Source: [Willker, Matthew](https://www.willker.de/wie/TCG/TC-Matthew.pdf).

**Ancient versions**

- `FOR_KJV` — Old Latin `aur f ff1`, Vulgate, Syriac Peshitta and Harklean; the Syriac Diatessaron tradition reflected in Ephrem includes “firstborn.” Confidence: `high` for direction, `medium` for reconstructing the Diatessaron's exact language. Source: [Willker, Matthew](https://www.willker.de/wie/TCG/TC-Matthew.pdf).
- `AGAINST_KJV` — Old Latin witnesses within the broader `it` tradition, Syriac Sinaitic and Curetonian, and Coptic witnesses support a shorter form; Bohairic evidence is not uniform in exact wording. Confidence: `high`. Source: [Willker, Matthew](https://www.willker.de/wie/TCG/TC-Matthew.pdf).

**Church father rows**

- `author`: `Pseudo-Basil / Basilian corpus`; `date`: `late fourth century`; `workSection`: `Against Eunomius, Book 4, note on Colossians 1:15`; `reading`: `FOR_KJV`; `relationship`: `explicit_quote`; `evidence`: the work says that Mary's only Son “is called her first born” and quotes “Till she brought forth her first born Son”; `confidence`: `high` that the extant work has the longer text, `medium` for attribution because Books 4–5 are disputed. Source: [NPNF Basil, *Against Eunomius* 4](https://ccel.org/ccel/schaff/npnf208.all.html).

**Timeline**

- c. fourth century: ℵ and B attest the shorter reading.
- fourth/fifth centuries: C, D, W and the Basilian quotation attest the longer reading.
- medieval period: the longer reading dominates the Byzantine tradition.
- 1516–1894: the longer reading enters the printed TR tradition and Scrivener's KJV base text.

**Cautions to publish**

- Do not list Chrysostom without an exact work and section; the earlier draft did not verify one.
- Do not claim the shorter text denies Jesus' firstborn status; Luke 2:7 reads “firstborn” across the mainstream textual tradition.
- Do not treat the disputed authorship of *Against Eunomius* 4 as if the quotation itself were uncertain.

**Entry sources:** [Willker Matthew apparatus](https://www.willker.de/wie/TCG/TC-Matthew.pdf); [Basilian text online](https://ccel.org/ccel/schaff/npnf208.all.html).

---

## 2. Matthew 5:22 — “Without a Cause”

**Metadata**

- `slug`: `matthew-5-22`
- `book`: `Matthew`
- `variantType`: `Short Omitted Phrase`
- `tags`: `Short omitted phrase`, `Majority Greek support`, `Patristic evidence`, `Versional split`, `Complex evidence`
- `lastVerified`: `2026-07-23`

**KJV:** “But I say unto you, That whosoever is angry with his brother without a cause shall be in danger of the judgment: and whosoever shall say to his brother, Raca, shall be in danger of the council: but whosoever shall say, Thou fool, shall be in danger of hell fire.”

**Disputed unit:** `εἰκῇ` (“without a cause”).

**Variant issue:** The phrase is present in the Byzantine majority and many versions but absent from P64/P67vid, the first hand of Sinaiticus, Vaticanus, and several early patristic citations. Jerome explicitly knew both forms and said the phrase was absent from the “true/authentic” copies known to him.

**Quick read:** The KJV phrase has very broad later Greek support and widespread versional support. The omission is nevertheless extremely early and geographically diverse. Patristic evidence is unusually valuable because Justin and Jerome preserve the shorter form, while other writers and traditions know the longer one.

**Support category:** `Majority Greek support; very early and explicit opposition`

**Snapshot**

- `support`: Byzantine majority; D, K, L, P, Δ, Θ, Σ, f1, f13, 33, 700, 892; Syriac and Coptic support; numerous later witnesses.
- `against`: P64/P67vid, ℵ*, B, 372, 1424mg, several Old Latin witnesses, the Vulgate, Justin, Clement, Origen, Basil, and Jerome's preferred copies.

**Greek evidence**

- `FOR_KJV` — `ℵc/mg D K L P Δ Θ Σ 0233 0287 f1 f13 33 700 892 Maj`. Confidence: `high`. Source: [Willker, Matthew](https://www.willker.de/wie/TCG/TC-Matthew.pdf).
- `AGAINST_KJV` — `P64/P67vid ℵ* B 372 1424mg 2737` plus other minuscules. `vid` must remain attached to the papyrus reading because the letters are damaged, although the omission is highly probable. Confidence: `high`. Source: [Willker, Matthew](https://www.willker.de/wie/TCG/TC-Matthew.pdf).
- `QUALIFICATION` — Do not place W in a simple directional row without preserving its apparatus state; published apparatuses record complexity/correction here. Confidence: `high`. Source: [Willker, Matthew](https://www.willker.de/wie/TCG/TC-Matthew.pdf).

**Ancient versions**

- `FOR_KJV` — much of the Old Latin tradition, Syriac traditions, Coptic, Armenian, Georgian, and Gothic include the phrase. Confidence: `high`. Source: [Willker, Matthew](https://www.willker.de/wie/TCG/TC-Matthew.pdf).
- `AGAINST_KJV` — Old Latin `aur`, the Vulgate, and Ethiopic evidence support omission. The Latin tradition is therefore split; never tag “Latin support” as though it were unanimous. Confidence: `high`. Source: [Willker, Matthew](https://www.willker.de/wie/TCG/TC-Matthew.pdf).

**Church father rows**

- `author`: `Justin Martyr`; `date`: `c. 155`; `workSection`: `First Apology 16.2`; `reading`: `AGAINST_KJV`; `relationship`: `close_quote`; `evidence`: Justin reproduces the anger saying without “without a cause”; `confidence`: `high` for the extant wording, `medium-high` for direct dependence on Matthew rather than a shared sayings tradition. Source: [Justin, *First Apology*](https://www.newadvent.org/fathers/0126.htm).
- `author`: `Jerome`; `date`: `c. 398`; `workSection`: `Commentary on Matthew 1, on Matthew 5:22`; `reading`: `AGAINST_KJV`; `relationship`: `manuscript_report`; `evidence`: Jerome states that “without a cause” is added in some copies and absent from the authentic copies; `confidence`: `high`. Source: [Willker's transcription/translation](https://www.willker.de/wie/TCG/TC-Matthew.pdf); see also [study of Jerome's Gospel text](https://theologicalstudies.net/wp-content/uploads/2022/08/68.4.5.pdf).

**Timeline**

- c. 155: Justin's form lacks the phrase.
- c. 200: P64/P67vid probably omits it.
- fourth century: ℵ* and B omit; D and other streams include.
- late fourth century: Jerome explicitly reports the split and prefers omission.
- medieval/printed period: the longer reading dominates Greek transmission and the TR.

**Cautions to publish**

- “Without a cause” narrows the saying, but the textual decision should not be framed as one side permitting sinful anger; other New Testament passages distinguish righteous anger and forbid sinful anger.
- Remove the earlier draft's unverified Cyprian and Chrysostom rows.
- Do not state that the Vulgate supports the KJV here; it omits the phrase.

**Entry sources:** [Willker Matthew apparatus](https://www.willker.de/wie/TCG/TC-Matthew.pdf); [Justin](https://www.newadvent.org/fathers/0126.htm); [Jerome study](https://theologicalstudies.net/wp-content/uploads/2022/08/68.4.5.pdf).

---

## 3. Matthew 5:44 — “Bless Them That Curse You”

**Metadata**

- `slug`: `matthew-5-44`
- `book`: `Matthew`
- `variantType`: `Short Omitted Phrase`
- `tags`: `Short omitted phrase`, `Majority Greek support`, `Patristic evidence`, `Latin support`, `Syriac support`, `Complex evidence`
- `lastVerified`: `2026-07-23`

**KJV:** “But I say unto you, Love your enemies, bless them that curse you, do good to them that hate you, and pray for them which despitefully use you, and persecute you;”

**Disputed units:** `εὐλογεῖτε τοὺς καταρωμένους ὑμᾶς` (“bless them that curse you”), `καλῶς ποιεῖτε τοῖς μισοῦσιν ὑμᾶς` (“do good to them that hate you”), and the longer object of “pray for” (“those who despitefully use you and persecute you”).

**Variant issue:** The KJV/TR has a fuller form resembling Luke 6:27–28. The shorter form retains “love your enemies and pray for those who persecute you.” Because early Christian writers sometimes combine Synoptic sayings or transmit catechetical forms, patristic verbal parallels must not automatically be counted as exact Matthew manuscripts.

**Quick read:** The full form is Byzantine and widely versional; the shorter form is attested by ℵ, B, early Syriac, Coptic, and several early fathers. The ease of harmonization to Luke is a major internal consideration, but it does not erase the broad and early circulation of the longer form.

**Support category:** `Broad majority/Byzantine support; strong early shorter tradition`

**Snapshot**

- `support`: D, L, W, Δ, Θ, Σ, 047, f13, 33, 700, 892, Maj; Latin, Peshitta/Harklean and other versions; early combined forms in Christian instruction.
- `against`: ℵ, B, f1, 22, 1192 and other witnesses; Syriac Sinaitic/Curetonian; Sahidic and Bohairic; Origen and Cyprian traditions.

**Greek evidence**

- `FOR_KJV` — `D L W Δ Θ Σ 047 f13 33 118S 372 700 892 2737 Maj`. Confidence: `high`. Source: [Willker, Matthew](https://www.willker.de/wie/TCG/TC-Matthew.pdf).
- `AGAINST_KJV` — `ℵ B f1 22 279 660* 1192 2786*` and additional witnesses read the shorter form. `C` is lacunose and must not be assigned. Confidence: `high`. Source: [Willker, Matthew](https://www.willker.de/wie/TCG/TC-Matthew.pdf).

**Ancient versions**

- `FOR_KJV` — much of the Latin tradition, Syriac Peshitta/Harklean/Palestinian, Maeotic-1, and Gothic support the fuller form. Confidence: `high`. Source: [Willker, Matthew](https://www.willker.de/wie/TCG/TC-Matthew.pdf).
- `AGAINST_KJV` — Old Latin `k`, Syriac Sinaitic and Curetonian, Sahidic, Bohairic, and Maeotic-2 support the shorter form. Confidence: `high`. Source: [Willker, Matthew](https://www.willker.de/wie/TCG/TC-Matthew.pdf).

**Church father rows**

- `author`: `Didache`; `date`: `late first or early second century`; `workSection`: `Didache 1.3`; `reading`: `RELATED_TO_KJV`; `relationship`: `parallel_tradition`; `evidence`: combines blessing those who curse with prayer/love for enemies, but it is not a secure verbatim citation of Matthew 5:44; `confidence`: `high`. Source: [Didache 1](https://www.newadvent.org/fathers/0714.htm).
- `author`: `Justin Martyr`; `date`: `c. 155`; `workSection`: `First Apology 15`; `reading`: `RELATED_TO_KJV`; `relationship`: `mixed_citation`; `evidence`: preserves a fuller combined form with love, blessing, and prayer language; `confidence`: `high` for the wording, `medium` for the exact Gospel source. Source: [Justin, *First Apology*](https://www.newadvent.org/fathers/0126.htm).
- `author`: `Athenagoras`; `date`: `c. 176–177`; `workSection`: `Plea for the Christians 11`; `reading`: `RELATED_TO_KJV`; `relationship`: `close_quote`; `evidence`: gives “Love your enemies; bless them that curse you; pray for them that persecute you”; `confidence`: `high` for the text, `medium-high` for relationship to the Synoptic saying. Source: [Athenagoras, *Plea* 11](https://www.newadvent.org/fathers/0205.htm).

**Timeline**

- late first/early second century: the Didache transmits a related fuller ethical form.
- second century: Justin and Athenagoras show fuller combined language.
- fourth century: ℵ and B have the shorter Matthew form; D and other major witnesses have the fuller form.
- medieval period: the fuller form predominates in Byzantine Greek and enters the TR.

**Cautions to publish**

- Do not convert Didache, Justin, or Athenagoras into exact Greek-manuscript votes; the Synoptic and catechetical traditions overlap.
- Do not say the shorter text removes love, blessing, or prayer from Christian ethics; Luke 6:27–28 contains the fuller sequence.
- The earlier draft's Theophilus and Chrysostom claims were excluded because exact work/section evidence was not established.

**Entry sources:** [Willker Matthew apparatus](https://www.willker.de/wie/TCG/TC-Matthew.pdf); [Didache](https://www.newadvent.org/fathers/0714.htm); [Justin](https://www.newadvent.org/fathers/0126.htm); [Athenagoras](https://www.newadvent.org/fathers/0205.htm).

---

## 4. Matthew 19:16–17 — “Why Callest Thou Me Good?”

**Metadata**

- `slug`: `matthew-19-16-17`
- `book`: `Matthew`
- `variantType`: `Doctrinal Variant`
- `tags`: `Doctrinal variant`, `Multiple subunits`, `Majority Greek support`, `Patristic evidence`, `Syriac evidence`, `Complex evidence`
- `lastVerified`: `2026-07-23`

**KJV:** “And, behold, one came and said unto him, Good Master, what good thing shall I do, that I may have eternal life? And he said unto him, Why callest thou me good? there is none good but one, that is, God: but if thou wilt enter into life, keep the commandments.”

**Disputed units:**

1. Verse 16: `διδάσκαλε ἀγαθέ` (“Good Master/Teacher”) versus `διδάσκαλε` with “what good thing.”
2. Verse 17: `τί με λέγεις ἀγαθόν; οὐδεὶς ἀγαθὸς εἰ μὴ εἷς, ὁ θεός` (“Why callest thou me good? None is good but one, God”) versus `τί με ἐρωτᾷς περὶ τοῦ ἀγαθοῦ; εἷς ἐστιν ὁ ἀγαθός` (“Why do you ask me about what is good? One is good”).

**Variant issue:** The KJV form agrees closely with Mark 10:17–18 and Luke 18:18–19; the critical Matthew form is distinctive. The two verses must be modeled as linked but separately attested subunits. Some patristic quotations mix forms, so a single “father supports KJV” label can be misleading.

**Quick read:** The KJV wording is broadly Byzantine and has significant patristic/versional support. The critical form is supported by ℵ, B, D, L and early versions. Synoptic harmonization offers a straightforward reason for expanding Matthew toward Mark/Luke, while the KJV tradition is too broad to dismiss as a modern anomaly.

**Support category:** `Byzantine majority with major early Greek opposition`

**Snapshot**

- `support`: C, K, W, Δ, f13, 33 and Maj support the traditional complex, with Latin/Syriac and patristic support.
- `against`: ℵ, B, D, L and f1 support the distinctively Matthean critical form; exact witness alignment differs between vv. 16 and 17.

**Greek evidence**

- `VERSE_16_FOR_KJV` — `C K W Δ Θ f13 28 33 118 372 565 579 700 892mg 1071 1241 2737 Maj`. Confidence: `high`. Source: [Willker, Matthew](https://www.willker.de/wie/TCG/TC-Matthew.pdf).
- `VERSE_16_AGAINST_KJV` — `ℵ B D L f1 22 892*` and a small additional group. Confidence: `high`. Source: [Willker, Matthew](https://www.willker.de/wie/TCG/TC-Matthew.pdf).
- `VERSE_17_FOR_KJV` — `C K W Δ f13 28 33 118 372 565 1071 1241 1424 2737 Maj`. Confidence: `high`. Source: [Willker, Matthew](https://www.willker.de/wie/TCG/TC-Matthew.pdf).
- `VERSE_17_AGAINST_KJV` — `ℵ B C1 D L Θ f1 22 700 892* 1192* 1424mg` and a small additional group. Confidence: `high`. Source: [Willker, Matthew](https://www.willker.de/wie/TCG/TC-Matthew.pdf).

**Ancient versions**

- `FOR_KJV_OR_MIXED_TRADITIONAL` — Latin, Syriac Peshitta/Harklean, and several other versions support traditional elements, but individual version witnesses can vary between the two subunits. Confidence: `high`. Source: [Willker, Matthew](https://www.willker.de/wie/TCG/TC-Matthew.pdf).
- `AGAINST_KJV` — Old Latin and the Syriac Sinaitic/Curetonian traditions supply important support to the critical wording in one or both subunits; Coptic, Armenian, Georgian, and Ethiopic evidence also favors it in v. 17. Confidence: `high`. Source: [Willker, Matthew](https://www.willker.de/wie/TCG/TC-Matthew.pdf).

**Church father rows**

- `author`: `Justin Martyr`; `date`: `mid-second century`; `workSection`: `First Apology 16`; `reading`: `FOR_TRADITIONAL_CORE`; `relationship`: `close_quote`; `evidence`: has “Good Master” and “None is good but God only”; `confidence`: `high` for the wording, `medium-high` for direct Matthew dependence because the saying also occurs in Mark/Luke. Source: [Justin, *First Apology*](https://www.newadvent.org/fathers/0126.htm).
- `author`: `Justin Martyr`; `date`: `mid-second century`; `workSection`: `Dialogue with Trypho 101`; `reading`: `MIXED`; `relationship`: `mixed_citation`; `evidence`: addresses Jesus as “Good Master” and gives “Why do you call me good? One is good, my Father in heaven,” a form not identical to either full Greek endpoint; `confidence`: `high`. Source: [Justin, *Dialogue* 101](https://www.newadvent.org/fathers/01287.htm).
- `author`: `Origen`; `date`: `early third century`; `workSection`: `multiple citations summarized in the Matthew apparatus`; `reading`: `MIXED`; `relationship`: `mixed_citation`; `evidence`: Origen is attested on both sides and must not be entered as a single-direction witness; `confidence`: `high` for the mixed apparatus classification. Source: [Willker, Matthew](https://www.willker.de/wie/TCG/TC-Matthew.pdf).

**Timeline**

- mid-second century: Justin knows traditional and mixed forms.
- third century: Origen's evidence is mixed.
- fourth/fifth centuries: ℵ/B/D/L support the distinctive Matthew form; C/W and others support the traditional form.
- medieval period: the traditional form dominates Byzantine Greek and enters the TR.

**Cautions to publish**

- Keep verse 16 and verse 17 evidence separate in the data even if displayed on one page.
- Do not claim the critical form was created to reduce Christ's goodness; it retains “one is good,” and the Mark/Luke form is undisputed elsewhere.
- A father's quotation of the saying may derive from Mark or Luke; relationship labels are therefore essential.

**Entry sources:** [Willker Matthew apparatus](https://www.willker.de/wie/TCG/TC-Matthew.pdf); [Justin, *First Apology*](https://www.newadvent.org/fathers/0126.htm); [Justin, *Dialogue*](https://www.newadvent.org/fathers/01287.htm).

---

## 5. Matthew 27:35 — “That It Might Be Fulfilled”

**Metadata**

- `slug`: `matthew-27-35`
- `book`: `Matthew`
- `variantType`: `Prophecy Fulfillment`
- `tags`: `Short omitted phrase`, `Prophecy fulfillment`, `Not majority Greek support`, `Latin support`, `Patristic evidence`, `Complex evidence`
- `lastVerified`: `2026-07-23`

**KJV:** “And they crucified him, and parted his garments, casting lots: that it might be fulfilled which was spoken by the prophet, They parted my garments among them, and upon my vesture did they cast lots.”

**Disputed unit:** `ἵνα πληρωθῇ τὸ ῥηθὲν ὑπὸ τοῦ προφήτου· διεμερίσαντο τὰ ἱμάτιά μου ἑαυτοῖς, καὶ ἐπὶ τὸν ἱματισμόν μου ἔβαλον κλῆρον` (“that it might be fulfilled ... they cast lots”), a quotation of Psalm 22:18.

**Variant issue:** The fulfillment clause is absent from the overwhelming majority of Greek manuscripts and from the critical and Byzantine majority editions. It appears in a small, diverse Greek group, some Latin/Syriac witnesses, and Eusebius. John 19:24 explicitly quotes the same Psalm and is the most obvious source of assimilation.

**Quick read:** This is not a majority-Greek reading. Its strongest case is early/diverse secondary support: D, Θ, Φ, family witnesses, Old Latin/Clementine Vulgate, Syriac Harklean, and Eusebius. The competing explanation—harmonization from John 19:24—is direct and strong.

**Support category:** `Limited Greek support with versional and patristic attestation`

**Snapshot**

- `support`: D, Θ, Φ, 0233, 0250, f1, portions of f13, several minuscules; Old Latin and Clementine Vulgate; Syriac Harklean; Eusebius.
- `against`: the remaining overwhelming Greek tradition, including the Byzantine majority; several Old Latin witnesses and modern Vulgate editions.

**Greek evidence**

- `FOR_KJV` — `D Θ Φ 0233 0250 f1 652 f13-part 2c 22 372 517 954 1071 1243 1424 1675 2737` and some others. Within f13, `174` and `828` omit, while `983` relocates the clause after v. 36. Confidence: `high`. Source: [Willker, Matthew](https://www.willker.de/wie/TCG/TC-Matthew.pdf).
- `AGAINST_KJV` — the overwhelming remainder of the Greek tradition, including `Maj/Byz`; `C` is lacunose and must not be assigned. Confidence: `high`. Source: [Willker, Matthew](https://www.willker.de/wie/TCG/TC-Matthew.pdf).

**Ancient versions**

- `FOR_KJV` — Old Latin `a aur b c h q`, Clementine Vulgate, Syriac Harklean, some Palestinian Syriac, Armenian, Georgian, and Maeotic-1. Confidence: `high`. Source: [Willker, Matthew](https://www.willker.de/wie/TCG/TC-Matthew.pdf).
- `AGAINST_KJV` — Old Latin `d f ff1 ff2 g1 l` and the Stuttgart Vulgate text omit; Syriac Curetonian is lacunose and must not be counted. Confidence: `high`. Source: [Willker, Matthew](https://www.willker.de/wie/TCG/TC-Matthew.pdf).

**Church father rows**

- `author`: `Eusebius of Caesarea`; `date`: `early fourth century`; `workSection`: `Demonstratio Evangelica 10.8`; `reading`: `FOR_KJV`; `relationship`: `explicit_quote`; `evidence`: after citing John 19, Eusebius gives Matthew with the fulfillment clause; `confidence`: `high`. Source: [Willker's transcription and discussion](https://www.willker.de/wie/TCG/TC-Matthew.pdf).

**Timeline**

- fourth/fifth centuries: D and Eusebius attest the clause; major Greek witnesses otherwise omit.
- medieval period: the clause remains a small Greek minority and is unstable in parts of f13.
- early printed period: the clause enters the TR/KJV line despite lacking majority support.

**Cautions to publish**

- Correct the earlier draft: the supporting uncial is `Φ`, not `Δ`.
- Do not label the reading “majority Greek support.”
- Psalm 22:18 remains explicitly quoted at John 19:24 in all mainstream textual traditions; the prophecy is not lost when the Matthew clause is omitted.

**Entry sources:** [Willker Matthew apparatus](https://www.willker.de/wie/TCG/TC-Matthew.pdf).

---

## 6. Mark 1:2 — “As It Is Written in the Prophets”

**Metadata**

- `slug`: `mark-1-2`
- `book`: `Mark`
- `variantType`: `Attribution Variant`
- `tags`: `Attribution variant`, `Majority Greek support`, `Patristic evidence`, `Syriac evidence`, `Complex evidence`
- `lastVerified`: `2026-07-23`

**KJV:** “As it is written in the prophets, Behold, I send my messenger before thy face, which shall prepare thy way before thee.”

**Disputed unit:** `ἐν τοῖς προφήταις` (“in the prophets”) versus `ἐν τῷ Ἠσαΐᾳ τῷ προφήτῃ` (“in Isaiah the prophet”).

**Variant issue:** Mark's following quotation combines Malachi 3:1 and Isaiah 40:3. The specific attribution to Isaiah is earlier and more diverse in extant evidence; the general “in the prophets” avoids the apparent attribution difficulty and dominates the later Byzantine tradition.

**Quick read:** The KJV reading is the Greek majority reading but is absent from the strongest early Greek group. Origen repeatedly cites the Isaiah form, and Jerome knew the attribution problem. The natural scribal motive runs toward replacing “Isaiah” with the safer “prophets.”

**Support category:** `Majority/Byzantine support; strong early and patristic opposition`

**Snapshot**

- `support`: A, P, W, f13, 28, 579, 1342, 1424, 2542, Maj; Syriac Harklean; some versional/patristic evidence.
- `against`: ℵ, B, D, L, Δ, Θ, f1, 33, 565, 700, 892, 1071, 1241; Latin, Syriac Peshitta/Palestinian; Origen, Eusebius, Jerome, Basil and others.

**Greek evidence**

- `FOR_KJV` — `A P W f13 28 579 1342 1424 2542 Maj`. Confidence: `high`. Source: [Willker, Mark](https://www.willker.de/wie/TCG/TC-Mark.pdf).
- `AGAINST_KJV` — `ℵ B D L Δ Θ f1 22 33 565 700 892 1071 1241` plus additional witnesses read “in Isaiah the prophet.” `C` is lacunose. Confidence: `high`. Source: [Willker, Mark](https://www.willker.de/wie/TCG/TC-Mark.pdf).

**Ancient versions**

- `FOR_KJV` — Syriac Harklean and a Bohairic strand support “prophets”; a Vulgate manuscript is also cited for it. Confidence: `high`. Source: [Willker, Mark](https://www.willker.de/wie/TCG/TC-Mark.pdf).
- `AGAINST_KJV` — broad Latin, Syriac Peshitta and Palestinian, Sahidic/Bohairic, Armenian, Georgian, and Gothic evidence supports “Isaiah.” Confidence: `high`. Source: [Willker, Mark](https://www.willker.de/wie/TCG/TC-Mark.pdf).

**Church father rows**

- `author`: `Origen`; `date`: `early third century`; `workSection`: `multiple citations collated in the Mark apparatus`; `reading`: `AGAINST_KJV`; `relationship`: `explicit_quote`; `evidence`: Origen repeatedly gives the Isaiah attribution; `confidence`: `high`. Source: [Willker, Mark](https://www.willker.de/wie/TCG/TC-Mark.pdf).
- `author`: `Jerome`; `date`: `late fourth century`; `workSection`: `Commentary on Matthew, preface/discussion of evangelist citations`; `reading`: `AGAINST_KJV`; `relationship`: `manuscript_report`; `evidence`: Jerome discusses the composite citation and the possibility of scribal alteration around the name Isaiah; `confidence`: `high` for his knowledge of the variant. Source: [Willker, Mark](https://www.willker.de/wie/TCG/TC-Mark.pdf).

**Timeline**

- early third century: Origen repeatedly knows “Isaiah.”
- fourth century: ℵ and B read “Isaiah”; A and W support “the prophets.”
- medieval period: “the prophets” becomes the Byzantine majority reading.
- printed TR/KJV: adopts “the prophets.”

**Cautions to publish**

- Do not count GA 2427. It is a modern forgery and has no place in a genuine manuscript-evidence row.
- “Isaiah” can function as the heading attribution for a composite prophetic citation; do not present the variant as proof that Mark or a scribe was ignorant.
- The category should be `Attribution Variant`, not `Doctrinal Variant`.

**Entry sources:** [Willker Mark apparatus](https://www.willker.de/wie/TCG/TC-Mark.pdf).

---

## 7. Mark 10:24 — “Them That Trust in Riches”

**Metadata**

- `slug`: `mark-10-24`
- `book`: `Mark`
- `variantType`: `Short Omitted Phrase`
- `tags`: `Short omitted phrase`, `Majority Greek support`, `Patristic evidence`, `Latin support`, `Syriac support`, `Complex evidence`
- `lastVerified`: `2026-07-23`

**KJV:** “And the disciples were astonished at his words. But Jesus answereth again, and saith unto them, Children, how hard is it for them that trust in riches to enter into the kingdom of God!”

**Disputed unit:** `τοὺς πεποιθότας ἐπὶ χρήμασιν` (“for them that trust in riches”).

**Variant issue:** The longer text narrows the difficulty to those who trust in wealth. The shorter text reads simply, “How difficult it is to enter the kingdom of God.” The immediate context already concerns riches, giving scribes a plausible reason either to clarify the shorter line or to lose a qualifying phrase.

**Quick read:** The KJV phrase has broad Greek, Latin, Syriac, and early patristic support. The shorter form is attested by ℵ, B, Δ, the first hand of Ψ, the Old Latin `k`, and Coptic. This is a majority reading with meaningful early opposition.

**Support category:** `Broad majority/Byzantine and versional support`

**Snapshot**

- `support`: A, C, D, X, Θ, Ψc, f1, f13, 579, 892, 1342, Maj; Latin, Syriac, Bohairic, Gothic; Clement.
- `against`: ℵ, B, Δ, Ψ*, 1463, Old Latin `k`, Sahidic and part of Bohairic.

**Greek evidence**

- `FOR_KJV` — `A C D X Θ Ψc f1 f13 579 892 1342 Maj`. Confidence: `high`. Source: [Willker, Mark](https://www.willker.de/wie/TCG/TC-Mark.pdf).
- `AGAINST_KJV` — `ℵ B Δ Ψ* 1463`; `L` and `33` are lacunose. Confidence: `high`. Source: [Willker, Mark](https://www.willker.de/wie/TCG/TC-Mark.pdf).
- `OTHER` — W has a distinctive paraphrase referring to the rich entering the kingdom; do not force it into either exact reading. Confidence: `high`. Source: [Willker, Mark](https://www.willker.de/wie/TCG/TC-Mark.pdf).

**Ancient versions**

- `FOR_KJV` — broad Latin, Syriac, a Bohairic strand, and Gothic support the qualifying phrase. Confidence: `high`. Source: [Willker, Mark](https://www.willker.de/wie/TCG/TC-Mark.pdf).
- `AGAINST_KJV` — Old Latin `k`, Sahidic, and a Bohairic strand support the shorter form. Confidence: `high`. Source: [Willker, Mark](https://www.willker.de/wie/TCG/TC-Mark.pdf).

**Church father rows**

- `author`: `Clement of Alexandria`; `date`: `late second century`; `workSection`: `Who Is the Rich Man That Shall Be Saved? 4.9`; `reading`: `FOR_KJV`; `relationship`: `explicit_quote`; `evidence`: Clement's extended treatment quotes the qualification about trusting in riches; `confidence`: `high`. Source: [Clement, *Who Is the Rich Man?*](https://www.newadvent.org/fathers/0207.htm); section identification corroborated in [this scholarly study](https://repozytorium.kul.pl/server/api/core/bitstreams/b558006f-0caf-48e5-ac3c-3193fb04e162/content).

**Timeline**

- late second century: Clement explicitly knows the longer reading.
- fourth/fifth centuries: ℵ/B support the shorter form; A/C/D support the longer.
- medieval period: the longer form dominates Byzantine Greek.
- printed TR/KJV: retains the longer reading.

**Cautions to publish**

- The shorter reading does not remove the context of wealth; vv. 22–25 still frame the saying.
- Do not add Ephrem as a father row without an exact Diatessaron section and recoverable wording.
- A concise modern translation note can be linked for readers, but it does not replace the apparatus. See [NET note](https://classic.net.bible.org/verse.php?book=Mar&chapter=10&tab=commentaries&verse=24).

**Entry sources:** [Willker Mark apparatus](https://www.willker.de/wie/TCG/TC-Mark.pdf); [Clement](https://www.newadvent.org/fathers/0207.htm); [NET note](https://classic.net.bible.org/verse.php?book=Mar&chapter=10&tab=commentaries&verse=24).

---

## 8. Luke 2:14 — “Good Will Toward Men”

**Metadata**

- `slug`: `luke-2-14`
- `book`: `Luke`
- `variantType`: `Grammatical Variant`
- `tags`: `One-letter variant`, `Majority Greek support`, `Patristic evidence`, `Latin evidence`, `Syriac evidence`, `Complex evidence`
- `lastVerified`: `2026-07-23`

**KJV:** “Glory to God in the highest, and on earth peace, good will toward men.”

**Disputed unit:** `εὐδοκία` (nominative, “good will”) versus `εὐδοκίας` (genitive, “of good pleasure/favor”). The difference in the manuscripts is a final sigma.

**Variant issue:** The nominative permits “peace, goodwill toward men.” The genitive construes peace as among people of divine favor. The genitive is supported by the first hands of ℵ and Bvid, A, D, and W; the nominative is the later Greek majority reading and is supported by correctors and much Eastern versional evidence.

**Quick read:** This is a small physical variant with a real translational effect. The KJV form is the majority Greek reading, but the genitive has a strong early uncial and Latin case. Patristic evidence is mixed and should not be oversimplified.

**Support category:** `Majority Greek support; strong early genitive opposition`

**Snapshot**

- `support`: ℵc, Bc, Cc, K, L, Δ, Θ, Ξ, Ψ, f1, f13, 579, 700, 892, 1241, Maj; Syriac and Bohairic support; Eusebius.
- `against`: ℵ*, A, B*vid, D, W, 23; Latin, Sahidic, Gothic; Irenaeus in Latin; part of Origen's evidence.

**Greek evidence**

- `FOR_KJV` — `ℵc Bc Cc K L Δ Θ Ξ Ψ f1 f13 579 700 892 1241 Maj` read the nominative `εὐδοκία`. Confidence: `high`. Source: [Willker, Luke](https://www.willker.de/wie/TCG/TC-Luke.pdf).
- `AGAINST_KJV` — `ℵ* A B*vid D W 23` read the genitive `εὐδοκίας`. Preserve `vid` for B because the final sigma is faint. Confidence: `high`. Source: [Willker, Luke](https://www.willker.de/wie/TCG/TC-Luke.pdf).

**Ancient versions**

- `FOR_KJV` — Syriac traditions and a Bohairic strand support the nominative sense. Confidence: `high`. Source: [Willker, Luke](https://www.willker.de/wie/TCG/TC-Luke.pdf).
- `AGAINST_KJV` — the Latin tradition, including Vulgate `hominibus bonae voluntatis`, Sahidic, and Gothic support the genitive sense; Bohairic evidence is divided. Confidence: `high`. Source: [Willker, Luke](https://www.willker.de/wie/TCG/TC-Luke.pdf).

**Church father rows**

- `noneToPublish`: Patristic apparatus data is mixed (Origen is cited on more than one side, with Eusebius for the nominative), but no exact work-and-section row was needed to establish the entry. Excluding an imprecise father row is more accurate than turning an apparatus name into a quotation.

**Timeline**

- fourth/fifth centuries: first hands of ℵ and Bvid plus A/D/W support the genitive; correctors and other major witnesses support the nominative.
- later Greek transmission: nominative `εὐδοκία` becomes the Byzantine majority form.
- Latin transmission: the genitive sense remains standard.
- printed TR/KJV: nominative “good will toward men.”

**Cautions to publish**

- “One Greek letter” describes the manuscript difference, not a trivial difference in sense.
- Do not claim unanimity for either early manuscripts or ancient versions.
- English versions may render the genitive idiom differently (“those with whom he is pleased,” “people of good will,” etc.); these are translation decisions, not additional Greek readings.

**Entry sources:** [Willker Luke apparatus](https://www.willker.de/wie/TCG/TC-Luke.pdf); [SBLGNT/KJV/NIV/NKJV comparison](https://www.biblegateway.com/passage/?search=Luke+2%3A14&version=SBLGNT%3BKJV%3BNIV%3BNKJV).

---

## 9. Luke 2:33 — “Joseph and His Mother”

**Metadata**

- `slug`: `luke-2-33`
- `book`: `Luke`
- `variantType`: `Noun Substitution`
- `tags`: `Doctrinally discussed variant`, `Majority Greek support`, `Latin evidence`, `Syriac evidence`, `Complex evidence`
- `lastVerified`: `2026-07-23`

**KJV:** “And Joseph and his mother marvelled at those things which were spoken of him.”

**Disputed unit:** `Ἰωσὴφ καὶ ἡ μήτηρ αὐτοῦ` (“Joseph and his mother”) versus `ὁ πατὴρ αὐτοῦ καὶ ἡ μήτηρ` (“his father and mother”).

**Variant issue:** The KJV/TR identifies Joseph by name; the critical form calls him Jesus' father in the ordinary social/familial sense. Luke 2:48 calls Joseph “thy father” in all mainstream textual forms, so the critical wording here does not create a concept otherwise absent from Luke.

**Quick read:** “Joseph and his mother” is the Byzantine majority form with meaningful Old Latin/Syriac support. “His father and mother” is supported by ℵ, B, D, L, W and early versions. A scribal desire to avoid calling Joseph Jesus' father is a plausible motive for the traditional form.

**Support category:** `Majority Greek support; strong early opposition`

**Snapshot**

- `support`: A, N, Ξ, Θ, Ψ, f13, 892, Maj; Old Latin, some Vulgate manuscripts, Peshitta/Harklean, and Bohairic witnesses.
- `against`: ℵ, B, D, L, W, f1, 700, 1241; Vulgate, Syriac Sinaitic, Sahidic, a Bohairic strand, and Origen in Latin transmission.

**Greek evidence**

- `FOR_KJV` — `A N Ξ Θ Ψ f13 892 Maj`. Confidence: `high`. Source: [Willker, Luke](https://www.willker.de/wie/TCG/TC-Luke.pdf).
- `AGAINST_KJV` — `ℵ B D L W f1 700 1241`. Confidence: `high`. Source: [Willker, Luke](https://www.willker.de/wie/TCG/TC-Luke.pdf).

**Ancient versions**

- `FOR_KJV` — Old Latin, some Vulgate manuscripts, Syriac Peshitta/Harklean, and a Bohairic strand support “Joseph and his mother.” Confidence: `high`. Source: [Willker, Luke](https://www.willker.de/wie/TCG/TC-Luke.pdf).
- `AGAINST_KJV` — the main Vulgate line, Syriac Sinaitic, Sahidic, and another Bohairic strand support “his father and mother.” Confidence: `high`. Source: [Willker, Luke](https://www.willker.de/wie/TCG/TC-Luke.pdf).

**Church father rows**

- `noneToPublish`: The apparatus cites Origen through Latin transmission for the critical form, but the earlier draft did not establish a sufficiently exact work/section and original-language relationship for a standalone father row.

**Timeline**

- fourth/fifth centuries: ℵ/B/D/L/W support “father”; A and other witnesses support “Joseph.”
- medieval period: “Joseph and his mother” becomes the Byzantine majority form.
- printed TR/KJV: follows the traditional form.

**Cautions to publish**

- Do not say “father” denies the virgin birth. Luke 1:26–35 explicitly narrates the virginal conception, and Luke 2:48 uses “thy father” regardless of this variant.
- Remove unsupported witness names from the earlier draft; X, Δ, 053, 28, 565, and 1009 were not verified for the KJV row in the controlling apparatus.

**Entry sources:** [Willker Luke apparatus](https://www.willker.de/wie/TCG/TC-Luke.pdf).

---

## 10. Luke 4:4 — “By Every Word of God”

**Metadata**

- `slug`: `luke-4-4`
- `book`: `Luke`
- `variantType`: `Short Omitted Phrase`
- `tags`: `Short omitted phrase`, `Majority Greek support`, `Latin support`, `Syriac support`, `Synoptic parallel`, `Complex evidence`
- `lastVerified`: `2026-07-23`

**KJV:** “And Jesus answered him, saying, It is written, That man shall not live by bread alone, but by every word of God.”

**Disputed unit:** `ἀλλ᾽ ἐπὶ παντὶ ῥήματι θεοῦ` (“but by every word of God”).

**Variant issue:** The phrase completes the Deuteronomy 8:3 quotation and agrees with Matthew 4:4. The shorter Luke text ends after “bread alone.” Because Matthew supplies the exact phrase, harmonization is a natural explanation for expansion; because Deuteronomy itself contains the phrase, omission also leaves an abbreviated quotation.

**Quick read:** The full quotation is broadly Byzantine and versional. The shorter text is supported by ℵ, B, L, W, an f13 member, Syriac Sinaitic, and Coptic. The phrase is textually secure in Matthew 4:4 even if omitted from Luke.

**Support category:** `Majority/Byzantine and versional support; significant early opposition`

**Snapshot**

- `support`: A, D, Δ, Θ, Ψ, f1, most of f13, 33, 579, 700, 892, Maj; Latin, Peshitta/Harklean, Gothic, and Bohairic.
- `against`: ℵ, B, L, W, 788, 264, 1241; Syriac Sinaitic, Sahidic, and part of Bohairic.

**Greek evidence**

- `FOR_KJV` — `A D Δ Θ Ψ f1 f13-except-788 33 157 579 700 892 Maj`. Confidence: `high`. Source: [Willker, Luke](https://www.willker.de/wie/TCG/TC-Luke.pdf).
- `AGAINST_KJV` — `ℵ B L W 788 (= f13 member) 264 1241`. `C` and `Ξ` are lacunose. Confidence: `high`. Source: [Willker, Luke](https://www.willker.de/wie/TCG/TC-Luke.pdf).
- `OTHER` — `118 157 205 209 1071 1424` and a larger group expand still further toward the complete Deuteronomy wording. Keep this as a separate reading, not exact KJV support. Confidence: `high`. Source: [Willker, Luke](https://www.willker.de/wie/TCG/TC-Luke.pdf).

**Ancient versions**

- `FOR_KJV` — broad Latin, Syriac Peshitta/Harklean, a Bohairic strand, and Gothic support the phrase. Confidence: `high`. Source: [Willker, Luke](https://www.willker.de/wie/TCG/TC-Luke.pdf).
- `AGAINST_KJV` — Syriac Sinaitic, Sahidic, and a Bohairic strand support the shorter form. Confidence: `high`. Source: [Willker, Luke](https://www.willker.de/wie/TCG/TC-Luke.pdf).

**Church father rows**

- `noneToPublish`: Quotations of Matthew 4:4 or Deuteronomy 8:3 cannot safely be reassigned to Luke. No exact Luke-specific patristic row is required.

**Timeline**

- fourth/fifth centuries: ℵ/B/L/W support the shorter reading; A/D and other streams support the longer.
- medieval period: the longer form dominates Byzantine transmission.
- printed TR/KJV: retains the completed quotation.

**Cautions to publish**

- Do not count a father's quotation of the sentence as Luke unless the writer identifies Luke or the surrounding context proves it.
- Do not state that modern texts remove the doctrine; Matthew 4:4 and Deuteronomy 8:3 retain the full sentence.

**Entry sources:** [Willker Luke apparatus](https://www.willker.de/wie/TCG/TC-Luke.pdf).

---

## 11. Luke 24:6 — “He Is Not Here, but Is Risen”

**Metadata**

- `slug`: `luke-24-6`
- `book`: `Luke`
- `variantType`: `Western Omission`
- `tags`: `Short omitted phrase`, `Overwhelming Greek support`, `Scant Greek opposition`, `Resurrection`, `Latin support`, `Western text`
- `lastVerified`: `2026-07-23`

**KJV:** “He is not here, but is risen: remember how he spake unto you when he was yet in Galilee,”

**Disputed unit:** `οὐκ ἔστιν ὧδε, ἀλλ᾽ ἠγέρθη` (“He is not here, but is risen”).

**Variant issue:** The phrase was one of the classic “Western non-interpolations” because D and some Old Latin witnesses omit it. Unlike many entries in this package, only one known Greek manuscript in the principal apparatus—Codex D—supports omission. Modern critical editions restored the clause to the main text beginning with NA26.

**Quick read:** The KJV phrase has overwhelming Greek support, including P75, ℵ, A, and B. The omission is old and important as a Western-text phenomenon, but exceptionally narrow in surviving Greek evidence.

**Support category:** `Overwhelming Greek support; single principal Greek omission`

**Snapshot**

- `support`: P75, ℵ, A, B, the Greek majority, most versions, and current critical/majority/TR editions.
- `against`: D; part of the Old Latin tradition; some Armenian/Georgian evidence.

**Greek evidence**

- `FOR_KJV` — `P75 ℵ A B` and essentially all other extant Greek witnesses include the clause. `C*` includes it without `ἀλλά`; W has “rose” rather than “was raised,” which is a wording variant, not omission. Confidence: `high`. Source: [Willker, Luke](https://www.willker.de/wie/TCG/TC-Luke.pdf).
- `AGAINST_KJV` — `D` is the only principal Greek witness listed for omission. Confidence: `high`. Source: [Willker, Luke](https://www.willker.de/wie/TCG/TC-Luke.pdf).

**Ancient versions**

- `FOR_KJV` — Old Latin `aur f q` and the Vulgate include the clause, along with broad versional support. Confidence: `high`. Source: [Willker, Luke](https://www.willker.de/wie/TCG/TC-Luke.pdf).
- `AGAINST_KJV` — part of the Old Latin tradition, some Armenian manuscripts, and Georgian-II support omission. Confidence: `high`. Source: [Willker, Luke](https://www.willker.de/wie/TCG/TC-Luke.pdf).

**Church father rows**

- `noneToPublish`: Reconstructions of Marcion's Gospel are not direct surviving manuscripts and are too uncertain here for a clean father/version row.

**Timeline**

- early third century: P75 includes the clause.
- fourth century: ℵ, A, and B include it.
- fifth century: D omits it within the Western textual stream.
- 1881/NA25 era: some critical editions bracketed or omitted it under the “Western non-interpolation” theory.
- NA26 onward: modern critical editions restore it without brackets.

**Cautions to publish**

- Do not say “modern Bibles omit this verse.” Current critical Greek editions and mainstream modern translations include the sentence.
- Do not describe D as a majority or a group of Greek manuscripts.
- The resurrection is explicit throughout Luke 24 regardless, but here the KJV wording is also overwhelmingly attested.

**Entry sources:** [Willker Luke apparatus](https://www.willker.de/wie/TCG/TC-Luke.pdf).

---

## 12. John 3:13 — “Which Is in Heaven”

**Metadata**

- `slug`: `john-3-13`
- `book`: `John`
- `variantType`: `Short Omitted Phrase`
- `tags`: `Short omitted phrase`, `Doctrinal variant`, `Majority Greek support`, `Patristic support`, `Latin support`, `Syriac support`, `Complex evidence`
- `lastVerified`: `2026-07-23`

**KJV:** “And no man hath ascended up to heaven, but he that came down from heaven, even the Son of man which is in heaven.”

**Disputed unit:** `ὁ ὢν ἐν τῷ οὐρανῷ` (“who/which is in heaven”), with related ancient forms “who is from heaven” and “who was in heaven.”

**Variant issue:** The KJV phrase is broadly Byzantine, Latin, and Syriac and is quoted by early Latin writers. The earliest surviving Greek papyri P66 and P75 omit it, as do ℵ and B. Several alternative endings show that scribes encountered instability at this point.

**Quick read:** This is a majority-Greek reading with strong early patristic and versional attestation, but the earliest surviving Greek manuscript evidence is firmly short. The longer form has a meaningful early case; it cannot accurately be called the reading of the earliest extant Greek copies.

**Support category:** `Majority Greek and early patristic support; earliest Greek papyri oppose`

**Snapshot**

- `support`: A, N, Δ, Θ, Ψ, 050, f1, f13, 565, 579, 892, 1071, Maj; Latin, Peshitta/Harklean/Palestinian Syriac; Hippolytus and Novatian.
- `against`: P66, P75, ℵ, B, L, T, Ws, 083, 086, 33, 1010, 1241, 1293; Coptic and Eusebius.

**Greek evidence**

- `FOR_KJV` — `A N Δ Θ Ψ 050 f1 f13 565 579 892 1071 Maj`. `A*` lacks the participle “being” and `Ac` supplies the exact longer form; preserve this distinction. Confidence: `high`. Source: [Willker, John](https://www.willker.de/wie/TCG/TC-John.pdf).
- `AGAINST_KJV` — `P66 P75 ℵ B L T Ws 083 086 33 1010 1241 1293` and a small additional group omit the phrase. `C`, `D`, and `Ξ` are lacunose. Confidence: `high`. Source: [Willker, John](https://www.willker.de/wie/TCG/TC-John.pdf).
- `OTHER` — `0141`, `397`, and others have “who is from heaven”; Old Latin `e` and Syriac Curetonian have “who was in heaven.” Confidence: `high`. Source: [Willker, John](https://www.willker.de/wie/TCG/TC-John.pdf).

**Ancient versions**

- `FOR_KJV` — broad Old Latin/Vulgate, Syriac Peshitta/Harklean/Palestinian, and a Bohairic strand support the phrase. Confidence: `high`. Source: [Willker, John](https://www.willker.de/wie/TCG/TC-John.pdf).
- `AGAINST_KJV` — Sahidic and a Bohairic strand support omission. The Syriac Curetonian's “was in heaven” belongs under `OTHER`, not exact KJV support. Confidence: `high`. Source: [Willker, John](https://www.willker.de/wie/TCG/TC-John.pdf).

**Church father rows**

- `author`: `Hippolytus`; `date`: `early third century`; `workSection`: `Against Noetus 4`; `reading`: `FOR_KJV`; `relationship`: `explicit_quote`; `evidence`: quotes and interprets the Son of Man as simultaneously being in heaven; `confidence`: `high`. Source: [Hippolytus, *Against Noetus* 4](https://www.newadvent.org/fathers/0521.htm).
- `author`: `Novatian`; `date`: `mid-third century`; `workSection`: `On the Trinity 13`; `reading`: `FOR_KJV`; `relationship`: `explicit_quote`; `evidence`: quotes “the Son of man who is in heaven” in an argument about Christ; `confidence`: `high`. Source: [Novatian, *On the Trinity* 13](https://www.newadvent.org/fathers/0511.htm).

**Timeline**

- c. 200–early third century: P66 and P75 omit; Hippolytus and Novatian know the longer form.
- fourth century: ℵ and B omit; the longer form circulates in other streams.
- fifth century: A supports the longer form with a correction detail.
- medieval period: the longer form predominates in Byzantine Greek.
- printed TR/KJV: includes the phrase; modern critical editions omit it.

**Cautions to publish**

- Do not turn early patristic quotations into claims about a surviving second- or third-century Greek Gospel manuscript.
- The doctrine of Christ's heavenly origin is explicit elsewhere in John; the variant affects this particular expression, not whether John presents Jesus as coming from heaven.
- See the concise [NET textual note](https://classic.net.bible.org/verse.php?book=Joh&chapter=3&tab=commentaries&theme=false&verse=13) for reader-facing comparison.

**Entry sources:** [Willker John apparatus](https://www.willker.de/wie/TCG/TC-John.pdf); [Hippolytus](https://www.newadvent.org/fathers/0521.htm); [Novatian](https://www.newadvent.org/fathers/0511.htm); [NET note](https://classic.net.bible.org/verse.php?book=Joh&chapter=3&tab=commentaries&theme=false&verse=13).

---

## 13. Acts 20:28 — “The Church of God … His Own Blood”

**Metadata**

- `slug`: `acts-20-28`
- `book`: `Acts`
- `variantType`: `Intermediate Reading`
- `tags`: `Doctrinal variant`, `Three-reading variation`, `Patristic evidence`, `Latin evidence`, `Syriac evidence`, `Complex evidence`
- `lastVerified`: `2026-07-23`

**KJV:** “Take heed therefore unto yourselves, and to all the flock, over the which the Holy Ghost hath made you overseers, to feed the church of God, which he hath purchased with his own blood.”

**Disputed units:**

1. `τοῦ θεοῦ` (“of God”) versus `τοῦ κυρίου` (“of the Lord”) versus the Byzantine conflation `τοῦ κυρίου καὶ θεοῦ` (“of the Lord and God”).
2. TR `διὰ τοῦ ἰδίου αἵματος` (“with his own blood”) versus critical `διὰ τοῦ αἵματος τοῦ ἰδίου` (“through the blood of his own [one]”). The latter can be construed as “the blood of his own Son,” though “his own blood” remains grammatically possible and is used by several translations.

**Variant issue:** The KJV's “God” is supported by ℵ and B and is the current critical reading; “Lord” has P74, A, C*, D, and E; the later Byzantine tradition combines both. The word-order variant around `ἴδιος` affects whether readers hear a possessive adjective modifying “blood” or a substantival “his own [one].”

**Quick read:** This is not a simple TR-versus-critical case: the KJV agrees with the modern critical text on “God,” while the Byzantine majority has “Lord and God.” The early evidence is genuinely three-way. The KJV word order differs from the critical order.

**Support category:** `Early critical support for KJV noun; Byzantine conflation; secondary word-order issue`

**Snapshot**

- `support`: ℵ, B and a substantial minuscule group support “church of God”; Vulgate and Syriac evidence also support it.
- `against`: P74, A, C*, D, E, Ψ, 33, 1739 support “church of the Lord”; later Byzantine witnesses support “Lord and God.”

**Greek evidence**

- `FOR_KJV_GOD` — `ℵ B 056 0142 4 104 218 312 424 459 614 629 917 1175 1505 1522 1758 1831 1877 2298 2414 2495` and others. Confidence: `high`. Source: NA28/UBS5 apparatus; concise list also in the [NET note](https://www.biblegateway.com/passage/?search=Acts+20%3A28&version=NET).
- `AGAINST_KJV_LORD` — `P74 A C* D E Ψ 33 36 453 945 1739 1891`. Confidence: `high`. Source: NA28/UBS5 apparatus; [NET note](https://www.biblegateway.com/passage/?search=Acts+20%3A28&version=NET).
- `OTHER_LORD_AND_GOD` — `C3 H L P 049 Byz` support the conflated Byzantine reading. Confidence: `high`. Source: NA28/UBS5 apparatus; compare the Greek editions collected at [BibleHub](https://biblehub.com/text/acts/20-28.htm).
- `WORD_ORDER` — Scrivener TR reads `διὰ τοῦ ἰδίου αἵματος`; the Nestle/Westcott-Hort line reads `διὰ τοῦ αἵματος τοῦ ἰδίου`; the Byzantine majority edition also has the TR order. Confidence: `high`. Source: [parallel Greek editions](https://biblehub.com/text/acts/20-28.htm).

**Ancient versions**

- `FOR_KJV_GOD` — Vulgate and Syriac Peshitta/Harklean support “God”; Bohairic evidence also supports it in the standard apparatus. Confidence: `high`. Source: [NET note](https://www.biblegateway.com/passage/?search=Acts+20%3A28&version=NET) and NA28/UBS5.
- `AGAINST_KJV_LORD` — Old Latin `gig`, Coptic strands, and Armenian evidence support “Lord.” Versional detail is not unanimous and should be stored per witness, not as one language-wide vote. Confidence: `high`. Source: NA28/UBS5.

**Church father rows**

- `author`: `Irenaeus`; `date`: `c. 180`; `workSection`: `Against Heresies 3.14.2`; `reading`: `AGAINST_KJV_LORD`; `relationship`: `explicit_quote`; `evidence`: the Latin-preserved text quotes “the Church of the Lord”; `confidence`: `high` for the transmitted Latin wording, `medium` for reconstructing Irenaeus's underlying Greek. Source: [Irenaeus, *Against Heresies* 3.14.2](https://www.newadvent.org/fathers/0103314.htm).
- `author`: `Ignatius of Antioch`; `date`: `early second century`; `workSection`: `Letter to the Ephesians 1`; `reading`: `RELATED_ONLY`; `relationship`: `theological_parallel`; `evidence`: uses “blood of God,” showing early Christian use of that expression but not quoting Acts 20:28; `confidence`: `high`. Source: [Ignatius, *Ephesians* 1](https://www.andrews.edu/~toews/classes/sources/early/Ignatius%20Ephesians.htm).

**Timeline**

- early second century: Ignatius uses the theological phrase “blood of God,” but not as an Acts quotation.
- c. 180: Irenaeus's Latin-preserved quotation has “Church of the Lord.”
- third century: P74 supports “Lord.”
- fourth/fifth centuries: ℵ/B support “God”; A/C*/D/E support “Lord”; later corrections and Byzantine witnesses develop “Lord and God.”
- printed TR/KJV and modern critical editions: both read “God,” with different word order in the following phrase.

**Cautions to publish**

- Do not label the KJV noun as the Byzantine majority reading; it is not. Here KJV and NA28 agree against the Byzantine conflation.
- `τοῦ ἰδίου` may be substantival (“his own [Son]”), but that is an interpretation, not a separate manuscript reading.
- Ignatius is a theological parallel, not evidence that his copy of Acts read `θεοῦ`.

**Entry sources:** [NET/Acts 20:28 note](https://www.biblegateway.com/passage/?search=Acts+20%3A28&version=NET); [parallel Greek editions](https://biblehub.com/text/acts/20-28.htm); [Irenaeus](https://www.newadvent.org/fathers/0103314.htm); [Ignatius](https://www.andrews.edu/~toews/classes/sources/early/Ignatius%20Ephesians.htm); NA28 and UBS5 apparatuses.

---

## 14. Romans 14:10 — “The Judgment Seat of Christ”

**Metadata**

- `slug`: `romans-14-10`
- `book`: `Romans`
- `variantType`: `Noun Substitution`
- `tags`: `Doctrinally discussed variant`, `Majority Greek support`, `Patristic evidence`, `Latin split`, `Syriac support`, `Complex evidence`
- `lastVerified`: `2026-07-23`

**KJV:** “But why dost thou judge thy brother? or why dost thou set at nought thy brother? for we shall all stand before the judgment seat of Christ.”

**Disputed unit:** `τοῦ Χριστοῦ` (“of Christ”) versus `τοῦ θεοῦ` (“of God”).

**Variant issue:** “Christ” is the Byzantine majority/TR reading and agrees verbally with 2 Corinthians 5:10. “God” is supported by an early and diverse Greek group including ℵ*, A, B, C*, D, F, and G. Assimilation to the familiar phrase in 2 Corinthians is a plausible origin for “Christ,” but the theological referent is closely related in Paul's argument.

**Quick read:** The KJV reading has majority Greek and early patristic support, but “God” has the stronger early continuous-text Greek group and broad early Latin/Coptic support. Polycarp uses “judgment seat of Christ,” although his wording could reflect 2 Corinthians 5:10 rather than Romans 14:10.

**Support category:** `Majority Greek support; strong early “God” reading`

**Snapshot**

- `support`: ℵc, Cc, L, P, Ψ, 048, 0209, 33, 81 and Byz; Syriac and Gothic; Clementine Vulgate; Polycarp's parallel/citation.
- `against`: ℵ*, A, B, C*, D, F, G, 0150, 630, 1506, 1739, 1852, 2200; broad Old Latin, Stuttgart Vulgate, and Coptic.

**Greek evidence**

- `FOR_KJV` — `ℵc Ccvid L P Ψ 048 0209 6 33 81 88 104 181 Byz` and many later witnesses read “Christ.” Confidence: `high`. Source: NA28/UBS5 apparatus; compare [parallel Greek editions](https://biblehub.com/text/romans/14-10.htm).
- `AGAINST_KJV` — `ℵ* A B C* D F G 0150 630 1506 1739 1852 2200 l1178` read “God” (with a case/form variation in 0150). Confidence: `high`. Source: NA28/UBS5 apparatus.

**Ancient versions**

- `FOR_KJV` — Syriac Peshitta/Harklean, Gothic, some Latin witnesses, and the Clementine Vulgate support “Christ.” Confidence: `high`. Source: NA28/UBS5 apparatus.
- `AGAINST_KJV` — broad Old Latin, the Stuttgart Vulgate text, and Coptic support “God.” The Latin tradition is divided and must not be summarized as unanimous. Confidence: `high`. Source: NA28/UBS5 apparatus.

**Church father rows**

- `author`: `Polycarp of Smyrna`; `date`: `early-to-mid second century`; `workSection`: `Letter to the Philippians 6.2`; `reading`: `RELATED_TO_KJV`; `relationship`: `close_quote`; `evidence`: says “we must all stand before the judgment seat of Christ”; `confidence`: `high` for the wording, `medium` as evidence specifically for Romans 14:10 because 2 Corinthians 5:10 has the same expression. Source: [Polycarp, *Philippians*](https://en.wikisource.org/wiki/Ante-Nicene_Christian_Library/Epistle_of_Polycarp_to_the_Philippians).

**Timeline**

- early/mid-second century: Polycarp knows “judgment seat of Christ,” source verse uncertain.
- fourth/fifth centuries: ℵ*/A/B/C*/D support “God”; later correctors and Byzantine streams support “Christ.”
- medieval period: “Christ” dominates Byzantine Greek.
- printed TR/KJV: reads “Christ”; modern critical editions read “God.”

**Cautions to publish**

- Do not call Polycarp an unambiguous Romans manuscript witness; 2 Corinthians 5:10 is an equally plausible source.
- Do not frame “God” and “Christ” as two unrelated judgments. Paul elsewhere explicitly speaks of the judgment seat of Christ.
- Do not say the KJV has the earliest surviving continuous-text Greek support; the early codex group favors “God.”

**Entry sources:** [parallel Greek editions](https://biblehub.com/text/romans/14-10.htm); [Polycarp](https://en.wikisource.org/wiki/Ante-Nicene_Christian_Library/Epistle_of_Polycarp_to_the_Philippians); NA28 and UBS5 apparatuses.

---

## 15. 1 Corinthians 15:47 — “The Second Man Is the Lord from Heaven”

**Metadata**

- `slug`: `1-corinthians-15-47`
- `book`: `1 Corinthians`
- `variantType`: `Short Omitted Phrase`
- `tags`: `Short omitted phrase`, `Doctrinal variant`, `Majority Greek support`, `Patristic evidence`, `Papyri`, `Complex evidence`
- `lastVerified`: `2026-07-23`

**KJV:** “The first man is of the earth, earthy: the second man is the Lord from heaven.”

**Disputed unit:** `ὁ κύριος` (“the Lord”). A separate reading in P46 has `πνευματικός` (“spiritual”) and must not be described as the ordinary short text.

**Variant issue:** The KJV/TR/Byzantine text reads “the second man is the Lord from heaven.” The principal critical reading is “the second man is from heaven.” P46 is unique among the principal early witnesses in reading “the second spiritual man from heaven.” Tertullian quotes both a long form with “Lord” and a short form in different works.

**Quick read:** “The Lord” has broad Byzantine support and early Latin patristic attestation. The ordinary shorter reading has B, C, D*, F, G, and other important witnesses. The earliest papyrus cannot honestly be placed in that short row because it substitutes “spiritual” for “Lord.”

**Support category:** `Majority/Byzantine support; early Greek opposition; unique papyrus third reading`

**Snapshot**

- `support`: ℵc, A, Dc, K, P, Ψ, 81 and Byz; Tertullian in two works.
- `against`: ℵ*, B, C, D*, F, G, 0243, 33, 1739* read the ordinary short form.
- `other`: P46 reads “the second spiritual man from heaven”; 630 has a further abbreviated “the second, the Lord.”

**Greek evidence**

- `FOR_KJV` — `ℵc A Dc K P Ψ 81 104 181 326 330 436 451 614 629 1241 1739mg 1877 1881 1984 1985 2127 2492 2495 Byz Lect` read `ὁ δεύτερος ἄνθρωπος ὁ κύριος ἐξ οὐρανοῦ`. Confidence: `high`. Source: NA28/UBS5 apparatus; compare [parallel Greek editions](https://biblehub.com/text/1_corinthians/15-47.htm).
- `AGAINST_KJV` — `ℵ* B C D* F G 0243 33 1739*` read `ὁ δεύτερος ἄνθρωπος ἐξ οὐρανοῦ`. Confidence: `high`. Source: NA28/UBS5 apparatus.
- `OTHER_P46` — `P46` reads `ὁ δεύτερος ἄνθρωπος πνευματικὸς ἐξ οὐρανοῦ`, “the second spiritual man from heaven.” Confidence: `high`. Source: [Cambridge, “Reading for the Spirit of the Text”](https://www.cambridge.org/core/journals/new-testament-studies/article/abs/reading-for-the-spirit-of-the-text-nomina-sacra-and-language-in-p46/E8514EE523963A257D84AF67ED1761FA).
- `OTHER_630` — `630` has `ὁ δεύτερος ὁ κύριος`, omitting `ἄνθρωπος`. Confidence: `high`. Source: NA28/UBS5 apparatus.

**Ancient versions**

- `FOR_KJV` — portions of the Syriac and later versional traditions support “the Lord”; enter individual version witnesses from the existing apparatus source rather than assigning an entire language without qualification. Confidence: `medium-high`. Source: NA28/UBS5 apparatus.
- `AGAINST_KJV` — broad Old Latin/Vulgate, Bohairic, and Ethiopic evidence supports the ordinary shorter form, although Latin fathers can quote the long form. Confidence: `high`. Source: NA28/UBS5 apparatus.

**Church father rows**

- `author`: `Tertullian`; `date`: `early third century`; `workSection`: `On the Flesh of Christ 8; Against Marcion 5.10; On the Resurrection of the Flesh 49`; `reading`: `MIXED`; `relationship`: `mixed_citation`; `evidence`: the first two works quote “the second man is the Lord from heaven,” while *On the Resurrection* has “the second man is from heaven”; `confidence`: `high` for the extant Latin forms, `medium` for recovering the precise Greek exemplar(s) behind them. Sources: [*On the Flesh of Christ* 8](https://www.newadvent.org/fathers/0315.htm), [*Against Marcion* 5.10](https://www.newadvent.org/fathers/03125.htm), [*On the Resurrection of the Flesh* 49](https://www.newadvent.org/fathers/0316.htm).

**Timeline**

- c. 200: P46 has the unique “second spiritual man.”
- early third century: Tertullian's works exhibit both long and short forms.
- fourth/fifth centuries: B/C/D*/F/G support the ordinary short form; A and later correctors support “the Lord.”
- medieval period: “the Lord” dominates Byzantine Greek.
- printed TR/KJV: includes “the Lord”; modern critical editions omit it.

**Cautions to publish**

- Correct the earlier draft: P46 does **not** simply omit `ὁ κύριος`; its `πνευματικός` is a third reading.
- Tertullian must be labeled mixed, not counted multiple times as independent witnesses for one side.
- Christ's heavenly identity is explicit in the surrounding argument; the variant concerns the title “Lord” at this location.

**Entry sources:** [parallel Greek editions](https://biblehub.com/text/1_corinthians/15-47.htm); [P46 study](https://www.cambridge.org/core/journals/new-testament-studies/article/abs/reading-for-the-spirit-of-the-text-nomina-sacra-and-language-in-p46/E8514EE523963A257D84AF67ED1761FA); [Tertullian, *Flesh of Christ*](https://www.newadvent.org/fathers/0315.htm); [Tertullian, *Against Marcion* 5](https://www.newadvent.org/fathers/03125.htm); [Tertullian, *Resurrection*](https://www.newadvent.org/fathers/0316.htm); NA28 and UBS5 apparatuses.

---

## 16. Ephesians 3:9 — “Fellowship … by Jesus Christ”

**Metadata**

- `slug`: `ephesians-3-9`
- `book`: `Ephesians`
- `variantType`: `Multiple Independent Variants`
- `tags`: `Two independent variants`, `Doctrinally discussed variant`, `Byzantine phrase support`, `Scant fellowship support`, `Patristic evidence`, `Complex evidence`
- `lastVerified`: `2026-07-23`

**KJV:** “And to make all men see what is the fellowship of the mystery, which from the beginning of the world hath been hid in God, who created all things by Jesus Christ:”

**Disputed units:**

1. `κοινωνία` (“fellowship”) versus `οἰκονομία` (“dispensation/administration/stewardship”).
2. `διὰ Ἰησοῦ Χριστοῦ` (“by Jesus Christ”) versus omission after “who created all things.”

**Variant issue:** These are independent units and must have separate witness arrays. “By Jesus Christ” is a Byzantine expansion with appreciable Greek/Syriac support but is absent from P46 and the principal early uncials. “Fellowship,” by contrast, is a very small late Greek reading used by the printed TR; the Byzantine majority text itself reads `οἰκονομία`, not `κοινωνία`.

**Quick read:** The KJV combines two readings with radically different evidence profiles. Its Christological phrase is broadly Byzantine. Its “fellowship” is not: `οἰκονομία` has P46, every known uncial in the standard apparatus, the Byzantine majority, and nearly all Greek manuscripts.

**Support category:** `Split profile: Byzantine support for phrase; scant late support for fellowship`

**Snapshot**

- `fellowshipSupport`: a small late Greek group, with minuscule 2817 directly documented, plus the printed TR.
- `dispensationSupport`: P46, all known uncials, nearly all minuscules, versions, patristic citations, and the Byzantine majority.
- `byJesusChristSupport`: D2, K, L, 104, 1505, Byz, 0278, Syriac Harklean and related later witnesses.
- `byJesusChristAgainst`: P46, ℵ, A, B, C, D*, F, G, P, 33, 1319, 1611, 2127 and most early versions.

**Greek evidence — unit 1 (`κοινωνία` / `οἰκονομία`)**

- `FOR_KJV_FELLOWSHIP` — a small late manuscript group; minuscule `2817` (formerly numbered 7 in Paul) is a directly documented example, and the reading entered the TR. Do not invent a total count. Confidence: `high` for 2817 and the TR, `medium-high` for the generalized “small late group.” Sources: [Ephesians 3:9 apparatus summary](https://www.textus-receptus.com/wiki/Ephesians_3%3A9); [Minuscule 2817 description](https://en.wikipedia.org/wiki/Minuscule_2817).
- `AGAINST_KJV_DISPENSATION` — `P46 ℵ A B C D F G K L P Ψ` and effectively the entire standard uncial tradition, nearly all minuscules, and `Byz` read `οἰκονομία`. Confidence: `high`. Source: NA28/UBS5 apparatus; compare the Byzantine and critical texts at [BibleHub](https://biblehub.com/text/ephesians/3-9.htm).

**Greek evidence — unit 2 (`διὰ Ἰησοῦ Χριστοῦ`)**

- `FOR_KJV_BY_JESUS_CHRIST` — `D2 K L 104 1505 Byz 0278` and additional later witnesses include the phrase. Confidence: `high`. Source: NA28/UBS5 apparatus; [Robinson–Pierpont Byzantine text](https://byzantinetext.com/wp-content/uploads/2021/03/robinson-pierpont-2018-gnt-edition.pdf).
- `AGAINST_KJV_BY_JESUS_CHRIST` — `P46 ℵ A B C D* F G P 33 1319 1611 2127` and most early versions omit it. Confidence: `high`. Source: NA28/UBS5 apparatus.

**Ancient versions**

- `FELLOWSHIP_UNIT` — the major early versions support the `οἰκονομία` sense rather than KJV “fellowship.” Confidence: `high`. Source: NA28/UBS5 apparatus.
- `BY_JESUS_CHRIST_FOR_KJV` — Syriac Harklean supports the added phrase. Confidence: `high`. Source: NA28/UBS5 apparatus.
- `BY_JESUS_CHRIST_AGAINST_KJV` — most early Latin, Syriac, and Coptic evidence omits the phrase. Confidence: `high`. Source: NA28/UBS5 apparatus.

**Church father rows**

- `author`: `John Chrysostom`; `date`: `late fourth century`; `workSection`: `Homily 7 on Ephesians`; `reading`: `MIXED`; `relationship`: `mixed_citation`; `evidence`: the opening/running quotation reads “dispensation” and “who created all things” without the phrase, but the later exposition says “who created all things by Jesus Christ” and comments on creation through him; `confidence`: `high`. Source: [Chrysostom, *Homily 7 on Ephesians*](https://www.newadvent.org/fathers/230107.htm).

**Timeline**

- c. 200: P46 reads `οἰκονομία` and omits “by Jesus Christ.”
- fourth/fifth centuries: principal uncials retain `οἰκονομία` and omit the phrase; later correctors/Byzantine witnesses add the phrase.
- late fourth century: Chrysostom's homily displays mixed handling of the phrase while clearly using “dispensation.”
- medieval/early printed period: a small late `κοινωνία` reading enters the TR, while the TR also preserves the Byzantine “by Jesus Christ.”

**Cautions to publish**

- Never use one combined support count for both units.
- Correct the earlier draft: `κοινωνία` is not the Byzantine majority reading; Robinson–Pierpont reads `οἰκονομία`.
- The doctrine that all things were created through Christ is explicit at John 1:3, Colossians 1:16, and elsewhere; omission of this phrase does not remove that teaching.
- Chrysostom is mixed within the same homily and must not be flattened into a single clean manuscript vote.

**Entry sources:** [parallel Greek editions](https://biblehub.com/text/ephesians/3-9.htm); [Robinson–Pierpont 2018](https://byzantinetext.com/wp-content/uploads/2021/03/robinson-pierpont-2018-gnt-edition.pdf); [Ephesians 3:9 apparatus summary](https://www.textus-receptus.com/wiki/Ephesians_3%3A9); [Chrysostom](https://www.newadvent.org/fathers/230107.htm); NA28 and UBS5 apparatuses.

---

## 17. 1 John 4:3 — “Jesus Christ Is Come in the Flesh”

**Metadata**

- `slug`: `1-john-4-3`
- `book`: `1 John`
- `variantType`: `Multiple Independent Variants`
- `tags`: `Doctrinal variant`, `Fuller Byzantine reading`, `Patristic evidence`, `Latin support`, `Marginal Greek reading`, `Complex evidence`
- `lastVerified`: `2026-07-23`

**KJV:** “And every spirit that confesseth not that Jesus Christ is come in the flesh is not of God: and this is that spirit of antichrist, whereof ye have heard that it should come; and even now already is it in the world.”

**Disputed units:** Three textual families must be represented:

1. Short: `μὴ ὁμολογεῖ τὸν Ἰησοῦν` (“does not confess Jesus”).
2. Fuller: forms repeating from v. 2 that Jesus/Jesus Christ “has come in the flesh.” The exact wording varies across this family.
3. `λύει τὸν Ἰησοῦν` (“dissolves/separates Jesus”), known from early patristic/Latin tradition but appearing in surviving Greek manuscript evidence only as an alternative in the margin of 1739.

**Variant issue:** The earlier draft incorrectly put Sinaiticus with the short reading. Sinaiticus belongs to the fuller family. All continuous-text Greek manuscripts read a form of `μὴ ὁμολογεῖ`; `λύει` is not the main text of any known continuous Greek manuscript.

**Quick read:** The KJV's fuller Christological wording is broadly Byzantine and very early as a Christian formula, including Polycarp. The shorter Greek form has A, B, 1739 and others. The “dissolves/separates” reading is early in fathers and Latin but nearly absent from surviving Greek manuscript transmission.

**Support category:** `Byzantine fuller reading; strong early short form; patristic/Latin third reading`

**Snapshot**

- `supportFuller`: ℵ and a broad Byzantine group, with multiple exact forms; Polycarp preserves a closely related early formula.
- `againstShort`: A, B, 322, 323, 945, 1241, 1739, 1881, 2298.
- `otherDissolves`: margin of 1739; Clement/Origen and Irenaeus/Latin tradition; Vulgate.

**Greek evidence**

- `FOR_KJV_FULLER_EXACT_OR_NEAR` — exact `Ἰησοῦν Χριστὸν ἐν σαρκὶ ἐληλυθότα` is represented by `K 056 0142 181 330 629 1243 1292 1844 2127 2492 Byz Lect`; a related fuller “Jesus … in flesh” form is represented by `ℵ Ψ 33 81 436 630 1067 1409 1505 1611 1852 2138 2464 2495` and others. Store exact subforms when the schema allows; otherwise label the row `fuller-family`, not `exact-KJV-all`. Confidence: `high`. Source: NA28/ECM apparatus; synthesis confirmed by [H. A. G. Houghton](https://pure-oai.bham.ac.uk/ws/files/29525014/Houghton_OHJS_preprint.pdf).
- `AGAINST_KJV_SHORT` — `A B 322 323 945 1241 1739 1881 2298` read the shorter `μὴ ὁμολογεῖ τὸν Ἰησοῦν` or a minor article variant. Confidence: `high`. Source: NA28/ECM apparatus; [Houghton](https://pure-oai.bham.ac.uk/ws/files/29525014/Houghton_OHJS_preprint.pdf).
- `OTHER_DISSOLVES` — `λύει τὸν Ἰησοῦν` occurs only as an alternative in the margin of `1739`, not as the main text of a continuous Greek manuscript. Confidence: `high`. Source: [Houghton, pp. 11–12](https://pure-oai.bham.ac.uk/ws/files/29525014/Houghton_OHJS_preprint.pdf).

**Ancient versions**

- `SHORT_OR_NONFULLER` — Latin/Coptic evidence broadly supports a non-Byzantine-fuller form, but the Latin stream includes the distinct `solvit` (“dissolves”) reading. Enter the exact version reading, not simply “against KJV.” Confidence: `high`. Source: NA28/ECM; [Houghton](https://pure-oai.bham.ac.uk/ws/files/29525014/Houghton_OHJS_preprint.pdf).
- `DISSOLVES` — the Vulgate and related Latin tradition read `solvit Iesum` (“dissolves Jesus”). This supports the third reading's antiquity but is not Greek-manuscript evidence. Confidence: `high`. Source: [Houghton](https://pure-oai.bham.ac.uk/ws/files/29525014/Houghton_OHJS_preprint.pdf).

**Church father rows**

- `author`: `Polycarp of Smyrna`; `date`: `early-to-mid second century`; `workSection`: `Letter to the Philippians 7.1`; `reading`: `RELATED_TO_KJV_FULLER`; `relationship`: `close_quote`; `evidence`: “whoever does not confess that Jesus Christ has come in the flesh is antichrist”; `confidence`: `high` for the wording, `medium-high` as evidence for 1 John 4:3 specifically because 2 John 7 is also closely related. Source: [Polycarp, *Philippians* 7](https://en.wikisource.org/wiki/Ante-Nicene_Christian_Library/Epistle_of_Polycarp_to_the_Philippians).
- `author`: `Irenaeus`; `date`: `c. 180`; `workSection`: `Against Heresies 3.16.8`; `reading`: `DISSOLVES/SEPARATES`; `relationship`: `explicit_quote`; `evidence`: the Latin-preserved work reads “every spirit which separates Jesus Christ”; `confidence`: `high` for the transmitted wording, `medium` for the exact Greek verb behind the Latin. Source: [Irenaeus, *Against Heresies* 3.16.8](https://www.newadvent.org/fathers/0103316.htm).
- `author`: `Socrates Scholasticus`; `date`: `fifth century`; `workSection`: `Church History 7.32`; `reading`: `DISSOLVES/SEPARATES`; `relationship`: `manuscript_report`; `evidence`: says that “ancient copies” read “every spirit that separates Jesus”; `confidence`: `high` for Socrates' report, `low` as a description of extant Greek manuscript support because those copies do not survive. Source: [Socrates, *Church History* 7.32](https://www.newadvent.org/fathers/26017.htm).

**Timeline**

- early/mid-second century: Polycarp uses the fuller Johannine formula.
- c. 180–early third century: Irenaeus, Clement, and Origen attest the “separates/dissolves” tradition.
- fourth/fifth centuries: A/B support the short `μὴ ὁμολογεῖ` form; ℵ supports a fuller form.
- fifth century: Socrates reports “separates” in ancient copies.
- medieval period: the fuller form dominates Byzantine transmission; 1739 preserves `λύει` only in its margin.
- printed TR/KJV: follows a fuller form.

**Cautions to publish**

- Correct the earlier draft: Sinaiticus supports a fuller family, not the short reading.
- Do not claim that `λύει` is supported by a body of surviving Greek manuscripts; its only Greek manuscript appearance is a marginal alternative in 1739.
- Polycarp's sentence may combine 1 John 4:2–3 and 2 John 7; keep `close_quote`.
- The short form does not deny the incarnation: v. 2 immediately states that Jesus Christ has come in the flesh.

**Entry sources:** [Houghton preprint](https://pure-oai.bham.ac.uk/ws/files/29525014/Houghton_OHJS_preprint.pdf); [parallel Greek editions](https://biblehub.com/text/1_john/4-3.htm); [Polycarp](https://en.wikisource.org/wiki/Ante-Nicene_Christian_Library/Epistle_of_Polycarp_to_the_Philippians); [Irenaeus](https://www.newadvent.org/fathers/0103316.htm); [Socrates](https://www.newadvent.org/fathers/26017.htm); NA28/ECM apparatuses.

---

## 18a. Revelation 1:8 — “Alpha and Omega, the Beginning and the Ending”

**Metadata**

- `slug`: `revelation-1-8`
- `book`: `Revelation`
- `variantType`: `Multiple Independent Variants`
- `tags`: `Doctrinally discussed variant`, `Limited Greek support`, `Latin support`, `Sinaiticus first hand`, `TR divergence`, `Complex evidence`
- `lastVerified`: `2026-07-23`

**KJV:** “I am Alpha and Omega, the beginning and the ending, saith the Lord, which is, and which was, and which is to come, the Almighty.”

**Disputed units:**

1. `ἀρχὴ καὶ τέλος` (“the beginning and the ending”) after “Alpha and Omega.”
2. `λέγει ὁ κύριος` (“saith the Lord,” TR/KJV) versus the overwhelmingly attested `λέγει κύριος ὁ θεός` (“says the Lord God”), plus a few other minor forms.

**Variant issue:** The KJV expansion “beginning and ending” has the first hand of Sinaiticus and a small group of later Greek manuscripts, along with substantial Latin/Coptic and patristic transmission. The corrected Sinaiticus and the broad Greek tradition have only “Alpha and Omega.” In the second unit, the KJV/TR omission of “God” has no identified supporting Greek manuscript in Palmer's apparatus.

**Quick read:** This verse contains one limited but genuine Greek expansion and one TR/versional reading with no exact Greek support. The title “beginning and ending” remains undisputed at Revelation 21:6 and appears with closely related titles at 22:13.

**Support category:** `Limited Greek support for expansion; no Greek support for exact TR “saith the Lord”`

**Snapshot**

- `unit1Support`: ℵ*, 1828, 1854, 1888, 2050, 2065, 2081*, 2351, 2814; Latin/Vulgate and Coptic streams.
- `unit1Against`: ℵc, A, C, P, 046 and the broad Greek/Byzantine tradition.
- `unit2KJVSupport`: Old Latin `ar`, Ethiopic, Armenian-c, and the TR.
- `unit2Against`: ℵ, A, C, P, 046 and essentially the full Greek manuscript tradition read “Lord God.”

**Greek evidence — unit 1 (`ἀρχὴ καὶ τέλος`)**

- `FOR_KJV` — `ℵ* 1828 1854 1888 2050 2065 2081* 2351 2814` read `τὸ ὦ ἀρχὴ καὶ τέλος`. Confidence: `high`. Source: [Palmer, Revelation 1:8a](https://www.bibletranslation.ws/trans/revwgrk.pdf).
- `AGAINST_KJV` — `ℵc A C P 046 91 93 469 792 911 922 1006 1424 1611 1678 1734 1841 2053 2062 2070 2080 2846` and the majority editions read only `τὸ ὦ`. Confidence: `high`. Source: [Palmer](https://www.bibletranslation.ws/trans/revwgrk.pdf).
- `OTHER` — `2081c 2329` read `τὸ ὦ ἡ ἀρχὴ καὶ τὸ τέλος`; `2074` reads `τὸ ὦ ἀρχὴ καὶ τὸ τέλος`. `051` and `1778` are lacunose. Confidence: `high`. Source: [Palmer](https://www.bibletranslation.ws/trans/revwgrk.pdf).

**Greek evidence — unit 2 (“Lord” / “Lord God”)**

- `FOR_KJV_EXACT` — no Greek manuscript is listed for exact `λέγει ὁ κύριος`. Confidence: `high`. Source: [Palmer, Revelation 1:8b](https://www.bibletranslation.ws/trans/revwgrk.pdf).
- `AGAINST_KJV_LORD_GOD` — `ℵ A C P 046 91 93 469 792 911 922 1006 1424 1611 1678 1734 1828 1841 1854 1888 2053 2062 2065 2070 2080 2081 2351 2814 2846` read `λέγει κύριος ὁ θεός`. Confidence: `high`. Source: [Palmer](https://www.bibletranslation.ws/trans/revwgrk.pdf).
- `OTHER` — `2074` has “Lord God” without `λέγει`; `2329` has “God”; `2050` omits the whole attribution. Confidence: `high`. Source: [Palmer](https://www.bibletranslation.ws/trans/revwgrk.pdf).

**Ancient versions**

- `UNIT1_FOR_KJV` — Old Latin `ar gig t`, Vulgate `am fu harl cle st ww`, Coptic, and additional versional/patristic streams support “beginning and end.” Confidence: `high`. Source: [Palmer](https://www.bibletranslation.ws/trans/revwgrk.pdf).
- `UNIT1_AGAINST_KJV` — Old Latin `h`, a Vulgate manuscript strand, Syriac, Armenian, Ethiopic, Georgian, and Slavonic-b support the shorter form. Confidence: `high`. Source: [Palmer](https://www.bibletranslation.ws/trans/revwgrk.pdf).
- `UNIT2_FOR_KJV_EXACT` — Old Latin `ar`, Ethiopic, and Armenian-c support “says the Lord” without “God.” Confidence: `high`. Source: [Palmer](https://www.bibletranslation.ws/trans/revwgrk.pdf).
- `UNIT2_AGAINST_KJV` — Old Latin `h`, Vulgate, Syriac, Coptic, Armenian-m, Georgian, and Arabic support “Lord God.” Confidence: `high`. Source: [Palmer](https://www.bibletranslation.ws/trans/revwgrk.pdf).

**Church father rows**

- `noneToPublish`: Palmer lists patristic abbreviations on both sides, but this package does not convert them into rows without exact work/section verification. Their apparatus presence remains visible in the source.

**Timeline**

- fourth century: ℵ* includes “beginning and ending”; a corrector removes it. ℵ reads “Lord God” in the second unit.
- fifth century: A and C omit the expansion and read “Lord God.”
- medieval period: both forms circulate, but the shorter form is the Greek majority reading.
- printed TR/KJV: retains “beginning and ending” and the versionally supported “saith the Lord” without “God.”

**Cautions to publish**

- Codex Vaticanus does not contain Revelation and must not appear in any Revelation witness list.
- Do not label “beginning and ending” as a majority-Greek reading.
- Keep the “Lord/God” issue separate; it has a substantially weaker Greek profile than the title expansion.
- The titles are secure elsewhere in Revelation 21:6 and 22:13.

**Entry sources:** [Palmer's Revelation collation](https://www.bibletranslation.ws/trans/revwgrk.pdf); [parallel Greek editions](https://biblehub.com/text/revelation/1-8.htm); H. C. Hoskier, *Concerning the Text of the Apocalypse* (1929), [Internet Archive record](https://archive.org/details/Hoskier-ConcerningTheTextOfTheApokalypse).

---

## 18b. Revelation 1:11 — “I Am Alpha and Omega, the First and the Last”

**Metadata**

- `slug`: `revelation-1-11`
- `book`: `Revelation`
- `variantType`: `Long Added Phrase`
- `tags`: `Long added phrase`, `Doctrinally discussed variant`, `Not majority Greek support`, `Late Greek support`, `TR divergence`, `Complex evidence`
- `lastVerified`: `2026-07-23`

**KJV:** “Saying, I am Alpha and Omega, the first and the last: and, What thou seest, write in a book, and send it unto the seven churches which are in Asia; unto Ephesus, and unto Smyrna, and unto Pergamos, and unto Thyatira, and unto Sardis, and unto Philadelphia, and unto Laodicea.”

**Disputed unit:** `Ἐγώ εἰμι τὸ Α καὶ τὸ Ω, ὁ πρῶτος καὶ ὁ ἔσχατος· καί` (“I am Alpha and Omega, the first and the last: and”).

**Variant issue:** The exact TR expansion appears in 2814 and 2067 in Palmer's apparatus. Several other manuscripts contain shorter or grammatically different Alpha/Omega expansions. The broad Greek tradition, including ℵ*, A, C, 046 and the Byzantine majority, proceeds directly from “saying” to “What you see, write in a book.”

**Quick read:** The exact KJV form has exceptionally narrow, late Greek support. Related expansions show that the wording circulated in more than one form, but they are not exact votes for the TR. The titles themselves are undisputed in Revelation 1:17, 2:8, and 22:13.

**Support category:** `Exact TR form in two late Greek witnesses; related small expansion family`

**Snapshot**

- `supportExact`: 2067, 2814, TR.
- `supportRelated`: P, 922, 2074, 2065, 2081 and a few others have shorter/different Alpha-Omega expansions.
- `against`: ℵ*, A, C, 046, 91, 93, 469, 1006, 1424, 1734, 1828, 1841, 1888, 2070, 2329, 2351, 2846, K/Byzantine, and broad versional evidence.

**Greek evidence**

- `FOR_KJV_EXACT` — `2067 2814` read the exact TR expansion. Both are late; 2067 has TR-related textual complications and must not be presented as independent early confirmation. Confidence: `high`. Source: [Palmer, Revelation 1:11](https://www.bibletranslation.ws/trans/revwgrk.pdf).
- `RELATED_EXPANSIONS` — `P`, `922`, `2074`, `2065`, and `2081` preserve Alpha/Omega and/or first/last wording in non-identical forms. These belong in `OTHER`, not `FOR_KJV_EXACT`. Confidence: `high`. Source: [Palmer](https://www.bibletranslation.ws/trans/revwgrk.pdf).
- `AGAINST_KJV` — `ℵ* A C 046 91 93 469 1006 1424 1734 1828 1841 1888 2070 2329 2351 2846 K/Byz` read the short form; `ℵc 792` change the case of “saying” but still omit the KJV expansion. `051` and `2344` are lacunose. Confidence: `high`. Source: [Palmer](https://www.bibletranslation.ws/trans/revwgrk.pdf).

**Ancient versions**

- `AGAINST_KJV` — Vulgate, Syriac, Sahidic, Armenian-m, and broad Ethiopic/Georgian/Slavonic/Arabic evidence support the short text. Confidence: `high`. Source: [Palmer](https://www.bibletranslation.ws/trans/revwgrk.pdf).
- `RELATED_ONLY` — Arabic-w aligns with one related expansion, not the exact KJV form. Confidence: `high`. Source: [Palmer](https://www.bibletranslation.ws/trans/revwgrk.pdf).

**Church father rows**

- `noneToPublish`: No exact early patristic work/section supporting the full TR expansion was verified.

**Timeline**

- fourth/fifth centuries: ℵ*/A/C omit the expansion.
- medieval period: isolated manuscripts develop several Alpha/Omega expansions.
- 12th century: 2814 contains the exact expansion and later becomes Erasmus's principal Revelation manuscript.
- early modern period: exact wording enters the TR; 2067's TR-like evidence requires dependence caution.

**Cautions to publish**

- Do not add all related expansions together and call them exact KJV support.
- Do not call this a majority reading.
- The titles are not doctrinally absent from the short text: Revelation 1:17, 2:8, and 22:13 contain them.

**Entry sources:** [Palmer's Revelation collation](https://www.bibletranslation.ws/trans/revwgrk.pdf); [parallel Greek editions](https://biblehub.com/text/revelation/1-11.htm); [Hoskier archive record](https://archive.org/details/Hoskier-ConcerningTheTextOfTheApokalypse).

---

## 19. Revelation 16:5 — “Which Art, and Wast, and Shalt Be”

**Metadata**

- `slug`: `revelation-16-5`
- `book`: `Revelation`
- `variantType`: `Conjectural Emendation`
- `tags`: `Conjectural emendation`, `No Greek manuscript support`, `Printed-text history`, `Latin evidence`, `Doctrinally discussed variant`, `Complex evidence`
- `lastVerified`: `2026-07-23`

**KJV:** “And I heard the angel of the waters say, Thou art righteous, O Lord, which art, and wast, and shalt be, because thou hast judged thus.”

**Disputed units:**

1. `κύριε` (“O Lord”), which is absent from all Greek manuscripts in Palmer's apparatus.
2. `καὶ ὁ ἐσόμενος` (“and the one who shall be”) versus forms of `ὁ ὅσιος` (“the Holy One”).

**Variant issue:** Every known Greek manuscript represented in the modern collation has a form of “the Holy One” (or a minor omission), not `ὁ ἐσόμενος`. Beza introduced `ὁ ἐσόμενος` into his third Greek edition in 1582. A surviving working copy connected with his preparation shows `ὁ ὅσιος` underlined and `ὁ ἐσόμενος` written in the margin, supporting classification as a conjecture rather than a recovered extant Greek reading.

**Quick read:** The exact KJV/TR form has no Greek manuscript support. Versional/commentary evidence shows that future-tense wording existed outside the surviving Greek manuscript tradition, but it does not supply a Greek exemplar. The dominant Greek reading is “the Holy One.”

**Support category:** `Conjectural printed reading with versional parallels; zero Greek manuscript support`

**Snapshot**

- `supportKJVLord`: Clementine Vulgate and a few other versional witnesses; TR. No Greek manuscripts.
- `supportKJVFuture`: Ethiopic in Walton's Polyglot, Beatus's Latin commentary form, and the Beza/Scrivener/Elzevir-1633 TR line. No Greek manuscripts.
- `againstHolyOne`: all extant Greek manuscript evidence, distributed among `ὁ ὅσιος`, `ὅσιος`, `καὶ ὅσιος`, and `καὶ ὁ ὅσιος`.

**Greek evidence — unit 1 (`κύριε`)**

- `FOR_KJV_EXACT` — no Greek manuscripts. Confidence: `high`. Source: [Palmer, Revelation 16:5a](https://www.bibletranslation.ws/trans/revwgrk.pdf).
- `AGAINST_KJV` — all Greek manuscripts in the collation omit `κύριε`. Confidence: `high`. Source: [Palmer](https://www.bibletranslation.ws/trans/revwgrk.pdf).

**Greek evidence — unit 2 (“shall be” / “Holy One”)**

- `FOR_KJV_EXACT` — no Greek manuscripts read `καὶ ὁ ἐσόμενος`. Confidence: `high`. Source: [Palmer, Revelation 16:5b](https://www.bibletranslation.ws/trans/revwgrk.pdf).
- `AGAINST_KJV_HO_HOSIOS` — `ℵ P 051 f052 469 922 1888 2053mg 2074 2081 2344` read `ὁ ὅσιος`. Confidence: `high`. Source: [Palmer](https://www.bibletranslation.ws/trans/revwgrk.pdf).
- `AGAINST_KJV_HOSIOS` — `A C 046 91 93 1424 1611 1734 1854 2070 2846` read `ὅσιος`. Confidence: `high`. Source: [Palmer](https://www.bibletranslation.ws/trans/revwgrk.pdf).
- `AGAINST_KJV_KAI_HOSIOS` — `P47 911 1841 2065* 2329 K` read `καὶ ὅσιος`. Confidence: `high`. Source: [Palmer](https://www.bibletranslation.ws/trans/revwgrk.pdf).
- `AGAINST_KJV_KAI_HO_HOSIOS` — `792 1006 1828 2053txt 2062 2814` read `καὶ ὁ ὅσιος`; this was also the reading of earlier TR editions before Beza's change. Confidence: `high`. Source: [Palmer](https://www.bibletranslation.ws/trans/revwgrk.pdf).

**Ancient versions and commentary traditions**

- `FOR_KJV_LORD` — Clementine Vulgate, Vulgate `lips4,6`, Bohairic-G, and Walton's Ethiopic include “Lord.” Confidence: `high` as versional evidence, `none` as Greek manuscript evidence. Source: [Palmer](https://www.bibletranslation.ws/trans/revwgrk.pdf).
- `FOR_KJV_FUTURE` — Walton's Ethiopic and Beatus's Latin wording support a future-tense form; these are versional/commentary witnesses, not Greek manuscripts. Confidence: `high`. Source: [Palmer](https://www.bibletranslation.ws/trans/revwgrk.pdf).
- `AGAINST_KJV_HOLY` — Vulgate, Sahidic, and broad Greek-associated versional/father evidence support “Holy One,” with some internal variation. Confidence: `high`. Source: [Palmer](https://www.bibletranslation.ws/trans/revwgrk.pdf).

**Church father/commentary rows**

- `author`: `Beatus of Liébana`; `date`: `eighth century`; `workSection`: `Commentary on the Apocalypse, lemma/comment on Revelation 16:5`; `reading`: `RELATED_TO_KJV_FUTURE`; `relationship`: `close_quote`; `evidence`: Latin `qui fuisti et futurus es` (“who were and will be”); `confidence`: `high` for Palmer's cited Latin form, `medium` for whether it reflects an independent biblical text rather than commentary adaptation. Source: [Palmer](https://www.bibletranslation.ws/trans/revwgrk.pdf).

**Printed-text timeline**

- 1516–1551 and Beza 1565: printed Greek editions retain a form of “the Holy One.”
- 1582: Beza's third edition first replaces `ὁ ὅσιος` with `ὁ ἐσόμενος`.
- 1589 and 1598: Beza retains the conjecture.
- 1611: KJV translates Beza's future-tense reading and also has “O Lord.”
- 1633: Elzevir adopts the Bezan form; Scrivener's 1894 KJV-base TR retains it.
- modern critical and Byzantine editions: read a form of “the Holy One.”

**Cautions to publish**

- Correct the earlier draft: the change first entered Beza's **1582** third edition, not 1598.
- Beza later referred to an old manuscript, but no such witness is identifiable; the extant working-note evidence supports conjecture. State both facts without inventing a lost manuscript.
- Do not turn Beatus or the Ethiopic into Greek witnesses.
- “Who is, was, and is to come” appears elsewhere in Revelation; the textual question is whether that title stood here.

**Entry sources:** [Palmer's Revelation collation](https://www.bibletranslation.ws/trans/revwgrk.pdf); [parallel Greek editions](https://biblehub.com/text/revelation/16-5.htm); Jan Krans's ECM discussion as translated and documented [here](https://turretinfan.wordpress.com/2024/12/02/jan-krans-on-bezas-emendation-of-revelation-165/); [Hoskier archive record](https://archive.org/details/Hoskier-ConcerningTheTextOfTheApokalypse).

---

## 20. Revelation 22:19 — “The Book of Life”

**Metadata**

- `slug`: `revelation-22-19`
- `book`: `Revelation`
- `variantType`: `Latin Back Translation`
- `tags`: `Latin back translation`, `No exact Greek manuscript support`, `Late related Greek support`, `Printed-text history`, `Latin evidence`, `Complex evidence`
- `lastVerified`: `2026-07-23`

**KJV:** “And if any man shall take away from the words of the book of this prophecy, God shall take away his part out of the book of life, and out of the holy city, and from the things which are written in this book.”

**Disputed unit:** TR `βίβλου τῆς ζωῆς` (“book of life”) versus `ξύλου τῆς ζωῆς` (“tree of life”). Two late Greek witnesses have the related but not lexically exact `βιβλίου` (“book”).

**Variant issue:** The exact TR form `βίβλου` has no Greek manuscript support in Palmer's collation. Minuscule 61 and the corrector of 2067 have the related `βιβλίου`. The broad Greek tradition reads `ξύλου`. Erasmus's sole Revelation manuscript, 2814, lacks Revelation 22:16b–21; he explicitly supplied the ending by translating from Latin, where part of the Vulgate tradition read `libro vitae`.

**Quick read:** “Tree of life” is the overwhelmingly attested Greek reading and is supported by early versions/fathers. “Book of life” has real Latin, Bohairic, Arabic, and patristic transmission, but its exact TR Greek form arose through the printed text. The two related late Greek witnesses do not overturn that history and may themselves reflect Latin/printed influence.

**Support category:** `Latin-derived printed reading; no exact Greek manuscript support`

**Snapshot**

- `supportExactTR`: no Greek manuscripts; Clementine/Fuldensis and other Latin witnesses, Bohairic, Arabic-w, several Latin fathers/commentators, TR.
- `supportRelatedGreek`: 61 and 2067c read `βιβλίου`.
- `against`: ℵ, A, 046 and the remaining Greek tradition read `ξύλου`; Old Latin `gig`, multiple Vulgate witnesses, Syriac, Sahidic, Ethiopic, Armenian, and early commentators support “tree.”

**Greek evidence**

- `FOR_KJV_EXACT_BIBLOU` — no Greek manuscripts read exact TR `βίβλου τῆς ζωῆς`. Confidence: `high`. Source: [Palmer, Revelation 22:19c](https://www.bibletranslation.ws/trans/revwgrk.pdf).
- `RELATED_BOOK_BIBLIOU` — `61 2067c` read `βιβλίου τῆς ζωῆς`. These support the “book” concept but not the exact TR lexical form; both are late and require Latin/printed-dependence caution. Confidence: `high`. Source: [Palmer](https://www.bibletranslation.ws/trans/revwgrk.pdf).
- `AGAINST_KJV_TREE` — `ℵ A 046` and the remaining extant Greek tradition read `ξύλου τῆς ζωῆς`. `C P 911 1828 2080 2344 2351 2814` are lacunose here and must not be counted. Confidence: `high`. Source: [Palmer](https://www.bibletranslation.ws/trans/revwgrk.pdf).

**Ancient versions**

- `FOR_KJV_BOOK` — Clementine Vulgate, Vulgate `fu lips4,5`, Bohairic, Arabic-w, and Latin patristic/commentary witnesses including Primasius, Ambrose, Haymo, and the Acts of Saturninus support “book.” Confidence: `high` for direction, `medium-high` where the cited father text is available only through an apparatus. Source: [Palmer](https://www.bibletranslation.ws/trans/revwgrk.pdf).
- `AGAINST_KJV_TREE` — Old Latin `gig`, Vulgate `am dem st ww lips6`, Syriac Peshitta/Harklean, Sahidic, Ethiopic, Armenian, and Apringius/Tyconius/Beatus support “tree.” Confidence: `high`. Source: [Palmer](https://www.bibletranslation.ws/trans/revwgrk.pdf).

**Church father rows**

- `noneToPublish`: Palmer documents fathers/commentators on both sides, but the earlier brief did not provide exact work/section texts. Keep them in the version/patristic summary until individual primary-text rows are added with exact locators; do not invent quotations.

**Printed-text timeline**

- before 1516: 2814, Erasmus's Revelation manuscript, lacks 22:16b–21.
- 1516: Erasmus supplies the missing Greek from Latin; his first edition therefore includes Greek readings derived from the Latin wording, including “book of life.”
- sixteenth/seventeenth centuries: later TR editions retain “book,” even when other end-of-Revelation forms are corrected.
- c. 1520 and later: minuscule 61 and corrector 2067 attest related Greek `βιβλίου`; their dates and wording make dependence on the printed/Latin tradition a live issue.
- 1734: Bengel prints “tree” and cites “book” as a variant.
- modern critical and Byzantine editions: read “tree of life.”

**Cautions to publish**

- Correct the earlier draft: Latin `ligno` (“tree/wood”) and `libro` (“book”) are **not one letter apart**. They are different words; a Latin copying divergence is plausible, but the “one-letter typo” line is false and must not appear.
- Exact TR `βίβλου` has no Greek manuscript support; `βιβλίου` in 61 and 2067c is a related, not exact, reading.
- Do not count 2814 against “book”; it is missing this passage.
- Revelation already uses “book of life” elsewhere and “tree of life” elsewhere. Internal familiarity can influence copying in either direction and does not replace the external evidence.

**Entry sources:** [Palmer's Revelation collation](https://www.bibletranslation.ws/trans/revwgrk.pdf); Jan Krans, [“Erasmus and the Text of Revelation 22:19”](https://research.vu.nl/ws/portalfiles/portal/2424542/218636.pdf); [VU publication record](https://research.vu.nl/en/publications/erasmus-and-the-text-of-revelation-2219-a-critique-of-thomas-holl/); [Oxford discussion of the Latin Revelation text](https://academic.oup.com/book/12425/chapter/162895408); [Hoskier archive record](https://archive.org/details/Hoskier-ConcerningTheTextOfTheApokalypse).

---

## Required correction log for the coding agent

The coding agent must not reintroduce the following claims from the unfinished draft:

1. **Object/count math:** 20 numbered research blocks produce **21 passage objects**. Starting from 30, the new total is **51**.
2. **Matthew 1:25:** 33 supports the shorter reading, not the KJV phrase. The usable Basilian quotation is in disputed-authorship *Against Eunomius* 4; no verified Chrysostom row is supplied.
3. **Matthew 5:22:** P64/P67 is `vid`; the Vulgate omits `εἰκῇ`; Jerome explicitly reports the variant. Unverified Cyprian/Chrysostom rows are excluded.
4. **Matthew 5:44:** Didache, Justin, and Athenagoras are not clean Greek-manuscript equivalents; relationship labels must remain.
5. **Matthew 27:35:** supporting uncial `Φ` replaces the draft's erroneous `Δ`; the clause is **not** majority Greek.
6. **Mark 1:2:** GA 2427 is a modern forgery and must not be entered.
7. **Luke 2:14:** keep correction states and `B*vid`; do not claim either side has unanimous early/versional evidence.
8. **Luke 2:33:** remove the draft's unsupported X, Δ, 053, 28, 565, and 1009 claims.
9. **Luke 24:6:** D is the only principal Greek omission; current critical editions include the clause.
10. **Acts 20:28:** KJV “God” agrees with the modern critical text, while the Byzantine majority reads “Lord and God.” The critical word order differs from the TR.
11. **Romans 14:10:** Polycarp's “judgment seat of Christ” may come from 2 Corinthians 5:10 and is not a certain Romans manuscript witness.
12. **1 Corinthians 15:47:** P46 reads “the second spiritual man,” not the ordinary short form. Tertullian is mixed.
13. **Ephesians 3:9:** `κοινωνία` is a scant late/TR reading, not Byzantine majority; `διὰ Ἰησοῦ Χριστοῦ` is a separate Byzantine-supported unit.
14. **1 John 4:3:** Sinaiticus belongs to the fuller family. `λύει` survives in Greek only as a margin alternative in 1739.
15. **Revelation generally:** Vaticanus does not contain Revelation. Do not add it to any Revelation row.
16. **Revelation 1:8:** the expansion is not majority Greek; exact TR “saith the Lord” lacks Greek support.
17. **Revelation 1:11:** exact expansion is limited to two late Greek witnesses in Palmer's apparatus; related expansions are not exact votes.
18. **Revelation 16:5:** Beza first introduced `ὁ ἐσόμενος` in **1582**, and no Greek manuscript supports it or the KJV's added `κύριε`.
19. **Revelation 22:19:** exact `βίβλου` has no Greek manuscript support; 61 and 2067c have related `βιβλίου`; `ligno` and `libro` are not a one-letter difference.

## Final implementation acceptance checklist

- [ ] 21 new passage objects exist and every slug resolves directly.
- [ ] Exact KJV quotations match this file.
- [ ] All directional witness rows preserve correction states, `vid`, lacunae, family qualifications, and `OTHER` readings.
- [ ] No unresolved marker, fake percentage, invented total, or anonymous “early father” remains.
- [ ] Every father row has author, date, work/section, reading direction, relationship label, confidence, and source.
- [ ] Every Greek/version row has source, confidence, and `lastVerified: "2026-07-23"`.
- [ ] Revelation 1:8 and 1:11 are separate pages.
- [ ] Book filters include 1 Corinthians, Ephesians, and Revelation.
- [ ] Search, index pages, father/version/manuscript aggregations, related links, sitemap/static generation, and previous/next navigation include all new objects.
- [ ] All displayed counts are derived from data. If the original 30 remain, the passage total displays 51.
- [ ] Build, typecheck/lint, and the project's existing test suite pass.
- [ ] Spot checks cover Matthew 5:22, Acts 20:28, Ephesians 3:9, 1 John 4:3, Revelation 16:5, and Revelation 22:19 because these have the easiest evidence-modeling traps.

## Core bibliography

- Wieland Willker, [*A Textual Commentary on the Greek Gospels: Matthew*](https://www.willker.de/wie/TCG/TC-Matthew.pdf), 12th ed.
- Wieland Willker, [*A Textual Commentary on the Greek Gospels: Mark*](https://www.willker.de/wie/TCG/TC-Mark.pdf).
- Wieland Willker, [*A Textual Commentary on the Greek Gospels: Luke*](https://www.willker.de/wie/TCG/TC-Luke.pdf).
- Wieland Willker, [*A Textual Commentary on the Greek Gospels: John*](https://www.willker.de/wie/TCG/TC-John.pdf).
- David Robert Palmer, [*The Revelation of John: Greek and English with Textual Variant Footnotes*](https://www.bibletranslation.ws/trans/revwgrk.pdf), 2026-07-14 edition.
- H. C. Hoskier, [*Concerning the Text of the Apocalypse*](https://archive.org/details/Hoskier-ConcerningTheTextOfTheApokalypse), 2 vols., 1929.
- H. A. G. Houghton, [chapter preprint on the textual history of the Catholic Epistles](https://pure-oai.bham.ac.uk/ws/files/29525014/Houghton_OHJS_preprint.pdf).
- Jan Krans, [“Erasmus and the Text of Revelation 22:19”](https://research.vu.nl/ws/portalfiles/portal/2424542/218636.pdf), *TC: A Journal of Biblical Textual Criticism* 16 (2011).
- Nestle-Aland, *Novum Testamentum Graece*, 28th ed.; United Bible Societies, *Greek New Testament*, 5th ed.; ECM where specified.
