import * as Label from '@radix-ui/react-label';
import { type TRPCClientErrorLike } from '@trpc/client';
import ErrorLoading from 'source/feature/common/error-loading/error-loading';
import styles from 'source/feature/project-preferences/project-preferences.module.css';
import {
  type ProjectPreferenceGetForUserReturn,
  type projectPreferenceRouter,
} from 'source/feature/server/routers/project-preference';

type ProjectPreferencesViewProperties = {
  isLoading: boolean;
  error?: TRPCClientErrorLike<typeof projectPreferenceRouter.getForUser> | null;
  data?: ProjectPreferenceGetForUserReturn;
};

export default function ProjectPreferencesView({
  data,
  isLoading,
  error,
}: ProjectPreferencesViewProperties): JSX.Element {
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
      <form aria-label="form">
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
