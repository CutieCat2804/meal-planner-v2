import React from "react";
import { trpc } from "@/utils/trpc";
import { type AppType } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import system from "@/theme/theme";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider value={system}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default trpc.withTRPC(MyApp);
