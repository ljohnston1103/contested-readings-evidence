import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/motion/Reveal";
import { TableOfContents } from "@/components/TableOfContents";

const tocItems = [
  { id: "overview", label: "Overview" },
  { id: "vaticanus", label: "Codex Vaticanus" },
  { id: "sinaiticus", label: "Codex Sinaiticus" },
  { id: "comparison", label: "Side-by-Side" },
];

export const metadata: Metadata = {
  title: 'Examination of the "Oldest and Best"',
  description:
    "A focused examination of Codex Vaticanus and Codex Sinaiticus and what modern footnotes often mean by oldest and best manuscripts.",
};

const vaticanusBasic = [
  ["Name", "Codex Vaticanus"],
  ["Siglum", "B / 03"],
  ["Common date", "c. AD 325-350"],
  ["Material", "Vellum / parchment"],
  ["Format", "Codex, three columns per page"],
  ["Current location", "Vatican Library"],
  ["Current shelfmark", "Vat. gr. 1209"],
  ["Surviving leaves", "759 leaves total"],
  ["Old Testament leaves", "617 leaves"],
  ["New Testament leaves", "142 leaves"],
  ["Original estimated leaves", "About 830 leaves"],
  ["Lost leaves", "About 71 leaves"],
  ["Modern textual role", "The chief manuscript behind the modern critical text"],
];

const vaticanusMissing = [
  ["Genesis 1:1-46:28a", "Original leaves lost and replaced later"],
  ["Psalm 105:27-137:6b", "Original leaves lost and replaced later"],
  ["2 Kings 2:5-7, 10-13", "Lost due to page damage"],
  ["Hebrews 9:14 onward", "Missing from the original NT section"],
  ["1 Timothy", "Missing"],
  ["2 Timothy", "Missing"],
  ["Titus", "Missing"],
  ["Philemon", "Missing"],
  ["Revelation", "Missing"],
  ["Mark 16:9-20", "Not present in the original ending of Mark"],
  ["John 7:53-8:11", "Not present in John's text"],
];

const vaticanusCanon = [
  ["Apocryphal material", "Includes books outside the Protestant Old Testament canon"],
  ["Examples in contents", "Wisdom, Ecclesiasticus/Sirach, Judith, Tobit, Baruch, Epistle of Jeremiah"],
  ["Canonical concern", "Places uninspired writings alongside canonical Scripture"],
  ["Traditional Text critique", "A manuscript with blurred canonical boundaries should not automatically be treated as the best Bible witness"],
];

const vaticanusOrigin = [
  ["Textual stream", "Alexandrian"],
  ["Probable broad region", "Egypt / Alexandrian-Caesarean stream often discussed"],
  ["Theological environment", "Associated with Alexandrian philosophy, allegory, and Origenistic influence"],
  ["Connection to Origen", "Vaticanus is connected to Constantine's fifty Bible copies ordered through Eusebius"],
  ["A. T. Robertson quote", "Constantine himself ordered fifty Greek Bibles from Eusebius... It is quite possible that Sinaiticus and Vaticanus are two of these fifty..."],
];

const egyptPattern = [
  ["Biblical pattern", "Egypt is repeatedly associated with bondage, compromise, danger, and worldliness"],
  ["Genesis 12:10", "Abraham goes down into Egypt during famine and falls into fear and compromise"],
  ["Exodus 20:2", "Egypt is called the house of bondage"],
  ["Isaiah 31:1", "Warning against going down to Egypt for help"],
  ["Jeremiah 42:19", "Warning not to go into Egypt"],
  ["Revelation 11:8", "Egypt used spiritually as a symbol of apostasy"],
];

const origenConcerns = [
  ["Major Alexandrian figure", "Origen, AD 184-254"],
  ["Main concern", "Philosophical, doctrinally dangerous, and allegorical"],
  ["Doctrinal issues listed", "Pre-existence of souls, allegorical interpretation, universalist tendencies, speculative theology"],
  ["Philip Schaff quote", "The predilection of Origen for Plato misled him into many grand and fascinating errors."],
  ["Benjamin Wilkinson summary", "Origen taught pre-existent souls, eventual restoration, and turned the whole law and Gospel into an allegory."],
];

const vaticanusReception = [
  ["Visible church-use history", "Not preserved through the broad copying stream of the Greek-speaking churches"],
  ["Preservation pattern", "Institutional preservation, not widespread ecclesiastical use"],
  ["Vatican Library", "Known in the Vatican Library by the fifteenth century"],
  ["Historical concern", "A manuscript can survive because it was not used"],
  ["Traditional Text conclusion", "Vaticanus was preserved by storage, not by the public reading, copying, preaching, and transmitting life of the churches"],
];

const vaticanusJudgment = [
  ["Is Vaticanus old?", "Yes"],
  ["Is Vaticanus complete?", "No"],
  ["Does it preserve the entire New Testament?", "No"],
  ["Does it contain apocryphal material?", "Yes"],
  ["Is it heavily weighted in modern critical editions?", "Yes"],
  ["Was it the text that the church used and copied?", "No"],
];

const sinaiticusBasic = [
  ["Name", "Codex Sinaiticus"],
  ["Siglum", "Aleph / 01"],
  ["Common date", "c. AD 330-360"],
  ["Material", "Prepared animal skin / parchment"],
  ["Format", "Codex, four columns per page in many sections"],
  ["Discovery location", "St. Catherine's Monastery, Mount Sinai"],
  ["Major discoverer", "Constantin von Tischendorf"],
  ["Surviving leaves", "Just over 400 leaves"],
  ["Original contents", "Originally contained the Greek Old Testament and New Testament"],
  ["Current contents", "About half of the Old Testament, whole New Testament, Barnabas, and Shepherd of Hermas"],
  ["Modern textual role", "Second main manuscript behind the modern critical text"],
];

const sinaiticusPresent = [
  ["New Testament", "Complete"],
  ["Old Testament", "Large portions missing"],
  ["Apocrypha", "Present in surviving material"],
  ["Epistle of Barnabas", "Present"],
  ["Shepherd of Hermas", "Present, incomplete"],
  ["New Testament order", "Pauline Epistles placed before Acts in some descriptions"],
];

const sinaiticusMissing = [
  ["Much of Genesis to 1 Chronicles", "Missing from the surviving manuscript"],
  ["Large portions of Old Testament historical books", "Missing"],
  ["Some non-canonical material after Barnabas", "Six leaves lost after Barnabas, possibly containing additional non-canonical material"],
  ["New Testament", "Complete, but with disputed omissions/variant readings in many passages"],
  ["Mark 16:9-20", "Ends Mark at 16:8"],
  ["John 7:53-8:11", "Omits the passage"],
];

const sinaiticusCanon = [
  ["Epistle of Barnabas", "Included after the New Testament"],
  ["Shepherd of Hermas", "Included, though incomplete"],
  ["Canonical concern", "These writings were not received by the churches as inspired Scripture"],
  ["Traditional Text critique", "Sinaiticus blurs the line between canonical Scripture and uninspired early Christian literature"],
];

const sinaiticusCorrections = [
  ["Correction history", "Corrected by many hands over many centuries"],
  ["Date range of corrections", "From the fourth century through later centuries, often described through the twelfth century"],
  ["Tischendorf count", "14,800 corrections in the portion he examined at Petersburg"],
  ["David C. Parker estimate", "About 23,000 corrections in the full codex"],
  ["Popular summary", "One of the most corrected manuscripts in existence"],
];

const sinaiticusBurgon = [
  ["Sinaiticus in the Gospels", "Omits 3,455 words"],
  ["Additional Burgon-style figures", "Adds 839, substitutes 1,114, transposes 2,299, modifies 1,265"],
  ["Total listed Gospel divergences", "8,972 differences"],
];

const sinaiticusOrigin = [
  ["Textual stream", "Alexandrian"],
  ["Commonly associated region", "Egypt / Alexandria / Caesarea stream"],
  ["Discovery location", "St. Catherine's Monastery, Mount Sinai"],
  ["Textual relationship", "Frequently compared with Vaticanus"],
  ["Origen connection", "Clear connection with Constantine's fifty Bibles"],
  ["Origen/Pamphilus connection", "A later note connects a source exemplar with Pamphilus and Origen's Hexapla"],
];

const sinaiticusDiscovery = [
  ["Discovery figure", "Constantin von Tischendorf"],
  ["Discovery setting", "St. Catherine's Monastery"],
  ["Account of discovery", "Manuscript was found in a monastery, in an account often summarized as a wastebasket discovery, ready to be used for burning for a fire"],
];

const sinaiticusReception = [
  ["Visible church-use history", "Not the text multiplied throughout the Greek-speaking churches"],
  ["Transmission pattern", "Isolated Alexandrian witness rather than majority ecclesiastical stream"],
  ["Practical reception", "Its distinctive readings did not become the majority text of the churches"],
];

const sinaiticusConcerns = [
  ["Doctrinal environment", "Alexandrian and Origenistic influence"],
  ["Interpretive environment", "Allegory, philosophy, speculative theology"],
  ["Canonical issue", "Includes Barnabas and Shepherd of Hermas"],
  ["Textual issue", "Thousands of corrections by many hands"],
  ["Ecclesiastical issue", "Not the majority church text"],
];

const sinaiticusJudgment = [
  ["Is Sinaiticus old?", "Yes"],
  ["Is its New Testament complete?", "Yes"],
  ["Is the whole codex complete?", "No"],
  ["Does it include non-canonical books?", "Yes"],
  ["Is it heavily corrected?", "Yes"],
  ["Is it one of the main witnesses behind the modern critical text?", "Yes"],
  ["Was it the text used and copied by the church?", "No"],
];

const sideBySide = [
  ["Siglum", "B / 03", "Aleph / 01"],
  ["Date", "c. AD 325-350", "c. AD 330-360"],
  ["Textual stream", "Alexandrian", "Alexandrian"],
  ["Major modern role", "Chief critical-text witness", "Chief critical-text witness"],
  ["New Testament complete?", "No", "Yes"],
  ["Missing NT material", "Hebrews 9:14 onward, Pastorals, Philemon, Revelation", "No major NT books missing, but major traditional passages omitted"],
  ["Non-canonical material", "Apocryphal OT material", "Barnabas and Shepherd of Hermas"],
  ["Correction issue", "Textually divergent from Traditional Text", "Heavily corrected, about 23,000 estimated corrections"],
];

function SnapshotTable({
  title,
  rows,
  threeColumn = false,
}: {
  title: string;
  rows: string[][];
  threeColumn?: boolean;
}) {
  return (
    <Reveal>
    <section className="overflow-hidden rounded-[2rem] border border-ink-200 bg-white/78 shadow-card transition hover:border-archive-gold/40 dark:border-white/10 dark:bg-white/[0.05]">
      <div className="border-b border-ink-100 bg-ink-50/80 px-5 py-4 dark:border-white/10 dark:bg-white/5">
        <h2 className="font-display text-2xl font-black text-ink-900 dark:text-white">
          {title}
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <tbody className="divide-y divide-ink-100 dark:divide-white/10">
            {rows.map((row) => (
              <tr key={row.join("-")} className="align-top transition hover:bg-archive-gold/5">
                <th className="w-64 px-5 py-3 font-black text-ink-900 dark:text-white">
                  {row[0]}
                </th>
                <td className="px-5 py-3 leading-6 text-ink-700 dark:text-ink-100/75">
                  {row[1]}
                </td>
                {threeColumn && (
                  <td className="px-5 py-3 leading-6 text-ink-700 dark:text-ink-100/75">
                    {row[2]}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
    </Reveal>
  );
}

function ManuscriptImage({
  src,
  alt,
  caption,
  href,
  label,
}: {
  src: string;
  alt: string;
  caption: string;
  href: string;
  label: string;
}) {
  return (
    <Reveal>
    <Link
      href={href}
      className="group block overflow-hidden rounded-[2rem] border border-ink-200 bg-white/78 shadow-card transition hover:-translate-y-1 hover:border-archive-gold/60 hover:shadow-glow dark:border-white/10 dark:bg-white/[0.05]"
    >
      <div className="relative aspect-[16/9]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/72 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-flex rounded-full bg-archive-gold px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-ink-900">
            Click to examine {label}
          </span>
        </div>
      </div>
      <div className="px-5 py-4">
        <p className="text-sm font-semibold leading-6 text-ink-600 dark:text-ink-100/70">
          {caption}
        </p>
      </div>
    </Link>
    </Reveal>
  );
}

function SectionDivider({
  id,
  eyebrow,
  title,
  description,
  tone = "teal",
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  tone?: "teal" | "gold";
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-36 overflow-hidden rounded-[2.5rem] border p-6 shadow-card ${
        tone === "teal"
          ? "border-archive-teal/25 bg-archive-teal/10"
          : "border-archive-gold/30 bg-archive-gold/12"
      }`}
    >
      <Reveal>
        <p className={`text-sm font-black uppercase tracking-[0.24em] ${tone === "teal" ? "text-archive-teal dark:text-teal-200" : "text-archive-gold"}`}>
          {eyebrow}
        </p>
        <h2 className="mt-2 font-display text-4xl font-black text-ink-900 dark:text-white">
          {title}
        </h2>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-ink-700 dark:text-ink-100/75">
          {description}
        </p>
      </Reveal>
    </section>
  );
}

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Oldest & Best" }]} />

      <div className="mt-6">
        <TableOfContents items={tocItems} />
      </div>

      <section id="overview" className="scroll-mt-36 mt-6 rounded-[2.5rem] border border-archive-gold/25 bg-white/78 p-6 shadow-card dark:border-archive-gold/20 dark:bg-white/[0.05]">
        <Reveal>
        <p className="text-sm font-black uppercase tracking-[0.24em] text-archive-teal dark:text-teal-200">
          Examination
        </p>
        <h1 className="mt-3 max-w-5xl font-display text-4xl font-black leading-tight tracking-tight text-ink-900 dark:text-white sm:text-6xl">
          Examination of the &quot;Oldest and Best&quot; Vaticanus and Sinaiticus
        </h1>
        <p className="mt-4 max-w-4xl font-display text-2xl font-black text-archive-gold">
          What &quot;Oldest and Best&quot; Really Means
        </p>
        <div className="mt-6 grid gap-5 text-lg leading-8 text-ink-700 dark:text-ink-100/75">
          <p>
            The phrase &quot;not found in the oldest and best manuscripts,&quot; when used in modern Bible footnotes, can lead many readers to think the weight of the manuscript evidence is stacked against what the traditional text says.
          </p>
          <p>
            In this examination, &quot;oldest and best&quot; is treated as a shorthand that usually points readers toward a small Alexandrian cluster, especially Codex Vaticanus and Codex Sinaiticus, even when a disputed passage has very broad Greek manuscript support.
          </p>
          <p>
            These two manuscripts are certainly old, but age does not automatically mean faithful transmission, church reception, or textual reliability. The question is not only, &quot;What were the oldest manuscripts?&quot; but also, &quot;What text were the churches receiving, copying, preaching from, translating, and preserving?&quot;
          </p>
        </div>
        </Reveal>
      </section>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <ManuscriptImage
          src="/images/vaticanus.jpg"
          alt="Codex Vaticanus manuscript"
          href="#vaticanus"
          label="Codex Vaticanus"
          caption="One of the two chief manuscripts usually meant by oldest and best."
        />
        <ManuscriptImage
          src="/images/sinaiticus.webp"
          alt="Codex Sinaiticus manuscript"
          href="#sinaiticus"
          label="Codex Sinaiticus"
          caption="The other major Alexandrian witness frequently paired with Vaticanus."
        />
      </div>

      <div className="mt-8 grid gap-6">
        <SectionDivider
          id="vaticanus"
          eyebrow="Manuscript one"
          title="Codex Vaticanus"
          description="This section gathers the Vaticanus-specific information: basic manuscript data, missing material, canonical concerns, textual environment, reception, and summary judgment."
          tone="teal"
        />
        <SnapshotTable title="Codex Vaticanus Snapshot: Basic Manuscript Information" rows={vaticanusBasic} />
        <Reveal>
        <p className="rounded-[2rem] border border-ink-200 bg-white/78 p-5 leading-7 text-ink-700 shadow-card dark:border-white/10 dark:bg-white/[0.05] dark:text-ink-100/75">
          Codex Vaticanus is a fourth-century Greek Bible manuscript housed in the Vatican Library, where it has been known at least since the fifteenth century. It is written on 759 surviving leaves, with 617 Old Testament leaves and 142 New Testament leaves.
        </p>
        </Reveal>
        <SnapshotTable title="Vaticanus: Missing Biblical Material" rows={vaticanusMissing} />
        <SnapshotTable title="Vaticanus: Apocryphal / Non-Canonical Material" rows={vaticanusCanon} />
        <Reveal>
        <p className="rounded-[2rem] border border-ink-200 bg-white/78 p-5 leading-7 text-ink-700 shadow-card dark:border-white/10 dark:bg-white/[0.05] dark:text-ink-100/75">
          Vaticanus contains a Septuagint Old Testament arrangement that includes books such as Wisdom, Ecclesiasticus, Judith, Tobit, Baruch, and the Epistle of Jeremiah. In the Gospels, Traditional Text sources list Vaticanus as omitting 2,877 words, adding 536, substituting 935, transposing 2,098, and modifying 1,132, for a total of 7,578 differences from the Traditional Text.
        </p>
        </Reveal>
        <SnapshotTable title="Vaticanus: Origin and Textual Environment" rows={vaticanusOrigin} />
        <SnapshotTable title="Egypt, Alexandria, and the Biblical Pattern" rows={egyptPattern} />
        <SnapshotTable title="Origen and Doctrinal Concerns" rows={origenConcerns} />
        <SnapshotTable title="Vaticanus: Church Use and Reception" rows={vaticanusReception} />
        <Reveal>
        <p className="rounded-[2rem] border border-ink-200 bg-white/78 p-5 leading-7 text-ink-700 shadow-card dark:border-white/10 dark:bg-white/[0.05] dark:text-ink-100/75">
          Vaticanus has been housed in the Vatican Library for as long as it is historically known, possibly appearing in the 1475 catalog and definitely in the 1481 catalog.
        </p>
        </Reveal>
        <SnapshotTable title="Vaticanus Summary Judgment" rows={vaticanusJudgment} />
      </div>

      <div className="mt-12 grid gap-6">
        <SectionDivider
          id="sinaiticus"
          eyebrow="Manuscript two"
          title="Codex Sinaiticus"
          description="This section gathers the Sinaiticus-specific information: contents, missing material, non-canonical books, correction history, textual environment, reception, and summary judgment."
          tone="gold"
        />
        <SnapshotTable title="Codex Sinaiticus Snapshot: Basic Manuscript Information" rows={sinaiticusBasic} />
        <SnapshotTable title="Sinaiticus: Books and Sections Present" rows={sinaiticusPresent} />
        <SnapshotTable title="Sinaiticus: Missing Biblical Material" rows={sinaiticusMissing} />
        <SnapshotTable title="Sinaiticus: Non-Canonical Books Included" rows={sinaiticusCanon} />
        <Reveal>
        <p className="rounded-[2rem] border border-ink-200 bg-white/78 p-5 leading-7 text-ink-700 shadow-card dark:border-white/10 dark:bg-white/[0.05] dark:text-ink-100/75">
          The presence of Barnabas and Hermas is one of the most serious canonical concerns raised against Sinaiticus in the Traditional Text critique.
        </p>
        </Reveal>
        <SnapshotTable title="Sinaiticus: Correction / Alteration Statistics" rows={sinaiticusCorrections} />
        <Reveal>
        <p className="rounded-[2rem] border border-ink-200 bg-white/78 p-5 leading-7 text-ink-700 shadow-card dark:border-white/10 dark:bg-white/[0.05] dark:text-ink-100/75">
          Sources report that Sinaiticus was corrected by seven or more correctors between the fourth and twelfth centuries. Tischendorf counted 14,800 corrections in the Petersburg portion, while David C. Parker estimated about 23,000 corrections in the full codex.
        </p>
        </Reveal>
        <SnapshotTable title="Sinaiticus: Burgon-Style Divergence Statistics" rows={sinaiticusBurgon} />
        <Reveal>
        <p className="rounded-[2rem] border border-ink-200 bg-white/[0.78] p-5 leading-7 text-ink-700 shadow-card dark:border-white/10 dark:bg-white/[0.05] dark:text-ink-100/75">
          Traditional Text sources cite Burgon’s figures that Sinaiticus, in the Gospels, omits 3,455 words, adds 839, substitutes 1,114, transposes 2,299, and modifies 1,265, for a total of 8,972 differences from the Traditional Text.
        </p>
        </Reveal>
        <SnapshotTable title="Sinaiticus: Origin and Textual Environment" rows={sinaiticusOrigin} />
        <Reveal>
        <section className="rounded-[2rem] border border-ink-200 bg-white/[0.78] p-5 shadow-card dark:border-white/10 dark:bg-white/[0.05]">
          <h2 className="font-display text-2xl font-black text-ink-900 dark:text-white">
            J. F. Fenlon on the Origen/Pamphilus Connection
          </h2>
          <p className="mt-3 leading-7 text-ink-700 dark:text-ink-100/75">
            A note associated with Sinaiticus connects a source exemplar with Pamphilus and Origen’s Hexapla, and Fenlon observes that the text of Codex Sinaiticus bears a close resemblance to Codex Vaticanus.
          </p>
        </section>
        </Reveal>
        <SnapshotTable title="Sinaiticus: Discovery and Condition" rows={sinaiticusDiscovery} />
        <SnapshotTable title="Sinaiticus: Church Use and Reception" rows={sinaiticusReception} />
        <SnapshotTable title="Sinaiticus: Doctrinal and Canonical Concerns" rows={sinaiticusConcerns} />
        <SnapshotTable title="Sinaiticus Summary Judgment" rows={sinaiticusJudgment} />
      </div>

      <div id="comparison" className="mt-12 scroll-mt-36">
        <SnapshotTable title="Side-by-Side Snapshot" rows={sideBySide} threeColumn />
      </div>
    </div>
  );
}
