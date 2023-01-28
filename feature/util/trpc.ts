import { type IncomingHttpHeaders } from 'node:http';

import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { type AppRouter } from 'source/feature/server/routers/_app';

export function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    // browser should use relative path
    return '';
  }

  // assume localhost
  return new URL('http://localhost:3000').toString();
}

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers(): IncomingHttpHeaders {
            if (ctx?.req !== undefined) {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { connection: _connection, ...headers } = ctx.req.headers;

              return { ...headers, 'x-ssr': '1' };
            }

            return {};
          },
        }),
      ],
    };
  },
  ssr: true,
});
