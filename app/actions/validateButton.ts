"use server";

import { prisma } from "@/lib/prisma";

export async function toggleSummonerSelection(summonerId: string) {
  const summoner = await prisma.summoner.findUnique({
    where: { id: summonerId },
    select: { selected: true },
  });

  if (summoner) {
    await prisma.summoner.update({
      where: { id: summonerId },
      data: { selected: !summoner.selected },
    });
    return !summoner.selected;
  }

  return null;
}
