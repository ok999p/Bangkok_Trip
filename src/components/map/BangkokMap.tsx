"use client";

import {
  MapContainer,
  Marker,
  Popup,
  Polyline,
  TileLayer,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import { Navigation } from "lucide-react";
import {
  BANGKOK_CENTER,
  getOptionByType,
  getRoutePositionsByOption,
  type SelectedOptionByRoute,
  transportLocations,
  travelRoutes,
} from "@/data/transportData";

function createEmojiIcon(symbol: string) {
  return L.divIcon({
    className: "custom-emoji-marker",
    html: `<div class=\"emoji-marker-wrap\">${symbol}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 36],
    popupAnchor: [0, -26],
  });
}

type BangkokMapProps = {
  selectedRouteId: string | null;
  selectedOptionByRoute: SelectedOptionByRoute;
  onRouteSelect: (routeId: string) => void;
};

export default function BangkokMap({
  selectedRouteId,
  selectedOptionByRoute,
  onRouteSelect,
}: BangkokMapProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10">
      <MapContainer
        center={BANGKOK_CENTER}
        zoom={11}
        scrollWheelZoom
        className="h-[360px] w-full sm:h-[440px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {travelRoutes.map((route) => {
          const selectedOptionType = selectedOptionByRoute[route.id] ?? "public";
          const selectedOption = getOptionByType(route, selectedOptionType);
          const optionTypeLabel =
            selectedOption.type === "public"
              ? "ขนส่งสาธารณะ"
              : selectedOption.type === "grab"
                ? "Grab"
                : "Bolt";
          const isActive = selectedRouteId === route.id;

          return (
            <Polyline
              key={route.id}
              positions={getRoutePositionsByOption(route, selectedOptionType)}
              eventHandlers={{
                click: () => onRouteSelect(route.id),
              }}
              pathOptions={{
                color: route.color,
                weight: isActive ? 8 : 5,
                opacity: isActive ? 0.95 : 0.72,
                lineCap: "round",
                dashArray: selectedOptionType === "public" ? "6 8" : undefined,
              }}
            >
              <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                <div className="text-xs font-medium">
                  {route.title} | {optionTypeLabel}
                </div>
              </Tooltip>
            </Polyline>
          );
        })}

        {transportLocations.map((location) => {
          const relatedRoutes = travelRoutes.filter(
            (route) => route.from === location.name || route.to === location.name
          );
          const fastestRoute = relatedRoutes
            .slice()
            .sort(
              (a, b) =>
                Math.min(...a.options.map((option) => option.minMinutes)) -
                Math.min(...b.options.map((option) => option.minMinutes))
            )[0];
          const fastestMinutes = fastestRoute
            ? Math.min(...fastestRoute.options.map((option) => option.minMinutes))
            : null;

          return (
          <Marker
            key={location.name}
            position={[location.lat, location.lon]}
            icon={createEmojiIcon(location.icon)}
          >
            <Tooltip>
              <div className="text-xs">
                <p className="font-semibold">{location.name}</p>
                {fastestRoute ? (
                  <p>
                    {relatedRoutes.length} เส้นทาง | เร็วสุด {fastestMinutes} นาที
                  </p>
                ) : (
                  <p>ยังไม่มีเส้นทางที่เชื่อมกับจุดนี้</p>
                )}
              </div>
            </Tooltip>
            <Popup>
              <div className="space-y-2">
                <p className="font-semibold text-slate-900">{location.name}</p>
                {relatedRoutes.length ? (
                  <ul className="space-y-1 text-xs text-slate-600">
                    {relatedRoutes.map((route) => (
                      <li key={route.id}>{route.title}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-600">จุดเชื่อมต่อการเดินทาง</p>
                )}
                <a
                  href={location.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  เปิดใน Google Maps
                </a>
              </div>
            </Popup>
          </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
