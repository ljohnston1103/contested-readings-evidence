"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldDark = stored ? stored === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", shouldDark);
    setIsDark(shouldDark);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border border-ink-200 bg-white/70 px-3 py-2 text-sm font-semibold text-ink-700 shadow-sm transition hover:-translate-y-0.5 hover:border-archive-gold/60 dark:border-white/10 dark:bg-white/5 dark:text-ink-100"
      aria-label="Toggle color theme"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
