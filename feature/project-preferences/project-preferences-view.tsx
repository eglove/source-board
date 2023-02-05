import * as Label from '@radix-ui/react-label';
import { type QueryObserverResult } from '@tanstack/query-core';
import { type TRPCClientErrorLike } from '@trpc/client';
import ErrorLoading from 'source/feature/common/error-loading/error-loading';
import styles from 'source/feature/project-preferences/project-preferences.module.css';
import { useProjectPreferences } from 'source/feature/project-preferences/use-project-preferences';
import {
  type ProjectPreferenceCreateInput,
  type ProjectPreferenceCreateReturn,
} from 'source/feature/server/routers/project-preference/create';
import { type ProjectPreferenceGetForUserReturn } from 'source/feature/server/routers/project-preference/get-for-user';
import { type projectPreferenceRouter } from 'source/feature/server/routers/project-preference/router';

type ProjectPreferencesViewProperties = {
  isLoading: boolean;
  error?: TRPCClientErrorLike<typeof projectPreferenceRouter.getForUser> | null;
  data?: ProjectPreferenceGetForUserReturn;
  create: (
    parameters: ProjectPreferenceCreateInput,
  ) => Promise<ProjectPreferenceCreateReturn>;
  refetch: () => Promise<
    QueryObserverResult<ProjectPreferenceGetForUserReturn>
  >;
};

export default function ProjectPreferencesView({
  create,
  data,
  isLoading,
  error,
  refetch,
}: ProjectPreferencesViewProperties): JSX.Element {
  const { handleSubmit, handleChange, formState } = useProjectPreferences({
    create,
    refetch,
  });

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
      <form aria-label="form" onSubmit={handleSubmit}>
        <input
          className={styles.Input}
          id="name"
          name="name"
          type="text"
          value={formState.name}
          onChange={handleChange}
        />
        <Label.Root className={styles.LabelRoot} htmlFor="name">
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
