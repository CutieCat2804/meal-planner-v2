import RecipeOptionsMenu from "@/components/RecipeOptionsMenu";
import { trpc } from "@/utils/trpc";
import {
  Box,
  Button,
  Card,
  chakra,
  Flex,
  HStack,
  Link,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export default function Recipe() {
  const router = useRouter();

  const id = router.query.id;

  const { data: recipe } = trpc.getRecipe.useQuery({ id: Number(id) });

  if (!recipe) return null;

  return (
    <Flex
      p="4"
      maxWidth={{ base: "100%", xl: "50vw" }}
      width="100%"
      justifySelf="center"
      marginBottom="12"
    >
      <chakra.main width="100%">
        <Card.Root>
          <Card.Header justifyContent="center" flexDir="row">
            <Text variant="primary" fontSize="2xl" paddingRight="12">
              {recipe.name}
            </Text>
            <Box position="absolute" right="6">
              <RecipeOptionsMenu id={Number(id)} />
            </Box>
          </Card.Header>
          <Card.Body gap="6">
            <Flex flexDir={{ base: "column", lg: "row" }} gap="4">
              <HStack width="100%" justifyContent="center">
                <Text fontWeight="bold">Menge: </Text>
                <Text> {recipe.amount}</Text>
                <Text fontWeight="bold">Dauer: </Text>
                <Text>{recipe.duration}</Text>
              </HStack>
            </Flex>
            <Separator />
            <VStack gap="6" paddingX={{ base: "4", xl: "12" }}>
              {recipe.steps.map((step, stepIndex) => (
                <VStack key={stepIndex} width="100%" alignItems="start" gap="1">
                  <Text variant="primary" fontSize="lg">
                    Schritt {stepIndex + 1} - {step.title}
                  </Text>
                  <VStack width="100%" gap="4" alignItems="start">
                    <Box
                      display="grid"
                      gridTemplateColumns="max-content 2fr"
                      columnGap="4"
                    >
                      {step.ingredients.map((ingredient, ingredientIndex) => (
                        <React.Fragment key={ingredientIndex}>
                          <Text>{ingredient.amount}</Text>
                          <Text>{ingredient.name}</Text>
                        </React.Fragment>
                      ))}
                    </Box>
                    {step.description && (
                      <VStack alignItems="left">
                        <Text variant="primary">Beschreibung</Text>
                        <Text>{step.description}</Text>
                      </VStack>
                    )}
                  </VStack>
                </VStack>
              ))}
            </VStack>
            <Separator />
            {recipe.source && (
              <HStack
                width="100%"
                paddingX={{ base: "4", xl: "12" }}
                fontSize="sm"
                alignItems="start"
              >
                <Text fontWeight="bold">Quelle: </Text>
                {recipe.source.startsWith("http") ? (
                  <Link href={recipe.source} target="_blank">{recipe.source}</Link>
                ) : (
                  <Text> {recipe.source}</Text>
                )}
              </HStack>
            )}
          </Card.Body>
          <Card.Footer justifyContent="center" gap="4">
            <Button variant="outline" onClick={() => router.push("/")}>
              Zurück
            </Button>
          </Card.Footer>
        </Card.Root>
      </chakra.main>
    </Flex>
  );
}
