import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { Button } from "./ui/Button";
import { format } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";

interface FilterProps {
  month: number;
  year: number;
  onBackMonth: () => void;
  onNextMonth: () => void;
}

export function Filter({ month, year, onBackMonth, onNextMonth }: FilterProps) {
  return (
    <div className="flex items-center gap-2 w-[400px] mb-2">
      <div className="flex items-center border border-zinc-600 h-fit w-fit rounded">
        <Button disabled={month === 1} onClick={onBackMonth} className="">
          <ArrowBigLeft />
        </Button>
        <div className="h-full w-[150px] text-center">
          {format(new Date(year, month, 0), "MMMM", {
            locale: ptBr,
          })}
        </div>
        <Button disabled={month === 12} onClick={onNextMonth}>
          <ArrowBigRight />
        </Button>
      </div>

      <Select>
        <SelectTrigger className="border border-zinc-600">
          <SelectValue placeholder="2023" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-200">
          <SelectGroup>
            <SelectLabel>Ano</SelectLabel>
            <SelectItem value={year.toString()}>2023</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
