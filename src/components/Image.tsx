import React from "react";
import { Flex } from "@chakra-ui/react";
import { LuCamera } from "react-icons/lu";

const Image: React.FC = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      alignSelf="center"
      border="1px solid"
      borderColor="green.muted"
      borderRadius="sm"
      height="150px"
      minWidth="250px"
      color="green.fg"
    >
      <LuCamera size="28px" />
    </Flex>
  );
};

export default Image;
