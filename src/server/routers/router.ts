import { z } from "zod";
import {
  addRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
} from "../recipes";
import { publicProcedure, router } from "../trpc";
import { recipeSchema } from "@/interface/Recipe";

export const appRouter = router({
  getAllRecipes: publicProcedure.query(async () => {
    return await getAllRecipes();
  }),
  getRecipe: publicProcedure
    .input(z.object({ id: z.number().nullable() }))
    .query(async (opts) => {
      const { input } = opts;
      return input.id ? await getRecipe(input.id) : undefined;
    }),
  addRecipe: publicProcedure.input(recipeSchema).mutation(async (opts) => {
    const { input } = opts;
    await addRecipe(input);
  }),
  deleteRecipe: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async (opts) => {
      const { input } = opts;
      await deleteRecipe(input.id);
    }),
  updateRecipe: publicProcedure
    .input(recipeSchema.extend({ id: z.number() }))
    .mutation(async (opts) => {
      const { input } = opts;
      await updateRecipe(input, input.id);
    }),
});

export type AppRouter = typeof appRouter;
