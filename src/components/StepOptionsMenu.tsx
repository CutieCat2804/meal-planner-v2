import React from "react";
import { IconButton } from "@chakra-ui/react";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "./ui/menu";
import {
  LuChevronDown,
  LuChevronUp,
  LuEllipsis,
  LuTrash2,
} from "react-icons/lu";
import { useRecipeStore } from "@/store/useRecipeStore";

interface StepOptionsMenuProps {
  stepIndex: number;
}

const StepOptionsMenu: React.FC<StepOptionsMenuProps> = (props) => {
  const { stepIndex } = props;

  const deleteStep = useRecipeStore((state) => state.deleteStep);
  const moveStep = useRecipeStore((state) => state.moveStep);
  const steps = useRecipeStore((state) => state.recipeData.steps);

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <IconButton variant="outline" alignSelf="end">
          <LuEllipsis />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        <MenuItem
          value="move-up"
          onClick={() => moveStep(stepIndex, "up")}
          disabled={stepIndex === 0}
        >
          <LuChevronUp />
          Nach oben verschieben
        </MenuItem>
        <MenuItem
          value="move-down"
          onClick={() => moveStep(stepIndex, "down")}
          disabled={stepIndex + 1 === steps.length}
        >
          <LuChevronDown />
          Nach unten verschieben
        </MenuItem>
        <MenuItem
          value="delete"
          color="fg.error"
          _hover={{ bg: "bg.error", color: "fg.error" }}
          onClick={() => deleteStep(stepIndex)}
        >
          <LuTrash2 />
          Löschen
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

export default StepOptionsMenu;
