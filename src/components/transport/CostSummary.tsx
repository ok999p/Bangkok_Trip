import { BarChart3, Clock3, Wallet } from "lucide-react";
import {
  calculateDayTotalsBySelection,
  calculateOverallTotalsBySelection,
  type SelectedOptionByRoute,
} from "@/data/transportData";

type CostSummaryProps = {
  selectedOptionByRoute: SelectedOptionByRoute;
};

export function CostSummary({ selectedOptionByRoute }: CostSummaryProps) {
  const overall = calculateOverallTotalsBySelection(selectedOptionByRoute);
  const day1 = calculateDayTotalsBySelection(1, selectedOptionByRoute);
  const day2 = calculateDayTotalsBySelection(2, selectedOptionByRoute);
  const day3 = calculateDayTotalsBySelection(3, selectedOptionByRoute);

  return (
    <section id="summary" className="scroll-mt-24">
      <header className="mb-6">
        <p className="text-xs font-semibold text-cyan-300">
          สรุปค่าใช้จ่าย
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">
          แดชบอร์ดค่าใช้จ่ายรวม
        </h2>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-3xl border border-cyan-400/30 bg-cyan-400/10 p-5">
          <p className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-200">
            <Wallet className="h-4 w-4" />
            ค่าใช้จ่ายรวมทั้งทริป
          </p>
          <p className="mt-3 text-2xl font-semibold text-slate-100 sm:text-3xl">{overall.totalCost.toLocaleString()} บาท</p>
          <p className="mt-1 text-sm text-slate-300">รวมค่าเดินทางของทั้งคณะ</p>
        </article>

        <article className="rounded-3xl border border-violet-400/30 bg-violet-400/10 p-5">
          <p className="inline-flex items-center gap-2 text-xs font-semibold text-violet-200">
            <Clock3 className="h-4 w-4" />
            เวลาเดินทางรวม
          </p>
          <p className="mt-3 text-2xl font-semibold text-slate-100 sm:text-3xl">
            {overall.minMinutes}-{overall.maxMinutes} นาที
          </p>
        </article>

        <article className="rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-5">
          <p className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-200">
            <BarChart3 className="h-4 w-4" />
            ค่าเฉลี่ยต่อเที่ยว
          </p>
          <p className="mt-3 text-2xl font-semibold text-slate-100 sm:text-3xl">
            {Math.round((overall.totalCost / 5) * 100) / 100} บาท
          </p>
        </article>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
          วันที่ 1: {day1.totalCost.toLocaleString()} บาท ({day1.minMinutes}-{day1.maxMinutes} นาที)
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
          วันที่ 2: {day2.totalCost.toLocaleString()} บาท ({day2.minMinutes}-{day2.maxMinutes} นาที)
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
          วันที่ 3: {day3.totalCost.toLocaleString()} บาท ({day3.minMinutes}-{day3.maxMinutes} นาที)
        </div>
      </div>

      <div className="sticky bottom-3 z-40 mt-6 rounded-2xl border border-cyan-300/30 bg-slate-900/85 px-4 py-3 shadow-xl shadow-cyan-900/30 backdrop-blur-md">
        <p className="text-xs leading-relaxed text-slate-200 sm:text-sm">
          สรุปตามตัวเลือกที่เลือก: <span className="font-semibold text-violet-200">{overall.totalCost.toLocaleString()} บาท</span>
          {" "}
          <span className="text-slate-400">|</span>{" "}
          <span className="font-semibold text-emerald-200">{overall.minMinutes}-{overall.maxMinutes} นาที</span>
        </p>
      </div>
    </section>
  );
}
