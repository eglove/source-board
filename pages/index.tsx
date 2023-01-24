import { Inter as Font } from '@next/font/google';
import Head from 'next/head';
import { PageLayoutMain } from 'source/feature/page-layout/page-layout-main';

const font = Font({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta content="Generated by create next app" name="description" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <main className={font.className}>
        <PageLayoutMain>
          <p>Hello</p>
        </PageLayoutMain>
      </main>
    </>
  );
}
