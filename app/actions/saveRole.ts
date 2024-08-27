"use server";

import { prisma } from "@/lib/prisma";

export async function saveRoleAction(puuid: string, role: string) {
  try {
    const updatedSummoner = await prisma.summoner.update({
      where: { puuid: puuid },
      data: { firstRole: role },
    });
    console.log(`Saved role ${role} for puuid ${puuid}`);
    return updatedSummoner;
  } catch (error) {
    console.error("Error saving role:", error);
    throw new Error("Failed to save role");
  }
}
