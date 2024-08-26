"use server";

import { prisma } from "@/lib/prisma";

export async function getSummonersWithRankAndTeam() {
  try {
    const summoners = await prisma.summoner.findMany({
      select: {
        gameName: true,
        tagLine: true,
        rank: true,
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
