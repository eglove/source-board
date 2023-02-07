import { type QueryObserverResult } from '@tanstack/query-core';
import { type ChangeEvent, type FormEvent } from 'react';
import useForm from 'source/feature/common/hooks/use-form';
import useUser from 'source/feature/common/hooks/use-user';
import {
  type ProjectPreferenceCreateInput,
  type ProjectPreferenceCreateReturn,
} from 'source/feature/server/routers/project-preference/create';
import { type ProjectPreferenceGetForUserReturn } from 'source/feature/server/routers/project-preference/get-for-user';

type UseProjectPreferencesProperties = {
  create: (
    parameters: ProjectPreferenceCreateInput,
  ) => Promise<ProjectPreferenceCreateReturn>;
  refetch: () => Promise<
    QueryObserverResult<ProjectPreferenceGetForUserReturn>
  >;
};

const initialState: Pick<ProjectPreferenceCreateInput, 'name'> = {
  name: '',
};

type UseProjectPreferencesReturn = {
  handleChange: (event: ChangeEvent) => void;
  formState: typeof initialState;
  handleSubmit: (event: FormEvent) => void;
};

export const useProjectPreferences = ({
  create,
  refetch,
}: UseProjectPreferencesProperties): UseProjectPreferencesReturn => {
  const user = useUser();

  const { handleChange, formState, handleSubmit, setFormError } = useForm<
    Pick<ProjectPreferenceCreateInput, 'name'>
  >(initialState, {
    async onSubmit() {
      if (user?.username === undefined || !user.isLoggedIn) {
        setFormError(new Error('Username not found'));
        return;
      }

      await create({
        name: formState.name,
        username: user.username,
      });
      await refetch();
    },
  });

  return {
    handleChange,
    formState,
    handleSubmit,
  };
};
