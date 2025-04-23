import { z } from "zod";

export const recipeSchema = z.object({
  user: z.string(),
  name: z.string().min(1, { message: "Name ist erforderlich" }),
  amount: z.string().min(1, { message: "Menge ist erforderlich" }),
  duration: z.string().min(1, { message: "Dauer ist erforderlich" }),
  steps: z
    .array(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        ingredients: z
          .array(z.object({ amount: z.string(), name: z.string() }))
          .refine((ingredients) =>
            ingredients.every(
              (ingredient) =>
                ingredient.name.trim().length > 0 &&
                ingredient.amount.trim().length > 0
            )
          ),
      })
    )
    .refine((steps) => steps.every((step) => step.title.trim().length > 0)),
  source: z.string(),
});

export type Recipe = z.infer<typeof recipeSchema>;
export type Step = Recipe["steps"][number];
