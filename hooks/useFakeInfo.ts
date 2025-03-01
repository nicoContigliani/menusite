import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

interface SectionTime {
  [key: string]: number;
}

interface HistoryEntry {
  section: string;
  timeSpent: number;
  startTime: number | null;
  endTime: number;
}

interface ClickEntry {
  section: string;
  element: string;
  timestamp: number;
}

interface FakeInfo {
  userId: string;
  email: string;
  sectionTimes: SectionTime;
  totalTime: number;
  history: HistoryEntry[];
  clicks: ClickEntry[];
  nameCompany: string;
}

const generateFakeInfo = (date: number, user: { userId: string; email: string }): FakeInfo => {
  const sections = [
    "Pastas-0-Lasagna Clásica",
    "Pastas-2-Fettuccine Alfredo",
    "Pastas-4-Penne Arrabbiata",
    "Pizzas-1-Pizza Pepperoni",
    "Pastas-3-Ravioli de Espinaca",
  ];

  const sectionTimes: SectionTime = sections.reduce((acc, section) => {
    acc[section] = Math.floor(Math.random() * 2000);
    return acc;
  }, {} as SectionTime);

  const totalTime = Object.values(sectionTimes).reduce((acc, time) => acc + time, 0);

  const history: HistoryEntry[] = sections.map((section) => ({
    section,
    timeSpent: sectionTimes[section],
    startTime: null,
    endTime: date + Math.floor(Math.random() * 5000),
  }));

  const clicks: ClickEntry[] = sections.flatMap((section) => [
    { section, element: "image", timestamp: date + Math.floor(Math.random() * 5000) },
    { section, element: "menuItem", timestamp: date + Math.floor(Math.random() * 5000) },
  ]);

  return {
    userId: user.userId || uuidv4(),
    email: user.email || "default@example.com",
    sectionTimes,
    totalTime,
    history,
    clicks,
    nameCompany: "LlakaScript",
  };
};

const useFakeInfo = (date: number, user: { userId: string; email: string }) => {
  return useMemo(() => generateFakeInfo(date, user), [date, user]);
};

export default useFakeInfo;
