"use server";

import { authAction } from "@/lib/backend/safe-actions";

import { prisma } from "@/lib/prisma";
import { SetPresentationSchema } from "./set-presentation.schema";

export const setPresentationAction = authAction
  .schema(SetPresentationSchema)
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
    const custom = await prisma.summoner.update({
      where: {
        userId: ctx.user.id,
      },
      data: {
        pinnedPresentation: input.presentation,
      },
    });

    return custom;
  });
