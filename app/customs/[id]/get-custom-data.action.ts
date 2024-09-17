"use server";

import { prisma } from "@/lib/prisma";

export const getCustomDataAction = async (id: string) => {
  try {
    const custom = await prisma.custom.findUnique({
      where: {
        id,
      },
      include: {
        creator: {
          include: {
            summoner: true,
          },
        },
        blueTeam: {
          include: {
            summoner: true,
          },
        },
        redTeam: {
          include: {
            summoner: true,
          },
        },
        candidates: {
          include: {
            summoner: true,
          },
        },
      },
    });
    return custom;
  } catch (error) {
    throw new Error("Error fetching custom data");
  }
};
