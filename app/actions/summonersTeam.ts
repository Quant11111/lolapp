"use server";

import { prisma } from "@/lib/prisma";

export async function getSummonersWithRankAndTeam() {
  try {
    const summoners = await prisma.summoner.findMany({
      select: {
        id: true,
        gameName: true,
        tagLine: true,
        rank: true,
        tier: true,
        team: true,
      },
      orderBy: {
        rank: "desc",
      },
    });
    return summoners;
  } catch (error) {
    console.error("Error fetching summoners:", error);
    throw new Error("Failed to fetch summoners");
  }
}

export async function resetSummonerTeam(summonerId: string) {
  try {
    await prisma.summoner.update({
      where: { id: summonerId },
      data: { team: null },
    });
    return { success: true };
  } catch (error) {
    console.error("Error resetting summoner team:", error);
    throw new Error("Failed to reset summoner team");
  }
}
