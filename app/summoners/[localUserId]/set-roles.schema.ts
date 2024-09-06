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
