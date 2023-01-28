import * as Label from '@radix-ui/react-label';
import { useRouter } from 'next/router';
import ErrorLoading from 'source/feature/common/error-loading/error-loading';
import { trpc } from 'source/feature/util/trpc';

import styles from './project-preferences.module.css';

export default function ProjectPreferences(): JSX.Element {
  const router = useRouter();
  const { data, isLoading, error } = trpc.projectPreference.useQuery(
    {
      username: router.query.user as string,
    },
    {
      enabled: typeof router.query.user === 'string',
    },
  );

  if (isLoading || error) {
    return (
      <ErrorLoading
        error={error}
        errorMessage="Error! Failed to get preferences!"
        isLoading={isLoading}
      />
    );
  }

  return (
    <div className={styles.Container}>
      <h1>Project Preferences</h1>
      <form>
        <input className={styles.Input} id="addPreference" type="text" />
        <Label.Root className={styles.LabelRoot} htmlFor="addPreference">
          <button className={styles.SubmitButton} type="submit">
            Add
          </button>
        </Label.Root>
      </form>
      <br />
      <ul>
        {data?.map(preference => {
          return <li key={preference.id}>{preference.name}</li>;
        })}
      </ul>
    </div>
  );
}
