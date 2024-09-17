"use server";

import { authAction } from "@/lib/backend/safe-actions";

import { prisma } from "@/lib/prisma";
import { SetPresentationSchema } from "./set-presentation.schema";

export const setPresentationAction = authAction
  .schema(SetPresentationSchema)
  .action(async ({ parsedInput: input, ctx }) => {
    const user = await prisma.user.update({
      where: {
        id: ctx.user.id,
      },
      data: {
        pinnedPresentation: input.presentation,
      },
    });

    return user;
  });
