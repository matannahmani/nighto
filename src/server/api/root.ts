import { protectedDiscoverRouter } from './routers/protected/discover';
import { createTRPCRouter } from './trpc';
import { discoverRouter } from './routers/public/discover';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  discover: discoverRouter,
  protected: createTRPCRouter({
    discover: protectedDiscoverRouter,
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
