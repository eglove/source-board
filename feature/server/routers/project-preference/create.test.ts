import { generateMock } from '@anatine/zod-mock';
import {
  projectPreferenceCreateInputSchema,
  projectPreferenceCreateReturnSchema,
} from 'source/feature/server/routers/project-preference/create';
import { ZodError } from 'zod';

describe('ProjectPreference create', () => {
  it('should validate correct input', () => {
    const input = generateMock(projectPreferenceCreateInputSchema);

    const parsed = projectPreferenceCreateInputSchema.parse(input);

    expect(parsed).toStrictEqual(input);
  });

  it('should throw on incorrect input', () => {
    const input = {
      username: true,
      name: 546,
    };
    let errors: ZodError | null = null;

    try {
      projectPreferenceCreateInputSchema.parse(input);
    } catch (zError) {
      if (zError instanceof ZodError) {
        errors = zError;
      }
    }

    expect(errors?.issues[0].message).toBe('Expected string, received boolean');
    expect(errors?.issues[1].message).toBe('Expected string, received number');
  });

  it('should validate correct return object', () => {
    const output = generateMock(projectPreferenceCreateReturnSchema);

    const parsed = projectPreferenceCreateReturnSchema.parse(output);

    expect(parsed).toStrictEqual(output);
  });

  it('should invalidate incorrect return object', () => {
    const output = {
      id: 'id',
      name: true,
    };
    let errors: ZodError | null = null;

    try {
      projectPreferenceCreateReturnSchema.parse(output);
    } catch (zError) {
      if (zError instanceof ZodError) {
        errors = zError;
      }
    }

    expect(errors?.issues[0].message).toBe('Invalid uuid');
    expect(errors?.issues[1].message).toBe('Expected string, received boolean');
  });
});
