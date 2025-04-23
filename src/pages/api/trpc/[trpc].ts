import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/routers/router";

export default createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
