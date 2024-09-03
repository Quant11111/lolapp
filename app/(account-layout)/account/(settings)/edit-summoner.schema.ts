import { z } from "zod";

export const SummonerFormSchema = z.object({
  name: z
    .string()
    .regex(/^[^#]+#[^#]+$/, "You need a propper <name>#<tag> format"),
});

export type SummonerFormType = z.infer<typeof SummonerFormSchema>;
