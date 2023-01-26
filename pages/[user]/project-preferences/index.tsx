import { type InferGetServerSidePropsType, type NextPageContext } from 'next';
import { PageLayoutMain } from 'source/feature/page-layout/page-layout-main';
import { prisma } from 'source/prisma/client';

export default function ProjectPreferences({
  preferences,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <PageLayoutMain>
      <>{JSON.stringify(preferences)} HelloHello</>
    </PageLayoutMain>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const username = context.query.user as string;

  const preferences = await prisma.projectPreference.findMany({
    where: {
      user: {
        every: {
          username,
        },
      },
    },
  });

  return {
    props: {
      preferences,
    },
  };
}
