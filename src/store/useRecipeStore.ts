import { FormErrors } from "@/interface/FormErrors";
import { Recipe } from "@/interface/Recipe";
import { create } from "zustand";

interface StoreState {
  recipeData: Recipe;
  formErrors: FormErrors;
  updateRecipeData: (recipeData: Recipe) => void;
  updateField: (field: string, value: string) => void;
  updateStep: (field: string, value: string, index: number) => void;
  addStep: () => void;
  deleteStep: (index: number) => void;
  moveStep: (index: number, direction: "up" | "down") => void;
  updateIngredient: (
    field: string,
    value: string,
    stepIndex: number,
    ingredientIndex: number
  ) => void;
  addIngredient: (stepIndex: number) => void;
  deleteIngredient: (stepIndex: number, ingredientIndex: number) => void;
  setFormErrors: (formErrors: FormErrors) => void;
}

export const useRecipeStore = create<StoreState>((set) => ({
  recipeData: {
    user: "Zoe",
    name: "",
    amount: "",
    duration: "",
    steps: [{ title: "", description: "", ingredients: [] }],
    source: "",
  },
  formErrors: {},
  updateRecipeData: (recipeData: Recipe) => set(() => ({ recipeData })),
  updateField: (field: string, value: string) =>
    set((state) => ({
      recipeData: {
        ...state.recipeData,
        [field]: value,
      },
    })),
  updateStep: (field: string, value: string, index: number) =>
    set((state) => {
      const updatedSteps = [...state.recipeData.steps];
      updatedSteps[index] = { ...updatedSteps[index], [field]: value };

      return { recipeData: { ...state.recipeData, steps: updatedSteps } };
    }),
  addStep: () =>
    set((state) => ({
      recipeData: {
        ...state.recipeData,
        steps: [
          ...state.recipeData.steps,
          {
            title: "",
            description: "",
            ingredients: [{ name: "", amount: "" }],
          },
        ],
      },
    })),
  deleteStep: (index: number) =>
    set((state) => ({
      recipeData: {
        ...state.recipeData,
        steps: state.recipeData.steps.filter((_, i) => i !== index),
      },
    })),
  moveStep: (index: number, direction: "up" | "down") =>
    set((state) => {
      const updatedSteps = [...state.recipeData.steps];
      const step = updatedSteps[index];

      updatedSteps.splice(index, 1);

      const newPosition = direction === "up" ? index - 1 : index + 1;
      updatedSteps.splice(newPosition, 0, step);

      return { recipeData: { ...state.recipeData, steps: updatedSteps } };
    }),
  updateIngredient: (
    field: string,
    value: string,
    stepIndex: number,
    ingredientIndex: number
  ) =>
    set((state) => {
      const updatedSteps = [...state.recipeData.steps];
      const updatedIngredients = updatedSteps[stepIndex].ingredients;

      updatedIngredients[ingredientIndex] = {
        ...updatedIngredients[ingredientIndex],
        [field]: value,
      };

      return { recipeData: { ...state.recipeData, steps: updatedSteps } };
    }),
  addIngredient: (stepIndex: number) =>
    set((state) => {
      const updatedSteps = [...state.recipeData.steps];
      updatedSteps[stepIndex].ingredients = [
        ...state.recipeData.steps[stepIndex].ingredients,
        { name: "", amount: "" },
      ];

      return { recipeData: { ...state.recipeData, steps: updatedSteps } };
    }),
  deleteIngredient: (stepIndex: number, ingredientIndex: number) =>
    set((state) => {
      const updatedSteps = [...state.recipeData.steps];
      updatedSteps[stepIndex].ingredients = state.recipeData.steps[
        stepIndex
      ].ingredients.filter((_, i) => i !== ingredientIndex);

      return { recipeData: { ...state.recipeData, steps: updatedSteps } };
    }),
  setFormErrors: (formErrors) => set(() => ({ formErrors })),
}));
