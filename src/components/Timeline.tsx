import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { TimelineEvent } from "@/data/types";

type TimelineProps = {
  events: TimelineEvent[];
};

export const eventLabels: Record<TimelineEvent["type"], string> = {
  patristic: "Church father",
  "greek-manuscript": "Greek manuscript",
  "latin-manuscript": "Latin manuscript",
  "ancient-version": "Ancient version",
  "printed-edition": "Printed Greek edition",
  "reformation-bible": "Reformation Bible",
  lectionary: "Lectionary",
};

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative rounded-[2rem] border border-ink-200 bg-white/80 p-6 shadow-card dark:border-white/10 dark:bg-white/[0.05]">
      <div className="absolute bottom-8 left-8 top-8 w-px bg-gradient-to-b from-archive-gold via-archive-teal to-transparent" />
      <RevealGroup className="grid gap-5">
        {events.map((event, index) => (
          <RevealItem key={`${event.date}-${index}`} className="group relative grid gap-1 pl-10">
            <span className="absolute left-[1.125rem] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-archive-gold shadow-glow transition-transform duration-300 group-hover:scale-125 dark:border-archive-navy" />
            <p className="text-xs font-black uppercase tracking-[0.2em] text-archive-teal dark:text-teal-200">
              {event.date} · {eventLabels[event.type]}
            </p>
            <p className="text-base font-bold leading-6 text-ink-900 dark:text-white">{event.label}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
