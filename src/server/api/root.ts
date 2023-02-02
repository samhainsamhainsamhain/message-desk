import { createTRPCRouter } from "./trpc";
import { messagesRouter } from "./routers/messages";
import { numbersRouter } from "./routers/numbers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  messages: messagesRouter,
  numbers: numbersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
