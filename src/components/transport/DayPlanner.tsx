"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  dayLabels,
  getRoutesByDay,
  type SelectedOptionByRoute,
  type TransportOptionType,
} from "@/data/transportData";
import { RouteCard } from "@/components/transport/RouteCard";

type DayPlannerProps = {
  selectedRouteId: string | null;
  selectedOptionByRoute: SelectedOptionByRoute;
  onSelectRouteOption: (routeId: string, optionType: TransportOptionType) => void;
  onFocusRoute: (routeId: string) => void;
};

const days: Array<1 | 2 | 3> = [1, 2, 3];

export function DayPlanner({
  selectedRouteId,
  selectedOptionByRoute,
  onSelectRouteOption,
  onFocusRoute,
}: DayPlannerProps) {
  const [openDay, setOpenDay] = useState<1 | 2 | 3 | null>(1);

  return (
    <section id="daily-plan" className="scroll-mt-24">
      <header className="mb-7 flex flex-col items-start justify-between gap-4 sm:flex-row sm:flex-wrap sm:items-end">
        <div>
          <p className="text-xs font-semibold text-cyan-300">
            ตัวเลือกการเดินทางรายวัน
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">
            แผนเดินทางแบบหลายตัวเลือก
          </h2>
        </div>
      </header>

      <div className="space-y-4">
        {days.map((day) => {
          const isOpen = openDay === day;
          const routes = getRoutesByDay(day);

          return (
            <article
              key={day}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
            >
              <button
                type="button"
                onClick={() => setOpenDay(isOpen ? null : day)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <div>
                  <h3 className="text-base font-semibold text-slate-100 sm:text-lg">{dayLabels[day]}</h3>
                </div>

                <ChevronDown
                  className={`h-5 w-5 text-slate-400 transition-transform ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 px-4 pb-4 sm:px-5 sm:pb-5">
                      {routes.map((route) => (
                        <RouteCard
                          key={route.id}
                          route={route}
                          selectedRouteId={selectedRouteId}
                          selectedOptionByRoute={selectedOptionByRoute}
                          onSelectOption={onSelectRouteOption}
                          onFocusRoute={onFocusRoute}
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </section>
  );
}
