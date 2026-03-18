"use client";

import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";
import { DAY_COLORS, type SelectedOptionByRoute } from "@/data/transportData";

const BangkokMap = dynamic(() => import("@/components/map/BangkokMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-[360px] place-items-center rounded-3xl border border-white/10 bg-slate-900/50 text-slate-400 sm:h-[440px]">
      กำลังโหลดแผนที่แบบโต้ตอบ...
    </div>
  ),
});

type MapSectionProps = {
  selectedRouteId: string | null;
  selectedOptionByRoute: SelectedOptionByRoute;
  onRouteSelect: (routeId: string) => void;
};

export function MapSection({
  selectedRouteId,
  selectedOptionByRoute,
  onRouteSelect,
}: MapSectionProps) {
  return (
    <section id="map" className="scroll-mt-24">
      <header className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold text-cyan-300">
            <MapPin className="h-4 w-4" />
            ภาพรวมเส้นทาง
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">
            แผนที่การเดินทางในกรุงเทพฯ
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-slate-300">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: DAY_COLORS[1] }} />
            วันที่ 1
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: DAY_COLORS[2] }} />
            วันที่ 2
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: DAY_COLORS[3] }} />
            วันที่ 3
          </span>
        </div>
      </header>
      <BangkokMap
        selectedRouteId={selectedRouteId}
        selectedOptionByRoute={selectedOptionByRoute}
        onRouteSelect={onRouteSelect}
      />
    </section>
  );
}
