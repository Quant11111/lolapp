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
        blacklist: true,
        selected: true,
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

export async function resetAllSummonerTeams() {
  try {
    await prisma.summoner.updateMany({
      data: { team: null },
    });
    return { success: true };
  } catch (error) {
    console.error("Error resetting all summoner teams:", error);
    throw new Error("Failed to reset all summoner teams");
  }
}

export async function updateSummonerBlacklist(
  summonerId: string,
  blacklist: boolean,
) {
  try {
    await prisma.summoner.update({
      where: { id: summonerId },
      data: { blacklist },
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating summoner blacklist:", error);
    throw new Error("Failed to update summoner blacklist");
  }
}
