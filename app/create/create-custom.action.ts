"use server";

import { authAction } from "@/lib/backend/safe-actions";

import { prisma } from "@/lib/prisma";
import { CustomFormSchema } from "./create-custom.schema";

export const createCustomAction = authAction
  .schema(CustomFormSchema)
  .action(async ({ parsedInput: input, ctx }) => {
    const summoner = await prisma.summoner.findUnique({
      where: {
        userId: ctx.user.id,
      },
    });
    if (!summoner) {
      throw new Error(
        "You need to link your summoner account first to create a custom event",
      );
    }
    const custom = await prisma.custom.create({
      data: {
        name: input.name,
        description: input.description,
        creatorId: ctx.user.id,
      },
    });

    return custom;
  });
