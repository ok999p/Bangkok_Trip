export type TransportOptionType = "public" | "grab" | "bolt";

export type StationStep = {
  line: string;
  from: string;
  to: string;
  transfer?: string;
};

export type LocationPoint = {
  name: string;
  lat: number;
  lon: number;
  icon: string;
  mapUrl: string;
};

export type TransportOption = {
  type: TransportOptionType;
  label: "Cheapest" | "Fastest" | "Best Value";
  time: string;
  minMinutes: number;
  maxMinutes: number;
  description: string;
  icon: string;
  totalCost: number;
  costPerPerson: number;
  vansNeeded?: number;
  capacity?: number;
  pricePerVan?: number;
  stationSteps?: StationStep[];
  costFormula?: string;
};

export type TravelRoute = {
  id: string;
  day: 1 | 2 | 3;
  dayLabel: string;
  from: string;
  to: string;
  title: string;
  color: string;
  options: TransportOption[];
  publicPath?: [number, number][];
};

export type SelectedOptionByRoute = Record<string, TransportOptionType>;

export const GROUP_SIZE = 15;
export const GLOBAL_DISCLAIMER =
  "ราคานี้เป็นการประมาณจากข้อมูลที่รวบรวมเมื่อวันที่ 18 มีนาคม 2026 ราคาและเวลาเดินทางจริงอาจแตกต่างได้ และผู้ขับอาจปฏิเสธงานตามเงื่อนไขหรือข้อกำหนดของแพลตฟอร์ม";

const LAST_MILE_ESTIMATE = 10;

export const DAY_COLORS: Record<1 | 2 | 3, string> = {
  1: "#22d3ee",
  2: "#a78bfa",
  3: "#fb923c",
};

export const BANGKOK_CENTER: [number, number] = [13.7563, 100.5018];

export const transportLocations: LocationPoint[] = [
  {
    name: "หอพัก (SKSC)",
    lat: 13.766688674530222,
    lon: 100.50775635735472,
    icon: "🏠",
    mapUrl: "https://www.google.com/maps?q=13.766688674530222,100.50775635735472",
  },
  {
    name: "ALL Robotics",
    lat: 13.900989267865048,
    lon: 100.53010294972914,
    icon: "🤖",
    mapUrl: "https://www.google.com/maps?q=13.900989267865048,100.53010294972914",
  },
  {
    name: "Gosoft",
    lat: 13.901671933381165,
    lon: 100.53130509814986,
    icon: "💻",
    mapUrl: "https://www.google.com/maps?q=13.901671933381165,100.53130509814986",
  },
  {
    name: "Bitkub Lab",
    lat: 13.720458253873595,
    lon: 100.56007740742875,
    icon: "₿",
    mapUrl: "https://www.google.com/maps?q=13.720458253873595,100.56007740742875",
  },
  {
    name: "Eventthai Co., Ltd.",
    lat: 13.91001987001572,
    lon: 100.54935681349279,
    icon: "🎤",
    mapUrl: "https://www.google.com/maps?q=13.91001987001572,100.54935681349279",
  },
  {
    name: "สนามบินดอนเมือง",
    lat: 13.912603,
    lon: 100.606707,
    icon: "✈️",
    mapUrl: "https://www.google.com/maps?q=13.912603,100.606707",
  },
];

export const dayLabels: Record<1 | 2 | 3, string> = {
  1: "วันที่ 1 - 23 มีนาคม",
  2: "วันที่ 2 - 24 มีนาคม",
  3: "วันที่ 3 - 25 มีนาคม",
};

function round2(value: number) {
  return Math.round(value * 100) / 100;
}

function createRideOption(input: {
  type: "grab" | "bolt";
  label: "Cheapest" | "Fastest" | "Best Value";
  time: string;
  minMinutes: number;
  maxMinutes: number;
  description: string;
  icon: string;
  pricePerVan: number;
  capacity: number;
}): TransportOption {
  const vansNeeded = Math.ceil(GROUP_SIZE / input.capacity);
  const totalCost = vansNeeded * input.pricePerVan;

  return {
    type: input.type,
    label: input.label,
    time: input.time,
    minMinutes: input.minMinutes,
    maxMinutes: input.maxMinutes,
    description: input.description,
    icon: input.icon,
    totalCost,
    costPerPerson: round2(totalCost / GROUP_SIZE),
    vansNeeded,
    capacity: input.capacity,
    pricePerVan: input.pricePerVan,
  };
}

function createPublicOption(input: {
  label: "Cheapest" | "Fastest" | "Best Value";
  time: string;
  minMinutes: number;
  maxMinutes: number;
  description: string;
  icon: string;
  perPersonCost: number;
  stationSteps: StationStep[];
  costFormula?: string;
}): TransportOption {
  const totalCost = input.perPersonCost * GROUP_SIZE;

  return {
    type: "public",
    label: input.label,
    time: input.time,
    minMinutes: input.minMinutes,
    maxMinutes: input.maxMinutes,
    description: input.description,
    icon: input.icon,
    totalCost,
    costPerPerson: input.perPersonCost,
    stationSteps: input.stationSteps,
    costFormula: input.costFormula,
  };
}

export const travelRoutes: TravelRoute[] = [
  {
    id: "d1-airport-dorm",
    day: 1,
    dayLabel: "23 มีนาคม 2026",
    from: "สนามบินดอนเมือง",
    to: "หอพัก (SKSC)",
    title: "สนามบินดอนเมือง -> หอพัก",
    color: DAY_COLORS[1],
    publicPath: [
      [13.912603, 100.606707],
      [13.8032, 100.5518],
      [13.7786, 100.5102],
      [13.766688674530222, 100.50775635735472],
    ],
    options: [
      createPublicOption({
        label: "Cheapest",
        time: "60-75 นาที",
        minMinutes: 60,
        maxMinutes: 75,
        icon: "🚆",
        description:
          "สายสีแดง: ดอนเมือง -> กรุงเทพอภิวัฒน์, MRT สายสีน้ำเงิน: บางซื่อ -> บางยี่ขัน แล้วเดิน/Grab/Bolt ต่อ",
        perPersonCost: 33 + 27 + LAST_MILE_ESTIMATE,
        costFormula: "33 + 27 + ค่าระยะสุดท้าย",
        stationSteps: [
          {
            line: "สายสีแดง",
            from: "ดอนเมือง",
            to: "กรุงเทพอภิวัฒน์",
            transfer: "เปลี่ยนไป MRT สายสีน้ำเงินที่บางซื่อ",
          },
          {
            line: "MRT สายสีน้ำเงิน",
            from: "บางซื่อ",
            to: "บางยี่ขัน",
            transfer: "เดิน/Grab/Bolt ต่อไปหอพัก",
          },
        ],
      }),
      createRideOption({
        type: "grab",
        label: "Fastest",
        time: "30-45 นาที",
        minMinutes: 30,
        maxMinutes: 45,
        icon: "🚕",
        description: "นั่ง Grab ตรงจากสนามบิน",
        pricePerVan: 587,
        capacity: 10,
      }),
      createRideOption({
        type: "bolt",
        label: "Best Value",
        time: "30-45 นาที",
        minMinutes: 30,
        maxMinutes: 45,
        icon: "⚡",
        description: "นั่ง Bolt (โดยมากราคาต่ำกว่า Grab)",
        pricePerVan: 488,
        capacity: 8,
      }),
    ],
  },
  {
    id: "d1-dorm-all",
    day: 1,
    dayLabel: "23 มีนาคม 2026",
    from: "หอพัก (SKSC)",
    to: "ALL Robotics",
    title: "หอพัก -> ALL Robotics",
    color: DAY_COLORS[1],
    publicPath: [
      [13.766688674530222, 100.50775635735472],
      [13.7786, 100.5102],
      [13.807, 100.531],
      [13.866, 100.527],
      [13.900989267865048, 100.53010294972914],
    ],
    options: [
      createPublicOption({
        label: "Cheapest",
        time: "60-80 นาที",
        minMinutes: 60,
        maxMinutes: 80,
        icon: "🚇",
        description:
          "เดินทางช่วงแรกไปบางยี่ขัน, MRT ไปเตาปูน, สายสีม่วงไปศูนย์ราชการนนทบุรี, สายสีชมพูไปแจ้งวัฒนะ-ปากเกร็ด 28 แล้วเดินต่อ",
        perPersonCost: LAST_MILE_ESTIMATE + 30 + 28 + 41,
        costFormula: "ค่าระยะสุดท้าย + 30 + 28 + 41",
        stationSteps: [
          {
            line: "ช่วงเชื่อมต่อ",
            from: "หอพัก (SKSC)",
            to: "บางยี่ขัน",
            transfer: "เดินทางไปสถานีด้วย Grab/Bolt",
          },
          {
            line: "MRT สายสีน้ำเงิน",
            from: "บางยี่ขัน",
            to: "เตาปูน",
            transfer: "เปลี่ยนไปสายสีม่วง",
          },
          {
            line: "สายสีม่วง",
            from: "เตาปูน",
            to: "ศูนย์ราชการนนทบุรี",
            transfer: "เปลี่ยนไปสายสีชมพู",
          },
          {
            line: "สายสีชมพู",
            from: "ศูนย์ราชการนนทบุรี",
            to: "แจ้งวัฒนะ-ปากเกร็ด 28",
            transfer: "เดินต่อช่วงสุดท้าย",
          },
        ],
      }),
      createRideOption({
        type: "grab",
        label: "Fastest",
        time: "35-50 นาที",
        minMinutes: 35,
        maxMinutes: 50,
        icon: "🚕",
        description: "รถตู้ Grab วิ่งตรงถึงบริษัท",
        pricePerVan: 539,
        capacity: 10,
      }),
      createRideOption({
        type: "bolt",
        label: "Best Value",
        time: "35-55 นาที",
        minMinutes: 35,
        maxMinutes: 55,
        icon: "⚡",
        description: "รถตู้ Bolt วิ่งตรงถึงบริษัท",
        pricePerVan: 317,
        capacity: 6,
      }),
    ],
  },
  {
    id: "d2-dorm-gosoft",
    day: 2,
    dayLabel: "24 มีนาคม 2026",
    from: "หอพัก (SKSC)",
    to: "Gosoft",
    title: "หอพัก -> Gosoft",
    color: DAY_COLORS[2],
    publicPath: [
      [13.766688674530222, 100.50775635735472],
      [13.7786, 100.5102],
      [13.807, 100.531],
      [13.866, 100.527],
      [13.901671933381165, 100.53130509814986],
    ],
    options: [
      createPublicOption({
        label: "Cheapest",
        time: "60-80 นาที",
        minMinutes: 60,
        maxMinutes: 80,
        icon: "🚇",
        description:
          "ใช้เส้นทางเดียวกับ ALL Robotics: บางยี่ขัน -> เตาปูน -> ศูนย์ราชการนนทบุรี -> แจ้งวัฒนะ-ปากเกร็ด 28",
        perPersonCost: LAST_MILE_ESTIMATE + 30 + 28 + 41,
        costFormula: "ค่าระยะสุดท้าย + 30 + 28 + 41",
        stationSteps: [
          {
            line: "ช่วงเชื่อมต่อ",
            from: "หอพัก (SKSC)",
            to: "บางยี่ขัน",
            transfer: "เดินทางไปสถานีด้วย Grab/Bolt",
          },
          {
            line: "MRT สายสีน้ำเงิน",
            from: "บางยี่ขัน",
            to: "เตาปูน",
            transfer: "เปลี่ยนไปสายสีม่วง",
          },
          {
            line: "สายสีม่วง",
            from: "เตาปูน",
            to: "ศูนย์ราชการนนทบุรี",
            transfer: "เปลี่ยนไปสายสีชมพู",
          },
          {
            line: "สายสีชมพู",
            from: "ศูนย์ราชการนนทบุรี",
            to: "แจ้งวัฒนะ-ปากเกร็ด 28",
            transfer: "เดินต่อช่วงสุดท้าย",
          },
        ],
      }),
      createRideOption({
        type: "grab",
        label: "Fastest",
        time: "35-50 นาที",
        minMinutes: 35,
        maxMinutes: 50,
        icon: "🚕",
        description: "รถตู้ Grab วิ่งตรงถึงบริษัท",
        pricePerVan: 539,
        capacity: 10,
      }),
      createRideOption({
        type: "bolt",
        label: "Best Value",
        time: "35-55 นาที",
        minMinutes: 35,
        maxMinutes: 55,
        icon: "⚡",
        description: "รถตู้ Bolt วิ่งตรงถึงบริษัท",
        pricePerVan: 317,
        capacity: 6,
      }),
    ],
  },
  {
    id: "d2-gosoft-bitkub",
    day: 2,
    dayLabel: "24 มีนาคม 2026",
    from: "Gosoft",
    to: "Bitkub Lab",
    title: "Gosoft -> Bitkub Lab",
    color: DAY_COLORS[2],
    publicPath: [
      [13.901671933381165, 100.53130509814986],
      [13.8789, 100.5423],
      [13.8032, 100.5518],
      [13.8032, 100.5388],
      [13.720458253873595, 100.56007740742875],
    ],
    options: [
      createPublicOption({
        label: "Cheapest",
        time: "60-75 นาที",
        minMinutes: 60,
        maxMinutes: 75,
        icon: "🚆",
        description:
          "สายสีชมพู: แจ้งวัฒนะ-ปากเกร็ด 28 -> หลักสี่, สายสีแดง: หลักสี่ -> กรุงเทพอภิวัฒน์, MRT สายสีน้ำเงิน: บางซื่อ -> คลองเตย",
        perPersonCost: 96,
        stationSteps: [
          {
            line: "สายสีชมพู",
            from: "แจ้งวัฒนะ-ปากเกร็ด 28",
            to: "หลักสี่",
            transfer: "เปลี่ยนไปสายสีแดง",
          },
          {
            line: "สายสีแดง",
            from: "หลักสี่",
            to: "กรุงเทพอภิวัฒน์",
            transfer: "เปลี่ยนไป MRT สายสีน้ำเงินที่บางซื่อ",
          },
          {
            line: "MRT สายสีน้ำเงิน",
            from: "บางซื่อ",
            to: "คลองเตย",
          },
        ],
      }),
      createRideOption({
        type: "grab",
        label: "Fastest",
        time: "35-50 นาที",
        minMinutes: 35,
        maxMinutes: 50,
        icon: "🚕",
        description: "รถตู้ Grab วิ่งตรงถึงบริษัท",
        pricePerVan: 597,
        capacity: 10,
      }),
      createRideOption({
        type: "bolt",
        label: "Best Value",
        time: "35-55 นาที",
        minMinutes: 35,
        maxMinutes: 55,
        icon: "⚡",
        description: "รถตู้ Bolt วิ่งตรงถึงบริษัท",
        pricePerVan: 357,
        capacity: 6,
      }),
    ],
  },
  {
    id: "d3-dorm-eventthai",
    day: 3,
    dayLabel: "25 มีนาคม 2026",
    from: "หอพัก (SKSC)",
    to: "Eventthai Co., Ltd.",
    title: "หอพัก -> Eventthai",
    color: DAY_COLORS[3],
    publicPath: [
      [13.766688674530222, 100.50775635735472],
      [13.807, 100.531],
      [13.866, 100.527],
      [13.8839, 100.5589],
      [13.91001987001572, 100.54935681349279],
    ],
    options: [
      createPublicOption({
        label: "Cheapest",
        time: "60-75 นาที",
        minMinutes: 60,
        maxMinutes: 75,
        icon: "🚇",
        description:
          "บางยี่ขัน -> เตาปูน, สายสีม่วง -> ศูนย์ราชการนนทบุรี, สายสีชมพู -> IMPACT เมืองทองธานี",
        perPersonCost: LAST_MILE_ESTIMATE + 30 + 28 + 45,
        costFormula: "ค่าระยะสุดท้าย + 30 + 28 + 45",
        stationSteps: [
          {
            line: "MRT สายสีน้ำเงิน",
            from: "บางยี่ขัน",
            to: "เตาปูน",
            transfer: "เปลี่ยนไปสายสีม่วง",
          },
          {
            line: "สายสีม่วง",
            from: "เตาปูน",
            to: "ศูนย์ราชการนนทบุรี",
            transfer: "เปลี่ยนไปสายสีชมพู",
          },
          {
            line: "สายสีชมพู",
            from: "ศูนย์ราชการนนทบุรี",
            to: "IMPACT เมืองทองธานี",
          },
        ],
      }),
      createRideOption({
        type: "grab",
        label: "Fastest",
        time: "35-50 นาที",
        minMinutes: 35,
        maxMinutes: 50,
        icon: "🚕",
        description: "รถตู้ Grab วิ่งตรงถึงบริษัท",
        pricePerVan: 546,
        capacity: 10,
      }),
      createRideOption({
        type: "bolt",
        label: "Best Value",
        time: "35-55 นาที",
        minMinutes: 35,
        maxMinutes: 55,
        icon: "⚡",
        description: "รถตู้ Bolt วิ่งตรงถึงบริษัท",
        pricePerVan: 321,
        capacity: 6,
      }),
    ],
  },
];

export function getLocationByName(name: string): LocationPoint {
  const location = transportLocations.find((item) => item.name === name);
  if (!location) {
    throw new Error(`ไม่พบสถานที่: ${name}`);
  }
  return location;
}

export function getRoutesByDay(day: 1 | 2 | 3): TravelRoute[] {
  return travelRoutes.filter((route) => route.day === day);
}

export function getOptionByType(
  route: TravelRoute,
  optionType: TransportOptionType
): TransportOption {
  const option = route.options.find((item) => item.type === optionType);
  if (!option) {
    throw new Error(`Option ${optionType} not found for route ${route.id}`);
  }
  return option;
}

export function getCheapestOption(route: TravelRoute): TransportOption {
  return route.options.reduce((acc, option) =>
    option.totalCost < acc.totalCost ? option : acc
  );
}

export function getDefaultSelectedOptions(): SelectedOptionByRoute {
  return travelRoutes.reduce((acc, route) => {
    acc[route.id] = "public";
    return acc;
  }, {} as SelectedOptionByRoute);
}

export function calculateDayTotalsBySelection(
  day: 1 | 2 | 3,
  selectedOptionByRoute: SelectedOptionByRoute
) {
  const routes = getRoutesByDay(day);

  return routes.reduce(
    (acc, route) => {
      const option = getOptionByType(
        route,
        selectedOptionByRoute[route.id] ?? "public"
      );
      acc.minMinutes += option.minMinutes;
      acc.maxMinutes += option.maxMinutes;
      acc.totalCost += option.totalCost;
      return acc;
    },
    { minMinutes: 0, maxMinutes: 0, totalCost: 0 }
  );
}

export function calculateOverallTotalsBySelection(
  selectedOptionByRoute: SelectedOptionByRoute
) {
  const overall = travelRoutes.reduce(
    (acc, route) => {
      const option = getOptionByType(
        route,
        selectedOptionByRoute[route.id] ?? "public"
      );
      acc.minMinutes += option.minMinutes;
      acc.maxMinutes += option.maxMinutes;
      acc.totalCost += option.totalCost;
      return acc;
    },
    { minMinutes: 0, maxMinutes: 0, totalCost: 0 }
  );

  return {
    ...overall,
    costPerPerson: round2(overall.totalCost / GROUP_SIZE),
  };
}

export function getRoutePositionsByOption(
  route: TravelRoute,
  optionType: TransportOptionType
): [number, number][] {
  if (optionType === "public" && route.publicPath && route.publicPath.length > 1) {
    return route.publicPath;
  }

  const from = getLocationByName(route.from);
  const to = getLocationByName(route.to);
  return [
    [from.lat, from.lon],
    [to.lat, to.lon],
  ];
}
