import React from "react";
import {
  Button,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Field } from "./ui/field";
import { Step } from "@/interface/Recipe";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import { useRecipeStore } from "@/store/useRecipeStore";

interface IngredientListProps {
  step: Step;
  stepIndex: number;
}

const IngredientList: React.FC<IngredientListProps> = (props) => {
  const { step, stepIndex } = props;

  const formErrors = useRecipeStore((state) => state.formErrors);
  const updateIngredient = useRecipeStore((state) => state.updateIngredient);
  const addIngredient = useRecipeStore((state) => state.addIngredient);
  const deleteIngredient = useRecipeStore((state) => state.deleteIngredient);

  return (
    <>
      {step.ingredients.length > 0 && (
        <Text variant="primary" fontSize="md">
          Zutaten
        </Text>
      )}
      <VStack width="100%">
        {step.ingredients.map((ingredient, ingredientIndex) => (
          <HStack key={ingredientIndex} width="100%">
            <Field
              label={ingredientIndex === 0 ? "Menge" : undefined}
              invalid={!!formErrors.steps && ingredient.amount === ""}
              required
              flexBasis="fit-content"
            >
              <Input
                name="amount"
                value={ingredient.amount}
                onChange={(e) =>
                  updateIngredient(
                    e.target.name,
                    e.target.value,
                    stepIndex,
                    ingredientIndex
                  )
                }
              />
            </Field>
            <Field
              label={ingredientIndex === 0 ? "Name" : undefined}
              invalid={!!formErrors.steps && ingredient.name === ""}
              required
              flexGrow={1}
            >
              <Input
                name="name"
                value={ingredient.name}
                onChange={(e) =>
                  updateIngredient(
                    e.target.name,
                    e.target.value,
                    stepIndex,
                    ingredientIndex
                  )
                }
              />
            </Field>
            <IconButton
              colorPalette="red"
              variant="outline"
              onClick={() => deleteIngredient(stepIndex, ingredientIndex)}
              alignSelf="end"
            >
              <LuTrash2 />
            </IconButton>
          </HStack>
        ))}
        <Button
          variant="outline"
          onClick={() => addIngredient(stepIndex)}
          disabled={step.ingredients.length >= 20}
          marginTop="2"
        >
          <LuPlus />
          Zutat hinzufügen
        </Button>
      </VStack>
    </>
  );
};

export default IngredientList;
