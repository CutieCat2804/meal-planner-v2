import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const recipesTable = sqliteTable("recipes_table", {
  id: int().primaryKey({ autoIncrement: true }),
  user: text().notNull(),
  name: text().notNull(),
  amount: text().notNull(),
  duration: text().notNull(),
  steps: text().notNull(),
  source: text().notNull(),
});
