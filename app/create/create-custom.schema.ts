import { z } from "zod";

export const CustomFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  discordLink: z
    .string()
    .regex(
      /^(https?:\/\/)?(www\.)?(discord\.gg|discord\.com\/invite)\/[a-zA-Z0-9]+$/,
      "Invalid Discord link",
    )
    .optional(),
});

export type CustomFormType = z.infer<typeof CustomFormSchema>;
