import { ArrowDownRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 px-5 py-16 shadow-2xl shadow-cyan-950/20 sm:px-10 sm:py-24 lg:px-16">
      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="absolute -right-16 bottom-4 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative max-w-4xl">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-1 text-xs font-semibold text-cyan-200">
          <Sparkles className="h-3.5 w-3.5" />
          แดชบอร์ดการเดินทางอัจฉริยะ
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-slate-100 sm:text-5xl lg:text-6xl">
          ทริปศึกษาดูงานกรุงเทพฯ 2026
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:mt-5 sm:text-lg">
          วางแผนเส้นทางหลายรูปแบบสำหรับคณะ 15 คน พร้อมรายละเอียดสถานีแบบทีละขั้นตอน การคำนวณรถตู้ และตัวเลขค่าเดินทางต่อคนในแต่ละตัวเลือก
        </p>

        <a
          href="#map"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-all hover:-translate-y-0.5 hover:bg-cyan-300 sm:mt-10 sm:px-6 sm:py-3"
        >
          ดูเส้นทางทั้งหมด
          <ArrowDownRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
