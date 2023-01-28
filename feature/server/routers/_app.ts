import { procedure, router } from 'source/feature/server/trpc';
import { prisma } from 'source/prisma/client';
import { z } from 'zod';

export const appRouter = router({
  projectPreference: procedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const stuff = await prisma.projectPreference.findMany({
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
      console.log({ stuff });
      return stuff;
    }),
});

export type AppRouter = typeof appRouter;
