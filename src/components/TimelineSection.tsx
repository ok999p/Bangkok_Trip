import { CalendarClock } from "lucide-react";
import { scheduleByDay } from "@/data/tripData";

export function TimelineSection() {
  return (
    <section id="timeline" className="scroll-mt-24">
      <header className="mb-8">
        <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold text-cyan-300">
          <CalendarClock className="h-4 w-4" />
          ตารางการเดินทาง
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-100">
          ไทม์ไลน์
        </h2>
      </header>

      <div className="space-y-8">
        {scheduleByDay.map((day) => (
          <article
            key={day.dateLabel}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-cyan-950/10"
          >
            <h3 className="text-lg font-semibold text-white">{day.dateLabel}</h3>
            <div className="mt-5 space-y-4">
              {day.entries.map((entry) => (
                <div
                  key={`${day.dateLabel}-${entry.time}-${entry.title}`}
                  className="relative grid grid-cols-[96px_1fr] gap-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                >
                  <p className="font-semibold text-cyan-300">{entry.time}</p>
                  <div>
                    <p className="font-medium text-slate-100">
                      <span className="mr-2" aria-hidden>
                        {entry.icon}
                      </span>
                      {entry.title}
                    </p>
                    {entry.detail ? (
                      <p className="mt-1 text-sm text-slate-400">{entry.detail}</p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
