import Link from "next/link";

type BreadcrumbsProps = {
  items: Array<{ href?: string; label: string }>;
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-500 dark:text-ink-100/60" aria-label="Breadcrumb">
      <Link href="/" className="font-semibold hover:text-archive-blue dark:hover:text-white">
        Home
      </Link>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-2">
          <span>/</span>
          {item.href ? (
            <Link href={item.href} className="font-semibold hover:text-archive-blue dark:hover:text-white">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-ink-800 dark:text-white">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
