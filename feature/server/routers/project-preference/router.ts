import { getForUser } from 'source/feature/server/routers/project-preference/get-for-user';
import { router } from 'source/feature/server/trpc';

export const projectPreferenceRouter = router({
  getForUser,
});
