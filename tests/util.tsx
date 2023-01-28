import { type QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { type TRPCClientErrorLike } from '@trpc/client';
import { type AnyProcedure, type AnyRouter } from '@trpc/server';
import { axe } from 'jest-axe';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { type ReactElement } from 'react';

export const mockTrpcError = (
  value: unknown,
  procedure: AnyRouter | AnyProcedure,
) => {
  return value as TRPCClientErrorLike<typeof procedure>;
};

export const expectNoA11yViolations = async (container: HTMLElement) => {
  const a11y = await axe(container);
  expect(a11y).toHaveNoViolations();
};

export function renderWithQueryClient(client: QueryClient, ui: ReactElement) {
  const { rerender, ...result } = render(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>,
    {
      wrapper: MemoryRouterProvider,
    },
  );

  return {
    ...result,
    rerender(rerenderUi: ReactElement) {
      rerender(
        <QueryClientProvider client={client}>{rerenderUi}</QueryClientProvider>,
      );
    },
  };
}
