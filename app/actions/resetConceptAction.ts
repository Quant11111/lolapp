"use server";

import { prisma } from "@/lib/prisma";
import { action } from "@/lib/backend/safe-actions";

export const resetConceptAction = action.action(async () => {
  try {
    await prisma.conceptStart.deleteMany({});
    return { success: true };
  } catch (error) {
    console.error("Error resetting concept:", error);
    return { success: false, error: "Failed to reset concept" };
  }
});
