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
import React, { useEffect } from "react";
import { recipeSchema } from "@/interface/Recipe";
import { toaster, Toaster } from "@/components/ui/toaster";
import { Field } from "@/components/ui/field";
import StepList from "@/components/StepList";
import { FormErrors } from "@/interface/FormErrors";
import { useRecipeStore } from "@/store/useRecipeStore";
import { useRouter } from "next/router";

export default function AddRecipe() {
  const router = useRouter();
  const id = router.query.id;

  const { data: recipe } = trpc.getRecipe.useQuery({ id: Number(id) });
  const updateRecipeData = useRecipeStore((state) => state.updateRecipeData);
  const clearRecipeData = useRecipeStore((state) => state.clearRecipeData);

  useEffect(() => {
    if (recipe) {
      updateRecipeData(recipe);
    } else {
      clearRecipeData();
    }
  }, [recipe]);

  const addRecipe = trpc.addRecipe.useMutation({
    onSuccess: () => {
      toaster.create({
        description: "Rezept wurde erstellt",
        type: "success",
      });
    },
    onError: (error) => {
      console.error("Error during mutation:", error);
      toaster.create({
        description: "Beim Erstellen des Rezepts ist ein Fehler aufgetreten.",
        type: "error",
      });
    },
  });

  const updateRecipe = trpc.updateRecipe.useMutation({
    onSuccess: () => {
      toaster.create({
        description: "Rezept wurde bearbeitet.",
        type: "success",
      });
    },
    onError: (error) => {
      console.error("Error during mutation:", error);
      toaster.create({
        description: "Beim Bearbeiten des Rezepts ist ein Fehler aufgetreten.",
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

    if (id) {
      await updateRecipe.mutateAsync({ ...result.data, id: Number(id) });
    } else {
      await addRecipe.mutateAsync(result.data);
    }

    router.push("/");
  };

  useEffect(() => {
    const onbeforeunload = (e: Event) => e.preventDefault();

    addEventListener("beforeunload", onbeforeunload);
    addEventListener("pagehide", onbeforeunload);
    return () => {
      removeEventListener("beforeunload", onbeforeunload);
      removeEventListener("pagehide", onbeforeunload);
    };
  }, []);

  return (
    <Flex
      p="4"
      maxWidth={{ base: "100%", xl: "50vw" }}
      width="100%"
      justifySelf="center"
      marginBottom="12"
    >
      <chakra.main width="100%">
        <Toaster />
        <Card.Root>
          <form onSubmit={handleSubmit}>
            <Card.Body gap="6">
              <Flex flexDir={{ base: "column", lg: "row" }} gap="4">
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
            <Card.Footer
              justifyContent="center"
              gap="4"
              flexDir={{ base: "column", md: "row" }}
            >
              <Button type="submit">
                {id ? "Änderungen speichern" : "Rezept erstellen"}
              </Button>
              <Button variant="outline" onClick={() => router.push("/")}>
                {id ? "Änderungen verwerfen" : "Abbrechen"}
              </Button>
            </Card.Footer>
          </form>
        </Card.Root>
      </chakra.main>
    </Flex>
  );
}
