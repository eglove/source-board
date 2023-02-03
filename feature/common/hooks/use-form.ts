import {
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useState,
} from 'react';
import { replaceAllValuesShallow } from 'source/feature/util/util-object';
import { getZodFieldErrors } from 'source/feature/util/util-zod';
import { type z } from 'zod';

type UseFormProperties = {
  onChange?: (event: ChangeEvent) => unknown;
  onError?: (error: unknown) => unknown;
  onSubmit?: (...arguments_: unknown[]) => unknown;
  zodValidator?: z.ZodTypeAny;
};

type UseFormReturn<StateType extends Record<string, unknown>> = {
  clearFieldErrors: () => void;
  clearForm: () => void;
  fieldErrors: Record<keyof StateType, string[] | undefined> | undefined;
  formError: Error | null;
  formState: StateType;
  handleChange: (event: ChangeEvent) => void;
  handleSubmit: (event: FormEvent) => void;
  resetForm: () => void;
  setFieldErrors: Dispatch<
    SetStateAction<Record<keyof StateType, string[] | undefined> | undefined>
  >;
  setFormError: Dispatch<SetStateAction<Error | null>>;
  setFormState: Dispatch<SetStateAction<StateType>>;
};

export default function useForm<StateType extends Record<string, unknown>>(
  initialState: StateType,
  properties?: UseFormProperties,
): UseFormReturn<StateType> {
  const [formState, setFormState] = useState(initialState);
  const [formError, setFormError] = useState<Error | null>(null);
  const [fieldErrors, setFieldErrors] =
    useState<Record<keyof StateType, string[] | undefined>>();

  function clearFieldErrors(): void {
    if (fieldErrors !== undefined) {
      const replaced = replaceAllValuesShallow(fieldErrors);
      setFieldErrors(replaced);
    }
  }

  function clearForm(): void {
    const replaced = replaceAllValuesShallow(formState);
    setFormState(replaced);
  }

  function resetForm(): void {
    setFormState(initialState);
  }

  function handleChange(event: ChangeEvent): void {
    const eventTarget = event.target as unknown as {
      checked?: boolean;
      files: File[];
      name: string;
      type: string;
      value: string | boolean | number | File;
    };

    let { value } = eventTarget;
    const { checked, name, type, files } = eventTarget;

    if (type === 'checkbox' && checked !== undefined) {
      value = checked;
    }

    if (type === 'number' && typeof value === 'string') {
      value = Number.parseFloat(value.replaceAll(',', ''));
    }

    if (type === 'file') {
      [value] = files;
    }

    setFormState(formState_ => {
      return {
        ...formState_,
        [name]: value,
      };
    });

    properties?.onChange?.(event);
  }

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();

    try {
      properties?.zodValidator?.parse(formState);
    } catch (error: unknown) {
      const errors = getZodFieldErrors(error, formState) as typeof fieldErrors;
      setFieldErrors(errors);
      return;
    }

    if (properties?.onSubmit === undefined) {
      return;
    }

    let hasException = false;
    try {
      properties?.onSubmit();
    } catch (error: unknown) {
      hasException = true;
      properties?.onError?.(error);

      if (error instanceof Error) {
        setFormError(error);
      }
    }

    if (!hasException) {
      clearFieldErrors();
      setFormError(null);
    }
  }

  return {
    clearFieldErrors,
    clearForm,
    fieldErrors,
    formError,
    formState,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldErrors,
    setFormError,
    setFormState,
  };
}
