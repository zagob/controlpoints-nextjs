"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Calendar } from "./ui/Calendar";
import { Card, CardContent, CardFooter } from "./ui/Card";
import ptBr from "date-fns/locale/pt-BR";
import { format } from "date-fns";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/Form";
import { useForm } from "react-hook-form";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import {
  ValidatorFormPoint,
  formPointSchema,
} from "@/lib/validators/ValidatorFormPoint";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransformValueInput } from "@/utils/onInputFieldTime";
import { Profile } from "./Profile";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getMonth, getYear } from "date-fns";
import { usePoint } from "@/contexts/PointProvider";
import { useToast } from "@/hooks/use-toast";

export function AddPoint() {
  const { dataPoint, onSetDate } = usePoint();
  const { toast } = useToast();
  const form = useForm<ValidatorFormPoint>({
    resolver: zodResolver(formPointSchema),
  });

  const { mutate: addPoint } = useMutation({
    mutationFn: async (data: ValidatorFormPoint) => {
      const payload = {
        ...data,
        datePoint: dataPoint,
      };
      const { data: dataResponse } = await axios.post(
        `/api/point/create`,
        payload
      );

      return dataResponse;
    },
    onSuccess: () => {
      form.reset();

      return toast({
        title: "Ponto Criado com sucesso",
      });
    },
  });

  function handleSubmitAddPoint(data: ValidatorFormPoint) {
    addPoint(data);
  }

  // const { data } = useQuery(
  //   ["getByMonth", 2023],
  //   async () => {
  //     const { data } = await axios.get(`/api/point/getByYear`, {
  //       params: {
  //         year: 2023,
  //       },
  //     });

  //     return data.points;
  //   },
  //   {
  //     refetchOnWindowFocus: false,
  //   }
  // );

  return (
    <div className="w-[400px] grid justify-center pt-4 bg-zinc-800 border border-zinc-700 rounded shadow overflow-auto">
      <Card className="border-none">
        <CardContent className="space-y-3">
          <Profile />
          <div className="border grid justify-center p-4 border-zinc-900">
            <Calendar
              locale={ptBr}
              mode="single"
              selected={dataPoint}
              onSelect={onSetDate}
              onMonthChange={onSetDate}
              disabled={[{ dayOfWeek: [0, 6] }, new Date(2023, 6, 13)]}
              showOutsideDays={false}
              className=""
              classNames={{
                day_selected:
                  "bg-zinc-900 rounded hover:bg-zinc-900 border border-zinc-700",
                day_today: "text-green-500 hover:text-green-500",
                nav_button: "border-none",
              }}
            />
            {dataPoint ? (
              <span className="text-sm text-zinc-300">
                <strong>Data Selecionada:</strong>{" "}
                {format(new Date(dataPoint), "dd 'de' MMM 'de' yyyy")}
              </span>
            ) : (
              <span className="text-sm text-red-300">
                Nenhuma data selecionada
              </span>
            )}
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitAddPoint)}>
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="time1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Entrada 1</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="00:00"
                          // onInput={TransformValueInput}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Saída 1</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="00:00"
                          onInput={TransformValueInput}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Entrada 2</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="00:00"
                          onInput={TransformValueInput}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time4"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Saída 2</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="00:00"
                          onInput={TransformValueInput}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={!dataPoint}
                className="bg-green-500 rounded w-full mt-4 hover:bg-green-600 uppercase"
              >
                Adicionar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
