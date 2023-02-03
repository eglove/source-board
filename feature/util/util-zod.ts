import { ZodError } from 'zod';

export function getZodFieldErrors<ErrorStateType extends Object>(
  error: unknown,
  errorState: ErrorStateType,
): Record<string, string[]> {
  const errors: Record<string, string[]> = {};

  if (error instanceof ZodError) {
    for (const key of Object.keys(errorState)) {
      const errorArray = error.formErrors.fieldErrors[key];

      if (errorArray !== undefined) {
        errors[key] = errorArray;
      }
    }
  }

  return errors;
}
