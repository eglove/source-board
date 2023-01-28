import { procedure, router } from 'source/feature/server/trpc';
import { prisma } from 'source/prisma/client';
import { z } from 'zod';

const projectPreferenceInput = z.object({ username: z.string() });

export const projectPreferenceGetForUserReturnSchema = z.array(
  z.object({
    id: z.string().uuid(),
    name: z.string(),
  }),
);

export type ProjectPreferenceGetForUserReturn = z.infer<
  typeof projectPreferenceGetForUserReturnSchema
>;

export const projectPreferenceRouter = router({
  getForUser: procedure
    .input(projectPreferenceInput)
    .query(async ({ input }): Promise<ProjectPreferenceGetForUserReturn> => {
      return prisma.projectPreference.findMany({
        select: {
          id: true,
          name: true,
        },
        where: {
          user: {
            every: {
              username: input.username,
            },
          },
        },
      });
    }),
});
