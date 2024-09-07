"use server";

import { prisma } from "@/lib/prisma";

export const findSummonerByUserIdAction = async (id: string) => {
  try {
    const summoner = await prisma.summoner.findUnique({
      where: {
        userId: id,
      },
    });
    return summoner;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching user data");
  }
};
