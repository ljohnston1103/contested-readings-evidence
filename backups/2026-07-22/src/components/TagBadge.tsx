import { cn } from "@/lib/utils";

type TagBadgeProps = {
  children: string;
  tone?: "gold" | "blue" | "teal" | "red" | "neutral";
};

export function TagBadge({ children, tone = "neutral" }: TagBadgeProps) {
  const tones = {
    gold: "border-archive-gold/35 bg-archive-gold/10 text-ink-700 dark:text-ink-100",
    blue: "border-archive-blue/25 bg-archive-blue/10 text-archive-blue dark:text-sky-200",
    teal: "border-archive-teal/30 bg-archive-teal/10 text-archive-teal dark:text-teal-200",
    red: "border-amber-700/20 bg-amber-700/10 text-amber-900 dark:text-amber-100",
    neutral: "border-ink-200/80 bg-white/55 text-ink-700 dark:border-white/10 dark:bg-white/5 dark:text-ink-100",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
