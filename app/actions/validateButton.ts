"use server";

import { prisma } from "@/lib/prisma";

export async function toggleSummonerTeam(summonerId: string) {
  const summoner = await prisma.summoner.findUnique({
    where: { id: summonerId },
    select: { team: true },
  });

  if (summoner) {
    const newTeam = summoner.team === null ? 1 : summoner.team === 1 ? 2 : null;
    await prisma.summoner.update({
      where: { id: summonerId },
      data: { team: newTeam },
    });
    return newTeam;
  }

  return null;
}
