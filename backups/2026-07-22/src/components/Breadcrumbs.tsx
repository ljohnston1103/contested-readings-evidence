import { ChevronRight, House } from "lucide-react";
import Link from "next/link";

type BreadcrumbsProps = {
  items: Array<{ href?: string; label: string }>;
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-sm text-ink-500 dark:text-ink-100/60" aria-label="Breadcrumb">
      <Link href="/" className="flex items-center gap-1.5 rounded-full px-2 py-1 font-semibold transition hover:bg-white/70 hover:text-archive-blue dark:hover:bg-white/10 dark:hover:text-white">
        <House className="h-3.5 w-3.5" aria-hidden="true" />
        Home
      </Link>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden="true" />
          {item.href ? (
            <Link href={item.href} className="rounded-full px-2 py-1 font-semibold transition hover:bg-white/70 hover:text-archive-blue dark:hover:bg-white/10 dark:hover:text-white">
              {item.label}
            </Link>
          ) : (
            <span className="rounded-full px-2 py-1 font-semibold text-ink-800 dark:text-white">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
