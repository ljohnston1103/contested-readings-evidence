"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { displayedPassages } from "@/data/derived";
import { cn } from "@/lib/utils";

import { SearchModal } from "./SearchModal";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "/passages", label: "Passages" },
  { href: "/manuscripts", label: "Manuscripts" },
  { href: "/fathers", label: "Fathers" },
  { href: "/versions", label: "Versions" },
  { href: "/timeline", label: "Timeline" },
  { href: "/methodology", label: "Oldest & Best" },
  { href: "/research", label: "Research Desk" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(window.navigator.platform ?? window.navigator.userAgent));
  }, []);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isTyping = !!target && ["INPUT", "TEXTAREA"].includes(target.tagName);
      if (event.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
        return;
      }
      if ((event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) || (event.key === "/" && !isTyping)) {
        event.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mobileOpen]);

  function isActive(href: string) {
    return pathname === href || pathname?.startsWith(`${href}/`);
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b backdrop-blur-xl transition-all duration-300",
          scrolled
            ? "border-ink-200/70 bg-archive-paper/90 shadow-card dark:border-white/10 dark:bg-archive-navy/90"
            : "border-transparent bg-archive-paper/55 dark:bg-archive-navy/40",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="relative block h-11 w-[108px] shrink-0 overflow-hidden rounded-xl bg-archive-paper/80 transition hover:-translate-y-0.5 hover:shadow-glow dark:bg-white/95 sm:h-14 sm:w-[250px] lg:w-[285px]"
            aria-label="Oldest & Best Manuscript Evidence Database home"
          >
            <Image
              src="/images/oldest-best-logo-header.png"
              alt="Oldest & Best Manuscript Evidence Database"
              fill
              priority
              sizes="(min-width: 1024px) 285px, (min-width: 640px) 250px, 108px"
              className="object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition",
                    active
                      ? "text-ink-900 dark:text-white"
                      : "text-ink-700 hover:text-archive-blue dark:text-ink-100 dark:hover:text-white",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-white/10"
                      transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="group flex items-center gap-2 rounded-full border border-ink-200 bg-white/70 px-3 py-2 text-sm font-semibold text-ink-600 shadow-sm transition hover:-translate-y-0.5 hover:border-archive-gold/60 hover:text-ink-900 dark:border-white/10 dark:bg-white/5 dark:text-ink-100/80 dark:hover:text-white sm:px-4"
              aria-label="Open search"
            >
              <Search className="h-4 w-4 text-archive-teal transition group-hover:scale-110 dark:text-teal-200" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden rounded-md border border-ink-200/80 bg-white/70 px-1.5 py-0.5 text-[10px] font-bold text-ink-400 dark:border-white/10 dark:bg-white/5 dark:text-ink-100/40 xl:inline-block">
                {isMac ? "⌘ K" : "Ctrl K"}
              </kbd>
            </button>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="grid h-11 w-11 place-items-center rounded-full border border-ink-200 bg-white/70 text-ink-700 shadow-sm transition hover:-translate-y-0.5 hover:border-archive-gold/60 dark:border-white/10 dark:bg-white/5 dark:text-ink-100 xl:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              <AnimatePresence initial={false} mode="wait">
                {mobileOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <X className="h-[18px] w-[18px]" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <Menu className="h-[18px] w-[18px]" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {mobileOpen && (
            <motion.nav
              key="mobile-nav"
              id="mobile-navigation"
              aria-label="Mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="overflow-hidden xl:hidden"
            >
              <div className="flex flex-col gap-1.5 px-4 pb-4">
                {navItems.map((item, index) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.22, delay: index * 0.03 }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block rounded-2xl px-4 py-3 text-sm font-bold transition",
                          active
                            ? "bg-ink-900 text-white dark:bg-archive-gold dark:text-ink-900"
                            : "bg-white/60 text-ink-700 hover:bg-white dark:bg-white/5 dark:text-ink-100 dark:hover:bg-white/10",
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      <SearchModal passages={displayedPassages} open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
