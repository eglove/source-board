import * as crypto from 'node:crypto';

import { getZodFieldErrors } from 'source/feature/util/util-zod';
import { z } from 'zod';

describe('getZodFieldErrors', () => {
  it('should return an array of errors for every item on the object that does not parse', () => {
    const object = {
      name: 123,
      number: 235,
      id: 'password',
    };

    const schema = z.object({
      name: z.string(),
      number: z.number(),
      id: z.string().uuid(),
    });

    let errors = {};

    try {
      schema.parse(object);
    } catch (error) {
      errors = getZodFieldErrors(error, object);
    }

    expect(errors).toStrictEqual({
      id: ['Invalid uuid'],
      name: ['Expected string, received number'],
    });
  });

  it('should return an empty object if there ae no errros', () => {
    const object = {
      name: 'name',
      number: 235,
      id: crypto.randomUUID(),
    };

    const schema = z.object({
      name: z.string(),
      number: z.number(),
      id: z.string().uuid(),
    });

    let errors = {};

    try {
      schema.parse(object);
    } catch (error) {
      errors = getZodFieldErrors(error, object);
    }

    expect(errors).toStrictEqual({});
  });
});
