"use server";

import { prisma } from "@/lib/prisma";

export const addToBlueTeamAction = async (id: string, userId: string) => {
  try {
    // Fetch the custom to check the current size of the blue team
    const custom = await prisma.custom.findUnique({
      where: { id },
      include: { blueTeam: true },
    });

    if (!custom) {
      throw new Error("Custom not found");
    }

    if (custom.blueTeam.length >= 5) {
      throw new Error("Blue team is already full");
    }

    // Fetch the user by userId
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

    // Add the user to the blue team of the custom
    const updatedCustom = await prisma.custom.update({
      where: { id },
      data: {
        blueTeam: {
          connect: { id: userId },
        },
      },
    });

    return updatedCustom;
  } catch (error) {
    throw new Error("Error adding user to blue team: " + error);
  }
};

export const removeFromBlueTeamAction = async (id: string, userId: string) => {
  try {
    // Remove the user from the blue team of the custom
    const updatedCustom = await prisma.custom.update({
      where: { id },
      data: {
        blueTeam: {
          disconnect: { id: userId },
        },
      },
    });

    return updatedCustom;
  } catch (error) {
    throw new Error("Error removing user from blue team: " + error);
  }
};

export const addToRedTeamAction = async (id: string, userId: string) => {
  try {
    // Fetch the custom to check the current size of the red team
    const custom = await prisma.custom.findUnique({
      where: { id },
      include: { redTeam: true },
    });

    if (!custom) {
      throw new Error("Custom not found");
    }

    if (custom.redTeam.length >= 5) {
      throw new Error("Red team is already full");
    }

    // Fetch the user by userId
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

    // Add the user to the red team of the custom
    const updatedCustom = await prisma.custom.update({
      where: { id },
      data: {
        redTeam: {
          connect: { id: userId },
        },
      },
    });

    return updatedCustom;
  } catch (error) {
    throw new Error("Error adding user to red team: " + error);
  }
};

export const removeFromRedTeamAction = async (id: string, userId: string) => {
  try {
    // Remove the user from the red team of the custom
    const updatedCustom = await prisma.custom.update({
      where: { id },
      data: {
        redTeam: {
          disconnect: { id: userId },
        },
      },
    });

    return updatedCustom;
  } catch (error) {
    throw new Error("Error removing user from red team: " + error);
  }
};
