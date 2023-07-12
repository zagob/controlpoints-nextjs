import { z } from "zod";

export const formPointSchema = z.object({
  time1: z.string(),
  time2: z.string(),
  time3: z.string(),
  time4: z.string(),
});

export type ValidatorFormPoint = z.infer<typeof formPointSchema>;
