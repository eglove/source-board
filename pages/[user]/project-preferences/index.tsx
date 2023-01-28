import { type InferGetServerSidePropsType, type NextPageContext } from 'next';
import { PageLayoutMain } from 'source/feature/page-layout/page-layout-main';
import ProjectPreferences from 'source/feature/project-preferences/project-preferences';
import { prisma } from 'source/prisma/client';

export type ProjectPreferencesData = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

export default function ProjectPreferencesPage({
  preferences,
}: ProjectPreferencesData): JSX.Element {
  return (
    <PageLayoutMain>
      <ProjectPreferences preferences={preferences} />
    </PageLayoutMain>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const username = context.query.user as string;

  const preferences = await prisma.projectPreference.findMany({
    select: {
      id: true,
      name: true,
    },
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
