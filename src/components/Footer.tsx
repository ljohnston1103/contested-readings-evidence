import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-200/70 bg-white/45 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-display text-2xl font-black text-ink-900 dark:text-white">
            Evidence Atlas
          </p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-ink-600 dark:text-ink-100/75">
            A structured, expandable evidence database for comparing manuscript,
            versional, and patristic witnesses behind contested New Testament readings.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-200">
            Explore
          </p>
          <div className="mt-3 grid gap-2 text-sm">
            <Link href="/passages">Passage index</Link>
            <Link href="/manuscripts">Manuscript witnesses</Link>
            <Link href="/fathers">Church fathers</Link>
            <Link href="/versions">Ancient versions</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-200">
            Approach
          </p>
          <div className="mt-3 grid gap-2 text-sm">
            <Link href="/methodology">Methodology</Link>
            <Link href="/about">About</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
