import React from "react";
import { trpc } from "@/utils/trpc";
import { type AppType } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import system from "@/theme/theme";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <ChakraProvider value={system}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
