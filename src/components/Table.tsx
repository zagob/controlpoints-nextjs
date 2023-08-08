"use client";

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./ui/DataTable";
import { usePoint } from "@/contexts/PointProvider";
import axios from "axios";
import { format, getMonth, getYear } from "date-fns";
import { minutesToTime } from "@/utils/minutesToTime";
import { useState } from "react";
import { Filter } from "./Filter";

const year = 2023;

export function Table() {
  const { dataPoint, onSetDate } = usePoint();
  const [month, setMonth] = useState(getMonth(new Date()) + 1);

  const { data: points } = useQuery(
    ["getByMonth", month, year],
    async () => {
      const { data } = await axios.get(`/api/point/getByYearAndMonth`, {
        params: {
          year,
          month,
        },
      });

      return data.points;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  console.log("points", points);
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded shadow row-span-2 p-4 h-full overflow-y-auto">
      <Filter
        month={month}
        year={year}
        onBackMonth={() => setMonth((item) => item - 1)}
        onNextMonth={() => setMonth((item) => item + 1)}
      />

      <DataTable
        columns={[
          {
            header: "Data",
            accessorKey: "createdAt",
            cell: ({ row }) => {
              return format(new Date(row?.original?.createdAt), "dd/MM/yyyy");
            },
          },
          {
            header: "Entrada",
            accessorKey: "time1",
            cell: ({ row }) => {
              return minutesToTime(row?.original?.time1);
            },
          },
          {
            header: "Almoço",
            accessorKey: "time3",
            cell: ({ row }) => {
              return `${minutesToTime(row?.original?.time2)} - ${minutesToTime(
                row?.original?.time3
              )}`;
            },
          },
          {
            header: "Saída",
            accessorKey: "time4",
            cell: ({ row }) => {
              return minutesToTime(row?.original?.time4);
            },
          },
          {
            header: "Total",
          },
          {
            header: "Bonús",
          },
        ]}
        data={points ?? []}
      />
    </div>
  );
}
