import React from "react";
import {
  Button,
  Fieldset,
  Flex,
  Input,
  Spacer,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import StepOptionsMenu from "./StepOptionsMenu";
import { Field } from "./ui/field";
import IngredientList from "./IngredientList";
import { LuPlus } from "react-icons/lu";
import { useRecipeStore } from "@/store/useRecipeStore";

const StepList: React.FC = () => {
  const formErrors = useRecipeStore((state) => state.formErrors);
  const steps = useRecipeStore((state) => state.recipeData.steps);
  const updateStep = useRecipeStore((state) => state.updateStep);
  const addStep = useRecipeStore((state) => state.addStep);

  return (
    <Fieldset.Root invalid={!!formErrors.steps}>
      <Fieldset.Content>
        {steps.map((step, stepIndex) => (
          <VStack key={stepIndex} width="100%" alignItems="start" gap="1">
            <Flex width="100%">
              <Text variant="primary" fontSize="lg">
                Schritt {stepIndex + 1}
              </Text>
              <Spacer />
              <StepOptionsMenu stepIndex={stepIndex} />
            </Flex>
            <VStack width="100%" gap="4" alignItems="start">
              <Field
                label="Überschrift"
                invalid={!!formErrors.steps && step.title === ""}
                required
              >
                <Input
                  name="title"
                  value={step.title}
                  onChange={(e) =>
                    updateStep(e.target.name, e.target.value, stepIndex)
                  }
                />
              </Field>
              <IngredientList step={step} stepIndex={stepIndex} />
              <Field label="Beschreibung">
                <Textarea
                  name="description"
                  value={step.description}
                  onChange={(e) =>
                    updateStep(e.target.name, e.target.value, stepIndex)
                  }
                  height="100px"
                />
              </Field>
            </VStack>
          </VStack>
        ))}
        <Button
          variant="outline"
          alignSelf="center"
          onClick={addStep}
          disabled={steps.length >= 15}
        >
          <LuPlus />
          Schritt hinzufügen
        </Button>
      </Fieldset.Content>
    </Fieldset.Root>
  );
};

export default StepList;
