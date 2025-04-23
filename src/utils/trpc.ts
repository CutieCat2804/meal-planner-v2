import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { AppRouter } from "../server/routers/router";

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [httpBatchLink({ url: `http://localhost:3000/api/trpc` })],
    };
  },
});
