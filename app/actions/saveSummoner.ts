"use server";

import { prisma } from "@/lib/prisma";
import { action } from "@/lib/backend/safe-actions";
import { z } from "zod";

const SummonerSchema = z.object({
  puuid: z.string(),
  gameName: z.string(),
  tagLine: z.string(),
  accountId: z.string(),
  profileIconId: z.number(),
  revisionDate: z.number().transform((n) => BigInt(n)),
  summonerLevel: z.number(),
  tier: z.string().optional(),
  rank: z.string().optional(),
  selected: z.boolean().optional().default(false), // Make optional with default false
});

export const saveSummonerAction = action
  .schema(SummonerSchema)
  .action(async ({ parsedInput }) => {
    try {
      const summoner = await prisma.summoner.upsert({
        where: { puuid: parsedInput.puuid },
        update: parsedInput,
        create: parsedInput,
      });
      return summoner;
    } catch (error) {
      console.error("Error saving summoner:", error);
      throw new Error("Failed to save summoner data");
    }
  });
