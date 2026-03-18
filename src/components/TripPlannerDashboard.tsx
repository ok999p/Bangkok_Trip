"use client";

import { useState } from "react";
import { MapSection } from "@/components/MapSection";
import { Reveal } from "@/components/Reveal";
import { DayPlanner } from "@/components/transport/DayPlanner";
import {
  getDefaultSelectedOptions,
  type TransportOptionType,
} from "@/data/transportData";

export function TripPlannerDashboard() {
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [selectedOptionByRoute, setSelectedOptionByRoute] = useState(
    getDefaultSelectedOptions()
  );

  const handleSelectRouteOption = (
    routeId: string,
    optionType: TransportOptionType
  ) => {
    setSelectedRouteId(routeId);
    setSelectedOptionByRoute((prev) => ({
      ...prev,
      [routeId]: optionType,
    }));
  };

  return (
    <>
      <Reveal delay={0.1}>
        <MapSection
          selectedRouteId={selectedRouteId}
          selectedOptionByRoute={selectedOptionByRoute}
          onRouteSelect={setSelectedRouteId}
        />
      </Reveal>

      <Reveal delay={0.15}>
        <DayPlanner
          selectedRouteId={selectedRouteId}
          selectedOptionByRoute={selectedOptionByRoute}
          onSelectRouteOption={handleSelectRouteOption}
          onFocusRoute={setSelectedRouteId}
        />
      </Reveal>
    </>
  );
}
