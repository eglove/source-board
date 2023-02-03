import { generateMock } from '@anatine/zod-mock';
import { type TRPCClientErrorLike } from '@trpc/client';
import { type AnyProcedure, type AnyRouter } from '@trpc/server';
import { axe } from 'jest-axe';
import { z } from 'zod';

export const mockTrpcError = (
  customOptions?: Partial<TRPCClientErrorLike<AnyRouter | AnyProcedure>>,
): TRPCClientErrorLike<AnyRouter | AnyProcedure> => {
  const errorSchema = z.object({
    message: z.string(),
    data: z.object({
      path: z.string(),
      code: z.string(),
      httpStatus: z.number(),
      stack: z.string(),
    }),
    shape: z.object({
      message: z.string(),
      code: z.number(),
      data: z.object({
        path: z.string(),
        code: z.string(),
        httpStatus: z.number(),
        stack: z.string(),
      }),
    }),
  });

  return {
    ...generateMock(errorSchema),
    ...customOptions,
  };
};

export const expectNoA11yViolations = async (
  container: HTMLElement,
): Promise<void> => {
  const a11y = await axe(container);
  expect(a11y).toHaveNoViolations();
};
