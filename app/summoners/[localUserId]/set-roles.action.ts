"use server";

import { authAction } from "@/lib/backend/safe-actions";

import { prisma } from "@/lib/prisma";
import { SetRolesSchema } from "./set-roles.schema";

export const setRolesAction = authAction
  .schema(SetRolesSchema)
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
    const custom = await prisma.user.update({
      where: {
        id: ctx.user.id,
      },
      data: {
        firstRole: input.firstRole,
        secondRole: input.secondRole,
      },
    });

    return custom;
  });

/*
  
  import { z } from "zod";
import { Role } from "@prisma/client";

// Utiliser z.nativeEnum pour valider les valeurs de l'énumération Prisma
export const SetRolesSchema = z
  .object({
    firstRole: z.nativeEnum(Role),
    secondRole: z.nativeEnum(Role),
  })
  .refine((data) => data.firstRole !== data.secondRole, {
    message: "Roles must be different",
    path: ["secondRole"],
  });

export type SetRolesFormType = z.infer<typeof SetRolesSchema>;

  
  
  */
