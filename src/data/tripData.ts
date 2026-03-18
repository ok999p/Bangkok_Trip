export type TripLocation = {
  name: string;
  mapUrl: string;
  lat: number;
  lng: number;
  icon: string;
  description: string;
};

export type ScheduleEntry = {
  time: string;
  title: string;
  icon: string;
  detail?: string;
};

export type ScheduleDay = {
  dateLabel: string;
  entries: ScheduleEntry[];
};

export const BANGKOK_CENTER: [number, number] = [13.7563, 100.5018];

export const tripLocations: TripLocation[] = [
  {
    name: "ALL Robotics",
    mapUrl: "https://maps.app.goo.gl/U18FFxdaHVjbEVrk8",
    lat: 13.8242,
    lng: 100.5587,
    icon: "🤖",
    description: "Robotics systems and applied automation showcase.",
  },
  {
    name: "Gosoft (Thailand) Co., Ltd.",
    mapUrl: "https://maps.app.goo.gl/1NvhFBM7Gqm328R87",
    lat: 13.7268,
    lng: 100.5231,
    icon: "💻",
    description: "Enterprise software and digital platform operations.",
  },
  {
    name: "Bitkub Online Co., Ltd.",
    mapUrl: "https://maps.app.goo.gl/Zhjb6g1CWQg1YjmG8",
    lat: 13.7242,
    lng: 100.5695,
    icon: "₿",
    description: "Fintech innovation and blockchain product ecosystem.",
  },
  {
    name: "Eventthai Co., Ltd.",
    mapUrl: "https://maps.app.goo.gl/YA15BSSLrWSiz9c29",
    lat: 13.7428,
    lng: 100.5311,
    icon: "🎤",
    description: "Event technology, production workflow, and media tools.",
  },
];

export const scheduleByDay: ScheduleDay[] = [
  {
    dateLabel: "March 23, 2026",
    entries: [
      {
        time: "07:00",
        title: "Depart from Walailak University",
        icon: "📍",
        detail: "Group transfer to airport",
      },
      {
        time: "09:00",
        title: "Flight (Lion Air)",
        icon: "✈️",
      },
      {
        time: "13:30-16:00",
        title: "ALL Robotics",
        icon: "🏢",
      },
    ],
  },
  {
    dateLabel: "March 24, 2026",
    entries: [
      {
        time: "09:00-12:00",
        title: "Gosoft (Thailand)",
        icon: "🏢",
      },
      {
        time: "14:00-16:00",
        title: "Bitkub Labs",
        icon: "🏢",
      },
    ],
  },
  {
    dateLabel: "March 25, 2026",
    entries: [
      {
        time: "10:00-12:00",
        title: "Eventthai",
        icon: "🏢",
      },
      {
        time: "18:45",
        title: "Return flight (Lion Air)",
        icon: "✈️",
      },
    ],
  },
];
