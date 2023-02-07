import { procedure } from 'source/feature/server/trpc';
import { prisma } from 'source/prisma/client';
import { z } from 'zod';

export const projectPreferenceCreateInputSchema = z.object({
  username: z.string(),
  name: z.string(),
});

export type ProjectPreferenceCreateInput = z.infer<
  typeof projectPreferenceCreateInputSchema
>;

export const projectPreferenceCreateReturnSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

export type ProjectPreferenceCreateReturn = z.infer<
  typeof projectPreferenceCreateReturnSchema
>;

export const create = procedure
  .input(projectPreferenceCreateInputSchema)
  .output(projectPreferenceCreateReturnSchema)
  .mutation(async ({ input }): Promise<ProjectPreferenceCreateReturn> => {
    return prisma.projectPreference.create({
      select: {
        id: true,
        name: true,
      },
      data: {
        name: input.name,
        user: {
          connect: {
            username: input.username,
          },
        },
      },
    });
  });
