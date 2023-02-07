import { procedure } from 'source/feature/server/trpc';
import { prisma } from 'source/prisma/client';
import { z } from 'zod';

export const projectPreferenceGetForUserReturnSchema = z.array(
  z.object({
    id: z.string().uuid(),
    name: z.string(),
  }),
);

export type ProjectPreferenceGetForUserReturn = z.infer<
  typeof projectPreferenceGetForUserReturnSchema
>;

export const getForUser = procedure
  .input(z.object({ username: z.string() }))
  .output(projectPreferenceGetForUserReturnSchema)
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
  });
