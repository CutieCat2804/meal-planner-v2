import React from "react";
import { IconButton } from "@chakra-ui/react";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "./ui/menu";
import { LuEllipsis, LuPen, LuTrash2 } from "react-icons/lu";
import { trpc } from "@/utils/trpc";
import { toaster } from "./ui/toaster";
import { useRouter } from "next/router";

interface RecipeOptionsMenuProps {
  id: number;
}

const RecipeOptionsMenu: React.FC<RecipeOptionsMenuProps> = (props) => {
  const { id } = props;

  const router = useRouter();

  const utils = trpc.useUtils();

  const deleteRecipe = trpc.deleteRecipe.useMutation({
    onSuccess: () => {
      utils.getAllRecipes.invalidate();
      toaster.create({
        description: "Rezept wurde gelöscht.",
        type: "success",
      });
    },
    onError: (error) => {
      console.error("Error during mutation:", error);
      toaster.create({
        description: "Beim Löschen des Rezepts ist ein Fehler aufgetreten.",
        type: "error",
      });
    },
  });

  const handleDelete = () => {
    deleteRecipe.mutateAsync({ id });
  };

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <IconButton variant="outline" alignSelf="end" size="sm">
          <LuEllipsis />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        <MenuItem
          value="edit"
          onClick={(e) => {
            e.preventDefault();
            router.push({ pathname: "/add-recipe", query: { id } });
          }}
        >
          <LuPen />
          Bearbeiten
        </MenuItem>
        <MenuItem
          value="delete"
          color="fg.error"
          _hover={{ bg: "bg.error", color: "fg.error" }}
          onClick={handleDelete}
        >
          <LuTrash2 />
          Löschen
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default RecipeOptionsMenu;
