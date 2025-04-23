import { Recipe } from "@/interface/Recipe";
import { db } from "./db";
import { recipesTable } from "./db/schema";
import { eq } from "drizzle-orm";

export async function getAllRecipes() {
  return await db.select().from(recipesTable);
}

export async function getRecipe(id: number): Promise<Recipe> {
  const recipe = (
    await db.select().from(recipesTable).where(eq(recipesTable.id, id))
  )[0];
  return { ...recipe, steps: JSON.parse(recipe.steps) };
}

export async function addRecipe(recipe: Recipe) {
  await db
    .insert(recipesTable)
    .values({ ...recipe, steps: JSON.stringify(recipe.steps) });
}

export async function deleteRecipe(id: number) {
  await db.delete(recipesTable).where(eq(recipesTable.id, id));
}
