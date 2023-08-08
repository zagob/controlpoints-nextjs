"use client";

import { createContext, useContext, useState } from "react";

interface PointContextProps {
  dataPoint: Date | undefined;
  onSetDate: (date: Date | undefined) => void;
  //   onSetMonthDate: (date: Date) => void;
}

export const PointContext = createContext({} as PointContextProps);

export function PointProvider({ children }: { children: React.ReactNode }) {
  const [dataPoint, setDataPoint] = useState<Date | undefined>(new Date());

  function onSetDate(date: Date | undefined) {
    setDataPoint(date);
    console.log("d", date);
  }

  console.log("dataPoint", dataPoint);

  return (
    <PointContext.Provider value={{ dataPoint, onSetDate }}>
      {children}
    </PointContext.Provider>
  );
}

export function usePoint() {
  const point = useContext(PointContext);
  return point;
}
