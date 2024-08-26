"use server";

import { PrismaClient } from "@prisma/client";

export async function hardResetAction() {
  const prisma = new PrismaClient();

  try {
    // Delete all records from the Summoner model
    await prisma.summoner.deleteMany();

    // If you have any related models that should be reset as well, add them here
    // For example:
    // await prisma.relatedModel.deleteMany();

    console.log("Summoner model database has been reset successfully.");
  } catch (error) {
    console.error("Error resetting Summoner model database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
