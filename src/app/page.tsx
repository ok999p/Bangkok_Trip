import { FloatingNav } from "@/components/FloatingNav";
import { HeroSection } from "@/components/HeroSection";
import { Reveal } from "@/components/Reveal";
import { TripPlannerDashboard } from "@/components/TripPlannerDashboard";
import { GLOBAL_DISCLAIMER } from "@/data/transportData";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden px-4 pb-16 pt-20 sm:px-8 sm:pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.22),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(129,140,248,0.18),_transparent_40%)]" />
      <FloatingNav />

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-14">
        <Reveal>
          <HeroSection />
        </Reveal>

        <Reveal delay={0.05}>
          <section className="rounded-2xl border border-amber-300/20 bg-amber-400/10 p-4 text-sm leading-relaxed text-amber-100">
            {GLOBAL_DISCLAIMER}
          </section>
        </Reveal>

        <TripPlannerDashboard />

        <footer className="border-t border-white/10 pt-6 text-center text-xs text-slate-400 sm:text-sm">
          Copyright © 2026 ไปเที่ยวกัน EIEI. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
