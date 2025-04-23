import { trpc } from "@/utils/trpc";
import {
  Button,
  Card,
  chakra,
  Flex,
  Input,
  Separator,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { recipeSchema } from "@/interface/Recipe";
import { toaster, Toaster } from "@/components/ui/toaster";
import { Field } from "@/components/ui/field";
import StepList from "@/components/StepList";
import { FormErrors } from "@/interface/FormErrors";
import { useRecipeStore } from "@/store/useRecipeStore";
import { useSearchParams } from "next/navigation";

export default function AddRecipe() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const recipe = trpc.getRecipe.useQuery({ id: Number(id) || 4 });
  const updateRecipeData = useRecipeStore((state) => state.updateRecipeData);
  if (recipe.data) {
    updateRecipeData(recipe.data);
  }

  const addRecipe = trpc.addRecipe.useMutation({
    onSuccess: () => {
      toaster.create({
        description: `Rezept wurde ${id ? "bearbeitet" : "erstellt"}.`,
        type: "success",
      });
    },
    onError: (error) => {
      console.error("Error during mutation:", error);
      toaster.create({
        description: `Beim ${
          id ? "Bearbeiten" : "Erstellen"
        } des Rezepts ist ein Fehler aufgetreten.`,
        type: "error",
      });
    },
  });

  const formErrors = useRecipeStore((state) => state.formErrors);
  const setFormErrors = useRecipeStore((state) => state.setFormErrors);

  const recipeData = useRecipeStore((state) => state.recipeData);
  const updateField = useRecipeStore((state) => state.updateField);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = recipeSchema.safeParse(recipeData);

    if (!result.success) {
      const zodErrors = result.error.flatten().fieldErrors;
      console.error("ZodErrors: ", zodErrors);
      setFormErrors(zodErrors as FormErrors);
      return;
    }

    await addRecipe.mutateAsync(result.data);
  };

  return (
    <Flex
      p="4"
      maxWidth={{ base: "100%", xl: "50vw" }}
      width="100%"
      justifySelf="center"
    >
      <chakra.main width="100%">
        <Toaster />
        <Card.Root>
          <form onSubmit={handleSubmit}>
            <Card.Body gap="6">
              <Flex flexDir={{ base: "column", lg: "row" }} gap="4">
                {/* <Image /> */}
                <VStack width="100%" gap="4">
                  <Field
                    label="Name"
                    invalid={!!formErrors.name}
                    errorText={formErrors.name}
                    required
                  >
                    <Input
                      name="name"
                      value={recipeData.name}
                      onChange={handleChange}
                    />
                  </Field>
                  <Field
                    label="Menge"
                    invalid={!!formErrors.amount}
                    errorText={formErrors.amount}
                    required
                  >
                    <Input
                      name="amount"
                      value={recipeData.amount}
                      onChange={handleChange}
                    />
                  </Field>
                  <Field
                    label="Dauer"
                    invalid={!!formErrors.duration}
                    errorText={formErrors.duration}
                    required
                  >
                    <Input
                      name="duration"
                      value={recipeData.duration}
                      onChange={handleChange}
                    />
                  </Field>
                </VStack>
              </Flex>
              <Separator />
              <StepList />
              <Separator />
              <Field label="Quelle">
                <Input
                  name="source"
                  value={recipeData.source}
                  onChange={handleChange}
                />
              </Field>
            </Card.Body>
            <Card.Footer justifyContent="center">
              <Button type="submit">
                {id ? "Änderungen speichern" : "Rezept erstellen"}
              </Button>
            </Card.Footer>
          </form>
        </Card.Root>
      </chakra.main>
    </Flex>
  );
}
