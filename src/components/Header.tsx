import Image from "next/image";
import Link from "next/link";

import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "/passages", label: "Passages" },
  { href: "/manuscripts", label: "Manuscripts" },
  { href: "/fathers", label: "Fathers" },
  { href: "/versions", label: "Versions" },
  { href: "/methodology", label: "Methodology" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/70 bg-archive-paper/85 backdrop-blur-xl dark:border-white/10 dark:bg-archive-navy/85">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="relative block h-12 w-[190px] shrink-0 overflow-hidden rounded-2xl bg-archive-paper/80 transition hover:-translate-y-0.5 hover:shadow-glow dark:bg-white/95 sm:h-14 sm:w-[250px] lg:w-[285px]"
          aria-label="Oldest & Best Manuscript Evidence Database home"
        >
          <Image
            src="/images/oldest-best-logo-header.png"
            alt="Oldest & Best Manuscript Evidence Database"
            fill
            priority
            sizes="(min-width: 1024px) 285px, (min-width: 640px) 250px, 190px"
            className="object-contain"
          />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-ink-700 transition hover:bg-white/70 hover:text-archive-blue dark:text-ink-100 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/passages"
            className="hidden rounded-full bg-ink-900 px-4 py-2 text-sm font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:bg-archive-blue dark:bg-archive-gold dark:text-ink-900 md:inline-flex"
          >
            Browse
          </Link>
          <ThemeToggle />
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto px-4 pb-3 lg:hidden">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap rounded-full border border-ink-200/80 bg-white/60 px-3 py-1.5 text-xs font-semibold text-ink-700 dark:border-white/10 dark:bg-white/5 dark:text-ink-100"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
