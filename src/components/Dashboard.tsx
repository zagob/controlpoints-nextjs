import { AddPoint } from "./AddPoint";
import { Table } from "./Table";

export function Dashboard() {
  return (
    <main className="h-full w-full flex space-x-4">
      <AddPoint />
      <div className="flex-1 grid grid-rows-3 gap-4">
        <Table />
        <div className="bg-zinc-800 border border-zinc-700 rounded shadow p-4">
          graph
        </div>
      </div>
    </main>
  );
}
