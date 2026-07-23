"use client";

import { useMemo, useState } from "react";

type Passage = {
  ref: string;
  slug: string;
  book: string;
  title: string;
  type: string;
  category: string;
  reading: string;
  support: string;
  against: string;
  caution: string;
};

const passages: Passage[] = [
  {
    ref: "Matthew 1:25",
    slug: "matthew-1-25",
    book: "Matthew",
    title: "Her Firstborn Son",
    type: "Short omitted phrase",
    category: "Broad Byzantine support · important early opposition",
    reading:
      "And knew her not till she had brought forth her firstborn son: and he called his name JESUS.",
    support: "C, D, L, W, Δ, 087, f13-part, 372, 892, 1071, Maj; Latin and Syriac streams.",
    against: "ℵ, B, Zvid, 071vid, f1, 33, 788, 1192 and early Syriac/Coptic evidence.",
    caution: "Luke 2:7 securely preserves “firstborn”; this variant does not determine that doctrine.",
  },
  {
    ref: "Matthew 5:22",
    slug: "matthew-5-22",
    book: "Matthew",
    title: "Without a Cause",
    type: "Short omitted phrase",
    category: "Majority Greek support · very early opposition",
    reading:
      "But I say unto you, That whosoever is angry with his brother without a cause shall be in danger of the judgment: and whosoever shall say to his brother, Raca, shall be in danger of the council: but whosoever shall say, Thou fool, shall be in danger of hell fire.",
    support: "D, K, L, P, Δ, Θ, Σ, f1, f13, 33, 700, 892 and the Byzantine majority.",
    against: "P64/P67vid, ℵ*, B, 372, 1424mg, the Vulgate, Justin, and Jerome’s preferred copies.",
    caution: "The Vulgate omits the phrase; P64/P67 must remain marked vid because the papyrus is damaged.",
  },
  {
    ref: "Matthew 5:44",
    slug: "matthew-5-44",
    book: "Matthew",
    title: "Bless Them That Curse You",
    type: "Short omitted phrase",
    category: "Broad Byzantine support · strong early shorter tradition",
    reading:
      "But I say unto you, Love your enemies, bless them that curse you, do good to them that hate you, and pray for them which despitefully use you, and persecute you;",
    support: "D, L, W, Δ, Θ, Σ, 047, f13, 33, 700, 892, Maj and broad versional evidence.",
    against: "ℵ, B, f1, 22, 1192, Syriac Sinaitic/Curetonian, Sahidic and Bohairic.",
    caution: "Early Christian parallels combine Synoptic sayings and are not automatic Matthew-manuscript votes.",
  },
  {
    ref: "Matthew 19:16–17",
    slug: "matthew-19-16-17",
    book: "Matthew",
    title: "Why Callest Thou Me Good?",
    type: "Doctrinally discussed variant",
    category: "Byzantine majority · major early Greek opposition",
    reading:
      "And, behold, one came and said unto him, Good Master, what good thing shall I do, that I may have eternal life? And he said unto him, Why callest thou me good? there is none good but one, that is, God: but if thou wilt enter into life, keep the commandments.",
    support: "C, K, W, Δ, f13, 33 and the Byzantine majority support the traditional complex.",
    against: "ℵ, B, D, L and f1 support the distinctively Matthean critical form.",
    caution: "Verses 16 and 17 are linked but separately attested and must remain separate evidence units.",
  },
  {
    ref: "Matthew 27:35",
    slug: "matthew-27-35",
    book: "Matthew",
    title: "That It Might Be Fulfilled",
    type: "Prophecy fulfillment",
    category: "Limited Greek support · versional and patristic attestation",
    reading:
      "And they crucified him, and parted his garments, casting lots: that it might be fulfilled which was spoken by the prophet, They parted my garments among them, and upon my vesture did they cast lots.",
    support: "D, Θ, Φ, 0233, 0250, f1, part of f13, Old Latin, Clementine Vulgate and Eusebius.",
    against: "The overwhelming remainder of Greek transmission, including the Byzantine majority.",
    caution: "This is not a majority-Greek reading; John 19:24 securely contains the same prophecy.",
  },
  {
    ref: "Mark 1:2",
    slug: "mark-1-2",
    book: "Mark",
    title: "As It Is Written in the Prophets",
    type: "Attribution variant",
    category: "Majority Greek support · strong early opposition",
    reading:
      "As it is written in the prophets, Behold, I send my messenger before thy face, which shall prepare thy way before thee.",
    support: "A, P, W, f13, 28, 579, 1342, 1424, 2542 and Maj.",
    against: "ℵ, B, D, L, Δ, Θ, f1, 33, 565, 700, 892, 1071, 1241 and Origen.",
    caution: "GA 2427 is a modern forgery and is intentionally excluded.",
  },
  {
    ref: "Mark 10:24",
    slug: "mark-10-24",
    book: "Mark",
    title: "Them That Trust in Riches",
    type: "Short omitted phrase",
    category: "Broad majority and versional support",
    reading:
      "And the disciples were astonished at his words. But Jesus answereth again, and saith unto them, Children, how hard is it for them that trust in riches to enter into the kingdom of God!",
    support: "A, C, D, X, Θ, Ψc, f1, f13, 579, 892, 1342, Maj, Latin, Syriac and Clement.",
    against: "ℵ, B, Δ, Ψ*, 1463, Old Latin k and Coptic streams.",
    caution: "The shorter reading still stands in an immediate context about wealth.",
  },
  {
    ref: "Luke 2:14",
    slug: "luke-2-14",
    book: "Luke",
    title: "Good Will Toward Men",
    type: "One-letter grammatical variant",
    category: "Majority Greek support · strong early genitive reading",
    reading: "Glory to God in the highest, and on earth peace, good will toward men.",
    support: "ℵc, Bc, Cc, K, L, Δ, Θ, Ξ, Ψ, f1, f13, 579, 700, 892, 1241 and Maj.",
    against: "ℵ*, A, B*vid, D, W, 23, Latin, Sahidic and Gothic.",
    caution: "The physical difference is one final sigma, but the translational effect is substantial.",
  },
  {
    ref: "Luke 2:33",
    slug: "luke-2-33",
    book: "Luke",
    title: "Joseph and His Mother",
    type: "Noun substitution",
    category: "Majority Greek support · strong early opposition",
    reading: "And Joseph and his mother marvelled at those things which were spoken of him.",
    support: "A, N, Ξ, Θ, Ψ, f13, 892, Maj, Old Latin and Syriac.",
    against: "ℵ, B, D, L, W, f1, 700, 1241, Vulgate, Syriac Sinaitic and Coptic.",
    caution: "Luke 2:48 calls Joseph “thy father” in every mainstream textual form.",
  },
  {
    ref: "Luke 4:4",
    slug: "luke-4-4",
    book: "Luke",
    title: "By Every Word of God",
    type: "Short omitted phrase",
    category: "Majority support · significant early opposition",
    reading:
      "And Jesus answered him, saying, It is written, That man shall not live by bread alone, but by every word of God.",
    support: "A, D, Δ, Θ, Ψ, f1, most of f13, 33, 579, 700, 892, Maj and broad versions.",
    against: "ℵ, B, L, W, 788, 264, 1241, Syriac Sinaitic and Coptic.",
    caution: "The complete quotation is textually secure at Matthew 4:4 and Deuteronomy 8:3.",
  },
  {
    ref: "Luke 24:6",
    slug: "luke-24-6",
    book: "Luke",
    title: "He Is Not Here, but Is Risen",
    type: "Western omission",
    category: "Overwhelming Greek support · single principal Greek omission",
    reading:
      "He is not here, but is risen: remember how he spake unto you when he was yet in Galilee,",
    support: "P75, ℵ, A, B and essentially all other extant Greek witnesses.",
    against: "D, part of the Old Latin tradition and some Armenian/Georgian evidence.",
    caution: "Current critical Greek editions and mainstream modern translations include the sentence.",
  },
  {
    ref: "John 3:13",
    slug: "john-3-13",
    book: "John",
    title: "Which Is in Heaven",
    type: "Short omitted phrase",
    category: "Majority and early patristic support · earliest papyri oppose",
    reading:
      "And no man hath ascended up to heaven, but he that came down from heaven, even the Son of man which is in heaven.",
    support: "A, N, Δ, Θ, Ψ, 050, f1, f13, 565, 579, 892, 1071, Maj, Hippolytus and Novatian.",
    against: "P66, P75, ℵ, B, L, T, Ws, 083, 086, 33, 1010, 1241 and Coptic.",
    caution: "Early fathers establish early circulation, not a surviving second-century Greek Gospel manuscript.",
  },
  {
    ref: "Acts 20:28",
    slug: "acts-20-28",
    book: "Acts",
    title: "The Church of God … His Own Blood",
    type: "Three-reading variation",
    category: "KJV and critical text agree · Byzantine conflation",
    reading:
      "Take heed therefore unto yourselves, and to all the flock, over the which the Holy Ghost hath made you overseers, to feed the church of God, which he hath purchased with his own blood.",
    support: "ℵ, B and a substantial minuscule group support “church of God.”",
    against: "P74, A, C*, D, E, Ψ, 33 and 1739 read “Lord”; Byz reads “Lord and God.”",
    caution: "The KJV reading is not the Byzantine majority reading here; its following word order also differs from the critical text.",
  },
  {
    ref: "Romans 14:10",
    slug: "romans-14-10",
    book: "Romans",
    title: "The Judgment Seat of Christ",
    type: "Noun substitution",
    category: "Majority Greek support · strong early “God” reading",
    reading:
      "But why dost thou judge thy brother? or why dost thou set at nought thy brother? for we shall all stand before the judgment seat of Christ.",
    support: "ℵc, Cc, L, P, Ψ, 048, 0209, 33, 81, Byz, Syriac and Gothic.",
    against: "ℵ*, A, B, C*, D, F, G, 0150, 630, 1506, 1739 and broad early Latin/Coptic.",
    caution: "Polycarp’s similar wording may reflect 2 Corinthians 5:10 rather than Romans 14:10.",
  },
  {
    ref: "1 Corinthians 15:47",
    slug: "1-corinthians-15-47",
    book: "1 Corinthians",
    title: "The Second Man Is the Lord from Heaven",
    type: "Short omitted phrase",
    category: "Majority support · unique papyrus third reading",
    reading: "The first man is of the earth, earthy: the second man is the Lord from heaven.",
    support: "ℵc, A, Dc, K, P, Ψ, 81 and Byz include “the Lord.”",
    against: "ℵ*, B, C, D*, F, G, 0243, 33 and 1739* read the ordinary shorter form.",
    caution: "P46 has the unique “second spiritual man,” not the ordinary short text.",
  },
  {
    ref: "Ephesians 3:9",
    slug: "ephesians-3-9",
    book: "Ephesians",
    title: "Fellowship … by Jesus Christ",
    type: "Two independent variants",
    category: "Split profile · Byzantine phrase, scant “fellowship” support",
    reading:
      "And to make all men see what is the fellowship of the mystery, which from the beginning of the world hath been hid in God, who created all things by Jesus Christ:",
    support: "“By Jesus Christ” has D2, K, L, 104, 1505, Byz and 0278.",
    against: "P46 and the uncial/Byzantine mainstream read “dispensation,” not “fellowship.”",
    caution: "The two units have radically different evidence and must never share one support count.",
  },
  {
    ref: "1 John 4:3",
    slug: "1-john-4-3",
    book: "1 John",
    title: "Jesus Christ Is Come in the Flesh",
    type: "Multiple independent variants",
    category: "Byzantine fuller form · early short and Latin third readings",
    reading:
      "And every spirit that confesseth not that Jesus Christ is come in the flesh is not of God: and this is that spirit of antichrist, whereof ye have heard that it should come; and even now already is it in the world.",
    support: "ℵ and a broad Byzantine family support fuller forms; Polycarp preserves the early formula.",
    against: "A, B, 322, 323, 945, 1241, 1739, 1881 and 2298 support the short form.",
    caution: "“Dissolves Jesus” survives in Greek only as a marginal alternative in 1739.",
  },
  {
    ref: "Revelation 1:8",
    slug: "revelation-1-8",
    book: "Revelation",
    title: "Alpha and Omega, the Beginning and the Ending",
    type: "Multiple independent variants",
    category: "Limited Greek expansion · TR attribution lacks Greek support",
    reading:
      "I am Alpha and Omega, the beginning and the ending, saith the Lord, which is, and which was, and which is to come, the Almighty.",
    support: "ℵ*, 1828, 1854, 1888, 2050, 2065, 2081*, 2351 and 2814 support the title expansion.",
    against: "ℵc, A, C, P, 046 and the broad Greek tradition omit the expansion and read “Lord God.”",
    caution: "Vaticanus does not contain Revelation; exact TR “saith the Lord” has no identified Greek support.",
  },
  {
    ref: "Revelation 1:11",
    slug: "revelation-1-11",
    book: "Revelation",
    title: "I Am Alpha and Omega, the First and the Last",
    type: "Long added phrase",
    category: "Exact TR form in two late Greek witnesses",
    reading:
      "Saying, I am Alpha and Omega, the first and the last: and, What thou seest, write in a book, and send it unto the seven churches which are in Asia; unto Ephesus, and unto Smyrna, and unto Pergamos, and unto Thyatira, and unto Sardis, and unto Philadelphia, and unto Laodicea.",
    support: "2067 and 2814 contain the exact expansion; several others have related, non-identical forms.",
    against: "ℵ*, A, C, 046 and the broad Greek/Byzantine tradition proceed directly to “What you see.”",
    caution: "Related expansions cannot be added together as exact KJV support.",
  },
  {
    ref: "Revelation 16:5",
    slug: "revelation-16-5",
    book: "Revelation",
    title: "Which Art, and Wast, and Shalt Be",
    type: "Conjectural emendation",
    category: "Zero Greek manuscript support · versional parallels",
    reading:
      "And I heard the angel of the waters say, Thou art righteous, O Lord, which art, and wast, and shalt be, because thou hast judged thus.",
    support: "Clementine Vulgate and a few versions support “Lord”; Ethiopic/Beatus have future-tense parallels.",
    against: "All extant Greek manuscript evidence reads a form of “the Holy One” and omits “O Lord.”",
    caution: "Beza first introduced the future reading in 1582; no identifiable Greek manuscript supports it.",
  },
  {
    ref: "Revelation 22:19",
    slug: "revelation-22-19",
    book: "Revelation",
    title: "The Book of Life",
    type: "Latin back translation",
    category: "No exact Greek support · late related Greek readings",
    reading:
      "And if any man shall take away from the words of the book of this prophecy, God shall take away his part out of the book of life, and out of the holy city, and from the things which are written in this book.",
    support: "Latin, Bohairic, Arabic and commentary streams support “book”; 61 and 2067c have related βιβλίου.",
    against: "ℵ, A, 046 and the remaining extant Greek tradition read “tree of life.”",
    caution: "Exact TR βίβλου has no Greek manuscript support; Erasmus supplied the missing ending from Latin.",
  },
];

const books = ["All", ...Array.from(new Set(passages.map((passage) => passage.book)))];

export default function Home() {
  const [view, setView] = useState<"overview" | "passages">("overview");
  const [query, setQuery] = useState("");
  const [book, setBook] = useState("All");
  const [selected, setSelected] = useState<Passage | null>(null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return passages.filter((passage) => {
      const matchesBook = book === "All" || passage.book === book;
      const matchesQuery =
        !normalized ||
        [passage.ref, passage.title, passage.type, passage.reading]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      return matchesBook && matchesQuery;
    });
  }, [book, query]);

  const openPassages = () => {
    setView("passages");
    setSelected(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="site-shell">
      <header className="site-header">
        <button className="brand" onClick={() => setView("overview")} aria-label="Oldest and Best home">
          <span className="brand-seal" aria-hidden="true">O&amp;B</span>
          <span className="brand-copy">
            <strong>Oldest &amp; Best</strong>
            <small>Manuscript Evidence Database</small>
          </span>
        </button>
        <nav aria-label="Primary navigation">
          <button className={view === "passages" ? "active" : ""} onClick={openPassages}>Passages</button>
          <button>Manuscripts</button>
          <button>Fathers</button>
          <button>Versions</button>
          <button>Timeline</button>
        </nav>
        <button className="search-pill" onClick={openPassages}>⌕ <span>Search</span></button>
      </header>

      <div className="preview-ribbon">
        <span>Preview</span>
        21 researched passage records added · publication total: 51
      </div>

      {view === "overview" && (
        <>
          <section className="hero">
            <div className="hero-copy">
              <p className="eyebrow">Interactive evidence database <span>Greek · versions · fathers</span></p>
              <h1>Explore the manuscript evidence behind contested Bible passages.</h1>
              <p className="hero-lede">
                The new research expansion adds twenty-one carefully sourced records,
                with manuscript corrections, versional evidence, patristic relationship
                labels, and honest cautions preserved.
              </p>
              <div className="hero-actions">
                <button className="button primary" onClick={openPassages}>Browse 21 new passages <span>→</span></button>
                <button className="button secondary" onClick={() => {
                  setView("passages");
                  setSelected(passages[18]);
                }}>Open Revelation 1:11</button>
              </div>
            </div>
            <aside className="research-card">
              <div className="research-card-top">
                <span className="live-dot" />
                <span>Research expansion ready</span>
              </div>
              <p className="folio">WAVE II / 2026</p>
              <h2>Twenty-one new evidence records</h2>
              <p>Each reading separates Greek, versional, patristic, and printed-text evidence.</p>
              <div className="evidence-key">
                <span><i className="greek" /> Greek witnesses</span>
                <span><i className="versions" /> Ancient versions</span>
                <span><i className="fathers" /> Church fathers</span>
                <span><i className="printed" /> Printed history</span>
              </div>
            </aside>
          </section>

          <section className="stats" aria-label="Database statistics">
            <article>
              <strong>51</strong>
              <span>Passages after update</span>
              <small>30 existing + 21 new</small>
            </article>
            <article>
              <strong>21</strong>
              <span>New research records</span>
              <small>All source-checked</small>
            </article>
            <article>
              <strong>3</strong>
              <span>New book filters</span>
              <small>1 Corinthians · Ephesians · Revelation</small>
            </article>
            <article>
              <strong>0</strong>
              <span>Unresolved markers</span>
              <small>No pending verification</small>
            </article>
          </section>

          <section className="section featured">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Newly documented</p>
                <h2>Start with the evidence that needs careful labels.</h2>
              </div>
              <button className="text-link" onClick={openPassages}>View all new passages →</button>
            </div>
            <div className="featured-grid">
              {[passages[12], passages[15], passages[19]].map((passage, index) => (
                <button
                  key={passage.slug}
                  className="featured-card"
                  onClick={() => {
                    setView("passages");
                    setSelected(passage);
                  }}
                >
                  <span className="card-number">0{index + 1}</span>
                  <p>{passage.ref}</p>
                  <h3>{passage.title}</h3>
                  <span className="category">{passage.category}</span>
                  <blockquote>“{passage.reading}”</blockquote>
                  <span className="open-label">Open evidence record <b>→</b></span>
                </button>
              ))}
            </div>
          </section>

          <section className="section coverage">
            <div className="coverage-copy">
              <p className="eyebrow">What changed</p>
              <h2>More evidence, with fewer shortcuts.</h2>
              <p>
                The update distinguishes exact readings from related forms,
                keeps corrected hands and lacunae visible, and never turns a
                translation or church father into a Greek manuscript.
              </p>
              <button className="button secondary" onClick={openPassages}>Inspect the passage index</button>
            </div>
            <div className="coverage-list">
              {[
                ["Exact KJV text", "All 21 quotations checked"],
                ["Principal Greek witnesses", "Correction states preserved"],
                ["Ancient versions", "Stored by language and direction"],
                ["Patristic evidence", "Exact relationship labels"],
                ["Printed-text history", "Conjectures clearly identified"],
              ].map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                  <i aria-hidden="true">✓</i>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {view === "passages" && (
        <section className="passage-page">
          <div className="passage-intro">
            <p className="eyebrow">Passage index · 21 new records</p>
            <h1>{selected ? selected.ref : "Browse the new research expansion."}</h1>
            <p>
              {selected
                ? selected.title
                : "Search by passage, wording, or variant type. Open any record to preview its evidence layout."}
            </p>
          </div>

          {selected ? (
            <article className="detail-record">
              <button className="back-button" onClick={() => setSelected(null)}>← Back to passage index</button>
              <div className="detail-top">
                <div>
                  <span className="record-label">New evidence record</span>
                  <h2>{selected.title}</h2>
                  <p className="detail-category">{selected.category}</p>
                </div>
                <span className="type-badge">{selected.type}</span>
              </div>
              <div className="reading-panel">
                <span>KJV / TR reading</span>
                <blockquote>“{selected.reading}”</blockquote>
              </div>
              <div className="evidence-columns">
                <section className="evidence-panel support-panel">
                  <span className="panel-kicker"><i /> Evidence for the KJV form</span>
                  <p>{selected.support}</p>
                </section>
                <section className="evidence-panel against-panel">
                  <span className="panel-kicker"><i /> Evidence against / other readings</span>
                  <p>{selected.against}</p>
                </section>
              </div>
              <div className="caution-panel">
                <span>Editorial caution</span>
                <p>{selected.caution}</p>
              </div>
              <div className="source-note">
                <span>Research status</span>
                <strong>Source-checked · last verified July 23, 2026</strong>
              </div>
            </article>
          ) : (
            <>
              <div className="filters">
                <label className="search-box">
                  <span aria-hidden="true">⌕</span>
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search passage, title, wording, or variant type"
                    aria-label="Search new passages"
                  />
                </label>
                <div className="book-filters" aria-label="Filter by book">
                  {books.map((name) => (
                    <button
                      key={name}
                      className={book === name ? "active" : ""}
                      onClick={() => setBook(name)}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="result-line">
                <span>{filtered.length} records shown</span>
                <span>Verified 2026-07-23</span>
              </div>
              <div className="passage-grid">
                {filtered.map((passage) => (
                  <button className="passage-card" key={passage.slug} onClick={() => setSelected(passage)}>
                    <div className="passage-card-head">
                      <span>{passage.ref}</span>
                      <b>→</b>
                    </div>
                    <h2>{passage.title}</h2>
                    <p className="card-reading">“{passage.reading}”</p>
                    <div className="card-footer">
                      <span>{passage.type}</span>
                      <small>{passage.category}</small>
                    </div>
                  </button>
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="empty-state">
                  <h2>No passages match that search.</h2>
                  <button onClick={() => { setQuery(""); setBook("All"); }}>Clear filters</button>
                </div>
              )}
            </>
          )}
        </section>
      )}

      <footer>
        <div className="footer-brand">Oldest &amp; Best <span>Evidence Atlas</span></div>
        <p>Preview of the researched 21-passage expansion. For study and discussion of New Testament textual evidence.</p>
        <button onClick={() => setView("overview")}>Return to overview ↑</button>
      </footer>
    </main>
  );
}
