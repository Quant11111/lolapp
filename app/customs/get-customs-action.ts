"use server";

import { action } from "@/lib/backend/safe-actions";
import { prisma } from "@/lib/prisma";

export const getCustomAction = action.action(async () => {
  const customs = await prisma.custom.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
  return customs;
});
