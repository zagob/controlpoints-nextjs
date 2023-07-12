import { AddPoint } from "./AddPoint";
import { Calendar } from "./ui/Calendar";
import { Card, CardContent } from "./ui/Card";

export function Dashboard() {
  return (
    <main className="h-full w-full flex space-x-4">
      <AddPoint />
      <div className="border flex-1">
        <div>table</div>
        <div>graph</div>
      </div>
    </main>
  );
}
