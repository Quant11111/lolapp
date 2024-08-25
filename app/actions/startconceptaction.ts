"use server";

import { prisma } from "@/lib/prisma";
import { action } from "@/lib/backend/safe-actions";

export const startConceptAction = action.action(async () => {
  try {
    const latestConcept = await prisma.conceptStart.findFirst({
      orderBy: { id: "desc" },
    });

    const newId = latestConcept ? latestConcept.id + 1 : 1;

    const newConcept = await prisma.conceptStart.create({
      data: {
        id: newId,
        timestamp: BigInt(Date.now()),
      },
    });

    return { success: true, id: newConcept.id };
  } catch (error) {
    console.error("Error starting concept:", error);
    return { success: false, error: "Failed to start concept" };
  }
});
