"use server";

import { prisma } from "@/lib/prisma";

export const getCustomDataAction = async (id: string) => {
  try {
    const custom = await prisma.custom.findUnique({
      where: {
        id,
      },
    });
    return custom;
  } catch (error) {
    throw new Error("Error fetching custom data");
  }
};
