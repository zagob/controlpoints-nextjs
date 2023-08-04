import { DataTable } from "./ui/DataTable";

export function Table() {
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded shadow row-span-2 p-4">
      <DataTable
        columns={[
          {
            header: "Data",
            accessorKey: "teste",
          },
          {
            header: "Entrada",
          },
          {
            header: "Almoço",
          },
          {
            header: "Saída",
          },
          {
            header: "Total",
          },
          {
            header: "Bonús",
          },
        ]}
        data={[
          {
            teste: "23123",
          },
          {
            teste: "111",
          },
        ]}
      />
    </div>
  );
}
