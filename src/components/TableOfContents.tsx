"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type TocItem = {
  id: string;
  label: string;
};

type TableOfContentsProps = {
  items: TocItem[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setActive((current) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          return visible[0]?.target.id ?? current;
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 1] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Section navigation"
      className="sticky top-16 z-30 flex gap-2 overflow-x-auto rounded-full border border-ink-200 bg-white/85 p-2 shadow-card backdrop-blur dark:border-white/10 dark:bg-archive-navy/85 sm:top-20"
    >
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-black transition",
              isActive ? "text-ink-900 dark:text-ink-900" : "text-ink-600 hover:text-archive-blue dark:text-ink-100/70 dark:hover:text-white",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="toc-active-pill"
                className="absolute inset-0 rounded-full bg-archive-gold"
                transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              />
            )}
            <span className="relative">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
