import { z } from "zod";

// Utiliser z.nativeEnum pour valider les valeurs de l'énumération Prisma
export const SetPresentationSchema = z.object({
  presentation: z
    .string()
    .min(1, "Presentation is required")
    .max(250, "Presentation is too long"),
});

export type SetPresentationFormType = z.infer<typeof SetPresentationSchema>;
