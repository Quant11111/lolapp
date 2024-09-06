"use server";

import { action } from "@/lib/backend/safe-actions";
import { prisma } from "@/lib/prisma";

export const getCustomAction = action.action(async () => {
  try {
    const customs = await prisma.custom.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });
    return customs;
  } catch (error) {
    throw new Error("Error fetching customs");
  }
});
