"use server";

import { prisma } from "@/lib/prisma";

export const findSummonerNameByIdAction = async (id: string) => {
  try {
    const user = await prisma.summoner.findUnique({
      where: {
        puuid: id,
      },
      select: {
        gameName: true,
      },
    });
    console.log(user);
    return user?.gameName;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching user data");
  }
};
