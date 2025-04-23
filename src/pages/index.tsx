import { chakra, Button, Flex, Card, Text, Separator } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { trpc } from "@/utils/trpc";
import RecipeOptionsMenu from "@/components/RecipeOptionsMenu";
import { LuPlus } from "react-icons/lu";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  const router = useRouter();

  const recipes = trpc.getAllRecipes.useQuery().data;

  return (
    <Flex
      p="4"
      maxWidth={{ base: "100%", xl: "70vw" }}
      width="100%"
      justifySelf="center"
    >
      <chakra.main width="100%">
        <Toaster />
        <Card.Root>
          <Card.Header justifyContent="space-between" flexDir="row">
            <Text variant="primary" fontSize="2xl">
              Alle Rezepte
            </Text>
            <Button
              onClick={(e) => {
                e.preventDefault();
                router.push("/add-recipe");
              }}
              width="fit-content"
            >
              <LuPlus />
              Hinzufügen
            </Button>
          </Card.Header>
          <Card.Body display="grid" gap="8">
            <Separator />
            <Flex flexWrap="wrap" justifyContent="center" gap="4">
              {recipes?.map((recipe) => (
                <Card.Root key={recipe.id} width="300px">
                  <Card.Header
                    justifyContent="space-between"
                    flexDir="row"
                    alignItems="center"
                  >
                    <Text variant="primary" fontSize="md">
                      {recipe.name}
                    </Text>
                    <RecipeOptionsMenu id={recipe.id} />
                  </Card.Header>
                  <Card.Body>
                    <Text>Menge: {recipe.amount}</Text>
                    <Text>Dauer: {recipe.duration}</Text>
                  </Card.Body>
                </Card.Root>
              ))}
            </Flex>
          </Card.Body>
        </Card.Root>
      </chakra.main>
    </Flex>
  );
}
