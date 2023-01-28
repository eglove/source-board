import { procedure, router } from 'source/feature/server/trpc';
import { prisma } from 'source/prisma/client';
import { z } from 'zod';

const projectPreferenceInput = z.object({ username: z.string() });

export const projectPreferenceRouter = router({
  projectPreference: procedure
    .input(projectPreferenceInput)
    .query(async ({ input }) => {
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
