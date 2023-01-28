import 'normalize.css';
import 'source/feature/styles/global.css';

import type { AppProps } from 'next/app';
import { trpc } from 'source/feature/util/trpc';

export function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default trpc.withTRPC(App);
