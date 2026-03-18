import { CalendarDays, Compass, Landmark } from "lucide-react";

const links = [
  { href: "#map", label: "แผนที่", icon: Compass },
  { href: "#daily-plan", label: "แผนรายวัน", icon: CalendarDays },
  { href: "#summary", label: "สรุปค่าใช้จ่าย", icon: Landmark },
];

export function FloatingNav() {
  return (
    <nav className="fixed inset-x-0 top-3 z-50 mx-auto flex w-[calc(100%-1rem)] max-w-max items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-slate-900/75 px-1.5 py-1.5 shadow-2xl shadow-cyan-950/40 backdrop-blur-md sm:top-4 sm:w-fit sm:px-2 sm:py-2">
      {links.map(({ href, label, icon: Icon }) => (
        <a
          key={href}
          href={href}
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-slate-200 transition-all hover:bg-cyan-400/15 hover:text-cyan-200 sm:gap-2 sm:px-4"
        >
          <Icon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}
