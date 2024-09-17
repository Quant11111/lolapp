"use server";

import { prisma } from "@/lib/prisma";

export const joinCustomAction = async (id: string, userId: string) => {
  try {
    // Fetch the summoner by summonerName
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { summoner: true },
    });

    if (!user) {
      throw new Error("User not found");
    }
    if (!user.summoner) {
      throw new Error("Summoner not found. Link a summoner before joining");
    }

    // Add the summoner to the candidates list of the custom
    const updatedCustom = await prisma.custom.update({
      where: { id },
      data: {
        candidates: {
          connect: { id: userId },
        },
      },
    });

    // Update the summoner to set the custom as appliance
    await prisma.user.update({
      where: { id: userId },
      data: {
        applianceId: id,
      },
    });

    return updatedCustom;
  } catch (error) {
    throw new Error("Error joining custom: " + error);
  }
};

export const leaveCustomAction = async (id: string, userId: string) => {
  try {
    // Remove the summoner from the candidates list of the custom
    const updatedCustom = await prisma.custom.update({
      where: { id },
      data: {
        candidates: {
          disconnect: { id: userId },
        },
      },
    });

    // Update the summoner to remove the custom as appliance
    await prisma.user.update({
      where: { id: userId },
      data: {
        applianceId: null,
      },
    });

    return updatedCustom;
  } catch (error) {
    throw new Error("Error leaving custom: " + error);
  }
};
