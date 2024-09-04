"use server";

import { prisma } from "@/lib/prisma";

export const getSummonerDataAction = async (localUserId: string) => {
  try {
    const summoner = await prisma.summoner.findUnique({
      where: {
        userId: localUserId,
      },
    });
    return summoner;
  } catch (error) {
    throw new Error("Error fetching summoner");
  }
};
