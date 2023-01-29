import { projectPreferenceRouter } from 'source/feature/server/routers/project-preference/router';
import { router } from 'source/feature/server/trpc';

export const appRouter = router({
  projectPreference: projectPreferenceRouter,
});

export type AppRouter = typeof appRouter;
