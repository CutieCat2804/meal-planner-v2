import { Recipe } from "./Recipe";

export type FormErrors = {
  [key in keyof Recipe]?: string;
};
