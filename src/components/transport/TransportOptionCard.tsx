"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  GLOBAL_DISCLAIMER,
  type TransportOption,
} from "@/data/transportData";
import { StationStepper } from "@/components/transport/StationStepper";

type TransportOptionCardProps = {
  option: TransportOption;
  selected: boolean;
  onSelect: () => void;
};

const typeText: Record<TransportOption["type"], string> = {
  public: "ขนส่งสาธารณะ",
  grab: "Grab (รถตู้)",
  bolt: "Bolt (รถตู้)",
};

export function TransportOptionCard({
  option,
  selected,
  onSelect,
}: TransportOptionCardProps) {
  const [open, setOpen] = useState(false);
  const hasUnresolvedCost = Boolean(option.unresolvedCostNote);
  const hasNoKnownBaseFare = hasUnresolvedCost && option.totalCost === 0;
  const totalCostText = hasUnresolvedCost
    ? hasNoKnownBaseFare
      ? "คำนวณไม่ได้จากข้อมูลที่มี (ต้องดูราคาหน้างาน)"
      : `${option.totalCost} บาท + ค่าใช้จ่ายเพิ่มเติมหน้างาน`
    : `${option.totalCost} บาท`;
  const perPersonText = hasUnresolvedCost
    ? hasNoKnownBaseFare
      ? "คำนวณไม่ได้จากข้อมูลที่มี (ต้องดูราคาหน้างาน)"
      : `${option.costPerPerson} บาท/คน + ค่าใช้จ่ายเพิ่มเติมหน้างาน`
    : `${option.costPerPerson} บาท/คน`;

  return (
    <motion.article
      whileHover={{ y: -3 }}
      className={`rounded-2xl border bg-white/5 p-3 text-left transition-all sm:p-4 ${
        selected
          ? "border-cyan-300/80 shadow-lg shadow-cyan-500/20"
          : "border-white/10 hover:border-white/30"
      }`}
    >
      <button type="button" onClick={onSelect} className="w-full text-left">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2">
            <span className="text-xl" aria-hidden>
              {option.icon}
            </span>
            <span className="font-medium text-slate-100">
              {typeText[option.type]}
            </span>
          </div>
        </div>

      </button>

      {option.vansNeeded ? (
        <p className="mt-3 text-xs text-slate-300">
          ต้องใช้รถตู้: {option.vansNeeded} คัน (รองรับ {option.capacity} คน/คัน)
        </p>
      ) : null}

      {option.type !== "public" ? (
        <p className="mt-3 rounded-xl border border-amber-300/20 bg-amber-400/10 p-2 text-[11px] leading-relaxed text-amber-100">
          {GLOBAL_DISCLAIMER}
        </p>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="mt-3 inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-300 hover:bg-white/10"
      >
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : "rotate-0"}`} />
        {open ? "ซ่อนรายละเอียด" : "ดูรายละเอียด"}
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-200">
                <span className="rounded-full bg-white/10 px-2 py-1">
                  เวลาเดินทาง: {option.time}
                </span>
                <span className="rounded-full bg-cyan-400/15 px-2 py-1 font-semibold text-cyan-200">
                  ค่าเดินทางรวม: {totalCostText}
                </span>
                <span className="rounded-full bg-violet-400/15 px-2 py-1 font-semibold text-violet-200">
                  ราคาต่อคน: {perPersonText}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-300">{option.description}</p>
              {option.costFormula ? (
                <p className="rounded-xl border border-cyan-300/25 bg-cyan-400/10 p-2 text-xs text-cyan-100">
                  สูตรคำนวณค่าใช้จ่าย: {option.costFormula}
                </p>
              ) : null}
              {option.unresolvedCostNote ? (
                <p className="rounded-xl border border-amber-300/20 bg-amber-400/10 p-2 text-xs leading-relaxed text-amber-100">
                  หมายเหตุค่าใช้จ่าย: {option.unresolvedCostNote}
                </p>
              ) : null}
              {option.unresolvedTimeNote ? (
                <p className="rounded-xl border border-amber-300/20 bg-amber-400/10 p-2 text-xs leading-relaxed text-amber-100">
                  หมายเหตุเวลา: {option.unresolvedTimeNote}
                </p>
              ) : null}
              {option.stationSteps ? <StationStepper steps={option.stationSteps} /> : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}
