import { z } from "zod";
import { addRecipe, deleteRecipe, getAllRecipes, getRecipe } from "../recipes";
import { publicProcedure, router } from "../trpc";
import { recipeSchema } from "@/interface/Recipe";

export const appRouter = router({
  getAllRecipes: publicProcedure.query(async () => {
    return await getAllRecipes();
  }),
  getRecipe: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async (opts) => {
      const { input } = opts;
      return await getRecipe(input.id);
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
});

export type AppRouter = typeof appRouter;
