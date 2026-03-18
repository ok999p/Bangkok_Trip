"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, MapPinned } from "lucide-react";
import { useState } from "react";
import {
  type SelectedOptionByRoute,
  type TransportOptionType,
  type TravelRoute,
} from "@/data/transportData";
import { TransportOptionCard } from "@/components/transport/TransportOptionCard";

type RouteCardProps = {
  route: TravelRoute;
  selectedRouteId: string | null;
  selectedOptionByRoute: SelectedOptionByRoute;
  onSelectOption: (routeId: string, optionType: TransportOptionType) => void;
  onFocusRoute: (routeId: string) => void;
};

export function RouteCard({
  route,
  selectedRouteId,
  selectedOptionByRoute,
  onSelectOption,
  onFocusRoute,
}: RouteCardProps) {
  const [open, setOpen] = useState(true);

  const isActiveRoute = selectedRouteId === route.id;
  const selectedType = selectedOptionByRoute[route.id] ?? "public";

  const options = route.options;

  const selectedOption = route.options.find((item) => item.type === selectedType);
  const selectedTypeLabel =
    selectedOption?.type === "public"
      ? "ขนส่งสาธารณะ"
      : selectedOption?.type === "grab"
        ? "Grab"
        : "Bolt";

  return (
    <article
      className={`rounded-3xl border bg-slate-950/55 p-4 transition-all sm:p-5 ${
        isActiveRoute
          ? "border-cyan-300/70 shadow-xl shadow-cyan-600/15"
          : "border-white/10"
      }`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs text-slate-400">{route.dayLabel}</p>
          <h4 className="mt-1 text-base font-semibold text-slate-100 sm:text-lg">
            {route.title}
          </h4>
          {selectedOption ? (
            <p className="mt-2 text-sm text-cyan-200">
              เลือกอยู่: {selectedTypeLabel}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onFocusRoute(route.id)}
            className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-cyan-200 transition-colors hover:bg-cyan-400/15"
          >
            <MapPinned className="h-3.5 w-3.5" />
            ไฮไลต์บนแผนที่
          </button>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-full border border-white/15 bg-white/5 p-1.5 text-slate-300"
            aria-label={open ? "ย่อรายการตัวเลือกการเดินทาง" : "ขยายรายการตัวเลือกการเดินทาง"}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
            />
          </button>
        </div>
      </header>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {options.map((option) => (
                <TransportOptionCard
                  key={`${route.id}-${option.type}`}
                  option={option}
                  selected={selectedType === option.type}
                  onSelect={() => onSelectOption(route.id, option.type)}
                />
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
