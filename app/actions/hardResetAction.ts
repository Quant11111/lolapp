"use server";

import { PrismaClient } from "@prisma/client";

export async function hardResetAction() {
  const prisma = new PrismaClient();

  try {
    const result = await prisma.summoner.updateMany({
      data: { selected: true },
    });

    return {
      success: true,
      message: `${result.count} Summoners reset`,
    };
  } catch (error) {
    console.error("Error resetting summoners:", error);
    return { success: false };
  } finally {
    await prisma.$disconnect();
  }
}
