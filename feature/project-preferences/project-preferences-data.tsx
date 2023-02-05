import { useRouter } from 'next/router';
import ProjectPreferencesView from 'source/feature/project-preferences/project-preferences-view';
import { trpc } from 'source/feature/util/trpc';

export default function ProjectPreferencesData(): JSX.Element {
  const router = useRouter();

  const { data, isLoading, error, refetch } =
    trpc.projectPreference.getForUser.useQuery(
      {
        username: router.query.user as string,
      },
      {
        enabled: typeof router.query.user === 'string',
      },
    );

  const { isLoading: isCreating, mutateAsync: create } =
    trpc.projectPreference.create.useMutation();

  return (
    <ProjectPreferencesView
      create={create}
      data={data}
      error={error}
      isLoading={isLoading || isCreating}
      refetch={refetch}
    />
  );
}
