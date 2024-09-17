"use server";

import { prisma } from "@/lib/prisma";

export const findUserByIdAction = async (id: string) => {
  try {
    const userData = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        summoner: true,
      },
    });
    return userData;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching user data");
  }
};
