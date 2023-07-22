import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { partnerRouter } from "./routers/partners";
import { usersRouter } from "./routers/users";
import { attentionsRouter } from "./routers/attentions";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  partners: partnerRouter,
  users: usersRouter,
  attentions: attentionsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
